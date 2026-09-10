# 16. Views — представлення в PostgreSQL

## 📌 Мета розділу

`View` — це збережений SQL-запит, який PostgreSQL представляє як віртуальну таблицю.

Замість того щоб щоразу писати складний запит:

    SELECT
        users.id,
        users.name,
        users.email,
        orders.id AS order_id,
        orders.total,
        orders.status
    FROM users
    JOIN orders
        ON orders.user_id = users.id;

можна створити:

    CREATE VIEW user_orders AS
    SELECT
        users.id,
        users.name,
        users.email,
        orders.id AS order_id,
        orders.total,
        orders.status
    FROM users
    JOIN orders
        ON orders.user_id = users.id;

Після цього:

    SELECT *
    FROM user_orders;

Головна ідея:

> **View — це іменований SQL-запит, до якого можна звертатися майже як до таблиці.**

---

# 1. View — це не копія таблиці

Це дуже важливо.

Якщо створити:

    CREATE VIEW active_users AS
    SELECT *
    FROM users
    WHERE active = true;

PostgreSQL зазвичай **не копіює рядки** в окрему таблицю.

View зберігає визначення запиту.

Ментальна модель:

    users
      ↓
    SELECT ...
      ↓
    VIEW
      ↓
    SELECT FROM view

---

# 2. Простий View

Створимо:

    CREATE VIEW active_users AS
    SELECT
        id,
        name,
        email
    FROM users
    WHERE active = true;

Тепер можна:

    SELECT *
    FROM active_users;

Замість:

    SELECT
        id,
        name,
        email
    FROM users
    WHERE active = true;

---

# 3. Навіщо потрібні Views

Views використовують для:

- спрощення складних SQL-запитів;
- повторного використання запитів;
- приховування зайвих колонок;
- створення логічного шару над таблицями;
- контролю доступу;
- зручного API для application layer;
- абстрагування структури БД.

Наприклад:

    складний JOIN
          ↓
    складний WHERE
          ↓
    GROUP BY
          ↓
    View
          ↓
    простий SELECT

---

# 4. View як абстракція

Уявімо:

    users
    orders
    order_items
    products

Щоб отримати інформацію про замовлення, потрібно зробити кілька `JOIN`.

Замість того щоб кожен backend-сервіс знав усю структуру:

    users
    ↓
    orders
    ↓
    order_items
    ↓
    products

можна створити:

    order_details

і backend працює з:

    SELECT *
    FROM order_details;

Це приклад database abstraction.

---

# 5. CREATE VIEW

Основний синтаксис:

    CREATE VIEW view_name AS
    SELECT ...;

Наприклад:

    CREATE VIEW active_users AS
    SELECT
        id,
        name,
        email
    FROM users
    WHERE active = true;

---

# 6. SELECT з View

Після створення View:

    SELECT *
    FROM active_users;

Також можна:

    SELECT name, email
    FROM active_users;

І:

    SELECT *
    FROM active_users
    WHERE name ILIKE 'V%';

View можна використовувати в SQL майже як таблицю.

---

# 7. WHERE у View

View може містити фільтрацію.

    CREATE VIEW available_products AS
    SELECT
        id,
        name,
        price
    FROM products
    WHERE stock > 0
      AND active = true;

Тепер:

    SELECT *
    FROM available_products;

повертає тільки доступні товари.

---

# 8. JOIN у View

View може містити JOIN.

    CREATE VIEW order_users AS
    SELECT
        orders.id AS order_id,
        orders.total,
        orders.status,
        users.id AS user_id,
        users.name AS user_name,
        users.email
    FROM orders
    JOIN users
        ON orders.user_id = users.id;

Тепер:

    SELECT *
    FROM order_users;

---

# 9. Aggregate у View

View може містити:

    COUNT()
    SUM()
    AVG()
    MIN()
    MAX()

Наприклад:

    CREATE VIEW user_order_stats AS
    SELECT
        user_id,
        COUNT(*) AS orders_count,
        SUM(total) AS total_spent,
        AVG(total) AS average_order
    FROM orders
    GROUP BY user_id;

Тепер:

    SELECT *
    FROM user_order_stats;

---

# 10. View може містити складний SQL

Наприклад:

    CREATE VIEW customer_statistics AS
    SELECT
        users.id,
        users.name,
        COUNT(orders.id) AS orders_count,
        COALESCE(SUM(orders.total), 0) AS total_spent
    FROM users
    LEFT JOIN orders
        ON orders.user_id = users.id
    GROUP BY
        users.id,
        users.name;

Тепер application layer може просто виконати:

    SELECT *
    FROM customer_statistics;

---

# 11. View і повторне використання

Без View:

    SELECT ...
    FROM users
    JOIN orders ...
    GROUP BY ...

цей запит може повторюватися:

    service A
    service B
    report C
    admin panel

З View:

    customer_statistics

і всі використовують:

    SELECT *
    FROM customer_statistics;

Це зменшує дублювання SQL.

---

# 12. CREATE OR REPLACE VIEW

Якщо потрібно змінити визначення View:

    CREATE OR REPLACE VIEW active_users AS
    SELECT
        id,
        name,
        email,
        created_at
    FROM users
    WHERE active = true;

`CREATE OR REPLACE VIEW` дозволяє оновити definition існуючого View.

---

# 13. Важливе обмеження CREATE OR REPLACE VIEW

Не можна довільно змінювати структуру існуючого View через `CREATE OR REPLACE VIEW`.

Зокрема, порядок і набір існуючих output columns має залишатися сумісним.

Якщо потрібно радикально змінити структуру, часто використовують:

    DROP VIEW

а потім:

    CREATE VIEW

---

# 14. DROP VIEW

Видалення:

    DROP VIEW active_users;

Після цього:

    SELECT *
    FROM active_users;

дасть помилку, тому що View більше не існує.

---

# 15. DROP VIEW IF EXISTS

Безпечніший варіант для scripts:

    DROP VIEW IF EXISTS active_users;

Якщо View існує — його буде видалено.

Якщо не існує — PostgreSQL не завершить команду помилкою.

---

# 16. CASCADE для View

Якщо інші об'єкти залежать від View:

    DROP VIEW active_users CASCADE;

PostgreSQL також видалить залежні об'єкти.

`CASCADE` потрібно використовувати обережно.

Перед використанням варто розуміти:

> що саме залежить від цього View?

---

# 17. View та актуальні дані

Наприклад:

    CREATE VIEW active_users AS
    SELECT *
    FROM users
    WHERE active = true;

Потім:

    UPDATE users
    SET active = false
    WHERE id = 1;

При наступному:

    SELECT *
    FROM active_users;

користувач вже не повинен з'являтися.

Тобто звичайний View показує результат поточного стану базових таблиць.

---

# 18. View не зберігає результат

Це принципова різниця.

Звичайний View:

    CREATE VIEW ...

зберігає:

    SQL definition

а не готовий результат запиту.

Тому:

    SELECT *
    FROM active_users;

звертається до underlying tables відповідно до визначення View.

---

# 19. View vs Table

| Table | View |
|---|---|
| зберігає дані | зазвичай не зберігає результат |
| має фізичні рядки | логічне представлення |
| INSERT/UPDATE/DELETE можливі | залежить від View |
| має власну структуру | базується на query |
| займає місце для даних | зазвичай зберігає definition |

Ментальна модель:

    TABLE
    ↓
    data

    VIEW
    ↓
    query

---

# 20. View vs Materialized View

Це дуже важлива різниця.

### View

    query
      ↓
    current data

### Materialized View

    query
      ↓
    stored result

Materialized View фактично зберігає результат запиту.

---

# 21. Materialized View

Приклад:

    CREATE MATERIALIZED VIEW user_order_stats AS
    SELECT
        user_id,
        COUNT(*) AS orders_count,
        SUM(total) AS total_spent
    FROM orders
    GROUP BY user_id;

Результат запиту буде збережений.

Після цього:

    SELECT *
    FROM user_order_stats;

---

# 22. Чому Materialized View швидший

Якщо запит дуже складний:

    JOIN
    +
    GROUP BY
    +
    SUM
    +
    COUNT

і даних дуже багато, його виконання може бути дорогим.

Materialized View дозволяє зберігати вже обчислений результат.

Тоді:

    складний query
         ↓
    обчислення
         ↓
    stored result
         ↓
    швидкий SELECT

Але є проблема:

> результат може бути застарілим.

---

# 23. REFRESH MATERIALIZED VIEW

Щоб оновити Materialized View:

    REFRESH MATERIALIZED VIEW user_order_stats;

PostgreSQL заново виконає query та оновить збережений результат.

---

# 24. View vs Materialized View

| View | Materialized View |
|---|---|
| результат не зберігається | результат зберігається |
| завжди працює з актуальними даними | може бути застарілим |
| не потребує refresh | потребує refresh |
| простіше | складніше |
| зручно для abstraction | зручно для дорогих запитів |

Запам'ятай:

    VIEW
    → query

    MATERIALIZED VIEW
    → stored query result

---

# 25. REFRESH MATERIALIZED VIEW CONCURRENTLY

Для Materialized View існує:

    REFRESH MATERIALIZED VIEW CONCURRENTLY user_order_stats;

Це дозволяє оновлювати Materialized View із меншим блокуванням читачів.

Але для `CONCURRENTLY` існують додаткові вимоги, зокрема потрібен відповідний `UNIQUE` index на Materialized View.

Це advanced topic.

---

# 26. Updatable Views

Деякі прості Views можна не тільки читати, а й змінювати.

Наприклад:

    CREATE VIEW active_users AS
    SELECT
        id,
        name,
        email,
        active
    FROM users
    WHERE active = true;

У простих випадках можна виконувати:

    UPDATE active_users
    SET name = 'New Name'
    WHERE id = 1;

PostgreSQL може транслювати таку операцію до базової таблиці.

---

# 27. Чому не кожен View updatable

Якщо View дуже складний:

    JOIN
    GROUP BY
    DISTINCT
    aggregate functions

то PostgreSQL не завжди може однозначно визначити, як змінити базові таблиці.

Наприклад:

    CREATE VIEW user_statistics AS
    SELECT
        user_id,
        COUNT(*) AS orders_count
    FROM orders
    GROUP BY user_id;

Що означає:

    UPDATE user_statistics
    SET orders_count = 100;

?

PostgreSQL не може просто змінити `COUNT(*)` як звичайну колонку.

Тому такий View призначений переважно для читання.

---

# 28. Simple View vs Complex View

Простий View:

    SELECT
        id,
        name,
        email
    FROM users
    WHERE active = true;

може бути updatable.

Складний:

    SELECT
        user_id,
        COUNT(*)
    FROM orders
    GROUP BY user_id;

— логічно є read-only представленням.

---

# 29. WITH CHECK OPTION

Для updatable View існує:

    WITH CHECK OPTION

Наприклад:

    CREATE VIEW active_users AS
    SELECT
        id,
        name,
        email,
        active
    FROM users
    WHERE active = true
    WITH CHECK OPTION;

Це означає:

> зміни через View не повинні створювати рядок, який більше не відповідає умові View.

---

# 30. Навіщо WITH CHECK OPTION

Без:

    WITH CHECK OPTION

може виникнути ситуація:

    active_users
    ↓
    WHERE active = true

а через View виконати:

    UPDATE active_users
    SET active = false
    WHERE id = 1;

Тоді рядок перестане відповідати View.

`WITH CHECK OPTION` забороняє таку зміну через View.

---

# 31. View як security layer

View може використовуватися для приховування певних колонок.

Наприклад, таблиця:

    users

має:

    id
    name
    email
    password_hash
    role
    created_at

Не потрібно давати певному користувачу БД доступ до всіх колонок.

Можна створити:

    CREATE VIEW public_users AS
    SELECT
        id,
        name,
        email,
        created_at
    FROM users;

Тепер можна надати доступ до:

    public_users

а не до всієї таблиці `users`.

---

# 32. View для приховування sensitive columns

Наприклад:

    password_hash

не повинен повертатися звичайним application query.

Створюємо:

    CREATE VIEW user_profiles AS
    SELECT
        id,
        name,
        email
    FROM users;

І backend працює з:

    user_profiles

а не:

    SELECT *
    FROM users;

Це може бути частиною database security architecture.

---

# 33. GRANT на View

PostgreSQL дозволяє давати права на View.

Наприклад:

    GRANT SELECT
    ON user_profiles
    TO app_user;

Тепер роль:

    app_user

може читати View.

Права на базову таблицю потрібно проектувати окремо відповідно до схеми доступу.

---

# 34. View та backend

У Full Stack application можна мати:

    React
       ↓
    Next.js / Nest.js
       ↓
    PostgreSQL
       ↓
    View
       ↓
    tables

Наприклад Nest.js робить:

    SELECT *
    FROM customer_statistics;

Backend не повинен щоразу знати всю складність:

    users
    +
    orders
    +
    order_items

---

# 35. View як database API

Цікава ментальна модель:

    TABLES
       ↓
    internal database structure
       ↓
    VIEWS
       ↓
    stable logical interface
       ↓
    APPLICATION

View може виступати як своєрідний database-level API.

Наприклад:

    customer_statistics

може залишатися стабільним для backend, навіть якщо внутрішня реалізація поступово змінюється.

---

# 36. View і JOIN

Припустимо:

    users
    orders
    products

Замість:

    SELECT
        users.name,
        orders.id,
        orders.total
    FROM users
    JOIN orders
        ON orders.user_id = users.id;

створюємо:

    CREATE VIEW order_list AS
    SELECT
        orders.id AS order_id,
        users.name AS customer_name,
        orders.total,
        orders.status
    FROM orders
    JOIN users
        ON orders.user_id = users.id;

Потім:

    SELECT *
    FROM order_list;

---

# 37. View і GROUP BY

    CREATE VIEW user_order_summary AS
    SELECT
        user_id,
        COUNT(*) AS order_count,
        SUM(total) AS total_spent
    FROM orders
    GROUP BY user_id;

Тепер:

    SELECT *
    FROM user_order_summary
    ORDER BY total_spent DESC;

Складна логіка захована всередині View.

---

# 38. View і WHERE

Можна створити:

    CREATE VIEW pending_orders AS
    SELECT
        id,
        user_id,
        total,
        created_at
    FROM orders
    WHERE status = 'pending';

Тепер:

    SELECT *
    FROM pending_orders;

або:

    SELECT *
    FROM pending_orders
    ORDER BY created_at DESC;

---

# 39. View і JOIN + GROUP BY

Реальний приклад:

    CREATE VIEW customer_statistics AS
    SELECT
        users.id AS user_id,
        users.name,
        COUNT(orders.id) AS order_count,
        COALESCE(SUM(orders.total), 0) AS total_spent
    FROM users
    LEFT JOIN orders
        ON orders.user_id = users.id
    GROUP BY
        users.id,
        users.name;

Тепер:

    SELECT *
    FROM customer_statistics
    WHERE total_spent > 1000
    ORDER BY total_spent DESC;

---

# 40. View можна використовувати в інших запитах

View поводиться як relation, тому можна:

    SELECT *
    FROM customer_statistics
    WHERE order_count > 5;

або:

    SELECT name, total_spent
    FROM customer_statistics
    ORDER BY total_spent DESC;

---

# 41. View у JOIN

View можна JOIN-ити з таблицями.

Наприклад:

    SELECT
        customer_statistics.name,
        customer_statistics.total_spent,
        users.active
    FROM customer_statistics
    JOIN users
        ON users.id = customer_statistics.user_id;

View також можна JOIN-ити з іншими Views.

---

# 42. View не означає автоматично швидше

Це дуже важливо.

Якщо створити:

    CREATE VIEW expensive_report AS
    SELECT ...

це не означає, що query автоматично стане швидшим.

Звичайний View — це передусім:

    abstraction
    +
    reuse
    +
    security
    +
    readability

а не performance optimization.

---

# 43. View та Index

Індекс створюється не на звичайному View так, як на таблиці.

Наприклад, не можна просто:

    CREATE INDEX ...
    ON active_users(...);

як на звичайній таблиці.

Якщо проблема в performance запиту View, потрібно дивитися на:

    underlying tables
    ↓
    indexes
    ↓
    EXPLAIN ANALYZE

Або розглянути:

    MATERIALIZED VIEW

---

# 44. Materialized View та Index

На Materialized View можна створювати indexes.

Наприклад:

    CREATE INDEX idx_user_order_stats_total
    ON user_order_stats(total_spent);

Тоді можна оптимізувати запити до вже збереженого результату.

---

# 45. View та CTE

Не плутай:

    View

і:

    CTE

CTE:

    WITH active_users AS (
        SELECT ...
    )
    SELECT *
    FROM active_users;

зазвичай існує в межах одного SQL-запиту.

View:

    CREATE VIEW active_users AS
    SELECT ...;

існує як database object і може використовуватися в багатьох запитах.

Ментальна модель:

    CTE
    → тимчасове іменоване представлення в одному query

    VIEW
    → збережене database object

---

# 46. View та Subquery

Порівняй:

    SELECT *
    FROM (
        SELECT *
        FROM users
        WHERE active = true
    ) AS active_users;

Це subquery / derived table.

View:

    CREATE VIEW active_users AS
    SELECT *
    FROM users
    WHERE active = true;

Різниця:

    subquery
    → тільки цей query

    view
    → багато query

---

# 47. View та Stored Function

Не плутай:

    View

і:

    Function

View:

    SELECT ...
    FROM view;

Function:

    SELECT some_function(...);

View добре підходить для:

    reusable SELECT

Function — для:

    logic
    parameters
    calculations
    actions

Ці теми розглянемо детальніше у:

    18-functions-and-procedures

---

# 48. View та Trigger

Звичайний View не є trigger.

Trigger реагує на:

    INSERT
    UPDATE
    DELETE

View — це:

    stored SELECT definition

Не треба плутати їхні ролі.

---

# 49. Naming Views

Добре використовувати зрозумілі назви.

Наприклад:

    active_users
    pending_orders
    customer_statistics
    order_details
    product_catalog

Не дуже добре:

    view1
    temp_view
    test_view2

Ім'я повинно пояснювати, що представляє View.

---

# 50. Не використовуй SELECT * бездумно

Можна:

    CREATE VIEW active_users AS
    SELECT *
    FROM users
    WHERE active = true;

Але для production-коду часто краще:

    CREATE VIEW active_users AS
    SELECT
        id,
        name,
        email,
        created_at
    FROM users
    WHERE active = true;

Переваги:

- зрозуміла структура;
- не повертаються зайві колонки;
- менше залежності від змін таблиці;
- краща безпека.

---

# 51. View як контракт

Якщо backend очікує:

    user_id
    name
    total_spent

можна створити View:

    customer_statistics

і сприймати його як контракт:

    customer_statistics
        ├── user_id
        ├── name
        └── total_spent

Backend знає цей інтерфейс, а не всі внутрішні JOIN-и.

---

# 52. Але View теж створює залежність

View не магічно усуває залежності.

Наприклад:

    customer_statistics
          ↓
        users
          +
        orders

Якщо видалити або змінити необхідну колонку в `users` чи `orders`, View може перестати працювати або потребувати зміни.

Тому Views також потрібно підтримувати.

---

# 53. Перегляд definition View

У `psql`:

    \d+ active_users

можна отримати інформацію про View.

Також можна використовувати системні каталоги PostgreSQL.

Наприклад:

    SELECT
        schemaname,
        viewname,
        definition
    FROM pg_views
    WHERE viewname = 'active_users';

---

# 54. Список Views

У `psql` можна використовувати:

    \dv

Це покаже Views у поточній базі/доступному search path.

Для розширеної інформації:

    \dv+

---

# 55. Список Materialized Views

У `psql`:

    \dm

може показати Materialized Views.

---

# 56. ALTER VIEW

PostgreSQL має:

    ALTER VIEW

Наприклад, можна змінювати властивості View.

Типові операції:

    ALTER VIEW view_name RENAME TO new_name;

або:

    ALTER VIEW view_name
    SET SCHEMA new_schema;

Але саме SQL definition View зазвичай змінюють через:

    CREATE OR REPLACE VIEW

---

# 57. Перейменування View

    ALTER VIEW active_users
    RENAME TO current_users;

Після цього:

    SELECT *
    FROM current_users;

---

# 58. Переміщення View у schema

Наприклад:

    ALTER VIEW active_users
    SET SCHEMA reporting;

Тепер View знаходиться у:

    reporting.active_users

---

# 59. Schema + View

У великих проектах можна організувати:

    public
      ├── users
      ├── orders
      └── products

    reporting
      ├── customer_statistics
      └── order_statistics

Тоді Views для reporting логічно відокремлені від основних таблиць.

Це добре поєднується з наступними темами:

    22-schema-and-database-organization

---

# 60. View для reporting

Наприклад:

    CREATE VIEW reporting.monthly_sales AS
    SELECT
        DATE_TRUNC('month', created_at) AS month,
        COUNT(*) AS orders_count,
        SUM(total) AS total_sales
    FROM orders
    WHERE status = 'paid'
    GROUP BY DATE_TRUNC('month', created_at);

Тепер:

    SELECT *
    FROM reporting.monthly_sales
    ORDER BY month;

---

# 61. View для API

Уявімо endpoint:

    GET /api/products

Backend може читати:

    SELECT
        id,
        name,
        price
    FROM available_products
    ORDER BY name;

де:

    available_products

є View.

Тоді бізнес-логіка доступності товарів може бути централізована на рівні БД.

---

# 62. View і безпека application user

У production database може бути окрема роль:

    app_user

І можна будувати схему:

    app_user
       ↓
    SELECT
       ↓
    safe Views
       ↓
    internal tables

Це може бути сильнішою моделлю безпеки, ніж просто давати application role повний доступ до всіх таблиць.

Але конкретна security architecture залежить від проєкту.

---

# 63. View і performance

Якщо:

    SELECT *
    FROM customer_statistics;

повільний, не треба думати:

> "View повільний."

Потрібно дивитися на реальний план:

    EXPLAIN ANALYZE
    SELECT *
    FROM customer_statistics;

Після цього аналізувати:

    JOIN
    WHERE
    GROUP BY
    indexes
    statistics

у underlying tables.

---

# 64. View + EXPLAIN ANALYZE

Наприклад:

    EXPLAIN ANALYZE
    SELECT *
    FROM customer_statistics
    WHERE total_spent > 1000;

PostgreSQL покаже план виконання запиту, включаючи операції, що виникають через underlying query View.

---

# 65. Коли використовувати View

View особливо корисний, якщо:

### 1. Запит повторюється

    складний SELECT
        ↓
    View

### 2. Потрібно спростити SQL

    5 JOIN
       ↓
    View
       ↓
    SELECT

### 3. Потрібно приховати колонки

    users
       ↓
    safe View

### 4. Потрібен стабільний database interface

    application
       ↓
    View

### 5. Потрібні reporting queries

    tables
       ↓
    reporting View

---

# 66. Коли View не потрібен

Не треба створювати View для кожного:

    SELECT *

Якщо запит:

    SELECT *
    FROM users
    WHERE id = 1;

використовується один раз і дуже простий, View може тільки додати непотрібну абстракцію.

View має сенс, коли він вирішує конкретну проблему:

    reuse
    abstraction
    security
    readability
    reporting

---

# 67. Коли потрібен Materialized View

Materialized View варто розглядати, коли:

- query дуже дорогий;
- даних багато;
- результат потрібен часто;
- допустима певна затримка актуальності;
- можна організувати refresh.

Наприклад:

    millions of orders
          ↓
    expensive aggregation
          ↓
    dashboard

Materialized View може бути хорошим рішенням.

---

# 68. Коли НЕ потрібен Materialized View

Не варто створювати Materialized View тільки тому, що:

> "це швидше."

Потрібно враховувати:

    refresh cost
    storage
    indexes
    freshness
    complexity

Якщо дані повинні бути абсолютно актуальними, звичайний View або прямий query може бути кращим.

---

# 69. Практика №1 — active_users

Створи:

    users

з полями:

    id
    name
    email
    active

Потім:

    CREATE VIEW active_users AS
    SELECT
        id,
        name,
        email
    FROM users
    WHERE active = true;

Перевір:

    SELECT *
    FROM active_users;

---

# 70. Практика №2 — available_products

Створи View:

    available_products

який показує:

    id
    name
    price
    stock

тільки для:

    stock > 0

і:

    active = true

Потім:

    SELECT *
    FROM available_products
    ORDER BY price;

---

# 71. Практика №3 — order details

Є:

    users
    orders

Створи:

    order_details

який повертає:

    order_id
    customer_name
    customer_email
    total
    status
    created_at

Використай:

    JOIN

---

# 72. Практика №4 — customer statistics

Створи:

    customer_statistics

з:

    user_id
    name
    order_count
    total_spent

Використай:

    LEFT JOIN
    COUNT()
    SUM()
    GROUP BY
    COALESCE()

---

# 73. Практика №5 — View + WHERE

Після створення:

    customer_statistics

виконай:

    SELECT *
    FROM customer_statistics
    WHERE total_spent > 1000
    ORDER BY total_spent DESC;

Подумай:

> що знаходиться всередині View, а що виконується зовнішнім query?

---

# 74. Практика №6 — CREATE OR REPLACE VIEW

Створи:

    active_users

з:

    id
    name
    email

Потім заміни definition і додай:

    created_at

через:

    CREATE OR REPLACE VIEW

---

# 75. Практика №7 — DROP VIEW

Створи:

    test_view

Потім:

    DROP VIEW test_view;

Спробуй:

    SELECT *
    FROM test_view;

Подивись на помилку.

Після цього спробуй:

    DROP VIEW IF EXISTS test_view;

---

# 76. Практика №8 — Updatable View

Створи простий View:

    CREATE VIEW active_users AS
    SELECT
        id,
        name,
        email,
        active
    FROM users
    WHERE active = true
    WITH CHECK OPTION;

Спробуй:

    UPDATE active_users
    SET name = 'New Name'
    WHERE id = 1;

Потім спробуй:

    UPDATE active_users
    SET active = false
    WHERE id = 1;

Подивись, що зробить:

    WITH CHECK OPTION

---

# 77. Практика №9 — Materialized View

Створи:

    user_order_stats

як Materialized View:

    CREATE MATERIALIZED VIEW user_order_stats AS
    SELECT
        user_id,
        COUNT(*) AS order_count,
        SUM(total) AS total_spent
    FROM orders
    GROUP BY user_id;

Потім:

    SELECT *
    FROM user_order_stats;

Зміни `orders`.

Перевір Materialized View.

Потім:

    REFRESH MATERIALIZED VIEW user_order_stats;

Знову перевір.

---

# 78. Практика №10 — View як database API

Створи View:

    api_users

який повертає тільки:

    id
    name
    email
    active

Не повертай:

    password_hash

Потім уяви, що Nest.js використовує:

    SELECT *
    FROM api_users;

Подумай:

> чому View може бути корисним як database-level interface?

---

# 79. Практика №11 — EXPLAIN

Створи складний View:

    customer_statistics

Потім:

    EXPLAIN ANALYZE
    SELECT *
    FROM customer_statistics;

Подивись:

- JOIN;
- Aggregate;
- Seq Scan;
- Index Scan;
- actual time.

Зв'яжи це з попереднім розділом:

    15-indexes

---

# 80. Практика №12 — спроєктуй свої Views

Для навчальної БД створи мінімум три Views:

    active_users
    available_products
    customer_statistics

Для кожного запиши:

    Навіщо потрібен?
    Які таблиці використовує?
    Які колонки повертає?
    Чи можна його UPDATE?
    Чи потрібен index?
    Чи краще View або Materialized View?

---

# 81. Типові помилки

## ❌ Помилка 1

Вважати View копією таблиці.

Правильно:

    View
    → saved query definition

---

## ❌ Помилка 2

Вважати View автоматично швидшим.

Правильно:

    View
    → abstraction

    Materialized View
    → stored result

---

## ❌ Помилка 3

Використовувати `SELECT *` бездумно.

Краще явно визначати:

    SELECT
        id,
        name,
        email

---

## ❌ Помилка 4

Створювати View для кожного простого SELECT.

View повинен мати практичну мету.

---

## ❌ Помилка 5

Плутати View з CTE.

    CTE
    → один query

    View
    → database object

---

## ❌ Помилка 6

Плутати View з Materialized View.

    View
    → результат не зберігається

    Materialized View
    → результат зберігається

---

## ❌ Помилка 7

Вважати, що будь-який View можна UPDATE.

Складні Views з:

    GROUP BY
    aggregate functions
    DISTINCT
    JOIN

можуть бути read-only або вимагати спеціальної логіки.

---

# 82. View у Full Stack архітектурі

Корисно бачити всю картину:

    React
       ↓
    Next.js / Nest.js
       ↓
    SQL query
       ↓
    VIEW
       ↓
    ┌───────────────┐
    │ users         │
    │ orders        │
    │ products      │
    │ order_items   │
    └───────────────┘

View може бути проміжним шаром між:

    application

і:

    database structure

---

# 83. View та Separation of Concerns

View може допомогти розділити:

    internal database structure

від:

    application-facing data

Наприклад:

    internal:
        users
        orders
        order_items

    application:
        order_details

Це дозволяє application layer працювати з логічною моделлю, не знаючи всіх деталей storage model.

---

# 84. View як частина reporting layer

Можна організувати:

    database
    │
    ├── core tables
    │
    └── reporting
         ├── customer_statistics
         ├── monthly_sales
         └── product_statistics

Це особливо корисно для:

- dashboard;
- admin panel;
- reports;
- analytics;
- exports.

---

# 85. Junior → Middle → Advanced

## 🟢 Junior

Добре знати:

    CREATE VIEW

    SELECT FROM view

    CREATE OR REPLACE VIEW

    DROP VIEW

    \dv

Розуміти:

    View ≠ table
    View ≠ copy of data

---

## 🟡 Middle

Розуміти:

    View + JOIN
    View + GROUP BY
    View + aggregates
    Updatable Views
    WITH CHECK OPTION
    GRANT
    security through Views

Також:

    EXPLAIN ANALYZE
    View performance

---

## 🔴 Advanced

Вивчати:

    Materialized Views

    REFRESH MATERIALIZED VIEW

    REFRESH ... CONCURRENTLY

    Materialized View indexes

    complex security architecture

    dependency management

    schema organization

    reporting architecture

---

# 86. Контрольні питання

Перед переходом далі спробуй відповісти:

1. Що таке View?
2. Чим View відрізняється від таблиці?
3. Чи зберігає звичайний View результати query?
4. Як створити View?
5. Як видалити View?
6. Для чого потрібен `CREATE OR REPLACE VIEW`?
7. Як подивитися Views у `psql`?
8. Чи можна виконувати `SELECT` з View?
9. Чи можна JOIN-ити View?
10. Чи може View містити `GROUP BY`?
11. Чи може View містити aggregate functions?
12. Чи всі Views можна UPDATE?
13. Що таке `WITH CHECK OPTION`?
14. Що таке Materialized View?
15. Чим View відрізняється від Materialized View?
16. Для чого потрібен `REFRESH MATERIALIZED VIEW`?
17. Чому Materialized View може бути швидшим?
18. Чому Materialized View може містити застарілі дані?
19. Чи можна створити index на звичайному View?
20. Чим View відрізняється від CTE?
21. Чим View відрізняється від subquery?
22. Як View може використовуватися для security?
23. Що таке View як database API?
24. Коли краще використати View?
25. Коли краще використати Materialized View?

---

# 87. Головна ментальна модель

Запам'ятай:

    TABLE
       ↓
    зберігає дані

    VIEW
       ↓
    зберігає query definition

    MATERIALIZED VIEW
       ↓
    зберігає результат query

---

# 88. Ще одна важлива схема

    TABLES
       ↓
    JOIN / WHERE / GROUP BY
       ↓
    VIEW
       ↓
    SELECT
       ↓
    APPLICATION

View дозволяє винести складну SQL-логіку в database layer.

---

# 🔑 Головне з розділу

    CREATE VIEW
    → створити View

    SELECT FROM view
    → використовувати View

    CREATE OR REPLACE VIEW
    → змінити definition

    DROP VIEW
    → видалити View

    \dv
    → подивитися Views у psql

    VIEW
    → збережений SELECT, а не копія даних

    MATERIALIZED VIEW
    → збережений результат SELECT

    REFRESH MATERIALIZED VIEW
    → оновити результат

    WITH CHECK OPTION
    → не дозволити через View створювати рядки,
      які не відповідають його умові

Головна ідея:

> **View — це спосіб створити над таблицями зручний, повторно використовуваний і контрольований логічний шар.**

Для Full Stack Developer особливо важливо бачити його не просто як "ще один SQL object", а як можливий міст:

    PostgreSQL tables
          ↓
        Views
          ↓
    Nest.js / Next.js
          ↓
       React UI

А `Materialized View` — як окремий інструмент для ситуацій, коли потрібно зберігати вже обчислений результат дорогого запиту.
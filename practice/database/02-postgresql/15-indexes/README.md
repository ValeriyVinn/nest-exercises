# 15. Indexes — індекси в PostgreSQL

## 📌 Мета розділу

`Index` — це структура даних, яка допомагає PostgreSQL **швидше знаходити рядки** в таблиці.

Без індексу PostgreSQL у багатьох випадках змушений переглядати таблицю рядок за рядком:

    SELECT *
    FROM users
    WHERE email = 'user@example.com';

Якщо в таблиці:

    10 rows
    100 rows
    1 000 rows

це може бути непомітно.

Але якщо:

    1 000 000 rows
    10 000 000 rows
    100 000 000 rows

пошук без відповідного індексу може стати дорогим.

Індекс дозволяє PostgreSQL швидше знаходити потрібні записи.

Головна ідея:

> **Index прискорює читання даних, але має ціну: додаткове місце на диску та додаткову роботу під час INSERT / UPDATE / DELETE.**

---

# 1. Аналогія з книгою

Уяви книгу на 1000 сторінок.

Потрібно знайти:

    PostgreSQL

Без покажчика ти переглядаєш сторінки послідовно:

    сторінка 1
    сторінка 2
    сторінка 3
    ...
    сторінка 800

Індекс у книзі:

    PostgreSQL → сторінка 800

дозволяє набагато швидше перейти до потрібного місця.

Database index працює за схожою ідеєю.

---

# 2. Без індексу

Є таблиця:

    users

    id
    name
    email
    age

Виконуємо:

    SELECT *
    FROM users
    WHERE email = 'valeriy@example.com';

Якщо індексу на `email` немає, PostgreSQL може використати:

    Sequential Scan

Тобто переглядати таблицю послідовно.

---

# 3. Створення індексу

Найпростіший синтаксис:

    CREATE INDEX idx_users_email
    ON users(email);

Тепер PostgreSQL має індекс:

    idx_users_email

на колонці:

    users.email

---

# 4. Індекс не змінює SQL

Запит залишається таким самим:

    SELECT *
    FROM users
    WHERE email = 'valeriy@example.com';

Не потрібно писати:

    USE INDEX ...

PostgreSQL сам вирішує:

> використовувати індекс чи ні.

Це важлива особливість PostgreSQL.

---

# 5. EXPLAIN

Щоб побачити, як PostgreSQL планує виконувати запит:

    EXPLAIN
    SELECT *
    FROM users
    WHERE email = 'valeriy@example.com';

PostgreSQL покаже execution plan.

Наприклад, можна побачити:

    Seq Scan

або:

    Index Scan

---

# 6. EXPLAIN ANALYZE

`EXPLAIN ANALYZE` не тільки показує план, а й реально виконує запит.

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE email = 'valeriy@example.com';

Це один із головних інструментів для вивчення performance PostgreSQL.

---

# 7. Seq Scan

`Seq Scan` означає:

> PostgreSQL читає таблицю послідовно.

Наприклад:

    Seq Scan on users

Це не завжди погано.

Якщо таблиця маленька:

    20 rows

послідовний scan може бути швидшим, ніж використання індексу.

---

# 8. Index Scan

При наявності відповідного індексу PostgreSQL може використати:

    Index Scan

Наприклад:

    Index Scan using idx_users_email on users

Це означає, що PostgreSQL використав індекс для пошуку потрібних рядків.

---

# 9. Bitmap Index Scan

Для деяких запитів PostgreSQL може використати:

    Bitmap Index Scan

разом із:

    Bitmap Heap Scan

Це корисно, коли потрібно знайти багато рядків, але індекс все одно допомагає визначити, які сторінки таблиці потрібно прочитати.

Для Junior достатньо знати:

    Seq Scan
    Index Scan
    Bitmap Index Scan

і розуміти загальну ідею.

---

# 10. B-tree — основний тип індексу

У PostgreSQL типовий індекс:

    B-tree

Якщо просто написати:

    CREATE INDEX idx_users_email
    ON users(email);

PostgreSQL за замовчуванням створить `B-tree` index.

B-tree добре підходить для:

- `=`;
- `<`;
- `<=`;
- `>`;
- `>=`;
- `BETWEEN`;
- сортування;
- деяких prefix-пошуків.

---

# 11. Приклад B-tree

    CREATE INDEX idx_products_price
    ON products(price);

Тепер індекс може бути корисним для:

    SELECT *
    FROM products
    WHERE price > 100;

або:

    SELECT *
    FROM products
    WHERE price BETWEEN 100 AND 500;

або:

    SELECT *
    FROM products
    ORDER BY price;

---

# 12. UNIQUE INDEX

Можна створити унікальний індекс:

    CREATE UNIQUE INDEX idx_users_email_unique
    ON users(email);

Тоді PostgreSQL не дозволить повторювати `email`.

Але якщо мета саме **гарантувати унікальність**, зазвичай краще використовувати:

    CONSTRAINT users_email_unique
        UNIQUE (email)

PostgreSQL при цьому створить необхідний унікальний індекс.

---

# 13. Constraint та Index

Важливо розрізняти:

    UNIQUE constraint
    ↓
    гарантує унікальність

    INDEX
    ↓
    допомагає швидше знаходити дані

Наприклад:

    email TEXT UNIQUE

не просто створює структуру для швидкого пошуку.

Вона ще й гарантує:

> два однакові email не можуть існувати.

---

# 14. Індекс на PRIMARY KEY

Коли створюється:

    CREATE TABLE users (
        id INTEGER PRIMARY KEY
    );

PostgreSQL автоматично створює унікальний індекс, необхідний для `PRIMARY KEY`.

Тому не потрібно додатково робити:

    CREATE INDEX idx_users_id
    ON users(id);

це зазвичай буде зайвим.

---

# 15. Індекс на UNIQUE

Аналогічно:

    email TEXT UNIQUE

створює необхідну індексну структуру для забезпечення унікальності.

Тому не треба автоматично створювати ще один:

    CREATE INDEX idx_users_email
    ON users(email);

якщо такий самий індекс уже існує через `UNIQUE`.

---

# 16. Коли індекс особливо корисний

Індекси часто потрібні для колонок, які використовуються у:

    WHERE

    JOIN

    ORDER BY

    GROUP BY

    UNIQUE

Наприклад:

    SELECT *
    FROM users
    WHERE email = 'test@example.com';

або:

    SELECT *
    FROM orders
    WHERE user_id = 10;

або:

    SELECT *
    FROM orders
    ORDER BY created_at DESC;

---

# 17. Індекс для WHERE

Є:

    SELECT *
    FROM users
    WHERE email = 'test@example.com';

Можна створити:

    CREATE INDEX idx_users_email
    ON users(email);

---

# 18. Індекс для JOIN

Є:

    users.id
    orders.user_id

Запит:

    SELECT
        users.name,
        orders.total
    FROM users
    JOIN orders
        ON orders.user_id = users.id;

Індекс на:

    orders.user_id

може бути дуже корисним:

    CREATE INDEX idx_orders_user_id
    ON orders(user_id);

---

# 19. Чому FOREIGN KEY не завжди автоматично створює index

Це дуже важливий момент.

Якщо є:

    user_id INTEGER
        REFERENCES users(id)

PostgreSQL не створює автоматично звичайний індекс на:

    orders.user_id

Тому в реальних таблицях часто створюють:

    CREATE INDEX idx_orders_user_id
    ON orders(user_id);

Особливо якщо:

- часто шукаємо orders за user;
- часто робимо JOIN;
- таблиця велика;
- часто видаляємо або оновлюємо parent rows.

---

# 20. Індекс для ORDER BY

Запит:

    SELECT *
    FROM orders
    ORDER BY created_at DESC;

Можна створити:

    CREATE INDEX idx_orders_created_at
    ON orders(created_at);

PostgreSQL може використати цей індекс для ефективного отримання даних у потрібному порядку.

---

# 21. Індекс для LIMIT

Особливо цікавий випадок:

    SELECT *
    FROM orders
    ORDER BY created_at DESC
    LIMIT 20;

Індекс на:

    created_at

може дозволити PostgreSQL швидко отримати найновіші записи, не сортуючи всю таблицю.

Це дуже поширений pattern для:

- latest posts;
- recent orders;
- newest messages;
- activity feeds.

---

# 22. Composite Index

Індекс може містити декілька колонок.

    CREATE INDEX idx_orders_user_created
    ON orders(user_id, created_at);

Це називається:

> Composite Index

або:

> Multi-column Index.

---

# 23. Порядок колонок має значення

Розглянемо:

    CREATE INDEX idx_orders_user_created
    ON orders(user_id, created_at);

Індекс організований приблизно за:

    user_id
        ↓
    created_at

Тому він особливо добре підходить для:

    WHERE user_id = 10

та:

    WHERE user_id = 10
    ORDER BY created_at DESC;

---

# 24. Leftmost prefix

Для composite index:

    (user_id, created_at)

першою колонкою є:

    user_id

Тому індекс добре підходить для:

    WHERE user_id = 10

і:

    WHERE user_id = 10
    AND created_at > '2026-01-01'

Але не варто автоматично очікувати такої ж ефективності для:

    WHERE created_at > '2026-01-01'

без фільтрації за `user_id`.

Тому порядок колонок у composite index дуже важливий.

---

# 25. Приклад правильного composite index

Запит:

    SELECT *
    FROM orders
    WHERE user_id = 10
    ORDER BY created_at DESC
    LIMIT 20;

Індекс:

    CREATE INDEX idx_orders_user_created
    ON orders(user_id, created_at DESC);

може бути дуже доречним.

Тут індекс відповідає структурі запиту:

    user_id
       ↓
    created_at
       ↓
    LIMIT 20

---

# 26. Index на кілька колонок ≠ кілька окремих index

Не завжди:

    INDEX (user_id, created_at)

можна замінити на:

    INDEX (user_id)

    INDEX (created_at)

Це різні структури.

Composite index:

    (user_id, created_at)

може бути оптимальнішим для запитів, які використовують обидві колонки.

---

# 27. Partial Index

`Partial Index` індексує тільки частину таблиці.

Наприклад, є orders:

    status
    ├── pending
    ├── paid
    └── cancelled

Якщо дуже часто потрібні тільки активні замовлення:

    status = 'pending'

можна:

    CREATE INDEX idx_orders_pending
    ON orders(created_at)
    WHERE status = 'pending';

Тепер індекс містить не всі orders, а тільки:

    status = 'pending'

---

# 28. Навіщо Partial Index

Переваги:

- менший індекс;
- менше місця;
- менше роботи при обслуговуванні;
- може бути ефективнішим для конкретного запиту.

Наприклад:

    SELECT *
    FROM orders
    WHERE status = 'pending'
    ORDER BY created_at DESC;

---

# 29. Expression Index

Іноді запит використовує не саме значення колонки, а вираз.

Наприклад:

    SELECT *
    FROM users
    WHERE LOWER(email) = 'user@example.com';

Звичайний індекс:

    CREATE INDEX idx_users_email
    ON users(email);

може не дати очікуваного ефекту для такого виразу.

Можна створити:

    CREATE INDEX idx_users_lower_email
    ON users(LOWER(email));

Тепер індекс відповідає виразу запиту.

---

# 30. Expression Index — інший приклад

    CREATE INDEX idx_products_lower_name
    ON products(LOWER(name));

Тоді:

    SELECT *
    FROM products
    WHERE LOWER(name) = 'keyboard';

може використовувати цей індекс.

---

# 31. GIN Index

`GIN` — спеціалізований тип індексу.

Він часто використовується для:

- `JSONB`;
- arrays;
- full-text search.

Наприклад, якщо:

    metadata JSONB

можна використовувати:

    CREATE INDEX idx_products_metadata
    ON products
    USING GIN (metadata);

---

# 32. GIN і JSONB

Наприклад:

    SELECT *
    FROM products
    WHERE metadata @> '{"brand": "Logitech"}';

GIN index може бути дуже корисним для такого типу пошуку.

Детальніше `JSONB` та GIN краще вивчати разом із розділом:

    20-json-and-jsonb

---

# 33. GiST Index

`GiST` — Generalized Search Tree.

Це framework для індексів, який використовується для різних типів даних та операторів.

Може застосовуватися, наприклад, для:

- геометричних даних;
- range types;
- full-text search;
- спеціалізованих extension.

Для Junior достатньо знати:

    B-tree
    → основний універсальний варіант

    GIN
    → JSONB / arrays / full-text

    GiST
    → спеціалізовані типи та оператори

---

# 34. BRIN Index

`BRIN`:

> Block Range Index

Він дуже компактний і корисний для дуже великих таблиць, де значення фізично корелюють із порядком рядків.

Типовий приклад:

    created_at

у великій таблиці подій:

    events

де записи додаються приблизно в хронологічному порядку.

Наприклад:

    CREATE INDEX idx_events_created_brin
    ON events
    USING BRIN (created_at);

BRIN може бути набагато меншим за B-tree.

---

# 35. B-tree vs GIN vs GiST vs BRIN

| Тип | Типове використання |
|---|---|
| `B-tree` | звичайний пошук, сортування, range |
| `GIN` | JSONB, arrays, full-text |
| `GiST` | спеціалізовані типи, ranges, геодані |
| `BRIN` | дуже великі таблиці з фізично корельованими даними |

Для початку:

> **B-tree — основний тип, який потрібно знати найкраще.**

---

# 36. Index не завжди прискорює запит

Це одна з найважливіших речей.

Є:

    100 rows

і запит:

    WHERE active = true

Якщо:

    95 rows → true
    5 rows → false

індекс на `active` може бути не дуже корисним.

PostgreSQL може вирішити:

> простіше прочитати всю таблицю.

---

# 37. Selectivity

`Selectivity` — наскільки добре умова відсіює рядки.

Наприклад:

    email

майже завжди унікальний:

    user@example.com
    other@example.com
    third@example.com

Висока selectivity.

А:

    gender
    active
    status

можуть мати мало різних значень.

Наприклад:

    active = true

може відповідати 95% таблиці.

Такі колонки часто мають нижчу selectivity.

---

# 38. Висока та низька selectivity

Приблизно:

    email
    ↓
    багато різних значень
    ↓
    висока selectivity

    status
    ↓
    кілька можливих значень
    ↓
    низька selectivity

Але це не означає:

> "ніколи не створюй index на status".

Рішення залежить від реальних запитів та розподілу даних.

---

# 39. Index має ціну

Кожен index:

- займає місце;
- потрібно підтримувати;
- впливає на `INSERT`;
- впливає на `UPDATE`;
- впливає на `DELETE`.

Наприклад:

    INSERT INTO users (...)

повинен змінити:

    users table

і відповідні indexes.

Тому:

> більше indexes ≠ завжди швидше.

---

# 40. Чому багато індексів — погано

Уявимо:

    users

і 20 різних indexes.

При:

    INSERT

PostgreSQL повинен оновлювати всі відповідні індекси.

Отже:

    швидший SELECT
         +
    дорожчий INSERT/UPDATE/DELETE

Тому indexes потрібно створювати не "на всяк випадок", а відповідно до реальних запитів.

---

# 41. UPDATE і indexes

Якщо змінюється колонка, яка входить в index:

    UPDATE users
    SET email = 'new@example.com'
    WHERE id = 1;

PostgreSQL повинен підтримувати індекс `email`.

Тому index має вартість не тільки при `INSERT`, а й при відповідних `UPDATE`.

---

# 42. DELETE і indexes

При:

    DELETE FROM users
    WHERE id = 1;

PostgreSQL також повинен підтримувати пов'язані індексні структури.

Тому:

    SELECT
    INSERT
    UPDATE
    DELETE

усі можуть бути пов'язані з вартістю indexes.

---

# 43. Індекс і пам'ять

Під час роботи PostgreSQL індекси можуть активно використовуватися з пам'яті.

Чим більше indexes:

    більше disk space
    +
    більше memory pressure
    +
    більше maintenance

Тому індексація — це balance між:

    read performance

та:

    write performance

---

# 44. Як подивитися indexes у psql

У `psql`:

    \d users

або:

    \d+ users

можна побачити indexes.

Також можна використати системний каталог:

    SELECT indexname, indexdef
    FROM pg_indexes
    WHERE tablename = 'users';

---

# 45. Як видалити index

    DROP INDEX idx_users_email;

Якщо index більше не потрібен.

---

# 46. CREATE INDEX CONCURRENTLY

Для production-середовища існує:

    CREATE INDEX CONCURRENTLY idx_users_email
    ON users(email);

Це дозволяє створювати індекс із меншим блокуванням звичайних операцій над таблицею.

Але:

- операція складніша;
- має свої обмеження;
- не може виконуватися всередині звичайної транзакції.

Для Junior достатньо знати, що:

> `CONCURRENTLY` важливий для створення/видалення індексів на production-таблицях із мінімізацією блокувань.

---

# 47. Index і LIKE

Запит:

    SELECT *
    FROM users
    WHERE email LIKE 'val%';

може використовувати B-tree index у відповідних умовах.

Але:

    WHERE email LIKE '%val%';

значно складніше оптимізувати за допомогою звичайного B-tree.

Причина:

    '%val%'

означає пошук підрядка в довільному місці.

Для таких задач можуть знадобитися інші підходи, наприклад спеціальні operator classes або full-text search.

---

# 48. Index і ORDER BY + WHERE

Один із дуже практичних випадків:

    SELECT *
    FROM orders
    WHERE user_id = 10
    ORDER BY created_at DESC
    LIMIT 20;

Відповідний composite index:

    CREATE INDEX idx_orders_user_created
    ON orders(user_id, created_at DESC);

може бути дуже ефективним.

Це хороший приклад того, як index проектується **від запиту**, а не просто від структури таблиці.

---

# 49. Index design від запитів

Не потрібно думати:

> "На яку колонку поставити index?"

Краще думати:

> "Які запити найчастіше виконуються?"

Наприклад:

    SELECT *
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 20;

Після цього проектуємо index:

    (user_id, created_at DESC)

Це значно правильніший підхід.

---

# 50. Покроковий алгоритм створення index

### Крок 1

Знайди повільний запит.

### Крок 2

Подивись:

    EXPLAIN ANALYZE

### Крок 3

Визнач:

- `WHERE`;
- `JOIN`;
- `ORDER BY`;
- `LIMIT`;
- кількість рядків.

### Крок 4

Створи відповідний index.

### Крок 5

Знову:

    EXPLAIN ANALYZE

### Крок 6

Порівняй результат.

---

# 51. Не створюй indexes навмання

Поганий підхід:

    CREATE INDEX idx_users_name ON users(name);
    CREATE INDEX idx_users_age ON users(age);
    CREATE INDEX idx_users_active ON users(active);
    CREATE INDEX idx_users_created ON users(created_at);
    CREATE INDEX idx_users_status ON users(status);

тільки тому, що "можливо знадобляться".

Кращий підхід:

    query
      ↓
    EXPLAIN ANALYZE
      ↓
    bottleneck
      ↓
    index
      ↓
    EXPLAIN ANALYZE
      ↓
    compare

---

# 52. Index-only scan

У деяких ситуаціях PostgreSQL може отримати необхідні дані без повного звернення до таблиці.

Це називається:

    Index Only Scan

Наприклад, якщо index містить потрібні колонки для запиту.

Для Junior достатньо розуміти:

> іноді PostgreSQL може отримати достатньо інформації без читання самих heap pages таблиці.

---

# 53. INCLUDE

PostgreSQL дозволяє додавати додаткові колонки до index через:

    INCLUDE

Наприклад:

    CREATE INDEX idx_users_email
    ON users(email)
    INCLUDE (name);

Тут:

    email

є основною indexed column,

а:

    name

зберігається в index як додаткова payload column.

Це може допомогти для `Index Only Scan`.

---

# 54. Partial + UNIQUE

Можна створити partial unique index.

Наприклад, потрібно дозволити тільки одного активного запису певного типу:

    CREATE UNIQUE INDEX idx_active_user
    ON user_profiles(user_id)
    WHERE active = true;

Це вже advanced technique.

---

# 55. Коли НЕ потрібно створювати index

Не потрібно автоматично створювати index:

- на кожну колонку;
- на маленьку таблицю;
- на кожен `BOOLEAN`;
- на кожен `TEXT`;
- тільки тому, що колонка існує.

Потрібно дивитися на:

- реальні запити;
- розмір таблиці;
- selectivity;
- частоту читання;
- частоту запису;
- execution plan.

---

# 56. Index і маленькі таблиці

Для таблиці:

    20 rows

PostgreSQL часто вибере:

    Seq Scan

навіть якщо існує index.

Це нормально.

Індекс не є магічною кнопкою:

    index = faster always

Насправді:

    index = tool
    ↓
    PostgreSQL chooses
    ↓
    based on cost

---

# 57. Query Planner

PostgreSQL має:

    Query Planner / Optimizer

Він оцінює різні способи виконання запиту.

Наприклад:

    Seq Scan

або:

    Index Scan

або:

    Bitmap Scan

і вибирає план із найменшою очікуваною вартістю.

Тому наявність index не означає автоматично, що PostgreSQL його використає.

---

# 58. Statistics

Planner використовує статистику про дані.

PostgreSQL збирає statistics для колонок і використовує їх для оцінки:

    кількості рядків
    selectivity
    distribution
    cost

Тому після великих змін у даних важливе:

    ANALYZE

Наприклад:

    ANALYZE users;

---

# 59. EXPLAIN — що дивитися Junior

На початку звертай увагу на:

    Seq Scan
    Index Scan
    Bitmap Index Scan
    Index Only Scan

а також:

    cost
    rows
    actual time

При:

    EXPLAIN ANALYZE

особливо цікаво порівнювати:

    estimated rows

та:

    actual rows

---

# 60. Практичний приклад

Створимо:

    CREATE TABLE users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        age INTEGER,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

`PRIMARY KEY` та `UNIQUE` вже забезпечують необхідні індекси.

Додамо index для:

    created_at

    CREATE INDEX idx_users_created_at
    ON users(created_at);

---

# 61. Перевірка index

    EXPLAIN
    SELECT *
    FROM users
    WHERE email = 'test@example.com';

Подивись, чи використовується структура, пов'язана з unique index.

Потім:

    EXPLAIN
    SELECT *
    FROM users
    ORDER BY created_at DESC
    LIMIT 10;

Подивись execution plan.

---

# 62. Практика №1 — простий index

Створи:

    products

з полями:

    id
    name
    price

Додай:

    CREATE INDEX idx_products_price
    ON products(price);

Після цього виконай:

    EXPLAIN
    SELECT *
    FROM products
    WHERE price > 100;

---

# 63. Практика №2 — порівняння

Створи таблицю з великою кількістю записів.

Наприклад:

    CREATE TABLE numbers (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        value INTEGER NOT NULL
    );

Заповни її великою кількістю даних.

Потім:

    EXPLAIN ANALYZE
    SELECT *
    FROM numbers
    WHERE value = 500000;

Створи:

    CREATE INDEX idx_numbers_value
    ON numbers(value);

Повтори:

    EXPLAIN ANALYZE
    SELECT *
    FROM numbers
    WHERE value = 500000;

Порівняй execution plans.

---

# 64. Практика №3 — JOIN

Створи:

    users
    orders

Зв'язок:

    orders.user_id → users.id

Створи багато orders.

Перевір:

    EXPLAIN ANALYZE
    SELECT
        users.name,
        orders.total
    FROM users
    JOIN orders
        ON orders.user_id = users.id
    WHERE users.id = 10;

Потім створи:

    CREATE INDEX idx_orders_user_id
    ON orders(user_id);

Знову виконай:

    EXPLAIN ANALYZE

Порівняй.

---

# 65. Практика №4 — composite index

Запит:

    SELECT *
    FROM orders
    WHERE user_id = 10
    ORDER BY created_at DESC
    LIMIT 20;

Створи:

    CREATE INDEX idx_orders_user_created
    ON orders(user_id, created_at DESC);

Потім перевір через:

    EXPLAIN ANALYZE

---

# 66. Практика №5 — порядок колонок

Створи:

    CREATE INDEX idx_orders_created_user
    ON orders(created_at, user_id);

Порівняй його з:

    CREATE INDEX idx_orders_user_created
    ON orders(user_id, created_at);

Подумай:

> який index краще відповідає запиту?

    WHERE user_id = 10
    ORDER BY created_at DESC

---

# 67. Практика №6 — partial index

Є:

    orders

зі статусами:

    pending
    paid
    cancelled

Створи:

    CREATE INDEX idx_orders_pending_created
    ON orders(created_at)
    WHERE status = 'pending';

Перевір:

    EXPLAIN ANALYZE
    SELECT *
    FROM orders
    WHERE status = 'pending'
    ORDER BY created_at DESC;

---

# 68. Практика №7 — expression index

Створи:

    CREATE INDEX idx_users_lower_email
    ON users(LOWER(email));

Перевір:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE LOWER(email) = 'test@example.com';

---

# 69. Практика №8 — знайди зайві indexes

Створи:

    idx_users_email
    idx_users_email_2
    idx_users_name
    idx_users_age

Потім проаналізуй:

> які з них реально потрібні?

Зверни увагу, що `email UNIQUE` вже має відповідну індексну структуру.

---

# 70. Практика №9 — Index vs Seq Scan

Створи таблицю:

    test_data

з великою кількістю записів.

Виконай:

    EXPLAIN ANALYZE
    SELECT *
    FROM test_data
    WHERE value = 123;

Створи index.

Повтори запит.

Після цього зміни умову так, щоб вона повертала більшість рядків.

Подивись, чи PostgreSQL все ще використовує index.

Це дозволить побачити, що:

> planner вибирає index не завжди.

---

# 71. Практика №10 — production thinking

Уяви реальний API:

    GET /users/:id/orders

SQL:

    SELECT *
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 20;

Подумай:

> який index потрібен?

Очікувана ідея:

    (user_id, created_at DESC)

Після цього перевір її через:

    EXPLAIN ANALYZE

---

# 72. Типові помилки

## ❌ Помилка 1

Створити index на кожну колонку.

Правильніше:

    query
    ↓
    performance problem
    ↓
    EXPLAIN ANALYZE
    ↓
    index

---

## ❌ Помилка 2

Вважати, що index завжди використовується.

Насправді:

    PostgreSQL planner
        ↓
    оцінює cost
        ↓
    вибирає план

---

## ❌ Помилка 3

Створювати окремий index, коли вже існує `UNIQUE`.

Наприклад:

    email TEXT UNIQUE

і додатково:

    CREATE INDEX idx_users_email
    ON users(email);

може бути зайвим дублюванням.

---

## ❌ Помилка 4

Ігнорувати composite indexes.

Якщо реальний запит використовує:

    WHERE user_id = ?
    ORDER BY created_at

можливо, краще:

    (user_id, created_at)

ніж два незалежних indexes.

---

## ❌ Помилка 5

Забути про write performance.

Indexes:

    SELECT ↑
    INSERT ↓
    UPDATE ↓
    DELETE ↓

не буквально завжди саме в такій пропорції, але загальна ідея така:

> indexes прискорюють певні reads, але додають maintenance cost.

---

# 73. Indexes і Constraints

Зв'язок із попереднім розділом:

    14-constraints

Особливо:

    PRIMARY KEY
        ↓
    unique index

    UNIQUE
        ↓
    unique index

Тобто constraints і indexes тісно пов'язані.

Але:

    constraint
    → правило цілісності

    index
    → структура для ефективного доступу до даних

---

# 74. Indexes і JOIN

Після `12-joins` це особливо важливо.

Запит:

    SELECT *
    FROM orders
    JOIN users
        ON orders.user_id = users.id;

Має:

    users.id
    ↓
    PRIMARY KEY
    ↓
    index існує

А:

    orders.user_id
    ↓
    FOREIGN KEY
    ↓
    index автоматично не створюється

Тому часто потрібно:

    CREATE INDEX idx_orders_user_id
    ON orders(user_id);

---

# 75. Indexes і Subqueries

Після:

    13-subqueries

можна побачити іншу важливу картину.

Запит:

    SELECT *
    FROM orders
    WHERE user_id IN (
        SELECT id
        FROM users
        WHERE active = true
    );

Indexes можуть допомагати PostgreSQL ефективно виконувати окремі частини такого запиту.

Але остаточне рішення завжди потрібно перевіряти через:

    EXPLAIN ANALYZE

---

# 76. Indexes і Pagination

Поганий для дуже великих таблиць підхід:

    SELECT *
    FROM orders
    ORDER BY created_at DESC
    OFFSET 100000
    LIMIT 20;

Навіть з index великий `OFFSET` може бути дорогим.

Для великих dataset часто використовують:

> Keyset / Cursor Pagination.

Наприклад:

    SELECT *
    FROM orders
    WHERE created_at < '2026-09-01 12:00:00'
    ORDER BY created_at DESC
    LIMIT 20;

Відповідний index може зробити такий підхід дуже ефективним.

Це стане важливою темою під час побудови реального API.

---

# 77. Indexes і Full-Text Search

Для пошуку тексту:

    WHERE description LIKE ...

звичайний B-tree не завжди є найкращим рішенням.

PostgreSQL має:

    Full-Text Search

і спеціальні індекси, зокрема:

    GIN

Наприклад:

    tsvector
        ↓
    GIN index

Це окрема тема, яку можна розглядати пізніше.

---

# 78. Найважливіші типи для Junior

Ти повинен добре знати:

    B-tree

і розуміти:

    Composite Index
    Partial Index
    Expression Index

А на рівні огляду:

    GIN
    GiST
    BRIN

Не потрібно одразу запам'ятовувати всі внутрішні алгоритми.

---

# 79. Що повинен уміти Junior Full Stack Developer

Ти повинен уміти:

    CREATE INDEX

    DROP INDEX

    EXPLAIN

    EXPLAIN ANALYZE

і розуміти:

    Seq Scan
    Index Scan
    Bitmap Scan
    Index Only Scan

Також:

- знати, навіщо потрібні indexes;
- розуміти їхню ціну;
- розуміти composite indexes;
- знати, що `PRIMARY KEY` та `UNIQUE` мають індексну підтримку;
- знати, що `FOREIGN KEY` не означає автоматичний index на referencing column;
- розуміти, що PostgreSQL сам вирішує, чи використовувати index.

---

# 80. Контрольні питання

Перед переходом далі спробуй відповісти:

1. Що таке database index?
2. Навіщо він потрібен?
3. Яка аналогія між index у БД та index у книзі?
4. Що таке `Seq Scan`?
5. Що таке `Index Scan`?
6. Для чого потрібен `EXPLAIN`?
7. Чим `EXPLAIN` відрізняється від `EXPLAIN ANALYZE`?
8. Який тип index PostgreSQL використовує за замовчуванням?
9. Що таке B-tree?
10. Що таке composite index?
11. Чому порядок колонок у composite index важливий?
12. Що таке partial index?
13. Що таке expression index?
14. Для чого використовується GIN?
15. Для чого може використовуватися BRIN?
16. Чому PostgreSQL може не використовувати index?
17. Що таке selectivity?
18. Чому багато indexes можуть бути проблемою?
19. Чи створює `PRIMARY KEY` індекс?
20. Чи створює `UNIQUE` необхідну індексну структуру?
21. Чи створює `FOREIGN KEY` автоматично index на дочірній колонці?
22. Як видалити index?
23. Як знайти indexes у `psql`?
24. Для чого потрібен `CREATE INDEX CONCURRENTLY`?
25. Як пов'язаний index із `ORDER BY`?
26. Як пов'язаний index із `JOIN`?
27. Як пов'язаний index із pagination?

---

# 81. Junior → Middle → Advanced

## 🟢 Junior

Знати:

    CREATE INDEX

    DROP INDEX

    EXPLAIN

    EXPLAIN ANALYZE

    B-tree

    PRIMARY KEY
    UNIQUE

    Seq Scan
    Index Scan

Розуміти:

    index → швидший доступ
    index → додаткові витрати на записи

---

## 🟡 Middle

Розуміти:

    Composite Index
    Partial Index
    Expression Index

та:

    selectivity
    query planner
    statistics
    Bitmap Scan
    Index Only Scan

Вміти проектувати index під конкретний query pattern.

---

## 🔴 Advanced

Вивчати:

    GIN
    GiST
    BRIN

    INCLUDE

    CREATE INDEX CONCURRENTLY

    operator classes

    index maintenance

    bloat

    VACUUM

    ANALYZE

    advanced query optimization

    keyset pagination

---

# 82. Головна практична формула

Не:

    "На цю колонку поставимо index."

А:

    Реальний запит
          ↓
    EXPLAIN ANALYZE
          ↓
    Query Plan
          ↓
    Bottleneck
          ↓
    Index
          ↓
    EXPLAIN ANALYZE
          ↓
    Порівняння

Це вже початок реального database performance thinking.

---

# 83. Ментальна модель

Запам'ятай:

    TABLE
      │
      ├── DATA
      │
      └── INDEX
            │
            ├── швидший пошук
            ├── швидший JOIN
            ├── швидше сортування
            │
            └── ціна:
                  ├── disk space
                  ├── INSERT cost
                  ├── UPDATE cost
                  └── DELETE cost

---

# 🔑 Головне з розділу

    INDEX
    → структура для швидшого доступу до даних

    B-tree
    → основний тип index у PostgreSQL

    EXPLAIN
    → показує план виконання

    EXPLAIN ANALYZE
    → реально виконує запит і показує фактичні результати

    Seq Scan
    → послідовне читання таблиці

    Index Scan
    → використання index для пошуку

    Composite Index
    → index на кількох колонках

    Partial Index
    → index тільки для частини рядків

    Expression Index
    → index на результаті виразу

    GIN
    → JSONB / arrays / full-text та інші спеціалізовані задачі

    BRIN
    → дуже великі таблиці з кореляцією даних

Головна ідея:

> **Index — це не "магічне прискорення", а інструмент оптимізації конкретних запитів.**

І ще важливіше:

> **Хороший database developer проектує indexes від реальних query patterns і перевіряє результат через EXPLAIN ANALYZE.**
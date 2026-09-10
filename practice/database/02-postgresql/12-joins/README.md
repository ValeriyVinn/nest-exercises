# 12 — JOIN у PostgreSQL

## 📌 Мета

Навчитися об'єднувати дані з декількох таблиць за допомогою `JOIN`.

Після цього розділу ти повинен розуміти:

- навіщо потрібні `JOIN`;
- що таке зв'язок між таблицями;
- як працює `INNER JOIN`;
- як працює `LEFT JOIN`;
- коли використовувати `RIGHT JOIN`;
- що робить `FULL OUTER JOIN`;
- що таке `CROSS JOIN`;
- що таке `SELF JOIN`;
- як працює `ON`;
- різницю між `ON` та `WHERE`;
- як `JOIN` пов'язаний з `PRIMARY KEY` та `FOREIGN KEY`;
- як об'єднувати більше двох таблиць;
- як використовувати `JOIN` разом із `GROUP BY`;
- як `JOIN` впливає на `COUNT`, `SUM`, `AVG`;
- як знаходити записи без відповідностей;
- як працювати з `NULL` після `LEFT JOIN`;
- як уникати дублювання рядків;
- як використовувати `JOIN` у реальних backend-запитах.

---

# 1. Навіщо потрібен JOIN

У реляційній базі даних інформація зазвичай розділена між таблицями.

Наприклад:

    users

    id | name
    ---|------
    1  | Valeriy
    2  | Anna
    3  | John

    orders

    id | user_id | total_amount
    ---|---------|-------------
    1  | 1       | 500
    2  | 1       | 1000
    3  | 2       | 700

У `users` зберігаються користувачі.

У `orders` — їхні замовлення.

Між таблицями є зв'язок:

    users.id
        ↑
        |
    orders.user_id

Щоб отримати:

    ім'я користувача + його замовлення

потрібен `JOIN`.

---

# 2. Основна ідея JOIN

Спрощено:

    JOIN = об'єднати рядки з різних таблиць
           за певною умовою

Наприклад:

    users.id = orders.user_id

Тобто PostgreSQL шукає рядки, де:

    users.id
        =
    orders.user_id

---

# 3. Зв'язок PRIMARY KEY → FOREIGN KEY

Типова структура:

    users
    ┌──────────────┐
    │ id PK        │
    │ name         │
    └──────────────┘
           │
           │ 1:N
           ↓
    orders
    ┌──────────────┐
    │ id PK        │
    │ user_id FK   │
    │ total_amount │
    └──────────────┘

Тут:

    users.id

є:

    PRIMARY KEY

а:

    orders.user_id

є:

    FOREIGN KEY

При цьому сам `JOIN` не обов'язково вимагає `FOREIGN KEY`.

PostgreSQL може виконати:

    JOIN ... ON table1.column = table2.column

навіть якщо формального FK constraint немає.

Але в добре спроєктованій реляційній БД такий зв'язок зазвичай явно описується через `FOREIGN KEY`.

---

# 4. Базовий синтаксис

    SELECT columns
    FROM table1
    JOIN table2
        ON table1.column = table2.column;

Наприклад:

    SELECT
        users.name,
        orders.total_amount
    FROM users
    JOIN orders
        ON users.id = orders.user_id;

---

# 5. Аліаси таблиць

У реальних запитах часто використовують короткі alias.

    SELECT
        u.name,
        o.total_amount
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id;

Тепер:

    u → users

    o → orders

Це робить складні запити значно читабельнішими.

---

# 6. Чому краще явно вказувати таблицю

Замість:

    SELECT name, total_amount
    FROM users
    JOIN orders
        ON users.id = orders.user_id;

краще:

    SELECT
        users.name,
        orders.total_amount
    FROM users
    JOIN orders
        ON users.id = orders.user_id;

Або з alias:

    SELECT
        u.name,
        o.total_amount
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id;

Особливо це важливо, коли в обох таблицях є однакові назви колонок:

    id
    created_at
    name
    status

---

# 7. INNER JOIN

`INNER JOIN` повертає тільки ті рядки, для яких існує відповідність в обох таблицях.

Синтаксис:

    SELECT ...
    FROM table1
    INNER JOIN table2
        ON condition;

Слово `INNER` можна не писати:

    JOIN

означає:

    INNER JOIN

---

# 8. Простий INNER JOIN

    SELECT
        u.name,
        o.total_amount
    FROM users AS u
    INNER JOIN orders AS o
        ON u.id = o.user_id;

Або:

    SELECT
        u.name,
        o.total_amount
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id;

Це однаково.

---

# 9. Що повертає INNER JOIN

Якщо:

    users

    id | name
    ---|-------
    1  | Anna
    2  | John
    3  | Maria

    orders

    id | user_id
    ---|--------
    10 | 1
    11 | 1
    12 | 2

то:

    SELECT
        u.name,
        o.id AS order_id
    FROM users AS u
    INNER JOIN orders AS o
        ON u.id = o.user_id;

результат:

    name  | order_id
    ------|---------
    Anna  | 10
    Anna  | 11
    John  | 12

`Maria` не потрапила в результат, тому що в неї немає замовлень.

---

# 10. Головна властивість INNER JOIN

    INNER JOIN

залишає:

    тільки matching rows

Тобто:

    users ───── orders
       \         /
        \       /
         matching

Тільки спільні відповідності.

---

# 11. LEFT JOIN

`LEFT JOIN` повертає:

- всі рядки з лівої таблиці;
- відповідні рядки з правої таблиці;
- `NULL`, якщо відповідності немає.

Синтаксис:

    SELECT ...
    FROM table1
    LEFT JOIN table2
        ON condition;

---

# 12. Простий LEFT JOIN

    SELECT
        u.name,
        o.id AS order_id
    FROM users AS u
    LEFT JOIN orders AS o
        ON u.id = o.user_id;

Якщо користувач не має замовлень:

    name  | order_id
    ------|---------
    Maria | NULL

Користувач не зникає.

---

# 13. INNER JOIN vs LEFT JOIN

Припустимо:

    users

    Anna
    John
    Maria

    orders

    Anna → 2 orders
    John → 1 order
    Maria → 0 orders

`INNER JOIN`:

    Anna
    Anna
    John

`LEFT JOIN`:

    Anna
    Anna
    John
    Maria

Головне:

    INNER JOIN
    → тільки ті, хто має відповідність

    LEFT JOIN
    → всі з лівої таблиці

---

# 14. Коли використовувати LEFT JOIN

Типова задача:

> Показати всіх користувачів та кількість їхніх замовлень.

    SELECT
        u.id,
        u.name,
        COUNT(o.id) AS order_count
    FROM users AS u
    LEFT JOIN orders AS o
        ON u.id = o.user_id
    GROUP BY u.id, u.name;

Користувачі без замовлень теж будуть у результаті:

    name  | order_count
    ------|------------
    Anna  | 2
    John  | 1
    Maria | 0

---

# 15. Чому тут COUNT(o.id), а не COUNT(*)

Це дуже важливо.

При `LEFT JOIN` для користувача без замовлення утворюється рядок приблизно такого вигляду:

    u.id | u.name | o.id
    -----|--------|-----
    3    | Maria  | NULL

Тому:

    COUNT(o.id)

не рахує цей рядок.

Результат:

    0

А:

    COUNT(*)

порахує сам рядок `LEFT JOIN`.

Тому для кількості пов'язаних записів часто використовують:

    COUNT(related_table.id)

---

# 16. Знайти записи без відповідності

`LEFT JOIN` дуже корисний для пошуку:

> користувачів, які не мають замовлень.

    SELECT
        u.id,
        u.name
    FROM users AS u
    LEFT JOIN orders AS o
        ON u.id = o.user_id
    WHERE o.id IS NULL;

Логіка:

    LEFT JOIN
       ↓
    всі users
       ↓
    users без orders
       ↓
    o.id = NULL
       ↓
    WHERE o.id IS NULL

---

# 17. Це важливий SQL-патерн

Запам'ятай:

    LEFT JOIN
    +
    WHERE right_table.id IS NULL

часто використовується для пошуку:

    "записів, для яких немає пов'язаних записів"

Наприклад:

    користувачі без замовлень

    товари без категорії

    студенти без оцінок

    пацієнти без записів

    клієнти без платежів

---

# 18. RIGHT JOIN

`RIGHT JOIN` зберігає всі рядки з правої таблиці.

    SELECT ...
    FROM users AS u
    RIGHT JOIN orders AS o
        ON u.id = o.user_id;

Практично `RIGHT JOIN` використовується рідше.

У більшості випадків можна просто поміняти таблиці місцями та використати `LEFT JOIN`.

Наприклад:

    users RIGHT JOIN orders

можна переписати як:

    orders LEFT JOIN users

Тому для читабельності багато розробників віддають перевагу `LEFT JOIN`.

---

# 19. FULL OUTER JOIN

`FULL OUTER JOIN` повертає:

- всі рядки лівої таблиці;
- всі рядки правої таблиці;
- matching rows об'єднуються;
- для відсутньої відповідності з іншого боку буде `NULL`.

Синтаксис:

    SELECT ...
    FROM table1
    FULL OUTER JOIN table2
        ON condition;

---

# 20. Приклад FULL OUTER JOIN

    SELECT
        u.id AS user_id,
        u.name,
        o.id AS order_id
    FROM users AS u
    FULL OUTER JOIN orders AS o
        ON u.id = o.user_id;

Це дозволяє побачити:

    users з orders
    users без orders
    orders без відповідного user

У звичайному backend-коді `FULL OUTER JOIN` зустрічається рідше, але знати його потрібно.

---

# 21. CROSS JOIN

`CROSS JOIN` створює всі можливі комбінації рядків.

Якщо:

    table A = 3 rows

і:

    table B = 4 rows

то:

    3 × 4 = 12 rows

Синтаксис:

    SELECT *
    FROM table_a
    CROSS JOIN table_b;

---

# 22. Приклад CROSS JOIN

Наприклад:

    sizes

    S
    M
    L

    colors

    Red
    Blue

Запит:

    SELECT
        size,
        color
    FROM sizes
    CROSS JOIN colors;

Результат:

    S | Red
    S | Blue
    M | Red
    M | Blue
    L | Red
    L | Blue

Це всі можливі комбінації.

---

# 23. CROSS JOIN — обережно

Якщо:

    table_a = 10 000 rows

    table_b = 10 000 rows

то:

    10 000 × 10 000
    =
    100 000 000 rows

Тому `CROSS JOIN` потрібно використовувати свідомо.

---

# 24. SELF JOIN

`SELF JOIN` — таблиця приєднується сама до себе.

Наприклад:

    employees

    id | name    | manager_id
    ---|---------|-----------
    1  | Anna    | NULL
    2  | John    | 1
    3  | Maria   | 1
    4  | Peter   | 2

Тут:

    employee.manager_id
            ↓
        employee.id

Можна отримати:

    працівник → менеджер

---

# 25. Приклад SELF JOIN

    SELECT
        e.name AS employee,
        m.name AS manager
    FROM employees AS e
    LEFT JOIN employees AS m
        ON e.manager_id = m.id;

Результат:

    employee | manager
    ---------|--------
    Anna     | NULL
    John     | Anna
    Maria    | Anna
    Peter    | John

Тут таблиця `employees` використовується двічі.

Тому потрібні два alias:

    e
    m

---

# 26. JOIN трьох таблиць

У реальному backend дуже часто потрібно об'єднати більше двох таблиць.

Наприклад:

    users
       ↓
    orders
       ↓
    order_items

Можемо написати:

    SELECT
        u.name,
        o.id AS order_id,
        oi.product_id,
        oi.quantity
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    JOIN order_items AS oi
        ON o.id = oi.order_id;

Логіка:

    users
       ↓
    orders
       ↓
    order_items

---

# 27. JOIN чотирьох таблиць

Наприклад:

    users
    orders
    order_items
    products

Запит:

    SELECT
        u.name,
        o.id AS order_id,
        p.name AS product_name,
        oi.quantity
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    JOIN order_items AS oi
        ON o.id = oi.order_id
    JOIN products AS p
        ON oi.product_id = p.id;

Такий запит вже дуже схожий на реальний backend-запит.

---

# 28. JOIN + WHERE

Можна фільтрувати результат після JOIN.

Наприклад:

    SELECT
        u.name,
        o.total_amount
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    WHERE o.total_amount > 1000;

Логіка:

    JOIN
       ↓
    пов'язані users + orders
       ↓
    WHERE
       ↓
    тільки orders > 1000

---

# 29. ON vs WHERE

Це одна з найважливіших тем JOIN.

`ON` визначає:

> Як таблиці повинні бути пов'язані?

Наприклад:

    ON u.id = o.user_id

`WHERE` визначає:

> Які результуючі рядки потрібно залишити?

Наприклад:

    WHERE o.total_amount > 1000

---

# 30. Критична різниця для LEFT JOIN

Розглянемо:

    SELECT
        u.name,
        o.total_amount
    FROM users AS u
    LEFT JOIN orders AS o
        ON u.id = o.user_id
        AND o.total_amount > 1000;

Тут `LEFT JOIN` все одно зберігає всіх користувачів.

Для користувача без замовлення > 1000:

    o.total_amount = NULL

---

Тепер:

    SELECT
        u.name,
        o.total_amount
    FROM users AS u
    LEFT JOIN orders AS o
        ON u.id = o.user_id
    WHERE o.total_amount > 1000;

Тут `WHERE` відкидає рядки з:

    o.total_amount = NULL

Тому `LEFT JOIN` фактично починає поводитися подібно до `INNER JOIN` щодо цієї умови.

---

# 31. Практичне правило ON vs WHERE

Для `JOIN`:

    ON
    → умова зв'язку / приєднання

    WHERE
    → фільтрація результату

Але для `LEFT JOIN` розташування умови може змінити результат.

Тому завжди запитуй себе:

> Я хочу відфільтрувати пов'язані рядки чи весь результат?

---

# 32. JOIN + GROUP BY

Один із найважливіших backend-патернів:

    SELECT
        u.id,
        u.name,
        COUNT(o.id) AS order_count
    FROM users AS u
    LEFT JOIN orders AS o
        ON u.id = o.user_id
    GROUP BY u.id, u.name;

Тут:

    JOIN
       ↓
    об'єднуємо users + orders
       ↓
    GROUP BY
       ↓
    один результат на user
       ↓
    COUNT
       ↓
    кількість orders

---

# 33. JOIN + GROUP BY + HAVING

Наприклад:

> Знайти користувачів, які мають щонайменше 5 замовлень.

    SELECT
        u.id,
        u.name,
        COUNT(o.id) AS order_count
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    GROUP BY u.id, u.name
    HAVING COUNT(o.id) >= 5
    ORDER BY order_count DESC;

---

# 34. JOIN + SUM

> Скільки кожен користувач витратив загалом?

    SELECT
        u.id,
        u.name,
        SUM(o.total_amount) AS total_spent
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    GROUP BY u.id, u.name
    ORDER BY total_spent DESC;

---

# 35. LEFT JOIN + SUM

Якщо потрібно показати навіть користувачів без замовлень:

    SELECT
        u.id,
        u.name,
        COALESCE(SUM(o.total_amount), 0) AS total_spent
    FROM users AS u
    LEFT JOIN orders AS o
        ON u.id = o.user_id
    GROUP BY u.id, u.name;

`COALESCE` перетворює:

    NULL → 0

---

# 36. JOIN + AVG

    SELECT
        u.id,
        u.name,
        ROUND(AVG(o.total_amount), 2) AS average_order
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    GROUP BY u.id, u.name;

---

# 37. JOIN + COUNT(DISTINCT)

При складних `JOIN` часто виникає потреба рахувати саме унікальні сутності.

Наприклад:

    SELECT
        u.id,
        u.name,
        COUNT(DISTINCT o.id) AS order_count
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    GROUP BY u.id, u.name;

`DISTINCT` може захистити від частини проблем із дублюванням при подальших JOIN.

Але це не заміна правильному розумінню структури запиту.

---

# 38. Найважливіша проблема JOIN — дублювання рядків

Припустимо:

    users

    id | name
    ---|------
    1  | Anna

    orders

    id | user_id
    ---|--------
    10 | 1
    11 | 1
    12 | 1

Після:

    users
    JOIN
    orders

отримаємо:

    Anna | order 10
    Anna | order 11
    Anna | order 12

Тобто один user став трьома рядками.

Це нормально.

Але потрібно пам'ятати про це при:

    COUNT
    SUM
    AVG

---

# 39. JOIN змінює кількість рядків

Це правило потрібно добре зрозуміти:

> `JOIN` не просто "додає колонки".

Він може:

    збільшити кількість рядків

або:

    зменшити кількість рядків

залежно від типу JOIN і кардинальності зв'язку.

Наприклад:

    1 user
      ↓
    5 orders

після JOIN:

    5 rows

---

# 40. One-to-Many

Найтиповіший зв'язок:

    users
       ↓
    orders

Один user:

    1

може мати:

    багато orders

Тобто:

    User 1
      ├── Order 1
      ├── Order 2
      └── Order 3

Це:

    one-to-many

---

# 41. Many-to-One

З іншого боку:

    orders
       ↓
    users

Багато orders належать одному user:

    Order 1 ─┐
    Order 2 ─┼──→ User
    Order 3 ─┘

Це:

    many-to-one

Той самий зв'язок, просто з іншого боку.

---

# 42. Many-to-Many

Наприклад:

    students
        ↕
    courses

Один студент може мати багато курсів.

Один курс може мати багато студентів.

Безпосередньо зв'язати дві таблиці складно.

Тому використовують проміжну таблицю:

    students
        ↓
    student_courses
        ↓
    courses

Наприклад:

    students

    id | name
    ---|------
    1  | Anna
    2  | John

    courses

    id | title
    ---|-------
    10 | SQL
    20 | React

    student_courses

    student_id | course_id
    -----------|----------
    1          | 10
    1          | 20
    2          | 10

---

# 43. JOIN для Many-to-Many

> Знайти курси кожного студента.

    SELECT
        s.name AS student,
        c.title AS course
    FROM students AS s
    JOIN student_courses AS sc
        ON s.id = sc.student_id
    JOIN courses AS c
        ON sc.course_id = c.id
    ORDER BY s.name, c.title;

Логіка:

    students
        ↓
    student_courses
        ↓
    courses

---

# 44. JOIN та NULL

`LEFT JOIN` часто створює `NULL` у колонках правої таблиці.

Наприклад:

    SELECT
        u.name,
        o.id
    FROM users AS u
    LEFT JOIN orders AS o
        ON u.id = o.user_id;

Для користувача без замовлень:

    name  | id
    ------|----
    Maria | NULL

Це не означає, що `orders.id` фізично містить `NULL`.

Це означає:

> для цього рядка не було відповідного запису в `orders`.

---

# 45. JOIN + IS NULL

Пошук користувачів без замовлень:

    SELECT
        u.id,
        u.name
    FROM users AS u
    LEFT JOIN orders AS o
        ON u.id = o.user_id
    WHERE o.id IS NULL;

Пошук товарів без категорії:

    SELECT
        p.id,
        p.name
    FROM products AS p
    LEFT JOIN categories AS c
        ON p.category_id = c.id
    WHERE c.id IS NULL;

Це дуже корисний практичний патерн.

---

# 46. JOIN з умовою за кількома колонками

Умова JOIN може містити декілька частин.

    SELECT ...
    FROM table_a AS a
    JOIN table_b AS b
        ON a.id = b.a_id
        AND a.type = b.type;

Можна використовувати:

    AND
    OR
    =
    <
    >
    BETWEEN
    IS NULL

та інші умови.

Але найчастіше JOIN будується навколо ключів:

    primary_key = foreign_key

---

# 47. JOIN по нерівності

`JOIN` не обов'язково використовує тільки `=`.

Наприклад:

    SELECT
        p.name,
        r.discount
    FROM products AS p
    JOIN price_ranges AS r
        ON p.price BETWEEN r.min_price AND r.max_price;

Це називають:

    non-equi join

Це вже більш просунутий SQL.

---

# 48. USING

Якщо колонка має однакову назву в обох таблицях, PostgreSQL дозволяє використовувати `USING`.

Наприклад:

    users

    id
    name

    profiles

    id
    user_id

Якщо обидві таблиці мають:

    user_id

можна:

    SELECT *
    FROM users
    JOIN profiles
        USING (user_id);

Це скорочений варіант:

    ON users.user_id = profiles.user_id

---

# 49. NATURAL JOIN

PostgreSQL також має:

    NATURAL JOIN

Він автоматично шукає колонки з однаковими іменами.

Наприклад:

    SELECT *
    FROM table_a
    NATURAL JOIN table_b;

Але для production-коду його зазвичай краще уникати.

Причина:

якщо структура таблиць зміниться і з'явиться нова колонка з таким самим ім'ям, логіка JOIN може несподівано змінитися.

Краще явно писати:

    JOIN ...
        ON ...

---

# 50. JOIN з умовою AND

Наприклад, потрібно приєднати тільки активні замовлення:

    SELECT
        u.name,
        o.id
    FROM users AS u
    LEFT JOIN orders AS o
        ON u.id = o.user_id
        AND o.status = 'active';

Важлива деталь:

умова знаходиться в `ON`, тому користувачі без активних замовлень все одно залишаються.

---

# 51. JOIN + WHERE для INNER JOIN

Для `INNER JOIN` багато умов можуть виглядати еквівалентно.

Наприклад:

    SELECT
        u.name,
        o.id
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    WHERE o.status = 'paid';

Можна також:

    SELECT
        u.name,
        o.id
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
        AND o.status = 'paid';

Для `INNER JOIN` результат часто буде однаковим.

Але для `LEFT JOIN` різниця може бути принциповою.

---

# 52. JOIN + ORDER BY

Наприклад:

    SELECT
        u.name,
        o.total_amount
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    ORDER BY o.total_amount DESC;

Можна сортувати за колонками будь-якої приєднаної таблиці.

---

# 53. JOIN + LIMIT

Наприклад:

    SELECT
        u.name,
        o.total_amount
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    ORDER BY o.total_amount DESC
    LIMIT 10;

Отримаємо 10 рядків замовлень з найбільшою сумою.

---

# 54. JOIN + GROUP BY + ORDER BY

Наприклад:

> Топ-10 користувачів за загальною сумою замовлень.

    SELECT
        u.id,
        u.name,
        SUM(o.total_amount) AS total_spent
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    GROUP BY u.id, u.name
    ORDER BY total_spent DESC
    LIMIT 10;

Це вже дуже типовий запит для backend.

---

# 55. JOIN + WHERE + GROUP BY + HAVING

Складніший приклад:

> Знайти користувачів, які мають щонайменше 3 оплачені замовлення на загальну суму понад 10000.

    SELECT
        u.id,
        u.name,
        COUNT(o.id) AS paid_orders,
        SUM(o.total_amount) AS total_spent
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    WHERE o.status = 'paid'
    GROUP BY u.id, u.name
    HAVING COUNT(o.id) >= 3
       AND SUM(o.total_amount) > 10000
    ORDER BY total_spent DESC;

Це вже реальний приклад SQL для бізнес-логіки.

---

# 56. JOIN та агрегування — порядок мислення

Коли бачиш:

    JOIN
    +
    GROUP BY

не поспішай писати SQL.

Спочатку запитай:

    1. Які таблиці я об'єдную?

    2. За яким ключем?

    3. Скільки рядків може відповідати одному рядку?

    4. Який рівень результату мені потрібен?

    5. Що я рахую?

Наприклад:

    результат = один рядок на user

тоді:

    GROUP BY user

---

# 57. Визначай grain запиту

`Grain` — рівень деталізації одного рядка результату.

Наприклад:

    один рядок = один user

або:

    один рядок = одне order

або:

    один рядок = один product

або:

    один рядок = одна комбінація user + order

Це дуже важливе поняття для складних SQL-запитів.

---

# 58. Приклад grain

Запит:

    SELECT
        u.name,
        o.id
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id;

Grain:

    один рядок = одне order

Запит:

    SELECT
        u.name,
        COUNT(o.id)
    FROM users AS u
    LEFT JOIN orders AS o
        ON u.id = o.user_id
    GROUP BY u.id, u.name;

Grain:

    один рядок = один user

Це фундаментальне розуміння JOIN.

---

# 59. Типова помилка з SUM після декількох JOIN

Припустимо:

    orders
       ↓
    order_items
       ↓
    products

Якщо зробити багато JOIN, один `order` може перетворитися на багато рядків.

Наприклад:

    Order 1
      ├── Item 1
      ├── Item 2
      └── Item 3

Після JOIN:

    Order 1
    Order 1
    Order 1

Тому якщо ти рахуєш:

    SUM(order.total_amount)

можеш випадково отримати:

    total_amount × 3

Це одна з найважливіших проблем у складних SQL-запитах.

---

# 60. Як думати про дублювання

Перед агрегуванням перевір:

    скільки рядків припадає на одну сутність?

Наприклад:

    user → orders

    1 user
    5 orders

Після JOIN:

    5 rows

Якщо:

    order → order_items

    1 order
    4 items

то після другого JOIN:

    4 rows

Тому:

    JOIN
       ↓
    може змінити grain
       ↓
    aggregate
       ↓
    потрібно перевірити результат

---

# 61. EXPLAIN для JOIN

Коли запит стає великим, корисно подивитися query plan.

    EXPLAIN
    SELECT
        u.name,
        o.total_amount
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id;

Для реального виконання:

    EXPLAIN ANALYZE
    SELECT
        u.name,
        o.total_amount
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id;

На цьому етапі достатньо знати, що:

    EXPLAIN
    → показує план виконання

а:

    EXPLAIN ANALYZE
    → виконує запит і показує фактичні показники

Детальніше це буде в розділі:

    25-performance-and-explain

---

# 62. Індекси та JOIN

Для великих таблиць важливими стають індекси.

Наприклад:

    orders.user_id

часто використовується для:

    JOIN users
        ON users.id = orders.user_id

Тому індекс на `orders.user_id` може бути корисним.

Наприклад:

    CREATE INDEX idx_orders_user_id
    ON orders(user_id);

Але:

> Не потрібно створювати індекси автоматично на кожну колонку.

Потрібно враховувати:

- реальні запити;
- розмір таблиці;
- selectivity;
- тип JOIN;
- query plan;
- вартість INSERT/UPDATE.

Детальніше — у розділах про `INDEXES` та `EXPLAIN`.

---

# 63. JOIN та Foreign Key

Наприклад:

    CREATE TABLE orders (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT NOT NULL,
        total_amount NUMERIC(12, 2),

        FOREIGN KEY (user_id)
            REFERENCES users(id)
    );

Тоді:

    orders.user_id
        ↓
    users.id

є формально визначеним зв'язком.

Потім:

    SELECT
        u.name,
        o.total_amount
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id;

---

# 64. Важливо: JOIN не створює зв'язок

`FOREIGN KEY` визначає логічне обмеження в структурі БД.

`JOIN` використовує дані цього зв'язку в запиті.

Тобто:

    FOREIGN KEY
    → визначає допустимий зв'язок

    JOIN
    → використовує зв'язок для отримання даних

---

# 65. INNER JOIN — шпаргалка

    SELECT
        u.name,
        o.id
    FROM users AS u
    INNER JOIN orders AS o
        ON u.id = o.user_id;

Результат:

    тільки users, для яких є orders.

---

# 66. LEFT JOIN — шпаргалка

    SELECT
        u.name,
        o.id
    FROM users AS u
    LEFT JOIN orders AS o
        ON u.id = o.user_id;

Результат:

    всі users
    +
    orders, якщо вони є.

---

# 67. LEFT JOIN без відповідності

    SELECT
        u.id,
        u.name
    FROM users AS u
    LEFT JOIN orders AS o
        ON u.id = o.user_id
    WHERE o.id IS NULL;

Результат:

    users без orders

---

# 68. RIGHT JOIN — шпаргалка

    SELECT ...
    FROM users AS u
    RIGHT JOIN orders AS o
        ON u.id = o.user_id;

Результат:

    всі orders
    +
    users, якщо вони є.

На практиці часто краще переписати через `LEFT JOIN`.

---

# 69. FULL OUTER JOIN — шпаргалка

    SELECT ...
    FROM users AS u
    FULL OUTER JOIN orders AS o
        ON u.id = o.user_id;

Результат:

    всі users
    +
    всі orders
    +
    matching rows

---

# 70. CROSS JOIN — шпаргалка

    SELECT *
    FROM sizes
    CROSS JOIN colors;

Результат:

    всі можливі комбінації.

---

# 71. SELF JOIN — шпаргалка

    SELECT
        e.name AS employee,
        m.name AS manager
    FROM employees AS e
    LEFT JOIN employees AS m
        ON e.manager_id = m.id;

Результат:

    employee → manager

---

# 72. JOIN трьох таблиць — шпаргалка

    SELECT ...
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    JOIN order_items AS oi
        ON o.id = oi.order_id;

---

# 73. JOIN + GROUP BY — шпаргалка

    SELECT
        u.id,
        u.name,
        COUNT(o.id) AS order_count
    FROM users AS u
    LEFT JOIN orders AS o
        ON u.id = o.user_id
    GROUP BY u.id, u.name;

---

# 74. JOIN + HAVING — шпаргалка

    SELECT
        u.id,
        u.name,
        COUNT(o.id) AS order_count
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    GROUP BY u.id, u.name
    HAVING COUNT(o.id) >= 5;

---

# 75. JOIN + SUM — шпаргалка

    SELECT
        u.id,
        u.name,
        SUM(o.total_amount) AS total_spent
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    GROUP BY u.id, u.name;

---

# 76. JOIN + ORDER BY + LIMIT

    SELECT
        u.id,
        u.name,
        SUM(o.total_amount) AS total_spent
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.user_id
    GROUP BY u.id, u.name
    ORDER BY total_spent DESC
    LIMIT 10;

---

# 77. Типові помилки

## ❌ Помилка 1 — неправильний ключ JOIN

Неправильно:

    ON u.id = o.id

якщо зв'язок насправді:

    u.id = o.user_id

Завжди потрібно розуміти структуру таблиць.

---

## ❌ Помилка 2 — забутий ON

Неправильно:

    SELECT *
    FROM users
    JOIN orders;

Для звичайного `JOIN` потрібна умова.

Правильно:

    SELECT *
    FROM users
    JOIN orders
        ON users.id = orders.user_id;

---

## ❌ Помилка 3 — використання SELECT *

У складному JOIN:

    SELECT *

може повернути десятки колонок, включно з дубльованими:

    id
    created_at
    status
    ...

Краще явно вибирати необхідні колонки:

    SELECT
        u.id,
        u.name,
        o.id AS order_id,
        o.total_amount
    ...

---

## ❌ Помилка 4 — плутати ON та WHERE

Особливо небезпечно з:

    LEFT JOIN

Потрібно розуміти, де саме повинна бути умова.

---

## ❌ Помилка 5 — COUNT(*) після LEFT JOIN

Якщо потрібно порахувати пов'язані записи:

    COUNT(o.id)

часто правильніше, ніж:

    COUNT(*)

---

## ❌ Помилка 6 — не помітити дублювання

Після JOIN:

    один рядок
       ↓
    кілька рядків

може змінити:

    COUNT
    SUM
    AVG

---

## ❌ Помилка 7 — зайвий DISTINCT

Іноді розробник бачить дублікати та просто додає:

    DISTINCT

Але це може приховати проблему неправильного JOIN.

Спочатку потрібно зрозуміти:

> Чому виникли дублікати?

---

# 78. Практична вправа 1

Створи таблиці:

    users
    orders

Зроби:

    INNER JOIN

і виведи:

    user name
    order id
    total amount

---

# 79. Практична вправа 2

Заміни:

    INNER JOIN

на:

    LEFT JOIN

Знайди користувачів без замовлень.

---

# 80. Практична вправа 3

Порахуй кількість замовлень кожного користувача:

    user id
    user name
    order count

Використай:

    LEFT JOIN
    COUNT
    GROUP BY

---

# 81. Практична вправа 4

Порахуй загальну суму замовлень кожного користувача:

    user id
    user name
    total spent

Використай:

    LEFT JOIN
    SUM
    COALESCE
    GROUP BY

---

# 82. Практична вправа 5

Знайди користувачів, які мають:

    >= 5 orders

Використай:

    JOIN
    GROUP BY
    HAVING

---

# 83. Практична вправа 6

Створи:

    categories
    products

Зв'яжи:

    products.category_id
        ↓
    categories.id

Виведи:

    category name
    product name
    price

---

# 84. Практична вправа 7

Покажи всі категорії, включно з тими, в яких немає товарів.

Використай:

    categories
    LEFT JOIN
    products

---

# 85. Практична вправа 8

Знайди категорії, у яких немає жодного товару.

Використай:

    LEFT JOIN
    WHERE products.id IS NULL

---

# 86. Практична вправа 9

Створи:

    students
    courses
    student_courses

Отримай:

    student name
    course title

Використай два `JOIN`.

---

# 87. Практична вправа 10

Знайди кількість студентів на кожному курсі.

Використай:

    courses
    student_courses
    COUNT
    GROUP BY

---

# 88. Практична вправа 11

Знайди курси, на яких навчається щонайменше 10 студентів.

Використай:

    GROUP BY
    HAVING COUNT(...)

---

# 89. Практична вправа 12

Створи:

    employees

з полями:

    id
    name
    manager_id

Зроби `SELF JOIN` та виведи:

    employee
    manager

---

# 90. Практична вправа 13 — реальний backend-сценарій

У тебе є:

    users
    orders
    order_items
    products

Потрібно отримати:

    user name
    order id
    product name
    quantity
    price

Тобто побудувати:

    users
       ↓
    orders
       ↓
    order_items
       ↓
    products

Це одна з найкорисніших вправ для розуміння JOIN.

---

# 91. Практична вправа 14 — статистика користувачів

Отримай:

    user id
    user name
    number of orders
    total spent
    average order

Використай:

    LEFT JOIN
    COUNT
    SUM
    AVG
    COALESCE
    GROUP BY

---

# 92. Практична вправа 15 — top customers

Знайди:

    TOP 10 users

за:

    total spent

Використай:

    JOIN
    SUM
    GROUP BY
    ORDER BY
    LIMIT

---

# 93. Junior — що потрібно знати

На Junior-рівні потрібно впевнено знати:

- що таке `JOIN`;
- `INNER JOIN`;
- `LEFT JOIN`;
- `RIGHT JOIN`;
- `FULL OUTER JOIN`;
- `CROSS JOIN`;
- `SELF JOIN`;
- `ON`;
- alias таблиць;
- `PRIMARY KEY`;
- `FOREIGN KEY`;
- one-to-many;
- many-to-one;
- базовий many-to-many;
- `JOIN` двох таблиць;
- `JOIN` трьох таблиць;
- `JOIN + WHERE`;
- `JOIN + GROUP BY`;
- `JOIN + HAVING`;
- `COUNT` після `JOIN`;
- `NULL` після `LEFT JOIN`.

---

# 94. Middle — що потрібно знати

На Middle-рівні потрібно добре розуміти:

- складні JOIN-ланцюжки;
- `INNER` vs `LEFT JOIN`;
- `ON` vs `WHERE`;
- дублювання рядків;
- grain результату;
- `COUNT(DISTINCT ...)`;
- агрегування після JOIN;
- many-to-many;
- self-referencing tables;
- conditional JOIN;
- non-equi JOIN;
- JOIN + subquery;
- JOIN + CTE;
- performance JOIN;
- індекси на FK;
- `EXPLAIN`.

---

# 95. Advanced / Senior

На глибшому рівні:

- query planner;
- join algorithms;
- Nested Loop;
- Hash Join;
- Merge Join;
- cardinality estimation;
- statistics;
- selectivity;
- join order;
- composite indexes;
- index-only scans;
- оптимізація великих JOIN;
- боротьба з row explosion;
- aggregation before/after JOIN;
- CTE та materialization;
- correlated subqueries;
- window functions після JOIN;
- partitioned tables;
- `EXPLAIN ANALYZE`;
- `BUFFERS`;
- оптимізація production-запитів.

---

# 96. Основні типи JOIN

    INNER JOIN

    тільки matching rows


    LEFT JOIN

    всі rows зліва
    + matching справа


    RIGHT JOIN

    всі rows справа
    + matching зліва


    FULL OUTER JOIN

    всі rows з обох таблиць


    CROSS JOIN

    всі можливі комбінації


    SELF JOIN

    таблиця JOIN сама з собою

---

# 97. Візуальна логіка

Уяви:

    A = users
    B = orders

    INNER JOIN

        A ∩ B


    LEFT JOIN

        A + matching B


    RIGHT JOIN

        matching A + B


    FULL OUTER JOIN

        A + B

        з об'єднанням matching rows

---

# 98. Найважливіша схема JOIN

    table A
       │
       │ ON condition
       ↓
    JOIN
       │
       ↓
    matching rows
       │
       ↓
    WHERE
       │
       ↓
    GROUP BY
       │
       ↓
    aggregate
       │
       ↓
    HAVING
       │
       ↓
    ORDER BY
       │
       ↓
    LIMIT

Це дуже важлива схема для реального SQL.

---

# 99. JOIN у backend

У backend `JOIN` потрібен постійно.

Наприклад API:

    GET /users/15/orders

Backend може виконати:

    SELECT
        o.id,
        o.total_amount,
        o.created_at
    FROM orders AS o
    JOIN users AS u
        ON u.id = o.user_id
    WHERE u.id = 15
    ORDER BY o.created_at DESC;

Або endpoint:

    GET /users/statistics

може використовувати:

    SELECT
        u.id,
        u.name,
        COUNT(o.id) AS order_count,
        COALESCE(SUM(o.total_amount), 0) AS total_spent
    FROM users AS u
    LEFT JOIN orders AS o
        ON u.id = o.user_id
    GROUP BY u.id, u.name;

Тобто `JOIN` — це не просто навчальна SQL-конструкція.

Це один з основних інструментів backend-розробника.

---

# 100. Питання для самоперевірки

### Базові

1. Що робить `JOIN`?
2. Для чого потрібен `ON`?
3. Що таке `INNER JOIN`?
4. Що таке `LEFT JOIN`?
5. Чим `LEFT JOIN` відрізняється від `INNER JOIN`?
6. Що робить `RIGHT JOIN`?
7. Що робить `FULL OUTER JOIN`?
8. Що робить `CROSS JOIN`?
9. Що таке `SELF JOIN`?
10. Для чого потрібні alias таблиць?

### Зв'язки

11. Що таке `PRIMARY KEY`?
12. Що таке `FOREIGN KEY`?
13. Що таке one-to-many?
14. Що таке many-to-many?
15. Навіщо потрібна проміжна таблиця?

### Практика

16. Як отримати всіх users та їх orders?
17. Як отримати тільки users, які мають orders?
18. Як знайти users без orders?
19. Як порахувати orders кожного user?
20. Як знайти users з понад 5 orders?
21. Як знайти загальну суму покупок user?
22. Як отримати всі categories, навіть порожні?
23. Як зробити JOIN трьох таблиць?
24. Як зробити SELF JOIN?
25. Чому JOIN може збільшити кількість рядків?

### Найважливіші

26. Чим `ON` відрізняється від `WHERE`?
27. Чому `LEFT JOIN` + умова в `WHERE` може змінити результат?
28. Чому після `LEFT JOIN` часто використовують `COUNT(table.id)`?
29. Що таке row duplication після JOIN?
30. Що таке grain SQL-запиту?
31. Як JOIN може спотворити `SUM`?
32. Як перевірити проблему з JOIN за допомогою `EXPLAIN ANALYZE`?

---

# 101. Шпаргалка: найважливіші патерни

## INNER JOIN

    SELECT
        a.column,
        b.column
    FROM table_a AS a
    JOIN table_b AS b
        ON a.id = b.a_id;

---

## LEFT JOIN

    SELECT
        a.column,
        b.column
    FROM table_a AS a
    LEFT JOIN table_b AS b
        ON a.id = b.a_id;

---

## Записи без відповідності

    SELECT
        a.*
    FROM table_a AS a
    LEFT JOIN table_b AS b
        ON a.id = b.a_id
    WHERE b.id IS NULL;

---

## JOIN + GROUP BY

    SELECT
        a.id,
        a.name,
        COUNT(b.id) AS item_count
    FROM table_a AS a
    LEFT JOIN table_b AS b
        ON a.id = b.a_id
    GROUP BY a.id, a.name;

---

## JOIN + HAVING

    SELECT
        a.id,
        a.name,
        COUNT(b.id) AS item_count
    FROM table_a AS a
    JOIN table_b AS b
        ON a.id = b.a_id
    GROUP BY a.id, a.name
    HAVING COUNT(b.id) >= 5;

---

## JOIN + SUM

    SELECT
        a.id,
        a.name,
        SUM(b.amount) AS total
    FROM table_a AS a
    JOIN table_b AS b
        ON a.id = b.a_id
    GROUP BY a.id, a.name;

---

## LEFT JOIN + COALESCE

    SELECT
        a.id,
        a.name,
        COALESCE(SUM(b.amount), 0) AS total
    FROM table_a AS a
    LEFT JOIN table_b AS b
        ON a.id = b.a_id
    GROUP BY a.id, a.name;

---

## JOIN трьох таблиць

    SELECT ...
    FROM a
    JOIN b
        ON a.id = b.a_id
    JOIN c
        ON b.id = c.b_id;

---

## Many-to-Many

    SELECT ...
    FROM students AS s
    JOIN student_courses AS sc
        ON s.id = sc.student_id
    JOIN courses AS c
        ON c.id = sc.course_id;

---

## SELF JOIN

    SELECT
        e.name AS employee,
        m.name AS manager
    FROM employees AS e
    LEFT JOIN employees AS m
        ON e.manager_id = m.id;

---

# 102. Головне, що потрібно винести з розділу

Не запам'ятовуй JOIN тільки як:

    SELECT ...
    FROM A
    JOIN B
    ON A.id = B.id

Найважливіше — розуміти **що відбувається з рядками**.

Перед кожним JOIN запитай:

    1. Яка таблиця основна?

    2. Яку таблицю я приєдную?

    3. За якими колонками?

    4. Який тип зв'язку?
       1:1
       1:N
       N:M

    5. Чи можуть з'явитися дублікати?

    6. Який grain результату?

    7. Чи потрібні мені всі рядки лівої таблиці?

    8. Чи потрібно після JOIN агрегувати дані?

---

# 103. Найкоротша формула

    JOIN
    =
    об'єднати дані

    ON
    =
    визначити зв'язок

    INNER JOIN
    =
    тільки matching

    LEFT JOIN
    =
    всі зліва

    WHERE
    =
    фільтрувати рядки

    GROUP BY
    =
    створити групи

    HAVING
    =
    фільтрувати групи

    COUNT / SUM / AVG
    =
    агрегувати

---

# 🎯 Підсумок

Після цього розділу ти повинен бачити зв'язок:

    users
       │
       │ user_id
       ↓
    orders
       │
       │ order_id
       ↓
    order_items
       │
       │ product_id
       ↓
    products

і розуміти, як пройти цим ланцюжком через:

    JOIN
       ↓
    JOIN
       ↓
    JOIN
       ↓
    WHERE
       ↓
    GROUP BY
       ↓
    COUNT / SUM / AVG
       ↓
    HAVING
       ↓
    ORDER BY

Це вже фундамент **реальної роботи з реляційною БД у backend**.

Наступна важлива тема:

    13-subqueries

де ми навчимося використовувати результати одного SQL-запиту всередині іншого.
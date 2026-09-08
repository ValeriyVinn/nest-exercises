# 08. SELECT AND FILTERING

## 📌 Визначення

`SELECT` — основна SQL-команда для **отримання даних із таблиць PostgreSQL**.

Якщо:

    INSERT → додає дані
    UPDATE → змінює дані
    DELETE → видаляє дані

то:

    SELECT → читає дані

`SELECT` є основою практично всіх операцій читання в backend-застосунках.

Наприклад:

    GET /users

може виконувати:

    SELECT * FROM users;

---

# 🎯 Для чого потрібен SELECT

За допомогою `SELECT` можна:

- отримати всі рядки;
- отримати окремі колонки;
- відфільтрувати рядки;
- знайти конкретний запис;
- перевірити `NULL`;
- використовувати логічні умови;
- комбінувати умови через `AND` / `OR`;
- шукати за текстом;
- перевіряти діапазони;
- перевіряти належність до списку;
- перейменовувати колонки;
- виконувати обчислення;
- сортувати результати;
- обмежувати кількість рядків.

У наступних темах окремо розглянемо:

    ORDER BY
    LIMIT
    OFFSET
    aggregate functions
    GROUP BY
    JOIN
    subqueries

У цій темі концентруємося на:

    SELECT
    FROM
    WHERE
    фільтрації даних

---

# 🧠 Базова модель SELECT

Найпростіший запит:

    SELECT *
    FROM users;

Можна прочитати буквально:

    SELECT → що отримати?
    FROM   → звідки?
    
Тобто:

    SELECT columns
    FROM table;

---

# 1. SELECT *

Символ `*` означає:

    усі колонки

Наприклад:

    SELECT *
    FROM users;

Якщо таблиця:

    users
    ┌────┬─────────┬────────────────────┬─────┐
    │ id │ name    │ email              │ age │
    ├────┼─────────┼────────────────────┼─────┤
    │ 1  │ Alice   │ alice@example.com  │ 25  │
    │ 2  │ Bob     │ bob@example.com    │ 30  │
    └────┴─────────┴────────────────────┴─────┘

результат міститиме всі колонки.

---

# 2. SELECT конкретних колонок

Краще явно вказувати потрібні колонки:

    SELECT name, email
    FROM users;

Результат:

    name   | email
    -------+-------------------
    Alice  | alice@example.com
    Bob    | bob@example.com

---

# ⚠️ SELECT * у production

Під час навчання:

    SELECT * FROM users;

дуже зручний.

Але в backend краще часто писати:

    SELECT id, name, email
    FROM users;

Причини:

- повертається тільки потрібна інформація;
- менше даних передається;
- API не отримує випадково нові колонки;
- запит стає зрозумілішим;
- легше контролювати структуру відповіді.

---

# 3. SELECT однієї колонки

    SELECT name
    FROM users;

---

# 4. SELECT декількох колонок

    SELECT id, name, email
    FROM users;

Порядок колонок можна змінювати:

    SELECT email, name, id
    FROM users;

Результат буде вказаного порядку.

---

# 5. SELECT з обчисленням

`SELECT` може виконувати вирази.

Наприклад:

    SELECT 2 + 3;

Результат:

    5

Можна:

    SELECT 10 * 5;

Або:

    SELECT price * quantity
    FROM products;

Тобто SQL може виконувати обчислення над даними.

---

# 6. AS — псевдонім колонки

Можна дати результату інше ім'я:

    SELECT
        price * quantity AS total
    FROM products;

Результат матиме колонку:

    total

---

# 7. AS для звичайної колонки

    SELECT
        name AS product_name,
        price AS product_price
    FROM products;

---

# 8. AS для таблиці

Можна створити alias таблиці:

    SELECT u.name, u.email
    FROM users AS u;

Тепер:

    u

означає:

    users

Можна писати коротше:

    SELECT u.name, u.email
    FROM users u;

---

# 9. SELECT DISTINCT

`DISTINCT` прибирає дублікати.

Наприклад:

    SELECT city
    FROM users;

Можемо отримати:

    Kyiv
    Lviv
    Kyiv
    Odesa
    Lviv

Використовуємо:

    SELECT DISTINCT city
    FROM users;

Результат:

    Kyiv
    Lviv
    Odesa

---

# 10. DISTINCT для декількох колонок

    SELECT DISTINCT city, age
    FROM users;

У цьому випадку PostgreSQL шукає унікальні **комбінації**:

    city + age

---

# 11. WHERE

`WHERE` використовується для **фільтрації рядків**.

Базовий синтаксис:

    SELECT columns
    FROM table
    WHERE condition;

Наприклад:

    SELECT *
    FROM users
    WHERE age > 30;

Будуть повернуті тільки користувачі старше 30 років.

---

# 12. Порівняння

Основні оператори:

| Оператор | Значення |
|---|---|
| `=` | дорівнює |
| `<>` | не дорівнює |
| `!=` | не дорівнює |
| `>` | більше |
| `<` | менше |
| `>=` | більше або дорівнює |
| `<=` | менше або дорівнює |

---

# 13. WHERE =

    SELECT *
    FROM users
    WHERE age = 30;

Знайти користувачів, яким 30 років.

---

# 14. WHERE !=

    SELECT *
    FROM users
    WHERE age != 30;

Або стандартніший варіант:

    SELECT *
    FROM users
    WHERE age <> 30;

---

# 15. WHERE >

    SELECT *
    FROM products
    WHERE price > 100;

---

# 16. WHERE <

    SELECT *
    FROM products
    WHERE price < 100;

---

# 17. WHERE >=

    SELECT *
    FROM users
    WHERE age >= 18;

---

# 18. WHERE <=

    SELECT *
    FROM users
    WHERE age <= 65;

---

# 19. AND

`AND` означає:

    умова 1 І умова 2

Наприклад:

    SELECT *
    FROM users
    WHERE age >= 18
      AND active = true;

Користувач повинен:

    age >= 18
    І
    active = true

---

# 20. OR

`OR` означає:

    умова 1 АБО умова 2

Наприклад:

    SELECT *
    FROM users
    WHERE city = 'Kyiv'
       OR city = 'Lviv';

---

# 21. AND + OR

Тут потрібно бути уважним.

Наприклад:

    SELECT *
    FROM users
    WHERE active = true
      AND city = 'Kyiv'
       OR city = 'Lviv';

Логіка може бути не такою, як ти очікуєш.

Краще використовувати дужки:

    SELECT *
    FROM users
    WHERE active = true
      AND (
          city = 'Kyiv'
          OR city = 'Lviv'
      );

Тепер логіка очевидна:

    active = true
    AND
    (Kyiv OR Lviv)

---

# 22. NOT

`NOT` заперечує умову.

Наприклад:

    SELECT *
    FROM users
    WHERE NOT active;

Або:

    SELECT *
    FROM users
    WHERE NOT (age >= 18);

---

# 23. BETWEEN

`BETWEEN` перевіряє діапазон.

Наприклад:

    SELECT *
    FROM products
    WHERE price BETWEEN 50 AND 100;

Це приблизно означає:

    price >= 50
    AND
    price <= 100

Межі включаються.

---

# 24. BETWEEN для віку

    SELECT *
    FROM users
    WHERE age BETWEEN 18 AND 30;

Отримаємо:

    18
    19
    ...
    30

---

# 25. NOT BETWEEN

    SELECT *
    FROM products
    WHERE price NOT BETWEEN 50 AND 100;

---

# 26. IN

`IN` перевіряє, чи входить значення до списку.

Наприклад:

    SELECT *
    FROM users
    WHERE city IN ('Kyiv', 'Lviv', 'Odesa');

Замість:

    city = 'Kyiv'
    OR city = 'Lviv'
    OR city = 'Odesa'

---

# 27. NOT IN

    SELECT *
    FROM users
    WHERE city NOT IN ('Kyiv', 'Lviv');

---

# 28. LIKE

`LIKE` використовується для пошуку тексту за шаблоном.

Наприклад:

    SELECT *
    FROM users
    WHERE name LIKE 'A%';

`%` означає:

    будь-яка кількість символів

Тобто:

    Alice
    Andrew
    Anna

можуть відповідати шаблону:

    A%

---

# 29. LIKE — основні шаблони

### Починається з A

    WHERE name LIKE 'A%'

### Закінчується на a

    WHERE name LIKE '%a'

### Містить "ann"

    WHERE name LIKE '%ann%'

### Один довільний символ

Символ `_` означає один символ:

    WHERE name LIKE '_ob'

Можливий результат:

    Bob

---

# 30. ILIKE

PostgreSQL має:

    ILIKE

Він виконує пошук без врахування регістру.

Наприклад:

    SELECT *
    FROM users
    WHERE name ILIKE 'alice';

Може знайти:

    Alice
    alice
    ALICE

---

# 31. LIKE vs ILIKE

| LIKE | ILIKE |
|---|---|
| Враховує регістр | Не враховує регістр |
| SQL standard-style | PostgreSQL-specific |
| `Alice` ≠ `alice` | `Alice` ≈ `alice` |

Для PostgreSQL:

    LIKE
    → case-sensitive

    ILIKE
    → case-insensitive

---

# 32. NULL

`NULL` — це спеціальне значення, яке означає:

    відсутнє
    невідоме
    не задане

Наприклад:

    email = NULL

не означає порожній рядок.

---

# 33. IS NULL

Для пошуку `NULL`:

    SELECT *
    FROM users
    WHERE email IS NULL;

Не можна правильно писати:

    WHERE email = NULL

---

# 34. IS NOT NULL

    SELECT *
    FROM users
    WHERE email IS NOT NULL;

---

# ⚠️ Важливе правило NULL

Неправильно:

    WHERE email = NULL

Правильно:

    WHERE email IS NULL

Неправильно:

    WHERE email != NULL

Правильно:

    WHERE email IS NOT NULL

---

# 35. NULL і логіка SQL

У SQL існує не тільки:

    TRUE
    FALSE

але також:

    UNKNOWN

Наприклад:

    10 = NULL

не є `TRUE`.

Результат логічно невизначений.

Саме тому для `NULL` використовують:

    IS NULL
    IS NOT NULL

---

# 36. COALESCE

`COALESCE` дозволяє використати перше значення, яке не є `NULL`.

Наприклад:

    SELECT
        name,
        COALESCE(email, 'No email') AS email
    FROM users;

Якщо:

    email = NULL

буде показано:

    No email

---

# 37. Фільтрація BOOLEAN

Якщо колонка:

    active boolean

можна писати:

    SELECT *
    FROM users
    WHERE active = true;

Але коротше:

    SELECT *
    FROM users
    WHERE active;

Для `false`:

    SELECT *
    FROM users
    WHERE NOT active;

---

# 38. Фільтрація дат

Наприклад:

    SELECT *
    FROM users
    WHERE created_at >= '2026-01-01';

Або:

    SELECT *
    FROM users
    WHERE created_at < '2026-02-01';

---

# 39. Фільтрація за датами — важливий нюанс

Якщо `created_at` має тип:

    timestamptz

краще для діапазону використовувати напіввідкритий інтервал:

    SELECT *
    FROM users
    WHERE created_at >= '2026-01-01'
      AND created_at < '2026-02-01';

Тобто:

    >= початок
    <
    наступний початок

Це часто безпечніше, ніж намагатися вказати "останню секунду дня".

---

# 40. Фільтрація чисел

    SELECT *
    FROM products
    WHERE price > 100;

Можна комбінувати:

    SELECT *
    FROM products
    WHERE price >= 50
      AND price <= 200;

Або:

    SELECT *
    FROM products
    WHERE price BETWEEN 50 AND 200;

---

# 41. Фільтрація тексту

    SELECT *
    FROM users
    WHERE name = 'Alice';

Або:

    SELECT *
    FROM users
    WHERE name ILIKE 'alice';

Або пошук частини:

    SELECT *
    FROM users
    WHERE name ILIKE '%ali%';

---

# 42. Фільтрація за декількома значеннями

    SELECT *
    FROM users
    WHERE age IN (18, 21, 30, 40);

---

# 43. Комбінація умов

Наприклад:

    SELECT *
    FROM users
    WHERE active = true
      AND age >= 18
      AND city IN ('Kyiv', 'Lviv');

Тут одночасно перевіряються:

    active = true
    age >= 18
    city IN (...)

---

# 44. DISTINCT + WHERE

Можна комбінувати:

    SELECT DISTINCT city
    FROM users
    WHERE active = true;

Отримаємо унікальні міста тільки активних користувачів.

---

# 45. SELECT з константами

SQL може повернути звичайне значення:

    SELECT 10;

Або текст:

    SELECT 'Hello';

Або кілька значень:

    SELECT
        10 AS number,
        'Hello' AS message,
        true AS active;

Це корисно для розуміння того, що `SELECT` не обов'язково повинен читати таблицю.

---

# 46. SELECT без FROM

У PostgreSQL можна:

    SELECT 2 + 2;

Результат:

    4

Це зручно для перевірки виразів і функцій.

---

# 47. Обчислення в SELECT

Наприклад, таблиця:

    products

має:

    price
    quantity

Можна:

    SELECT
        name,
        price,
        quantity,
        price * quantity AS total
    FROM products;

---

# 48. CASE

`CASE` дозволяє створювати умовну логіку.

Наприклад:

    SELECT
        name,
        age,
        CASE
            WHEN age < 18 THEN 'minor'
            WHEN age < 65 THEN 'adult'
            ELSE 'senior'
        END AS age_group
    FROM users;

---

# 49. CASE + WHERE

Наприклад:

    SELECT
        name,
        CASE
            WHEN active THEN 'Active'
            ELSE 'Inactive'
        END AS status
    FROM users;

---

# 50. CAST

Під час `SELECT` можна змінювати тип значення.

PostgreSQL має короткий синтаксис:

    SELECT '123'::integer;

Або стандартний:

    SELECT CAST('123' AS integer);

Наприклад:

    SELECT
        price::numeric
    FROM products;

---

# 51. Результат SELECT не змінює таблицю

Це дуже важливо.

Запит:

    SELECT *
    FROM users
    WHERE age > 30;

тільки читає дані.

Він не змінює таблицю.

На відміну від:

    UPDATE
    DELETE
    INSERT

---

# 52. WHERE не змінює дані

Наприклад:

    SELECT *
    FROM users
    WHERE active = false;

`WHERE` просто відбирає рядки.

Він не видаляє неактивних користувачів.

Для видалення потрібен:

    DELETE

---

# 53. Логічна модель SELECT

Корисно поступово мислити так:

    SELECT
        ↓
    FROM
        ↓
    WHERE

Наприклад:

    SELECT name, email
    FROM users
    WHERE active = true;

Читаємо:

    FROM users
        ↓
    знайти рядки
        ↓
    WHERE active = true
        ↓
    залишити активних
        ↓
    SELECT name, email
        ↓
    повернути тільки ці колонки

---

# 54. Порядок написання SQL

У запиті ми пишемо:

    SELECT
    FROM
    WHERE
    ORDER BY
    LIMIT

Наприклад:

    SELECT name, email
    FROM users
    WHERE active = true
    ORDER BY name
    LIMIT 10;

Але логічно SQL можна уявляти як:

    FROM
      ↓
    WHERE
      ↓
    SELECT
      ↓
    ORDER BY
      ↓
    LIMIT

На цьому етапі достатньо запам'ятати синтаксичний порядок.

---

# 55. SELECT і SQL keywords

SQL не залежить від регістру ключових слів.

Це працює:

    SELECT *
    FROM users;

І це:

    select *
    from users;

І це:

    SeLeCt *
    FrOm users;

Але стандартна практика:

    SELECT
    FROM
    WHERE
    INSERT
    UPDATE
    DELETE

писати великими літерами.

---

# 56. Імена колонок

Приклад:

    SELECT first_name, last_name
    FROM users;

Краще використовувати зрозумілі імена:

    first_name
    created_at
    email
    user_id

Замість:

    x
    a
    data1

---

# 57. Лапки для тексту

Текстові значення пишуться в одинарних лапках:

    WHERE name = 'Alice'

Не:

    WHERE name = "Alice"

У SQL:

    'Alice'

— рядок.

А подвійні лапки:

    "name"

використовуються для quoted identifiers.

---

# 58. Alias і подвійні лапки

Наприклад:

    SELECT
        name AS "User Name"
    FROM users;

Але краще для API та коду використовувати прості імена:

    SELECT
        name AS user_name
    FROM users;

---

# 59. Параметризований SELECT

У backend не потрібно вставляти значення користувача в SQL через string interpolation.

Погано:

    const sql = `
        SELECT *
        FROM users
        WHERE id = ${id}
    `;

Краще:

    const sql = `
        SELECT *
        FROM users
        WHERE id = $1
    `;

    const result = await db.query(sql, [id]);

---

# 60. SQL Injection

Небезпечний код:

    const search = req.query.search;

    const sql = `
        SELECT *
        FROM users
        WHERE name = '${search}'
    `;

Користувацький ввід може вплинути на SQL-код.

Правильно:

    const sql = `
        SELECT *
        FROM users
        WHERE name = $1
    `;

    const result = await db.query(sql, [search]);

---

# 61. Параметризований пошук

Наприклад:

    const sql = `
        SELECT id, name, email
        FROM users
        WHERE name ILIKE $1
    `;

    const values = [`%${search}%`];

    const result = await db.query(sql, values);

Тут:

    $1

є параметром SQL-запиту.

---

# 62. Практична таблиця

Для вправ:

    CREATE TABLE users (
        id integer GENERATED ALWAYS AS IDENTITY,
        name text NOT NULL,
        email text,
        age integer,
        city text,
        active boolean DEFAULT true,
        created_at timestamptz DEFAULT now()
    );

Додамо:

    INSERT INTO users (name, email, age, city, active)
    VALUES
        ('Alice', 'alice@example.com', 25, 'Kyiv', true),
        ('Bob', 'bob@example.com', 17, 'Lviv', true),
        ('Charlie', 'charlie@example.com', 35, 'Odesa', false),
        ('David', NULL, 42, 'Kyiv', true),
        ('Eva', 'eva@example.com', 29, 'Lviv', true);

---

# 63. Практика SELECT

## Вправа 1

Отримай усіх користувачів:

    SELECT *
    FROM users;

---

## Вправа 2

Отримай тільки:

    id
    name
    email

    SELECT id, name, email
    FROM users;

---

## Вправа 3

Знайди користувачів старше 30:

    SELECT *
    FROM users
    WHERE age > 30;

---

## Вправа 4

Знайди повнолітніх:

    SELECT *
    FROM users
    WHERE age >= 18;

---

## Вправа 5

Знайди користувачів із Kyiv:

    SELECT *
    FROM users
    WHERE city = 'Kyiv';

---

## Вправа 6

Знайди користувачів із Kyiv або Lviv:

    SELECT *
    FROM users
    WHERE city IN ('Kyiv', 'Lviv');

---

## Вправа 7

Знайди активних користувачів старше 25:

    SELECT *
    FROM users
    WHERE active = true
      AND age > 25;

---

## Вправа 8

Знайди користувачів віком від 20 до 40:

    SELECT *
    FROM users
    WHERE age BETWEEN 20 AND 40;

---

## Вправа 9

Знайди користувачів без email:

    SELECT *
    FROM users
    WHERE email IS NULL;

---

## Вправа 10

Знайди користувачів з email:

    SELECT *
    FROM users
    WHERE email IS NOT NULL;

---

## Вправа 11

Знайди імена, що починаються з `A`:

    SELECT *
    FROM users
    WHERE name LIKE 'A%';

---

## Вправа 12

Пошук без врахування регістру:

    SELECT *
    FROM users
    WHERE name ILIKE 'alice';

---

## Вправа 13

Знайди унікальні міста:

    SELECT DISTINCT city
    FROM users;

---

## Вправа 14

Знайди активних користувачів із Kyiv або Lviv:

    SELECT *
    FROM users
    WHERE active
      AND city IN ('Kyiv', 'Lviv');

---

# 64. Практична вправа — складніша фільтрація

Знайди користувачів, які:

- активні;
- старше 18;
- живуть у Kyiv або Lviv;
- мають email.

    SELECT *
    FROM users
    WHERE active
      AND age > 18
      AND city IN ('Kyiv', 'Lviv')
      AND email IS NOT NULL;

---

# 65. Практична вправа — пошук

Знайди всіх користувачів, у яких ім'я містить:

    'a'

    SELECT *
    FROM users
    WHERE name ILIKE '%a%';

---

# 66. Практична вправа — обчислення

Створи:

    CREATE TABLE products (
        id integer GENERATED ALWAYS AS IDENTITY,
        name text NOT NULL,
        price numeric(10,2),
        quantity integer
    );

Додай товари:

    INSERT INTO products (name, price, quantity)
    VALUES
        ('Keyboard', 50, 10),
        ('Mouse', 25, 20),
        ('Monitor', 250, 5),
        ('Headphones', 80, 15);

Порахуй вартість запасу:

    SELECT
        name,
        price,
        quantity,
        price * quantity AS total
    FROM products;

---

# 67. Практична вправа — фільтрація товарів

Товари дорожчі за 50:

    SELECT *
    FROM products
    WHERE price > 50;

Товари від 50 до 100:

    SELECT *
    FROM products
    WHERE price BETWEEN 50 AND 100;

Товари з кількістю більше 10:

    SELECT *
    FROM products
    WHERE quantity > 10;

---

# 68. Практична вправа — CASE

    SELECT
        name,
        price,
        CASE
            WHEN price < 50 THEN 'cheap'
            WHEN price < 100 THEN 'medium'
            ELSE 'expensive'
        END AS price_category
    FROM products;

---

# 69. Практична вправа — COALESCE

Створи:

    CREATE TABLE contacts (
        id integer GENERATED ALWAYS AS IDENTITY,
        name text,
        phone text
    );

Додай:

    INSERT INTO contacts (name, phone)
    VALUES
        ('Alice', '123456'),
        ('Bob', NULL),
        ('Charlie', '987654');

Виконай:

    SELECT
        name,
        COALESCE(phone, 'No phone') AS phone
    FROM contacts;

---

# 70. Корисний шаблон SELECT

    SELECT
        column1,
        column2,
        column3
    FROM table_name
    WHERE condition;

Наприклад:

    SELECT
        id,
        name,
        email
    FROM users
    WHERE active = true;

---

# 71. SELECT + WHERE + ORDER BY

Хоча `ORDER BY` буде детально в наступній темі, вже зараз корисно побачити повну конструкцію:

    SELECT
        id,
        name,
        age
    FROM users
    WHERE active = true
    ORDER BY age;

---

# 72. SELECT + WHERE + LIMIT

Так само можна обмежити результат:

    SELECT
        id,
        name
    FROM users
    WHERE active = true
    LIMIT 10;

`LIMIT`, `OFFSET` і pagination детально розглянемо в наступній темі.

---

# 73. Як читати SQL-запит

Запит:

    SELECT
        id,
        name,
        email
    FROM users
    WHERE active = true
      AND age >= 18;

Можна прочитати:

    Візьми
        id, name, email
    з
        users
    де
        active = true
        і
        age >= 18

Це дуже корисний спосіб навчитися читати SQL.

---

# 74. SELECT як мова запитів

У JavaScript ми часто думаємо:

    знайти
    перебрати
    перевірити
    повернути

У SQL:

    SELECT
    FROM
    WHERE

Тобто ми не описуємо кожен крок алгоритму.

Ми описуємо:

> Які дані мені потрібні?

Це називається **декларативним підходом**.

---

# 75. SQL vs JavaScript

JavaScript:

    const result = users
        .filter(user => user.active)
        .filter(user => user.age >= 18)
        .map(user => ({
            id: user.id,
            name: user.name
        }));

SQL:

    SELECT
        id,
        name
    FROM users
    WHERE active
      AND age >= 18;

SQL дозволяє описати бажаний результат без ручного циклу по кожному рядку.

---

# 76. Типові помилки

## ❌ SELECT * всюди

Під час навчання нормально:

    SELECT * FROM users;

Але в production часто краще:

    SELECT id, name, email
    FROM users;

---

## ❌ `= NULL`

Неправильно:

    WHERE email = NULL

Правильно:

    WHERE email IS NULL

---

## ❌ `!= NULL`

Неправильно:

    WHERE email != NULL

Правильно:

    WHERE email IS NOT NULL

---

## ❌ Плутати `AND` та `OR`

Потрібно уважно розставляти дужки:

    WHERE active
      AND (
          city = 'Kyiv'
          OR city = 'Lviv'
      );

---

## ❌ Подвійні лапки для тексту

Неправильно:

    WHERE name = "Alice"

Правильно:

    WHERE name = 'Alice'

---

## ❌ SQL Injection

Небезпечно:

    WHERE id = ${id}

Краще:

    WHERE id = $1

---

## ❌ Плутати SELECT і UPDATE

    SELECT
    → читає

    UPDATE
    → змінює

`SELECT` сам по собі не змінює дані.

---

# 77. SELECT у backend

Типовий Node.js код:

    const result = await db.query(`
        SELECT id, name, email
        FROM users
        WHERE active = $1
    `, [true]);

Результат:

    result.rows

Наприклад:

    [
        {
            id: 1,
            name: 'Alice',
            email: 'alice@example.com'
        }
    ]

Це прямий міст:

    React / Next.js
          ↓
        HTTP
          ↓
    NestJS / Express
          ↓
       PostgreSQL
          ↓
       SELECT

---

# 78. SELECT і REST API

Наприклад:

    GET /users

може використовувати:

    SELECT id, name, email
    FROM users;

А:

    GET /users/5

може використовувати:

    SELECT id, name, email
    FROM users
    WHERE id = $1;

А:

    GET /users?city=Kyiv

може використовувати:

    SELECT id, name, email
    FROM users
    WHERE city = $1;

---

# 79. Безпечний SELECT

Правильно:

    const sql = `
        SELECT id, name, email
        FROM users
        WHERE id = $1
    `;

    const result = await db.query(sql, [userId]);

Не:

    const sql = `
        SELECT id, name, email
        FROM users
        WHERE id = ${userId}
    `;

---

# 80. Порядок вивчення SELECT

Цю тему корисно засвоїти приблизно так:

    SELECT
      ↓
    FROM
      ↓
    WHERE
      ↓
    =
    <>
    >
    <
    >=
    <=
      ↓
    AND
    OR
    NOT
      ↓
    IN
    BETWEEN
      ↓
    LIKE
    ILIKE
      ↓
    IS NULL
    IS NOT NULL
      ↓
    DISTINCT
      ↓
    AS
      ↓
    CASE
    COALESCE
      ↓
    параметризовані SELECT

Після цього:

    ORDER BY
    LIMIT
    OFFSET
    ↓
    Aggregate Functions
    ↓
    GROUP BY
    ↓
    JOIN
    ↓
    Subqueries

---

# 81. Що потрібно знати на рівні Junior

Обов'язково:

- `SELECT`
- `FROM`
- `WHERE`
- `SELECT *`
- вибір конкретних колонок
- `AS`
- `DISTINCT`
- `=`
- `<>`
- `!=`
- `>`
- `<`
- `>=`
- `<=`
- `AND`
- `OR`
- `NOT`
- `IN`
- `NOT IN`
- `BETWEEN`
- `LIKE`
- `ILIKE`
- `IS NULL`
- `IS NOT NULL`
- boolean-фільтрація
- фільтрація дат
- базові обчислення
- `CASE`
- `COALESCE`
- параметризовані запити
- SQL Injection

---

# 82. Що потрібно знати на рівні Middle

Додатково:

- складні логічні умови;
- порядок виконання SQL;
- `NULL` та three-valued logic;
- типи та implicit/explicit casting;
- `CASE`;
- `COALESCE`;
- expression-based filtering;
- робота з датами;
- робота з текстом;
- `ILIKE`;
- регулярні вирази PostgreSQL;
- full-text search;
- `EXISTS`;
- correlated subqueries;
- query planning;
- вплив індексів на `WHERE`;
- selectivity;
- `EXPLAIN`.

---

# 83. Що потрібно знати на рівні Senior

Глибше:

- оптимізація складних `SELECT`;
- execution plans;
- `EXPLAIN ANALYZE`;
- index scan;
- sequential scan;
- bitmap scan;
- selectivity;
- statistics;
- cardinality;
- predicate pushdown;
- CTE;
- subqueries;
- `EXISTS` vs `IN`;
- window functions;
- full-text search;
- expression indexes;
- partial indexes;
- partition pruning;
- MVCC;
- transaction isolation;
- locking;
- query optimization.

---

# 84. Питання для співбесіди

### 1. Для чого потрібен SELECT?

Для отримання даних із бази даних.

### 2. Для чого потрібен WHERE?

Для фільтрації рядків.

### 3. Чим SELECT * відрізняється від SELECT id, name?

`SELECT *` повертає всі колонки.

Другий варіант — тільки вказані.

### 4. Як знайти NULL?

    IS NULL

### 5. Як знайти не-NULL?

    IS NOT NULL

### 6. Чому не можна використовувати `= NULL`?

Тому що `NULL` має спеціальну семантику невідомого/відсутнього значення.

### 7. Для чого AND?

Усі умови повинні бути істинними.

### 8. Для чого OR?

Достатньо виконання однієї з умов.

### 9. Для чого IN?

Для перевірки значення на належність до списку.

### 10. Для чого BETWEEN?

Для перевірки діапазону.

### 11. LIKE vs ILIKE?

`LIKE` враховує регістр.

`ILIKE` у PostgreSQL дозволяє пошук без врахування регістру.

### 12. Що робить DISTINCT?

Прибирає дублікати з результату.

### 13. Що робить AS?

Створює alias для колонки або таблиці.

### 14. Чи змінює SELECT дані?

Ні.

`SELECT` читає дані.

### 15. Як захиститися від SQL Injection?

Використовувати параметризовані запити.

---

# 📋 MINI CHEAT SHEET

## SELECT ALL

    SELECT *
    FROM users;

## SELECT COLUMNS

    SELECT id, name, email
    FROM users;

## WHERE

    SELECT *
    FROM users
    WHERE age > 18;

## AND

    SELECT *
    FROM users
    WHERE age >= 18
      AND active = true;

## OR

    SELECT *
    FROM users
    WHERE city = 'Kyiv'
       OR city = 'Lviv';

## NOT

    SELECT *
    FROM users
    WHERE NOT active;

## IN

    SELECT *
    FROM users
    WHERE city IN ('Kyiv', 'Lviv');

## NOT IN

    SELECT *
    FROM users
    WHERE city NOT IN ('Kyiv', 'Lviv');

## BETWEEN

    SELECT *
    FROM products
    WHERE price BETWEEN 50 AND 100;

## LIKE

    SELECT *
    FROM users
    WHERE name LIKE 'A%';

## ILIKE

    SELECT *
    FROM users
    WHERE name ILIKE 'alice';

## CONTAINS TEXT

    SELECT *
    FROM users
    WHERE name ILIKE '%ali%';

## NULL

    SELECT *
    FROM users
    WHERE email IS NULL;

## NOT NULL

    SELECT *
    FROM users
    WHERE email IS NOT NULL;

## DISTINCT

    SELECT DISTINCT city
    FROM users;

## ALIAS

    SELECT
        name AS user_name
    FROM users;

## CALCULATION

    SELECT
        price * quantity AS total
    FROM products;

## COALESCE

    SELECT
        COALESCE(email, 'No email')
    FROM users;

## CASE

    SELECT
        CASE
            WHEN age < 18 THEN 'minor'
            ELSE 'adult'
        END AS age_group
    FROM users;

## CAST

    SELECT '123'::integer;

## PARAMETER

    SELECT *
    FROM users
    WHERE id = $1;

---

# 🔑 ГОЛОВНЕ

    SELECT
        ↓
    отримати дані

    FROM
        ↓
    визначити таблицю

    WHERE
        ↓
    відфільтрувати рядки

    AND / OR / NOT
        ↓
    комбінувати умови

    IN
        ↓
    список значень

    BETWEEN
        ↓
    діапазон

    LIKE / ILIKE
        ↓
    пошук тексту

    IS NULL / IS NOT NULL
        ↓
    робота з NULL

    DISTINCT
        ↓
    прибрати дублікати

    AS
        ↓
    перейменувати результат

    CASE
        ↓
    умовна логіка

    COALESCE
        ↓
    замінити NULL

---

# 🎯 Що має залишитися в голові

Найважливіша конструкція:

    SELECT columns
    FROM table
    WHERE condition;

Наприклад:

    SELECT
        id,
        name,
        email
    FROM users
    WHERE active
      AND age >= 18
      AND city IN ('Kyiv', 'Lviv')
      AND email IS NOT NULL;

Тобто:

    SELECT
    → ЩО хочу отримати?

    FROM
    → ЗВІДКИ хочу отримати?

    WHERE
    → ЯКІ рядки мені потрібні?

А для backend запам'ятай ще одне фундаментальне правило:

    SELECT
    + parameterized queries
    = безпечне читання даних

Наступний логічний крок після цієї теми:

    09-sorting-and-pagination

де з'являться:

    ORDER BY
    LIMIT
    OFFSET
    pagination

і ми навчимося не просто знаходити потрібні рядки, а керувати **порядком та кількістю результатів**.
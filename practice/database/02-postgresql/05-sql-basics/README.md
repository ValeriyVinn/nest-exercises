# 05. SQL Basics

SQL (Structured Query Language) — це мова, за допомогою якої можна працювати з реляційними базами даних.

SQL використовується для:

    створення database objects
    створення таблиць
    додавання даних
    отримання даних
    зміни даних
    видалення даних
    керування доступом
    роботи з транзакціями

У PostgreSQL SQL є основною мовою роботи з даними.

Спрощена модель:

    Application
        ↓
    SQL query
        ↓
    PostgreSQL
        ↓
    Database
        ↓
    Tables
        ↓
    Data

---

# Ключові поняття

✔ SQL  
✔ Structured Query Language  
✔ query  
✔ statement  
✔ command  
✔ clause  
✔ keyword  
✔ identifier  
✔ literal  
✔ expression  
✔ operator  
✔ function  
✔ parameter  
✔ result set  
✔ row  
✔ column  
✔ NULL  
✔ comment  
✔ semicolon  
✔ SQL syntax  
✔ SQL case-insensitivity  
✔ DDL  
✔ DML  
✔ DQL  
✔ DCL  
✔ TCL  

Основні SQL-команди:

    SELECT
    INSERT
    UPDATE
    DELETE

Для створення database objects:

    CREATE
    ALTER
    DROP

Для керування permissions:

    GRANT
    REVOKE

Для роботи з transactions:

    BEGIN
    COMMIT
    ROLLBACK

---

# Що потрібно пам'ятати

• SQL — декларативна мова.

• У SQL ми переважно описуємо, які дані хочемо отримати або яку операцію хочемо виконати, а PostgreSQL вирішує, як саме її виконати.

• SQL statement зазвичай завершується:

    ;

• SQL keywords зазвичай пишуть великими літерами для читабельності:

    SELECT
    FROM
    WHERE

Але PostgreSQL не вимагає такого написання keywords.

• SQL identifiers за замовчуванням не є case-sensitive у PostgreSQL, якщо вони не взяті в подвійні лапки.

• String literals записуються в одинарних лапках:

    'John'

• `NULL` означає відсутність значення, а не:

    0
    ''
    false

• SQL query може складатися з:

    keywords
    identifiers
    operators
    literals
    expressions
    clauses
    functions

---

# SQL Statement

SQL statement — завершена SQL-інструкція.

Наприклад:

    SELECT * FROM users;

Ще приклад:

    CREATE TABLE users (
        id INTEGER,
        name TEXT
    );

Statement зазвичай завершується:

    ;

---

# SQL Query

Query — SQL-запит до database.

Наприклад:

    SELECT *
    FROM users;

Цей query просить PostgreSQL повернути всі columns та rows таблиці `users`.

---

# Statement vs Query

Ці поняття часто використовуються майже як синоніми, але вони не повністю однакові.

`statement` — будь-яка SQL-інструкція.

`query` — зазвичай SQL-запит, який звертається до database.

Наприклад:

    SELECT *
    FROM users;

є query і statement.

А:

    CREATE TABLE users (...);

є statement, але зазвичай його не називають query у вузькому сенсі.

---

# SQL Syntax

Базова структура SQL:

    KEYWORD object condition;

Наприклад:

    SELECT name
    FROM users;

---

# SQL Keywords

Keywords — зарезервовані або спеціальні слова SQL.

Приклади:

    SELECT
    FROM
    WHERE
    INSERT
    INTO
    VALUES
    UPDATE
    SET
    DELETE
    CREATE
    TABLE
    ALTER
    DROP

Для читабельності їх часто пишуть uppercase:

    SELECT
    FROM
    WHERE

---

# SQL Case

SQL keywords у PostgreSQL зазвичай можна писати в різному регістрі.

Наприклад:

    SELECT *
    FROM users;

і:

    select *
    from users;

працюють однаково.

Але стандартний стиль:

    SELECT
    FROM
    WHERE
    ORDER BY

є значно читабельнішим.

---

# Identifiers

Identifier — ім'я database object.

Наприклад:

    users
    id
    name
    orders

У query:

    SELECT name
    FROM users;

Тут:

    name → column identifier
    users → table identifier

---

# Identifier Naming

Типовий PostgreSQL style:

    snake_case

Наприклад:

    first_name
    last_name
    created_at
    order_items

Замість:

    firstName
    lastName
    createdAt
    orderItems

Особливо зручно використовувати consistent naming convention.

---

# Quoted Identifiers

У PostgreSQL можна використовувати подвійні лапки для identifiers:

    "User"

Наприклад:

    CREATE TABLE "User" (
        "id" INTEGER,
        "name" TEXT
    );

Але quoted identifiers мають особливості та можуть ускладнити SQL.

Тому зазвичай краще використовувати:

    lowercase
    snake_case

Наприклад:

    users
    user_id
    created_at

---

# String Literals

Текстові значення записуються в одинарних лапках:

    'John'

Наприклад:

    SELECT 'Hello';

Результат:

    Hello

---

# String vs Identifier

Не плутати:

    'users'

і:

    users

У:

    SELECT *
    FROM users;

`users` — identifier, назва table.

А:

    SELECT 'users';

`'users'` — string literal.

---

# Numeric Literals

Числа можна записувати без лапок:

    10
    25
    3.14
    -100

Наприклад:

    SELECT 10 + 20;

Результат:

    30

---

# Boolean Values

PostgreSQL підтримує boolean.

Наприклад:

    TRUE
    FALSE

Query:

    SELECT TRUE;

Результат:

    true

Також:

    SELECT FALSE;

---

# NULL

`NULL` означає відсутність або невідомість значення.

Наприклад:

    SELECT NULL;

Результат:

    NULL

Не потрібно сприймати `NULL` як:

    0
    ''
    false

---

# NULL Comparison

Неправильно:

    WHERE name = NULL

Для перевірки `NULL` використовують:

    IS NULL

Наприклад:

    SELECT *
    FROM users
    WHERE email IS NULL;

Для перевірки на відсутність `NULL`:

    IS NOT NULL

Наприклад:

    SELECT *
    FROM users
    WHERE email IS NOT NULL;

---

# Comments

SQL підтримує comments.

Однорядковий comment:

    -- this is a comment

Наприклад:

    SELECT *
    FROM users; -- get all users

---

# Multiline Comments

Багаторядковий comment:

    /*
        This is
        a multiline comment
    */

Наприклад:

    /*
        Get all users
    */
    SELECT *
    FROM users;

---

# Semicolon

SQL statement зазвичай завершується:

    ;

Наприклад:

    SELECT * FROM users;

У `psql` semicolon повідомляє клієнту, що statement завершений і його можна виконувати.

---

# Multiple Statements

Можна виконати декілька statements:

    CREATE TABLE users (
        id INTEGER,
        name TEXT
    );

    SELECT *
    FROM users;

Кожен statement завершується:

    ;

---

# Expressions

Expression — конструкція, яка обчислює значення.

Наприклад:

    10 + 20

Результат:

    30

Ще приклад:

    price * quantity

Expression може використовувати:

    values
    columns
    operators
    functions

---

# Operators

SQL має оператори.

## Arithmetic

    +
    -
    *
    /
    %

Наприклад:

    SELECT 10 + 5;

Результат:

    15

---

# Comparison Operators

Основні:

    =
    <>
    !=
    >
    <
    >=
    <=

Наприклад:

    SELECT *
    FROM products
    WHERE price > 100;

---

# Logical Operators

Основні:

    AND
    OR
    NOT

Наприклад:

    SELECT *
    FROM users
    WHERE age >= 18
    AND active = TRUE;

---

# AND

Умова `AND` вимагає виконання обох умов.

    WHERE age >= 18
    AND active = TRUE

Логіка:

    condition A
        AND
    condition B

    ↓

    TRUE тільки якщо A і B TRUE

---

# OR

`OR` достатньо, щоб виконувалась хоча б одна умова.

    WHERE city = 'Kyiv'
    OR city = 'Vinnytsia'

---

# NOT

`NOT` заперечує умову.

    WHERE NOT active

---

# Operator Precedence

У складних expressions важливо враховувати порядок виконання операторів.

Для явності використовуй parentheses:

    WHERE (
        age >= 18
        AND active = TRUE
    )

Це покращує читабельність і зменшує ризик помилки.

---

# Parentheses

Дужки використовуються для групування expressions.

Наприклад:

    SELECT (10 + 20) * 2;

Результат:

    60

---

# SELECT

`SELECT` використовується для отримання даних.

Базовий синтаксис:

    SELECT columns
    FROM table;

Наприклад:

    SELECT name
    FROM users;

---

# SELECT *

`*` означає всі columns.

    SELECT *
    FROM users;

Це поверне всі columns таблиці.

---

# SELECT Specific Columns

Краще явно вказувати потрібні columns.

    SELECT
        id,
        name,
        email
    FROM users;

Це робить query зрозумілішим і часто дозволяє не отримувати зайві дані.

---

# SELECT Expression

`SELECT` може виконувати expressions без table.

Наприклад:

    SELECT 10 + 20;

Результат:

    30

Ще:

    SELECT 100 / 4;

Результат:

    25

---

# SELECT Multiple Expressions

    SELECT
        10 + 20 AS sum,
        10 * 20 AS product;

Результат:

    sum | product
    ----+--------
    30  | 200

---

# AS

`AS` використовується для створення alias.

Наприклад:

    SELECT
        10 + 20 AS total;

Результат:

    total
    -----
    30

---

# Column Alias

Наприклад:

    SELECT
        first_name AS name
    FROM users;

Alias:

    name

буде назвою результативної column.

---

# Table Alias

Таблиці також можна давати aliases.

    SELECT
        u.name
    FROM users AS u;

Можна скоротити:

    SELECT
        u.name
    FROM users u;

---

# FROM

`FROM` визначає джерело даних.

Наприклад:

    SELECT *
    FROM users;

Тут:

    SELECT → що отримати
    FROM   → звідки отримати

---

# Basic SELECT Model

Основна модель:

    SELECT
        columns
    FROM
        table;

Наприклад:

    SELECT
        id,
        name
    FROM
        users;

---

# WHERE

`WHERE` використовується для фільтрації rows.

Наприклад:

    SELECT *
    FROM users
    WHERE age >= 18;

Логіка:

    table
      ↓
    WHERE
      ↓
    matching rows
      ↓
    SELECT

---

# Basic WHERE

    SELECT *
    FROM products
    WHERE price > 100;

Отримаємо тільки products, у яких:

    price > 100

---

# WHERE with Text

    SELECT *
    FROM users
    WHERE city = 'Kyiv';

---

# WHERE with AND

    SELECT *
    FROM users
    WHERE age >= 18
      AND active = TRUE;

---

# WHERE with OR

    SELECT *
    FROM users
    WHERE city = 'Kyiv'
       OR city = 'Vinnytsia';

---

# WHERE with NOT

    SELECT *
    FROM users
    WHERE NOT active;

---

# INSERT

`INSERT` додає rows до table.

Синтаксис:

    INSERT INTO table_name (
        column1,
        column2
    )
    VALUES (
        value1,
        value2
    );

---

# INSERT Example

    INSERT INTO users (
        name,
        email
    )
    VALUES (
        'John',
        'john@example.com'
    );

---

# INSERT Multiple Rows

Можна додати декілька rows:

    INSERT INTO users (
        name,
        email
    )
    VALUES
        ('John', 'john@example.com'),
        ('Anna', 'anna@example.com'),
        ('Mike', 'mike@example.com');

---

# INSERT Best Practice

Краще явно вказувати columns:

    INSERT INTO users (
        name,
        email
    )
    VALUES (
        'John',
        'john@example.com'
    );

Замість:

    INSERT INTO users
    VALUES (
        1,
        'John',
        'john@example.com'
    );

Явний список columns робить код надійнішим.

---

# INSERT RETURNING

PostgreSQL має корисну конструкцію:

    RETURNING

Наприклад:

    INSERT INTO users (
        name,
        email
    )
    VALUES (
        'John',
        'john@example.com'
    )
    RETURNING id;

PostgreSQL поверне створений `id`.

Можна повернути всі columns:

    RETURNING *;

---

# UPDATE

`UPDATE` змінює існуючі rows.

Синтаксис:

    UPDATE table_name
    SET column = value
    WHERE condition;

Наприклад:

    UPDATE users
    SET name = 'John Smith'
    WHERE id = 1;

---

# UPDATE Multiple Columns

    UPDATE users
    SET
        name = 'John Smith',
        active = TRUE
    WHERE id = 1;

---

# UPDATE Without WHERE

Обережно:

    UPDATE users
    SET active = FALSE;

Це змінить `active` для всіх rows.

Тому перед UPDATE потрібно перевіряти:

    WHERE

---

# UPDATE RETURNING

PostgreSQL дозволяє отримати змінені rows:

    UPDATE users
    SET active = FALSE
    WHERE id = 1
    RETURNING *;

---

# DELETE

`DELETE` видаляє rows.

Синтаксис:

    DELETE FROM table_name
    WHERE condition;

Наприклад:

    DELETE FROM users
    WHERE id = 10;

---

# DELETE Without WHERE

Обережно:

    DELETE FROM users;

Це видалить всі rows таблиці.

Перед DELETE потрібно перевіряти condition.

---

# DELETE RETURNING

PostgreSQL:

    DELETE FROM users
    WHERE id = 10
    RETURNING *;

Можна побачити, які rows були видалені.

---

# CRUD

Основні операції з даними називають CRUD:

    C → Create
    R → Read
    U → Update
    D → Delete

У SQL:

    INSERT → Create
    SELECT → Read
    UPDATE → Update
    DELETE → Delete

---

# CRUD Example

Create:

    INSERT INTO users (
        name
    )
    VALUES (
        'John'
    );

Read:

    SELECT *
    FROM users;

Update:

    UPDATE users
    SET name = 'John Smith'
    WHERE id = 1;

Delete:

    DELETE FROM users
    WHERE id = 1;

---

# SQL Command Categories

SQL можна умовно поділити на групи.

    DQL
    DML
    DDL
    DCL
    TCL

---

# DQL

DQL — Data Query Language.

Основна команда:

    SELECT

Використовується для читання data.

---

# DML

DML — Data Manipulation Language.

Основні commands:

    INSERT
    UPDATE
    DELETE

Вони змінюють data.

---

# DDL

DDL — Data Definition Language.

Основні commands:

    CREATE
    ALTER
    DROP
    TRUNCATE

Вони працюють зі структурою database objects.

Наприклад:

    CREATE TABLE users (...);

---

# DCL

DCL — Data Control Language.

Основні commands:

    GRANT
    REVOKE

Використовуються для керування permissions.

---

# TCL

TCL — Transaction Control Language.

Основні commands:

    BEGIN
    COMMIT
    ROLLBACK

Використовуються для керування transactions.

---

# SQL Categories — Cheat Sheet

    DQL
        SELECT

    DML
        INSERT
        UPDATE
        DELETE

    DDL
        CREATE
        ALTER
        DROP
        TRUNCATE

    DCL
        GRANT
        REVOKE

    TCL
        BEGIN
        COMMIT
        ROLLBACK

---

# CREATE TABLE

`CREATE TABLE` створює table.

Наприклад:

    CREATE TABLE users (
        id INTEGER,
        name TEXT,
        email TEXT
    );

---

# ALTER TABLE

`ALTER TABLE` змінює структуру table.

Наприклад:

    ALTER TABLE users
    ADD COLUMN age INTEGER;

---

# DROP TABLE

`DROP TABLE` видаляє table.

    DROP TABLE users;

⚠️ Це видаляє table та її data.

---

# TRUNCATE

`TRUNCATE` видаляє всі rows table.

    TRUNCATE TABLE users;

Але сама table залишається.

Порівняння:

    DROP TABLE
        ↓
    видаляє table

    TRUNCATE
        ↓
    видаляє всі rows
    table залишається

---

# SQL Execution Model

Для базового розуміння корисно уявляти:

    SQL statement
        ↓
    PostgreSQL parser
        ↓
    validation / analysis
        ↓
    planning
        ↓
    execution
        ↓
    result

Наприклад:

    SELECT *
    FROM users
    WHERE age >= 18;

PostgreSQL аналізує statement, створює execution plan і виконує його.

---

# Declarative Language

SQL є декларативною мовою.

Наприклад:

    SELECT *
    FROM users
    WHERE age >= 18;

Ми кажемо:

    "Дай мені users, яким 18 або більше"

А не описуємо покроково:

    1. прочитай перший row
    2. перевір age
    3. якщо age >= 18
    4. додай row
    5. перейди до наступного

Цим займається PostgreSQL.

---

# SQL vs JavaScript

JavaScript:

    const adults = users.filter(
        user => user.age >= 18
    );

SQL:

    SELECT *
    FROM users
    WHERE age >= 18;

У JavaScript ми описуємо алгоритм обробки collection.

У SQL ми описуємо бажаний результат.

---

# SQL Query Structure

Базовий query:

    SELECT
        columns
    FROM
        table
    WHERE
        condition;

Наприклад:

    SELECT
        id,
        name
    FROM
        users
    WHERE
        age >= 18;

---

# Basic SQL Clauses

Основні clauses, які потрібно знати:

    SELECT
    FROM
    WHERE

Пізніше:

    ORDER BY
    LIMIT
    OFFSET
    GROUP BY
    HAVING
    JOIN

На цьому етапі головне:

    SELECT
    FROM
    WHERE

---

# SQL Logical Query Processing

Хоча query пишеться:

    SELECT
    FROM
    WHERE

логічно SQL можна уявляти приблизно так:

    FROM
      ↓
    WHERE
      ↓
    SELECT

Наприклад:

    SELECT name
    FROM users
    WHERE age >= 18;

Спочатку визначається source:

    FROM users

Потім filter:

    WHERE age >= 18

Потім формується result:

    SELECT name

Це важлива концепція для подальшого вивчення SQL.

---

# SQL Formatting

Погано:

    SELECT id,name,email FROM users WHERE age>=18 AND active=true;

Краще:

    SELECT
        id,
        name,
        email
    FROM users
    WHERE age >= 18
      AND active = TRUE;

Хороше formatting дуже допомагає при складних queries.

---

# Uppercase Keywords

Рекомендований стиль:

    SELECT
    FROM
    WHERE
    INSERT INTO
    VALUES
    UPDATE
    SET
    DELETE FROM

Наприклад:

    SELECT
        id,
        name
    FROM users
    WHERE active = TRUE;

---

# One Clause Per Line

Для складних queries:

    SELECT
        id,
        name,
        email
    FROM users
    WHERE age >= 18
      AND active = TRUE;

Це набагато легше читати.

---

# SQL Naming Style

Рекомендований базовий стиль PostgreSQL:

    users
    user_id
    first_name
    created_at
    order_items

Для names:

    lowercase
    snake_case

---

# Reserved Words

Деякі слова мають спеціальне значення в SQL.

Наприклад:

    SELECT
    FROM
    WHERE
    TABLE
    USER

Не рекомендується використовувати SQL keywords як names.

Замість:

    user

краще:

    users

або:

    app_users

---

# SQL Functions

SQL підтримує functions.

Наприклад:

    SELECT
        LENGTH('Hello');

Результат:

    5

Ще:

    SELECT
        LOWER('HELLO');

Результат:

    hello

Functions будуть детально розглядатися в наступних темах.

---

# Function Arguments

Function може приймати arguments.

Наприклад:

    LENGTH('PostgreSQL');

Або:

    LOWER('HELLO');

Структура:

    function_name(argument)

---

# SQL Type Conversion

PostgreSQL дозволяє конвертувати types.

Наприклад:

    SELECT '10'::INTEGER;

Результат:

    10

Або:

    SELECT CAST('10' AS INTEGER);

---

# CAST

Стандартний SQL syntax:

    CAST(value AS type)

Наприклад:

    SELECT CAST('100' AS INTEGER);

---

# PostgreSQL Cast Operator

PostgreSQL має короткий syntax:

    value::type

Наприклад:

    SELECT '100'::INTEGER;

Ще:

    SELECT 100::TEXT;

---

# String Concatenation

PostgreSQL використовує:

    ||

для concatenation.

Наприклад:

    SELECT
        'Hello' || ' ' || 'World';

Результат:

    Hello World

Для columns:

    SELECT
        first_name || ' ' || last_name AS full_name
    FROM users;

---

# Basic Arithmetic

SQL може виконувати арифметику.

    SELECT
        10 + 5 AS addition,
        10 - 5 AS subtraction,
        10 * 5 AS multiplication,
        10 / 5 AS division;

---

# Modulo

Оператор:

    %

Наприклад:

    SELECT 10 % 3;

Результат:

    1

---

# Comparison Example

    SELECT *
    FROM products
    WHERE price >= 100;

Основні comparison operators:

    =

    !=

    <>

    >

    <

    >=

    <=

---

# Boolean Logic Example

    SELECT *
    FROM users
    WHERE active = TRUE
      AND age >= 18;

---

# SQL NULL Logic

`NULL` має особливу логіку.

Наприклад:

    NULL = NULL

не дає `TRUE`.

Для `NULL` потрібно використовувати:

    IS NULL

або:

    IS NOT NULL

---

# SQL Result Set

Результат `SELECT` називається result set.

Наприклад:

    SELECT
        id,
        name
    FROM users;

Результат може містити:

    columns
    rows

Наприклад:

    id | name
    ---+------
    1  | John
    2  | Anna
    3  | Mike

---

# Row

Row — один запис у table/result set.

Наприклад:

    1 | John | john@example.com

Це один row.

---

# Column

Column — поле table.

Наприклад:

    id
    name
    email

---

# SQL Workflow

Типовий workflow:

    CREATE TABLE
        ↓
    INSERT
        ↓
    SELECT
        ↓
    UPDATE
        ↓
    SELECT
        ↓
    DELETE

Наприклад:

    CREATE TABLE users (
        id INTEGER,
        name TEXT
    );

    INSERT INTO users (
        id,
        name
    )
    VALUES (
        1,
        'John'
    );

    SELECT *
    FROM users;

    UPDATE users
    SET name = 'John Smith'
    WHERE id = 1;

    SELECT *
    FROM users;

    DELETE FROM users
    WHERE id = 1;

---

# Безпечний порядок роботи з UPDATE / DELETE

Перед UPDATE:

    SELECT *
    FROM users
    WHERE id = 10;

Потім:

    UPDATE users
    SET active = FALSE
    WHERE id = 10;

Перед DELETE:

    SELECT *
    FROM users
    WHERE id = 10;

Потім:

    DELETE FROM users
    WHERE id = 10;

Це хороший практичний habit.

---

# Практика

## Вправа 1 — SELECT expression

Виконай:

    SELECT 10 + 20;

Потім:

    SELECT 100 / 4;

Потім:

    SELECT 10 * 5;

---

## Вправа 2 — aliases

    SELECT
        10 + 20 AS sum,
        10 * 20 AS product;

---

## Вправа 3 — створити table

    CREATE TABLE users (
        id INTEGER,
        name TEXT,
        age INTEGER
    );

---

## Вправа 4 — додати data

    INSERT INTO users (
        id,
        name,
        age
    )
    VALUES
        (1, 'John', 25),
        (2, 'Anna', 17),
        (3, 'Mike', 32);

---

## Вправа 5 — прочитати всі data

    SELECT *
    FROM users;

---

## Вправа 6 — вибрати columns

    SELECT
        name,
        age
    FROM users;

---

## Вправа 7 — WHERE

    SELECT *
    FROM users
    WHERE age >= 18;

---

## Вправа 8 — AND

    SELECT *
    FROM users
    WHERE age >= 18
      AND name = 'John';

---

## Вправа 9 — UPDATE

Спочатку:

    SELECT *
    FROM users
    WHERE id = 1;

Потім:

    UPDATE users
    SET age = 26
    WHERE id = 1;

Перевір:

    SELECT *
    FROM users
    WHERE id = 1;

---

## Вправа 10 — DELETE

Спочатку:

    SELECT *
    FROM users
    WHERE id = 2;

Потім:

    DELETE FROM users
    WHERE id = 2;

Перевір:

    SELECT *
    FROM users;

---

## Вправа 11 — NULL

Додай row:

    INSERT INTO users (
        id,
        name,
        age
    )
    VALUES (
        4,
        'Sarah',
        NULL
    );

Перевір:

    SELECT *
    FROM users
    WHERE age IS NULL;

---

## Вправа 12 — RETURNING

    INSERT INTO users (
        id,
        name,
        age
    )
    VALUES (
        5,
        'Tom',
        30
    )
    RETURNING *;

---

# Практична вправа — CRUD

Створити:

    CREATE TABLE products (
        id INTEGER,
        name TEXT,
        price NUMERIC
    );

Додати:

    INSERT INTO products (
        id,
        name,
        price
    )
    VALUES
        (1, 'Laptop', 1000),
        (2, 'Mouse', 25),
        (3, 'Keyboard', 80);

Read:

    SELECT *
    FROM products;

Filter:

    SELECT *
    FROM products
    WHERE price > 50;

Update:

    UPDATE products
    SET price = 90
    WHERE id = 3;

Delete:

    DELETE FROM products
    WHERE id = 2;

---

# Типові помилки

❌ Забувати `;` у `psql`.

    SELECT *
    FROM users

Потрібно:

    SELECT *
    FROM users;

---

❌ Плутати одинарні та подвійні лапки.

String:

    'John'

Identifier:

    "name"

---

❌ Писати:

    WHERE age = NULL

Правильно:

    WHERE age IS NULL

---

❌ UPDATE без WHERE.

    UPDATE users
    SET active = FALSE;

Це змінить всі rows.

---

❌ DELETE без WHERE.

    DELETE FROM users;

Це видалить всі rows.

---

❌ Плутати `NULL` і `0`.

    NULL ≠ 0

---

❌ Плутати `NULL` і empty string.

    NULL ≠ ''

---

❌ Плутати database і table.

    database
        ↓
    містить schemas

    schema
        ↓
    містить tables

---

❌ Використовувати `SELECT *` всюди.

Для навчання:

    SELECT *
    FROM users;

нормально.

У production queries часто краще явно вказувати columns:

    SELECT
        id,
        name,
        email
    FROM users;

---

❌ Використовувати SQL keywords як identifiers.

Наприклад:

    SELECT
    FROM
    USER

Краще використовувати зрозумілі names:

    users
    user_id
    user_name

---

❌ Не перевіряти UPDATE / DELETE перед виконанням.

Безпечний pattern:

    SELECT ...
    WHERE ...

    ↓

    UPDATE / DELETE
    WHERE ...

---

# Питання зі співбесіди

Що таке SQL?

Що означає SQL?

Чим SQL відрізняється від PostgreSQL?

Що таке SQL query?

Що таке SQL statement?

Що таке clause?

Що таке keyword?

Що таке identifier?

Що таке literal?

Що таке expression?

Що таке operator?

Що таке result set?

Що таке row?

Що таке column?

Навіщо потрібен `;`?

Чи важливий регістр SQL keywords?

Чим відрізняються `'name'` і `"name"`?

Що таке `NULL`?

Чим `NULL` відрізняється від `0`?

Чим `NULL` відрізняється від `''`?

Як перевірити `NULL`?

Для чого потрібен `SELECT`?

Для чого потрібен `FROM`?

Для чого потрібен `WHERE`?

Для чого потрібен `INSERT`?

Для чого потрібен `UPDATE`?

Для чого потрібен `DELETE`?

Що таке CRUD?

Що означає DQL?

Що означає DML?

Що означає DDL?

Що означає DCL?

Що означає TCL?

Які команди належать до DML?

Які команди належать до DDL?

Чим `DROP TABLE` відрізняється від `TRUNCATE`?

Що станеться при `UPDATE` без `WHERE`?

Що станеться при `DELETE` без `WHERE`?

Для чого потрібен `RETURNING` у PostgreSQL?

Що таке alias?

Для чого потрібен `AS`?

Що таке declarative language?

Чим SQL відрізняється від імперативного підходу?

Який базовий порядок SQL query?

Що робить `SELECT *`?

Що таке SQL function?

Що таке type casting?

Чим `CAST()` відрізняється від PostgreSQL `::`?

Як об'єднати strings у PostgreSQL?

Що робить оператор `||`?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке SQL.

SQL vs PostgreSQL.

Query.

Statement.

Keyword.

Identifier.

Literal.

Expression.

Operator.

Clause.

Row.

Column.

Result set.

`;`.

Comments.

`SELECT`.

`FROM`.

`WHERE`.

`INSERT`.

`UPDATE`.

`DELETE`.

CRUD.

`NULL`.

`IS NULL`.

`IS NOT NULL`.

Comparison operators.

Logical operators.

    AND
    OR
    NOT

Основи:

    DQL
    DML
    DDL

---

🔵 Junior

Розуміння SQL syntax.

SQL formatting.

SQL naming conventions.

Aliases.

    AS

Table aliases.

Column aliases.

Expressions.

Arithmetic operators.

Comparison operators.

Boolean logic.

`NULL` logic.

`RETURNING`.

    INSERT ... RETURNING
    UPDATE ... RETURNING
    DELETE ... RETURNING

`CREATE TABLE`.

`ALTER TABLE`.

`DROP TABLE`.

`TRUNCATE`.

Type casting.

    CAST()
    ::

String concatenation.

    ||

SQL functions.

Declarative nature of SQL.

Основи logical query processing.

Безпечне використання:

    UPDATE
    DELETE

---

🟠 Middle

Глибоке розуміння SQL execution.

SQL parsing.

Query analysis.

Query planning.

Execution plan.

Logical query processing.

Expression evaluation.

Operator precedence.

NULL three-valued logic.

Type conversion.

Implicit vs explicit casts.

SQL functions.

Set-based operations.

CTE.

Subqueries.

Window functions.

Advanced SQL expressions.

Transactions.

Locks.

Concurrency.

Query optimization.

---

🔴 Senior

Глибоке розуміння PostgreSQL SQL engine.

Parser.

Analyzer.

Planner.

Executor.

Query rewrite system.

Cost-based optimization.

Statistics.

Cardinality estimation.

Join strategies.

Index usage.

Expression optimization.

Predicate pushdown.

Query rewriting.

Execution plans.

Concurrency control.

MVCC.

Transaction isolation.

Locking.

Advanced SQL design.

Set-based thinking.

SQL performance engineering.

Production query optimization.

---

# Міні-шпаргалка

## SELECT

    SELECT
        id,
        name
    FROM users;

---

## WHERE

    SELECT *
    FROM users
    WHERE age >= 18;

---

## AND

    SELECT *
    FROM users
    WHERE age >= 18
      AND active = TRUE;

---

## OR

    SELECT *
    FROM users
    WHERE city = 'Kyiv'
       OR city = 'Vinnytsia';

---

## NOT

    SELECT *
    FROM users
    WHERE NOT active;

---

## INSERT

    INSERT INTO users (
        name,
        email
    )
    VALUES (
        'John',
        'john@example.com'
    );

---

## UPDATE

    UPDATE users
    SET name = 'John Smith'
    WHERE id = 1;

---

## DELETE

    DELETE FROM users
    WHERE id = 1;

---

## RETURNING

    INSERT INTO users (
        name
    )
    VALUES (
        'John'
    )
    RETURNING *;

---

## NULL

    WHERE email IS NULL

    WHERE email IS NOT NULL

---

## Alias

    SELECT
        first_name AS name
    FROM users;

---

## Arithmetic

    SELECT
        10 + 5,
        10 - 5,
        10 * 5,
        10 / 5,
        10 % 3;

---

## String concatenation

    SELECT
        first_name || ' ' || last_name AS full_name
    FROM users;

---

## Type casting

    SELECT '100'::INTEGER;

    SELECT CAST('100' AS INTEGER);

---

## CRUD

    INSERT → Create
    SELECT → Read
    UPDATE → Update
    DELETE → Delete

---

## SQL categories

    DQL
        ↓
    SELECT

    DML
        ↓
    INSERT
    UPDATE
    DELETE

    DDL
        ↓
    CREATE
    ALTER
    DROP
    TRUNCATE

    DCL
        ↓
    GRANT
    REVOKE

    TCL
        ↓
    BEGIN
    COMMIT
    ROLLBACK

---

# SQL Basic Flow

    SQL statement
          ↓
    PostgreSQL parser
          ↓
    analysis
          ↓
    query planning
          ↓
    execution
          ↓
    result

---

# Basic Query Model

    SELECT
        columns
    FROM
        table
    WHERE
        condition;

---

# Логічна модель SELECT

    FROM
      ↓
    WHERE
      ↓
    SELECT
      ↓
    RESULT

Наприклад:

    SELECT
        name
    FROM users
    WHERE age >= 18;

---

# Основні правила

    SELECT
        → отримати data

    FROM
        → визначити source

    WHERE
        → відфільтрувати rows

    INSERT
        → додати rows

    UPDATE
        → змінити rows

    DELETE
        → видалити rows

---

    NULL
        → відсутність / невідомість значення

    IS NULL
        → перевірка NULL

    IS NOT NULL
        → перевірка не-NULL

---

    'text'
        → string literal

    "identifier"
        → quoted identifier

    users
        → identifier

---

    AND
        → всі умови

    OR
        → хоча б одна умова

    NOT
        → заперечення

---

# Головне

• SQL — основна мова роботи з реляційними databases.

• PostgreSQL — database management system, яка реалізує та розширює SQL.

• SQL є декларативною мовою.

• SQL query описує бажаний результат, а PostgreSQL визначає спосіб його отримання.

• Основні операції CRUD:

    INSERT
    SELECT
    UPDATE
    DELETE

• Основна структура простого query:

    SELECT
        columns
    FROM
        table
    WHERE
        condition;

• `SELECT` отримує data.

• `FROM` визначає source.

• `WHERE` фільтрує rows.

• `INSERT` додає rows.

• `UPDATE` змінює rows.

• `DELETE` видаляє rows.

• `UPDATE` та `DELETE` без `WHERE` можуть змінити або видалити всі rows.

• `NULL` — не те саме, що:

    0
    ''
    FALSE

• Для перевірки `NULL` використовують:

    IS NULL
    IS NOT NULL

• String literals пишуться в одинарних лапках:

    'John'

• Identifiers можуть бути quoted подвійними лапками:

    "name"

• Для PostgreSQL бажано використовувати:

    lowercase
    snake_case

наприклад:

    first_name
    created_at
    order_items

• SQL statements зазвичай завершуються:

    ;

• SQL підтримує comments:

    -- comment

і:

    /*
        comment
    */

• `AS` створює alias.

• `RETURNING` — важливе PostgreSQL extension для отримання rows, які були вставлені, змінені або видалені.

• Основні SQL categories:

    DQL → SELECT
    DML → INSERT / UPDATE / DELETE
    DDL → CREATE / ALTER / DROP / TRUNCATE
    DCL → GRANT / REVOKE
    TCL → BEGIN / COMMIT / ROLLBACK

• PostgreSQL підтримує type casting:

    '10'::INTEGER

або:

    CAST('10' AS INTEGER)

• PostgreSQL використовує `||` для concatenation:

    'Hello' || ' ' || 'World'

• Найважливіша базова модель SQL:

    SELECT
        ↓
    FROM
        ↓
    WHERE
        ↓
    RESULT

• Але логічно query можна уявляти як:

    FROM
        ↓
    WHERE
        ↓
    SELECT
        ↓
    RESULT

• Наступні важливі кроки вивчення SQL:

    SELECT
        ↓
    filtering
        ↓
    sorting
        ↓
    pagination
        ↓
    aggregate functions
        ↓
    GROUP BY
        ↓
    HAVING
        ↓
    JOIN
        ↓
    subqueries
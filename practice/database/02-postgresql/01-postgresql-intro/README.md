# 01. PostgreSQL Introduction

PostgreSQL — це потужна об'єктно-реляційна система керування базами даних (ORDBMS), яка використовується для зберігання, організації, пошуку та обробки структурованих даних.

PostgreSQL підтримує стандарт SQL і додає багато власних можливостей:

    relational databases
    SQL
    transactions
    constraints
    indexes
    views
    functions
    procedures
    triggers
    JSON / JSONB
    arrays
    full-text search
    extensions
    replication
    advanced data types

PostgreSQL часто використовується для:

- backend-застосунків;
- REST API;
- вебзастосунків;
- фінансових систем;
- CMS;
- аналітичних систем;
- SaaS;
- корпоративних систем;
- data-intensive applications.

---

# Ключові поняття

✔ database  
✔ DBMS  
✔ RDBMS  
✔ ORDBMS  
✔ PostgreSQL  
✔ SQL  
✔ relational database  
✔ table  
✔ row  
✔ column  
✔ record  
✔ primary key  
✔ foreign key  
✔ relationship  
✔ schema  
✔ query  
✔ transaction  
✔ constraint  
✔ index  
✔ view  
✔ function  
✔ procedure  
✔ trigger  
✔ extension  
✔ client  
✔ server  
✔ PostgreSQL cluster  

---

# Що потрібно пам'ятати

• PostgreSQL — це DBMS, а не сама база даних.

• PostgreSQL реалізує реляційну модель даних та підтримує SQL.

• Дані зазвичай організовані у таблиці.

• Таблиця складається з rows та columns.

• Row представляє один запис.

• Column представляє одну характеристику даних.

• SQL використовується для роботи з даними.

• PostgreSQL працює за моделлю client-server.

• `psql` — консольний PostgreSQL client.

• PostgreSQL server — програма, яка приймає запити та працює з базами даних.

• Одна PostgreSQL installation може містити багато databases.

• Database може містити schemas.

• Schema може містити tables, views, functions та інші objects.

• PostgreSQL підтримує транзакції.

• PostgreSQL має сильну систему constraints.

• PostgreSQL підтримує indexes для прискорення пошуку.

• PostgreSQL підтримує не тільки звичайні SQL-типи, а й JSONB, arrays та інші спеціальні типи.

---

# Database

Database — організована колекція даних, яка зберігається та обробляється системою керування базами даних.

Наприклад:

    users
    products
    orders
    payments

можуть бути представлені таблицями в одній database.

Спрощено:

    Database
        ↓
    Tables
        ↓
    Rows + Columns

---

# DBMS

DBMS — Database Management System.

Це програмне забезпечення, яке дозволяє:

    create data
    read data
    update data
    delete data
    organize data
    secure data
    query data
    manage transactions
    manage users

Приклади DBMS:

    PostgreSQL
    MySQL
    MariaDB
    Microsoft SQL Server
    Oracle Database
    SQLite

---

# PostgreSQL

PostgreSQL — open-source object-relational database management system.

Коротко:

    PostgreSQL
        ↓
    DBMS
        ↓
    relational / object-relational
        ↓
    SQL + PostgreSQL extensions

PostgreSQL розвивається як open-source project і має велику екосистему extensions та інструментів.

---

# Relational Database

Relational database — база даних, у якій дані організовані у relations, які на практиці зазвичай представлені tables.

Наприклад:

    users

    id | name  | email
    ---|-------|----------------
    1  | John  | john@example.com
    2  | Anna  | anna@example.com

Інша таблиця:

    orders

    id | user_id | amount
    ---|---------|-------
    1  | 1       | 100
    2  | 1       | 250
    3  | 2       | 150

`user_id` може посилатися на:

    users.id

Таким чином виникає relationship між таблицями.

---

# Table

Table — основна структура для зберігання табличних даних.

Наприклад:

    CREATE TABLE users (
        id INTEGER,
        name TEXT,
        email TEXT
    );

Таблиця має:

    columns
    rows

---

# Column

Column — окрема характеристика даних у таблиці.

Наприклад:

    id
    name
    email
    age

Кожна column має data type.

Наприклад:

    id      INTEGER
    name    TEXT
    age     INTEGER
    active  BOOLEAN

---

# Row

Row — один запис у таблиці.

Наприклад:

    id | name | age
    ---|------|----
    1  | John | 25

Це один row.

Ще один:

    2 | Anna | 30

Тобто:

    table
       ↓
    rows
       ↓
    individual records

---

# Record

Record — логічно пов'язаний набір значень, який представляє один об'єкт або подію.

Наприклад:

    1 | John | john@example.com

може бути record користувача.

У реляційних БД record зазвичай відповідає row.

---

# SQL

SQL — Structured Query Language.

SQL використовується для взаємодії з реляційною базою даних.

Основні категорії SQL:

    DDL
    DML
    DQL
    DCL
    TCL

---

# DDL

DDL — Data Definition Language.

Використовується для створення та зміни структури database objects.

Основні команди:

    CREATE
    ALTER
    DROP
    TRUNCATE

Наприклад:

    CREATE TABLE users (
        id INTEGER,
        name TEXT
    );

---

# DML

DML — Data Manipulation Language.

Використовується для зміни даних.

Основні команди:

    INSERT
    UPDATE
    DELETE

Наприклад:

    INSERT INTO users (name)
    VALUES ('John');

---

# DQL

DQL — Data Query Language.

Найчастіше до DQL відносять:

    SELECT

Наприклад:

    SELECT *
    FROM users;

`SELECT` отримує дані з database.

---

# DCL

DCL — Data Control Language.

Використовується для керування permissions.

Основні команди:

    GRANT
    REVOKE

Наприклад:

    GRANT SELECT ON users TO app_user;

---

# TCL

TCL — Transaction Control Language.

Використовується для керування transactions.

Основні команди:

    BEGIN
    COMMIT
    ROLLBACK
    SAVEPOINT

Наприклад:

    BEGIN;

    UPDATE accounts
    SET balance = balance - 100
    WHERE id = 1;

    COMMIT;

---

# SQL Query

Query — запит до database.

Наприклад:

    SELECT *
    FROM users;

Цей запит означає:

    SELECT → отримати
    *      → усі columns
    FROM   → з
    users  → таблиці users

---

# PostgreSQL Client-Server Model

PostgreSQL працює за client-server architecture.

Спрощено:

    Application / Client
            ↓
         SQL query
            ↓
    PostgreSQL Server
            ↓
        Database
            ↓
           Data

Наприклад:

    psql
      ↓
    PostgreSQL Server
      ↓
    my_database

---

# PostgreSQL Server

PostgreSQL server — серверний процес, який:

- приймає client connections;
- обробляє SQL queries;
- керує database objects;
- читає та записує дані;
- виконує transactions;
- контролює доступ;
- керує concurrency.

Важливо:

PostgreSQL server — це вже готове програмне забезпечення.

Розробник зазвичай:

    встановлює PostgreSQL
        ↓
    запускає server
        ↓
    створює databases
        ↓
    створює tables
        ↓
    працює через SQL

Не потрібно писати власний database server.

---

# PostgreSQL Client

Client — програма, яка підключається до PostgreSQL server.

Приклади:

    psql
    pgAdmin
    pgcli
    application backend

Наприклад:

    psql
       ↓
    PostgreSQL server

Або:

    NestJS / Node.js
       ↓
    PostgreSQL driver
       ↓
    PostgreSQL server

---

# psql

`psql` — офіційний command-line client PostgreSQL.

Запуск:

    psql -U postgres

Підключення до конкретної database:

    psql -U postgres -d my_database

Після підключення можна виконувати SQL:

    SELECT version();

або PostgreSQL meta-commands:

    \l

    \dt

    \du

---

# SQL vs psql Commands

Це важлива різниця.

SQL:

    SELECT *
    FROM users;

Це SQL query, який передається PostgreSQL server.

А:

    \dt

це `psql` meta-command.

Він обробляється самим `psql`.

Приклади `psql` commands:

    \l
    \c database_name
    \dt
    \d table_name
    \du
    \q

---

# PostgreSQL Cluster

У PostgreSQL термін cluster має спеціальне значення.

PostgreSQL cluster — це набір database objects та server-level data, яким керує один PostgreSQL server instance.

Спрощено:

    PostgreSQL Server
          ↓
       Cluster
       ├── database_1
       ├── database_2
       └── database_3

Одна PostgreSQL installation/server instance може обслуговувати кілька databases.

---

# Database → Schema → Table

Важливо розуміти ієрархію.

Спрощена модель:

    PostgreSQL Server
          ↓
       Database
          ↓
       Schema
          ↓
       Table
          ↓
       Row / Column

Наприклад:

    PostgreSQL
        ↓
    shop
        ↓
    public
        ↓
    products
        ↓
    rows

---

# Schema

Schema — namespace всередині database.

Schema дозволяє організовувати database objects.

Наприклад:

    shop
      ├── public
      │     ├── users
      │     └── products
      │
      └── admin
            ├── logs
            └── settings

За замовчуванням PostgreSQL часто використовує:

    public

schema.

---

# public Schema

Після створення database PostgreSQL зазвичай має schema:

    public

Наприклад:

    public.users
    public.products
    public.orders

Якщо schema не вказана:

    SELECT *
    FROM users;

PostgreSQL використовує search path для пошуку object.

Явне ім'я:

    SELECT *
    FROM public.users;

---

# Object

Database object — структурна одиниця database.

PostgreSQL підтримує багато типів objects.

Наприклад:

    database
    schema
    table
    column
    index
    view
    sequence
    function
    procedure
    trigger
    type
    extension

---

# Primary Key

Primary key — column або набір columns, які однозначно ідентифікують row.

Наприклад:

    id INTEGER PRIMARY KEY

Приклад:

    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name TEXT
    );

Значення `id` має бути унікальним і не `NULL`.

---

# Foreign Key

Foreign key створює посилання на row в іншій таблиці.

Наприклад:

    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name TEXT
    );

    CREATE TABLE orders (
        id INTEGER PRIMARY KEY,
        user_id INTEGER REFERENCES users(id)
    );

Тут:

    orders.user_id
            ↓
    users.id

---

# Relationship

Relationship — логічний зв'язок між entities/tables.

Основні типи:

    one-to-one
    one-to-many
    many-to-many

Наприклад:

    User
      ↓
    many Orders

Це:

    one-to-many

---

# Constraints

Constraints — правила, які контролюють допустимі дані.

Основні constraints:

    PRIMARY KEY
    FOREIGN KEY
    UNIQUE
    NOT NULL
    CHECK
    DEFAULT

Наприклад:

    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        age INTEGER CHECK (age >= 0)
    );

Constraints допомагають забезпечувати data integrity.

---

# Data Integrity

Data integrity — коректність та узгодженість даних.

Наприклад:

    email TEXT NOT NULL

гарантує, що email не буде `NULL`.

А:

    email TEXT UNIQUE

не дозволяє дублікати.

А:

    user_id REFERENCES users(id)

забезпечує referential integrity.

---

# Transactions

Transaction — група операцій, яка розглядається як одна логічна операція.

Наприклад:

    BEGIN;

    UPDATE accounts
    SET balance = balance - 100
    WHERE id = 1;

    UPDATE accounts
    SET balance = balance + 100
    WHERE id = 2;

    COMMIT;

Якщо щось пішло не так:

    ROLLBACK;

---

# ACID

Реляційні database systems, включно з PostgreSQL, підтримують transaction properties, відомі як ACID.

    A → Atomicity
    C → Consistency
    I → Isolation
    D → Durability

---

## Atomicity

Transaction виконується як єдине ціле.

Або:

    all operations succeed

або:

    all operations are rolled back

---

## Consistency

Transaction переводить database з одного valid state в інший valid state.

Constraints допомагають підтримувати consistency.

---

## Isolation

Concurrent transactions не повинні некоректно впливати одна на одну.

PostgreSQL має різні isolation levels.

---

## Durability

Після успішного `COMMIT` зміни повинні зберігатися навіть після збою системи, з урахуванням налаштувань та гарантій PostgreSQL/storage.

---

# Index

Index — структура даних, яка може прискорити пошук та інші операції.

Наприклад:

    CREATE INDEX idx_users_email
    ON users(email);

Без відповідного index PostgreSQL може бути змушений перевіряти багато rows.

Index може значно прискорити:

    WHERE
    JOIN
    ORDER BY

але indexes мають і ціну:

- займають disk space;
- потребують обслуговування;
- можуть уповільнювати INSERT/UPDATE/DELETE.

---

# View

View — збережений SQL-запит, який представляється як virtual table.

Наприклад:

    CREATE VIEW active_users AS
    SELECT *
    FROM users
    WHERE active = true;

Потім:

    SELECT *
    FROM active_users;

View не обов'язково зберігає окрему копію даних.

---

# Function

PostgreSQL дозволяє створювати functions, які можна викликати з SQL.

Наприклад:

    SELECT calculate_total(100, 20);

Functions можуть використовуватися для:

    calculations
    reusable logic
    data processing

---

# Procedure

Procedure — database routine, яка може виконувати послідовність операцій.

Викликається через:

    CALL procedure_name();

Functions і procedures мають різні правила використання.

---

# Trigger

Trigger — механізм автоматичного виконання певної логіки у відповідь на database event.

Наприклад:

    INSERT
    UPDATE
    DELETE

Приклад концепції:

    INSERT into users
            ↓
         trigger
            ↓
    write audit record

---

# JSON / JSONB

PostgreSQL підтримує JSON data.

Наприклад:

    {
        "name": "John",
        "age": 25
    }

PostgreSQL має типи:

    JSON
    JSONB

`JSONB` зберігає JSON у бінарно-розібраному форматі та підтримує indexing і ефективні операції над JSON-структурами.

Наприклад:

    CREATE TABLE products (
        id INTEGER PRIMARY KEY,
        data JSONB
    );

---

# Arrays

PostgreSQL підтримує arrays.

Наприклад:

    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        tags TEXT[]
    );

Значення:

    ARRAY['javascript', 'postgresql', 'nodejs']

---

# Special Data Types

PostgreSQL має багато data types.

Основні:

    INTEGER
    BIGINT
    NUMERIC
    REAL
    DOUBLE PRECISION
    BOOLEAN
    TEXT
    VARCHAR
    DATE
    TIME
    TIMESTAMP
    TIMESTAMPTZ
    UUID
    JSON
    JSONB
    ARRAY

Також PostgreSQL підтримує:

    ENUM
    RANGE
    geometric types
    network address types
    full-text search types
    custom types

---

# Extensions

Extensions дозволяють додавати PostgreSQL нові можливості.

Приклад:

    CREATE EXTENSION extension_name;

Популярні extensions:

    pgcrypto
    uuid-ossp
    PostGIS

Extensions є важливою частиною екосистеми PostgreSQL.

---

# PostgreSQL vs SQL

Це важлива відмінність.

SQL:

    language / standard

PostgreSQL:

    database management system

Тобто:

    SQL
      ↓
    language

    PostgreSQL
      ↓
    DBMS

PostgreSQL використовує SQL, але також має власні розширення та особливості.

---

# SQL Standard

SQL має стандарти, які визначають загальну поведінку SQL language.

Але конкретні DBMS можуть мати власні extensions.

Наприклад:

    PostgreSQL
    MySQL
    SQL Server
    Oracle

можуть підтримувати різні SQL features або мати різний syntax.

Тому:

    SQL ≠ PostgreSQL

але:

    PostgreSQL → supports SQL

---

# PostgreSQL-specific Features

PostgreSQL відомий підтримкою:

    JSONB
    arrays
    CTE
    window functions
    full-text search
    extensions
    custom data types
    generated columns
    advanced indexes
    transactions
    MVCC
    partitioning
    logical replication

---

# MVCC

MVCC — Multi-Version Concurrency Control.

Це один із ключових механізмів PostgreSQL для роботи з concurrent transactions.

Ідея:

    Transaction A
          ↓
       database
          ↑
    Transaction B

PostgreSQL зберігає різні версії row, що дозволяє transactions працювати паралельно з меншим блокуванням.

На базовому рівні достатньо пам'ятати:

    MVCC → concurrency control

Глибше MVCC буде важливим під час вивчення:

    transactions
    isolation
    locking
    performance

---

# PostgreSQL Architecture

Спрощена модель:

    Application
         ↓
    PostgreSQL Client
         ↓
    Connection
         ↓
    PostgreSQL Server
         ↓
    Database
         ↓
    Schema
         ↓
    Tables
         ↓
    Data

---

# Backend + PostgreSQL

У типовому web application PostgreSQL не підключається безпосередньо до browser.

Зазвичай:

    Browser
       ↓
    Frontend
       ↓
    HTTP request
       ↓
    Backend
       ↓
    PostgreSQL driver / ORM
       ↓
    PostgreSQL
       ↓
    Database

Наприклад:

    React / Next.js
          ↓
       REST API
          ↓
       NestJS
          ↓
       PostgreSQL

---

# PostgreSQL Driver

Backend application використовує driver для комунікації з PostgreSQL.

Для Node.js популярний driver:

    pg

Концептуально:

    Node.js
       ↓
    PostgreSQL driver
       ↓
    PostgreSQL server

Driver перетворює application requests у database protocol operations.

---

# ORM

ORM — Object-Relational Mapping.

ORM дозволяє працювати з relational database через programming language abstractions.

Приклади ORM / database tools для Node.js:

    Prisma
    TypeORM
    Drizzle

Але ORM не замінює PostgreSQL.

Модель:

    Application
         ↓
        ORM
         ↓
    PostgreSQL
         ↓
      Database

Вивчення SQL все одно важливе.

---

# SQL First

Для розуміння PostgreSQL корисно спочатку вивчити:

    SQL
      ↓
    PostgreSQL
      ↓
    Driver
      ↓
    ORM

а не:

    ORM
      ↓
    PostgreSQL

без розуміння SQL.

Розробник повинен розуміти, що відбувається на database level.

---

# PostgreSQL Use Cases

PostgreSQL добре підходить для:

    CRUD applications
    REST APIs
    SaaS applications
    CMS
    e-commerce
    financial systems
    analytics
    reporting
    geospatial applications
    complex relational data

Наприклад:

    users
       ↓
    orders
       ↓
    order_items
       ↓
    products

Це типовий relational use case.

---

# PostgreSQL Strengths

Основні переваги PostgreSQL:

• open source

• mature

• powerful SQL support

• strong data integrity

• transactions

• ACID

• advanced indexing

• JSON / JSONB

• arrays

• extensibility

• concurrency support

• sophisticated query planner

• rich data types

• large ecosystem

• good scalability

---

# PostgreSQL Limitations / Trade-offs

PostgreSQL не є оптимальним рішенням для абсолютно кожної задачі.

Наприклад, потрібно враховувати:

    complexity
    memory usage
    storage
    indexing cost
    query complexity
    operational complexity
    scaling requirements

Вибір database залежить від конкретної задачі.

---

# PostgreSQL vs NoSQL

Реляційний підхід:

    PostgreSQL

Дані часто мають чіткі relationships:

    users
      ↓
    orders
      ↓
    products

NoSQL databases можуть використовувати іншу модель.

Наприклад:

    MongoDB
        ↓
    documents

Це не означає, що одна модель завжди краща.

Вибір залежить від:

    data model
    consistency requirements
    query patterns
    scaling requirements
    application requirements

---

# PostgreSQL Ecosystem

PostgreSQL — це не тільки server.

Екосистема включає:

    PostgreSQL Server
    psql
    pgAdmin
    pg_dump
    pg_restore
    createdb
    dropdb
    createuser
    pgcli
    drivers
    ORMs
    extensions

---

# pgAdmin

`pgAdmin` — графічний client для PostgreSQL.

Через нього можна:

    connect to server
    create databases
    create tables
    inspect data
    execute SQL
    manage users
    inspect indexes
    manage objects

Але важливо знати також:

    psql

GUI та CLI доповнюють один одного.

---

# pgcli

`pgcli` — альтернативний command-line client для PostgreSQL.

Він додає зручності, такі як:

    autocomplete
    syntax highlighting
    suggestions

Але базове розуміння:

    psql

залишається дуже корисним.

---

# PostgreSQL Version

PostgreSQL має version numbers.

Наприклад:

    PostgreSQL 18

Версії можуть додавати:

    new features
    performance improvements
    bug fixes
    security fixes

Для навчання важливо розуміти, яку версію PostgreSQL ви використовуєте.

Перевірити version через `psql`:

    SELECT version();

Або:

    SHOW server_version;

---

# Server Version vs Client Version

Це різні поняття.

Client:

    psql

Server:

    PostgreSQL server

Перевірити версію `psql`:

    psql --version

Перевірити версію server:

    SELECT version();

Можуть бути різні client та server versions.

---

# PostgreSQL Port

За замовчуванням PostgreSQL зазвичай використовує:

    5432

Типове підключення:

    host: localhost
    port: 5432
    user: postgres
    database: postgres

Наприклад:

    psql -h localhost -p 5432 -U postgres

---

# Connection

Щоб client підключився до PostgreSQL server, зазвичай потрібні:

    host
    port
    database
    user
    password

Наприклад:

    host     → localhost
    port     → 5432
    database → my_database
    user     → postgres

---

# localhost

`localhost` означає локальний computer.

Наприклад:

    localhost:5432

означає:

    PostgreSQL server
    running on local machine
    port 5432

---

# PostgreSQL Server vs Database

Не плутати:

    PostgreSQL Server
          ↓
       databases

PostgreSQL server — система, яка обслуговує databases.

Database — конкретне сховище даних усередині PostgreSQL environment.

Наприклад:

    PostgreSQL Server
       ├── shop
       ├── blog
       └── library

---

# PostgreSQL Installation

Після встановлення PostgreSQL зазвичай отримуємо:

    PostgreSQL Server
    psql
    PostgreSQL utilities

Також можна встановити:

    pgAdmin

---

# Basic PostgreSQL Workflow

Типовий початок роботи:

    1. Install PostgreSQL
    2. Start PostgreSQL server
    3. Connect using psql
    4. Create database
    5. Connect to database
    6. Create tables
    7. Insert data
    8. Query data
    9. Update data
    10. Delete data

У вигляді схеми:

    PostgreSQL
         ↓
    Server
         ↓
    Database
         ↓
    Tables
         ↓
    Data
         ↓
    SQL queries

---

# First Connection

Наприклад:

    psql -U postgres

Після введення password:

    postgres=#

Це означає, що ви знаходитеся в `psql`.

Перевірити connection:

    SELECT version();

---

# First Database

Створити database:

    CREATE DATABASE learning_db;

Підключитися:

    \c learning_db

Після цього можна створити table:

    CREATE TABLE users (
        id INTEGER,
        name TEXT
    );

---

# First Data

Додати row:

    INSERT INTO users (id, name)
    VALUES (1, 'John');

Прочитати:

    SELECT *
    FROM users;

Результат:

    id | name
    ---|------
    1  | John

---

# PostgreSQL Mental Model

Корисно запам'ятати:

    PostgreSQL
         ↓
       DBMS
         ↓
      Database
         ↓
       Schema
         ↓
       Tables
         ↓
        Rows
         ↓
      Columns

А для application:

    Frontend
       ↓
    Backend
       ↓
    Driver / ORM
       ↓
    PostgreSQL Server
       ↓
    Database
       ↓
    Data

---

# Database Mental Model

Ще одна корисна модель:

    REALITY
       ↓
     DATA
       ↓
    DATA MODEL
       ↓
    DATABASE
       ↓
      DBMS
       ↓
    APPLICATION

Наприклад:

    реальні користувачі
          ↓
    user data
          ↓
    relational model
          ↓
    PostgreSQL database
          ↓
    PostgreSQL DBMS
          ↓
    NestJS application

---

# PostgreSQL Learning Path

Після introduction логічно перейти до:

    01-postgresql-introduction
             ↓
    02-installation-and-setup
             ↓
    03-psql-cli
             ↓
    04-databases
             ↓
    05-sql-basics
             ↓
    06-tables-and-data-types
             ↓
    07-insert-update-delete
             ↓
    08-select-and-filtering
             ↓
    09-sorting-and-pagination
             ↓
    10-aggregate-functions
             ↓
    11-group-by-and-having
             ↓
    12-joins
             ↓
    13-subqueries
             ↓
    14-constraints
             ↓
    15-indexes
             ↓
    16-views
             ↓
    17-transactions
             ↓
    18-functions-and-procedures
             ↓
    19-triggers
             ↓
    20-json-and-jsonb
             ↓
    21-arrays-and-special-types
             ↓
    22-schema-and-database-organization
             ↓
    23-users-roles-and-permissions
             ↓
    24-backup-and-restore
             ↓
    25-performance-and-explain
             ↓
    26-postgresql-practice-project

---

# Типові помилки

❌ Плутати database та DBMS.

    PostgreSQL → DBMS
    my_database → database

---

❌ Вважати PostgreSQL мовою програмування.

PostgreSQL — це DBMS.

SQL — language.

---

❌ Плутати SQL та PostgreSQL.

    SQL        → language / standard
    PostgreSQL → DBMS

---

❌ Вважати `psql` самим PostgreSQL server.

    psql
      ↓
    client

    PostgreSQL server
      ↓
    database server

---

❌ Плутати database та table.

    database
       ↓
    tables

---

❌ Плутати row та column.

    row    → record
    column → attribute

---

❌ Вважати schema окремою database.

    database
       ↓
    schemas
       ↓
    objects

---

❌ Використовувати GUI, не розуміючи SQL.

GUI корисний, але SQL залишається фундаментом.

---

❌ Вважати ORM заміною PostgreSQL.

ORM:

    application abstraction

PostgreSQL:

    database system

---

❌ Створювати indexes на кожну column без аналізу.

Indexes мають storage та write-performance cost.

---

# Питання зі співбесіди

Що таке PostgreSQL?

Що таке DBMS?

Що таке RDBMS?

Чим PostgreSQL відрізняється від SQL?

Що таке relational database?

Що таке table?

Що таке row?

Що таке column?

Що таке record?

Що таке primary key?

Що таке foreign key?

Що таке relationship?

Які бувають relationships?

Що таке schema?

Що таке database?

Чим database відрізняється від schema?

Що таке PostgreSQL server?

Що таке PostgreSQL client?

Що таке `psql`?

Чим SQL command відрізняється від `psql` meta-command?

Що робить `\dt`?

Що робить `\l`?

Що робить `\c`?

Що робить `\d`?

Що таке transaction?

Що означає ACID?

Що таке constraint?

Які основні constraints PostgreSQL?

Що таке index?

Для чого потрібні indexes?

Що таке view?

Що таке function?

Що таке procedure?

Що таке trigger?

Що таке JSONB?

Що таке array у PostgreSQL?

Що таке extension?

Що таке MVCC?

Який default port PostgreSQL?

Що таке `localhost`?

Чим відрізняється PostgreSQL client version від server version?

Як PostgreSQL використовується в backend application?

Чи потрібен SQL при використанні ORM?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке PostgreSQL.

Що таке DBMS.

Що таке relational database.

Що таке SQL.

Різниця:

    SQL
    PostgreSQL
    DBMS
    database

Table.

Row.

Column.

Record.

Database.

Schema.

Primary key.

Foreign key.

Relationship.

Constraint.

Transaction.

Index.

View.

Основи ACID.

Основи client-server architecture.

Основи `psql`.

Основи PostgreSQL ecosystem.

Основні data types.

---

## 🔵 Junior

Розуміння:

    PostgreSQL Server
    PostgreSQL Client
    psql
    pgAdmin
    pgcli

Розуміння:

    database
    schema
    table
    row
    column

Розуміння:

    primary key
    foreign key
    constraints

Розуміння:

    SQL
    DDL
    DML
    DQL
    DCL
    TCL

Розуміння:

    transactions
    ACID
    indexes
    views

Основи:

    JSONB
    arrays
    extensions

Розуміння PostgreSQL у:

    Node.js
    NestJS
    REST API

---

## 🟠 Middle

Глибше розуміння:

    PostgreSQL architecture
    MVCC
    concurrency
    isolation levels
    locking
    indexes
    query planner
    transactions
    JSONB
    extensions

Розуміння trade-offs:

    normalized relational data
    JSONB
    indexes
    constraints
    transactions

Розуміння взаємодії:

    application
    driver
    connection pool
    PostgreSQL server

Розуміння:

    PostgreSQL-specific SQL
    standard SQL
    execution plans

---

## 🔴 Senior

Глибоке розуміння:

    PostgreSQL internals
    MVCC
    WAL
    vacuum
    autovacuum
    locking
    isolation
    query planner
    statistics
    indexes
    partitioning
    replication
    high availability
    connection pooling
    backup / recovery
    performance tuning

Архітектурне розуміння:

    application architecture
        ↓
    connection management
        ↓
    PostgreSQL
        ↓
    storage
        ↓
    replication / backup

Розуміння trade-offs між:

    normalization
    denormalization
    relational data
    JSONB
    indexing
    partitioning
    replication

---

# Міні-шпаргалка

## PostgreSQL

    PostgreSQL
        ↓
    open-source DBMS
        ↓
    relational / object-relational
        ↓
    SQL

---

## DBMS

    DBMS
      ↓
    manages
      ↓
    databases

---

## Database hierarchy

    PostgreSQL Server
          ↓
       Database
          ↓
        Schema
          ↓
        Table
          ↓
      Row / Column

---

## Table

    Table
      ↓
    Columns
      +
    Rows

---

## SQL

    DDL → structure
    DML → data modification
    DQL → querying
    DCL → permissions
    TCL → transactions

---

## DDL

    CREATE
    ALTER
    DROP
    TRUNCATE

---

## DML

    INSERT
    UPDATE
    DELETE

---

## DQL

    SELECT

---

## DCL

    GRANT
    REVOKE

---

## TCL

    BEGIN
    COMMIT
    ROLLBACK
    SAVEPOINT

---

## PostgreSQL Client

    psql
    pgAdmin
    pgcli
    application

---

## psql

    psql -U postgres

Основні commands:

    \l       → list databases
    \c       → connect database
    \dt      → list tables
    \d       → describe object
    \du      → list roles
    \q       → quit

---

## Connection

    host
    port
    database
    user
    password

Типовий port:

    5432

---

## Relationships

    1 : 1
    1 : N
    N : N

---

## Constraints

    PRIMARY KEY
    FOREIGN KEY
    UNIQUE
    NOT NULL
    CHECK
    DEFAULT

---

## ACID

    A → Atomicity
    C → Consistency
    I → Isolation
    D → Durability

---

## PostgreSQL ecosystem

    PostgreSQL Server
          ↓
    psql / pgAdmin / pgcli
          ↓
    Driver
          ↓
    Application

---

## Backend architecture

    Browser
       ↓
    Frontend
       ↓
    HTTP
       ↓
    Backend
       ↓
    Driver / ORM
       ↓
    PostgreSQL
       ↓
    Database

---

## Main PostgreSQL features

    SQL
    Transactions
    Constraints
    Indexes
    Views
    Functions
    Procedures
    Triggers
    JSONB
    Arrays
    Extensions
    MVCC

---

# Головне:

• PostgreSQL — це DBMS.

• SQL — це мова для роботи з relational databases.

• PostgreSQL підтримує SQL та розширює його власними можливостями.

• Database — це набір організованих даних.

• Table складається з rows та columns.

• Row — один record.

• Column — окрема характеристика даних.

• Schema — namespace для database objects.

• PostgreSQL server обслуговує databases.

• `psql` — command-line client PostgreSQL.

• `pgAdmin` — GUI client.

• SQL та `psql` commands — не одне й те саме.

• `SELECT` — SQL command.

• `\dt` — `psql` meta-command.

• Primary key ідентифікує row.

• Foreign key створює relationship між tables.

• Constraints забезпечують data integrity.

• Transactions дозволяють виконувати групу операцій як одну логічну одиницю.

• ACID:

    Atomicity
    Consistency
    Isolation
    Durability

• Index може прискорити пошук, але має storage та write-performance cost.

• View представляє збережений query як virtual table.

• Function та procedure дозволяють розміщувати логіку на database level.

• Trigger автоматично запускає логіку у відповідь на database events.

• PostgreSQL підтримує JSONB та arrays.

• Extensions дозволяють розширювати PostgreSQL.

• MVCC є важливою частиною PostgreSQL concurrency model.

• Типова архітектура web application:

    Frontend
        ↓
    Backend
        ↓
    PostgreSQL driver
        ↓
    PostgreSQL Server
        ↓
    Database

• Для роботи з PostgreSQL важливо розуміти не тільки ORM, а й SQL.

• Корисна базова модель:

    PostgreSQL Server
          ↓
       Database
          ↓
        Schema
          ↓
        Tables
          ↓
      Rows / Columns

• Корисна загальна модель:

    REALITY
       ↓
     DATA
       ↓
    DATA MODEL
       ↓
    DATABASE
       ↓
      DBMS
       ↓
    APPLICATION

• PostgreSQL особливо сильний там, де важливі:

    relationships
    data integrity
    transactions
    complex queries
    structured data
    reliable persistence

• Наступний логічний крок після introduction:

    installation
        ↓
    psql
        ↓
    databases
        ↓
    SQL
        ↓
    tables
        ↓
    CRUD
        ↓
    queries
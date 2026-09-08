# 04. Databases

PostgreSQL database — це логічно ізольоване сховище даних усередині PostgreSQL server.

Database містить:

    schemas
        ↓
    tables
        ↓
    rows
        ↓
    data

У PostgreSQL один server може одночасно обслуговувати багато databases.

Наприклад:

    PostgreSQL Server
    │
    ├── postgres
    ├── learning_db
    ├── shop_db
    └── blog_db

Кожна database має власний набір schemas, tables, views, functions та інших database objects.

---

# Ключові поняття

✔ PostgreSQL server  
✔ database  
✔ database cluster  
✔ database connection  
✔ database name  
✔ database owner  
✔ template database  
✔ `postgres` database  
✔ `CREATE DATABASE`  
✔ `DROP DATABASE`  
✔ `ALTER DATABASE`  
✔ `\l`  
✔ `\list`  
✔ `\c`  
✔ `\connect`  
✔ `\conninfo`  
✔ `current_database()`  
✔ database owner  
✔ encoding  
✔ locale  
✔ tablespace  
✔ template database  
✔ `template0`  
✔ `template1`  
✔ connection to database  

---

# Що потрібно пам'ятати

• PostgreSQL server може містити багато databases.

• Database — це логічне сховище об'єктів PostgreSQL.

• Щоб працювати з таблицями, SQL-запитами та іншими об'єктами, клієнт повинен бути підключений до конкретної database.

• PostgreSQL connection завжди працює в контексті певної database.

• Одночасно в одному `psql` session ти працюєш з однією database.

• Переключитися на іншу database можна через:

    \c database_name

або:

    \connect database_name

• Список databases можна отримати через:

    \l

або:

    \list

• Поточну database можна перевірити:

    SELECT current_database();

• Інформацію про поточне connection можна отримати:

    \conninfo

• Створити database:

    CREATE DATABASE database_name;

• Видалити database:

    DROP DATABASE database_name;

• `postgres` — стандартна службова database, яка часто використовується для початкового підключення.

• `template1` використовується як шаблон для створення нових databases.

• `template0` — чистий базовий шаблон.

• Database не є таблицею і не є сервером.

---

# PostgreSQL Server

PostgreSQL server — це запущений PostgreSQL instance, який приймає connections від клієнтів.

Спрощена модель:

    Client
       ↓
    PostgreSQL Server
       ↓
    Database
       ↓
    Schema
       ↓
    Table
       ↓
    Row

Наприклад:

    psql
      ↓
    PostgreSQL Server
      ↓
    shop_db
      ↓
    public
      ↓
    products
      ↓
    rows

---

# Database Cluster

У PostgreSQL термін `cluster` має спеціальне значення.

Database cluster — це набір databases, якими керує один PostgreSQL server instance.

Спрощено:

    PostgreSQL Cluster
    │
    ├── postgres
    ├── shop_db
    ├── blog_db
    └── learning_db

Важливо не плутати:

    PostgreSQL cluster
        ↓
    набір databases

    database
        ↓
    окрема database всередині cluster

---

# Database vs Server

Це одна з основних концепцій PostgreSQL.

    PostgreSQL Server
        │
        ├── Database A
        ├── Database B
        └── Database C

Server — система, яка обслуговує connections.

Database — конкретне логічне сховище даних.

---

# Database vs Schema

PostgreSQL має і databases, і schemas.

Ієрархія:

    Server
      ↓
    Database
      ↓
    Schema
      ↓
    Table

Наприклад:

    PostgreSQL Server
        ↓
    shop_db
        ↓
    public
        ↓
    products

Database:

    shop_db

Schema:

    public

Table:

    products

---

# Default Databases

Після встановлення PostgreSQL зазвичай існують databases на кшталт:

    postgres
    template0
    template1

Їхня роль різна.

---

# postgres

`postgres` — стандартна database, яку часто використовують для адміністративного або початкового підключення.

Наприклад:

    psql -U postgres

може підключити користувача `postgres` до database з відповідною назвою, якщо така database існує.

Явно вказати database:

    psql -U postgres -d postgres

---

# template1

`template1` — стандартний шаблон для створення нових databases.

Коли виконується:

    CREATE DATABASE shop_db;

PostgreSQL створює нову database на основі template database.

За замовчуванням використовується:

    template1

---

# template0

`template0` — чистий базовий template.

Він призначений для створення database без змін, які могли бути внесені до `template1`.

Наприклад:

    CREATE DATABASE my_db
    TEMPLATE template0;

---

# Перегляд databases

У `psql`:

    \l

Або:

    \list

Приклад результату:

    Name         | Owner
    -------------+----------
    postgres     | postgres
    shop_db      | postgres
    learning_db  | postgres

---

# Перевірка поточної database

SQL:

    SELECT current_database();

Наприклад:

    SELECT current_database();

Результат:

    current_database
    -----------------
    shop_db

---

# Connection Information

У `psql`:

    \conninfo

Приклад:

    You are connected to database "shop_db"
    as user "postgres".

Це швидкий спосіб перевірити:

    database
    user
    host
    port

---

# Підключення до database

При запуску `psql` можна вказати database:

    psql -U postgres -d shop_db

Або:

    psql -U postgres --dbname=shop_db

---

# Підключення без явного database

Наприклад:

    psql -U postgres

Якщо database не вказана, `psql` використовує default database, яка часто має таке саме ім'я, як користувач.

Наприклад:

    user = postgres

може призвести до спроби підключення до:

    database = postgres

---

# Підключення з host і port

Типовий локальний PostgreSQL:

    psql -h localhost -p 5432 -U postgres -d shop_db

Тут:

    -h localhost  → host
    -p 5432       → port
    -U postgres   → user
    -d shop_db    → database

---

# Створення Database

SQL-команда:

    CREATE DATABASE database_name;

Наприклад:

    CREATE DATABASE shop_db;

Після цього з'явиться:

    shop_db

у списку databases.

---

# Створення Database з owner

Можна вказати owner:

    CREATE DATABASE shop_db
    OWNER postgres;

Наприклад:

    CREATE DATABASE blog_db
    OWNER postgres;

---

# CREATE DATABASE — основний синтаксис

    CREATE DATABASE database_name
    [OWNER user_name]
    [TEMPLATE template_name]
    [ENCODING encoding]
    [TABLESPACE tablespace_name];

На початковому рівні достатньо:

    CREATE DATABASE shop_db;

---

# Створення Database з template

Наприклад:

    CREATE DATABASE shop_db
    TEMPLATE template1;

Або:

    CREATE DATABASE clean_db
    TEMPLATE template0;

---

# Створення Database з encoding

Наприклад:

    CREATE DATABASE ukrainian_db
    ENCODING 'UTF8';

UTF-8 — стандартний і рекомендований варіант для сучасних застосунків.

---

# Важливо про Encoding

Перевірити encoding database:

    SELECT datname, pg_encoding_to_char(encoding)
    FROM pg_database;

Приклад:

    datname      | pg_encoding_to_char
    -------------+---------------------
    postgres     | UTF8
    shop_db      | UTF8

---

# DROP DATABASE

Видалення database:

    DROP DATABASE database_name;

Наприклад:

    DROP DATABASE shop_db;

Після цього database буде видалена.

⚠️ Це destructive operation.

Видалення database означає видалення всіх її objects та data.

---

# Важливе правило DROP DATABASE

Не можна видалити database, до якої ти зараз підключений.

Наприклад, якщо:

    current database = shop_db

то:

    DROP DATABASE shop_db;

не спрацює.

Потрібно спочатку підключитися до іншої database.

Наприклад:

    \c postgres

а потім:

    DROP DATABASE shop_db;

---

# DROP DATABASE з FORCE

У сучасних версіях PostgreSQL можна примусово завершити connections:

    DROP DATABASE shop_db WITH (FORCE);

Але це потрібно використовувати обережно.

Перед видаленням production database такий підхід особливо небезпечний.

---

# ALTER DATABASE

`ALTER DATABASE` змінює властивості database.

Наприклад, змінити owner:

    ALTER DATABASE shop_db
    OWNER TO postgres;

---

# Перейменування Database

Database можна перейменувати:

    ALTER DATABASE shop_db
    RENAME TO store_db;

Було:

    shop_db

Стало:

    store_db

---

# Зміна Tablespace

Database може бути пов'язана з tablespace.

Наприклад:

    ALTER DATABASE shop_db
    SET TABLESPACE new_tablespace;

Tablespaces — більш просунута тема.

На базовому рівні достатньо розуміти:

    database
        ↓
    може використовувати tablespace
        ↓
    tablespace визначає фізичне розташування storage

---

# Database Owner

Кожна database має owner.

Наприклад:

    database = shop_db
    owner = postgres

Owner має спеціальні права щодо database.

Переглянути owner:

    \l

---

# Зміна Owner

SQL:

    ALTER DATABASE shop_db
    OWNER TO app_user;

Після цього:

    shop_db
        ↓
    owner = app_user

---

# Перегляд databases через SQL

PostgreSQL зберігає інформацію про databases у системному каталозі.

Наприклад:

    SELECT datname
    FROM pg_database;

Отримаємо список назв databases.

---

# Перегляд Database Information

Можна отримати більше інформації:

    SELECT
        datname,
        pg_encoding_to_char(encoding) AS encoding,
        datcollate,
        datctype
    FROM pg_database;

---

# pg_database

`pg_database` — системний каталог PostgreSQL.

Він містить інформацію про databases PostgreSQL cluster.

Наприклад:

    SELECT *
    FROM pg_database;

Але `SELECT *` використовується переважно для навчання.

Практичніше вибирати потрібні поля:

    SELECT
        datname,
        datallowconn
    FROM pg_database;

---

# Database Connection

Щоб працювати з database, client повинен встановити connection.

Наприклад:

    psql
        ↓
    connection
        ↓
    PostgreSQL
        ↓
    shop_db

Connection має параметри:

    host
    port
    database
    user
    password

---

# Connection Parameters

Типовий connection:

    host = localhost
    port = 5432
    database = shop_db
    user = postgres
    password = ********

У вигляді URI:

    postgresql://postgres:password@localhost:5432/shop_db

Структура:

    postgresql://
        user
        :
        password
        @
        host
        :
        port
        /
        database

---

# PostgreSQL URI

Приклад:

    postgresql://postgres:secret@localhost:5432/shop_db

Тут:

    protocol  → postgresql
    user      → postgres
    password  → secret
    host      → localhost
    port      → 5432
    database  → shop_db

У production credentials не слід зберігати безпосередньо у source code.

---

# Переключення Database у psql

Команда:

    \c database_name

Наприклад:

    \c shop_db

або:

    \connect shop_db

Після цього:

    current database
        ↓
    shop_db

---

# Переключення з User

Можна одночасно змінити database і user:

    \c shop_db postgres

Синтаксис:

    \c database_name user_name

---

# Перевірка після переключення

    \conninfo

або:

    SELECT current_database();

Наприклад:

    \c shop_db

    SELECT current_database();

Результат:

    shop_db

---

# Практичний Workflow

Типовий workflow:

    1. Запустити PostgreSQL
    2. Відкрити psql
    3. Подивитися databases
    4. Створити database
    5. Підключитися до database
    6. Перевірити connection
    7. Створювати schemas
    8. Створювати tables
    9. Додавати data

Наприклад:

    psql -U postgres

    \l

    CREATE DATABASE learning_db;

    \c learning_db

    \conninfo

---

# Перша навчальна Database

Для навчання можна створити:

    CREATE DATABASE learning_db;

Підключитися:

    \c learning_db

Перевірити:

    SELECT current_database();

Результат:

    learning_db

---

# Створення Database для проєкту

Наприклад, для інтернет-магазину:

    CREATE DATABASE shop_db;

Структура концептуально:

    PostgreSQL
        ↓
    shop_db
        ↓
    public
        ↓
    products
    users
    orders
    categories

---

# Database Naming

Для database бажано використовувати зрозумілі назви.

Наприклад:

    learning_db
    shop_db
    blog_db
    library_db
    crm_db

Часто використовують:

    snake_case

Наприклад:

    online_shop
    course_platform
    task_manager

---

# Database Name vs Table Name

Не плутати:

    database
        ↓
    shop_db

    table
        ↓
    products

Database — контейнер більш високого рівня.

Table — об'єкт усередині database/schema.

---

# Одна Database — багато Tables

Наприклад:

    shop_db
    │
    └── public
        │
        ├── users
        ├── products
        ├── categories
        └── orders

Усі ці tables знаходяться в одній database.

---

# Одна Database — багато Schemas

Наприклад:

    shop_db
    │
    ├── public
    │   ├── products
    │   └── users
    │
    ├── sales
    │   └── orders
    │
    └── analytics
        └── reports

Schemas дозволяють організувати objects усередині database.

---

# Database Isolation

Databases у PostgreSQL логічно ізольовані.

Наприклад:

    shop_db
        ↓
    products

    blog_db
        ↓
    posts

Запит:

    SELECT *
    FROM products;

працює в контексті `shop_db`.

Якщо ти підключений до `blog_db`, таблиці `products` там може не існувати.

---

# Cross-Database Queries

На базовому рівні PostgreSQL не працює як система, де можна просто написати:

    SELECT *
    FROM shop_db.products;

і отримати таблицю з іншої database.

У PostgreSQL database isolation є важливою концепцією.

Для роботи з іншими databases використовуються спеціальні механізми, наприклад:

    Foreign Data Wrappers
    dblink

Це вже advanced topic.

---

# Database та Application

У реальному application зазвичай є:

    Application
        ↓
    Database connection
        ↓
    PostgreSQL
        ↓
    Application database

Наприклад:

    Next.js / NestJS
            ↓
        PostgreSQL
            ↓
         shop_db

---

# Database та Backend

Типова архітектура:

    Frontend
       ↓
    Backend API
       ↓
    PostgreSQL
       ↓
    Database
       ↓
    Tables

Наприклад:

    React
       ↓
    NestJS
       ↓
    shop_db
       ↓
    users
    products
    orders

Frontend зазвичай не повинен напряму підключатися до PostgreSQL.

---

# PostgreSQL Database у Node.js

Backend може використовувати connection string:

    DATABASE_URL=postgresql://postgres:password@localhost:5432/shop_db

У Node.js application:

    process.env.DATABASE_URL

У NestJS database layer використовує цей connection для роботи з PostgreSQL.

---

# Database Environment

Для різних середовищ часто використовують різні databases.

Наприклад:

    development
        ↓
    app_dev

    testing
        ↓
    app_test

    production
        ↓
    app_prod

Це дозволяє ізолювати development, testing та production data.

---

# Development Database

Наприклад:

    CREATE DATABASE app_dev;

Для локальної розробки:

    app_dev

---

# Test Database

Наприклад:

    CREATE DATABASE app_test;

Tests можуть працювати з:

    app_test

щоб не змінювати development data.

---

# Production Database

Наприклад:

    app_prod

Production database містить реальні application data.

З нею потрібно працювати особливо обережно.

---

# Database Security

Database повинна бути захищена.

Основні компоненти:

    users
    roles
    permissions
    authentication
    authorization

Наприклад:

    application_user
        ↓
    limited permissions
        ↓
    app_db

Не обов'язково використовувати superuser для application.

---

# Superuser

PostgreSQL має спеціальні superuser accounts.

Типовий приклад:

    postgres

Superuser має дуже широкі права.

Для навчання:

    postgres

зручний.

Для production application краще створювати окремого database user з необхідними permissions.

---

# Database User vs Database

Не плутати:

    user
        ↓
    хто підключається

    database
        ↓
    куди підключається

Наприклад:

    user = app_user
    database = shop_db

Connection:

    app_user → shop_db

---

# Database Owner vs User

Наприклад:

    database:
        shop_db

    owner:
        app_user

`app_user` — PostgreSQL role/user.

`shop_db` — database.

Owner — роль, якій належить database.

---

# Database Locale

Database може мати locale-related settings:

    LC_COLLATE
    LC_CTYPE

Вони впливають, зокрема, на:

    sorting
    character classification

Переглянути:

    SELECT
        datname,
        datcollate,
        datctype
    FROM pg_database;

---

# UTF-8

Для сучасних web applications зазвичай важливо використовувати UTF-8.

Перевірити:

    SELECT
        datname,
        pg_encoding_to_char(encoding)
    FROM pg_database;

Бажаний результат:

    UTF8

UTF-8 підтримує:

    English
    Ukrainian
    Polish
    German
    Chinese
    Japanese
    emoji
    ...

---

# Database Encoding та Client Encoding

Не плутати:

    database encoding
        ↓
    encoding, у якому зберігаються database data

    client encoding
        ↓
    encoding, яке використовує client connection

У `psql` можна перевірити:

    SHOW server_encoding;

і:

    SHOW client_encoding;

---

# Перевірка Database

Корисний набір команд:

    \l

    \conninfo

    SELECT current_database();

    SELECT current_user;

    SHOW server_encoding;

    SHOW client_encoding;

---

# Корисні psql Commands

## Список databases

    \l

Альтернатива:

    \list

---

## Підключитися до database

    \c database_name

Альтернатива:

    \connect database_name

---

## Перевірити connection

    \conninfo

---

## Поточна database

    SELECT current_database();

---

## Поточний user

    SELECT current_user;

---

## Database settings

    \l+

Показує розширену інформацію про databases.

---

# \l vs \l+

    \l

→ короткий список databases

    \l+

→ список databases з додатковою інформацією

---

# CREATE DATABASE vs \createdb

Database можна створити через SQL:

    CREATE DATABASE shop_db;

Або через command-line utility:

    createdb shop_db

Наприклад:

    createdb -U postgres shop_db

`createdb` — зовнішня PostgreSQL command-line utility.

Вона фактично є зручним способом виконати створення database.

---

# DROP DATABASE vs dropdb

SQL:

    DROP DATABASE shop_db;

CLI:

    dropdb shop_db

Наприклад:

    dropdb -U postgres shop_db

---

# psql vs createdb

`psql`:

    SQL client

`createdb`:

    command-line utility для створення database

Тобто:

    psql
        ↓
    працює з SQL

    createdb
        ↓
    створює database через CLI

---

# Типовий CLI Workflow

Створити database:

    createdb -U postgres learning_db

Підключитися:

    psql -U postgres -d learning_db

Перевірити:

    \conninfo

---

# Database Lifecycle

Типовий lifecycle:

    CREATE
      ↓
    CONNECT
      ↓
    USE
      ↓
    ALTER
      ↓
    BACKUP
      ↓
    RESTORE
      ↓
    DROP

---

# Database Objects

Database може містити багато типів objects:

    schemas
    tables
    views
    indexes
    sequences
    functions
    procedures
    triggers
    types

Спрощено:

    Database
        │
        ├── Schema
        │   ├── Table
        │   ├── View
        │   ├── Index
        │   ├── Function
        │   └── ...
        │
        └── ...

---

# Database Architecture

Корисна модель PostgreSQL:

    PostgreSQL Server
          ↓
    Database Cluster
          ↓
    Database
          ↓
    Schema
          ↓
    Database Objects
          ↓
    Tables / Views / Functions / ...
          ↓
    Data

---

# Практика

## Вправа 1 — подивитися databases

Запустити:

    psql -U postgres

Виконати:

    \l

---

## Вправа 2 — перевірити connection

    \conninfo

Визначити:

    database
    user
    host
    port

---

## Вправа 3 — створити database

    CREATE DATABASE learning_db;

Перевірити:

    \l

---

## Вправа 4 — підключитися

    \c learning_db

Перевірити:

    \conninfo

---

## Вправа 5 — перевірити current database

    SELECT current_database();

Результат:

    learning_db

---

## Вправа 6 — створити другу database

    CREATE DATABASE practice_db;

Перевірити:

    \l

---

## Вправа 7 — переключитися

    \c practice_db

Перевірити:

    SELECT current_database();

---

## Вправа 8 — повернутися

    \c learning_db

Перевірити:

    SELECT current_database();

---

## Вправа 9 — видалити database

Спочатку перейти в іншу database:

    \c postgres

Потім:

    DROP DATABASE practice_db;

Перевірити:

    \l

---

# Міні-проєкт

Створити database для навчального application.

Наприклад:

    CREATE DATABASE course_db;

Підключитися:

    \c course_db

Перевірити:

    \conninfo

Потім перевірити:

    SELECT current_database();

Наступним етапом у database можна створити:

    schemas
    tables
    constraints
    indexes

---

# Типові помилки

❌ Намагатися видалити database, до якої підключений.

Наприклад:

    \c shop_db

    DROP DATABASE shop_db;

Це не дозволяється.

Правильно:

    \c postgres

    DROP DATABASE shop_db;

---

❌ Плутати database і table.

    database
        ↓
    містить schemas та database objects

    table
        ↓
    містить rows і columns

---

❌ Плутати database і server.

    PostgreSQL Server
        ↓
    багато databases

---

❌ Плутати database і schema.

    database
        ↓
    schema
        ↓
    table

---

❌ Підключатися не до тієї database.

Перед роботою перевір:

    \conninfo

або:

    SELECT current_database();

---

❌ Використовувати production database для експериментів.

Для навчання краще:

    learning_db
    practice_db
    app_dev

---

❌ Використовувати `postgres` superuser для всього application.

Для production краще:

    app_user
        ↓
    необхідні permissions
        ↓
    app_db

---

❌ Видаляти database без перевірки.

Перед:

    DROP DATABASE ...

переконайся, що це саме та database.

---

# Питання зі співбесіди

Що таке PostgreSQL database?

Чим database відрізняється від PostgreSQL server?

Що таке database cluster?

Скільки databases може містити PostgreSQL server?

Що таке database connection?

Що таке database owner?

Що таке `postgres` database?

Що таке `template1`?

Що таке `template0`?

Для чого потрібен template database?

Як створити database?

Як видалити database?

Як перейменувати database?

Як змінити owner database?

Як подивитися список databases?

Що робить `\l`?

Що робить `\l+`?

Що робить `\c`?

Що робить `\conninfo`?

Як перевірити поточну database?

Що робить `current_database()`?

Що таке `pg_database`?

Що таке database encoding?

Що таке UTF-8?

Чим database encoding відрізняється від client encoding?

Чи можна видалити database, до якої підключений?

Чим `createdb` відрізняється від `CREATE DATABASE`?

Чим `dropdb` відрізняється від `DROP DATABASE`?

Чим database відрізняється від schema?

Чим database відрізняється від table?

Чи можна напряму виконувати звичайний SQL-запит між двома databases?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке PostgreSQL server.

Що таке database.

Що таке database connection.

Database vs server.

Database vs schema.

Database vs table.

`CREATE DATABASE`.

`DROP DATABASE`.

`ALTER DATABASE`.

`\l`.

`\list`.

`\c`.

`\connect`.

`\conninfo`.

`current_database()`.

Database owner.

`postgres`.

`template1`.

Основи UTF-8.

Основи database encoding.

---

🔵 Junior

Database cluster.

Database lifecycle.

Database naming.

Database ownership.

Database users.

Connection parameters:

    host
    port
    database
    user
    password

PostgreSQL connection URI.

    postgresql://...

`createdb`.

`dropdb`.

`pg_database`.

Database locale.

Database encoding vs client encoding.

Development database.

Testing database.

Production database.

Database isolation.

Основи permissions.

---

🟠 Middle

Database architecture.

Schemas та database organization.

Tablespaces.

Database configuration.

Database-level settings.

Database roles та ownership.

Connection management.

Connection pooling.

Database security.

Foreign Data Wrappers.

Cross-database data access.

Database backup and restore.

Database migration strategy.

Development / testing / production database separation.

---

🔴 Senior

PostgreSQL cluster architecture.

Physical database storage.

Database catalogs.

Database lifecycle management.

Connection architecture.

Connection pooling architecture.

Database isolation.

High availability.

Replication.

Failover.

Backup strategy.

Point-in-time recovery.

Database security architecture.

Multi-database architecture.

Cross-database integration.

Foreign Data Wrappers.

Production database operations.

Database migration strategies.

Disaster recovery.

Capacity planning.

---

# Міні-шпаргалка

## PostgreSQL architecture

    PostgreSQL Server
          ↓
    Database Cluster
          ↓
    Database
          ↓
    Schema
          ↓
    Table
          ↓
    Rows

---

## List databases

    \l

або:

    \list

---

## Create database

    CREATE DATABASE shop_db;

---

## Connect

    \c shop_db

---

## Connection info

    \conninfo

---

## Current database

    SELECT current_database();

---

## Current user

    SELECT current_user;

---

## Drop database

    DROP DATABASE shop_db;

---

## Force drop

    DROP DATABASE shop_db WITH (FORCE);

---

## Rename

    ALTER DATABASE shop_db
    RENAME TO store_db;

---

## Change owner

    ALTER DATABASE shop_db
    OWNER TO app_user;

---

## Encoding

    SELECT
        datname,
        pg_encoding_to_char(encoding)
    FROM pg_database;

---

## Database information

    \l+

---

## CLI create

    createdb -U postgres shop_db

---

## CLI drop

    dropdb -U postgres shop_db

---

# Основні правила

    PostgreSQL Server
        ↓
    може містити багато databases

    Database
        ↓
    містить schemas та database objects

    Schema
        ↓
    організовує objects усередині database

    Table
        ↓
    містить rows та columns

---

    \l
        → list databases

    \c database
        → connect / switch database

    \conninfo
        → connection information

    current_database()
        → current database

---

    CREATE DATABASE
        → create database

    ALTER DATABASE
        → change database

    DROP DATABASE
        → delete database

---

# Головне

• PostgreSQL server може обслуговувати багато databases.

• Database — логічно ізольоване сховище database objects.

• Database не є server.

• Database не є schema.

• Database не є table.

• Основна ієрархія:

    PostgreSQL Server
        ↓
    Database
        ↓
    Schema
        ↓
    Table
        ↓
    Rows

• Для перегляду databases у `psql`:

    \l

• Для підключення до database:

    \c database_name

• Для перевірки connection:

    \conninfo

• Для перевірки поточної database:

    SELECT current_database();

• Створення:

    CREATE DATABASE database_name;

• Видалення:

    DROP DATABASE database_name;

• Database, до якої ти підключений, не можна звичайним способом видалити з цього самого connection.

• `postgres` — стандартна database, яка часто використовується для адміністративних операцій.

• `template1` використовується як типовий template для створення нових databases.

• `template0` — чистий базовий template.

• Database має owner.

• Database може мати власні encoding та locale settings.

• Для сучасних web applications типовим вибором є UTF-8.

• `createdb` — CLI utility для створення database.

• `dropdb` — CLI utility для видалення database.

• Один application може мати окремі databases для:

    development
    testing
    production

• Не слід використовувати production database для навчальних експериментів.

• Не слід без необхідності використовувати PostgreSQL superuser для application.

• Перед виконанням небезпечних операцій завжди перевіряй:

    \conninfo

і:

    SELECT current_database();

• Найважливіша модель для запам'ятовування:

    Server
       ↓
    Database
       ↓
    Schema
       ↓
    Table
       ↓
    Row

• Database — це один із головних рівнів організації PostgreSQL, а наступним важливим кроком після database є вивчення `schemas`, `tables` та SQL.
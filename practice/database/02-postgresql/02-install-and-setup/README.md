# 02. Installation and Setup

Встановлення та налаштування PostgreSQL — це процес підготовки PostgreSQL Server, client tools та середовища для подальшої роботи з базами даних.

Типовий процес:

    install
       ↓
    configure
       ↓
    start server
       ↓
    connect
       ↓
    verify
       ↓
    create database
       ↓
    start working

Для розробника важливо розуміти не тільки як встановити PostgreSQL, а й:

- що саме встановлюється;
- де працює PostgreSQL Server;
- як client підключається до server;
- де знаходяться database files;
- який використовується port;
- як працює authentication;
- як перевірити стан server;
- як запускати та зупиняти PostgreSQL;
- як налаштувати `psql`;
- як перевірити encoding;
- як підготувати PostgreSQL для Node.js / NestJS.

---

# Ключові поняття

✔ PostgreSQL Server  
✔ PostgreSQL Client  
✔ `psql`  
✔ pgAdmin  
✔ PostgreSQL installation  
✔ PostgreSQL cluster  
✔ database  
✔ host  
✔ localhost  
✔ port  
✔ `5432`  
✔ user  
✔ role  
✔ password  
✔ authentication  
✔ `postgres` user  
✔ configuration  
✔ `postgresql.conf`  
✔ `pg_hba.conf`  
✔ data directory  
✔ service  
✔ server status  
✔ client connection  
✔ `PATH`  
✔ environment variable  
✔ `PGHOST`  
✔ `PGPORT`  
✔ `PGUSER`  
✔ `PGDATABASE`  
✔ `PGPASSWORD`  
✔ encoding  
✔ `UTF8`

---

# Що потрібно пам'ятати

• PostgreSQL складається не тільки з одного executable-файлу.

• Основна частина системи — PostgreSQL Server.

• `psql` — command-line client.

• pgAdmin — GUI client.

• PostgreSQL Server працює як окремий процес / service.

• Client підключається до server через connection.

• За замовчуванням PostgreSQL використовує port:

    5432

• Типове локальне підключення:

    host     → localhost
    port     → 5432
    user     → postgres
    database → postgres

• PostgreSQL має configuration files.

• Основні configuration files:

    postgresql.conf
    pg_hba.conf

• `postgresql.conf` відповідає за багато параметрів роботи server.

• `pg_hba.conf` визначає правила client authentication.

• Database files зберігаються у PostgreSQL data directory.

• PostgreSQL Server потрібно запустити перед підключенням client.

• Після встановлення потрібно перевірити:

    server
    port
    connection
    user
    database
    encoding

---

# Installation Architecture

Після встановлення можна уявляти систему так:

    PostgreSQL Installation
           │
           ├── PostgreSQL Server
           │
           ├── psql
           │
           ├── PostgreSQL utilities
           │
           └── optional GUI
                    ↓
                  pgAdmin

---

# PostgreSQL Server

PostgreSQL Server — основний компонент PostgreSQL.

Він:

- приймає connections;
- authentication clients;
- виконує SQL queries;
- керує transactions;
- працює з tables;
- працює з indexes;
- читає та записує data;
- керує concurrent access.

Спрощено:

    Client
       ↓
    connection
       ↓
    PostgreSQL Server
       ↓
    Database
       ↓
    Data

---

# PostgreSQL Client

Client — програма, яка підключається до PostgreSQL Server.

Приклади:

    psql
    pgAdmin
    pgcli
    Node.js application
    NestJS application

Наприклад:

    psql
      ↓
    PostgreSQL Server

або:

    NestJS
      ↓
    PostgreSQL driver
      ↓
    PostgreSQL Server

---

# psql

`psql` — основний command-line client PostgreSQL.

Запуск:

    psql -U postgres

Підключення до конкретної database:

    psql -U postgres -d postgres

З host та port:

    psql -h localhost -p 5432 -U postgres -d postgres

---

# pgAdmin

pgAdmin — графічний client для PostgreSQL.

Він дозволяє:

    connect to server
    create databases
    create tables
    execute SQL
    inspect data
    manage roles
    inspect indexes
    manage objects

Важливо:

    pgAdmin ≠ PostgreSQL Server

pgAdmin — client.

PostgreSQL Server — database server.

---

# PostgreSQL Installation Components

Під час установки можна отримати:

    PostgreSQL Server
    psql
    pg_dump
    pg_restore
    createdb
    dropdb
    createuser
    dropuser
    pg_isready
    pg_config

Також може встановлюватися:

    pgAdmin

Не всі компоненти є обов'язковими для кожної задачі.

---

# PostgreSQL Utilities

До PostgreSQL installation входять різні command-line utilities.

Наприклад:

    psql
    createdb
    dropdb
    createuser
    dropuser
    pg_dump
    pg_restore
    pg_isready

Їх можна використовувати з terminal.

---

# psql

SQL client:

    psql

---

# createdb

Створення database:

    createdb my_database

Або через SQL:

    CREATE DATABASE my_database;

---

# dropdb

Видалення database:

    dropdb my_database

Або через SQL:

    DROP DATABASE my_database;

---

# pg_dump

Backup database:

    pg_dump my_database > backup.sql

---

# pg_restore

Відновлення backup, створеного у відповідному archive format:

    pg_restore -d my_database backup.dump

---

# pg_isready

Перевірка готовності PostgreSQL Server:

    pg_isready

Наприклад:

    localhost:5432 - accepting connections

Це дуже корисна команда для швидкої перевірки server.

---

# Installation on Windows

Для Windows типовий процес:

    1. Download installer
    2. Run installer
    3. Select components
    4. Select installation directory
    5. Select data directory
    6. Set postgres password
    7. Select port
    8. Select locale
    9. Install
    10. Verify installation

---

# Installation Directory

PostgreSQL installation directory містить executable files та інші компоненти.

Типовий Windows path може виглядати приблизно так:

    C:\Program Files\PostgreSQL\18\

Всередині:

    bin
    data
    lib
    share

Конкретний path залежить від версії та параметрів установки.

---

# bin Directory

`bin` містить executable programs.

Наприклад:

    psql.exe
    postgres.exe
    pg_dump.exe
    pg_restore.exe
    createdb.exe
    dropdb.exe
    pg_isready.exe

Типовий path:

    C:\Program Files\PostgreSQL\18\bin

---

# PATH

`PATH` — environment variable, яка визначає directories, де shell шукає executable commands.

Якщо PostgreSQL `bin` додано до `PATH`, можна написати:

    psql

замість:

    C:\Program Files\PostgreSQL\18\bin\psql.exe

Перевірити:

    psql --version

Якщо команда не знайдена:

    psql: command not found

або у Windows:

    'psql' is not recognized...

це може означати, що PostgreSQL `bin` не знаходиться у `PATH`.

---

# Full Path

Навіть без `PATH` можна запускати executable за повним шляхом.

Наприклад:

    "C:\Program Files\PostgreSQL\18\bin\psql.exe" --version

Або в Git Bash:

    "/c/Program Files/PostgreSQL/18/bin/psql.exe" --version

Але для щоденної роботи зручніше налаштувати `PATH`.

---

# Checking Installation

Після установки перевірити:

    psql --version

Наприклад:

    psql (PostgreSQL) 18.x

Також можна перевірити:

    pg_isready

---

# Client Version

Команда:

    psql --version

показує версію `psql` client.

Наприклад:

    psql (PostgreSQL) 18.1

Це client version.

---

# Server Version

Після підключення:

    SELECT version();

або:

    SHOW server_version;

Це server version.

Важливо:

    psql version
          ≠
    PostgreSQL server version

Вони можуть відрізнятися.

---

# PostgreSQL Service

У Windows PostgreSQL Server зазвичай працює як Windows service.

Спрощено:

    Windows
       ↓
    PostgreSQL Service
       ↓
    PostgreSQL Server
       ↓
    Port 5432

Якщо service не запущений, client не зможе підключитися до server.

---

# Server Running

Перевірити:

    pg_isready

Або спробувати:

    psql -U postgres

Якщо server працює і credentials правильні, відбудеться connection.

---

# Server Not Running

Якщо server не працює, можна отримати помилку на кшталт:

    connection refused

або:

    could not connect to server

Це означає, що client не зміг встановити connection із server.

---

# Connection Parameters

Для PostgreSQL connection часто потрібні:

    host
    port
    database
    user
    password

Наприклад:

    host     = localhost
    port     = 5432
    database = postgres
    user     = postgres
    password = ********

---

# Host

`host` визначає, де знаходиться PostgreSQL Server.

Для локального server:

    localhost

Також часто:

    127.0.0.1

Обидва в типовій локальній конфігурації вказують на local machine.

---

# Port

Port визначає мережеву точку, через яку client підключається до PostgreSQL Server.

Типовий PostgreSQL port:

    5432

Наприклад:

    localhost:5432

---

# User

PostgreSQL використовує roles для керування access.

Після стандартної установки часто існує administrative role:

    postgres

Підключення:

    psql -U postgres

---

# Password

Під час установки PostgreSQL на Windows зазвичай задається password для адміністративного PostgreSQL role.

Наприклад:

    postgres
        ↓
    password

Password використовується для authentication відповідно до правил PostgreSQL.

Не слід зберігати реальні passwords у:

    Git repository
    source code
    public .env files

---

# Authentication

Authentication відповідає на питання:

    Who are you?

Authorization відповідає на питання:

    What are you allowed to do?

Наприклад:

    Authentication
        ↓
    user = postgres
        ↓
    Authorization
        ↓
    permissions

---

# pg_hba.conf

`pg_hba.conf` — configuration file, який визначає правила client authentication.

HBA означає:

    Host-Based Authentication

Файл визначає:

    хто
    звідки
    до якої database
    яким методом
    може підключатися

Спрощено:

    client
       ↓
    pg_hba.conf
       ↓
    authentication
       ↓
    PostgreSQL Server

---

# postgresql.conf

`postgresql.conf` — основний configuration file PostgreSQL Server.

У ньому можуть налаштовуватися:

    port
    listen_addresses
    memory settings
    logging
    connection limits
    WAL
    query-related settings
    time zone
    other server parameters

Наприклад:

    port = 5432

---

# port Configuration

Типове значення:

    port = 5432

Якщо змінити port:

    port = 5433

тоді client повинен використовувати:

    psql -p 5433 -U postgres

---

# listen_addresses

`listen_addresses` визначає, на яких network addresses PostgreSQL Server слухає connections.

Наприклад:

    listen_addresses = 'localhost'

означає локальне прослуховування.

Для віддалених connections потрібна відповідна конфігурація server і authentication rules.

Не слід відкривати PostgreSQL у мережу без розуміння:

    firewall
    authentication
    authorization
    network security

---

# Data Directory

PostgreSQL Server зберігає database data у data directory.

Там знаходяться:

    databases
    system catalogs
    WAL
    configuration files
    other PostgreSQL internal data

Data directory — критично важлива частина PostgreSQL installation.

Не слід вручну змінювати або видаляти його файли без розуміння PostgreSQL internals.

---

# Data Directory vs Installation Directory

Це різні поняття.

Installation directory:

    PostgreSQL programs
    ↓
    bin
    lib
    share

Data directory:

    PostgreSQL data
    ↓
    databases
    configuration
    WAL
    internal files

Наприклад:

    C:\Program Files\PostgreSQL\18\
            ↓
        installation

    C:\Program Files\PostgreSQL\18\data\
            ↓
        data directory

Конкретне розташування може бути іншим.

---

# Cluster Initialization

Під час створення PostgreSQL cluster створюється структура data directory.

Основна утиліта:

    initdb

Концептуально:

    initdb
      ↓
    PostgreSQL cluster
      ↓
    data directory
      ↓
    databases

На стандартній Windows installation цей процес зазвичай виконується installer-ом автоматично.

---

# PostgreSQL Cluster

Cluster у PostgreSQL — це data directory та набір databases, якими керує один PostgreSQL server instance.

Спрощено:

    PostgreSQL Server
          ↓
       Cluster
       ├── postgres
       ├── template0
       ├── template1
       └── my_database

---

# Default Databases

Після стандартної initialization PostgreSQL зазвичай має системні databases, зокрема:

    postgres
    template0
    template1

`postgres` часто використовується як default database для administrative connections.

`template0` і `template1` використовуються як templates для створення databases.

---

# First Connection

Після installation:

    psql -U postgres

Якщо потрібно явно вказати database:

    psql -U postgres -d postgres

Якщо потрібно явно вказати host:

    psql -h localhost -U postgres -d postgres

---

# Password Prompt

Після команди:

    psql -U postgres

може з'явитися:

    Password for user postgres:

Вводиться password, встановлений під час setup.

У terminal введені символи password зазвичай не відображаються.

---

# Successful Connection

Після успішного підключення можна побачити prompt приблизно:

    postgres=#

або:

    postgres=>

Символ prompt залежить від privilege/context.

---

# Перша перевірка

Після connection:

    SELECT version();

Потім:

    SELECT current_database();

Потім:

    SELECT current_user;

---

# Connection Information

У `psql` можна використати:

    \conninfo

Вона показує інформацію про поточне connection.

Наприклад:

    database
    user
    host
    port

---

# Check Server Version

    SHOW server_version;

---

# Check Port

    SHOW port;

---

# Check Server Encoding

    SHOW server_encoding;

Типове значення:

    UTF8

---

# Check Client Encoding

    SHOW client_encoding;

Client encoding може бути:

    UTF8

або іншим значенням залежно від client/configuration.

---

# Set Client Encoding

У `psql`:

    \encoding UTF8

Або SQL:

    SET client_encoding TO 'UTF8';

Важливо розрізняти:

    server_encoding
    client_encoding

---

# UTF-8

UTF-8 — широко використовуване кодування для Unicode text.

Для сучасного application stack рекомендується узгоджено використовувати Unicode-compatible encoding.

Наприклад:

    PostgreSQL
        ↓
    UTF8
        ↓
    Node.js
        ↓
    UTF-8 HTTP
        ↓
    Browser

---

# Locale

Locale впливає на деякі аспекти поведінки PostgreSQL, зокрема:

    sorting
    character classification
    formatting

Під час initialization PostgreSQL може використовувати system locale.

Перевірити:

    SHOW lc_collate;

    SHOW lc_ctype;

Не слід без потреби змінювати locale вже створеної database.

---

# Time Zone

PostgreSQL має налаштування timezone.

Перевірити:

    SHOW timezone;

Наприклад:

    Etc/UTC

або інше значення.

Для application важливо розуміти різницю між:

    timestamp
    timestamptz
    timezone

---

# Environment Variables

PostgreSQL clients підтримують environment variables.

Корисні:

    PGHOST
    PGPORT
    PGUSER
    PGDATABASE
    PGPASSWORD

Наприклад:

    PGHOST=localhost
    PGPORT=5432
    PGUSER=postgres
    PGDATABASE=postgres

Після цього client може використовувати ці параметри за замовчуванням.

---

# PGPASSWORD

`PGPASSWORD` може використовуватися для передачі password client-у.

Але з точки зору security не рекомендується бездумно використовувати password у environment variables, особливо в production.

Краще використовувати безпечні способи:

    password prompt
    .pgpass
    secret manager
    environment-specific secret management

---

# .pgpass

PostgreSQL підтримує password file:

    .pgpass

Він дозволяє client автоматично отримувати password для connection.

Формат:

    hostname:port:database:username:password

Наприклад:

    localhost:5432:postgres:postgres:secret

Файл повинен мати належні permissions.

Не потрібно додавати його до Git repository.

---

# Connection String

PostgreSQL connection можна описувати connection string.

Наприклад:

    postgresql://postgres:password@localhost:5432/my_database

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

У реальному проекті password не слід hardcode-ити у source code.

---

# DATABASE_URL

Backend applications часто використовують:

    DATABASE_URL

Наприклад:

    DATABASE_URL=postgresql://user:password@localhost:5432/my_database

У Node.js / NestJS:

    application
          ↓
    DATABASE_URL
          ↓
    PostgreSQL driver
          ↓
    PostgreSQL Server

---

# Local Development

Для локальної розробки типовий setup:

    Windows
       ↓
    PostgreSQL Server
       ↓
    localhost:5432
       ↓
    database
       ↓
    NestJS / Node.js

Наприклад:

    PostgreSQL
        ↓
    localhost:5432
        ↓
    learning_db
        ↓
    NestJS

---

# Development Database

Для навчання краще створити окрему database.

Наприклад:

    CREATE DATABASE learning_db;

Підключення:

    \c learning_db

Тепер можна працювати з:

    learning_db

замість системної database:

    postgres

---

# Перевірка Database

Показати databases:

    \l

Підключитися:

    \c learning_db

Перевірити:

    SELECT current_database();

---

# Перевірка Tables

У `psql`:

    \dt

Якщо таблиць ще немає:

    Did not find any relations.

Це нормально для нової database.

---

# First Table

Створити:

    CREATE TABLE users (
        id INTEGER,
        name TEXT
    );

Перевірити:

    \dt

Описати table:

    \d users

---

# Installation Verification Checklist

Після installation перевірити:

    psql --version

    pg_isready

    psql -U postgres

Після connection:

    SELECT version();

    SHOW server_version;

    SHOW server_encoding;

    SHOW client_encoding;

    \conninfo

---

# Troubleshooting

## psql command not found

Проблема:

    psql: command not found

Можливі причини:

    PostgreSQL не встановлений
    PostgreSQL bin не доданий до PATH
    terminal не бачить оновлений PATH

Перевірити installation path:

    C:\Program Files\PostgreSQL\18\bin

Перевірити:

    psql --version

---

# Server Connection Error

Помилка:

    could not connect to server

Перевірити:

    pg_isready

Потім:

    PostgreSQL service
    host
    port
    firewall
    server configuration

---

# Connection Refused

Помилка:

    connection refused

Часті причини:

    PostgreSQL server не запущений
    неправильний port
    неправильний host
    firewall
    server не слухає потрібну address

---

# Authentication Failed

Помилка:

    password authentication failed

Перевірити:

    username
    password
    database
    pg_hba.conf

Наприклад:

    psql -U postgres -d postgres

---

# Role Does Not Exist

Помилка:

    role "user" does not exist

Означає, що PostgreSQL не знайшов відповідну role.

Перевірити roles:

    \du

---

# Database Does Not Exist

Помилка:

    database "my_database" does not exist

Перевірити:

    \l

Створити:

    CREATE DATABASE my_database;

---

# Port Already in Use

Якщо PostgreSQL не може запуститися через зайнятий port:

    5432

можливо, інший process вже використовує цей port.

Можна:

    знайти process
    звільнити port
    або налаштувати PostgreSQL на інший port

Наприклад:

    5433

---

# Encoding Problems

Якщо український текст відображається неправильно, потрібно перевірити:

    SHOW server_encoding;

    SHOW client_encoding;

У `psql`:

    \encoding

Також важливе encoding самого terminal.

Для Windows можуть виникати проблеми через різні code pages.

Сучасний бажаний напрямок:

    terminal
        ↓
    UTF-8
        ↓
    psql
        ↓
    PostgreSQL UTF8

---

# Windows Terminal / PowerShell / Git Bash

PostgreSQL client можна запускати з різних terminal environments.

Наприклад:

    Windows Terminal
    PowerShell
    Command Prompt
    Git Bash

Головне:

    shell
      ↓
    psql
      ↓
    PostgreSQL Server

Shell не є PostgreSQL.

---

# Git Bash

У Git Bash Windows path може представлятися інакше.

Windows:

    C:\Program Files\PostgreSQL\18\bin

Git Bash:

    /c/Program Files/PostgreSQL/18/bin

Наприклад:

    /c/Program\ Files/PostgreSQL/18/bin/psql.exe --version

Або після PATH:

    psql --version

---

# PATH and Terminal

Після зміни PATH вже відкритий terminal може не бачити нове значення.

У такому випадку:

    close terminal
        ↓
    open terminal
        ↓
    psql --version

---

# Configuration Hierarchy

Корисно розрізняти:

    PostgreSQL installation
            ↓
    PostgreSQL server
            ↓
    configuration
            ↓
    databases
            ↓
    schemas
            ↓
    tables
            ↓
    data

---

# PostgreSQL Setup for Node.js

Для Node.js / NestJS project потрібні:

    PostgreSQL Server
          ↓
    Database
          ↓
    PostgreSQL driver
          ↓
    Node.js / NestJS
          ↓
    Application

Наприклад:

    PostgreSQL
        ↓
    learning_db
        ↓
    NestJS
        ↓
    REST API
        ↓
    Frontend

---

# PostgreSQL Setup Checklist

## Server

    PostgreSQL installed
    Server running
    Port available
    Server accepting connections

---

## Client

    psql installed
    psql available in PATH
    pgAdmin optional
    pgcli optional

---

## Connection

    host
    port
    database
    user
    password

---

## Configuration

    postgresql.conf
    pg_hba.conf

---

## Encoding

    server_encoding
    client_encoding
    terminal encoding

---

## Application

    database created
    user configured
    connection string configured
    driver installed

---

# Безпечна конфігурація

Для development:

    localhost
        ↓
    PostgreSQL
        ↓
    local application

Для production потрібно додатково враховувати:

    authentication
    authorization
    TLS
    firewall
    network isolation
    secrets
    backups
    monitoring
    logging
    least privilege

Не варто просто відкривати PostgreSQL port:

    5432

у public internet.

---

# Типовий Local Setup

    Windows
       │
       ├── PostgreSQL Server
       │       │
       │       └── localhost:5432
       │
       ├── psql
       │
       ├── pgAdmin
       │
       └── Git Bash / PowerShell
                │
                ↓
             psql
                │
                ↓
        PostgreSQL Server
                │
                ↓
          learning_db

---

# Практичний сценарій

## 1. Перевірити client

    psql --version

---

## 2. Перевірити server

    pg_isready

---

## 3. Підключитися

    psql -U postgres

---

## 4. Перевірити version

    SELECT version();

---

## 5. Перевірити current user

    SELECT current_user;

---

## 6. Перевірити database

    SELECT current_database();

---

## 7. Перевірити connection

    \conninfo

---

## 8. Показати databases

    \l

---

## 9. Створити навчальну database

    CREATE DATABASE learning_db;

---

## 10. Підключитися

    \c learning_db

---

## 11. Перевірити

    SELECT current_database();

---

## 12. Створити першу table

    CREATE TABLE users (
        id INTEGER,
        name TEXT
    );

---

## 13. Перевірити table

    \dt

---

## 14. Описати table

    \d users

---

# Типові помилки

❌ Вважати, що встановлення `psql` означає встановлення PostgreSQL Server.

    psql → client
    PostgreSQL Server → server

---

❌ Плутати PostgreSQL Server та pgAdmin.

    PostgreSQL Server → database server
    pgAdmin → GUI client

---

❌ Не перевіряти, чи працює server.

Перед debugging connection перевірити:

    pg_isready

---

❌ Плутати client port та database.

    5432 → port
    postgres → database

---

❌ Плутати user та database.

    postgres → user / role
    postgres → database

Вони можуть мати однакове ім'я, але це різні objects.

---

❌ Плутати installation directory та data directory.

    installation → programs
    data → database files

---

❌ Редагувати database files вручну.

PostgreSQL data directory не призначений для ручного редагування.

---

❌ Зберігати password у Git.

Не робити:

    const password = "my-secret-password";

Краще використовувати environment / secret management.

---

❌ Публікувати `.env`.

Файл:

    .env

зазвичай повинен бути у:

    .gitignore

---

❌ Відкривати port `5432` у public internet без security configuration.

---

❌ Ігнорувати encoding.

Для українського тексту важливо перевіряти:

    UTF8
    client encoding
    terminal encoding

---

# Питання зі співбесіди

Що потрібно встановити для роботи з PostgreSQL?

Що таке PostgreSQL Server?

Що таке PostgreSQL Client?

Що таке `psql`?

Що таке pgAdmin?

Чим `psql` відрізняється від PostgreSQL Server?

Який default port PostgreSQL?

Що таке `localhost`?

Що таке PostgreSQL role?

Що таке authentication?

Що таке authorization?

Що таке `postgres` user?

Що таке `postgresql.conf`?

Що таке `pg_hba.conf`?

Що таке data directory?

Що таке installation directory?

Що таке PostgreSQL cluster?

Що таке `PATH`?

Для чого потрібен `PATH`?

Як перевірити версію `psql`?

Як перевірити server version?

Як перевірити, чи працює PostgreSQL Server?

Що робить `pg_isready`?

Що робить `psql -U postgres`?

Як підключитися до конкретної database?

Як змінити port PostgreSQL?

Що таке `server_encoding`?

Що таке `client_encoding`?

Що таке UTF-8?

Що таке `PGHOST`?

Що таке `PGPORT`?

Що таке `PGUSER`?

Що таке `PGDATABASE`?

Що таке `DATABASE_URL`?

Що таке connection string?

Чому не можна зберігати database password у Git?

Що робити, якщо `psql` не знаходиться?

Що робити, якщо PostgreSQL відмовляється приймати connection?

Що робити при `password authentication failed`?

Що робити при `database does not exist`?

---

# Шлях

## 🟢 Core — обов'язково знати

Встановлення PostgreSQL.

PostgreSQL Server.

PostgreSQL Client.

`psql`.

pgAdmin.

PostgreSQL installation directory.

PostgreSQL data directory.

PostgreSQL cluster.

`localhost`.

Port:

    5432

User / role.

Password.

Authentication.

Connection parameters:

    host
    port
    database
    user
    password

Перевірка:

    psql --version
    pg_isready

Підключення:

    psql -U postgres

Основні `psql` commands:

    \l
    \c
    \dt
    \d
    \du
    \conninfo
    \q

Основні SQL перевірки:

    SELECT version();

    SELECT current_user;

    SELECT current_database();

    SHOW server_version;

    SHOW server_encoding;

    SHOW client_encoding;

---

## 🔵 Junior

Розуміння:

    client-server architecture

Розуміння:

    PostgreSQL Server
    psql
    pgAdmin
    pgcli

Розуміння:

    installation directory
    data directory
    PostgreSQL cluster

Розуміння:

    postgresql.conf
    pg_hba.conf

Розуміння:

    PATH
    environment variables
    connection string

Робота з:

    PGHOST
    PGPORT
    PGUSER
    PGDATABASE

Розуміння:

    authentication
    authorization

Налаштування:

    UTF8
    client encoding
    server encoding

Створення:

    development database

Підключення:

    Node.js
    NestJS
    PostgreSQL driver

---

## 🟠 Middle

Глибше розуміння:

    PostgreSQL configuration
    authentication
    authorization
    connection management
    connection pooling
    roles
    privileges
    networking
    TLS
    logging

Розуміння:

    pg_hba.conf rules
    listen_addresses
    connection limits
    server configuration

Розуміння взаємодії:

    application
        ↓
    connection pool
        ↓
    PostgreSQL
        ↓
    database

Розуміння:

    environment-specific configuration
    secrets
    database security

---

## 🔴 Senior

Глибоке розуміння:

    PostgreSQL internals
    process architecture
    shared memory
    background processes
    WAL
    checkpoints
    configuration tuning
    authentication architecture
    TLS
    connection pooling
    high availability
    replication
    backup / recovery
    security hardening

Розуміння trade-offs:

    local
    private network
    public network
    connection pooling
    dedicated roles
    least privilege

---

# Міні-шпаргалка

## Installation

    Install
       ↓
    Configure
       ↓
    Start Server
       ↓
    Verify
       ↓
    Connect
       ↓
    Create Database

---

## PostgreSQL Architecture

    Client
       ↓
    Connection
       ↓
    PostgreSQL Server
       ↓
    Cluster
       ↓
    Database
       ↓
    Schema
       ↓
    Tables
       ↓
    Data

---

## Clients

    psql
    pgAdmin
    pgcli
    Node.js
    NestJS

---

## Default Connection

    host     → localhost
    port     → 5432
    database → postgres
    user     → postgres
    password → installation password

---

## Check Installation

    psql --version

---

## Check Server

    pg_isready

---

## Connect

    psql -U postgres

---

## Connect Explicitly

    psql \
        -h localhost \
        -p 5432 \
        -U postgres \
        -d postgres

---

## Check Connection

    \conninfo

---

## Check Version

    SELECT version();

---

## Check User

    SELECT current_user;

---

## Check Database

    SELECT current_database();

---

## Check Encoding

    SHOW server_encoding;

    SHOW client_encoding;

У `psql`:

    \encoding

---

## Configuration

    postgresql.conf
          ↓
    server settings

    pg_hba.conf
          ↓
    client authentication

---

## Directories

    installation directory
          ↓
    programs

    data directory
          ↓
    database data

---

## Environment

    PGHOST
    PGPORT
    PGUSER
    PGDATABASE

---

## Connection String

    postgresql://
        user:password
        @host:port
        /database

---

## Local Development

    NestJS
       ↓
    PostgreSQL driver
       ↓
    localhost:5432
       ↓
    PostgreSQL Server
       ↓
    learning_db

---

# Головне:

• PostgreSQL installation включає server, client tools та інші utilities.

• PostgreSQL Server — основний компонент, який обробляє database operations.

• `psql` — command-line client.

• pgAdmin — GUI client.

• Client та Server — різні компоненти.

• Типовий PostgreSQL port:

    5432

• Для локального PostgreSQL типовий host:

    localhost

• Для connection зазвичай потрібні:

    host
    port
    database
    user
    password

• `postgres` — типова administrative role після стандартної установки.

• PostgreSQL Server повинен працювати, щоб client міг підключитися.

• `pg_isready` — швидкий спосіб перевірити готовність server.

• `psql --version` показує client version.

• `SHOW server_version;` показує server version.

• `postgresql.conf` містить server configuration.

• `pg_hba.conf` визначає правила client authentication.

• Installation directory містить PostgreSQL programs.

• Data directory містить database data та internal PostgreSQL files.

• PostgreSQL cluster об'єднує databases, якими керує один server instance.

• `PATH` дозволяє запускати `psql` та інші PostgreSQL utilities без повного шляху.

• Для application важливо розуміти connection string.

• Типовий backend connection:

    Backend
       ↓
    PostgreSQL driver
       ↓
    PostgreSQL Server
       ↓
    Database

• Для локальної розробки можна використовувати:

    localhost:5432

• Не слід зберігати passwords у source code або Git repository.

• Для production потрібно окремо думати про:

    authentication
    authorization
    TLS
    firewall
    secrets
    network security

• Для українського та іншого Unicode-тексту важливо перевіряти:

    server_encoding
    client_encoding
    terminal encoding

• Типовий порядок перевірки після installation:

    psql --version
          ↓
    pg_isready
          ↓
    psql -U postgres
          ↓
    SELECT version();
          ↓
    \conninfo
          ↓
    \l
          ↓
    CREATE DATABASE learning_db;
          ↓
    \c learning_db

• Головна модель цього розділу:

    INSTALLATION
         ↓
    POSTGRESQL SERVER
         ↓
    CONFIGURATION
         ↓
    CONNECTION
         ↓
    DATABASE
         ↓
    APPLICATION
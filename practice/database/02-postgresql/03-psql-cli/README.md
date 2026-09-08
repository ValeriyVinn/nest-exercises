# 03. psql CLI

`psql` — це офіційний command-line client PostgreSQL, який дозволяє працювати з PostgreSQL Server без графічного інтерфейсу.

Через `psql` можна:

- підключатися до PostgreSQL Server;
- створювати та видаляти databases;
- виконувати SQL queries;
- створювати tables;
- переглядати структуру database objects;
- керувати roles;
- виконувати transactions;
- перевіряти server configuration;
- виконувати backup / restore commands;
- працювати з PostgreSQL з terminal.

Модель роботи:

    Terminal
       ↓
      psql
       ↓
    PostgreSQL Server
       ↓
    Database
       ↓
    Data

---

# Ключові поняття

✔ CLI  
✔ command-line interface  
✔ `psql`  
✔ PostgreSQL client  
✔ PostgreSQL server  
✔ connection  
✔ host  
✔ port  
✔ database  
✔ user  
✔ role  
✔ password  
✔ SQL query  
✔ psql meta-command  
✔ prompt  
✔ session  
✔ connection string  
✔ environment variables  
✔ `PGHOST`  
✔ `PGPORT`  
✔ `PGUSER`  
✔ `PGDATABASE`  
✔ `\l`  
✔ `\c`  
✔ `\dt`  
✔ `\d`  
✔ `\du`  
✔ `\conninfo`  
✔ `\q`  
✔ `\?`  
✔ `\h`  
✔ `\timing`  
✔ `\x`  
✔ `\i`  
✔ `\o`

---

# Що потрібно пам'ятати

• `psql` — PostgreSQL client.

• `psql` не є PostgreSQL Server.

• `psql` працює через terminal.

• SQL commands відправляються PostgreSQL Server.

• `psql` meta-commands обробляються самим `psql`.

• SQL command зазвичай завершується:

    ;

• `psql` meta-command починається з:

    \

• `\dt` показує tables.

• `\l` показує databases.

• `\c` змінює database connection.

• `\d` показує структуру object.

• `\du` показує roles.

• `\conninfo` показує інформацію про connection.

• `\q` виходить із `psql`.

• `\?` показує список `psql` meta-commands.

• `\h` показує SQL command help.

• `Ctrl + C` зазвичай перериває поточну команду або query.

• `Ctrl + D` може завершити input / session залежно від контексту.

---

# CLI

CLI — Command-Line Interface.

Це спосіб взаємодії з програмою через текстові команди.

Наприклад:

    psql --version

або:

    psql -U postgres

---

# GUI vs CLI

GUI:

    pgAdmin
       ↓
    graphical interface

CLI:

    psql
       ↓
    terminal

Обидва можуть працювати з одним PostgreSQL Server.

Наприклад:

    pgAdmin ──┐
              ├──→ PostgreSQL Server
    psql ─────┘

---

# Запуск psql

Найпростіший варіант:

    psql

Якщо default connection parameters налаштовані, `psql` спробує підключитися автоматично.

Частіше явно вказують user:

    psql -U postgres

---

# Основні параметри psql

Загальна форма:

    psql [options] [database]

Наприклад:

    psql -U postgres -d postgres

---

# -U

`-U` визначає PostgreSQL user / role.

Наприклад:

    psql -U postgres

Те саме у довгій формі:

    psql --username=postgres

---

# -d

`-d` визначає database.

Наприклад:

    psql -U postgres -d learning_db

Довга форма:

    psql --dbname=learning_db

---

# -h

`-h` визначає host.

Наприклад:

    psql -h localhost -U postgres

Довга форма:

    psql --host=localhost -U postgres

---

# -p

`-p` визначає port.

Наприклад:

    psql -h localhost -p 5432 -U postgres

Довга форма:

    psql --port=5432 -U postgres

---

# Типове підключення

Повна команда:

    psql \
        -h localhost \
        -p 5432 \
        -U postgres \
        -d postgres

Параметри:

    -h → host
    -p → port
    -U → user
    -d → database

---

# Коротка форма

Для локального server часто достатньо:

    psql -U postgres

Якщо database має таке саме ім'я, як user, PostgreSQL може використовувати її як default database.

Але для навчання корисно явно розуміти:

    user
    database

---

# Password

При підключенні:

    psql -U postgres

може з'явитися:

    Password for user postgres:

Вводиться password PostgreSQL role.

У terminal символи password зазвичай не відображаються.

---

# Successful Connection

Після успішного connection з'являється prompt.

Наприклад:

    postgres=#

Назва database:

    postgres

Поточний user:

    postgres

Символ:

    #

може вказувати на superuser connection.

Для звичайного user prompt часто має:

    >

---

# psql Prompt

Приклад:

    postgres=#

означає, що ви знаходитесь у `psql` і підключені до database:

    postgres

Ім'я database відображається у prompt.

---

# Prompt Example

Наприклад:

    learning_db=#

Це означає:

    current database
        ↓
    learning_db

---

# SQL Commands

У `psql` можна виконувати SQL.

Наприклад:

    SELECT version();

SQL command завершується:

    ;

---

# SQL Without Semicolon

Якщо написати:

    SELECT version()

`psql` чекатиме продовження команди.

Prompt може змінитися на:

    postgres-#

Щоб завершити query:

    ;

---

# Cancel Current Input

Якщо ви випадково почали неправильну або незавершену SQL command:

    SELECT *

можна натиснути:

    Ctrl + C

щоб скасувати поточний input.

---

# psql Meta-Commands

Meta-command — команда самого `psql`.

Вона починається з:

    \

Наприклад:

    \l

Meta-command не є SQL.

---

# SQL vs psql

SQL:

    SELECT *
    FROM users;

Обробляється:

    PostgreSQL Server

---

`psql` meta-command:

    \dt

Обробляється:

    psql client

---

# Найважливіша різниця

    SQL
      ↓
    PostgreSQL Server

    \command
      ↓
    psql Client

---

# \l

`\l` показує список databases.

    \l

Також можна:

    \list

Приклад результату:

    Name
    -----------
    postgres
    learning_db
    shop

---

# \c

`\c` — connect / switch database.

Наприклад:

    \c learning_db

Після цього current database:

    learning_db

---

# \connect

Повна форма:

    \connect learning_db

Те саме:

    \c learning_db

---

# \c з user

Можна вказати database та user:

    \c learning_db postgres

---

# \conninfo

Показує information про поточне connection.

    \conninfo

Може показати:

    database
    user
    host
    port

Це одна з найкорисніших команд для debugging.

---

# \dt

`\dt` показує tables.

    \dt

Якщо потрібно подивитися tables у всіх schemas:

    \dt *.*

---

# \d

`\d` показує database objects.

Наприклад:

    \d users

Покаже приблизно:

    Column
    Type
    Modifiers

---

# \d table

Наприклад:

    \d users

Це дозволяє побачити:

    columns
    data types
    constraints
    indexes

---

# \d+

Розширений варіант:

    \d+ users

Може показати додаткову information про object.

---

# \dt+

Розширений список tables:

    \dt+

---

# \di

Показує indexes.

    \di

---

# \dv

Показує views.

    \dv

---

# \ds

Показує sequences.

    \ds

---

# \df

Показує functions.

    \df

---

# \dn

Показує schemas.

    \dn

---

# \du

Показує roles.

    \du

Також:

    \du+

для розширеної інформації.

---

# \dx

Показує installed extensions.

    \dx

---

# \dp

Показує table privileges.

    \dp

Також:

    \z

---

# \z

Показує access privileges для tables, views та sequences.

    \z

---

# \dn

Показує schemas:

    \dn

---

# \dt schema.*

Можна вказати schema.

Наприклад:

    \dt public.*

---

# Object Search Pattern

Багато `psql` commands підтримують patterns.

Наприклад:

    \dt user*

Показує tables, назви яких відповідають pattern.

---

# \d *

Можна використовувати patterns для пошуку objects.

Наприклад:

    \d *user*

---

# \?

`\?` показує help для `psql` meta-commands.

    \?

Корисно, коли потрібно згадати:

    command
    syntax
    available options

---

# \h

`\h` показує SQL syntax help.

Наприклад:

    \h SELECT

або:

    \h CREATE TABLE

---

# SQL Help

Наприклад:

    \h INSERT

покаже syntax та description для:

    INSERT

---

# \h *

Можна отримати список SQL commands:

    \h *

---

# \q

`\q` виходить із `psql`.

    \q

Після цього повертаємося до terminal shell.

---

# \exit

У деяких середовищах можна використовувати:

    \q

Як основний спосіб виходу з `psql` краще запам'ятати саме:

    \q

---

# psql Session

Після запуску:

    psql -U postgres

створюється client session.

Модель:

    terminal
       ↓
    psql session
       ↓
    PostgreSQL connection
       ↓
    database

---

# Session vs Connection

Connection — мережеве підключення до PostgreSQL Server.

Session — поточний стан роботи client / connection.

У `psql` ви працюєте в рамках активного database connection.

---

# Current Database

Перевірити SQL:

    SELECT current_database();

Або:

    \conninfo

---

# Current User

SQL:

    SELECT current_user;

Також:

    SELECT session_user;

---

# Current User vs Session User

У простих випадках вони можуть бути однаковими.

    SELECT current_user;

    SELECT session_user;

`current_user` пов'язаний із поточною identity для privilege checks.

---

# Server Version

Перевірити:

    SELECT version();

Або:

    SHOW server_version;

---

# psql Version

У shell:

    psql --version

або:

    psql -V

Наприклад:

    psql (PostgreSQL) 18.1

Це version client.

---

# Client vs Server Version

    psql --version
        ↓
    client version

    SELECT version();
        ↓
    server version

Вони можуть відрізнятися.

---

# \timing

Увімкнути показ часу виконання SQL:

    \timing on

Тепер після query можна побачити:

    Time: 1.234 ms

Вимкнути:

    \timing off

---

# \x

`\x` — expanded display.

Увімкнути:

    \x on

Вимкнути:

    \x off

Автоматичний режим:

    \x auto

Це корисно для таблиць із великою кількістю columns.

---

# Normal Output

Наприклад:

    SELECT *
    FROM users;

може показувати дані як таблицю.

---

# Expanded Output

При:

    \x on

результат може виглядати приблизно:

    -[ RECORD 1 ]-
    id    | 1
    name  | John
    email | john@example.com

Це зручно для широких rows.

---

# \i

`\i` виконує SQL commands із file.

Наприклад:

    \i script.sql

Це корисно для:

    setup scripts
    seed data
    migrations
    practice scripts

---

# \ir

`\ir` також виконує file, але відносний шлях інтерпретується відносно поточного script.

    \ir script.sql

Корисно при роботі з SQL scripts, які включають інші files.

---

# \o

`\o` перенаправляє query output у file.

Наприклад:

    \o result.txt

Після цього:

    SELECT *
    FROM users;

може записувати output у:

    result.txt

Повернути output у terminal:

    \o

---

# \copy

`\copy` дозволяє копіювати data між table та file через client.

Наприклад:

    \copy users TO 'users.csv' CSV HEADER

Імпорт:

    \copy users FROM 'users.csv' CSV HEADER

Важливо:

    \copy

працює через client `psql`, тоді як SQL:

    COPY

є server-side SQL command.

---

# \watch

`\watch` повторює query через заданий інтервал.

Наприклад:

    SELECT now();
    \watch 2

Query буде виконуватися приблизно кожні:

    2 seconds

Це може бути корисно для monitoring.

---

# \echo

Виводить текст у terminal:

    \echo Hello

Результат:

    Hello

Корисно у SQL scripts.

---

# \set

Створює або змінює `psql` variable.

Наприклад:

    \set name 'John'

Потім:

    \echo :name

Результат:

    John

---

# psql Variables

`psql` має власні variables.

Наприклад:

    \set database_name 'learning_db'

Використання:

    \echo :database_name

Це не те саме, що PostgreSQL table variable або SQL variable.

---

# \prompt

`\prompt` може запитувати input у користувача.

Наприклад:

    \prompt 'Enter name: ' name

Потім:

    \echo :name

---

# \! 

`\!` дозволяє виконувати shell command із `psql`.

Наприклад:

    \! dir

або в Unix-like shell:

    \! ls

Це виконується не PostgreSQL Server, а local shell.

Важливо розуміти:

    \!
      ↓
    local operating system

---

# Shell vs psql vs SQL

Є три різні рівні:

    Shell
      ↓
    psql
      ↓
    SQL
      ↓
    PostgreSQL Server

Наприклад:

    psql -U postgres

це:

    Shell command

---

А:

    \dt

це:

    psql meta-command

---

А:

    SELECT *
    FROM users;

це:

    SQL command

---

# Дуже важлива модель

    Terminal
       │
       ├── shell command
       │       ↓
       │      psql
       │
       └── psql session
               │
               ├── \dt
               ├── \l
               ├── \d users
               │
               └── SQL
                    ↓
              PostgreSQL Server

---

# SQL Script

Можна створити file:

    script.sql

Наприклад:

    CREATE TABLE users (
        id INTEGER,
        name TEXT
    );

    INSERT INTO users
    VALUES (1, 'John');

    SELECT *
    FROM users;

Запустити:

    psql -U postgres -d learning_db -f script.sql

---

# -f

`-f` дозволяє виконати SQL file.

Наприклад:

    psql -U postgres -d learning_db -f script.sql

Це зручно для:

    database setup
    seed data
    repeatable practice
    migrations
    automation

---

# Interactive vs Scripted

Interactive:

    psql -U postgres

Потім:

    SELECT version();

Scripted:

    psql -U postgres -d learning_db -f script.sql

---

# Output Format

`psql` підтримує різні output formats.

Наприклад:

    \pset format

Можна використовувати:

    aligned
    unaligned
    csv
    html
    json
    latex
    wrapped

---

# CSV Output

Можна використовувати:

    \pset format csv

Потім:

    SELECT *
    FROM users;

Або для експорту краще використовувати:

    \copy

---

# Expanded Mode

Для широких rows:

    \x

або:

    \x on

---

# Null Display

Можна налаштувати відображення `NULL`.

Наприклад:

    \pset null '[NULL]'

Тоді `NULL` може відображатися як:

    [NULL]

---

# Pager

Великі результати `psql` може показувати через pager.

Перегляд можна контролювати через:

    \pset pager

Наприклад:

    \pset pager off

Ввімкнути:

    \pset pager on

---

# \pset

`\pset` налаштовує output display.

Наприклад:

    \pset pager off

або:

    \pset null '[NULL]'

---

# History

`psql` зберігає command history у відповідному history file, залежно від operating system та configuration.

Це дозволяє повторно використовувати попередні commands.

У terminal можна використовувати history navigation:

    ↑
    ↓

---

# Query Buffer

`psql` має query buffer для поточної SQL command.

Корисні commands:

    \p

показує поточний query buffer.

---

# \p

Показати query buffer:

    \p

---

# \r

Очистити query buffer:

    \r

Корисно, якщо ви почали набирати query і хочете повністю почати спочатку.

---

# \g

`\g` виконує query, яка знаходиться в query buffer.

Наприклад:

    SELECT *
    FROM users

Потім:

    \g

Це виконає query без необхідності ставити `;` наприкінці.

---

# \g filename

Query result можна направити у file:

    SELECT *
    FROM users
    \g users.txt

---

# \gx

`\gx` виконує query та показує результат у expanded mode.

Наприклад:

    SELECT *
    FROM users
    \gx

Корисно для широких rows.

---

# \ef

`\ef` відкриває function definition у зовнішньому editor.

Наприклад:

    \ef my_function

Це використовується при роботі з PostgreSQL functions.

---

# \ev

`\ev` відкриває view definition у зовнішньому editor.

Наприклад:

    \ev active_users

---

# \password

`\password` дозволяє змінити password поточного або вказаного role.

Наприклад:

    \password postgres

Після цього `psql` попросить новий password.

---

# \conninfo + Debugging

Якщо ви не впевнені, до чого підключені:

    \conninfo

Це одна з перших команд, яку варто використовувати.

Потім:

    SELECT current_database();

    SELECT current_user;

---

# Database Switching

Наприклад, є:

    postgres
    learning_db
    shop

Показати:

    \l

Підключитися:

    \c learning_db

Перевірити:

    \conninfo

---

# Tables Inspection

Після:

    \c learning_db

Показати tables:

    \dt

Подивитися конкретну table:

    \d users

Подивитися indexes:

    \di

---

# Schemas Inspection

    \dn

Побачити tables конкретної schema:

    \dt public.*

---

# Roles Inspection

    \du

Побачити privileges:

    \dp

---

# Extensions Inspection

    \dx

---

# Common psql Workflow

Типова послідовність:

    psql -U postgres
          ↓
    \l
          ↓
    \c learning_db
          ↓
    \conninfo
          ↓
    \dt
          ↓
    \d users
          ↓
    SELECT *
    FROM users;
          ↓
    \q

---

# Практичний сценарій

## 1. Запустити psql

    psql -U postgres

---

## 2. Подивитися databases

    \l

---

## 3. Створити database

    CREATE DATABASE learning_db;

---

## 4. Підключитися

    \c learning_db

---

## 5. Перевірити connection

    \conninfo

---

## 6. Створити table

    CREATE TABLE users (
        id INTEGER,
        name TEXT
    );

---

## 7. Подивитися tables

    \dt

---

## 8. Подивитися структуру

    \d users

---

## 9. Додати data

    INSERT INTO users (id, name)
    VALUES
        (1, 'John'),
        (2, 'Anna');

---

## 10. Отримати data

    SELECT *
    FROM users;

---

## 11. Увімкнути timing

    \timing on

---

## 12. Повторити query

    SELECT *
    FROM users;

---

## 13. Вийти

    \q

---

# Useful SQL + psql Combination

У `psql` дуже корисно поєднувати meta-commands та SQL.

Наприклад:

    \dt

показує tables.

Потім:

    SELECT *
    FROM users;

показує data.

Потім:

    \d users

показує structure.

---

# psql Completion

Сучасний `psql` підтримує command completion.

Наприклад, можна почати:

    SEL

і використовувати:

    Tab

для completion, залежно від контексту.

Completion також допомагає з:

    SQL keywords
    database names
    table names
    columns
    psql commands

---

# Keyboard Navigation

Корисні клавіші:

    ↑
        previous command

    ↓
        next command

    Tab
        completion

    Ctrl + C
        cancel current input/query

    Ctrl + D
        end input / exit in appropriate context

---

# Terminal Encoding

При роботі з українською мовою важливо узгодити:

    terminal
        ↓
    psql
        ↓
    PostgreSQL

Перевірити server:

    SHOW server_encoding;

Перевірити client:

    SHOW client_encoding;

У `psql`:

    \encoding

---

# UTF-8

Для сучасних applications типовим вибором є:

    UTF8

Перевірити:

    SHOW server_encoding;

Наприклад:

    UTF8

---

# Environment Variables

`psql` може використовувати environment variables.

Основні:

    PGHOST
    PGPORT
    PGUSER
    PGDATABASE

Наприклад:

    PGHOST=localhost
    PGPORT=5432
    PGUSER=postgres
    PGDATABASE=learning_db

Після налаштування можна виконувати:

    psql

без повторного вказування всіх параметрів.

---

# PGHOST

Визначає default host:

    PGHOST=localhost

---

# PGPORT

Визначає default port:

    PGPORT=5432

---

# PGUSER

Визначає default user:

    PGUSER=postgres

---

# PGDATABASE

Визначає default database:

    PGDATABASE=learning_db

---

# Connection String

Можна передати connection string.

Наприклад:

    psql "postgresql://postgres:password@localhost:5432/learning_db"

Але не рекомендується писати реальні passwords у shell history або source code.

---

# Password Security

Не бажано:

    psql postgresql://postgres:my-secret-password@localhost:5432/learning_db

якщо це призводить до потрапляння password у:

    shell history
    process list
    logs
    scripts

Краще використовувати:

    password prompt
    .pgpass
    secure environment / secret management

---

# .pgpass

PostgreSQL підтримує password file:

    .pgpass

Формат:

    hostname:port:database:username:password

Наприклад:

    localhost:5432:learning_db:postgres:secret

Файл повинен бути захищений permissions.

Не слід додавати його до Git.

---

# psql Configuration

`psql` має власні configuration options.

Їх можна налаштовувати через:

    command-line options
    environment variables
    psql variables
    startup files

---

# .psqlrc

На Unix-like systems `psql` може використовувати:

    ~/.psqlrc

для startup configuration.

У ньому можна налаштувати:

    prompt
    output
    timing
    aliases / shortcuts
    display options

На Windows location configuration file може відрізнятися.

---

# Custom Prompt

`psql` дозволяє налаштовувати prompt.

Це може бути корисно, щоб завжди бачити:

    current database
    current user
    host

Особливо корисно при роботі з кількома databases.

---

# Safety Habit

Перед небезпечними операціями завжди перевіряйте:

    \conninfo

Наприклад, перед:

    DROP TABLE
    DROP DATABASE
    DELETE
    TRUNCATE

переконайтеся, що ви працюєте з правильною database.

---

# Дуже важливе правило

Перед destructive query:

    \conninfo

Потім:

    SELECT current_database();

Потім виконуйте операцію.

---

# SQL Errors

Якщо SQL query містить помилку, PostgreSQL поверне error.

Наприклад:

    SELECT *
    FROM unknown_table;

Може бути:

    ERROR: relation "unknown_table" does not exist

`psql` не є тим, хто створив цю SQL помилку — database server повернув її client-у.

---

# Syntax Error

Наприклад:

    SELECT FROM;

PostgreSQL може повернути syntax error.

Важливо розрізняти:

    psql command error
        vs
    SQL error
        vs
    connection error

---

# Connection Error

Наприклад:

    psql -h localhost -p 5433 -U postgres

якщо server працює на іншому port.

Можлива помилка:

    connection refused

Це проблема connection, а не SQL syntax.

---

# psql Error Model

Помилки можна умовно поділити:

    Shell error
        ↓
    psql startup / client error
        ↓
    Connection error
        ↓
    Authentication error
        ↓
    SQL error

---

# psql Exit Codes

При використанні `psql` у scripts важливі exit codes.

Це дозволяє shell / CI system визначити:

    success
    failure

Наприклад:

    psql -U postgres -d learning_db -f script.sql

може бути використаний у automation.

---

# ON_ERROR_STOP

Для SQL scripts корисно:

    psql -v ON_ERROR_STOP=1 \
        -U postgres \
        -d learning_db \
        -f script.sql

Це змушує `psql` зупинити script при SQL error.

Корисно для:

    migrations
    setup scripts
    CI/CD
    automation

---

# psql in Automation

`psql` дуже добре підходить для automation.

Наприклад:

    shell script
        ↓
    psql
        ↓
    PostgreSQL
        ↓
    database operation

Можна автоматизувати:

    database creation
    schema setup
    seed data
    migrations
    tests
    backups

---

# psql + Git

SQL scripts можна зберігати у Git:

    database/
        ├── schema.sql
        ├── seed.sql
        └── queries.sql

Потім:

    psql -U postgres -d learning_db -f schema.sql

Це робить database setup повторюваним.

---

# psql + Node.js / NestJS

У production application зазвичай:

    NestJS
       ↓
    PostgreSQL driver
       ↓
    PostgreSQL Server

А `psql` використовується окремо:

    Developer
       ↓
    terminal
       ↓
    psql
       ↓
    PostgreSQL Server

`psql` не є заміною PostgreSQL driver для application.

---

# psql vs pgAdmin

## psql

Переваги:

    CLI
    fast
    scriptable
    automation
    SSH-friendly
    low overhead
    excellent for developers

---

## pgAdmin

Переваги:

    GUI
    visual object browser
    graphical tools
    convenient inspection

---

# psql vs pgcli

`psql`:

    official PostgreSQL CLI

`pgcli`:

    alternative PostgreSQL CLI

`pgcli` може надавати:

    autocomplete
    syntax highlighting
    suggestions

Але `psql` є фундаментальним інструментом, який варто знати.

---

# Найважливіші psql Commands

## Connection

    \conninfo
    \c
    \q

---

## Databases

    \l

---

## Schemas

    \dn

---

## Tables

    \dt

---

## Table structure

    \d
    \d table_name
    \d+ table_name

---

## Indexes

    \di

---

## Views

    \dv

---

## Sequences

    \ds

---

## Functions

    \df

---

## Roles

    \du

---

## Extensions

    \dx

---

## Privileges

    \dp
    \z

---

## Help

    \?
    \h
    \h SELECT

---

## Display

    \timing
    \x
    \pset

---

## Scripts

    \i
    \ir

---

## Output

    \o
    \g

---

## Variables

    \set
    \echo
    \prompt

---

## Utilities

    \watch
    \password

---

# Найважливіші psql Options

    -U
        user

    -d
        database

    -h
        host

    -p
        port

    -f
        execute file

    -c
        execute command

    -v
        set variable

    -W
        prompt for password

    -V
        show version

---

# -c

`-c` дозволяє виконати command без interactive session.

Наприклад:

    psql -U postgres -c "SELECT version();"

Ще:

    psql -U postgres -d learning_db -c "SELECT * FROM users;"

Це дуже корисно для scripts.

---

# -f vs -c

Одна command:

    psql -U postgres -c "SELECT version();"

File:

    psql -U postgres -d learning_db -f script.sql

---

# -W

`-W` змушує `psql` попросити password.

Наприклад:

    psql -W -U postgres

---

# -V

Показує client version:

    psql -V

Те саме:

    psql --version

---

# Command Cheat Sheet

    psql
        → start client

    psql -U postgres
        → connect as postgres

    psql -h localhost
        → connect to localhost

    psql -p 5432
        → use port 5432

    psql -d learning_db
        → connect to database

    psql -c "SELECT version();"
        → execute SQL

    psql -f script.sql
        → execute SQL file

    psql -V
        → client version

---

# Типові помилки

❌ Плутати `psql` та PostgreSQL Server.

    psql → client
    PostgreSQL → server / DBMS

---

❌ Плутати SQL та psql meta-commands.

    SELECT → SQL

    \dt → psql

---

❌ Забувати `;` у SQL.

    SELECT *
    FROM users;

---

❌ Вводити `\dt` як SQL.

Неправильно:

    SELECT \dt;

Правильно:

    \dt

---

❌ Використовувати SQL без правильного database connection.

Перевірити:

    \conninfo

---

❌ Працювати не з тією database.

Перед destructive operation:

    \conninfo

---

❌ Плутати `-U` та `-d`.

    -U → user
    -d → database

---

❌ Плутати `-h` та `-p`.

    -h → host
    -p → port

---

❌ Вважати, що `psql --version` показує server version.

    psql --version
        ↓
    client version

Для server:

    SELECT version();

---

❌ Виконувати небезпечні команди без перевірки connection.

Особливо:

    DROP
    DELETE
    TRUNCATE

---

❌ Зберігати password у SQL scripts.

---

❌ Додавати `.pgpass` до Git.

---

❌ Використовувати `PGPASSWORD` без розуміння security implications.

---

❌ Плутати shell commands та `psql` commands.

Наприклад:

    psql -U postgres

це shell command.

А:

    \dt

це `psql` command.

---

# Питання зі співбесіди

Що таке `psql`?

Чим `psql` відрізняється від PostgreSQL Server?

Що таке CLI?

Чим CLI відрізняється від GUI?

Як підключитися до PostgreSQL через `psql`?

Що означає:

    -U

Що означає:

    -d

Що означає:

    -h

Що означає:

    -p

Що означає:

    -f

Що означає:

    -c

Як перевірити версію `psql`?

Як перевірити версію PostgreSQL Server?

Як показати databases?

Як переключитися на іншу database?

Як перевірити поточне connection?

Як показати tables?

Як подивитися структуру table?

Як показати schemas?

Як показати roles?

Як показати indexes?

Як показати views?

Як показати extensions?

Як вийти з `psql`?

Що таке `psql` meta-command?

Чим SQL command відрізняється від meta-command?

Що робить `\l`?

Що робить `\c`?

Що робить `\dt`?

Що робить `\d`?

Що робить `\du`?

Що робить `\conninfo`?

Що робить `\q`?

Що робить `\?`?

Що робить `\h`?

Що робить `\timing`?

Що робить `\x`?

Що робить `\i`?

Що робить `\copy`?

Що робить `\watch`?

Що робить `\set`?

Що таке `PGHOST`?

Що таке `PGPORT`?

Що таке `PGUSER`?

Що таке `PGDATABASE`?

Як виконати SQL file через `psql`?

Як виконати одну SQL command через `psql`?

Як перенаправити query output у file?

Як скасувати поточний query?

Як перевірити, до якої database підключено `psql`?

Як перевірити current user?

Що таке `.psqlrc`?

Що таке `.pgpass`?

Як використовувати `psql` в automation?

Як використовувати `psql` у shell script?

Чому `psql` корисний у CI/CD?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке CLI.

Що таке `psql`.

Різниця:

    psql
    PostgreSQL Server

Підключення:

    psql -U postgres

Основні options:

    -U
    -d
    -h
    -p

Основні commands:

    \l
    \c
    \dt
    \d
    \du
    \conninfo
    \q

Основні SQL commands:

    SELECT
    CREATE DATABASE
    CREATE TABLE
    INSERT
    UPDATE
    DELETE

Різниця:

    SQL
    psql meta-command

Основи:

    host
    port
    database
    user
    password

Перевірка:

    psql --version
    pg_isready

---

## 🔵 Junior

Впевнено використовувати:

    psql
    \l
    \c
    \dt
    \d
    \du
    \dn
    \di
    \dv
    \df
    \dx
    \conninfo
    \timing
    \x
    \?
    \h
    \q

Розуміти:

    query buffer
    psql variables
    output formatting
    pager
    history

Вміти:

    execute SQL files
    execute commands from shell
    export query results
    import CSV
    use environment variables

Розуміти:

    PGHOST
    PGPORT
    PGUSER
    PGDATABASE

---

## 🟠 Middle

Використовувати `psql` для:

    automation
    database setup
    migrations
    seed scripts
    testing
    CI/CD
    troubleshooting

Розуміти:

    .psqlrc
    .pgpass
    connection strings
    output formats
    exit codes
    ON_ERROR_STOP

Вміти:

    execute scripts
    process errors
    automate database operations
    inspect permissions
    troubleshoot connections

---

## 🔴 Senior

Глибоко розуміти:

    psql scripting
    automation
    PostgreSQL protocol concepts
    authentication
    connection management
    scripting reliability
    error handling
    CI/CD integration
    backup automation
    operational tooling

Вміти проектувати:

    repeatable database setup
    deployment scripts
    migration workflows
    database automation
    secure credential handling

Розуміти trade-offs між:

    interactive psql
    scripted psql
    application drivers
    ORM tools
    GUI clients

---

# Міні-шпаргалка

## Запуск

    psql

---

## User

    psql -U postgres

---

## Database

    psql -d learning_db

---

## Host

    psql -h localhost

---

## Port

    psql -p 5432

---

## Повне підключення

    psql \
        -h localhost \
        -p 5432 \
        -U postgres \
        -d learning_db

---

## Version

    psql --version

---

## Databases

    \l

---

## Connect

    \c learning_db

---

## Connection info

    \conninfo

---

## Tables

    \dt

---

## Table structure

    \d users

---

## Schemas

    \dn

---

## Indexes

    \di

---

## Views

    \dv

---

## Functions

    \df

---

## Roles

    \du

---

## Extensions

    \dx

---

## Privileges

    \dp

    \z

---

## SQL help

    \h SELECT

---

## psql help

    \?

---

## Timing

    \timing on

---

## Expanded output

    \x on

---

## Execute file

    \i script.sql

---

## Execute shell command

    \! command

---

## Output to file

    \o result.txt

---

## Clear output redirection

    \o

---

## Watch query

    SELECT now();
    \watch 2

---

## Exit

    \q

---

# SQL from shell

## One command

    psql -U postgres \
        -c "SELECT version();"

---

## SQL file

    psql -U postgres \
        -d learning_db \
        -f script.sql

---

## Stop on error

    psql \
        -v ON_ERROR_STOP=1 \
        -U postgres \
        -d learning_db \
        -f script.sql

---

# Connection Parameters

    -h → host
    -p → port
    -U → user
    -d → database

---

# Environment Variables

    PGHOST
        ↓
    host

    PGPORT
        ↓
    port

    PGUSER
        ↓
    user

    PGDATABASE
        ↓
    database

---

# Three Levels

## Shell

    psql -U postgres

↓

## psql

    \dt

↓

## SQL

    SELECT *
    FROM users;

↓

## PostgreSQL

    Database Server

---

# Головне:

• `psql` — офіційний command-line client PostgreSQL.

• PostgreSQL Server — server, а `psql` — client.

• `psql` працює через terminal.

• Основна модель:

    Terminal
       ↓
      psql
       ↓
    PostgreSQL Server
       ↓
    Database

• Для connection потрібно розуміти:

    host
    port
    database
    user
    password

• Типове локальне підключення:

    psql -U postgres

• Повне підключення:

    psql \
        -h localhost \
        -p 5432 \
        -U postgres \
        -d learning_db

• `-U` → user.

• `-d` → database.

• `-h` → host.

• `-p` → port.

• `-f` → execute SQL file.

• `-c` → execute command.

• `psql --version` → client version.

• `SELECT version();` → PostgreSQL Server version.

• SQL command передається PostgreSQL Server.

• `psql` meta-command виконується client-ом.

• SQL:

    SELECT *
    FROM users;

• `psql` command:

    \dt

• Найважливіші commands:

    \l
    \c
    \dt
    \d
    \du
    \conninfo
    \q

• `\l` → databases.

• `\c` → connect / switch database.

• `\dt` → tables.

• `\d` → object structure.

• `\du` → roles.

• `\conninfo` → current connection information.

• `\q` → exit.

• `\?` → psql help.

• `\h` → SQL help.

• `\timing` → query execution time.

• `\x` → expanded display.

• `\i` → execute SQL file.

• `\copy` → client-side data import/export.

• `\watch` → repeat query.

• `\set` → psql variable.

• `\o` → redirect output.

• Перед destructive operations корисно виконати:

    \conninfo

• Основні environment variables:

    PGHOST
    PGPORT
    PGUSER
    PGDATABASE

• `psql` особливо корисний для:

    development
    debugging
    scripting
    automation
    CI/CD
    database administration

• `psql` не замінює PostgreSQL driver у backend application.

• Типова модель розробника:

    Developer
       ↓
    Terminal
       ↓
      psql
       ↓
    PostgreSQL Server
       ↓
    Database

• Типова модель application:

    Frontend
       ↓
    Backend
       ↓
    PostgreSQL Driver
       ↓
    PostgreSQL Server
       ↓
    Database

• Для впевненої роботи з PostgreSQL потрібно вміти однаково добре орієнтуватися у:

    SQL
    psql
    PostgreSQL Server

• Головне правило `psql`:

    SQL
      ↓
    server

    \command
      ↓
    psql

• Найкорисніша коротка послідовність:

    psql -U postgres
          ↓
    \l
          ↓
    \c learning_db
          ↓
    \conninfo
          ↓
    \dt
          ↓
    \d users
          ↓
    SELECT *
    FROM users;
          ↓
    \q
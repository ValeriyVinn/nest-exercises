# PostgreSQL: Backup and Restore

## 1. Мета розділу

У цьому розділі розберемо, як зберігати та відновлювати PostgreSQL databases:

- що таке backup;
- що таке restore;
- `pg_dump`;
- `pg_restore`;
- `pg_dumpall`;
- SQL dump;
- custom dump;
- directory dump;
- plain-text dump;
- backup окремої database;
- backup окремої table;
- restore database;
- restore окремої table;
- `CREATE DATABASE`;
- `DROP DATABASE`;
- `--clean`;
- `--create`;
- `--no-owner`;
- `--schema`;
- `--table`;
- `--format`;
- `--file`;
- перевірка backup;
- compressed backups;
- logical vs physical backup;
- роль permissions під час backup;
- backup у development;
- backup у production;
- типові помилки;
- практичні вправи.

---

# 2. Головна ідея

Backup — це копія даних та/або структури database, яку можна використати для відновлення.

Спрощена модель:

    PostgreSQL Database
          │
          │ pg_dump
          ↓
       Backup file
          │
          │ pg_restore / psql
          ↓
    PostgreSQL Database

Наприклад:

    school
       │
       ↓
    school.backup

А потім:

    school.backup
       │
       ↓
    school_restored

---

# 3. Навіщо потрібен Backup

Уявімо database:

    school

У ній:

    users
    teachers
    students
    courses
    lessons
    results

Якщо database буде:

- випадково видалена;
- пошкоджена;
- неправильно змінена;
- зіпсована помилковою міграцією;
- втрачена через проблему з сервером;

backup дозволяє повернути дані.

---

# 4. Backup ≠ Git

Git зберігає:

    source code
    configuration
    migrations
    README
    application files

Backup database зберігає:

    database structure
    tables
    rows
    sequences
    indexes
    constraints
    views
    functions
    та інші database objects

Тому:

    Git
       +
    Database backup

— це дві різні частини проекту.

---

# 5. Logical Backup

Найпростіший для розуміння тип backup:

    Logical Backup

Він фактично описує database через SQL-команди або PostgreSQL dump format.

Наприклад:

    CREATE TABLE users (...);

    INSERT INTO users (...);

Ідея:

    Database
       ↓
    логічне представлення
       ↓
    backup

Для навчання `pg_dump` — один із найважливіших інструментів.

---

# 6. Physical Backup

Існує інший підхід:

    Physical Backup

Він працює на рівні фізичних файлів PostgreSQL cluster.

Це вже адміністративна тема.

Основні інструменти та концепції:

    pg_basebackup
    WAL
    Point-in-Time Recovery
    PITR

Для Junior Full Stack Developer достатньо спочатку добре освоїти:

    pg_dump
    pg_restore
    pg_dumpall

---

# 7. PostgreSQL Backup Tools

Основні команди:

    pg_dump
    pg_restore
    pg_dumpall

Також:

    psql

може використовуватися для відновлення plain SQL dump.

---

# 8. pg_dump

`pg_dump` створює backup **однієї database**.

Загальна форма:

    pg_dump [options] database_name > backup.sql

Наприклад:

    pg_dump school > school.sql

Отримаємо:

    school.sql

---

# 9. Що робить pg_dump

Наприклад, є:

    school

з таблицею:

    users

`pg_dump` створює логічну копію database.

У plain SQL dump можуть бути команди на кшталт:

    CREATE TABLE ...
    CREATE SEQUENCE ...
    ALTER TABLE ...
    INSERT INTO ...

Тобто backup можна уявляти як інструкцію:

> "Створи database objects і віднови дані".

---

# 10. Plain SQL Dump

Найпростіший формат:

    pg_dump school > school.sql

Файл:

    school.sql

є звичайним текстовим SQL-файлом.

Його можна відкрити редактором.

Наприклад:

    VS Code
    Notepad++
    less
    cat

---

# 11. Restore Plain SQL Dump

Для plain SQL dump зазвичай використовується:

    psql

Наприклад:

    psql -d school_restored -f school.sql

Або:

    psql school_restored < school.sql

Тобто:

    pg_dump
       ↓
    school.sql
       ↓
    psql
       ↓
    school_restored

---

# 12. Важливий момент: Database має існувати

Якщо зробити:

    pg_dump school > school.sql

сам dump не обов'язково створить database `school`.

Для простого restore можна спочатку створити database:

    CREATE DATABASE school_restored;

Потім:

    psql -d school_restored -f school.sql

---

# 13. Перевірка Database

У `psql`:

    \l

Побачимо databases:

    postgres
    school
    school_restored

---

# 14. pg_dump і користувач

Наприклад:

    pg_dump -U postgres school > school.sql

або:

    pg_dump -U app_user school > school.sql

Але permissions можуть відрізнятися.

Не кожна role автоматично має можливість dump будь-якої database.

Для backup потрібно враховувати:

- доступ до database;
- доступ до об'єктів;
- owner;
- privileges;
- PostgreSQL configuration.

---

# 15. Використання postgres

Для навчального середовища найпростіше:

    pg_dump -U postgres school > school.sql

Після цього PostgreSQL попросить password role:

    Password:

Результат:

    school.sql

---

# 16. Custom Format

PostgreSQL підтримує не тільки plain SQL.

Custom format:

    pg_dump -Fc school > school.dump

Наприклад:

    school.dump

Такий файл не є звичайним SQL-текстом.

Для нього використовують:

    pg_restore

---

# 17. pg_restore

`pg_restore` використовується для відновлення dump, створених у форматах, які підтримує `pg_restore`.

Наприклад:

    pg_dump -Fc school > school.dump

Потім:

    pg_restore -d school_restored school.dump

Модель:

    school
      ↓
    pg_dump -Fc
      ↓
    school.dump
      ↓
    pg_restore
      ↓
    school_restored

---

# 18. Plain vs Custom

## Plain SQL

    pg_dump school > school.sql

Restore:

    psql school_restored < school.sql

## Custom

    pg_dump -Fc school > school.dump

Restore:

    pg_restore -d school_restored school.dump

Головна різниця:

    .sql
       → psql

    custom dump
       → pg_restore

---

# 19. Чому Custom Format корисний

Custom format дозволяє гнучкіше керувати restore.

Наприклад, можна:

- відновити окрему table;
- відновити окрему schema;
- переглянути список objects;
- вибирати objects для restore;
- використовувати parallel restore.

Для серйознішої практики:

    pg_dump -Fc

дуже корисний.

---

# 20. Directory Format

Існує також:

    Directory format

Наприклад:

    pg_dump -Fd school -f school_backup

Замість одного файла отримуємо directory:

    school_backup/
        ...
        ...

Цей формат особливо корисний для великих database та parallel dump/restore.

---

# 21. Tar Format

Ще один формат:

    pg_dump -Ft school > school.tar

Restore:

    pg_restore -d school_restored school.tar

Основні формати `pg_dump`:

    p = plain
    c = custom
    d = directory
    t = tar

---

# 22. Вибір формату

Для навчання:

    plain SQL
        ↓
    найпростіший для розуміння

Для практичної роботи:

    custom
        ↓
    гнучкий restore

Для великих backup:

    directory
        ↓
    зручний для parallel operations

---

# 23. Backup з явним output file

Замість:

    pg_dump school > school.sql

можна:

    pg_dump -f school.sql school

Тобто:

    pg_dump -f backup.sql school

Це зручно, коли команда стає складнішою.

---

# 24. Backup з username

Наприклад:

    pg_dump -U postgres -f school.sql school

Можна також вказати host:

    pg_dump -h localhost -U postgres -f school.sql school

і port:

    pg_dump -h localhost -p 5432 -U postgres -f school.sql school

---

# 25. Backup конкретної schema

Можна dump тільки однієї schema:

    pg_dump
    -U postgres
    -d school
    -n app
    -f app.sql

`-n`:

    --schema

Наприклад:

    app

---

# 26. Backup конкретної table

Можна dump окремої table:

    pg_dump
    -U postgres
    -d school
    -t app.users
    -f users.sql

`-t`:

    --table

Це корисно для навчання та окремих задач відновлення.

---

# 27. Backup декількох tables

Можна вказати кілька `-t`:

    pg_dump
    -U postgres
    -d school
    -t app.users
    -t app.courses
    -f selected_tables.sql

---

# 28. Schema vs Table

Наприклад:

    Database:
        school

    Schema:
        app

    Tables:
        users
        courses
        lessons

Якщо:

    -n app

отримуємо schema.

Якщо:

    -t app.users

отримуємо конкретну table.

---

# 29. Backup без даних

Можна зберегти тільки структуру:

    pg_dump
    --schema-only
    school > school_structure.sql

Це backup:

    tables
    constraints
    indexes
    views
    та інших об'єктів

але без звичайних table data.

---

# 30. Backup тільки даних

Можна зробити:

    pg_dump
    --data-only
    school > school_data.sql

Це дозволяє зберегти дані без повної структури.

---

# 31. Schema-only і Data-only

Дуже корисно запам'ятати:

    --schema-only
        ↓
    структура

    --data-only
        ↓
    дані

    звичайний pg_dump
        ↓
    структура + дані

---

# 32. INSERT statements

У plain SQL dump дані можуть бути представлені SQL-командами.

Наприклад:

    INSERT INTO users (...)
    VALUES (...);

Тому plain dump можна читати як SQL script.

---

# 33. COPY у dump

PostgreSQL dump може використовувати `COPY` для ефективного відновлення даних.

Наприклад, у dump можна побачити:

    COPY app.users (id, name) FROM stdin;

Це нормально.

Не потрібно очікувати, що весь dump буде набором `INSERT`.

---

# 34. Backup і compression

PostgreSQL dump може бути стиснений.

Наприклад, custom format вже організований для зручного зберігання та restore.

Для plain SQL можна використовувати зовнішній compression tool.

Наприклад у Unix-подібному середовищі:

    pg_dump school | gzip > school.sql.gz

Для Windows можна використовувати відповідні інструменти compression.

Але на початку навчання краще спочатку працювати з:

    school.sql
    school.dump

---

# 35. Перегляд custom dump

Для custom dump:

    pg_restore --list school.dump

або коротше:

    pg_restore -l school.dump

Це показує список об'єктів dump.

Наприклад:

    TABLE
    TABLE DATA
    SEQUENCE
    INDEX
    CONSTRAINT
    ...

---

# 36. Restore тільки окремих objects

З custom dump можна вибирати об'єкти.

Наприклад:

    pg_restore
    -d school_restored
    -t users
    school.dump

Або використовувати список:

    pg_restore -l school.dump

потім:

    pg_restore
    -d school_restored
    -L restore.list
    school.dump

---

# 37. --clean

Під час restore можна використовувати:

    pg_restore
    --clean
    -d school_restored
    school.dump

`--clean` намагається видалити database objects перед їх відновленням.

Це корисно, коли target database вже містить об'єкти.

Але використовувати потрібно обережно.

---

# 38. --create

Можна доручити `pg_restore` створити database.

Наприклад:

    pg_restore
    --create
    -d postgres
    school.dump

Ідея:

    підключитися до maintenance database
          ↓
    створити database
          ↓
    restore dump

Це особливо зручно разом із правильно підготовленим dump.

---

# 39. --clean + --create

Можна побачити:

    pg_restore
    --clean
    --create
    -d postgres
    school.dump

Але:

> Команди `--clean` і `--create` потрібно використовувати уважно, особливо не вказуючи випадково production database.

---

# 40. --no-owner

Dump може містити інформацію про ownership.

При restore в інше середовище може виникнути проблема:

    owner role does not exist

Для таких випадків часто використовують:

    pg_restore
    --no-owner
    -d school_restored
    school.dump

Це особливо корисно при перенесенні database між різними environments.

---

# 41. Owner і Restore

Наприклад, database була створена:

    developer

і деякі objects належать:

    developer

На іншому комп'ютері role `developer` може не існувати.

Тоді restore може вимагати:

    --no-owner

або попереднього створення відповідних roles.

---

# 42. Backup roles

Важливий момент:

`pg_dump` робить backup **окремої database**, а не всього PostgreSQL cluster.

Roles є cluster-level objects.

Тому:

    pg_dump school

не є повним backup:

    users
    roles
    passwords
    permissions
    усіх databases

Для cluster-wide глобальних об'єктів існує:

    pg_dumpall --globals-only

---

# 43. pg_dumpall

`pg_dumpall` може створювати SQL script для всіх databases cluster.

Наприклад:

    pg_dumpall > cluster.sql

Це значно більший dump.

Він може містити:

    CREATE ROLE
    ALTER ROLE
    CREATE DATABASE
    ...

та database contents.

---

# 44. pg_dumpall --globals-only

Для ролей та інших глобальних об'єктів:

    pg_dumpall
    --globals-only
    > globals.sql

Це дуже корисна команда.

Наприклад:

    pg_dumpall --globals-only > globals.sql

Потім можна відновити:

    psql -f globals.sql postgres

---

# 45. pg_dump vs pg_dumpall

## pg_dump

    одна database

Наприклад:

    school

## pg_dumpall

    весь cluster / усі databases та глобальні об'єкти

Тому:

    pg_dump

часто використовується для backup конкретного application database.

---

# 46. Database cluster

В PostgreSQL:

    PostgreSQL Server
          │
          └── PostgreSQL Cluster
                 │
                 ├── postgres
                 ├── school
                 ├── shop
                 └── library

Roles існують на рівні cluster.

Database існує всередині cluster.

Це важливо для розуміння:

    pg_dump
    vs
    pg_dumpall

---

# 47. Backup конкретного Full Stack проекту

Наприклад:

    Nest.js
       ↓
    PostgreSQL
       ↓
    school

Для проекту достатньо регулярно створювати:

    school.dump

або:

    school.sql

і зберігати:

    migrations
    source code
    environment configuration
    database backup

---

# 48. Не зберігайте password у dump як "секрет проекту"

Не потрібно комітити в Git:

    .env

з:

    DB_PASSWORD=...

Так само database backup може містити чутливі дані.

Тому:

    backup files

не слід автоматично додавати в public Git repository.

---

# 49. .gitignore

Наприклад:

    *.sql
    *.dump
    *.backup

можуть бути додані до `.gitignore`, якщо backup не повинен зберігатися в repository.

Наприклад:

    database-backups/
    *.dump
    *.backup
    *.sql

Але конкретна політика залежить від проекту.

---

# 50. Backup location

Не варто покладатися тільки на:

    C:\project\backup.dump

Якщо диск буде втрачений, зникне і backup.

Краща концепція:

    Database
       ↓
    Backup
       ↓
    інше storage

Наприклад:

    external disk
    NAS
    cloud storage
    backup server

---

# 51. Правило 3-2-1

Класичний принцип backup:

    3 copies
    2 different media
    1 copy off-site

Наприклад:

    Production DB
         │
         ├── Backup 1 → backup server
         ├── Backup 2 → external storage
         └── Backup 3 → off-site/cloud

Для навчального проекту не потрібно одразу будувати складну систему, але принцип варто знати.

---

# 52. Backup ≠ Restore

Дуже важливе правило:

> Backup, який ніколи не перевіряли restore-ом, не можна вважати надійним backup.

Тому:

    backup
       ↓
    restore test
       ↓
    verification

є частиною backup process.

---

# 53. Тестування Backup

Наприклад:

    school
       ↓
    pg_dump
       ↓
    school.dump
       ↓
    school_test_restore
       ↓
    SELECT COUNT(*)
    SELECT ...
    \dt
    \d ...

Так можна переконатися, що backup реально відновлюється.

---

# 54. Перевірка кількості rows

Наприклад:

    SELECT COUNT(*)
    FROM app.users;

До backup:

    100

Після restore:

    100

Це проста перевірка.

---

# 55. Перевірка структури

Після restore:

    \dt

Потім:

    \d app.users

Перевір:

- columns;
- types;
- constraints;
- indexes.

---

# 56. Перевірка даних

Наприклад:

    SELECT *
    FROM app.users
    ORDER BY id
    LIMIT 10;

Перевіряємо:

- чи існують rows;
- чи правильні values;
- чи працюють relationships.

---

# 57. Перевірка Constraints

Після restore перевір:

    \d app.users

Подивись:

    PRIMARY KEY
    UNIQUE
    FOREIGN KEY
    CHECK

Backup повинен відновлювати не тільки data, але й database structure.

---

# 58. Backup і Migrations

У Full Stack project є:

    migrations

і:

    backup

Це не одне й те саме.

Migration:

    зміна структури database

Backup:

    збереження поточного стану database

Наприклад:

    migration:
        add email column

    backup:
        зберігає database
        разом із даними

---

# 59. Migration ≠ Backup

Не можна думати:

    "У мене є migrations,
     тому backup не потрібен."

Migrations описують:

    як отримати structure

Backup зберігає:

    реальний стан database + data

---

# 60. Перед небезпечною міграцією

Перед великою зміною database можна зробити:

    pg_dump -Fc school > before_migration.dump

Потім:

    migration

Якщо щось пішло не так:

    restore

Це дуже практична модель.

---

# 61. Backup перед DELETE

Наприклад, ти хочеш виконати:

    DELETE FROM app.users;

Не варто експериментувати з важливими даними без backup.

Для навчальної database можна перед операцією:

    pg_dump -Fc school > before_delete.dump

---

# 62. Backup перед DROP TABLE

Перед:

    DROP TABLE app.users;

можна:

    pg_dump -Fc school > before_drop.dump

Після цього можна відновити database або окремі objects.

---

# 63. Backup перед великою міграцією

Наприклад:

    migration 001
       ↓
    migration 002
       ↓
    migration 003

Перед `migration 003`:

    pg_dump -Fc school > before_migration_003.dump

Це не замінює правильну migration strategy, але дає додаткову безпеку.

---

# 64. Parallel Restore

Для custom/directory dumps можна використовувати parallel restore.

Наприклад:

    pg_restore
    -j 4
    -d school_restored
    school.dump

`-j 4`:

    4 parallel jobs

Це особливо корисно для великих database.

Для маленької навчальної database це не потрібно.

---

# 65. Parallel Dump

Directory format підтримує parallel dump.

Наприклад:

    pg_dump
    -Fd
    -j 4
    -f school_backup
    school

Це advanced topic.

Для першого знайомства достатньо:

    pg_dump
    pg_restore

---

# 66. Backup конкретної schema — практичний приклад

Є:

    school
       │
       ├── public
       │
       └── app
             ├── users
             ├── courses
             └── lessons

Можна:

    pg_dump
    -U postgres
    -d school
    -n app
    -f app.sql

Тепер backup стосується:

    app

---

# 67. Restore schema

Створимо:

    school_test

Потім:

    CREATE DATABASE school_test;

Restore:

    psql
    -U postgres
    -d school_test
    -f app.sql

Перевір:

    \dn

і:

    \dt app.*

---

# 68. Backup окремої table

Наприклад:

    pg_dump
    -U postgres
    -d school
    -t app.users
    -f users.sql

Потім:

    CREATE DATABASE users_test;

і:

    psql
    -U postgres
    -d users_test
    -f users.sql

---

# 69. Backup без ownership

Для plain SQL можна використовувати:

    pg_dump
    --no-owner
    school > school.sql

Це може бути корисно при перенесенні dump між environments.

---

# 70. Backup без privileges

Можна виключити GRANT/REVOKE information:

    pg_dump
    --no-privileges
    school > school.sql

або:

    pg_dump
    --no-acl
    school > school.sql

Це корисно, коли restore відбувається в середовище з іншою permission model.

---

# 71. Clean restore для SQL dump

Для plain SQL можна створити dump:

    pg_dump
    --clean
    school > school.sql

У dump будуть команди для очищення відповідних objects перед відновленням.

Але `--clean` потрібно використовувати обережно.

---

# 72. INSERT/UPDATE/DELETE і Backup

Backup не є transaction rollback.

Наприклад:

    DELETE FROM users;

а потім:

    ROLLBACK;

це працює тільки якщо ти ще перебуваєш у відповідній transaction.

Backup потрібен для іншої ситуації:

    data already changed
          ↓
    transaction finished
          ↓
    потрібно відновлення
          ↓
    restore backup

---

# 73. Backup і Transactions

Transaction:

    BEGIN;
    ...
    ROLLBACK;

захищає поточну операцію.

Backup:

    pg_dump

захищає database від втрати в довшій перспективі.

Це різні механізми.

---

# 74. Backup consistency

`pg_dump` створює логічний backup database у спосіб, який дозволяє отримати узгоджений snapshot даних, не просто копіюючи таблиці одну за одною вручну.

Це одна з причин, чому потрібно використовувати PostgreSQL tools, а не намагатися самостійно копіювати database files.

---

# 75. Не копіюй data directory вручну

Не потрібно робити:

    copy C:\...\PostgreSQL\data ...

і вважати це стандартним database backup.

Фізичний backup PostgreSQL — окрема тема з окремими інструментами та правилами.

Для logical backup використовуй:

    pg_dump

---

# 76. Windows

Оскільки PostgreSQL встановлений у:

    C:\Program Files\PostgreSQL\18

інструменти знаходяться приблизно в:

    C:\Program Files\PostgreSQL\18\bin

Там можна знайти:

    pg_dump.exe
    pg_restore.exe
    pg_dumpall.exe
    psql.exe

---

# 77. Перевірка pg_dump

У PowerShell:

    pg_dump --version

або:

    pg_dump.exe --version

Очікується щось на кшталт:

    pg_dump (PostgreSQL) 18.x

Версія повинна відповідати або бути сумісною з твоїм PostgreSQL environment.

---

# 78. Перевірка pg_restore

    pg_restore --version

Або:

    pg_restore.exe --version

---

# 79. Перевірка pg_dumpall

    pg_dumpall --version

---

# 80. Якщо команда не знайдена

Якщо:

    pg_dump

не знаходиться, перевір PATH.

Або виконай повний шлях:

    "C:\Program Files\PostgreSQL\18\bin\pg_dump.exe" --version

Для Git Bash шлях може виглядати приблизно:

    "/c/Program Files/PostgreSQL/18/bin/pg_dump.exe" --version

---

# 81. Практика 1 — Перший Plain Backup

Візьми навчальну database:

    school

Виконай:

    pg_dump -U postgres school > school.sql

Перевір файл:

    dir school.sql

або в Git Bash:

    ls -lh school.sql

---

# 82. Практика 2 — Подивитися SQL dump

Відкрий:

    school.sql

у VS Code.

Не потрібно читати весь файл.

Знайди:

    CREATE TABLE

Потім:

    CREATE SEQUENCE

Потім:

    INSERT

або:

    COPY

Ти побачиш, що backup — це не "магія", а структуроване представлення database.

---

# 83. Практика 3 — Створити Test Database

Створи:

    CREATE DATABASE school_restore_test;

Перевір:

    \l

---

# 84. Практика 4 — Restore

Виконай:

    psql
    -U postgres
    -d school_restore_test
    -f school.sql

Потім:

    \dt

---

# 85. Практика 5 — Перевірити дані

Наприклад:

    SELECT COUNT(*)
    FROM app.users;

Порівняй з оригінальною database:

    school

і:

    school_restore_test

---

# 86. Практика 6 — Custom Backup

Створи:

    pg_dump
    -U postgres
    -Fc
    -f school.dump
    school

Перевір:

    dir school.dump

---

# 87. Практика 7 — Переглянути Custom Dump

Виконай:

    pg_restore -l school.dump

Проаналізуй список:

    TABLE
    TABLE DATA
    SEQUENCE
    INDEX
    CONSTRAINT

---

# 88. Практика 8 — Restore Custom Dump

Створи:

    CREATE DATABASE school_restore_custom;

Restore:

    pg_restore
    -U postgres
    -d school_restore_custom
    school.dump

Перевір:

    \dt

---

# 89. Практика 9 — Restore без Owner

Створи нову database:

    CREATE DATABASE school_restore_no_owner;

Виконай:

    pg_restore
    -U postgres
    --no-owner
    -d school_restore_no_owner
    school.dump

Перевір структуру та дані.

---

# 90. Практика 10 — Schema-only

Виконай:

    pg_dump
    -U postgres
    --schema-only
    school > school_structure.sql

Створи:

    CREATE DATABASE structure_test;

Restore:

    psql
    -U postgres
    -d structure_test
    -f school_structure.sql

Перевір:

    \dt

А потім:

    SELECT COUNT(*)
    FROM app.users;

Подивись, що структура є, а data немає.

---

# 91. Практика 11 — Data-only

Виконай:

    pg_dump
    -U postgres
    --data-only
    school > school_data.sql

Подивись файл.

Знайди:

    COPY

або:

    INSERT

---

# 92. Практика 12 — Backup однієї table

Виконай:

    pg_dump
    -U postgres
    -d school
    -t app.users
    -f users.sql

Потім переглянь:

    users.sql

Знайди:

    CREATE TABLE

і:

    COPY

---

# 93. Практика 13 — Backup schema

Виконай:

    pg_dump
    -U postgres
    -d school
    -n app
    -f app.sql

Порівняй:

    users.sql

і:

    app.sql

Яка різниця?

---

# 94. Практика 14 — Globals

Створи:

    pg_dumpall
    -U postgres
    --globals-only
    > globals.sql

Відкрий:

    globals.sql

Знайди:

    CREATE ROLE

і:

    ALTER ROLE

Це допоможе побачити різницю між:

    database objects

і:

    cluster-wide roles

---

# 95. Практика 15 — Перевірка Backup

Створи:

    school.dump

Restore у:

    school_restore_test

Перевір:

    \dn
    \dt
    \d app.users

Потім:

    SELECT COUNT(*)
    FROM app.users;

Потім перевір декілька реальних rows.

---

# 96. Практика 16 — Backup перед зміною

Виконай:

    pg_dump
    -U postgres
    -Fc
    -f before_experiment.dump
    school

Потім зроби якусь безпечну навчальну зміну.

Наприклад:

    CREATE TABLE app.backup_test (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        note TEXT
    );

Потім переконайся, що backup старіший за цю зміну.

Це допоможе зрозуміти роль backup як "точки повернення".

---

# 97. Практика 17 — Повний цикл

Побудуй сам:

    school
       ↓
    pg_dump
       ↓
    school.dump
       ↓
    create school_restore
       ↓
    pg_restore
       ↓
    \dt
       ↓
    SELECT
       ↓
    verification

Це одна з найкорисніших вправ цього розділу.

---

# 98. Практика 18 — Full Stack Backup

Для твого Nest.js проекту уяви:

    Nest.js
       ↓
    PostgreSQL
       ↓
    school

Створи:

    school.dump

Потім створи чисту database:

    school_test

і віднови:

    school.dump

Після цього Backend повинен мати можливість працювати з restored database.

---

# 99. Практика 19 — Backup перед Migration

Перед наступною migration:

    pg_dump
    -U postgres
    -Fc
    -f before_migration.dump
    school

Потім запускаєш migration.

Якщо щось пішло не так:

    school_restore_test

і відновлюєш backup для аналізу.

---

# 100. Практика 20 — Зробити власний Backup Script

Створи файл:

    backup-school.ps1

або:

    backup-school.sh

Ідея:

    database
       ↓
    timestamp
       ↓
    backup file

Наприклад:

    school-2026-09-10.dump

Пізніше можна автоматизувати:

    daily backup
    weekly backup
    cleanup old backups

---

# 101. Naming convention

Зручно називати backup:

    school-2026-09-10.dump

або:

    school-2026-09-10-18-30.dump

Для різних environments:

    school-dev-2026-09-10.dump
    school-test-2026-09-10.dump
    school-prod-2026-09-10.dump

---

# 102. Backup retention

Не обов'язково зберігати всі backup назавжди.

Наприклад:

    daily:
        7 days

    weekly:
        4 weeks

    monthly:
        12 months

Це вже частина backup policy.

---

# 103. Backup automation

На production backup часто автоматизують:

    scheduler
       ↓
    pg_dump
       ↓
    storage
       ↓
    retention policy
       ↓
    monitoring

На Windows можна використовувати:

    Task Scheduler

На Linux:

    cron
    systemd timers

---

# 104. Backup і Linux

Для твого майбутнього Linux workflow це дуже корисна тема.

Типовий pipeline:

    terminal
       ↓
    pg_dump
       ↓
    backup/
       ↓
    timestamped file
       ↓
    remote storage

Тут PostgreSQL добре поєднується з твоєю ідеєю:

    клавіатура
       +
    filesystem
       +
    terminal
       +
    automation

---

# 105. Backup і filesystem

Наприклад:

    database/
       ├── backups/
       │     ├── school-2026-09-10.dump
       │     └── school-2026-09-11.dump
       │
       ├── migrations/
       └── README.md

Але production backup краще зберігати окремо від application source tree.

Для навчання така структура зручна.

---

# 106. Backup і Python

Пізніше можна автоматизувати backup через Python:

    Python
       ↓
    subprocess
       ↓
    pg_dump
       ↓
    filesystem
       ↓
    timestamp
       ↓
    cleanup old files

Це хороший реальний приклад, де Python може доповнювати JavaScript/Node.js.

---

# 107. Backup і Node.js

Так само можна автоматизувати через Node.js:

    Nest.js
       ↓
    scheduled task
       ↓
    pg_dump
       ↓
    backup storage

Але для системного scripting Python або shell часто зручніші.

---

# 108. Backup security

Backup може містити:

    names
    emails
    passwords hashes
    personal data
    application data

Тому backup — це теж sensitive asset.

Потрібно:

- обмежувати доступ;
- захищати storage;
- не комітити backup у public Git;
- шифрувати backup там, де це потрібно;
- контролювати retention.

---

# 109. Passwords і Backup

Database backup не означає, що потрібно зберігати:

    DB_PASSWORD

у backup repository.

Credentials і backup — різні речі.

Наприклад:

    .env
        DB_PASSWORD=...

    backup
        database data + structure

Не потрібно змішувати ці поняття.

---

# 110. Restore у Production

Restore production database — небезпечна операція.

Перед нею потрібно:

- переконатися, що вибрана правильна database;
- перевірити backup;
- перевірити timestamp;
- перевірити команду;
- врахувати active connections;
- мати plan rollback;
- не запускати destructive options випадково.

Особливо обережно:

    --clean
    --create
    DROP DATABASE

---

# 111. DROP DATABASE

Команда:

    DROP DATABASE school;

повністю видаляє database.

Це не звичайна команда для експериментів із production.

У навчальній database це можна практикувати.

---

# 112. Restore після DROP DATABASE

Навчальний сценарій:

    school
       ↓
    pg_dump
       ↓
    school.dump
       ↓
    DROP DATABASE school
       ↓
    CREATE DATABASE school
       ↓
    pg_restore
       ↓
    school restored

Це хороший практичний exercise.

---

# 113. Але краще restore у нову database

Замість одразу руйнувати:

    school

можна:

    school_restore_test

Потім перевірити:

    school_restore_test

І тільки після успішної перевірки виконувати production operations.

---

# 114. Backup checklist

Перед backup:

    [ ] правильна database
    [ ] правильний PostgreSQL server
    [ ] правильна role
    [ ] достатньо місця
    [ ] правильний output path

Після backup:

    [ ] файл існує
    [ ] файл має очікуваний розмір
    [ ] dump читається
    [ ] restore протестований

---

# 115. Restore checklist

Перед restore:

    [ ] правильний backup
    [ ] правильна database
    [ ] правильний environment
    [ ] зрозуміло, що робить команда
    [ ] є backup поточного стану

Після restore:

    [ ] database доступна
    [ ] schemas існують
    [ ] tables існують
    [ ] rows існують
    [ ] constraints існують
    [ ] application підключається

---

# 116. Типова помилка №1

### "pg_dump створив backup, але я не знаю, як його restore"

Запам'ятай:

    plain SQL
        ↓
    psql

    custom / tar / directory
        ↓
    pg_restore

---

# 117. Типова помилка №2

### "pg_dump створює database"

Не обов'язково.

Звичайний:

    pg_dump school > school.sql

створює dump database contents/objects.

Для restore можна:

    CREATE DATABASE school_restore;

і:

    psql school_restore < school.sql

---

# 118. Типова помилка №3

### "pg_dump backup всього PostgreSQL"

Ні.

`pg_dump`:

    одна database

`pg_dumpall`:

    cluster-wide / усі databases та globals залежно від параметрів.

---

# 119. Типова помилка №4

### "Roles знаходяться в pg_dump"

Звичайний:

    pg_dump school

не є backup усіх cluster-level roles.

Для глобальних objects:

    pg_dumpall --globals-only

---

# 120. Типова помилка №5

### "Backup = просто копія data"

Не обов'язково.

Backup може містити:

    schema
    tables
    data
    sequences
    indexes
    constraints
    views
    functions
    ownership
    privileges

залежно від об'єктів та параметрів dump.

---

# 121. Типова помилка №6

### "Якщо backup-файл існує, значить backup хороший"

Ні.

Потрібно перевірити:

    restore

Тому:

    backup
       +
    restore test

---

# 122. Типова помилка №7

### "Migrations замінюють backup"

Ні.

Migration:

    змінює database

Backup:

    зберігає стан database

Вони доповнюють один одного.

---

# 123. Типова помилка №8

### "Можна просто скопіювати PostgreSQL data folder"

Для звичайного logical backup:

    pg_dump

Для physical backup:

    спеціальні PostgreSQL backup mechanisms

Не змішуй ці два підходи.

---

# 124. Типова помилка №9

### "Restore завжди безпечний"

Ні.

Restore може:

    overwrite objects
    drop objects
    change ownership
    change data

Особливо обережно:

    --clean
    --create

---

# 125. Типова помилка №10

### "Backup можна зберігати тільки поруч із project"

Не варто покладатися на одну копію.

Якщо:

    project disk
       ↓
    backup

і диск зламається — втрачено обидва.

---

# 126. Junior level

Junior повинен знати:

- що таке backup;
- що таке restore;
- `pg_dump`;
- `psql -f`;
- `pg_restore`;
- plain SQL dump;
- custom dump;
- database vs backup;
- schema-only;
- data-only;
- table/schema dump;
- базову перевірку restore.

---

# 127. Middle level

Middle повинен розуміти:

- `pg_dumpall`;
- globals;
- roles;
- ownership;
- `--no-owner`;
- `--no-privileges`;
- `--clean`;
- `--create`;
- custom format;
- directory format;
- parallel restore;
- backup automation;
- retention;
- backup storage;
- migration + backup strategy.

---

# 128. Advanced level

Advanced:

- physical backups;
- `pg_basebackup`;
- WAL;
- Point-in-Time Recovery;
- PITR;
- replication;
- continuous archiving;
- recovery targets;
- disaster recovery;
- RPO;
- RTO;
- backup encryption;
- off-site backup;
- monitoring;
- automated restore testing;
- high availability.

---

# 129. RPO

**RPO — Recovery Point Objective**

Питання:

> Скільки даних ми можемо дозволити собі втратити?

Наприклад:

    backup every 24 hours

У найгіршому випадку можна втратити майже добу змін.

Якщо:

    backup every 15 minutes

потенційна втрата значно менша.

---

# 130. RTO

**RTO — Recovery Time Objective**

Питання:

> Скільки часу ми можемо дозволити системі бути недоступною?

Наприклад:

    RTO = 1 hour

означає:

> систему потрібно відновити приблизно протягом години.

Це вже production/disaster-recovery topic.

---

# 131. Backup Strategy

Проста модель:

    Development
        ↓
    manual pg_dump

    Production
        ↓
    automated backup
        ↓
    remote storage
        ↓
    retention
        ↓
    restore testing

---

# 132. Мінімальний Full Stack backup workflow

Для навчального проекту:

    1. PostgreSQL database
            ↓
    2. pg_dump -Fc
            ↓
    3. school.dump
            ↓
    4. зберегти backup
            ↓
    5. створити test database
            ↓
    6. pg_restore
            ↓
    7. перевірити data
            ↓
    8. перевірити structure

Цього вже достатньо, щоб реально зрозуміти backup/restore.

---

# 133. Шпаргалка

## Plain SQL backup

    pg_dump school > school.sql

## Plain SQL restore

    psql school_restore < school.sql

## Custom backup

    pg_dump -Fc school > school.dump

## Custom restore

    pg_restore -d school_restore school.dump

## Directory backup

    pg_dump -Fd school -f school_backup

## Tar backup

    pg_dump -Ft school > school.tar

---

# 134. Schema-only

    pg_dump
    --schema-only
    school > structure.sql

---

# 135. Data-only

    pg_dump
    --data-only
    school > data.sql

---

# 136. Окрема schema

    pg_dump
    -d school
    -n app
    -f app.sql

---

# 137. Окрема table

    pg_dump
    -d school
    -t app.users
    -f users.sql

---

# 138. Без owner

    pg_restore
    --no-owner
    -d school_restore
    school.dump

---

# 139. Перегляд dump contents

    pg_restore -l school.dump

---

# 140. Parallel restore

    pg_restore
    -j 4
    -d school_restore
    school.dump

---

# 141. Globals

    pg_dumpall
    --globals-only
    > globals.sql

---

# 142. Full cluster SQL dump

    pg_dumpall > cluster.sql

---

# 143. Перевірка

    \l

    \dn

    \dt

    \d app.users

    SELECT COUNT(*)
    FROM app.users;

---

# 144. Найважливіше з цього розділу

Якщо звести весь розділ до основних правил:

1. **`pg_dump` — основний інструмент logical backup однієї database.**

2. **Plain SQL dump відновлюється через `psql`.**

3. **Custom/Tar/Directory dump відновлюється через `pg_restore`.**

4. **`pg_dumpall` працює на ширшому cluster-рівні.**

5. **`pg_dump` не є backup усіх PostgreSQL roles.**

6. **Для глобальних objects існує `pg_dumpall --globals-only`.**

7. **`--schema-only` зберігає структуру без звичайних даних.**

8. **`--data-only` зберігає дані без повної структури.**

9. **`-n` дозволяє вибрати schema.**

10. **`-t` дозволяє вибрати table.**

11. **`--no-owner` корисний при перенесенні database між environments.**

12. **Backup потрібно не тільки створювати, а й перевіряти restore-ом.**

13. **Migration ≠ Backup.**

14. **Transaction rollback ≠ Backup/Restore.**

15. **Backup поруч із database — не достатній захист.**

16. **Production backup повинен бути автоматизованим і зберігатися окремо.**

---

# 145. Контрольні питання

Перед переходом далі спробуй відповісти без підглядання:

1. Що таке backup?
2. Що таке restore?
3. Для чого потрібен `pg_dump`?
4. Що саме backup-ить `pg_dump`?
5. Чим `pg_dump` відрізняється від `pg_dumpall`?
6. Чим plain SQL dump відрізняється від custom dump?
7. Якою командою restore plain SQL dump?
8. Якою командою restore custom dump?
9. Для чого потрібен `pg_restore -l`?
10. Для чого потрібен `--schema-only`?
11. Для чого потрібен `--data-only`?
12. Для чого потрібен `-n`?
13. Для чого потрібен `-t`?
14. Що робить `--no-owner`?
15. Що робить `--clean`?
16. Що робить `--create`?
17. Чому `pg_dump` не є повним backup PostgreSQL cluster?
18. Як backup-нути roles?
19. Чому backup потрібно тестувати restore-ом?
20. Чим backup відрізняється від migration?
21. Чим backup відрізняється від transaction rollback?
22. Чому не варто просто копіювати PostgreSQL data directory?
23. Що таке RPO?
24. Що таке RTO?
25. Як би ти організував backup для Nest.js + PostgreSQL проекту?

---

# 146. Фінальна ментальна модель

Не думай:

    Database
       ↓
    один backup файл

Думай:

    PostgreSQL
        │
        ├── Database
        │      │
        │      ├── Schema
        │      ├── Tables
        │      ├── Data
        │      ├── Indexes
        │      ├── Constraints
        │      └── Functions
        │
        └── Roles / Globals

Для database:

    PostgreSQL Database
          ↓
       pg_dump
          ↓
    ┌─────────────────────┐
    │ Plain SQL            │ → psql
    │ Custom                │ → pg_restore
    │ Directory             │ → pg_restore
    │ Tar                   │ → pg_restore
    └─────────────────────┘

Для глобальних objects:

    PostgreSQL Cluster
          ↓
    pg_dumpall --globals-only
          ↓
    roles / globals

А правильний workflow:

    Database
       ↓
    Backup
       ↓
    Storage
       ↓
    Restore test
       ↓
    Verification

І для Full Stack:

    Next.js / React
          ↓
       Nest.js
          ↓
      PostgreSQL
          ↓
       pg_dump
          ↓
    school.dump
          ↓
      pg_restore
          ↓
    school_restore_test

Головна думка:

> **Backup — це не просто файл. Backup має сенс тільки тоді, коли ти знаєш, як його відновити, і перевірив, що відновлення реально працює.**
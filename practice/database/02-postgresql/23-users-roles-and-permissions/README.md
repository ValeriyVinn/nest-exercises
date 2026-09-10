# PostgreSQL: Users, Roles and Permissions

## 1. Мета розділу

У цьому розділі розберемо систему безпеки PostgreSQL:

- що таке **Role**;
- що таке **User**;
- як створювати ролі;
- як задавати пароль;
- як надавати та забирати права;
- `GRANT` і `REVOKE`;
- права на Database, Schema, Table, Sequence, Function;
- `LOGIN` / `NOLOGIN`;
- `SUPERUSER` / `NOSUPERUSER`;
- `CREATEDB`;
- `CREATEROLE`;
- `INHERIT`;
- членство ролей;
- групові ролі;
- принцип найменших привілеїв;
- як PostgreSQL визначає, чи дозволена операція;
- підключення Backend → PostgreSQL;
- практична модель для Nest.js / Node.js;
- типові помилки;
- практичні вправи.

---

# 2. Головна ідея

У PostgreSQL доступ контролюється не "паролем бази даних", а **ролями**.

Спрощена модель:

    PostgreSQL Server
          │
          ├── Database
          │      │
          │      ├── Schema
          │      │     ├── Table
          │      │     ├── View
          │      │     └── Function
          │      │
          │      └── ...
          │
          └── Roles
                 │
                 ├── LOGIN
                 ├── PASSWORD
                 ├── permissions
                 └── memberships

Наприклад:

    PostgreSQL
        │
        ├── database: school
        │
        ├── database: shop
        │
        └── roles:
              ├── postgres
              ├── app_user
              ├── readonly_user
              └── developer

Важливо:

> **Database не має власного пароля.**

Пароль належить PostgreSQL role, яка використовується для підключення.

Наприклад:

    username: app_user
    password: ********
    database: school

---

# 3. Role — основне поняття PostgreSQL

У PostgreSQL основним поняттям є **Role**.

Role може:

- мати право входу;
- мати пароль;
- створювати databases;
- створювати roles;
- володіти tables;
- отримувати permissions;
- бути членом інших roles.

Тому PostgreSQL використовує поняття:

    ROLE

а не окрему систему:

    USER
    GROUP

У сучасному PostgreSQL і користувач, і група фактично є різновидом role.

---

# 4. User і Role

Історично PostgreSQL мав поняття:

    USER
    GROUP

Сьогодні головне поняття:

    ROLE

Role з `LOGIN` поводиться як користувач.

Наприклад:

    CREATE ROLE app_user LOGIN PASSWORD 'secret';

Це role, яка може підключатися до PostgreSQL.

Або:

    CREATE USER app_user WITH PASSWORD 'secret';

`CREATE USER` фактично створює role з можливістю `LOGIN`.

Тобто:

    CREATE USER app_user ...

приблизно відповідає:

    CREATE ROLE app_user LOGIN ...

---

# 5. Створення Role

Базовий синтаксис:

    CREATE ROLE role_name;

Наприклад:

    CREATE ROLE developer;

За замовчуванням така role не обов'язково може входити в PostgreSQL.

Щоб дозволити login:

    CREATE ROLE developer LOGIN;

З паролем:

    CREATE ROLE developer LOGIN PASSWORD 'secret';

---

# 6. CREATE USER

Для користувача можна написати:

    CREATE USER app_user WITH PASSWORD 'secret';

Це зручний скорочений варіант для ролі з `LOGIN`.

Наприклад:

    CREATE USER app_user
    WITH PASSWORD 'secret';

---

# 7. Перевірка ролей у psql

У `psql`:

    \du

або:

    \du+

Побачимо приблизно:

    Role name      | Attributes
    ---------------+----------------
    postgres       | Superuser
    app_user       |
    developer      | Create DB
    readonly_user  |

---

# 8. SQL-запит для перегляду ролей

Системний каталог:

    pg_roles

Наприклад:

    SELECT rolname, rolcanlogin, rolsuper
    FROM pg_roles;

Можна побачити:

    rolname
    rolcanlogin
    rolsuper

---

# 9. LOGIN

`LOGIN` визначає, чи може role підключатися до PostgreSQL.

Наприклад:

    CREATE ROLE app_user LOGIN PASSWORD 'secret';

Ця role може виконувати login.

Без `LOGIN`:

    CREATE ROLE reporting_role;

така role може використовуватися як групова role, але сама не повинна використовуватися для звичайного login.

---

# 10. NOLOGIN

Можна явно заборонити login:

    CREATE ROLE reporting_role NOLOGIN;

Це дуже корисно для **групових ролей**.

Наприклад:

    CREATE ROLE readonly NOLOGIN;

Потім:

    GRANT readonly TO analyst;

Тепер `analyst` отримує права role `readonly`.

---

# 11. PASSWORD

Пароль можна встановити так:

    ALTER ROLE app_user PASSWORD 'new_secret';

Або:

    ALTER USER app_user PASSWORD 'new_secret';

Наприклад:

    ALTER ROLE app_user
    WITH PASSWORD 'strong_password';

---

# 12. Не зберігайте пароль у коді

Погано:

    const password = "my-secret-password";

Краще використовувати environment variables.

Наприклад:

    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=school
    DB_USER=app_user
    DB_PASSWORD=strong_password

У Node.js:

    process.env.DB_USER
    process.env.DB_PASSWORD

---

# 13. Database і Role — різні речі

Наприклад:

    Database:
        school

    Role:
        app_user

Role підключається до конкретної database:

    app_user → school

Але одна role може мати доступ до декількох databases.

Наприклад:

    app_user → school
    app_user → shop
    app_user → library

Тому:

> Role ≠ Database

---

# 14. Права доступу

PostgreSQL має різні рівні об'єктів:

    Server
      │
      ├── Database
      │     │
      │     └── Schema
      │           │
      │           ├── Table
      │           ├── Sequence
      │           ├── View
      │           └── Function
      │
      └── Roles

Для кожного об'єкта можуть існувати свої permissions.

---

# 15. GRANT

`GRANT` надає права.

Загальна форма:

    GRANT permission
    ON object
    TO role;

Наприклад:

    GRANT SELECT
    ON TABLE users
    TO app_user;

Тепер `app_user` може читати `users`.

---

# 16. REVOKE

`REVOKE` забирає права.

Наприклад:

    REVOKE SELECT
    ON TABLE users
    FROM app_user;

---

# 17. Основні права для Table

Найчастіше використовуються:

    SELECT
    INSERT
    UPDATE
    DELETE

Також існують інші права, наприклад:

    TRUNCATE
    REFERENCES
    TRIGGER

---

# 18. SELECT

Дозволяє читати дані.

    GRANT SELECT
    ON TABLE users
    TO readonly_user;

Тепер:

    SELECT *
    FROM users;

може бути дозволений для `readonly_user`.

---

# 19. INSERT

Дозволяє додавати записи.

    GRANT INSERT
    ON TABLE users
    TO app_user;

---

# 20. UPDATE

Дозволяє змінювати записи.

    GRANT UPDATE
    ON TABLE users
    TO app_user;

---

# 21. DELETE

Дозволяє видаляти записи.

    GRANT DELETE
    ON TABLE users
    TO app_user;

---

# 22. Декілька permissions

Можна надати декілька прав:

    GRANT SELECT, INSERT, UPDATE, DELETE
    ON TABLE users
    TO app_user;

Або:

    GRANT ALL PRIVILEGES
    ON TABLE users
    TO app_user;

Але `ALL PRIVILEGES` краще не використовувати без потреби.

Краще явно визначати необхідні права.

---

# 23. Принцип найменших привілеїв

Одна з найважливіших ідей безпеки:

> Role повинна мати тільки ті права, які їй реально потрібні.

Наприклад:

    readonly_user
        SELECT

    app_user
        SELECT
        INSERT
        UPDATE
        DELETE

Не потрібно давати:

    SUPERUSER

звичайному application user.

---

# 24. Read-only role

Створимо роль:

    CREATE ROLE readonly NOLOGIN;

Надамо SELECT:

    GRANT SELECT
    ON TABLE users
    TO readonly;

Тепер:

    readonly

може читати таблицю.

Але не може:

    INSERT
    UPDATE
    DELETE

---

# 25. Групова Role

Одна з дуже корисних моделей:

    readonly
         │
         ├── analyst
         ├── manager
         └── reporting_user

Створюємо:

    CREATE ROLE readonly NOLOGIN;

Даємо права:

    GRANT SELECT
    ON TABLE users
    TO readonly;

Потім додаємо користувача:

    GRANT readonly TO analyst;

Тепер `analyst` отримує права `readonly`.

---

# 26. Role membership

Role може бути членом іншої role.

Наприклад:

    CREATE ROLE readonly NOLOGIN;

    CREATE ROLE analyst LOGIN PASSWORD 'secret';

    GRANT readonly TO analyst;

Маємо:

    readonly
        ↑
        │
    analyst

---

# 27. Чому групові ролі корисні

Без групової ролі:

    GRANT SELECT ON users TO user1;
    GRANT SELECT ON users TO user2;
    GRANT SELECT ON users TO user3;
    GRANT SELECT ON orders TO user1;
    GRANT SELECT ON orders TO user2;
    ...

З груповою роллю:

    CREATE ROLE readonly NOLOGIN;

    GRANT SELECT ON users TO readonly;
    GRANT SELECT ON orders TO readonly;

    GRANT readonly TO user1;
    GRANT readonly TO user2;
    GRANT readonly TO user3;

Це значно легше підтримувати.

---

# 28. CONNECT до Database

Для підключення до database існує privilege:

    CONNECT

Наприклад:

    GRANT CONNECT
    ON DATABASE school
    TO app_user;

---

# 29. CREATE на Database

`CREATE` на database дозволяє створювати schema в database.

Наприклад:

    GRANT CREATE
    ON DATABASE school
    TO developer;

---

# 30. Database permissions

Основні privileges на database:

    CONNECT
    CREATE
    TEMPORARY

Наприклад:

    GRANT CONNECT
    ON DATABASE school
    TO app_user;

---

# 31. Schema permissions

Schema має власні права.

Найважливіші:

    USAGE
    CREATE

Наприклад:

    GRANT USAGE
    ON SCHEMA app
    TO app_user;

---

# 32. USAGE на Schema

Це важливий момент.

Якщо role має:

    SELECT ON TABLE app.users

але не має необхідного доступу до schema `app`, доступ все одно може бути неможливим.

Типовий варіант:

    GRANT USAGE
    ON SCHEMA app
    TO app_user;

    GRANT SELECT
    ON TABLE app.users
    TO app_user;

Тобто:

    Schema:
        USAGE

    Table:
        SELECT

---

# 33. CREATE на Schema

Дозволяє створювати об'єкти в schema.

Наприклад:

    GRANT CREATE
    ON SCHEMA app
    TO developer;

Тепер `developer` може створювати об'єкти в schema, якщо інші умови доступу виконані.

---

# 34. Права і власник об'єкта

Коли створюється table:

    CREATE TABLE users (
        id BIGSERIAL PRIMARY KEY,
        name TEXT
    );

власником зазвичай стає role, яка виконала `CREATE TABLE`.

Наприклад:

    developer

створив table.

Тоді:

    owner = developer

Власник має спеціальні можливості керування об'єктом.

---

# 35. OWNER

Перевірити власника table можна через `psql`:

    \d users

Або через системні каталоги.

Змінити власника:

    ALTER TABLE users
    OWNER TO app_owner;

---

# 36. Власник ≠ GRANT

Не потрібно плутати:

    OWNER

і

    GRANT

Наприклад:

    app_owner

може бути власником таблиці.

А:

    readonly

може мати:

    SELECT

Це різні механізми.

---

# 37. PUBLIC

`PUBLIC` у PostgreSQL означає:

> усі ролі.

Наприклад:

    GRANT SELECT
    ON TABLE users
    TO PUBLIC;

Це означає, що право `SELECT` отримають усі ролі, для яких воно застосовне.

Тому з `PUBLIC` потрібно бути обережним.

---

# 38. REVOKE FROM PUBLIC

Якщо потрібно прибрати privilege:

    REVOKE SELECT
    ON TABLE users
    FROM PUBLIC;

Після цього можна явно надати доступ:

    GRANT SELECT
    ON TABLE users
    TO readonly;

---

# 39. DEFAULT PRIVILEGES

Дуже важлива тема.

`GRANT`:

    GRANT SELECT
    ON TABLE users
    TO readonly;

впливає на **існуючу** таблицю.

Але якщо завтра створиться:

    orders

новий table не обов'язково автоматично отримає ті самі права.

Для майбутніх об'єктів використовують:

    ALTER DEFAULT PRIVILEGES

Наприклад:

    ALTER DEFAULT PRIVILEGES
    IN SCHEMA app
    GRANT SELECT ON TABLES TO readonly;

---

# 40. DEFAULT PRIVILEGES і власник

Дуже важливо розуміти:

`ALTER DEFAULT PRIVILEGES` стосується об'єктів, які в майбутньому створить певна role.

Наприклад:

    ALTER DEFAULT PRIVILEGES
    FOR ROLE developer
    IN SCHEMA app
    GRANT SELECT ON TABLES TO readonly;

Це означає:

> коли `developer` створить нову table в `app`, `readonly` отримає SELECT.

---

# 41. Sequence permissions

Це особливо важливо для PostgreSQL.

Наприклад:

    id BIGSERIAL

або:

    id BIGINT GENERATED BY DEFAULT AS IDENTITY

може використовувати sequence.

Для старої моделі з `SERIAL` може знадобитися доступ до sequence:

    GRANT USAGE, SELECT
    ON SEQUENCE users_id_seq
    TO app_user;

Для application role потрібно враховувати не тільки permissions на table, а й permissions на пов'язані objects.

---

# 42. GRANT на всі таблиці

Можна надати SELECT на всі існуючі таблиці schema:

    GRANT SELECT
    ON ALL TABLES IN SCHEMA app
    TO readonly;

Це зручно для read-only доступу.

Але пам'ятайте:

> `ALL TABLES` не означає автоматично майбутні таблиці.

Для майбутніх таблиць використовують `ALTER DEFAULT PRIVILEGES`.

---

# 43. Майбутні таблиці

Типова комбінація:

    GRANT SELECT
    ON ALL TABLES IN SCHEMA app
    TO readonly;

    ALTER DEFAULT PRIVILEGES
    IN SCHEMA app
    GRANT SELECT ON TABLES TO readonly;

Перше:

    існуючі таблиці

Друге:

    майбутні таблиці

---

# 44. GRANT на всі sequences

Наприклад:

    GRANT USAGE, SELECT
    ON ALL SEQUENCES IN SCHEMA app
    TO app_user;

І default privileges:

    ALTER DEFAULT PRIVILEGES
    IN SCHEMA app
    GRANT USAGE, SELECT ON SEQUENCES TO app_user;

---

# 45. Function permissions

Для function також існують privileges.

Наприклад:

    GRANT EXECUTE
    ON FUNCTION calculate_total(integer, integer)
    TO app_user;

Основне право:

    EXECUTE

---

# 46. View permissions

View також є database object.

Наприклад:

    CREATE VIEW public_users AS
    SELECT id, name
    FROM users;

Можна:

    GRANT SELECT
    ON public_users
    TO readonly;

Це дозволяє будувати контрольований database API.

---

# 47. Column-level privileges

PostgreSQL може давати права не тільки на table, але й на окремі columns.

Наприклад:

    GRANT SELECT (id, name)
    ON TABLE users
    TO readonly;

Тепер role отримує SELECT лише для визначених columns.

Це корисно для захисту чутливих даних.

---

# 48. Table-level і Column-level permissions

Наприклад, є:

    users

з columns:

    id
    name
    email
    password_hash

Необов'язково давати доступ до всіх:

    GRANT SELECT
    ON users
    TO readonly;

Можна:

    GRANT SELECT (id, name, email)
    ON users
    TO readonly;

---

# 49. ALTER ROLE

Властивості role можна змінювати.

Наприклад:

    ALTER ROLE developer
    CREATEDB;

Дозволити login:

    ALTER ROLE developer
    LOGIN;

Заборонити login:

    ALTER ROLE developer
    NOLOGIN;

---

# 50. Основні атрибути Role

Важливі атрибути:

    LOGIN
    SUPERUSER
    CREATEDB
    CREATEROLE
    INHERIT
    REPLICATION
    BYPASSRLS

Не всі з них потрібні звичайному application user.

---

# 51. SUPERUSER

`SUPERUSER` — найвищий рівень привілеїв.

Наприклад:

    CREATE ROLE admin SUPERUSER LOGIN PASSWORD 'secret';

Superuser може обходити багато звичайних permission checks.

Тому:

> Не використовуйте SUPERUSER для звичайного Backend application.

Особливо:

    Nest.js
    Express
    Node.js

не повинні працювати під `postgres` або іншим superuser у production.

---

# 52. postgres

Після встановлення PostgreSQL часто існує роль:

    postgres

Це адміністративна роль.

Під час навчання з нею зручно працювати.

Але важливо поступово привчатися до правильної моделі:

    postgres
        ↓
    administration

    app_user
        ↓
    application

---

# 53. CREATEDB

Role з:

    CREATEDB

може створювати databases.

Наприклад:

    ALTER ROLE developer CREATEDB;

Але application user зазвичай не повинен мати це право.

---

# 54. CREATEROLE

`CREATEROLE` дозволяє створювати та керувати roles у межах відповідних можливостей.

Наприклад:

    ALTER ROLE developer CREATEROLE;

Для звичайного application user це зазвичай не потрібно.

---

# 55. INHERIT

Role membership може працювати через успадкування privileges.

Типова модель:

    readonly
        │
        ↓
    analyst

Якщо `analyst` має membership у `readonly`, privileges можуть успадковуватися відповідно до налаштувань role membership та `INHERIT`.

Для практики важливо запам'ятати:

> Role membership — це спосіб організувати та повторно використовувати права.

---

# 56. SET ROLE

Адміністратор або role з відповідними membership може переключитися на іншу роль:

    SET ROLE readonly;

Перевірити:

    SELECT current_user;
    SELECT session_user;

Це важлива тема для розуміння складніших permission models.

---

# 57. current_user і session_user

Наприклад:

    SELECT current_user;

показує поточну effective role.

А:

    SELECT session_user;

показує роль, під якою була встановлена сесія.

Після:

    SET ROLE readonly;

вони можуть відрізнятися.

---

# 58. Перевірка поточного користувача

У `psql`:

    SELECT current_user;

Також:

    SELECT session_user;

І:

    SELECT current_database();

Це дуже корисні команди під час debugging permissions.

---

# 59. Інформація про privileges

PostgreSQL має інформаційні schema.

Наприклад:

    information_schema.table_privileges

Можна перевірити:

    SELECT grantee, table_schema, table_name, privilege_type
    FROM information_schema.table_privileges
    WHERE table_schema = 'app';

---

# 60. ACL

PostgreSQL внутрішньо зберігає інформацію про permissions через ACL-механізми.

У системних каталогах можна зустріти:

    relacl

Наприклад:

    SELECT relname, relacl
    FROM pg_class
    WHERE relname = 'users';

Це вже нижчий рівень розуміння PostgreSQL.

---

# 61. Типова структура для Backend

Для навчального Full Stack проекту можна створити:

    Database:
        school

    Schema:
        app

    Roles:
        app_user
        readonly
        developer

Наприклад:

    postgres
        ↓
    administration

    developer
        ↓
    development

    app_user
        ↓
    Nest.js application

    readonly
        ↓
    reporting

---

# 62. Application Role

Backend може працювати під:

    app_user

Наприклад:

    DB_USER=app_user

Application role повинна отримати тільки потрібні permissions.

Наприклад:

    SELECT
    INSERT
    UPDATE
    DELETE

але не:

    SUPERUSER
    CREATEDB
    CREATEROLE

---

# 63. Backend connection

Node.js / Nest.js підключається приблизно так:

    PostgreSQL
        ↑
        │
        │ username + password
        │ database
        │ host + port
        │
    Nest.js

Наприклад:

    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=school
    DB_USER=app_user
    DB_PASSWORD=secret

Backend не передає "пароль бази".

Він передає credentials role:

    app_user + password

і назву database:

    school

---

# 64. Підключення через psql

Наприклад:

    psql -U app_user -d school

Якщо потрібен пароль:

    Password for user app_user:

PostgreSQL перевіряє:

1. чи існує role;
2. чи дозволений LOGIN;
3. чи правильний пароль;
4. чи дозволено CONNECT до database;
5. потім permissions на конкретні objects.

---

# 65. CONNECT не означає SELECT

Це дуже важливий момент.

Можна мати:

    GRANT CONNECT
    ON DATABASE school
    TO app_user;

але не мати:

    SELECT
    ON TABLE users

Тоді:

    app_user

може підключитися до database, але не обов'язково може читати таблицю.

---

# 66. Schema USAGE не означає SELECT

Аналогічно:

    GRANT USAGE
    ON SCHEMA app
    TO app_user;

не означає:

    SELECT

на таблиці.

Потрібні окремі permissions.

Наприклад:

    GRANT USAGE
    ON SCHEMA app
    TO app_user;

    GRANT SELECT
    ON TABLE app.users
    TO app_user;

---

# 67. Приклад повної permission model

Створимо database:

    CREATE DATABASE school;

Створимо application role:

    CREATE ROLE app_user
    LOGIN
    PASSWORD 'strong_password';

Дозволимо CONNECT:

    GRANT CONNECT
    ON DATABASE school
    TO app_user;

У database `school`:

    CREATE SCHEMA app;

Дамо USAGE:

    GRANT USAGE
    ON SCHEMA app
    TO app_user;

Створимо table:

    CREATE TABLE app.users (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL
    );

Надамо права:

    GRANT SELECT, INSERT, UPDATE, DELETE
    ON TABLE app.users
    TO app_user;

---

# 68. Read-only модель

Створимо:

    CREATE ROLE readonly NOLOGIN;

Права:

    GRANT CONNECT
    ON DATABASE school
    TO readonly;

    GRANT USAGE
    ON SCHEMA app
    TO readonly;

    GRANT SELECT
    ON ALL TABLES IN SCHEMA app
    TO readonly;

Потім:

    GRANT readonly TO analyst;

---

# 69. Developer role

Можна мати:

    developer

який створює database objects.

Наприклад:

    CREATE ROLE developer
    LOGIN
    PASSWORD 'developer_password';

У development database можна надати більше прав.

Але навіть тут не обов'язково робити:

    SUPERUSER

---

# 70. Розділення ролей

Хороша модель:

    postgres
       │
       └── administration

    developer
       │
       └── development

    app_user
       │
       └── application

    readonly
       │
       └── reporting

Це значно краще, ніж використовувати одну роль:

    postgres

для всього.

---

# 71. Чому не використовувати postgres у Backend

Поганий варіант:

    DB_USER=postgres

Якщо application буде скомпрометований, атакуючий потенційно отримає надзвичайно широкі права.

Кращий варіант:

    DB_USER=app_user

з обмеженими permissions.

---

# 72. Видалення Role

Якщо role більше не потрібна:

    DROP ROLE app_user;

Або:

    DROP ROLE IF EXISTS app_user;

Але role не можна просто видалити, якщо вона володіє об'єктами або має залежності.

Спочатку може знадобитися:

    REASSIGN OWNED BY app_user TO postgres;

    DROP OWNED BY app_user;

Після цього:

    DROP ROLE app_user;

Це адміністративна операція, яку потрібно виконувати обережно.

---

# 73. ALTER DEFAULT PRIVILEGES — важливе уточнення

Наприклад:

    ALTER DEFAULT PRIVILEGES
    IN SCHEMA app
    GRANT SELECT ON TABLES TO readonly;

Це не означає:

    "усі таблиці schema app назавжди будуть доступні readonly"

Це означає:

    "майбутні tables, створені відповідною role,
     отримуватимуть зазначені default privileges"

Тому важливо розуміти, **хто створює об'єкти**.

---

# 74. REVOKE

Приклади:

    REVOKE INSERT
    ON TABLE app.users
    FROM app_user;

Або:

    REVOKE ALL PRIVILEGES
    ON TABLE app.users
    FROM readonly;

Або:

    REVOKE CONNECT
    ON DATABASE school
    FROM app_user;

---

# 75. GRANT і REVOKE — не абсолютна "стінка"

Під час debugging потрібно враховувати:

- прямі grants;
- membership у roles;
- privileges через `PUBLIC`;
- owner;
- superuser;
- schema permissions;
- object-specific permissions;
- default privileges;
- row-level security;
- `SECURITY DEFINER` functions.

Тому permission system PostgreSQL може бути складнішим, ніж один `GRANT`.

---

# 76. Row-Level Security

На advanced рівні існує:

    Row-Level Security
    RLS

Вона дозволяє визначати:

> не тільки "чи може користувач читати table", а й "які саме rows він може читати".

Наприклад:

    users

може містити:

    id
    name
    organization_id

RLS може дозволити користувачу бачити тільки rows своєї organization.

Це окрема велика тема.

---

# 77. Permissions і RLS

Загальна модель:

    Table privileges
           ↓
    Чи можна звертатися до table?
           ↓
    RLS
           ↓
    Які rows дозволені?

Тобто RLS не замінює звичайні privileges.

---

# 78. Практична модель для навчального проекту

Для твого Full Stack проекту можна поступово використовувати:

    PostgreSQL
        │
        └── school
              │
              └── app
                    │
                    ├── users
                    ├── lessons
                    └── results

Roles:

    postgres
    developer
    app_user
    readonly

---

# 79. Мінімальна модель

На першому етапі достатньо:

    postgres
        ↓
    administration

    app_user
        ↓
    Nest.js

Не потрібно одразу створювати десять ролей.

Головне — зрозуміти принцип:

    Role
      ↓
    Database
      ↓
    Schema
      ↓
    Object
      ↓
    Privilege

---

# 80. Практика 1 — створити Role

Підключись адміністративною роллю.

Створи:

    CREATE ROLE practice_user
    LOGIN
    PASSWORD 'practice_password';

Перевір:

    \du

Потім:

    SELECT current_user;

---

# 81. Практика 2 — створити Database

Створи:

    CREATE DATABASE permissions_lab;

Надай:

    GRANT CONNECT
    ON DATABASE permissions_lab
    TO practice_user;

Підключись:

    \c permissions_lab practice_user

---

# 82. Практика 3 — створити Schema

Під адміністративною / developer role:

    CREATE SCHEMA app;

Перевір:

    \dn

---

# 83. Практика 4 — створити Table

Створи:

    CREATE TABLE app.users (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE
    );

Додай дані:

    INSERT INTO app.users (name, email)
    VALUES
        ('Anna', 'anna@example.com'),
        ('John', 'john@example.com');

---

# 84. Практика 5 — перевірити відсутність доступу

Спробуй підключитися як:

    practice_user

І виконати:

    SELECT *
    FROM app.users;

Якщо permissions ще не надані, PostgreSQL повинен відмовити в операції.

Це дуже корисний експеримент.

---

# 85. Практика 6 — дати USAGE

Надай:

    GRANT USAGE
    ON SCHEMA app
    TO practice_user;

Спробуй знову:

    SELECT *
    FROM app.users;

Можеш побачити, що USAGE на schema сам по собі ще не дає SELECT.

---

# 86. Практика 7 — дати SELECT

Надай:

    GRANT SELECT
    ON TABLE app.users
    TO practice_user;

Тепер:

    SELECT *
    FROM app.users;

повинен працювати.

Ти щойно побачив реальний permission chain:

    database
        ↓
    CONNECT

    schema
        ↓
    USAGE

    table
        ↓
    SELECT

---

# 87. Практика 8 — перевірити INSERT

Спробуй:

    INSERT INTO app.users (name, email)
    VALUES ('Maria', 'maria@example.com');

Якщо є тільки:

    SELECT

операція повинна бути заборонена.

Тепер дай:

    GRANT INSERT
    ON TABLE app.users
    TO practice_user;

Повтори INSERT.

---

# 88. Практика 9 — UPDATE

Перевір:

    UPDATE app.users
    SET name = 'Maria Updated'
    WHERE id = 1;

Спочатку без `UPDATE`.

Потім:

    GRANT UPDATE
    ON TABLE app.users
    TO practice_user;

Повтори операцію.

---

# 89. Практика 10 — DELETE

Спробуй:

    DELETE FROM app.users
    WHERE id = 1;

Потім дай:

    GRANT DELETE
    ON TABLE app.users
    TO practice_user;

Повтори.

---

# 90. Практика 11 — Read-only role

Створи:

    CREATE ROLE readonly NOLOGIN;

Надай:

    GRANT CONNECT
    ON DATABASE permissions_lab
    TO readonly;

    GRANT USAGE
    ON SCHEMA app
    TO readonly;

    GRANT SELECT
    ON ALL TABLES IN SCHEMA app
    TO readonly;

Створи користувача:

    CREATE ROLE analyst
    LOGIN
    PASSWORD 'analyst_password';

Додай membership:

    GRANT readonly TO analyst;

---

# 91. Практика 12 — перевірити membership

Подивись:

    \du

Побачиш, що:

    analyst

має membership у:

    readonly

Підключись як:

    analyst

і перевір:

    SELECT *
    FROM app.users;

---

# 92. Практика 13 — перевірити заборону INSERT

Як `analyst`:

    INSERT INTO app.users (name)
    VALUES ('Test');

Операція повинна бути заборонена, якщо `analyst` не отримує INSERT з іншого джерела.

Це демонструє перевагу read-only role.

---

# 93. Практика 14 — Default Privileges

Створи окрему роль:

    CREATE ROLE reporter NOLOGIN;

Налаштуй default privileges:

    ALTER DEFAULT PRIVILEGES
    IN SCHEMA app
    GRANT SELECT ON TABLES TO reporter;

Після цього створи нову table відповідною owner-role:

    CREATE TABLE app.courses (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        title TEXT NOT NULL
    );

Перевір доступ для члена `reporter`.

---

# 94. Практика 15 — Permissions для Backend

Створи:

    app_user

Надай:

    CONNECT
    USAGE
    SELECT
    INSERT
    UPDATE
    DELETE

Не надавай:

    SUPERUSER
    CREATEDB
    CREATEROLE

Після цього саме `app_user` використовуй для підключення Nest.js.

Це буде перший крок до правильної production-моделі.

---

# 95. Практика 16 — Перевірка через information_schema

Виконай:

    SELECT
        grantee,
        table_schema,
        table_name,
        privilege_type
    FROM information_schema.table_privileges
    WHERE table_schema = 'app'
    ORDER BY table_name, grantee;

Проаналізуй:

- хто має доступ;
- до якої table;
- який саме privilege.

---

# 96. Практика 17 — current_user

Підключись різними ролями.

Виконай:

    SELECT current_user;

Потім:

    SELECT session_user;

Порівняй результати.

---

# 97. Практика 18 — Забрати permission

Надай:

    GRANT SELECT
    ON TABLE app.users
    TO practice_user;

Перевір SELECT.

Потім:

    REVOKE SELECT
    ON TABLE app.users
    FROM practice_user;

І знову:

    SELECT *
    FROM app.users;

Подивись, як змінився результат.

---

# 98. Практика 19 — PUBLIC

Перевір існуючі permissions.

Спробуй:

    REVOKE SELECT
    ON TABLE app.users
    FROM PUBLIC;

Потім явно:

    GRANT SELECT
    ON TABLE app.users
    TO readonly;

Це допоможе зрозуміти різницю між:

    PUBLIC

і:

    конкретною role

---

# 99. Практика 20 — Повна permission схема

Спробуй побудувати:

    permissions_lab
        │
        └── app
              │
              ├── users
              ├── courses
              └── lessons

Roles:

    developer
        ↓
    створює objects

    app_user
        ↓
    SELECT / INSERT / UPDATE / DELETE

    readonly
        ↓
    SELECT

    analyst
        ↓
    member of readonly

Це вже дуже близько до реальної backend-системи.

---

# 100. Типова помилка №1

### "Я створив user і пароль, але не можу підключитися до database"

Перевір:

    LOGIN

і:

    CONNECT

Наприклад:

    ALTER ROLE app_user LOGIN;

    GRANT CONNECT
    ON DATABASE school
    TO app_user;

---

# 101. Типова помилка №2

### "Я маю SELECT, але таблиця недоступна"

Перевір:

    GRANT USAGE
    ON SCHEMA app
    TO app_user;

Потім:

    GRANT SELECT
    ON TABLE app.users
    TO app_user;

---

# 102. Типова помилка №3

### "INSERT не працює, хоча SELECT працює"

Перевір:

    GRANT INSERT
    ON TABLE app.users
    TO app_user;

`SELECT` і `INSERT` — різні privileges.

---

# 103. Типова помилка №4

### "UPDATE працює, але INSERT не працює"

Це нормально.

Permissions можуть бути:

    SELECT
    UPDATE

без:

    INSERT

PostgreSQL перевіряє конкретну операцію.

---

# 104. Типова помилка №5

### "Я дав права на table, але нова table їх не має"

Перевір:

    ALTER DEFAULT PRIVILEGES

Наприклад:

    ALTER DEFAULT PRIVILEGES
    IN SCHEMA app
    GRANT SELECT ON TABLES TO readonly;

---

# 105. Типова помилка №6

### "Я використовую postgres для всього"

Для навчання це нормально.

Але поступово переходь до:

    postgres
        → administration

    app_user
        → application

    readonly
        → reporting

---

# 106. Типова помилка №7

### "GRANT ALL — це простіше"

Так, але:

    GRANT ALL PRIVILEGES

часто надає більше, ніж реально потрібно.

Краще:

    GRANT SELECT, INSERT, UPDATE, DELETE
    ON TABLE app.users
    TO app_user;

---

# 107. Типова помилка №8

### "Пароль належить database"

Ні.

Правильна модель:

    Role:
        app_user
        password: ******

    Database:
        school

Підключення:

    app_user + password → school

---

# 108. Типова помилка №9

### "LOGIN означає повний доступ"

Ні.

`LOGIN` означає тільки:

> role може встановити connection.

Після цього PostgreSQL ще перевіряє permissions.

---

# 109. Типова помилка №10

### "USAGE означає SELECT"

Ні.

Наприклад:

    USAGE ON SCHEMA app

дозволяє використовувати schema в межах наданих можливостей, але не дає автоматично права читати таблиці.

Для читання:

    SELECT ON TABLE ...

---

# 110. Типова помилка №11

### "Role без LOGIN непотрібна"

Ні.

Role без `LOGIN` дуже корисна як **group role**.

Наприклад:

    readonly NOLOGIN

а потім:

    GRANT readonly TO analyst;

---

# 111. Permissions hierarchy

Корисно мислити так:

    Role
      │
      ├── Database
      │     └── CONNECT
      │
      ├── Schema
      │     ├── USAGE
      │     └── CREATE
      │
      ├── Table
      │     ├── SELECT
      │     ├── INSERT
      │     ├── UPDATE
      │     └── DELETE
      │
      ├── Sequence
      │     └── USAGE / SELECT
      │
      └── Function
            └── EXECUTE

---

# 112. Безпека Backend

Для application:

    app_user

Не потрібно:

    SUPERUSER
    CREATEDB
    CREATEROLE

Потрібно:

    тільки необхідні privileges

Наприклад:

    CONNECT
    USAGE
    SELECT
    INSERT
    UPDATE
    DELETE

---

# 113. Development vs Production

### Development

Можна дозволити developer role більше прав:

    developer

### Production

Application:

    app_user

має мінімально необхідні permissions.

Administration:

    postgres / admin role

використовується окремо.

---

# 114. Role model

Корисно розділяти:

    Human users
        ↓
    developer
    analyst
    admin

і:

    Applications
        ↓
    app_user
    reporting_user

Це полегшує аудит і контроль доступу.

---

# 115. Role vs Permission

Не плутай:

    Role

і:

    Permission

Наприклад:

    app_user

— це role.

А:

    SELECT ON app.users

— це privilege.

Схема:

    Role
      ↓
    отримує
      ↓
    Privileges

---

# 116. Role membership

Можна створити:

    readonly

і:

    analyst

та зробити:

    GRANT readonly TO analyst;

Тоді:

    analyst

отримує права, організовані через:

    readonly

Це основа групової моделі permissions.

---

# 117. Database security як окрема частина Backend

Для Full Stack розробника важливо розуміти:

    Frontend
       ↓
    API
       ↓
    Backend
       ↓
    PostgreSQL
       ↓
    Role + Permissions

Frontend не повинен напряму отримувати credentials PostgreSQL.

---

# 118. Ніколи не передавай PostgreSQL password у Frontend

Неправильно:

    React
      ↓
    PostgreSQL password

Правильно:

    React
      ↓
    Nest.js API
      ↓
    PostgreSQL
          ↑
        app_user

Credentials database знаходяться на серверній стороні.

---

# 119. Permissions як database-level security

Application-level authorization:

    "Чи може цей користувач видалити цей документ?"

Database-level security:

    "Чи має database role право виконувати DELETE?"

У хорошій системі ці рівні можуть доповнювати один одного.

---

# 120. Практична схема Full Stack

Наприклад:

    React / Next.js
          │
          ↓
    Nest.js API
          │
          ↓
    app_user
          │
          ↓
    PostgreSQL
          │
          └── app
                ├── users
                ├── courses
                ├── lessons
                └── results

Це вже реальна архітектурна модель.

---

# 121. Що треба знати Junior

Junior повинен розуміти:

- що таке Role;
- що таке User;
- `LOGIN`;
- пароль role;
- `GRANT`;
- `REVOKE`;
- `SELECT`;
- `INSERT`;
- `UPDATE`;
- `DELETE`;
- `CONNECT`;
- `USAGE`;
- owner;
- `PUBLIC`;
- чому Backend не повинен використовувати superuser;
- database credentials через environment variables.

---

# 122. Що треба знати Middle

Middle повинен розуміти:

- group roles;
- role membership;
- `NOLOGIN`;
- `ALTER DEFAULT PRIVILEGES`;
- schema permissions;
- sequence permissions;
- function permissions;
- column privileges;
- `current_user`;
- `session_user`;
- permissions через membership;
- least privilege;
- production permission model;
- RLS на базовому рівні.

---

# 123. Що треба знати Advanced

Advanced:

- role inheritance;
- `SET ROLE`;
- `SECURITY DEFINER`;
- `SECURITY INVOKER`;
- Row-Level Security;
- policy design;
- privilege escalation;
- ownership;
- default privileges;
- permission auditing;
- separation of duties;
- database security architecture;
- migration permissions;
- production deployment permissions.

---

# 124. Шпаргалка

## Role

    CREATE ROLE app_user;

## Role з LOGIN

    CREATE ROLE app_user LOGIN;

## Role з password

    CREATE ROLE app_user
    LOGIN
    PASSWORD 'secret';

## User

    CREATE USER app_user
    WITH PASSWORD 'secret';

## Заборонити login

    ALTER ROLE app_user NOLOGIN;

## Дозволити login

    ALTER ROLE app_user LOGIN;

## Змінити пароль

    ALTER ROLE app_user
    PASSWORD 'new_secret';

## Подивитися roles

    \du

---

# 125. Database privileges

## CONNECT

    GRANT CONNECT
    ON DATABASE school
    TO app_user;

## CREATE

    GRANT CREATE
    ON DATABASE school
    TO developer;

---

# 126. Schema privileges

## USAGE

    GRANT USAGE
    ON SCHEMA app
    TO app_user;

## CREATE

    GRANT CREATE
    ON SCHEMA app
    TO developer;

---

# 127. Table privileges

## SELECT

    GRANT SELECT
    ON TABLE app.users
    TO readonly;

## INSERT

    GRANT INSERT
    ON TABLE app.users
    TO app_user;

## UPDATE

    GRANT UPDATE
    ON TABLE app.users
    TO app_user;

## DELETE

    GRANT DELETE
    ON TABLE app.users
    TO app_user;

## Усе необхідне

    GRANT SELECT, INSERT, UPDATE, DELETE
    ON TABLE app.users
    TO app_user;

---

# 128. Усі існуючі таблиці

    GRANT SELECT
    ON ALL TABLES IN SCHEMA app
    TO readonly;

---

# 129. Майбутні таблиці

    ALTER DEFAULT PRIVILEGES
    IN SCHEMA app
    GRANT SELECT ON TABLES TO readonly;

---

# 130. Sequence

    GRANT USAGE, SELECT
    ON ALL SEQUENCES IN SCHEMA app
    TO app_user;

---

# 131. Function

    GRANT EXECUTE
    ON FUNCTION calculate_total(integer, integer)
    TO app_user;

---

# 132. Забрати право

    REVOKE SELECT
    ON TABLE app.users
    FROM readonly;

---

# 133. Group role

    CREATE ROLE readonly NOLOGIN;

    GRANT SELECT
    ON ALL TABLES IN SCHEMA app
    TO readonly;

    GRANT readonly TO analyst;

---

# 134. Перевірити поточну role

    SELECT current_user;

    SELECT session_user;

---

# 135. Перевірити privileges

    SELECT
        grantee,
        table_schema,
        table_name,
        privilege_type
    FROM information_schema.table_privileges
    WHERE table_schema = 'app';

---

# 136. Основна модель

Запам'ятай:

    PostgreSQL
        ↓
    Role
        ↓
    Authentication
        ↓
    Database
        ↓
    Schema
        ↓
    Object
        ↓
    Privilege

А для Backend:

    Nest.js
       ↓
    DB_USER=app_user
    DB_PASSWORD=******
    DB_NAME=school
       ↓
    PostgreSQL
       ↓
    Role permissions

---

# 137. Найважливіше з цього розділу

Якщо звести весь розділ до декількох правил:

1. **Password належить Role, а не Database.**

2. **Role з LOGIN може підключатися до PostgreSQL.**

3. **CONNECT дозволяє підключитися до Database.**

4. **USAGE дозволяє використовувати Schema в межах інших наданих прав.**

5. **SELECT / INSERT / UPDATE / DELETE — permissions на Table.**

6. **GRANT надає права.**

7. **REVOKE забирає права.**

8. **Role без LOGIN може бути груповою role.**

9. **Не використовуй SUPERUSER для Backend.**

10. **Application повинен працювати з окремою role з мінімально необхідними правами.**

11. **`ALTER DEFAULT PRIVILEGES` потрібен для майбутніх об'єктів.**

12. **`PUBLIC` означає всіх ролей — використовуй обережно.**

13. **Database permissions, Schema permissions і Table permissions — різні рівні.**

---

# 138. Контрольні питання

Перед переходом далі спробуй відповісти без підглядання:

1. Що таке PostgreSQL Role?
2. Чим `USER` відрізняється від `ROLE`?
3. Де зберігається пароль?
4. Чи має Database власний пароль?
5. Що робить `LOGIN`?
6. Що робить `CONNECT`?
7. Що робить `USAGE ON SCHEMA`?
8. Чи дає `USAGE` право `SELECT`?
9. Що робить `GRANT`?
10. Що робить `REVOKE`?
11. Що таке group role?
12. Навіщо потрібен `NOLOGIN`?
13. Чому не варто використовувати `postgres` у Backend?
14. Що таке `SUPERUSER`?
15. Що робить `CREATEDB`?
16. Що робить `CREATEROLE`?
17. Що таке `PUBLIC`?
18. Для чого потрібен `ALTER DEFAULT PRIVILEGES`?
19. Чому permissions на sequence можуть бути важливими?
20. Як Backend підключається до PostgreSQL?
21. Чому пароль PostgreSQL не можна передавати у React?
22. Чим Role відрізняється від Permission?
23. Для чого потрібні `current_user` і `session_user`?
24. Що таке least privilege?
25. Для чого використовується Row-Level Security?

---

# 139. Фінальна ментальна модель

Не думай про PostgreSQL як:

    Database
       ↓
    Password

Думай:

    PostgreSQL Server
         │
         ├── Roles
         │     ├── postgres
         │     ├── developer
         │     ├── app_user
         │     └── readonly
         │
         └── Databases
               │
               └── school
                     │
                     └── Schemas
                           │
                           └── app
                                │
                                ├── users
                                ├── courses
                                └── lessons

А доступ:

    Role
      ↓
    CONNECT
      ↓
    Database
      ↓
    USAGE
      ↓
    Schema
      ↓
    SELECT / INSERT / UPDATE / DELETE
      ↓
    Table

І для Full Stack:

    React / Next.js
          ↓
       HTTP API
          ↓
       Nest.js
          ↓
       app_user
          ↓
     PostgreSQL
          ↓
       Database
          ↓
       Schema
          ↓
        Tables

Це і є базова модель **Authentication + Authorization на рівні PostgreSQL**.
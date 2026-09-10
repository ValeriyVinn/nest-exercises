# Schema та організація бази даних у PostgreSQL

## 1. Навіщо потрібна організація PostgreSQL

Коли база даних маленька, можна працювати приблизно так:

    database
        ↓
    public
        ↓
    tables

Але реальний застосунок може мати десятки або сотні таблиць, views, functions, sequences та інших об'єктів.

Тому PostgreSQL має систему namespace — **schemas**.

Загальна структура:

    PostgreSQL Server
        │
        ├── Database
        │     │
        │     ├── Schema
        │     │     ├── Table
        │     │     ├── View
        │     │     ├── Function
        │     │     └── Sequence
        │     │
        │     └── Schema
        │
        └── Database
              └── Schema

Головна ідея:

    Database → Schema → Database objects

---

# 2. Database vs Schema

Це одна з найважливіших тем PostgreSQL.

## Database

Database — окрема база даних.

Наприклад:

    school_db
    shop_db
    blog_db

Між двома databases можна переключатися:

    \c school_db

---

## Schema

Schema — namespace **всередині database**.

Наприклад:

    school_db
        ├── public
        ├── auth
        ├── education
        └── reports

---

# 3. Ментальна модель

Уявіть PostgreSQL як файлову систему:

    PostgreSQL server
        ↓
    database
        ↓
    schema
        ↓
    table

Приблизна аналогія:

    database ≈ великий проект / окреме середовище

    schema ≈ папка / namespace

    table ≈ файл з даними

Але це лише ментальна модель.

Schema — не звичайна папка файлової системи.

---

# 4. Що таке Schema

Schema — це namespace для об'єктів бази даних.

У schema можуть знаходитися:

- tables;
- views;
- sequences;
- functions;
- types;
- materialized views;
- інші database objects.

Наприклад:

    education.students

означає:

    schema = education
    table  = students

---

# 5. Повне ім'я об'єкта

Об'єкт можна звертатися через:

    schema.object

Наприклад:

    public.users

    education.students

    reports.monthly_sales

Це називається schema-qualified name.

---

# 6. Database-qualified name

У звичайному SQL-запиті PostgreSQL зазвичай працює з:

    schema.object

а не:

    database.schema.object

PostgreSQL connection вже знаходиться всередині конкретної database.

Наприклад:

    \c school_db

Після цього:

    SELECT *
    FROM education.students;

---

# 7. Що таке `public`

Після створення database PostgreSQL зазвичай має schema:

    public

Наприклад:

    school_db
        └── public
              ├── users
              ├── students
              └── teachers

Тому коли ви пишете:

    SELECT *
    FROM users;

PostgreSQL може шукати:

    public.users

---

# 8. Створення Schema

Створимо schema:

    CREATE SCHEMA education;

Тепер у database існує:

    public
    education

---

# 9. Створення таблиці у Schema

    CREATE TABLE education.students (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
    );

Тепер таблиця знаходиться не в `public`, а в:

    education.students

---

# 10. Робота з таблицею

    INSERT INTO education.students (name)
    VALUES ('Anna');

Запит:

    SELECT *
    FROM education.students;

Тут:

    education
        ↓
    schema

    students
        ↓
    table

---

# 11. Дві таблиці з однаковою назвою

Різні schemas можуть мати таблиці з однаковими назвами.

Наприклад:

    CREATE SCHEMA school;
    CREATE SCHEMA company;

    CREATE TABLE school.users (
        id SERIAL PRIMARY KEY,
        name TEXT
    );

    CREATE TABLE company.users (
        id SERIAL PRIMARY KEY,
        name TEXT
    );

Тепер існують:

    school.users

    company.users

Це різні таблиці.

---

# 12. Чому це корисно

Можна логічно розділити систему.

Наприклад:

    application
        ├── auth
        ├── users
        ├── education
        └── reports

У PostgreSQL:

    auth.users
    education.students
    education.courses
    reports.monthly_statistics

Це робить велику database зрозумілішою.

---

# 13. Schema як namespace

Основна ідея:

    schema
        ↓
    namespace

Тобто schema дозволяє уникати конфліктів назв.

Наприклад:

    billing.orders

і:

    shop.orders

можуть існувати одночасно.

---

# 14. Перегляд schemas у psql

У `psql`:

    \dn

Це покаже schemas поточної database.

---

# 15. Перегляд таблиць

У `psql`:

    \dt

Показує таблиці у видимих schemas.

Для конкретної schema:

    \dt education.*

---

# 16. Перегляд структури таблиці

    \d education.students

Або:

    \d+ education.students

---

# 17. Створення Schema з IF NOT EXISTS

Щоб не отримати помилку, якщо schema вже існує:

    CREATE SCHEMA IF NOT EXISTS education;

---

# 18. Видалення Schema

    DROP SCHEMA education;

Але якщо в schema є об'єкти, PostgreSQL може не дозволити видалення.

Можна видалити разом із залежними об'єктами:

    DROP SCHEMA education CASCADE;

`CASCADE` потрібно використовувати дуже обережно.

---

# 19. RESTRICT

За замовчуванням PostgreSQL поводиться приблизно як:

    DROP SCHEMA education RESTRICT;

Тобто schema не можна видалити, якщо в ній є залежні об'єкти.

Це безпечніше.

---

# 20. CASCADE

    DROP SCHEMA education CASCADE;

означає:

    Видали schema
    та об'єкти, які від неї залежать.

Наприклад:

    education
        ├── students
        ├── teachers
        └── courses

можуть бути видалені разом.

Тому:

    CASCADE

— потужний, але небезпечний інструмент.

---

# 21. Search Path

PostgreSQL має спеціальний параметр:

    search_path

Він визначає, у яких schemas PostgreSQL шукає об'єкти без явного schema.

Подивитися:

    SHOW search_path;

Типовий результат може містити:

    "$user", public

---

# 22. Як працює search_path

Якщо написати:

    SELECT *
    FROM users;

PostgreSQL не бачить просто "users" як абсолютну адресу.

Він шукає відповідно до:

    search_path

Наприклад:

    "$user", public

Спочатку одна schema, пов'язана з іменем користувача, потім:

    public

---

# 23. Встановлення search_path

Наприклад:

    SET search_path TO education, public;

Тепер:

    SELECT *
    FROM students;

може означати:

    SELECT *
    FROM education.students;

Якщо таблиця не знайдена в `education`, PostgreSQL може шукати в `public`.

---

# 24. Перевірка search_path

    SHOW search_path;

Після:

    SET search_path TO education, public;

можна перевірити:

    SHOW search_path;

---

# 25. Search path та schema-qualified names

Є два стилі:

    SELECT *
    FROM education.students;

або:

    SET search_path TO education, public;

    SELECT *
    FROM students;

Перший варіант більш явний.

Другий може бути зручним у певних контекстах.

---

# 26. Чому explicit schema часто кращий

Наприклад:

    SELECT *
    FROM education.students;

одразу зрозуміло, яку таблицю ми використовуємо.

А:

    SELECT *
    FROM students;

залежить від:

    search_path

Тому для складних систем explicit schema names часто підвищують зрозумілість.

---

# 27. Search path може створювати плутанину

Припустимо:

    public.users

і:

    auth.users

існують одночасно.

Якщо:

    SET search_path TO auth, public;

то:

    SELECT *
    FROM users;

означає:

    auth.users

Якщо змінити:

    SET search_path TO public, auth;

то той самий запит може означати:

    public.users

Тому потрібно розуміти, який `search_path` використовується.

---

# 28. Створення власної структури

Для навчального Full Stack проекту можна зробити:

    CREATE SCHEMA auth;
    CREATE SCHEMA app;
    CREATE SCHEMA reports;

І таблиці:

    CREATE TABLE auth.users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL UNIQUE
    );

    CREATE TABLE app.products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price NUMERIC(10, 2) NOT NULL
    );

    CREATE TABLE reports.product_statistics (
        id SERIAL PRIMARY KEY,
        product_id INTEGER NOT NULL,
        total_sales INTEGER NOT NULL
    );

---

# 29. Логічне розділення

Можна домовитися:

    auth
        ↓
    authentication / users

    app
        ↓
    основні бізнес-дані

    reports
        ↓
    reporting

Це не є єдино правильною архітектурою.

Це один із можливих підходів.

---

# 30. Schema та права доступу

Schemas можуть бути корисними для організації permissions.

Наприклад:

    auth
    app
    reports

Можна дозволити певній ролі працювати тільки з певною schema.

Наприклад:

    reporting_user

може мати доступ до:

    reports

але не до:

    auth

Ця тема тісно пов'язана з наступним розділом:

    23-users-roles-and-permissions

---

# 31. GRANT на Schema

Можна надати доступ до schema:

    GRANT USAGE
    ON SCHEMA reports
    TO reporting_user;

`USAGE` означає, що роль може використовувати об'єкти schema, якщо має необхідні права на самі об'єкти.

---

# 32. CREATE на Schema

Можна дозволити створювати об'єкти:

    GRANT CREATE
    ON SCHEMA reports
    TO reporting_user;

Це вже permission, який потрібно видавати обдумано.

---

# 33. USAGE vs CREATE

Для schema:

    USAGE
        ↓
    можна звертатися до об'єктів schema

    CREATE
        ↓
    можна створювати об'єкти в schema

Це різні permissions.

---

# 34. Public Schema

`public` — стандартна schema, з якою часто починають навчальні проекти.

Для маленької навчальної БД нормально мати:

    public
        ├── users
        ├── products
        └── orders

Не потрібно створювати 10 schemas тільки заради "правильної архітектури".

---

# 35. Коли достатньо public

Для:

- маленького проекту;
- навчання;
- невеликого CRUD;
- одного application domain;
- простої бази.

може бути достатньо:

    public

---

# 36. Коли schemas стають корисними

Schemas особливо корисні, коли:

- багато таблиць;
- кілька підсистем;
- різні права доступу;
- reporting;
- окремі logical modules;
- legacy systems;
- кілька компонентів в одній database.

---

# 37. Schema vs Database

Не потрібно створювати окрему database для кожного модуля.

Наприклад, не обов'язково:

    PostgreSQL
        ├── auth_db
        ├── shop_db
        └── reports_db

Можна:

    application_db
        ├── auth
        ├── shop
        └── reports

Вибір залежить від архітектури.

---

# 38. Коли краще окрема Database

Окремі databases можуть бути корисними, коли:

- системи сильно ізольовані;
- різні команди;
- різні lifecycle;
- різні backup/restore requirements;
- сильна security isolation;
- незалежні застосунки.

---

# 39. Database vs Schema — практичне правило

Якщо вам потрібно:

    логічне групування

→ schema.

Якщо потрібна:

    сильніша ізоляція окремої системи

→ можливо, database.

---

# 40. Cross-database queries

У PostgreSQL не можна просто написати:

    SELECT *
    FROM database1.public.users;

як звичайний SQL-запит.

PostgreSQL connection працює в одній database.

Для взаємодії між databases використовують спеціальні механізми, наприклад:

- Foreign Data Wrappers;
- `dblink`;
- application-level communication.

Це вже advanced тема.

---

# 41. Cross-schema JOIN

На відміну від різних databases, між schemas JOIN виконується звичайно.

Наприклад:

    SELECT
        u.email,
        o.id
    FROM auth.users u
    JOIN app.orders o
        ON o.user_id = u.id;

Це одна database, тому schemas не заважають JOIN.

---

# 42. Schema та FOREIGN KEY

Foreign key може посилатися на таблицю в іншій schema.

Наприклад:

    CREATE TABLE auth.users (
        id UUID PRIMARY KEY,
        email TEXT NOT NULL UNIQUE
    );

    CREATE TABLE app.orders (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL
            REFERENCES auth.users(id)
    );

Це нормальна PostgreSQL структура.

---

# 43. Schema та View

View також належить schema.

Наприклад:

    CREATE VIEW reports.user_summary AS
    SELECT
        id,
        email
    FROM auth.users;

Тепер:

    reports.user_summary

---

# 44. Schema та Functions

Functions також можуть бути організовані через schemas.

Наприклад:

    CREATE FUNCTION app.calculate_total(
        price NUMERIC,
        quantity INTEGER
    )
    RETURNS NUMERIC
    LANGUAGE SQL
    AS $$
        SELECT price * quantity;
    $$;

Виклик:

    SELECT app.calculate_total(100, 3);

---

# 45. Schema та Types

Власні типи також належать schema.

Наприклад:

    CREATE TYPE app.order_status AS ENUM (
        'pending',
        'paid',
        'cancelled'
    );

Тепер тип:

    app.order_status

---

# 46. Schema та Sequences

Sequences також є database objects.

Наприклад, при:

    SERIAL

PostgreSQL створює sequence.

Її можна побачити через:

    \ds

Тому schema може містити не тільки таблиці.

---

# 47. Повна картина

Наприклад:

    application_db
        │
        ├── auth
        │     ├── users
        │     └── roles
        │
        ├── app
        │     ├── products
        │     ├── orders
        │     ├── order_items
        │     └── order_status
        │
        └── reports
              ├── sales_view
              └── monthly_statistics

Тут:

    database = application_db

    schemas = auth, app, reports

    objects = tables, views, types, etc.

---

# 48. Організація великого Full Stack проекту

Наприклад:

    application_db
        │
        ├── auth
        │     ├── users
        │     ├── sessions
        │     └── roles
        │
        ├── education
        │     ├── students
        │     ├── teachers
        │     ├── courses
        │     └── lessons
        │
        ├── billing
        │     ├── invoices
        │     └── payments
        │
        └── reports
              ├── daily_sales
              └── monthly_sales

Це вже наближається до реальної системи.

---

# 49. Schema naming

Хороші назви:

    auth
    app
    education
    billing
    reports

Погані назви:

    stuff
    temp2
    new_schema
    test123

Назва schema повинна пояснювати її роль.

---

# 50. Не створюйте schemas без причини

Погано:

    schema1
    schema2
    schema3
    schema4
    schema5

тільки тому, що PostgreSQL це дозволяє.

Організація повинна спрощувати систему, а не ускладнювати її.

---

# 51. Один із простих підходів

Для Junior Full Stack проекту рекомендую почати з:

    database
        └── public
              ├── users
              ├── products
              ├── orders
              └── order_items

Коли з'явиться реальна потреба:

    database
        ├── auth
        ├── app
        └── reports

Тобто:

    спочатку простота
        ↓
    потім організація
        ↓
    потім масштабування

---

# 52. Schema migration

У реальному проекті структура database змінюється.

Наприклад:

    version 1
        ↓
    users

    version 2
        ↓
    users + orders

    version 3
        ↓
    users + orders + payments

Ці зміни зазвичай виконуються через migrations.

---

# 53. Schema не є migration

Важливо не плутати:

    schema

і:

    database schema / structure

та:

    migration

Schema в PostgreSQL:

    namespace

Migration:

    контрольована зміна структури database.

---

# 54. Database schema як загальна структура

У розмовах програмісти можуть сказати:

    database schema

і мати на увазі:

    структуру всієї database

А PostgreSQL має конкретний об'єкт:

    SCHEMA

Тому потрібно дивитися на контекст.

---

# 55. Search Path та application

У backend застосунку можна явно використовувати:

    public.users

або налаштувати search path.

Наприклад connection може працювати зі:

    search_path = app, public

Тоді:

    SELECT *
    FROM products;

може звертатися до:

    app.products

---

# 56. Чому backend має знати про schema

Якщо ви використовуєте:

    app.users

backend повинен або:

- використовувати повне ім'я;
- або правильно налаштувати `search_path`.

Це важливо для:

    Nest.js
    Node.js
    Prisma
    TypeORM
    Drizzle
    pg

та інших database tools.

---

# 57. Schema та ORM

ORM може працювати з PostgreSQL schemas.

Наприклад, модель application:

    User

може відповідати:

    auth.users

А:

    Order

може відповідати:

    app.orders

Конкретний синтаксис залежить від ORM.

---

# 58. Schema та Prisma

У Prisma PostgreSQL schema можна задавати на рівні datasource або моделей залежно від версії та конфігурації.

Важливо розуміти сам PostgreSQL:

    PostgreSQL schema
        ↓
    namespace

ORM лише надає спосіб працювати з ним.

---

# 59. Schema та TypeORM

У TypeORM можна вказувати schema для entity.

Концептуально:

    Entity
        ↓
    PostgreSQL schema
        ↓
    table

Наприклад:

    auth.users

---

# 60. Schema та Docker

У Docker може бути:

    PostgreSQL container
        ↓
    application database
        ↓
    schemas
        ├── auth
        ├── app
        └── reports

Docker не змінює принцип роботи PostgreSQL schemas.

---

# 61. Schema та backup

При backup database schemas також є частиною database structure.

Наприклад:

    pg_dump

може зберегти:

- schemas;
- tables;
- data;
- indexes;
- constraints;
- functions;
- views.

Це буде важливо в темі:

    24-backup-and-restore

---

# 62. Schema та permissions

У більш серйозній системі можна мати:

    app_user
        ↓
    працює з app

    reporting_user
        ↓
    працює з reports

    admin
        ↓
    повний доступ

Таким чином schemas можуть бути частиною security architecture.

---

# 63. Least Privilege

Принцип:

    користувач/роль повинні мати
    тільки ті права,
    які їм реально потрібні.

Наприклад, reporting service не обов'язково повинен мати:

    INSERT
    UPDATE
    DELETE

на production tables.

Він може мати доступ до:

    reports

або до спеціальних views.

---

# 64. Schema + Views для API

Можна організувати:

    app
        ↓
    internal tables

    api
        ↓
    views для backend

Наприклад:

    api.users
    api.products
    api.orders

Backend читає:

    SELECT *
    FROM api.products;

А внутрішня структура може залишатися складнішою.

---

# 65. Schema як API boundary

У складних системах schema може бути логічною межею:

    auth
        ↓
    authentication domain

    education
        ↓
    education domain

    reports
        ↓
    reporting domain

Це допомагає підтримувати структуру великої database.

---

# 66. Public schema та security

Не варто автоматично вважати:

    public

"небезпечним".

Але потрібно розуміти, які права на `public` та його об'єкти має кожна роль.

У production database permissions краще налаштовувати свідомо.

---

# 67. Практика 1 — створити schemas

Створіть:

    CREATE SCHEMA auth;
    CREATE SCHEMA app;
    CREATE SCHEMA reports;

Перевірте:

    \dn

---

# 68. Практика 2 — таблиці в schemas

Створіть:

    auth.users

    app.products

    app.orders

    reports.statistics

---

# 69. Практика 3 — однакові назви

Створіть:

    auth.users

    app.users

Додайте різні дані.

Виконайте:

    SELECT *
    FROM auth.users;

і:

    SELECT *
    FROM app.users;

Побачте, що це дві різні таблиці.

---

# 70. Практика 4 — search_path

Виконайте:

    SET search_path TO app, public;

Потім спробуйте:

    SELECT *
    FROM users;

Якщо в `app` існує `users`, PostgreSQL буде шукати його відповідно до search path.

---

# 71. Практика 5 — schema-qualified names

Навіть після налаштування search path використовуйте:

    SELECT *
    FROM app.users;

Порівняйте цей стиль із:

    SELECT *
    FROM users;

і поясніть собі різницю.

---

# 72. Практика 6 — JOIN між schemas

Створіть:

    auth.users

та:

    app.orders

Зв'яжіть їх через:

    user_id

Потім виконайте:

    SELECT
        u.email,
        o.id
    FROM auth.users u
    JOIN app.orders o
        ON o.user_id = u.id;

---

# 73. Практика 7 — View в іншій schema

Створіть:

    reports.user_orders

який показує:

    user email
    order id

на основі:

    auth.users
    app.orders

---

# 74. Практика 8 — permissions

Створіть роль:

    reporting_user

Надайте їй:

    USAGE

на:

    reports

Потім надайте SELECT на потрібний view.

Перевірте доступ.

Це буде хорошим переходом до:

    23-users-roles-and-permissions

---

# 75. Практика 9 — видалення

Створіть тестову schema:

    CREATE SCHEMA test_schema;

Створіть у ній таблицю.

Спробуйте:

    DROP SCHEMA test_schema;

Потім:

    DROP SCHEMA test_schema CASCADE;

Подивіться, чим відрізняється поведінка.

---

# 76. Практика 10 — спроектувати власну database

Створіть:

    fullstack_practice

Schemas:

    auth
    app
    reports

У `auth`:

    users

У `app`:

    products
    orders
    order_items

У `reports`:

    sales_summary

Побудуйте між ними зв'язки.

---

# 77. Практика 11 — psql навігація

Попрактикуйте:

    \l

    \c database_name

    \dn

    \dt

    \dt schema_name.*

    \d schema_name.table_name

    \dv

    \df

    \ds

Це допоможе краще відчути структуру PostgreSQL через CLI.

---

# 78. Типові помилки

## Помилка 1 — плутати Database та Schema

Неправильно думати:

    schema = database

Правильніше:

    database
        ↓
    schemas
        ↓
    objects

---

## Помилка 2 — думати, що public є database

`public` — schema.

---

## Помилка 3 — забути про search_path

Запит:

    SELECT *
    FROM users;

може звернутися не до тієї таблиці, яку ви очікували, якщо є кілька schemas і змінений `search_path`.

---

## Помилка 4 — надмірна кількість schemas

Не потрібно створювати schema для кожної таблиці.

---

## Помилка 5 — використовувати CASCADE бездумно

    DROP SCHEMA something CASCADE;

може видалити багато об'єктів.

---

## Помилка 6 — використовувати тільки short names

У складній database:

    users

може бути менш зрозумілим, ніж:

    auth.users

---

# 79. Хороший стиль

Для невеликого проекту:

    public.users
    public.products
    public.orders

Для більшого:

    auth.users
    app.products
    app.orders
    reports.sales

Головне:

    структура повинна допомагати,
    а не ускладнювати.

---

# 80. Junior — що потрібно знати

Обов'язково:

    database
    schema
    public
    CREATE SCHEMA
    DROP SCHEMA
    schema.object
    search_path
    SET search_path
    SHOW search_path
    \dn
    \dt
    \d

Також:

- розуміти різницю Database vs Schema;
- знати, що в schema можуть бути tables, views, functions, types;
- розуміти schema-qualified names.

---

# 81. Middle — що потрібно знати

Додатково:

- schema organization;
- permissions на schemas;
- `USAGE`;
- `CREATE`;
- schemas + roles;
- schemas + views;
- schemas + functions;
- schemas + migrations;
- schemas + ORM;
- schemas + backup;
- cross-schema JOIN;
- search_path behavior.

---

# 82. Advanced

На advanced-рівні:

- multi-schema architecture;
- security boundaries;
- schema-based multi-tenancy;
- `search_path` security considerations;
- PostgreSQL extensions та schemas;
- Foreign Data Wrappers;
- cross-database architecture;
- migration strategy;
- schema versioning;
- large database organization;
- permissions architecture.

---

# 83. Schema-based multi-tenancy

У деяких системах кожен tenant може мати окрему schema:

    tenant_001
    tenant_002
    tenant_003

Наприклад:

    tenant_001.users
    tenant_001.orders

    tenant_002.users
    tenant_002.orders

Це називається schema-based multi-tenancy.

Але це вже advanced architecture.

Для навчального Full Stack проекту таку схему створювати не потрібно.

---

# 84. Контрольні питання

1. Що таке PostgreSQL Database?
2. Що таке PostgreSQL Schema?
3. Який зв'язок між Database та Schema?
4. Що таке `public`?
5. Що означає `schema.table`?
6. Чому дві schemas можуть мати таблицю з однаковою назвою?
7. Що таке `search_path`?
8. Як подивитися `search_path`?
9. Як змінити `search_path`?
10. Що робить `\dn`?
11. Як подивитися таблиці конкретної schema?
12. Чим `DROP SCHEMA` відрізняється від `DROP SCHEMA ... CASCADE`?
13. Чи можна робити JOIN між різними schemas?
14. Чи можна звичайним SQL зробити JOIN між різними databases?
15. Які об'єкти можуть знаходитися в schema?
16. Як schema пов'язана з permissions?
17. Коли достатньо `public`?
18. Коли варто створювати власні schemas?
19. Чому не варто створювати schemas без причини?
20. Чим schema відрізняється від migration?
21. Як schemas можуть використовуватися в security architecture?
22. Як schemas можуть використовуватися у Full Stack застосунку?

---

# 85. Головна шпаргалка

    -- створити schema
    CREATE SCHEMA education;

    -- без помилки, якщо вже існує
    CREATE SCHEMA IF NOT EXISTS education;

    -- створити table у schema
    CREATE TABLE education.students (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
    );

    -- звернення до table
    SELECT *
    FROM education.students;

    -- створити view у schema
    CREATE VIEW reports.students AS
    SELECT *
    FROM education.students;

    -- показати schemas у psql
    \dn

    -- показати tables
    \dt

    -- tables конкретної schema
    \dt education.*

    -- структура table
    \d education.students

    -- поточний search_path
    SHOW search_path;

    -- змінити search_path
    SET search_path TO education, public;

    -- видалити schema
    DROP SCHEMA education;

    -- видалити schema разом з об'єктами
    DROP SCHEMA education CASCADE;

    -- permission на schema
    GRANT USAGE
    ON SCHEMA reports
    TO reporting_user;

    -- permission створення
    GRANT CREATE
    ON SCHEMA reports
    TO reporting_user;

---

# 86. Головна ментальна модель

Запам'ятайте:

    PostgreSQL Server
        ↓
    Database
        ↓
    Schema
        ↓
    Objects

Наприклад:

    PostgreSQL
        ↓
    application_db
        ↓
    auth
        ↓
    users

Повне ім'я:

    auth.users

Інший приклад:

    PostgreSQL
        ↓
    application_db
        ↓
    app
        ↓
    orders

Повне ім'я:

    app.orders

---

# 87. Database vs Schema — одним поглядом

    Database
        ↓
    окрема база даних

    Schema
        ↓
    namespace всередині database

    Table
        ↓
    структура та дані

    View
        ↓
    збережений запит

    Function
        ↓
    database logic

    Sequence
        ↓
    генерація послідовних значень

    Type
        ↓
    власний тип даних

---

# 88. Практична модель для вашого навчання

Для поточних Full Stack вправ вам цілком достатньо почати з:

    database
        └── public
              ├── users
              ├── products
              ├── orders
              └── order_items

А коли з'явиться реальна потреба розділити систему:

    database
        ├── auth
        │     └── users
        │
        ├── app
        │     ├── products
        │     ├── orders
        │     └── order_items
        │
        └── reports
              └── sales

Це важливо саме для практики:

    Не створювати складну архітектуру
    наперед.

    Спочатку навчитися працювати
    з однією database і public.

    Потім зрозуміти schemas.

    Потім застосувати schemas,
    коли вони реально спрощують проект.

---

# 89. Підсумок

Після `22-schema-and-database-organization` потрібно вміти:

- розрізняти PostgreSQL Server, Database та Schema;
- розуміти роль `public`;
- створювати schemas;
- створювати tables у конкретній schema;
- використовувати `schema.table`;
- працювати з кількома schemas;
- створювати однакові назви таблиць у різних schemas;
- розуміти `search_path`;
- використовувати `SET search_path`;
- використовувати `SHOW search_path`;
- переглядати schemas через `\dn`;
- переглядати таблиці через `\dt`;
- працювати з schema-qualified names;
- робити JOIN між schemas;
- створювати views у schemas;
- створювати functions у schemas;
- розуміти schemas та sequences;
- розуміти schemas та custom types;
- розуміти schemas та permissions;
- розуміти `USAGE`;
- розуміти `CREATE`;
- розуміти `DROP SCHEMA`;
- розуміти `CASCADE`;
- знати, коли достатньо `public`;
- знати, коли потрібні окремі schemas;
- розуміти різницю між Schema та Database;
- розуміти різницю між Schema та Migration;
- бачити зв'язок між schema organization і backend architecture.

Головна ідея:

    Database
        ↓
    logical organization
        ↓
    Schemas
        ↓
    Tables / Views / Functions / Types
        ↓
    permissions
        ↓
    backend

І ще одне практичне правило:

    Не організовуйте database
    складніше, ніж цього потребує застосунок.

    Простий проект:
        public

    Складніший проект:
        auth
        app
        reports

    Велика система:
        продумана schema architecture
        +
        permissions
        +
        migrations
        +
        security
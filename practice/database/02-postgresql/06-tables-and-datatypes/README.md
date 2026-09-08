# 06. Tables and Data Types

Tables (таблиці) — основний спосіб зберігання структурованих даних у PostgreSQL.

Таблиця складається з:

    columns
        ↓
    rows
        ↓
    values

Наприклад:

    users
    ┌────┬─────────┬─────┬────────────┐
    │ id │ name    │ age │ email      │
    ├────┼─────────┼─────┼────────────┤
    │ 1  │ John    │ 25  │ john@...   │
    │ 2  │ Alice   │ 30  │ alice@...  │
    └────┴─────────┴─────┴────────────┘

У PostgreSQL таблиця створюється за допомогою:

    CREATE TABLE

Тип кожної колонки визначається під час створення таблиці.

---

### Ключові поняття

✔ table  
✔ row  
✔ record  
✔ column  
✔ field  
✔ value  
✔ data type  
✔ schema  
✔ `CREATE TABLE`  
✔ `ALTER TABLE`  
✔ `DROP TABLE`  
✔ `TRUNCATE`  
✔ `INTEGER`  
✔ `BIGINT`  
✔ `NUMERIC`  
✔ `REAL`  
✔ `DOUBLE PRECISION`  
✔ `BOOLEAN`  
✔ `TEXT`  
✔ `VARCHAR`  
✔ `CHAR`  
✔ `DATE`  
✔ `TIME`  
✔ `TIMESTAMP`  
✔ `TIMESTAMPTZ`  
✔ `INTERVAL`  
✔ `UUID`  
✔ `JSON`  
✔ `JSONB`  
✔ `ARRAY`  
✔ `NULL`  
✔ default value  
✔ column constraint  
✔ identity column  
✔ generated column  

---

# Що потрібно пам'ятати

• Table зберігає дані у rows та columns.

• Column описує певну властивість даних.

• Row представляє один запис.

• Кожна column має data type.

• Data type визначає, які значення можна зберігати.

• PostgreSQL має багато вбудованих типів даних.

• Найчастіше використовуються:

    INTEGER
    BIGINT
    NUMERIC
    TEXT
    VARCHAR
    BOOLEAN
    DATE
    TIMESTAMP
    TIMESTAMPTZ
    UUID
    JSONB

• `NULL` означає відсутнє або невідоме значення.

• `NULL` — це не те саме, що:

    0
    ""
    false

• `CREATE TABLE` створює таблицю.

• `ALTER TABLE` змінює структуру таблиці.

• `DROP TABLE` видаляє таблицю разом із її структурою та даними.

• `TRUNCATE` видаляє всі rows, але залишає таблицю.

---

# Table

Table — структура PostgreSQL, яка організовує дані у rows та columns.

Наприклад:

    users

    id | name  | age
    ---+-------+----
     1 | John  | 25
     2 | Alice | 30
     3 | Bob   | 28

Тут:

    table → users

    columns:
        id
        name
        age

    rows:
        1, John, 25
        2, Alice, 30
        3, Bob, 28

---

# Column

Column — окрема властивість, яку зберігає таблиця.

Наприклад:

    id
    name
    email
    age
    created_at

Кожна column має data type.

Наприклад:

    id          INTEGER
    name        TEXT
    age         INTEGER
    created_at  TIMESTAMPTZ

---

# Row

Row — один запис у таблиці.

Наприклад:

    id | name  | age
    ---+-------+----
     1 | John  | 25

Це одна row.

Інший запис:

    2 | Alice | 30

також одна row.

---

# Record

Record — інша назва для одного логічного запису.

У таблиці:

    users

можемо мати:

    John
    Alice
    Bob

Кожен користувач представлений окремим record / row.

---

# Field

Field — значення конкретної column у конкретному row.

Наприклад:

    id | name | age
    ---+------+----
     1 | John | 25

Тут:

    John

— значення field `name` для першого row.

---

# CREATE TABLE

Для створення таблиці використовується:

    CREATE TABLE

Синтаксис:

    CREATE TABLE table_name (
        column_name data_type,
        column_name data_type,
        ...
    );

Приклад:

    CREATE TABLE users (
        id INTEGER,
        name TEXT,
        age INTEGER
    );

---

# Перевірка таблиці

У `psql` можна подивитися список таблиць:

    \dt

Наприклад:

    \dt

Результат може виглядати приблизно так:

    Schema | Name  | Type  | Owner
    -------+-------+-------+-------
    public | users | table | postgres

---

# Опис таблиці

У `psql`:

    \d users

Покаже структуру таблиці.

Наприклад:

    Column | Type    | Modifiers
    -------+---------+----------
    id     | integer |
    name   | text    |
    age    | integer |

Для більш детальної інформації:

    \d+ users

---

# Simple Table

Приклад простої таблиці:

    CREATE TABLE users (
        id INTEGER,
        name TEXT,
        age INTEGER
    );

Додамо дані:

    INSERT INTO users (id, name, age)
    VALUES
        (1, 'John', 25),
        (2, 'Alice', 30),
        (3, 'Bob', 28);

Перевіримо:

    SELECT *
    FROM users;

---

# Naming Conventions

Для PostgreSQL зазвичай використовують:

    lowercase
    snake_case

Наприклад:

    users
    user_profiles
    created_at
    first_name
    email_address

Краще:

    first_name

ніж:

    FirstName

або:

    firstName

---

# Data Types

Data type визначає тип значення, яке може зберігатися у column.

Наприклад:

    age INTEGER

означає:

    age → integer number

А:

    name TEXT

означає:

    name → text

---

# Numeric Types

PostgreSQL має декілька типів для чисел.

Основні:

    SMALLINT
    INTEGER
    BIGINT
    DECIMAL
    NUMERIC
    REAL
    DOUBLE PRECISION

---

# SMALLINT

`SMALLINT` — ціле число з меншим діапазоном.

    SMALLINT

Займає:

    2 bytes

Діапазон приблизно:

    -32768
    до
    32767

Приклад:

    CREATE TABLE products (
        quantity SMALLINT
    );

Для звичайних application-даних використовується рідше, ніж `INTEGER`.

---

# INTEGER

`INTEGER` або `INT` — стандартний тип для цілих чисел.

    INTEGER

або:

    INT

Займає:

    4 bytes

Діапазон:

    -2147483648
    до
    2147483647

Приклад:

    CREATE TABLE products (
        quantity INTEGER
    );

Типово використовується для:

    id
    age
    quantity
    count
    year

---

# BIGINT

`BIGINT` — велике ціле число.

    BIGINT

Займає:

    8 bytes

Використовується, коли діапазону `INTEGER` недостатньо.

Наприклад:

    CREATE TABLE events (
        id BIGINT
    );

---

# INTEGER vs BIGINT

    INTEGER
        ↓
    4 bytes
        ↓
    приблизно ±2.1 billion

    BIGINT
        ↓
    8 bytes
        ↓
    значно більший діапазон

У звичайних таблицях:

    INTEGER

часто достатньо.

Для дуже великих ID або лічильників:

    BIGINT

може бути кращим.

---

# NUMERIC

`NUMERIC` — точний числовий тип.

Також називається:

    DECIMAL

Наприклад:

    NUMERIC(10, 2)

означає:

    10 → загальна кількість digits
    2  → digits після decimal point

Приклади:

    1234.56
    99.99
    100000.00

---

# NUMERIC для грошей

Для фінансових значень часто використовують:

    NUMERIC(12, 2)

Наприклад:

    CREATE TABLE products (
        price NUMERIC(12, 2)
    );

Значення:

    19.99
    125.50
    9999.99

Точний decimal arithmetic важливий для фінансових даних.

---

# REAL

`REAL` — floating-point number.

    REAL

Займає:

    4 bytes

Може використовуватися для приблизних числових значень.

Наприклад:

    temperature REAL

---

# DOUBLE PRECISION

`DOUBLE PRECISION` — floating-point number з більшою точністю, ніж `REAL`.

    DOUBLE PRECISION

Займає:

    8 bytes

Використовується для:

    scientific calculations
    measurements
    approximate numeric calculations

Для грошей зазвичай краще:

    NUMERIC

а не floating-point.

---

# Floating Point

Floating-point numbers можуть мати похибку представлення.

Наприклад:

    REAL
    DOUBLE PRECISION

не гарантують точного decimal arithmetic.

Тому для грошей:

    NUMERIC(12, 2)

часто безпечніший вибір.

---

# Character Types

Основні текстові типи:

    CHAR
    VARCHAR
    TEXT

---

# TEXT

`TEXT` — текст довільної довжини.

    name TEXT

Приклад:

    CREATE TABLE users (
        name TEXT
    );

Можна зберігати:

    John
    Alice
    PostgreSQL
    Hello World

---

# VARCHAR

`VARCHAR` — variable-length string.

Без обмеження:

    VARCHAR

З обмеженням:

    VARCHAR(100)

Наприклад:

    CREATE TABLE users (
        username VARCHAR(50)
    );

Максимальна довжина:

    50 characters

---

# TEXT vs VARCHAR

У PostgreSQL:

    TEXT

та:

    VARCHAR

без length constraint

у багатьох звичайних випадках можуть використовуватися однаково.

Наприклад:

    name TEXT

часто простіше, ніж:

    name VARCHAR(255)

Якщо бізнес-правило потребує обмеження довжини:

    username VARCHAR(50)

або explicit constraint може бути доречним.

---

# CHAR

`CHAR(n)` — fixed-length character string.

Наприклад:

    CHAR(5)

Значення мають фіксовану довжину.

Приклад:

    country_code CHAR(2)

Але для більшості application strings:

    TEXT
    VARCHAR

використовуються частіше.

---

# Boolean

`BOOLEAN` зберігає логічне значення.

Можливі значення:

    TRUE
    FALSE
    NULL

Приклад:

    CREATE TABLE users (
        is_active BOOLEAN
    );

Дані:

    TRUE
    FALSE

---

# Boolean Syntax

PostgreSQL дозволяє:

    TRUE
    FALSE

Також існують форми:

    'true'
    'false'
    'yes'
    'no'
    'on'
    'off'
    '1'
    '0'

Але у SQL-коді краще використовувати зрозумілі:

    TRUE
    FALSE

---

# Date and Time Types

Основні типи:

    DATE
    TIME
    TIMESTAMP
    TIMESTAMPTZ
    INTERVAL

---

# DATE

`DATE` зберігає дату без часу.

Наприклад:

    2026-09-08

Створення:

    CREATE TABLE users (
        birth_date DATE
    );

---

# TIME

`TIME` зберігає час без дати.

Наприклад:

    14:30:00

Приклад:

    CREATE TABLE events (
        start_time TIME
    );

---

# TIMESTAMP

`TIMESTAMP` зберігає дату та час без timezone.

Наприклад:

    2026-09-08 14:30:00

Створення:

    CREATE TABLE events (
        created_at TIMESTAMP
    );

---

# TIMESTAMPTZ

`TIMESTAMPTZ` означає timestamp with time zone.

Наприклад:

    CREATE TABLE events (
        created_at TIMESTAMPTZ
    );

Це дуже поширений вибір для application timestamps.

Наприклад:

    created_at TIMESTAMPTZ DEFAULT NOW()

---

# TIMESTAMP vs TIMESTAMPTZ

    TIMESTAMP
        ↓
    date + time
    без timezone semantics

    TIMESTAMPTZ
        ↓
    timestamp with time zone semantics

Для серверних application timestamps часто зручно використовувати:

    TIMESTAMPTZ

Наприклад:

    created_at TIMESTAMPTZ DEFAULT NOW()

---

# INTERVAL

`INTERVAL` представляє проміжок часу.

Наприклад:

    INTERVAL '1 day'

    INTERVAL '2 hours'

    INTERVAL '30 minutes'

Приклад:

    SELECT NOW() + INTERVAL '7 days';

---

# UUID

`UUID` — universally unique identifier.

Приклад:

    550e8400-e29b-41d4-a716-446655440000

Тип:

    UUID

Приклад таблиці:

    CREATE TABLE users (
        id UUID
    );

UUID часто використовують як identifier замість послідовного integer ID.

---

# UUID Generation

У PostgreSQL можна генерувати UUID за допомогою відповідних функцій/розширень.

У сучасних версіях PostgreSQL доступна функція:

    gen_random_uuid()

Наприклад:

    CREATE TABLE users (
        id UUID DEFAULT gen_random_uuid()
    );

Під час вставки PostgreSQL може генерувати UUID автоматично.

---

# JSON

PostgreSQL має тип:

    JSON

Приклад:

    CREATE TABLE users (
        profile JSON
    );

Значення:

    '{"name": "John", "age": 25}'

---

# JSONB

`JSONB` — binary representation JSON.

    JSONB

Наприклад:

    CREATE TABLE users (
        profile JSONB
    );

У PostgreSQL для багатьох application cases:

    JSONB

є практичним вибором для JSON-даних.

Детальніше:

    20-json-and-jsonb

---

# ARRAY

PostgreSQL підтримує arrays.

Наприклад:

    TEXT[]

Приклад:

    CREATE TABLE users (
        tags TEXT[]
    );

Значення:

    ARRAY['javascript', 'postgresql', 'nodejs']

Або:

    '{"javascript","postgresql","nodejs"}'

Детальніше:

    21-arrays-and-special-types

---

# NULL

`NULL` означає:

    missing value
    unknown value
    absence of value

Наприклад:

    id | name  | age
    ---+-------+----
     1 | John  | 25
     2 | Alice | NULL

У Alice age невідомий / не заданий.

---

# NULL ≠ 0

`NULL` не дорівнює `0`.

    NULL
        ↓
    відсутнє / невідоме значення

    0
        ↓
    конкретне число

---

# NULL ≠ Empty String

`NULL`:

    відсутнє значення

`''`:

    порожній string

Наприклад:

    name = NULL

та:

    name = ''

— різні ситуації.

---

# NULL ≠ FALSE

Для BOOLEAN:

    FALSE

це конкретне значення.

А:

    NULL

означає відсутність / невідомість значення.

---

# CREATE TABLE з різними типами

Приклад:

    CREATE TABLE users (
        id INTEGER,
        username TEXT,
        email VARCHAR(255),
        age INTEGER,
        balance NUMERIC(12, 2),
        is_active BOOLEAN,
        birth_date DATE,
        created_at TIMESTAMPTZ,
        profile JSONB
    );

---

# Column Defaults

Column може мати default value.

Синтаксис:

    column_name data_type DEFAULT value

Наприклад:

    CREATE TABLE users (
        is_active BOOLEAN DEFAULT TRUE
    );

Якщо значення не передати:

    INSERT INTO users
    DEFAULT VALUES;

PostgreSQL використає:

    TRUE

---

# DEFAULT NOW()

Для timestamps часто:

    CREATE TABLE users (
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

При створенні row PostgreSQL автоматично встановить поточний timestamp.

---

# Identity Columns

Для числових ID PostgreSQL підтримує identity columns.

Наприклад:

    CREATE TABLE users (
        id INTEGER GENERATED ALWAYS AS IDENTITY,
        name TEXT
    );

Тепер PostgreSQL може автоматично генерувати:

    1
    2
    3
    4
    ...

---

# GENERATED BY DEFAULT AS IDENTITY

Інший варіант:

    CREATE TABLE users (
        id INTEGER GENERATED BY DEFAULT AS IDENTITY,
        name TEXT
    );

Основна ідея:

    PostgreSQL автоматично генерує ID

---

# Identity vs SERIAL

Старий популярний підхід:

    SERIAL

Наприклад:

    id SERIAL

Сучасний стандартний підхід:

    GENERATED ... AS IDENTITY

Наприклад:

    id INTEGER GENERATED ALWAYS AS IDENTITY

Для нового PostgreSQL-коду варто знати identity columns.

---

# Generated Columns

PostgreSQL підтримує generated columns.

Значення такої column обчислюється з інших columns.

Наприклад:

    CREATE TABLE products (
        price NUMERIC(10, 2),
        quantity INTEGER,
        total NUMERIC(12, 2)
            GENERATED ALWAYS AS (price * quantity) STORED
    );

`total` обчислюється автоматично.

---

# ALTER TABLE

`ALTER TABLE` використовується для зміни структури таблиці.

Наприклад:

    ALTER TABLE users
    ADD COLUMN email TEXT;

Додається:

    email TEXT

---

# ADD COLUMN

Синтаксис:

    ALTER TABLE table_name
    ADD COLUMN column_name data_type;

Приклад:

    ALTER TABLE users
    ADD COLUMN phone TEXT;

---

# DROP COLUMN

Видалення column:

    ALTER TABLE users
    DROP COLUMN phone;

Увага:

    DROP COLUMN

видаляє column та її дані.

---

# RENAME COLUMN

Перейменування column:

    ALTER TABLE users
    RENAME COLUMN name TO full_name;

Було:

    name

Стало:

    full_name

---

# ALTER COLUMN TYPE

Можна змінити data type.

Наприклад:

    ALTER TABLE users
    ALTER COLUMN age TYPE BIGINT;

Було:

    age INTEGER

Стало:

    age BIGINT

Зміна типу може вимагати перетворення існуючих даних.

---

# SET DEFAULT

Можна встановити default:

    ALTER TABLE users
    ALTER COLUMN is_active
    SET DEFAULT TRUE;

---

# DROP DEFAULT

Видалення default:

    ALTER TABLE users
    ALTER COLUMN is_active
    DROP DEFAULT;

---

# SET NOT NULL

Можна зробити column обов'язковою:

    ALTER TABLE users
    ALTER COLUMN name SET NOT NULL;

Якщо існують rows з:

    name = NULL

така операція може завершитися помилкою.

---

# DROP NOT NULL

Можна дозволити `NULL`:

    ALTER TABLE users
    ALTER COLUMN name DROP NOT NULL;

---

# DROP TABLE

`DROP TABLE` видаляє таблицю.

    DROP TABLE users;

Це видалить:

    table
    structure
    rows

Операція потенційно руйнівна.

---

# DROP TABLE IF EXISTS

Безпечніший варіант під час навчання:

    DROP TABLE IF EXISTS users;

Якщо таблиця не існує, PostgreSQL не видасть помилку через її відсутність.

---

# TRUNCATE

`TRUNCATE` видаляє всі rows з таблиці, але залишає її структуру.

    TRUNCATE TABLE users;

Після:

    \d users

таблиця все ще існує.

Але rows видалені.

---

# DROP vs TRUNCATE vs DELETE

Важливо розрізняти:

    DROP TABLE
        ↓
    видалити таблицю

    TRUNCATE
        ↓
    видалити всі rows

    DELETE
        ↓
    видалити rows за умовою

Наприклад:

    DELETE FROM users
    WHERE id = 10;

---

# CREATE TABLE IF NOT EXISTS

Можна створити таблицю тільки якщо її ще немає:

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER,
        name TEXT
    );

Якщо таблиця вже існує, PostgreSQL не створюватиме її повторно.

---

# Temporary Tables

PostgreSQL підтримує temporary tables.

    CREATE TEMP TABLE temp_users (
        id INTEGER,
        name TEXT
    );

Temporary table існує протягом поточної session.

Після завершення session вона автоматично видаляється.

---

# Table Schema

Table належить до schema.

Наприклад:

    public.users

де:

    public → schema
    users  → table

За замовчуванням часто використовується:

    public

---

# Schema-qualified Table

Можна явно вказати schema:

    SELECT *
    FROM public.users;

Створення:

    CREATE TABLE public.users (
        id INTEGER,
        name TEXT
    );

---

# Information Schema

PostgreSQL має системну інформацію про таблиці та columns.

Наприклад:

    SELECT
        table_name
    FROM information_schema.tables
    WHERE table_schema = 'public';

---

# Information Schema Columns

Щоб отримати information про columns:

    SELECT
        column_name,
        data_type
    FROM information_schema.columns
    WHERE table_name = 'users';

Можна отримати:

    column_name
    data_type

---

# PostgreSQL Type Categories

У спрощеному вигляді:

    Numeric
        ↓
    SMALLINT
    INTEGER
    BIGINT
    NUMERIC
    REAL
    DOUBLE PRECISION

    Character
        ↓
    CHAR
    VARCHAR
    TEXT

    Boolean
        ↓
    BOOLEAN

    Date / Time
        ↓
    DATE
    TIME
    TIMESTAMP
    TIMESTAMPTZ
    INTERVAL

    Other
        ↓
    UUID
    JSON
    JSONB
    ARRAY

---

# Choosing a Data Type

При виборі типу потрібно запитати:

    Що саме представляє значення?

Наприклад:

    age
        ↓
    INTEGER

    price
        ↓
    NUMERIC

    name
        ↓
    TEXT

    is_active
        ↓
    BOOLEAN

    birth_date
        ↓
    DATE

    created_at
        ↓
    TIMESTAMPTZ

    identifier
        ↓
    UUID / INTEGER / BIGINT

---

# Common Application Table

Наприклад, users:

    CREATE TABLE users (
        id BIGINT GENERATED ALWAYS AS IDENTITY,
        username TEXT,
        email TEXT,
        age INTEGER,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

Тут:

    id
        → BIGINT identity

    username
        → TEXT

    email
        → TEXT

    age
        → INTEGER

    is_active
        → BOOLEAN

    created_at
        → TIMESTAMPTZ

---

# Products Example

    CREATE TABLE products (
        id BIGINT GENERATED ALWAYS AS IDENTITY,
        name TEXT,
        price NUMERIC(10, 2),
        quantity INTEGER,
        is_available BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

---

# Users Example

    CREATE TABLE users (
        id UUID DEFAULT gen_random_uuid(),
        username TEXT,
        email TEXT,
        age INTEGER,
        is_active BOOLEAN DEFAULT TRUE,
        birth_date DATE,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

---

# Posts Example

    CREATE TABLE posts (
        id BIGINT GENERATED ALWAYS AS IDENTITY,
        title TEXT,
        content TEXT,
        published BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

---

# Table Design

Під час створення таблиці потрібно визначити:

    1. Назву table
    2. Назви columns
    3. Data types
    4. NULL / NOT NULL
    5. DEFAULT values
    6. Primary key
    7. Foreign keys
    8. Other constraints

У цьому розділі основний focus:

    table structure
    data types

Constraints детально розглядатимуться у:

    14-constraints

---

# Data Type Conversion

PostgreSQL може виконувати type conversion.

Наприклад:

    SELECT 10 + 20;

Результат:

    30

Але різні типи можуть потребувати explicit cast.

---

# Type Cast

Синтаксис:

    value::type

Наприклад:

    SELECT '123'::INTEGER;

Результат:

    123

Або:

    SELECT 123::TEXT;

Результат:

    '123'

---

# CAST()

Альтернативний синтаксис:

    CAST(value AS type)

Наприклад:

    SELECT CAST('123' AS INTEGER);

Результат:

    123

---

# INTEGER to TEXT

    SELECT 100::TEXT;

---

# TEXT to INTEGER

    SELECT '100'::INTEGER;

---

# TEXT to DATE

    SELECT '2026-09-08'::DATE;

---

# TEXT to TIMESTAMPTZ

    SELECT '2026-09-08 14:30:00+03'::TIMESTAMPTZ;

---

# Common Type Errors

Помилка:

    SELECT 'hello'::INTEGER;

PostgreSQL не може перетворити:

    hello

у:

    INTEGER

Інший приклад:

    SELECT '2026-hello'::DATE;

також буде помилкою.

---

# Practical Workflow

Типовий процес роботи з таблицею:

    CREATE TABLE
        ↓
    \d table_name
        ↓
    INSERT INTO
        ↓
    SELECT
        ↓
    ALTER TABLE
        ↓
    \d table_name

---

# Практичний приклад

Створимо database:

    CREATE DATABASE shop;

Підключимося:

    \c shop

Створимо таблицю:

    CREATE TABLE products (
        id INTEGER GENERATED ALWAYS AS IDENTITY,
        name TEXT,
        price NUMERIC(10, 2),
        quantity INTEGER,
        is_available BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

Перевіримо:

    \d products

Додамо дані:

    INSERT INTO products (
        name,
        price,
        quantity
    )
    VALUES
        ('Keyboard', 49.99, 10),
        ('Mouse', 29.99, 25),
        ('Monitor', 299.99, 5);

Перевіримо:

    SELECT *
    FROM products;

---

# Практичний ALTER TABLE

Додамо description:

    ALTER TABLE products
    ADD COLUMN description TEXT;

Перевіримо:

    \d products

Перейменуємо:

    ALTER TABLE products
    RENAME COLUMN description TO product_description;

---

# Практичний DROP COLUMN

    ALTER TABLE products
    DROP COLUMN product_description;

---

# Практичний TRUNCATE

    TRUNCATE TABLE products;

Таблиця залишається.

Дані видаляються.

---

# Практичний DROP

    DROP TABLE products;

Тепер:

    products

більше не існує.

---

# Типові помилки

❌ Використовувати `VARCHAR(255)` автоматично для всіх strings.

Наприклад:

    name VARCHAR(255)
    description VARCHAR(255)
    email VARCHAR(255)

Не кожне поле потребує такого обмеження.

Для багатьох текстових полів:

    TEXT

є простішим вибором.

---

❌ Використовувати `FLOAT`-подібні типи для грошей.

Для financial values краще розглядати:

    NUMERIC(p, s)

Наприклад:

    NUMERIC(12, 2)

---

❌ Плутати `NULL` та `0`.

    NULL ≠ 0

---

❌ Плутати `NULL` та empty string.

    NULL ≠ ''

---

❌ Зберігати дату як TEXT.

Наприклад:

    birth_date TEXT

часто гірше, ніж:

    birth_date DATE

---

❌ Зберігати timestamp як TEXT.

Краще:

    created_at TIMESTAMPTZ

ніж:

    created_at TEXT

---

❌ Використовувати `TIMESTAMP` без розуміння timezone.

Для distributed applications timezone semantics мають значення.

---

❌ Видаляти table замість rows.

    DROP TABLE

видаляє таблицю.

Для видалення всіх rows:

    TRUNCATE

Для вибіркового видалення:

    DELETE

---

❌ Змінювати тип column без перевірки існуючих даних.

Наприклад:

    ALTER TABLE users
    ALTER COLUMN age TYPE INTEGER;

може завершитися помилкою, якщо існуючі значення не можуть бути перетворені.

---

# Data Type Cheat Sheet

    INTEGER
        → звичайні цілі числа

    BIGINT
        → дуже великі цілі числа

    NUMERIC
        → точні decimal numbers

    REAL
        → приблизні floating-point numbers

    DOUBLE PRECISION
        → floating-point з більшою precision

    TEXT
        → текст

    VARCHAR(n)
        → текст із length limit

    CHAR(n)
        → fixed-length text

    BOOLEAN
        → TRUE / FALSE / NULL

    DATE
        → дата

    TIME
        → час

    TIMESTAMP
        → дата + час без timezone

    TIMESTAMPTZ
        → timestamp with time zone semantics

    INTERVAL
        → проміжок часу

    UUID
        → unique identifier

    JSON
        → JSON data

    JSONB
        → binary JSON representation

    ARRAY
        → масив значень

---

# Table Commands Cheat Sheet

## Створити table

    CREATE TABLE users (
        id INTEGER,
        name TEXT
    );

---

## Створити table, якщо не існує

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER,
        name TEXT
    );

---

## Переглянути tables

    \dt

---

## Переглянути структуру

    \d users

---

## Детальна структура

    \d+ users

---

## Додати column

    ALTER TABLE users
    ADD COLUMN email TEXT;

---

## Видалити column

    ALTER TABLE users
    DROP COLUMN email;

---

## Перейменувати column

    ALTER TABLE users
    RENAME COLUMN name TO full_name;

---

## Змінити type

    ALTER TABLE users
    ALTER COLUMN age TYPE BIGINT;

---

## Встановити default

    ALTER TABLE users
    ALTER COLUMN is_active SET DEFAULT TRUE;

---

## Видалити default

    ALTER TABLE users
    ALTER COLUMN is_active DROP DEFAULT;

---

## Встановити NOT NULL

    ALTER TABLE users
    ALTER COLUMN name SET NOT NULL;

---

## Дозволити NULL

    ALTER TABLE users
    ALTER COLUMN name DROP NOT NULL;

---

## Видалити всі rows

    TRUNCATE TABLE users;

---

## Видалити table

    DROP TABLE users;

---

## Видалити table, якщо існує

    DROP TABLE IF EXISTS users;

---

# PostgreSQL Table Mental Model

    CREATE TABLE
          ↓
    table structure
          ↓
    columns
          ↓
    data types
          ↓
    constraints
          ↓
    rows
          ↓
    values

Наприклад:

    users
      │
      ├── id → BIGINT
      │
      ├── name → TEXT
      │
      ├── age → INTEGER
      │
      ├── is_active → BOOLEAN
      │
      └── created_at → TIMESTAMPTZ

---

# Питання зі співбесіди

Що таке table?

Що таке row?

Що таке column?

Що таке record?

Що таке field?

Що таке data type?

Які основні numeric types є в PostgreSQL?

Чим `INTEGER` відрізняється від `BIGINT`?

Коли використовувати `NUMERIC`?

Чому для грошей часто використовують `NUMERIC`, а не floating-point?

Що таке `TEXT`?

Чим `TEXT` відрізняється від `VARCHAR`?

Що таке `BOOLEAN`?

Що таке `DATE`?

Чим `TIMESTAMP` відрізняється від `TIMESTAMPTZ`?

Що таке `INTERVAL`?

Що таке UUID?

Що таке JSONB?

Що таке ARRAY?

Що таке `NULL`?

Чим `NULL` відрізняється від `0`?

Чим `NULL` відрізняється від `''`?

Що робить `CREATE TABLE`?

Що робить `ALTER TABLE`?

Як додати column?

Як видалити column?

Як перейменувати column?

Як змінити data type column?

Що робить `DROP TABLE`?

Що робить `TRUNCATE`?

Яка різниця між:

    DROP
    TRUNCATE
    DELETE

Що таке `DEFAULT`?

Що таке identity column?

Чим `SERIAL` відрізняється від identity column?

Що таке generated column?

Як подивитися структуру table у `psql`?

Що робить:

    \d users

Що робить:

    \d+ users

Що робить:

    \dt

Що таке schema?

Що означає:

    public.users

Що таке type casting?

Чим відрізняються:

    value::INTEGER

і:

    CAST(value AS INTEGER)

---

# Шлях

## 🟢 Core — обов'язково знати

Розуміння:

    table
    row
    column
    record
    field

Основні команди:

    CREATE TABLE
    ALTER TABLE
    DROP TABLE
    TRUNCATE

Основні типи:

    INTEGER
    BIGINT
    NUMERIC
    TEXT
    VARCHAR
    BOOLEAN
    DATE
    TIMESTAMP
    TIMESTAMPTZ

Розуміння:

    NULL
    DEFAULT
    schema
    public schema

Уміння:

    створити table
    додати column
    видалити column
    перейменувати column
    змінити type
    переглянути структуру table

---

## 🔵 Junior

Розуміння:

    SMALLINT
    INTEGER
    BIGINT

    NUMERIC
    REAL
    DOUBLE PRECISION

    TEXT
    VARCHAR
    CHAR

    DATE
    TIME
    TIMESTAMP
    TIMESTAMPTZ
    INTERVAL

    UUID
    JSONB
    ARRAY

Уміння правильно вибирати data type.

Розуміння:

    DEFAULT
    IDENTITY
    generated columns

Уміння використовувати:

    \dt
    \d
    \d+

Розуміння:

    NULL
    NULL vs 0
    NULL vs ''
    NULL vs FALSE

Основи type casting:

    ::
    CAST()

---

## 🟠 Middle

Глибше розуміння PostgreSQL type system.

Розуміння:

    implicit casts
    explicit casts
    domains
    enum types
    composite types
    range types

Розуміння:

    precision
    scale
    numeric behavior
    timestamp semantics
    timezone handling

Проєктування:

    appropriate data types
    storage efficiency
    data integrity
    application compatibility

Розуміння наслідків зміни:

    column type
    default
    nullability

Робота з:

    JSONB
    arrays
    UUID
    generated columns

---

## 🔴 Senior

Глибоке розуміння PostgreSQL type system.

Розуміння:

    PostgreSQL internal type system
    casts
    type categories
    operator resolution
    function type resolution

Глибоке розуміння:

    NUMERIC internals
    floating-point behavior
    timestamp/timezone semantics
    collations
    text encoding

Advanced types:

    domains
    enums
    composite types
    range types
    multirange types

Проєктування data models з урахуванням:

    correctness
    performance
    storage
    indexing
    query behavior
    application requirements

Розуміння trade-offs між:

    TEXT
    VARCHAR
    CHAR

та:

    INTEGER
    BIGINT
    UUID

Розуміння впливу data types на:

    indexes
    sorting
    comparisons
    storage
    query performance

---

# Міні-шпаргалка

## CREATE TABLE

    CREATE TABLE users (
        id INTEGER,
        name TEXT,
        age INTEGER
    );

---

## INTEGER

    age INTEGER

Ціле число.

---

## BIGINT

    id BIGINT

Велике ціле число.

---

## NUMERIC

    price NUMERIC(10, 2)

Точне decimal число.

---

## TEXT

    name TEXT

Текст довільної довжини.

---

## VARCHAR

    username VARCHAR(50)

Текст з обмеженням довжини.

---

## BOOLEAN

    is_active BOOLEAN

Значення:

    TRUE
    FALSE
    NULL

---

## DATE

    birth_date DATE

Тільки дата.

---

## TIMESTAMP

    created_at TIMESTAMP

Дата + час без timezone semantics.

---

## TIMESTAMPTZ

    created_at TIMESTAMPTZ

Timestamp with time zone semantics.

---

## UUID

    id UUID

Unique identifier.

---

## JSONB

    profile JSONB

JSON у binary representation.

---

## ARRAY

    tags TEXT[]

Масив текстових значень.

---

## DEFAULT

    is_active BOOLEAN DEFAULT TRUE

---

## IDENTITY

    id INTEGER
        GENERATED ALWAYS AS IDENTITY

---

## NULL

    NULL

означає відсутнє або невідоме значення.

---

## ALTER TABLE

    ALTER TABLE users
    ADD COLUMN email TEXT;

---

## DROP COLUMN

    ALTER TABLE users
    DROP COLUMN email;

---

## RENAME COLUMN

    ALTER TABLE users
    RENAME COLUMN name TO full_name;

---

## DROP TABLE

    DROP TABLE users;

    → видаляє table

---

## TRUNCATE

    TRUNCATE TABLE users;

    → видаляє всі rows
    → table залишається

---

## Table inspection

    \dt

    \d users

    \d+ users

---

# Головне:

• Table складається з columns та rows.

• Row представляє один запис.

• Column представляє властивість даних.

• Кожна column має data type.

• Data type визначає тип значень, які можна зберігати.

• Для звичайних цілих чисел часто використовується:

    INTEGER

• Для дуже великих цілих чисел:

    BIGINT

• Для точних decimal calculations:

    NUMERIC

• Для тексту:

    TEXT

• Для тексту з обмеженням довжини:

    VARCHAR(n)

• Для логічних значень:

    BOOLEAN

• Для дат:

    DATE

• Для date + time:

    TIMESTAMP
    TIMESTAMPTZ

• Для application timestamps часто зручно використовувати:

    TIMESTAMPTZ

• Для точних фінансових значень часто використовують:

    NUMERIC(p, s)

• `NULL` означає відсутнє або невідоме значення.

• `NULL` не дорівнює:

    0
    ''
    FALSE

• `DEFAULT` визначає значення, яке PostgreSQL використовує автоматично, якщо значення не задане.

• Identity column дозволяє PostgreSQL автоматично генерувати числові identifiers.

• `CREATE TABLE` створює table.

• `ALTER TABLE` змінює структуру table.

• `DROP TABLE` видаляє table.

• `TRUNCATE` видаляє всі rows, але залишає table.

• `TEXT` часто є простим вибором для звичайних текстових полів.

• `NUMERIC` краще підходить для точних decimal calculations, ніж floating-point types.

• Для кожного поля потрібно вибирати type відповідно до того, що саме представляє значення.

• Основна модель:

    table
      ↓
    columns
      ↓
    data types
      ↓
    constraints
      ↓
    rows
      ↓
    values

• При проєктуванні таблиці потрібно думати не тільки про те, **що зберігати**, але й про:

    type
    nullability
    default
    constraints
    indexes
    relationships

• Правильно вибраний data type допомагає забезпечити:

    data integrity
    correctness
    predictable queries
    efficient storage
    appropriate application behavior

• Базовий PostgreSQL workflow:

    CREATE TABLE
        ↓
    \d table
        ↓
    INSERT
        ↓
    SELECT
        ↓
    ALTER TABLE
        ↓
    \d table

• Найважливіше на цьому етапі — навчитися дивитися на реальний об'єкт і правильно переводити його у структуру:

    REAL-WORLD OBJECT
          ↓
        TABLE
          ↓
       COLUMNS
          ↓
      DATA TYPES
          ↓
       CONSTRAINTS
          ↓
         ROWS
# Arrays та спеціальні типи PostgreSQL

## 1. Що таке спеціальні типи PostgreSQL

PostgreSQL підтримує не тільки стандартні SQL-типи:

    INTEGER
    TEXT
    BOOLEAN
    NUMERIC
    DATE

але й спеціальні типи даних:

    ARRAY
    UUID
    ENUM
    RANGE
    TIMESTAMP / TIMESTAMPTZ
    INTERVAL
    INET
    CIDR
    XML
    JSON / JSONB

Деякі з них ми вже розглядали окремо.

У цій темі основна увага:

- PostgreSQL Arrays;
- UUID;
- ENUM;
- Date/Time спеціальні типи;
- INTERVAL;
- IP-адреси `INET` та `CIDR`;
- Range types;
- практичний вибір типів.

---

# 2. ARRAY

`ARRAY` дозволяє зберігати декілька значень одного типу в одному полі.

Наприклад:

    tags TEXT[]

Можна зберігати:

    {"javascript", "react", "postgresql"}

---

# 3. Створення ARRAY-колонки

Наприклад:

    CREATE TABLE developers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        skills TEXT[]
    );

Тепер один developer може мати декілька skills.

---

# 4. Вставка ARRAY

Можна використовувати синтаксис:

    INSERT INTO developers (name, skills)
    VALUES (
        'Valeriy',
        ARRAY['JavaScript', 'React', 'PostgreSQL']
    );

Або array literal:

    INSERT INTO developers (name, skills)
    VALUES (
        'Anna',
        '{"TypeScript", "React", "Node.js"}'
    );

---

# 5. Читання ARRAY

    SELECT skills
    FROM developers;

Результат:

    {JavaScript,React,PostgreSQL}

---

# 6. ARRAY та тип елементів

Масив має тип своїх елементів.

Наприклад:

    INTEGER[]

масив integer:

    {10, 20, 30}

А:

    TEXT[]

масив text:

    {"JavaScript", "React", "SQL"}

Також можна використовувати:

    BOOLEAN[]
    NUMERIC[]
    UUID[]
    DATE[]

---

# 7. Доступ до елемента ARRAY

У PostgreSQL індексація масивів починається з `1`.

Наприклад:

    SELECT skills[1]
    FROM developers;

Отримаємо перший елемент.

Другий:

    SELECT skills[2]
    FROM developers;

Це відрізняється від JavaScript.

У JavaScript:

    array[0]

У PostgreSQL:

    array[1]

---

# 8. Діапазон елементів ARRAY

Можна отримати частину масиву:

    SELECT skills[1:2]
    FROM developers;

Наприклад:

    {JavaScript,React}

---

# 9. Оновлення елемента ARRAY

Можна змінити конкретний елемент:

    UPDATE developers
    SET skills[2] = 'Next.js'
    WHERE id = 1;

---

# 10. Додавання елемента до ARRAY

Можна використовувати оператор `||`.

    UPDATE developers
    SET skills = skills || ARRAY['Docker']
    WHERE id = 1;

Було:

    {JavaScript,React,PostgreSQL}

Стало:

    {JavaScript,React,PostgreSQL,Docker}

---

# 11. Додавання елемента на початок

    UPDATE developers
    SET skills = ARRAY['TypeScript'] || skills
    WHERE id = 1;

---

# 12. Видалення елемента ARRAY

Для видалення конкретного значення можна використати:

    array_remove()

Наприклад:

    UPDATE developers
    SET skills = array_remove(skills, 'React')
    WHERE id = 1;

---

# 13. array_replace()

Замінює одне значення іншим.

    SELECT array_replace(
        ARRAY['JavaScript', 'React', 'Node.js'],
        'React',
        'Next.js'
    );

Результат:

    {JavaScript,Next.js,Node.js}

---

# 14. array_length()

Визначає довжину масиву.

    SELECT array_length(skills, 1)
    FROM developers;

Наприклад:

    {JavaScript,React,PostgreSQL}

результат:

    3

---

# 15. cardinality()

`cardinality()` також повертає кількість елементів.

    SELECT cardinality(skills)
    FROM developers;

Для простих одномірних масивів результат аналогічний `array_length()`.

---

# 16. Пошук у ARRAY

Оператор `ANY` дозволяє перевірити, чи значення присутнє в масиві.

    SELECT *
    FROM developers
    WHERE 'React' = ANY(skills);

Логіка:

    Чи є 'React' серед skills?

---

# 17. ALL

`ALL` перевіряє умову для всіх елементів.

Наприклад:

    SELECT *
    FROM products
    WHERE price > ALL(ARRAY[100, 200, 300]);

Це означає:

    price > 100
    AND
    price > 200
    AND
    price > 300

---

# 18. ARRAY та `@>`

Для масивів можна використовувати containment.

    SELECT *
    FROM developers
    WHERE skills @> ARRAY['React'];

Це означає:

    skills містить 'React'

---

# 19. ARRAY та `<@`

`<@` означає:

    лівий масив міститься у правому

Наприклад:

    SELECT ARRAY['React', 'Node.js']
    <@
    ARRAY['JavaScript', 'React', 'Node.js'];

Результат:

    true

---

# 20. ARRAY та `&&`

Оператор `&&` перевіряє, чи мають два масиви хоча б один спільний елемент.

    SELECT ARRAY['React', 'Vue']
    &&
    ARRAY['Angular', 'React'];

Результат:

    true

---

# 21. unnest()

`unnest()` перетворює ARRAY на набір рядків.

Наприклад:

    SELECT unnest(
        ARRAY['JavaScript', 'React', 'PostgreSQL']
    );

Результат:

    JavaScript
    React
    PostgreSQL

Це дуже корисна функція для запитів.

---

# 22. ARRAY та JOIN

Можна використовувати `unnest()` разом із `CROSS JOIN LATERAL`.

Наприклад:

    SELECT
        d.name,
        skill
    FROM developers d
    CROSS JOIN LATERAL unnest(d.skills) AS skill;

Отримаємо:

    Valeriy | JavaScript
    Valeriy | React
    Valeriy | PostgreSQL

---

# 23. array_agg()

`array_agg()` робить з набору рядків ARRAY.

Наприклад:

    SELECT array_agg(name)
    FROM developers;

Результат:

    {Valeriy,Anna,John}

Це протилежна за напрямком операція до `unnest()`.

    array_agg()
        ↓
    rows → array

    unnest()
        ↓
    array → rows

---

# 24. Сортування всередині array_agg()

Можна контролювати порядок:

    SELECT array_agg(
        name
        ORDER BY name
    )
    FROM developers;

---

# 25. DISTINCT у array_agg()

Можна прибрати дублікати:

    SELECT array_agg(DISTINCT name)
    FROM developers;

---

# 26. Багатовимірні ARRAY

PostgreSQL підтримує багатовимірні масиви.

Наприклад:

    INTEGER[][]

Створення:

    SELECT ARRAY[
        [1, 2, 3],
        [4, 5, 6]
    ];

Це матриця:

    1 2 3
    4 5 6

---

# 27. Доступ до багатовимірного ARRAY

    SELECT (
        ARRAY[
            [1, 2, 3],
            [4, 5, 6]
        ]
    )[2][3];

Результат:

    6

---

# 28. Коли використовувати ARRAY

ARRAY добре підходить для:

- невеликих списків;
- tags;
- skills;
- наборів значень;
- простих списків;
- даних, які логічно належать одному рядку.

Наприклад:

    skills TEXT[]

---

# 29. Коли не варто використовувати ARRAY

Якщо елементи масиву є повноцінними сутностями, краще створити окрему таблицю.

Наприклад:

    users
        ↓
    skills

Якщо потрібно:

- робити складні JOIN;
- зберігати додаткові дані про кожен елемент;
- використовувати FOREIGN KEY;
- часто шукати окремі елементи;
- працювати з великими наборами.

Тоді нормалізована структура часто буде кращою.

---

# 30. ARRAY vs окрема таблиця

ARRAY:

    users
    ├── id
    ├── name
    └── skills TEXT[]

Реляційна модель:

    users
    ├── id
    └── name

    skills
    ├── id
    └── name

    user_skills
    ├── user_id
    └── skill_id

Якщо `skills` — просто невеликий список, ARRAY може бути чудовим.

Якщо `skills` — окремі сутності системи, краще таблиці.

---

# 31. UUID

UUID — Universally Unique Identifier.

Приклад:

    550e8400-e29b-41d4-a716-446655440000

UUID має 128 біт.

У PostgreSQL:

    UUID

---

# 32. Створення UUID-колонки

    CREATE TABLE users (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL
    );

---

# 33. Генерація UUID

У сучасному PostgreSQL можна використовувати функцію:

    gen_random_uuid()

Наприклад:

    SELECT gen_random_uuid();

Отримаємо UUID:

    7f6c0a3e-8a8b-4c5f-9e6d-...

---

# 34. UUID як DEFAULT

Можна автоматично генерувати UUID:

    CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL
    );

Тепер:

    INSERT INTO users (name)
    VALUES ('Valeriy');

PostgreSQL сам створить `id`.

---

# 35. SERIAL vs UUID

SERIAL:

    1
    2
    3
    4

UUID:

    550e8400-e29b-41d4-a716-446655440000
    9b1deb4d-...

SERIAL:

- простий;
- компактний;
- зручний для локальних систем.

UUID:

- глобально унікальний;
- не показує послідовність записів;
- зручний для distributed systems;
- зручно генерувати незалежно від однієї бази.

---

# 36. UUID у Full Stack

Наприклад:

    React
        ↓
    POST /users
        ↓
    Nest.js
        ↓
    PostgreSQL
        ↓
    UUID

API може повертати:

    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Valeriy"
    }

---

# 37. Коли використовувати UUID

UUID особливо корисний:

- у distributed systems;
- у мікросервісах;
- коли ID генерується не тільки PostgreSQL;
- у публічних API;
- коли не хочеться розкривати просту послідовність ID.

Але UUID не потрібно використовувати автоматично в кожному проекті.

---

# 38. ENUM

`ENUM` дозволяє створити власний тип із фіксованим набором значень.

Наприклад:

    CREATE TYPE user_status AS ENUM (
        'active',
        'blocked',
        'pending'
    );

---

# 39. Використання ENUM

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        status user_status NOT NULL
    );

Вставка:

    INSERT INTO users (name, status)
    VALUES ('Valeriy', 'active');

---

# 40. ENUM контролює значення

Це не дозволить:

    INSERT INTO users (name, status)
    VALUES ('Valeriy', 'unknown');

PostgreSQL відхилить значення, тому що:

    unknown

не входить у `user_status`.

---

# 41. Додавання значення ENUM

Можна додати нове значення:

    ALTER TYPE user_status
    ADD VALUE 'deleted';

Тепер доступні:

    active
    blocked
    pending
    deleted

---

# 42. ENUM: переваги

ENUM:

- забезпечує обмежений набір значень;
- зменшує ризик помилок;
- добре описує стабільні статуси;
- підтримується самим PostgreSQL.

---

# 43. ENUM: недоліки

ENUM може бути незручним, якщо значення:

- часто змінюються;
- залежать від бізнес-налаштувань;
- повинні редагуватися користувачами;
- мають власні metadata.

У таких випадках часто краще окрема таблиця.

---

# 44. ENUM vs CHECK

Замість:

    CREATE TYPE user_status AS ENUM (
        'active',
        'blocked',
        'pending'
    );

можна:

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        status TEXT NOT NULL
            CHECK (status IN ('active', 'blocked', 'pending'))
    );

Для простого проекту `CHECK` часто може бути достатнім.

---

# 45. ENUM vs lookup table

ENUM:

    user_status
        active
        blocked
        pending

Lookup table:

    user_statuses
    ├── id
    ├── code
    └── name

Lookup table краща, якщо статуси є повноцінними даними.

---

# 46. DATE

`DATE` зберігає дату без часу.

Наприклад:

    2026-09-10

Створення:

    CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        event_date DATE NOT NULL
    );

---

# 47. TIME

`TIME` зберігає час без дати.

Наприклад:

    14:30:00

Тип:

    TIME

---

# 48. TIMESTAMP

`TIMESTAMP` зберігає дату та час без часового поясу.

Наприклад:

    2026-09-10 14:30:00

Тип:

    TIMESTAMP

---

# 49. TIMESTAMPTZ

`TIMESTAMPTZ` — timestamp with time zone.

Наприклад:

    2026-09-10 14:30:00+03

У PostgreSQL це дуже важливий тип для моментів часу.

Для більшості backend-систем варто серйозно розглядати:

    TIMESTAMPTZ

для:

    created_at
    updated_at
    published_at
    login_at

---

# 50. TIMESTAMP vs TIMESTAMPTZ

    TIMESTAMP
        ↓
    дата + час
    без timezone semantics

    TIMESTAMPTZ
        ↓
    момент часу
    з урахуванням часового поясу під час введення/відображення

Для глобальних застосунків `TIMESTAMPTZ` часто безпечніший вибір.

---

# 51. CURRENT_TIMESTAMP

Поточний timestamp:

    SELECT CURRENT_TIMESTAMP;

Також:

    SELECT now();

У PostgreSQL:

    now()

і:

    CURRENT_TIMESTAMP

зазвичай використовуються для отримання поточного моменту часу.

---

# 52. DEFAULT CURRENT_TIMESTAMP

Типова таблиця:

    CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

При вставці:

    INSERT INTO posts (title)
    VALUES ('My first post');

PostgreSQL сам запише час створення.

---

# 53. INTERVAL

`INTERVAL` представляє проміжок часу.

Наприклад:

    INTERVAL '1 day'

    INTERVAL '2 hours'

    INTERVAL '3 months'

---

# 54. Арифметика з INTERVAL

Можна додати інтервал до дати:

    SELECT CURRENT_DATE + INTERVAL '7 days';

Або:

    SELECT CURRENT_TIMESTAMP + INTERVAL '2 hours';

---

# 55. Віднімання INTERVAL

    SELECT CURRENT_TIMESTAMP - INTERVAL '30 days';

---

# 56. Різниця між датами

Можна виконувати арифметику:

    SELECT DATE '2026-09-10'
        - DATE '2026-09-01';

Результат:

    9

Це кількість днів.

---

# 57. Time zone

PostgreSQL підтримує роботу з часовими зонами.

Наприклад:

    SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Kyiv';

Це корисно для backend-застосунків, які працюють із користувачами з різних країн.

---

# 58. Практичне правило для часу

Для backend-систем часто корисно:

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP

і:

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP

А на frontend вже форматувати дату відповідно до локального timezone користувача.

---

# 59. INET

`INET` призначений для IP-адрес.

IPv4:

    192.168.1.10

IPv6:

    2001:db8::1

Приклад:

    CREATE TABLE login_attempts (
        id SERIAL PRIMARY KEY,
        ip INET NOT NULL
    );

---

# 60. Вставка INET

    INSERT INTO login_attempts (ip)
    VALUES ('192.168.1.10');

IPv6:

    INSERT INTO login_attempts (ip)
    VALUES ('2001:db8::1');

PostgreSQL перевіряє формат IP.

---

# 61. Пошук за IP

    SELECT *
    FROM login_attempts
    WHERE ip = '192.168.1.10';

---

# 62. CIDR

`CIDR` призначений для мереж.

Наприклад:

    192.168.1.0/24

Це мережа:

    192.168.1.0
    └── /24

---

# 63. INET vs CIDR

    INET
        ↓
    окрема IP-адреса або адреса з маскою

    CIDR
        ↓
    мережевий блок

Наприклад:

    192.168.1.10
        → INET

    192.168.1.0/24
        → CIDR

---

# 64. Оператори мереж

PostgreSQL підтримує спеціальні оператори для IP.

Наприклад:

    '192.168.1.10'::INET
        << '192.168.1.0/24'::CIDR

Перевіряється, чи знаходиться IP всередині мережі.

---

# 65. Навіщо INET у Full Stack

INET корисний для:

- audit logs;
- login attempts;
- security;
- access control;
- network applications;
- адміністративних систем.

Наприклад:

    login_attempts
    ├── user_id
    ├── ip
    └── created_at

---

# 66. Range Types

PostgreSQL має спеціальні типи для діапазонів.

Наприклад:

    int4range
    int8range
    numrange
    tsrange
    tstzrange
    daterange

---

# 67. int4range

Діапазон integer:

    int4range

Приклад:

    SELECT int4range(1, 10);

---

# 68. daterange

Діапазон дат:

    daterange

Наприклад:

    daterange(
        '2026-09-01',
        '2026-09-10'
    )

---

# 69. tstzrange

Діапазон timestamp with time zone:

    tstzrange

Це корисно для:

- бронювання;
- доступності;
- часових інтервалів;
- планування;
- календарів.

---

# 70. Range та межі

PostgreSQL має спеціальний синтаксис меж.

Наприклад:

    [1,10)

означає:

    1 включено
    10 не включено

Тобто:

    1 <= x < 10

---

# 71. Inclusive та exclusive

Приклади:

    [1,10]
        включити 1 і 10

    [1,10)
        включити 1, виключити 10

    (1,10]
        виключити 1, включити 10

    (1,10)
        виключити обидві межі

---

# 72. Range у таблиці

Наприклад, бронювання:

    CREATE TABLE reservations (
        id SERIAL PRIMARY KEY,
        room_id INTEGER NOT NULL,
        period TSTZRANGE NOT NULL
    );

Вставка:

    INSERT INTO reservations (room_id, period)
    VALUES (
        1,
        tstzrange(
            '2026-09-10 10:00+03',
            '2026-09-10 12:00+03'
        )
    );

---

# 73. Перевірка перетину Range

Оператор:

    &&

перевіряє перетин.

Наприклад:

    SELECT *
    FROM reservations
    WHERE period && tstzrange(
        '2026-09-10 11:00+03',
        '2026-09-10 13:00+03'
    );

Якщо періоди перетинаються — запис буде знайдений.

---

# 74. Range та containment

Можна перевірити, чи містить range певний момент.

Наприклад:

    SELECT *
    FROM reservations
    WHERE period @>
        '2026-09-10 11:00+03'::TIMESTAMPTZ;

---

# 75. Range — дуже практичний тип

Замість:

    start_at
    end_at

можна іноді використовувати:

    period TSTZRANGE

Це дозволяє PostgreSQL працювати з інтервалом як з одним логічним значенням.

---

# 76. Exclusion constraints

Одна з дуже сильних можливостей PostgreSQL — exclusion constraints.

Наприклад, можна заборонити перекривання бронювань:

    CREATE TABLE reservations (
        id SERIAL PRIMARY KEY,
        room_id INTEGER NOT NULL,
        period TSTZRANGE NOT NULL,

        EXCLUDE USING GIST (
            room_id WITH =,
            period WITH &&
        )
    );

Логіка:

    одна кімната
        +
    періоди перетинаються
        ↓
    PostgreSQL не дозволить запис

Це вже advanced-рівень.

---

# 77. XML

PostgreSQL також підтримує:

    XML

Наприклад:

    SELECT '<user><name>Valeriy</name></user>'::XML;

XML сьогодні використовується рідше, ніж JSONB, але може зустрічатися у legacy або інтеграційних системах.

---

# 78. Composite Types

PostgreSQL дозволяє створювати власні складені типи.

Наприклад:

    CREATE TYPE address AS (
        city TEXT,
        street TEXT,
        house INTEGER
    );

Потім:

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        address address
    );

Composite types — advanced PostgreSQL feature.

---

# 79. Domain Types

`DOMAIN` дозволяє створити власний тип на основі існуючого типу з додатковими обмеженнями.

Наприклад:

    CREATE DOMAIN positive_integer AS INTEGER
    CHECK (VALUE > 0);

Тепер:

    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        quantity positive_integer
    );

---

# 80. Generated Columns

PostgreSQL підтримує generated columns.

Це значення, яке обчислюється на основі інших колонок.

Наприклад:

    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        price NUMERIC(10, 2),
        quantity INTEGER,
        total NUMERIC(12, 2)
            GENERATED ALWAYS AS (price * quantity) STORED
    );

`total` не потрібно передавати вручну.

---

# 81. Коли використовувати Generated Column

Це корисно, коли значення:

- завжди обчислюється однаково;
- залежить від інших колонок;
- не повинно вводитися вручну;
- потрібно зберігати та індексувати.

Це не зовсім "special type", але важлива спеціальна можливість PostgreSQL, яку варто знати.

---

# 82. Типи даних: як вибирати

Не вибирайте тип тільки тому, що він "цікавий".

Поставте питання:

    Що це за дані?

    Як я буду їх шукати?

    Чи потрібні JOIN?

    Чи потрібна FOREIGN KEY?

    Чи має значення timezone?

    Чи може структура змінюватися?

    Чи це список?

    Чи це окрема сутність?

---

# 83. Практична таблиця вибору

| Дані | Тип |
|---|---|
| ціле число | INTEGER |
| велике число | BIGINT |
| гроші/точні числа | NUMERIC |
| текст | TEXT |
| дата | DATE |
| момент часу | TIMESTAMPTZ |
| тривалість | INTERVAL |
| список значень | ARRAY |
| глобальний ID | UUID |
| стабільний набір значень | ENUM |
| IP | INET |
| мережа | CIDR |
| діапазон дат | DATERANGE |
| діапазон timestamp | TSTZRANGE |
| гнучка структура | JSONB |

---

# 84. ARRAY vs JSONB

Обидва можуть зберігати списки.

ARRAY:

    skills TEXT[]

JSONB:

    {
      "skills": ["JavaScript", "React"]
    }

ARRAY краще, якщо:

    це просто список одного типу.

JSONB краще, якщо:

    структура складніша або може змінюватися.

---

# 85. ARRAY vs JSONB vs таблиця

### ARRAY

    skills TEXT[]

Для простого списку.

### JSONB

    metadata JSONB

Для гнучкої структури.

### Окрема таблиця

    users
    skills
    user_skills

Для повноцінних реляційних даних.

---

# 86. UUID vs SERIAL

Не існує правила:

    UUID завжди краще

або:

    SERIAL завжди краще

Вибір залежить від архітектури.

Для простої локальної навчальної БД:

    SERIAL / IDENTITY

дуже зручний.

Для distributed/public systems:

    UUID

може бути кращим.

---

# 87. ENUM vs CHECK vs table

### ENUM

    CREATE TYPE status AS ENUM (
        'active',
        'blocked'
    );

Добре для стабільного набору.

### CHECK

    CHECK (status IN ('active', 'blocked'))

Добре для простих локальних правил.

### Таблиця

    statuses

Добре, якщо значення є повноцінними даними.

---

# 88. DATE vs TIMESTAMP vs TIMESTAMPTZ

    DATE
        ↓
    тільки дата

    TIMESTAMP
        ↓
    дата + час

    TIMESTAMPTZ
        ↓
    момент часу з timezone semantics

Практичний приклад:

    birthday DATE

    opening_time TIMESTAMP

    created_at TIMESTAMPTZ

---

# 89. INTERVAL vs INTEGER

Не потрібно зберігати:

    duration = 3600

якщо значення логічно є часовим інтервалом.

Можна:

    duration INTERVAL

Наприклад:

    INTERVAL '1 hour'

Це робить модель даних зрозумілішою.

---

# 90. Спеціальні типи та backend

У Nest.js спеціальні PostgreSQL типи потрібно правильно відобразити на application-рівні.

Наприклад:

    PostgreSQL
        UUID
        ARRAY
        JSONB
        TIMESTAMPTZ
        INET

        ↓

    Node.js / Nest.js

        ↓

    TypeScript

Потрібно розуміти, як ORM або database driver перетворює ці значення.

---

# 91. ARRAY та TypeScript

PostgreSQL:

    skills TEXT[]

TypeScript:

    type Developer = {
        skills: string[];
    };

Це природне відображення.

---

# 92. UUID та TypeScript

PostgreSQL:

    id UUID

TypeScript:

    id: string;

UUID є спеціальним типом PostgreSQL, але в JavaScript зазвичай приходить як `string`.

---

# 93. JSONB та TypeScript

PostgreSQL:

    metadata JSONB

TypeScript може мати:

    type Metadata = {
        brand: string;
        ram: number;
    };

Але PostgreSQL не знає про цей TypeScript type.

Тому validation залишається важливою частиною backend.

---

# 94. TIMESTAMPTZ та JavaScript

PostgreSQL:

    created_at TIMESTAMPTZ

JavaScript:

    Date

або ISO string через API:

    "2026-09-10T12:30:00.000Z"

Потрібно чітко розуміти timezone під час передачі даних через API.

---

# 95. Практика 1 — ARRAY

Створіть:

    CREATE TABLE array_practice (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        tags TEXT[]
    );

Додайте 3 записи.

---

# 96. Практика 2 — ARRAY пошук

Знайдіть усі записи, які мають:

    'postgresql'

у `tags`.

Використайте:

    ANY

---

# 97. Практика 3 — ARRAY functions

Попрактикуйте:

    array_length()
    cardinality()
    array_remove()
    array_replace()
    unnest()
    array_agg()

---

# 98. Практика 4 — UUID

Створіть:

    CREATE TABLE uuid_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL
    );

Додайте 5 користувачів.

Перевірте їхні UUID.

---

# 99. Практика 5 — ENUM

Створіть:

    user_status

зі значеннями:

    active
    blocked
    pending

Створіть таблицю та спробуйте вставити неправильне значення.

---

# 100. Практика 6 — DATE та TIMESTAMPTZ

Створіть таблицю:

    events

з:

    event_date DATE
    created_at TIMESTAMPTZ

Задайте `created_at`:

    DEFAULT CURRENT_TIMESTAMP

---

# 101. Практика 7 — INTERVAL

Виконайте:

    SELECT CURRENT_TIMESTAMP + INTERVAL '7 days';

Потім:

    SELECT CURRENT_TIMESTAMP - INTERVAL '2 hours';

Потім спробуйте власні інтервали.

---

# 102. Практика 8 — INET

Створіть:

    CREATE TABLE ip_addresses (
        id SERIAL PRIMARY KEY,
        ip INET NOT NULL
    );

Додайте IPv4 та IPv6.

---

# 103. Практика 9 — CIDR

Створіть кілька мереж:

    192.168.1.0/24
    10.0.0.0/8

Перевірте, чи входить певний IP у мережу.

---

# 104. Практика 10 — Range

Створіть:

    reservations

з:

    room_id
    period TSTZRANGE

Додайте декілька часових періодів.

Потім знайдіть періоди, які перетинаються.

---

# 105. Практика 11 — Generated Column

Створіть:

    products

з:

    price
    quantity
    total

де:

    total = price * quantity

має бути generated column.

---

# 106. Практика 12 — Full Stack

Створіть невеликий backend:

    Nest.js
        ↓
    PostgreSQL

таблиця:

    developers

поля:

    id UUID
    name TEXT
    skills TEXT[]
    status ENUM
    metadata JSONB
    created_at TIMESTAMPTZ

Frontend повинен отримувати:

    {
      "id": "...",
      "name": "Valeriy",
      "skills": [
        "JavaScript",
        "React",
        "PostgreSQL"
      ],
      "status": "active",
      "metadata": {
        "experience": "junior"
      },
      "created_at": "..."
    }

Це вже хороша вправа на реальний Full Stack data flow.

---

# 107. Типові помилки

## Помилка 1 — ARRAY замість таблиці

Не потрібно зберігати великі реляційні структури в одному ARRAY.

---

## Помилка 2 — плутати індексацію

PostgreSQL ARRAY:

    [1]

JavaScript:

    [0]

---

## Помилка 3 — UUID всюди

UUID не є автоматично кращим за integer.

---

## Помилка 4 — ENUM для даних, які часто змінюються

Якщо список значень є динамічним, lookup table може бути кращою.

---

## Помилка 5 — TIMESTAMP без розуміння timezone

Для глобального backend потрібно чітко розуміти різницю:

    TIMESTAMP

і:

    TIMESTAMPTZ

---

## Помилка 6 — зберігати IP як TEXT

Якщо дані справді є IP-адресами, `INET` часто кращий за:

    TEXT

тому що PostgreSQL розуміє мережеву семантику.

---

## Помилка 7 — зберігати діапазон як два непов'язані TEXT

Для часових/числових діапазонів PostgreSQL має спеціальні range types.

---

# 108. Junior — що потрібно знати

Обов'язково:

    ARRAY
    UUID
    ENUM
    DATE
    TIMESTAMP
    TIMESTAMPTZ
    INTERVAL
    INET
    CIDR
    RANGE

Також:

    ARRAY operators
    unnest()
    array_agg()
    gen_random_uuid()
    CURRENT_TIMESTAMP

---

# 109. Middle — що потрібно знати

Додатково:

    multidimensional arrays
    array functions
    range operators
    range constraints
    exclusion constraints
    timezone handling
    generated columns
    custom types
    domains
    composite types

---

# 110. Advanced

На advanced-рівні:

- складні range-моделі;
- `EXCLUDE USING GIST`;
- custom types;
- domains;
- composite types;
- timezone architecture;
- distributed UUID design;
- спеціалізовані індекси;
- оптимізація ARRAY;
- нормалізація vs ARRAY;
- нормалізація vs JSONB;
- складні PostgreSQL-specific data models.

---

# 111. Контрольні питання

1. Що таке ARRAY?
2. Які типи можуть бути елементами ARRAY?
3. З якого індексу починається PostgreSQL ARRAY?
4. Чим PostgreSQL ARRAY відрізняється від JavaScript Array?
5. Для чого потрібен `ANY`?
6. Для чого потрібен `@>`?
7. Що робить `unnest()`?
8. Що робить `array_agg()`?
9. Коли ARRAY краще за окрему таблицю?
10. Коли ARRAY гірший за окрему таблицю?
11. Що таке UUID?
12. Як PostgreSQL генерує UUID?
13. Чим UUID відрізняється від SERIAL?
14. Що таке ENUM?
15. Коли краще ENUM, а коли lookup table?
16. Чим `DATE` відрізняється від `TIMESTAMP`?
17. Чим `TIMESTAMP` відрізняється від `TIMESTAMPTZ`?
18. Для чого потрібен `INTERVAL`?
19. Для чого потрібен `INET`?
20. Чим `INET` відрізняється від `CIDR`?
21. Що таке Range type?
22. Для чого потрібен `TSTZRANGE`?
23. Що робить оператор `&&`?
24. Для чого потрібні exclusion constraints?
25. Що таке generated column?

---

# 112. Головна шпаргалка

    -- ARRAY
    skills TEXT[]

    -- створення ARRAY
    ARRAY['JavaScript', 'React', 'PostgreSQL']

    -- перший елемент
    skills[1]

    -- частина ARRAY
    skills[1:2]

    -- пошук
    'React' = ANY(skills)

    -- containment
    skills @> ARRAY['React']

    -- перетин
    skills && ARRAY['React', 'Vue']

    -- видалити елемент
    array_remove(skills, 'React')

    -- замінити елемент
    array_replace(skills, 'React', 'Next.js')

    -- довжина
    array_length(skills, 1)

    -- кількість елементів
    cardinality(skills)

    -- ARRAY → rows
    unnest(skills)

    -- rows → ARRAY
    array_agg(name)

    -- UUID
    id UUID DEFAULT gen_random_uuid()

    -- ENUM
    CREATE TYPE status AS ENUM (
        'active',
        'blocked'
    );

    -- DATE
    birthday DATE

    -- timestamp
    created_at TIMESTAMP

    -- timestamp with timezone
    created_at TIMESTAMPTZ

    -- current time
    CURRENT_TIMESTAMP

    -- interval
    INTERVAL '7 days'

    -- IP
    ip INET

    -- network
    network CIDR

    -- date range
    period DATERANGE

    -- timestamp range
    period TSTZRANGE

    -- generated column
    total NUMERIC
        GENERATED ALWAYS AS (price * quantity) STORED

---

# 113. Головна ментальна модель

Запам'ятайте:

    ARRAY
        ↓
    список однотипних значень

    UUID
        ↓
    глобально унікальний ідентифікатор

    ENUM
        ↓
    стабільний обмежений набір значень

    DATE
        ↓
    календарна дата

    TIMESTAMP
        ↓
    дата + час

    TIMESTAMPTZ
        ↓
    момент часу

    INTERVAL
        ↓
    тривалість / проміжок

    INET
        ↓
    IP-адреса

    CIDR
        ↓
    мережа

    RANGE
        ↓
    діапазон

    JSONB
        ↓
    гнучка структурована інформація

    TABLE + FOREIGN KEY
        ↓
    повноцінні реляційні дані

---

# 114. Найважливіший архітектурний принцип

PostgreSQL має дуже багато типів.

Але хороший програміст не намагається використати всі спеціальні можливості.

Він спочатку визначає:

    Яка природа даних?

Потім:

    Як ці дані будуть використовуватися?

І тільки після цього:

    Який PostgreSQL type найкраще це описує?

Наприклад:

    кількість
        → INTEGER

    гроші
        → NUMERIC

    дата народження
        → DATE

    момент створення запису
        → TIMESTAMPTZ

    список tags
        → ARRAY

    глобальний ID
        → UUID

    стабільний status
        → ENUM / CHECK

    IP
        → INET

    мережа
        → CIDR

    період бронювання
        → TSTZRANGE

    гнучкі metadata
        → JSONB

    пов'язаний набір сутностей
        → окремі таблиці + FOREIGN KEY

---

# 115. Підсумок

Після `21-arrays-and-special-types` потрібно вміти:

- створювати ARRAY;
- вставляти ARRAY;
- читати елементи ARRAY;
- змінювати елементи ARRAY;
- додавати та видаляти елементи;
- використовувати `ANY`;
- використовувати `@>`;
- використовувати `&&`;
- використовувати `unnest()`;
- використовувати `array_agg()`;
- розуміти багатовимірні ARRAY;
- розуміти ARRAY vs таблиця;
- створювати UUID;
- використовувати `gen_random_uuid()`;
- розуміти UUID vs SERIAL;
- створювати ENUM;
- розуміти ENUM vs CHECK;
- розуміти ENUM vs lookup table;
- працювати з DATE;
- працювати з TIMESTAMP;
- працювати з TIMESTAMPTZ;
- працювати з INTERVAL;
- розуміти timezone;
- працювати з INET;
- працювати з CIDR;
- розуміти Range types;
- працювати з `DATERANGE`;
- працювати з `TSTZRANGE`;
- розуміти range operators;
- знати про exclusion constraints;
- знати generated columns;
- розуміти PostgreSQL-specific types у Full Stack.

Головне:

    Не вибирай тип тому,
    що він "просунутий".

    Вибирай тип,
    який найточніше описує природу даних
    і спосіб їх використання.

    PostgreSQL
        ↓
    правильний data type
        ↓
    правильна структура
        ↓
    constraints
        ↓
    indexes
        ↓
    правильні queries
        ↓
    надійний backend
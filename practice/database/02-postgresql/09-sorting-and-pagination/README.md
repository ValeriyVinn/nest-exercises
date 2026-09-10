# 09. Sorting and Pagination

Sorting and pagination — це механізми PostgreSQL, які дозволяють:

- впорядковувати результати запиту;
- сортувати за одним або кількома стовпцями;
- визначати напрямок сортування;
- працювати з `NULL`;
- обмежувати кількість отриманих рядків;
- пропускати певну кількість рядків;
- реалізовувати pagination для API;
- створювати стабільний порядок результатів;
- використовувати keyset/cursor pagination;
- уникати проблем великих `OFFSET`.

Основні SQL-конструкції:

    ORDER BY
    ASC
    DESC
    NULLS FIRST
    NULLS LAST
    LIMIT
    OFFSET

Для PostgreSQL та backend-розробки особливо важливо розуміти різницю між:

    LIMIT / OFFSET pagination
    keyset pagination
    cursor pagination

---

### Ключові поняття

✔ sorting  
✔ ordering  
✔ `ORDER BY`  
✔ `ASC`  
✔ `DESC`  
✔ multiple-column sorting  
✔ sort priority  
✔ `NULL`  
✔ `NULLS FIRST`  
✔ `NULLS LAST`  
✔ `LIMIT`  
✔ `OFFSET`  
✔ pagination  
✔ page size  
✔ page number  
✔ offset pagination  
✔ keyset pagination  
✔ cursor pagination  
✔ stable ordering  
✔ deterministic ordering  
✔ tie-breaker  
✔ performance  
✔ index  
✔ large offset  

---

# Що потрібно пам'ятати

• `ORDER BY` визначає порядок рядків у результаті.

• `ASC` сортує за зростанням.

• `DESC` сортує за спаданням.

• Якщо напрямок не вказано, за замовчуванням використовується `ASC`.

• `ORDER BY` може сортувати за кількома стовпцями.

• Порядок стовпців в `ORDER BY` визначає пріоритет сортування.

• Якщо два рядки мають однакове значення першого поля, PostgreSQL використовує наступне поле для сортування.

• Для стабільного pagination бажано мати унікальний tie-breaker, наприклад `id`.

• `LIMIT` обмежує кількість рядків.

• `OFFSET` пропускає певну кількість рядків.

• `LIMIT + OFFSET` — простий спосіб реалізувати pagination.

• Великий `OFFSET` може бути повільним, оскільки PostgreSQL повинен пропустити попередні рядки.

• Для великих таблиць часто краще використовувати keyset pagination.

• `NULL` має спеціальні правила сортування.

• `NULLS FIRST` ставить `NULL` на початок.

• `NULLS LAST` ставить `NULL` у кінець.

---

# ORDER BY

`ORDER BY` використовується для сортування результату `SELECT`.

Синтаксис:

    SELECT columns
    FROM table
    ORDER BY column;

Наприклад:

    SELECT id, name, age
    FROM users
    ORDER BY age;

Результат буде відсортований за:

    age ASC

---

# ASC

`ASC` означає:

    ascending

Тобто сортування за зростанням.

Наприклад:

    SELECT id, name, age
    FROM users
    ORDER BY age ASC;

Результат:

    18
    21
    25
    30
    42

`ASC` можна не писати:

    SELECT id, name, age
    FROM users
    ORDER BY age;

Це еквівалентно:

    ORDER BY age ASC

---

# DESC

`DESC` означає:

    descending

Тобто сортування за спаданням.

Наприклад:

    SELECT id, name, age
    FROM users
    ORDER BY age DESC;

Результат:

    42
    30
    25
    21
    18

---

# ASC vs DESC

    ASC
        ↓
    smallest → largest

    DESC
        ↓
    largest → smallest

Наприклад:

    SELECT price
    FROM products
    ORDER BY price ASC;

    10
    20
    50
    100

А:

    SELECT price
    FROM products
    ORDER BY price DESC;

    100
    50
    20
    10

---

# Sorting Text

`ORDER BY` можна використовувати для текстових значень.

Наприклад:

    SELECT name
    FROM users
    ORDER BY name ASC;

Результат буде впорядкований відповідно до правил сортування тексту та collation бази даних.

Наприклад:

    Anna
    Bob
    John
    Maria

Зворотний порядок:

    SELECT name
    FROM users
    ORDER BY name DESC;

---

# Sorting Dates

Дати також можна сортувати.

Наприклад:

    SELECT id, title, created_at
    FROM posts
    ORDER BY created_at ASC;

Отримаємо:

    oldest
        ↓
    newest

Для найновіших записів спочатку:

    SELECT id, title, created_at
    FROM posts
    ORDER BY created_at DESC;

Це дуже поширений шаблон для backend:

    ORDER BY created_at DESC

---

# Sorting by Multiple Columns

`ORDER BY` може містити декілька стовпців.

Синтаксис:

    ORDER BY column1, column2;

Наприклад:

    SELECT id, name, age
    FROM users
    ORDER BY age, name;

Спочатку PostgreSQL сортує за:

    age

Якщо `age` однаковий, сортує за:

    name

---

# Sort Priority

Порядок полів в `ORDER BY` має значення.

Наприклад:

    ORDER BY department, salary DESC;

Логіка:

    1. department ASC
    2. всередині department → salary DESC

Тобто спочатку групуються записи за department, а потім усередині кожної групи зарплата сортується від більшої до меншої.

---

# Different Direction for Different Columns

Для кожного стовпця можна задати власний напрямок.

Наприклад:

    SELECT name, department, salary
    FROM employees
    ORDER BY department ASC, salary DESC;

Логіка:

    department → ASC
    salary     → DESC

---

# Example

Дані:

    name    department    salary
    John    IT             3000
    Anna    HR             2500
    Mike    IT             4000
    Kate    HR             3000

Запит:

    SELECT name, department, salary
    FROM employees
    ORDER BY department ASC, salary DESC;

Результат:

    Anna    HR    3000
    Kate    HR    2500
    Mike    IT    4000
    John    IT    3000

---

# Tie-breaker

Tie-breaker — додаткове поле, яке використовується, коли основне поле має однакові значення.

Наприклад:

    SELECT id, name, created_at
    FROM users
    ORDER BY created_at DESC;

Якщо декілька users мають однаковий `created_at`, їхній взаємний порядок не слід вважати гарантованим.

Для стабільного порядку можна додати `id`:

    SELECT id, name, created_at
    FROM users
    ORDER BY created_at DESC, id DESC;

Тут:

    created_at → основне сортування
    id         → tie-breaker

Це особливо важливо для pagination.

---

# Stable Ordering

Stable ordering — передбачуваний порядок рядків між виконаннями запиту.

Для pagination бажано використовувати детермінований порядок.

Наприклад:

    ORDER BY created_at DESC, id DESC

краще для pagination, ніж:

    ORDER BY created_at DESC

якщо `created_at` не є унікальним.

---

# ORDER BY та SELECT

Стовпець, за яким сортуємо, не обов'язково повинен бути в результаті `SELECT`.

Наприклад:

    SELECT name
    FROM users
    ORDER BY age;

Запит може сортувати за `age`, навіть якщо `age` не повертається в результаті.

---

# ORDER BY Expression

Можна сортувати не тільки за стовпцем, а й за expression.

Наприклад:

    SELECT name, price
    FROM products
    ORDER BY price * 1.2 DESC;

PostgreSQL спочатку обчислює expression:

    price * 1.2

і сортує за отриманим значенням.

---

# ORDER BY Alias

Можна сортувати за alias.

Наприклад:

    SELECT
        name,
        price * quantity AS total
    FROM order_items
    ORDER BY total DESC;

Тут:

    price * quantity → total

а потім:

    ORDER BY total DESC

---

# NULL Values

`NULL` означає відсутнє або невідоме значення.

Наприклад:

    id    name    age
    1     John    25
    2     Anna    NULL
    3     Mike    30

При сортуванні `NULL` має спеціальне положення.

Для PostgreSQL важливо пам'ятати:

    ASC  → NULLS LAST
    DESC → NULLS FIRST

якщо явно не вказано інше.

---

# NULLS FIRST

`NULLS FIRST` ставить `NULL` перед іншими значеннями.

Наприклад:

    SELECT name, age
    FROM users
    ORDER BY age ASC NULLS FIRST;

Результат концептуально:

    Anna    NULL
    John    25
    Mike    30

---

# NULLS LAST

`NULLS LAST` ставить `NULL` після інших значень.

Наприклад:

    SELECT name, age
    FROM users
    ORDER BY age ASC NULLS LAST;

Результат:

    John    25
    Mike    30
    Anna    NULL

---

# NULL Sorting

Можна явно контролювати положення `NULL`.

    ORDER BY age ASC NULLS FIRST

або:

    ORDER BY age ASC NULLS LAST

Для `DESC` також:

    ORDER BY age DESC NULLS FIRST

    ORDER BY age DESC NULLS LAST

Явне зазначення `NULLS FIRST/LAST` часто робить поведінку запиту зрозумілішою.

---

# LIMIT

`LIMIT` обмежує кількість рядків у результаті.

Синтаксис:

    SELECT ...
    FROM ...
    LIMIT number;

Наприклад:

    SELECT *
    FROM users
    LIMIT 10;

Поверне максимум:

    10 rows

---

# LIMIT + ORDER BY

`LIMIT` найчастіше використовується разом з `ORDER BY`.

Наприклад, отримати 10 найдорожчих товарів:

    SELECT id, name, price
    FROM products
    ORDER BY price DESC
    LIMIT 10;

Логіка:

    1. sort by price DESC
    2. take first 10 rows

---

# LIMIT Without ORDER BY

Можна написати:

    SELECT *
    FROM users
    LIMIT 10;

Але не слід трактувати ці 10 рядків як:

    "перші 10"

у стабільному бізнес-сенсі.

Без `ORDER BY` SQL не гарантує певного порядку рядків.

Тому для pagination та "latest/top" запитів використовуйте:

    ORDER BY
    LIMIT

---

# OFFSET

`OFFSET` пропускає певну кількість рядків.

Синтаксис:

    SELECT ...
    FROM ...
    OFFSET number;

Наприклад:

    SELECT *
    FROM users
    OFFSET 10;

PostgreSQL пропустить перші 10 рядків результату.

---

# LIMIT + OFFSET

Найпоширеніша форма pagination:

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 10
    OFFSET 20;

Логіка:

    ORDER BY id
        ↓
    skip 20
        ↓
    take 10

Тобто:

    LIMIT 10
    OFFSET 20

означає:

    пропустити 20
    повернути наступні 10

---

# Pagination

Pagination — розбиття великого набору даних на окремі сторінки.

Наприклад:

    page 1
    page 2
    page 3
    ...

Нехай:

    pageSize = 10

Тоді:

    page 1 → OFFSET 0
    page 2 → OFFSET 10
    page 3 → OFFSET 20
    page 4 → OFFSET 30

---

# Формула OFFSET

Для:

    page
    pageSize

формула:

    OFFSET = (page - 1) * pageSize

Наприклад:

    page = 3
    pageSize = 10

Тоді:

    OFFSET = (3 - 1) * 10
           = 20

SQL:

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 10
    OFFSET 20;

---

# Pagination Example

Сторінка 1:

    SELECT *
    FROM products
    ORDER BY id
    LIMIT 10
    OFFSET 0;

Сторінка 2:

    SELECT *
    FROM products
    ORDER BY id
    LIMIT 10
    OFFSET 10;

Сторінка 3:

    SELECT *
    FROM products
    ORDER BY id
    LIMIT 10
    OFFSET 20;

---

# Pagination Parameters

У backend/API pagination часто передають:

    page
    limit

Наприклад:

    GET /users?page=3&limit=10

Backend обчислює:

    offset = (page - 1) * limit

і виконує:

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 10
    OFFSET 20;

---

# Page Size

Page size — кількість записів на одній сторінці.

Наприклад:

    limit = 20

означає:

    максимум 20 rows per page

Не слід безконтрольно дозволяти клієнту передавати дуже великий `limit`.

Наприклад, backend може встановити:

    default limit = 20
    max limit = 100

---

# LIMIT як API Safety

Запит:

    SELECT *
    FROM users;

може повернути дуже багато даних.

У backend часто краще:

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 50;

А ще краще — реалізувати повноцінну pagination.

---

# Pagination + Filtering

Pagination часто комбінується з `WHERE`.

Наприклад:

    SELECT id, name, price
    FROM products
    WHERE price > 100
    ORDER BY price DESC, id DESC
    LIMIT 20
    OFFSET 40;

Логіка:

    WHERE
      ↓
    ORDER BY
      ↓
    OFFSET
      ↓
    LIMIT

Концептуально результат спочатку фільтрується, потім впорядковується, після чого вибирається потрібний фрагмент.

---

# Pagination + JOIN

Pagination також використовується разом із `JOIN`.

Наприклад:

    SELECT
        orders.id,
        users.name,
        orders.total
    FROM orders
    JOIN users
        ON users.id = orders.user_id
    ORDER BY orders.created_at DESC, orders.id DESC
    LIMIT 20
    OFFSET 40;

---

# Pagination + Search

Наприклад:

    SELECT id, name
    FROM products
    WHERE name ILIKE '%phone%'
    ORDER BY name ASC, id ASC
    LIMIT 20
    OFFSET 0;

Це типовий backend-сценарій:

    search
        ↓
    filter
        ↓
    sort
        ↓
    pagination

---

# Pagination + Total Count

API часто має повертати не тільки поточну сторінку, але й інформацію про кількість записів.

Наприклад:

    SELECT COUNT(*)
    FROM users;

Окремо:

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 20
    OFFSET 40;

API може повернути:

    {
        "data": [...],
        "page": 3,
        "limit": 20,
        "total": 157
    }

---

# COUNT(*) + Pagination

Для отримання загальної кількості:

    SELECT COUNT(*)
    FROM products;

Для поточної сторінки:

    SELECT *
    FROM products
    ORDER BY id
    LIMIT 20
    OFFSET 40;

Це простий підхід, але `COUNT(*)` на великих або складно відфільтрованих наборах теж може бути додатковою роботою.

---

# Pagination Order

Для pagination дуже важливий `ORDER BY`.

Не варто робити:

    SELECT *
    FROM users
    LIMIT 10
    OFFSET 20;

Краще:

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 10
    OFFSET 20;

Ще краще, якщо потрібен стабільний порядок:

    SELECT *
    FROM users
    ORDER BY created_at DESC, id DESC
    LIMIT 10
    OFFSET 20;

---

# Чому OFFSET може бути повільним

Уявімо:

    OFFSET 1,000,000
    LIMIT 20

PostgreSQL має пройти через значну кількість попередніх рядків, щоб дістатися потрібної позиції.

Тобто:

    OFFSET 0
        ↓
    швидко

    OFFSET 10,000
        ↓
    більше роботи

    OFFSET 1,000,000
        ↓
    потенційно значно більше роботи

Тому `OFFSET` добре підходить для простих pagination-сценаріїв, але може бути невдалим для дуже великих таблиць.

---

# Offset Pagination

Offset pagination використовує:

    LIMIT
    OFFSET

Наприклад:

    SELECT id, name
    FROM users
    ORDER BY id
    LIMIT 20
    OFFSET 100;

Переваги:

    простий
    зрозумілий
    легко реалізувати
    легко перейти на page numbers
    зручно для невеликих та середніх наборів

Недоліки:

    великий OFFSET може бути дорогим
    зміни даних можуть впливати на сторінки
    можливі пропуски або дублікати між запитами

---

# Keyset Pagination

Keyset pagination використовує значення останнього отриманого запису замість `OFFSET`.

Наприклад, якщо ми сортуємо:

    ORDER BY id ASC

і останній отриманий `id`:

    20

наступна сторінка:

    SELECT *
    FROM users
    WHERE id > 20
    ORDER BY id ASC
    LIMIT 20;

Замість:

    OFFSET 20

ми говоримо:

    WHERE id > 20

---

# Keyset Pagination Example

Перша сторінка:

    SELECT id, name
    FROM users
    ORDER BY id ASC
    LIMIT 20;

Припустимо, останній:

    id = 20

Наступна сторінка:

    SELECT id, name
    FROM users
    WHERE id > 20
    ORDER BY id ASC
    LIMIT 20;

Якщо останній:

    id = 40

наступний запит:

    SELECT id, name
    FROM users
    WHERE id > 40
    ORDER BY id ASC
    LIMIT 20;

---

# Keyset Pagination DESC

Для сортування за спаданням:

    ORDER BY id DESC

потрібно рухатися до менших значень.

Наприклад:

    SELECT id, name
    FROM users
    ORDER BY id DESC
    LIMIT 20;

Якщо останній отриманий `id`:

    81

Наступна сторінка:

    SELECT id, name
    FROM users
    WHERE id < 81
    ORDER BY id DESC
    LIMIT 20;

---

# Keyset Pagination vs OFFSET

Offset:

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 20
    OFFSET 100000;

Keyset:

    SELECT *
    FROM users
    WHERE id > 100000
    ORDER BY id
    LIMIT 20;

Keyset може бути значно ефективнішим на великих таблицях, особливо коли умова добре підтримується індексом.

---

# Keyset Pagination with created_at

На практиці часто сортують не тільки за `id`, а за датою.

Наприклад:

    ORDER BY created_at DESC, id DESC

Проблема:

    created_at

може бути однаковим у декількох записів.

Тому додаємо:

    id

як tie-breaker.

---

# Keyset Pagination with Two Columns

Нехай останній запис попередньої сторінки має:

    created_at = '2026-09-10 12:00:00'
    id = 150

Наступна сторінка:

    SELECT id, created_at, name
    FROM users
    WHERE
        created_at < '2026-09-10 12:00:00'
        OR (
            created_at = '2026-09-10 12:00:00'
            AND id < 150
        )
    ORDER BY created_at DESC, id DESC
    LIMIT 20;

Це класичний keyset pagination pattern.

---

# Why Tie-breaker Matters

Припустимо:

    created_at

однаковий:

    12:00
    12:00
    12:00
    12:00

Якщо використовувати тільки:

    ORDER BY created_at DESC

важко однозначно визначити позицію наступної сторінки.

Додавання:

    id

робить порядок детермінованим:

    ORDER BY created_at DESC, id DESC

---

# Cursor Pagination

Cursor pagination — API-підхід, який часто базується на keyset pagination.

Замість:

    page=3

клієнт може передати:

    cursor=...

Cursor може містити інформацію про останній отриманий запис.

Наприклад, концептуально:

    {
        "createdAt": "2026-09-10T12:00:00Z",
        "id": 150
    }

Backend використовує ці значення для наступного SQL-запиту.

---

# Cursor Example

Перша відповідь API:

    {
        "data": [...],
        "nextCursor": "..."
    }

Наступний запит:

    GET /users?cursor=...

Backend декодує cursor і формує:

    WHERE created_at < ...
       OR (
            created_at = ...
            AND id < ...
       )

ORDER BY:

    created_at DESC, id DESC

і:

    LIMIT 20

---

# Offset vs Cursor

Offset pagination:

    page=3
    limit=20

SQL:

    LIMIT 20
    OFFSET 40

Cursor/keyset pagination:

    cursor=...

SQL:

    WHERE id < last_id
    ORDER BY id DESC
    LIMIT 20

---

# Коли використовувати OFFSET

`LIMIT + OFFSET` добре підходить, коли:

    таблиця невелика
    потрібні page numbers
    потрібен простий CRUD API
    користувач може перейти на сторінку 10
    pagination не є критичною для performance

Наприклад:

    admin dashboard
    small catalog
    simple back-office application

---

# Коли використовувати Keyset

Keyset pagination особливо корисна, коли:

    таблиця дуже велика
    багато сторінок
    потрібна хороша performance
    користувач переважно рухається next/previous
    дані часто змінюються
    використовується infinite scroll

Наприклад:

    social feed
    messages
    notifications
    activity feed
    large product catalog
    logs

---

# Pagination та Concurrent Changes

Pagination через `OFFSET` може мати проблеми, якщо між запитами дані змінюються.

Наприклад:

Перша сторінка:

    rows 1–20

Між запитами додається новий рядок на початку.

Тепер:

    rows 1–20
    стали іншими

Запит:

    OFFSET 20

може призвести до:

    duplicate rows

або:

    skipped rows

Keyset pagination часто краще поводиться в таких сценаріях, оскільки продовжує рух від конкретного значення ключа.

---

# LIMIT та OFFSET Order

SQL-запит:

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 10
    OFFSET 20;

Логічно:

    ORDER BY
        ↓
    OFFSET
        ↓
    LIMIT

Тобто:

    1. визначити порядок
    2. пропустити 20
    3. взяти 10

---

# LIMIT ALL

У PostgreSQL існує:

    LIMIT ALL

Це означає:

    не обмежувати кількість рядків

Наприклад:

    SELECT *
    FROM users
    LIMIT ALL;

Практично в повсякденному SQL використовується рідко.

---

# OFFSET 0

`OFFSET 0` означає:

    не пропускати рядки

Наприклад:

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 20
    OFFSET 0;

Це фактично перша сторінка.

---

# FETCH FIRST

SQL також підтримує стандартний синтаксис:

    FETCH FIRST 10 ROWS ONLY

Наприклад:

    SELECT *
    FROM users
    ORDER BY id
    FETCH FIRST 10 ROWS ONLY;

У PostgreSQL це альтернатива:

    LIMIT 10

Для повсякденної PostgreSQL-практики `LIMIT` зазвичай простіший і звичніший.

---

# OFFSET with FETCH

Можна використовувати:

    SELECT *
    FROM users
    ORDER BY id
    OFFSET 20
    FETCH FIRST 10 ROWS ONLY;

Це аналог:

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 10
    OFFSET 20;

---

# Sorting by Column Position

PostgreSQL дозволяє використовувати номер стовпця в `ORDER BY`.

Наприклад:

    SELECT id, name, age
    FROM users
    ORDER BY 3 DESC;

Тут:

    3 → age

тобто:

    ORDER BY age DESC

Але в production-коді часто краще явно писати:

    ORDER BY age DESC

так код зрозуміліший і менш крихкий при зміні `SELECT`.

---

# Sorting by Alias vs Position

Alias:

    SELECT
        name,
        price * quantity AS total
    FROM order_items
    ORDER BY total DESC;

Position:

    SELECT
        name,
        price * quantity AS total
    FROM order_items
    ORDER BY 2 DESC;

Перший варіант зазвичай читабельніший.

---

# Sorting with CASE

`ORDER BY` може містити `CASE`.

Наприклад:

    SELECT id, name, status
    FROM orders
    ORDER BY
        CASE status
            WHEN 'urgent' THEN 1
            WHEN 'pending' THEN 2
            WHEN 'completed' THEN 3
            ELSE 4
        END;

Тут ми створюємо власний порядок:

    urgent
    pending
    completed
    other

---

# Custom Sorting

Іноді бізнес-логіка потребує не алфавітного порядку.

Наприклад:

    status

має:

    pending
    active
    completed

Але потрібно:

    active
    pending
    completed

Можна використати:

    ORDER BY
        CASE status
            WHEN 'active' THEN 1
            WHEN 'pending' THEN 2
            WHEN 'completed' THEN 3
        END;

---

# Sorting Boolean

Boolean також можна використовувати в `ORDER BY`.

Наприклад:

    SELECT id, name, is_active
    FROM users
    ORDER BY is_active DESC;

Це дозволяє розташувати:

    true
    false

у такому порядку.

---

# Sorting by Calculated Value

Наприклад:

    SELECT
        name,
        price,
        quantity,
        price * quantity AS total
    FROM products
    ORDER BY total DESC;

Можна сортувати за обчисленим результатом.

---

# Sorting Randomly

PostgreSQL дозволяє:

    ORDER BY random();

Наприклад:

    SELECT *
    FROM users
    ORDER BY random()
    LIMIT 5;

Це може використовуватися для випадкового вибору записів.

Але:

    ORDER BY random()

може бути дорогим для великих таблиць.

Для великих таблиць не слід бездумно використовувати його як спосіб випадкової вибірки.

---

# ORDER BY and Indexes

Сортування може бути пов'язане з індексами.

Наприклад:

    CREATE INDEX idx_users_created_at
    ON users (created_at);

Запит:

    SELECT *
    FROM users
    ORDER BY created_at DESC
    LIMIT 20;

може скористатися відповідним індексом залежно від структури запиту та плану виконання.

PostgreSQL сам вирішує, який execution plan є вигіднішим.

Перевірити це можна через:

    EXPLAIN

або:

    EXPLAIN ANALYZE

---

# Index for Keyset Pagination

Keyset pagination особливо добре поєднується з індексами.

Наприклад:

    CREATE INDEX idx_users_id
    ON users (id);

Запит:

    SELECT id, name
    FROM users
    WHERE id > 100000
    ORDER BY id
    LIMIT 20;

Індекс може дозволити PostgreSQL швидко перейти до потрібної позиції замість проходження великого OFFSET.

---

# Composite Index and Pagination

Для:

    ORDER BY created_at DESC, id DESC

може бути корисним composite index:

    CREATE INDEX idx_users_created_id
    ON users (created_at DESC, id DESC);

Наприклад:

    SELECT id, name, created_at
    FROM users
    WHERE
        created_at < '2026-09-10 12:00:00'
        OR (
            created_at = '2026-09-10 12:00:00'
            AND id < 150
        )
    ORDER BY created_at DESC, id DESC
    LIMIT 20;

Конкретний execution plan потрібно перевіряти через:

    EXPLAIN ANALYZE

---

# LIMIT + OFFSET vs Keyset

### Offset

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 20
    OFFSET 100000;

### Keyset

    SELECT *
    FROM users
    WHERE id > 100000
    ORDER BY id
    LIMIT 20;

Основна ідея:

    OFFSET
        → skip rows

    Keyset
        → seek to position

---

# Seek Pagination

Keyset pagination також називають:

    seek pagination

Ідея:

    не рахувати, скільки рядків пропустити

а:

    знайти наступні рядки після конкретного значення

Наприклад:

    WHERE id > 100

або:

    WHERE id < 100

---

# Next Page / Previous Page

Для ascending:

    ORDER BY id ASC

наступна сторінка:

    WHERE id > last_id

Для descending:

    ORDER BY id DESC

наступна сторінка:

    WHERE id < last_id

---

# Pagination Direction

Ascending:

    ORDER BY id ASC

    WHERE id > last_id

Descending:

    ORDER BY id DESC

    WHERE id < last_id

Головне правило:

    WHERE condition

повинна відповідати напрямку сортування.

---

# Practical Pagination Pattern

Для простого API:

    SELECT
        id,
        name,
        created_at
    FROM users
    ORDER BY created_at DESC, id DESC
    LIMIT 20
    OFFSET 0;

Для наступної сторінки:

    SELECT
        id,
        name,
        created_at
    FROM users
    ORDER BY created_at DESC, id DESC
    LIMIT 20
    OFFSET 20;

---

# Practical Keyset Pattern

Перша сторінка:

    SELECT
        id,
        name,
        created_at
    FROM users
    ORDER BY created_at DESC, id DESC
    LIMIT 20;

Наступна:

    SELECT
        id,
        name,
        created_at
    FROM users
    WHERE
        created_at < $1
        OR (
            created_at = $1
            AND id < $2
        )
    ORDER BY created_at DESC, id DESC
    LIMIT 20;

У backend:

    $1 → last created_at
    $2 → last id

Це вже типовий SQL-патерн для production API.

---

# Pagination Parameters in Backend

Наприклад:

    GET /products?page=2&limit=20

Backend:

    page = 2
    limit = 20

Обчислює:

    offset = (page - 1) * limit
           = 20

SQL:

    SELECT *
    FROM products
    ORDER BY id
    LIMIT 20
    OFFSET 20;

---

# Validate Pagination Parameters

Backend не повинен сліпо приймати:

    page
    limit

Наприклад:

    page = -100
    limit = 1000000000

Краще встановити правила:

    page >= 1
    limit >= 1
    limit <= 100

Наприклад:

    default limit = 20
    maximum limit = 100

---

# Practical API Response

Наприклад:

    {
        "data": [
            ...
        ],
        "pagination": {
            "page": 2,
            "limit": 20,
            "total": 157,
            "totalPages": 8
        }
    }

Формула:

    totalPages = Math.ceil(total / limit)

Це вже backend-логіка, але вона безпосередньо пов'язана з SQL pagination.

---

# Sorting Parameters in API

Backend може дозволяти:

    GET /users?sort=name&order=asc

або:

    GET /users?sort=created_at&order=desc

Але не слід безпосередньо вставляти довільний user input у SQL.

Небезпечно концептуально:

    ORDER BY ${sort}

Краще використовувати whitelist дозволених полів:

    id
    name
    created_at

і перетворювати input на безпечний SQL fragment.

---

# SQL Injection and ORDER BY

Значення параметрів можна передавати через prepared statements:

    WHERE id = $1

Але назву стовпця не можна просто передати як:

    ORDER BY $1

у тому сенсі, що параметр не підміняє SQL identifier.

Тому для dynamic sorting backend зазвичай використовує whitelist.

Наприклад:

    name
    created_at
    price

перетворюються backend-кодом на дозволені SQL identifiers.

---

# Sorting + Filtering + Pagination

Типовий backend-запит:

    SELECT
        id,
        name,
        price,
        created_at
    FROM products
    WHERE price >= $1
    ORDER BY created_at DESC, id DESC
    LIMIT $2
    OFFSET $3;

Тут:

    WHERE
        → filtering

    ORDER BY
        → sorting

    LIMIT
        → page size

    OFFSET
        → page position

Це один із базових шаблонів CRUD API.

---

# Логічний порядок SQL

Корисно розуміти логічний порядок обробки:

    FROM
      ↓
    JOIN
      ↓
    WHERE
      ↓
    GROUP BY
      ↓
    HAVING
      ↓
    SELECT
      ↓
    DISTINCT
      ↓
    ORDER BY
      ↓
    LIMIT / OFFSET

Для цього розділу особливо важливо:

    WHERE
      ↓
    ORDER BY
      ↓
    OFFSET
      ↓
    LIMIT

---

# Common Sorting Patterns

## Latest records

    SELECT *
    FROM posts
    ORDER BY created_at DESC
    LIMIT 20;

---

## Oldest records

    SELECT *
    FROM posts
    ORDER BY created_at ASC
    LIMIT 20;

---

## Highest price

    SELECT *
    FROM products
    ORDER BY price DESC
    LIMIT 10;

---

## Lowest price

    SELECT *
    FROM products
    ORDER BY price ASC
    LIMIT 10;

---

## Alphabetical order

    SELECT *
    FROM users
    ORDER BY name ASC;

---

## Reverse alphabetical order

    SELECT *
    FROM users
    ORDER BY name DESC;

---

## Latest with tie-breaker

    SELECT *
    FROM posts
    ORDER BY created_at DESC, id DESC
    LIMIT 20;

---

## First page

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 20
    OFFSET 0;

---

## Second page

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 20
    OFFSET 20;

---

## Third page

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 20
    OFFSET 40;

---

# Common Mistakes

❌ Забувати `ORDER BY` при pagination.

Наприклад:

    SELECT *
    FROM users
    LIMIT 20
    OFFSET 20;

Краще:

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 20
    OFFSET 20;

---

❌ Вважати порядок без `ORDER BY` гарантованим.

Наприклад:

    SELECT *
    FROM users;

Не слід очікувати:

    id 1
    id 2
    id 3
    ...

SQL не гарантує такий порядок без `ORDER BY`.

---

❌ Плутати `ASC` та `DESC`.

    ASC  → smallest → largest
    DESC → largest → smallest

---

❌ Неправильно розраховувати `OFFSET`.

Правильно:

    OFFSET = (page - 1) * pageSize

---

❌ Використовувати:

    page = 0

якщо API очікує сторінки від 1.

Зазвичай:

    page >= 1

---

❌ Дозволяти необмежений `limit`.

Небезпечно:

    limit = 1000000

Краще встановити maximum.

---

❌ Використовувати великий `OFFSET` на дуже великих таблицях без аналізу performance.

Наприклад:

    OFFSET 1000000

може бути дорогим.

---

❌ Забувати tie-breaker.

Наприклад:

    ORDER BY created_at DESC

Якщо `created_at` не унікальний, pagination може бути нестабільною.

Краще:

    ORDER BY created_at DESC, id DESC

---

❌ Використовувати `for...in`-подібну логіку в SQL-мисленні.

SQL працює з набором рядків, а не з процедурним проходженням кожного рядка вручну.

---

❌ Використовувати `ORDER BY random()` для великих таблиць без розуміння вартості.

---

❌ Думати, що наявність індексу автоматично гарантує швидкий запит.

Потрібно перевіряти execution plan:

    EXPLAIN ANALYZE

---

# Offset Pagination vs Keyset Pagination

| Характеристика | OFFSET | Keyset |
|---|---|---|
| Простота | дуже проста | складніша |
| Page numbers | ✔ | ✖ / не природно |
| Infinite scroll | ✔ | ✔ |
| Великі OFFSET | погано | добре |
| Великі таблиці | може бути повільно | часто краще |
| Stable pagination | залежить від даних | часто краще |
| Cursor API | не типово | природно |
| Реалізація | проста | складніша |
| Index-friendly | залежить | часто дуже добре |

---

# Practical Example — Users

Створимо таблицю:

    CREATE TABLE users (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

---

## Sorting

    SELECT *
    FROM users
    ORDER BY name ASC;

---

## Latest users

    SELECT *
    FROM users
    ORDER BY created_at DESC, id DESC;

---

## First 10

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 10;

---

## Next 10

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 10
    OFFSET 10;

---

## Page 5

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 10
    OFFSET 40;

Формула:

    (5 - 1) * 10 = 40

---

# Practical Example — Products

    SELECT
        id,
        name,
        price
    FROM products
    ORDER BY price DESC, id DESC
    LIMIT 10;

Отримуємо:

    10 найдорожчих products

---

# Practical Example — Orders

Отримати останні замовлення:

    SELECT
        id,
        user_id,
        total,
        created_at
    FROM orders
    ORDER BY created_at DESC, id DESC
    LIMIT 20;

---

# Practical Example — NULL

    SELECT
        id,
        name,
        last_login
    FROM users
    ORDER BY last_login DESC NULLS LAST;

Отримуємо:

    users with latest login
        ↓
    users with older login
        ↓
    users who never logged in

---

# Practical Example — Keyset

Нехай останній запис:

    id = 500

Наступна сторінка:

    SELECT
        id,
        name
    FROM users
    WHERE id < 500
    ORDER BY id DESC
    LIMIT 20;

---

# Practical Example — Keyset with Timestamp

Останній запис:

    created_at = '2026-09-10 10:00:00+03'
    id = 500

Наступна сторінка:

    SELECT
        id,
        name,
        created_at
    FROM users
    WHERE
        created_at < '2026-09-10 10:00:00+03'
        OR (
            created_at = '2026-09-10 10:00:00+03'
            AND id < 500
        )
    ORDER BY created_at DESC, id DESC
    LIMIT 20;

---

# Performance

Для pagination важливо враховувати:

    ORDER BY
    WHERE
    LIMIT
    OFFSET
    indexes
    table size
    execution plan

Наприклад:

    SELECT *
    FROM users
    ORDER BY created_at DESC
    LIMIT 20
    OFFSET 500000;

може вимагати значно більше роботи, ніж:

    SELECT *
    FROM users
    WHERE id > 500000
    ORDER BY id
    LIMIT 20;

Але конкретну різницю потрібно перевіряти на реальних даних.

---

# EXPLAIN

Для аналізу запиту:

    EXPLAIN
    SELECT *
    FROM users
    ORDER BY created_at DESC
    LIMIT 20;

Для фактичного виконання:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    ORDER BY created_at DESC
    LIMIT 20;

`EXPLAIN ANALYZE` показує фактичний execution plan і час виконання.

---

# Sorting and Indexes

Якщо часто виконується:

    ORDER BY created_at DESC

може бути доцільним індекс:

    CREATE INDEX idx_users_created_at
    ON users (created_at DESC);

Але індекси потрібно створювати на основі реальних query patterns.

Не кожен `ORDER BY` автоматично потребує окремого індексу.

---

# Composite Sorting

Якщо часто використовується:

    ORDER BY created_at DESC, id DESC

можна розглядати:

    CREATE INDEX idx_users_created_id
    ON users (created_at DESC, id DESC);

Це особливо цікаво для keyset pagination.

---

# Практична модель

Для простого CRUD:

    WHERE
      ↓
    ORDER BY
      ↓
    LIMIT
      ↓
    OFFSET

Для великої таблиці:

    WHERE
      ↓
    ORDER BY
      ↓
    LIMIT

де `WHERE` використовує позицію останнього запису:

    last_id
    або
    last_created_at + last_id

---

# Interview Questions

Що робить `ORDER BY`?

Що означає `ASC`?

Що означає `DESC`?

Який напрямок сортування використовується за замовчуванням?

Як сортувати за кількома стовпцями?

Що таке sort priority?

Як сортувати один стовпець за `ASC`, а інший за `DESC`?

Що таке tie-breaker?

Чому `id` часто використовують як tie-breaker?

Що таке stable ordering?

Як PostgreSQL сортує `NULL` за замовчуванням?

Що робить `NULLS FIRST`?

Що робить `NULLS LAST`?

Що робить `LIMIT`?

Що робить `OFFSET`?

Як реалізувати pagination через `LIMIT` та `OFFSET`?

Як розрахувати `OFFSET` для певної сторінки?

Що означає:

    LIMIT 20 OFFSET 40

Чому `ORDER BY` важливий для pagination?

Чому не можна покладатися на порядок рядків без `ORDER BY`?

Що таке page size?

Що таке offset pagination?

Які недоліки `OFFSET`?

Чому великий `OFFSET` може бути повільним?

Що таке keyset pagination?

Що таке cursor pagination?

Чим keyset pagination відрізняється від offset pagination?

Коли краще використовувати keyset pagination?

Що таке seek pagination?

Чому `created_at` часто комбінують з `id`?

Як реалізувати keyset pagination для:

    ORDER BY id ASC

Як реалізувати keyset pagination для:

    ORDER BY id DESC

Як реалізувати keyset pagination для:

    ORDER BY created_at DESC, id DESC

Як pagination пов'язана з indexes?

Як перевірити performance pagination query?

Що робить `EXPLAIN`?

Що робить `EXPLAIN ANALYZE`?

Як захистити API від надто великого `limit`?

Як реалізувати dynamic sorting у backend без SQL injection?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке sorting.

Що таке ordering.

`ORDER BY`.

`ASC`.

`DESC`.

Default sorting direction.

Sorting numbers.

Sorting text.

Sorting dates.

Sorting за кількома columns.

Sort priority.

`LIMIT`.

`OFFSET`.

`LIMIT + OFFSET`.

Pagination.

Page.

Page size.

Offset.

Формула:

    OFFSET = (page - 1) * pageSize

`NULL`.

`NULLS FIRST`.

`NULLS LAST`.

`ORDER BY` + `LIMIT`.

`ORDER BY` + `LIMIT` + `OFFSET`.

---

## 🔵 Junior

Multiple-column sorting.

Different sort directions.

Stable ordering.

Tie-breaker.

Pagination у CRUD API.

Pagination parameters:

    page
    limit

Validation:

    page >= 1
    limit >= 1
    limit <= maxLimit

Sorting + filtering.

Sorting + JOIN.

Sorting dates.

Sorting calculated values.

Sorting aliases.

`Object`-подібна ідея тут не застосовується — SQL працює з relational result set.

Розуміння:

    OFFSET pagination
    keyset pagination

Основи:

    EXPLAIN
    EXPLAIN ANALYZE

Розуміння ролі indexes у sorting.

---

## 🟠 Middle

Глибше розуміння pagination.

Offset pagination performance.

Keyset pagination.

Cursor pagination.

Composite keyset pagination.

Tie-breaker.

Concurrent data changes.

Pagination consistency.

Composite indexes.

Index-friendly queries.

Dynamic sorting у backend.

Whitelist для sort fields.

SQL injection у dynamic `ORDER BY`.

Pagination + filtering + sorting.

Pagination + JOIN.

Pagination + aggregation.

Аналіз:

    EXPLAIN ANALYZE

Розуміння execution plans.

---

## 🔴 Senior

Advanced pagination architecture.

Cursor design.

Opaque cursors.

Cursor encoding.

Cursor validation.

Bidirectional cursor pagination.

Forward pagination.

Backward pagination.

Stable pagination under concurrent writes.

Transaction isolation та pagination consistency.

Composite keyset conditions.

Advanced indexing strategies.

Multicolumn indexes.

Index ordering.

Partial indexes.

Covering indexes.

Execution plans.

Sort nodes.

Index Scan.

Index Only Scan.

Incremental Sort.

Top-N optimization.

Large-scale pagination.

Distributed pagination considerations.

Trade-offs між:

    offset pagination
    keyset pagination
    cursor pagination

---

# Mini Cheat Sheet

## ORDER BY

    SELECT *
    FROM users
    ORDER BY name;

За замовчуванням:

    ASC

---

## ASC

    ORDER BY price ASC;

    smallest → largest

---

## DESC

    ORDER BY price DESC;

    largest → smallest

---

## Multiple columns

    ORDER BY department ASC, salary DESC;

Логіка:

    department → primary sort
    salary     → tie-breaker

---

## NULLS

    ORDER BY age ASC NULLS FIRST;

    NULL
    18
    25
    30

---

    ORDER BY age ASC NULLS LAST;

    18
    25
    30
    NULL

---

## LIMIT

    SELECT *
    FROM users
    LIMIT 20;

    → максимум 20 rows

---

## OFFSET

    SELECT *
    FROM users
    OFFSET 20;

    → skip 20 rows

---

## LIMIT + OFFSET

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 20
    OFFSET 40;

    → skip 40
    → take 20

---

## Pagination

    page = 3
    pageSize = 20

    OFFSET = (3 - 1) * 20
           = 40

---

## First page

    LIMIT 20
    OFFSET 0

---

## Second page

    LIMIT 20
    OFFSET 20

---

## Third page

    LIMIT 20
    OFFSET 40

---

## Stable ordering

Замість:

    ORDER BY created_at DESC

краще для pagination:

    ORDER BY created_at DESC, id DESC

---

## Offset pagination

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 20
    OFFSET 100;

    → simple
    → page-based
    → може бути повільним при великих OFFSET

---

## Keyset pagination

    SELECT *
    FROM users
    WHERE id > 100
    ORDER BY id
    LIMIT 20;

    → seek from known position
    → добре для великих таблиць

---

## DESC keyset

    SELECT *
    FROM users
    WHERE id < 100
    ORDER BY id DESC
    LIMIT 20;

---

## Composite keyset

    ORDER BY created_at DESC, id DESC

Наступна сторінка:

    WHERE
        created_at < $1
        OR (
            created_at = $1
            AND id < $2
        )
    ORDER BY created_at DESC, id DESC
    LIMIT 20;

---

## API

    GET /users?page=2&limit=20

    offset = (page - 1) * limit

---

## Safe pagination

    default limit = 20
    max limit = 100

---

## Performance

    EXPLAIN
    SELECT ...;

    EXPLAIN ANALYZE
    SELECT ...;

---

# Основні правила

    ORDER BY → визначає порядок
    ASC      → від меншого до більшого
    DESC     → від більшого до меншого

    LIMIT    → скільки взяти
    OFFSET   → скільки пропустити

    OFFSET = (page - 1) * pageSize

    NULLS FIRST → NULL на початку
    NULLS LAST  → NULL в кінці

    ORDER BY + LIMIT
        → top/latest records

    ORDER BY + LIMIT + OFFSET
        → offset pagination

    WHERE + ORDER BY + LIMIT
        → keyset pagination

---

# Головне

• `ORDER BY` використовується для сортування результату.

• `ASC` означає ascending.

• `DESC` означає descending.

• Якщо напрямок не вказано, використовується `ASC`.

• `ORDER BY` може містити кілька columns.

• Перший column має найвищий пріоритет сортування.

• Наступні columns використовуються для tie-breaking.

• Для pagination бажано мати deterministic/stable ordering.

• Якщо `created_at` не унікальний, часто додають:

    id

як tie-breaker:

    ORDER BY created_at DESC, id DESC

• `NULL` має спеціальні правила сортування.

• `NULLS FIRST` ставить `NULL` на початок.

• `NULLS LAST` ставить `NULL` у кінець.

• `LIMIT` обмежує кількість рядків.

• `OFFSET` пропускає певну кількість рядків.

• Класична pagination:

    LIMIT + OFFSET

• Формула:

    OFFSET = (page - 1) * pageSize

• Для першої сторінки:

    OFFSET 0

• Для другої:

    OFFSET pageSize

• Для третьої:

    OFFSET pageSize * 2

• `OFFSET` проста, але на дуже великих значеннях може бути повільною.

• Keyset pagination використовує значення останнього запису:

    WHERE id > last_id

або:

    WHERE id < last_id

• Для:

    ORDER BY id ASC

використовують:

    WHERE id > last_id

• Для:

    ORDER BY id DESC

використовують:

    WHERE id < last_id

• Для складного сортування:

    ORDER BY created_at DESC, id DESC

можна використовувати composite keyset condition.

• Cursor pagination часто є API-рівнем над keyset pagination.

• Для великих таблиць keyset pagination часто є кращою альтернативою великому `OFFSET`.

• Sorting та pagination потрібно розглядати разом з indexes.

• `EXPLAIN` допомагає побачити execution plan.

• `EXPLAIN ANALYZE` дозволяє перевірити фактичне виконання запиту.

• Для backend pagination потрібно контролювати:

    page
    limit
    sort
    order

• `limit` бажано обмежувати зверху.

• Dynamic `ORDER BY` не слід будувати з довільного user input.

• Для dynamic sorting у backend краще використовувати whitelist дозволених полів.

• Типовий CRUD-запит:

    SELECT
        id,
        name,
        created_at
    FROM users
    WHERE ...
    ORDER BY created_at DESC, id DESC
    LIMIT $1
    OFFSET $2;

• Типовий keyset-запит:

    SELECT
        id,
        name,
        created_at
    FROM users
    WHERE ...
      AND id < $1
    ORDER BY id DESC
    LIMIT $2;

• Основна модель:

    FILTER
      ↓
    SORT
      ↓
    PAGINATE

• Offset pagination відповідає на питання:

    "Які рядки знаходяться на сторінці N?"

• Keyset pagination відповідає на питання:

    "Які рядки йдуть після цього конкретного рядка?"

• Для невеликих та середніх CRUD-застосунків `LIMIT + OFFSET` часто достатньо.

• Для великих таблиць, feed, logs, messages та infinite scroll варто розглядати keyset/cursor pagination.

• Правильна pagination — це не тільки `LIMIT` та `OFFSET`, а поєднання:

    ORDER BY
    stable ordering
    LIMIT
    OFFSET / keyset
    indexes
    backend validation
    performance analysis

• Найважливіша практична формула:

    ORDER BY
        ↓
    LIMIT + OFFSET

або для великих наборів:

    WHERE (position after cursor)
        ↓
    ORDER BY
        ↓
    LIMIT
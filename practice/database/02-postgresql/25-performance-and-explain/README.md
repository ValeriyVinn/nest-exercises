# PostgreSQL: Performance and EXPLAIN

## 1. Мета розділу

У цьому розділі розберемо, як PostgreSQL виконує SQL-запити та як знаходити повільні місця.

Основні теми:

- що таке database performance;
- чому SQL-запит може бути повільним;
- Query Planner;
- Query Optimizer;
- `EXPLAIN`;
- `EXPLAIN ANALYZE`;
- `EXPLAIN (ANALYZE, BUFFERS)`;
- Sequential Scan;
- Index Scan;
- Index Only Scan;
- Bitmap Index Scan;
- Bitmap Heap Scan;
- Nested Loop;
- Hash Join;
- Merge Join;
- Sort;
- Aggregate;
- estimated rows;
- actual rows;
- cost;
- execution time;
- planning time;
- selectivity;
- statistics;
- `ANALYZE`;
- `VACUUM`;
- `VACUUM ANALYZE`;
- індекси та performance;
- composite indexes;
- partial indexes;
- expression indexes;
- `ORDER BY` та indexes;
- `WHERE` та indexes;
- JOIN та indexes;
- pagination та performance;
- `OFFSET` vs keyset pagination;
- N+1 problem;
- unnecessary `SELECT *`;
- functions та performance;
- CTE та performance;
- temporary tables;
- locks;
- transactions;
- connection pooling;
- PostgreSQL configuration;
- практична діагностика повільного запиту;
- типові помилки;
- практичні вправи.

---

# 2. Головна ідея

Коли ми пишемо:

    SELECT *
    FROM users
    WHERE email = 'anna@example.com';

ми описуємо:

> який результат хочемо отримати.

А PostgreSQL повинен вирішити:

> як найкраще цей результат отримати.

Наприклад:

    Table Scan
         ↓
    перевірити всі rows

або:

    Index
         ↓
    знайти потрібний row

PostgreSQL сам обирає execution plan.

---

# 3. SQL query vs Execution Plan

Маємо:

    SELECT *
    FROM users
    WHERE email = 'anna@example.com';

PostgreSQL аналізує:

    WHERE
    indexes
    table size
    statistics
    estimated rows
    available execution methods

і створює:

    Execution Plan

Наприклад:

    Index Scan
       on users_email_idx

---

# 4. Query Planner

PostgreSQL має компонент:

    Query Planner

Він аналізує SQL-запит і шукає спосіб його виконання.

Спрощено:

    SQL
      ↓
    Parser
      ↓
    Query representation
      ↓
    Planner / Optimizer
      ↓
    Execution Plan
      ↓
    Executor
      ↓
    Result

---

# 5. Query Optimizer

Planner порівнює різні можливі плани.

Наприклад:

    Plan A
        Sequential Scan

    Plan B
        Index Scan

    Plan C
        Bitmap Scan

PostgreSQL оцінює їхню приблизну вартість.

Потім вибирає план, який вважає найкращим.

---

# 6. Важлива думка

PostgreSQL не має правила:

> "Якщо існує index — завжди використовуй index."

Насправді:

> PostgreSQL використовує index тоді, коли вважає його вигідним.

Наприклад, якщо table дуже маленька:

    Sequential Scan

може бути швидшим за:

    Index Scan

---

# 7. EXPLAIN

Основна команда:

    EXPLAIN
    SELECT *
    FROM users
    WHERE email = 'anna@example.com';

`EXPLAIN` показує execution plan, але за замовчуванням **не виконує сам SELECT**.

---

# 8. EXPLAIN ANALYZE

Щоб реально виконати query і побачити фактичні результати:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE email = 'anna@example.com';

Тепер PostgreSQL:

    виконує query
       ↓
    вимірює execution
       ↓
    показує actual statistics

---

# 9. Важлива різниця

## EXPLAIN

    EXPLAIN
    SELECT ...

Показує:

    estimated plan

але не виконує звичайний query.

## EXPLAIN ANALYZE

    EXPLAIN ANALYZE
    SELECT ...

Показує:

    estimated plan
    +
    actual execution

---

# 10. Обережно з EXPLAIN ANALYZE

`EXPLAIN ANALYZE` реально виконує statement.

Тому для:

    SELECT

це безпечно з точки зору зміни даних.

Але для:

    UPDATE
    DELETE
    INSERT

він реально виконає операцію.

Наприклад:

    EXPLAIN ANALYZE
    DELETE FROM users;

може реально видалити rows.

Для небезпечних statements використовуй transaction:

    BEGIN;

    EXPLAIN ANALYZE
    DELETE FROM users
    WHERE id = 10;

    ROLLBACK;

---

# 11. EXPLAIN для INSERT / UPDATE / DELETE

Можна аналізувати:

    INSERT
    UPDATE
    DELETE

Але потрібно пам'ятати:

> `EXPLAIN ANALYZE` виконує statement.

Тому для навчання:

    BEGIN;
    EXPLAIN ANALYZE ...;
    ROLLBACK;

є хорошою практикою.

---

# 12. Приклад базового EXPLAIN

Запит:

    EXPLAIN
    SELECT *
    FROM users
    WHERE id = 10;

Можна отримати план на кшталт:

    Index Scan using users_pkey on users
      Index Cond: (id = 10)

Головна інформація:

    Index Scan
        ↓
    users_pkey
        ↓
    id = 10

---

# 13. EXPLAIN output

Типовий output може виглядати приблизно так:

    Index Scan using users_pkey on users
      (cost=0.29..8.30 rows=1 width=64)
      (actual time=0.020..0.021 rows=1 loops=1)

Основні частини:

    cost
    rows
    width
    actual time
    loops

---

# 14. cost

Наприклад:

    cost=0.29..8.30

Це **не milliseconds**.

Це внутрішня оцінка PostgreSQL вартості плану.

Перший number:

    startup cost

Другий:

    total cost

---

# 15. Startup Cost

Наприклад:

    cost=0.29..8.30

Перший:

    0.29

— приблизна вартість отримання першого результату.

---

# 16. Total Cost

Другий:

    8.30

— приблизна повна вартість виконання plan node.

Ще раз:

    cost ≠ milliseconds

Не потрібно читати:

    cost=8.30

як:

    8.30 ms

---

# 17. rows

Наприклад:

    rows=1

Це оцінка PostgreSQL:

> скільки rows поверне цей node.

Це:

    estimated rows

---

# 18. actual rows

У:

    EXPLAIN ANALYZE

можна побачити:

    actual rows=1

Це вже реальна кількість rows.

Тому можна порівнювати:

    estimated rows
          vs
    actual rows

---

# 19. Чому estimated rows важливі

Наприклад:

    estimated rows=10

але:

    actual rows=100000

Planner сильно помилився.

Це може призвести до неправильного execution plan.

Наприклад PostgreSQL може вибрати:

    Nested Loop

коли для реальних даних краще:

    Hash Join

---

# 20. Statistics

PostgreSQL зберігає statistics про tables та columns.

Вони допомагають Planner оцінювати:

    кількість rows
    distribution values
    selectivity
    можливий результат WHERE

Statistics оновлюються через:

    ANALYZE

---

# 21. ANALYZE

Команда:

    ANALYZE users;

оновлює statistics для table.

Для всієї database:

    ANALYZE;

Це не те саме, що:

    EXPLAIN ANALYZE

Не плутай ці дві команди.

---

# 22. ANALYZE vs EXPLAIN ANALYZE

## ANALYZE

    ANALYZE users;

Оновлює:

    planner statistics

## EXPLAIN ANALYZE

    EXPLAIN ANALYZE
    SELECT ...;

Виконує query та показує:

    actual execution statistics

---

# 23. VACUUM

PostgreSQL використовує MVCC.

Коли rows змінюються або видаляються, старі row versions можуть залишатися до моменту очищення.

Для обслуговування table використовується:

    VACUUM

Наприклад:

    VACUUM users;

---

# 24. VACUUM ANALYZE

Можна одночасно:

    VACUUM ANALYZE users;

Це:

    VACUUM
       +
    ANALYZE

Тобто:

    cleanup
       +
    statistics update

---

# 25. Autovacuum

У PostgreSQL є:

    autovacuum

Він автоматично запускає maintenance operations.

Це дуже важливий механізм для production database.

Не потрібно вручну робити:

    VACUUM

після кожного:

    INSERT
    UPDATE
    DELETE

---

# 26. Sequential Scan

Один із найважливіших plan nodes:

    Seq Scan

або:

    Sequential Scan

PostgreSQL читає table послідовно.

Наприклад:

    Seq Scan on users

Логіка:

    row 1 → перевірити
    row 2 → перевірити
    row 3 → перевірити
    ...
    row N → перевірити

---

# 27. Чи завжди Seq Scan поганий?

Ні.

Наприклад:

    users = 20 rows

і query:

    SELECT *
    FROM users;

Sequential Scan може бути найкращим рішенням.

Index тут може тільки додати overhead.

---

# 28. Seq Scan на великій table

Наприклад:

    users = 10,000,000 rows

Query:

    SELECT *
    FROM users
    WHERE email = 'anna@example.com';

Якщо `email` indexed, PostgreSQL може використати:

    Index Scan

замість:

    Seq Scan

---

# 29. Index Scan

Наприклад:

    Index Scan using users_email_idx on users

Логіка:

    query
      ↓
    index
      ↓
    потрібні rows
      ↓
    table

Це часто ефективно для selective conditions.

---

# 30. Selectivity

**Selectivity** — наскільки добре condition звужує набір rows.

Наприклад:

    WHERE id = 123456

може повернути:

    1 row

Це дуже selective.

А:

    WHERE is_active = true

може повернути:

    90% rows

Це низька selectivity.

---

# 31. Index і Selectivity

Index особливо корисний, коли query повертає відносно невелику частину table.

Наприклад:

    10,000,000 rows

і:

    WHERE email = 'anna@example.com'

повертає:

    1 row

Index дуже корисний.

А:

    WHERE status = 'active'

повертає:

    9,000,000 rows

Planner може вибрати:

    Seq Scan

---

# 32. Bitmap Index Scan

Ще один тип plan node:

    Bitmap Index Scan

Він може бути корисним, коли потрібно знайти багато rows через index.

Наприклад:

    Bitmap Index Scan
          ↓
    Bitmap Heap Scan

---

# 33. Bitmap Heap Scan

Типова структура:

    Bitmap Index Scan
          ↓
    Bitmap Heap Scan

Ідея:

    index
      ↓
    знайти багато потрібних row locations
      ↓
    ефективно прочитати table pages

Це компроміс між:

    Index Scan

і:

    Seq Scan

---

# 34. Index Only Scan

Можливий:

    Index Only Scan

Це дуже цікавий випадок.

Якщо всі потрібні дані можна отримати з index, PostgreSQL може не читати table для кожного row.

Наприклад:

    CREATE INDEX users_email_name_idx
    ON users (email, name);

Запит:

    SELECT name
    FROM users
    WHERE email = 'anna@example.com';

може потенційно використовувати:

    Index Only Scan

---

# 35. Covering Index

Індекс може містити додаткові columns через:

    INCLUDE

Наприклад:

    CREATE INDEX users_email_idx
    ON users (email)
    INCLUDE (name);

Тоді index містить:

    email
    name

Це може допомогти для:

    Index Only Scan

---

# 36. Index Scan vs Index Only Scan

## Index Scan

    Index
      ↓
    Table

## Index Only Scan

    Index
      ↓
    Result

Але Index Only Scan залежить також від visibility information та стану table.

Тому наявність відповідного index не гарантує Index Only Scan.

---

# 37. Sort

Plan може містити:

    Sort

Наприклад:

    SELECT *
    FROM users
    ORDER BY name;

План може містити:

    Sort
      Sort Key: name
      ↓
    Seq Scan on users

---

# 38. ORDER BY і Index

Якщо є:

    CREATE INDEX users_name_idx
    ON users (name);

PostgreSQL потенційно може використати index для:

    ORDER BY name

Наприклад:

    SELECT *
    FROM users
    ORDER BY name;

Але planner сам вирішує, чи вигідно це.

---

# 39. LIMIT

Запит:

    SELECT *
    FROM users
    ORDER BY name
    LIMIT 10;

може бути дуже ефективним з відповідним index.

Наприклад:

    CREATE INDEX users_name_idx
    ON users (name);

PostgreSQL може отримати перші потрібні rows без повного sorting.

---

# 40. OFFSET

Проблема:

    SELECT *
    FROM users
    ORDER BY id
    LIMIT 20
    OFFSET 1000000;

Database може змушена пройти через велику кількість rows перед тим, як повернути потрібні 20.

Чим більший:

    OFFSET

тим дорожчим може стати query.

---

# 41. Keyset Pagination

Альтернатива:

    SELECT *
    FROM users
    WHERE id > 1000000
    ORDER BY id
    LIMIT 20;

Це називають:

    Keyset Pagination

або:

    Cursor Pagination

Для великих datasets часто це ефективніше за великий `OFFSET`.

---

# 42. Composite Index

Наприклад:

    CREATE INDEX users_status_created_idx
    ON users (status, created_at);

Такий index особливо корисний для queries, що відповідають його структурі.

Наприклад:

    WHERE status = 'active'
    ORDER BY created_at;

---

# 43. Порядок columns в index

Для:

    (status, created_at)

порядок має значення.

Index:

    (status, created_at)

не є автоматично еквівалентним:

    (created_at, status)

Це дуже важливо.

---

# 44. Expression Index

Можна індексувати expression.

Наприклад:

    CREATE INDEX users_lower_email_idx
    ON users (LOWER(email));

Тоді query:

    SELECT *
    FROM users
    WHERE LOWER(email) = 'anna@example.com';

може використовувати цей index.

---

# 45. Partial Index

Наприклад:

    CREATE INDEX users_active_idx
    ON users (created_at)
    WHERE is_active = true;

Це index тільки для rows:

    is_active = true

Це може бути дуже корисно для selective subset.

---

# 46. Index і WHERE

Поганий підхід:

    створити index на кожну column

Наприклад:

    name
    email
    phone
    age
    status
    city
    country
    created_at
    updated_at

Це не означає:

    "database буде швидкою"

Indexes:

- займають storage;
- збільшують write overhead;
- потребують maintenance.

---

# 47. Index і INSERT

Коли є:

    INSERT

PostgreSQL повинен оновити відповідні indexes.

Чим більше indexes:

    INSERT
       ↓
    більше index maintenance

---

# 48. Index і UPDATE

Якщо UPDATE змінює indexed column:

    UPDATE users
    SET email = ...

PostgreSQL повинен підтримувати відповідний index.

Тому indexes мають ціну.

---

# 49. Index і DELETE

При:

    DELETE

database також повинна обробляти відповідні indexes та MVCC cleanup.

Тому багато indexes можуть збільшувати вартість writes.

---

# 50. JOIN і Performance

Наприклад:

    SELECT
        users.name,
        orders.total
    FROM users
    JOIN orders
        ON orders.user_id = users.id;

Planner може вибрати:

    Nested Loop
    Hash Join
    Merge Join

---

# 51. Nested Loop

Типовий план:

    Nested Loop
       ↓
    outer table
       ↓
    inner table

Ідея:

    для кожного row
    outer table
       ↓
    шукаємо відповідні rows
    inner table

---

# 52. Коли Nested Loop хороший

Nested Loop може бути дуже ефективним, коли:

- outer relation маленька;
- inner relation має хороший index;
- JOIN selective.

Наприклад:

    10 users
       ↓
    index lookup
       ↓
    orders

може бути дуже швидко.

---

# 53. Коли Nested Loop поганий

Наприклад:

    1,000,000 users
       ↓
    Nested Loop
       ↓
    великий inner table

може створити величезну кількість operations.

Planner зазвичай намагається вибрати кращий plan, але неправильні statistics можуть призвести до невдалого вибору.

---

# 54. Hash Join

Інший тип:

    Hash Join

Спрощено:

    smaller relation
          ↓
        Hash
          ↓
    lookup matching rows
          ↓
    larger relation

Hash Join часто корисний для equality joins:

    ON a.id = b.user_id

---

# 55. Merge Join

Ще один тип:

    Merge Join

Зазвичай працює з двома впорядкованими потоками.

Спрощено:

    sorted A
       +
    sorted B
       ↓
    Merge Join

Може бути корисним для великих relations та відповідних умов.

---

# 56. JOIN performance

Для JOIN часто важливі indexes на columns, які використовуються для пошуку, наприклад:

    users.id
    orders.user_id

Primary key:

    users.id

автоматично має unique index.

Але foreign key column:

    orders.user_id

не обов'язково автоматично отримує index.

---

# 57. Foreign Key і Index

Наприклад:

    orders.user_id

має:

    FOREIGN KEY (user_id)
    REFERENCES users(id)

Це забезпечує referential integrity.

Але для performance JOIN часто варто мати:

    CREATE INDEX orders_user_id_idx
    ON orders (user_id);

---

# 58. Aggregate

Наприклад:

    SELECT COUNT(*)
    FROM users;

План може містити:

    Aggregate
       ↓
    Seq Scan

Для великої table PostgreSQL може прочитати багато rows.

Не потрібно очікувати, що:

    COUNT(*)

завжди буде миттєвим.

---

# 59. GROUP BY

Наприклад:

    SELECT
        status,
        COUNT(*)
    FROM users
    GROUP BY status;

Planner може використовувати:

    HashAggregate

або:

    GroupAggregate

залежно від situation.

---

# 60. HashAggregate

Наприклад:

    HashAggregate
       ↓
    Seq Scan

PostgreSQL створює hash structure для групування.

---

# 61. GroupAggregate

Можна побачити:

    GroupAggregate
       ↓
    Sort
       ↓
    Seq Scan

або інший plan залежно від query.

---

# 62. EXPLAIN (ANALYZE, BUFFERS)

Дуже корисний варіант:

    EXPLAIN (ANALYZE, BUFFERS)
    SELECT *
    FROM users
    WHERE email = 'anna@example.com';

`BUFFERS` показує інформацію про buffer activity.

Це допомагає зрозуміти:

    shared hit
    shared read
    shared dirtied
    shared written

---

# 63. shared hit

Наприклад:

    Buffers: shared hit=100

Це означає, що pages були знайдені в PostgreSQL shared buffers.

Умовно:

    database page
        ↓
    already in memory
        ↓
    shared hit

---

# 64. shared read

Наприклад:

    Buffers: shared read=100

Це означає, що PostgreSQL повинен був прочитати pages з underlying storage.

Це може бути значно дорожче за:

    shared hit

---

# 65. BUFFERS

Тому:

    EXPLAIN ANALYZE

відповідає:

> Скільки часу зайняв query?

А:

    EXPLAIN (ANALYZE, BUFFERS)

додатково допомагає відповісти:

> Яку роботу з database pages виконував query?

---

# 66. Timing

У plan можна побачити:

    actual time=0.020..0.021

Це вже реальний час виконання відповідного plan node у milliseconds.

На відміну від:

    cost

який є planner cost units.

---

# 67. loops

Наприклад:

    loops=1000

означає, що plan node виконувався багато разів.

Особливо важливо це для:

    Nested Loop

Наприклад:

    Index Scan
    loops=1000

може означати:

> index lookup виконувався для кожного row outer relation.

---

# 68. Читаємо EXPLAIN знизу вгору

Наприклад:

    Nested Loop
       ↓
    Index Scan users
       ↓
    Index Scan orders

Часто корисно читати plan:

    bottom
       ↓
    intermediate nodes
       ↓
    top

Нижні nodes генерують rows для верхніх.

---

# 69. Parent і Child Nodes

Наприклад:

    Hash Join
       ├── Seq Scan users
       └── Hash
             └── Seq Scan orders

`Hash Join` — parent node.

Його child nodes:

    Seq Scan users
    Hash

А `Hash` має:

    Seq Scan orders

Це дерево execution plan.

---

# 70. План як дерево

Можна уявляти:

    Query
      │
      └── Hash Join
            ├── Seq Scan users
            │
            └── Hash
                  └── Seq Scan orders

Так набагато легше читати `EXPLAIN`.

---

# 71. Planning Time

`EXPLAIN ANALYZE` може показати:

    Planning Time: 0.200 ms

Це час, який PostgreSQL витратив на побудову plan.

---

# 72. Execution Time

Наприклад:

    Execution Time: 2.500 ms

Це час фактичного виконання query.

Порівнюй:

    Planning Time
        vs
    Execution Time

---

# 73. Query Performance — не тільки SQL

Повільний query може бути пов'язаний із:

- неправильним index;
- відсутністю index;
- неправильними statistics;
- великою кількістю rows;
- JOIN;
- sorting;
- aggregation;
- disk I/O;
- locks;
- network;
- application code;
- N+1;
- connection overhead.

Тому:

> `EXPLAIN` — інструмент діагностики, а не чарівна кнопка "зробити швидко".

---

# 74. N+1 Problem

У Backend може бути:

    SELECT users;

а потім для кожного user:

    SELECT orders WHERE user_id = ?

Наприклад:

    1 query
       +
    1000 queries

Разом:

    1001 queries

Це:

    N+1 problem

---

# 75. Замість N+1

Можна використати JOIN:

    SELECT
        users.id,
        users.name,
        orders.id,
        orders.total
    FROM users
    LEFT JOIN orders
        ON orders.user_id = users.id;

Або інші batch-loading strategies.

---

# 76. SELECT *

Не завжди добре:

    SELECT *
    FROM users;

Якщо потрібні:

    id
    name

краще:

    SELECT id, name
    FROM users;

Причини:

- менше data;
- менше network traffic;
- потенційно кращий шанс використати covering index;
- API отримує тільки необхідні columns.

---

# 77. LIMIT

Якщо потрібен тільки один row:

    SELECT *
    FROM users
    WHERE email = 'anna@example.com'
    LIMIT 1;

це може допомогти planner/executor припинити пошук після достатнього результату.

Але якщо `email` має `UNIQUE`, `LIMIT 1` не завжди є необхідним для логіки correctness.

---

# 78. Functions і Performance

Query:

    WHERE LOWER(email) = 'anna@example.com'

без відповідного expression index може вимагати додаткової роботи.

Рішення:

    CREATE INDEX users_lower_email_idx
    ON users (LOWER(email));

Потім перевір:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE LOWER(email) = 'anna@example.com';

---

# 79. CTE і Performance

CTE:

    WITH active_users AS (
        SELECT *
        FROM users
        WHERE is_active = true
    )
    SELECT *
    FROM active_users;

Не потрібно автоматично думати:

    CTE = повільно

Сучасний PostgreSQL може inline-ити багато CTE.

Для performance потрібно дивитися:

    EXPLAIN

а не робити висновок тільки з синтаксису.

---

# 80. MATERIALIZED CTE

Можна явно попросити materialization:

    WITH active_users AS MATERIALIZED (
        SELECT *
        FROM users
        WHERE is_active = true
    )
    SELECT *
    FROM active_users;

Але це advanced technique.

Не використовуй `MATERIALIZED` без розуміння, навіщо він потрібен.

---

# 81. NOT MATERIALIZED

Можна також:

    WITH active_users AS NOT MATERIALIZED (
        SELECT *
        FROM users
        WHERE is_active = true
    )
    SELECT *
    FROM active_users;

Це теж advanced optimization topic.

---

# 82. WHERE і Functions

Іноді expression у WHERE може заважати використанню звичайного index.

Наприклад:

    WHERE LOWER(email) = 'anna@example.com'

Index:

    CREATE INDEX ON users(email);

не є тим самим, що:

    CREATE INDEX ON users(LOWER(email));

Для expression query може знадобитися expression index.

---

# 83. LIKE і Index

Наприклад:

    WHERE name LIKE 'Ann%'

може мати можливість ефективного використання B-tree index залежно від collation/operator class та query.

А:

    WHERE name LIKE '%ann%'

часто не може ефективно використовувати звичайний B-tree index для пошуку довільного substring.

Для таких задач можуть бути потрібні інші indexing strategies, наприклад trigram indexes.

---

# 84. ILIKE

Наприклад:

    WHERE name ILIKE '%ann%'

звичайний B-tree index не є універсальним рішенням.

Для text search можна розглядати:

    pg_trgm

і GIN/GiST indexes.

Це вже наступний рівень optimization.

---

# 85. JSONB і Performance

Наприклад:

    WHERE metadata @> '{"active": true}'

Для JSONB queries може бути корисний:

    GIN

index.

Наприклад:

    CREATE INDEX users_metadata_idx
    ON users
    USING GIN (metadata);

Після цього:

    EXPLAIN ANALYZE

допоможе перевірити фактичний plan.

---

# 86. Index Types

Для performance потрібно пам'ятати:

    B-tree
    Hash
    GIN
    GiST
    BRIN

Але не потрібно використовувати їх випадково.

Тип index залежить від query pattern.

---

# 87. BRIN

BRIN особливо цікавий для дуже великих таблиць, де значення фізично корелюють із порядком rows.

Наприклад:

    created_at

для великої append-only table.

BRIN може бути набагато меншим за B-tree.

---

# 88. Performance і Data Distribution

Planner враховує statistics.

Наприклад:

    status

має:

    active = 95%
    inactive = 5%

Query:

    WHERE status = 'inactive'

може бути selective.

А:

    WHERE status = 'active'

може повернути майже всю table.

Тому один і той самий index може поводитися по-різному для різних values.

---

# 89. Parameterized Queries

У Backend query часто параметризований:

    SELECT *
    FROM users
    WHERE id = $1;

Наприклад:

    $1 = 100

Це важливо для:

- SQL injection protection;
- prepared statements;
- правильного database interaction.

Але performance behavior параметризованих statements може залежати від планування та способу використання prepared statements.

---

# 90. Connection Pooling

Backend не повинен створювати нове PostgreSQL connection для кожного HTTP request.

Погано:

    HTTP request
       ↓
    connect
       ↓
    query
       ↓
    disconnect

для кожного запиту.

Краще:

    Connection Pool
       ├── connection
       ├── connection
       ├── connection
       └── connection

Backend бере connection:

    request
       ↓
    pool
       ↓
    connection
       ↓
    query
       ↓
    release

---

# 91. Pool Size

Занадто маленький pool:

    requests
       ↓
    waiting

Занадто великий:

    багато PostgreSQL connections
       ↓
    memory / CPU overhead

Тому pool size потрібно підбирати під:

    workload
    database capacity
    application architecture

---

# 92. Locks

Іноді query повільний не тому, що execution plan поганий.

Він може чекати:

    lock

Наприклад:

    Transaction A
        ↓
    UPDATE users
        ↓
    lock

    Transaction B
        ↓
    UPDATE users
        ↓
    waiting

Тоді потрібно досліджувати locks та transactions.

---

# 93. EXPLAIN не показує всю картину

Якщо:

    Execution Time = 5 seconds

це не автоматично означає:

    "SQL plan поганий"

Причиною може бути:

    lock wait
    disk I/O
    network
    CPU
    application delay

Тому performance analysis повинна бути системною.

---

# 94. Повільний query — алгоритм діагностики

Починай так:

    1. Знайти повільний query
            ↓
    2. Запустити EXPLAIN
            ↓
    3. Запустити EXPLAIN ANALYZE
            ↓
    4. Додати BUFFERS
            ↓
    5. Подивитися scans
            ↓
    6. Перевірити estimated vs actual rows
            ↓
    7. Перевірити indexes
            ↓
    8. Перевірити JOIN
            ↓
    9. Перевірити sorting / aggregation
            ↓
    10. Повторити тест

---

# 95. EXPLAIN перший крок

Не починай із:

    "Додам index."

Спочатку:

    EXPLAIN
    SELECT ...;

Потім:

    EXPLAIN ANALYZE
    SELECT ...;

Тільки після аналізу:

    змінюємо index / query / schema

---

# 96. EXPLAIN ANALYZE до і після

Наприклад:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE email = 'anna@example.com';

Запам'ятай:

    Execution Time: 120 ms

Створюємо index:

    CREATE INDEX users_email_idx
    ON users (email);

Повторюємо:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE email = 'anna@example.com';

Отримуємо:

    Execution Time: 2 ms

Тепер у нас є evidence.

---

# 97. Не оптимізуй "на око"

Погано:

    "Цей query виглядає повільним,
     поставлю index."

Краще:

    EXPLAIN ANALYZE
         ↓
    знайти Seq Scan
         ↓
    перевірити rows
         ↓
    створити index
         ↓
    EXPLAIN ANALYZE
         ↓
    порівняти

Performance optimization повинна бути вимірюваною.

---

# 98. Маленька database може обманювати

На:

    100 rows

майже все може працювати швидко.

Потім:

    10,000 rows
    1,000,000 rows
    10,000,000 rows

поведінка змінюється.

Тому performance testing краще робити на реалістичному dataset.

---

# 99. Практика з великим dataset

Для performance exercise створимо:

    users

з великою кількістю rows.

Наприклад:

    INSERT INTO users (name, email)
    SELECT
        'User ' || generate_series,
        'user' || generate_series || '@example.com'
    FROM generate_series(1, 100000);

Отримаємо:

    100000 rows

---

# 100. Перевірити кількість rows

    SELECT COUNT(*)
    FROM users;

Очікуємо:

    100000

---

# 101. EXPLAIN без index

Виконай:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE email = 'user90000@example.com';

Подивись:

    Seq Scan

і:

    actual time

---

# 102. Створити Index

    CREATE INDEX users_email_idx
    ON users (email);

Повтори:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE email = 'user90000@example.com';

Порівняй plan.

---

# 103. EXPLAIN з BUFFERS

Виконай:

    EXPLAIN (ANALYZE, BUFFERS)
    SELECT *
    FROM users
    WHERE email = 'user90000@example.com';

Порівняй:

    shared hit
    shared read

---

# 104. Практика: ORDER BY

Створи:

    CREATE INDEX users_created_at_idx
    ON users (created_at);

Перевір:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    ORDER BY created_at
    LIMIT 20;

Подивись, чи використовується index.

---

# 105. Практика: OFFSET

Виконай:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    ORDER BY id
    LIMIT 20
    OFFSET 10000;

Потім:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    ORDER BY id
    LIMIT 20
    OFFSET 90000;

Порівняй execution time.

---

# 106. Практика: Keyset Pagination

Виконай:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE id > 90000
    ORDER BY id
    LIMIT 20;

Порівняй із:

    OFFSET 90000

Це одна з найкорисніших практик для Backend Developer.

---

# 107. Практика: JOIN

Створи:

    orders

і:

    user_id

як foreign key.

Наповни table data.

Потім:

    EXPLAIN ANALYZE
    SELECT
        users.name,
        orders.total
    FROM users
    JOIN orders
        ON orders.user_id = users.id;

Подивись:

    Nested Loop
    Hash Join
    Merge Join

або інший plan.

---

# 108. Практика: JOIN Index

Створи:

    CREATE INDEX orders_user_id_idx
    ON orders (user_id);

Повтори JOIN:

    EXPLAIN ANALYZE
    SELECT
        users.name,
        orders.total
    FROM users
    JOIN orders
        ON orders.user_id = users.id;

Порівняй plan до і після index.

---

# 109. Практика: estimated vs actual

Виконай:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE email LIKE 'user9%';

Знайди:

    rows=...

і:

    actual rows=...

Порівняй оцінку Planner з реальністю.

---

# 110. Практика: ANALYZE

Після великої зміни dataset:

    ANALYZE users;

Потім:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE email LIKE 'user9%';

Подивись, чи змінилися estimated rows.

---

# 111. Практика: Partial Index

Додай:

    is_active BOOLEAN

Створи:

    CREATE INDEX users_active_created_idx
    ON users (created_at)
    WHERE is_active = true;

Перевір:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE is_active = true
      AND created_at > CURRENT_DATE - INTERVAL '30 days';

---

# 112. Практика: Expression Index

Створи:

    CREATE INDEX users_lower_email_idx
    ON users (LOWER(email));

Потім:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE LOWER(email) = 'user90000@example.com';

Перевір plan.

---

# 113. Практика: Index Only Scan

Створи:

    CREATE INDEX users_email_name_idx
    ON users (email)
    INCLUDE (name);

Запит:

    EXPLAIN (ANALYZE, BUFFERS)
    SELECT name
    FROM users
    WHERE email = 'user90000@example.com';

Подивись, який plan обере PostgreSQL.

Не очікуй Index Only Scan гарантовано — Planner враховує кілька факторів.

---

# 114. Практика: COUNT

Виконай:

    EXPLAIN ANALYZE
    SELECT COUNT(*)
    FROM users;

Подивись:

    Scan
       ↓
    Aggregate

Проаналізуй, чому PostgreSQL не просто "знає" точну кількість rows без роботи.

---

# 115. Практика: SELECT *

Порівняй:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE email = 'user90000@example.com';

і:

    EXPLAIN ANALYZE
    SELECT id, name
    FROM users
    WHERE email = 'user90000@example.com';

Подивись, чи відрізняються plans.

---

# 116. Практика: BUFFERS

Порівняй:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE email = 'user90000@example.com';

і:

    EXPLAIN (ANALYZE, BUFFERS)
    SELECT *
    FROM users
    WHERE email = 'user90000@example.com';

Зверни увагу на додаткову інформацію.

---

# 117. Практика: VACUUM ANALYZE

Виконай:

    VACUUM ANALYZE users;

Після цього:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE email = 'user90000@example.com';

Подивись estimated rows та plan.

---

# 118. Практика: видалити index

Для експерименту:

    DROP INDEX users_email_idx;

Потім:

    EXPLAIN ANALYZE
    SELECT *
    FROM users
    WHERE email = 'user90000@example.com';

Створи index знову:

    CREATE INDEX users_email_idx
    ON users (email);

Це дає дуже хороше відчуття ролі index.

---

# 119. Практика: N+1

Уяви Backend:

    SELECT id, name
    FROM users;

Потім для кожного:

    SELECT *
    FROM orders
    WHERE user_id = $1;

Порахуй:

    1 + N queries

Потім спробуй переписати це одним JOIN.

---

# 120. Практика: Performance investigation

Візьми один реальний query зі свого Full Stack проекту.

Наприклад:

    SELECT ...

Виконай:

    EXPLAIN

Потім:

    EXPLAIN ANALYZE

Потім:

    EXPLAIN (ANALYZE, BUFFERS)

Запиши:

    Plan:
    Execution Time:
    Rows:
    Index:
    Buffers:
    Problem:
    Possible improvement:

Це вже дуже хороша професійна вправа.

---

# 121. Практика: Performance README

Для кожного експерименту можеш вести:

    query:
        SELECT ...

    before:
        Seq Scan

    change:
        CREATE INDEX ...

    after:
        Index Scan

    result:
        execution time improved

Це перетворює performance learning на практичний engineering workflow.

---

# 122. Типова помилка №1

### "Seq Scan = проблема"

Ні.

`Seq Scan` може бути найкращим plan.

Питання:

> Скільки rows читається і скільки rows потрібно повернути?

---

# 123. Типова помилка №2

### "Index завжди прискорює query"

Ні.

Index:

- займає місце;
- сповільнює writes;
- потребує maintenance;
- може бути непотрібним.

---

# 124. Типова помилка №3

### "cost = milliseconds"

Ні.

Наприклад:

    cost=0.29..8.30

це planner cost units.

Для реального часу дивись:

    actual time
    Execution Time

---

# 125. Типова помилка №4

### "EXPLAIN і EXPLAIN ANALYZE — одне й те саме"

Ні.

    EXPLAIN
        ↓
    план

    EXPLAIN ANALYZE
        ↓
    реальне виконання + statistics

---

# 126. Типова помилка №5

### "EXPLAIN ANALYZE не змінює database"

Для SELECT — немає звичайної зміни даних.

Але:

    INSERT
    UPDATE
    DELETE

будуть реально виконані.

---

# 127. Типова помилка №6

### "Якщо query повільний — треба додати index"

Спочатку:

    EXPLAIN ANALYZE

Потім:

    знайти bottleneck

І тільки потім:

    optimization

---

# 128. Типова помилка №7

### "Чим більше indexes, тим швидше database"

Ні.

Забагато indexes:

    INSERT
       ↓
    більше maintenance

    UPDATE
       ↓
    більше maintenance

    DELETE
       ↓
    більше maintenance

---

# 129. Типова помилка №8

### "Foreign Key автоматично створює index"

Не покладайся на це.

PostgreSQL автоматично створює index для:

    PRIMARY KEY
    UNIQUE

але foreign key column не отримує автоматично index просто через факт існування FK.

Для performance JOIN/DELETE/UPDATE related rows index часто потрібен окремо.

---

# 130. Типова помилка №9

### "COUNT(*) завжди миттєвий"

Ні.

Наприклад:

    SELECT COUNT(*)
    FROM huge_table;

може вимагати значного scan.

---

# 131. Типова помилка №10

### "OFFSET pagination завжди хороша"

Для:

    OFFSET 10

це нормально.

Для:

    OFFSET 10,000,000

може бути дорого.

Для великих datasets розглядай:

    keyset pagination

---

# 132. Типова помилка №11

### "Повільний SQL завжди означає поганий SQL"

Не обов'язково.

Причина може бути:

    lock
    disk I/O
    CPU
    network
    connection pool
    application code
    N+1

---

# 133. Типова помилка №12

### "EXPLAIN треба вчити напам'ять"

Ні.

Потрібно навчитися читати:

    scan
    rows
    cost
    actual time
    loops
    buffers
    joins

і ставити питання:

> Чому PostgreSQL вибрав саме цей plan?

---

# 134. Простий алгоритм читання EXPLAIN

Коли бачиш plan:

    1. Знайди найверхній node.
    2. Подивись child nodes.
    3. Знайди Seq Scan / Index Scan.
    4. Подивись estimated rows.
    5. Подивись actual rows.
    6. Порівняй їх.
    7. Подивись loops.
    8. Подивись actual time.
    9. Якщо потрібно — BUFFERS.
    10. Визнач bottleneck.

---

# 135. Performance checklist

Коли query повільний:

    [ ] EXPLAIN
    [ ] EXPLAIN ANALYZE
    [ ] BUFFERS
    [ ] estimated rows
    [ ] actual rows
    [ ] Seq Scan
    [ ] Index Scan
    [ ] JOIN
    [ ] Sort
    [ ] Aggregate
    [ ] loops
    [ ] I/O
    [ ] locks
    [ ] indexes
    [ ] statistics
    [ ] N+1
    [ ] pagination
    [ ] SELECT *

---

# 136. Performance workflow

Правильна послідовність:

    Query
       ↓
    Measure
       ↓
    EXPLAIN
       ↓
    EXPLAIN ANALYZE
       ↓
    Find bottleneck
       ↓
    Change
       ↓
    Measure again
       ↓
    Compare
       ↓
    Keep / revert

---

# 137. Performance optimization — головна ідея

Не:

    "Я знаю, що index допоможе."

А:

    "Я виміряв query,
     побачив Seq Scan,
     перевірив selectivity,
     створив index,
     повторив EXPLAIN ANALYZE
     і побачив результат."

Це вже engineering approach.

---

# 138. Що треба знати Junior

Junior повинен розуміти:

- що таке performance;
- що таке execution plan;
- `EXPLAIN`;
- `EXPLAIN ANALYZE`;
- `cost`;
- `rows`;
- `actual time`;
- `Seq Scan`;
- `Index Scan`;
- `Index Only Scan`;
- базову роль indexes;
- `ANALYZE`;
- `VACUUM`;
- чому `SELECT *` не завжди оптимальний;
- базову проблему N+1;
- `OFFSET` vs keyset pagination.

---

# 139. Що треба знати Middle

Middle:

- Query Planner;
- statistics;
- selectivity;
- `EXPLAIN (ANALYZE, BUFFERS)`;
- Bitmap Scan;
- Nested Loop;
- Hash Join;
- Merge Join;
- composite indexes;
- partial indexes;
- expression indexes;
- covering indexes;
- Index Only Scan;
- sorting;
- aggregation;
- JOIN optimization;
- connection pooling;
- locks;
- N+1;
- performance regression testing.

---

# 140. Що треба знати Advanced

Advanced:

- planner cost model;
- `pg_stat_statements`;
- `auto_explain`;
- wait events;
- lock analysis;
- buffer/cache behavior;
- WAL;
- I/O analysis;
- parallel query;
- partitioning;
- extended statistics;
- prepared statements;
- generic vs custom plans;
- JIT;
- work_mem;
- shared_buffers;
- effective_cache_size;
- maintenance_work_mem;
- autovacuum tuning;
- query benchmarking;
- production observability.

---

# 141. pg_stat_statements

Для production performance analysis дуже корисний extension:

    pg_stat_statements

Він дозволяє збирати statistics щодо SQL queries.

Наприклад, можна аналізувати:

    calls
    total execution time
    mean execution time
    rows

Це вже наступний рівень після ручного `EXPLAIN`.

---

# 142. auto_explain

Ще один advanced tool:

    auto_explain

Він може автоматично логувати execution plans для повільних queries.

Це корисно для:

    production diagnostics

але потребує правильної configuration.

---

# 143. PostgreSQL Configuration

Performance залежить також від configuration.

Серед важливих параметрів:

    shared_buffers
    work_mem
    maintenance_work_mem
    effective_cache_size
    random_page_cost
    seq_page_cost
    max_connections

Не потрібно змінювати їх випадково.

Спочатку:

    measure
       ↓
    understand workload
       ↓
    change configuration
       ↓
    measure again

---

# 144. work_mem

`work_mem` використовується для окремих операцій, таких як:

    sort
    hash operations

Якщо недостатньо:

    можуть виникати додаткові disk operations.

Але збільшення `work_mem` бездумно може бути небезпечним, тому що воно застосовується не просто "один раз на database".

---

# 145. shared_buffers

`shared_buffers` визначає обсяг пам'яті, який PostgreSQL використовує для своїх shared buffers.

Це важливий параметр PostgreSQL performance.

Але:

> Не налаштовуй його випадково тільки тому, що побачив його в tutorial.

---

# 146. effective_cache_size

Це planner hint щодо обсягу filesystem cache, який потенційно доступний для database workload.

Він не резервує пам'ять.

Він допомагає Planner оцінювати вартість access paths.

---

# 147. Parallel Query

PostgreSQL може використовувати parallel execution.

Наприклад, plan може містити:

    Gather
       ↓
    Parallel Seq Scan

Для великих datasets це може прискорити деякі queries.

Але parallelism має overhead і не потрібен для маленьких queries.

---

# 148. Partitioning

Для дуже великих tables можна використовувати:

    Partitioning

Наприклад:

    events
       │
       ├── events_2024
       ├── events_2025
       └── events_2026

Query, який фільтрує:

    WHERE created_at >= '2026-01-01'

може скористатися:

    partition pruning

Це advanced topic.

---

# 149. Performance і Schema Design

Performance починається не тільки з index.

Важливі:

    правильні data types
    нормальна schema
    constraints
    indexes
    query design
    pagination
    transactions
    connection pooling

Тому:

> Хороша performance — це результат правильної системи, а не одного index.

---

# 150. Performance і Data Modeling

Погана модель:

    одна величезна table
       +
    багато duplicated data
       +
    відсутність constraints
       +
    відсутність indexes

може створити performance problems.

Але і надмірна нормалізація може створювати:

    багато JOINs

Тому database design і performance потрібно розглядати разом.

---

# 151. Performance і Transactions

Довга transaction може:

- утримувати locks;
- перешкоджати cleanup;
- збільшувати contention;
- впливати на vacuum.

Наприклад:

    BEGIN;

    UPDATE ...

    -- transaction залишається відкритою
    -- дуже довго

Це може створювати проблеми.

---

# 152. Performance і Locks

Повільний Backend:

    HTTP request
       ↓
    SQL query
       ↓
    waiting for lock
       ↓
    response after 10 seconds

може виглядати як:

    "SQL повільний"

але реальна причина:

    lock contention

Тому performance debugging потребує ширшого погляду.

---

# 153. Практична модель для Full Stack

Для твого Nest.js проекту:

    HTTP request
          ↓
       Nest.js
          ↓
       service
          ↓
       repository / ORM
          ↓
       SQL query
          ↓
    PostgreSQL Planner
          ↓
    Execution Plan
          ↓
    Index / Scan / Join
          ↓
       Result
          ↓
       Nest.js
          ↓
       Response

Якщо API повільний, потрібно перевіряти весь ланцюг.

---

# 154. Full Stack Performance Debugging

Наприклад:

    GET /users

повільний.

Не роби відразу:

    CREATE INDEX ...

Спочатку:

    Browser
       ↓
    HTTP timing
       ↓
    Nest.js timing
       ↓
    SQL timing
       ↓
    EXPLAIN ANALYZE
       ↓
    PostgreSQL

Так можна знайти реальний bottleneck.

---

# 155. Практичний mini-project

Створи:

    performance_lab

Schema:

    app

Tables:

    users
    orders
    products

Зроби:

    100000+ users
    500000+ orders

Потім досліджуй:

    SELECT
    WHERE
    ORDER BY
    LIMIT
    OFFSET
    JOIN
    GROUP BY
    COUNT

Для кожного:

    EXPLAIN
    EXPLAIN ANALYZE
    EXPLAIN (ANALYZE, BUFFERS)

---

# 156. Mini-project — етап 1

Створи:

    users

Наповни:

    100000 rows

Перевір:

    SELECT COUNT(*)
    FROM users;

---

# 157. Mini-project — етап 2

Query:

    SELECT *
    FROM users
    WHERE email = 'user90000@example.com';

Зроби:

    EXPLAIN ANALYZE

Запиши результат.

---

# 158. Mini-project — етап 3

Створи:

    CREATE INDEX users_email_idx
    ON users (email);

Повтори:

    EXPLAIN ANALYZE

Порівняй:

    before
    after

---

# 159. Mini-project — етап 4

Досліди:

    ORDER BY
    LIMIT
    OFFSET

Порівняй:

    OFFSET 100
    OFFSET 10000
    OFFSET 90000

---

# 160. Mini-project — етап 5

Зроби:

    keyset pagination

Наприклад:

    WHERE id > 90000
    ORDER BY id
    LIMIT 20

Порівняй з:

    OFFSET 90000

---

# 161. Mini-project — етап 6

Створи:

    orders

з:

    user_id

Зроби JOIN.

Потім додай:

    INDEX orders(user_id)

Порівняй execution plans.

---

# 162. Mini-project — етап 7

Зроби:

    GROUP BY

Наприклад:

    SELECT
        user_id,
        COUNT(*)
    FROM orders
    GROUP BY user_id;

Проаналізуй:

    Aggregate
    HashAggregate
    Sort
    Scan

---

# 163. Mini-project — етап 8

Для кожного query запиши:

    Query:
    Before:
    Index:
    After:
    Execution Time:
    Rows:
    Buffers:
    Plan:
    Conclusion:

Це може стати твоїм маленьким:

    PostgreSQL Performance Notebook

---

# 164. Шпаргалка

## EXPLAIN

    EXPLAIN
    SELECT ...;

## EXPLAIN ANALYZE

    EXPLAIN ANALYZE
    SELECT ...;

## BUFFERS

    EXPLAIN (ANALYZE, BUFFERS)
    SELECT ...;

---

# 165. Statistics

## ANALYZE table

    ANALYZE users;

## Уся database

    ANALYZE;

## Vacuum + statistics

    VACUUM ANALYZE users;

---

# 166. Index

## B-tree

    CREATE INDEX users_email_idx
    ON users (email);

## Composite

    CREATE INDEX users_status_created_idx
    ON users (status, created_at);

## Partial

    CREATE INDEX users_active_idx
    ON users (created_at)
    WHERE is_active = true;

## Expression

    CREATE INDEX users_lower_email_idx
    ON users (LOWER(email));

## INCLUDE

    CREATE INDEX users_email_idx
    ON users (email)
    INCLUDE (name);

---

# 167. Основні Scan Nodes

    Seq Scan
        ↓
    читає table

    Index Scan
        ↓
    використовує index

    Index Only Scan
        ↓
    може отримати дані з index

    Bitmap Index Scan
        ↓
    знаходить row locations

    Bitmap Heap Scan
        ↓
    читає відповідні table pages

---

# 168. Основні Join Nodes

    Nested Loop
    Hash Join
    Merge Join

---

# 169. Основні Aggregate Nodes

    Aggregate
    HashAggregate
    GroupAggregate

---

# 170. Основні EXPLAIN metrics

    cost
        ↓
    planner cost

    rows
        ↓
    estimated rows

    actual rows
        ↓
    real rows

    actual time
        ↓
    real execution time

    loops
        ↓
    number of executions

    Buffers
        ↓
    page/cache activity

---

# 171. Що шукати в EXPLAIN

Перш за все:

    Seq Scan
    Index Scan
    Bitmap Scan
    Nested Loop
    Hash Join
    Merge Join
    Sort
    Aggregate

Потім:

    estimated rows
    actual rows
    loops
    actual time
    buffers

---

# 172. Performance mental model

Запам'ятай:

    SQL
      ↓
    Planner
      ↓
    Execution Plan
      ↓
    Scan
      ↓
    Filter / Join / Sort / Aggregate
      ↓
    Result

Performance залежить від:

    Query
       +
    Data
       +
    Statistics
       +
    Indexes
       +
    Execution Plan
       +
    Hardware / I/O
       +
    Locks
       +
    Application architecture

---

# 173. Найважливіше з цього розділу

Якщо звести весь розділ до основних правил:

1. **`EXPLAIN` показує execution plan.**

2. **`EXPLAIN ANALYZE` реально виконує query і показує actual execution statistics.**

3. **`EXPLAIN ANALYZE` небезпечний для `INSERT`, `UPDATE`, `DELETE`, бо statement реально виконується.**

4. **`cost` — це planner cost units, а не milliseconds.**

5. **`actual time` і `Execution Time` — реальний час виконання.**

6. **`rows` — estimated rows, а `actual rows` — фактичні rows.**

7. **Велика різниця між estimated і actual rows може свідчити про проблеми зі statistics або data distribution.**

8. **`Seq Scan` не означає автоматично проблему.**

9. **Index не завжди швидший за Sequential Scan.**

10. **Selectivity має велике значення для ефективності index.**

11. **Indexes прискорюють деякі reads, але мають ціну для writes і storage.**

12. **Foreign key не означає автоматичний index на referencing column.**

13. **`ANALYZE` оновлює statistics для Planner.**

14. **`VACUUM` виконує maintenance MVCC storage.**

15. **`EXPLAIN (ANALYZE, BUFFERS)` допомагає побачити buffer/page activity.**

16. **JOIN може використовувати Nested Loop, Hash Join або Merge Join.**

17. **Великі OFFSET можуть бути дорогими.**

18. **Keyset pagination часто краще масштабується для великих datasets.**

19. **N+1 може зробити Backend повільним навіть при швидких окремих queries.**

20. **Не оптимізуй на око — вимірюй до і після.**

---

# 174. Контрольні питання

Перед переходом далі спробуй відповісти без підглядання:

1. Що таке Query Planner?
2. Що таке Execution Plan?
3. Для чого потрібен `EXPLAIN`?
4. Чим `EXPLAIN` відрізняється від `EXPLAIN ANALYZE`?
5. Чому `EXPLAIN ANALYZE` небезпечний для `DELETE`?
6. Що таке `cost`?
7. Чи є `cost` milliseconds?
8. Що таке `rows`?
9. Що таке `actual rows`?
10. Чому estimated rows важливі?
11. Що таке Sequential Scan?
12. Чи завжди Seq Scan поганий?
13. Що таке Index Scan?
14. Що таке Index Only Scan?
15. Що таке Bitmap Scan?
16. Що таке selectivity?
17. Чому index може погіршувати INSERT?
18. Що робить `ANALYZE`?
19. Що робить `VACUUM`?
20. Що показує `BUFFERS`?
21. Що таке Nested Loop?
22. Що таке Hash Join?
23. Що таке Merge Join?
24. Чому Foreign Key column часто потребує окремого index?
25. Чому великий OFFSET може бути повільним?
26. Що таке keyset pagination?
27. Що таке N+1 problem?
28. Чому `SELECT *` не завжди оптимальний?
29. Чому не потрібно створювати index на кожну column?
30. Як би ти діагностував повільний query у Nest.js + PostgreSQL?

---

# 175. Фінальна ментальна модель

Не думай:

    "Query повільний → додам index."

Думай:

    Query
       ↓
    EXPLAIN
       ↓
    Execution Plan
       ↓
    EXPLAIN ANALYZE
       ↓
    Actual behavior
       ↓
    Find bottleneck
       ↓
    Change
       ↓
    EXPLAIN ANALYZE
       ↓
    Compare

І дивись на database як на систему:

    SQL
      ↓
    Query Planner
      ↓
    Statistics
      ↓
    Execution Plan
      ↓
    ┌─────────────────────────┐
    │ Seq Scan                │
    │ Index Scan              │
    │ Bitmap Scan             │
    │ Index Only Scan         │
    │ Nested Loop             │
    │ Hash Join               │
    │ Merge Join              │
    │ Sort                    │
    │ Aggregate               │
    └─────────────────────────┘
      ↓
    Buffers / I/O / CPU
      ↓
    Result

А для Full Stack:

    Browser
       ↓
    Next.js / React
       ↓
    HTTP
       ↓
    Nest.js
       ↓
    Connection Pool
       ↓
    SQL
       ↓
    PostgreSQL Planner
       ↓
    Execution Plan
       ↓
    Index / Scan / Join / Aggregate
       ↓
    PostgreSQL
       ↓
    Result
       ↓
    Nest.js
       ↓
    HTTP Response

Головна думка:

> **Performance — це не вміння ставити indexes. Performance — це вміння виміряти, зрозуміти execution plan, знайти bottleneck, зробити обґрунтовану зміну та перевірити результат.**
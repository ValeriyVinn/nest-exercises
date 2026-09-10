# PostgreSQL Transactions

## 17. Transactions

Транзакції — це механізм PostgreSQL, який дозволяє об'єднати кілька SQL-операцій в одну логічну операцію.

Головна ідея:

> Або виконуються всі операції транзакції, або не виконується жодна.

Це особливо важливо, коли одна бізнес-операція складається з декількох змін у базі даних.

Наприклад, переказ грошей:

    account A: -100
    account B: +100

Не можна допустити ситуацію:

    account A: -100
    account B: 0

Тому обидві зміни повинні бути частиною однієї транзакції.

---

# 1. Що таке транзакція

Транзакція — це група SQL-операцій, яка виконується як єдине ціле.

У найпростішому вигляді:

    BEGIN;

    SQL-операція 1;
    SQL-операція 2;
    SQL-операція 3;

    COMMIT;

Якщо щось пішло не так:

    BEGIN;

    SQL-операція 1;
    SQL-операція 2;

    ROLLBACK;

---

# 2. Навіщо потрібні транзакції

Без транзакцій декілька пов'язаних операцій можуть залишити базу в неправильному стані.

Наприклад:

    INSERT INTO orders (...);

    INSERT INTO order_items (...);

    UPDATE products
    SET stock = stock - 1
    WHERE id = 10;

Якщо перша і друга операції виконалися, а третя завершилася помилкою, база може залишитися у непослідовному стані.

З транзакцією:

    BEGIN;

    INSERT INTO orders (...);

    INSERT INTO order_items (...);

    UPDATE products
    SET stock = stock - 1
    WHERE id = 10;

    COMMIT;

Або при помилці:

    ROLLBACK;

У такому випадку зміни всієї транзакції скасовуються.

---

# 3. ACID

Транзакції базуються на чотирьох фундаментальних властивостях — ACID.

## A — Atomicity

Атомарність.

Транзакція виконується повністю або не виконується взагалі.

Наприклад:

    BEGIN;

    UPDATE accounts
    SET balance = balance - 100
    WHERE id = 1;

    UPDATE accounts
    SET balance = balance + 100
    WHERE id = 2;

    COMMIT;

Якщо друга операція не може виконатися, можна зробити:

    ROLLBACK;

І перша зміна також буде скасована.

---

## C — Consistency

Узгодженість.

Після завершення транзакції база повинна залишатися у валідному стані.

Наприклад, якщо таблиця має:

    CHECK (balance >= 0)

то транзакція не повинна залишити баланс від'ємним.

---

## I — Isolation

Ізоляція.

Одночасні транзакції не повинні неконтрольовано бачити проміжні результати одна одної.

PostgreSQL використовує MVCC для реалізації конкурентного доступу.

---

## D — Durability

Надійність збереження.

Після успішного:

    COMMIT;

зміни вважаються збереженими навіть після завершення сесії.

---

# 4. Основні команди

Основні SQL-команди:

    BEGIN;
    COMMIT;
    ROLLBACK;

Також існують:

    START TRANSACTION;
    SAVEPOINT;
    ROLLBACK TO SAVEPOINT;
    RELEASE SAVEPOINT;

---

# 5. BEGIN

`BEGIN` починає транзакцію.

    BEGIN;

Після цього SQL-операції виконуються в межах транзакції.

Наприклад:

    BEGIN;

    INSERT INTO users (name)
    VALUES ('Ivan');

    UPDATE users
    SET name = 'Ivan Petrov'
    WHERE name = 'Ivan';

---

# 6. COMMIT

`COMMIT` підтверджує всі зміни транзакції.

    BEGIN;

    INSERT INTO users (name)
    VALUES ('Ivan');

    COMMIT;

Після `COMMIT` зміни стають постійними.

---

# 7. ROLLBACK

`ROLLBACK` скасовує зміни поточної транзакції.

    BEGIN;

    INSERT INTO users (name)
    VALUES ('Ivan');

    ROLLBACK;

Після цього вставленого користувача не буде.

---

# 8. Простий експеримент

Створимо тестову таблицю:

    CREATE TABLE transaction_test (
        id SERIAL PRIMARY KEY,
        name TEXT
    );

Починаємо транзакцію:

    BEGIN;

Вставляємо дані:

    INSERT INTO transaction_test (name)
    VALUES ('Alice');

Перевіряємо:

    SELECT *
    FROM transaction_test;

Тепер:

    ROLLBACK;

І знову:

    SELECT *
    FROM transaction_test;

Запис зникне, тому що транзакція була скасована.

---

# 9. COMMIT проти ROLLBACK

Схема:

    BEGIN
       ↓
    SQL operations
       ↓
    ┌───────────────┐
    │               │
    ↓               ↓
    COMMIT       ROLLBACK
    │               │
    ↓               ↓
    Зберегти      Скасувати

---

# 10. Помилка всередині транзакції

Важлива особливість PostgreSQL:

Якщо SQL-операція всередині транзакції завершилася помилкою, транзакція переходить у стан помилки.

Наприклад:

    BEGIN;

    INSERT INTO users (id, name)
    VALUES (1, 'Alice');

    INSERT INTO users (id, name)
    VALUES (1, 'Bob');

Друга операція може завершитися помилкою через `PRIMARY KEY`.

Після цього PostgreSQL не дозволить просто продовжити:

    INSERT INTO users (id, name)
    VALUES (2, 'Charlie');

Потрібно:

    ROLLBACK;

Після цього можна почати нову транзакцію.

---

# 11. SAVEPOINT

`SAVEPOINT` створює проміжну точку всередині транзакції.

Наприклад:

    BEGIN;

    INSERT INTO users (name)
    VALUES ('Alice');

    SAVEPOINT step_1;

    INSERT INTO users (name)
    VALUES ('Bob');

    ROLLBACK TO SAVEPOINT step_1;

    COMMIT;

У результаті:

    Alice → збережеться
    Bob   → буде скасований

---

# 12. ROLLBACK TO SAVEPOINT

Повернення до конкретної точки:

    ROLLBACK TO SAVEPOINT step_1;

Це не скасовує всю транзакцію.

Воно скасовує операції після цього `SAVEPOINT`.

---

# 13. RELEASE SAVEPOINT

Коли точка більше не потрібна:

    RELEASE SAVEPOINT step_1;

---

# 14. Повний приклад SAVEPOINT

    BEGIN;

    INSERT INTO users (name)
    VALUES ('Alice');

    SAVEPOINT first_step;

    INSERT INTO users (name)
    VALUES ('Bob');

    ROLLBACK TO SAVEPOINT first_step;

    INSERT INTO users (name)
    VALUES ('Charlie');

    COMMIT;

Результат:

    Alice
    Charlie

`Bob` буде скасований.

---

# 15. Транзакції та psql

У `psql` можна побачити зміну prompt.

Наприклад:

    postgres=#

Після:

    BEGIN;

може з'явитися:

    postgres=*#

Символ `*` означає, що зараз активна транзакція.

Після:

    COMMIT;

або:

    ROLLBACK;

prompt повернеться до:

    postgres=#

---

# 16. Autocommit

У PostgreSQL кожна окрема SQL-команда зазвичай виконується як окрема транзакція, якщо явно не створити власну.

Наприклад:

    INSERT INTO users (name)
    VALUES ('Alice');

Фактично це:

    BEGIN;

    INSERT INTO users (name)
    VALUES ('Alice');

    COMMIT;

Для користувача це автоматично обробляється клієнтом.

Це називається `autocommit`.

---

# 17. Явна транзакція

Якщо потрібно об'єднати декілька операцій:

    BEGIN;

    INSERT INTO orders (...);

    INSERT INTO order_items (...);

    UPDATE products
    SET stock = stock - 1
    WHERE id = 10;

    COMMIT;

Тепер усі операції належать одній транзакції.

---

# 18. Транзакція для створення замовлення

Уявімо:

    orders
    order_items
    products

Створення замовлення може виглядати так:

    BEGIN;

    INSERT INTO orders (user_id)
    VALUES (1);

    INSERT INTO order_items (order_id, product_id, quantity)
    VALUES (10, 5, 2);

    UPDATE products
    SET stock = stock - 2
    WHERE id = 5;

    COMMIT;

Якщо недостатньо товару:

    ROLLBACK;

---

# 19. Перевірка даних перед зміною

Транзакція часто використовується разом із перевіркою.

Наприклад:

    BEGIN;

    SELECT stock
    FROM products
    WHERE id = 5;

    UPDATE products
    SET stock = stock - 1
    WHERE id = 5;

    COMMIT;

Але в реальному конкурентному середовищі простого `SELECT` може бути недостатньо.

Це приводить нас до блокувань.

---

# 20. MVCC

PostgreSQL використовує механізм:

> MVCC — Multi-Version Concurrency Control.

Ідея полягає в тому, що PostgreSQL працює з версіями рядків.

Це дозволяє транзакціям працювати одночасно з меншим взаємним блокуванням.

Спрощена модель:

    Transaction A
          │
          ├── читає дані
          │
          └── змінює дані

    Transaction B
          │
          ├── читає дані
          │
          └── працює паралельно

PostgreSQL контролює, яку версію рядка повинна бачити кожна транзакція.

---

# 21. Isolation Levels

SQL визначає рівні ізоляції транзакцій.

У PostgreSQL доступні:

    READ COMMITTED
    REPEATABLE READ
    SERIALIZABLE

Також SQL-стандарт містить:

    READ UNCOMMITTED

Але PostgreSQL фактично обробляє його як:

    READ COMMITTED

---

# 22. READ COMMITTED

Це стандартний рівень ізоляції PostgreSQL.

    SHOW transaction_isolation;

Типовий результат:

    read committed

Особливість:

> кожна SQL-команда бачить дані, які були зафіксовані до початку цієї команди.

Наприклад:

    BEGIN;

    SELECT balance
    FROM accounts
    WHERE id = 1;

    -- інша транзакція може змінити дані

    SELECT balance
    FROM accounts
    WHERE id = 1;

Два `SELECT` можуть побачити різні результати, якщо інша транзакція встигла зробити `COMMIT`.

---

# 23. REPEATABLE READ

При:

    SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

транзакція працює зі стабільним snapshot.

Наприклад:

    BEGIN;

    SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

    SELECT *
    FROM products;

    -- інша транзакція змінює products і робить COMMIT

    SELECT *
    FROM products;

У межах цієї транзакції PostgreSQL забезпечує повторюваний snapshot.

---

# 24. SERIALIZABLE

Найсуворіший рівень:

    BEGIN;

    SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

    ...

    COMMIT;

Ідея:

> результат конкурентного виконання повинен бути еквівалентним деякому послідовному виконанню транзакцій.

При конфлікті PostgreSQL може завершити транзакцію помилкою serialization failure.

Тоді застосунок повинен повторити транзакцію.

---

# 25. Встановлення isolation level

Для поточної транзакції:

    BEGIN;

    SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

    ...

    COMMIT;

Або:

    BEGIN ISOLATION LEVEL SERIALIZABLE;

    ...

    COMMIT;

---

# 26. Поточний isolation level

Перевірити:

    SHOW transaction_isolation;

---

# 27. Блокування рядка

Іноді потрібно сказати PostgreSQL:

> Я збираюся змінити цей рядок, не дозволяй іншій транзакції одночасно змінити його.

Для цього використовується:

    SELECT ...
    FOR UPDATE;

Наприклад:

    BEGIN;

    SELECT *
    FROM accounts
    WHERE id = 1
    FOR UPDATE;

    UPDATE accounts
    SET balance = balance - 100
    WHERE id = 1;

    COMMIT;

Рядок буде заблокований для конфліктуючих операцій до завершення транзакції.

---

# 28. FOR UPDATE

Типовий сценарій:

    BEGIN;

    SELECT balance
    FROM accounts
    WHERE id = 1
    FOR UPDATE;

    UPDATE accounts
    SET balance = balance - 100
    WHERE id = 1;

    COMMIT;

Це корисно, коли потрібно:

1. прочитати рядок;
2. перевірити його;
3. змінити;
4. не допустити конфлікту між конкурентними транзакціями.

---

# 29. FOR SHARE

Для блокування, яке дозволяє читання, але захищає від певних конфліктуючих змін:

    SELECT *
    FROM products
    WHERE id = 10
    FOR SHARE;

Це більш спеціалізований механізм.

Для початку достатньо добре розуміти:

    FOR UPDATE

---

# 30. SELECT ... FOR UPDATE і складська кількість

Уявімо:

    products

    id | name   | stock
    ---+--------+------
    1  | Laptop | 1

Дві транзакції одночасно хочуть купити останній товар.

Без правильного контролю можна отримати race condition.

З блокуванням:

    BEGIN;

    SELECT stock
    FROM products
    WHERE id = 1
    FOR UPDATE;

    UPDATE products
    SET stock = stock - 1
    WHERE id = 1;

    COMMIT;

Друга транзакція буде чекати звільнення блокування.

---

# 31. Race Condition

Race condition — ситуація, коли результат залежить від порядку виконання конкурентних операцій.

Проблемний сценарій:

    Transaction A:
    SELECT stock → 1

    Transaction B:
    SELECT stock → 1

    Transaction A:
    UPDATE stock → 0

    Transaction B:
    UPDATE stock → -1

Тут бізнес-логіка може бути порушена.

Транзакції та блокування допомагають контролювати такі ситуації.

---

# 32. Atomic UPDATE

Іноді окремий `SELECT FOR UPDATE` взагалі не потрібен.

Наприклад:

    UPDATE products
    SET stock = stock - 1
    WHERE id = 1
      AND stock > 0;

Після цього можна перевірити кількість змінених рядків.

Якщо:

    1 row

товар був доступний.

Якщо:

    0 rows

товару не було.

Це часто простіше та ефективніше.

---

# 33. Deadlock

Deadlock — взаємне блокування.

Наприклад:

    Transaction A
    locks row 1
         ↓
    waits for row 2

    Transaction B
    locks row 2
         ↓
    waits for row 1

Отримуємо:

    A → чекає B
    B → чекає A

PostgreSQL виявляє deadlock і примусово завершує одну з транзакцій.

---

# 34. Як виникає deadlock

Наприклад:

Transaction A:

    BEGIN;

    UPDATE accounts
    SET balance = balance - 10
    WHERE id = 1;

    UPDATE accounts
    SET balance = balance + 10
    WHERE id = 2;

Transaction B одночасно:

    BEGIN;

    UPDATE accounts
    SET balance = balance - 10
    WHERE id = 2;

    UPDATE accounts
    SET balance = balance + 10
    WHERE id = 1;

Може виникнути взаємне очікування.

---

# 35. Як зменшити ризик deadlock

Один із важливих принципів:

> Блокувати ресурси завжди в однаковому порядку.

Наприклад, завжди спочатку:

    id = 1

потім:

    id = 2

а не навпаки.

Також:

- тримати транзакції короткими;
- не виконувати зайву роботу всередині транзакції;
- уникати непотрібних блокувань;
- правильно проєктувати порядок оновлень.

---

# 36. Транзакція і зовнішній API

Погана ідея:

    BEGIN;

    INSERT INTO orders (...);

    -- довгий HTTP request
    POST external-api;

    UPDATE orders (...);

    COMMIT;

Не варто тримати транзакцію відкритою під час довгого мережевого запиту без необхідності.

Краще:

    отримати необхідні дані
          ↓
    виконати зовнішню логіку
          ↓
    коротка DB-транзакція
          ↓
    COMMIT

Або використовувати спеціальні патерни для складних розподілених операцій.

---

# 37. Транзакції в backend

У Full Stack застосунку типовий ланцюжок:

    React / Next.js
          ↓
    HTTP request
          ↓
    Nest.js / Node.js
          ↓
    PostgreSQL
          ↓
    BEGIN
          ↓
    SQL 1
    SQL 2
    SQL 3
          ↓
    COMMIT

При помилці:

    BEGIN
       ↓
    SQL
       ↓
    ERROR
       ↓
    ROLLBACK
       ↓
    HTTP error response

---

# 38. Транзакція — це не frontend-механізм

Транзакція належить до рівня бази даних.

Frontend не повинен вирішувати:

    BEGIN
    COMMIT
    ROLLBACK

Зазвичай це робить backend.

Наприклад:

    React
      ↓
    POST /orders
      ↓
    Nest.js
      ↓
    PostgreSQL transaction

---

# 39. Транзакції та ORM

Якщо використовувати ORM або query builder, транзакції все одно існують на рівні PostgreSQL.

Наприклад, концептуально:

    transaction(async (tx) => {
        await tx.createOrder();
        await tx.createOrderItem();
        await tx.updateProduct();
    });

ORM в результаті створює відповідні SQL-транзакції.

Тому важливо розуміти SQL-транзакції навіть при використанні ORM.

---

# 40. Транзакція не означає "все заблоковано"

Поширена помилка:

> Якщо почалася транзакція, вся база блокується.

Це неправильно.

Транзакція сама по собі не означає блокування всієї бази.

PostgreSQL використовує MVCC і різні типи блокувань.

Блокування залежать від конкретних операцій.

---

# 41. Транзакція і constraints

Constraints працюють разом із транзакціями.

Наприклад:

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL
    );

Тепер:

    BEGIN;

    INSERT INTO users (email)
    VALUES ('a@example.com');

    INSERT INTO users (email)
    VALUES ('a@example.com');

    COMMIT;

Друга операція порушить `UNIQUE`.

Транзакція буде у стані помилки.

Потрібно:

    ROLLBACK;

---

# 42. DEFERRABLE constraints

Деякі constraints можна зробити відкладеними.

Наприклад:

    DEFERRABLE INITIALLY DEFERRED

Це означає, що перевірка constraint може виконуватися не одразу, а наприкінці транзакції.

Приклад:

    CREATE TABLE example (
        id INTEGER PRIMARY KEY,
        parent_id INTEGER,
        CONSTRAINT fk_parent
            FOREIGN KEY (parent_id)
            REFERENCES example(id)
            DEFERRABLE INITIALLY DEFERRED
    );

Це advanced-тема.

На початковому рівні достатньо знати, що PostgreSQL дозволяє відкладати певні перевірки constraints до кінця транзакції.

---

# 43. Транзакції та DELETE

Наприклад:

    BEGIN;

    DELETE FROM users
    WHERE id = 10;

Перевіряємо:

    SELECT *
    FROM users
    WHERE id = 10;

Якщо все правильно:

    COMMIT;

Якщо передумали:

    ROLLBACK;

---

# 44. Транзакції та UPDATE

    BEGIN;

    UPDATE users
    SET name = 'New Name'
    WHERE id = 10;

    SELECT *
    FROM users
    WHERE id = 10;

    ROLLBACK;

Зміна буде скасована.

---

# 45. Транзакції та INSERT

    BEGIN;

    INSERT INTO users (name)
    VALUES ('Alice');

    INSERT INTO users (name)
    VALUES ('Bob');

    COMMIT;

Обидва записи будуть збережені.

Або:

    ROLLBACK;

Обидва будуть скасовані.

---

# 46. Транзакції та DDL

PostgreSQL підтримує транзакційне виконання багатьох DDL-операцій.

Наприклад:

    BEGIN;

    CREATE TABLE test_table (
        id INTEGER
    );

    ROLLBACK;

У PostgreSQL створення таблиці в такому сценарії можна скасувати разом із транзакцією.

Це одна з сильних можливостей PostgreSQL.

Однак не всі операції PostgreSQL поводяться однаково в транзакціях, тому для спеціальних адміністративних команд потрібно перевіряти документацію.

---

# 47. Транзакція з перевіркою результату

Практичний шаблон:

    BEGIN;

    UPDATE products
    SET stock = stock - 1
    WHERE id = 10
      AND stock > 0;

    -- перевірити, чи було змінено рядок

    COMMIT;

Якщо рядок не змінився:

    ROLLBACK;

У backend ця логіка може перетворитися на:

    if (updatedRows === 0) {
        throw new Error('Product is out of stock');
    }

---

# 48. Короткі транзакції

Хороша практика:

    BEGIN;

    потрібний SELECT / UPDATE / INSERT;

    COMMIT;

Погана практика:

    BEGIN;

    SELECT ...

    -- довга обробка
    -- HTTP request
    -- очікування користувача
    -- складні обчислення

    COMMIT;

Чим довше живе транзакція, тим більше ресурсів вона може утримувати.

---

# 49. Транзакція повинна мати чітку бізнес-мету

Хороша транзакція:

    створити замовлення
    +
    створити позиції замовлення
    +
    зменшити залишок товару

Це одна бізнес-операція.

Погано об'єднувати в одну транзакцію незалежні операції тільки "про всяк випадок".

---

# 50. Типовий backend-сценарій

Наприклад, створення замовлення:

    BEGIN;

    -- 1. створити order
    INSERT INTO orders (...);

    -- 2. створити order_items
    INSERT INTO order_items (...);

    -- 3. зменшити stock
    UPDATE products
    SET stock = stock - 1
    WHERE id = 10
      AND stock > 0;

    -- 4. перевірити результат

    COMMIT;

Якщо будь-який критичний крок не виконався:

    ROLLBACK;

---

# 51. Транзакції і помилки

Backend повинен обробляти помилки.

Концептуально:

    try {
        BEGIN

        operation 1
        operation 2
        operation 3

        COMMIT
    } catch (error) {
        ROLLBACK

        throw error
    }

У конкретному Nest.js / Node.js коді синтаксис залежатиме від бібліотеки доступу до PostgreSQL.

---

# 52. Транзакції і connection

Важливий момент для backend:

> Усі SQL-команди однієї транзакції повинні виконуватися через одне й те саме database connection.

Концептуально:

    connection.begin();

    connection.query(...);
    connection.query(...);
    connection.query(...);

    connection.commit();

Не можна безконтрольно розкидати операції однієї транзакції між різними connections із connection pool.

---

# 53. Connection Pool

У production backend зазвичай використовується connection pool.

Наприклад:

    Backend
       │
       ├── connection 1
       ├── connection 2
       ├── connection 3
       └── connection 4

Коли починається транзакція:

    pool → отримати connection
              ↓
           BEGIN
              ↓
           SQL
              ↓
           SQL
              ↓
           COMMIT
              ↓
        release connection

Це важливо розуміти при роботі з PostgreSQL у Node.js/Nest.js.

---

# 54. COMMIT або ROLLBACK

Корисне правило:

    BEGIN
      ↓
    виконати операції
      ↓
    усе добре?
      ├── YES → COMMIT
      │
      └── NO  → ROLLBACK

---

# 55. Практика 1 — COMMIT

Створити таблицю:

    CREATE TABLE transaction_users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
    );

Почати транзакцію:

    BEGIN;

Вставити:

    INSERT INTO transaction_users (name)
    VALUES ('Alice');

Перевірити:

    SELECT *
    FROM transaction_users;

Підтвердити:

    COMMIT;

Знову:

    SELECT *
    FROM transaction_users;

### Завдання

Переконайся, що запис залишився після `COMMIT`.

---

# 56. Практика 2 — ROLLBACK

Почати:

    BEGIN;

Вставити:

    INSERT INTO transaction_users (name)
    VALUES ('Bob');

Перевірити:

    SELECT *
    FROM transaction_users;

Скасувати:

    ROLLBACK;

Перевірити:

    SELECT *
    FROM transaction_users;

### Завдання

Переконайся, що `Bob` зник.

---

# 57. Практика 3 — кілька операцій

Виконати:

    BEGIN;

    INSERT INTO transaction_users (name)
    VALUES ('Alice');

    INSERT INTO transaction_users (name)
    VALUES ('Bob');

    INSERT INTO transaction_users (name)
    VALUES ('Charlie');

    COMMIT;

Перевірити:

    SELECT *
    FROM transaction_users;

---

# 58. Практика 4 — скасувати всі операції

    BEGIN;

    INSERT INTO transaction_users (name)
    VALUES ('David');

    INSERT INTO transaction_users (name)
    VALUES ('Eve');

    INSERT INTO transaction_users (name)
    VALUES ('Frank');

    ROLLBACK;

Перевірити:

    SELECT *
    FROM transaction_users;

### Завдання

Переконайся, що жоден із трьох записів не залишився.

---

# 59. Практика 5 — SAVEPOINT

    BEGIN;

    INSERT INTO transaction_users (name)
    VALUES ('Alice');

    SAVEPOINT first_step;

    INSERT INTO transaction_users (name)
    VALUES ('Bob');

    ROLLBACK TO SAVEPOINT first_step;

    COMMIT;

Перевірити:

    SELECT *
    FROM transaction_users;

Очікувано:

    Alice → є
    Bob   → немає

---

# 60. Практика 6 — помилка

Створити:

    CREATE TABLE transaction_products (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    );

Виконати:

    BEGIN;

    INSERT INTO transaction_products (id, name)
    VALUES (1, 'Laptop');

    INSERT INTO transaction_products (id, name)
    VALUES (1, 'Phone');

Спробувати:

    SELECT *
    FROM transaction_products;

Після помилки:

    ROLLBACK;

Перевірити:

    SELECT *
    FROM transaction_products;

### Питання

Чи залишився `Laptop`?

---

# 61. Практика 7 — перевірка isolation level

Виконати:

    SHOW transaction_isolation;

Потім:

    BEGIN;

    SHOW transaction_isolation;

    COMMIT;

### Завдання

Запам'ятати стандартний рівень PostgreSQL.

---

# 62. Практика 8 — два psql вікна

Це дуже корисна практика.

Відкрити два підключення до PostgreSQL:

    Terminal A
    Terminal B

У A:

    BEGIN;

    UPDATE transaction_products
    SET name = 'Laptop updated'
    WHERE id = 1;

Не робити `COMMIT`.

У B спробувати змінити той самий рядок:

    UPDATE transaction_products
    SET name = 'Another name'
    WHERE id = 1;

Спостерігай за поведінкою.

Потім у A:

    COMMIT;

Подивись, що станеться в B.

---

# 63. Практика 9 — FOR UPDATE

У A:

    BEGIN;

    SELECT *
    FROM transaction_products
    WHERE id = 1
    FOR UPDATE;

Не робити `COMMIT`.

У B спробувати:

    UPDATE transaction_products
    SET name = 'Changed'
    WHERE id = 1;

Спостерігай за очікуванням.

Повернись у A:

    COMMIT;

Після цього B зможе продовжити.

---

# 64. Практика 10 — модель банківського переказу

Створити:

    CREATE TABLE accounts (
        id SERIAL PRIMARY KEY,
        owner TEXT NOT NULL,
        balance NUMERIC(12, 2) NOT NULL
    );

Додати:

    INSERT INTO accounts (owner, balance)
    VALUES
        ('Alice', 1000),
        ('Bob', 500);

Зробити переказ 100:

    BEGIN;

    UPDATE accounts
    SET balance = balance - 100
    WHERE owner = 'Alice';

    UPDATE accounts
    SET balance = balance + 100
    WHERE owner = 'Bob';

    COMMIT;

Перевірити:

    SELECT *
    FROM accounts;

Очікувано:

    Alice → 900
    Bob   → 600

---

# 65. Практика 11 — зламати переказ

Спробувати:

    BEGIN;

    UPDATE accounts
    SET balance = balance - 100
    WHERE owner = 'Alice';

    -- уявимо, що тут сталася помилка

    ROLLBACK;

Перевірити:

    SELECT *
    FROM accounts;

Баланс Alice повинен повернутися до попереднього значення.

---

# 66. Практика 12 — передача грошей із перевіркою

Більш реалістичний сценарій:

    BEGIN;

    UPDATE accounts
    SET balance = balance - 100
    WHERE owner = 'Alice'
      AND balance >= 100;

    UPDATE accounts
    SET balance = balance + 100
    WHERE owner = 'Bob';

    COMMIT;

### Питання

Що станеться, якщо у Alice недостатньо грошей?

Як покращити транзакцію так, щоб другий `UPDATE` не виконувався, якщо перший не змінив жодного рядка?

Це вже хороша задача для backend-мислення.

---

# 67. Типові помилки

## Помилка 1 — забути COMMIT

    BEGIN;

    UPDATE users
    SET name = 'New name'
    WHERE id = 1;

Якщо сесія завершиться або буде виконано `ROLLBACK`, зміни можуть бути скасовані.

---

## Помилка 2 — забути ROLLBACK після помилки

Після SQL-помилки транзакція може залишитися в aborted state.

Потрібно:

    ROLLBACK;

---

## Помилка 3 — занадто довга транзакція

Погано:

    BEGIN;

    -- SQL

    -- HTTP request

    -- довга обробка

    -- очікування

    COMMIT;

Транзакції повинні бути максимально короткими, наскільки це можливо.

---

## Помилка 4 — думати, що транзакція блокує всю БД

Транзакція ≠ блокування всієї бази.

PostgreSQL використовує MVCC і granular locking.

---

## Помилка 5 — ігнорувати race conditions

Простий код:

    SELECT stock FROM products;

    UPDATE products
    SET stock = stock - 1;

може бути проблемним при конкурентному доступі.

Потрібно думати про атомарні операції, constraints, блокування та isolation.

---

## Помилка 6 — використовувати SERIALIZABLE без розуміння

`SERIALIZABLE` не означає:

> PostgreSQL просто зробить усе послідовним без додаткових наслідків.

Можуть виникати serialization failures, які application code повинен обробляти та повторювати транзакцію.

---

# 68. Transactions vs Constraints

Це різні механізми.

### Constraint

Захищає правило даних.

Наприклад:

    email TEXT UNIQUE

### Transaction

Об'єднує кілька операцій.

Наприклад:

    INSERT order
    INSERT order_item
    UPDATE product

Разом вони забезпечують цілісність бізнес-операції.

---

# 69. Transactions vs Locks

Транзакція:

> визначає межі атомарної операції.

Lock:

> контролює конкурентний доступ до ресурсу.

Вони часто використовуються разом.

Наприклад:

    BEGIN;

    SELECT *
    FROM products
    WHERE id = 10
    FOR UPDATE;

    UPDATE products
    SET stock = stock - 1
    WHERE id = 10;

    COMMIT;

---

# 70. Transactions vs MVCC

MVCC:

> механізм PostgreSQL для роботи з версіями рядків і конкурентними транзакціями.

Transaction:

> логічна одиниця роботи.

Isolation level:

> визначає правила видимості та конкурентної поведінки транзакцій.

Lock:

> механізм координації конкурентного доступу.

Це пов'язані, але різні поняття.

---

# 71. Transactions vs SAVEPOINT

`BEGIN`:

    початок всієї транзакції

`SAVEPOINT`:

    проміжна точка

`ROLLBACK TO SAVEPOINT`:

    повернення до проміжної точки

`ROLLBACK`:

    скасування всієї транзакції

`COMMIT`:

    підтвердження всієї транзакції

---

# 72. Transactions vs Views

View:

> збережений SQL-запит.

Transaction:

> група операцій, яка виконується як одна логічна одиниця.

Вони вирішують абсолютно різні задачі.

---

# 73. Transactions vs Functions

Function:

> логіка, яка виконується всередині PostgreSQL.

Transaction:

> межа атомарності та ізоляції операцій.

Функції можуть виконувати SQL-операції в контексті транзакції, яка їх викликає.

---

# 74. Transactions у Full Stack

У твоєму стеку:

    React
       ↓
    Next.js
       ↓
    Nest.js / Node.js
       ↓
    PostgreSQL
       ↓
    Transaction

Наприклад:

    POST /orders

може запускати:

    BEGIN;

    INSERT INTO orders ...;

    INSERT INTO order_items ...;

    UPDATE products ...;

    COMMIT;

А при помилці:

    ROLLBACK;

---

# 75. Головна модель для запам'ятовування

Уявляй транзакцію як:

    BEGIN
       ↓
    "Я починаю одну бізнес-операцію"
       ↓
    SQL 1
       ↓
    SQL 2
       ↓
    SQL 3
       ↓
    усе добре?
       │
       ├── так → COMMIT
       │
       └── ні  → ROLLBACK

---

# 76. Шпаргалка

## Почати

    BEGIN;

або:

    START TRANSACTION;

## Завершити успішно

    COMMIT;

## Скасувати

    ROLLBACK;

## Створити точку

    SAVEPOINT name;

## Повернутися до точки

    ROLLBACK TO SAVEPOINT name;

## Видалити точку

    RELEASE SAVEPOINT name;

## Перевірити isolation level

    SHOW transaction_isolation;

## Встановити рівень

    BEGIN ISOLATION LEVEL REPEATABLE READ;

## Заблокувати рядок

    SELECT *
    FROM table_name
    WHERE id = 1
    FOR UPDATE;

---

# 77. Isolation levels — коротко

    READ COMMITTED
        ↓
    стандартний рівень PostgreSQL

    REPEATABLE READ
        ↓
    стабільний snapshot транзакції

    SERIALIZABLE
        ↓
    найсуворіша ізоляція
        ↓
    можливі serialization failures

---

# 78. Що потрібно знати Junior

Для Junior Full Stack Developer достатньо впевнено розуміти:

- що таке транзакція;
- `BEGIN`;
- `COMMIT`;
- `ROLLBACK`;
- `SAVEPOINT`;
- ACID;
- навіщо потрібна атомарність;
- що таке `autocommit`;
- чому кілька пов'язаних SQL-операцій потрібно об'єднувати;
- що транзакції використовуються на backend;
- що PostgreSQL підтримує MVCC;
- що таке race condition на базовому рівні;
- навіщо потрібні блокування;
- що робить `SELECT ... FOR UPDATE`;
- що таке isolation level.

---

# 79. Що потрібно знати Middle

Далі:

- `READ COMMITTED`;
- `REPEATABLE READ`;
- `SERIALIZABLE`;
- MVCC;
- row-level locks;
- deadlocks;
- serialization failures;
- transaction retries;
- connection pool;
- транзакції в ORM;
- atomic updates;
- правильне використання `FOR UPDATE`;
- довгі транзакції;
- конкурентні операції;
- constraints + transactions;
- performance implications.

---

# 80. Advanced

На наступному рівні:

- детальна модель MVCC;
- snapshots;
- lock modes;
- lock monitoring;
- `pg_locks`;
- deadlock analysis;
- serialization anomalies;
- transaction retry strategies;
- дефerrовані constraints;
- advisory locks;
- distributed transactions;
- two-phase commit;
- складні concurrency patterns.

---

# 81. Питання для самоперевірки

### Основи

1. Що таке транзакція?
2. Навіщо потрібен `BEGIN`?
3. Що робить `COMMIT`?
4. Що робить `ROLLBACK`?
5. Що таке ACID?
6. Що означає Atomicity?
7. Що означає Consistency?
8. Що означає Isolation?
9. Що означає Durability?

### Практика

10. Як скасувати останні зміни?
11. Як створити `SAVEPOINT`?
12. Чим `ROLLBACK` відрізняється від `ROLLBACK TO SAVEPOINT`?
13. Що станеться після SQL-помилки всередині транзакції?
14. Що таке autocommit?

### Concurrency

15. Що таке MVCC?
16. Що таке race condition?
17. Що робить `FOR UPDATE`?
18. Що таке deadlock?
19. Як зменшити ризик deadlock?
20. Що таке isolation level?

### Backend

21. Де повинна знаходитися транзакція — у React чи backend?
22. Чому всі операції однієї транзакції повинні використовувати одне connection?
23. Чому не варто робити довгий HTTP request усередині транзакції?
24. Як ORM працює з транзакціями?
25. Навіщо backend потрібні connection pools?

---

# 82. Практичний checklist

Перед використанням транзакції запитай себе:

- Чи є кілька пов'язаних операцій?
- Чи повинні вони виконатися всі разом?
- Що станеться, якщо друга операція завершиться помилкою?
- Чи потрібен `ROLLBACK`?
- Чи можливий конкурентний доступ?
- Чи виникає race condition?
- Чи потрібен `FOR UPDATE`?
- Чи можна зробити операцію атомарним `UPDATE`?
- Чи не буде транзакція занадто довгою?
- Чи всі операції використовують одне connection?
- Чи потрібно повторювати транзакцію після serialization failure?

---

# 83. Головна практична вправа

Побудуй маленьку модель магазину:

    users
        ↓
    orders
        ↓
    order_items
        ↓
    products

Реалізуй операцію:

    "Користувач купує товар"

Транзакція повинна:

1. створити `order`;
2. створити `order_item`;
3. зменшити `products.stock`;
4. перевірити, що товар був доступний;
5. при успіху зробити `COMMIT`;
6. при помилці зробити `ROLLBACK`.

Після цього спробуй змоделювати дві паралельні покупки одного останнього товару.

Потім порівняй:

    UPDATE ... WHERE stock > 0

і:

    SELECT ... FOR UPDATE

Це вже буде не просто вивчення синтаксису PostgreSQL, а реальна backend/database практика.

---

# 84. Підсумок

Транзакція — це спосіб сказати PostgreSQL:

> "Ці операції є однією логічною операцією. Або виконай їх усі, або не залишай жодної з цих змін."

Базова схема:

    BEGIN
      ↓
    SQL operations
      ↓
    COMMIT / ROLLBACK

Для реального Full Stack застосунку потрібно додати:

    Transactions
        +
    Constraints
        +
    MVCC
        +
    Isolation
        +
    Locks
        +
    Error handling

І тоді база даних стає не просто місцем, куди backend записує дані, а системою, яка допомагає гарантувати **цілісність і правильність бізнес-операцій**.

---

# 85. Головна думка

Запам'ятай три рівні:

    SQL
      ↓
    Transaction
      ↓
    Business operation

Наприклад:

    UPDATE product
          ↓
    одна SQL-операція

    INSERT order
    INSERT order_item
    UPDATE product
          ↓
    одна транзакція

    "Користувач купив товар"
          ↓
    одна бізнес-операція

Саме вміння бачити цей зв'язок:

    бізнес-операція
          ↓
    транзакція
          ↓
    SQL

є одним із ключових переходів від простого написання CRUD до справжнього backend/database мислення.
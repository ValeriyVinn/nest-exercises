# 07. INSERT / UPDATE / DELETE

## 📌 Визначення

`INSERT`, `UPDATE` та `DELETE` — це основні SQL-команди для **зміни даних у таблицях PostgreSQL**.

Їх часто об'єднують поняттям **DML — Data Manipulation Language**.

- `INSERT` — додає нові рядки
- `UPDATE` — змінює існуючі рядки
- `DELETE` — видаляє рядки

У попередній темі ми створювали **таблиці та визначали типи даних**.

Тепер вчимося працювати з самими даними:

    CREATE TABLE → створюємо структуру
    INSERT       → додаємо дані
    SELECT       → читаємо дані
    UPDATE       → змінюємо дані
    DELETE       → видаляємо дані

---

# 🎯 Для чого це потрібно

У реальному застосунку:

    POST /users       → INSERT
    GET /users        → SELECT
    PATCH /users/:id  → UPDATE
    DELETE /users/:id → DELETE

Наприклад, користувач реєструється:

    INSERT INTO users ...

Користувач змінює email:

    UPDATE users ...

Користувач видаляє свій акаунт:

    DELETE FROM users ...

Тобто SQL-команди безпосередньо відповідають операціям CRUD:

| CRUD | SQL |
|---|---|
| Create | `INSERT` |
| Read | `SELECT` |
| Update | `UPDATE` |
| Delete | `DELETE` |

---

# 🧠 Головна модель

Уявімо таблицю:

    users
    ┌────┬──────────┬─────────────────────┐
    │ id │ name     │ email               │
    ├────┼──────────┼─────────────────────┤
    │ 1  │ Alice    │ alice@example.com   │
    │ 2  │ Bob      │ bob@example.com     │
    └────┴──────────┴─────────────────────┘

### INSERT

    INSERT INTO users ...

↓

    + новий рядок

### UPDATE

    UPDATE users ...

↓

    змінюємо існуючий рядок

### DELETE

    DELETE FROM users ...

↓

    - рядок

---

# 1. INSERT

## 📌 Що робить INSERT

`INSERT` додає один або декілька нових рядків до таблиці.

Базовий синтаксис:

    INSERT INTO table_name (column1, column2, column3)
    VALUES (value1, value2, value3);

---

# 2. Простий INSERT

Створимо таблицю:

    CREATE TABLE users (
        id integer GENERATED ALWAYS AS IDENTITY,
        name text,
        email text
    );

Додаємо користувача:

    INSERT INTO users (name, email)
    VALUES ('Alice', 'alice@example.com');

Перевіряємо:

    SELECT * FROM users;

Результат:

    id | name  | email
    ---+-------+--------------------
    1  | Alice | alice@example.com

---

# 3. INSERT з кількома рядками

Можна додати декілька рядків одним запитом:

    INSERT INTO users (name, email)
    VALUES
        ('Alice', 'alice@example.com'),
        ('Bob', 'bob@example.com'),
        ('Charlie', 'charlie@example.com');

Це ефективніше, ніж виконувати три окремі `INSERT`.

---

# 4. INSERT без усіх колонок

Не обов'язково передавати всі колонки.

Наприклад:

    CREATE TABLE products (
        id integer GENERATED ALWAYS AS IDENTITY,
        name text,
        price numeric(10,2),
        description text
    );

Можемо вставити:

    INSERT INTO products (name, price)
    VALUES ('Keyboard', 49.99);

`description` залишиться `NULL`.

---

# 5. INSERT і DEFAULT

Якщо колонка має `DEFAULT`, PostgreSQL може автоматично використати це значення.

Наприклад:

    CREATE TABLE users (
        id integer GENERATED ALWAYS AS IDENTITY,
        name text,
        active boolean DEFAULT true
    );

Тепер:

    INSERT INTO users (name)
    VALUES ('Alice');

PostgreSQL автоматично встановить:

    active = true

---

# 6. INSERT з DEFAULT

Можна явно написати `DEFAULT`:

    INSERT INTO users (name, active)
    VALUES ('Bob', DEFAULT);

---

# 7. INSERT з DEFAULT VALUES

Якщо всі колонки мають значення за замовчуванням:

    INSERT INTO users
    DEFAULT VALUES;

Наприклад:

    CREATE TABLE logs (
        id integer GENERATED ALWAYS AS IDENTITY,
        created_at timestamptz DEFAULT now()
    );

Тоді:

    INSERT INTO logs
    DEFAULT VALUES;

PostgreSQL створить:

    id = 1
    created_at = поточний час

---

# 8. INSERT і RETURNING

Одна з дуже корисних можливостей PostgreSQL:

    RETURNING

Вона дозволяє отримати дані щойно вставленого рядка.

Наприклад:

    INSERT INTO users (name, email)
    VALUES ('Alice', 'alice@example.com')
    RETURNING *;

Можна повернути тільки `id`:

    INSERT INTO users (name, email)
    VALUES ('Bob', 'bob@example.com')
    RETURNING id;

Це особливо важливо для backend.

Наприклад:

    const result = await db.query(`
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        RETURNING id
    `, [name, email]);

Backend одразу отримує ID нового користувача.

---

# 9. INSERT ... SELECT

Можна вставляти дані не тільки через `VALUES`, а й отримувати їх з іншої таблиці.

Наприклад:

    INSERT INTO archived_users (id, name, email)
    SELECT id, name, email
    FROM users
    WHERE active = false;

Це дозволяє переносити або копіювати дані між таблицями.

---

# 10. UPDATE

## 📌 Що робить UPDATE

`UPDATE` змінює значення існуючих рядків.

Базовий синтаксис:

    UPDATE table_name
    SET column1 = value1
    WHERE condition;

Наприклад:

    UPDATE users
    SET name = 'John'
    WHERE id = 1;

---

# ⚠️ WHERE у UPDATE — критично важливий

Без `WHERE`:

    UPDATE users
    SET active = false;

будуть змінені **всі рядки таблиці**.

Тому перед `UPDATE` корисно перевіряти:

    SELECT *
    FROM users
    WHERE id = 1;

І тільки після цього:

    UPDATE users
    SET active = false
    WHERE id = 1;

---

# 11. UPDATE декількох колонок

Можна змінити декілька колонок одночасно:

    UPDATE users
    SET
        name = 'John',
        email = 'john@example.com'
    WHERE id = 1;

---

# 12. UPDATE з виразом

`SET` може містити не тільки конкретне значення.

Наприклад:

    UPDATE products
    SET price = price * 1.10
    WHERE id = 1;

Ціна збільшується на 10%.

Для всіх товарів:

    UPDATE products
    SET price = price * 1.10;

---

# 13. UPDATE з умовою

Наприклад:

    UPDATE products
    SET price = price * 0.90
    WHERE price > 100;

Знижка 10% застосовується тільки до товарів дорожчих за 100.

---

# 14. UPDATE і NULL

Для встановлення `NULL`:

    UPDATE users
    SET email = NULL
    WHERE id = 1;

Для перевірки `NULL` використовують:

    IS NULL

або:

    IS NOT NULL

Наприклад:

    UPDATE users
    SET active = false
    WHERE email IS NULL;

---

# 15. UPDATE ... RETURNING

Як і `INSERT`, `UPDATE` може повертати змінені рядки.

    UPDATE users
    SET name = 'John'
    WHERE id = 1
    RETURNING *;

Або тільки потрібні колонки:

    UPDATE users
    SET email = 'john@example.com'
    WHERE id = 1
    RETURNING id, email;

Це дуже зручно для API.

---

# 16. UPDATE з FROM

PostgreSQL дозволяє оновлювати таблицю на основі іншої таблиці.

Наприклад:

    UPDATE products p
    SET category_name = c.name
    FROM categories c
    WHERE p.category_id = c.id;

Це вже більш просунутий варіант `UPDATE`.

---

# 17. DELETE

## 📌 Що робить DELETE

`DELETE` видаляє рядки з таблиці.

Базовий синтаксис:

    DELETE FROM table_name
    WHERE condition;

Наприклад:

    DELETE FROM users
    WHERE id = 1;

---

# ⚠️ DELETE без WHERE

Дуже небезпечний запит:

    DELETE FROM users;

Він видалить **усі рядки таблиці**.

Таблиця залишиться, але дані будуть видалені.

---

# 18. DELETE з умовою

Наприклад:

    DELETE FROM users
    WHERE active = false;

Видаляться всі неактивні користувачі.

---

# 19. DELETE ... RETURNING

PostgreSQL дозволяє отримати видалені рядки:

    DELETE FROM users
    WHERE id = 1
    RETURNING *;

Це може бути корисно backend-у, коли потрібно знати, що саме було видалено.

---

# 20. DELETE і CASCADE

Якщо між таблицями існують зовнішні ключі, видалення може впливати на пов'язані записи.

Наприклад:

    users
       ↓
    orders

Якщо foreign key створений з:

    ON DELETE CASCADE

то видалення користувача може автоматично видалити його замовлення.

Приклад:

    CREATE TABLE orders (
        id integer GENERATED ALWAYS AS IDENTITY,
        user_id integer REFERENCES users(id) ON DELETE CASCADE
    );

Тоді:

    DELETE FROM users
    WHERE id = 1;

може автоматично видалити пов'язані `orders`.

> `CASCADE` потрібно використовувати обережно.

---

# 21. DELETE vs TRUNCATE

`DELETE`:

    DELETE FROM users;

видаляє рядки через операцію `DELETE`.

`TRUNCATE`:

    TRUNCATE TABLE users;

швидко очищає всю таблицю.

### Порівняння

| DELETE | TRUNCATE |
|---|---|
| Може мати `WHERE` | Не використовується для вибіркового видалення |
| Видаляє окремі рядки | Очищає таблицю |
| Пов'язаний з рядковими операціями | Спеціальна операція очищення |
| Може використовувати `RETURNING` | `RETURNING` немає |
| Зазвичай повільніший для повного очищення | Зазвичай швидший для повного очищення |

Наприклад:

    DELETE FROM users
    WHERE active = false;

Тільки неактивні.

А:

    TRUNCATE TABLE users;

Вся таблиця очищається.

---

# 22. DELETE vs DROP

Це принципово різні операції.

### DELETE

    DELETE FROM users;

Видаляє **дані**.

Таблиця залишається.

### DROP TABLE

    DROP TABLE users;

Видаляє **саму таблицю**.

Тобто:

    DELETE → структура залишається
    DROP   → структура видаляється

---

# 23. INSERT / UPDATE / DELETE як DML

Ці три команди:

    INSERT
    UPDATE
    DELETE

належать до DML — Data Manipulation Language.

Разом із:

    SELECT

вони формують основу повсякденної роботи з даними.

Можна запам'ятати:

    INSERT → створити дані
    SELECT → прочитати дані
    UPDATE → змінити дані
    DELETE → видалити дані

Це CRUD.

---

# 24. Практична таблиця

Для вправ створимо:

    CREATE TABLE users (
        id integer GENERATED ALWAYS AS IDENTITY,
        name text NOT NULL,
        email text,
        age integer,
        active boolean DEFAULT true,
        created_at timestamptz DEFAULT now()
    );

---

# 25. Практика INSERT

Додай одного користувача:

    INSERT INTO users (name, email, age)
    VALUES ('Alice', 'alice@example.com', 25);

Додай ще трьох:

    INSERT INTO users (name, email, age)
    VALUES
        ('Bob', 'bob@example.com', 30),
        ('Charlie', 'charlie@example.com', 35),
        ('David', 'david@example.com', 40);

Перевір:

    SELECT * FROM users;

---

# 26. Практика INSERT + RETURNING

    INSERT INTO users (name, email, age)
    VALUES ('Eva', 'eva@example.com', 28)
    RETURNING id, name, created_at;

---

# 27. Практика UPDATE

Зміни ім'я користувача:

    UPDATE users
    SET name = 'Robert'
    WHERE id = 2;

Перевір:

    SELECT *
    FROM users
    WHERE id = 2;

---

# 28. Практика UPDATE декількох колонок

    UPDATE users
    SET
        name = 'Robert Smith',
        age = 31
    WHERE id = 2;

---

# 29. Практика UPDATE за умовою

Деактивувати користувачів старше 35 років:

    UPDATE users
    SET active = false
    WHERE age > 35;

Перевір:

    SELECT *
    FROM users
    WHERE active = false;

---

# 30. Практика DELETE

Видали користувача з певним ID:

    DELETE FROM users
    WHERE id = 3;

Перевір:

    SELECT * FROM users;

---

# 31. DELETE за умовою

Видалити неактивних користувачів:

    DELETE FROM users
    WHERE active = false;

---

# 32. Дуже корисний робочий алгоритм

Перед `UPDATE` або `DELETE`:

### Крок 1 — знайди записи

    SELECT *
    FROM users
    WHERE age > 35;

### Крок 2 — перевір результат

Якщо результат правильний:

### Крок 3 — виконай UPDATE або DELETE

    UPDATE users
    SET active = false
    WHERE age > 35;

або:

    DELETE FROM users
    WHERE age > 35;

Це дуже хороша звичка.

---

# 33. UPDATE / DELETE у транзакції

Для небезпечних операцій корисно використовувати транзакцію.

    BEGIN;

    UPDATE users
    SET active = false
    WHERE age > 35;

Перевіряємо:

    SELECT *
    FROM users
    WHERE age > 35;

Якщо все правильно:

    COMMIT;

Якщо помилилися:

    ROLLBACK;

---

# 34. COMMIT

`COMMIT` підтверджує зміни.

    BEGIN;

    UPDATE users
    SET active = false
    WHERE id = 1;

    COMMIT;

Після `COMMIT` зміни стають підтвердженими.

---

# 35. ROLLBACK

`ROLLBACK` скасовує зміни поточної транзакції.

    BEGIN;

    DELETE FROM users
    WHERE id = 1;

    ROLLBACK;

Запис не буде видалений.

---

# 36. Безпечна практика

Погано:

    DELETE FROM users;

Краще:

    BEGIN;

    DELETE FROM users
    WHERE id = 5
    RETURNING *;

    ROLLBACK;

Спочатку можна перевірити результат.

Якщо все правильно:

    COMMIT;

---

# 37. Параметризовані запити

У backend **не потрібно вставляти значення користувача прямо в SQL-рядок**.

Небезпечно:

    const email = req.body.email;

    const sql = `
        INSERT INTO users (email)
        VALUES ('${email}')
    `;

Це може призвести до SQL Injection.

Потрібно використовувати параметри.

Наприклад для Node.js:

    const sql = `
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        RETURNING *
    `;

    const values = [name, email];

    await db.query(sql, values);

PostgreSQL отримує:

    $1 → name
    $2 → email

---

# 38. SQL Injection

Небезпечна ідея:

    const sql = `
        DELETE FROM users
        WHERE id = ${id}
    `;

Краще:

    const sql = `
        DELETE FROM users
        WHERE id = $1
    `;

    await db.query(sql, [id]);

### Правило

> Дані користувача ≠ SQL-код.

Значення передаємо через параметри.

---

# 39. INSERT / UPDATE / DELETE і NULL

`NULL` означає відсутнє або невідоме значення.

Це не те саме, що:

    ''
    0
    false

Наприклад:

    email = NULL

означає:

    email невідомий / відсутній

А:

    email = ''

означає:

    email — порожній текст

---

# 40. INSERT і обмеження таблиці

Якщо таблиця має:

    NOT NULL

то:

    INSERT INTO users (email)
    VALUES ('test@example.com');

може завершитися помилкою, якщо `name` має `NOT NULL`.

Наприклад:

    CREATE TABLE users (
        id integer GENERATED ALWAYS AS IDENTITY,
        name text NOT NULL
    );

Тоді:

    INSERT INTO users
    DEFAULT VALUES;

буде помилкою, тому що `name` не може бути `NULL`.

---

# 41. INSERT і типи даних

PostgreSQL перевіряє типи.

Наприклад:

    CREATE TABLE products (
        name text,
        price numeric(10,2)
    );

Коректно:

    INSERT INTO products (name, price)
    VALUES ('Keyboard', 49.99);

Проблемні або некоректні значення можуть викликати помилку типу.

---

# 42. INSERT і явне приведення типів

PostgreSQL дозволяє привести тип:

    SELECT '123'::integer;

Або:

    SELECT CAST('123' AS integer);

Наприклад:

    INSERT INTO products (price)
    VALUES ('49.99'::numeric);

Але зазвичай не потрібно без необхідності вручну кастити значення, якщо PostgreSQL може коректно визначити тип.

---

# 43. INSERT з ON CONFLICT

У PostgreSQL існує дуже важлива конструкція:

    ON CONFLICT

Вона використовується, коли `INSERT` може порушити `UNIQUE` або `PRIMARY KEY`.

Наприклад:

    CREATE TABLE users (
        id integer GENERATED ALWAYS AS IDENTITY,
        email text UNIQUE,
        name text
    );

Спроба вставити той самий email може спричинити помилку.

Можна сказати:

    INSERT INTO users (email, name)
    VALUES ('alice@example.com', 'Alice')
    ON CONFLICT DO NOTHING;

Якщо запис уже існує — нічого не робити.

---

# 44. ON CONFLICT DO UPDATE

Можна не просто ігнорувати конфлікт, а оновити існуючий запис.

    INSERT INTO users (email, name)
    VALUES ('alice@example.com', 'Alice Smith')
    ON CONFLICT (email)
    DO UPDATE SET name = EXCLUDED.name;

Це називають **UPSERT**:

    INSERT + UPDATE

---

# 45. EXCLUDED

У:

    ON CONFLICT ... DO UPDATE

`EXCLUDED` означає значення, яке ми намагалися вставити.

Наприклад:

    INSERT INTO users (email, name)
    VALUES ('alice@example.com', 'Alice Smith')
    ON CONFLICT (email)
    DO UPDATE
    SET name = EXCLUDED.name;

`EXCLUDED.name`:

    'Alice Smith'

---

# 46. RETURNING — важлива особливість PostgreSQL

PostgreSQL дозволяє використовувати `RETURNING` з:

    INSERT
    UPDATE
    DELETE

Приклади:

    INSERT INTO users (name)
    VALUES ('Alice')
    RETURNING *;

    UPDATE users
    SET active = false
    WHERE id = 1
    RETURNING *;

    DELETE FROM users
    WHERE id = 1
    RETURNING *;

Для backend-розробника це дуже корисна можливість.

---

# 47. Масові операції

SQL дозволяє змінювати багато рядків одним запитом.

Наприклад:

    UPDATE products
    SET price = price * 1.05
    WHERE category_id = 2;

Замість того щоб робити:

    UPDATE ...
    UPDATE ...
    UPDATE ...
    UPDATE ...

краще, коли можливо, виконати одну set-based операцію.

Це один із фундаментальних принципів SQL:

> Працюй із множиною рядків, а не імітуй цикл у SQL.

---

# 48. SQL UPDATE ≠ JavaScript loop

У JavaScript можна подумати:

    for (const user of users) {
        if (user.age > 35) {
            user.active = false;
        }
    }

У SQL краще:

    UPDATE users
    SET active = false
    WHERE age > 35;

SQL оптимізований для роботи з множинами даних.

---

# 49. Типові помилки

## ❌ UPDATE без WHERE

    UPDATE users
    SET active = false;

Результат:

    змінені всі користувачі

---

## ❌ DELETE без WHERE

    DELETE FROM users;

Результат:

    видалені всі рядки

---

## ❌ Плутати DELETE і DROP

    DELETE → видалення рядків
    DROP   → видалення таблиці

---

## ❌ Плутати DELETE і TRUNCATE

    DELETE FROM users WHERE id = 1;

видаляє конкретний рядок.

    TRUNCATE TABLE users;

очищає таблицю.

---

## ❌ Формувати SQL через string interpolation

Погано:

    `SELECT * FROM users WHERE id = ${id}`

Краще:

    `SELECT * FROM users WHERE id = $1`

---

## ❌ Ігнорувати RETURNING

У PostgreSQL часто немає потреби робити:

    INSERT ...
    SELECT останній ID ...

Краще:

    INSERT ...
    RETURNING id;

---

## ❌ Не перевіряти UPDATE / DELETE

Перед небезпечною операцією:

    SELECT *
    FROM users
    WHERE ...;

Після перевірки:

    UPDATE ...
    або
    DELETE ...

---

# 50. INSERT / UPDATE / DELETE — порівняння

| Команда | Призначення | WHERE | RETURNING |
|---|---|---|---|
| `INSERT` | Додати | ❌ | ✅ |
| `UPDATE` | Змінити | ✅ | ✅ |
| `DELETE` | Видалити | ✅ | ✅ |
| `TRUNCATE` | Очистити таблицю | ❌ | ❌ |
| `DROP` | Видалити таблицю | ❌ | ❌ |

---

# 51. Базовий синтаксис

## INSERT

    INSERT INTO table_name (column1, column2)
    VALUES (value1, value2);

## UPDATE

    UPDATE table_name
    SET column1 = value1
    WHERE condition;

## DELETE

    DELETE FROM table_name
    WHERE condition;

---

# 52. INSERT — шпаргалка

    -- Один рядок
    INSERT INTO users (name, email)
    VALUES ('Alice', 'alice@example.com');

    -- Кілька рядків
    INSERT INTO users (name, email)
    VALUES
        ('Alice', 'alice@example.com'),
        ('Bob', 'bob@example.com');

    -- DEFAULT
    INSERT INTO users (name, active)
    VALUES ('Alice', DEFAULT);

    -- RETURNING
    INSERT INTO users (name)
    VALUES ('Alice')
    RETURNING *;

    -- DEFAULT VALUES
    INSERT INTO logs
    DEFAULT VALUES;

    -- UPSERT
    INSERT INTO users (email, name)
    VALUES ('alice@example.com', 'Alice')
    ON CONFLICT (email)
    DO UPDATE SET name = EXCLUDED.name;

---

# 53. UPDATE — шпаргалка

    -- Одна колонка
    UPDATE users
    SET name = 'John'
    WHERE id = 1;

    -- Кілька колонок
    UPDATE users
    SET
        name = 'John',
        age = 30
    WHERE id = 1;

    -- Вираз
    UPDATE products
    SET price = price * 1.10
    WHERE id = 1;

    -- Багато рядків
    UPDATE users
    SET active = false
    WHERE age > 35;

    -- RETURNING
    UPDATE users
    SET active = false
    WHERE id = 1
    RETURNING *;

---

# 54. DELETE — шпаргалка

    -- Один рядок
    DELETE FROM users
    WHERE id = 1;

    -- За умовою
    DELETE FROM users
    WHERE active = false;

    -- RETURNING
    DELETE FROM users
    WHERE id = 1
    RETURNING *;

    -- Усі рядки
    DELETE FROM users;

---

# 55. Безпечний DELETE / UPDATE

Корисний шаблон:

    BEGIN;

    SELECT *
    FROM users
    WHERE id = 5;

    UPDATE users
    SET active = false
    WHERE id = 5
    RETURNING *;

    COMMIT;

Або якщо результат неправильний:

    ROLLBACK;

---

# 56. Практична вправа №1 — INSERT

Створи таблицю:

    CREATE TABLE products (
        id integer GENERATED ALWAYS AS IDENTITY,
        name text NOT NULL,
        price numeric(10,2),
        quantity integer DEFAULT 0,
        active boolean DEFAULT true
    );

Додай 5 товарів.

Наприклад:

    INSERT INTO products (name, price, quantity)
    VALUES
        ('Keyboard', 50.00, 10),
        ('Mouse', 25.00, 20),
        ('Monitor', 250.00, 5),
        ('USB Cable', 10.00, 50),
        ('Headphones', 80.00, 15);

Перевір:

    SELECT * FROM products;

---

# 57. Практична вправа №2 — UPDATE

Збільш ціни всіх товарів на 10%:

    UPDATE products
    SET price = price * 1.10;

Перевір:

    SELECT * FROM products;

---

# 58. Практична вправа №3 — UPDATE з WHERE

Збільш ціну тільки товарів дешевших за 50:

    UPDATE products
    SET price = price * 1.20
    WHERE price < 50;

---

# 59. Практична вправа №4 — DELETE

Видали товари, кількість яких дорівнює 0:

    DELETE FROM products
    WHERE quantity = 0;

---

# 60. Практична вправа №5 — RETURNING

Додай товар і отримай його ID:

    INSERT INTO products (name, price, quantity)
    VALUES ('Webcam', 100.00, 8)
    RETURNING id, name, price;

---

# 61. Практична вправа №6 — транзакція

Спробуй змінити ціни:

    BEGIN;

    UPDATE products
    SET price = price * 2;

Перевір:

    SELECT * FROM products;

Скасуй:

    ROLLBACK;

Знову перевір:

    SELECT * FROM products;

Ціна повинна повернутися до попереднього стану.

---

# 62. Практична вправа №7 — DELETE з транзакцією

Спробуй:

    BEGIN;

    DELETE FROM products
    WHERE price > 100
    RETURNING *;

Перевір результат.

Якщо все правильно:

    COMMIT;

Якщо ні:

    ROLLBACK;

---

# 63. Практична вправа №8 — UPSERT

Створи таблицю:

    CREATE TABLE settings (
        id integer GENERATED ALWAYS AS IDENTITY,
        key text UNIQUE NOT NULL,
        value text
    );

Встав:

    INSERT INTO settings (key, value)
    VALUES ('theme', 'dark');

Тепер виконай:

    INSERT INTO settings (key, value)
    VALUES ('theme', 'light')
    ON CONFLICT (key)
    DO UPDATE SET value = EXCLUDED.value;

Перевір:

    SELECT * FROM settings;

Значення `theme` повинно стати:

    light

---

# 64. Практична вправа №9 — CRUD

Створи маленьку таблицю:

    CREATE TABLE tasks (
        id integer GENERATED ALWAYS AS IDENTITY,
        title text NOT NULL,
        completed boolean DEFAULT false
    );

### CREATE

    INSERT INTO tasks (title)
    VALUES ('Learn PostgreSQL');

### READ

    SELECT * FROM tasks;

### UPDATE

    UPDATE tasks
    SET completed = true
    WHERE id = 1;

### DELETE

    DELETE FROM tasks
    WHERE id = 1;

Таким чином ти руками пройшов повний CRUD.

---

# 65. Робота через psql

Після підключення:

    psql -U postgres

Подивитися таблиці:

    \dt

Подивитися структуру:

    \d users

Подивитися дані:

    SELECT * FROM users;

Виконати SQL:

    INSERT INTO ...

Вийти:

    \q

---

# 66. Корисна послідовність роботи

Під час навчання можна працювати так:

    1. CREATE TABLE
           ↓
    2. INSERT
           ↓
    3. SELECT
           ↓
    4. UPDATE
           ↓
    5. SELECT
           ↓
    6. DELETE
           ↓
    7. SELECT

Наприклад:

    CREATE TABLE users (...);

    INSERT INTO users (...);

    SELECT * FROM users;

    UPDATE users
    SET ...
    WHERE ...;

    SELECT * FROM users;

    DELETE FROM users
    WHERE ...;

    SELECT * FROM users;

---

# 67. Що потрібно знати на рівні Junior

Обов'язково знати:

- `INSERT`
- `UPDATE`
- `DELETE`
- `VALUES`
- `SET`
- `WHERE`
- `DEFAULT`
- `NULL`
- `RETURNING`
- `INSERT` декількох рядків
- `UPDATE` декількох рядків
- `DELETE` за умовою
- `BEGIN`
- `COMMIT`
- `ROLLBACK`
- базове розуміння `ON CONFLICT`
- SQL Injection
- параметризовані запити

---

# 68. Що потрібно знати на рівні Middle

Додатково:

- `INSERT ... SELECT`
- `UPDATE ... FROM`
- `ON CONFLICT DO NOTHING`
- `ON CONFLICT DO UPDATE`
- UPSERT
- `RETURNING`
- масові операції
- транзакції
- `ON DELETE CASCADE`
- робота з foreign keys
- атомарність операцій
- конкурентні зміни даних
- блокування
- isolation levels
- optimistic / pessimistic concurrency

---

# 69. Що потрібно знати на рівні Senior

Глибше:

- MVCC у PostgreSQL
- row-level locks
- `SELECT ... FOR UPDATE`
- isolation levels
- deadlocks
- transaction boundaries
- bulk inserts
- batch updates
- UPSERT concurrency
- performance DML
- `EXPLAIN`
- indexes для `UPDATE` / `DELETE`
- foreign-key locking
- cascading operations
- partitioning
- large data migrations
- zero-downtime migrations
- staging tables
- `COPY`
- ETL / data pipelines

---

# 70. Питання для співбесіди

### 1. Що робить INSERT?

Додає нові рядки до таблиці.

### 2. Що робить UPDATE?

Змінює існуючі рядки.

### 3. Що робить DELETE?

Видаляє рядки.

### 4. Що станеться при UPDATE без WHERE?

Будуть оновлені всі рядки таблиці.

### 5. Що станеться при DELETE без WHERE?

Будуть видалені всі рядки таблиці.

### 6. Чим DELETE відрізняється від DROP?

`DELETE` видаляє дані.

`DROP` видаляє сам об'єкт, наприклад таблицю.

### 7. Чим DELETE відрізняється від TRUNCATE?

`DELETE` може видаляти рядки за умовою.

`TRUNCATE` призначений для очищення всієї таблиці.

### 8. Для чого RETURNING?

Щоб повернути рядки, які були вставлені, оновлені або видалені.

### 9. Що таке UPSERT?

Операція:

    INSERT
    +
    UPDATE

Зазвичай реалізується через:

    ON CONFLICT DO UPDATE

### 10. Що таке SQL Injection?

Атака, коли недовірені дані потрапляють у SQL як частина SQL-коду.

Захист:

    parameterized queries

### 11. Для чого BEGIN / COMMIT / ROLLBACK?

Для керування транзакціями.

### 12. Чому не варто бездумно використовувати DELETE без WHERE?

Тому що можна випадково видалити всі дані.

---

# 71. 🧠 Головні правила

> `INSERT` додає дані.

> `UPDATE` змінює дані.

> `DELETE` видаляє дані.

> `WHERE` визначає, які рядки змінювати або видаляти.

> `UPDATE` без `WHERE` може змінити всю таблицю.

> `DELETE` без `WHERE` може видалити всю таблицю.

> `RETURNING` дозволяє отримати результат DML-операції.

> `DEFAULT` дозволяє PostgreSQL автоматично встановлювати значення.

> `NULL` — це відсутність/невідомість значення, а не `0` і не `''`.

> Для backend використовуй параметризовані SQL-запити.

> Небезпечні зміни краще виконувати всередині транзакції.

> SQL працює з множинами рядків — не потрібно без необхідності імітувати JavaScript-цикл.

---

# 📋 MINI CHEAT SHEET

## INSERT

    INSERT INTO users (name, email)
    VALUES ('Alice', 'alice@example.com');

## INSERT MANY

    INSERT INTO users (name, email)
    VALUES
        ('Alice', 'alice@example.com'),
        ('Bob', 'bob@example.com');

## INSERT + RETURNING

    INSERT INTO users (name)
    VALUES ('Alice')
    RETURNING *;

## UPDATE

    UPDATE users
    SET name = 'John'
    WHERE id = 1;

## UPDATE MANY COLUMNS

    UPDATE users
    SET
        name = 'John',
        age = 30
    WHERE id = 1;

## UPDATE MANY ROWS

    UPDATE users
    SET active = false
    WHERE age > 35;

## UPDATE + RETURNING

    UPDATE users
    SET active = false
    WHERE id = 1
    RETURNING *;

## DELETE

    DELETE FROM users
    WHERE id = 1;

## DELETE + RETURNING

    DELETE FROM users
    WHERE id = 1
    RETURNING *;

## TRUNCATE

    TRUNCATE TABLE users;

## TRANSACTION

    BEGIN;

    UPDATE users
    SET active = false
    WHERE id = 1;

    COMMIT;

## CANCEL TRANSACTION

    BEGIN;

    DELETE FROM users
    WHERE id = 1;

    ROLLBACK;

## UPSERT

    INSERT INTO users (email, name)
    VALUES ('alice@example.com', 'Alice')
    ON CONFLICT (email)
    DO UPDATE SET name = EXCLUDED.name;

---

# 🔑 Коротко

    INSERT
        ↓
    додає рядки

    UPDATE
        ↓
    змінює рядки

    DELETE
        ↓
    видаляє рядки

    RETURNING
        ↓
    повертає результат операції

    WHERE
        ↓
    визначає цільові рядки

    ON CONFLICT
        ↓
    обробляє конфлікт INSERT

    BEGIN
        ↓
    початок транзакції

    COMMIT
        ↓
    підтвердити

    ROLLBACK
        ↓
    скасувати

---

# 🎯 Що має залишитися в голові після цієї теми

    CRUD

    CREATE → INSERT
    READ   → SELECT
    UPDATE → UPDATE
    DELETE → DELETE

І головне правило безпечної роботи:

    SELECT
    ↓
    перевірити рядки
    ↓
    UPDATE / DELETE
    ↓
    RETURNING
    ↓
    COMMIT або ROLLBACK

Це вже фундаментальна навичка роботи з PostgreSQL, яку ти будеш використовувати практично в кожному backend-застосунку.
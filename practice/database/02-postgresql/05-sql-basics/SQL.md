# SQL — основні запити PostgreSQL

Практична шпаргалка для роботи з PostgreSQL.

---

# 1. Загальна структура SQL

SQL — декларативна мова для роботи з даними та структурою бази даних.

Основні групи команд:

- `CREATE` — створення
- `ALTER` — зміна
- `DROP` — видалення структури
- `INSERT` — додавання даних
- `SELECT` — отримання даних
- `UPDATE` — зміна даних
- `DELETE` — видалення даних

---

# 2. Підключення та робота з базою

У `psql` / `pgcli`:

    \l

Показати бази даних.

    \c educational

Підключитися до бази `educational`.

Показати таблиці:

    \dt

Показати структуру таблиці:

    \d colors

---

# 3. CREATE DATABASE

Створити базу даних:

    CREATE DATABASE educational;

Підключитися до неї:

    \c educational

---

# 4. CREATE TABLE

Загальна форма:

    CREATE TABLE table_name (
        column_name data_type constraints,
        column_name data_type constraints
    );

Приклад:

    CREATE TABLE colors (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        hex VARCHAR(7) NOT NULL,
        rgb_r SMALLINT NOT NULL CHECK (rgb_r BETWEEN 0 AND 255),
        rgb_g SMALLINT NOT NULL CHECK (rgb_g BETWEEN 0 AND 255),
        rgb_b SMALLINT NOT NULL CHECK (rgb_b BETWEEN 0 AND 255),
        sort_order INTEGER NOT NULL
    );

---

# 5. Визначення колонки

Загальна форма:

    column_name data_type constraints

Наприклад:

    name VARCHAR(50) NOT NULL UNIQUE

Розшифровка:

    name
    → назва колонки

    VARCHAR(50)
    → тип даних

    NOT NULL
    → значення обов'язкове

    UNIQUE
    → значення не повинно повторюватися

---

# 6. Основні типи даних

## Цілі числа

    SMALLINT
    INTEGER
    BIGINT

## Десяткові числа

    NUMERIC
    DECIMAL
    REAL
    DOUBLE PRECISION

## Текст

    VARCHAR(50)
    TEXT

## Логічний тип

    BOOLEAN

Значення:

    TRUE
    FALSE

## Дата і час

    DATE
    TIME
    TIMESTAMP
    TIMESTAMPTZ

---

# 7. Основні constraints

## PRIMARY KEY

Унікальний ідентифікатор рядка.

    id INTEGER PRIMARY KEY

Primary key:

- унікальний
- не може бути `NULL`
- однозначно ідентифікує рядок

---

## GENERATED ALWAYS AS IDENTITY

Автоматична генерація числового ID:

    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY

При `INSERT`:

    INSERT INTO colors (name)
    VALUES ('red');

`id` PostgreSQL створить автоматично.

---

## NOT NULL

Значення обов'язкове:

    name VARCHAR(50) NOT NULL

---

## UNIQUE

Значення не може повторюватися:

    email VARCHAR(255) UNIQUE

---

## CHECK

Перевірка умови:

    rgb_r SMALLINT CHECK (rgb_r BETWEEN 0 AND 255)

Наприклад:

    255 → дозволено
    100 → дозволено
    0   → дозволено
    300 → помилка

---

## DEFAULT

Значення за замовчуванням:

    active BOOLEAN DEFAULT TRUE

Якщо значення не передати:

    INSERT INTO users (name)
    VALUES ('Valeriy');

PostgreSQL встановить:

    active = TRUE

---

# 8. INSERT — додавання даних

Загальна форма:

    INSERT INTO table_name (
        column1,
        column2
    )
    VALUES (
        value1,
        value2
    );

Приклад:

    INSERT INTO colors (
        name,
        hex,
        rgb_r,
        rgb_g,
        rgb_b,
        sort_order
    )
    VALUES (
        'red',
        '#FF0000',
        255,
        0,
        0,
        1
    );

---

# 9. INSERT декількох рядків

Можна вставити декілька рядків одним запитом:

    INSERT INTO colors (
        name,
        hex,
        rgb_r,
        rgb_g,
        rgb_b,
        sort_order
    )
    VALUES
        ('red',   '#FF0000', 255, 0,   0,   1),
        ('lime',  '#00FF00', 0,   255, 0,   2),
        ('blue',  '#0000FF', 0,   0,   255, 3);

Кожні `(...)` після `VALUES` — окремий рядок.

---

# 10. INSERT і автоматичний ID

Якщо:

    id INTEGER GENERATED ALWAYS AS IDENTITY

то `id` зазвичай не передаємо:

    INSERT INTO colors (
        name,
        hex
    )
    VALUES (
        'red',
        '#FF0000'
    );

PostgreSQL сам створить:

    id = 1

---

# 11. SELECT

Отримати всі колонки:

    SELECT *
    FROM colors;

---

# 12. SELECT конкретних колонок

    SELECT name, hex
    FROM colors;

Результат міститиме тільки:

    name
    hex

---

# 13. WHERE

Фільтрація:

    SELECT *
    FROM colors
    WHERE name = 'red';

Інший приклад:

    SELECT *
    FROM colors
    WHERE rgb_r = 255;

---

# 14. Оператори порівняння

    =
    !=
    <>
    >
    <
    >=
    <=

Приклади:

    SELECT *
    FROM colors
    WHERE rgb_r > 100;

    SELECT *
    FROM colors
    WHERE sort_order >= 2;

---

# 15. AND

Обидві умови повинні бути TRUE:

    SELECT *
    FROM colors
    WHERE rgb_r = 255
      AND rgb_g = 0;

---

# 16. OR

Достатньо однієї умови:

    SELECT *
    FROM colors
    WHERE name = 'red'
       OR name = 'blue';

---

# 17. NOT

Заперечення:

    SELECT *
    FROM colors
    WHERE NOT name = 'red';

---

# 18. BETWEEN

Перевірка діапазону:

    SELECT *
    FROM colors
    WHERE sort_order BETWEEN 1 AND 5;

Еквівалентно:

    WHERE sort_order >= 1
      AND sort_order <= 5

---

# 19. IN

Перевірка декількох значень:

    SELECT *
    FROM colors
    WHERE name IN ('red', 'blue', 'lime');

Замість:

    WHERE name = 'red'
       OR name = 'blue'
       OR name = 'lime'

---

# 20. LIKE

Пошук за шаблоном:

    SELECT *
    FROM users
    WHERE name LIKE 'Val%';

`%` — будь-яка кількість символів.

Приклади:

    'Val%'
    → починається з Val

    '%er'
    → закінчується на er

    '%al%'
    → містить al

---

# 21. ILIKE

PostgreSQL-варіант `LIKE`, який не враховує регістр:

    SELECT *
    FROM users
    WHERE name ILIKE 'val%';

---

# 22. IS NULL

Перевірка `NULL`:

    SELECT *
    FROM users
    WHERE email IS NULL;

Не:

    WHERE email = NULL

---

# 23. IS NOT NULL

    SELECT *
    FROM users
    WHERE email IS NOT NULL;

---

# 24. ORDER BY

Сортування:

    SELECT *
    FROM colors
    ORDER BY sort_order;

За замовчуванням — `ASC`.

Явно:

    ORDER BY sort_order ASC;

За спаданням:

    ORDER BY sort_order DESC;

---

# 25. Сортування за декількома колонками

    SELECT *
    FROM colors
    ORDER BY sort_order ASC, name ASC;

Спочатку сортуємо за `sort_order`.

Якщо значення однакові — за `name`.

---

# 26. LIMIT

Обмежити кількість результатів:

    SELECT *
    FROM colors
    LIMIT 3;

---

# 27. OFFSET

Пропустити певну кількість рядків:

    SELECT *
    FROM colors
    OFFSET 3;

---

# 28. Pagination

Наприклад:

    SELECT *
    FROM colors
    ORDER BY id
    LIMIT 10
    OFFSET 20;

Отримати 10 рядків після перших 20.

Формула:

    OFFSET = (page - 1) * limit

---

# 29. UPDATE

Змінити дані:

    UPDATE colors
    SET hex = '#F00'
    WHERE name = 'red';

---

# 30. UPDATE декількох колонок

    UPDATE colors
    SET
        hex = '#FF0000',
        sort_order = 10
    WHERE name = 'red';

---

# 31. УВАГА — UPDATE без WHERE

Небезпечно:

    UPDATE colors
    SET sort_order = 10;

Це змінить `sort_order` ВСІХ рядків.

Завжди перевіряй:

    UPDATE ...
    SET ...
    WHERE ...;

---

# 32. DELETE

Видалити конкретний рядок:

    DELETE FROM colors
    WHERE name = 'red';

---

# 33. УВАГА — DELETE без WHERE

    DELETE FROM colors;

Видалить усі рядки таблиці.

Таблиця залишиться існувати, але даних у ній не буде.

---

# 34. Видалення таблиці

    DROP TABLE colors;

Таблиця буде повністю видалена.

Обережно!

---

# 35. Очистити таблицю

    TRUNCATE TABLE colors;

Видаляє всі рядки, але залишає таблицю.

---

# 36. ALTER TABLE

Змінити структуру таблиці.

---

## Додати колонку

    ALTER TABLE colors
    ADD COLUMN description TEXT;

---

## Видалити колонку

    ALTER TABLE colors
    DROP COLUMN description;

---

## Перейменувати колонку

    ALTER TABLE colors
    RENAME COLUMN name TO color_name;

---

## Перейменувати таблицю

    ALTER TABLE colors
    RENAME TO app_colors;

---

## Додати constraint

    ALTER TABLE colors
    ADD CONSTRAINT colors_name_unique UNIQUE (name);

---

# 37. DROP COLUMN

    ALTER TABLE colors
    DROP COLUMN description;

Видаляє колонку разом із її даними.

---

# 38. COUNT

Порахувати рядки:

    SELECT COUNT(*)
    FROM colors;

---

# 39. MIN / MAX

Мінімальне значення:

    SELECT MIN(sort_order)
    FROM colors;

Максимальне:

    SELECT MAX(sort_order)
    FROM colors;

---

# 40. AVG

Середнє значення:

    SELECT AVG(rgb_r)
    FROM colors;

---

# 41. SUM

Сума:

    SELECT SUM(rgb_r)
    FROM colors;

---

# 42. GROUP BY

Групування:

    SELECT rgb_r, COUNT(*)
    FROM colors
    GROUP BY rgb_r;

Наприклад:

    SELECT name, COUNT(*)
    FROM colors
    GROUP BY name;

---

# 43. HAVING

Фільтрація груп після `GROUP BY`:

    SELECT rgb_r, COUNT(*)
    FROM colors
    GROUP BY rgb_r
    HAVING COUNT(*) > 1;

Різниця:

    WHERE
    → фільтрує рядки ДО групування

    HAVING
    → фільтрує групи ПІСЛЯ групування

---

# 44. DISTINCT

Отримати тільки унікальні значення:

    SELECT DISTINCT rgb_r
    FROM colors;

---

# 45. AS — псевдонім

Перейменувати колонку у результаті:

    SELECT
        name AS color_name,
        hex AS color_hex
    FROM colors;

---

# 46. Обчислення у SELECT

    SELECT
        name,
        rgb_r + rgb_g + rgb_b AS rgb_sum
    FROM colors;

`AS` створює псевдонім для результату.

---

# 47. JOIN — зв'язок таблиць

Припустимо:

    users
    colors

і в `users` є:

    color_id

Тоді:

    SELECT
        users.name,
        colors.name
    FROM users
    JOIN colors
        ON users.color_id = colors.id;

`JOIN` дозволяє отримати дані з пов'язаних таблиць.

---

# 48. INNER JOIN

Показує рядки, для яких існує відповідність в обох таблицях:

    SELECT *
    FROM users
    INNER JOIN colors
        ON users.color_id = colors.id;

`JOIN` без уточнення зазвичай означає `INNER JOIN`.

---

# 49. LEFT JOIN

Показує всі рядки лівої таблиці, навіть якщо відповідності немає:

    SELECT *
    FROM users
    LEFT JOIN colors
        ON users.color_id = colors.id;

---

# 50. FOREIGN KEY

Створення зв'язку між таблицями:

    CREATE TABLE users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        color_id INTEGER REFERENCES colors(id)
    );

`color_id` посилається на:

    colors.id

---

# 51. Явний FOREIGN KEY

Те саме можна записати детальніше:

    CREATE TABLE users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        color_id INTEGER,

        FOREIGN KEY (color_id)
            REFERENCES colors(id)
    );

---

# 52. INSERT + RETURNING

PostgreSQL дозволяє одразу отримати створений рядок:

    INSERT INTO colors (
        name,
        hex,
        rgb_r,
        rgb_g,
        rgb_b,
        sort_order
    )
    VALUES (
        'yellow',
        '#FFFF00',
        255,
        255,
        0,
        4
    )
    RETURNING *;

Особливо корисно для backend.

Можна повернути тільки ID:

    RETURNING id;

---

# 53. UPDATE + RETURNING

    UPDATE colors
    SET hex = '#00FF00'
    WHERE name = 'lime'
    RETURNING *;

---

# 54. DELETE + RETURNING

    DELETE FROM colors
    WHERE name = 'lime'
    RETURNING *;

---

# 55. Транзакції

Почати транзакцію:

    BEGIN;

Виконати SQL:

    UPDATE colors
    SET sort_order = 10
    WHERE id = 1;

Скасувати:

    ROLLBACK;

Або підтвердити:

    COMMIT;

---

# 56. Практичний цикл роботи

Типовий цикл:

    CREATE TABLE
        ↓
    INSERT
        ↓
    SELECT
        ↓
    UPDATE
        ↓
    SELECT
        ↓
    DELETE
        ↓
    SELECT

Для навчання дуже корисно після кожної зміни перевіряти результат:

    SELECT * FROM colors;

---

# 57. Приклад повного циклу з colors

Створення:

    CREATE TABLE colors (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        hex VARCHAR(7) NOT NULL,
        rgb_r SMALLINT NOT NULL CHECK (rgb_r BETWEEN 0 AND 255),
        rgb_g SMALLINT NOT NULL CHECK (rgb_g BETWEEN 0 AND 255),
        rgb_b SMALLINT NOT NULL CHECK (rgb_b BETWEEN 0 AND 255),
        sort_order INTEGER NOT NULL
    );

Додавання:

    INSERT INTO colors (
        name,
        hex,
        rgb_r,
        rgb_g,
        rgb_b,
        sort_order
    )
    VALUES
        ('red', '#FF0000', 255, 0, 0, 10),
        ('lime', '#00FF00', 0, 255, 0, 20),
        ('blue', '#0000FF', 0, 0, 255, 30);

Перевірка:

    SELECT *
    FROM colors
    ORDER BY sort_order;

Зміна:

    UPDATE colors
    SET sort_order = 25
    WHERE name = 'lime';

Перевірка:

    SELECT *
    FROM colors
    ORDER BY sort_order;

Видалення:

    DELETE FROM colors
    WHERE name = 'blue';

---

# 58. Основна модель SQL

Для початку добре тримати в голові:

    CREATE
    → створити

    INSERT
    → додати

    SELECT
    → отримати

    UPDATE
    → змінити

    DELETE
    → видалити

    ALTER
    → змінити структуру

    DROP
    → видалити структуру

---

# 59. SELECT — основний робочий шаблон

Найважливіший шаблон:

    SELECT columns
    FROM table
    WHERE condition
    ORDER BY column
    LIMIT number
    OFFSET number;

Наприклад:

    SELECT id, name, hex
    FROM colors
    WHERE rgb_r > 100
    ORDER BY sort_order
    LIMIT 10
    OFFSET 0;

---

# 60. INSERT — основний шаблон

    INSERT INTO table (
        column1,
        column2,
        column3
    )
    VALUES (
        value1,
        value2,
        value3
    );

---

# 61. UPDATE — основний шаблон

    UPDATE table
    SET
        column1 = value1,
        column2 = value2
    WHERE condition;

---

# 62. DELETE — основний шаблон

    DELETE FROM table
    WHERE condition;

---

# 63. CREATE TABLE — основний шаблон

    CREATE TABLE table_name (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        ...
    );

---

# 64. Що варто вивчити в першу чергу

## Рівень 1 — обов'язково

    CREATE TABLE
    INSERT
    SELECT
    UPDATE
    DELETE

    WHERE
    ORDER BY
    LIMIT

    PRIMARY KEY
    NOT NULL
    UNIQUE
    CHECK

---

## Рівень 2

    AND
    OR
    NOT
    IN
    BETWEEN
    LIKE
    ILIKE
    IS NULL
    IS NOT NULL

    DISTINCT

    AS

---

## Рівень 3

    COUNT
    SUM
    AVG
    MIN
    MAX

    GROUP BY
    HAVING

---

## Рівень 4

    FOREIGN KEY
    JOIN
    INNER JOIN
    LEFT JOIN

---

## Рівень 5

    ALTER TABLE
    TRANSACTIONS
    BEGIN
    COMMIT
    ROLLBACK

    RETURNING

---

# 65. Головне правило для практики

Не потрібно одразу запам'ятовувати всі SQL-команди.

Важливіше розуміти структуру:

    SQL-запит
        ↓
    ключове слово
        ↓
    таблиця
        ↓
    колонки
        ↓
    умови
        ↓
    результат

Наприклад:

    SELECT name, hex
    FROM colors
    WHERE name = 'red';

Читаємо:

    SELECT
    → що отримати

    FROM
    → звідки

    WHERE
    → за якою умовою

---

# 66. Практичний принцип

SQL краще вивчати не як набір готових заклинань:

    SELECT * FROM ...

а як набір будівельних блоків:

    SELECT
    FROM
    WHERE
    ORDER BY
    GROUP BY
    HAVING
    JOIN
    INSERT
    UPDATE
    DELETE

Потім ці блоки комбінуються у повноцінні запити.

---

# 67. Для Full Stack

Типовий зв'язок:

    Frontend
        ↓
    HTTP request
        ↓
    Backend
        ↓
    SQL query
        ↓
    PostgreSQL
        ↓
    SQL result
        ↓
    Backend
        ↓
    JSON
        ↓
    Frontend

Наприклад:

    Frontend
        ↓
    GET /api/colors
        ↓
    Backend
        ↓
    SELECT * FROM colors ORDER BY sort_order;
        ↓
    PostgreSQL
        ↓
    rows
        ↓
    Backend
        ↓
    JSON
        ↓
    Frontend

Саме цей цикл є одним із головних практичних сценаріїв для Full Stack JavaScript.
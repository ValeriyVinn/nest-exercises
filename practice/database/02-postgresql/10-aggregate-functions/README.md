# 10. Aggregate Functions

Aggregate functions (агрегатні функції) — це функції PostgreSQL, які обробляють набір рядків і повертають одне підсумкове значення.

Вони використовуються, коли потрібно:

- порахувати кількість записів;
- знайти суму;
- знайти середнє значення;
- знайти мінімальне або максимальне значення;
- отримати статистику по набору даних;
- порахувати значення для кожної групи;
- підготувати дані для звітів;
- аналізувати дані в SQL;
- комбінувати `WHERE`, `GROUP BY` та `HAVING`.

Основні aggregate functions PostgreSQL:

    COUNT()
    SUM()
    AVG()
    MIN()
    MAX()

Також PostgreSQL має багато спеціалізованих агрегатів для:

    arrays
    JSON
    strings
    boolean values
    statistics
    ordered data

---

### Ключові поняття

✔ aggregate function  
✔ aggregation  
✔ aggregate query  
✔ `COUNT()`  
✔ `COUNT(*)`  
✔ `COUNT(column)`  
✔ `COUNT(DISTINCT column)`  
✔ `SUM()`  
✔ `AVG()`  
✔ `MIN()`  
✔ `MAX()`  
✔ `DISTINCT`  
✔ `NULL`  
✔ `GROUP BY`  
✔ `HAVING`  
✔ grouped aggregation  
✔ scalar result  
✔ aggregate result  
✔ aggregate expression  
✔ conditional aggregation  
✔ filtered aggregation  
✔ window function  
✔ `FILTER`  
✔ `COALESCE()`  

---

# Що потрібно пам'ятати

• Aggregate function працює з набором рядків і повертає одне значення.

• `COUNT()` рахує рядки або значення.

• `COUNT(*)` рахує всі рядки.

• `COUNT(column)` рахує тільки non-`NULL` значення цього стовпця.

• `COUNT(DISTINCT column)` рахує унікальні non-`NULL` значення.

• `SUM()` обчислює суму.

• `AVG()` обчислює середнє арифметичне.

• `MIN()` знаходить мінімальне значення.

• `MAX()` знаходить максимальне значення.

• Більшість aggregate functions ігнорують `NULL`.

• Якщо aggregate function працює без `GROUP BY`, вона зазвичай повертає один рядок.

• `GROUP BY` розділяє рядки на групи, після чого aggregate function обчислюється для кожної групи.

• `HAVING` фільтрує групи після aggregation.

• `WHERE` фільтрує окремі рядки до aggregation.

• `HAVING` працює з результатами aggregation.

• `COUNT(*)` і `COUNT(column)` — не одне й те саме.

• `SUM()` та `AVG()` можуть повертати `NULL`, якщо немає відповідних значень.

• Для заміни `NULL` можна використовувати:

    COALESCE()

• `FILTER (WHERE ...)` дозволяє виконувати conditional aggregation.

---

# Aggregate Function

Aggregate function приймає багато рядків:

    rows
      ↓
    aggregate function
      ↓
    one result

Наприклад:

    SELECT COUNT(*)
    FROM users;

Якщо таблиця містить:

    100 rows

результат:

    100

---

# Основні Aggregate Functions

Найважливіші:

    COUNT()
    SUM()
    AVG()
    MIN()
    MAX()

---

# COUNT()

`COUNT()` використовується для підрахунку.

Найпоширеніша форма:

    SELECT COUNT(*)
    FROM users;

Результат:

    count
    -------
    150

Тобто в таблиці:

    150 rows

---

# COUNT(*)

`COUNT(*)` рахує всі рядки.

Наприклад:

    SELECT COUNT(*)
    FROM products;

Якщо таблиця:

    id    name
    1     Phone
    2     Laptop
    3     Monitor

результат:

    3

---

# COUNT(column)

`COUNT(column)` рахує тільки значення, які не є `NULL`.

Наприклад:

    SELECT COUNT(email)
    FROM users;

Якщо:

    id    email
    1     a@example.com
    2     b@example.com
    3     NULL
    4     c@example.com

результат:

    3

Тому:

    COUNT(*)
        → всі rows

    COUNT(email)
        → тільки rows, де email IS NOT NULL

---

# COUNT(*) vs COUNT(column)

Дуже важлива різниця.

Нехай:

    id    name    phone
    1     John    111
    2     Anna    NULL
    3     Mike    333

Запит:

    SELECT COUNT(*)
    FROM users;

Результат:

    3

Запит:

    SELECT COUNT(phone)
    FROM users;

Результат:

    2

---

# COUNT(DISTINCT column)

Щоб порахувати унікальні значення:

    SELECT COUNT(DISTINCT city)
    FROM users;

Наприклад:

    Kyiv
    Kyiv
    Lviv
    Odesa
    Lviv

Результат:

    3

Унікальні значення:

    Kyiv
    Lviv
    Odesa

---

# COUNT(DISTINCT)

Наприклад:

    SELECT COUNT(DISTINCT user_id)
    FROM orders;

Це означає:

    скільки різних users
    зробили orders

Це дуже поширений backend/reporting pattern.

---

# COUNT з WHERE

Aggregate function можна комбінувати з `WHERE`.

Наприклад:

    SELECT COUNT(*)
    FROM users
    WHERE age >= 18;

Логіка:

    всі users
        ↓
    WHERE age >= 18
        ↓
    COUNT(*)

Результат:

    кількість users віком >= 18

---

# COUNT з кількома умовами

    SELECT COUNT(*)
    FROM users
    WHERE age >= 18
      AND is_active = true;

Результат:

    кількість активних users віком >= 18

---

# SUM()

`SUM()` обчислює суму значень.

Наприклад:

    SELECT SUM(price)
    FROM products;

Якщо:

    100
    200
    300

результат:

    600

---

# SUM() з WHERE

Наприклад:

    SELECT SUM(total)
    FROM orders
    WHERE status = 'completed';

Логіка:

    orders
      ↓
    WHERE status = 'completed'
      ↓
    SUM(total)

---

# SUM() і NULL

`SUM()` ігнорує `NULL`.

Наприклад:

    price
    -----
    100
    200
    NULL
    300

Запит:

    SELECT SUM(price)
    FROM products;

Результат:

    600

`NULL` не додається як число.

---

# SUM() без рядків

Якщо немає жодного відповідного значення:

    SELECT SUM(price)
    FROM products
    WHERE price > 1000000;

результат може бути:

    NULL

а не:

    0

Якщо потрібен `0`:

    SELECT COALESCE(SUM(price), 0)
    FROM products
    WHERE price > 1000000;

---

# AVG()

`AVG()` обчислює середнє значення.

Наприклад:

    SELECT AVG(price)
    FROM products;

Якщо:

    100
    200
    300

результат:

    200

Формула:

    SUM(values) / COUNT(values)

Але важливо враховувати типи даних та правила обчислення PostgreSQL.

---

# AVG() і NULL

`AVG()` ігнорує `NULL`.

Наприклад:

    score
    -----
    10
    20
    NULL
    30

Запит:

    SELECT AVG(score)
    FROM results;

Середнє обчислюється за:

    10
    20
    30

Результат:

    20

---

# AVG() з WHERE

Наприклад:

    SELECT AVG(age)
    FROM users
    WHERE is_active = true;

Отримуємо:

    середній age активних users

---

# MIN()

`MIN()` знаходить мінімальне значення.

Наприклад:

    SELECT MIN(price)
    FROM products;

Якщо:

    100
    50
    200
    20

результат:

    20

---

# MAX()

`MAX()` знаходить максимальне значення.

    SELECT MAX(price)
    FROM products;

Якщо:

    100
    50
    200
    20

результат:

    200

---

# MIN() та MAX() з Dates

`MIN()` та `MAX()` можна використовувати з датами.

Наприклад:

    SELECT MIN(created_at)
    FROM orders;

Отримаємо:

    найстарішу дату

А:

    SELECT MAX(created_at)
    FROM orders;

Отримаємо:

    найновішу дату

---

# MIN() та MAX() з Text

`MIN()` та `MAX()` можуть працювати з текстовими значеннями відповідно до правил порівняння типу та collation.

Наприклад:

    SELECT MIN(name)
    FROM users;

може повернути перше значення відповідно до сортування.

---

# Multiple Aggregate Functions

В одному запиті можна використовувати декілька aggregate functions.

Наприклад:

    SELECT
        COUNT(*) AS total_users,
        AVG(age) AS average_age,
        MIN(age) AS youngest,
        MAX(age) AS oldest
    FROM users;

Результат:

    total_users | average_age | youngest | oldest
    ------------+-------------+----------+-------
    150         | 34.5        | 18       | 72

---

# Aggregate Aliases

Для aggregate expressions дуже корисно використовувати aliases.

Наприклад:

    SELECT
        COUNT(*) AS total,
        AVG(price) AS average_price,
        MAX(price) AS max_price
    FROM products;

Це робить результат зрозумілішим для backend.

---

# Aggregation Without GROUP BY

Якщо `GROUP BY` немає:

    SELECT COUNT(*)
    FROM users;

весь набір рядків розглядається як одна група.

Тобто:

    all rows
        ↓
    one group
        ↓
    COUNT()
        ↓
    one row

---

# GROUP BY

`GROUP BY` розділяє rows на groups.

Наприклад:

    SELECT
        city,
        COUNT(*)
    FROM users
    GROUP BY city;

Якщо users:

    John    Kyiv
    Anna    Kyiv
    Mike    Lviv
    Kate    Odesa

результат:

    Kyiv    2
    Lviv    1
    Odesa   1

---

# Aggregate Without GROUP BY vs GROUP BY

Без `GROUP BY`:

    SELECT COUNT(*)
    FROM users;

Результат:

    1 row

З `GROUP BY`:

    SELECT city, COUNT(*)
    FROM users
    GROUP BY city;

Результат:

    one row per city

---

# GROUP BY + COUNT

Один із найважливіших SQL patterns:

    SELECT
        city,
        COUNT(*) AS user_count
    FROM users
    GROUP BY city;

Отримуємо:

    city    user_count
    -------------------
    Kyiv       50
    Lviv       20
    Odesa      15

---

# GROUP BY + SUM

Наприклад, загальна сума продажів по category:

    SELECT
        category_id,
        SUM(price) AS total_sales
    FROM products
    GROUP BY category_id;

---

# GROUP BY + AVG

Середня ціна по category:

    SELECT
        category_id,
        AVG(price) AS average_price
    FROM products
    GROUP BY category_id;

---

# GROUP BY + MIN

Найнижча ціна по category:

    SELECT
        category_id,
        MIN(price) AS min_price
    FROM products
    GROUP BY category_id;

---

# GROUP BY + MAX

Найвища ціна по category:

    SELECT
        category_id,
        MAX(price) AS max_price
    FROM products
    GROUP BY category_id;

---

# Multiple Aggregates with GROUP BY

Наприклад:

    SELECT
        category_id,
        COUNT(*) AS product_count,
        AVG(price) AS average_price,
        MIN(price) AS min_price,
        MAX(price) AS max_price
    FROM products
    GROUP BY category_id;

Результат:

    category_id | product_count | average | min | max
    ------------+---------------+---------+-----+-----
    1           | 20            | 150     | 50  | 300
    2           | 15            | 500     | 200 | 900

---

# WHERE vs HAVING

Це дуже важлива тема.

`WHERE`:

    фільтрує rows

`HAVING`:

    фільтрує groups

---

# WHERE Before Aggregation

Наприклад:

    SELECT
        city,
        COUNT(*) AS user_count
    FROM users
    WHERE is_active = true
    GROUP BY city;

Логіка:

    users
      ↓
    WHERE is_active = true
      ↓
    GROUP BY city
      ↓
    COUNT(*)

---

# HAVING After Aggregation

Наприклад:

    SELECT
        city,
        COUNT(*) AS user_count
    FROM users
    GROUP BY city
    HAVING COUNT(*) >= 10;

Тут:

    GROUP BY
        ↓
    COUNT()
        ↓
    HAVING

залишає тільки міста, де:

    user_count >= 10

---

# WHERE vs HAVING Example

❌ Неправильна ідея:

    WHERE COUNT(*) > 10

`WHERE` не використовується для фільтрації aggregate result.

Правильно:

    HAVING COUNT(*) > 10

---

# WHERE + GROUP BY + HAVING

Повний pattern:

    SELECT
        city,
        COUNT(*) AS user_count
    FROM users
    WHERE is_active = true
    GROUP BY city
    HAVING COUNT(*) >= 10;

Логіка:

    rows
      ↓
    WHERE
      ↓
    GROUP BY
      ↓
    aggregate
      ↓
    HAVING
      ↓
    result

---

# Conditional Aggregation

Conditional aggregation — підрахунок або aggregation тільки для рядків, які відповідають умові.

Один із сучасних PostgreSQL-підходів:

    FILTER (WHERE ...)

Наприклад:

    SELECT
        COUNT(*) AS total_users,
        COUNT(*) FILTER (WHERE is_active = true) AS active_users
    FROM users;

Результат може бути:

    total_users | active_users
    ------------+-------------
    150         | 120

---

# FILTER

Синтаксис:

    aggregate_function(...) FILTER (WHERE condition)

Наприклад:

    COUNT(*) FILTER (WHERE age >= 18)

Це означає:

    порахувати тільки rows,
    де age >= 18

---

# Multiple FILTER Aggregates

Можна отримати декілька показників одним запитом:

    SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE is_active) AS active,
        COUNT(*) FILTER (WHERE NOT is_active) AS inactive
    FROM users;

Це дуже корисний pattern для dashboard/reporting.

---

# SUM + FILTER

Наприклад:

    SELECT
        SUM(amount) AS total,
        SUM(amount) FILTER (
            WHERE status = 'completed'
        ) AS completed_total
    FROM orders;

---

# AVG + FILTER

    SELECT
        AVG(score) AS average_score,
        AVG(score) FILTER (
            WHERE passed = true
        ) AS average_passed_score
    FROM results;

---

# FILTER vs CASE

Conditional aggregation можна реалізувати через `CASE`.

Наприклад:

    SELECT
        SUM(
            CASE
                WHEN status = 'completed'
                THEN amount
                ELSE 0
            END
        ) AS completed_total
    FROM orders;

Або через `FILTER`:

    SELECT
        SUM(amount) FILTER (
            WHERE status = 'completed'
        ) AS completed_total
    FROM orders;

`FILTER` часто робить conditional aggregation читабельнішим.

---

# DISTINCT Inside Aggregate

Aggregate functions можуть використовувати `DISTINCT`.

Наприклад:

    SELECT SUM(DISTINCT price)
    FROM products;

Це означає:

    скласти тільки унікальні price

Наприклад:

    100
    100
    200
    300

результат:

    600

а не:

    700

---

# AVG(DISTINCT)

Також:

    SELECT AVG(DISTINCT price)
    FROM products;

Середнє буде обчислене тільки за унікальними значеннями.

---

# COUNT(DISTINCT)

Найпоширеніший випадок:

    SELECT COUNT(DISTINCT user_id)
    FROM orders;

Це:

    кількість унікальних users

---

# NULL and Aggregate Functions

Більшість стандартних aggregate functions ігнорують `NULL`.

Наприклад:

    values:

    10
    20
    NULL
    30

Тоді:

    COUNT(value) → 3
    SUM(value)   → 60
    AVG(value)   → 20
    MIN(value)   → 10
    MAX(value)   → 30

---

# COUNT(*) and NULL

Особливий випадок:

    COUNT(*)

не ігнорує rows через `NULL`.

Він рахує самі rows.

Тому:

    COUNT(*)

і:

    COUNT(column)

можуть дати різні результати.

---

# COALESCE with Aggregates

`COALESCE()` дозволяє замінити `NULL`.

Наприклад:

    SELECT COALESCE(SUM(amount), 0)
    FROM orders
    WHERE user_id = 999;

Якщо немає orders:

    SUM(amount) → NULL

але:

    COALESCE(..., 0)

дасть:

    0

---

# Aggregate Result Types

Тип результату aggregate function залежить від типу вхідного значення та самої функції.

Наприклад:

    COUNT(*)

у PostgreSQL повертає:

    bigint

Тому в backend не завжди потрібно припускати, що aggregate result — це `integer`.

---

# COUNT and bigint

Наприклад:

    SELECT COUNT(*)
    FROM users;

Результат має тип:

    bigint

У JavaScript/TypeScript PostgreSQL driver може повертати деякі `bigint`-значення як string залежно від драйвера та його налаштувань.

Тому при інтеграції PostgreSQL з Node.js важливо перевіряти фактичний тип результату.

---

# Aggregate Queries with JOIN

Aggregate functions часто використовуються разом із `JOIN`.

Наприклад:

    SELECT
        users.id,
        users.name,
        COUNT(orders.id) AS order_count
    FROM users
    LEFT JOIN orders
        ON orders.user_id = users.id
    GROUP BY users.id, users.name;

Це дозволяє отримати:

    user
    +
    кількість orders

---

# COUNT(*) vs COUNT(orders.id) with LEFT JOIN

Це дуже важлива деталь.

При:

    LEFT JOIN orders

може існувати user без orders.

Запит:

    COUNT(*)

порахує рядок `LEFT JOIN`, навіть якщо `orders.id` є `NULL`.

Тому для кількості orders часто використовують:

    COUNT(orders.id)

Наприклад:

    SELECT
        users.id,
        users.name,
        COUNT(orders.id) AS order_count
    FROM users
    LEFT JOIN orders
        ON orders.user_id = users.id
    GROUP BY users.id, users.name;

Для user без orders:

    COUNT(orders.id) = 0

---

# SUM with JOIN

Наприклад:

    SELECT
        users.id,
        users.name,
        SUM(orders.total) AS total_spent
    FROM users
    LEFT JOIN orders
        ON orders.user_id = users.id
    GROUP BY users.id, users.name;

Для users без orders:

    SUM(orders.total)

може бути:

    NULL

Тому часто:

    COALESCE(SUM(orders.total), 0)

---

# JOIN + COUNT + SUM

Наприклад:

    SELECT
        users.id,
        users.name,
        COUNT(orders.id) AS order_count,
        COALESCE(SUM(orders.total), 0) AS total_spent
    FROM users
    LEFT JOIN orders
        ON orders.user_id = users.id
    GROUP BY users.id, users.name;

Це вже дуже типовий backend/reporting query.

---

# GROUP BY Multiple Columns

Можна групувати за кількома columns.

Наприклад:

    SELECT
        city,
        status,
        COUNT(*) AS user_count
    FROM users
    GROUP BY city, status;

Тоді група визначається комбінацією:

    city + status

---

# Example

Дані:

    city    status
    Kyiv    active
    Kyiv    active
    Kyiv    inactive
    Lviv    active

Запит:

    SELECT
        city,
        status,
        COUNT(*)
    FROM users
    GROUP BY city, status;

Результат:

    Kyiv    active      2
    Kyiv    inactive    1
    Lviv    active      1

---

# GROUP BY and SELECT

Якщо використовується `GROUP BY`, кожен selected column повинен бути:

    grouped

або:

    aggregated

Наприклад:

    SELECT
        city,
        COUNT(*)
    FROM users
    GROUP BY city;

Правильно.

А:

    SELECT
        city,
        name,
        COUNT(*)
    FROM users
    GROUP BY city;

може бути помилкою, тому що `name` не є ні aggregate, ні grouped column.

---

# Correct GROUP BY

Наприклад:

    SELECT
        city,
        name,
        COUNT(*)
    FROM users
    GROUP BY city, name;

Тут:

    city → grouped
    name → grouped
    COUNT(*) → aggregate

Але бізнес-сенс такого grouping потрібно оцінювати окремо.

---

# Aggregate Function and GROUP BY

Можна думати так:

Без `GROUP BY`:

    all rows
        ↓
    one group
        ↓
    aggregate

З `GROUP BY city`:

    all rows
        ↓
    groups by city
        ↓
    aggregate for each city

---

# Aggregate Functions and ORDER BY

Результат aggregation можна сортувати.

Наприклад:

    SELECT
        city,
        COUNT(*) AS user_count
    FROM users
    GROUP BY city
    ORDER BY user_count DESC;

Отримаємо:

    міста з найбільшою кількістю users
        ↓
    міста з меншою кількістю users

---

# GROUP BY + ORDER BY Aggregate

Можна:

    SELECT
        category_id,
        SUM(price) AS total
    FROM products
    GROUP BY category_id
    ORDER BY total DESC;

---

# GROUP BY + HAVING + ORDER BY

Повний reporting pattern:

    SELECT
        category_id,
        COUNT(*) AS product_count,
        AVG(price) AS average_price
    FROM products
    GROUP BY category_id
    HAVING COUNT(*) >= 10
    ORDER BY average_price DESC;

Логіка:

    WHERE
      ↓
    GROUP BY
      ↓
    aggregate
      ↓
    HAVING
      ↓
    ORDER BY

---

# LIMIT with Aggregate Results

Можна обмежувати кількість groups.

Наприклад:

    SELECT
        category_id,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category_id
    ORDER BY product_count DESC
    LIMIT 5;

Це:

    top 5 categories
    by product count

---

# Top-N Aggregation

Наприклад, 10 users з найбільшою кількістю orders:

    SELECT
        user_id,
        COUNT(*) AS order_count
    FROM orders
    GROUP BY user_id
    ORDER BY order_count DESC
    LIMIT 10;

Це дуже поширений SQL pattern.

---

# Aggregate Query Pattern

Типова структура:

    SELECT
        grouping_columns,
        aggregate_functions
    FROM table
    WHERE row_conditions
    GROUP BY grouping_columns
    HAVING group_conditions
    ORDER BY ...
    LIMIT ...;

Наприклад:

    SELECT
        category_id,
        COUNT(*) AS product_count,
        AVG(price) AS average_price
    FROM products
    WHERE price > 10
    GROUP BY category_id
    HAVING COUNT(*) >= 5
    ORDER BY average_price DESC
    LIMIT 10;

---

# Common Aggregate Patterns

## Count all rows

    SELECT COUNT(*)
    FROM users;

---

## Count non-null values

    SELECT COUNT(email)
    FROM users;

---

## Count unique values

    SELECT COUNT(DISTINCT city)
    FROM users;

---

## Sum

    SELECT SUM(amount)
    FROM orders;

---

## Average

    SELECT AVG(price)
    FROM products;

---

## Minimum

    SELECT MIN(price)
    FROM products;

---

## Maximum

    SELECT MAX(price)
    FROM products;

---

## Count per group

    SELECT
        city,
        COUNT(*)
    FROM users
    GROUP BY city;

---

## Sum per group

    SELECT
        user_id,
        SUM(amount)
    FROM orders
    GROUP BY user_id;

---

## Average per group

    SELECT
        category_id,
        AVG(price)
    FROM products
    GROUP BY category_id;

---

## Groups with minimum count

    SELECT
        city,
        COUNT(*) AS user_count
    FROM users
    GROUP BY city
    HAVING COUNT(*) >= 10;

---

# Practical Examples

## Example 1 — Number of users

    SELECT COUNT(*) AS total_users
    FROM users;

---

## Example 2 — Active users

    SELECT COUNT(*) AS active_users
    FROM users
    WHERE is_active = true;

---

## Example 3 — Average age

    SELECT AVG(age) AS average_age
    FROM users;

---

## Example 4 — Youngest and oldest user

    SELECT
        MIN(age) AS youngest,
        MAX(age) AS oldest
    FROM users;

---

## Example 5 — Total order value

    SELECT SUM(total) AS total_revenue
    FROM orders;

---

## Example 6 — Completed revenue

    SELECT SUM(total) AS completed_revenue
    FROM orders
    WHERE status = 'completed';

---

## Example 7 — Orders per user

    SELECT
        user_id,
        COUNT(*) AS order_count
    FROM orders
    GROUP BY user_id;

---

## Example 8 — Revenue per user

    SELECT
        user_id,
        SUM(total) AS total_spent
    FROM orders
    GROUP BY user_id;

---

## Example 9 — Average order value

    SELECT AVG(total) AS average_order
    FROM orders;

---

## Example 10 — Most expensive product

    SELECT MAX(price) AS max_price
    FROM products;

---

## Example 11 — Cheapest product

    SELECT MIN(price) AS min_price
    FROM products;

---

## Example 12 — Users per city

    SELECT
        city,
        COUNT(*) AS user_count
    FROM users
    GROUP BY city
    ORDER BY user_count DESC;

---

## Example 13 — Revenue per month

Для PostgreSQL можна групувати за датою:

    SELECT
        DATE_TRUNC('month', created_at) AS month,
        SUM(total) AS revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', created_at)
    ORDER BY month;

Це типовий reporting pattern.

---

## Example 14 — Orders per month

    SELECT
        DATE_TRUNC('month', created_at) AS month,
        COUNT(*) AS order_count
    FROM orders
    GROUP BY DATE_TRUNC('month', created_at)
    ORDER BY month;

---

## Example 15 — Active and inactive users

    SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (
            WHERE is_active = true
        ) AS active,
        COUNT(*) FILTER (
            WHERE is_active = false
        ) AS inactive
    FROM users;

---

## Example 16 — Completed and cancelled orders

    SELECT
        COUNT(*) FILTER (
            WHERE status = 'completed'
        ) AS completed,
        COUNT(*) FILTER (
            WHERE status = 'cancelled'
        ) AS cancelled
    FROM orders;

---

## Example 17 — Categories with many products

    SELECT
        category_id,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category_id
    HAVING COUNT(*) >= 20;

---

## Example 18 — Top categories

    SELECT
        category_id,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category_id
    ORDER BY product_count DESC
    LIMIT 5;

---

# Aggregate Functions vs Scalar Functions

Це важлива концепція.

Scalar function:

    one input row
        ↓
    one result

Aggregate function:

    many input rows
        ↓
    one result

Наприклад:

    LOWER(name)

працює з окремим значенням.

А:

    COUNT(*)

працює з набором rows.

---

# Aggregate vs Window Function

Aggregate function:

    SELECT
        department,
        AVG(salary)
    FROM employees
    GROUP BY department;

Результат:

    one row per department

Window function:

    SELECT
        name,
        department,
        salary,
        AVG(salary) OVER (
            PARTITION BY department
        ) AS department_average
    FROM employees;

Результат:

    кожен employee
    +
    average його department

Тобто:

    aggregate + GROUP BY
        → зменшує кількість rows

    window function
        → зберігає rows

Window functions будуть окремою більш просунутою темою.

---

# GROUP BY Reduces Rows

Наприклад, таблиця:

    1000 users

Запит:

    SELECT COUNT(*)
    FROM users;

Результат:

    1 row

А:

    SELECT city, COUNT(*)
    FROM users
    GROUP BY city;

Якщо є 20 міст:

    20 rows

Aggregation перетворює багато rows у summary rows.

---

# HAVING vs WHERE

Запам'ятати:

    WHERE
        → rows

    HAVING
        → groups

Приклад:

    SELECT
        city,
        COUNT(*) AS user_count
    FROM users
    WHERE is_active = true
    GROUP BY city
    HAVING COUNT(*) >= 10;

Тут:

    WHERE
        → тільки active users

    GROUP BY
        → групування за city

    COUNT
        → кількість у кожній city

    HAVING
        → залишити cities з >= 10 users

---

# Aggregate Functions and NULL

Типова таблиця:

    id    value
    1     10
    2     20
    3     NULL
    4     30

Результати:

    COUNT(*)       → 4
    COUNT(value)   → 3
    SUM(value)     → 60
    AVG(value)     → 20
    MIN(value)     → 10
    MAX(value)     → 30

---

# Empty Input

Якщо aggregation не має input rows:

    COUNT(*)

повертає:

    0

А деякі інші aggregate functions, наприклад:

    SUM()
    AVG()
    MIN()
    MAX()

можуть повернути:

    NULL

Тому для числового API result часто корисно:

    COALESCE(SUM(amount), 0)

---

# COALESCE Pattern

Наприклад:

    SELECT
        COALESCE(SUM(total), 0) AS total_revenue
    FROM orders
    WHERE user_id = 999;

Результат:

    0

замість:

    NULL

---

# Aggregate Functions with Expressions

Aggregate function може отримувати expression.

Наприклад:

    SELECT SUM(price * quantity)
    FROM order_items;

Тут спочатку для кожного row обчислюється:

    price * quantity

після чого значення сумуються.

---

# SUM Expression

Наприклад:

    SELECT
        SUM(price * quantity) AS total
    FROM order_items;

Це типовий спосіб отримати:

    total order value

---

# AVG Expression

Наприклад:

    SELECT
        AVG(price * quantity) AS average_item_total
    FROM order_items;

---

# Aggregate with CASE

Наприклад:

    SELECT
        SUM(
            CASE
                WHEN status = 'completed'
                THEN total
                ELSE 0
            END
        ) AS completed_revenue
    FROM orders;

Це старий і дуже поширений conditional aggregation pattern.

---

# FILTER vs CASE

Сучасний PostgreSQL-підхід:

    SELECT
        SUM(total) FILTER (
            WHERE status = 'completed'
        ) AS completed_revenue
    FROM orders;

Альтернатива:

    SELECT
        SUM(
            CASE
                WHEN status = 'completed'
                THEN total
                ELSE 0
            END
        ) AS completed_revenue
    FROM orders;

Обидва підходи коректні.

`FILTER` часто простіший для читання.

---

# Aggregate Functions and DISTINCT

Наприклад:

    SELECT
        COUNT(DISTINCT user_id) AS unique_users
    FROM orders;

Це означає:

    кількість різних users,
    які мають orders.

---

# Practical Backend Dashboard

Aggregate queries часто використовуються для dashboard.

Наприклад:

    SELECT
        COUNT(*) AS total_orders,
        COUNT(*) FILTER (
            WHERE status = 'completed'
        ) AS completed_orders,
        COUNT(*) FILTER (
            WHERE status = 'pending'
        ) AS pending_orders,
        COALESCE(
            SUM(total) FILTER (
                WHERE status = 'completed'
            ),
            0
        ) AS revenue
    FROM orders;

Один SQL-запит може повернути summary:

    total_orders
    completed_orders
    pending_orders
    revenue

---

# Practical Reporting Query

Наприклад:

    SELECT
        category_id,
        COUNT(*) AS product_count,
        AVG(price) AS average_price,
        MIN(price) AS min_price,
        MAX(price) AS max_price,
        SUM(price) AS total_value
    FROM products
    GROUP BY category_id
    ORDER BY total_value DESC;

Це вже типовий SQL reporting query.

---

# Типові помилки

❌ Плутати:

    COUNT(*)

та:

    COUNT(column)

`COUNT(*)` рахує rows.

`COUNT(column)` ігнорує `NULL`.

---

❌ Використовувати `WHERE` для aggregate condition.

Неправильно:

    WHERE COUNT(*) > 10

Правильно:

    HAVING COUNT(*) > 10

---

❌ Забувати `GROUP BY`.

Наприклад:

    SELECT city, COUNT(*)
    FROM users;

Такий запит не відповідає звичайній логіці "кількість по city", бо `city` не є aggregate expression і не згрупований.

Правильно:

    SELECT
        city,
        COUNT(*)
    FROM users
    GROUP BY city;

---

❌ Плутати aggregation з window functions.

    GROUP BY
        → зменшує rows

    window function
        → зберігає rows

---

❌ Очікувати `0` від `SUM()` на порожньому наборі.

Може бути:

    NULL

Якщо потрібен `0`:

    COALESCE(SUM(amount), 0)

---

❌ Забувати `NULL` у `AVG()`.

`AVG()` не рахує `NULL` як `0`.

Наприклад:

    10
    NULL
    30

середнє:

    20

а не:

    13.33

---

❌ Використовувати `COUNT(*)` замість `COUNT(joined_table.id)` у `LEFT JOIN`, коли потрібно порахувати кількість пов'язаних rows.

Наприклад:

    COUNT(orders.id)

часто правильніший варіант для:

    LEFT JOIN orders

---

❌ Використовувати `COUNT(DISTINCT ...)` без розуміння, що саме вважається унікальним.

---

❌ Забувати alias для складних aggregate expressions.

Замість:

    SELECT COUNT(*), SUM(total), AVG(total)
    ...

краще:

    SELECT
        COUNT(*) AS order_count,
        SUM(total) AS total_revenue,
        AVG(total) AS average_order
    ...

---

❌ Використовувати aggregation там, де потрібні окремі rows.

Наприклад, якщо потрібно:

    кожен user
    +
    середній age всіх users

можливо, потрібна window function, а не `GROUP BY`.

---

# Interview Questions

Що таке aggregate function?

Які основні aggregate functions PostgreSQL?

Що робить `COUNT()`?

Що робить `COUNT(*)`?

Чим `COUNT(*)` відрізняється від `COUNT(column)`?

Що робить `COUNT(DISTINCT column)`?

Що робить `SUM()`?

Що робить `AVG()`?

Що робить `MIN()`?

Що робить `MAX()`?

Як aggregate functions працюють з `NULL`?

Що повертає `SUM()` при відсутності рядків?

Як отримати `0` замість `NULL` від `SUM()`?

Що робить `COALESCE()`?

Що відбувається з кількістю rows при aggregation?

Що робить `GROUP BY`?

Що таке group?

Чим відрізняється aggregation без `GROUP BY` від aggregation з `GROUP BY`?

Як порахувати кількість users по city?

Як отримати середню ціну по category?

Як отримати суму продажів по user?

Що робить `HAVING`?

Чим `WHERE` відрізняється від `HAVING`?

Чому не можна використовувати aggregate function у `WHERE` звичайним способом?

Як працює:

    WHERE
    GROUP BY
    HAVING

Що таке conditional aggregation?

Що робить:

    FILTER (WHERE ...)

Чим `FILTER` відрізняється від `CASE` в aggregation?

Як порахувати active та inactive users одним запитом?

Як порахувати унікальних users?

Як працює `COUNT(DISTINCT user_id)`?

Як aggregation працює з `LEFT JOIN`?

Чому іноді використовують `COUNT(orders.id)` замість `COUNT(*)`?

Як отримати загальну суму orders для кожного user?

Як отримати users з кількістю orders більше 5?

Як отримати top 10 users за кількістю orders?

Як отримати мінімальну та максимальну дату?

Як відсортувати groups за aggregate result?

Чим aggregate function відрізняється від scalar function?

Чим aggregate function відрізняється від window function?

Що робить `GROUP BY` з кількістю rows?

Який тип повертає `COUNT(*)` у PostgreSQL?

Як aggregation використовується в backend API?

Як aggregation використовується для dashboard?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке aggregate function.

`COUNT()`.

`COUNT(*)`.

`COUNT(column)`.

`COUNT(DISTINCT column)`.

`SUM()`.

`AVG()`.

`MIN()`.

`MAX()`.

Aggregation без `GROUP BY`.

`NULL` в aggregate functions.

`COALESCE()`.

Основи:

    GROUP BY

Основи:

    HAVING

Різниця:

    WHERE
    HAVING

Multiple aggregate functions.

Aliases для aggregate results.

---

## 🔵 Junior

`GROUP BY`.

Grouping за одним column.

Grouping за кількома columns.

`COUNT()` по groups.

`SUM()` по groups.

`AVG()` по groups.

`MIN()` / `MAX()` по groups.

`WHERE + GROUP BY`.

`GROUP BY + HAVING`.

`GROUP BY + ORDER BY`.

`GROUP BY + LIMIT`.

`COUNT(DISTINCT ...)`.

Conditional aggregation.

`FILTER (WHERE ...)`.

`CASE` у aggregation.

`COALESCE()` з aggregation.

Aggregation + `JOIN`.

`LEFT JOIN` + `COUNT()`.

`LEFT JOIN` + `SUM()`.

Top-N groups.

Aggregation у reporting queries.

Aggregation у backend API.

---

## 🟠 Middle

Складні aggregate queries.

Multiple `JOIN` + aggregation.

Conditional aggregation.

`FILTER`.

`CASE` vs `FILTER`.

Aggregation + subqueries.

Aggregation + CTE.

Aggregation + pagination/reporting.

Date aggregation.

Наприклад:

    DATE_TRUNC()

Aggregation великих таблиць.

Performance aggregate queries.

Indexes та filtering перед aggregation.

`EXPLAIN ANALYZE`.

Hash aggregation.

Group aggregation.

Розуміння:

    aggregate function
    vs
    window function

Типи результатів aggregate functions.

`bigint` для `COUNT(*)`.

Null handling у production queries.

---

## 🔴 Senior

Advanced aggregation.

Complex reporting queries.

Large-scale aggregation.

Query planning.

HashAggregate.

GroupAggregate.

Sort-based aggregation.

Parallel aggregation.

Partial aggregation.

Aggregate performance.

Index interaction.

Pre-aggregation.

Materialized views.

Incremental reporting strategies.

Advanced conditional aggregation.

Complex multi-level aggregation.

`GROUPING SETS`.

`ROLLUP`.

`CUBE`.

Ordered-set aggregates.

Hypothetical-set aggregates.

Statistical aggregates.

Custom aggregate functions.

Aggregate functions for:

    arrays
    JSON
    strings
    statistics

Trade-offs між:

    aggregation
    subqueries
    CTE
    window functions
    materialized views

---

# Mini Cheat Sheet

## COUNT(*)

    SELECT COUNT(*)
    FROM users;

    → кількість rows

---

## COUNT(column)

    SELECT COUNT(email)
    FROM users;

    → кількість non-NULL email

---

## COUNT(DISTINCT)

    SELECT COUNT(DISTINCT city)
    FROM users;

    → кількість унікальних city

---

## SUM

    SELECT SUM(amount)
    FROM orders;

    → сума

---

## AVG

    SELECT AVG(price)
    FROM products;

    → середнє

---

## MIN

    SELECT MIN(price)
    FROM products;

    → мінімум

---

## MAX

    SELECT MAX(price)
    FROM products;

    → максимум

---

## GROUP BY

    SELECT
        city,
        COUNT(*) AS user_count
    FROM users
    GROUP BY city;

    → кількість users по city

---

## WHERE + GROUP BY

    SELECT
        city,
        COUNT(*) AS user_count
    FROM users
    WHERE is_active = true
    GROUP BY city;

    → групуємо тільки active users

---

## HAVING

    SELECT
        city,
        COUNT(*) AS user_count
    FROM users
    GROUP BY city
    HAVING COUNT(*) >= 10;

    → залишаємо groups >= 10

---

## ORDER BY aggregate

    SELECT
        city,
        COUNT(*) AS user_count
    FROM users
    GROUP BY city
    ORDER BY user_count DESC;

    → найбільші groups першими

---

## Top-N

    SELECT
        user_id,
        COUNT(*) AS order_count
    FROM orders
    GROUP BY user_id
    ORDER BY order_count DESC
    LIMIT 10;

    → top 10 users

---

## FILTER

    SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (
            WHERE is_active
        ) AS active
    FROM users;

---

## COALESCE

    SELECT
        COALESCE(SUM(total), 0) AS revenue
    FROM orders;

    → NULL замінюється на 0

---

## LEFT JOIN + COUNT

    SELECT
        users.id,
        COUNT(orders.id) AS order_count
    FROM users
    LEFT JOIN orders
        ON orders.user_id = users.id
    GROUP BY users.id;

    → users без orders отримають 0

---

## Multiple aggregates

    SELECT
        COUNT(*) AS total,
        SUM(total) AS revenue,
        AVG(total) AS average,
        MIN(total) AS minimum,
        MAX(total) AS maximum
    FROM orders;

---

# Основні правила

    COUNT(*)              → count rows
    COUNT(column)         → count non-NULL values
    COUNT(DISTINCT column)→ count unique non-NULL values

    SUM() → sum
    AVG() → average
    MIN() → minimum
    MAX() → maximum

    WHERE
        → filter rows

    GROUP BY
        → create groups

    aggregate
        → calculate summary per group

    HAVING
        → filter groups

    ORDER BY
        → sort groups/result

    LIMIT
        → limit result

---

# Логічна модель aggregation

Без `GROUP BY`:

    rows
      ↓
    one group
      ↓
    aggregate
      ↓
    one result row

З `GROUP BY`:

    rows
      ↓
    GROUP BY
      ↓
    groups
      ↓
    aggregate per group
      ↓
    result rows

---

# Основна модель SQL Reporting

    FROM
      ↓
    JOIN
      ↓
    WHERE
      ↓
    GROUP BY
      ↓
    aggregate
      ↓
    HAVING
      ↓
    SELECT
      ↓
    ORDER BY
      ↓
    LIMIT

Важливо розрізняти:

    WHERE
        → фільтрує rows

    HAVING
        → фільтрує groups

---

# Головне

• Aggregate functions дозволяють отримувати summary information з набору rows.

• Основні aggregate functions PostgreSQL:

    COUNT()
    SUM()
    AVG()
    MIN()
    MAX()

• `COUNT(*)` рахує всі rows.

• `COUNT(column)` рахує тільки non-`NULL` values.

• `COUNT(DISTINCT column)` рахує унікальні non-`NULL` values.

• `SUM()` обчислює суму.

• `AVG()` обчислює середнє.

• `MIN()` знаходить мінімальне значення.

• `MAX()` знаходить максимальне значення.

• Більшість aggregate functions ігнорують `NULL`.

• `COUNT(*)` рахує rows навіть тоді, коли окремі columns містять `NULL`.

• `SUM()`, `AVG()`, `MIN()` та `MAX()` можуть повернути `NULL`, якщо немає відповідних значень.

• Якщо замість `NULL` потрібен `0`:

    COALESCE(SUM(amount), 0)

• Без `GROUP BY` весь набір rows розглядається як одна група.

• `GROUP BY` створює окремі groups.

• Aggregate function після `GROUP BY` обчислюється для кожної group.

• Наприклад:

    SELECT
        city,
        COUNT(*)
    FROM users
    GROUP BY city;

означає:

    users
      ↓
    groups by city
      ↓
    count users in each city

• `WHERE` фільтрує rows до aggregation.

• `HAVING` фільтрує groups після aggregation.

• Тому:

    WHERE COUNT(*)

не є правильним способом фільтрації aggregate result.

Використовується:

    HAVING COUNT(*)

• Типовий reporting query:

    SELECT
        category_id,
        COUNT(*) AS product_count,
        AVG(price) AS average_price
    FROM products
    WHERE price > 10
    GROUP BY category_id
    HAVING COUNT(*) >= 5
    ORDER BY average_price DESC;

• Aggregate functions часто комбінуються з `JOIN`.

• При `LEFT JOIN` для підрахунку пов'язаних rows часто використовується:

    COUNT(related_table.id)

а не:

    COUNT(*)

• Conditional aggregation можна виконувати через:

    FILTER (WHERE ...)

• Наприклад:

    COUNT(*) FILTER (
        WHERE is_active = true
    )

• `FILTER` часто робить conditional aggregation читабельнішим за складний `CASE`.

• Aggregate functions можна використовувати з expressions:

    SUM(price * quantity)

• Aggregate results можна сортувати:

    ORDER BY total DESC

• Aggregate results можна обмежувати:

    LIMIT 10

• Типовий Top-N pattern:

    GROUP BY
      ↓
    aggregate
      ↓
    ORDER BY aggregate DESC
      ↓
    LIMIT N

• Aggregation зменшує кількість rows.

• Window functions, на відміну від `GROUP BY`, можуть зберігати кожен original row.

• Aggregate queries є фундаментом для:

    reports
    dashboards
    statistics
    analytics
    CRUD summaries
    admin panels
    API endpoints

• Найважливіша модель:

    WHERE
      ↓
    GROUP BY
      ↓
    aggregate
      ↓
    HAVING
      ↓
    ORDER BY
      ↓
    LIMIT

• Головне питання при роботі з aggregation:

    "Що я рахую?"

і:

    "Для якої групи я це рахую?"

• Якщо потрібно отримати один summary для всієї таблиці:

    aggregate without GROUP BY

• Якщо потрібно отримати summary для кожної категорії/user/city:

    GROUP BY + aggregate

• Якщо потрібно відфільтрувати отримані groups:

    HAVING

• Якщо потрібно відфільтрувати rows до aggregation:

    WHERE

• Якщо потрібно отримати умовний summary:

    FILTER (WHERE ...)
    або
    CASE

• Якщо потрібно замінити `NULL`:

    COALESCE()

• У backend-розробці aggregate queries особливо важливі для отримання готових summary-даних без необхідності завантажувати всі rows у JavaScript/TypeScript і рахувати їх вручну.

• PostgreSQL повинен виконувати aggregation на стороні БД, коли це логічно можливо, а backend отримує вже підготовлений результат.

• Базова модель:

    багато rows
        ↓
    aggregation
        ↓
    summary data
        ↓
    API
        ↓
    UI
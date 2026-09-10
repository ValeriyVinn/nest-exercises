# 11 — GROUP BY та HAVING у PostgreSQL

## 📌 Мета

Навчитися групувати записи та виконувати агрегатні обчислення окремо для кожної групи.

Після цього розділу ти повинен розуміти:

- що робить `GROUP BY`;
- як `GROUP BY` працює разом з `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`;
- чим відрізняється агрегування всіх рядків від агрегування по групах;
- що таке `HAVING`;
- чим `HAVING` відрізняється від `WHERE`;
- як групувати за кількома колонками;
- як фільтрувати групи;
- як сортувати результати агрегування;
- як працює `GROUP BY` з `NULL`;
- як використовувати `COUNT(*)` та `COUNT(column)` у групах;
- як будувати практичні SQL-запити для статистики.

---

# 1. Що таке GROUP BY

`GROUP BY` об'єднує рядки з однаковими значеннями в групи.

Після цього агрегатні функції (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`...) можуть виконувати обчислення **для кожної групи окремо**.

Наприклад, є таблиця:

    products

    id | name       | category | price
    ---|------------|----------|------
    1  | Laptop     | tech     | 30000
    2  | Mouse      | tech     | 1000
    3  | Keyboard   | tech     | 2500
    4  | Chair      | furniture| 5000
    5  | Desk       | furniture| 8000

Без `GROUP BY`:

    SELECT COUNT(*)
    FROM products;

Результат:

    count
    -----
    5

Ми отримали загальну кількість товарів.

З `GROUP BY`:

    SELECT category, COUNT(*)
    FROM products
    GROUP BY category;

Результат:

    category   | count
    -----------|------
    tech       | 3
    furniture  | 2

Тепер PostgreSQL створив дві групи:

    tech
    furniture

і порахував кількість рядків **у кожній групі**.

---

# 2. Головна ідея GROUP BY

Запам'ятай:

> `GROUP BY` змінює рівень, на якому працює агрегат.

Без `GROUP BY`:

    SELECT COUNT(*)
    FROM products;

Одна загальна група:

    всі товари → COUNT → 5

З `GROUP BY category`:

    tech       → COUNT → 3
    furniture  → COUNT → 2

Тобто:

    GROUP BY = "розділи рядки на групи"

    aggregate = "порахуй щось всередині кожної групи"

---

# 3. Базовий синтаксис

    SELECT column, AGGREGATE_FUNCTION(...)
    FROM table
    GROUP BY column;

Наприклад:

    SELECT category, COUNT(*)
    FROM products
    GROUP BY category;

---

# 4. GROUP BY + COUNT

## 4.1. Кількість записів у кожній групі

    SELECT category, COUNT(*) AS product_count
    FROM products
    GROUP BY category;

Результат:

    category    | product_count
    ------------|--------------
    tech        | 3
    furniture   | 2

---

# 5. GROUP BY + SUM

Можна підрахувати суму значень у кожній групі.

    SELECT category, SUM(price) AS total_price
    FROM products
    GROUP BY category;

Наприклад:

    category    | total_price
    ------------|------------
    tech        | 33500
    furniture   | 13000

Тобто:

    tech:
    30000 + 1000 + 2500 = 33500

    furniture:
    5000 + 8000 = 13000

---

# 6. GROUP BY + AVG

Середнє значення для кожної групи:

    SELECT category, AVG(price) AS average_price
    FROM products
    GROUP BY category;

Для зручного відображення:

    SELECT
        category,
        ROUND(AVG(price), 2) AS average_price
    FROM products
    GROUP BY category;

---

# 7. GROUP BY + MIN / MAX

Мінімальна ціна в кожній категорії:

    SELECT
        category,
        MIN(price) AS min_price
    FROM products
    GROUP BY category;

Максимальна:

    SELECT
        category,
        MAX(price) AS max_price
    FROM products
    GROUP BY category;

Можна використати всі агрегати разом:

    SELECT
        category,
        COUNT(*) AS product_count,
        SUM(price) AS total_price,
        ROUND(AVG(price), 2) AS average_price,
        MIN(price) AS min_price,
        MAX(price) AS max_price
    FROM products
    GROUP BY category;

Це вже типовий практичний SQL-запит для отримання статистики.

---

# 8. GROUP BY та SELECT

Важливе правило PostgreSQL:

Якщо використовується `GROUP BY`, кожна колонка в `SELECT`, яка не є агрегатом, повинна бути:

- або в `GROUP BY`;
- або використана всередині агрегатної функції.

Правильно:

    SELECT
        category,
        COUNT(*)
    FROM products
    GROUP BY category;

`category` є в `GROUP BY`.

---

Неправильно:

    SELECT
        category,
        name,
        COUNT(*)
    FROM products
    GROUP BY category;

`name` не входить у `GROUP BY` і не є агрегатом.

PostgreSQL повідомить про помилку на кшталт:

    column "name" must appear in the GROUP BY clause
    or be used in an aggregate function

---

# 9. Чому PostgreSQL не дозволяє просто додати name

Припустимо:

    category | name
    ---------|---------
    tech     | Laptop
    tech     | Mouse
    tech     | Keyboard

Ми просимо:

    SELECT category, name, COUNT(*)
    FROM products
    GROUP BY category;

Проблема:

Для групи `tech` є три `name`:

    Laptop
    Mouse
    Keyboard

Яке одне значення `name` потрібно повернути?

PostgreSQL не вгадує.

Тому потрібно або:

- додати `name` до `GROUP BY`;
- або застосувати агрегатну функцію;
- або змінити структуру запиту.

---

# 10. GROUP BY декількох колонок

Можна групувати за двома або більше колонками.

Наприклад:

    orders

    id | city     | status
    ---|----------|--------
    1  | Vinnytsia| paid
    2  | Vinnytsia| pending
    3  | Kyiv     | paid
    4  | Kyiv     | paid
    5  | Kyiv     | pending

Запит:

    SELECT
        city,
        status,
        COUNT(*) AS order_count
    FROM orders
    GROUP BY city, status;

Результат:

    city       | status  | order_count
    -----------|---------|------------
    Kyiv       | paid    | 2
    Kyiv       | pending | 1
    Vinnytsia  | paid    | 1
    Vinnytsia  | pending | 1

Тут група визначається комбінацією:

    city + status

Тобто:

    (Kyiv, paid)
    (Kyiv, pending)
    (Vinnytsia, paid)
    (Vinnytsia, pending)

---

# 11. GROUP BY за трьома колонками

Те саме правило працює для будь-якої кількості колонок.

    SELECT
        city,
        status,
        payment_method,
        COUNT(*) AS order_count
    FROM orders
    GROUP BY city, status, payment_method;

Група визначається унікальною комбінацією:

    city + status + payment_method

---

# 12. GROUP BY та WHERE

`WHERE` фільтрує **рядки ДО групування**.

Наприклад:

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    WHERE price > 1000
    GROUP BY category;

Послідовність:

    1. FROM products
    2. WHERE price > 1000
    3. GROUP BY category
    4. COUNT(*) для кожної групи

Тобто спочатку PostgreSQL відкидає дешеві товари, а вже потім створює групи.

---

# 13. WHERE + GROUP BY

Наприклад, хочемо отримати статистику тільки для товарів дорожче 1000:

    SELECT
        category,
        COUNT(*) AS product_count,
        ROUND(AVG(price), 2) AS average_price
    FROM products
    WHERE price > 1000
    GROUP BY category;

`WHERE` відповідає на питання:

> Які рядки повинні потрапити до групування?

---

# 14. Що таке HAVING

`HAVING` фільтрує **групи після агрегування**.

Це одна з найважливіших відмінностей:

    WHERE  → фільтрує рядки
    HAVING → фільтрує групи

---

# 15. Простий приклад HAVING

Припустимо:

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category;

Отримали:

    category    | product_count
    ------------|--------------
    tech        | 3
    furniture   | 2

Тепер хочемо залишити тільки категорії, де більше 2 товарів.

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    HAVING COUNT(*) > 2;

Результат:

    category | product_count
    ----------|-------------
    tech     | 3

`HAVING` працює з результатом агрегування.

---

# 16. WHERE vs HAVING

## WHERE

Фільтрує окремі рядки:

    SELECT *
    FROM products
    WHERE price > 1000;

---

## HAVING

Фільтрує групи:

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    HAVING COUNT(*) > 2;

---

## Головне правило

    WHERE  → до GROUP BY

    HAVING → після GROUP BY

Можна запам'ятати:

    WHERE  → rows
    HAVING → groups

---

# 17. WHERE і HAVING разом

Їх дуже часто використовують разом.

Наприклад:

> Знайти категорії, в яких більше 2 товарів дорожче 1000.

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    WHERE price > 1000
    GROUP BY category
    HAVING COUNT(*) > 2;

Логіка:

    FROM
       ↓
    WHERE price > 1000
       ↓
    GROUP BY category
       ↓
    COUNT(*)
       ↓
    HAVING COUNT(*) > 2
       ↓
    результат

---

# 18. HAVING з SUM

Наприклад, знайти категорії, де загальна вартість товарів більша за 20000:

    SELECT
        category,
        SUM(price) AS total_price
    FROM products
    GROUP BY category
    HAVING SUM(price) > 20000;

---

# 19. HAVING з AVG

Знайти категорії, де середня ціна більша за 5000:

    SELECT
        category,
        ROUND(AVG(price), 2) AS average_price
    FROM products
    GROUP BY category
    HAVING AVG(price) > 5000;

---

# 20. HAVING з MIN / MAX

Наприклад, залишити категорії, де максимальна ціна перевищує 20000:

    SELECT
        category,
        MAX(price) AS max_price
    FROM products
    GROUP BY category
    HAVING MAX(price) > 20000;

---

# 21. HAVING може містити декілька умов

    SELECT
        category,
        COUNT(*) AS product_count,
        AVG(price) AS average_price
    FROM products
    GROUP BY category
    HAVING COUNT(*) >= 3
       AND AVG(price) > 1000;

---

# 22. HAVING та OR

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    HAVING COUNT(*) > 10
        OR COUNT(*) = 1;

---

# 23. HAVING без GROUP BY

Технічно `HAVING` можна використовувати і без явного `GROUP BY`.

У такому випадку всі рядки розглядаються як одна група.

    SELECT COUNT(*) AS product_count
    FROM products
    HAVING COUNT(*) > 10;

Якщо товарів більше 10 — отримаємо один рядок.

Якщо ні — результат буде порожнім.

Це корисний, але менш поширений варіант.

---

# 24. GROUP BY та NULL

`NULL` також бере участь у формуванні груп.

Наприклад:

    category
    --------
    tech
    tech
    furniture
    NULL
    NULL

Запит:

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category;

Отримаємо окрему групу для `NULL`:

    category    | product_count
    ------------|--------------
    tech        | 2
    furniture   | 1
    NULL        | 2

Важливо:

> У `GROUP BY` всі `NULL` значення потрапляють до однієї групи.

---

# 25. GROUP BY + COUNT(*) + NULL

`COUNT(*)` рахує всі рядки групи.

Наприклад:

    SELECT
        category,
        COUNT(*) AS rows_count
    FROM products
    GROUP BY category;

Якщо група має 5 рядків — `COUNT(*)` дасть 5, незалежно від `NULL` у інших колонках.

---

# 26. GROUP BY + COUNT(column)

`COUNT(column)` рахує тільки **не-NULL значення**.

Наприклад:

    SELECT
        category,
        COUNT(rating) AS rated_products
    FROM products
    GROUP BY category;

Якщо в категорії 5 товарів, але тільки 3 мають `rating`, результат:

    rated_products = 3

---

# 27. COUNT(*) vs COUNT(column) у GROUP BY

Дуже важливе порівняння:

    SELECT
        category,
        COUNT(*) AS all_products,
        COUNT(rating) AS rated_products
    FROM products
    GROUP BY category;

Наприклад:

    category | all_products | rated_products
    ---------|--------------|---------------
    tech     | 10           | 8
    furniture| 6            | 4

Тобто:

    COUNT(*)       → всі рядки
    COUNT(column)  → тільки рядки, де column IS NOT NULL

---

# 28. COUNT(DISTINCT ...) + GROUP BY

Можна рахувати унікальні значення всередині кожної групи.

Припустимо:

    orders

    id | category | customer_id
    ---|----------|------------
    1  | tech     | 10
    2  | tech     | 10
    3  | tech     | 20
    4  | furniture| 10
    5  | furniture| 30

Запит:

    SELECT
        category,
        COUNT(DISTINCT customer_id) AS unique_customers
    FROM orders
    GROUP BY category;

Результат:

    category   | unique_customers
    -----------|-----------------
    tech       | 2
    furniture  | 2

---

# 29. GROUP BY + ORDER BY

Результати групування можна сортувати.

Наприклад:

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    ORDER BY product_count DESC;

Отримаємо категорії від найбільшої до найменшої.

---

# 30. ORDER BY агрегатним значенням

Можна сортувати без alias:

    SELECT
        category,
        COUNT(*)
    FROM products
    GROUP BY category
    ORDER BY COUNT(*) DESC;

Або краще для читабельності:

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    ORDER BY product_count DESC;

---

# 31. GROUP BY + ORDER BY + LIMIT

Наприклад:

> Показати 5 категорій з найбільшою кількістю товарів.

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    ORDER BY product_count DESC
    LIMIT 5;

Це вже типовий backend-запит для статистики.

---

# 32. GROUP BY + HAVING + ORDER BY

Наприклад:

> Показати категорії, де щонайменше 5 товарів, починаючи з найбільшої категорії.

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    HAVING COUNT(*) >= 5
    ORDER BY product_count DESC;

---

# 33. Логічний порядок виконання

Для розуміння SQL дуже корисно уявляти приблизний логічний порядок:

    FROM
      ↓
    WHERE
      ↓
    GROUP BY
      ↓
    HAVING
      ↓
    SELECT
      ↓
    ORDER BY
      ↓
    LIMIT

Наприклад:

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    WHERE price > 1000
    GROUP BY category
    HAVING COUNT(*) >= 3
    ORDER BY product_count DESC
    LIMIT 5;

Логічно:

    1. FROM
       взяти products

    2. WHERE
       залишити price > 1000

    3. GROUP BY
       створити групи category

    4. HAVING
       залишити групи з COUNT(*) >= 3

    5. SELECT
       сформувати category + count

    6. ORDER BY
       відсортувати

    7. LIMIT
       залишити перші 5

---

# 34. WHERE не замінює HAVING

Неправильно:

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    WHERE COUNT(*) > 5;

`WHERE` не призначений для фільтрації агрегованого результату.

Правильно:

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    HAVING COUNT(*) > 5;

---

# 35. WHERE не може безпосередньо використовувати агрегат

Неправильно:

    SELECT category, COUNT(*)
    FROM products
    WHERE COUNT(*) > 5
    GROUP BY category;

Правильно:

    SELECT category, COUNT(*)
    FROM products
    GROUP BY category
    HAVING COUNT(*) > 5;

Запам'ятай:

    WHERE COUNT(...)  ❌

    HAVING COUNT(...) ✅

---

# 36. HAVING не завжди замінює WHERE

Можна технічно перенести деякі умови в `HAVING`, але це не означає, що так потрібно робити.

Наприклад:

    SELECT
        category,
        COUNT(*)
    FROM products
    WHERE price > 1000
    GROUP BY category;

Краще, ніж:

    SELECT
        category,
        COUNT(*)
    FROM products
    GROUP BY category
    HAVING MIN(price) > 1000;

Це різні умови та різна логіка.

Правило:

    WHERE → фільтруй рядки якомога раніше

    HAVING → фільтруй результуючі групи

---

# 37. Практична задача: статистика категорій

Запит:

    SELECT
        category,
        COUNT(*) AS product_count,
        ROUND(AVG(price), 2) AS average_price,
        MIN(price) AS min_price,
        MAX(price) AS max_price
    FROM products
    GROUP BY category
    ORDER BY product_count DESC;

Отримуємо для кожної категорії:

- кількість товарів;
- середню ціну;
- мінімальну ціну;
- максимальну ціну.

---

# 38. Практична задача: тільки великі категорії

> Показати категорії, в яких щонайменше 10 товарів.

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    HAVING COUNT(*) >= 10
    ORDER BY product_count DESC;

---

# 39. Практична задача: середня ціна

> Показати категорії із середньою ціною понад 5000.

    SELECT
        category,
        ROUND(AVG(price), 2) AS average_price
    FROM products
    GROUP BY category
    HAVING AVG(price) > 5000
    ORDER BY average_price DESC;

---

# 40. Практична задача: WHERE + HAVING

> Порахувати тільки товари дорожчі за 1000 та показати категорії, де таких товарів не менше 5.

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    WHERE price > 1000
    GROUP BY category
    HAVING COUNT(*) >= 5
    ORDER BY product_count DESC;

---

# 41. Практична задача: статистика замовлень

Припустимо:

    orders

    id
    customer_id
    status
    total_amount
    created_at

Порахувати замовлення за статусом:

    SELECT
        status,
        COUNT(*) AS order_count
    FROM orders
    GROUP BY status
    ORDER BY order_count DESC;

---

# 42. Загальна сума замовлень за статусом

    SELECT
        status,
        SUM(total_amount) AS total_amount
    FROM orders
    GROUP BY status;

---

# 43. Середнє замовлення за статусом

    SELECT
        status,
        ROUND(AVG(total_amount), 2) AS average_amount
    FROM orders
    GROUP BY status;

---

# 44. Статистика за містом

Припустимо:

    users

    id
    name
    city
    age

Кількість користувачів у кожному місті:

    SELECT
        city,
        COUNT(*) AS user_count
    FROM users
    GROUP BY city
    ORDER BY user_count DESC;

---

# 45. Середній вік за містом

    SELECT
        city,
        ROUND(AVG(age), 1) AS average_age
    FROM users
    GROUP BY city;

---

# 46. Міста з великою кількістю користувачів

    SELECT
        city,
        COUNT(*) AS user_count
    FROM users
    GROUP BY city
    HAVING COUNT(*) >= 100
    ORDER BY user_count DESC;

---

# 47. GROUP BY з CASE

`GROUP BY` можна комбінувати з `CASE`.

Наприклад, розділити користувачів на вікові групи:

    SELECT
        CASE
            WHEN age < 18 THEN 'under_18'
            WHEN age < 30 THEN '18_29'
            WHEN age < 50 THEN '30_49'
            ELSE '50_plus'
        END AS age_group,
        COUNT(*) AS user_count
    FROM users
    GROUP BY
        CASE
            WHEN age < 18 THEN 'under_18'
            WHEN age < 30 THEN '18_29'
            WHEN age < 50 THEN '30_49'
            ELSE '50_plus'
        END;

Це вже більш практичний рівень SQL.

---

# 48. GROUP BY з датами

Можна групувати записи за датою.

Наприклад, замовлення за день:

    SELECT
        created_at::date AS order_date,
        COUNT(*) AS order_count
    FROM orders
    GROUP BY created_at::date
    ORDER BY order_date;

Тут:

    created_at::date

перетворює timestamp на дату.

---

# 49. GROUP BY за місяцем

Для статистики за місяцями часто використовують `DATE_TRUNC`.

    SELECT
        DATE_TRUNC('month', created_at) AS month,
        COUNT(*) AS order_count
    FROM orders
    GROUP BY DATE_TRUNC('month', created_at)
    ORDER BY month;

Логіка:

    timestamp
        ↓
    DATE_TRUNC('month', ...)
        ↓
    одна група на місяць

---

# 50. GROUP BY + DATE_TRUNC + SUM

Наприклад:

> Загальна сума замовлень за кожен місяць.

    SELECT
        DATE_TRUNC('month', created_at) AS month,
        SUM(total_amount) AS total_amount
    FROM orders
    GROUP BY DATE_TRUNC('month', created_at)
    ORDER BY month;

Це дуже типовий запит для dashboard / admin panel / analytics.

---

# 51. FILTER у GROUP BY-запитах

PostgreSQL дозволяє застосовувати `FILTER` до окремого агрегату.

Наприклад:

    SELECT
        COUNT(*) AS total_orders,
        COUNT(*) FILTER (WHERE status = 'paid') AS paid_orders,
        COUNT(*) FILTER (WHERE status = 'pending') AS pending_orders,
        COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled_orders
    FROM orders;

Можна комбінувати з `GROUP BY`:

    SELECT
        customer_id,
        COUNT(*) AS total_orders,
        COUNT(*) FILTER (WHERE status = 'paid') AS paid_orders
    FROM orders
    GROUP BY customer_id;

Це дуже корисний прийом для backend та dashboard-запитів.

---

# 52. FILTER vs WHERE

`WHERE` впливає на **весь набір рядків**:

    SELECT
        COUNT(*)
    FROM orders
    WHERE status = 'paid';

Тут у запит взагалі не потрапляють інші статуси.

`FILTER` впливає тільки на конкретний агрегат:

    SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE status = 'paid') AS paid,
        COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled
    FROM orders;

Це дозволяє отримати кілька статистик одним запитом.

---

# 53. GROUP BY + DISTINCT

`GROUP BY` сам по собі створює унікальні групи.

Наприклад:

    SELECT category
    FROM products
    GROUP BY category;

У результаті буде одна строка на кожну категорію.

У простому випадку це схоже на:

    SELECT DISTINCT category
    FROM products;

Але мета різна.

`DISTINCT`:

    SELECT DISTINCT category
    FROM products;

→ отримати унікальні значення.

`GROUP BY`:

    SELECT category, COUNT(*)
    FROM products
    GROUP BY category;

→ отримати групи для подальшого агрегування.

---

# 54. GROUP BY та NULL в агрегатах

Потрібно розрізняти дві речі:

`GROUP BY` створює групу `NULL`.

А агрегатні функції часто ігнорують `NULL`.

Наприклад:

    SELECT
        category,
        COUNT(*) AS all_rows,
        COUNT(price) AS prices_count,
        AVG(price) AS average_price
    FROM products
    GROUP BY category;

Якщо в групі:

    price:
    100
    200
    NULL

то:

    COUNT(*)     = 3
    COUNT(price) = 2
    AVG(price)   = 150

---

# 55. COALESCE з агрегатами

Агрегати можуть повертати `NULL`.

Наприклад:

    SELECT
        category,
        SUM(price) AS total_price
    FROM products
    GROUP BY category;

Якщо всі `price` у групі `NULL`, `SUM(price)` буде `NULL`.

Можна використати:

    SELECT
        category,
        COALESCE(SUM(price), 0) AS total_price
    FROM products
    GROUP BY category;

Тепер замість `NULL` буде `0`.

---

# 56. GROUP BY та псевдоніми

Можна використовувати alias для результатів агрегування в `ORDER BY`:

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    ORDER BY product_count DESC;

Для `HAVING` краще не покладатися на alias із `SELECT`:

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    HAVING COUNT(*) > 5;

Такий запис є зрозумілим і стандартним.

---

# 57. Типова структура статистичного SQL-запиту

Дуже корисний шаблон:

    SELECT
        grouping_column,
        COUNT(*) AS count,
        SUM(value) AS total,
        AVG(value) AS average,
        MIN(value) AS minimum,
        MAX(value) AS maximum
    FROM table
    WHERE row_condition
    GROUP BY grouping_column
    HAVING aggregate_condition
    ORDER BY count DESC
    LIMIT 10;

Наприклад:

    SELECT
        category,
        COUNT(*) AS product_count,
        SUM(price) AS total_price,
        ROUND(AVG(price), 2) AS average_price
    FROM products
    WHERE price > 1000
    GROUP BY category
    HAVING COUNT(*) >= 3
    ORDER BY product_count DESC
    LIMIT 10;

---

# 58. Найважливіша схема для запам'ятовування

    FROM
      ↓
    WHERE
      ↓
    GROUP BY
      ↓
    агрегатні функції
      ↓
    HAVING
      ↓
    SELECT
      ↓
    ORDER BY
      ↓
    LIMIT

У спрощеному вигляді:

    WHERE  → які рядки?
    GROUP BY → які групи?
    aggregate → що порахувати?
    HAVING → які групи залишити?
    ORDER BY → як відсортувати?
    LIMIT → скільки показати?

---

# 59. GROUP BY — Junior рівень

Потрібно вміти без підказки:

- використовувати `GROUP BY`;
- рахувати `COUNT(*)` по групах;
- використовувати `SUM`;
- використовувати `AVG`;
- використовувати `MIN`;
- використовувати `MAX`;
- групувати за однією колонкою;
- групувати за декількома колонками;
- використовувати `WHERE` перед `GROUP BY`;
- використовувати `HAVING` після `GROUP BY`;
- сортувати агреговані результати;
- розуміти `COUNT(*)` vs `COUNT(column)`;
- розуміти `NULL` в агрегатах.

---

# 60. GROUP BY — Middle рівень

Варто вміти:

- `GROUP BY` + `CASE`;
- `GROUP BY` + дати;
- `DATE_TRUNC`;
- `GROUP BY` + `FILTER`;
- `COUNT(DISTINCT ...)`;
- складні умови в `HAVING`;
- декілька агрегатів в одному запиті;
- `WHERE` + `GROUP BY` + `HAVING`;
- статистику для dashboard;
- агрегування після `JOIN`;
- розуміти вплив кількості рядків після `JOIN` на `COUNT` та `SUM`.

---

# 61. GROUP BY — Advanced / Senior

На глибшому рівні потрібно розуміти:

- агрегування після складних `JOIN`;
- дублювання рядків через `JOIN`;
- `COUNT(DISTINCT ...)`;
- `FILTER`;
- статистичні агрегати;
- ordered-set aggregates;
- `ROLLUP`;
- `CUBE`;
- `GROUPING SETS`;
- виконання агрегатів у query plan;
- `HashAggregate`;
- `GroupAggregate`;
- вплив індексів і сортування;
- memory usage під час агрегації;
- `EXPLAIN ANALYZE` для агрегатних запитів.

---

# 62. Важлива проблема: GROUP BY після JOIN

Це особливо важливо для backend.

Припустимо:

    users
        ↓
    orders

Один користувач може мати багато замовлень.

Можемо отримати:

    SELECT
        u.id,
        u.name,
        COUNT(o.id) AS order_count
    FROM users AS u
    LEFT JOIN orders AS o
        ON o.customer_id = u.id
    GROUP BY u.id, u.name;

Результат:

    user → кількість його замовлень

Це один із найпоширеніших практичних сценаріїв `GROUP BY`.

---

# 63. GROUP BY після JOIN — головна небезпека

При `JOIN` кількість рядків може збільшитися.

Наприклад:

    user
      ↓
    5 orders

Після JOIN один користувач може з'явитися 5 разів.

Якщо додати ще одну таблицю:

    user
      ↓
    orders
      ↓
    order_items

кількість рядків може збільшитися ще сильніше.

Тому перед використанням:

    COUNT(*)
    SUM(...)
    AVG(...)

потрібно розуміти:

> Які саме рядки зараз агрегуються?

Це одна з найважливіших навичок SQL.

---

# 64. Приклад: кількість замовлень кожного користувача

    SELECT
        u.id,
        u.name,
        COUNT(o.id) AS order_count
    FROM users AS u
    LEFT JOIN orders AS o
        ON o.customer_id = u.id
    GROUP BY u.id, u.name
    ORDER BY order_count DESC;

Чому:

    COUNT(o.id)

а не:

    COUNT(*)?

Тому що `LEFT JOIN` залишає користувачів без замовлень.

Для такого користувача:

    o.id = NULL

і:

    COUNT(o.id) = 0

Це зазвичай саме те, що нам потрібно.

---

# 65. GROUP BY + JOIN + HAVING

> Показати користувачів, які зробили щонайменше 5 замовлень.

    SELECT
        u.id,
        u.name,
        COUNT(o.id) AS order_count
    FROM users AS u
    LEFT JOIN orders AS o
        ON o.customer_id = u.id
    GROUP BY u.id, u.name
    HAVING COUNT(o.id) >= 5
    ORDER BY order_count DESC;

Тут:

    JOIN
       ↓
    GROUP BY user
       ↓
    COUNT orders
       ↓
    HAVING >= 5

---

# 66. Часті помилки

## ❌ Помилка 1 — забутий GROUP BY

    SELECT category, COUNT(*)
    FROM products;

Якщо `category` не агрегується, потрібен:

    GROUP BY category

---

## ❌ Помилка 2 — агрегат у WHERE

    WHERE COUNT(*) > 5

Потрібно:

    HAVING COUNT(*) > 5

---

## ❌ Помилка 3 — колонка не входить у GROUP BY

    SELECT category, name, COUNT(*)
    FROM products
    GROUP BY category;

`name` не визначений на рівні групи.

---

## ❌ Помилка 4 — неправильне розуміння COUNT

    COUNT(*)

рахує рядки.

    COUNT(column)

рахує тільки non-NULL значення.

---

## ❌ Помилка 5 — неправильний результат після JOIN

Необхідно перевірити, скільки рядків утворює `JOIN` перед агрегуванням.

---

## ❌ Помилка 6 — забутий ORDER BY

Агреговані результати не слід вважати автоматично відсортованими.

Якщо потрібен певний порядок:

    ORDER BY ...

---

# 67. GROUP BY vs DISTINCT

### DISTINCT

    SELECT DISTINCT category
    FROM products;

Мета:

    отримати унікальні категорії

### GROUP BY

    SELECT
        category,
        COUNT(*)
    FROM products
    GROUP BY category;

Мета:

    створити групи
    +
    виконати агрегування

Спрощено:

    DISTINCT → унікальні значення

    GROUP BY → групи для обчислень

---

# 68. GROUP BY vs HAVING

`GROUP BY`:

    створює групи

`HAVING`:

    відбирає групи

Наприклад:

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    HAVING COUNT(*) > 5;

Логіка:

    category
       ↓
    GROUP BY
       ↓
    groups
       ↓
    COUNT
       ↓
    HAVING
       ↓
    selected groups

---

# 69. Практичні вправи

## Вправа 1

Порахуй кількість товарів у кожній категорії.

Очікувана структура:

    category | product_count

---

## Вправа 2

Порахуй середню ціну товарів у кожній категорії.

---

## Вправа 3

Знайди мінімальну та максимальну ціну в кожній категорії.

---

## Вправа 4

Порахуй загальну суму цін товарів у кожній категорії.

---

## Вправа 5

Покажи тільки категорії, в яких більше 5 товарів.

---

## Вправа 6

Покажи тільки категорії, де середня ціна більша за 1000.

---

## Вправа 7

Спочатку залиш товари дорожчі за 500, потім згрупуй їх за категоріями.

---

## Вправа 8

Знайди категорії, в яких після фільтрації:

    price > 500

залишилося щонайменше 3 товари.

---

## Вправа 9

Порахуй кількість унікальних клієнтів для кожного статусу замовлення.

Використай:

    COUNT(DISTINCT customer_id)

---

## Вправа 10

Порахуй кількість замовлень кожного користувача.

Використай:

    JOIN
    GROUP BY
    COUNT

---

## Вправа 11

Покажи тільки користувачів, які мають щонайменше 3 замовлення.

Використай:

    GROUP BY
    HAVING

---

## Вправа 12

Порахуй кількість замовлень за кожен місяць.

Використай:

    DATE_TRUNC('month', created_at)

---

# 70. Міні-практика: dashboard

Уявімо, що backend повинен повернути статистику магазину.

Потрібно отримати:

- кількість замовлень;
- кількість оплачених;
- кількість скасованих;
- загальну суму;
- середню суму замовлення.

Один із варіантів:

    SELECT
        COUNT(*) AS total_orders,
        COUNT(*) FILTER (
            WHERE status = 'paid'
        ) AS paid_orders,
        COUNT(*) FILTER (
            WHERE status = 'cancelled'
        ) AS cancelled_orders,
        COALESCE(SUM(total_amount), 0) AS total_amount,
        ROUND(AVG(total_amount), 2) AS average_amount
    FROM orders;

Це хороший приклад того, навіщо backend-розробнику потрібні агрегатні SQL-запити.

---

# 71. Міні-практика: статистика категорій

    SELECT
        category,
        COUNT(*) AS product_count,
        ROUND(AVG(price), 2) AS average_price,
        MIN(price) AS min_price,
        MAX(price) AS max_price
    FROM products
    GROUP BY category
    ORDER BY product_count DESC;

Результат можна безпосередньо передати frontend як дані для таблиці або dashboard.

---

# 72. Міні-практика: активні клієнти

> Знайти клієнтів, які зробили не менше 5 замовлень.

    SELECT
        customer_id,
        COUNT(*) AS order_count,
        SUM(total_amount) AS total_spent
    FROM orders
    GROUP BY customer_id
    HAVING COUNT(*) >= 5
    ORDER BY total_spent DESC;

Тут одночасно використовуються:

    GROUP BY
    COUNT
    SUM
    HAVING
    ORDER BY

---

# 73. Міні-практика: клієнти з великою сумою покупок

> Знайти клієнтів, які витратили більше 10000.

    SELECT
        customer_id,
        SUM(total_amount) AS total_spent
    FROM orders
    GROUP BY customer_id
    HAVING SUM(total_amount) > 10000
    ORDER BY total_spent DESC;

---

# 74. Міні-практика: статистика за статусами

    SELECT
        status,
        COUNT(*) AS order_count,
        SUM(total_amount) AS total_amount,
        ROUND(AVG(total_amount), 2) AS average_amount
    FROM orders
    GROUP BY status
    ORDER BY order_count DESC;

Це типовий запит для:

- admin panel;
- dashboard;
- reports;
- API endpoint;
- статистики магазину.

---

# 75. Що треба знати напам'ять

    GROUP BY column

    → створює групи.

    COUNT(*)

    → кількість рядків.

    COUNT(column)

    → кількість non-NULL значень.

    COUNT(DISTINCT column)

    → кількість унікальних non-NULL значень.

    SUM(column)

    → сума.

    AVG(column)

    → середнє.

    MIN(column)

    → мінімум.

    MAX(column)

    → максимум.

    WHERE condition

    → фільтрація рядків.

    HAVING condition

    → фільтрація груп.

    ORDER BY aggregate_result

    → сортування агрегованих результатів.

---

# 76. Головна різниця в одному прикладі

Без групування:

    SELECT COUNT(*)
    FROM products;

Отримуємо:

    1 результат

З групуванням:

    SELECT
        category,
        COUNT(*)
    FROM products
    GROUP BY category;

Отримуємо:

    1 результат на кожну category

З фільтрацією груп:

    SELECT
        category,
        COUNT(*)
    FROM products
    GROUP BY category
    HAVING COUNT(*) > 5;

Отримуємо:

    тільки групи,
    які відповідають умові

---

# 77. Шпаргалка

## GROUP BY

    SELECT grouping_column, COUNT(*)
    FROM table
    GROUP BY grouping_column;

## Кілька колонок

    SELECT column1, column2, COUNT(*)
    FROM table
    GROUP BY column1, column2;

## WHERE + GROUP BY

    SELECT category, COUNT(*)
    FROM products
    WHERE price > 1000
    GROUP BY category;

## GROUP BY + HAVING

    SELECT category, COUNT(*)
    FROM products
    GROUP BY category
    HAVING COUNT(*) > 5;

## WHERE + GROUP BY + HAVING

    SELECT category, COUNT(*)
    FROM products
    WHERE price > 1000
    GROUP BY category
    HAVING COUNT(*) >= 5;

## GROUP BY + SUM

    SELECT category, SUM(price)
    FROM products
    GROUP BY category;

## GROUP BY + AVG

    SELECT category, AVG(price)
    FROM products
    GROUP BY category;

## GROUP BY + MIN + MAX

    SELECT
        category,
        MIN(price),
        MAX(price)
    FROM products
    GROUP BY category;

## GROUP BY + DISTINCT

    SELECT
        category,
        COUNT(DISTINCT customer_id)
    FROM orders
    GROUP BY category;

## GROUP BY + ORDER BY

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    ORDER BY product_count DESC;

## GROUP BY + LIMIT

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    ORDER BY product_count DESC
    LIMIT 5;

---

# 78. Шаблон для запам'ятовування

    SELECT
        group_column,
        COUNT(*) AS count,
        SUM(value) AS total,
        AVG(value) AS average,
        MIN(value) AS minimum,
        MAX(value) AS maximum
    FROM table
    WHERE row_condition
    GROUP BY group_column
    HAVING COUNT(*) > 1
    ORDER BY count DESC
    LIMIT 10;

Не потрібно використовувати всі частини одночасно.

Важливо розуміти роль кожної:

    FROM      → звідки беремо дані

    WHERE     → які рядки беремо

    GROUP BY  → як створюємо групи

    COUNT/SUM/AVG...
              → що рахуємо

    HAVING    → які групи залишаємо

    ORDER BY  → як сортуємо

    LIMIT     → скільки повертаємо

---

# 79. Питання для самоперевірки

### Базові

1. Що робить `GROUP BY`?
2. Чим `GROUP BY` відрізняється від `DISTINCT`?
3. Що відбувається з рядками після `GROUP BY`?
4. Що робить `COUNT(*)` у групі?
5. Що робить `COUNT(column)` у групі?
6. Як `NULL` впливає на `COUNT(column)`?
7. Як `NULL` поводиться у `GROUP BY`?
8. Чи можна групувати за декількома колонками?

### HAVING

9. Для чого потрібен `HAVING`?
10. Чим `HAVING` відрізняється від `WHERE`?
11. Чому `COUNT(*) > 5` не можна використовувати у `WHERE`?
12. Чи можна використовувати `HAVING` без `GROUP BY`?

### Практичні

13. Як знайти кількість товарів у кожній категорії?
14. Як знайти середню ціну кожної категорії?
15. Як знайти категорії з більш ніж 10 товарами?
16. Як знайти клієнтів, які зробили більше 5 замовлень?
17. Як порахувати унікальних клієнтів?
18. Як отримати статистику замовлень по місяцях?
19. Як використати `GROUP BY` після `JOIN`?
20. Чому `JOIN` може спотворити `COUNT` або `SUM`?

---

# 80. Найважливіша концепція цього розділу

Не сприймай `GROUP BY` просто як SQL-команду.

Сприймай його як зміну **рівня даних**.

До `GROUP BY`:

    row
    row
    row
    row
    row
    ...

Після:

    group
    group
    group
    ...

Агрегат:

    COUNT
    SUM
    AVG
    MIN
    MAX

працює вже **в межах кожної групи**.

Тому:

    GROUP BY + aggregate

є фундаментом для:

- статистики;
- звітів;
- dashboard;
- admin panels;
- API statistics;
- sales reports;
- analytics;
- ranking;
- summaries.

---

# 81. Коротко: WHERE vs GROUP BY vs HAVING

    WHERE
    ↓
    фільтрує РЯДКИ

    GROUP BY
    ↓
    створює ГРУПИ

    COUNT / SUM / AVG / MIN / MAX
    ↓
    обчислює значення ДЛЯ ГРУП

    HAVING
    ↓
    фільтрує ГРУПИ

    ORDER BY
    ↓
    сортує РЕЗУЛЬТАТ

Цю схему варто знати дуже добре.

---

# 82. Зв'язок з наступними темами

Після `GROUP BY` та `HAVING` природно переходити до складніших SQL-конструкцій:

    12-joins
        ↓
    агрегування після JOIN
        ↓
    13-subqueries
        ↓
    складні агрегатні запити
        ↓
    14-constraints
        ↓
    15-indexes
        ↓
    25-performance-and-explain
        ↓
    оптимізація GROUP BY / JOIN / aggregate queries

Особливо важливо буде побачити, як:

    JOIN + GROUP BY + HAVING

разом використовуються у реальному backend.

---

# 🎯 Підсумок

Після цього розділу потрібно чітко розрізняти:

    COUNT(*) 
        → скільки рядків?

    SUM(...)
        → яка загальна сума?

    AVG(...)
        → яке середнє?

    MIN(...)
        → мінімальне значення?

    MAX(...)
        → максимальне значення?

    GROUP BY
        → по яких групах рахувати?

    WHERE
        → які рядки допустити до групування?

    HAVING
        → які групи залишити після агрегування?

    ORDER BY
        → як відсортувати результат?

Головна формула:

    WHERE
       ↓
    GROUP BY
       ↓
    AGGREGATE
       ↓
    HAVING
       ↓
    ORDER BY

Якщо ця схема стала зрозумілою, ти вже переходиш від простого `SELECT` до **реального SQL для backend та статистики**.
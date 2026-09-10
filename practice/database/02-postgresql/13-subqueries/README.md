# 13 — Subqueries у PostgreSQL

## 📌 Мета

Навчитися використовувати один SQL-запит всередині іншого SQL-запиту.

Після цього розділу ти повинен розуміти:

- що таке `subquery`;
- де може знаходитися підзапит;
- підзапити в `WHERE`;
- підзапити в `FROM`;
- підзапити в `SELECT`;
- `IN`;
- `NOT IN`;
- `EXISTS`;
- `NOT EXISTS`;
- `ANY`;
- `ALL`;
- scalar subquery;
- correlated subquery;
- різницю між correlated та non-correlated subquery;
- підзапити з агрегатними функціями;
- підзапити з `GROUP BY`;
- підзапити з `JOIN`;
- коли краще використовувати `JOIN`, а коли subquery;
- типові помилки з `NULL`;
- як перетворювати складний subquery у `JOIN`;
- як використовувати CTE як наступний крок після subqueries.

---

# 1. Що таке Subquery

`Subquery` — це SQL-запит, вкладений всередину іншого SQL-запиту.

Інша назва:

    subquery
    =
    підзапит
    =
    nested query

Наприклад:

    SELECT *
    FROM products
    WHERE price > (
        SELECT AVG(price)
        FROM products
    );

Тут:

    SELECT AVG(price)
    FROM products

є підзапитом.

Його результат використовується основним запитом.

---

# 2. Основна ідея

Можна мислити так:

    subquery
       ↓
    отримуємо проміжний результат
       ↓
    main query
       ↓
    використовує цей результат

Наприклад:

    Середня ціна
         ↓
    5000
         ↓
    знайти товари
    price > 5000

---

# 3. Найпростіший приклад

> Знайти товари, дорожчі за середню ціну.

Спочатку окремо:

    SELECT AVG(price)
    FROM products;

Припустимо, результат:

    4250

Тепер:

    SELECT *
    FROM products
    WHERE price > 4250;

Але замість ручної підстановки можна зробити:

    SELECT *
    FROM products
    WHERE price > (
        SELECT AVG(price)
        FROM products
    );

Це і є subquery.

---

# 4. Загальна структура

    SELECT ...
    FROM ...
    WHERE column OPERATOR (
        SELECT ...
    );

Наприклад:

    SELECT *
    FROM products
    WHERE price > (
        SELECT AVG(price)
        FROM products
    );

---

# 5. Subquery у WHERE

Це найпоширеніший варіант.

Наприклад:

> Знайти користувачів, які мають хоча б одне замовлення.

Можна використати:

    SELECT *
    FROM users
    WHERE id IN (
        SELECT customer_id
        FROM orders
    );

Логіка:

    subquery
        ↓
    отримати customer_id
        ↓
    main query
        ↓
    знайти users з цими id

---

# 6. IN

`IN` перевіряє, чи входить значення до набору значень.

Наприклад:

    SELECT *
    FROM users
    WHERE id IN (
        SELECT customer_id
        FROM orders
    );

Якщо subquery повернув:

    1
    3
    7

це приблизно означає:

    WHERE id IN (1, 3, 7)

---

# 7. NOT IN

`NOT IN` вибирає значення, яких немає в результаті підзапиту.

Наприклад:

> Знайти користувачів, які не мають замовлень.

    SELECT *
    FROM users
    WHERE id NOT IN (
        SELECT customer_id
        FROM orders
    );

Але тут є важлива проблема з `NULL`.

---

# 8. ⚠️ NOT IN та NULL

Якщо subquery повертає:

    1
    3
    NULL

то:

    NOT IN

може дати несподіваний результат через тризначну логіку SQL:

    TRUE
    FALSE
    UNKNOWN

Тому для перевірки:

> немає пов'язаного запису

часто безпечніше використовувати:

    NOT EXISTS

або:

    LEFT JOIN ... IS NULL

---

# 9. EXISTS

`EXISTS` перевіряє, чи існує хоча б один рядок, який повертає підзапит.

Наприклад:

    SELECT *
    FROM users AS u
    WHERE EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

Логіка:

    для кожного user
        ↓
    перевірити orders
        ↓
    чи існує хоча б один?
        ↓
    YES → залишити user
    NO  → не залишати

---

# 10. Чому SELECT 1 у EXISTS

У:

    EXISTS (
        SELECT 1
        FROM orders
        WHERE ...
    )

число `1` не має особливого значення.

`EXISTS` перевіряє сам факт існування рядка.

Тому можна написати:

    EXISTS (
        SELECT *
        FROM orders
        WHERE ...
    )

але:

    SELECT 1

є звичним і добре показує намір:

> Мене не цікавлять дані рядка. Мене цікавить тільки факт його існування.

---

# 11. NOT EXISTS

`NOT EXISTS` перевіряє:

> чи не існує жодного відповідного рядка.

Наприклад:

    SELECT *
    FROM users AS u
    WHERE NOT EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

Це дуже хороший патерн для:

    знайти A без B

Наприклад:

    users без orders

---

# 12. EXISTS vs IN

Обидва можуть вирішувати подібні задачі.

`IN`:

    SELECT *
    FROM users
    WHERE id IN (
        SELECT customer_id
        FROM orders
    );

`EXISTS`:

    SELECT *
    FROM users AS u
    WHERE EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

У простих випадках вони можуть давати однаковий результат.

Але концептуально:

    IN
    → чи входить значення до набору?

    EXISTS
    → чи існує хоча б один відповідний рядок?

---

# 13. EXISTS особливо корисний для пов'язаних перевірок

Наприклад:

> Знайти користувачів, які мають хоча б одне оплачене замовлення.

    SELECT *
    FROM users AS u
    WHERE EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
          AND o.status = 'paid'
    );

Це читається майже як звичайна мова:

    вибрати users
    де існує order
    для цього user
    зі статусом paid

---

# 14. NOT EXISTS — дуже важливий патерн

> Знайти користувачів, які не мають жодного оплаченого замовлення.

    SELECT *
    FROM users AS u
    WHERE NOT EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
          AND o.status = 'paid'
    );

---

# 15. Scalar Subquery

`Scalar subquery` повертає:

    одне значення
    =
    один рядок
    +
    одна колонка

Наприклад:

    SELECT AVG(price)
    FROM products;

повертає одне значення.

Тому його можна використати:

    SELECT *
    FROM products
    WHERE price > (
        SELECT AVG(price)
        FROM products
    );

---

# 16. Scalar subquery повинен повернути одне значення

Правильно:

    SELECT *
    FROM products
    WHERE price > (
        SELECT AVG(price)
        FROM products
    );

`AVG` повертає одне значення.

Неправильно, якщо subquery повертає багато рядків:

    SELECT *
    FROM products
    WHERE price > (
        SELECT price
        FROM products
    );

PostgreSQL повідомить про помилку на кшталт:

    more than one row returned by a subquery used as an expression

---

# 17. Subquery у SELECT

Підзапит може бути частиною `SELECT`.

Наприклад:

    SELECT
        name,
        price,
        (
            SELECT AVG(price)
            FROM products
        ) AS average_price
    FROM products;

Результат може виглядати:

    name       | price | average_price
    -----------|-------|--------------
    Laptop     | 30000 | 8500
    Mouse      | 1000  | 8500
    Keyboard   | 2500  | 8500

Тобто кожен рядок отримує загальне середнє значення.

---

# 18. Subquery у SELECT — обережно

Це може бути зручно для простих scalar subquery.

Але якщо підзапит залежить від кожного рядка зовнішнього запиту, це вже може бути:

    correlated subquery

і потенційно бути дорожчим.

У таких випадках часто варто розглянути:

    JOIN
    або
    window function

Window functions будуть окремою темою.

---

# 19. Subquery у FROM

Підзапит можна використовувати як тимчасову таблицю.

Наприклад:

    SELECT *
    FROM (
        SELECT
            category,
            AVG(price) AS average_price
        FROM products
        GROUP BY category
    ) AS category_stats;

Тут:

    (
        SELECT ...
    )

створює проміжний результат.

А зовнішній запит працює з ним як з таблицею.

---

# 20. Alias для subquery у FROM

У PostgreSQL derived table повинен мати alias.

Правильно:

    SELECT *
    FROM (
        SELECT
            category,
            AVG(price) AS average_price
        FROM products
        GROUP BY category
    ) AS category_stats;

Alias:

    category_stats

---

# 21. Subquery у FROM — практичний приклад

> Знайти категорії, середня ціна яких більша за 5000.

Спочатку:

    SELECT
        category,
        AVG(price) AS average_price
    FROM products
    GROUP BY category;

Це дає проміжну таблицю:

    category | average_price

Потім:

    SELECT *
    FROM (
        SELECT
            category,
            AVG(price) AS average_price
        FROM products
        GROUP BY category
    ) AS category_stats
    WHERE average_price > 5000;

Логіка:

    products
       ↓
    GROUP BY category
       ↓
    average_price
       ↓
    category_stats
       ↓
    WHERE average_price > 5000

---

# 22. Non-correlated subquery

Підзапит, який не залежить від зовнішнього запиту.

Наприклад:

    SELECT *
    FROM products
    WHERE price > (
        SELECT AVG(price)
        FROM products
    );

Підзапит:

    SELECT AVG(price)
    FROM products

не використовує дані конкретного рядка зовнішнього запиту.

Це:

    non-correlated subquery

---

# 23. Correlated subquery

`Correlated subquery` використовує значення із зовнішнього запиту.

Наприклад:

    SELECT *
    FROM users AS u
    WHERE EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

Всередині subquery використовується:

    u.id

який належить зовнішньому запиту.

Тому цей subquery:

    correlated

---

# 24. Як мислити про correlated subquery

Уяви:

    для кожного user
        ↓
    запустити логічну перевірку
        ↓
    чи є order цього user?

Тобто:

    user 1 → перевірка orders
    user 2 → перевірка orders
    user 3 → перевірка orders
    ...

Це концептуальна модель.

Оптимізатор PostgreSQL не обов'язково буквально виконує запит окремо для кожного рядка.

---

# 25. Приклад correlated subquery з COUNT

> Знайти користувачів, які мають більше 5 замовлень.

Можна написати:

    SELECT
        u.id,
        u.name
    FROM users AS u
    WHERE (
        SELECT COUNT(*)
        FROM orders AS o
        WHERE o.customer_id = u.id
    ) > 5;

Підзапит використовує:

    u.id

з зовнішнього запиту.

---

# 26. Той самий запит через JOIN

Замість correlated subquery можна використати:

    SELECT
        u.id,
        u.name
    FROM users AS u
    JOIN orders AS o
        ON o.customer_id = u.id
    GROUP BY u.id, u.name
    HAVING COUNT(o.id) > 5;

Обидва підходи можуть вирішити ту саму задачу.

---

# 27. Subquery vs JOIN

Не існує простого правила:

    JOIN завжди краще
    або
    subquery завжди краще

Потрібно дивитися на:

- логіку;
- читабельність;
- кількість даних;
- query plan;
- індекси;
- тип операції.

У багатьох випадках PostgreSQL може оптимізувати різні форми запиту до подібного плану.

Тому:

> Не оптимізуй SQL тільки за зовнішнім виглядом. Перевіряй `EXPLAIN ANALYZE`.

---

# 28. IN + subquery

Типовий патерн:

    SELECT *
    FROM users
    WHERE id IN (
        SELECT customer_id
        FROM orders
        WHERE status = 'paid'
    );

Логіка:

    orders
       ↓
    customer_id
       ↓
    users
       ↓
    matching users

---

# 29. NOT EXISTS + subquery

Пошук записів без відповідності:

    SELECT *
    FROM users AS u
    WHERE NOT EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

Це один із найкорисніших патернів SQL.

---

# 30. ANY

`ANY` порівнює значення з результатами підзапиту.

Наприклад:

    SELECT *
    FROM products
    WHERE price > ANY (
        SELECT price
        FROM products
        WHERE category = 'tech'
    );

Це означає:

> price більший хоча б за одне значення з набору.

Концептуально:

    price > ANY(values)

означає:

    price > хоча б одне значення

---

# 31. ALL

`ALL` означає:

> умова повинна виконуватися для всіх значень.

Наприклад:

    SELECT *
    FROM products
    WHERE price > ALL (
        SELECT price
        FROM products
        WHERE category = 'tech'
    );

Це означає:

> price більший за кожну ціну з tech.

Тобто фактично:

    price > MAX(tech prices)

для такого типу порівняння.

---

# 32. ANY vs ALL

Запам'ятай:

    ANY
    → достатньо одного

    ALL
    → потрібно для всіх

Наприклад:

    price > ANY (...)

    → більший хоча б за одне значення

    price > ALL (...)

    → більший за всі значення

---

# 33. Subquery + aggregate

Один із найтиповіших сценаріїв:

    SELECT *
    FROM products
    WHERE price > (
        SELECT AVG(price)
        FROM products
    );

Інші агрегати:

    MAX
    MIN
    SUM
    COUNT
    AVG

---

# 34. Товар із максимальною ціною

Можна написати:

    SELECT *
    FROM products
    WHERE price = (
        SELECT MAX(price)
        FROM products
    );

Якщо декілька товарів мають однакову максимальну ціну, запит поверне всі такі товари.

Це важлива властивість.

---

# 35. Товар із мінімальною ціною

    SELECT *
    FROM products
    WHERE price = (
        SELECT MIN(price)
        FROM products
    );

---

# 36. Товари дорожчі за середню ціну

    SELECT
        id,
        name,
        price
    FROM products
    WHERE price > (
        SELECT AVG(price)
        FROM products
    )
    ORDER BY price DESC;

---

# 37. Користувачі з кількістю замовлень вище середньої

Спочатку логіка:

    кількість orders для кожного user
        ↓
    середня кількість orders
        ↓
    знайти users вище середнього

Це вже складніший сценарій.

Один із варіантів:

    SELECT
        u.id,
        u.name
    FROM users AS u
    WHERE (
        SELECT COUNT(*)
        FROM orders AS o
        WHERE o.customer_id = u.id
    ) > (
        SELECT AVG(order_count)
        FROM (
            SELECT
                customer_id,
                COUNT(*) AS order_count
            FROM orders
            GROUP BY customer_id
        ) AS customer_orders
    );

Це приклад вкладених subqueries.

---

# 38. Nested subquery

`Nested subquery` — subquery всередині іншого subquery.

Наприклад:

    SELECT ...
    FROM ...
    WHERE x > (
        SELECT AVG(value)
        FROM (
            SELECT ...
        ) AS stats
    );

Тут є декілька рівнів:

    main query
        ↓
    subquery
        ↓
    subquery

Не потрібно зловживати такою структурою.

Якщо запит стає важким для читання, часто кращим рішенням буде:

    CTE

---

# 39. Subquery + GROUP BY

Наприклад:

> Знайти категорії, де кількість товарів більша за 10.

    SELECT *
    FROM (
        SELECT
            category,
            COUNT(*) AS product_count
        FROM products
        GROUP BY category
    ) AS category_stats
    WHERE product_count > 10;

Або, якщо не потрібен зовнішній рівень:

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    HAVING COUNT(*) > 10;

Тут `HAVING` є простішим рішенням.

---

# 40. HAVING vs subquery

Наприклад:

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    HAVING COUNT(*) > 10;

Часто це простіше, ніж:

    SELECT *
    FROM (
        SELECT
            category,
            COUNT(*) AS product_count
        FROM products
        GROUP BY category
    ) AS stats
    WHERE product_count > 10;

Обидва варіанти можливі.

Але якщо фільтрація стосується безпосередньо агрегату, `HAVING` часто читається краще.

---

# 41. Subquery + DISTINCT

Наприклад:

> Знайти users, які робили замовлення.

    SELECT *
    FROM users
    WHERE id IN (
        SELECT DISTINCT customer_id
        FROM orders
    );

Але `DISTINCT` тут часто не потрібен.

Для:

    IN

дублікати в результаті subquery не змінюють логіку.

Тому можна:

    SELECT *
    FROM users
    WHERE id IN (
        SELECT customer_id
        FROM orders
    );

---

# 42. EXISTS та дублікати

`EXISTS` особливо зручний тим, що нас не цікавить кількість відповідних рядків.

Наприклад:

    SELECT *
    FROM users AS u
    WHERE EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

Навіть якщо user має:

    1 order

або:

    100 orders

результат для цього user однаковий:

    user exists → TRUE

---

# 43. EXISTS vs JOIN

Наприклад:

    SELECT DISTINCT u.*
    FROM users AS u
    JOIN orders AS o
        ON o.customer_id = u.id;

можна концептуально замінити:

    SELECT *
    FROM users AS u
    WHERE EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

Якщо нам потрібно лише відповісти:

> Чи має user хоча б один order?

`EXISTS` часто виражає намір краще.

---

# 44. Correlated subquery з EXISTS

Це класичний патерн:

    SELECT ...
    FROM parent AS p
    WHERE EXISTS (
        SELECT 1
        FROM child AS c
        WHERE c.parent_id = p.id
    );

Запам'ятай шаблон:

    A
    WHERE EXISTS (
        B
        WHERE B.a_id = A.id
    )

Він означає:

> вибрати A, для яких існує хоча б один B.

---

# 45. NOT EXISTS — класичний патерн

    SELECT ...
    FROM parent AS p
    WHERE NOT EXISTS (
        SELECT 1
        FROM child AS c
        WHERE c.parent_id = p.id
    );

Означає:

> вибрати A, для яких немає жодного B.

---

# 46. Subquery та NULL

`NULL` є однією з найчастіших причин несподіваної поведінки.

Особливо потрібно бути уважним з:

    NOT IN

Наприклад:

    SELECT *
    FROM users
    WHERE id NOT IN (
        SELECT customer_id
        FROM orders
    );

Якщо:

    customer_id

може містити `NULL`, логіка може стати неочікуваною.

У багатьох задачах краще:

    NOT EXISTS

---

# 47. NOT EXISTS vs NOT IN

Безпечний для такого патерну варіант:

    SELECT *
    FROM users AS u
    WHERE NOT EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

Це прямо виражає:

    немає відповідного order

---

# 48. Subquery + UPDATE

Підзапити можна використовувати не тільки в `SELECT`.

Наприклад:

    UPDATE products
    SET price = price * 1.10
    WHERE category_id IN (
        SELECT id
        FROM categories
        WHERE name = 'electronics'
    );

Логіка:

    categories
       ↓
    отримати id electronics
       ↓
    products
       ↓
    оновити відповідні рядки

---

# 49. Subquery + DELETE

Наприклад:

> Видалити користувачів, які не мають замовлень.

Обережно з destructive operations.

Можна:

    DELETE FROM users AS u
    WHERE NOT EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

Перед `DELETE` корисно спочатку перевірити:

    SELECT *
    FROM users AS u
    WHERE NOT EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

Спочатку:

    SELECT

потім, коли впевнений:

    DELETE

---

# 50. Subquery + INSERT

Підзапит може бути джерелом даних для `INSERT`.

Наприклад:

    INSERT INTO expensive_products (
        product_id,
        name,
        price
    )
    SELECT
        id,
        name,
        price
    FROM products
    WHERE price > (
        SELECT AVG(price)
        FROM products
    );

Тут subquery використовується для визначення умови.

---

# 51. INSERT ... SELECT

Це важливий патерн:

    INSERT INTO target_table (...)
    SELECT ...
    FROM source_table
    WHERE ...;

Його часто використовують разом із підзапитами та агрегуванням.

---

# 52. UPDATE з агрегатним subquery

Наприклад, потрібно оновити категорію товарів за певною умовою.

    UPDATE products
    SET featured = TRUE
    WHERE price > (
        SELECT AVG(price)
        FROM products
    );

Усі товари дорожчі за середню ціну стають:

    featured = TRUE

---

# 53. Subquery у FROM як derived table

Термін:

    derived table

часто використовується для subquery у `FROM`.

Наприклад:

    SELECT
        stats.category,
        stats.average_price
    FROM (
        SELECT
            category,
            AVG(price) AS average_price
        FROM products
        GROUP BY category
    ) AS stats;

Тут:

    stats

є тимчасовим набором результатів для зовнішнього запиту.

---

# 54. Derived table vs звичайна таблиця

Звичайна таблиця:

    products

існує в базі.

Derived table:

    (
        SELECT ...
    ) AS stats

існує тільки в рамках цього SQL-запиту.

Вона не зберігається як окрема таблиця.

---

# 55. Subquery у SELECT vs JOIN

Наприклад:

    SELECT
        p.name,
        p.price,
        (
            SELECT AVG(price)
            FROM products
        ) AS average_price
    FROM products AS p;

Альтернативно можна використати інші SQL-конструкції.

На наступних етапах ти дізнаєшся про:

    window functions

які часто є природним рішенням для задач:

    значення рядка
    +
    агрегат по всьому набору

---

# 56. Subquery та Window Functions

Наприклад, задача:

> Показати товар та середню ціну всіх товарів поруч.

Через subquery:

    SELECT
        name,
        price,
        (
            SELECT AVG(price)
            FROM products
        ) AS average_price
    FROM products;

Пізніше це можна вирішувати через window function:

    AVG(price) OVER ()

Window functions — окрема тема.

На цьому етапі важливо знати:

> Не кожен subquery потрібно використовувати, якщо існує більш природна SQL-конструкція.

---

# 57. Subquery та CTE

Коли запит стає складним, замість вкладених subqueries часто використовують:

    WITH

Це називається:

    CTE
    Common Table Expression

Наприклад, замість:

    SELECT *
    FROM (
        SELECT
            category,
            AVG(price) AS average_price
        FROM products
        GROUP BY category
    ) AS stats
    WHERE average_price > 5000;

можна:

    WITH stats AS (
        SELECT
            category,
            AVG(price) AS average_price
        FROM products
        GROUP BY category
    )
    SELECT *
    FROM stats
    WHERE average_price > 5000;

Це часто легше читати.

CTE буде окремою темою.

---

# 58. Коли subquery дуже корисний

Subquery добре підходить, коли потрібно:

- порівняти значення з агрегатом;
- перевірити існування пов'язаного запису;
- перевірити відсутність запису;
- отримати набір ID для `IN`;
- створити проміжний набір даних;
- розділити складну логіку на етапи;
- виконати умову на основі іншого запиту.

---

# 59. Коли JOIN може бути кращим

Якщо потрібно отримати колонки з іншої таблиці:

    SELECT
        u.name,
        o.total_amount
    FROM users AS u
    JOIN orders AS o
        ON u.id = o.customer_id;

`JOIN` природніший.

Subquery не потрібно використовувати тільки тому, що він "працює".

---

# 60. Коли EXISTS може бути кращим за JOIN

Якщо потрібно тільки перевірити:

> чи існує пов'язаний запис?

Наприклад:

    SELECT *
    FROM users AS u
    WHERE EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

Нам не потрібні дані `orders`.

Нам потрібен тільки факт:

    order exists

Тому `EXISTS` дуже добре виражає намір.

---

# 61. Коли HAVING кращий за subquery

Якщо потрібно відфільтрувати групи за агрегатом:

    SELECT
        category,
        COUNT(*) AS product_count
    FROM products
    GROUP BY category
    HAVING COUNT(*) > 10;

не потрібно без необхідності робити:

    SELECT *
    FROM (
        SELECT
            category,
            COUNT(*) AS product_count
        FROM products
        GROUP BY category
    ) AS stats
    WHERE product_count > 10;

`HAVING` тут простіший.

---

# 62. Коли CTE кращий за nested subquery

Якщо отримуємо:

    SELECT
        ...
    FROM (
        SELECT
            ...
        FROM (
            SELECT
                ...
            FROM ...
        ) AS a
    ) AS b;

читати такий запит складно.

Краще розглянути:

    WITH first_step AS (...),
    second_step AS (...)
    SELECT ...
    FROM second_step;

Це буде наступним рівнем після subqueries.

---

# 63. Важлива концепція: рівні запитів

Розглядай SQL як рівні:

    main query
       ↓
    subquery
       ↓
    subquery

Кожен рівень може:

- фільтрувати;
- агрегувати;
- групувати;
- сортувати;
- об'єднувати таблиці.

Але чим більше рівнів, тим важливіша читабельність.

---

# 64. Приклад багаторівневої логіки

Задача:

> Знайти користувачів, чиї витрати більші за середні витрати користувачів.

Потрібно:

    1. порахувати витрати кожного user

    2. порахувати середні витрати

    3. знайти users вище середнього

Можна побудувати через derived table:

    SELECT *
    FROM (
        SELECT
            customer_id,
            SUM(total_amount) AS total_spent
        FROM orders
        GROUP BY customer_id
    ) AS customer_stats
    WHERE total_spent > (
        SELECT AVG(total_spent)
        FROM (
            SELECT
                customer_id,
                SUM(total_amount) AS total_spent
            FROM orders
            GROUP BY customer_id
        ) AS stats
    );

Це працює, але повторює логіку.

На практиці тут уже проситься:

    CTE

або:

    window function

---

# 65. Як розбирати складний subquery

Не намагайся зрозуміти весь запит одразу.

Виконай внутрішній запит окремо.

Наприклад:

    SELECT AVG(price)
    FROM products;

Побач:

    4250

Потім встав його в основний запит:

    SELECT *
    FROM products
    WHERE price > 4250;

Після цього об'єднай:

    SELECT *
    FROM products
    WHERE price > (
        SELECT AVG(price)
        FROM products
    );

Це дуже хороший спосіб навчатися SQL.

---

# 66. Метод "від внутрішнього до зовнішнього"

Для складного subquery:

    SELECT ...
    WHERE x > (
        SELECT ...
        FROM (
            SELECT ...
        ) AS stats
    );

розбирай:

    1. найвнутрішніший SELECT

    2. перевір його результат

    3. перевір наступний рівень

    4. перевір зовнішній SELECT

Це значно простіше, ніж намагатися відразу виконати весь запит у голові.

---

# 67. Типові помилки

## ❌ Помилка 1 — subquery повертає багато рядків

Неправильно:

    SELECT *
    FROM products
    WHERE price > (
        SELECT price
        FROM products
    );

Якщо внутрішній запит повертає багато рядків, scalar comparison не працює.

Потрібно, наприклад:

    >
    ANY

або:

    >
    ALL

або агрегат:

    >
    (SELECT AVG(price) ...)

---

# 68. Помилка 2 — subquery повертає неправильну кількість колонок

Наприклад:

    WHERE id = (
        SELECT id, name
        FROM users
    );

Subquery повертає дві колонки, а оператор `=` очікує одне значення.

---

# 69. Помилка 3 — плутанина IN та EXISTS

`IN`:

    WHERE id IN (
        SELECT customer_id
        FROM orders
    )

`EXISTS`:

    WHERE EXISTS (
        SELECT 1
        FROM orders
        WHERE orders.customer_id = users.id
    )

Потрібно розуміти різницю в логіці.

---

# 70. Помилка 4 — NOT IN + NULL

Небезпечно:

    WHERE id NOT IN (
        SELECT customer_id
        FROM orders
    )

якщо:

    customer_id

може бути `NULL`.

Для задачі "немає пов'язаного запису" часто краще:

    NOT EXISTS

---

# 71. Помилка 5 — надмірно складний nested subquery

Якщо бачиш:

    SELECT
    FROM (
        SELECT
        FROM (
            SELECT
            FROM (...)
        )
    )

запитай:

> Чи не буде `JOIN`, `CTE` або window function зрозумілішим?

---

# 72. Помилка 6 — SELECT * у складному subquery

Краще явно визначати колонки:

    SELECT
        customer_id,
        SUM(total_amount) AS total_spent
    FROM orders
    GROUP BY customer_id;

а не:

    SELECT *
    ...

Особливо якщо derived table використовується далі.

---

# 73. Помилка 7 — не перевіряти NULL

Перед:

    IN
    NOT IN
    =
    <>
    ANY
    ALL

завжди пам'ятай про:

    NULL

SQL використовує тризначну логіку:

    TRUE
    FALSE
    UNKNOWN

---

# 74. Subquery та продуктивність

Не потрібно автоматично вважати:

    subquery = повільно

або:

    JOIN = швидко

Це спрощення.

PostgreSQL має оптимізатор, який може перебудовувати запит.

На продуктивність впливають:

- розмір таблиць;
- індекси;
- статистика;
- тип операції;
- selectivity;
- query plan;
- кількість рядків;
- структура JOIN;
- correlated subquery.

Для перевірки:

    EXPLAIN
    EXPLAIN ANALYZE

---

# 75. EXPLAIN для subquery

Наприклад:

    EXPLAIN ANALYZE
    SELECT *
    FROM users AS u
    WHERE EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

Не потрібно зараз знати всі типи планів.

Головне:

> Порівнювати альтернативні запити потрібно за фактичним планом виконання, а не тільки за кількістю символів SQL.

---

# 76. Subquery у реальному backend

Наприклад API:

    GET /products/expensive

може використовувати:

    SELECT
        id,
        name,
        price
    FROM products
    WHERE price > (
        SELECT AVG(price)
        FROM products
    )
    ORDER BY price DESC;

Backend отримує готовий набір даних.

---

# 77. Subquery для перевірки доступу

Наприклад:

> Показати документи користувача, якщо він має активну підписку.

Концептуально:

    SELECT *
    FROM documents AS d
    WHERE d.user_id = 15
      AND EXISTS (
          SELECT 1
          FROM subscriptions AS s
          WHERE s.user_id = d.user_id
            AND s.status = 'active'
      );

Це типовий приклад перевірки існування пов'язаного стану.

---

# 78. Subquery для фільтрації бізнес-даних

Наприклад:

> Показати клієнтів, які мають хоча б одне замовлення понад 10000.

    SELECT *
    FROM users AS u
    WHERE EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
          AND o.total_amount > 10000
    );

---

# 79. Subquery для "без записів"

> Показати товари, які жодного разу не були замовлені.

Якщо:

    order_items.product_id
        ↓
    products.id

можна:

    SELECT *
    FROM products AS p
    WHERE NOT EXISTS (
        SELECT 1
        FROM order_items AS oi
        WHERE oi.product_id = p.id
    );

Це дуже корисний production-патерн.

---

# 80. Subquery + JOIN

Subquery можна комбінувати з JOIN.

Наприклад:

    SELECT
        u.name,
        stats.total_spent
    FROM users AS u
    JOIN (
        SELECT
            customer_id,
            SUM(total_amount) AS total_spent
        FROM orders
        GROUP BY customer_id
    ) AS stats
        ON stats.customer_id = u.id;

Тут subquery спочатку створює:

    customer_id
    total_spent

після чого цей результат JOIN-иться до `users`.

---

# 81. Derived table як "підготовлений результат"

Можна мислити:

    orders
       ↓
    GROUP BY customer_id
       ↓
    SUM(total_amount)
       ↓
    stats
       ↓
    JOIN users

Це дуже корисний спосіб розбивати складну задачу на етапи.

---

# 82. Приклад: TOP users за витратами

    SELECT
        u.id,
        u.name,
        stats.total_spent
    FROM users AS u
    JOIN (
        SELECT
            customer_id,
            SUM(total_amount) AS total_spent
        FROM orders
        GROUP BY customer_id
    ) AS stats
        ON stats.customer_id = u.id
    ORDER BY stats.total_spent DESC
    LIMIT 10;

Це хороший практичний приклад:

    subquery
    +
    GROUP BY
    +
    SUM
    +
    JOIN
    +
    ORDER BY
    +
    LIMIT

---

# 83. Subquery — Junior рівень

На Junior-рівні потрібно впевнено знати:

- що таке subquery;
- subquery у `WHERE`;
- scalar subquery;
- `IN`;
- `NOT IN`;
- `EXISTS`;
- `NOT EXISTS`;
- агрегатні subqueries;
- `NULL` у `NOT IN`;
- subquery у `FROM`;
- alias для derived table;
- базовий correlated subquery;
- subquery + `GROUP BY`;
- subquery + `JOIN`.

---

# 84. Subquery — Middle рівень

Потрібно розуміти:

- correlated subqueries;
- nested subqueries;
- `ANY`;
- `ALL`;
- складні derived tables;
- subquery + aggregation;
- subquery + JOIN;
- `EXISTS` vs `JOIN`;
- `IN` vs `EXISTS`;
- `NOT EXISTS` vs `LEFT JOIN ... IS NULL`;
- query plans;
- оптимізацію складних subqueries;
- CTE як альтернативу.

---

# 85. Advanced / Senior

На глибшому рівні:

- decorrelation;
- semi join;
- anti join;
- optimizer transformations;
- InitPlan;
- SubPlan;
- correlated subquery performance;
- cardinality estimation;
- subquery flattening;
- materialization;
- CTE materialization;
- `LATERAL`;
- window functions як альтернатива;
- складні `EXISTS` / `NOT EXISTS`;
- оптимізація subqueries через індекси;
- `EXPLAIN ANALYZE`;
- `BUFFERS`.

---

# 86. Дуже важливий термін: Semi Join

Коли логіка:

    EXISTS

концептуально нагадує:

    semi join

Тобто нам потрібен факт:

    "чи є matching row?"

але не потрібно повертати всі matching rows.

Саме тому `EXISTS` часто добре підходить для перевірки існування.

---

# 87. Дуже важливий термін: Anti Join

Коли логіка:

    NOT EXISTS

означає:

    "немає matching row"

це концептуально відповідає:

    anti join

Це допомагає розуміти query plans та оптимізацію на більш високому рівні.

---

# 88. Практичні вправи

## Вправа 1

Знайди товари, ціна яких більша за середню ціну всіх товарів.

Використай:

    AVG
    subquery
    WHERE

---

# 89. Практична вправа 2

Знайди товар або товари з максимальною ціною.

Використай:

    MAX
    subquery

---

# 90. Практична вправа 3

Знайди товари з мінімальною ціною.

Використай:

    MIN
    subquery

---

# 91. Практична вправа 4

Знайди користувачів, які мають хоча б одне замовлення.

Використай:

    EXISTS

---

# 92. Практична вправа 5

Знайди користувачів, які не мають жодного замовлення.

Використай:

    NOT EXISTS

---

# 93. Практична вправа 6

Знайди користувачів, які мають хоча б одне оплачене замовлення.

Використай:

    EXISTS
    WHERE
    status = 'paid'

---

# 94. Практична вправа 7

Знайди користувачів, які не мають жодного оплаченого замовлення.

Використай:

    NOT EXISTS

---

# 95. Практична вправа 8

Знайди користувачів, які мають замовлення на суму понад 10000.

Використай:

    EXISTS
    correlated subquery

---

# 96. Практична вправа 9

Знайди категорії, середня ціна яких більша за середню ціну всіх товарів.

Потрібно використати:

    GROUP BY
    AVG
    subquery

---

# 97. Практична вправа 10

Створи derived table:

    customer_id
    total_spent

на основі:

    orders

Використай:

    SUM
    GROUP BY
    subquery in FROM

---

# 98. Практична вправа 11

Приєднай отриманий derived table до:

    users

і покажи:

    user name
    total spent

---

# 99. Практична вправа 12

Знайди TOP 10 користувачів за:

    total_spent

Використай:

    subquery
    JOIN
    GROUP BY
    SUM
    ORDER BY
    LIMIT

---

# 100. Практична вправа 13

Знайди товари, які ніколи не зустрічалися в:

    order_items

Використай:

    NOT EXISTS

---

# 101. Практична вправа 14

Порівняй два запити:

    IN

та:

    EXISTS

для пошуку користувачів із замовленнями.

Поясни своїми словами, як вони працюють.

---

# 102. Практична вправа 15

Знайди користувачів, у яких кількість замовлень більша за 5.

Зроби два варіанти:

### Варіант A

    correlated subquery

### Варіант B

    JOIN
    GROUP BY
    HAVING

Порівняй читабельність.

---

# 103. Практична вправа 16

Для одного запиту зроби три варіанти:

    JOIN

    IN

    EXISTS

Порівняй:

- результат;
- читабельність;
- `EXPLAIN ANALYZE`.

Це дуже корисна вправа для переходу від Junior до Middle.

---

# 104. Метод практики

Для кожної вправи працюй у такому порядку:

    1. сформулюй задачу словами

    2. визнач основну таблицю

    3. визнач, що повинен повернути subquery

    4. виконай subquery окремо

    5. перевір результат

    6. встав subquery у main query

    7. перевір результат

    8. подумай, чи можна вирішити через JOIN

    9. якщо запит складний — перевір EXPLAIN ANALYZE

---

# 105. Приклад розбору задачі

Задача:

> Знайти товари, дорожчі за середню ціну.

### Крок 1

Потрібно знайти середню ціну:

    SELECT AVG(price)
    FROM products;

### Крок 2

Порівняти:

    price > average

### Крок 3

Записати:

    SELECT *
    FROM products
    WHERE price > (
        SELECT AVG(price)
        FROM products
    );

Це правильний спосіб мислення.

---

# 106. Приклад розбору EXISTS

Задача:

> Знайти users, які мають orders.

### Крок 1

Основна таблиця:

    users

### Крок 2

Пов'язана таблиця:

    orders

### Крок 3

Умова:

    orders.customer_id = users.id

### Крок 4

Нам не потрібні дані order.

Потрібно лише:

    існує / не існує

### Крок 5

Тому:

    SELECT *
    FROM users AS u
    WHERE EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

---

# 107. Шпаргалка: scalar subquery

    SELECT *
    FROM products
    WHERE price > (
        SELECT AVG(price)
        FROM products
    );

Subquery:

    повинен повернути
    одне значення

---

# 108. Шпаргалка: IN

    SELECT *
    FROM users
    WHERE id IN (
        SELECT customer_id
        FROM orders
    );

Значення:

    входить у набір?

---

# 109. Шпаргалка: EXISTS

    SELECT *
    FROM users AS u
    WHERE EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

Питання:

    існує хоча б один matching row?

---

# 110. Шпаргалка: NOT EXISTS

    SELECT *
    FROM users AS u
    WHERE NOT EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

Питання:

    немає жодного matching row?

---

# 111. Шпаргалка: subquery у FROM

    SELECT *
    FROM (
        SELECT
            category,
            AVG(price) AS average_price
        FROM products
        GROUP BY category
    ) AS stats;

Subquery тут:

    derived table

---

# 112. Шпаргалка: correlated subquery

    SELECT *
    FROM users AS u
    WHERE EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

Ключова ознака:

    subquery
        ↓
    посилається на зовнішній query

---

# 113. Шпаргалка: ANY

    SELECT *
    FROM products
    WHERE price > ANY (
        SELECT price
        FROM products
        WHERE category = 'tech'
    );

    ANY
    → достатньо одного значення

---

# 114. Шпаргалка: ALL

    SELECT *
    FROM products
    WHERE price > ALL (
        SELECT price
        FROM products
        WHERE category = 'tech'
    );

    ALL
    → умова повинна виконуватися для всіх

---

# 115. Шпаргалка: subquery + UPDATE

    UPDATE products
    SET price = price * 1.10
    WHERE category_id IN (
        SELECT id
        FROM categories
        WHERE name = 'electronics'
    );

---

# 116. Шпаргалка: subquery + DELETE

Спочатку перевір:

    SELECT *
    FROM users AS u
    WHERE NOT EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

Після перевірки:

    DELETE FROM users AS u
    WHERE NOT EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

---

# 117. Питання для самоперевірки

### Базові

1. Що таке subquery?
2. Де може знаходитися subquery?
3. Що таке scalar subquery?
4. Що таке derived table?
5. Для чого потрібен alias для subquery у `FROM`?
6. Що робить `IN`?
7. Що робить `EXISTS`?
8. Що робить `NOT EXISTS`?
9. Що робить `ANY`?
10. Що робить `ALL`?

### Correlated subqueries

11. Що таке correlated subquery?
12. Як визначити correlated subquery?
13. Чим він відрізняється від non-correlated?
14. Навіщо використовувати `EXISTS`?

### NULL

15. Чому `NOT IN` може бути небезпечним з `NULL`?
16. Чому `NOT EXISTS` часто краще для пошуку відсутніх записів?
17. Що таке `UNKNOWN` у SQL?

### Практика

18. Як знайти товари дорожчі за середню ціну?
19. Як знайти товар з максимальною ціною?
20. Як знайти users без orders?
21. Як знайти users з paid orders?
22. Як створити derived table?
23. Як використати subquery з `GROUP BY`?
24. Як використати subquery разом із `JOIN`?
25. Як переписати correlated subquery через JOIN?
26. Коли `HAVING` простіший за subquery?
27. Коли CTE може бути кращим за nested subquery?

### Performance

28. Чи завжди subquery повільніший за JOIN?
29. Як перевірити продуктивність?
30. Що показує `EXPLAIN ANALYZE`?
31. Що таке semi join?
32. Що таке anti join?

---

# 118. Головні відмінності

    IN
    ↓
    значення входить у набір?

    EXISTS
    ↓
    існує хоча б один рядок?

    NOT EXISTS
    ↓
    немає жодного рядка?

    ANY
    ↓
    достатньо одного значення

    ALL
    ↓
    потрібно для всіх значень

    scalar subquery
    ↓
    одне значення

    derived table
    ↓
    набір рядків як таблиця

    correlated subquery
    ↓
    залежить від зовнішнього запиту

---

# 119. Найважливіша ментальна модель

Subquery — це не просто:

    "SQL всередині SQL"

Краще думати:

    Яку проміжну відповідь
    мені потрібно отримати?

Наприклад:

    середня ціна
         ↓
    одне число

або:

    customer_id
         ↓
    набір ID

або:

    category + average_price
         ↓
    derived table

або:

    чи існує order?
         ↓
    TRUE / FALSE

Після цього стає зрозуміло, який оператор потрібен:

    одне значення
        → scalar subquery

    набір значень
        → IN

    факт існування
        → EXISTS

    відсутність
        → NOT EXISTS

    проміжна таблиця
        → subquery in FROM

---

# 120. Зв'язок з попередніми темами

Ти вже знаєш:

    SELECT
    WHERE
    GROUP BY
    HAVING
    JOIN
    aggregate functions

Тепер можна комбінувати їх:

    JOIN
       ↓
    GROUP BY
       ↓
    aggregate
       ↓
    subquery
       ↓
    WHERE / HAVING

Тобто SQL починає ставати композиційною мовою:

    маленький query
        ↓
    результат
        ↓
    більший query
        ↓
    новий результат

---

# 121. Зв'язок з наступними темами

Після `subqueries` логічно переходити до:

    14-constraints
        ↓
    обмеження цілісності даних

    15-indexes
        ↓
    прискорення пошуку

    16-views
        ↓
    збережені SELECT-запити

    17-transactions
        ↓
    атомарні операції

Пізніше:

    CTE
    Window Functions
    LATERAL
    EXPLAIN
    Query Optimization

будуть будуватися поверх уже знайомих тобі:

    SELECT
    JOIN
    GROUP BY
    HAVING
    subqueries

---

# 🎯 Підсумок

Головна схема цього розділу:

    MAIN QUERY
        ↓
    SUBQUERY
        ↓
    проміжний результат
        ↓
    MAIN QUERY використовує результат

Основні форми:

    WHERE column = (
        SELECT ...
    )

    WHERE column IN (
        SELECT ...
    )

    WHERE EXISTS (
        SELECT ...
    )

    WHERE NOT EXISTS (
        SELECT ...
    )

    FROM (
        SELECT ...
    ) AS stats

    SELECT (
        SELECT ...
    )

---

# 🧠 Найважливіше для Junior

Ти повинен уміти написати без підказки:

    SELECT *
    FROM products
    WHERE price > (
        SELECT AVG(price)
        FROM products
    );

    SELECT *
    FROM users
    WHERE id IN (
        SELECT customer_id
        FROM orders
    );

    SELECT *
    FROM users AS u
    WHERE EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

    SELECT *
    FROM users AS u
    WHERE NOT EXISTS (
        SELECT 1
        FROM orders AS o
        WHERE o.customer_id = u.id
    );

і пояснити словами, **що робить кожен рівень запиту**.

---

# 🚀 Найважливіша практична навичка

Коли бачиш складний SQL:

    SELECT ...
    FROM ...
    WHERE ...
        (
            SELECT ...
            FROM ...
            WHERE ...
        )

не лякайся вкладеності.

Розділи його:

    внутрішній SELECT
          ↓
    його результат
          ↓
    зовнішній SELECT
          ↓
    кінцевий результат

Це основний спосіб читання складних SQL-запитів.

А коли subqueries почнуть ставати занадто глибокими, наступними природними інструментами будуть:

    CTE
    JOIN
    Window Functions

Саме вони дозволяють перетворювати складну SQL-логіку на послідовність зрозумілих кроків.
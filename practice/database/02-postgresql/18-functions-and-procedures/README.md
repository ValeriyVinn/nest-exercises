# PostgreSQL Functions and Procedures

## 18. Functions and Procedures

Functions і Procedures — це механізми PostgreSQL для винесення логіки безпосередньо в базу даних.

Вони дозволяють зберігати SQL-логіку на стороні PostgreSQL і повторно її використовувати.

Головна ідея:

    Application
        ↓
    PostgreSQL
        ↓
    Function / Procedure
        ↓
    SQL operations

Наприклад, замість того щоб щоразу писати:

    SELECT price * quantity
    FROM order_items
    WHERE order_id = 10;

можна створити функцію, яка виконує певну логіку.

---

# 1. Function

Function — це об'єкт PostgreSQL, який:

- приймає параметри;
- виконує логіку;
- повертає результат;
- може викликатися з SQL.

Найпростіша модель:

    input
      ↓
    function
      ↓
    output

Наприклад:

    SELECT add_numbers(10, 20);

Результат:

    30

---

# 2. Procedure

Procedure — це об'єкт PostgreSQL, який викликається через:

    CALL procedure_name(...);

Procedure призначена насамперед для виконання операцій, а не для повернення значення як звичайна function.

Наприклад:

    CALL update_product_stock(10, 5);

---

# 3. Function vs Procedure

Основна різниця:

| Function | Procedure |
|---|---|
| `SELECT function()` | `CALL procedure()` |
| повертає значення | не повинна повертати значення як function |
| часто використовується всередині SQL | використовується як окрема команда |
| може використовуватися в `SELECT` | викликається через `CALL` |
| зручна для обчислень і запитів | зручна для процедурної логіки |
| має `RETURNS` | не має звичайного `RETURNS` |

Спрощено:

    Function
        ↓
    "дай мені результат"

    Procedure
        ↓
    "виконай цю операцію"

---

# 4. Навіщо потрібні Functions

Functions корисні, коли одна й та сама логіка використовується багато разів.

Наприклад:

    calculate_order_total()

    get_user_orders()

    get_product_price()

    calculate_discount()

    full_name()

Замість дублювання SQL логіка зберігається в одному місці.

---

# 5. Навіщо потрібні Procedures

Procedure зручно використовувати для операцій, які виконують послідовність дій.

Наприклад:

    update_stock()

    close_order()

    archive_old_orders()

    transfer_money()

Procedure може містити кілька SQL-команд.

---

# 6. Найпростіша Function

Створимо функцію:

    CREATE FUNCTION add_numbers(a INTEGER, b INTEGER)
    RETURNS INTEGER
    LANGUAGE SQL
    AS $$
        SELECT a + b;
    $$;

Виклик:

    SELECT add_numbers(10, 20);

Результат:

    30

---

# 7. Структура CREATE FUNCTION

Загальна структура:

    CREATE FUNCTION function_name(parameter1 TYPE, parameter2 TYPE)
    RETURNS return_type
    LANGUAGE language_name
    AS $$
        function body
    $$;

Наприклад:

    CREATE FUNCTION multiply_numbers(a INTEGER, b INTEGER)
    RETURNS INTEGER
    LANGUAGE SQL
    AS $$
        SELECT a * b;
    $$;

---

# 8. Parameters

Function може приймати параметри.

Наприклад:

    CREATE FUNCTION greet_user(username TEXT)
    RETURNS TEXT
    LANGUAGE SQL
    AS $$
        SELECT 'Hello, ' || username;
    $$;

Виклик:

    SELECT greet_user('Valeriy');

Результат:

    Hello, Valeriy

---

# 9. Типи параметрів

Параметри мають тип PostgreSQL.

Наприклад:

    INTEGER

    NUMERIC

    TEXT

    BOOLEAN

    DATE

    TIMESTAMP

    UUID

    JSONB

    INTEGER[]

та інші.

---

# 10. RETURNS

Function повинна описувати тип результату.

Наприклад:

    RETURNS INTEGER

або:

    RETURNS TEXT

або:

    RETURNS BOOLEAN

або:

    RETURNS NUMERIC

---

# 11. Function без параметрів

Function може не мати параметрів.

    CREATE FUNCTION current_timestamp_value()
    RETURNS TIMESTAMP
    LANGUAGE SQL
    AS $$
        SELECT CURRENT_TIMESTAMP;
    $$;

Виклик:

    SELECT current_timestamp_value();

---

# 12. LANGUAGE SQL

Якщо функція складається із SQL-команд, можна використовувати:

    LANGUAGE SQL

Наприклад:

    CREATE FUNCTION get_user_count()
    RETURNS INTEGER
    LANGUAGE SQL
    AS $$
        SELECT COUNT(*)::INTEGER
        FROM users;
    $$;

Виклик:

    SELECT get_user_count();

---

# 13. Dollar quoting

У PostgreSQL тіло функції часто записується між:

    $$

та:

    $$

Наприклад:

    AS $$
        SELECT a + b;
    $$;

Це називається dollar-quoting.

Він зручний, тому що всередині функції можуть бути одинарні лапки:

    AS $$
        SELECT 'Hello';
    $$;

---

# 14. Альтернативний dollar tag

Можна використовувати власний tag:

    AS $function$
        SELECT a + b;
    $function$;

Але для більшості простих функцій:

    $$ ... $$

цілком достатньо.

---

# 15. Function з таблицею

Function може виконувати SELECT.

Наприклад:

    CREATE FUNCTION get_user_name(user_id INTEGER)
    RETURNS TEXT
    LANGUAGE SQL
    AS $$
        SELECT name
        FROM users
        WHERE id = user_id;
    $$;

Виклик:

    SELECT get_user_name(1);

---

# 16. Function і WHERE

Function можна використовувати у звичайному SQL:

    SELECT *
    FROM users
    WHERE get_user_name(id) = 'Alice';

Але потрібно бути обережним із performance.

Якщо функція викликається для великої кількості рядків, це може бути дорожче, ніж правильно сформований SQL-запит.

---

# 17. Function як обчислення

Наприклад:

    CREATE FUNCTION calculate_total(
        price NUMERIC,
        quantity INTEGER
    )
    RETURNS NUMERIC
    LANGUAGE SQL
    AS $$
        SELECT price * quantity;
    $$;

Виклик:

    SELECT calculate_total(25.50, 4);

Результат:

    102.00

---

# 18. Function і NULL

Потрібно розуміти поведінку `NULL`.

Наприклад:

    SELECT calculate_total(NULL, 4);

Якщо всередині:

    SELECT price * quantity;

результат може бути:

    NULL

У PostgreSQL `NULL` не означає `0`.

---

# 19. COALESCE у Function

Можна явно обробити `NULL`.

    CREATE FUNCTION calculate_total(
        price NUMERIC,
        quantity INTEGER
    )
    RETURNS NUMERIC
    LANGUAGE SQL
    AS $$
        SELECT COALESCE(price, 0) * COALESCE(quantity, 0);
    $$;

Тепер `NULL` перетворюється на `0`.

---

# 20. Function, яка повертає BOOLEAN

Наприклад:

    CREATE FUNCTION is_adult(age INTEGER)
    RETURNS BOOLEAN
    LANGUAGE SQL
    AS $$
        SELECT age >= 18;
    $$;

Виклик:

    SELECT is_adult(25);

Результат:

    true

---

# 21. Function, яка повертає таблицю

Function може повертати не одне значення, а набір рядків.

Наприклад:

    CREATE FUNCTION get_active_users()
    RETURNS TABLE (
        id INTEGER,
        name TEXT
    )
    LANGUAGE SQL
    AS $$
        SELECT id, name
        FROM users
        WHERE active = true;
    $$;

Виклик:

    SELECT *
    FROM get_active_users();

Це дуже важлива можливість.

---

# 22. RETURNS TABLE

Синтаксис:

    RETURNS TABLE (
        column1 TYPE,
        column2 TYPE
    )

Наприклад:

    RETURNS TABLE (
        id INTEGER,
        name TEXT,
        email TEXT
    )

Function фактично повертає набір рядків із заданою структурою.

---

# 23. SETOF

Інший варіант:

    RETURNS SETOF users

Наприклад:

    CREATE FUNCTION get_users()
    RETURNS SETOF users
    LANGUAGE SQL
    AS $$
        SELECT *
        FROM users;
    $$;

Виклик:

    SELECT *
    FROM get_users();

---

# 24. RETURNS TABLE vs SETOF

Спрощено:

    RETURNS TABLE
        ↓
    описує структуру результату

    RETURNS SETOF users
        ↓
    повертає набір рядків певного типу

Для API-oriented functions часто зручно:

    RETURNS TABLE (...)

---

# 25. Function з JOIN

Function може містити складніший SQL.

    CREATE FUNCTION get_order_details(order_id INTEGER)
    RETURNS TABLE (
        product_name TEXT,
        quantity INTEGER,
        price NUMERIC
    )
    LANGUAGE SQL
    AS $$
        SELECT
            p.name,
            oi.quantity,
            p.price
        FROM order_items oi
        JOIN products p
            ON p.id = oi.product_id
        WHERE oi.order_id = order_id;
    $$;

Виклик:

    SELECT *
    FROM get_order_details(10);

---

# 26. Function з GROUP BY

Function може виконувати aggregation.

    CREATE FUNCTION get_user_order_count(user_id INTEGER)
    RETURNS INTEGER
    LANGUAGE SQL
    AS $$
        SELECT COUNT(*)::INTEGER
        FROM orders
        WHERE orders.user_id = user_id;
    $$;

Виклик:

    SELECT get_user_order_count(5);

---

# 27. CREATE OR REPLACE FUNCTION

Якщо потрібно змінити function:

    CREATE OR REPLACE FUNCTION add_numbers(
        a INTEGER,
        b INTEGER
    )
    RETURNS INTEGER
    LANGUAGE SQL
    AS $$
        SELECT a + b;
    $$;

Це дозволяє оновити визначення функції.

---

# 28. DROP FUNCTION

Видалення:

    DROP FUNCTION add_numbers(INTEGER, INTEGER);

Важливий момент:

> PostgreSQL ідентифікує функцію не тільки за назвою, а й за типами параметрів.

Тому потрібно вказувати signature.

---

# 29. Function overloading

PostgreSQL дозволяє мати функції з однаковим ім'ям, але різними типами параметрів.

Наприклад:

    add_numbers(INTEGER, INTEGER)

і:

    add_numbers(NUMERIC, NUMERIC)

Виклик:

    SELECT add_numbers(10, 20);

або:

    SELECT add_numbers(10.5, 20.5);

PostgreSQL вибирає відповідну функцію.

---

# 30. SQL Function vs PL/pgSQL

Є два важливі підходи.

### SQL function

    LANGUAGE SQL

Підходить, коли функція фактично є SQL-запитом або невеликою послідовністю SQL-команд.

### PL/pgSQL

    LANGUAGE plpgsql

Потрібен, коли потрібна процедурна логіка:

- змінні;
- `IF`;
- `CASE`;
- цикли;
- обробка помилок;
- складніша логіка.

---

# 31. Найпростіша PL/pgSQL Function

    CREATE FUNCTION add_numbers_plpgsql(
        a INTEGER,
        b INTEGER
    )
    RETURNS INTEGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
        RETURN a + b;
    END;
    $$;

Виклик:

    SELECT add_numbers_plpgsql(10, 20);

---

# 32. BEGIN / END у PL/pgSQL

У PL/pgSQL тіло функції зазвичай має:

    BEGIN
        ...
    END;

Це не те саме, що:

    BEGIN;

у транзакції.

Важливо розрізняти:

    BEGIN;
        ↓
    SQL transaction

і:

    BEGIN
        ...
    END
        ↓
    PL/pgSQL block

---

# 33. RETURN

У PL/pgSQL результат повертається через:

    RETURN;

Наприклад:

    CREATE FUNCTION square_number(value INTEGER)
    RETURNS INTEGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
        RETURN value * value;
    END;
    $$;

---

# 34. Variables

PL/pgSQL дозволяє створювати змінні.

    CREATE FUNCTION calculate_discount(price NUMERIC)
    RETURNS NUMERIC
    LANGUAGE plpgsql
    AS $$
    DECLARE
        discount NUMERIC;
    BEGIN
        discount := price * 0.10;

        RETURN discount;
    END;
    $$;

---

# 35. :=

У PL/pgSQL присвоєння виконується через:

    :=

Наприклад:

    total := price * quantity;

Не плутати з SQL:

    =

У PL/pgSQL:

    :=

означає присвоєння.

---

# 36. IF

PL/pgSQL підтримує умовну логіку.

    CREATE FUNCTION discount_price(price NUMERIC)
    RETURNS NUMERIC
    LANGUAGE plpgsql
    AS $$
    BEGIN
        IF price >= 1000 THEN
            RETURN price * 0.90;
        END IF;

        RETURN price;
    END;
    $$;

Виклик:

    SELECT discount_price(1500);

---

# 37. IF / ELSE

    CREATE FUNCTION discount_price(price NUMERIC)
    RETURNS NUMERIC
    LANGUAGE plpgsql
    AS $$
    BEGIN
        IF price >= 1000 THEN
            RETURN price * 0.90;
        ELSE
            RETURN price;
        END IF;
    END;
    $$;

---

# 38. ELSIF

Можна мати кілька умов:

    IF price >= 1000 THEN
        RETURN price * 0.90;
    ELSIF price >= 500 THEN
        RETURN price * 0.95;
    ELSE
        RETURN price;
    END IF;

---

# 39. CASE

Можна використовувати `CASE`.

    CREATE FUNCTION shipping_cost(total NUMERIC)
    RETURNS NUMERIC
    LANGUAGE SQL
    AS $$
        SELECT CASE
            WHEN total >= 1000 THEN 0
            WHEN total >= 500 THEN 50
            ELSE 100
        END;
    $$;

---

# 40. SELECT INTO

У PL/pgSQL можна записати результат SQL-запиту в змінну.

    CREATE FUNCTION get_user_email(user_id INTEGER)
    RETURNS TEXT
    LANGUAGE plpgsql
    AS $$
    DECLARE
        user_email TEXT;
    BEGIN
        SELECT email
        INTO user_email
        FROM users
        WHERE id = user_id;

        RETURN user_email;
    END;
    $$;

---

# 41. Перевірка результату SELECT INTO

Якщо потрібен контроль:

    SELECT email
    INTO STRICT user_email
    FROM users
    WHERE id = user_id;

`STRICT` змушує PostgreSQL очікувати рівно один рядок.

Це advanced-поведінка, але корисно знати про її існування.

---

# 42. LOOP

PL/pgSQL підтримує цикли.

Наприклад:

    LOOP
        ...
        EXIT;
    END LOOP;

Для більшості звичайних database operations краще спочатку подумати, чи можна зробити операцію одним SQL-запитом.

SQL часто ефективніший за ручну обробку рядків у циклі.

---

# 43. FOR loop

Наприклад:

    FOR item IN
        SELECT id
        FROM products
    LOOP
        ...
    END LOOP;

Це дозволяє обробляти результати по одному.

Але не слід автоматично використовувати цикли там, де можна використати set-based SQL.

---

# 44. Set-based thinking

SQL оптимізований для роботи з наборами даних.

Замість:

    FOR each product
        UPDATE product

часто краще:

    UPDATE products
    SET active = false
    WHERE stock = 0;

Одна SQL-команда може обробити багато рядків.

Тому:

> спочатку шукай set-based рішення, а потім цикл.

---

# 45. Exception handling

PL/pgSQL підтримує обробку помилок.

Загальна структура:

    BEGIN
        ...
    EXCEPTION
        WHEN ...
        THEN
            ...
    END;

Наприклад:

    BEGIN
        ...
    EXCEPTION
        WHEN division_by_zero THEN
            ...
    END;

---

# 46. RAISE

У PL/pgSQL можна генерувати повідомлення.

    RAISE NOTICE 'Processing user %', user_id;

Або помилку:

    RAISE EXCEPTION 'User not found';

Це дозволяє створювати власні помилки.

---

# 47. Приклад validation function

    CREATE FUNCTION validate_age(age INTEGER)
    RETURNS BOOLEAN
    LANGUAGE plpgsql
    AS $$
    BEGIN
        IF age < 0 THEN
            RAISE EXCEPTION 'Age cannot be negative';
        END IF;

        RETURN age >= 18;
    END;
    $$;

---

# 48. Function і transactions

Function виконується в контексті транзакції, яка її викликає.

Наприклад:

    BEGIN;

    SELECT some_function();

    COMMIT;

Function не потрібно сприймати як автоматично окрему незалежну транзакцію.

---

# 49. Function не дорівнює Procedure

Важливий момент:

    SELECT function_name();

і:

    CALL procedure_name();

це різні механізми.

Function часто є частиною SQL-запиту.

Procedure викликається окремою SQL-командою.

---

# 50. Найпростіша Procedure

    CREATE PROCEDURE say_hello()
    LANGUAGE SQL
    AS $$
        SELECT 'Hello';
    $$;

Виклик:

    CALL say_hello();

Але для простої функції, яка повертає значення:

    SELECT say_hello();

частіше логічніше використовувати `FUNCTION`.

---

# 51. Procedure для UPDATE

Наприклад:

    CREATE PROCEDURE deactivate_user(user_id INTEGER)
    LANGUAGE SQL
    AS $$
        UPDATE users
        SET active = false
        WHERE id = user_id;
    $$;

Виклик:

    CALL deactivate_user(10);

---

# 52. Procedure з PL/pgSQL

    CREATE PROCEDURE deactivate_user_plpgsql(user_id INTEGER)
    LANGUAGE plpgsql
    AS $$
    BEGIN
        UPDATE users
        SET active = false
        WHERE id = user_id;
    END;
    $$;

Виклик:

    CALL deactivate_user_plpgsql(10);

---

# 53. Procedure і COMMIT

Одна з важливих відмінностей PostgreSQL:

Procedures можуть мати можливості керування транзакціями в певних контекстах, на відміну від звичайних functions.

Наприклад, процедура може використовувати:

    COMMIT;

або:

    ROLLBACK;

за умов, дозволених PostgreSQL.

Це advanced-тема.

На початковому рівні важливіше запам'ятати:

    Function
        ↓
    повертає результат

    Procedure
        ↓
    виконує процедуру / операцію

---

# 54. Procedure і CALL

Procedure викликається:

    CALL procedure_name();

з параметрами:

    CALL procedure_name(10, 'Alice');

Не:

    SELECT procedure_name();

---

# 55. OUT parameters

PostgreSQL підтримує `OUT` та `INOUT` parameters.

Наприклад:

    CREATE FUNCTION divide_numbers(
        a NUMERIC,
        b NUMERIC,
        OUT result NUMERIC
    )
    LANGUAGE SQL
    AS $$
        SELECT a / b;
    $$;

Це advanced-механізм.

Для більшості application-level functions простіше використовувати:

    RETURNS ...

---

# 56. Function attributes

PostgreSQL має додаткові характеристики функцій.

Серед них:

    IMMUTABLE
    STABLE
    VOLATILE

Вони описують, наскільки результат функції залежить від зовнішніх даних або часу.

---

# 57. VOLATILE

За замовчуванням функції вважаються:

    VOLATILE

Це означає, що PostgreSQL не повинен припускати, що function завжди повертає однаковий результат.

Наприклад:

    random()

або функція, яка змінює дані.

---

# 58. STABLE

`STABLE` означає, що функція повертає стабільний результат у межах одного SQL-оператора.

Наприклад, функція, яка читає дані, але не змінює їх.

Це вже оптимізаційна характеристика.

---

# 59. IMMUTABLE

`IMMUTABLE` означає:

> однакові аргументи → завжди однаковий результат.

Наприклад:

    CREATE FUNCTION add_numbers(a INTEGER, b INTEGER)
    RETURNS INTEGER
    IMMUTABLE
    LANGUAGE SQL
    AS $$
        SELECT a + b;
    $$;

Для чистого математичного обчислення це логічно.

---

# 60. Чому не можна ставити IMMUTABLE всюди

Не можна просто додати:

    IMMUTABLE

до будь-якої функції.

Якщо функція читає таблицю:

    SELECT price
    FROM products;

її результат може змінюватися разом із даними таблиці.

Тому потрібно правильно описувати поведінку function.

---

# 61. Function volatility — коротко

    IMMUTABLE
        ↓
    результат залежить тільки від аргументів

    STABLE
        ↓
    стабільна в межах SQL statement

    VOLATILE
        ↓
    результат може змінюватися навіть під час виконання

Для Junior достатньо розуміти загальну ідею.

---

# 62. Function і index

Деякі functions можна використовувати в expression indexes.

Наприклад:

    CREATE INDEX users_lower_name_idx
    ON users (LOWER(name));

Тут `LOWER()` — deterministic function.

Це пов'язано з попередньою темою про indexes.

---

# 63. Function і View

Function:

    SELECT get_user_orders(10);

View:

    SELECT *
    FROM user_orders;

View зберігає SQL-запит.

Function може приймати параметри.

Наприклад:

    SELECT *
    FROM get_user_orders(10);

Тому function може бути корисною для параметризованого доступу до даних.

---

# 64. Function і Subquery

Subquery:

    SELECT *
    FROM users
    WHERE id IN (
        SELECT user_id
        FROM orders
    );

Function:

    SELECT *
    FROM get_users_with_orders();

Function дозволяє повторно використовувати складну логіку.

Але не потрібно створювати function для кожного маленького SQL-запиту.

---

# 65. Function і CTE

CTE:

    WITH active_users AS (
        SELECT *
        FROM users
        WHERE active = true
    )
    SELECT *
    FROM active_users;

CTE потрібен для конкретного SQL-запиту.

Function:

    get_active_users()

можна використовувати багато разів.

Спрощено:

    CTE
        ↓
    логіка одного запиту

    Function
        ↓
    повторно використовувана логіка

---

# 66. Function і Trigger

Trigger автоматично викликає trigger function при певній події.

Наприклад:

    INSERT
       ↓
    trigger
       ↓
    trigger function

Звичайну function викликає application або SQL:

    SELECT function();

Trigger function має спеціальний контекст виконання.

---

# 67. Functions і backend

Є два підходи.

### Логіка в backend

    React
      ↓
    Nest.js
      ↓
    PostgreSQL

Backend містить business logic.

### Частина логіки в PostgreSQL

    React
      ↓
    Nest.js
      ↓
    PostgreSQL function
      ↓
    tables

Обидва підходи можливі.

Важливо правильно визначити, де повинна знаходитися логіка.

---

# 68. Коли Function корисна в Full Stack

Хороші кандидати:

- складний reusable SQL;
- database-level calculations;
- reporting;
- агрегати;
- повторювані database operations;
- логіка, яку повинні використовувати різні клієнти;
- параметризовані SQL-запити.

---

# 69. Коли краще залишити логіку в backend

Не варто переносити в PostgreSQL абсолютно всю business logic.

Наприклад:

    HTTP authentication
    UI behavior
    email templates
    frontend validation
    зовнішні API
    application workflow

зазвичай повинні залишатися на application level.

---

# 70. Database logic vs application logic

Корисно розділяти:

    PostgreSQL
        ↓
    data integrity
    SQL
    constraints
    aggregations
    database operations

    Backend
        ↓
    business workflow
    HTTP
    authentication
    external APIs
    application services

Це не абсолютне правило, але хороша базова архітектурна модель.

---

# 71. Function для підрахунку замовлення

Практичний приклад:

    CREATE FUNCTION calculate_order_total(order_id INTEGER)
    RETURNS NUMERIC
    LANGUAGE SQL
    AS $$
        SELECT COALESCE(SUM(oi.quantity * p.price), 0)
        FROM order_items oi
        JOIN products p
            ON p.id = oi.product_id
        WHERE oi.order_id = order_id;
    $$;

Виклик:

    SELECT calculate_order_total(10);

Це хороший приклад reusable database calculation.

---

# 72. Function для кількості товарів

    CREATE FUNCTION get_product_count()
    RETURNS INTEGER
    LANGUAGE SQL
    AS $$
        SELECT COUNT(*)::INTEGER
        FROM products;
    $$;

Виклик:

    SELECT get_product_count();

---

# 73. Function для пошуку користувача

    CREATE FUNCTION find_user_by_email(user_email TEXT)
    RETURNS TABLE (
        id INTEGER,
        name TEXT,
        email TEXT
    )
    LANGUAGE SQL
    AS $$
        SELECT id, name, email
        FROM users
        WHERE email = user_email;
    $$;

Виклик:

    SELECT *
    FROM find_user_by_email('alice@example.com');

---

# 74. Function для перевірки stock

    CREATE FUNCTION has_stock(
        product_id INTEGER,
        requested_quantity INTEGER
    )
    RETURNS BOOLEAN
    LANGUAGE SQL
    AS $$
        SELECT stock >= requested_quantity
        FROM products
        WHERE id = product_id;
    $$;

Виклик:

    SELECT has_stock(10, 5);

---

# 75. Procedure для оновлення stock

    CREATE PROCEDURE increase_stock(
        product_id INTEGER,
        amount INTEGER
    )
    LANGUAGE SQL
    AS $$
        UPDATE products
        SET stock = stock + amount
        WHERE id = product_id;
    $$;

Виклик:

    CALL increase_stock(10, 5);

---

# 76. Видалення Function

Подивитися functions у `psql`:

    \df

Більш конкретно:

    \df function_name

Видалити:

    DROP FUNCTION function_name(parameter_types);

Наприклад:

    DROP FUNCTION add_numbers(INTEGER, INTEGER);

---

# 77. Перегляд Procedure у psql

У `psql` можна використовувати:

    \df

Також можна досліджувати системний каталог PostgreSQL.

Наприклад:

    SELECT
        proname,
        prokind
    FROM pg_proc;

`prokind` дозволяє розрізняти типи об'єктів.

Це вже database internals.

---

# 78. INFORMATION_SCHEMA

Для частини metadata можна використовувати `information_schema`.

Наприклад:

    SELECT *
    FROM information_schema.routines;

Це корисно для дослідження функцій і процедур.

---

# 79. SECURITY INVOKER

За замовчуванням функція виконується з правами користувача, який її викликав.

Це відповідає:

    SECURITY INVOKER

Це стандартний і безпечніший варіант для багатьох сценаріїв.

---

# 80. SECURITY DEFINER

Можна створити function:

    SECURITY DEFINER

Тоді вона виконується з правами власника функції.

Це потужний механізм, але він потребує дуже обережного використання.

Особливо важливі:

- `search_path`;
- права доступу;
- SQL injection;
- контроль об'єктів;
- owner функції.

Це advanced security topic.

---

# 81. Function і SQL injection

Не слід небезпечно конструювати SQL із неперевірених рядків.

Поганий підхід:

    dynamic_sql := 'SELECT ... ' || user_input;

Якщо потрібен dynamic SQL, потрібно використовувати безпечні механізми PostgreSQL.

У PL/pgSQL існують:

    EXECUTE

та:

    format()

але їх потрібно використовувати правильно.

---

# 82. Dynamic SQL

Приклад концепції:

    EXECUTE format(
        'SELECT * FROM %I',
        table_name
    );

`%I` використовується для identifiers.

Для значень використовують параметризацію.

Наприклад:

    EXECUTE
        'SELECT * FROM users WHERE id = $1'
    INTO result
    USING user_id;

Це advanced-тема.

---

# 83. Performance

Function не означає автоматично:

> швидше.

Function може:

- спростити повторне використання;
- централізувати логіку;
- зменшити дублювання;
- але також створити performance overhead.

Особливо потрібно бути уважним до functions, які викликаються для кожного рядка великої таблиці.

---

# 84. EXPLAIN

Як і звичайні SQL-запити, queries з functions потрібно аналізувати.

Наприклад:

    EXPLAIN ANALYZE
    SELECT calculate_order_total(10);

Але для глибокого аналізу часто потрібно досліджувати SQL усередині function.

---

# 85. Не створюй Function просто заради Function

Поганий підхід:

    CREATE FUNCTION get_all_users()
    RETURNS ...
    ...

якщо функція використовується один раз і не додає архітектурної цінності.

Необхідно запитувати:

> Чи справді цю логіку потрібно повторно використовувати або приховати за database API?

---

# 86. Function як Database API

Цікава архітектурна модель:

    Backend
       ↓
    PostgreSQL Function
       ↓
    Tables

Function може стати своєрідним API для певної частини database logic.

Наприклад:

    get_user_statistics(user_id)

    calculate_order_total(order_id)

    get_product_availability(product_id)

Це особливо цікаво для складних SQL-операцій.

---

# 87. Але таблиці все одно важливі

Не потрібно перетворювати всі таблиці на функції.

Типова система може мати:

    Tables
       ↓
    Constraints
       ↓
    Indexes
       ↓
    Views
       ↓
    Functions
       ↓
    Procedures
       ↓
    Triggers

Кожен механізм має свою задачу.

---

# 88. Практика 1 — проста Function

Створити:

    CREATE FUNCTION add_numbers(a INTEGER, b INTEGER)
    RETURNS INTEGER
    LANGUAGE SQL
    AS $$
        SELECT a + b;
    $$;

Перевірити:

    SELECT add_numbers(5, 7);

Очікувано:

    12

---

# 89. Практика 2 — Function з TEXT

Створити:

    CREATE FUNCTION greet(name TEXT)
    RETURNS TEXT
    LANGUAGE SQL
    AS $$
        SELECT 'Hello, ' || name;
    $$;

Перевірити:

    SELECT greet('Valeriy');

---

# 90. Практика 3 — Function з таблицею

Використати свою таблицю `users`.

Створити:

    get_user_name(user_id)

яка повертає ім'я користувача.

Перевірити:

    SELECT get_user_name(1);

---

# 91. Практика 4 — COUNT

Створити function:

    get_user_count()

яка повертає кількість користувачів.

Очікуваний виклик:

    SELECT get_user_count();

---

# 92. Практика 5 — RETURNS TABLE

Створити function:

    get_active_users()

яка повертає:

    id
    name
    email

тільки активних користувачів.

Виклик:

    SELECT *
    FROM get_active_users();

---

# 93. Практика 6 — PL/pgSQL

Створити:

    discount_price(price NUMERIC)

Правило:

    price >= 1000
        ↓
    discount 10%

    price < 1000
        ↓
    без discount

---

# 94. Практика 7 — Procedure

Створити procedure:

    deactivate_user(user_id)

яка встановлює:

    active = false

Виклик:

    CALL deactivate_user(1);

Перевірити:

    SELECT *
    FROM users
    WHERE id = 1;

---

# 95. Практика 8 — order total

Створити:

    calculate_order_total(order_id)

Function повинна:

1. знайти `order_items`;
2. приєднати `products`;
3. помножити `quantity * price`;
4. підсумувати;
5. повернути total.

Виклик:

    SELECT calculate_order_total(1);

---

# 96. Практика 9 — stock

Створити:

    has_stock(product_id, quantity)

Function повинна повертати:

    true

якщо товару достатньо.

І:

    false

якщо недостатньо.

---

# 97. Практика 10 — transaction + procedure

Створити procedure або database operation для:

    збільшення stock

Потім виконати:

    BEGIN;

    CALL increase_stock(10, 5);

    COMMIT;

Після цього перевірити:

    SELECT *
    FROM products
    WHERE id = 10;

---

# 98. Практика 11 — помилка

Створити function, яка не дозволяє:

    age < 0

При негативному значенні повинна виникнути помилка.

Перевірити:

    SELECT validate_age(-5);

---

# 99. Практика 12 — Function + View

Створити View:

    active_users

Потім function:

    get_active_users()

і порівняти:

    SELECT *
    FROM active_users;

та:

    SELECT *
    FROM get_active_users();

### Питання

Яка різниця?

Коли достатньо View?

Коли потрібна параметризована Function?

---

# 100. Практика 13 — Function + backend

Уяви endpoint:

    GET /users/1/orders

Backend:

    Nest.js
        ↓
    PostgreSQL
        ↓
    get_user_orders(1)

Спробуй описати:

1. який SQL приймає function;
2. що вона повертає;
3. що повертає backend;
4. який JSON отримує React.

---

# 101. Практика 14 — Database API

Створити набір functions:

    get_user_by_id(id)

    get_user_orders(id)

    calculate_order_total(id)

    get_product_stock(id)

Уявити, що Nest.js використовує їх як database API.

Це хороша вправа для розуміння меж між:

    backend
        ↔
    database

---

# 102. Типові помилки

## Помилка 1 — плутати Function і Procedure

Неправильно:

    SELECT procedure_name();

Правильно:

    CALL procedure_name();

---

## Помилка 2 — забути RETURNS

Для звичайної function потрібно визначити:

    RETURNS ...

---

## Помилка 3 — плутати BEGIN transaction і BEGIN PL/pgSQL

Транзакція:

    BEGIN;

PL/pgSQL:

    BEGIN
        ...
    END;

Це різні конструкції.

---

## Помилка 4 — використовувати цикли замість SQL

Не потрібно автоматично писати:

    FOR each row
        UPDATE row

якщо можна виконати:

    UPDATE table
    SET ...
    WHERE ...;

---

## Помилка 5 — робити function для кожного SELECT

Function повинна мати реальну користь.

---

## Помилка 6 — небезпечний dynamic SQL

Не можна просто конкатенувати неперевірений user input у SQL.

Потрібно використовувати:

    parameters
    EXECUTE
    USING
    format()

відповідно до ситуації.

---

## Помилка 7 — неправильний volatility

Не можна бездумно оголошувати функцію:

    IMMUTABLE

якщо вона читає змінні дані.

---

## Помилка 8 — переносити всю business logic у PostgreSQL

Database function — це інструмент, а не причина переносити весь backend у базу.

---

# 103. Function vs View vs Procedure vs Trigger

| Механізм | Основна задача |
|---|---|
| Table | зберігання даних |
| View | збережений SQL-запит |
| Function | повторно використовувана логіка з результатом |
| Procedure | виконання процедурної операції |
| Trigger | автоматичний запуск логіки при події |

Спрощена модель:

    Table
      ↓
    дані

    View
      ↓
    готовий запит

    Function
      ↓
    reusable logic + result

    Procedure
      ↓
    operation

    Trigger
      ↓
    automatic reaction

---

# 104. Function vs Procedure — mental model

Запам'ятай:

    Function:

    SELECT calculate_total(10);
                  ↓
               result


    Procedure:

    CALL close_order(10);
             ↓
          operation

---

# 105. Function vs Backend Service

Backend service:

    Nest.js Service
        ↓
    business logic
        ↓
    PostgreSQL

Database function:

    Nest.js Service
        ↓
    PostgreSQL Function
        ↓
    SQL

Не потрібно вибирати один підхід для всього застосунку.

Часто вони працюють разом.

---

# 106. Рекомендований порядок вивчення

Для цього розділу:

    1. CREATE FUNCTION
           ↓
    2. parameters
           ↓
    3. RETURNS
           ↓
    4. LANGUAGE SQL
           ↓
    5. SQL functions
           ↓
    6. RETURNS TABLE
           ↓
    7. PL/pgSQL
           ↓
    8. variables
           ↓
    9. IF / CASE
           ↓
    10. SELECT INTO
           ↓
    11. exceptions
           ↓
    12. CREATE PROCEDURE
           ↓
    13. CALL
           ↓
    14. Function vs Procedure
           ↓
    15. volatility
           ↓
    16. security
           ↓
    17. dynamic SQL

---

# 107. Що потрібно знати Junior

Потрібно впевнено розуміти:

- що таке PostgreSQL function;
- `CREATE FUNCTION`;
- parameters;
- `RETURNS`;
- `LANGUAGE SQL`;
- `SELECT function(...)`;
- `CREATE OR REPLACE FUNCTION`;
- `DROP FUNCTION`;
- `RETURNS TABLE`;
- базовий `PL/pgSQL`;
- `BEGIN / END` у PL/pgSQL;
- `RETURN`;
- базовий `IF`;
- що таке procedure;
- `CREATE PROCEDURE`;
- `CALL`;
- різницю між function і procedure.

---

# 108. Що потрібно знати Middle

Далі:

- складні `RETURNS TABLE`;
- `SETOF`;
- PL/pgSQL variables;
- `SELECT INTO`;
- loops;
- exceptions;
- `RAISE`;
- function volatility;
- functions + indexes;
- functions + views;
- performance;
- transaction context;
- connection/backend integration;
- security;
- `SECURITY DEFINER`;
- dynamic SQL.

---

# 109. Advanced

На наступному рівні:

- оптимізація PL/pgSQL;
- query planning для functions;
- SQL inlining;
- volatility та planner;
- `STRICT`;
- `COST`;
- `ROWS`;
- parallel safety;
- polymorphic functions;
- composite types;
- advanced dynamic SQL;
- security-definer patterns;
- transaction control у procedures;
- database API architecture.

---

# 110. Питання для самоперевірки

### Основи

1. Що таке PostgreSQL function?
2. Що таке procedure?
3. Яка різниця між ними?
4. Як створити function?
5. Як викликати function?
6. Як викликати procedure?
7. Що означає `RETURNS`?
8. Для чого потрібні parameters?
9. Що таке `LANGUAGE SQL`?
10. Що таке `LANGUAGE plpgsql`?

### PL/pgSQL

11. Для чого потрібен `DECLARE`?
12. Що робить `:=`?
13. Як працює `IF`?
14. Для чого `SELECT INTO`?
15. Що робить `RAISE EXCEPTION`?
16. Коли потрібен цикл?
17. Чому set-based SQL часто кращий за цикл?

### Архітектура

18. Чим Function відрізняється від View?
19. Чим Function відрізняється від Trigger?
20. Коли logic краще залишити в Nest.js?
21. Коли database function може бути корисною?
22. Що таке database API?

### Advanced

23. Що таке `IMMUTABLE`?
24. Що таке `STABLE`?
25. Що таке `VOLATILE`?
26. Що таке `SECURITY DEFINER`?
27. Чому dynamic SQL може бути небезпечним?
28. Як безпечно передавати параметри в dynamic SQL?

---

# 111. Головна практична модель

Потрібно бачити Functions & Procedures не просто як ще один SQL-синтаксис.

Розглядай їх як спосіб організувати database logic:

    Table
      ↓
    дані

    SQL query
      ↓
    отримання / зміна даних

    Function
      ↓
    reusable database logic

    Procedure
      ↓
    database operation

    Backend
      ↓
    application logic

---

# 112. Головна думка

Function:

    input
      ↓
    SQL / logic
      ↓
    result

Procedure:

    input
      ↓
    operations
      ↓
    side effects

Для Full Stack Developer важливо не просто знати синтаксис:

    CREATE FUNCTION
    CREATE PROCEDURE

а розуміти архітектурне питання:

> Де повинна виконуватися конкретна логіка — у PostgreSQL чи в backend?

І вже після цього вибирати:

    SQL query
    View
    Function
    Procedure
    Trigger
    Nest.js service

Це і є перехід від вивчення окремих SQL-команд до розуміння архітектури PostgreSQL та Full Stack застосунку.
# PostgreSQL Triggers

## 19. Triggers

Trigger — це механізм PostgreSQL, який дозволяє **автоматично запускати певну логіку у відповідь на подію в таблиці або іншому об'єкті бази даних**.

Головна ідея:

    INSERT
       ↓
    Trigger
       ↓
    Trigger Function
       ↓
    додаткова логіка

Або:

    UPDATE
       ↓
    Trigger
       ↓
    автоматично оновити updated_at

Trigger відрізняється від звичайної function тим, що application або SQL-запит не повинен явно викликати trigger.

---

# 1. Що таке Trigger

Trigger — це правило:

> "Коли відбувається певна подія, автоматично виконай певну функцію."

Наприклад:

    UPDATE users
       ↓
    trigger
       ↓
    update updated_at

Або:

    INSERT INTO orders
       ↓
    trigger
       ↓
    записати audit log

---

# 2. Trigger не є Function

Це дуже важливо.

Function:

    SELECT calculate_total(10);

Application або SQL явно викликає function.

Trigger:

    INSERT INTO users (...);

Trigger автоматично запускає trigger function.

Тобто:

    Function
        ↓
    викликається явно

    Trigger
        ↓
    викликається автоматично

---

# 3. Trigger Function

У PostgreSQL trigger працює разом із спеціальною функцією.

Схема:

    Event
      ↓
    Trigger
      ↓
    Trigger Function
      ↓
    Logic

Тому зазвичай потрібно створити:

1. trigger function;
2. trigger.

---

# 4. Найпростіший приклад

Нехай є:

    users

    id
    name
    created_at
    updated_at

Хочемо автоматично оновлювати:

    updated_at

при кожному `UPDATE`.

Створимо trigger function:

    CREATE FUNCTION set_updated_at()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
        NEW.updated_at := CURRENT_TIMESTAMP;

        RETURN NEW;
    END;
    $$;

Потім створимо trigger:

    CREATE TRIGGER users_set_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

Тепер:

    UPDATE users
    SET name = 'Alice'
    WHERE id = 1;

автоматично викличе:

    set_updated_at()

---

# 5. NEW

У trigger function PostgreSQL надає спеціальні змінні.

Одна з найважливіших:

    NEW

`NEW` — це новий стан рядка.

Наприклад:

    NEW.name

означає значення `name` нового рядка.

---

# 6. OLD

Інша спеціальна змінна:

    OLD

`OLD` — це попередній стан рядка.

Наприклад:

    OLD.name

означає старе значення `name`.

---

# 7. NEW vs OLD

При `INSERT`:

    NEW → доступний
    OLD → недоступний

При `UPDATE`:

    NEW → новий рядок
    OLD → старий рядок

При `DELETE`:

    NEW → недоступний
    OLD → старий рядок

Схема:

    INSERT
       ↓
      NEW

    UPDATE
       ↓
    OLD + NEW

    DELETE
       ↓
      OLD

---

# 8. RETURN NEW

Для `BEFORE` trigger на `INSERT` або `UPDATE` trigger function часто повертає:

    RETURN NEW;

Це означає:

> продовжити операцію з цим новим рядком.

Наприклад:

    CREATE FUNCTION set_updated_at()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
        NEW.updated_at := CURRENT_TIMESTAMP;

        RETURN NEW;
    END;
    $$;

---

# 9. RETURN OLD

Для `DELETE` trigger часто використовується:

    RETURN OLD;

Наприклад:

    CREATE FUNCTION log_deleted_user()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
        INSERT INTO deleted_users_log (user_id, deleted_at)
        VALUES (OLD.id, CURRENT_TIMESTAMP);

        RETURN OLD;
    END;
    $$;

---

# 10. RETURN NULL

У `BEFORE` row-level trigger:

    RETURN NULL;

може означати:

> не виконувати операцію для цього рядка.

Наприклад:

    CREATE FUNCTION prevent_delete()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
        RETURN NULL;
    END;
    $$;

Такий trigger може блокувати видалення.

---

# 11. CREATE TRIGGER

Загальна структура:

    CREATE TRIGGER trigger_name
    { BEFORE | AFTER | INSTEAD OF }
    { event }
    ON table_name
    FOR EACH { ROW | STATEMENT }
    EXECUTE FUNCTION function_name();

Наприклад:

    CREATE TRIGGER users_set_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

---

# 12. Trigger events

Основні події:

    INSERT
    UPDATE
    DELETE

Також можна комбінувати:

    INSERT OR UPDATE

або:

    INSERT OR UPDATE OR DELETE

---

# 13. INSERT Trigger

Наприклад:

    CREATE TRIGGER users_before_insert
    BEFORE INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION some_function();

Trigger спрацює перед вставкою кожного нового рядка.

---

# 14. UPDATE Trigger

    CREATE TRIGGER users_before_update
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION some_function();

Trigger спрацює перед оновленням.

---

# 15. DELETE Trigger

    CREATE TRIGGER users_after_delete
    AFTER DELETE ON users
    FOR EACH ROW
    EXECUTE FUNCTION some_function();

Trigger спрацює після видалення.

---

# 16. BEFORE Trigger

`BEFORE` запускається перед основною операцією.

Наприклад:

    UPDATE users
    SET name = 'Alice'
    WHERE id = 1;

порядок:

    UPDATE
       ↓
    BEFORE trigger
       ↓
    actual update

Це корисно, коли потрібно змінити `NEW`.

---

# 17. AFTER Trigger

`AFTER` запускається після основної операції.

Схема:

    UPDATE
       ↓
    actual update
       ↓
    AFTER trigger

Це добре підходить для:

- audit;
- logging;
- додаткових дій;
- синхронізації пов'язаних даних.

---

# 18. INSTEAD OF Trigger

`INSTEAD OF` використовується переважно з views.

Ідея:

> замість стандартної операції виконай trigger logic.

Наприклад:

    INSERT INTO some_view (...)

може бути перехоплений:

    INSTEAD OF INSERT

Це advanced-тема.

---

# 19. FOR EACH ROW

Row-level trigger виконується для кожного рядка.

Наприклад:

    UPDATE users
    SET active = false;

Якщо змінено 100 рядків:

    FOR EACH ROW

може викликати trigger:

    100 разів

---

# 20. FOR EACH STATEMENT

Statement-level trigger запускається один раз для всієї SQL-команди.

Наприклад:

    UPDATE users
    SET active = false;

Навіть якщо змінено:

    1000 rows

trigger:

    FOR EACH STATEMENT

виконається один раз.

---

# 21. ROW vs STATEMENT

| ROW | STATEMENT |
|---|---|
| для кожного рядка | один раз для SQL-команди |
| має `NEW` / `OLD` | не має row-level `NEW` / `OLD` |
| зручно змінювати конкретний рядок | зручно реагувати на сам факт операції |
| може виконатися багато разів | виконується один раз |

---

# 22. Найважливіша комбінація для початку

Найчастіше для практичних задач зустрічатимеш:

    BEFORE UPDATE
    FOR EACH ROW

Наприклад:

    CREATE TRIGGER users_set_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

---

# 23. Автоматичний updated_at

Це один із найкращих перших практичних прикладів.

Таблиця:

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

Trigger function:

    CREATE FUNCTION set_updated_at()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
        NEW.updated_at := CURRENT_TIMESTAMP;

        RETURN NEW;
    END;
    $$;

Trigger:

    CREATE TRIGGER users_set_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

Тепер `updated_at` оновлюється автоматично.

---

# 24. Перевірка updated_at

До зміни:

    SELECT *
    FROM users
    WHERE id = 1;

Оновлення:

    UPDATE users
    SET name = 'New Name'
    WHERE id = 1;

Після:

    SELECT *
    FROM users
    WHERE id = 1;

Подивись на:

    updated_at

---

# 25. Audit Log

Одна з найкорисніших задач trigger — аудит.

Наприклад:

    users

і:

    users_audit

У `users_audit` можна зберігати:

    user_id
    old_name
    new_name
    changed_at

---

# 26. Audit table

Приклад:

    CREATE TABLE users_audit (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        old_name TEXT,
        new_name TEXT,
        changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

---

# 27. Audit trigger function

    CREATE FUNCTION audit_user_name_change()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
        IF OLD.name IS DISTINCT FROM NEW.name THEN
            INSERT INTO users_audit (
                user_id,
                old_name,
                new_name
            )
            VALUES (
                OLD.id,
                OLD.name,
                NEW.name
            );
        END IF;

        RETURN NEW;
    END;
    $$;

---

# 28. Audit trigger

    CREATE TRIGGER users_name_audit
    AFTER UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION audit_user_name_change();

Тепер:

    UPDATE users
    SET name = 'Bob'
    WHERE id = 1;

автоматично створить запис у:

    users_audit

---

# 29. IS DISTINCT FROM

У попередньому прикладі:

    OLD.name IS DISTINCT FROM NEW.name

використовується замість:

    OLD.name <> NEW.name

Причина — `NULL`.

`IS DISTINCT FROM` коректно враховує `NULL`.

Наприклад:

    NULL IS DISTINCT FROM 'Alice'

результат:

    true

Це дуже корисний PostgreSQL оператор.

---

# 30. Audit DELETE

Можна записувати інформацію про видалені рядки.

Наприклад:

    CREATE FUNCTION audit_user_delete()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
        INSERT INTO users_audit (
            user_id,
            old_name,
            changed_at
        )
        VALUES (
            OLD.id,
            OLD.name,
            CURRENT_TIMESTAMP
        );

        RETURN OLD;
    END;
    $$;

Trigger:

    CREATE TRIGGER users_delete_audit
    AFTER DELETE ON users
    FOR EACH ROW
    EXECUTE FUNCTION audit_user_delete();

---

# 31. Audit INSERT

Так само можна записувати створення.

    CREATE FUNCTION audit_user_insert()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
        INSERT INTO users_audit (
            user_id,
            new_name,
            changed_at
        )
        VALUES (
            NEW.id,
            NEW.name,
            CURRENT_TIMESTAMP
        );

        RETURN NEW;
    END;
    $$;

---

# 32. INSERT + UPDATE + DELETE

Можна мати один trigger для кількох подій:

    CREATE TRIGGER users_audit
    AFTER INSERT OR UPDATE OR DELETE
    ON users
    FOR EACH ROW
    EXECUTE FUNCTION audit_users();

У функції можна перевіряти:

    TG_OP

---

# 33. TG_OP

`TG_OP` — спеціальна змінна trigger function.

Вона містить назву операції:

    INSERT
    UPDATE
    DELETE
    TRUNCATE

Наприклад:

    IF TG_OP = 'INSERT' THEN
        ...
    END IF;

---

# 34. Приклад TG_OP

    CREATE FUNCTION audit_users()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            INSERT INTO users_audit (user_id, new_name)
            VALUES (NEW.id, NEW.name);

            RETURN NEW;
        END IF;

        IF TG_OP = 'UPDATE' THEN
            INSERT INTO users_audit (
                user_id,
                old_name,
                new_name
            )
            VALUES (
                OLD.id,
                OLD.name,
                NEW.name
            );

            RETURN NEW;
        END IF;

        IF TG_OP = 'DELETE' THEN
            INSERT INTO users_audit (
                user_id,
                old_name
            )
            VALUES (
                OLD.id,
                OLD.name
            );

            RETURN OLD;
        END IF;

        RETURN NULL;
    END;
    $$;

---

# 35. TG_TABLE_NAME

Trigger function може знати назву таблиці:

    TG_TABLE_NAME

Наприклад:

    RAISE NOTICE 'Table: %', TG_TABLE_NAME;

---

# 36. TG_OP та TG_TABLE_NAME

Корисні спеціальні змінні:

    TG_OP
        ↓
    INSERT / UPDATE / DELETE / TRUNCATE

    TG_TABLE_NAME
        ↓
    назва таблиці

    TG_NAME
        ↓
    назва trigger

Це корисно для generic audit functions.

---

# 37. Trigger arguments

Trigger може передавати аргументи функції:

    CREATE TRIGGER trigger_name
    AFTER INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION some_function('users');

У функції їх можна отримати через:

    TG_ARGV

Це advanced-механізм для reusable triggers.

---

# 38. Trigger і validation

Trigger може використовуватися для перевірок.

Наприклад:

    CREATE FUNCTION validate_product_price()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
        IF NEW.price < 0 THEN
            RAISE EXCEPTION 'Price cannot be negative';
        END IF;

        RETURN NEW;
    END;
    $$;

Trigger:

    CREATE TRIGGER products_validate_price
    BEFORE INSERT OR UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION validate_product_price();

---

# 39. Але CHECK часто кращий

Для простого правила:

    price >= 0

краще використовувати:

    CHECK (price >= 0)

а не trigger.

Наприклад:

    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price NUMERIC CHECK (price >= 0)
    );

Правило:

> Якщо constraint може виразити правило просто і прозоро — зазвичай краще використати constraint.

---

# 40. Trigger для складної логіки

Trigger стає цікавішим, коли правило не дуже зручно виразити через constraint.

Наприклад:

- audit;
- автоматичний timestamp;
- складна синхронізація;
- історія змін;
- автоматичне створення пов'язаних записів.

---

# 41. Trigger для автоматичного запису history

Наприклад:

    products

і:

    product_price_history

При зміні ціни:

    UPDATE products
    SET price = 120
    WHERE id = 10;

trigger може автоматично створити:

    product_price_history

із:

    old_price
    new_price
    changed_at

---

# 42. Приклад history table

    CREATE TABLE product_price_history (
        id SERIAL PRIMARY KEY,
        product_id INTEGER NOT NULL,
        old_price NUMERIC,
        new_price NUMERIC,
        changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

---

# 43. History trigger function

    CREATE FUNCTION save_price_history()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
        IF OLD.price IS DISTINCT FROM NEW.price THEN
            INSERT INTO product_price_history (
                product_id,
                old_price,
                new_price
            )
            VALUES (
                OLD.id,
                OLD.price,
                NEW.price
            );
        END IF;

        RETURN NEW;
    END;
    $$;

---

# 44. History trigger

    CREATE TRIGGER products_price_history
    AFTER UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION save_price_history();

---

# 45. Trigger і soft delete

Soft delete означає:

> не видаляти рядок фізично, а позначити його як deleted.

Наприклад:

    deleted_at TIMESTAMP

Замість:

    DELETE FROM users
    WHERE id = 10;

можна:

    UPDATE users
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE id = 10;

Trigger може допомагати автоматизувати подібну поведінку, але часто soft delete краще контролювати на application level або через database design.

---

# 46. Trigger для створення пов'язаного запису

Наприклад:

    INSERT INTO users

може автоматично створювати:

    user_settings

Trigger:

    INSERT users
       ↓
    trigger
       ↓
    INSERT user_settings

Це можливо, але треба уважно оцінювати архітектурні наслідки.

---

# 47. Trigger і cascading logic

Trigger може запускати додаткові SQL-операції.

Наприклад:

    UPDATE users
       ↓
    trigger
       ↓
    INSERT audit
       ↓
    trigger
       ↓
    UPDATE another_table

У результаті може виникнути складний ланцюг.

Тому triggers потрібно використовувати обережно.

---

# 48. Trigger recursion

Trigger може непрямо викликати сам себе.

Наприклад:

    UPDATE table_a
       ↓
    trigger
       ↓
    UPDATE table_a
       ↓
    trigger
       ↓
    ...

Це може створити рекурсію або небажані побічні ефекти.

Тому trigger logic повинна бути простою та передбачуваною.

---

# 49. Trigger order

На одну таблицю може бути встановлено декілька triggers.

Наприклад:

    BEFORE UPDATE trigger A
    BEFORE UPDATE trigger B
    AFTER UPDATE trigger C

PostgreSQL має правила визначення порядку виконання triggers.

Для triggers одного типу порядок може залежати від імені trigger.

Тому не варто будувати критичну логіку так, щоб вона випадково залежала від неочевидного порядку.

---

# 50. WHEN

Trigger може мати умову:

    WHEN (...)

Наприклад:

    CREATE TRIGGER users_name_audit
    AFTER UPDATE ON users
    FOR EACH ROW
    WHEN (OLD.name IS DISTINCT FROM NEW.name)
    EXECUTE FUNCTION audit_user_name_change();

Тоді trigger запускатиметься лише за потрібної умови.

---

# 51. BEFORE UPDATE + WHEN

Наприклад:

    CREATE TRIGGER products_price_history
    AFTER UPDATE OF price ON products
    FOR EACH ROW
    WHEN (OLD.price IS DISTINCT FROM NEW.price)
    EXECUTE FUNCTION save_price_history();

Тут:

    UPDATE OF price

означає, що trigger реагує на `UPDATE`, який містить зміну колонки `price`.

А `WHEN` додатково перевіряє фактичну відмінність значень.

---

# 52. UPDATE OF column

Можна створити trigger:

    CREATE TRIGGER users_name_changed
    AFTER UPDATE OF name ON users
    FOR EACH ROW
    EXECUTE FUNCTION audit_user_name_change();

Він призначений для `UPDATE`, який стосується `name`.

Але важливо:

> `UPDATE OF name` не гарантує, що значення реально змінилося.

Наприклад:

    UPDATE users
    SET name = name;

Тому для фактичної зміни часто потрібна додаткова перевірка:

    OLD.name IS DISTINCT FROM NEW.name

---

# 53. TRUNCATE Trigger

PostgreSQL також підтримує trigger для:

    TRUNCATE

Наприклад:

    CREATE TRIGGER users_truncate_log
    AFTER TRUNCATE ON users
    FOR EACH STATEMENT
    EXECUTE FUNCTION log_truncate();

Це спеціалізована можливість.

---

# 54. Trigger і transaction

Triggers виконуються в контексті SQL-операції та транзакції.

Наприклад:

    BEGIN;

    UPDATE users
    SET name = 'Alice'
    WHERE id = 1;

    COMMIT;

Якщо trigger створив audit-запис, він також є частиною цієї транзакції.

---

# 55. Trigger + ROLLBACK

Наприклад:

    BEGIN;

    UPDATE users
    SET name = 'Alice'
    WHERE id = 1;

    ROLLBACK;

Якщо trigger створив audit-запис під час цього `UPDATE`, цей audit-запис також буде скасований разом із транзакцією.

Це дуже важлива властивість.

---

# 56. Trigger не створює незалежну транзакцію

Потрібно запам'ятати:

    UPDATE
       ↓
    Trigger
       ↓
    Trigger Function
       ↓
    INSERT audit

усе це відбувається в межах поточної транзакції.

Trigger не є автоматично окремою незалежною транзакцією.

---

# 57. Trigger і errors

Якщо trigger function генерує:

    RAISE EXCEPTION

основна SQL-операція також може завершитися помилкою.

Наприклад:

    UPDATE products
    SET price = -100
    WHERE id = 1;

Trigger:

    IF NEW.price < 0 THEN
        RAISE EXCEPTION 'Price cannot be negative';
    END IF;

У результаті `UPDATE` буде відхилено.

---

# 58. Trigger як database protection

Це одна з сильних сторін triggers.

Application може помилитися:

    Backend
       ↓
    неправильний UPDATE
       ↓
    PostgreSQL trigger
       ↓
    operation rejected

Але не варто використовувати trigger як заміну всім constraints.

---

# 59. Constraint vs Trigger

### Constraint

Добре підходить для:

    NOT NULL
    UNIQUE
    PRIMARY KEY
    FOREIGN KEY
    CHECK

### Trigger

Добре підходить для:

    audit
    history
    автоматичні timestamp
    складна реакція на зміни
    автоматичні side effects

Правило:

> Спочатку constraint, якщо constraint достатній. Trigger — коли потрібна поведінка, а не просто правило.

---

# 60. Trigger vs Function

Function:

    SELECT calculate_total(10);

Trigger:

    UPDATE products
    SET price = 100
    WHERE id = 10;

    ↓

    trigger automatically runs

---

# 61. Trigger vs Procedure

Procedure:

    CALL deactivate_user(10);

Trigger:

    UPDATE users
    SET active = false
    WHERE id = 10;

    ↓

    trigger automatically runs

Procedure викликається явно.

Trigger запускається через подію.

---

# 62. Trigger vs View

View:

    SELECT *
    FROM active_users;

Trigger:

    UPDATE users
    SET active = false
    WHERE id = 10;

View відповідає на питання:

> Які дані показати?

Trigger:

> Що автоматично зробити після/перед зміною даних?

---

# 63. Trigger vs Transactions

Transaction:

    BEGIN
    SQL
    SQL
    COMMIT

Trigger:

    SQL
      ↓
    automatic logic

Вони можуть працювати разом:

    BEGIN
       ↓
    UPDATE
       ↓
    trigger
       ↓
    audit
       ↓
    COMMIT

---

# 64. Trigger і backend

У Full Stack застосунку:

    React
       ↓
    Next.js
       ↓
    Nest.js
       ↓
    PostgreSQL
       ↓
    UPDATE users
       ↓
    Trigger
       ↓
    audit / updated_at

Backend може навіть не знати, що trigger виконав додаткову операцію.

Саме тому triggers одночасно дуже потужні та потенційно небезпечні для прозорості архітектури.

---

# 65. Прихована логіка

Уявімо backend:

    UPDATE users
    SET name = 'Alice'
    WHERE id = 1;

На перший погляд це проста операція.

Але database може виконати:

    UPDATE users
       ↓
    trigger 1
       ↓
    update updated_at
       ↓
    trigger 2
       ↓
    INSERT audit
       ↓
    trigger 3
       ↓
    UPDATE statistics

Тому triggers можуть створювати "приховану" поведінку.

---

# 66. Головний недолік triggers

Trigger logic не видно безпосередньо в SQL-запиті application.

Backend developer може написати:

    UPDATE products
    SET price = 100;

але не знати, що database додатково:

    INSERT INTO history
    UPDATE statistics
    INSERT INTO audit

Тому triggers потрібно документувати.

---

# 67. Коли trigger — хороша ідея

Добрі сценарії:

### `updated_at`

    UPDATE
       ↓
    automatic timestamp

### Audit

    UPDATE
       ↓
    audit log

### History

    price change
       ↓
    history record

### Database-level invariant

    INSERT / UPDATE
       ↓
    complex validation

---

# 68. Коли trigger може бути поганою ідеєю

Не варто без необхідності використовувати triggers для:

- складної application business logic;
- HTTP requests;
- викликів зовнішніх API;
- email sending;
- складних workflow;
- логіки, яку важко побачити з backend;
- великої кількості прихованих side effects.

Наприклад, не варто робити:

    INSERT order
       ↓
    trigger
       ↓
    external HTTP API

Database не повинна залежати від мережевого API таким способом.

---

# 69. Trigger і зовнішні API

Trigger не повинен бути способом сказати:

    "після INSERT відправ HTTP request".

Це створює сильну залежність:

    PostgreSQL
       ↓
    network
       ↓
    external service

Краще:

    PostgreSQL
       ↓
    transaction
       ↓
    backend
       ↓
    external API

або використовувати спеціальні асинхронні архітектурні механізми.

---

# 70. Performance

Trigger автоматично додає роботу до SQL-операції.

Наприклад:

    UPDATE 100000 rows

може викликати:

    trigger × 100000

якщо це:

    FOR EACH ROW

Тому row-level triggers повинні бути максимально легкими.

---

# 71. Trigger і масовий UPDATE

Наприклад:

    UPDATE products
    SET updated_at = CURRENT_TIMESTAMP;

Якщо:

    1 000 000 rows

і є:

    FOR EACH ROW

trigger:

    виконається 1 000 000 разів

Це потрібно враховувати.

---

# 72. Trigger може впливати на performance

Під час аналізу повільного:

    INSERT
    UPDATE
    DELETE

необхідно пам'ятати про triggers.

Проблема може бути не в самому SQL-запиті, а в trigger function.

---

# 73. Trigger і EXPLAIN

`EXPLAIN ANALYZE` може показувати інформацію про trigger execution.

Наприклад:

    EXPLAIN ANALYZE
    UPDATE products
    SET price = price + 10
    WHERE id = 10;

У результаті можна побачити додаткову інформацію про triggers.

---

# 74. Disable trigger

Для адміністративних або спеціальних сценаріїв PostgreSQL дозволяє тимчасово вимикати triggers.

Наприклад:

    ALTER TABLE users
    DISABLE TRIGGER users_set_updated_at;

Увімкнути:

    ALTER TABLE users
    ENABLE TRIGGER users_set_updated_at;

Це потужна адміністративна можливість.

Не слід використовувати її без чіткого розуміння наслідків.

---

# 75. Disable ALL triggers

Можна:

    ALTER TABLE users
    DISABLE TRIGGER ALL;

І:

    ALTER TABLE users
    ENABLE TRIGGER ALL;

Це особливо небезпечно, якщо triggers забезпечують важливу цілісність або аудит.

---

# 76. DROP TRIGGER

Видалення trigger:

    DROP TRIGGER users_set_updated_at
    ON users;

Безпечніший варіант:

    DROP TRIGGER IF EXISTS users_set_updated_at
    ON users;

Важливо:

> Trigger належить конкретній таблиці, тому при `DROP TRIGGER` потрібно вказати `ON table_name`.

---

# 77. CREATE OR REPLACE для Trigger

Для trigger немає такого самого:

    CREATE OR REPLACE TRIGGER

як для function.

Якщо потрібно суттєво змінити trigger definition, зазвичай:

    DROP TRIGGER ...

потім:

    CREATE TRIGGER ...

А trigger function можна змінити через:

    CREATE OR REPLACE FUNCTION ...

---

# 78. Перегляд triggers

У `psql` можна досліджувати структуру таблиці:

    \d users

У результаті можна побачити:

    Triggers:

    users_set_updated_at
    users_name_audit

Також можна досліджувати системні каталоги PostgreSQL.

---

# 79. Information Schema

Для частини metadata можна використовувати:

    information_schema

Але PostgreSQL-specific інформацію часто зручніше отримувати із системних каталогів.

Наприклад:

    pg_trigger

містить інформацію про triggers.

---

# 80. pg_trigger

Для дослідження:

    SELECT
        tgname,
        tgenabled
    FROM pg_trigger
    WHERE tgrelid = 'users'::regclass;

Це вже PostgreSQL internals.

Для Junior достатньо знати:

    \d table_name

---

# 81. Naming

Хороші назви:

    users_set_updated_at

    users_audit_update

    products_price_history

    products_validate_price

Погані:

    trigger1

    trigger2

    test_trigger

Назва повинна показувати:

    table + action/purpose

---

# 82. Trigger Function naming

Наприклад:

    set_updated_at()

    audit_user_change()

    save_price_history()

    validate_product_price()

З назви повинно бути зрозуміло:

> Що робить функція?

---

# 83. Практика 1 — updated_at

Створити таблицю:

    CREATE TABLE trigger_users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

Створити:

    set_updated_at()

Створити:

    trigger_users_set_updated_at

Перевірити автоматичне оновлення `updated_at`.

---

# 84. Практика 2 — NEW

Створити trigger function, яка при `INSERT` змінює значення:

    NEW.name

Наприклад, автоматично перетворює ім'я на uppercase:

    NEW.name := UPPER(NEW.name);

Потім:

    INSERT INTO trigger_users (name)
    VALUES ('alice');

Перевірити:

    SELECT *
    FROM trigger_users;

Очікувано:

    ALICE

---

# 85. Практика 3 — OLD

Створити audit table.

При `DELETE` записувати:

    OLD.id
    OLD.name
    deleted_at

Перевірити:

    DELETE FROM trigger_users
    WHERE id = 1;

Потім:

    SELECT *
    FROM trigger_users_audit;

---

# 86. Практика 4 — OLD + NEW

Створити:

    trigger_users_audit

При зміні імені записувати:

    old_name
    new_name

Перевірити:

    UPDATE trigger_users
    SET name = 'Bob'
    WHERE id = 1;

Потім:

    SELECT *
    FROM trigger_users_audit;

---

# 87. Практика 5 — validation

Створити:

    trigger_products

із:

    price NUMERIC

Створити trigger, який забороняє:

    price < 0

Спробувати:

    INSERT INTO trigger_products (price)
    VALUES (-10);

Очікувати помилку.

Після цього подумати:

> Чи не краще тут використати CHECK?

---

# 88. Практика 6 — history

Створити:

    trigger_products

і:

    trigger_product_price_history

Trigger повинен записувати зміну:

    old_price
    new_price

при зміні ціни.

---

# 89. Практика 7 — FOR EACH ROW

Створити кілька записів:

    INSERT INTO trigger_users (name)
    VALUES
        ('Alice'),
        ('Bob'),
        ('Charlie');

Потім:

    UPDATE trigger_users
    SET name = UPPER(name);

Перевірити, скільки разів спрацював row-level trigger.

---

# 90. Практика 8 — FOR EACH STATEMENT

Створити statement-level trigger, який записує в log:

    "users were updated"

Виконати:

    UPDATE trigger_users
    SET name = UPPER(name);

Навіть якщо оновлено 100 рядків, trigger повинен спрацювати один раз.

---

# 91. Практика 9 — WHEN

Створити trigger:

    AFTER UPDATE

але запускати його тільки тоді, коли реально змінився:

    price

Використати:

    WHEN (...)

Перевірити різницю між:

    SET price = price

і:

    SET price = price + 10

---

# 92. Практика 10 — TG_OP

Створити один trigger для:

    INSERT OR UPDATE OR DELETE

У trigger function використати:

    TG_OP

Записувати в audit:

    INSERT
    UPDATE
    DELETE

Перевірити всі три операції.

---

# 93. Практика 11 — transaction + trigger

Почати:

    BEGIN;

Виконати:

    UPDATE trigger_users
    SET name = 'Alice'
    WHERE id = 1;

Перевірити audit:

    SELECT *
    FROM trigger_users_audit;

Потім:

    ROLLBACK;

Знову:

    SELECT *
    FROM trigger_users_audit;

### Питання

Чи залишився audit-запис?

Це важлива демонстрація того, що trigger працює в межах транзакції.

---

# 94. Практика 12 — trigger + backend thinking

Уяви endpoint:

    PATCH /users/1

Backend виконує:

    UPDATE users
    SET name = 'Alice'
    WHERE id = 1;

Database trigger:

    BEFORE UPDATE
       ↓
    updated_at

і:

    AFTER UPDATE
       ↓
    audit

Опиши весь ланцюжок:

    HTTP
      ↓
    Nest.js
      ↓
    SQL
      ↓
    BEFORE trigger
      ↓
    UPDATE
      ↓
    AFTER trigger
      ↓
    COMMIT

---

# 95. Практика 13 — визначити, що краще

Для кожної задачі вибери:

    CHECK
    Function
    Trigger
    Backend

### Задача 1

    price >= 0

### Задача 2

    автоматично записати updated_at

### Задача 3

    відправити email після реєстрації

### Задача 4

    записати історію зміни ціни

### Задача 5

    перевірити складне бізнес-правило

Ця вправа важливіша за запам'ятовування синтаксису.

---

# 96. Типові помилки

## Помилка 1 — думати, що trigger сам містить logic

Trigger лише визначає:

    коли
    ↓
    яку function

Основна логіка знаходиться в trigger function.

---

## Помилка 2 — плутати NEW і OLD

    INSERT → NEW

    UPDATE → OLD + NEW

    DELETE → OLD

---

## Помилка 3 — неправильний RETURN

Для row-level `BEFORE` trigger потрібно правильно повертати:

    NEW

або:

    OLD

або:

    NULL

залежно від операції та задуму.

---

## Помилка 4 — trigger замість CHECK

Якщо правило просте:

    price >= 0

краще:

    CHECK (price >= 0)

а не trigger.

---

## Помилка 5 — занадто багато triggers

Наприклад:

    INSERT
       ↓
    trigger 1
       ↓
    trigger 2
       ↓
    trigger 3
       ↓
    trigger 4

Це швидко робить систему важкою для розуміння.

---

## Помилка 6 — прихована business logic

Не потрібно ховати складну бізнес-логіку в triggers без вагомої причини.

---

## Помилка 7 — row-level trigger на мільйони рядків

    UPDATE 1,000,000 rows
       ↓
    trigger × 1,000,000

Це може бути дорого.

---

## Помилка 8 — HTTP/API у trigger

Database trigger не повинен перетворювати PostgreSQL на HTTP client.

---

# 97. Trigger architecture

Хороша модель:

    Table
      ↓
    Event
      ↓
    Trigger
      ↓
    Trigger Function
      ↓
    Small predictable action

Наприклад:

    products
      ↓
    UPDATE price
      ↓
    products_price_history
      ↓
    save_price_history()

---

# 98. Trigger + Constraints + Transactions

Ці механізми доповнюють один одного.

    Constraints
        ↓
    гарантують правила даних

    Transactions
        ↓
    гарантують атомарність операцій

    Triggers
        ↓
    автоматично реагують на події

Разом:

    Database integrity
          +
    Atomic operations
          +
    Automatic reactions

---

# 99. Trigger у повному Full Stack сценарії

Наприклад:

    React
       ↓
    PATCH /products/10
       ↓
    Nest.js
       ↓
    UPDATE products
       ↓
    BEFORE UPDATE trigger
       ↓
    перевірити / змінити NEW
       ↓
    UPDATE
       ↓
    AFTER UPDATE trigger
       ↓
    записати history
       ↓
    COMMIT
       ↓
    Nest.js response
       ↓
    React

Це вже реальна архітектура Full Stack + PostgreSQL.

---

# 100. Що потрібно знати Junior

Потрібно впевнено розуміти:

- що таке trigger;
- що таке trigger function;
- `CREATE TRIGGER`;
- `CREATE FUNCTION ... RETURNS TRIGGER`;
- `BEFORE`;
- `AFTER`;
- `INSERT`;
- `UPDATE`;
- `DELETE`;
- `FOR EACH ROW`;
- `FOR EACH STATEMENT`;
- `NEW`;
- `OLD`;
- `RETURN NEW`;
- `RETURN OLD`;
- базове `TG_OP`;
- `DROP TRIGGER`;
- чому trigger працює в межах транзакції;
- коли trigger доречний;
- чому trigger може бути небезпечним через приховану логіку.

---

# 101. Що потрібно знати Middle

Далі:

- `WHEN`;
- `UPDATE OF`;
- `TG_OP`;
- `TG_TABLE_NAME`;
- `TG_NAME`;
- `TG_ARGV`;
- statement-level triggers;
- row-level triggers;
- trigger order;
- trigger recursion;
- performance;
- audit architecture;
- history tables;
- triggers + transactions;
- triggers + constraints;
- `INSTEAD OF`;
- trigger management;
- debugging.

---

# 102. Advanced

На наступному рівні:

- transition tables;
- statement-level auditing;
- complex trigger chains;
- deferred constraint triggers;
- partitioned tables;
- trigger behavior with inheritance;
- replication considerations;
- logical replication;
- trigger performance analysis;
- generic audit framework;
- security implications;
- event-driven database architecture.

---

# 103. Питання для самоперевірки

### Основи

1. Що таке trigger?
2. Чим trigger відрізняється від function?
3. Що таке trigger function?
4. Для чого `CREATE TRIGGER`?
5. Які основні trigger events?
6. Що таке `BEFORE`?
7. Що таке `AFTER`?
8. Що таке `FOR EACH ROW`?
9. Що таке `FOR EACH STATEMENT`?

### NEW / OLD

10. Що таке `NEW`?
11. Що таке `OLD`?
12. Що доступно при `INSERT`?
13. Що доступно при `UPDATE`?
14. Що доступно при `DELETE`?
15. Навіщо `RETURN NEW`?
16. Навіщо `RETURN OLD`?
17. Що означає `RETURN NULL` у BEFORE row trigger?

### Архітектура

18. Коли trigger кращий за CHECK?
19. Коли logic краще залишити в Nest.js?
20. Чому triggers можуть створювати приховану логіку?
21. Чому не варто робити HTTP request із trigger?
22. Як trigger взаємодіє з transaction?
23. Що відбудеться з audit-записом trigger після `ROLLBACK`?

### Performance

24. Що станеться, якщо `FOR EACH ROW` trigger працює при UPDATE мільйона рядків?
25. Як trigger може вплинути на performance?
26. Як досліджувати triggers таблиці?
27. Для чого потрібен `WHEN`?

---

# 104. Шпаргалка

## Створити trigger function

    CREATE FUNCTION function_name()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
        ...
        RETURN NEW;
    END;
    $$;

## Створити trigger

    CREATE TRIGGER trigger_name
    BEFORE UPDATE ON table_name
    FOR EACH ROW
    EXECUTE FUNCTION function_name();

## NEW

    NEW.column_name

Новий стан рядка.

## OLD

    OLD.column_name

Попередній стан рядка.

## INSERT

    NEW

## UPDATE

    OLD
    NEW

## DELETE

    OLD

## Видалити trigger

    DROP TRIGGER trigger_name
    ON table_name;

## Перевірити triggers

    \d table_name

## Умова

    WHEN (...)

## Операція

    TG_OP

---

# 105. Mental model

Запам'ятай:

    SQL operation
          ↓
    ┌─────────────────┐
    │     Trigger     │
    └─────────────────┘
          ↓
    Trigger Function
          ↓
    automatic logic

Наприклад:

    UPDATE products
          ↓
    BEFORE trigger
          ↓
    NEW.price validation
          ↓
    UPDATE
          ↓
    AFTER trigger
          ↓
    price history

---

# 106. Найважливіша різниця

Function:

    SELECT calculate_total(10);

> Я сам попросив PostgreSQL виконати function.

Trigger:

    UPDATE products
    SET price = 100
    WHERE id = 10;

> Я нічого не викликав явно — PostgreSQL сам запустив trigger.

---

# 107. Головна архітектурна думка

Triggers — дуже потужний механізм PostgreSQL, але їх потрібно використовувати **цілеспрямовано**.

Хороший trigger:

    проста задача
        +
    автоматична реакція
        +
    передбачувана поведінка

Поганий trigger:

    складна business logic
        +
    багато side effects
        +
    прихована поведінка
        +
    важке debugging

Для Full Stack Developer особливо важливо знати не тільки:

    "Як створити trigger?"

а:

> "Чи повинен тут взагалі бути trigger?"

---

# 108. Підсумкова модель PostgreSQL

До цього моменту у курсі вже можна бачити PostgreSQL як набір взаємопов'язаних механізмів:

    TABLE
      ↓
    дані

    CONSTRAINT
      ↓
    правила цілісності

    INDEX
      ↓
    швидкий доступ

    VIEW
      ↓
    збережений query

    FUNCTION
      ↓
    reusable database logic

    PROCEDURE
      ↓
    database operation

    TRIGGER
      ↓
    automatic reaction

    TRANSACTION
      ↓
    atomic operation

І головне:

    Backend
       ↓
    PostgreSQL
       ↓
    Tables
    Constraints
    Indexes
    Views
    Functions
    Procedures
    Triggers
    Transactions

Саме так поступово формується цілісне розуміння PostgreSQL не як набору SQL-команд, а як **повноцінної системи керування даними та виконання database logic**.
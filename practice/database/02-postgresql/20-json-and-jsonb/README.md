# JSON та JSONB у PostgreSQL

## 1. Що таке JSON у PostgreSQL

PostgreSQL підтримує два типи для роботи з JSON:

- `json`
- `jsonb`

JSON дозволяє зберігати структуровані дані у вигляді:

    {
      "name": "Valeriy",
      "age": 56,
      "skills": ["JavaScript", "React", "PostgreSQL"]
    }

Це особливо корисно, коли структура даних може змінюватися або коли частина даних має напівструктурований характер.

Але JSON не означає, що всю базу даних потрібно будувати на JSON.

У більшості звичайних бізнес-даних краще використовувати звичайні реляційні колонки:

    id
    name
    email
    created_at

А JSON/JSONB використовувати там, де він справді дає перевагу.

---

# 2. JSON vs JSONB

PostgreSQL має два типи:

    json
    jsonb

## JSON

`json` зберігає JSON-текст практично у первісному вигляді.

Наприклад:

    '{"name": "Valeriy", "age": 56}'

Особливість:

- зберігає текстове представлення;
- перевіряє, чи є значення коректним JSON;
- при читанні PostgreSQL може повторно обробляти JSON;
- зручний, коли важливо зберегти саме текстове представлення.

---

## JSONB

`jsonb` — бінарно оброблений формат JSON.

Він:

- ефективніший для пошуку;
- підтримує індекси;
- має багато операторів;
- зручніший для роботи з JSON-структурою;
- зазвичай є кращим вибором для прикладних застосунків.

Приклад:

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        settings JSONB
    );

---

# 3. Який тип вибирати

Практичне правило:

    JSONB → основний вибір для роботи з JSON у PostgreSQL.

    JSON → коли потрібно зберігати саме JSON-текстове представлення.

Для типового Full Stack застосунку:

    PostgreSQL
        ↓
    JSONB
        ↓
    Nest.js / Node.js
        ↓
    React / Next.js

найчастіше буде достатньо `JSONB`.

---

# 4. Створення таблиці з JSONB

Створимо таблицю для практики:

    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        metadata JSONB
    );

Додамо дані:

    INSERT INTO products (name, price, metadata)
    VALUES
    (
        'Laptop',
        45000,
        '{"brand": "Lenovo", "ram": 16, "color": "black"}'
    ),
    (
        'Phone',
        25000,
        '{"brand": "Samsung", "ram": 8, "color": "black"}'
    ),
    (
        'Monitor',
        12000,
        '{"brand": "LG", "size": 27, "color": "white"}'
    );

Перевірка:

    SELECT *
    FROM products;

---

# 5. JSON може містити різні типи даних

JSON підтримує:

- string
- number
- boolean
- null
- object
- array

Приклад:

    {
      "name": "Laptop",
      "price": 45000,
      "available": true,
      "description": null,
      "specs": {
        "ram": 16,
        "storage": 512
      },
      "tags": ["laptop", "computer", "work"]
    }

---

# 6. JSON object

Об'єкт складається з пар:

    key → value

Наприклад:

    {
      "brand": "Lenovo",
      "ram": 16
    }

У PostgreSQL це можна зберігати:

    metadata JSONB

---

# 7. Отримання всього JSON

    SELECT metadata
    FROM products;

Результат може виглядати так:

    {"brand": "Lenovo", "ram": 16, "color": "black"}

---

# 8. Оператор ->

Оператор `->` дозволяє отримати JSON-значення за ключем.

Наприклад:

    SELECT metadata -> 'brand'
    FROM products;

Результат:

    "Lenovo"

Зверніть увагу:

`->` повертає JSON.

---

# 9. Оператор ->>

`->>` повертає значення як текст.

    SELECT metadata ->> 'brand'
    FROM products;

Результат:

    Lenovo

Це дуже важлива різниця:

    ->   JSON
    ->>  TEXT

---

# 10. -> vs ->>

Наприклад:

    SELECT
        metadata -> 'ram' AS json_value,
        metadata ->> 'ram' AS text_value
    FROM products;

Логіка:

    metadata -> 'ram'
        ↓
    JSON value

    metadata ->> 'ram'
        ↓
    TEXT value

Якщо потрібно порівнювати значення як текст:

    WHERE metadata ->> 'brand' = 'Lenovo'

---

# 11. Отримання вкладеного JSON

Припустимо, маємо:

    {
      "specs": {
        "ram": 16,
        "storage": 512
      }
    }

Можна використовувати:

    metadata -> 'specs' -> 'ram'

Або отримати текст:

    metadata -> 'specs' ->> 'ram'

---

# 12. Оператор #>

`#>` дозволяє звертатися до вкладених даних через шлях.

Наприклад:

    SELECT metadata #> '{specs,ram}'
    FROM products;

Результат:

    16

---

# 13. Оператор #>>

`#>>` повертає вкладене значення як текст.

    SELECT metadata #>> '{specs,ram}'
    FROM products;

Результат:

    16

Отже:

    #>   → JSON
    #>>  → TEXT

---

# 14. Пошук за значенням JSON

Наприклад, знайти всі продукти Lenovo:

    SELECT *
    FROM products
    WHERE metadata ->> 'brand' = 'Lenovo';

Це один із найважливіших практичних сценаріїв.

---

# 15. Пошук за числовим значенням

Важливий момент:

    metadata ->> 'ram'

повертає `TEXT`.

Тому для числового порівняння можна привести тип:

    SELECT *
    FROM products
    WHERE (metadata ->> 'ram')::INTEGER >= 16;

Тут:

    metadata ->> 'ram'
        ↓
    TEXT
        ↓
    ::INTEGER
        ↓
    INTEGER

---

# 16. Приведення типів JSON

Приклад:

    SELECT
        (metadata ->> 'ram')::INTEGER
    FROM products;

Інший приклад:

    SELECT
        (metadata ->> 'price')::NUMERIC
    FROM products;

Типове правило:

    ->> → отримуємо TEXT
    ::TYPE → перетворюємо у потрібний SQL-тип

---

# 17. Перевірка існування ключа

Оператор `?` перевіряє, чи існує ключ.

    SELECT *
    FROM products
    WHERE metadata ? 'brand';

Це означає:

    Чи має JSONB ключ "brand"?

---

# 18. Оператор @>

`@>` перевіряє containment — чи містить один JSONB інший.

Наприклад:

    SELECT *
    FROM products
    WHERE metadata @> '{"brand": "Lenovo"}';

Це означає:

    metadata містить
    {"brand": "Lenovo"}

---

# 19. @> для декількох властивостей

Можна перевірити декілька значень:

    SELECT *
    FROM products
    WHERE metadata @> '{"brand": "Lenovo", "ram": 16}';

Тобто JSON повинен містити обидві властивості.

---

# 20. Різниця між ->> та @>

Наприклад:

    WHERE metadata ->> 'brand' = 'Lenovo'

або:

    WHERE metadata @> '{"brand": "Lenovo"}'

Обидва варіанти можуть використовуватися для пошуку.

Але `@>` особливо важливий для `JSONB` та GIN-індексів.

---

# 21. Оператор ?|

`?|` перевіряє, чи існує хоча б один із перелічених ключів.

    SELECT *
    FROM products
    WHERE metadata ?| ARRAY['brand', 'manufacturer'];

Логіка:

    brand OR manufacturer

---

# 22. Оператор ?&

`?&` перевіряє, чи існують усі перелічені ключі.

    SELECT *
    FROM products
    WHERE metadata ?& ARRAY['brand', 'ram'];

Логіка:

    brand AND ram

---

# 23. JSONB arrays

JSON може містити масиви:

    {
      "name": "Laptop",
      "tags": ["computer", "work", "portable"]
    }

Приклад таблиці:

    CREATE TABLE devices (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        data JSONB
    );

Дані:

    INSERT INTO devices (name, data)
    VALUES
    (
        'Laptop',
        '{
          "tags": ["computer", "work", "portable"]
        }'
    );

---

# 24. Отримання JSON-масиву

    SELECT data -> 'tags'
    FROM devices;

Результат:

    ["computer", "work", "portable"]

---

# 25. Отримання елемента масиву

JSON-масив має індекси, починаючи з `0`.

    SELECT data -> 'tags' -> 0
    FROM devices;

Результат:

    "computer"

Другий елемент:

    SELECT data -> 'tags' -> 1
    FROM devices;

Результат:

    "work"

---

# 26. Отримання елемента масиву як TEXT

    SELECT data -> 'tags' ->> 0
    FROM devices;

Результат:

    computer

---

# 27. JSONB та масиви у пошуку

Можна використовувати containment:

    SELECT *
    FROM devices
    WHERE data @> '{"tags": ["computer"]}';

Це перевіряє наявність відповідного елемента в JSONB-масиві.

---

# 28. Додавання JSONB

JSONB можна створювати через JSON-літерали:

    '{"brand": "Lenovo"}'

Або через `jsonb_build_object()`:

    jsonb_build_object(
        'brand', 'Lenovo',
        'ram', 16
    )

Приклад:

    SELECT jsonb_build_object(
        'brand', 'Lenovo',
        'ram', 16
    );

---

# 29. jsonb_build_object()

Функція створює JSONB object.

    SELECT jsonb_build_object(
        'name', 'Laptop',
        'price', 45000,
        'available', true
    );

Результат:

    {
      "name": "Laptop",
      "price": 45000,
      "available": true
    }

---

# 30. jsonb_build_array()

Створює JSONB array.

    SELECT jsonb_build_array(
        'JavaScript',
        'TypeScript',
        'PostgreSQL'
    );

Результат:

    ["JavaScript", "TypeScript", "PostgreSQL"]

---

# 31. Додавання / зміна ключа

Для `JSONB` можна використовувати оператор `||`.

Наприклад:

    SELECT
        metadata || '{"warranty": 24}'
    FROM products;

Це додає або оновлює ключ:

    warranty

---

# 32. Об'єднання JSONB

Приклад:

    SELECT
        '{"name": "Laptop"}'::JSONB
        ||
        '{"brand": "Lenovo"}'::JSONB;

Результат:

    {
      "name": "Laptop",
      "brand": "Lenovo"
    }

---

# 33. Якщо ключ вже існує

При об'єднанні JSONB значення праворуч може замінити значення зліва.

    SELECT
        '{"ram": 8}'::JSONB
        ||
        '{"ram": 16}'::JSONB;

Результат:

    {"ram": 16}

---

# 34. Видалення ключа

Оператор `-` видаляє ключ:

    SELECT
        metadata - 'color'
    FROM products;

В результаті `color` буде видалено з отриманого JSONB.

Це не змінює рядок таблиці автоматично.

Щоб зберегти зміни:

    UPDATE products
    SET metadata = metadata - 'color';

---

# 35. jsonb_set()

`jsonb_set()` дозволяє змінити значення конкретного ключа.

Наприклад:

    UPDATE products
    SET metadata = jsonb_set(
        metadata,
        '{ram}',
        '32'
    )
    WHERE id = 1;

Тепер:

    ram = 32

---

# 36. jsonb_set() для вкладених даних

Припустимо:

    {
      "specs": {
        "ram": 16,
        "storage": 512
      }
    }

Можна змінити RAM:

    UPDATE products
    SET metadata = jsonb_set(
        metadata,
        '{specs,ram}',
        '32'
    )
    WHERE id = 1;

---

# 37. jsonb_set() та створення відсутнього ключа

Якщо ключа немає, `jsonb_set()` може створити його залежно від структури та параметрів.

Наприклад:

    SELECT jsonb_set(
        '{"brand": "Lenovo"}'::JSONB,
        '{ram}',
        '16',
        true
    );

Результат:

    {
      "brand": "Lenovo",
      "ram": 16
    }

---

# 38. JSONB та NULL

Не потрібно плутати:

    SQL NULL

і:

    JSON null

Наприклад:

    '{"value": null}'::JSONB

містить JSON-значення `null`.

А:

    NULL::JSONB

є SQL `NULL`.

Це різні поняття.

---

# 39. JSONB та звичайні SQL-колонки

Поганий дизайн:

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        data JSONB
    );

і зберігати абсолютно все:

    {
      "name": "Valeriy",
      "email": "example@example.com",
      "age": 56,
      "created_at": "...",
      "status": "active"
    }

Це часто погіршує структуру бази.

Краще:

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        age INTEGER,
        status TEXT,
        metadata JSONB
    );

JSONB можна залишити для додаткових або змінних даних.

---

# 40. Коли JSONB доречний

JSONB добре підходить для:

- metadata;
- налаштувань користувача;
- конфігурацій;
- додаткових властивостей;
- даних із нестабільною структурою;
- зовнішніх API payload;
- документів із різною структурою;
- специфічних параметрів товарів.

Наприклад:

    {
      "theme": "dark",
      "language": "uk",
      "notifications": true
    }

---

# 41. Коли JSONB НЕ найкращий вибір

Не варто використовувати JSONB замість звичайних колонок лише тому, що це зручно.

Наприклад, якщо є:

    users
    orders
    products

і між ними існують чіткі зв'язки, краще використовувати:

    PRIMARY KEY
    FOREIGN KEY
    JOIN
    constraints
    indexes

а не складати всю структуру в один JSON.

---

# 42. JSONB та нормалізація

Реляційна модель:

    users
        ↓
    orders
        ↓
    order_items
        ↓
    products

JSON-модель:

    orders
        ↓
    {
      "customer": {...},
      "items": [...]
    }

Для складних бізнес-систем реляційна модель часто буде кращою.

JSONB можна використовувати як доповнення.

---

# 43. JSONB та індекси

Одна з головних переваг `JSONB` — можливість створювати індекси.

Наприклад:

    CREATE INDEX idx_products_metadata
    ON products
    USING GIN (metadata);

Тепер PostgreSQL може ефективніше виконувати певні запити по JSONB.

---

# 44. GIN index

GIN особливо корисний для структурованого пошуку в JSONB.

Наприклад:

    CREATE INDEX idx_products_metadata_gin
    ON products
    USING GIN (metadata);

Після цього:

    SELECT *
    FROM products
    WHERE metadata @> '{"brand": "Lenovo"}';

може використовувати GIN-індекс.

Але не потрібно автоматично створювати індекси на кожну JSONB-колонку.

---

# 45. Перевірка плану запиту

Для аналізу:

    EXPLAIN ANALYZE
    SELECT *
    FROM products
    WHERE metadata @> '{"brand": "Lenovo"}';

Дивимося, чи PostgreSQL використовує індекс і який план побудував.

---

# 46. Expression index для конкретного JSON-поля

Якщо дуже часто виконується:

    WHERE metadata ->> 'brand' = 'Lenovo'

можна створити expression index:

    CREATE INDEX idx_products_brand
    ON products ((metadata ->> 'brand'));

Тепер PostgreSQL має індекс саме для цього виразу.

---

# 47. GIN vs expression index

GIN:

    CREATE INDEX idx_products_metadata
    ON products
    USING GIN (metadata);

Добре підходить для різноманітних JSONB-запитів.

Expression index:

    CREATE INDEX idx_products_brand
    ON products ((metadata ->> 'brand'));

Добре підходить, коли є конкретне поле, яке дуже часто використовується у фільтрації.

Вибір індексу залежить від реальних запитів.

---

# 48. JSONB та сортування

Можна сортувати за значенням JSON:

    SELECT *
    FROM products
    ORDER BY metadata ->> 'brand';

Для числових значень потрібне приведення типу:

    SELECT *
    FROM products
    ORDER BY (metadata ->> 'ram')::INTEGER;

---

# 49. JSONB у SELECT

Можна одночасно отримувати звичайні колонки та JSON-поля:

    SELECT
        id,
        name,
        price,
        metadata ->> 'brand' AS brand,
        metadata ->> 'color' AS color
    FROM products;

Це дуже зручний спосіб підготувати дані для backend.

---

# 50. JSONB у WHERE

Приклад:

    SELECT *
    FROM products
    WHERE metadata ->> 'color' = 'black';

Інший:

    SELECT *
    FROM products
    WHERE (metadata ->> 'ram')::INTEGER >= 16;

---

# 51. JSONB у UPDATE

Можна оновлювати частину JSON:

    UPDATE products
    SET metadata = jsonb_set(
        metadata,
        '{color}',
        '"silver"'
    )
    WHERE id = 1;

---

# 52. JSONB у DELETE

JSONB можна змінювати під час `UPDATE`, але `DELETE` видаляє весь рядок таблиці.

Наприклад:

    DELETE FROM products
    WHERE id = 1;

Якщо потрібно видалити тільки JSON-ключ:

    UPDATE products
    SET metadata = metadata - 'color'
    WHERE id = 1;

---

# 53. JSONB та агрегування

PostgreSQL має функції для побудови JSON.

Наприклад:

    jsonb_agg()

дозволяє зібрати декілька рядків у JSONB-масив.

    SELECT jsonb_agg(name)
    FROM products;

Результат може бути:

    ["Laptop", "Phone", "Monitor"]

---

# 54. jsonb_agg() + GROUP BY

Наприклад, можемо зібрати товари за брендом:

    SELECT
        metadata ->> 'brand' AS brand,
        jsonb_agg(name) AS products
    FROM products
    GROUP BY metadata ->> 'brand';

Це вже дуже корисно для backend/API.

---

# 55. jsonb_object_agg()

Дозволяє створювати JSONB object із рядків.

Наприклад:

    SELECT jsonb_object_agg(
        name,
        price
    )
    FROM products;

Можна отримати структуру:

    {
      "Laptop": 45000,
      "Phone": 25000,
      "Monitor": 12000
    }

---

# 56. JSONB та API

JSONB особливо цікавий у Full Stack застосунках.

Наприклад, backend отримує:

    {
      "name": "Laptop",
      "metadata": {
        "brand": "Lenovo",
        "ram": 16,
        "color": "black"
      }
    }

Nest.js може передати це PostgreSQL.

PostgreSQL зберігає:

    metadata JSONB

React / Next.js отримує:

    {
      "name": "Laptop",
      "metadata": {
        "brand": "Lenovo",
        "ram": 16,
        "color": "black"
      }
    }

Тобто JSON природно проходить через весь Full Stack.

---

# 57. JSONB та TypeScript

Наприклад, на frontend/backend можна мати структуру:

    type ProductMetadata = {
        brand: string;
        ram: number;
        color: string;
    };

А в PostgreSQL:

    metadata JSONB

Тут важливо розуміти:

    TypeScript type
        ↓
    контроль структури на рівні application code

    JSONB
        ↓
    зберігання структурованого документа в PostgreSQL

Це різні рівні системи.

---

# 58. JSONB не замінює TypeScript

Наприклад, PostgreSQL може дозволити зберегти:

    {
      "ram": "sixteen"
    }

але TypeScript очікує:

    type ProductMetadata = {
        ram: number;
    };

Тому структура JSONB може потребувати валідації на backend.

Для Nest.js це особливо важливо.

---

# 59. Валідація JSONB

Якщо структура JSONB має бізнес-значення, її бажано контролювати.

Можна використовувати:

- backend validation;
- DTO;
- TypeScript types;
- PostgreSQL CHECK;
- тригери;
- JSON Schema на application-рівні.

Не варто покладатися тільки на те, що JSON "виглядає правильно".

---

# 60. JSONB та CHECK

Можна перевіряти прості умови.

Наприклад:

    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        metadata JSONB,
        CONSTRAINT products_metadata_object
            CHECK (jsonb_typeof(metadata) = 'object')
    );

Тепер `metadata` має бути JSON object.

---

# 61. jsonb_typeof()

Функція повертає тип JSONB-значення.

    SELECT jsonb_typeof('{"name": "Laptop"}'::JSONB);

Результат:

    object

Інші можливі значення:

    object
    array
    string
    number
    boolean
    null

---

# 62. JSONB та функції PostgreSQL

Для роботи з JSONB корисні:

    jsonb_build_object()
    jsonb_build_array()
    jsonb_set()
    jsonb_agg()
    jsonb_object_agg()
    jsonb_typeof()

Це вже окремий набір інструментів PostgreSQL для роботи зі структурованими даними.

---

# 63. JSON path

PostgreSQL підтримує SQL/JSON path.

Для складніших сценаріїв існують функції та оператори на кшталт:

    jsonb_path_exists()

    jsonb_path_query()

    jsonb_path_query_array()

Це вже advanced-рівень.

Для Junior Full Stack розуміння:

    ->
    ->>
    #>
    #>>
    @>
    ?
    jsonb_set()
    GIN

важливіше.

---

# 64. JSONB та JOIN

JSONB не забороняє використовувати JOIN.

Наприклад:

    SELECT
        orders.id,
        users.name,
        orders.metadata ->> 'comment' AS comment
    FROM orders
    JOIN users
        ON users.id = orders.user_id;

Тобто JSONB може існувати всередині нормальної реляційної моделі.

---

# 65. Хороший практичний дизайн

Наприклад:

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        metadata JSONB
    );

Тут:

    id
    name
    email

— звичайні структуровані поля.

А:

    metadata

— додаткові, менш стабільні дані.

Наприклад:

    {
      "theme": "dark",
      "language": "uk",
      "dashboard": {
        "layout": "compact"
      }
    }

---

# 66. Поганий практичний дизайн

Не варто робити:

    CREATE TABLE users (
        data JSONB
    );

і зберігати там абсолютно все:

    {
      "id": 1,
      "name": "Valeriy",
      "email": "example@example.com",
      "orders": [...],
      "roles": [...],
      "created_at": "...",
      "permissions": [...]
    }

Це може зруйнувати переваги реляційної моделі.

---

# 67. JSONB та нормалізація: головне правило

Не думайте:

    PostgreSQL
        ↓
    JSONB
        ↓
    вся база

Правильніше:

    PostgreSQL
        ↓
    relational model
        +
    JSONB там, де це доречно

---

# 68. Практична модель для Full Stack

Наприклад, каталог товарів:

    products
    ├── id
    ├── name
    ├── price
    ├── category_id
    └── metadata JSONB

Реляційні дані:

    id
    name
    price
    category_id

Гнучкі характеристики:

    metadata

Наприклад:

    {
      "brand": "Lenovo",
      "ram": 16,
      "storage": 512,
      "screen": 15.6
    }

Для іншого товару:

    {
      "brand": "Samsung",
      "color": "black",
      "screen": 6.5,
      "battery": 5000
    }

Структура metadata може відрізнятися.

---

# 69. JSONB для різних типів товарів

Це один із найкращих практичних сценаріїв.

Laptop:

    {
      "ram": 16,
      "storage": 512,
      "screen": 15.6
    }

Phone:

    {
      "ram": 8,
      "storage": 256,
      "battery": 5000
    }

Monitor:

    {
      "size": 27,
      "resolution": "2560x1440",
      "refresh_rate": 144
    }

Спільні поля:

    id
    name
    price
    category_id

специфічні:

    metadata JSONB

---

# 70. JSONB та `psql`

Подивитися структуру таблиці:

    \d products

Подивитися дані:

    SELECT *
    FROM products;

Перевірити JSON:

    SELECT metadata
    FROM products;

Перевірити конкретне поле:

    SELECT metadata ->> 'brand'
    FROM products;

---

# 71. JSONB та pgAdmin

У pgAdmin можна:

1. відкрити database;
2. відкрити schema;
3. відкрити table;
4. подивитися columns;
5. знайти колонку типу `jsonb`;
6. виконувати JSON-запити через Query Tool.

Для навчання корисно виконувати ті самі SQL-команди і через `psql`, і через pgAdmin.

---

# 72. JSONB та безпека

JSONB сам по собі не робить дані безпечними.

Наприклад, не варто без перевірки зберігати:

    {
      "role": "admin"
    }

якщо користувач сам може змінити це значення.

Потрібно розділяти:

    user-controlled data

і:

    trusted system data

Особливо це важливо для:

    role
    permissions
    access
    price
    status

---

# 73. JSONB та SQL Injection

JSONB не скасовує правила безпечної роботи із SQL.

Backend повинен використовувати параметризовані запити або ORM/query builder.

Неправильно будувати SQL шляхом небезпечної конкатенації введених користувачем значень.

---

# 74. JSONB та продуктивність

JSONB зручний, але не безкоштовний.

Потрібно враховувати:

- розмір JSON;
- частоту UPDATE;
- кількість вкладених даних;
- індекси;
- частоту пошуку;
- необхідність JOIN;
- селективність запитів.

Великий JSONB-документ, який постійно змінюється, може бути дорогим у підтримці.

---

# 75. JSONB та UPDATE

Якщо потрібно змінити маленьке поле всередині великого JSONB:

    UPDATE products
    SET metadata = jsonb_set(
        metadata,
        '{ram}',
        '32'
    )
    WHERE id = 1;

це все одно є оновленням значення колонки.

Тому JSONB не потрібно сприймати як окрему маленьку таблицю всередині рядка.

---

# 76. JSONB та індекси: баланс

Індекс:

    CREATE INDEX idx_products_metadata
    ON products
    USING GIN (metadata);

може прискорити читання.

Але індекс:

- займає місце;
- потребує обслуговування;
- збільшує вартість записів.

Правило:

    Спочатку зрозуміти запити.
    Потім створювати індекси.
    Потім перевіряти EXPLAIN ANALYZE.

---

# 77. JSON vs JSONB: коротке порівняння

| Характеристика | JSON | JSONB |
|---|---|---|
| Зберігання | текстове | бінарно оброблене |
| Пошук | менш зручний | зручний |
| Індекси | обмежені | дуже добре підтримуються |
| Оператори JSONB | ні | так |
| GIN | ні | так |
| Типовий вибір | рідше | часто |
| API metadata | можливо | дуже добре |

Практичне правило:

    JSONB — default choice для більшості прикладних задач.

---

# 78. JSONB vs таблиця

## Таблиця

    products
    ├── id
    ├── name
    ├── price
    ├── category_id
    └── brand

Переваги:

- типізація;
- constraints;
- indexes;
- JOIN;
- нормалізація;
- зрозуміла структура.

## JSONB

    products
    └── metadata

Переваги:

- гнучка структура;
- різні набори полів;
- зручне зберігання metadata;
- природна робота з JSON API.

---

# 79. JSONB vs EAV

EAV — Entity-Attribute-Value модель.

Наприклад:

    product_id | attribute | value
    -----------+-----------+------
    1          | ram       | 16
    1          | color     | black
    1          | storage   | 512

JSONB:

    {
      "ram": 16,
      "color": "black",
      "storage": 512
    }

JSONB часто значно простіший для таких гнучких metadata-сценаріїв.

Але для складної аналітики реляційна структура може бути кращою.

---

# 80. Практична Full Stack архітектура

Типовий потік:

    React
       ↓
    HTTP / JSON
       ↓
    Nest.js
       ↓
    DTO / validation
       ↓
    PostgreSQL
       ↓
    JSONB

Наприклад frontend відправляє:

    {
      "name": "Laptop",
      "metadata": {
        "brand": "Lenovo",
        "ram": 16
      }
    }

Nest.js перевіряє дані.

PostgreSQL зберігає:

    metadata JSONB

---

# 81. Що потрібно знати Junior

Обов'язково розуміти:

    JSON
    JSONB
    ->
    ->>
    #>
    #>>
    ?
    @>
    JSON arrays
    jsonb_set()
    jsonb_build_object()
    GIN index
    JSONB vs relational columns

Також потрібно розуміти:

    JSONB ≠ заміна реляційної бази.

---

# 82. Що потрібно знати Middle

Додатково:

    expression indexes
    jsonb_agg()
    jsonb_object_agg()
    ?|
    ?&
    || 
    -
    jsonb_typeof()
    EXPLAIN ANALYZE
    JSONB performance
    JSONB validation
    JSONB + JOIN
    JSONB + GROUP BY

---

# 83. Advanced

На advanced-рівні:

- SQL/JSON path;
- `jsonb_path_exists()`;
- `jsonb_path_query()`;
- складні GIN-індекси;
- оптимізація JSONB-запитів;
- великі JSONB-документи;
- hybrid relational + JSONB architecture;
- міграції JSONB-структури;
- контроль schema evolution;
- JSONB та partitioning;
- performance analysis.

---

# 84. Практика 1 — створити JSONB

Створіть таблицю:

    CREATE TABLE json_products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        metadata JSONB
    );

Додайте три товари з різною структурою `metadata`.

---

# 85. Практика 2 — отримати JSON

Виведіть:

    id
    name
    metadata

Потім окремо:

    brand

за допомогою:

    ->>

---

# 86. Практика 3 — пошук

Знайдіть усі товари:

    brand = 'Lenovo'

Використайте:

    metadata ->> 'brand'

---

# 87. Практика 4 — числовий фільтр

Додайте:

    ram

Знайдіть товари:

    ram >= 16

Не забудьте:

    ::INTEGER

---

# 88. Практика 5 — вкладений JSON

Створіть:

    {
      "specs": {
        "ram": 16,
        "storage": 512
      }
    }

Отримайте:

    ram

двома способами:

    ->
    
і:

    #>

---

# 89. Практика 6 — JSON array

Додайте:

    "tags": ["computer", "work", "portable"]

Отримайте:

    computer

за допомогою JSON-операторів.

---

# 90. Практика 7 — containment

Знайдіть товари, metadata яких містить:

    {"brand": "Lenovo"}

Використайте:

    @>

---

# 91. Практика 8 — перевірка ключа

Знайдіть записи, які мають:

    brand

Використайте:

    ?

---

# 92. Практика 9 — змінити JSON

Змініть:

    ram = 32

за допомогою:

    jsonb_set()

---

# 93. Практика 10 — видалити ключ

Видаліть:

    color

за допомогою:

    -

---

# 94. Практика 11 — побудувати JSON

Створіть JSONB через:

    jsonb_build_object()

Наприклад:

    name
    price
    available

---

# 95. Практика 12 — JSONB aggregate

Створіть запит, який повертає всі назви товарів як JSONB array.

Використайте:

    jsonb_agg()

---

# 96. Практика 13 — GIN index

Створіть:

    CREATE INDEX idx_json_products_metadata
    ON json_products
    USING GIN (metadata);

Після цього перевірте:

    EXPLAIN ANALYZE
    SELECT *
    FROM json_products
    WHERE metadata @> '{"brand": "Lenovo"}';

---

# 97. Практика 14 — expression index

Створіть:

    CREATE INDEX idx_json_products_brand
    ON json_products ((metadata ->> 'brand'));

Порівняйте запит:

    SELECT *
    FROM json_products
    WHERE metadata ->> 'brand' = 'Lenovo';

з планом виконання.

---

# 98. Практика 15 — Full Stack

Створіть простий backend endpoint:

    POST /products

Frontend відправляє:

    {
      "name": "Laptop",
      "price": 45000,
      "metadata": {
        "brand": "Lenovo",
        "ram": 16
      }
    }

Backend:

    Nest.js
        ↓
    DTO
        ↓
    validation
        ↓
    PostgreSQL
        ↓
    JSONB

Потім створіть:

    GET /products

і поверніть ці дані назад у frontend.

---

# 99. Типові помилки

## Помилка 1 — використовувати JSONB для всього

    users
    └── data JSONB

Не робіть так без причини.

---

## Помилка 2 — плутати -> та ->>

    ->   JSON
    ->>  TEXT

Це одна з найважливіших речей для запам'ятовування.

---

## Помилка 3 — забути приведення типу

Неправильна логіка:

    WHERE metadata ->> 'ram' >= 16

`->>` повертає текст.

Краще:

    WHERE (metadata ->> 'ram')::INTEGER >= 16

---

## Помилка 4 — індексувати все

Не потрібно створювати GIN і expression index для кожного JSONB-поля.

Спочатку:

    query

потім:

    EXPLAIN ANALYZE

і лише потім:

    index

---

## Помилка 5 — забути про валідацію

JSONB дозволяє зберігати гнучкі структури.

Але application logic все одно повинна перевіряти дані.

---

## Помилка 6 — зберігати бізнес-критичні дані тільки в JSONB

Наприклад:

    user_id
    role
    price
    order_id

часто краще зберігати як нормальні SQL-колонки, якщо ці поля мають чітку структуру та використовуються в JOIN, constraints, indexes або бізнес-логіці.

---

# 100. JSONB — головна шпаргалка

    -- JSON
    json

    -- JSONB
    jsonb

    -- отримати JSON
    metadata -> 'brand'

    -- отримати TEXT
    metadata ->> 'brand'

    -- вкладений JSON
    metadata #> '{specs,ram}'

    -- вкладений TEXT
    metadata #>> '{specs,ram}'

    -- перевірити ключ
    metadata ? 'brand'

    -- перевірити один із ключів
    metadata ?| ARRAY['brand', 'manufacturer']

    -- перевірити всі ключі
    metadata ?& ARRAY['brand', 'ram']

    -- containment
    metadata @> '{"brand": "Lenovo"}'

    -- об'єднати JSONB
    metadata || '{"color": "black"}'

    -- видалити ключ
    metadata - 'color'

    -- змінити значення
    jsonb_set(metadata, '{ram}', '32')

    -- створити object
    jsonb_build_object('brand', 'Lenovo', 'ram', 16)

    -- створити array
    jsonb_build_array('JS', 'TS', 'SQL')

    -- aggregate array
    jsonb_agg(name)

    -- aggregate object
    jsonb_object_agg(name, price)

    -- тип JSON
    jsonb_typeof(metadata)

    -- GIN
    CREATE INDEX idx_metadata
    ON products
    USING GIN (metadata);

---

# 101. Головна ментальна модель

Запам'ятайте:

    SQL column
        ↓
    чітко структуровані дані

    JSONB
        ↓
    гнучкі структуровані дані

    ->
        ↓
    отримати JSON

    ->>
        ↓
    отримати TEXT

    #>
        ↓
    отримати вкладений JSON

    #>>
        ↓
    отримати вкладений TEXT

    ?
        ↓
    чи існує ключ?

    @>
        ↓
    чи містить JSONB потрібну структуру?

    jsonb_set()
        ↓
    змінити частину JSON

    GIN
        ↓
    індексація JSONB

---

# 102. Що важливо винести з теми

Після цієї теми ви повинні розуміти не просто синтаксис JSONB, а головне архітектурне питання:

    Що має бути звичайною SQL-колонкою,
    а що має бути JSONB?

Хороший PostgreSQL-дизайн часто виглядає так:

    PostgreSQL
        │
        ├── relational data
        │      ├── id
        │      ├── name
        │      ├── price
        │      ├── foreign keys
        │      └── constraints
        │
        └── JSONB
               ├── metadata
               ├── settings
               ├── flexible attributes
               └── external/API data

Тобто JSONB — це не "інша база даних усередині PostgreSQL".

Це інструмент, який дозволяє поєднати сильні сторони реляційної моделі з гнучкістю JSON.

---

# 103. Контрольні питання

1. У чому різниця між `JSON` та `JSONB`?
2. Чому для більшості прикладних задач часто вибирають `JSONB`?
3. Що повертає `->`?
4. Що повертає `->>`?
5. У чому різниця між `#>` та `#>>`?
6. Для чого використовується `?`?
7. Що робить `@>`?
8. Як знайти JSONB-записи за певним ключем?
9. Як отримати число з JSONB і перетворити його на `INTEGER`?
10. Для чого потрібен `jsonb_set()`?
11. Як видалити ключ із JSONB?
12. Що робить `jsonb_build_object()`?
13. Що робить `jsonb_agg()`?
14. Для чого використовується GIN index?
15. Коли потрібен expression index?
16. Чому не варто зберігати всю таблицю в одному JSONB?
17. У яких випадках JSONB кращий за окремі колонки?
18. У яких випадках звичайні SQL-колонки кращі?
19. Як JSONB працює разом із Nest.js та TypeScript?
20. Чому JSONB не замінює реляційну модель?

---

# 104. Підсумок

Після `20-json-and-jsonb` потрібно вміти:

- створювати `JSON` та `JSONB`;
- створювати таблиці з `JSONB`;
- вставляти JSON;
- читати JSON;
- використовувати `->`;
- використовувати `->>`;
- працювати з вкладеним JSON;
- використовувати `#>` та `#>>`;
- працювати з JSON arrays;
- використовувати `?`;
- використовувати `?|`;
- використовувати `?&`;
- використовувати `@>`;
- змінювати JSONB через `jsonb_set()`;
- об'єднувати JSONB через `||`;
- видаляти ключі через `-`;
- будувати JSONB через `jsonb_build_object()`;
- будувати JSONB arrays через `jsonb_build_array()`;
- використовувати `jsonb_agg()`;
- використовувати `jsonb_object_agg()`;
- створювати GIN indexes;
- створювати expression indexes;
- перевіряти запити через `EXPLAIN ANALYZE`;
- розуміти JSONB та TypeScript;
- розуміти JSONB та Nest.js;
- розуміти, коли JSONB доречний;
- розуміти, коли краще використати звичайні SQL-колонки.

Головне правило:

    Relational data → columns + relations

    Flexible data → JSONB

    Frequent JSONB search → indexes

    Performance question → EXPLAIN ANALYZE

    Business-critical structure → prefer explicit relational design

    JSONB ≠ заміна реляційної моделі
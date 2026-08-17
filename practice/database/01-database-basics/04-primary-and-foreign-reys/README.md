## 04. Primary and Foreign Keys

**Primary Key (PK)** — column або набір columns, які однозначно ідентифікують кожен record у table.

**Foreign Key (FK)** — column або набір columns, які посилаються на Primary Key іншої table та створюють зв'язок між tables.

Проста модель:

    users
    │
    ├── id ← Primary Key
    ├── name
    └── email

    orders
    │
    ├── id ← Primary Key
    ├── user_id ← Foreign Key
    └── total

Зв'язок:

    users.id
       ↑
       │
    orders.user_id

---

### Ключові поняття

✔ Primary Key (PK)
✔ Foreign Key (FK)
✔ Candidate Key
✔ Composite Key
✔ Natural Key
✔ Surrogate Key
✔ UNIQUE
✔ NOT NULL
✔ Referential Integrity
✔ Parent Table
✔ Child Table
✔ Primary Key Constraint
✔ Foreign Key Constraint
✔ `ON DELETE`
✔ `ON UPDATE`

---

### Що потрібно пам'ятати

• Primary Key однозначно ідентифікує record у table.

• У table може бути тільки один Primary Key constraint, але він може складатися з декількох columns.

• Значення Primary Key повинні бути унікальними.

• Primary Key не може містити `NULL`.

• Foreign Key посилається на key іншої table.

• Foreign Key використовується для створення зв'язку між tables.

• Table, на яку посилається Foreign Key, називається **parent table** або referenced table.

• Table, яка містить Foreign Key, називається **child table** або referencing table.

• Foreign Key може містити повторювані значення.

• Foreign Key може містити `NULL`, якщо це дозволено схемою.

• Foreign Key допомагає підтримувати **referential integrity**.

• Primary Key визначає, **хто це**.

• Foreign Key визначає, **до кого він відноситься**.

---

## Primary Key

**Primary Key** — ключ, який однозначно ідентифікує кожен record у table.

Наприклад:

    users

    id | name
    ---|------
    1  | Alice
    2  | Bob
    3  | Charlie

`id` є Primary Key.

    id = 1 → Alice
    id = 2 → Bob
    id = 3 → Charlie

Кожен record має унікальний `id`.

---

### Властивості Primary Key

Primary Key має дві основні властивості:

    UNIQUE
    NOT NULL

Тобто:

    Primary Key
        │
        ├── unique
        └── not null

Наприклад:

    id
    --
    1
    2
    3

Правильно.

А так:

    id
    --
    1
    1
    2

неправильно, тому що `1` повторюється.

І так:

    id
    --
    1
    NULL
    3

також неправильно.

---

## Primary Key Constraint

Primary Key створюється за допомогою constraint:

    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(255)
    );

Тут:

    id → Primary Key

DBMS гарантує, що:

    id ≠ NULL
    id → unique

---

## INSERT з Primary Key

Наприклад:

    INSERT INTO users (id, name, email)
    VALUES (1, 'Alice', 'alice@mail.com');

Можна додати:

    INSERT INTO users (id, name, email)
    VALUES (2, 'Bob', 'bob@mail.com');

Але не можна додати:

    INSERT INTO users (id, name, email)
    VALUES (1, 'John', 'john@mail.com');

Тому що `id = 1` вже існує.

---

## Primary Key та ID

Найчастіше Primary Key називають:

    id

Наприклад:

    users
    products
    orders

можуть мати:

    users.id
    products.id
    orders.id

Але Primary Key не обов'язково повинен називатися `id`.

Наприклад:

    users
    │
    └── user_id ← Primary Key

або:

    countries
    │
    └── country_code ← Primary Key

---

## Surrogate Key

**Surrogate Key** — штучний ключ, створений спеціально для ідентифікації record.

Наприклад:

    id
    --
    1
    2
    3

Типовий варіант:

    CREATE TABLE users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(100)
    );

У цьому випадку database може автоматично генерувати:

    1
    2
    3
    4
    ...

Перевага:

    id

не залежить від реальних властивостей entity.

---

## Natural Key

**Natural Key** — ключ, який має реальне значення у предметній області.

Наприклад:

    country_code
    UA
    US
    DE
    PL

або:

    isbn
    978...

Такий ключ існує не тільки для database, а має значення у реальному світі.

---

## Surrogate Key vs Natural Key

### Surrogate Key

    id
    1
    2
    3

Переваги:

• простий
• стабільний
• зручний для relationships
• не залежить від бізнес-даних

### Natural Key

    country_code
    UA
    US
    DE

Переваги:

• має реальне значення
• може не потребувати додаткового ID

Але natural key може змінитися або мати складнішу структуру.

---

## Foreign Key

**Foreign Key** — column, яка посилається на Primary Key іншої table.

Наприклад:

    users

    id | name
    ---|------
    1  | Alice
    2  | Bob

    orders

    id | user_id | total
    ---|---------|------
    1  | 1       | 100
    2  | 1       | 250
    3  | 2       | 80

Тут:

    users.id

— Primary Key.

    orders.user_id

— Foreign Key.

Зв'язок:

    users.id
        ↑
        │
    orders.user_id

---

## Parent Table

Table, на яку посилається Foreign Key, називається **parent table**.

Наприклад:

    users

є parent table.

    orders

є child table.

    users
       │
       │ id
       ▼
    orders
       │
       └── user_id

Тобто:

    Parent:
    users

    Child:
    orders

---

## Child Table

**Child table** містить Foreign Key.

Наприклад:

    orders

    id | user_id | total
    ---|---------|------
    1  | 1       | 100
    2  | 1       | 250
    3  | 2       | 80

`user_id` посилається на:

    users.id

Тому:

    orders → child
    users  → parent

---

## Створення Foreign Key

SQL:

    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name VARCHAR(100)
    );

Потім:

    CREATE TABLE orders (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        total DECIMAL(10, 2),

        FOREIGN KEY (user_id)
            REFERENCES users(id)
    );

Тут:

    orders.user_id
            ↓
        users.id

---

## Foreign Key Constraint

Foreign Key — це не просто назва column.

Наприклад:

    user_id INTEGER

сам по собі ще не означає Foreign Key.

Foreign Key constraint створюється:

    FOREIGN KEY (user_id)
    REFERENCES users(id)

Повністю:

    CREATE TABLE orders (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,

        FOREIGN KEY (user_id)
            REFERENCES users(id)
    );

---

## Referential Integrity

**Referential Integrity** — правило, яке гарантує коректність зв'язків між tables.

Наприклад:

    users

    id
    --
    1
    2
    3

    orders

    id | user_id
    ---|--------
    1  | 1
    2  | 2
    3  | 3

Це правильно.

А:

    orders

    id | user_id
    ---|--------
    1  | 1
    2  | 999

неправильно, якщо user `999` не існує.

Foreign Key constraint не дозволить створити такий record.

    orders.user_id = 999
              │
              ▼
          users.id = 999
              │
              ✗
          does not exist

---

## Чому Foreign Key важливий

Без Foreign Key database могла б містити:

    users

    id | name
    ---|------
    1  | Alice
    2  | Bob

і:

    orders

    id | user_id
    ---|--------
    1  | 1
    2  | 999
    3  | 500

Але:

    user_id = 999
    user_id = 500

не відповідають жодному user.

Foreign Key допомагає database не допустити такі некоректні relationships.

---

## Foreign Key може повторюватися

На відміну від Primary Key, Foreign Key **не повинен бути унікальним**.

Наприклад:

    users

    id | name
    ---|------
    1  | Alice
    2  | Bob

    orders

    id | user_id
    ---|--------
    1  | 1
    2  | 1
    3  | 1
    4  | 2

`user_id = 1` повторюється.

Це правильно.

Це означає:

    Alice
     ├── Order 1
     ├── Order 2
     └── Order 3

    Bob
     └── Order 4

---

## `ON DELETE`

Що відбувається з child records, якщо parent record видаляється?

Наприклад:

    users
    id = 1

має orders:

    orders
    user_id = 1

Database повинна знати, що робити з orders.

Для цього використовуються actions:

    ON DELETE CASCADE
    ON DELETE SET NULL
    ON DELETE RESTRICT
    ON DELETE NO ACTION

---

### ON DELETE CASCADE

Якщо parent видаляється, пов'язані child records також видаляються.

    CREATE TABLE orders (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,

        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
    );

Було:

    users
    id = 1

    orders
    id | user_id
    ---|--------
    1  | 1
    2  | 1

Видаляємо user:

    DELETE FROM users
    WHERE id = 1;

Orders також будуть видалені.

    users
    1 → deleted

    orders
    1 → deleted
    2 → deleted

---

### ON DELETE SET NULL

При видаленні parent record Foreign Key встановлюється в `NULL`.

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL

Тоді:

    user_id = 1

може стати:

    user_id = NULL

Для цього column повинна дозволяти `NULL`.

---

### ON DELETE RESTRICT

Не дозволяє видалити parent record, якщо існують child records.

    users
    id = 1
       │
       └── orders exist
              │
              ▼
         DELETE blocked

Це може бути бажаною поведінкою, коли видалення parent entity небажане.

---

## `ON UPDATE`

Foreign Key також може визначати поведінку при зміні referenced key.

Наприклад:

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE

У такому випадку зміна referenced key може автоматично поширюватися на пов'язані records.

На практиці Primary Key зазвичай стабільний і рідко змінюється.

---

## Composite Primary Key

Primary Key може складатися з декількох columns.

Наприклад:

    order_items

    order_id | product_id | quantity
    ---------|------------|---------
    1        | 10         | 2
    1        | 20         | 1
    2        | 10         | 3

Можна використати:

    (order_id, product_id)

як Composite Primary Key.

SQL:

    CREATE TABLE order_items (
        order_id INTEGER,
        product_id INTEGER,
        quantity INTEGER,

        PRIMARY KEY (order_id, product_id)
    );

Тут комбінація:

    order_id + product_id

повинна бути унікальною.

---

## Composite Foreign Key

Foreign Key також може складатися з декількох columns.

Наприклад:

    FOREIGN KEY (order_id, product_id)
    REFERENCES order_items(order_id, product_id)

Це використовується рідше, але важливо розуміти, що key може складатися з декількох columns.

---

## UNIQUE vs PRIMARY KEY

`PRIMARY KEY` і `UNIQUE` обидва забезпечують унікальність, але мають різне призначення.

Наприклад:

    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        email VARCHAR(255) UNIQUE
    );

Тут:

    id    → Primary Key
    email → Unique

`id` ідентифікує user.

`email` також не може повторюватися, але він не є Primary Key.

Важливо:

    PRIMARY KEY → головний ідентифікатор record

    UNIQUE → значення не повинно повторюватися

---

## Candidate Key

**Candidate Key** — column або набір columns, які можуть однозначно ідентифікувати record.

Наприклад:

    users

    id | email
    ---|----------------
    1  | alice@mail.com
    2  | bob@mail.com

Теоретично і:

    id

і:

    email

можуть однозначно ідентифікувати user.

Обидва можуть бути candidate keys.

Один із них обирається як Primary Key.

---

## Один Primary Key, кілька UNIQUE

Наприклад:

    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        username VARCHAR(100) UNIQUE
    );

Тут:

    id       → Primary Key
    email    → Candidate Key / UNIQUE
    username → Candidate Key / UNIQUE

Але тільки:

    id

є Primary Key.

---

## Типова структура database

    shop_database
    │
    ├── users
    │   └── id ← PK
    │
    ├── products
    │   └── id ← PK
    │
    ├── orders
    │   ├── id ← PK
    │   └── user_id ← FK → users.id
    │
    └── order_items
        ├── order_id ← FK → orders.id
        └── product_id ← FK → products.id

Зв'язки:

    users.id
       ↑
       │
    orders.user_id

    orders.id
       ↑
       │
    order_items.order_id

    products.id
       ↑
       │
    order_items.product_id

Таким чином Primary Keys і Foreign Keys формують основу relationships між tables.

---

## Як DBMS перевіряє Foreign Key

При додаванні record:

    INSERT INTO orders (id, user_id, total)
    VALUES (1, 5, 100);

DBMS перевіряє:

    orders.user_id = 5
            │
            ▼
        users.id = 5 ?
            │
       ┌────┴────┐
       │         │
      YES        NO
       │         │
       ▼         ▼
     INSERT     ERROR

Якщо user `5` існує:

    INSERT → OK

Якщо не існує:

    INSERT → ERROR

Це і є частина referential integrity.

---

## DELETE та Foreign Key

Уявімо:

    users

    id | name
    ---|------
    1  | Alice

і:

    orders

    id | user_id
    ---|--------
    1  | 1
    2  | 1

Спроба:

    DELETE FROM users
    WHERE id = 1;

може:

    CASCADE
    → видалити orders

    SET NULL
    → user_id = NULL

    RESTRICT
    → заборонити DELETE

Тому поведінка залежить від Foreign Key constraint.

---

## Типові помилки

❌ Вважати Primary Key і Foreign Key одним і тим самим.

❌ Вважати, що Foreign Key завжди унікальний.

❌ Вважати, що Foreign Key не може бути `NULL`.

❌ Вважати, що Foreign Key автоматично створюється тільки через назву `user_id`.

❌ Вважати, що Primary Key обов'язково називається `id`.

❌ Вважати, що table може мати кілька Primary Key constraints.

❌ Плутати Primary Key з `UNIQUE`.

❌ Не розуміти parent і child tables.

❌ Створювати Foreign Key на column, яка не є відповідним key/unique constraint у referenced table.

❌ Не враховувати `ON DELETE` при проектуванні relationships.

❌ Видаляти parent records, не розуміючи наслідків для child records.

---

## Питання зі співбесіди

Що таке Primary Key?

Для чого потрібен Primary Key?

Які властивості має Primary Key?

Чи може Primary Key містити `NULL`?

Чи може Primary Key повторюватися?

Що таке Foreign Key?

Для чого потрібен Foreign Key?

Чи може Foreign Key повторюватися?

Чи може Foreign Key бути `NULL`?

Яка різниця між Primary Key та Foreign Key?

Що таке parent table?

Що таке child table?

Що таке Referential Integrity?

Що таке Primary Key Constraint?

Що таке Foreign Key Constraint?

Що таке `ON DELETE CASCADE`?

Що таке `ON DELETE SET NULL`?

Що таке `ON DELETE RESTRICT`?

Що таке `ON UPDATE CASCADE`?

Що таке Composite Primary Key?

Що таке Composite Foreign Key?

Що таке Candidate Key?

Що таке Natural Key?

Що таке Surrogate Key?

Яка різниця між `PRIMARY KEY` та `UNIQUE`?

Чому Foreign Key може повторюватися?

Що станеться, якщо вставити Foreign Key, якого немає у parent table?

---

## Шлях

🟢 **Core (обов'язково знати)**

Що таке Primary Key.

Що таке Foreign Key.

Різниця між Primary Key та Foreign Key.

Властивості Primary Key.

Чому Primary Key повинен бути unique.

Чому Primary Key не може бути NULL.

Як Foreign Key створює relationship.

Що таке parent table.

Що таке child table.

Що таке Referential Integrity.

---

🔵 **Junior**

Як створити Primary Key у SQL.

Як створити Foreign Key у SQL.

Що таке `PRIMARY KEY`.

Що таке `FOREIGN KEY`.

Що таке `REFERENCES`.

Що таке `UNIQUE`.

Що таке `ON DELETE`.

Що таке `ON UPDATE`.

Різниця між `CASCADE`, `SET NULL` та `RESTRICT`.

Що таке Composite Key.

Як DBMS перевіряє Foreign Key.

---

🟠 **Middle**

Candidate Keys.

Natural Keys.

Surrogate Keys.

Composite Keys.

Design Primary Keys.

Design Foreign Keys.

Referential Integrity.

Cascade strategies.

Foreign Key indexing.

Relationships та constraints.

Вплив ключів на database design.

Trade-offs між natural та surrogate keys.

---

🔴 **Senior**

Key design у distributed systems.

Composite keys у великих databases.

Primary Key та partitioning.

Distributed ID generation.

UUID та sequence-based IDs.

Key locality.

Hot partitions.

Sharding keys.

Global uniqueness.

Database scalability та key design.

Trade-offs між UUID, integer та natural keys.

---

## Міні-шпаргалка

### Primary Key

    users

    id ← PRIMARY KEY
    │
    ├── 1
    ├── 2
    └── 3

Правила:

    PRIMARY KEY
    │
    ├── UNIQUE
    └── NOT NULL

---

### Foreign Key

    users
    │
    └── id ← PK
          ↑
          │
    orders
    │
    └── user_id ← FK

---

### Parent → Child

    Parent Table
    users
       │
       │ id
       ▼
    Child Table
    orders
       │
       └── user_id

---

### Primary Key vs Foreign Key

    PRIMARY KEY
         │
         └── identifies record

    FOREIGN KEY
         │
         └── references another record

Або ще простіше:

    PK → ХТО ЦЕ?

    FK → З КИМ ПОВ'ЯЗАНИЙ?

---

### Referential Integrity

    users
    id
    1
    2
    3
    ↑
    │
    │ valid reference
    │
    orders
    user_id
    1
    2
    3

Невалідно:

    users
    id
    1
    2
    3

    orders
    user_id
    999  ← ❌ user 999 не існує

---

### Основний SQL

Primary Key:

    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name VARCHAR(100)
    );

Foreign Key:

    CREATE TABLE orders (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,

        FOREIGN KEY (user_id)
            REFERENCES users(id)
    );

Cascade:

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

---

## Головне

• **Primary Key** однозначно ідентифікує record у table.

• Primary Key повинен бути унікальним і не може бути `NULL`.

• **Foreign Key** посилається на key іншої table.

• Foreign Key створює та підтримує relationship між tables.

• **Parent table** містить referenced key.

• **Child table** містить Foreign Key.

• Foreign Key може повторюватися.

• Foreign Key може бути `NULL`, якщо це дозволено схемою.

• **Referential Integrity** гарантує коректність посилань між tables.

• `PRIMARY KEY` — constraint для головного ідентифікатора.

• `FOREIGN KEY` — constraint для зв'язку між tables.

• `REFERENCES` визначає, на яку table і column посилається Foreign Key.

• `UNIQUE` забезпечує унікальність значень, але не робить column Primary Key.

• **Composite Key** складається з декількох columns.

• **Surrogate Key** — штучний ключ, наприклад числовий `id`.

• **Natural Key** — ключ, який має реальне значення у предметній області.

• `ON DELETE` визначає, що робити з child records при видаленні parent record.

• Primary Key відповідає на питання:

    "Хто це?"

• Foreign Key відповідає на питання:

    "З ким це пов'язано?"

Головна модель:

    DATABASE
        │
        ├── users
        │     └── id ← PRIMARY KEY
        │
        └── orders
              ├── id ← PRIMARY KEY
              └── user_id ← FOREIGN KEY
                             │
                             └── references users.id
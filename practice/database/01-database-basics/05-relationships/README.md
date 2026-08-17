## 05. Relationships

**Database Relationship** — це логічний зв'язок між records у різних tables, який визначає, як дані пов'язані між собою.

Relationships дозволяють розділяти дані між tables та пов'язувати їх через Primary Keys і Foreign Keys.

Наприклад:

    users
    │
    └── id ← Primary Key
          ↑
          │
    orders
    │
    └── user_id ← Foreign Key

Тут `orders.user_id` посилається на `users.id`.

Це означає:

    User
      │
      └── має Orders

---

### Ключові поняття

✔ relationship  
✔ Primary Key  
✔ Foreign Key  
✔ parent table  
✔ child table  
✔ one-to-one (1:1)  
✔ one-to-many (1:N)  
✔ many-to-many (N:M)  
✔ cardinality  
✔ optional relationship  
✔ mandatory relationship  
✔ junction table  
✔ associative table  
✔ referential integrity  
✔ foreign key constraint  
✔ `JOIN`

---

### Що потрібно пам'ятати

• Relationship описує зв'язок між entities у database.

• У реляційних databases relationships зазвичай реалізуються через Primary Key і Foreign Key.

• **One-to-One (1:1)** — одному record однієї table відповідає максимум один record іншої table.

• **One-to-Many (1:N)** — одному record parent table може відповідати багато records child table.

• **Many-to-Many (N:M)** — багато records однієї table можуть бути пов'язані з багатьма records іншої table.

• У реляційній database Many-to-Many зазвичай реалізується через **junction table**.

• Foreign Key зазвичай знаходиться на стороні `many`.

• Cardinality описує, скільки records однієї entity можуть бути пов'язані з records іншої entity.

• Relationship може бути обов'язковим або необов'язковим.

• Relationship — це логічний зв'язок, а Foreign Key — один із механізмів реалізації цього зв'язку.

• `JOIN` використовується для отримання пов'язаних даних із декількох tables.

---

## Що таке Relationship

Наприклад, у web application є:

    users

    id | name
    ---|------
    1  | Alice
    2  | Bob

і:

    orders

    id | user_id | total
    ---|---------|------
    1  | 1       | 100
    2  | 1       | 250
    3  | 2       | 80

Тут існує relationship:

    users.id
        ↑
        │
    orders.user_id

Логічно:

    Alice
      │
      ├── Order 1
      └── Order 2

    Bob
      │
      └── Order 3

Тобто:

    User → Orders

---

## Relationship та Foreign Key

Важливо розрізняти:

**Relationship** — логічний зв'язок між entities.

**Foreign Key** — database constraint, який реалізує та контролює такий зв'язок.

Наприклад:

    users
    │
    └── id ← PK
          ↑
          │ relationship
          │
    orders
    │
    └── user_id ← FK

Тобто:

    Relationship
         │
         ▼
    users ←──── orders
       │          │
       │          │
       PK         FK

---

# Типи Relationships

Основні типи relationships:

    1:1  → One-to-One

    1:N  → One-to-Many

    N:M  → Many-to-Many

---

## One-to-One (1:1)

**One-to-One** — одному record однієї table відповідає максимум один record іншої table.

Наприклад:

    users

    id | name
    ---|------
    1  | Alice
    2  | Bob

    user_profiles

    id | user_id | bio
    ---|---------|-----
    1  | 1       | Developer
    2  | 2       | Designer

Relationship:

    users.id
        ↑
        │
    user_profiles.user_id

Логічно:

    Alice
      │
      └── Profile

    Bob
      │
      └── Profile

Один user має один profile.

---

## Реалізація One-to-One

SQL:

    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name VARCHAR(100)
    );

    CREATE TABLE user_profiles (
        id INTEGER PRIMARY KEY,
        user_id INTEGER UNIQUE,
        bio TEXT,

        FOREIGN KEY (user_id)
            REFERENCES users(id)
    );

Ключовий момент:

    user_id UNIQUE

Саме `UNIQUE` не дозволяє одному user мати декілька profiles.

Без `UNIQUE` це вже могло б бути:

    user_id
    -------
    1
    1
    1

і relationship перетворився б на One-to-Many.

---

## Приклад One-to-One

    users
    │
    ├── id = 1
    │
    └──────────────┐
                   │
                   ▼
             user_profiles
             │
             └── user_id = 1

Відношення:

    User 1 ↔ Profile 1

---

# One-to-Many (1:N)

**One-to-Many** — одному record parent table може відповідати багато records child table.

Це один із найпоширеніших типів relationships.

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
    3  | 1       | 80
    4  | 2       | 50

Relationship:

    users.id
        ↑
        │
    orders.user_id

Логічно:

    Alice
      │
      ├── Order 1
      ├── Order 2
      └── Order 3

    Bob
      │
      └── Order 4

Один user → багато orders.

---

## Реалізація One-to-Many

Parent:

    users

    id ← PRIMARY KEY

Child:

    orders

    user_id ← FOREIGN KEY

SQL:

    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name VARCHAR(100)
    );

    CREATE TABLE orders (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        total DECIMAL(10, 2),

        FOREIGN KEY (user_id)
            REFERENCES users(id)
    );

Головне правило:

    One-to-Many

    Parent
       │
       │ 1
       │
       ▼
    Child
       │
       │ many
       ▼
    Records

---

## Де знаходиться Foreign Key

Для One-to-Many Foreign Key знаходиться на стороні **Many**.

Наприклад:

    users
    │
    │ 1
    │
    ▼
    orders
    │
    │ many
    ▼

Тому:

    orders.user_id ← FK

а не:

    users.order_id

Це фундаментальний принцип реляційного database design.

---

# Many-to-Many (N:M)

**Many-to-Many** — багато records однієї table можуть бути пов'язані з багатьма records іншої table.

Наприклад:

    students

    id | name
    ---|------
    1  | Alice
    2  | Bob
    3  | Charlie

    courses

    id | title
    ---|---------
    1  | Math
    2  | Physics
    3  | English

Один student може відвідувати багато courses.

Один course може мати багато students.

    Alice
      ├── Math
      └── Physics

    Bob
      ├── Math
      └── English

    Charlie
      ├── Physics
      └── English

Це:

    Students ↔ Courses

Many-to-Many.

---

# Junction Table

У реляційній database Many-to-Many зазвичай реалізується через третю table — **junction table**.

Також її називають:

    junction table
    associative table
    linking table
    bridge table

Наприклад:

    students
        │
        │
        ▼
    student_courses
        ▲
        │
        │
    courses

Junction table:

    student_courses

    student_id | course_id
    -----------|----------
    1          | 1
    1          | 2
    2          | 1
    2          | 3
    3          | 2
    3          | 3

Тепер:

    students
        │
        │ 1:N
        ▼
    student_courses
        ▲
        │ N:1
        │
    courses

Дві One-to-Many relationships разом створюють Many-to-Many.

---

## Реалізація Many-to-Many

SQL:

    CREATE TABLE students (
        id INTEGER PRIMARY KEY,
        name VARCHAR(100)
    );

    CREATE TABLE courses (
        id INTEGER PRIMARY KEY,
        title VARCHAR(100)
    );

    CREATE TABLE student_courses (
        student_id INTEGER,
        course_id INTEGER,

        PRIMARY KEY (student_id, course_id),

        FOREIGN KEY (student_id)
            REFERENCES students(id),

        FOREIGN KEY (course_id)
            REFERENCES courses(id)
    );

Тут:

    student_courses.student_id
            ↓
        students.id

    student_courses.course_id
            ↓
        courses.id

---

## Чому потрібна Junction Table

Не можна просто зробити:

    students

    id | name | course_id
    ---|------|----------
    1  | Alice| 1, 2

Це поганий реляційний design.

Також не можна:

    students

    id | name | course_1 | course_2 | course_3
    ---|------|----------|----------|---------
    1  | Alice| Math     | Physics  | English

Кількість courses може бути необмеженою.

Правильніше:

    students
        │
        ▼
    student_courses
        ▲
        │
        ▼
    courses

---

# Cardinality

**Cardinality** — характеристика того, скільки records однієї entity можуть бути пов'язані з records іншої entity.

Основні варіанти:

    1:1
    1:N
    N:M

Наприклад:

    User 1 ───── 1 Profile

    User 1 ───── N Orders

    Student N ─── M Courses

---

## Cardinality у One-to-One

    User
      │
      │ 1
      │
      ▼
    Profile
      │
      │ 1

Модель:

    User 1 ↔ Profile 1

---

## Cardinality у One-to-Many

    User
      │
      │ 1
      │
      ├────────── Order
      ├────────── Order
      └────────── Order

Модель:

    User 1 → Orders N

---

## Cardinality у Many-to-Many

    Student
       │
       ├──────── Course
       ├──────── Course
       └──────── Course

    Student
       │
       ├──────── Course
       └──────── Course

І навпаки:

    Course
       │
       ├──────── Student
       ├──────── Student
       └──────── Student

---

# Optional Relationship

Relationship може бути **optional**.

Наприклад:

    users

    id | name
    ---|------
    1  | Alice
    2  | Bob

    user_profiles

    id | user_id
    ---|--------
    1  | 1

Alice має profile.

Bob не має profile.

Тобто:

    Alice → Profile
    Bob   → NULL

У database це часто реалізується через nullable Foreign Key або відсутність child record.

---

# Mandatory Relationship

Relationship може бути **mandatory**.

Наприклад, кожен order повинен належати user.

Тоді:

    orders

    user_id INTEGER NOT NULL

і:

    FOREIGN KEY (user_id)
        REFERENCES users(id)

Тепер order не може існувати без user.

    Order
      │
      └── user_id
             │
             └── required

---

## Optional vs Mandatory

Optional:

    user_id INTEGER

Можливо:

    user_id = NULL

Mandatory:

    user_id INTEGER NOT NULL

Необхідно:

    user_id ≠ NULL

---

# Self-Referencing Relationship

Table може посилатися сама на себе.

Наприклад:

    employees

    id | name    | manager_id
    ---|---------|-----------
    1  | Alice   | NULL
    2  | Bob     | 1
    3  | Charlie | 1
    4  | David   | 2

Тут:

    employees.manager_id
            ↓
    employees.id

Relationship:

    Alice
      ├── Bob
      │    └── David
      │
      └── Charlie

Це називається **self-referencing relationship** або **recursive relationship**.

---

## SQL Self-Reference

    CREATE TABLE employees (
        id INTEGER PRIMARY KEY,
        name VARCHAR(100),
        manager_id INTEGER,

        FOREIGN KEY (manager_id)
            REFERENCES employees(id)
    );

Тут одна table:

    employees

має Foreign Key на саму себе.

---

# Relationships у Database Design

При проектуванні database спочатку визначають entities.

Наприклад:

    User
    Product
    Order

Потім визначають relationships:

    User → Order

    Order → Product

Після цього визначають cardinality:

    User 1 → N Orders

    Order N → M Products

Для Many-to-Many створюється junction table:

    Order
      │
      ▼
    OrderItem
      ▲
      │
    Product

---

# Практичний приклад: Online Shop

Entities:

    users
    products
    orders
    order_items

Relationships:

    users
       │
       │ 1:N
       ▼
    orders
       │
       │ 1:N
       ▼
    order_items
       ▲
       │ N:1
       │
    products

Логіка:

    User
      │
      ├── Order
      │     ├── Product
      │     ├── Product
      │     └── Product
      │
      └── Order
            ├── Product
            └── Product

---

## Таблиці Online Shop

    users

    id | name
    ---|------
    1  | Alice
    2  | Bob

    products

    id | name
    ---|------
    1  | Laptop
    2  | Mouse
    3  | Keyboard

    orders

    id | user_id
    ---|--------
    1  | 1
    2  | 1
    3  | 2

    order_items

    order_id | product_id | quantity
    ---------|------------|---------
    1        | 1          | 1
    1        | 2          | 2
    2        | 3          | 1
    3        | 1          | 1

---

## Relationships у Online Shop

    users.id
       ↑
       │
    orders.user_id

Це:

    User 1 → N Orders

Далі:

    orders.id
       ↑
       │
    order_items.order_id

Це:

    Order 1 → N OrderItems

І:

    products.id
       ↑
       │
    order_items.product_id

Це:

    Product 1 → N OrderItems

У результаті:

    Orders N ↔ M Products

через:

    order_items

---

# JOIN

Relationship дозволяє отримувати пов'язані дані через `JOIN`.

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

Запит:

    SELECT users.name, orders.total
    FROM users
    JOIN orders
        ON users.id = orders.user_id;

Результат:

    name  | total
    ------|------
    Alice | 100
    Alice | 250
    Bob   | 80

`JOIN` використовує relationship між:

    users.id

і:

    orders.user_id

---

# Relationship та JOIN

Важливо:

**Foreign Key** визначає та контролює relationship.

**JOIN** використовує relationship для отримання пов'язаних даних.

Тобто:

    Foreign Key
         │
         ▼
    Relationship
         │
         ▼
       JOIN
         │
         ▼
    Related Data

---

# Relationship без Foreign Key

Теоретично application може логічно використовувати однакові IDs навіть без Foreign Key.

Наприклад:

    users

    id
    1
    2

    orders

    user_id
    1
    2

Application може вважати, що:

    orders.user_id → users.id

Але database сама не контролює це.

Можна випадково створити:

    orders.user_id = 999

Foreign Key constraint забезпечує database-level integrity.

Тому у реляційних databases краще явно визначати relationships через constraints, коли це відповідає design.

---

# Типові помилки

❌ Плутати relationship і Foreign Key.

❌ Вважати, що всі relationships є One-to-One.

❌ Не розуміти різницю між One-to-Many та Many-to-Many.

❌ Зберігати список IDs через кому в одній column.

❌ Створювати багато columns типу `product_1`, `product_2`, `product_3`.

❌ Не використовувати junction table для Many-to-Many.

❌ Розміщувати Foreign Key не на тій стороні relationship.

❌ Забувати про cardinality.

❌ Не враховувати optional / mandatory relationship.

❌ Не розуміти, як `UNIQUE` впливає на One-to-One.

❌ Не розуміти, як Foreign Key забезпечує referential integrity.

❌ Використовувати `CASCADE` без розуміння наслідків.

❌ Вважати, що `JOIN` створює relationship.

❌ Вважати, що relationship існує тільки тоді, коли використовується `JOIN`.

---

# Питання зі співбесіди

Що таке database relationship?

Які основні типи relationships існують?

Що таке One-to-One?

Що таке One-to-Many?

Що таке Many-to-Many?

Що таке cardinality?

Де знаходиться Foreign Key у One-to-Many?

Як реалізувати One-to-One?

Як реалізувати One-to-Many?

Як реалізувати Many-to-Many?

Що таке junction table?

Для чого потрібна junction table?

Чому Many-to-Many реалізується через третю table?

Що таке associative table?

Що таке optional relationship?

Що таке mandatory relationship?

Як зробити Foreign Key mandatory?

Що таке self-referencing relationship?

Що таке recursive relationship?

Як relationship пов'язаний із Foreign Key?

Яка різниця між relationship та JOIN?

Для чого використовується JOIN?

Як database забезпечує referential integrity?

Чому Foreign Key знаходиться на стороні Many?

Як `UNIQUE` допомагає реалізувати One-to-One?

---

# Шлях

🟢 **Core (обов'язково знати)**

Що таке relationship.

Що таке Primary Key.

Що таке Foreign Key.

Що таке One-to-One.

Що таке One-to-Many.

Що таке Many-to-Many.

Що таке cardinality.

Що таке parent table.

Що таке child table.

Роль Foreign Key у relationships.

---

🔵 **Junior**

Як реалізувати One-to-One.

Як реалізувати One-to-Many.

Як реалізувати Many-to-Many.

Що таке junction table.

Що таке associative table.

Як працює `UNIQUE` у One-to-One.

Що таке optional relationship.

Що таке mandatory relationship.

Що таке self-referencing relationship.

Як використовувати `JOIN` для пов'язаних tables.

---

🟠 **Middle**

Database relationship design.

Cardinality design.

Optionality.

Junction table design.

Composite keys у junction tables.

Self-referencing relationships.

Cascade strategies.

Referential integrity.

Relationship indexing.

Normalization та relationships.

Trade-offs між різними способами моделювання relationships.

---

🔴 **Senior**

Relationship design у distributed databases.

Relationships та database scalability.

Relationships у sharded databases.

Cross-service relationships.

Distributed data consistency.

Denormalization vs relationships.

Database boundaries у microservices.

Cross-database relationships.

Data ownership.

Trade-offs між strong relationships та system scalability.

---

# Міні-шпаргалка

### Основні типи

    1:1
    One-to-One

    User
      │
      └── Profile


    1:N
    One-to-Many

    User
      ├── Order
      ├── Order
      └── Order


    N:M
    Many-to-Many

    Student
      ├── Course
      └── Course

    Course
      ├── Student
      └── Student

---

### One-to-One

    users
      │
      │ 1
      ▼
    user_profiles
      │
      │ 1

    users.id
        ↑
        │
    user_profiles.user_id

    user_profiles.user_id → UNIQUE

---

### One-to-Many

    users
       │
       │ 1
       ▼
    orders
       │
       │ N

    users.id
        ↑
        │
    orders.user_id

    FK знаходиться на стороні MANY.

---

### Many-to-Many

    students
        │
        │ 1:N
        ▼
    student_courses
        ▲
        │ N:1
        │
    courses

    student_courses.student_id
            ↓
        students.id

    student_courses.course_id
            ↓
        courses.id

---

### Junction Table

    A
     │
     │ 1:N
     ▼
    A_B
     ▲
     │ N:1
     │
    B

Дві One-to-Many relationships:

    A 1 → N A_B

    B 1 → N A_B

разом представляють:

    A N ↔ M B

---

### Self-Referencing

    employees
       │
       ├── id
       └── manager_id
              │
              └── references employees.id

Наприклад:

    Alice
      ├── Bob
      │    └── David
      └── Charlie

---

### Optional Relationship

    User
      │
      ├── Profile
      │
      └── no Profile

Можливо:

    NULL

---

### Mandatory Relationship

    Order
      │
      └── User
            │
            └── required

SQL:

    user_id INTEGER NOT NULL

---

### Relationship та Foreign Key

    Relationship
         │
         ▼
    users ←──── orders
       │           │
       │           │
       PK          FK

---

### Relationship та JOIN

    users
      │
      │ relationship
      ▼
    orders
      │
      │ JOIN
      ▼
    combined result

`JOIN` дозволяє отримати дані з пов'язаних tables.

---

### Головні правила

    1:1
    → UNIQUE Foreign Key

    1:N
    → Foreign Key на стороні N

    N:M
    → Junction Table

---

# Головне

• **Relationship** — логічний зв'язок між entities у database.

• У реляційних databases relationships зазвичай реалізуються через Primary Key і Foreign Key.

• Основні типи relationships:

    1:1
    1:N
    N:M

• **One-to-One** — одному record відповідає максимум один record іншої table.

• **One-to-Many** — одному parent record відповідає багато child records.

• **Many-to-Many** — багато records однієї table пов'язані з багатьма records іншої table.

• У One-to-Many Foreign Key знаходиться на стороні **Many**.

• Many-to-Many зазвичай реалізується через **junction table**.

• Junction table перетворює:

    N:M

на дві relationships:

    1:N
    N:1

• `UNIQUE` Foreign Key може використовуватися для реалізації One-to-One.

• **Cardinality** описує кількість можливих пов'язаних records.

• Relationship може бути optional або mandatory.

• `NOT NULL` часто використовується для mandatory Foreign Key.

• Table може посилатися сама на себе — це **self-referencing relationship**.

• **Foreign Key** забезпечує database-level контроль relationship.

• **JOIN** використовується для отримання даних із пов'язаних tables.

• `JOIN` не створює relationship — він використовує вже існуючий логічний зв'язок.

Головна модель:

    DATABASE
        │
        ├── users
        │     └── id ← PK
        │
        ├── orders
        │     ├── id ← PK
        │     └── user_id ← FK
        │                    │
        │                    └── users.id
        │
        └── order_items
              ├── order_id ← FK
              └── product_id ← FK

Типи:

    1:1 → One-to-One
    1:N → One-to-Many
    N:M → Many-to-Many

Правило, яке варто запам'ятати:

    1:N
    Foreign Key → на стороні N

    N:M
    Junction Table → посередині

    1:1
    Foreign Key + UNIQUE
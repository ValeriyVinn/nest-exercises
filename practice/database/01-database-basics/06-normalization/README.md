## 06. Normalization

**Normalization (нормалізація)** — це процес організації даних у database таким чином, щоб зменшити дублювання даних, уникнути аномалій при роботі з ними та зробити структуру database більш логічною та цілісною.

Основна ідея:

    Не зберігати одну й ту саму інформацію
    у багатьох місцях без необхідності.

Наприклад, погано:

    orders

    order_id | customer_name | customer_email | product
    ---------|---------------|----------------|--------
    1        | Alice         | alice@mail.com | Laptop
    2        | Alice         | alice@mail.com | Mouse
    3        | Alice         | alice@mail.com | Keyboard

Ім'я та email Alice повторюються.

Краще розділити дані:

    users
    id | name  | email
    ---|-------|----------------
    1  | Alice | alice@mail.com

    orders
    id | user_id | product
    ---|---------|--------
    1  | 1       | Laptop
    2  | 1       | Mouse
    3  | 1       | Keyboard

Тепер:

    users.id
        ↑
        │
    orders.user_id

---

### Ключові поняття

✔ normalization  
✔ denormalization  
✔ data redundancy  
✔ data duplication  
✔ data integrity  
✔ functional dependency  
✔ determinant  
✔ normalization forms  
✔ First Normal Form (1NF)  
✔ Second Normal Form (2NF)  
✔ Third Normal Form (3NF)  
✔ BCNF (Boyce-Codd Normal Form)  
✔ insertion anomaly  
✔ update anomaly  
✔ deletion anomaly  
✔ atomic values  
✔ partial dependency  
✔ transitive dependency  

---

### Що потрібно пам'ятати

• Normalization допомагає зменшити дублювання даних.

• Нормалізація розділяє дані на логічно пов'язані tables.

• Tables потім пов'язуються через Primary Keys і Foreign Keys.

• Основна мета normalization — не просто "зробити більше tables", а правильно організувати залежності між даними.

• Надлишкове дублювання даних може призводити до помилок та аномалій.

• Основні проблеми, які допомагає вирішити normalization:

    Update Anomaly
    Insert Anomaly
    Delete Anomaly

• **1NF** вимагає атомарних значень і відсутності повторюваних груп.

• **2NF** усуває partial dependencies від частини Composite Key.

• **3NF** усуває transitive dependencies між non-key attributes.

• Normalization найбільш важлива під час database design.

• Нормалізована database часто має більше tables, але це не є проблемою саме по собі.

• Для отримання пов'язаних даних використовуються `JOIN`.

• **Denormalization** — навмисне додавання redundancy для певних performance або architectural цілей.

---

# Навіщо потрібна Normalization

Уявімо одну велику table:

    orders

    order_id | customer_name | customer_email | product_name | product_price
    ---------|---------------|----------------|--------------|--------------
    1        | Alice         | alice@mail.com | Laptop       | 1000
    2        | Alice         | alice@mail.com | Mouse        | 50
    3        | Alice         | alice@mail.com | Keyboard     | 80

Проблема:

    Alice
    alice@mail.com

повторюються в кожному order.

Якщо Alice змінить email:

    old:
    alice@mail.com

    new:
    alice@example.com

потрібно змінити багато rows.

Якщо один row не оновити:

    order 1 → alice@example.com
    order 2 → alice@mail.com
    order 3 → alice@mail.com

database містить суперечливі дані.

Normalization допомагає уникнути такої проблеми.

---

# Data Redundancy

**Data Redundancy** — непотрібне повторне зберігання одних і тих самих даних.

Наприклад:

    orders

    order_id | user_id | user_name
    ---------|---------|----------
    1        | 10      | Alice
    2        | 10      | Alice
    3        | 10      | Alice
    4        | 10      | Alice

Тут:

    user_id = 10
    user_name = Alice

повторюється багато разів.

Якщо users багато, redundancy може значно збільшити кількість duplicated data.

Краще:

    users

    id | name
    ---|------
    10 | Alice

    orders

    id | user_id
    ---|--------
    1  | 10
    2  | 10
    3  | 10
    4  | 10

---

# Аномалії

Неправильно спроектована table може створювати три основні типи anomalies:

    Insert Anomaly
    Update Anomaly
    Delete Anomaly

---

# Update Anomaly

**Update Anomaly** — ситуація, коли одна зміна даних повинна бути виконана у багатьох rows.

Наприклад:

    orders

    order_id | user_id | user_name | email
    ---------|---------|-----------|----------------
    1        | 10      | Alice     | alice@mail.com
    2        | 10      | Alice     | alice@mail.com
    3        | 10      | Alice     | alice@mail.com

Alice змінює email.

Потрібно оновити:

    row 1
    row 2
    row 3

Якщо оновити тільки два:

    row 1 → new email
    row 2 → new email
    row 3 → old email

Отримуємо inconsistent data.

Нормалізація вирішує проблему:

    users

    id | name  | email
    ---|-------|----------------
    10 | Alice | alice@mail.com

    orders

    id | user_id
    ---|--------
    1  | 10
    2  | 10
    3  | 10

Тепер email зберігається в одному місці.

---

# Insert Anomaly

**Insert Anomaly** — ситуація, коли неможливо додати певні дані без додавання непов'язаних даних.

Наприклад:

    courses

    student_name | course
    -------------|--------
    Alice        | Math
    Bob          | Physics

Уявімо, що ми хочемо створити новий course:

    Chemistry

але поки що немає students.

У такій структурі ми не можемо нормально зберегти:

    Chemistry

без створення штучного student record.

Краще:

    courses

    id | name
    ---|---------
    1  | Math
    2  | Physics
    3  | Chemistry

і окремо:

    students

    id | name
    ---|------
    1  | Alice
    2  | Bob

та relationship:

    student_courses

    student_id | course_id
    -----------|----------
    1          | 1
    2          | 2

Тепер course можна створити незалежно від students.

---

# Delete Anomaly

**Delete Anomaly** — ситуація, коли видалення одного record випадково призводить до втрати іншої важливої інформації.

Наприклад:

    courses

    student | course
    --------|--------
    Alice   | Math
    Bob     | Physics

Якщо Bob залишає Physics і ми видаляємо:

    Bob | Physics

то одночасно втрачається інформація про те, що:

    Physics

взагалі існує.

У нормалізованій структурі:

    courses

    id | name
    ---|---------
    1  | Math
    2  | Physics

    students

    id | name
    ---|------
    1  | Alice
    2  | Bob

    student_courses

    student_id | course_id
    -----------|----------
    1          | 1
    2          | 2

Можна видалити relationship:

    student_id = 2
    course_id = 2

і при цьому:

    Physics

залишиться в `courses`.

---

# Normal Forms

Normalization має кілька рівнів, які називаються **Normal Forms**.

Основні:

    1NF
    First Normal Form

    2NF
    Second Normal Form

    3NF
    Third Normal Form

Також існує:

    BCNF
    Boyce-Codd Normal Form

Для практичного database design на Junior-рівні особливо важливо розуміти:

    1NF
    2NF
    3NF

---

# First Normal Form (1NF)

**1NF** вимагає, щоб кожне поле містило атомарне значення.

Тобто одна column — одне значення.

Погано:

    users

    id | name  | phones
    ---|-------|----------------------
    1  | Alice | 111-111, 222-222

У `phones` зберігається декілька значень.

Краще:

    users

    id | name
    ---|------
    1  | Alice

    user_phones

    id | user_id | phone
    ---|---------|--------
    1  | 1       | 111-111
    2  | 1       | 222-222

Тепер кожна column містить одне значення.

---

# Atomic Values

**Atomic Value** — значення, яке розглядається як неподільне в межах конкретної database model.

Наприклад:

    id | name  | email
    ---|-------|----------------
    1  | Alice | alice@mail.com

Кожне поле містить одне значення.

Погано:

    id | name  | emails
    ---|-------|-----------------------------
    1  | Alice | a@mail.com, b@mail.com

Краще:

    users

    id | name
    ---|------
    1  | Alice

    user_emails

    user_id | email
    --------|----------------
    1       | a@mail.com
    1       | b@mail.com

---

# Repeating Groups

1NF також пов'язана з відсутністю repeating groups.

Погано:

    students

    id | name  | course_1 | course_2 | course_3
    ---|-------|----------|----------|---------
    1  | Alice | Math     | Physics  | English

Проблема:

    course_1
    course_2
    course_3
    ...

Кількість columns обмежує кількість courses.

Краще:

    students

    id | name
    ---|------
    1  | Alice

    courses

    id | name
    ---|---------
    1  | Math
    2  | Physics
    3  | English

    student_courses

    student_id | course_id
    -----------|----------
    1          | 1
    1          | 2
    1          | 3

---

# Second Normal Form (2NF)

**2NF**:

    1NF
    +
    відсутність partial dependency

Особливо це важливо для tables із **Composite Primary Key**.

---

# Functional Dependency

**Functional Dependency** — залежність одного attribute від іншого.

Наприклад:

    user_id → user_name

Якщо ми знаємо:

    user_id = 10

то можемо однозначно визначити:

    user_name = Alice

Тобто:

    user_id
       │
       ▼
    user_name

---

# Partial Dependency

Partial dependency виникає, коли non-key attribute залежить тільки від частини Composite Key.

Наприклад:

    order_items

    order_id | product_id | product_name | quantity
    ---------|------------|--------------|---------
    1        | 10         | Laptop       | 1
    1        | 20         | Mouse        | 2
    2        | 10         | Laptop       | 3

Composite Primary Key:

    (order_id, product_id)

Але:

    product_id → product_name

`product_name` залежить тільки від:

    product_id

а не від усієї Composite Key:

    (order_id, product_id)

Це partial dependency.

---

# Як вирішити Partial Dependency

Розділити data.

Було:

    order_items

    order_id | product_id | product_name | quantity
    ---------|------------|--------------|---------
    1        | 10         | Laptop       | 1
    1        | 20         | Mouse        | 2
    2        | 10         | Laptop       | 3

Стає:

    products

    id | name
    ---|---------
    10 | Laptop
    20 | Mouse

    order_items

    order_id | product_id | quantity
    ---------|------------|---------
    1        | 10         | 1
    1        | 20         | 2
    2        | 10         | 3

Тепер:

    products.id
         ↑
         │
    order_items.product_id

`product_name` зберігається тільки в одному місці.

---

# Third Normal Form (3NF)

**3NF**:

    2NF
    +
    відсутність transitive dependency

Ідея:

    Non-key attribute
         ↓
    не повинен залежати
    від іншого non-key attribute

---

# Transitive Dependency

Наприклад:

    employees

    employee_id | employee_name | department_id | department_name
    ------------|---------------|---------------|----------------
    1           | Alice         | 10            | Engineering
    2           | Bob           | 10            | Engineering
    3           | Charlie       | 20            | Marketing

Primary Key:

    employee_id

Маємо залежності:

    employee_id
         ↓
    department_id
         ↓
    department_name

Тобто:

    employee_id → department_id

і:

    department_id → department_name

Отже:

    employee_id → department_name

Це transitive dependency.

---

# Як вирішити Transitive Dependency

Розділити tables.

Було:

    employees

    employee_id | employee_name | department_id | department_name
    ------------|---------------|---------------|----------------
    1           | Alice         | 10            | Engineering
    2           | Bob           | 10            | Engineering
    3           | Charlie       | 20            | Marketing

Краще:

    employees

    id | name    | department_id
    ---|---------|--------------
    1  | Alice   | 10
    2  | Bob     | 10
    3  | Charlie | 20

    departments

    id | name
    ---|------------
    10 | Engineering
    20 | Marketing

Relationship:

    departments.id
          ↑
          │
    employees.department_id

Тепер department name зберігається тільки в `departments`.

---

# 1NF → 2NF → 3NF

Спрощена модель:

    1NF
      │
      ├── atomic values
      ├── no repeating groups
      │
      ▼
    2NF
      │
      ├── 1NF
      └── no partial dependencies
      │
      ▼
    3NF
      │
      ├── 2NF
      └── no transitive dependencies

Можна запам'ятати:

    1NF → атомарність

    2NF → залежність від усього key

    3NF → відсутність залежності через інший non-key attribute

---

# Простий приклад Normalization

Спочатку маємо одну велику table:

    orders

    order_id | user_name | user_email | product_name | product_price
    ---------|-----------|------------|--------------|--------------
    1        | Alice     | a@mail.com | Laptop       | 1000
    2        | Alice     | a@mail.com | Mouse        | 50
    3        | Bob       | b@mail.com | Laptop       | 1000

Проблеми:

    Alice повторюється
    a@mail.com повторюється
    Laptop повторюється
    1000 повторюється

Розділяємо:

    users

    id | name  | email
    ---|-------|------------
    1  | Alice | a@mail.com
    2  | Bob   | b@mail.com

    products

    id | name   | price
    ---|--------|------
    1  | Laptop | 1000
    2  | Mouse  | 50

    orders

    id | user_id
    ---|--------
    1  | 1
    2  | 1
    3  | 2

    order_items

    order_id | product_id
    ---------|-----------
    1        | 1
    2        | 2
    3        | 1

Тепер:

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

---

# Normalization та Relationships

Normalization часто призводить до створення relationships.

Наприклад:

    users
       │
       │ 1:N
       ▼
    orders

    products
       │
       │ 1:N
       ▼
    order_items

    orders
       │
       │ 1:N
       ▼
    order_items

Тому теми:

    Primary / Foreign Keys
             ↓
    Relationships
             ↓
    Normalization

тісно пов'язані між собою.

---

# Normalization та JOIN

Після normalization дані часто знаходяться в різних tables.

Щоб отримати їх разом, використовують `JOIN`.

Наприклад:

    users

    id | name
    ---|------
    1  | Alice

    orders

    id | user_id | total
    ---|---------|------
    1  | 1       | 100

Запит:

    SELECT users.name, orders.total
    FROM users
    JOIN orders
        ON users.id = orders.user_id;

Результат:

    name  | total
    ------|------
    Alice | 100

Тобто normalization не означає, що дані "роз'єднані".

Вони пов'язані через keys і можуть бути об'єднані за допомогою `JOIN`.

---

# Normalization та Performance

Normalization має переваги:

• менше дублювання даних
• краща data integrity
• менше аномалій
• простіший контроль consistency
• легше змінювати дані в одному місці

Але є і trade-offs.

Більш нормалізована database може вимагати:

    більше tables
         ↓
    більше JOIN
         ↓
    складніші queries

Тому normalization — не абсолютне правило "чим більше, тим краще".

---

# Denormalization

**Denormalization** — навмисне додавання redundant data або об'єднання даних для зменшення кількості JOIN та покращення performance в певних сценаріях.

Наприклад, нормалізовано:

    users

    id | name
    ---|------
    1  | Alice

    orders

    id | user_id | total
    ---|---------|------
    1  | 1       | 100

Для отримання:

    order_id
    user_name
    total

потрібен `JOIN`.

У denormalized design можна зберігати:

    orders

    id | user_id | user_name | total
    ---|---------|-----------|------
    1  | 1       | Alice     | 100

Тепер JOIN не потрібен для цього конкретного запиту.

Але:

    user_name

дублюється.

---

# Normalization vs Denormalization

### Normalization

    less duplication
         ↓
    more tables
         ↓
    more JOINs

Переваги:

• data integrity
• consistency
• менше redundancy
• простіші updates

---

### Denormalization

    more duplication
         ↓
    fewer JOINs
         ↓
    potentially faster reads

Переваги:

• швидше читання у певних сценаріях
• менше JOIN
• зручніше для деяких reporting / analytics workloads

Недоліки:

• більше redundancy
• складніше підтримувати consistency
• складніші updates

---

# Коли потрібна Denormalization

Denormalization може бути корисною, коли:

• database має дуже багато read operations.

• JOIN стають дорогими для конкретного workload.

• потрібні швидкі read-heavy queries.

• використовується caching / reporting / analytics architecture.

• redundant data свідомо підтримується application або database mechanisms.

Важливо:

    Denormalization

не означає:

    "поганий database design"

Це може бути свідомий architectural trade-off.

---

# BCNF

**BCNF (Boyce-Codd Normal Form)** — більш сувора форма нормалізації, ніж 3NF.

У спрощеному вигляді:

    кожен determinant
    повинен бути candidate key

BCNF потрібна для деяких складніших dependency scenarios.

Для базового Junior database design достатньо добре розуміти:

    1NF
    2NF
    3NF

BCNF варто вивчати пізніше, коли добре зрозумілі functional dependencies та candidate keys.

---

# Functional Dependencies

Functional Dependency можна записати:

    A → B

Це означає:

    A determines B

Наприклад:

    user_id → user_name

Один `user_id` визначає одного `user_name`.

І:

    product_id → product_name

    product_id → product_price

Тобто:

    product_id
       ├──→ product_name
       └──→ product_price

---

# Determinant

**Determinant** — attribute або набір attributes, який визначає інший attribute.

Наприклад:

    user_id → user_name

Тут:

    user_id

є determinant.

---

# Normalization та Database Design

Normalization є частиною database design.

Загальний процес:

    Requirements
         ↓
    Identify Entities
         ↓
    Identify Attributes
         ↓
    Identify Relationships
         ↓
    Choose Keys
         ↓
    Normalize
         ↓
    Add Constraints
         ↓
    Review Performance
         ↓
    Database Schema

Normalization не відбувається ізольовано.

Вона пов'язана з:

    entities
    relationships
    keys
    constraints
    data integrity
    performance

---

# Практичний алгоритм Normalization

Коли проектуєш database:

### Крок 1

Визнач entities.

    User
    Product
    Order
    Category

### Крок 2

Визнач attributes.

    User:
    id
    name
    email

    Product:
    id
    name
    price

### Крок 3

Визнач Primary Keys.

    users.id
    products.id
    orders.id

### Крок 4

Визнач relationships.

    User 1:N Orders

    Order N:M Products

### Крок 5

Для N:M створити junction table.

    order_items

### Крок 6

Перевірити 1NF.

    atomic values
    no repeating groups

### Крок 7

Перевірити 2NF.

    no partial dependencies

### Крок 8

Перевірити 3NF.

    no transitive dependencies

### Крок 9

Додати constraints.

    PRIMARY KEY
    FOREIGN KEY
    UNIQUE
    NOT NULL
    CHECK

### Крок 10

Перевірити performance.

    indexes
    JOINs
    query patterns

---

# Типові помилки

❌ Вважати, що normalization означає просто створити багато tables.

❌ Вважати, що кожна database повинна бути максимально normalized.

❌ Плутати normalization і denormalization.

❌ Не розуміти, що саме є duplicated data.

❌ Зберігати список значень через кому в одній column.

❌ Створювати `phone1`, `phone2`, `phone3`.

❌ Повторювати user information у кожному order.

❌ Зберігати `department_name` у кожному employee record, якщо department має власну entity.

❌ Не розуміти partial dependency.

❌ Не розуміти transitive dependency.

❌ Вважати, що 3NF означає "три tables".

❌ Вважати, що JOIN є ознакою поганої normalization.

❌ Робити denormalization без конкретної причини.

❌ Оптимізувати database тільки через зменшення кількості tables.

---

# Питання зі співбесіди

Що таке normalization?

Навіщо потрібна normalization?

Що таке data redundancy?

Які проблеми виникають через duplicated data?

Що таке Update Anomaly?

Що таке Insert Anomaly?

Що таке Delete Anomaly?

Що таке First Normal Form?

Що таке Second Normal Form?

Що таке Third Normal Form?

Що таке BCNF?

Що таке atomic value?

Що таке repeating group?

Що таке functional dependency?

Що таке partial dependency?

Що таке transitive dependency?

Чим відрізняється 1NF від 2NF?

Чим відрізняється 2NF від 3NF?

Як normalization пов'язана з relationships?

Як normalization пов'язана з Primary Key та Foreign Key?

Чому Many-to-Many relationship часто призводить до створення junction table?

Що таке denormalization?

Коли denormalization може бути корисною?

Які trade-offs між normalization та denormalization?

Чи завжди потрібно нормалізувати database до 3NF?

Чому normalized database може мати більше JOIN?

---

# Шлях

🟢 **Core (обов'язково знати)**

Що таке normalization.

Навіщо потрібна normalization.

Що таке data redundancy.

Чому дублювання даних може бути проблемою.

Що таке Update Anomaly.

Що таке Insert Anomaly.

Що таке Delete Anomaly.

Що таке 1NF.

Що таке 2NF.

Що таке 3NF.

Чому relationships допомагають normalization.

---

🔵 **Junior**

Atomic values.

Repeating groups.

Functional dependencies.

Partial dependencies.

Transitive dependencies.

Normalization через 1NF → 2NF → 3NF.

Normalization та Primary Keys.

Normalization та Foreign Keys.

Normalization та JOIN.

Junction tables.

Базове розуміння denormalization.

---

🟠 **Middle**

BCNF.

Advanced functional dependencies.

Normalization складних schemas.

Normalization vs query performance.

Denormalization strategies.

Read-heavy workloads.

Write-heavy workloads.

Indexing normalized schemas.

Trade-offs між normalization та denormalization.

Database schema optimization.

---

🔴 **Senior**

Normalization у distributed systems.

Denormalization у distributed architectures.

CQRS та read models.

Materialized views.

Data warehouses.

Analytics schemas.

Star schema.

Snowflake schema.

Distributed data consistency.

Data duplication у distributed systems.

Performance trade-offs.

Schema design для масштабованих systems.

---

# Міні-шпаргалка

### Основна мета

    Normalization
         │
         ├── ↓ Data Redundancy
         ├── ↓ Data Duplication
         ├── ↑ Data Integrity
         └── ↓ Data Anomalies

---

### Три основні anomalies

    Bad Database Design
          │
          ├── Update Anomaly
          │
          ├── Insert Anomaly
          │
          └── Delete Anomaly

---

### 1NF

    1NF
     │
     ├── Atomic Values
     └── No Repeating Groups

Погано:

    phones
    ------------------
    111-111, 222-222

Краще:

    phone
    -------
    111-111
    222-222

---

### 2NF

    2NF
     │
     ├── 1NF
     └── No Partial Dependency

Особливо важливо для:

    Composite Primary Key

Наприклад:

    (order_id, product_id)
              │
              ▼
        quantity

Але:

    product_id
         │
         ▼
    product_name

Тут `product_name` залежить тільки від частини key.

---

### 3NF

    3NF
     │
     ├── 2NF
     └── No Transitive Dependency

Погано:

    employee_id
         │
         ▼
    department_id
         │
         ▼
    department_name

Краще:

    employees
       │
       └── department_id → departments.id

    departments
       │
       └── department_name

---

### Normalization

    Large Table
         │
         ▼
    Identify Dependencies
         │
         ▼
    Split Tables
         │
         ▼
    Primary Keys
         │
         ▼
    Foreign Keys
         │
         ▼
    Relationships
         │
         ▼
    Normalized Database

---

### Normalization та Relationships

    users
       │
       │ 1:N
       ▼
    orders

    orders
       │
       │ 1:N
       ▼
    order_items

    products
       │
       │ 1:N
       ▼
    order_items

---

### Normalization vs Denormalization

    Normalization
         │
         ├── less duplication
         ├── more tables
         ├── more JOINs
         └── better integrity

    Denormalization
         │
         ├── more duplication
         ├── fewer JOINs
         ├── potentially faster reads
         └── more consistency complexity

---

### Найпростіше правило

    1NF
    → atomic values

    2NF
    → depends on the whole key

    3NF
    → depends only on the key

Можна запам'ятати:

    1NF → "одне поле — одне значення"

    2NF → "залежить від усього key"

    3NF → "не залежить від іншого non-key field"

---

# Головне

• **Normalization** — процес організації даних для зменшення redundancy та покращення data integrity.

• Основна проблема, яку вирішує normalization, — непотрібне дублювання даних.

• Дублювання може призводити до:

    Update Anomaly
    Insert Anomaly
    Delete Anomaly

• **1NF** — atomic values і відсутність repeating groups.

• **2NF** — 1NF + відсутність partial dependencies.

• **3NF** — 2NF + відсутність transitive dependencies.

• **Functional Dependency** описує залежність одного attribute від іншого.

• **Partial Dependency** особливо важлива для Composite Keys.

• **Transitive Dependency** виникає, коли non-key attribute залежить від іншого non-key attribute.

• Normalization часто призводить до створення декількох пов'язаних tables.

• Primary Keys та Foreign Keys допомагають зберегти relationships між normalized tables.

• `JOIN` використовується для отримання пов'язаних даних із normalized tables.

• Normalization не означає "чим більше tables, тим краще".

• **Denormalization** — свідоме додавання redundancy для певних performance або architectural цілей.

• Normalization і denormalization — це trade-off між:

    data integrity
    simplicity
    storage
    query complexity
    read performance
    write performance

Головна модель:

    Normalization
         │
         ▼
    Remove unnecessary redundancy
         │
         ▼
    Split data into logical entities
         │
         ▼
    Primary Keys + Foreign Keys
         │
         ▼
    Relationships
         │
         ▼
    Consistent Database

І головне правило:

    1NF → Atomic

    2NF → Whole Key

    3NF → Nothing but the Key
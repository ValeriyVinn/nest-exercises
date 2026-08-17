## 03. Databases, Tables and Records

У реляційній database дані організовані у таблиці.
Основна структура:
```text
Database
   │
   ├── Table
   │    ├── Row
   │    ├── Row
   │    └── Row
   │
   └── Table
        ├── Row
        ├── Row
        └── Row
```
Три основні поняття:
- **Database** — контейнер для організованих даних.
- **Table** — структура для зберігання певного типу даних.
- **Record / Row** — один конкретний запис у таблиці.
У таблиці:
```text
Column → властивість / характеристика
Row    → конкретний запис
Cell   → одне конкретне значення
```
---

### Database
**Database** — організоване сховище даних, яке може містити багато таблиць та інших database objects.

Наприклад, database інтернет-магазину:

```text
shop_database
│
├── users
├── products
├── orders
├── order_items
└── payments
```

Кожна таблиця відповідає за певний тип даних.
Наприклад:
```text
users    → users
products → products
orders   → orders
payments → payments
```
Database об'єднує ці таблиці в одну логічну систему.

---
### Table

**Table** — структура для зберігання даних у вигляді rows і columns.
Наприклад:

```text
users
┌────┬─────────┬──────────────────┐
│ id │ name    │ email            │
├────┼─────────┼──────────────────┤
│ 1  │ Alice   │ alice@mail.com   │
│ 2  │ Bob     │ bob@mail.com     │
│ 3  │ Charlie │ charlie@mail.com │
└────┴─────────┴──────────────────┘
```

Тут:

```text
Table → users

Columns:
id
name
email

Rows:
1, Alice, alice@mail.com
2, Bob, bob@mail.com
3, Charlie, charlie@mail.com
```

Table зазвичай описує один тип entity.

Наприклад:

```text
users    → users
products → products
orders   → orders
```

---
### Column

**Column** — окрема властивість або характеристика даних у table.

Наприклад:

```text
users

id | name | email
```

Тут:

```text
id
name
email
```

— це columns.

Column визначає, **яке значення зберігається**.

Наприклад:

```text
id    → identifier
name  → user's name
email → user's email
```

Column зазвичай має:

- name
- data type
- constraints
- default value (за потреби)

Наприклад:

```sql
CREATE TABLE users (
    id INTEGER,
    name VARCHAR(100),
    email VARCHAR(255)
);
```

---
### Data Type

Кожна column має певний **data type**.
Наприклад:

```text
id         → INTEGER
name       → VARCHAR
age        → INTEGER
price      → DECIMAL
created_at → TIMESTAMP
active     → BOOLEAN
```

Приклад:

```sql
CREATE TABLE users (
    id INTEGER,
    name VARCHAR(100),
    age INTEGER,
    active BOOLEAN
);
```

Це означає:

```text
id     → число
name   → текст
age    → число
active → true / false
```

Data type визначає, **які значення можна зберігати у column**.

---
### Row

**Row** — один запис у table.

Наприклад:

```text
users

id | name  | email
---|-------|----------------
1  | Alice | alice@mail.com
2  | Bob   | bob@mail.com
```

Перший row:

```text
1 | Alice | alice@mail.com
```

Другий row:

```text
2 | Bob | bob@mail.com
```

Кожен row представляє один конкретний об'єкт або entity.

Наприклад:

```text
1 → Alice
```

це один user.

---
### Record

**Record** — інша назва для одного логічного запису даних.

У relational database:

```text
Record ≈ Row
```

Наприклад:

```text
id | name  | email
---|-------|----------------
1  | Alice | alice@mail.com
```

Це один:

**record**

або:

**row**

У більшості випадків ці терміни можна використовувати як синоніми.

---
### Cell

**Cell** — одне конкретне значення на перетині row і column.

Наприклад:

```text
users

id | name  | email
---|-------|----------------
1  | Alice | alice@mail.com
```

Значення:

```text
Alice
```

— це одна cell.

```text
name column
     │
     ▼
    Alice
```

Cell містить одне конкретне значення.

---
## Table Structure

Типова relational table:

```text
                TABLE
                  │
       ┌──────────┴──────────┐
       │                     │
    Columns                 Rows
       │                     │
       ▼                     ▼
   id, name, email      Record 1
                        Record 2
                        Record 3
```

Наприклад:

```text
users

┌────┬─────────┬──────────────────┐
│ id │ name    │ email            │
├────┼─────────┼──────────────────┤
│ 1  │ Alice   │ alice@mail.com   │
│ 2  │ Bob     │ bob@mail.com     │
│ 3  │ Charlie │ charlie@mail.com │
└────┴─────────┴──────────────────┘
```

Тут:

```text
1 table
3 columns
3 records / rows
9 cells
```

---
## Database → Tables → Rows → Cells

Ієрархія:

```text
Database
   │
   ├── users
   │    │
   │    ├── columns
   │    │    ├── id
   │    │    ├── name
   │    │    └── email
   │    │
   │    └── rows
   │         ├── Alice
   │         ├── Bob
   │         └── Charlie
   │
   └── products
        │
        ├── columns
        │    ├── id
        │    ├── name
        │    └── price
        │
        └── rows
             ├── Product 1
             ├── Product 2
             └── Product 3
```

---
## Entity

Table часто представляє певну **entity**.

Наприклад:

```text
users
   ↓
User entity

products
   ↓
Product entity

orders
   ↓
Order entity
```

Entity — це об'єкт або поняття предметної області, про який database повинна зберігати інформацію.

Наприклад, для інтернет-магазину:

```text
User
Product
Order
Payment
Category
```

можуть бути entities.

---
## Database Example

Уявімо простий інтернет-магазин.

```text
shop_database
│
├── users
│
├── products
│
└── orders
```

### users
```text
id | name  | email
---|-------|----------------
1  | Alice | alice@mail.com
2  | Bob   | bob@mail.com
```

### products
```text
id | name       | price
---|------------|------
1  | Keyboard   | 100
2  | Mouse      | 50
3  | Monitor    | 300
```

### orders
```text
id | user_id | total
---|---------|------
1  | 1       | 150
2  | 2       | 300
```

Таким чином:

```text
Database
│
├── users
├── products
└── orders
```

Кожна table зберігає свою частину даних.

---
## CREATE TABLE

У SQL table створюється за допомогою:

```sql
CREATE TABLE users (
    id INTEGER,
    name VARCHAR(100),
    email VARCHAR(255)
);
```

Тут:

```text
users
   │
   ├── id
   ├── name
   └── email
```

створюється table з трьома columns.

---
## INSERT INTO

Новий record додається за допомогою:

```sql
INSERT INTO users (id, name, email)
VALUES (1, 'Alice', 'alice@mail.com');
```

Після цього table може виглядати так:

```text
id | name  | email
---|-------|----------------
1  | Alice | alice@mail.com
```

Додаємо ще один record:

```sql
INSERT INTO users (id, name, email)
VALUES (2, 'Bob', 'bob@mail.com');
```

Отримаємо:

```text
id | name  | email
---|-------|----------------
1  | Alice | alice@mail.com
2  | Bob   | bob@mail.com
```

---
## SELECT

Для отримання records використовується:

```sql
SELECT * FROM users;
```

Результат:

```text
id | name  | email
---|-------|----------------
1  | Alice | alice@mail.com
2  | Bob   | bob@mail.com
```

Можна отримати лише певні columns:

```sql
SELECT name, email
FROM users;
```

Результат:

```text
name  | email
------|----------------
Alice | alice@mail.com
Bob   | bob@mail.com
```

---
## WHERE

Можна вибрати конкретні records:

```sql
SELECT *
FROM users
WHERE id = 1;
```

Результат:

```text
id | name  | email
---|-------|----------------
1  | Alice | alice@mail.com
```

---
## UPDATE

Значення record можна змінити:

```sql
UPDATE users
SET email = 'new@mail.com'
WHERE id = 1;
```

Було:

```text
1 | Alice | alice@mail.com
```

Стало:

```text
1 | Alice | new@mail.com
```

---
## DELETE

Record можна видалити:

```sql
DELETE FROM users
WHERE id = 1;
```

Було:

```text
id | name  | email
---|-------|----------------
1  | Alice | alice@mail.com
2  | Bob   | bob@mail.com
```

Стало:

```text
id | name | email
---|------|----------------
2  | Bob  | bob@mail.com
```

---
## CRUD на рівні Table

Основні SQL operations:

```text
CREATE → CREATE TABLE
READ   → SELECT
UPDATE → UPDATE
DELETE → DELETE
```

А для додавання record:

```text
INSERT → додати record
```

Важливо розуміти:

**CRUD** описує операції з даними на концептуальному рівні.

У SQL вони реалізуються різними командами.

---
## Table Schema

Table має власну структуру — **table schema**.

Наприклад:

```text
users

id         INTEGER
name       VARCHAR(100)
email      VARCHAR(255)
created_at TIMESTAMP
```

Schema визначає:

- назви columns
- data types
- constraints
- relationships
- default values

Наприклад:

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);
```

Тут schema визначає не тільки columns і data types, але й constraints.

---
## NULL

У relational database column може містити `NULL`.

`NULL` означає:

> Значення відсутнє або невідоме.

Наприклад:

```text
id | name  | phone
---|-------|-----------
1  | Alice | NULL
2  | Bob   | +380...
```

У Alice phone не заданий.

Важливо:

```text
NULL ≠ 0
NULL ≠ ''
NULL ≠ false
```

`NULL` — це спеціальне значення, яке означає відсутність значення.

---
## Однорідність Table

Зазвичай усі rows однієї table мають однаковий набір columns.

Наприклад:

```text
users

id | name  | email
---|-------|----------------
1  | Alice | alice@mail.com
2  | Bob   | bob@mail.com
3  | John  | john@mail.com
```

Кожен row має:

```text
id
name
email
```

Але конкретні значення можуть відрізнятися.

---
## Table ≠ Spreadsheet

Relational table може виглядати як Excel spreadsheet, але це не одне й те саме.

Spreadsheet:

```text
Excel
│
├── cells
├── formulas
├── formatting
└── sheets
```

Database table:

```text
Table
│
├── columns
├── rows
├── data types
├── constraints
├── indexes
└── relationships
```

Database table є частиною системи, якою керує DBMS.

---
## Table ≠ Database

Це важливо не плутати.

```text
Database
│
├── users
├── products
├── orders
└── payments
```

**Database** може містити багато tables.

```text
Database
   ↓
Tables
   ↓
Rows
   ↓
Cells
```

Тобто:

```text
Database ≠ Table
```

і:

```text
Table ≠ Row
```

---
## Row ≠ Column

Це одна з базових відмінностей.

```text
users

id | name  | email
---|-------|----------------
1  | Alice | alice@mail.com
2  | Bob   | bob@mail.com
```

**Row** — горизонтально:

```text
1 | Alice | alice@mail.com
```

**Column** — вертикально:

```text
id
1
2
```

Тому:

```text
Row    → один record
Column → одна властивість
```

---
## Primary Key

У table часто є column, яка однозначно ідентифікує кожен row.

Наприклад:

```text
users

id | name
---|------
1  | Alice
2  | Bob
3  | Charlie
```

`id` може бути **Primary Key**.

Primary Key дозволяє однозначно визначити record:

```text
id = 1
   ↓
Alice
```

Детальніше Primary Key буде розглянуто в наступній темі:

```text
04-primary-and-foreign-keys
```

---
## Relationships між Tables

Tables можуть бути пов'язані між собою.

Наприклад:

```text
users
│
│ id
│
▼
orders
│
└── user_id
```

Приклад:

```text
users

id | name
---|------
1  | Alice
2  | Bob
```

```text
orders

id | user_id | total
---|---------|------
1  | 1       | 100
2  | 1       | 250
3  | 2       | 80
```

`orders.user_id` показує, як order пов'язаний з user.

Relationships детальніше розглядаються у:

```text
04-primary-and-foreign-keys
05-relationships
```

---
## Database Objects

Database може містити не тільки tables.

Наприклад, relational database може містити:

```text
Database
│
├── Tables
├── Views
├── Indexes
├── Constraints
├── Functions
├── Triggers
└── Schemas
```

На цьому етапі головна увага:

```text
Database
   ↓
Table
   ↓
Column + Row
   ↓
Cell
```

Інші database objects будемо розглядати поступово.

---
## Типові помилки
❌ Вважати database і table одним і тим самим.
❌ Вважати table одним великим record.
❌ Плутати row і column.
❌ Вважати column конкретним значенням.
❌ Вважати row властивістю даних.
❌ Вважати cell окремим record.
❌ Вважати NULL те саме, що порожній рядок.
❌ Вважати database table звичайною Excel таблицею.
❌ Вважати, що кожна database складається тільки з однієї table.
❌ Не розуміти різницю між entity та table.
❌ Вважати, що column не має data type.

---
## Питання зі співбесіди
Що таке database?
Що таке table?
Що таке row?
Що таке record?
Що таке column?
Що таке field?
Що таке cell?
Яка різниця між row і column?
Яка різниця між database і table?
Що таке data type?
Для чого потрібен data type?
Що таке NULL?
Чим NULL відрізняється від `0`?
Чим NULL відрізняється від порожнього рядка?
Що таке entity?
Як entity пов'язана з table?
Що таке table schema?
Що таке Primary Key?
Для чого потрібен Primary Key?
Як tables можуть бути пов'язані між собою?
Що робить `CREATE TABLE`?
Що робить `INSERT`?
Що робить `SELECT`?
Що робить `UPDATE`?
Що робить `DELETE`?

---
## Шлях
🟢 **Core (обов'язково знати)**
Що таке database.
Що таке table.
Що таке row / record.
Що таке column / field.
Що таке cell.
Різниця між row і column.
Різниця між database і table.
Що таке data type.
Що таке entity.
Що таке NULL.
Як database організована через tables.
---
🔵 **Junior**
Як створити table.
Як додати record.
Як отримати records.
Як змінити record.
Як видалити record.
Що таке table schema.
Що таке Primary Key.
Як tables пов'язані між собою.
Що таке data types.
Що таке constraints.
Різниця між database table та spreadsheet.
Як application працює з tables через SQL.
---
🟠 **Middle**
Як правильно проектувати tables.
Як вибирати columns.
Як вибирати data types.
Як визначати Primary Keys.
Як організовувати relationships між tables.
Normalization.
Indexes.
Constraints.
NULL та three-valued logic.
Query performance.
Table partitioning.
---
🔴 **Senior**
Database schema architecture.
Large-scale table design.
Partitioning strategies.
Sharding.
Distributed databases.
Storage engines.
Physical vs logical data model.
Database internals.
Query optimization.
Data modeling trade-offs.
Scalability та performance.
---
## Міні-шпаргалка

### Database
```text
Database
│
├── Table
├── Table
└── Table
```
### Table
```text
Table
│
├── Columns
│   ├── id
│   ├── name
│   └── email
│
└── Rows
    ├── Record 1
    ├── Record 2
    └── Record 3
```
### Row
```text
1 | Alice | alice@mail.com
```
Один record.
### Column
```text
email
alice@mail.com
bob@mail.com
charlie@mail.com
```
Одна властивість.
### Cell
```text
alice@mail.com
```
Одне конкретне значення.
---

## Основна ієрархія
```text
DATABASE
    │
    ├── TABLE
    │     │
    │     ├── COLUMNS
    │     │     ├── id
    │     │     ├── name
    │     │     └── email
    │     │
    │     └── ROWS
    │           ├── Record 1
    │           ├── Record 2
    │           └── Record 3
    │
    └── TABLE
          │
          └── ...
```

А окремий row складається з cells:
```text
ROW
 │
 ├── Cell
 ├── Cell
 └── Cell
```
---
## SQL
Створити table:
```sql
CREATE TABLE users (
    id INTEGER,
    name VARCHAR(100),
    email VARCHAR(255)
);
```

Додати record:

```sql
INSERT INTO users (id, name, email)
VALUES (1, 'Alice', 'alice@mail.com');
```

Отримати records:

```sql
SELECT *
FROM users;
```

Змінити record:

```sql
UPDATE users
SET name = 'Alice Smith'
WHERE id = 1;
```

Видалити record:

```sql
DELETE FROM users
WHERE id = 1;
```

---
## CRUD
```text
CREATE → створення database/table/data
READ   → SELECT
UPDATE → UPDATE
DELETE → DELETE
```
Для створення record:

```text
INSERT → додати record
```

---
## Головне
• **Database** — контейнер для організованих даних.
• **Table** — структура для зберігання певного типу даних.
• **Row / Record** — один конкретний запис у table.
• **Column** — одна властивість або характеристика даних.
• **Cell** — одне конкретне значення.
• **Data type** визначає тип значення, яке може зберігатися у column.
• **Table schema** описує columns, data types, constraints та інші властивості table.
• **Entity** — об'єкт або поняття предметної області, інформацію про яке зберігає database.
• Database може містити багато tables.
• Table складається з rows і columns.
• Row складається з конкретних values у columns.
• **NULL** означає відсутнє або невідоме значення.
• **Primary Key** дозволяє однозначно ідентифікувати record.
• Tables можуть бути пов'язані між собою.
• SQL використовується для створення tables та роботи з їхніми даними.
**Головна ідея:**

```text
Database
    ↓
Tables
    ↓
Rows + Columns
    ↓
Cells / Values
```

```text
Table
│
├── Column → властивість
│
├── Row    → record
│
└── Cell   → конкретне значення
```
## 02. Relational vs Non-Relational Databases

Database можна організовувати різними способами.

Два основні підходи:

- **Relational databases** — реляційні бази даних
- **Non-relational databases** — нереляційні бази даних

Головна відмінність полягає в тому, **як database організовує та пов'язує дані**.

Relational database зазвичай використовує:

- tables
- rows
- columns
- relationships
- predefined schema

Non-relational database може використовувати:

- documents
- key-value pairs
- graphs
- wide-column structures

### Ключова ідея

**Relational:**

```text
Database
│
├── users
│   ├── id
│   ├── name
│   └── email
│
└── orders
    ├── id
    ├── user_id
    └── total
```

**Non-relational (Document):**

```text
Database
│
└── users
    ├── document
    │   ├── id
    │   ├── name
    │   ├── email
    │   └── orders
    │       ├── ...
    │       └── ...
```

---

### Relational Database

**Relational Database** — database, у якій дані організовані у таблиці, а між таблицями можуть існувати визначені relationships.

Наприклад:

```text
users
┌────┬────────┬──────────────────┐
│ id │ name   │ email            │
├────┼────────┼──────────────────┤
│ 1  │ Alice  │ alice@mail.com   │
│ 2  │ Bob    │ bob@mail.com     │
└────┴────────┴──────────────────┘

orders
┌────┬─────────┬───────┐
│ id │ user_id │ total │
├────┼─────────┼───────┤
│ 1  │ 1       │ 100   │
│ 2  │ 1       │ 250   │
│ 3  │ 2       │ 80    │
└────┴─────────┴───────┘
```

`orders.user_id` може посилатися на `users.id`.

Таким чином database може представляти relationship:

```text
User
 │
 └── has many
       │
       ▼
     Orders
```

Приклади relational DBMS:

- PostgreSQL
- MySQL
- SQLite
- Microsoft SQL Server
- Oracle Database

---

### Non-Relational Database

**Non-Relational Database** — database, яка не вимагає організації даних у традиційні пов'язані таблиці.

Найпоширеніший приклад — **document database**.

Наприклад, MongoDB може зберігати дані у documents:

```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@mail.com",
  "orders": [
    {
      "id": 101,
      "total": 100
    },
    {
      "id": 102,
      "total": 250
    }
  ]
}
```

У цьому випадку пов'язані дані можуть зберігатися разом в одному document.

Приклади non-relational DBMS:

- MongoDB
- Redis
- Cassandra
- Neo4j
- Amazon DynamoDB

---

## Основні типи Non-Relational Databases

Non-relational — це не один конкретний тип database.

Існує декілька моделей.

### 1. Document Database

Дані зберігаються у documents.

Приклад:

```json
{
  "name": "Alice",
  "age": 25,
  "email": "alice@mail.com"
}
```

Приклад:

**MongoDB**

```text
Database
   │
   └── Collection
          │
          ├── Document
          ├── Document
          └── Document
```

---

### 2. Key-Value Database

Дані зберігаються як:

```text
key → value
```

Наприклад:

```text
user:1001 → "Alice"
user:1002 → "Bob"
```

Або:

```text
session:abc123 → {
    userId: 1001,
    expires: ...
}
```

Приклад:

**Redis**

---

### 3. Wide-Column Database

Дані організовані навколо rows та columns, але структура відрізняється від традиційних relational tables.

Приклад:

**Apache Cassandra**

Такі databases часто використовуються для:

- великих обсягів даних
- distributed systems
- high availability
- горизонтального масштабування

---

### 4. Graph Database

Дані представляються у вигляді:

```text
Nodes + Relationships
```

Наприклад:

```text
Alice
  │
  │ FRIEND_OF
  ▼
Bob
  │
  │ FRIEND_OF
  ▼
Charlie
```

Graph databases добре підходять для даних, де relationships є центральною частиною моделі.

Приклад:

**Neo4j**

---

# Relational vs Non-Relational

| Feature | Relational | Non-Relational |
|---|---|---|
| Основна структура | Tables | Documents / Key-Value / Graph / Columns |
| Schema | Зазвичай predefined | Часто flexible |
| Relationships | Сильна підтримка | Залежить від типу |
| JOIN | Так | Зазвичай немає традиційного JOIN |
| Data structure | Таблична | Залежить від моделі |
| Transactions | Сильна підтримка | Залежить від DBMS |
| Масштабування | Часто vertical + можливе horizontal | Часто horizontal |
| Приклади | PostgreSQL, MySQL | MongoDB, Redis, Cassandra |
| Типові дані | Structured | Structured / Semi-structured / інші |

---

## Structured Data

Relational databases особливо добре підходять для **structured data**.

Наприклад:

```text
users

id | name  | age | email
---|-------|-----|----------------
1  | Alice | 25  | alice@mail.com
2  | Bob   | 30  | bob@mail.com
```

Структура таблиці визначена заздалегідь.

Наприклад:

```sql
CREATE TABLE users (
    id INTEGER,
    name VARCHAR(100),
    age INTEGER,
    email VARCHAR(255)
);
```

Кожен row повинен відповідати визначеній структурі.

---

## Semi-Structured Data

Non-relational databases, особливо document databases, добре працюють із **semi-structured data**.

Наприклад:

```json
{
  "name": "Alice",
  "age": 25,
  "email": "alice@mail.com",
  "address": {
    "city": "Vinnytsia",
    "country": "Ukraine"
  }
}
```

Інший document може мати додаткове поле:

```json
{
  "name": "Bob",
  "age": 30,
  "email": "bob@mail.com",
  "phone": "+380..."
}
```

Структура documents може бути більш flexible.

---

## Schema

### Relational Database

Schema зазвичай визначається до того, як дані починають активно використовуватися.

Наприклад:

```text
users
│
├── id → INTEGER
├── name → VARCHAR
├── email → VARCHAR
└── created_at → TIMESTAMP
```

Зміна структури таблиці потребує зміни schema.

Наприклад:

```sql
ALTER TABLE users
ADD COLUMN phone VARCHAR(20);
```

---

### Non-Relational Database

У document database структура documents може бути flexible.

Наприклад:

```json
{
  "name": "Alice",
  "email": "alice@mail.com"
}
```

і:

```json
{
  "name": "Bob",
  "email": "bob@mail.com",
  "phone": "+380..."
}
```

можуть існувати одночасно.

Це називають:

**Flexible Schema**

Але важливо:

> Flexible schema ≠ відсутність структури.

Структура все одно існує, просто database може не вимагати однакової структури для кожного document.

---

## Relationships

У relational databases relationships є фундаментальною частиною моделі.

Наприклад:

```text
users
   │
   │ 1
   │
   │
   │ N
   ▼
orders
```

Один user може мати багато orders.

Це:

**One-to-Many relationship**

У database це може бути представлено через:

```text
users.id
     ▲
     │
     │ foreign key
     │
orders.user_id
```

---

У non-relational databases relationships можуть представлятися по-різному.

Наприклад, дані можна **embed**:

```json
{
  "name": "Alice",
  "orders": [
    {
      "id": 101,
      "total": 100
    },
    {
      "id": 102,
      "total": 250
    }
  ]
}
```

Або зберігати окремо та посилатися на інший document.

---

## Normalization vs Denormalization

У relational databases часто використовують **normalization**.

Мета:

- зменшити дублювання даних
- зберегти consistency
- правильно організувати relationships

Наприклад, замість:

```text
orders

id | user_name | user_email | total
```

можна мати:

```text
users
id | name | email

orders
id | user_id | total
```

---

У non-relational databases часто використовують **denormalization**.

Пов'язані дані можуть дублюватися або зберігатися разом:

```json
{
  "orderId": 101,
  "user": {
    "name": "Alice",
    "email": "alice@mail.com"
  },
  "total": 100
}
```

Це може спростити та прискорити читання даних, але створює ризик дублювання.

---

## SQL vs NoSQL

Тут важливо не плутати терміни.

**SQL** — мова запитів, яка широко використовується relational databases.

Наприклад:

```sql
SELECT *
FROM users
WHERE id = 1;
```

**NoSQL** — загальна назва для databases, які не використовують традиційну relational model як основну модель.

NoSQL часто трактують як:

**Not Only SQL**

Тому:

```text
SQL ≠ PostgreSQL
```

і:

```text
NoSQL ≠ MongoDB
```

Правильніше:

```text
SQL
  │
  └── language

PostgreSQL
  │
  └── relational DBMS

MongoDB
  │
  └── document-oriented NoSQL DBMS
```

---

## Коли використовувати Relational Database

Relational database добре підходить, коли:

✔ дані мають чітку структуру  
✔ між даними багато relationships  
✔ важлива data integrity  
✔ потрібні complex queries  
✔ потрібні transactions  
✔ потрібна consistency  
✔ database має чітко визначену модель  

Типові приклади:

- banking
- e-commerce
- accounting
- ERP
- CRM
- booking systems
- business applications

Наприклад:

```text
Users
Orders
Products
Payments
Invoices
```

Між цими entities існує багато relationships.

---

## Коли використовувати Non-Relational Database

Non-relational database може бути корисною, коли:

✔ структура даних часто змінюється  
✔ дані природно представляються documents  
✔ потрібне горизонтальне масштабування  
✔ потрібна висока швидкість певних операцій  
✔ працюємо з великими distributed systems  
✔ relationships не є центральною частиною моделі  

Типові приклади:

- caching
- sessions
- real-time systems
- large-scale distributed systems
- content / product catalogs
- event data
- flexible document data

---

## Не існує "кращої" database

Relational database не є автоматично кращою за NoSQL.

І навпаки.

Вибір залежить від:

```text
Data
  │
  ├── Structure
  ├── Relationships
  ├── Access patterns
  ├── Consistency requirements
  ├── Scale
  └── Performance requirements
```

Наприклад:

```text
Banking system
      ↓
Relational database
      ↓
PostgreSQL
```

А:

```text
Cache
      ↓
Key-Value database
      ↓
Redis
```

І:

```text
Flexible documents
      ↓
Document database
      ↓
MongoDB
```

---

## Database Model

Важливо розділяти поняття:

```text
Database Model
      │
      ├── Relational
      │
      ├── Document
      │
      ├── Key-Value
      │
      ├── Wide-Column
      │
      └── Graph
```

**Database model** — це спосіб організації та представлення даних.

А **DBMS** — програмне забезпечення, яке реалізує роботу з database.

Наприклад:

```text
Relational Model
      ↓
PostgreSQL
      ↓
Database
```

або:

```text
Document Model
      ↓
MongoDB
      ↓
Database
```

---

## Типові помилки

❌ Вважати, що relational database = SQL.

❌ Вважати, що NoSQL означає "database без SQL".

❌ Вважати MongoDB єдиним типом NoSQL database.

❌ Вважати, що NoSQL database не має schema.

❌ Вважати, що relational databases не можуть масштабуватися горизонтально.

❌ Вважати, що NoSQL завжди швидша за relational database.

❌ Вважати, що relational database завжди потребує JOIN для будь-якого relationship.

❌ Вважати, що NoSQL не підтримує transactions.

❌ Вибирати database тільки за популярністю.

---

## Питання зі співбесіди

Що таке relational database?

Що таке non-relational database?

Яка різниця між relational та non-relational databases?

Що таке relational model?

Що таке document database?

Що таке NoSQL?

Що означає NoSQL?

Які існують типи NoSQL databases?

Що таке document?

Що таке flexible schema?

Чим structured data відрізняється від semi-structured data?

Як relational database представляє relationships?

Як NoSQL database може представляти relationships?

Що таке normalization?

Що таке denormalization?

Коли краще використовувати relational database?

Коли краще використовувати NoSQL database?

Чи означає NoSQL відсутність schema?

Чи підтримують NoSQL databases transactions?

---

## Шлях
🟢 **Core (обов'язково знати)**
Що таке relational database.
Що таке non-relational database.
Різниця між relational та non-relational databases.
Що таке relational model.
Що таке table.
Що таке document.
Що таке relationship.
Що таке schema.
Що таке NoSQL.
Приклади relational DBMS.
Приклади NoSQL DBMS.
---
🔵 **Junior**
Різниця між structured та semi-structured data.
Основні типи NoSQL databases.
Document database.
Key-value database.
Graph database.
Wide-column database.
Flexible schema.
Relationships у relational databases.
Relationships у NoSQL databases.
Normalization та denormalization.
SQL vs NoSQL.
Коли використовувати relational database.
Коли використовувати NoSQL database.
---
🟠 **Middle**
Як вибір database залежить від access patterns.
Consistency та transactions.
Embedding vs referencing.
Trade-offs normalization / denormalization.
Horizontal та vertical scaling.
Replication.
Indexes у relational та NoSQL databases.
Performance characteristics різних моделей.
Database architecture.
Polyglot persistence.
---
🔴 **Senior**
Database selection strategy.
Distributed databases.
Consistency models.
CAP theorem.
Partitioning.
Sharding.
Replication strategies.
Eventual consistency.
High availability.
Distributed transactions.
Database scalability.
Trade-offs між consistency, availability та performance.
Polyglot persistence architecture.
---

## Міні-шпаргалка

### Relational

```text
Database
│
├── Table
│   ├── Row
│   ├── Row
│   └── Row
│
└── Table
    ├── Row
    ├── Row
    └── Row
```

Основні характеристики:

```text
Tables
Rows
Columns
Schema
Relationships
Foreign Keys
SQL
Transactions
```

Приклади:

```text
PostgreSQL
MySQL
SQLite
SQL Server
Oracle
```

---

### Non-Relational

```text
Database
│
├── Document
├── Document
└── Document
```

або:

```text
key → value
```

або:

```text
Node → Relationship → Node
```

Основні моделі:

```text
Document
Key-Value
Wide-Column
Graph
```

Приклади:

```text
MongoDB
Redis
Cassandra
Neo4j
```

---

## Основна схема

```text
                    DATABASES
                        │
          ┌─────────────┴─────────────┐
          │                           │
     RELATIONAL                  NON-RELATIONAL
          │                           │
      Tables                    ┌─────┼─────┐
          │                     │     │     │
    Relationships          Document  Key   Graph
          │                     │     Value
          │                     │
      SQL                    MongoDB
          │
     PostgreSQL
```

---

## Головне

• **Relational database** організовує дані у таблиці.

• **Non-relational database** використовує інші моделі даних: documents, key-value, graphs, wide-columns тощо.

• Relational databases мають чітко визначену schema та сильну модель relationships.

• Non-relational databases часто мають більш flexible schema.

• **SQL** — мова, а не database.

• **NoSQL** — не означає "без SQL"; це широка категорія нереляційних підходів.

• **PostgreSQL** — relational DBMS.

• **MongoDB** — document-oriented NoSQL DBMS.

• Relational databases добре підходять для структурованих даних, relationships, transactions та data integrity.

• NoSQL databases можуть бути корисними для flexible data structures, distributed systems та специфічних access patterns.

• Немає універсально "кращої" database — database вибирають відповідно до структури даних, relationships, consistency, scale, performance та способу використання даних.

**Головна ідея:**

```text
Relational
    ↓
Tables + Relationships + Schema

Non-Relational
    ↓
Documents / Key-Value / Graph / Wide-Column
```
# Data Base basics

## 01. Database Concepts
Database (база даних) — це організована система для зберігання, пошуку, зміни та керування даними.
Database Management System (DBMS) — програмне забезпечення, яке дозволяє створювати бази даних, працювати з даними та керувати доступом до них.

Приклади DBMS:
- PostgreSQL
- MySQL
- SQLite
- MongoDB
- Microsoft SQL Server

### Ключові поняття
✔ database
✔ DBMS (Database Management System)
✔ data
✔ record
✔ field / attribute
✔ table
✔ query
✔ database schema
✔ CRUD
✔ database server
✔ database client
✔ data integrity

### Що потрібно пам'ятати
• Database — це організоване сховище даних.
• DBMS — це програмне забезпечення, яке керує базами даних.
• Дані зберігаються за певною структурою, яка залежить від типу database.
• Database дозволяє не тільки зберігати дані, а й шукати, додавати, змінювати та видаляти їх.
• Основні операції з даними — CRUD:
  - Create — створити
  - Read — прочитати
  - Update — змінити
  - Delete — видалити
• Database schema описує структуру даних та зв'язки між ними.
• У реляційних БД дані зазвичай організовані у таблиці.
• У NoSQL database структура даних може бути іншою, наприклад documents у MongoDB.
• DBMS відповідає за зберігання, пошук, цілісність, доступ та інші операції з даними.
• Database і DBMS — це не одне й те саме:
  Database — дані та їх структура.
  DBMS — програмне забезпечення для роботи з ними.

### Основні терміни
**Database**
Організоване сховище пов'язаних даних.
**DBMS**
Система керування базами даних.
**Table**
Структура для зберігання даних у вигляді рядків і стовпців у реляційній БД.
**Record / Row**
Один запис у таблиці.
**Field / Column**
Окрема характеристика або властивість даних.
**Query**
Запит до database для отримання або зміни даних.
**Schema**
Опис структури database: таблиць, колонок, типів даних, зв'язків, constraints тощо.
**Data Integrity**
Цілісність і коректність даних.

### CRUD
Create  → створити дані
Read    → отримати дані
Update  → змінити дані
Delete  → видалити дані

У SQL:
INSERT  -- Create
SELECT  -- Read
UPDATE  -- Update
DELETE  -- Delete

### Як працює database
Спрощена модель:
Application
     │
     │ request / query
     ▼
Database Client / Driver
     │
     ▼
DBMS / Database Server
     │
     ▼
Database
     │
     ▼
Stored Data

Наприклад:
Node.js application
       │
       │ SQL query
       ▼
PostgreSQL
       │
       ▼
users table
       │
       ▼
user records

### Database Server і Database Client
Database Server
Програма, яка приймає запити та працює з database.
Наприклад:
PostgreSQL Server

Database Client
Програма або бібліотека, яка підключається до database server.
Приклади:
psql
pgAdmin
DBeaver
Node.js + pg

Важливо:
Application ≠ Database
Application ≠ DBMS
Database ≠ DBMS

Наприклад:
Node.js
   ↓
pg driver
   ↓
PostgreSQL
   ↓
Database

### Де використовуються databases
✔ Web applications
✔ Mobile applications
✔ E-commerce
✔ Banking systems
✔ Social networks
✔ CMS
✔ Analytics
✔ APIs
✔ Enterprise applications

### Типові помилки
❌ Вважати database і DBMS одним і тим самим.
❌ Вважати database просто набором файлів.
❌ Плутати table, row та column.
❌ Вважати SQL окремою database.
❌ Вважати PostgreSQL мовою програмування.
❌ Вважати MongoDB реляційною database.
❌ Плутати database server і database.
❌ Вивчати SQL, не розуміючи базових database concepts.

### Питання зі співбесіди
Що таке database?
Що таке DBMS?
Яка різниця між database і DBMS?
Що таке table?
Що таке row / record?
Що таке column / field?
Що таке database schema?
Що таке query?
Що таке CRUD?
Що таке database server?
Що таке database client?
Для чого потрібна database у web application?
Яка різниця між SQL та PostgreSQL?

### Шлях
🟢 Core (обов'язково знати)
Що таке database.
Що таке DBMS.
Різниця між database та DBMS.
Що таке data.
Що таке table.
Що таке row / record.
Що таке column / field.
Що таке query.
Що таке CRUD.
Що таке database schema.
🔵 Junior
Як application взаємодіє з database.
Різниця між database server та database client.
Що відбувається під час database query.
Основні типи database.
Різниця між SQL та NoSQL.
Поняття data integrity.
Поняття database connection.
Роль database у backend application.
🟠 Middle
Як DBMS організовує та обробляє дані.
Як application взаємодіє з database через driver.
Database schema design.
Транзакції та consistency.
Indexes та їх призначення.
Constraints та data integrity.
Connection pooling.
Розподіл відповідальності між application та database.
🔴 Senior
Database architecture.
Database scalability.
Replication.
Sharding.
High availability.
Database performance.
Caching strategies.
Distributed databases.
Consistency models.
Database architecture patterns.
Trade-offs між різними типами databases.

### Міні-шпаргалка
Database:
Database
│
├── Data
│
├── Structure
│
└── Relationships

Реляційна database:
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

Основна взаємодія:
Application
     │
     │ query
     ▼
Database Driver
     │
     ▼
DBMS
     │
     ▼
Database
     │
     ▼
Data

CRUD:
CREATE → INSERT
READ   → SELECT
UPDATE → UPDATE
DELETE → DELETE

### Головне:
• Database зберігає організовані дані.
• DBMS керує database.
• Table складається з rows і columns.
• Row — один запис.
• Column — одна властивість даних.
• Query — запит до database.
• Schema описує структуру database.
• CRUD — основні операції з даними.
• Application взаємодіє з database через database driver/client.
• PostgreSQL — DBMS, а SQL — мова для роботи з реляційними database.
• MongoDB — NoSQL DBMS, яка використовує document-oriented model.
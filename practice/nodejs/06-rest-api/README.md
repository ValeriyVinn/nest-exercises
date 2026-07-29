# 06-rest-api

## 01-rest-princeples
• REST (Representational State Transfer) — архітектурний стиль побудови веб API, у якому ресурси ідентифікуються URL, а взаємодія з ними відбувається через стандартні HTTP-методи.

### Ключові поняття
✔ REST
✔ Resource
✔ URI / URL
✔ Representation
✔ Client
✔ Server
✔ Stateless
✔ HTTP Methods
✔ Uniform Interface

### Що потрібно пам'ятати
• REST — це архітектурний стиль, а не протокол.
• Кожен ресурс має власний URL.
• Сервер не зберігає стан клієнта між запитами (Stateless).
• Один URL представляє ресурс, а HTTP-метод визначає дію.
• API повинно бути передбачуваним і однаковим для всіх ресурсів.

### Основний API
GET
POST
PUT
PATCH
DELETE
HEAD
OPTIONS

### Де використовується
✔ Express API
✔ NestJS
✔ Frontend ↔ Backend
✔ Mobile Applications
✔ Microservices
✔ Public APIs

### Типові помилки
❌ Використовувати дієслова в URL (/getUsers, /createUser)
❌ Передавати дію через URL замість HTTP-методу
❌ Зберігати стан користувача між запитами
❌ Порушувати однакову структуру маршрутів
❌ Повертати різні формати відповіді для однакових ресурсів

### Питання зі співбесіди
Що таке REST?
Чим REST відрізняється від HTTP?
Що таке Resource?
Що означає Stateless?
Чому REST API використовує HTTP-методи?
Що таке Uniform Interface?
Чим PUT відрізняється від PATCH?

### Шлях
🟢 Core (обов'язково знати)
Що таке REST.
Що таке ресурс (Resource).
Чому ресурс має власний URL.
Основні HTTP-методи (GET, POST, PUT, PATCH, DELETE).
Що означає Stateless.
Як виглядає хороший REST URL.
🔵 Junior
Шість принципів REST на базовому рівні.
Різниця між Resource та Representation.
URI, URL та Endpoint.
Чому HTTP-метод важливіший за назву URL.
Ідентифікація ресурсів.
Основні REST-конвенції при проєктуванні API.
🟠 Middle
Idempotency HTTP-методів.
Безпечні (Safe) та небезпечні (Unsafe) методи.
Кешування (Cacheable).
Layered System.
HATEOAS (що це таке і навіщо потрібний).
Версіонування REST API.
Проєктування зрозумілих REST endpoint'ів.
🔴 Senior
REST Constraints детально.
Trade-offs між REST, RPC та GraphQL.
Еволюція REST API без breaking changes.
REST API Design Guidelines.
Backward compatibility.
Rate Limiting.
API Gateway.
Документування API (OpenAPI / Swagger).

### Міні-шпаргалка
REST = стиль побудови API

Resource:
    /users
    /products
    /orders

HTTP Method визначає дію:

GET      -> отримати
POST     -> створити
PUT      -> повністю оновити
PATCH    -> частково оновити
DELETE   -> видалити

Приклади:

GET    /users
GET    /users/15
POST   /users
PUT    /users/15
PATCH  /users/15
DELETE /users/15

Правильно:
    /users
    /products
    /orders/15

Неправильно:
    /getUsers
    /deleteUser
    /createProduct

---------------------------------------------------
## 02. Resource Routing

Resource Routing — це побудова маршрутів (routes) навколо ресурсів, а не дій. URL ідентифікує ресурс, а HTTP-метод визначає операцію над ним.

### Ключові поняття
✔ Route
✔ Resource
✔ Endpoint
✔ URL
✔ URI
✔ Path Parameter
✔ Route Parameter
✔ Nested Resource

### Що потрібно пам'ятати
• Один маршрут відповідає одному ресурсу.
• URL містить іменники, а не дієслова.
• HTTP-метод визначає дію над ресурсом.
• Для одного ресурсу використовуються однакові маршрути.
• Route Parameters використовуються для ідентифікації конкретного ресурсу.

### Основний API
app.get()
app.post()
app.put()
app.patch()
app.delete()
req.params
req.baseUrl
req.path

### Де використовується
✔ Express
✔ NestJS
✔ REST API
✔ CRUD
✔ API Versioning
✔ Microservices

### Типові помилки
❌ `/getUsers`
❌ `/createUser`
❌ `/deleteProduct`
❌ Змішування однини та множини (`/user`, `/products`)
❌ Передача id через query замість route (`/users?id=5`)
❌ Занадто глибока вкладеність маршрутів

### Питання зі співбесіди
Що таке Route?
Що таке Endpoint?
Чим Route відрізняється від Resource?
Що таке Route Parameter?
Чому в REST URL містить іменники?
Коли використовувати вкладені (Nested) маршрути?

### Шлях
🟢 Core (обов'язково знати)
Що таке маршрут (Route).
Що таке Endpoint.
Як будуються REST URL.
Різниця між Collection та Single Resource.
Route Parameters (`:id`).
Основні REST-маршрути для CRUD.
🔵 Junior
REST-конвенції побудови маршрутів.
Використання `req.params`.
Коли використовувати query parameters.
Nested Resources.
Єдина структура URL у всьому API.
Організація маршрутів у великих проєктах.
🟠 Middle
Версіонування маршрутів (`/api/v1/...`).
Групування маршрутів.
Resource Controllers.
Route Prefix.
Nested Routing.
Плоскі (Flat) vs вкладені (Nested) маршрути.
Проєктування масштабованої структури API.
🔴 Senior
REST API Design Best Practices.
Route Naming Conventions.
Еволюція API без breaking changes.
Versioning Strategies.
Resource Hierarchy.
Routing у мікросервісній архітектурі.
API Gateway Routing.
Документування маршрутів (OpenAPI / Swagger).

### Міні-шпаргалка

```text
Колекція ресурсів

GET    /users        -> список користувачів
POST   /users        -> створити користувача

Окремий ресурс

GET    /users/:id    -> отримати користувача
PUT    /users/:id    -> повністю оновити
PATCH  /users/:id    -> частково оновити
DELETE /users/:id    -> видалити

Nested Resource

GET    /users/:id/posts
POST   /users/:id/posts

Route Parameter

/users/:id

req.params.id

Правильно

/users
/products
/orders

Неправильно

/getUsers
/createUser
/deleteOrder
/updateProduct
```

---------------------------------------------------
## 03. JSON API

JSON API — це спосіб обміну даними між клієнтом і сервером, у якому інформація передається у форматі JSON (JavaScript Object Notation). Саме JSON є стандартним форматом даних для більшості сучасних REST API.

### Ключові поняття
✔ JSON
✔ Request Body
✔ Response Body
✔ Content-Type
✔ application/json
✔ JSON.parse()
✔ JSON.stringify()

### Що потрібно пам'ятати
• REST API зазвичай працює з JSON.
• Клієнт надсилає JSON у Request Body.
• Сервер повертає JSON у Response Body.
• Заголовок `Content-Type: application/json` повідомляє про формат даних.
• JavaScript працює з об'єктами, тому JSON потрібно перетворювати під час передачі даних.

### Основний API
JSON.parse()
JSON.stringify()
req.body
res.json()
res.send()
res.setHeader()

### Де використовується
✔ Express
✔ NestJS
✔ Frontend ↔ Backend
✔ Mobile Applications
✔ REST API
✔ Microservices

### Типові помилки
❌ Забути `Content-Type: application/json`
❌ Надсилати невалідний JSON
❌ Викликати `JSON.parse()` для вже розпарсеного `req.body`
❌ Використовувати `res.send()` замість `res.json()` для JSON-відповіді
❌ Плутати JavaScript Object і JSON String

### Питання зі співбесіди
Що таке JSON?
Чим JSON відрізняється від JavaScript Object?
Для чого потрібні `JSON.parse()` та `JSON.stringify()`?
Що означає `Content-Type: application/json`?
Чому `req.body` є JavaScript-об'єктом?
Коли використовувати `res.json()`?

### Шлях
🟢 Core (обов'язково знати)
Що таке JSON.
Різниця між JSON і JavaScript Object.
Як працюють `JSON.parse()` та `JSON.stringify()`.
Що таке `Content-Type`.
Як сервер повертає JSON-відповідь.
🔵 Junior
Структура JSON.
Request Body та Response Body.
Правильне використання `res.json()`.
Як Express отримує `req.body`.
Які типи даних підтримує JSON.
Основні правила запису JSON.
🟠 Middle
Серіалізація та десеріалізація даних.
Обробка великих JSON-документів.
JSON MIME Types.
Відмінності між `res.send()` і `res.json()`.
Форматування та структура API-відповідей.
Стандартизація JSON Response.
🔴 Senior
JSON API Design Best Practices.
Стандарти JSON API Response.
Проблеми продуктивності при роботі з великими JSON.
Streaming JSON.
Backward Compatibility.
Оптимізація розміру JSON-відповідей.
Версіонування структури JSON.

### Міні-шпаргалка
```text
JSON

{
  "id": 1,
  "name": "John",
  "age": 25
}

JavaScript Object

const user = {
  id: 1,
  name: "John",
  age: 25
};

Object -> JSON

JSON.stringify(user)

JSON -> Object

JSON.parse(jsonString)

Request

POST /users

Headers

Content-Type: application/json

Body
{
  "name": "John",
  "age": 25
}

Response
res.json({
  id: 1,
  name: "John"
});
```

---------------------------------------------------
## 04. Request Body
Request Body — це тіло HTTP-запиту, яке містить дані, що клієнт надсилає серверу. Найчастіше використовується у POST, PUT та PATCH запитах для створення або оновлення ресурсів.

### Ключові поняття
✔ Request Body
✔ Payload
✔ JSON
✔ Content-Type
✔ application/json
✔ req.body
✔ express.json()

### Що потрібно пам'ятати
• Request Body використовується для передачі даних на сервер.
• Найчастіше дані передаються у форматі JSON.
• Express не читає JSON автоматично — необхідно підключити `express.json()`.
• Після обробки middleware дані доступні через `req.body`.
• Перед використанням дані необхідно перевіряти (валідувати).

### Основний API
express.json()
req.body
req.headers
req.is()
res.json()
next()

### Де використовується
✔ POST-запити
✔ PUT-запити
✔ PATCH-запити
✔ REST API
✔ Express
✔ NestJS

### Типові помилки
❌ Забути підключити `express.json()`
❌ Надсилати невалідний JSON
❌ Довіряти `req.body` без валідації
❌ Використовувати Request Body у GET-запитах
❌ Не перевіряти обов'язкові поля

### Питання зі співбесіди
Що таке Request Body?
Для чого використовується `req.body`?
Навіщо потрібен `express.json()`?
Чому GET-запити зазвичай не містять Request Body?
Який формат даних найчастіше використовується в Request Body?
Чому потрібно валідувати дані з `req.body`?

### Шлях
🟢 Core (обов'язково знати)
Що таке Request Body.
Що таке Payload.
Як працює `express.json()`.
Як отримати дані через `req.body`.
Які HTTP-методи використовують Request Body.
🔵 Junior
Middleware для обробки Request Body.
`Content-Type: application/json`.
Передача JSON між клієнтом і сервером.
Обов'язкові та необов'язкові поля.
Базова перевірка отриманих даних.
Основні помилки під час обробки Request Body.
🟠 Middle
Обробка різних форматів Request Body.
Лімітування розміру Request Body.
Валідація до бізнес-логіки.
Middleware Pipeline.
Парсинг вкладених об'єктів.
Безпечна обробка користувацьких даних.
🔴 Senior
Streaming Request Body.
Обробка великих Payload.
Продуктивність JSON Parser.
Захист від надто великих Request Body.
Безпечне проєктування API.
Middleware Architecture.
Оптимізація обробки HTTP-запитів.

### Міні-шпаргалка

```text
Request

POST /users

Headers

Content-Type: application/json

Body

{
  "name": "John",
  "email": "john@example.com"
}

Express

app.use(express.json());

app.post("/users", (req, res) => {
  console.log(req.body);

  res.json({
    success: true
  });
});

req.body

{
  name: "John",
  email: "john@example.com"
}

Використовується у

POST
PUT
PATCH

Не використовується

GET
HEAD
```

---------------------------------------------------
## 05. CRUD Operations
CRUD — це чотири основні операції над ресурсами: Create (створити), Read (прочитати), Update (оновити) та Delete (видалити). У REST API кожна операція відповідає певному HTTP-методу.

### Ключові поняття
✔ CRUD
✔ Create
✔ Read
✔ Update
✔ Delete
✔ Resource
✔ HTTP Method
✔ Endpoint

### Що потрібно пам'ятати
• CRUD описує базові операції над даними.
• Кожна CRUD-операція має відповідний HTTP-метод.
• Операції виконуються над ресурсами, а не над URL.
• Один ресурс підтримує весь набір CRUD-маршрутів.
• Сервер повинен повертати відповідні HTTP Status Codes.

### Основний API
app.get()
app.post()
app.put()
app.patch()
app.delete()
req.params
req.body
res.json()
res.status()

### Де використовується
✔ REST API
✔ Express
✔ NestJS
✔ Бази даних
✔ ORM / ODM
✔ CRUD-додатки

### Типові помилки
❌ Використовувати GET для зміни даних
❌ Використовувати POST замість PATCH або PUT
❌ Не повертати правильний HTTP Status Code
❌ Оновлювати ресурс без перевірки його існування
❌ Видаляти ресурс без обробки помилки "не знайдено"

### Питання зі співбесіди
Що таке CRUD?
Які HTTP-методи відповідають CRUD-операціям?
Чим PUT відрізняється від PATCH?
Який статус повернути після створення ресурсу?
Що повернути, якщо ресурс не знайдено?
Чому GET не повинен змінювати дані?

### Шлях
🟢 Core (обов'язково знати)
Що таке CRUD.
CRUD ↔ HTTP Methods.
Створення ресурсу (POST).
Отримання ресурсу (GET).
Оновлення ресурсу (PUT, PATCH).
Видалення ресурсу (DELETE).
🔵 Junior
Повний CRUD для одного ресурсу.
Правильні HTTP Status Codes.
Collection та Single Resource.
Передача `id` через Route Parameters.
Request Body для Create та Update.
Обробка випадку, коли ресурс не знайдено.
🟠 Middle
Idempotency PUT та DELETE.
Часткове оновлення через PATCH.
Soft Delete та Hard Delete.
Пагінація списків ресурсів.
Фільтрація та сортування результатів.
CRUD через Service Layer.
🔴 Senior
Проєктування CRUD API.
Transactional CRUD Operations.
Optimistic Locking.
Bulk CRUD Operations.
Concurrency під час оновлення даних.
CRUD у мікросервісній архітектурі.
Еволюція CRUD API без breaking changes.

### Міні-шпаргалка
```text
CRUD

Create  -> POST
Read    -> GET
Update  -> PUT / PATCH
Delete  -> DELETE

Колекція
GET    /users
POST   /users

Окремий ресурс
GET    /users/:id
PUT    /users/:id
PATCH  /users/:id
DELETE /users/:id

Типові Status Codes
GET       -> 200 OK
POST      -> 201 Created
PUT       -> 200 OK
PATCH     -> 200 OK
DELETE    -> 204 No Content

Не знайдено
404 Not Found

Помилка даних
400 Bad Request
```
---------------------------------------------------
## 06. Validation
Validation — це перевірка даних, отриманих від клієнта, перед їх використанням. Валідація гарантує, що сервер працює лише з коректними даними та захищає застосунок від помилок і некоректних запитів.

### Ключові поняття
✔ Validation
✔ Schema
✔ Required Field
✔ Optional Field
✔ Data Type
✔ Constraints
✔ Middleware

### Що потрібно пам'ятати
• Усі дані від клієнта потрібно перевіряти.
• Валідація виконується до бізнес-логіки.
• Не можна довіряти `req.body`, `req.params` та `req.query`.
• При невалідних даних сервер повинен повертати помилку.
• Правила валідації краще описувати в окремих схемах.

### Основний API
express.json()
req.body
req.params
req.query
next()
res.status()
res.json()

### Де використовується
✔ Express
✔ NestJS
✔ REST API
✔ Форми
✔ Authentication
✔ Database

### Типові помилки
❌ Не перевіряти `req.body`
❌ Довіряти даним від клієнта
❌ Виконувати валідацію після запису в базу даних
❌ Повертати нечіткі повідомлення про помилки
❌ Дублювати однакову логіку валідації в різних маршрутах

### Питання зі співбесіди
Що таке Validation?
Навіщо потрібна валідація?
Які частини HTTP-запиту потрібно перевіряти?
Чому не можна довіряти `req.body`?
Що таке Validation Schema?
Де краще виконувати валідацію?

### Шлях
🟢 Core (обов'язково знати)
Що таке Validation.
Навіщо перевіряти вхідні дані.
Валідація `req.body`.
Валідація `req.params`.
Валідація `req.query`.
Обробка помилок валідації.
🔵 Junior
Required та Optional поля.
Перевірка типів даних.
Перевірка довжини рядків.
Перевірка числових значень.
Validation Middleware.
Базові Validation Schemas.
🟠 Middle
Joi.
Zod.
express-validator.
Кастомні правила валідації.
Повторне використання схем.
Валідація вкладених об'єктів.
Санітизація (Sanitization) даних.
🔴 Senior
Архітектура Validation Layer.
DTO та Validation.
Валідація у мікросервісах.
Спільні схеми між frontend і backend.
Валідація великих JSON-документів.
Продуктивність Validation.
Безпечне проєктування Validation Pipeline.

### Міні-шпаргалка
```text
Перевіряти потрібно

✔ req.body
✔ req.params
✔ req.query
✔ req.headers (за потреби)

Приклад
POST /users

Body

{
  "name": "John",
  "age": 25
}

Validation
✔ name існує
✔ name — рядок
✔ name не порожній
✔ age — число
✔ age >= 0

Якщо дані невалідні
400 Bad Request

Порядок
Request
    ↓
Validation
    ↓
Business Logic
    ↓
Database
    ↓
Response
```

---------------------------------------------------
## 07. Error Responses
Error Responses — це HTTP-відповіді, які повідомляють клієнта про помилку під час обробки запиту. Вони містять відповідний HTTP Status Code та інформацію, що допомагає зрозуміти причину помилки.

### Ключові поняття
✔ HTTP Status Code
✔ Error Response
✔ Client Error
✔ Server Error
✔ Error Message
✔ Exception
✔ Error Handling

### Що потрібно пам'ятати
• Кожна помилка повинна повертати правильний HTTP Status Code.
• Повідомлення про помилку мають бути зрозумілими для клієнта.
• Не можна повертати внутрішні деталі сервера або стек викликів.
• Усі помилки бажано повертати в єдиному форматі.
• Помилки слід обробляти централізовано через middleware.

### Основний API
res.status()
res.json()
throw new Error()
next(err)
Error Middleware
try...catch

### Де використовується
✔ Express
✔ NestJS
✔ REST API
✔ Authentication
✔ Validation
✔ Database

### Типові помилки
❌ Завжди повертати `200 OK`, навіть якщо сталася помилка
❌ Використовувати `500 Internal Server Error` для всіх помилок
❌ Повертати HTML замість JSON
❌ Показувати клієнту stack trace або внутрішні помилки
❌ Використовувати різний формат відповіді для різних помилок

### Питання зі співбесіди
Що таке HTTP Error Response?
Які існують категорії HTTP Status Codes?
Коли використовувати 400, 401, 403 та 404?
Коли повертається 500 Internal Server Error?
Навіщо потрібен Error Middleware?
Чому помилки повинні мати єдину структуру?

### Шлях
🟢 Core (обов'язково знати)
Основні HTTP Status Codes.
Клієнтські (4xx) та серверні (5xx) помилки.
Як повертати JSON-помилки.
Використання `res.status()`.
Базова обробка помилок.
🔵 Junior
404 Not Found.
400 Bad Request.
401 Unauthorized.
403 Forbidden.
409 Conflict.
500 Internal Server Error.
Error Middleware в Express.
🟠 Middle
Централізована обробка помилок.
Кастомні класи помилок.
Єдина структура Error Response.
Логування помилок.
Обробка асинхронних помилок.
Відокремлення бізнес-помилок від системних.
🔴 Senior
Глобальна Error Handling Architecture.
RFC 7807 (Problem Details).
Моніторинг та логування помилок.
Correlation ID.
Error Reporting.
Безпечна обробка винятків.
Observability та Diagnostics.

### Міні-шпаргалка
```text
Основні HTTP Status Codes

200 OK
201 Created
204 No Content

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity

500 Internal Server Error
503 Service Unavailable

Типова JSON-відповідь
{
  "message": "User not found"
}

або
{
  "error": "Validation failed",
  "message": "Email is required"
}

Express

res.status(404).json({
  message: "User not found"
});

Категорії
2xx -> успіх
4xx -> помилка клієнта
5xx -> помилка сервера
```
---------------------------------------------------
## 08. Persistence
Persistence — це механізм постійного зберігання даних, щоб вони не втрачалися після завершення роботи застосунку. У REST API дані зазвичай зберігаються у файлах або базах даних.

### Ключові поняття
✔ Persistence
✔ Storage
✔ Database
✔ File Storage
✔ Repository
✔ Data Access Layer (DAL)
✔ CRUD

### Що потрібно пам'ятати
• Дані повинні зберігатися між перезапусками сервера.
• Спосіб зберігання має бути відокремлений від бізнес-логіки.
• Для навчання часто використовують JSON-файли.
• У реальних проєктах найчастіше використовують бази даних.
• Весь доступ до сховища бажано виконувати через окремий шар (Repository / DAL).

### Основний API
fs.promises.readFile()
fs.promises.writeFile()
JSON.parse()
JSON.stringify()
async / await
path.join()

### Де використовується
✔ REST API
✔ Express
✔ NestJS
✔ PostgreSQL
✔ MongoDB
✔ SQLite

### Типові помилки
❌ Зберігати дані лише в пам'яті (RAM)
❌ Виконувати логіку роботи з файлами прямо в маршрутах
❌ Не чекати завершення запису (`await`)
❌ Перезаписувати файл без читання актуальних даних
❌ Змішувати бізнес-логіку та роботу зі сховищем

### Питання зі співбесіди
Що таке Persistence?
Навіщо потрібне постійне зберігання даних?
Чим файлове сховище відрізняється від бази даних?
Що таке Repository?
Чому доступ до бази даних краще винести в окремий шар?
Які бази даних найчастіше використовуються з Node.js?

### Шлях
🟢 Core (обов'язково знати)
Що таке Persistence.
Збереження даних у JSON-файл.
Читання та запис файлів.
Асинхронна робота зі сховищем.
Чому дані не можна тримати лише в пам'яті.
🔵 Junior
Організація файлового сховища.
Repository Pattern.
Data Access Layer (DAL).
Відокремлення бізнес-логіки від роботи зі сховищем.
Підготовка до переходу на базу даних.
Основи роботи з PostgreSQL або MongoDB.
🟠 Middle
ORM та ODM.
Prisma.
TypeORM.
Mongoose.
Міграції бази даних.
Транзакції.
Connection Pool.
🔴 Senior
Архітектура Data Layer.
Repository vs Service Pattern.
Database Scaling.
Реплікація та резервне копіювання.
Caching.
Consistency та Durability.
Оптимізація роботи з базою даних.

### Міні-шпаргалка
```text
Persistence

Request
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
Storage
(JSON / Database)

Навчальний варіант
users.json
↓
readFile()
↓
JSON.parse()
↓
CRUD
↓
JSON.stringify()
↓
writeFile()

У реальних проєктах
Repository
    ↓
PostgreSQL

або

Repository
    ↓
MongoDB

Головна ідея
Controller
    ↓
Service
    ↓
Repository
    ↓
Storage
```
---------------------------------------------------
## 09. API Testing
API Testing — це перевірка роботи API шляхом надсилання HTTP-запитів і аналізу отриманих відповідей. Мета тестування — переконатися, що API працює правильно, повертає очікувані дані та коректно обробляє помилки.

### Ключові поняття
✔ API Testing
✔ Request
✔ Response
✔ Endpoint
✔ HTTP Status Code
✔ Assertions
✔ Test Case

### Що потрібно пам'ятати
• Кожен endpoint потрібно перевіряти окремо.
• Необхідно тестувати як успішні сценарії, так і помилки.
• Важливо перевіряти HTTP Status Code, Response Body та Headers.
• API має повертати передбачувані результати.
• Автоматичні тести допомагають уникнути регресій після змін.

### Основний API
fetch()
curl
Postman
Bruno
req.body
res.status()
res.json()

### Де використовується
✔ REST API
✔ Express
✔ NestJS
✔ Backend Development
✔ CI/CD
✔ Integration Testing

### Типові помилки
❌ Перевіряти лише успішні сценарії
❌ Ігнорувати HTTP Status Codes
❌ Не тестувати невалідні дані
❌ Не перевіряти формат JSON-відповіді
❌ Тестувати лише вручну

### Питання зі співбесіди
Що таке API Testing?
Навіщо тестувати REST API?
Що потрібно перевіряти у відповіді сервера?
Яка різниця між ручним та автоматичним тестуванням?
Що таке Integration Testing?
Які інструменти використовуються для тестування API?

### Шлях
🟢 Core (обов'язково знати)
Що таке API Testing.
Як надсилати HTTP-запити.
Перевірка HTTP Status Code.
Перевірка JSON-відповіді.
Тестування CRUD-операцій.
🔵 Junior
Postman.
Bruno.
curl.
Тестування GET, POST, PUT, PATCH, DELETE.
Перевірка Error Responses.
Написання базових Test Cases.
🟠 Middle
Автоматичне тестування API.
Integration Testing.
Jest.
Supertest.
Тестування Middleware.
Тестування Authentication.
Mock-об'єкти та Test Environment.
🔴 Senior
End-to-End Testing.
Контрактне тестування (Contract Testing).
Performance Testing.
Load Testing.
API Regression Testing.
CI/CD Pipeline.
Тестування мікросервісів.

### Міні-шпаргалка
```text
Що перевіряти

✔ Status Code
✔ Response Body
✔ Headers
✔ JSON Structure
✔ Error Responses

CRUD
GET    /users
POST   /users
PUT    /users/:id
PATCH  /users/:id
DELETE /users/:id

Типові Status Codes
200 OK
201 Created
204 No Content

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error

Приклад Test Case
Request
POST /users
↓
Status
201 Created
↓
Body
{
  "id": 1,
  "name": "John"
}

Інструменти
• Postman
• Bruno
• curl
• fetch()
• Jest
• Supertest
```
---------------------------------------------------
## 10-mini-project
• 

### Ключові поняття


### Що потрібно пам'ятати
• 
• 
• 
• 
• 
• 

### Основний API


### Де використовується


### Типові помилки


### Питання зі співбесіди


### Шлях


### Міні-шпаргалка
• 
• 
• 
• 
• 

---------------------------------------------------
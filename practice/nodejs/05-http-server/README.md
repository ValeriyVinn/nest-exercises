# 05-http-server

## 01-http-module
• Модуль http — це вбудований модуль Node.js для створення HTTP-серверів і HTTP-клієнтів без сторонніх бібліотек. Він дозволяє приймати HTTP-запити, формувати HTTP-відповіді та є основою для таких фреймворків, як Express і NestJS.

### Ключові поняття
✔ HTTP
✔ HTTP module
✔ HTTP server
✔ HTTP client
✔ request
✔ response
✔ TCP socket
✔ stateless protocol

### Що потрібно пам'ятати
• http — вбудований Core Module Node.js.
• Не потребує встановлення через npm.
• Дозволяє створювати HTTP-сервери та HTTP-клієнти.
• Сервер працює за принципом Request → Response.
• Кожен HTTP-запит незалежний (stateless).
• Express побудований поверх модуля http.

### Основний API
import http from 'node:http';
http.createServer()
server.listen()
server.close()
http.request()
http.get()

### Де використовується
✔ Web Server
✔ REST API
✔ Express
✔ NestJS
✔ Proxy Server
✔ API Gateway
✔ Microservices

### Типові помилки
❌ Забути викликати server.listen()
❌ Не завершити відповідь через response.end()
❌ Використовувати Express, не розуміючи роботи http
❌ Не обробляти помилки сервера

### Питання зі співбесіди
Що таке модуль http?
Навіщо потрібен http.createServer()?
Що таке Request і Response?
Чим HTTP-сервер Node.js відрізняється від Express?
Чому Express використовує модуль http?

### Шлях
🟢 Core (обов'язково знати)
Що таке HTTP-модуль Node.js.
Як імпортувати http.
Як створити HTTP-сервер.
Що таке Request і Response.
Як запустити сервер через listen().
🔵 Junior
Як працює HTTP-сервер у Node.js.
Життєвий цикл HTTP-запиту.
Які методи має об'єкт Server.
Що таке HTTP-клієнт (http.get(), http.request()).
Чому HTTP є stateless-протоколом.
🟠 Middle
Як працює HTTP поверх TCP.
Подія request у сервері.
Як працює Keep-Alive.
Різниця між HTTP/1.1 та HTTP/2.
Налаштування таймаутів сервера.
Обробка великої кількості одночасних підключень.
🔴 Senior
Внутрішня реалізація HTTP-сервера в Node.js.
Як http взаємодіє з Event Loop і libuv.
Streaming HTTP-відповідей.
Backpressure при передачі даних.
Оптимізація продуктивності HTTP-сервера.
Коли використовувати HTTP/2 або HTTP/3.

### Міні-шпаргалка
• Імпорт
import http from "node:http";

• Створення сервера
const server = http.createServer((req, res) => {
  res.end("Hello");
});

• Запуск
server.listen(3000);

• Основні методи
http.createServer()
server.listen()
server.close()
http.get()
http.request()

• Схема роботи
Client
   │
HTTP Request
   │
   ▼
Node.js HTTP Server
   │
Обробка запиту
   │
   ▼
HTTP Response
   │
   ▼
Client

---------------------------------------------------
## 02-creating-server
• Створення HTTP-сервера — це процес запуску програми, яка прослуховує певний порт, приймає HTTP-запити від клієнтів і повертає HTTP-відповіді. У Node.js це робиться за допомогою модуля http.

### Ключові поняття
✔ HTTP Server
✔ http.createServer()
✔ callback
✔ server.listen()
✔ port
✔ host
✔ request listener

### Що потрібно пам'ятати
• Сервер створюється через http.createServer().
• createServer() приймає callback, який виконується для кожного HTTP-запиту.
• Сервер починає працювати лише після виклику server.listen().
• Кожен сервер слухає певний порт.
• Один callback обробляє всі вхідні запити (детальна маршрутизація додається пізніше).

### Основний API
import http from "node:http";
http.createServer()
server.listen()
server.close()
server.address()
server.on()

### Де використовується
✔ Web Server
✔ REST API
✔ Express
✔ NestJS
✔ Development Server
✔ Local API

### Типові помилки
❌ Забути викликати server.listen()
❌ Використовувати порт, який уже зайнятий (EADDRINUSE)
❌ Не викликати response.end()
❌ Вказати неправильний порт або host
❌ Не обробляти помилку запуску сервера

### Питання зі співбесіди
Що робить http.createServer()?
Навіщо потрібен server.listen()?
Що таке порт?
Що таке callback у createServer()?
Чому без listen() сервер не працює?

### Шлях
🟢 Core (обов'язково знати)
Як створити HTTP-сервер.
Як працює http.createServer().
Навіщо потрібен server.listen().
Що таке порт.
Як завершити відповідь через response.end().
🔵 Junior
Життєвий цикл запуску HTTP-сервера.
Що таке callback-функція обробника запитів.
Різниця між localhost, 127.0.0.1 та 0.0.0.0.
Як зупинити сервер через server.close().
Типові помилки під час запуску сервера.
🟠 Middle
Як працює прослуховування TCP-порту.
Події сервера (listening, error, close).
Як запускати декілька серверів.
Graceful Shutdown.
Конфігурація порту через змінні середовища (process.env.PORT).
🔴 Senior
Як Node.js приймає нові TCP-з'єднання.
Keep-Alive та повторне використання з'єднань.
Балансування навантаження між процесами.
Cluster та масштабування HTTP-сервера.
Оптимізація запуску високонавантажених серверів.

### Міні-шпаргалка
• Створення сервера
import http from "node:http";
const server = http.createServer((req, res) => {
  res.end("Hello, World!");
});

• Запуск сервера
server.listen(3000, () => {
  console.log("Server is running...");
});

• Зупинка сервера
server.close();

• Отримання інформації про сервер
server.address();

• Основні методи
http.createServer()
server.listen()
server.close()
server.address()
server.on()

• Схема роботи
Створення сервера
        │
        ▼
http.createServer()
        │
        ▼
server.listen(3000)
        │
        ▼
Очікування HTTP-запитів
        │
        ▼
Callback(req, res)
        │
        ▼
response.end()
---------------------------------------------------
## 03-request-and-response
• HTTP-комунікація будується за моделлю Request → Response. Клієнт (браузер, мобільний застосунок, Postman тощо) надсилає HTTP-запит (Request), а сервер його обробляє і повертає HTTP-відповідь (Response).

### Ключові поняття
✔ Request (IncomingMessage)
✔ Response (ServerResponse)
✔ request body
✔ request URL
✔ response body
✔ request headers
✔ response headers
✔ client-server

### Що потрібно пам'ятати
• Кожен HTTP-запит створює нові об'єкти req і res.
• req містить інформацію про запит клієнта.
• res використовується для формування відповіді.
• Сервер повинен завершити відповідь через res.end().
• Після завершення відповіді (res.end()) змінювати її вже не можна.

### Основний API
req.method
req.url
req.headers
req.on()
res.statusCode
res.setHeader()
res.write()
res.end()

### Де використовується
✔ HTTP Server
✔ REST API
✔ Express
✔ NestJS
✔ File Server
✔ Proxy Server

### Типові помилки
❌ Забути викликати res.end()
❌ Викликати res.end() двічі
❌ Намагатися записати дані після res.end()
❌ Не прочитати request body повністю
❌ Ігнорувати помилки під час читання потоку запиту

### Питання зі співбесіди
Що таке Request?
Що таке Response?
Що містить об'єкт req?
Для чого використовується res?
Чому потрібно викликати res.end()?

### Шлях
🟢 Core (обов'язково знати)
Що таке Request і Response.
Які дані містить req.
Як відправити відповідь через res.
Як завершити відповідь через res.end().
Як отримати URL і HTTP-метод запиту.
🔵 Junior
Різниця між Request Header і Request Body.
Різниця між Response Header і Response Body.
Як прочитати request body.
Життєвий цикл HTTP-запиту.
Потокова природа (stream) об'єктів req і res.
🟠 Middle
Як працює читання request body через потоки.
Події data, end, error.
Streaming Response.
Обробка великих запитів без завантаження всього в пам'ять.
Backpressure під час передачі даних.
🔴 Senior
Внутрішня реалізація IncomingMessage і ServerResponse.
Як Node.js працює з HTTP-потоками.
Оптимізація передачі великих файлів.
Zero-copy streaming.
Високопродуктивна обробка HTTP-запитів.

### Міні-шпаргалка
• Request
req.method;
req.url;
req.headers;
req.on("data");
req.on("end");

• Response
res.statusCode = 200;
res.setHeader("Content-Type", "text/plain");
res.write("Hello");
res.end();

• Мінімальний приклад
import http from "node:http";
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!");
});

• Основні властивості
Request
├── method
├── url
├── headers
└── body

Response
├── statusCode
├── headers
└── body

• Схема роботи
Client
   │
HTTP Request
   │
   ▼
req (IncomingMessage)
   │
Обробка на сервері
   │
   ▼
res (ServerResponse)
   │
HTTP Response
   │
   ▼
Client

---------------------------------------------------
## 04-http-methods
• HTTP-методи (або HTTP Verbs) визначають, яку дію клієнт хоче виконати над ресурсом. Вони є частиною HTTP-запиту і використовуються для реалізації CRUD-операцій у REST API.

### Ключові поняття
✔ HTTP Method
✔ GET
✔ POST
✔ PUT
✔ PATCH
✔ DELETE
✔ OPTIONS
✔ HEAD
✔ CRUD
✔ idempotent
✔ safe methods

### Що потрібно пам'ятати
• HTTP-метод знаходиться у властивості req.method.
• Один URL може підтримувати різні HTTP-методи.
• Метод визначає намір клієнта, а не адресу ресурсу.
• GET не повинен змінювати дані.
• PUT повністю замінює ресурс, PATCH змінює лише його частину.
• DELETE видаляє ресурс.

### Основний API
req.method
switch (req.method) {}
if (req.method === "GET") {}
if (req.method === "POST") {}

### Де використовується
✔ HTTP Server
✔ REST API
✔ Express
✔ NestJS
✔ Fetch API
✔ Postman
✔ Browser

### Типові помилки
❌ Використовувати GET для зміни даних
❌ Передавати великі дані через Query String замість POST
❌ Не перевіряти req.method
❌ Використовувати PUT замість PATCH без розуміння різниці
❌ Повертати однакову логіку для всіх HTTP-методів

### Питання зі співбесіди
Що таке HTTP-метод?
Які HTTP-методи використовуються найчастіше?
Чим відрізняється PUT від PATCH?
Чому GET вважається безпечним (safe)?
Що означає idempotent method?

### Шлях
🟢 Core (обов'язково знати)
Що таке HTTP-метод.
Як отримати метод через req.method.
Призначення GET, POST, PUT, PATCH, DELETE.
Зв'язок HTTP-методів із CRUD-операціями.
🔵 Junior
Які методи є стандартними.
Різниця між PUT і PATCH.
Для чого використовуються HEAD і OPTIONS.
Що таке safe methods.
Що таке idempotent methods.
🟠 Middle
Як браузер використовує OPTIONS (CORS Preflight).
Підтримка різних HTTP-методів у REST API.
Method Override (X-HTTP-Method-Override).
Проєктування REST API відповідно до HTTP-методів.
🔴 Senior
Специфікація HTTP Semantics.
Ідемпотентність у розподілених системах.
Безпечне повторення HTTP-запитів.
Кешування залежно від HTTP-методу.
Проєктування API з урахуванням семантики HTTP.

### Міні-шпаргалка
• CRUD
Create  → POST
Read    → GET
Update  → PUT / PATCH
Delete  → DELETE

• Основні HTTP-методи
| Метод   | Призначення                            |
| ------- | -------------------------------------- |
| GET     | Отримати ресурс                        |
| POST    | Створити ресурс                        |
| PUT     | Повністю оновити ресурс                |
| PATCH   | Частково оновити ресурс                |
| DELETE  | Видалити ресурс                        |
| HEAD    | Отримати лише заголовки відповіді      |
| OPTIONS | Дізнатися, які методи підтримує сервер |

• Отримання методу
const server = http.createServer((req, res) => {
  console.log(req.method);
});

• Обробка методів
switch (req.method) {
  case "GET":
    break;
  case "POST":
    break;
  case "PUT":
    break;
  case "PATCH":
    break;
  case "DELETE":
    break;
  default:
    res.statusCode = 405;
    res.end("Method Not Allowed");
}
• Схема роботи
Client
   │
HTTP Method
(GET, POST, PUT...)
   │
   ▼
Server
   │
Перевірка req.method
   │
   ▼
Виконання потрібної логіки
   │
   ▼
HTTP Response
---------------------------------------------------
## 05-status-codes
• HTTP Status Codes (коди стану HTTP) — це тризначні числа, які сервер повертає у відповіді, щоб повідомити клієнту результат обробки запиту. Перша цифра визначає категорію відповіді: інформація, успіх, перенаправлення, помилка клієнта або помилка сервера.

### Ключові поняття
✔ HTTP Status Code
✔ statusCode
✔ 1xx Informational
✔ 2xx Success
✔ 3xx Redirection
✔ 4xx Client Error
✔ 5xx Server Error
✔ success response
✔ error response

### Що потрібно пам'ятати
• Код статусу є частиною HTTP-відповіді.
• За замовчуванням Node.js встановлює 200 OK.
• Код потрібно встановити до відправлення відповіді.
• Правильний статус допомагає клієнту зрозуміти результат запиту.
• Один HTTP-запит має один HTTP-статус.

### Основний API
res.statusCode
res.writeHead()
res.end()

### Де використовується
✔ HTTP Server
✔ REST API
✔ Express
✔ NestJS
✔ Browser
✔ Fetch API
✔ Postman

### Типові помилки
❌ Завжди повертати 200 OK, навіть якщо сталася помилка
❌ Повертати 500 замість 404
❌ Встановлювати statusCode після res.end()
❌ Використовувати неправильний код для створення або видалення ресурсу
❌ Ігнорувати коди помилок клієнта (4xx)

### Питання зі співбесіди
Що таке HTTP Status Code?
Які існують категорії статус-кодів?
Чим відрізняються 404 і 500?
Коли використовувати 201 Created?
Що означає 204 No Content?

### Шлях
🟢 Core (обов'язково знати)
Що таке HTTP Status Code.
Як встановити res.statusCode.
Категорії 2xx, 4xx, 5xx.
Найпоширеніші статус-коди.
🔵 Junior
Різниця між 200, 201 і 204.
Різниця між 400, 401, 403 і 404.
Коли використовувати 500.
Як працює res.writeHead().
Правильний вибір статус-коду для REST API.
🟠 Middle
Повний список категорій HTTP Status Codes.
Кешування та коди 304 Not Modified.
Редіректи (301, 302, 307, 308).
Семантика статус-кодів у REST API.
Обробка помилок у middleware.
🔴 Senior
HTTP Semantics (RFC 9110).
Проєктування API з правильними статус-кодами.
Використання статус-кодів у мікросервісах.
Моніторинг серверних помилок (5xx).
Стандартизація відповідей API.

### Міні-шпаргалка
• Встановлення статусу
res.statusCode = 404;
res.end("Not Found");

• Через writeHead()
res.writeHead(201, {
  "Content-Type": "application/json",
});
res.end();

• Основні статус-коди
| Код | Назва                 | Використання                 |
| --- | --------------------- | ---------------------------- |
| 200 | OK                    | Запит успішний               |
| 201 | Created               | Ресурс створено              |
| 204 | No Content            | Успіх без тіла відповіді     |
| 301 | Moved Permanently     | Постійне перенаправлення     |
| 302 | Found                 | Тимчасове перенаправлення    |
| 304 | Not Modified          | Використати кеш              |
| 400 | Bad Request           | Некоректний запит            |
| 401 | Unauthorized          | Потрібна автентифікація      |
| 403 | Forbidden             | Доступ заборонено            |
| 404 | Not Found             | Ресурс не знайдено           |
| 405 | Method Not Allowed    | Метод не підтримується       |
| 500 | Internal Server Error | Внутрішня помилка сервера    |
| 503 | Service Unavailable   | Сервіс тимчасово недоступний |

• Категорії
1xx → Informational
2xx → Success
3xx → Redirection
4xx → Client Error
5xx → Server Error

• Схема роботи
HTTP Request
      │
      ▼
Обробка на сервері
      │
      ▼
Визначення результату
      │
      ▼
Status Code
      │
      ▼
HTTP Response

---------------------------------------------------
## 06-headers
• HTTP Headers (заголовки HTTP) — це пари ключ → значення, які передають додаткову інформацію про HTTP-запит або HTTP-відповідь. Вони описують формат даних, кодування, кешування, автентифікацію, cookies та інші параметри взаємодії між клієнтом і сервером.

### Ключові поняття
✔ HTTP Headers
✔ Request Headers
✔ Response Headers
✔ Content-Type
✔ Content-Length
✔ Accept
✔ Authorization
✔ User-Agent
✔ Cookie
✔ Cache-Control

### Що потрібно пам'ятати
• Заголовки передають метадані, а не самі дані.
• req.headers містить усі заголовки HTTP-запиту.
• Заголовки відповіді встановлюються через res.setHeader().
• Заголовки потрібно встановити до відправлення відповіді.
• Назви HTTP-заголовків не чутливі до регістру (case-insensitive).

### Основний API
req.headers
req.headers["content-type"]
req.headers.authorization
res.setHeader()
res.getHeader()
res.removeHeader()
res.writeHead()

### Де використовується
✔ HTTP Server
✔ REST API
✔ Express
✔ NestJS
✔ Browser
✔ Fetch API
✔ Authentication
✔ CORS
✔ Cookies

### Типові помилки
❌ Не встановити Content-Type
❌ Встановлювати заголовки після res.end()
❌ Плутати Request Headers і Response Headers
❌ Ігнорувати заголовок Authorization
❌ Неправильно вказувати MIME-тип відповіді

### Питання зі співбесіди
Що таке HTTP Headers?
Яка різниця між Request Headers і Response Headers?
Для чого використовується Content-Type?
Що містить заголовок Authorization?
Як отримати заголовки HTTP-запиту в Node.js?

### Шлях
🟢 Core (обов'язково знати)
Що таке HTTP Headers.
Як отримати req.headers.
Як встановити заголовок через res.setHeader().
Для чого потрібен Content-Type.
Різниця між Request Headers і Response Headers.
🔵 Junior
Найпоширеніші HTTP-заголовки.
Як працює Accept.
Що таке Authorization.
Що таке User-Agent.
Як Node.js зберігає заголовки запиту.
🟠 Middle
MIME Types.
Кешування (Cache-Control, ETag, Last-Modified).
CORS-заголовки.
Cookies через HTTP Headers.
Компресія (Content-Encoding, Accept-Encoding).
🔴 Senior
HTTP Content Negotiation.
Conditional Requests.
Безпека HTTP-заголовків (Strict-Transport-Security, X-Content-Type-Options, Content-Security-Policy).
Кастомні HTTP-заголовки.
Оптимізація передачі HTTP-заголовків.

### Міні-шпаргалка
• Отримання заголовків
req.headers
req.headers["content-type"]
req.headers.authorization

• Встановлення заголовків
res.setHeader("Content-Type", "application/json");
res.setHeader("Cache-Control", "no-cache");

• Через writeHead()
res.writeHead(200, {
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
});

• Найпоширеніші HTTP-заголовки
| Заголовок      | Призначення                  |
| -------------- | ---------------------------- |
| Content-Type   | Формат даних                 |
| Content-Length | Розмір тіла повідомлення     |
| Accept         | Які формати підтримує клієнт |
| Authorization  | Дані для автентифікації      |
| User-Agent     | Інформація про клієнта       |
| Host           | Ім'я сервера                 |
| Cookie         | Cookies клієнта              |
| Set-Cookie     | Встановлення cookies         |
| Cache-Control  | Правила кешування            |
| Location       | Адреса для перенаправлення   |

• Схема роботи
Client
   │
Request Headers
   │
   ▼
HTTP Server
   │
Обробка запиту
   │
   ▼
Response Headers
   │
   ▼
Client
---------------------------------------------------
## 07-query-parameters
• Query Parameters (параметри запиту) — це пари ключ=значення, які передаються в URL після символу ?. Вони використовуються для передачі додаткових даних до сервера, таких як фільтрація, сортування, пошук, пагінація або налаштування відповіді.

### Ключові поняття
✔ Query Parameters
✔ Query String
✔ URL
✔ URL
✔ URLSearchParams
✔ filtering
✔ sorting
✔ pagination
✔ search

### Що потрібно пам'ятати
• Query Parameters є частиною URL.
• Вони починаються після символу ?.
• Параметри розділяються символом &.
• Дані передаються у форматі ключ=значення.
• Для роботи з параметрами в Node.js зручно використовувати URL та URLSearchParams.

### Основний API
req.url
new URL()
url.searchParams
searchParams.get()
searchParams.getAll()
searchParams.has()
searchParams.entries()

### Де використовується
✔ REST API
✔ Search
✔ Filtering
✔ Sorting
✔ Pagination
✔ Browser
✔ Fetch API
✔ Express

### Типові помилки
❌ Парсити Query String вручну через split("&")
❌ Не перевіряти наявність параметра
❌ Передавати конфіденційні дані через Query Parameters
❌ Не декодувати URL-параметри
❌ Використовувати Query Parameters для великих обсягів даних

### Питання зі співбесіди
Що таке Query Parameters?
Чим Query Parameters відрізняються від Route Parameters?
Як отримати Query Parameters у Node.js?
Для чого використовується URLSearchParams?
Коли краще використовувати Query Parameters?

### Шлях
🟢 Core (обов'язково знати)
Що таке Query Parameters.
Структура Query String.
Як отримати параметри через URL.
Як працює searchParams.get().
Для чого використовуються Query Parameters.
🔵 Junior
Як працює URLSearchParams.
Різниця між Query Parameters і Request Body.
Різниця між Query Parameters і Route Parameters.
Обробка відсутніх параметрів.
Отримання кількох параметрів.
🟠 Middle
Валідація Query Parameters.
Пагінація (page, limit).
Фільтрація та сортування.
Масиви в Query Parameters.
URL Encoding та Decoding.
🔴 Senior
Проєктування REST API з Query Parameters.
Складні фільтри та пошук.
Безпечна обробка параметрів.
Оптимізація великих списків через пагінацію.
Стандартизація Query Parameters у великих API.

### Міні-шпаргалка
• URL
/products?category=books&page=2&limit=10

• Отримання параметрів
const url = new URL(req.url, "http://localhost");
const category = url.searchParams.get("category");
const page = url.searchParams.get("page");

• Основні методи
searchParams.get()
searchParams.getAll()
searchParams.has()
searchParams.entries()

• Приклади Query Parameters
| URL                            | Призначення       |
| ------------------------------ | ----------------- |
| `/users?page=2`                | Пагінація         |
| `/products?category=laptops`   | Фільтрація        |
| `/products?sort=price`         | Сортування        |
| `/search?q=nodejs`             | Пошук             |
| `/posts?author=ivan&year=2025` | Кілька параметрів |


• Схема роботи
Client
   │
GET /products?page=2&limit=10
   │
   ▼
req.url
   │
   ▼
new URL(req.url, baseURL)
   │
   ▼
url.searchParams
   │
   ▼
Отримання значень

---------------------------------------------------
## 08-serving-files
• Serving Files (обслуговування файлів) — це процес відправлення файлів із файлової системи сервера клієнту через HTTP. Сервер читає файл (HTML, CSS, JavaScript, зображення, PDF тощо), встановлює правильні HTTP-заголовки та передає його у відповіді.

### Ключові поняття
✔ Static Files
✔ File Server
✔ fs.createReadStream()
✔ pipe()
✔ Content-Type
✔ MIME Type
✔ path
✔ Stream
✔ Buffer

### Що потрібно пам'ятати
• Файли читаються з файлової системи (fs).
• Для великих файлів краще використовувати Streams, а не readFile().
• Сервер повинен встановити правильний Content-Type.
• Шлях до файлу бажано формувати через модуль path.
• Якщо файл не знайдено — потрібно повернути 404 Not Found.

### Основний API
fs.createReadStream()
stream.pipe()
fs.readFile()
path.join()
path.extname()
res.setHeader()
res.end()

### Де використовується
✔ Web Server
✔ Static Website
✔ Express Static
✔ NestJS Static Assets
✔ File Download
✔ Image Server
✔ PDF Server

### Типові помилки
❌ Використовувати fs.readFile() для великих файлів
❌ Не встановити правильний Content-Type
❌ Будувати шлях до файлу конкатенацією рядків
❌ Не перевіряти існування файлу
❌ Не обробляти помилки потоку (stream.on("error"))

### Питання зі співбесіди
Що таке Serving Files?
Чому для великих файлів використовують Streams?
Для чого потрібен Content-Type?
Навіщо використовувати path.join()?
Як повернути файл через HTTP?

### Шлях
🟢 Core (обов'язково знати)
Що таке Serving Files.
Як прочитати файл із файлової системи.
Як відправити файл клієнту.
Для чого потрібен Content-Type.
Навіщо використовувати path.join().
🔵 Junior
Різниця між readFile() і createReadStream().
Що таке MIME Type.
Як працює pipe().
Як обробляти помилки при читанні файлів.
Як повертати HTML, CSS та JavaScript.
🟠 Middle
Streaming великих файлів.
Передача відео та аудіо.
HTTP Range Requests.
Безпечна робота зі шляхами (Path Traversal).
Оптимізація статичних ресурсів.
🔴 Senior
Zero-copy Streaming.
Backpressure при передачі файлів.
Кешування статичних ресурсів (ETag, Cache-Control).
CDN та Reverse Proxy.
Оптимізація File Server для високого навантаження.

### Міні-шпаргалка
• Просте читання файлу
const data = await fs.readFile(filePath);
res.end(data);
• Streaming файлу
const stream = fs.createReadStream(filePath);
stream.pipe(res);

• Встановлення MIME Type
res.setHeader("Content-Type", "text/html");

• Побудова шляху
const filePath = path.join(__dirname, "public", "index.html");

• Поширені MIME Types
| Тип файлу        | Content-Type             |
| ---------------- | ------------------------ |
| `.html`          | `text/html`              |
| `.css`           | `text/css`               |
| `.js`            | `application/javascript` |
| `.json`          | `application/json`       |
| `.png`           | `image/png`              |
| `.jpg` / `.jpeg` | `image/jpeg`             |
| `.svg`           | `image/svg+xml`          |
| `.pdf`           | `application/pdf`        |
| `.txt`           | `text/plain`             |


• Схема роботи
Client
   │
GET /index.html
   │
   ▼
HTTP Server
   │
Пошук файлу
   │
   ▼
fs.createReadStream()
   │
pipe(res)
   │
   ▼
HTTP Response

---------------------------------------------------
## 09-basic-routing
• Routing (маршрутизація) — це процес визначення, яку логіку виконати для конкретного HTTP-запиту. Маршрут зазвичай визначається комбінацією HTTP-методу (GET, POST тощо) та URL-шляху (/, /users, /products).

### Ключові поняття
✔ Routing
✔ Route
✔ URL Path
✔ req.url
✔ req.method
✔ Route Handler
✔ Endpoint
✔ 404 Not Found

### Що потрібно пам'ятати
• Маршрут визначається комбінацією HTTP-методу та URL.
• У Node.js маршрутизація реалізується вручну через req.url і req.method.
• Кожен маршрут має власну логіку обробки.
• Якщо маршрут не знайдено — потрібно повернути 404 Not Found.
• Express і NestJS автоматизують процес маршрутизації.

### Основний API
req.url
req.method
switch ()
if ()
res.statusCode
res.end()

### Де використовується
✔ HTTP Server
✔ REST API
✔ Express
✔ NestJS
✔ API Gateway
✔ Microservices

### Типові помилки
❌ Перевіряти лише req.url, ігноруючи req.method
❌ Не повертати 404 для невідомих маршрутів
❌ Створювати довгі вкладені if...else
❌ Не обробляти маршрут /
❌ Порівнювати URL разом із Query Parameters

### Питання зі співбесіди
Що таке Routing?
Що таке Route?
Як реалізувати маршрутизацію без Express?
Чому маршрут складається з URL і HTTP-методу?
Що потрібно повернути для невідомого маршруту?

### Шлях
🟢 Core (обов'язково знати)
Що таке Routing.
Як отримати req.url.
Як отримати req.method.
Як обробити кілька маршрутів.
Як повернути 404 Not Found.
🔵 Junior
Різниця між URL Path і Query Parameters.
Маршрутизація через if та switch.
Що таке Endpoint.
Чому потрібно враховувати HTTP-метод.
Базова структура HTTP-сервера з кількома маршрутами.
🟠 Middle
Організація великої кількості маршрутів.
Таблиця маршрутів (Route Table).
Динамічні маршрути.
Маршрутизація в Express.
Принцип роботи Router.
🔴 Senior
Алгоритми пошуку маршрутів.
Trie та інші структури даних для маршрутизації.
Продуктивність великих Router.
Маршрутизація в мікросервісах.
Проєктування REST API з великою кількістю Endpoint.

### Міні-шпаргалка
• Простий маршрут
if (req.method === "GET" && req.url === "/") {
  res.end("Home");
}

• Декілька маршрутів
if (req.method === "GET" && req.url === "/") {
  res.end("Home");
} else if (req.method === "GET" && req.url === "/users") {
  res.end("Users");
} else {
  res.statusCode = 404;
  res.end("Not Found");
}

• Через switch
switch (`${req.method} ${req.url}`) {
  case "GET /":
    res.end("Home");
    break;
  case "GET /users":
    res.end("Users");
    break;
  default:
    res.statusCode = 404;
    res.end("Not Found");
}

• Приклади маршрутів
| HTTP Method | URL        | Призначення                  |
| ----------- | ---------- | ---------------------------- |
| GET         | `/`        | Головна сторінка             |
| GET         | `/users`   | Отримати список користувачів |
| GET         | `/users/1` | Отримати одного користувача  |
| POST        | `/users`   | Створити користувача         |
| PATCH       | `/users/1` | Оновити користувача          |
| DELETE      | `/users/1` | Видалити користувача         |

• Схема роботи
HTTP Request
      │
      ▼
req.method + req.url
      │
      ▼
Пошук відповідного маршруту
      │
      ├───────────────┐
      ▼               ▼
Маршрут знайдено   Не знайдено
      │               │
      ▼               ▼
Обробка запиту     404 Not Found
      │               │
      └───────┬───────┘
              ▼
        HTTP Response

---------------------------------------------------
## 10-mini-project
• 

### 


### 


### 


### 


### 


### 


### 


### 



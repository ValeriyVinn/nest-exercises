## 02. Node.js Server

Node.js Server (сервер Node.js) — це серверний застосунок, який працює в середовищі Node.js, приймає запити через мережу, виконує програмну логіку та повертає відповіді клієнтам.

Node.js дозволяє використовувати JavaScript поза браузером. За його допомогою можна створювати HTTP-сервери, REST API, backend-застосунки, WebSocket-сервіси та інші серверні програми.

Node.js Server використовується для:

- приймання HTTP-запитів від браузера або інших клієнтів;
- створення backend API;
- обробки даних;
- читання та запису файлів;
- взаємодії з PostgreSQL та іншими базами даних;
- автентифікації й авторизації користувачів;
- запуску серверної логіки;
- повернення HTTP-відповідей;
- обслуговування frontend-застосунків;
- запуску backend-застосунків у production-середовищі.

Основні технології та поняття:

    Node.js
    HTTP
    HTTPS
    HTTP request
    HTTP response
    HTTP server
    request handler
    response status code
    headers
    request body
    JSON
    URL
    port
    host
    IP address
    localhost
    event loop
    asynchronous I/O
    environment variables
    process.env
    npm scripts
    Express
    NestJS
    process management
    systemd
    logging

У цьому розділі основна увага приділяється запуску та розумінню Node.js-сервера на Linux. Детальне налаштування Nginx, reverse proxy та production deployment розглядатиметься в наступних темах.

---

### Ключові поняття

✔ Node.js  
✔ Node.js runtime  
✔ server-side JavaScript  
✔ HTTP server  
✔ HTTP request  
✔ HTTP response  
✔ client-server architecture  
✔ request handler  
✔ HTTP method  
✔ URL  
✔ route  
✔ status code  
✔ HTTP headers  
✔ request body  
✔ JSON  
✔ `node:http`  
✔ `createServer()`  
✔ `listen()`  
✔ `server.close()`  
✔ hostname  
✔ IP address  
✔ port  
✔ localhost  
✔ `127.0.0.1`  
✔ `0.0.0.0`  
✔ TCP  
✔ event loop  
✔ asynchronous I/O  
✔ callback  
✔ Promise  
✔ `async/await`  
✔ `process.env`  
✔ `process.argv`  
✔ `process.exitCode`  
✔ npm  
✔ `package.json`  
✔ npm scripts  
✔ Express  
✔ NestJS  
✔ development server  
✔ production server  
✔ process management  
✔ graceful shutdown  
✔ server logs  
✔ error handling  
✔ health check  
✔ systemd service  

---

### Що потрібно пам'ятати

• Node.js — середовище виконання JavaScript поза браузером.

• Node.js може використовувати модуль `node:http` для створення HTTP-сервера без сторонніх бібліотек.

• HTTP-сервер приймає запити та повертає відповіді.

• `http.createServer()` створює HTTP-сервер і визначає обробник запитів.

• `server.listen()` запускає прослуховування на вказаному порту й адресі.

• `server.close()` дозволяє припинити приймання нових з'єднань і завершити закриття сервера.

• `localhost` зазвичай вказує на поточний комп'ютер.

• `127.0.0.1` — IPv4 loopback-адреса.

• `0.0.0.0` дозволяє серверу слухати всі локальні IPv4-інтерфейси.

• Порт визначає endpoint, на якому сервер очікує на з'єднання.

• HTTP-методи описують тип операції, наприклад `GET`, `POST`, `PUT`, `PATCH` і `DELETE`.

• HTTP status codes повідомляють результат обробки запиту.

• JSON часто використовується для обміну даними між frontend і backend.

• Node.js підтримує асинхронний ввід-вивід, тому сервер може обробляти багато операцій без блокування на кожному очікуванні I/O.

• Один процес Node.js може обслуговувати багато запитів, але це не означає, що будь-яка синхронна або CPU-intensive операція не блокуватиме інші запити.

• `process.env` використовується для читання змінних середовища.

• `package.json` містить інформацію про проєкт, залежності та npm scripts.

• `npm run` запускає скрипти, визначені в `package.json`.

• Express — вебфреймворк для Node.js, який спрощує маршрутизацію та обробку HTTP-запитів.

• NestJS — backend-фреймворк, який використовує модульну архітектуру та часто працює поверх Express або Fastify.

• Запуск `node server.js` у терміналі не забезпечує автоматичного перезапуску після перезавантаження Linux.

• Для production потрібен продуманий механізм керування процесом, наприклад systemd.

• Якщо сервер працює за Nginx, Node.js часто можна прив'язати до `127.0.0.1`, не відкриваючи його порт безпосередньо в інтернет.

• Працюючий Node.js-процес не гарантує, що API доступний ззовні: потрібно перевірити адресу прив'язки, порт, firewall і мережеву конфігурацію.

---

# Node.js

Node.js — runtime environment, який дозволяє виконувати JavaScript поза браузером.

Перевірити встановлення:

    node --version

Перевірити npm:

    npm --version

Перевірити шлях до виконуваного файла:

    command -v node
    command -v npm

Перевірити роботу Node.js:

    node -e "console.log('Node.js is working')"

Результат:

    Node.js is working

Node.js використовується для:

    HTTP servers
    REST APIs
    backend applications
    command-line tools
    background jobs
    build tools
    database clients

Node.js — це не сам вебфреймворк і не готовий вебсервер із повною production-конфігурацією.

Це середовище виконання, яке надає API для створення серверних програм.

---

# Client-Server Architecture

Client-server architecture — модель взаємодії, у якій клієнт надсилає запит, а сервер обробляє його та повертає відповідь.

Наприклад:

    Browser
        |
        | HTTP request
        v
    Node.js Server
        |
        | application logic
        v
    PostgreSQL
        |
        | query result
        v
    Node.js Server
        |
        | HTTP response
        v
    Browser

Основні компоненти:

    Client       → клієнт, наприклад браузер
    Request      → запит клієнта
    Server       → програма, яка обробляє запит
    Backend      → серверна логіка застосунку
    Database     → сховище даних
    Response     → відповідь сервера

Наприклад, браузер надсилає:

    GET /api/users

Node.js-сервер може:

    1. Отримати запит.
    2. Визначити маршрут.
    3. Отримати користувачів із бази даних.
    4. Перетворити дані на JSON.
    5. Повернути HTTP-відповідь.

Клієнт і сервер можуть працювати на одному комп'ютері або на різних комп'ютерах через мережу.

---

# HTTP

HTTP (Hypertext Transfer Protocol) — протокол прикладного рівня для обміну запитами та відповідями між клієнтом і сервером.

Приклад URL:

    http://localhost:3000/api/users

Його складові:

    http       → protocol
    localhost  → host
    3000       → port
    /api/users → path

HTTP-запит може містити:

    method
    URL
    headers
    body

HTTP-відповідь може містити:

    status code
    headers
    body

Наприклад:

    Request:
        GET /api/users

    Response:
        HTTP 200 OK
        Content-Type: application/json

        [
            {
                "id": 1,
                "name": "Anna"
            }
        ]

Це спрощене представлення HTTP-взаємодії.

---

# HTTP Methods

HTTP-метод описує тип операції, яку клієнт хоче виконати.

Основні методи:

    GET
    POST
    PUT
    PATCH
    DELETE

## GET

Отримання даних.

    GET /api/users

Наприклад, отримати список користувачів.

## POST

Надсилання даних для створення ресурсу або виконання операції.

    POST /api/users

Приклад JSON body:

    {
        "name": "Anna",
        "email": "anna@example.com"
    }

## PUT

Зазвичай використовується для повного оновлення представлення ресурсу.

    PUT /api/users/1

## PATCH

Використовується для часткового оновлення ресурсу.

    PATCH /api/users/1

## DELETE

Видалення ресурсу.

    DELETE /api/users/1

Це типові REST-підходи. Фактична поведінка визначається контрактом API.

---

# HTTP Status Codes

HTTP status code повідомляє клієнту результат обробки запиту.

Основні групи:

    1xx → informational
    2xx → success
    3xx → redirection
    4xx → client error
    5xx → server error

Найважливіші статуси:

    200 OK
    201 Created
    204 No Content
    301 Moved Permanently
    302 Found
    304 Not Modified
    400 Bad Request
    401 Unauthorized
    403 Forbidden
    404 Not Found
    405 Method Not Allowed
    409 Conflict
    422 Unprocessable Content
    429 Too Many Requests
    500 Internal Server Error
    502 Bad Gateway
    503 Service Unavailable
    504 Gateway Timeout

## Приклади

`200 OK`

Запит успішно виконано.

`201 Created`

Ресурс створено.

`204 No Content`

Запит успішний, але тіло відповіді відсутнє.

`400 Bad Request`

Запит має некоректні дані або не може бути оброблений через помилку клієнта.

`401 Unauthorized`

Для доступу потрібна автентифікація або надані облікові дані недійсні.

`403 Forbidden`

Сервер відмовляє в доступі до ресурсу.

`404 Not Found`

Ресурс або маршрут не знайдено.

`500 Internal Server Error`

Неочікувана помилка на сервері.

`502 Bad Gateway`

Проміжний сервер, наприклад Nginx, отримав некоректну відповідь від upstream-сервера.

`503 Service Unavailable`

Сервіс тимчасово недоступний.

`504 Gateway Timeout`

Проміжний сервер не дочекався відповіді від upstream у визначений час.

---

# Built-in HTTP Module

Node.js має вбудований модуль:

    node:http

Він дозволяє створювати HTTP-сервер без встановлення Express або іншого вебфреймворку.

Імпорт у ES modules:

    import { createServer } from "node:http";

Імпорт у CommonJS:

    const { createServer } = require("node:http");

У цьому курсі варто використовувати один формат модулів у межах конкретного проєкту.

Для ES modules у `package.json` зазвичай додають:

    {
        "type": "module"
    }

Якщо проєкт використовує TypeScript, спосіб імпорту та запуску залежить від конфігурації компілятора й середовища виконання.

---

# createServer()

`createServer()` створює HTTP-сервер.

Синтаксис:

    createServer([requestListener])

Обробник запиту отримує два основні аргументи:

    request
    response

Наприклад:

    import { createServer } from "node:http";

    const server = createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("Hello from Node.js");
    });

У цьому прикладі:

    req → incoming request
    res → outgoing response

`req` містить інформацію про запит.

`res` використовується для формування та відправлення відповіді.

`res.end()` завершує відповідь.

Створення сервера ще не означає, що він почав приймати мережеві з'єднання. Для цього потрібен `server.listen()`.

---

# Minimal HTTP Server

Створимо простий HTTP-сервер.

Файл:

    server.js

Код:

    import { createServer } from "node:http";

    const server = createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("Hello from Node.js Server!");
    });

    server.listen(3000, "127.0.0.1", () => {
        console.log("Server is running at http://127.0.0.1:3000");
    });

Якщо використовується ES modules, у `package.json` має бути відповідна конфігурація, наприклад:

    {
        "type": "module"
    }

Запуск:

    node server.js

Результат у терміналі:

    Server is running at http://127.0.0.1:3000

Відкрити в браузері:

    http://127.0.0.1:3000

Або виконати запит через curl:

    curl http://127.0.0.1:3000

Очікувана відповідь:

    Hello from Node.js Server!

У цьому прикладі сервер слухає тільки локальну IPv4 loopback-адресу.

Тому він підходить для першого навчального прикладу, але не буде доступний безпосередньо через мережеву IP-адресу комп'ютера.

---

# server.listen()

`server.listen()` запускає прослуховування вказаного порту.

Приклад:

    server.listen(3000, "127.0.0.1", () => {
        console.log("Server started");
    });

Аргументи:

    3000        → port
    127.0.0.1   → host
    callback    → виконується після початку прослуховування

Інший приклад:

    server.listen(3000, "0.0.0.0", () => {
        console.log("Server started");
    });

У такому випадку сервер слухатиме всі локальні IPv4-інтерфейси.

Це може дозволити підключення через мережеву IP-адресу комп'ютера, якщо firewall та інші налаштування дозволяють доступ.

Важливо:

    createServer() → створити сервер
    listen()       → почати прослуховування
    close()        → припинити прослуховування та закрити сервер

Не плутай адресу прив'язки сервера з адресою, яку вводять у браузері.

---

# Host and Port

Host визначає мережеву адресу або інтерфейс, на якому сервер приймає з'єднання.

Port визначає порт прослуховування.

Наприклад:

    server.listen(3000, "127.0.0.1");

Означає:

    host → 127.0.0.1
    port → 3000

URL:

    http://127.0.0.1:3000

Інші поширені приклади:

    127.0.0.1:3000
    127.0.0.1:4000
    0.0.0.0:3000

Порт `3000` не є обов'язковим для Node.js. Його можна змінити відповідно до конфігурації застосунку.

Два процеси зазвичай не можуть одночасно прослуховувати один і той самий TCP-порт на конфліктних адресах, якщо спеціальні параметри сокетів та системна конфігурація не дозволяють інше.

---

# localhost vs 127.0.0.1 vs 0.0.0.0

Ці значення пов'язані, але не є повністю взаємозамінними.

## localhost

Ім'я хоста, яке зазвичай резолвиться в loopback-адреси IPv4 та/або IPv6.

    http://localhost:3000

## 127.0.0.1

IPv4 loopback-адреса.

    http://127.0.0.1:3000

## 0.0.0.0

Спеціальна IPv4-адреса, яка при прив'язці означає всі локальні IPv4-інтерфейси.

Зазвичай її не використовують як адресу призначення для браузера.

Для доступу до сервера з іншого пристрою використовують фактичну IP-адресу або доменне ім'я сервера, якщо мережа це дозволяє.

Коротко:

    localhost   → ім'я локального хоста
    127.0.0.1   → IPv4 loopback
    0.0.0.0     → bind to all IPv4 interfaces

---

# Request Object

Об'єкт `req` представляє вхідний HTTP-запит.

У вбудованому Node.js HTTP API це об'єкт `IncomingMessage`.

Основні властивості:

    req.method
    req.url
    req.headers
    req.socket

Приклад:

    import { createServer } from "node:http";

    const server = createServer((req, res) => {
        console.log("Method:", req.method);
        console.log("URL:", req.url);
        console.log("Headers:", req.headers);

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("Request received");
    });

    server.listen(3000, "127.0.0.1");

Якщо відкрити:

    http://127.0.0.1:3000/users

У консолі можна побачити:

    Method: GET
    URL: /users

Значення заголовків залежать від клієнта.

У реальному застосунку не потрібно бездумно виводити всі заголовки в production-логи, оскільки вони можуть містити токени або інші чутливі дані.

---

# Response Object

Об'єкт `res` використовується для формування HTTP-відповіді.

Основні методи та властивості:

    res.statusCode
    res.setHeader()
    res.write()
    res.end()

Приклад:

    const server = createServer((req, res) => {
        res.statusCode = 200;

        res.setHeader(
            "Content-Type",
            "text/plain; charset=utf-8"
        );

        res.end("Hello!");
    });

Основні дії:

    statusCode  → встановити HTTP status code
    setHeader() → встановити заголовок
    write()     → записати частину відповіді
    end()       → завершити відповідь

Приклад відповіді JSON:

    const user = {
        id: 1,
        name: "Anna"
    };

    res.statusCode = 200;

    res.setHeader(
        "Content-Type",
        "application/json; charset=utf-8"
    );

    res.end(JSON.stringify(user));

Результат:

    {
        "id": 1,
        "name": "Anna"
    }

Важливо: `JSON.stringify()` перетворює JavaScript-значення на JSON-рядок.

У вбудованому HTTP-модулі Node.js немає автоматичного JSON-серіалізатора відповіді, як у багатьох вебфреймворках.

---

# Content-Type

`Content-Type` повідомляє клієнту тип даних у тілі HTTP-відповіді.

Приклади:

    text/plain
    text/html
    application/json
    text/css
    application/javascript

Приклад текстової відповіді:

    res.setHeader(
        "Content-Type",
        "text/plain; charset=utf-8"
    );

Приклад HTML:

    res.setHeader(
        "Content-Type",
        "text/html; charset=utf-8"
    );

Приклад JSON:

    res.setHeader(
        "Content-Type",
        "application/json; charset=utf-8"
    );

Правильний `Content-Type` допомагає клієнту правильно інтерпретувати тіло відповіді.

---

# Routing

Routing — визначення того, як сервер обробляє запити до різних URL та HTTP-методів.

Наприклад:

    GET  /api/users
    GET  /api/users/1
    POST /api/users
    GET  /health

У вбудованому HTTP-модулі Node.js маршрути можна обробляти вручну.

Приклад:

    import { createServer } from "node:http";

    const server = createServer((req, res) => {
        if (req.method === "GET" && req.url === "/") {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end("Home page");
            return;
        }

        if (req.method === "GET" && req.url === "/health") {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ status: "ok" }));
            return;
        }

        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify({ error: "Not Found" }));
    });

    server.listen(3000, "127.0.0.1");

Тут:

    GET /       → Home page
    GET /health → JSON health response
    other URL   → 404 Not Found

Використання `return` після `res.end()` допомагає не продовжувати обробку запиту в наступних гілках.

У більших застосунках маршрутизацію зручніше організовувати за допомогою Express або NestJS.

---

# URL and Query Parameters

URL може містити query parameters.

Наприклад:

    /api/users?page=2&limit=10

Path:

    /api/users

Query string:

    ?page=2&limit=10

У Node.js можна використати клас `URL`.

Приклад:

    const url = new URL(
        req.url,
        "http://localhost"
    );

    console.log(url.pathname);
    console.log(url.searchParams.get("page"));
    console.log(url.searchParams.get("limit"));

Для запиту:

    /api/users?page=2&limit=10

Результат:

    /api/users
    2
    10

У цьому прикладі базова адреса використовується для коректного розбору відносного URL. Вона не означає, що сервер обов'язково працює саме на цьому домені.

Параметри запиту надходять від клієнта, тому перед використанням їх потрібно перевіряти та за потреби перетворювати на числа.

Наприклад:

    const page = Number(url.searchParams.get("page") ?? 1);

    if (!Number.isInteger(page) || page < 1) {
        // Handle invalid page parameter.
    }

Не довіряй даним, які отримуєш від клієнта.

---

# Request Body

Request body — тіло HTTP-запиту.

Найчастіше воно використовується для передавання даних через `POST`, `PUT` або `PATCH`.

Приклад JSON body:

    {
        "name": "Anna",
        "email": "anna@example.com"
    }

У вбудованому HTTP-модулі Node.js тіло запиту потрібно прочитати самостійно.

Приклад:

    import { createServer } from "node:http";

    const server = createServer(async (req, res) => {
        if (req.method !== "POST" || req.url !== "/api/users") {
            res.statusCode = 404;
            res.end("Not Found");
            return;
        }

        let body = "";

        for await (const chunk of req) {
            body += chunk;
        }

        console.log(body);

        res.statusCode = 201;
        res.end("User data received");
    });

    server.listen(3000, "127.0.0.1");

Цей приклад демонструє читання тіла запиту, але не є готовою production-реалізацією.

У реальному застосунку потрібно враховувати:

    request size limits
    content type
    invalid JSON
    malformed input
    validation
    error handling
    request timeouts

Для читання тіла запиту можна використовувати асинхронний ітератор, тому обробник оголошено через `async`.

---

# Parsing JSON

Якщо клієнт надсилає JSON, сервер повинен перетворити JSON-рядок на JavaScript-значення.

Для цього використовується:

    JSON.parse()

Приклад:

    const json = '{"name":"Anna","age":25}';

    const user = JSON.parse(json);

    console.log(user.name);
    console.log(user.age);

Результат:

    Anna
    25

Якщо рядок не є коректним JSON, `JSON.parse()` викине помилку.

Наприклад:

    JSON.parse("{invalid json}");

Це призведе до `SyntaxError`.

Тому під час обробки запитів потрібно передбачати помилки парсингу.

Приклад:

    let data;

    try {
        data = JSON.parse(body);
    } catch {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify({ error: "Invalid JSON" }));
        return;
    }

Це лише частина обробки. Далі потрібно перевірити структуру, типи та допустимі значення отриманих даних.

---

# HTTP Server with JSON

Приклад простого API, який повертає JSON.

    import { createServer } from "node:http";

    const server = createServer((req, res) => {
        if (req.method === "GET" && req.url === "/api/status") {
            const response = {
                status: "ok",
                service: "nodejs-server"
            };

            res.statusCode = 200;

            res.setHeader(
                "Content-Type",
                "application/json; charset=utf-8"
            );

            res.end(JSON.stringify(response));
            return;
        }

        res.statusCode = 404;

        res.setHeader(
            "Content-Type",
            "application/json; charset=utf-8"
        );

        res.end(JSON.stringify({
            error: "Not Found"
        }));
    });

    server.listen(3000, "127.0.0.1", () => {
        console.log("Server started on port 3000");
    });

Перевірка:

    curl http://127.0.0.1:3000/api/status

Результат:

    {"status":"ok","service":"nodejs-server"}

Перевірка status code та заголовків:

    curl -i http://127.0.0.1:3000/api/status

Опція `-i` показує HTTP-заголовки разом із тілом відповіді.

---

# curl

`curl` — командний інструмент для надсилання HTTP-запитів та роботи з URL.

Перевірити версію:

    curl --version

Виконати GET-запит:

    curl http://127.0.0.1:3000/

Показати заголовки й тіло:

    curl -i http://127.0.0.1:3000/

Показати тільки заголовки відповіді:

    curl -I http://127.0.0.1:3000/

Надіслати POST із JSON:

    curl -X POST \
        -H "Content-Type: application/json" \
        -d '{"name":"Anna"}' \
        http://127.0.0.1:3000/api/users

Надіслати GET-запит до health endpoint:

    curl http://127.0.0.1:3000/health

Важливо: `curl -I` зазвичай надсилає HTTP HEAD-запит, а не GET-запит із прихованим тілом.

Сервер, який підтримує тільки GET, може повертати 404 або інший статус для HEAD. Тому для перевірки конкретного GET-маршруту використовуй звичайний `curl`.

---

# Event Loop

Event loop — механізм Node.js, який координує виконання JavaScript і обробку асинхронних операцій.

Node.js використовує V8 для виконання JavaScript, а також системні механізми та libuv для багатьох операцій вводу-виводу.

Спрощена модель:

    JavaScript execution
        ↓
    asynchronous operation
        ↓
    operation completes
        ↓
    callback / Promise continuation
        ↓
    JavaScript continues

Наприклад:

    import { readFile } from "node:fs";

    console.log("Start");

    readFile("data.txt", "utf8", (error, data) => {
        if (error) {
            console.error(error);
            return;
        }

        console.log(data);
    });

    console.log("End");

Спочатку буде виведено:

    Start
    End

Вміст файла буде виведено після завершення асинхронного читання, якщо операція успішна.

Це відбувається тому, що читання файла не блокує подальше виконання коду в тому самому потоці JavaScript.

Важливо:

• Асинхронність не означає, що JavaScript автоматично виконується паралельно в кількох потоках.

• Тривала синхронна операція може блокувати event loop.

• CPU-intensive обчислення можуть затримувати обробку інших запитів.

• Асинхронний ввід-вивід допомагає ефективно обробляти операції, які очікують на зовнішні ресурси.

---

# Blocking vs Non-blocking

Blocking operation затримує подальше виконання JavaScript у поточному потоці до завершення операції.

Non-blocking operation дозволяє продовжити виконання JavaScript, поки операція очікує на результат.

Приклад блокувального читання файла:

    import { readFileSync } from "node:fs";

    console.log("Start");

    const data = readFileSync("data.txt", "utf8");

    console.log(data);
    console.log("End");

Поки `readFileSync()` читає файл, подальший JavaScript у цьому потоці не виконується.

Приклад неблокувального читання:

    import { readFile } from "node:fs";

    console.log("Start");

    readFile("data.txt", "utf8", (error, data) => {
        if (error) {
            console.error(error);
            return;
        }

        console.log(data);
    });

    console.log("End");

У серверних застосунках потрібно уникати непотрібних блокувальних операцій під час обробки запитів, особливо якщо вони можуть тривати довго.

---

# Async Operations

Node.js підтримує кілька способів роботи з асинхронними операціями.

Основні підходи:

    callbacks
    Promises
    async/await

Приклад із Promise:

    import { readFile } from "node:fs/promises";

    readFile("data.txt", "utf8")
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });

Приклад із `async/await`:

    import { readFile } from "node:fs/promises";

    async function main() {
        try {
            const data = await readFile("data.txt", "utf8");
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    main();

У серверному коді асинхронні операції часто використовуються для:

    database queries
    file operations
    external HTTP requests
    cache access
    authentication services

Детальніше асинхронність розглядається в розділі JavaScript:

    08-asynchronous-js

---

# Environment Variables

Environment variables — змінні середовища, які передають конфігурацію процесу.

Приклади:

    PORT
    HOST
    NODE_ENV
    DATABASE_URL

Читання в Node.js:

    const port = process.env.PORT;

Якщо змінна не задана, значення буде `undefined`.

Приклад із типовим значенням:

    const port = Number(process.env.PORT ?? 3000);

Для production бажано перевіряти коректність значень, які використовуються як порт або інші параметри конфігурації.

Запуск із заданим портом:

    PORT=4000 node server.js

У такому випадку процес отримає значення:

    process.env.PORT === "4000"

Змінні середовища зберігаються як рядки.

Якщо запускаєш команду в Bash, змінна, задана перед командою, зазвичай діє для цього процесу та його дочірніх процесів, а не назавжди для всього сервера.

---

# Configurable HTTP Server

Приклад сервера з налаштуванням host і port.

    import { createServer } from "node:http";

    const host = process.env.HOST ?? "127.0.0.1";
    const port = Number(process.env.PORT ?? 3000);

    if (
        !Number.isInteger(port) ||
        port < 1 ||
        port > 65535
    ) {
        throw new Error("Invalid PORT value");
    }

    const server = createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("Node.js server is running");
    });

    server.listen(port, host, () => {
        console.log(`Server listening at http://${host}:${port}`);
    });

Запуск зі стандартними значеннями:

    node server.js

Запуск на іншому локальному порту:

    PORT=4000 node server.js

Запуск із конкретним host:

    HOST=127.0.0.1 PORT=4000 node server.js

У production host потрібно обирати відповідно до мережевої архітектури.

Якщо перед сервером використовується локальний reverse proxy, часто доцільно прив'язувати backend до loopback-адреси.

---

# package.json

`package.json` — файл конфігурації Node.js-проєкту.

Він може містити:

    project name
    version
    scripts
    dependencies
    devDependencies
    module configuration
    engine requirements

Приклад:

    {
        "name": "linux-node-server",
        "version": "1.0.0",
        "private": true,
        "type": "module",
        "scripts": {
            "start": "node server.js"
        }
    }

Запуск:

    npm start

Або:

    npm run start

Для скрипта `start` npm дозволяє скорочений варіант:

    npm start

Переглянути скрипти:

    npm run

`package.json` не є конфігурацією самого Linux-сервера. Це конфігураційний файл Node.js-проєкту.

---

# npm Scripts

npm scripts дозволяють зберігати команди запуску в `package.json`.

Приклад:

    {
        "scripts": {
            "start": "node server.js",
            "dev": "node --watch server.js"
        }
    }

Запуск production-подібного скрипта:

    npm start

Запуск у режимі розробки:

    npm run dev

Прапорець `--watch` підтримується сучасними версіями Node.js і дозволяє перезапускати процес при зміні файлів, які відстежуються.

Перед використанням потрібно перевірити версію Node.js і сумісність команди.

Development script не варто автоматично використовувати як production process manager.

---

# Express

Express — вебфреймворк для Node.js, який спрощує створення HTTP-серверів і API.

Він надає зручні механізми для:

    routing
    middleware
    request parsing
    response handling
    error handling

Встановлення:

    npm install express

Приклад:

    import express from "express";

    const app = express();

    app.get("/", (req, res) => {
        res.send("Hello from Express");
    });

    app.get("/health", (req, res) => {
        res.json({ status: "ok" });
    });

    const port = Number(process.env.PORT ?? 3000);

    app.listen(port, "127.0.0.1", () => {
        console.log(`Express server listening on port ${port}`);
    });

Express спрощує роботу з маршрутами порівняно з ручною перевіркою `req.method` та `req.url`.

Але Express сам по собі не вирішує всі питання production deployment. Потрібні належна конфігурація, керування процесами, обробка помилок і безпека.

---

# NestJS

NestJS — backend-фреймворк для побудови структурованих серверних застосунків на Node.js.

Він підтримує:

    modules
    controllers
    providers
    dependency injection
    middleware
    guards
    pipes
    interceptors
    exception filters

Типовий потік HTTP-запиту:

    HTTP Request
        ↓
    NestJS Application
        ↓
    Middleware
        ↓
    Guards / Pipes / Interceptors
        ↓
    Controller
        ↓
    Service
        ↓
    Database
        ↓
    HTTP Response

Це спрощена схема: конкретний порядок виконання компонентів залежить від конфігурації NestJS.

Приклад контролера:

    import { Controller, Get } from "@nestjs/common";

    @Controller("health")
    export class HealthController {
        @Get()
        getHealth() {
            return {
                status: "ok"
            };
        }
    }

Такий контролер визначає маршрут:

    GET /health

NestJS зазвичай використовує Express як HTTP-адаптер за замовчуванням, але також підтримує Fastify.

Вибір адаптера залежить від налаштування проєкту.

---

# Node.js vs Express vs NestJS

Ці технології мають різні ролі.

## Node.js

Runtime environment.

    JavaScript execution
    built-in modules
    network APIs
    filesystem APIs

## Express

Вебфреймворк для Node.js.

    routes
    middleware
    request / response helpers

## NestJS

Структурований backend-фреймворк.

    modules
    controllers
    services
    dependency injection
    application architecture

Схематично:

    Node.js
        ↓
    Express
        або
    NestJS

Node.js дозволяє запускати серверний JavaScript.

Express спрощує створення HTTP API.

NestJS надає більш структуровану архітектуру для більших backend-застосунків.

---

# Checking a Running Node.js Server

Після запуску сервера потрібно перевірити, чи процес працює і чи порт прослуховується.

## 1. Перевірити процес

    pgrep -a node

Або:

    ps aux | grep '[n]ode'

Ці команди можуть показати процеси Node.js, якщо вони працюють під доступним користувачем і відповідають критеріям пошуку.

## 2. Перевірити порт

    ss -ltn

Або для порту `3000`:

    ss -ltn 'sport = :3000'

Якщо потрібно побачити процес:

    sudo ss -ltnp 'sport = :3000'

## 3. Надіслати HTTP-запит

    curl -i http://127.0.0.1:3000/

## 4. Перевірити логи

Якщо сервер запущено у foreground, дивись на вивід термінала.

Якщо він працює через systemd:

    journalctl -u my-app -n 50

Назва `my-app` тут умовна. Вона має відповідати реальній назві сервісу.

---

# Node.js Process Lifecycle

Node.js-сервер зазвичай працює як довготривалий процес.

Типовий життєвий цикл:

    start process
        ↓
    initialize application
        ↓
    start listening
        ↓
    handle requests
        ↓
    receive shutdown signal
        ↓
    stop accepting new connections
        ↓
    finish ongoing work
        ↓
    exit process

Під час розробки можна запускати:

    node server.js

Для зупинки у foreground-терміналі:

    Ctrl + C

У production процесом зазвичай керує systemd або інший process manager.

Важливо розрізняти:

    terminal session
    Node.js process
    operating system service

Закриття термінала або SSH-сесії може впливати на процес, запущений без належного керування.

Не варто використовувати `nohup` або `&` як повноцінну заміну production process management.

---

# Graceful Shutdown

Graceful shutdown — контрольоване завершення роботи сервера.

Мета:

    stop accepting new connections
    finish ongoing requests where possible
    close database connections
    release resources
    exit cleanly

Приклад для базового HTTP-сервера:

    import { createServer } from "node:http";

    const server = createServer((req, res) => {
        res.statusCode = 200;
        res.end("OK");
    });

    server.listen(3000, "127.0.0.1", () => {
        console.log("Server started");
    });

    function shutdown() {
        console.log("Shutting down server");

        server.close((error) => {
            if (error) {
                console.error("Error closing server:", error);
                process.exitCode = 1;
                return;
            }

            console.log("Server closed");
        });
    }

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

Це демонстраційний приклад.

У реальному застосунку потрібно враховувати повторні сигнали, тайм-аути завершення, відкриті з'єднання та закриття бази даних.

Для NestJS існує механізм lifecycle hooks і підтримка graceful shutdown через `enableShutdownHooks()`.

Приклад:

    const app = await NestFactory.create(AppModule);

    app.enableShutdownHooks();

    await app.listen(3000);

Для використання цього прикладу потрібні відповідні імпорти та контекст NestJS bootstrap-файла.

---

# Error Handling

Сервер повинен коректно обробляти помилки.

Можливі причини:

    invalid request
    missing resource
    invalid JSON
    database connection failure
    permission error
    unavailable external service
    unexpected application error

У вбудованому HTTP-сервері можна обробляти помилки всередині request handler.

Наприклад:

    try {
        const data = JSON.parse(body);
        // Validate and process data.
    } catch {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
            error: "Invalid JSON"
        }));
    }

У production важливо:

- не повертати клієнту stack traces та внутрішні секрети;
- записувати корисну діагностичну інформацію в логи;
- використовувати відповідні HTTP status codes;
- не завершувати процес через помилку одного запиту без необхідності;
- не ігнорувати помилки асинхронних операцій.

Для Express та NestJS існують власні механізми централізованої обробки помилок.

---

# Health Check

Health check — endpoint, за допомогою якого можна перевірити базовий стан застосунку.

Приклад:

    GET /health

Можлива відповідь:

    {
        "status": "ok"
    }

У Node.js:

    if (req.method === "GET" && req.url === "/health") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
            status: "ok"
        }));
        return;
    }

Перевірка через curl:

    curl -i http://127.0.0.1:3000/health

Health check може використовуватися:

    manual testing
    monitoring
    load balancers
    deployment verification
    orchestration systems

Простий health endpoint зазвичай перевіряє, що застосунок відповідає.

Він не обов'язково перевіряє, чи доступні база даних, кеш та всі зовнішні залежності.

Для production можуть існувати окремі перевірки:

    liveness → чи працює процес
    readiness → чи готовий застосунок приймати запити
    dependency health → чи доступні необхідні залежності

Не слід повертати детальну внутрішню конфігурацію або секрети через публічний health endpoint.

---

# Server Logs

Логи допомагають зрозуміти, що відбувається під час роботи сервера.

У базовому Node.js-застосунку можна використовувати:

    console.log()
    console.error()
    console.warn()

Приклад:

    console.log("Server started");

    console.warn("Unexpected request");

    console.error("Database connection failed");

Під час роботи у foreground ці повідомлення зазвичай з'являються в терміналі.

Якщо застосунок запускається через systemd, стандартний вивід та помилки часто можна переглядати через journal.

Наприклад:

    journalctl -u my-app -f

У production-логах корисно мати:

    timestamp
    log level
    message
    request identifier
    relevant error context

Не записуй у логи:

    passwords
    access tokens
    private keys
    sensitive personal data

Детальніше:

    06-logs-and-troubleshooting

---

# Running Node.js in the Background

Під час навчання сервер часто запускається безпосередньо в терміналі:

    node server.js

Переваги:

    simple
    easy to debug
    logs appear in terminal
    Ctrl + C stops the process

Недоліки для production:

    tied to process/session handling
    no automatic restart by default
    no built-in startup on boot
    manual operational management

Для довготривалої роботи використовують process managers.

Приклади:

    systemd
    PM2
    container orchestration platforms

Для навчального Linux-середовища корисно спочатку навчитися запускати Node.js вручну, а потім переходити до systemd.

---

# systemd for Node.js

systemd може запускати Node.js-застосунок як системний сервіс.

Типова схема:

    Linux boot
        ↓
    systemd
        ↓
    my-app.service
        ↓
    Node.js process
        ↓
    HTTP server

Приклад unit-файла:

    [Unit]
    Description=My Node.js Application
    After=network.target

    [Service]
    Type=simple
    User=deploy
    WorkingDirectory=/srv/my-app
    ExecStart=/usr/bin/node /srv/my-app/server.js
    Restart=on-failure
    RestartSec=5
    Environment=NODE_ENV=production
    Environment=PORT=3000

    [Install]
    WantedBy=multi-user.target

Це приклад структури unit-файла. Перед використанням потрібно адаптувати користувача, шляхи, виконуваний файл Node.js та змінні середовища до реального проєкту.

Якщо Node.js установлено через nvm, шлях `/usr/bin/node` може бути неправильним.

Файл сервісу зазвичай розміщують у:

    /etc/systemd/system/my-app.service

Після створення або зміни unit-файла:

    sudo systemctl daemon-reload

Запустити сервіс:

    sudo systemctl start my-app

Перевірити стан:

    sudo systemctl status my-app

Налаштувати автозапуск:

    sudo systemctl enable my-app

Переглянути журнали:

    sudo journalctl -u my-app -n 50

Важливо:

- `daemon-reload` перечитує unit-файли;
- `start` запускає сервіс;
- `status` показує його стан;
- `enable` налаштовує запуск під час завантаження системи;
- `Restart=on-failure` налаштовує перезапуск після певних невдалих завершень.

Налаштування перезапуску не замінює моніторинг, логування та належну обробку помилок.

Детальніше про systemd:

    13-services-and-logs

---

# Environment Configuration for Production

Production-конфігурація повинна бути відокремлена від значень, які використовуються лише під час розробки.

Приклади параметрів:

    NODE_ENV
    PORT
    HOST
    DATABASE_URL

У коді:

    const port = Number(process.env.PORT ?? 3000);

Для production можна передати:

    NODE_ENV=production
    PORT=3000

У systemd змінні можуть задаватися через директиви `Environment` або через `EnvironmentFile`.

Приклад:

    Environment=NODE_ENV=production
    Environment=PORT=3000

Або:

    EnvironmentFile=/etc/my-app/my-app.env

Файл із секретами повинен мати належні права доступу.

Не додавай такий файл до Git-репозиторію, якщо він містить production-секрети.

Детальніше:

    03-environment-configuration

---

# Node.js Server Behind Nginx

У production Node.js часто працює за Nginx.

Схема:

    Browser
        |
        | HTTPS :443
        v
    Nginx
        |
        | HTTP to localhost:3000
        v
    Node.js Server

У такій архітектурі:

    Nginx
        → приймає зовнішні запити
        → може обробляти TLS
        → передає запити backend-серверу

    Node.js
        → виконує application logic
        → працює з базою даних
        → повертає відповідь Nginx

Якщо Nginx і Node.js працюють на одному сервері, Node.js часто прив'язують до:

    127.0.0.1:3000

Це допомагає уникнути прямого доступу до backend через зовнішні мережеві інтерфейси.

Але сама прив'язка до `127.0.0.1` не замінює правильних firewall rules, контролю доступу та конфігурації Nginx.

Детальніше:

    04-nginx-basics
    05-reverse-proxy

---

# Troubleshooting Node.js Server

Якщо Node.js-сервер не працює, перевір проблему послідовно.

## 1. Чи встановлено Node.js?

    node --version
    npm --version

Якщо команда недоступна, перевір встановлення та `PATH`.

## 2. Чи правильна директорія?

    pwd
    ls -la

Переконайся, що потрібний файл існує.

## 3. Чи запускається застосунок?

    node server.js

Переглянь повідомлення про помилки.

## 4. Чи зайнятий порт?

    ss -ltn 'sport = :3000'

Якщо інший процес уже слухає цей порт, сервер може не запуститися на ньому.

## 5. Чи слухає сервер потрібну адресу?

    ss -ltn

Перевір, чи є відповідний listening socket.

## 6. Чи відповідає HTTP endpoint?

    curl -i http://127.0.0.1:3000/

Перевір status code та тіло відповіді.

## 7. Чи доступний сервер через мережу?

Перевір:

    binding address
    server IP
    firewall
    network routing
    reverse proxy

## 8. Якщо сервер працює через systemd

    sudo systemctl status my-app
    sudo journalctl -u my-app -n 100

Заміни `my-app` на фактичну назву сервісу.

## 9. Перевір конфігурацію

    printenv NODE_ENV
    printenv PORT

Якщо конфігурація задається systemd, перевір відповідний unit-файл та його змінні середовища.

## 10. Перевір ресурси

    free -h
    df -h
    uptime

Не обмежуйся перезапуском сервера без з'ясування причини помилки.

---

# Practical Examples

## Приклад 1 — Простий HTTP Server

Створи файл:

    server.js

Код:

    import { createServer } from "node:http";

    const server = createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("Hello from Linux");
    });

    server.listen(3000, "127.0.0.1", () => {
        console.log("Server started on port 3000");
    });

Запуск:

    node server.js

Перевірка:

    curl http://127.0.0.1:3000

Очікувана відповідь:

    Hello from Linux

---

## Приклад 2 — API з кількома маршрутами

    import { createServer } from "node:http";

    const server = createServer((req, res) => {
        if (req.method === "GET" && req.url === "/") {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end("Home");
            return;
        }

        if (req.method === "GET" && req.url === "/api/status") {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({
                status: "ok"
            }));
            return;
        }

        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify({
            error: "Not Found"
        }));
    });

    server.listen(3000, "127.0.0.1");

Перевірка:

    curl -i http://127.0.0.1:3000/
    curl -i http://127.0.0.1:3000/api/status
    curl -i http://127.0.0.1:3000/unknown

Очікувана поведінка:

    /             → 200
    /api/status   → 200
    /unknown      → 404

---

## Приклад 3 — Health Check

    import { createServer } from "node:http";

    const server = createServer((req, res) => {
        if (req.method === "GET" && req.url === "/health") {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                status: "ok"
            }));
            return;
        }

        res.statusCode = 404;
        res.end("Not Found");
    });

    server.listen(3000, "127.0.0.1");

Перевірка:

    curl -i http://127.0.0.1:3000/health

---

## Приклад 4 — Server з Environment Variables

    import { createServer } from "node:http";

    const host = process.env.HOST ?? "127.0.0.1";
    const port = Number(process.env.PORT ?? 3000);

    const server = createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("Configured Node.js server");
    });

    server.listen(port, host, () => {
        console.log(`Server listening on ${host}:${port}`);
    });

Запуск:

    PORT=4000 node server.js

Перевірка:

    curl http://127.0.0.1:4000

---

## Приклад 5 — Перевірка сервера з Linux

Після запуску сервера в одному терміналі відкрий інший термінал.

Перевір процес:

    pgrep -a node

Перевір порт:

    ss -ltn 'sport = :3000'

Перевір відповідь:

    curl -i http://127.0.0.1:3000/

Це дозволяє розрізняти три різні речі:

    process exists
        ↓
    port is listening
        ↓
    HTTP endpoint responds

Усі три перевірки корисні під час діагностики.

---

## Приклад 6 — Запуск через npm

Приклад `package.json`:

    {
        "name": "node-server-practice",
        "version": "1.0.0",
        "private": true,
        "type": "module",
        "scripts": {
            "start": "node server.js"
        }
    }

Запуск:

    npm start

Зупинка:

    Ctrl + C

Переглянути доступні скрипти:

    npm run

---

# Типові помилки

❌ **Забути викликати `server.listen()`.**

    const server = createServer((req, res) => {
        res.end("Hello");
    });

Сервер створено, але він не починає прослуховувати порт без `listen()`.

---

❌ **Забути завершити HTTP-відповідь.**

    const server = createServer((req, res) => {
        res.write("Hello");
    });

У цьому прикладі відповідь не завершується явно. Клієнт може чекати далі.

Для простої відповіді:

    res.end("Hello");

---

❌ **Неправильно використовувати адресу прив'язки.**

    server.listen(3000, "127.0.0.1");

Цей сервер не приймає з'єднання через інші IPv4-адреси інтерфейсів.

Для зовнішнього доступу потрібно правильно спроєктувати мережеву конфігурацію, але не слід автоматично відкривати backend для всього інтернету.

---

❌ **Плутати `0.0.0.0` з адресою для браузера.**

    0.0.0.0

Це адреса прив'язки, а не звичайна адреса призначення для підключення до сервера.

---

❌ **Використовувати зайнятий порт.**

Якщо інший процес уже прослуховує порт, запуск сервера може завершитися помилкою.

Перевір:

    ss -ltn 'sport = :3000'

---

❌ **Не обробляти неправильний JSON.**

    JSON.parse(body);

Некоректний JSON призведе до помилки.

Використовуй належну обробку винятків і перевірку вхідних даних.

---

❌ **Не перевіряти вхідні дані клієнта.**

Дані з HTTP-запитів не можна вважати надійними.

Потрібно перевіряти:

    types
    required fields
    value ranges
    formats
    authorization

---

❌ **Вважати, що `console.log()` є повноцінною системою логування.**

Для навчання цього достатньо, але production-застосунку можуть знадобитися структуровані логи, рівні логування та кореляційні ідентифікатори запитів.

---

❌ **Використовувати синхронні операції без урахування їхньої тривалості.**

Тривалі синхронні операції можуть блокувати event loop та затримувати інші запити.

---

❌ **Не перевіряти конфігурацію порту.**

    const port = Number(process.env.PORT);

Якщо `PORT` не задано, результатом буде `NaN`.

Використовуй коректне типове значення та перевіряй діапазон порту.

---

❌ **Не враховувати різницю між development і production.**

    node --watch server.js

Watch mode корисний під час розробки, але не замінює production process management.

---

❌ **Запускати застосунок через SSH і очікувати, що він гарантовано працюватиме після виходу із сесії.**

Для довготривалої роботи використовуй належний механізм керування процесами.

---

❌ **Не перевіряти журнали після невдалого запуску.**

Якщо сервіс завершується з помилкою, переглянь повідомлення процесу або:

    journalctl -u my-app -n 100

---

❌ **Повертати stack trace клієнту.**

У production не слід розкривати внутрішні шляхи, секрети та деталі реалізації через HTTP-відповіді.

---

# Питання зі співбесіди

Що таке Node.js?

Що таке Node.js runtime?

Чим Node.js відрізняється від браузерного JavaScript?

Що таке HTTP-сервер?

Як працює client-server architecture?

Що таке HTTP request?

Що таке HTTP response?

Які основні HTTP-методи ти знаєш?

Що означають HTTP status codes 200, 201, 400, 401, 403, 404 та 500?

Що таке HTTP headers?

Для чого використовується `Content-Type`?

Що таке request body?

Для чого використовують JSON?

Що робить `http.createServer()`?

Що робить `server.listen()`?

Що робить `server.close()`?

Що таке request handler?

Що таке routing?

Як обробити декілька маршрутів у вбудованому HTTP-сервері?

Як отримати HTTP-метод запиту?

Як отримати URL запиту?

Як повернути JSON?

Для чого використовується `JSON.stringify()`?

Для чого використовується `JSON.parse()`?

Що станеться, якщо JSON некоректний?

Як прочитати тіло POST-запиту у вбудованому HTTP-модулі?

Чому потрібно обмежувати розмір тіла запиту?

Що таке hostname?

Що таке port?

Чим відрізняються `localhost`, `127.0.0.1` та `0.0.0.0`?

Чому Node.js-сервер може працювати локально, але бути недоступним з іншого комп'ютера?

Як перевірити, чи прослуховується порт?

Для чого використовується `curl`?

Як перевірити HTTP status code за допомогою curl?

Що таке event loop?

Що таке blocking operation?

Чим blocking I/O відрізняється від non-blocking I/O?

Як асинхронні операції допомагають серверу?

Чому CPU-intensive операції можуть блокувати event loop?

Що таке environment variables?

Для чого використовується `process.env`?

Що зберігає `package.json`?

Для чого потрібні npm scripts?

Чим Node.js відрізняється від Express?

Чим Express відрізняється від NestJS?

Що таке health check?

Що таке graceful shutdown?

Як обробляти помилки HTTP-запитів?

Як перевірити процес Node.js у Linux?

Як перевірити журнали Node.js-сервісу?

Для чого використовують systemd?

Чим `systemctl start` відрізняється від `systemctl enable`?

Чому production-застосунок не варто запускати безпосередньо в інтерактивному SSH-терміналі як єдиний механізм керування?

Як Node.js працює за Nginx?

Чому backend-порт часто залишають доступним тільки через localhost?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке Node.js.

Що таке HTTP-сервер.

Client-server architecture.

HTTP request та response.

HTTP methods.

HTTP status codes.

Основи headers.

`Content-Type`.

`node:http`.

`createServer()`.

`listen()`.

`server.close()`.

Основи `req` та `res`.

`req.method`.

`req.url`.

`res.statusCode`.

`res.setHeader()`.

`res.end()`.

JSON.

`JSON.stringify()`.

`JSON.parse()`.

Основи routing.

`localhost`.

`127.0.0.1`.

`0.0.0.0`.

Ports.

`curl`.

`process.env`.

`package.json`.

npm scripts.

Основи event loop.

Основи асинхронного вводу-виводу.

---

## 🔵 Junior — практичний Node.js Server

Створення HTTP-сервера без фреймворку.

Обробка кількох маршрутів.

Обробка різних HTTP-методів.

Повернення тексту, HTML та JSON.

Робота з query parameters.

Читання request body.

Парсинг JSON.

Перевірка вхідних даних.

Обробка некоректних запитів.

Правильний вибір status codes.

Робота з environment variables.

Налаштування host і port.

Перевірка портів через `ss`.

Перевірка API через `curl`.

Розуміння blocking і non-blocking операцій.

Основи Express.

Основи NestJS.

Основи logging.

Основи health checks.

Запуск Node.js у Linux.

Основи керування процесами.

---

## 🟠 Middle — production server

Структурування backend API.

Централізована обробка помилок.

Request validation.

Middleware.

Authentication and authorization.

Database connection management.

Connection pooling.

Graceful shutdown.

Timeouts.

Request size limits.

Structured logging.

Health and readiness checks.

Configuration management.

Production environment variables.

systemd service configuration.

Process restart policies.

Nginx reverse proxy.

HTTPS and TLS.

Deployment automation.

Monitoring.

Rate limiting.

Security headers.

Performance profiling.

Event loop diagnostics.

Обробка CPU-intensive задач.

---

## 🔴 Senior — production architecture

HTTP protocol details.

TCP connection lifecycle.

Event loop internals.

libuv internals.

Backpressure.

Streaming HTTP responses.

Connection pooling and resource limits.

High concurrency.

Worker threads.

Child processes.

Cluster and multi-process architecture.

Load balancing.

Graceful rolling deployments.

Zero-downtime deployment.

Distributed tracing.

Observability.

Resilience patterns.

Circuit breakers.

Retry strategies.

Request cancellation.

Timeout propagation.

Memory leak analysis.

Performance profiling.

Production incident response.

Capacity planning.

Security hardening.

---

# Міні-шпаргалка

## Створення сервера

    import { createServer } from "node:http";

    const server = createServer((req, res) => {
        res.statusCode = 200;
        res.end("Hello");
    });

    server.listen(3000, "127.0.0.1");

---

## Запуск

    node server.js

Або через npm:

    npm start

---

## Перевірка

    curl -i http://127.0.0.1:3000/

---

## Request

    req.method
    req.url
    req.headers

---

## Response

    res.statusCode = 200;

    res.setHeader(
        "Content-Type",
        "application/json"
    );

    res.end(JSON.stringify({
        status: "ok"
    }));

---

## Routing

    if (req.method === "GET" && req.url === "/health") {
        res.statusCode = 200;
        res.end("OK");
        return;
    }

---

## Environment Variables

    const port = Number(process.env.PORT ?? 3000);

Запуск:

    PORT=4000 node server.js

---

## Ports

    ss -ltn
    ss -ltn 'sport = :3000'
    sudo ss -tulpn

---

## Process

    pgrep -a node
    ps aux | grep '[n]ode'

---

## systemd

    sudo systemctl status my-app
    sudo systemctl start my-app
    sudo systemctl enable my-app
    sudo journalctl -u my-app -n 50

---

## Request Flow

    HTTP Request
        ↓
    Node.js Server
        ↓
    Route Handler
        ↓
    Application Logic
        ↓
    Database
        ↓
    HTTP Response

---

## Node.js vs Express vs NestJS

    Node.js
        → runtime

    Express
        → web framework

    NestJS
        → structured backend framework

---

## Основні правила

    createServer() → створити HTTP-сервер
    listen()       → почати слухати порт
    close()        → закрити сервер
    req            → вхідний запит
    res            → вихідна відповідь
    curl           → тестування HTTP
    process.env    → змінні середовища
    systemd        → керування сервісом

---

# Головне

• Node.js дозволяє виконувати JavaScript на сервері.

• HTTP-сервер приймає запити клієнтів і повертає відповіді.

• `node:http` — вбудований модуль Node.js для роботи з HTTP.

• `createServer()` створює сервер і визначає обробник запитів.

• `listen()` запускає прослуховування на заданому порту.

• `server.close()` дозволяє контрольовано припинити приймання нових з'єднань і закрити сервер.

• `req` містить інформацію про запит, а `res` використовується для формування відповіді.

• HTTP-відповідь повинна мати відповідний status code та, коли потрібно, правильні headers.

• `Content-Type: application/json` повідомляє клієнту, що тіло відповіді містить JSON.

• `JSON.stringify()` перетворює JavaScript-значення на JSON-рядок.

• `JSON.parse()` перетворює коректний JSON-рядок на JavaScript-значення.

• Routing визначає, як сервер обробляє різні URL та HTTP-методи.

• `localhost` і `127.0.0.1` використовуються для локального доступу, а `0.0.0.0` — для прив'язки до всіх локальних IPv4-інтерфейсів.

• `curl` допомагає перевіряти HTTP API без браузера.

• Асинхронний ввід-вивід дозволяє Node.js ефективно обробляти операції, які очікують на зовнішні ресурси.

• Тривалий синхронний код може блокувати event loop.

• `process.env` дозволяє отримувати конфігурацію з environment variables.

• `package.json` визначає npm scripts і залежності проєкту.

• Express спрощує маршрутизацію та обробку HTTP-запитів.

• NestJS надає структуровану архітектуру для backend-застосунків.

• Працюючий процес, відкритий порт і доступний HTTP endpoint — три різні речі, які варто перевіряти окремо.

• Для production необхідно передбачити логування, обробку помилок, конфігурацію, контрольований запуск і завершення процесу.

• systemd дозволяє запускати Node.js-застосунок як Linux-сервіс і налаштовувати його автозапуск.

• Якщо Node.js працює за Nginx, backend часто можна залишити доступним тільки через локальний інтерфейс.

• Перед відкриттям порту для зовнішніх клієнтів потрібно перевірити мережеву архітектуру та правила firewall.

• Основна мета цієї теми — навчитися створювати, запускати, тестувати та діагностувати Node.js-сервер у Linux.

• Наступні теми розширюють ці знання:

    03-environment-configuration
        → налаштування конфігурації та змінних середовища

    04-nginx-basics
        → основи вебсервера Nginx

    05-reverse-proxy
        → передавання запитів від Nginx до Node.js

    06-logs-and-troubleshooting
        → журнали та діагностика помилок

    07-firewall-basics
        → контроль мережевого доступу

    08-deployment-project
        → практичне розгортання застосунку
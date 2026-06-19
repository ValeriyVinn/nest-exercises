# 🟩 Node.js Practice

## 🎯 Мета
Опанувати роботу з Node.js як серверним середовищем виконання JavaScript: від базових принципів до створення повноцінного HTTP-сервера та інтеграції з Express.

---

## 🗂️ Структура розділу

practice/
└── node/
├── 01-basics/
├── 02-modules/
├── 03-file-system/
├── 04-events-and-streams/
├── 05-http-server/
├── 06-express/
├── 07-rest-api/
├── 08-authentication/
├── 09-file-upload/
├── 10-mail-and-websockets/
└── README.md

practice/
│
├── nodejs/
│   │
│   ├── README.md
│   │
│   ├── 01-runtime-and-cli/
│   │   ├── 01-hello-node/
│   │   ├── 02-process-and-argv/
│   │   ├── 03-node-globals/
│   │   └── 04-cli-notes-app/
│   │
│   ├── 02-filesystem/
│   │   ├── 01-read-file/
│   │   ├── 02-write-file/
│   │   ├── 03-append-file/
│   │   ├── 04-delete-file/
│   │   └── 05-file-manager/
│   │
│   ├── 03-async-programming/
│   │   ├── 01-sync-vs-async/
│   │   ├── 02-promises/
│   │   ├── 03-async-await/
│   │   └── 04-async-file-manager/
│   │
│   ├── 04-events-and-streams/
│   │   ├── 01-event-emitter/
│   │   ├── 02-custom-events/
│   │   ├── 03-read-stream/
│   │   ├── 04-write-stream/
│   │   └── 05-static-file-server/
│   │
│   ├── 05-http-server/
│   │   ├── 01-first-server/
│   │   ├── 02-routing/
│   │   ├── 03-json-response/
│   │   ├── 04-parse-body/
│   │   └── 05-basic-api/
│   │
│   ├── 06-rest-api/
│   │   ├── 01-users-api/
│   │   ├── 02-posts-api/
│   │   ├── 03-crud/
│   │   ├── 04-validation/
│   │   └── 05-json-database/
│   │
│   ├── 07-routing-and-middleware/
│   │   ├── 01-custom-router/
│   │   ├── 02-middleware-system/
│   │   ├── 03-logger-middleware/
│   │   ├── 04-auth-middleware/
│   │   └── 05-mvc-refactor/
│   │
│   ├── 08-auth-basics/
│   │   ├── 01-register/
│   │   ├── 02-login/
│   │   ├── 03-password-hashing/
│   │   ├── 04-jwt/
│   │   └── 05-protected-routes/
│   │
│   └── 09-mini-backend-project/
│       └── mini-social-api/
---

## 📘 Теми для вивчення

### 1. Основи Node.js
- Що таке Node.js, його роль у фулстек-розробці  
- Синхронність vs асинхронність  
- Робота з `process`, `global`, `__dirname`, `require`, `import`  
- Встановлення Node.js, запуск файлів `.js` у терміналі  
- Використання `npm` і `package.json`

---

### 2. Модулі
- CommonJS (`require`, `module.exports`)  
- ES Modules (`import`, `export`)  
- Локальні, вбудовані, сторонні модулі  
- Створення власного модуля

---

### 3. File System (fs)
- Читання, запис, створення, видалення файлів і тек  
- Асинхронні операції з `fs.promises`  
- Робота з `path` і `url`  
- Приклад: створення простого логера, що записує у файл

---

### 4. Події та потоки
- `EventEmitter` — створення і використання подій  
- Streams: readable, writable, duplex, transform  
- Pipe — передача даних між потоками  
- Приклад: копіювання великих файлів за допомогою стрімів

---

### 5. HTTP-сервер
- Модуль `http` — створення базового сервера  
- Робота з `request`, `response`  
- Роутинг вручну  
- Обробка `POST`-запитів, парсинг `body`  
- Приклад: простий REST-сервер без Express

---

### 6. Express.js
- Встановлення та налаштування Express  
- Middleware (власні та вбудовані)  
- Роутинг і структура проєкту  
- Обробка параметрів, query, body  
- Використання `express.json()` і `express.static()`  
- Приклад: mini API для нотаток

---

### 7. REST API
- REST принципи  
- CRUD-операції: `GET`, `POST`, `PUT`, `DELETE`  
- Підключення MongoDB через Mongoose  
- Валідатори (`Joi`, `express-validator`)  
- Обробка помилок (error middleware)  
- Swagger документація (опційно)

---

### 8. Аутентифікація
- JWT (JSON Web Token)  
- bcrypt — хешування паролів  
- Middleware для авторизації  
- Приклад: login / register API

---

### 9. Робота з файлами та зображеннями
- Завантаження файлів через `Multer`  
- Оптимізація зображень (Sharp)  
- Збереження шляхів у БД  
- Приклад: upload-endpoint для аватарів користувачів

---

### 10. Пошта і вебсокети
- Надсилання пошти через `Nodemailer`  
- Шаблони листів (HTML, Handlebars)  
- WebSocket / Socket.io — базовий чат  
- Приклад: повідомлення у реальному часі

---

## 🧠 Додаткові теми
- Робота з API (axios, fetch)  
- Планування задач (node-cron)  
- Логування (winston, pino)  
- Структура проєкту (MVC, services, utils)  
- Docker-контейнер для Node.js застосунку

---

## 📚 Корисні ресурси
- [Node.js Official Docs](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [Nodemailer](https://nodemailer.com/)
- [Socket.io](https://socket.io/)
- [MDN: Node.js basics](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)

---

## ✅ Рекомендація по практиці
> Після кожної теми створи міні-проект:  
> - 1. HTTP сервер  
> - 2. Express CRUD  
> - 3. REST API з MongoDB  
> - 4. Auth + Upload + Email  
> 
> Зберігай кожен приклад у власній теці:
> `practice/node/0X-topic-name/`

---

## 🏁 Кінцева мета
Створити повноцінний **Node.js API-сервер** із:
- аутентифікацією користувачів  
- базою даних (MongoDB або PostgreSQL)  
- завантаженням файлів  
- надсиланням листів  
- реальним деплоєм (Render, Vercel, Railway)

# 07-routing-and-middleware

## 01. Express Introduction
Express — це мінімалістичний веб-фреймворк для Node.js, який спрощує створення HTTP-серверів, REST API та веб-додатків. Він будується поверх вбудованого модуля `http` і надає зручний API для маршрутизації, middleware та обробки запитів.

### Ключові поняття
✔ Express  
✔ framework  
✔ app  
✔ request (`req`)  
✔ response (`res`)  
✔ route  
✔ middleware  
✔ server  

### Що потрібно пам'ятати
• Express побудований поверх модуля `http`.
• `express()` створює екземпляр застосунку.
• `app.listen()` запускає HTTP-сервер.
• Маршрути визначають, як сервер реагує на HTTP-запити.
• Express значно скорочує кількість шаблонного коду порівняно з `http`.
• Один застосунок може містити багато маршрутів і middleware.

### Основний API
```js
express()
app.listen()
app.get()
app.post()
app.put()
app.patch()
app.delete()
app.use()
```

### Де використовується
✔ REST API
✔ Backend для SPA (React, Vue, Angular)
✔ Серверна логіка
✔ CRUD-застосунки
✔ Middleware
✔ Проксі-сервери

### Типові помилки
❌ Забули викликати `app.listen()`
❌ Не встановили пакет `express`
❌ Не повернули відповідь (`res.send()`, `res.json()`)
❌ Викликали `res.send()` двічі
❌ Не обробили невідомі маршрути

### Питання зі співбесіди
Що таке Express?
Чим Express відрізняється від Node.js?
Навіщо використовувати Express замість модуля `http`?
Що повертає функція `express()`?
Яка роль `app.listen()`?
Що таке маршрут (route)?

### Шлях
#### 🟢 Core (обов'язково знати)
Що таке Express.
Чому Express популярний.
Як встановити Express.
Як створити застосунок через `express()`.
Як запустити сервер через `app.listen()`.
Як створити найпростіший маршрут.
#### 🔵 Junior
Різниця між Node.js та Express.
Які переваги Express над модулем `http`.
Що таке `req` та `res`.
Як працює цикл "запит → відповідь".
Основні HTTP-методи (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
Як повернути текстову та JSON-відповідь.
#### 🟠 Middle
Життєвий цикл HTTP-запиту в Express.
Як Express будується поверх `http.createServer()`.
Порядок реєстрації маршрутів.
Як працює внутрішній роутер Express.
Що таке middleware і як вони інтегруються в обробку запиту.
Організація структури Express-проєкту.
#### 🔴 Senior
Внутрішня архітектура Express.
Як працює стек middleware.
Особливості продуктивності Express.
Коли Express є хорошим вибором, а коли варто використовувати інші фреймворки (Fastify, NestJS).
Масштабування Express-застосунків.
Інтеграція Express з проксі, балансувальниками навантаження та reverse proxy.

### Міні-шпаргалка
```js
import express from 'express';
const app = express();
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

**Схема роботи:**
```
Client
   │
HTTP Request
   │
   ▼
Express App
   │
Route Match
   │
   ▼
Handler (req, res)
   │
HTTP Response
   ▼
Client
```

**Пам'ятай:**
- `express()` → створює застосунок.
- `app.listen()` → запускає сервер.
- `app.METHOD()` → створює маршрут.
- `req` → містить дані запиту.
- `res` → використовується для формування відповіді.


---------------------------------------------------
## 02. Routing
Маршрутизація (Routing) — це механізм, який визначає, який код буде виконаний у відповідь на HTTP-запит. Кожен маршрут складається з HTTP-методу, URL-шляху та функції-обробника (handler).

### Ключові поняття
✔ route  
✔ path  
✔ endpoint  
✔ handler  
✔ HTTP method  
✔ callback  
✔ request (`req`)  
✔ response (`res`)

### Що потрібно пам'ятати
• Маршрут = HTTP-метод + URL + handler.
• Один шлях може підтримувати різні HTTP-методи.
• Порядок оголошення маршрутів має значення.
• Express перевіряє маршрути зверху вниз.
• Якщо маршрут не знайдено — повертається 404.
• Handler отримує `req` та `res` для роботи із запитом і відповіддю.

### Основний API
```js
app.get()
app.post()
app.put()
app.patch()
app.delete()
app.all()
app.route()
```

### Де використовується
✔ REST API
✔ CRUD-застосунки
✔ Backend для SPA
✔ Веб-додатки
✔ Мікросервіси
✔ API Gateway

### Типові помилки
❌ Неправильний HTTP-метод
❌ Однакові маршрути в неправильному порядку
❌ Забули відправити відповідь (`res.send()`, `res.json()`)
❌ Викликали `res.send()` двічі
❌ Загальний маршрут (`*`) оголошений раніше за конкретні

### Питання зі співбесіди
Що таке маршрут (route)?
З яких частин складається маршрут?
Чим endpoint відрізняється від route?
Чому порядок маршрутів важливий?
Що відбудеться, якщо маршрут не знайдено?
Яка різниця між `GET`, `POST`, `PUT`, `PATCH` та `DELETE`?

### Шлях
#### 🟢 Core (обов'язково знати)
Що таке routing.
Структура маршруту.
Як створити маршрут через `app.get()`.
Як працюють основні HTTP-методи.
Як повернути відповідь клієнту.
#### 🔵 Junior
Різниця між HTTP-методами.
Що таке endpoint.
Чому порядок маршрутів важливий.
Як працює пошук маршруту в Express.
Як використовувати `app.all()`.
Групування маршрутів через `app.route()`.
#### 🟠 Middle
Внутрішня таблиця маршрутів Express.
Алгоритм пошуку маршруту.
Статичні та динамічні маршрути.
REST-підхід до побудови URL.
Організація великої кількості маршрутів.
Конфлікти маршрутів та їх вирішення.
#### 🔴 Senior
Архітектура маршрутизації у великих проєктах.
Версіонування API (`/api/v1`, `/api/v2`).
Побудова масштабованої структури маршрутів.
Продуктивність великої кількості маршрутів.
Декомпозиція маршрутів через Router Modules.
Проєктування REST API з точки зору підтримуваності.

### Міні-шпаргалка
```js
import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  res.send('GET users');
});

app.post('/users', (req, res) => {
  res.send('POST user');
});

app.put('/users', (req, res) => {
  res.send('PUT user');
});

app.patch('/users', (req, res) => {
  res.send('PATCH user');
});

app.delete('/users', (req, res) => {
  res.send('DELETE user');
});

app.listen(3000);
```

**Структура маршруту:**
```text
app.METHOD(PATH, HANDLER)

Наприклад:
app.get('/users', (req, res) => {
  ...
});
```

**Порядок пошуку маршрутів:**
```text
HTTP Request
      │
      ▼
Express App
      │
Route #1 ❌
      │
Route #2 ❌
      │
Route #3 ✅
      │
Handler
      │
HTTP Response
```

**Пам'ятай:**

- Route = HTTP Method + URL + Handler.
- Один URL може мати кілька HTTP-методів.
- Express перевіряє маршрути зверху вниз.
- Перший знайдений маршрут буде виконаний.
- Якщо маршрут не знайдено — клієнт отримує 404.

---------------------------------------------------
## 03. Route Parameters
Route Parameters (параметри маршруту) — це динамічні частини URL, які дозволяють передавати дані безпосередньо в шляху запиту. У Express вони позначаються двокрапкою (`:`) і доступні через `req.params`.

### Ключові поняття
✔ route parameters
✔ dynamic route
✔ URL parameter
✔ req.params
✔ path variables
✔ resource ID
✔ endpoint

### Що потрібно пам'ятати
• Параметри маршруту оголошуються через `:`.
• Express автоматично витягує значення параметрів у `req.params`.
• Назва параметра може бути будь-якою (`:id`, `:slug`, `:username`).
• Route Parameters є частиною URL-шляху.
• Всі значення в `req.params` мають тип `string`.
• За потреби параметри потрібно перетворювати у потрібний тип.

### Основний API
```js
req.params
app.get('/users/:id')
app.put('/users/:id')
app.delete('/users/:id')
app.patch('/users/:id')
```

### Де використовується
✔ REST API
✔ CRUD-застосунки
✔ Пошук ресурсу за ID
✔ URL зі slug
✔ Профілі користувачів
✔ Вкладені ресурси

### Типові помилки
❌ Забули поставити `:` перед параметром
❌ Очікують число, хоча `req.params.id` — це рядок
❌ Неправильно написали ім'я параметра
❌ Не перевірили існування ресурсу за отриманим ID
❌ Використовують Route Parameters замість Query Parameters

### Питання зі співбесіди
Що таке Route Parameters?
Як отримати параметри маршруту в Express?
У чому різниця між Route Parameters та Query Parameters?
Чому `req.params.id` має тип `string`?
Коли використовують параметри маршруту?
Як передати кілька параметрів у URL?

### Шлях
#### 🟢 Core (обов'язково знати)
Що таке Route Parameters.
Як оголосити параметр через `:`.
Як отримати значення через `req.params`.
Чому всі параметри є рядками.
Коли використовувати параметри маршруту.
#### 🔵 Junior
Різниця між Route Parameters та Query Parameters.
Передача кількох параметрів.
Конвертація параметра у число.
Типові REST URL.
Перевірка існування ресурсу за ID.
Використання slug у маршрутах.
#### 🟠 Middle
Проєктування REST URL.
Валідація Route Parameters.
Необов'язкові параметри маршруту.
Конфлікти між статичними та динамічними маршрутами.
Вкладені маршрути (`/users/:userId/posts/:postId`).
Організація параметризованих маршрутів у великих проєктах.
#### 🔴 Senior
Стратегія побудови REST URL.
Версіонування API з параметрами.
Оптимізація складних маршрутів.
Безпечна робота з параметрами.
Використання middleware для перевірки параметрів.
Інтеграція параметрів із системою валідації та ORM.

### Міні-шпаргалка
```js
import express from 'express';

const app = express();

app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: `User id = ${id}`,
  });
});

app.listen(3000);
```

**Кілька параметрів:**
```js
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;

  res.json({
    userId,
    postId,
  });
});
```

**URL → req.params**
```text
GET /users/15
↓
req.params
{
  id: "15"
}
```

```text
GET /users/15/posts/7
↓
req.params
{
  userId: "15",
  postId: "7"
}
```

**Пам'ятай:**

- `:` означає параметр маршруту.
- Дані доступні через `req.params`.
- Усі значення в `req.params` — рядки (`string`).
- Route Parameters використовують для ідентифікації конкретного ресурсу.
- Для фільтрації та пошуку краще використовувати Query Parameters.

---------------------------------------------------
## 04. Query Parameters
Query Parameters (параметри запиту) — це дані, які передаються в URL після символу `?`. Вони використовуються для фільтрації, пошуку, сортування, пагінації та інших додаткових параметрів запиту. У Express вони доступні через `req.query`.

### Ключові поняття
✔ query parameters
✔ query string
✔ req.query
✔ filtering
✔ sorting
✔ pagination
✔ search
✔ optional parameters

### Що потрібно пам'ятати
• Query Parameters починаються після символу `?`.
• Параметри розділяються символом `&`.
• Express автоматично розбирає Query String у `req.query`.
• Усі значення в `req.query` за замовчуванням є рядками (`string`).
• Query Parameters є необов'язковими.
• Використовуються для зміни способу отримання ресурсу, а не для його ідентифікації.

### Основний API
```js
req.query
req.query.page
req.query.limit
req.query.sort
req.query.search
```

### Де використовується
✔ REST API
✔ Пошук
✔ Фільтрація
✔ Сортування
✔ Пагінація
✔ Фільтрація списків

### Типові помилки
❌ Плутають Query Parameters із Route Parameters
❌ Очікують число, хоча значення є рядком
❌ Не перевіряють відсутність параметра
❌ Не задають значення за замовчуванням
❌ Не валідовують введені параметри

### Питання зі співбесіди
Що таке Query Parameters?
Як отримати Query Parameters у Express?
У чому різниця між Query Parameters та Route Parameters?
Для чого використовують Query Parameters?
Як реалізувати пагінацію через Query Parameters?
Як обробляти необов'язкові параметри?

### Шлях
#### 🟢 Core (обов'язково знати)
Що таке Query Parameters.
Як працює `req.query`.
Структура Query String.
Як передати кілька параметрів.
Коли використовувати Query Parameters.
#### 🔵 Junior
Різниця між Query Parameters та Route Parameters.
Фільтрація через Query Parameters.
Пошук через Query Parameters.
Пагінація (`page`, `limit`).
Сортування (`sort`, `order`).
Значення за замовчуванням.
#### 🟠 Middle
Валідація Query Parameters.
Конвертація типів.
Комбінування кількох параметрів.
Проєктування API для фільтрації.
Побудова універсальних endpoint'ів.
Обробка великої кількості параметрів.
#### 🔴 Senior
Проєктування масштабованих API для пошуку.
Оптимізація складної фільтрації.
Безпечна обробка Query Parameters.
Використання middleware для валідації.
Інтеграція Query Parameters з ORM та базами даних.
Побудова гнучких систем фільтрації та пагінації.

### Міні-шпаргалка
```js
import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  const { page, limit, search } = req.query;

  res.json({
    page,
    limit,
    search,
  });
});

app.listen(3000);
```

**Приклад URL:**
```text
GET /users?page=2&limit=10&search=john
```
↓
```js
req.query
{
  page: "2",
  limit: "10",
  search: "john"
}
```

**Route Parameters + Query Parameters**
```text
GET /users/15/posts?page=2&limit=5
```
↓
```js
req.params
{
  id: "15"
}
```

```js
req.query
{
  page: "2",
  limit: "5"
}
```

**Пам'ятай:**
- `?` починає Query String.
- `&` розділяє параметри.
- Дані доступні через `req.query`.
- Усі значення в `req.query` — рядки (`string`).
- Query Parameters використовують для фільтрації, пошуку, сортування та пагінації.
- Для ідентифікації конкретного ресурсу використовують Route Parameters.

---------------------------------------------------
## 05. Middleware Basics
Middleware — це функція, яка виконується між отриманням HTTP-запиту та відправленням відповіді. Middleware має доступ до об'єктів `req`, `res` і функції `next()`, що дозволяє передавати керування наступному middleware або маршруту.

### Ключові поняття
✔ middleware
✔ request (`req`)
✔ response (`res`)
✔ next()
✔ middleware chain
✔ application-level middleware
✔ route-level middleware
✔ request lifecycle

### Що потрібно пам'ятати
• Middleware виконується під час кожного HTTP-запиту.
• Middleware отримує `req`, `res` і `next`.
• `next()` передає керування наступному middleware.
• Якщо не викликати `next()` або не відправити відповідь — запит "зависне".
• Middleware виконуються у порядку їх реєстрації.
• Middleware можуть змінювати `req` та `res`.

### Основний API
```js
app.use()
next()
(req, res, next) => {}
app.get(path, middleware, handler)
app.post(path, middleware, handler)
```

### Де використовується
✔ Логування запитів
✔ Перевірка авторизації
✔ Валідація даних
✔ Парсинг тіла запиту
✔ Обробка помилок
✔ Додавання даних до `req`

### Типові помилки
❌ Забули викликати `next()`
❌ Не повернули відповідь клієнту
❌ Викликали `next()` після `res.send()`
❌ Зареєстрували middleware після маршрутів
❌ Викликали `next()` двічі

### Питання зі співбесіди
Що таке Middleware?
Навіщо потрібен `next()`?
Що буде, якщо не викликати `next()`?
У якому порядку виконуються middleware?
Яка різниця між middleware та handler?
Як middleware можуть змінювати `req`?

### Шлях
#### 🟢 Core (обов'язково знати)
Що таке middleware.
Як працює функція `next()`.
Як створити простий middleware.
Як підключити middleware через `app.use()`.
У якому порядку виконуються middleware.
#### 🔵 Junior
Життєвий цикл HTTP-запиту.
Різниця між middleware та route handler.
Application-level та Route-level middleware.
Передача даних через `req`.
Коли middleware завершує запит самостійно.
Порядок виконання middleware.
#### 🟠 Middle
Створення багаторазових middleware.
Композиція middleware.
Вплив порядку реєстрації middleware.
Використання middleware для авторизації.
Передача даних між middleware.
Оптимізація middleware-ланцюжка.
#### 🔴 Senior
Архітектура middleware у великих проєктах.
Організація middleware за відповідальністю.
Створення універсальних middleware.
Продуктивність великої кількості middleware.
Побудова власних middleware-пайплайнів.
Порівняння middleware в Express, Koa та Fastify.

### Міні-шпаргалка
```js
import express from 'express';

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(3000);
```

**Middleware перед маршрутом:**
```text
HTTP Request
      │
      ▼
Middleware #1
      │
    next()
      ▼
Middleware #2
      │
    next()
      ▼
Route Handler
      │
HTTP Response
```

**Route-level middleware:**
```js
const logger = (req, res, next) => {
  console.log('Request received');
  next();
};

app.get('/users', logger, (req, res) => {
  res.send('Users');
});
```

**Пам'ятай:**
- Middleware працює між запитом і відповіддю.
- `next()` передає керування далі.
- Middleware виконуються зверху вниз.
- Якщо відповідь вже відправлена (`res.send()`, `res.json()`), `next()` зазвичай більше не викликають.
- Middleware можуть змінювати `req`, `res` або завершувати запит самостійно.

---------------------------------------------------
## 06. Custom Middleware
Custom Middleware — це власні middleware-функції, які розробник створює для виконання специфічної логіки під час обробки HTTP-запитів. Вони дозволяють повторно використовувати код для авторизації, логування, валідації, перевірки прав доступу та інших задач.

### Ключові поняття
✔ custom middleware
✔ reusable middleware
✔ next()
✔ request (`req`)
✔ response (`res`)
✔ middleware chain
✔ authorization
✔ validation

### Що потрібно пам'ятати
• Custom Middleware — це звичайна функція.
• Middleware повинен або викликати `next()`, або завершити запит відповіддю.
• Один middleware може використовуватися в багатьох маршрутах.
• Middleware можна передавати як окрему функцію.
• Middleware можуть змінювати `req` перед передачею керування далі.
• Добре написані middleware виконують лише одну відповідальність.

### Основний API
```js
app.use()
next()
(req, res, next) => {}
module.exports
export
import
```

### Де використовується
✔ Авторизація
✔ Аутентифікація
✔ Валідація даних
✔ Логування
✔ Перевірка заголовків
✔ Додавання службових даних до `req`

### Типові помилки
❌ Забули викликати `next()`
❌ Не завершили запит відповіддю
❌ Один middleware виконує занадто багато логіки
❌ Змінюють `req` без необхідності
❌ Викликають `next()` після `res.send()`

### Питання зі співбесіди
Що таке Custom Middleware?
Чим він відрізняється від Built-in Middleware?
Навіщо створювати власні middleware?
Як передати middleware у маршрут?
Що буде, якщо не викликати `next()`?
Як зробити middleware багаторазовим?

### Шлях
#### 🟢 Core (обов'язково знати)
Що таке Custom Middleware.
Як створити власний middleware.
Як використовувати `next()`.
Як підключити middleware до маршруту.
Коли middleware завершує запит.
#### 🔵 Junior
Повторне використання middleware.
Передача даних через `req`.
Створення окремих файлів middleware.
Application-level та Route-level middleware.
Перевірка авторизації через middleware.
Валідація запитів.
#### 🟠 Middle
Middleware Factory (middleware з параметрами).
Композиція middleware.
Ланцюжки middleware.
Організація папки `middlewares`.
Передача інформації між middleware.
Тестування власних middleware.
#### 🔴 Senior
Проєктування універсальних middleware.
Dependency Injection у middleware.
Композиція middleware у великих проєктах.
Побудова middleware для RBAC та ACL.
Оптимізація продуктивності middleware.
Архітектура middleware у великих REST API.
### Міні-шпаргалка
```js
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);
```

**Middleware для маршруту:**
```js
const checkAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  next();
};

app.get('/profile', checkAuth, (req, res) => {
  res.send('Profile');
});
```

**Middleware у окремому файлі:**
```js
// middlewares/logger.js

export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
```

```js
// app.js

import { logger } from './middlewares/logger.js';

app.use(logger);
```

**Порядок виконання:**
```text
HTTP Request
      │
      ▼
Custom Middleware
      │
   next()
      ▼
Route Handler
      │
HTTP Response
```

**Пам'ятай:**
- Custom Middleware — це звичайна функція `(req, res, next)`.
- Middleware повинен або викликати `next()`, або відправити відповідь.
- Один middleware — одна відповідальність.
- Middleware можна використовувати повторно в різних маршрутах.
- Власні middleware роблять код чистішим, модульним і легшим для підтримки.

---------------------------------------------------
## 07. Built-in Middleware
Built-in Middleware — це вбудовані middleware Express, які виконують типові задачі без необхідності писати власний код. Найчастіше вони використовуються для обробки JSON, URL-encoded даних та роздачі статичних файлів.

### Ключові поняття
✔ built-in middleware
✔ express.json()
✔ express.urlencoded()
✔ express.static()
✔ request body
✔ static files
✔ body parsing
✔ content-type

### Що потрібно пам'ятати
• Built-in Middleware вже входять до складу Express.
• `express.json()` розбирає JSON у тілі запиту.
• `express.urlencoded()` розбирає HTML-форми.
• `express.static()` дозволяє віддавати статичні файли.
• Middleware потрібно реєструвати до маршрутів.
• Якщо не підключити `express.json()`, `req.body` буде `undefined`.

### Основний API
```js
express.json()
express.urlencoded()
express.static()
app.use()
```

### Де використовується
✔ REST API
✔ HTML-форми
✔ Frontend + Backend
✔ Завантаження CSS
✔ Завантаження JavaScript
✔ Роздача зображень та інших статичних файлів

### Типові помилки
❌ Забули підключити `express.json()`
❌ Очікують дані у `req.body`, але middleware не зареєстрований
❌ Зареєстрували middleware після маршрутів
❌ Неправильно налаштували `express.static()`
❌ Надіслали JSON без заголовка `Content-Type: application/json`

### Питання зі співбесіди
Що таке Built-in Middleware?
Для чого потрібен `express.json()`?
Коли використовують `express.urlencoded()`?
Навіщо потрібен `express.static()`?
Чому `req.body` може бути `undefined`?
У якому порядку потрібно підключати middleware?

### Шлях
#### 🟢 Core (обов'язково знати)
Що таке Built-in Middleware.
Як працює `express.json()`.
Як працює `express.urlencoded()`.
Як працює `express.static()`.
Чому middleware потрібно реєструвати до маршрутів.
#### 🔵 Junior
Різниця між JSON та URL-encoded.
Що таке `Content-Type`.
Як працює `req.body`.
Роздача статичних файлів.
Обробка HTML-форм.
Налаштування папки `public`.
#### 🟠 Middle
Порядок виконання Built-in Middleware.
Комбінування кількох middleware.
Обмеження розміру тіла запиту (`limit`).
Опції `express.urlencoded()` (`extended`).
Організація статичних ресурсів.
Безпечна робота з `req.body`.
#### 🔴 Senior
Внутрішня робота Body Parser.
Оптимізація обробки великих JSON.
Безпечна конфігурація middleware.
Стратегія роботи зі статичними файлами.
CDN та кешування статичних ресурсів.
Продуктивність Built-in Middleware у великих застосунках.

### Міні-шпаргалка
**Обробка JSON:**
```js
import express from 'express';

const app = express();

app.use(express.json());

app.post('/users', (req, res) => {
  console.log(req.body);

  res.json(req.body);
});
```

---
**Обробка HTML-форми:**
```js
app.use(
  express.urlencoded({
    extended: true,
  })
);
```
---

**Статичні файли:**
```js
app.use(express.static('public'));
```

Структура:
```text
project/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── logo.png
│
└── app.js
```

Тоді файли доступні за адресами:
```text
GET /index.html
GET /style.css
GET /logo.png
```

---
**Порядок виконання:**
```text
HTTP Request
      │
      ▼
express.json()
      │
      ▼
express.urlencoded()
      │
      ▼
express.static()
      │
      ▼
Route Handler
      │
HTTP Response
```

### Пам'ятай
- `express.json()` → читає JSON із тіла запиту.
- `express.urlencoded()` → читає дані HTML-форм.
- `express.static()` → віддає статичні файли.
- Built-in Middleware потрібно підключати **до маршрутів**.
- Без `express.json()` властивість `req.body` не буде містити JSON-дані.

---------------------------------------------------
## 08. Error Middleware
Error Middleware — це спеціальний тип middleware в Express, який використовується для централізованої обробки помилок. Він перехоплює помилки, що виникають під час обробки запиту, і формує єдину відповідь клієнту.

### Ключові поняття
✔ error middleware
✔ error handling
✔ next(err)
✔ try...catch
✔ centralized error handling
✔ HTTP status codes
✔ custom errors
✔ Express error handler

### Що потрібно пам'ятати
• Error Middleware має **4 параметри**: `(err, req, res, next)`.
• Для передачі помилки використовується `next(err)`.
• Error Middleware потрібно реєструвати **після всіх маршрутів**.
• Централізована обробка помилок робить код чистішим.
• Якщо відповідь уже відправлена, повторно відправляти її не можна.
• У production не варто повертати клієнту стек помилки (`stack`).

### Основний API
```js
next(err)
(err, req, res, next) => {}
res.status()
res.json()
try...catch
```
### Де використовується
✔ REST API
✔ Валідація
✔ Авторизація
✔ Робота з базою даних
✔ Обробка винятків
✔ Централізоване логування

### Типові помилки
❌ Забули четвертий параметр `err`
❌ Error Middleware зареєстрований до маршрутів
❌ Не викликали `next(err)`
❌ Повертають стек помилки у production
❌ Відправляють відповідь двічі

### Питання зі співбесіди
Що таке Error Middleware?
Чим він відрізняється від звичайного middleware?
Чому Error Middleware має 4 параметри?
Для чого використовується `next(err)`?
Де потрібно реєструвати Error Middleware?
Як централізовано обробляти помилки в Express?

### Шлях
#### 🟢 Core (обов'язково знати)
Що таке Error Middleware.
Як працює `next(err)`.
Як створити Error Middleware.
Чому він має чотири параметри.
Де його потрібно реєструвати.
#### 🔵 Junior
Різниця між middleware та Error Middleware.
Використання `try...catch`.
Створення власних повідомлень про помилки.
Повернення правильних HTTP-статусів.
Обробка помилок у контролерах.
Централізація обробки помилок.
#### 🟠 Middle
Створення власних класів помилок.
Обробка асинхронних помилок.
Структура відповіді при помилках.
Логування помилок.
Валідація через Error Middleware.
Організація папки `middlewares/errors`.
#### 🔴 Senior
Глобальна стратегія Error Handling.
Уніфікована структура помилок API.
Моніторинг помилок (Sentry, LogRocket тощо).
Обробка неочікуваних винятків.
Безпечне логування помилок.
Проєктування системи власних помилок у великих застосунках.

### Міні-шпаргалка

**Передача помилки:**
```js
app.get('/users/:id', (req, res, next) => {
  try {
    throw new Error('User not found');
  } catch (err) {
    next(err);
  }
});
```
---
**Error Middleware:**
```js
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});
```
---
**Порядок реєстрації:**
```js
app.use(express.json());
// Routes
app.get(...);
app.post(...);
// Error Middleware
app.use((err, req, res, next) => {
  ...
});
```
---
**Потік виконання:**

```text
HTTP Request
      │
      ▼
Route Handler
      │
   Error
      │
 next(err)
      ▼
Error Middleware
      │
HTTP Response
```
### Пам'ятай
- Error Middleware має сигнатуру `(err, req, res, next)`.
- Для передачі помилки використовують `next(err)`.
- Він реєструється **після всіх маршрутів**.
- Централізована обробка помилок спрощує підтримку застосунку.
- У production не слід повертати клієнту технічні деталі або стек помилки.

---------------------------------------------------
## 09. Router Modules
Router Modules — це механізм Express, який дозволяє розділяти маршрути на окремі модулі за функціональністю. Для цього використовується `express.Router()`, що допомагає зробити структуру проєкту більш чистою, масштабованою та зручною для підтримки.

### Ключові поняття
✔ Router
✔ express.Router()
✔ router
✔ route modules
✔ modular routing
✔ mount path
✔ app.use()
✔ REST API

### Що потрібно пам'ятати
• `express.Router()` створює окремий маршрутизатор.
• Кожен Router відповідає за свою групу маршрутів.
• Router підключається до застосунку через `app.use()`.
• Router можна вкладати в інші Router.
• Великі проєкти практично завжди використовують Router Modules.
• Router підтримує middleware так само, як і основний застосунок.

### Основний API
```js
express.Router()
router.get()
router.post()
router.put()
router.patch()
router.delete()
router.use()
app.use()
```
### Де використовується
✔ REST API
✔ Великі Express-проєкти
✔ CRUD-застосунки
✔ Мікросервіси
✔ Модульна архітектура
✔ Версіонування API

### Типові помилки
❌ Забули експортувати Router
❌ Забули підключити Router через `app.use()`
❌ Неправильно вказали базовий шлях
❌ Використовують `app.get()` замість `router.get()` у модулі
❌ Дублюють маршрути в різних Router

### Питання зі співбесіди
Що таке Router Modules?
Навіщо використовувати `express.Router()`?
Чим Router відрізняється від `app`?
Як підключити Router до Express?
Як організувати маршрути у великому проєкті?
Чи можна використовувати middleware всередині Router?

### Шлях
#### 🟢 Core (обов'язково знати)
Що таке Router.
Як створити Router.
Як створити маршрути через `router.get()`.
Як експортувати Router.
Як підключити Router через `app.use()`.

#### 🔵 Junior
Різниця між `app` та `router`.
Організація маршрутів по модулях.
Структура папки `routes`.
Використання middleware усередині Router.
Базові шляхи (`/users`, `/posts`).
Організація REST API.

#### 🟠 Middle
Вкладені Router.
Групування маршрутів.
Router-level Middleware.
Версіонування API (`/api/v1`).
Розділення Controller та Router.
Масштабування структури Express-проєкту.
#### 🔴 Senior
Архітектура великих REST API.
Feature-based структура Router.
Lazy loading модулів.
Композиція Router.
Автоматичне підключення Router.
Проєктування масштабованої системи маршрутів.

### Міні-шпаргалка
**Створення Router:**
```js
// routes/users.js
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Users');
});

router.post('/', (req, res) => {
  res.send('Create user');
});

export default router;
```
---
**Підключення Router:**
```js
// app.js
import express from 'express';
import usersRouter from './routes/users.js';

const app = express();

app.use('/users', usersRouter);

app.listen(3000);
```
---
**Структура проєкту:**
```text
project/
│
├── app.js
│
├── routes/
│   ├── users.js
│   ├── posts.js
│   └── auth.js
│
├── controllers/
│
├── middlewares/
│
└── services/
```
---
**Як формується URL:**
```text
app.use('/users', usersRouter);
↓
router.get('/');
↓
GET /users
```
```text
app.use('/users', usersRouter);
↓
router.get('/:id');
↓
GET /users/15
```
---
**Порядок обробки:**
```text
HTTP Request
      │
      ▼
app.use('/users', usersRouter)
      │
      ▼
usersRouter
      │
      ▼
Route Handler
      │
HTTP Response
```

### Пам'ятай
- `express.Router()` створює окремий маршрутизатор.
- Router використовується для групування маршрутів.
- Router підключається через `app.use()`.
- Router підтримує власні middleware.
- У реальних Express-проєктах маршрути майже завжди розділяють на окремі модулі.

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

### Основний API


### Де використовується


### Типові помилки


### Питання зі співбесіди


### Шлях


### Міні-шпаргалка


---------------------------------------------------
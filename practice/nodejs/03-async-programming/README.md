Тема
   │
   ├── 1. План теми
   │
   ├── 2. Теорія (README)
   │
   ├── 3. Практика
   │
   ├── 4. Міні-проєкт
   │
   ├── 5. Співбесіда
   │
   └── 6. Повторення


#  03-async-programming

## 01. Sync vs Async
Синхронний код виконується послідовно і блокує виконання наступних інструкцій.
Асинхронний дозволяє не чекати завершення довгих операцій (I/O), а продовжити виконання програми.
### Ключові поняття
✔ synchronous
✔ asynchronous
✔ blocking
✔ non-blocking
✔ I/O
✔ Event Loop
✔ libuv
### Що потрібно пам'ятати
• Node.js виконує JS в одному потоці.
• Event Loop обробляє завершені асинхронні операції.
• libuv працює з файловою системою, мережею та thread pool.
• Не блокувати Event Loop важкими обчисленнями.
• Sync API блокує виконання.
### Основний API
fs.readFile()
fs.writeFile()
fs.readFileSync()
setTimeout()
setInterval()
setImmediate()
### Де використовується
✔ fs
✔ http
✔ database
✔ fetch
✔ timers
✔ streams
### Типові помилки
❌ fs.readFileSync() у запиті Express
❌ Великий цикл на кілька секунд
❌ CPU-heavy задачі в основному потоці
### Питання зі співбесіди
Що таке Event Loop?
Чому Node.js швидкий?
Чому JS однопотоковий?
Що таке blocking code?
Що таке non-blocking I/O?
### Шлях
🟢 Core (обов'язково знати)
Що таке synchronous та asynchronous код.
Чим відрізняється blocking від non-blocking.
Чому I/O-операції виконуються асинхронно.
Які операції в Node.js є асинхронними.
Чому fs.readFile() кращий за fs.readFileSync() у серверному коді.
🔵 Junior
Як працює Event Loop на базовому рівні.
Яку роль виконує libuv.
Що таке Thread Pool.
Чому JavaScript у Node.js однопотоковий.
Різниця між Sync API та Async API.
Основні категорії асинхронних операцій (fs, http, timers, database).
🟠 Middle
Фази Event Loop.
Черга Microtasks і Macrotasks.
process.nextTick().
queueMicrotask().
setImmediate() та його відмінність від setTimeout(..., 0).
Що таке starvation (коли одна черга може «голодувати» іншу).
Як знаходити місця, які блокують Event Loop.
Як оптимізувати асинхронний код.
🔴 Senior
Внутрішня робота libuv.
Як влаштований Event Loop всередині Node.js.
Коли використовувати Worker Threads.
Коли використовувати Child Process.
CPU-bound vs I/O-bound задачі.
Як проектувати API, щоб не блокувати Event Loop.
Моніторинг продуктивності Event Loop.
Профілювання та пошук вузьких місць продуктивності.

---------------------------------------------------
## 02. Callbacks
Callback — це функція, яка передається як аргумент в іншу функцію і викликається пізніше, коли певна операція завершиться.
До появи Promise callbacks були основним способом написання асинхронного коду в Node.js.
### Ключові поняття
✔ callback
✔ callback function
✔ callback hell
✔ error-first callback
✔ asynchronous callback
✔ synchronous callback
✔ inversion of control
### Що потрібно пам'ятати
• Callback — це звичайна функція, передана іншій функції.
• Callback може викликатися одразу або пізніше.
• Більшість старих Node.js API використовують Error-First Callback.
• Перший аргумент callback — помилка (err).
• Якщо помилки немає — err === null.
• Велика вкладеність callback призводить до Callback Hell.
• Promise та async/await значно спрощують код.
### Основний API
fs.readFile()
fs.writeFile()
setTimeout()
setInterval()
setImmediate()
process.nextTick()
### Де використовується
✔ fs
✔ timers
✔ EventEmitter
✔ старі Node.js API
✔ деякі npm-бібліотеки
### Типові помилки
❌ Забути перевірити err
❌ Викликати callback двічі
❌ Callback Hell (велика вкладеність)
❌ Змішувати callback та Promise без необхідності
❌ Не обробляти помилки
### Питання зі співбесіди
Що таке callback?
Навіщо потрібні callbacks?
Що таке Error-First Callback?
Що таке Callback Hell?
Як уникнути Callback Hell?
Чим callback відрізняється від Promise?
### Шлях
🟢 Core (обов'язково знати)
Що таке callback.
Як передавати функцію як аргумент.
Чим callback відрізняється від звичайного виклику функції.
Що таке синхронний та асинхронний callback.
Навіщо Node.js використовує callbacks.
🔵 Junior
Error-First Callback.
Стандартний вигляд callback у Node.js:
(err, data) => {}
Як працює fs.readFile().
Чому виникає Callback Hell.
Основні способи зробити код читабельнішим.
🟠 Middle
Inversion of Control.
Як правильно проектувати callback API.
Як уникати подвійного виклику callback.
Перетворення callback API у Promise (util.promisify).
Порівняння callback, Promise та async/await.
🔴 Senior
Внутрішня причина популярності callback у Node.js.
Проблеми callback-орієнтованої архітектури.
Патерни роботи з великими callback API.
Backpressure у callback-орієнтованих потоках.
Як проектувати бібліотеки з підтримкою callback та Promise одночасно.

----------------------------------------------

## 03. Promises
Promise — це об'єкт, який представляє результат асинхронної операції. Він дозволяє працювати з асинхронним кодом без великої вкладеності callback-функцій.
Promise може перебувати в одному з трьох станів: pending, fulfilled або rejected.
### Ключові поняття
✔ Promise
✔ pending
✔ fulfilled
✔ rejected
✔ resolve
✔ reject
✔ then
✔ catch
✔ finally
✔ chaining
✔ Promise API

### Що потрібно пам'ятати
• Promise — це об'єкт, а не функція.
• Promise створюється один раз і завершується лише один раз.
• Promise може бути або fulfilled, або rejected.
• .then() обробляє успішний результат.
• .catch() обробляє помилки.
• .finally() виконується незалежно від результату.
• .then() повертає новий Promise, що дозволяє будувати ланцюжки.
• Promise значно спрощує асинхронний код порівняно з callbacks.

### Основний API
new Promise()
Promise.resolve()
Promise.reject()
Promise.all()
Promise.allSettled()
Promise.race()
Promise.any()
.then()
.catch()
.finally()

### Де використовується
✔ fs/promises
✔ fetch()
✔ database drivers
✔ HTTP-запити
✔ ORM (Prisma, TypeORM, Sequelize)
✔ більшість сучасних npm-бібліотек

### Типові помилки
❌ Забути повернути Promise з .then()
❌ Не обробити помилку через .catch()
❌ Занадто довгі ланцюжки .then()
❌ Створювати Promise без необхідності
❌ Використовувати new Promise() замість готового Promise API

### Питання зі співбесіди
Що таке Promise?
Які стани має Promise?
У чому різниця між resolve() та reject()?
Навіщо потрібен .finally()?
Чим Promise кращий за callbacks?
Що робить Promise.all()?
Чим відрізняються Promise.all(), Promise.race(), Promise.any() та Promise.allSettled()?

### Шлях
🟢 Core (обов'язково знати)
Що таке Promise.
Які стани має Promise.
Як працюють .then(), .catch(), .finally().
Як створити власний Promise.
Як повернути результат через resolve().
Як передати помилку через reject().
🔵 Junior
Ланцюжки Promise (Promise Chaining).
Як працює повернення значення з .then().
Як обробляються помилки.
Чим Promise кращий за callbacks.
Як використовувати fs/promises.
Як працює fetch().
🟠 Middle
Статичні методи Promise:
Promise.all()
Promise.allSettled()
Promise.race()
Promise.any()
Паралельне виконання Promise.
Послідовне виконання Promise.
Propagation помилок.
Створення власних Promise API.
🔴 Senior
Внутрішня реалізація Promise.
Microtask Queue.
Як Promise взаємодіє з Event Loop.
Unhandled Promise Rejection.
Оптимізація великої кількості Promise.
Concurrency vs Parallelism.
Патерни роботи з Promise у великих застосунках.

### Міні-шпаргалка
•  Створення Promise
const promise = new Promise((resolve, reject) => {
  resolve("Success");
});
• then()
promise.then((result) => {
  console.log(result);
});
• catch()
promise.catch((error) => {
  console.error(error);
});
• finally()
promise.finally(() => {
  console.log("Finished");
});
• Promise.all()
const users = Promise.all([
  getUser(),
  getPosts(),
  getComments()
]);
• Promise.race()
Promise.race([
  slowRequest(),
  fastRequest()
]);
• Promise.any()
Promise.any([
  server1(),
  server2(),
  server3()
]);
• Promise.allSettled()
Promise.allSettled([
  task1(),
  task2(),
  task3()
]);
--------------------------------------------------

## 04. Async / Await
async/await — це синтаксичний цукор над Promise, який дозволяє писати асинхронний код так, ніби він є синхронним. Це робить код більш читабельним, простішим для підтримки та обробки помилок.

### Ключові поняття
✔ async
✔ await
✔ Promise
✔ async function
✔ try...catch
✔ asynchronous flow
✔ sequential execution
✔ parallel execution

### Що потрібно пам'ятати
• async завжди повертає Promise.
• await можна використовувати лише всередині async функції (або на верхньому рівні ES-модуля — Top-Level Await).
• await призупиняє виконання лише поточної async-функції, а не всього Node.js.
• await працює тільки з Promise.
• Помилки найзручніше обробляти через try...catch.
• Кілька незалежних Promise краще запускати паралельно через Promise.all().

### Основний API
async function
await
try...catch
Promise.all()
Promise.allSettled()
Promise.race()
Promise.any()

### Де використовується
✔ fs/promises
✔ fetch()
✔ database
✔ Express
✔ NestJS
✔ Prisma
✔ TypeORM
✔ REST API

### Типові помилки
❌ Забути написати await
❌ Використати await поза async функцією
❌ Виконувати незалежні Promise послідовно замість Promise.all()
❌ Не обробляти помилки через try...catch
❌ Очікувати, що await блокує весь Node.js

### Питання зі співбесіди
Що таке async?
Що робить await?
Чому async функція завжди повертає Promise?
Чим async/await кращий за .then()?
Як правильно обробляти помилки?
Коли використовувати Promise.all() разом з await?
Чи блокує await Event Loop?

### Шлях
🟢 Core (обов'язково знати)
Що таке async.
Що таке await.
Чому async повертає Promise.
Як писати асинхронні функції.
Як використовувати await.
🔵 Junior
Обробка помилок через try...catch.
Різниця між .then() та await.
Послідовне виконання асинхронних операцій.
Використання fs/promises разом з await.
Робота з fetch().
🟠 Middle
Паралельне виконання через Promise.all().
Коли не варто використовувати await.
Top-Level Await.
Оптимізація асинхронного коду.
Використання Promise.allSettled().
Створення ефективних async API.
🔴 Senior
Як await працює всередині Event Loop.
Microtasks після завершення Promise.
Асинхронні патерни у великих застосунках.
Контроль конкурентності (Concurrency Control).
Cancellation (AbortController).
Оптимізація великої кількості async-операцій.

### Міні-шпаргалка
•  Async функція
async function getUser() {
  return "John";
}
•  Await
const data = await fs.readFile("text.txt", "utf8");
console.log(data);
•  try...catch
try {
  const data = await fs.readFile("text.txt", "utf8");
  console.log(data);
} catch (err) {
  console.error(err);
}
•  Послідовне виконання
const user = await getUser();
const posts = await getPosts(user.id);
const comments = await getComments(posts[0].id);
•  Паралельне виконання
const [users, posts, comments] = await Promise.all([
  getUsers(),
  getPosts(),
  getComments(),
]);
•  Async Arrow Function
const getData = async () => {
  return await fetchData();
};

--------------------------------------------------------

## 05. fs.promises
fs/promises — це Promise API модуля fs, який дозволяє працювати з файловою системою за допомогою async/await без використання callback-функцій.
### Ключові поняття
✔ fs/promises
✔ readFile
✔ writeFile
✔ appendFile
✔ mkdir
✔ readdir
✔ stat
✔ unlink
✔ rename
✔ copyFile

### Що потрібно пам'ятати
• fs/promises є сучасною альтернативою callback API (fs).
• Усі методи повертають Promise.
• Найчастіше використовується разом з async/await.
• Помилки обробляються через try...catch.
• Більшість файлових операцій є асинхронними та не блокують Event Loop.
• Для великих файлів краще використовувати Streams.

### Основний API
import fs from "fs/promises";
fs.readFile()
fs.writeFile()
fs.appendFile()
fs.mkdir()
fs.readdir()
fs.stat()
fs.rename()
fs.copyFile()
fs.unlink()
fs.access()

### Де використовується
✔ конфігураційні файли
✔ JSON-файли
✔ логування
✔ CLI-застосунки
✔ Express
✔ NestJS
✔ файлові сховища

### Типові помилки
❌ Забути await
❌ Не обробляти помилки через try...catch
❌ Використовувати readFile() для дуже великих файлів
❌ Не вказати кодування ("utf8") при читанні текстових файлів
❌ Плутати fs та fs/promises

### Питання зі співбесіди
Що таке fs/promises?
Чим він відрізняється від fs?
Чому fs/promises зручніше використовувати з async/await?
Коли варто використовувати Streams замість readFile()?
Як обробляти помилки файлової системи?
Яка різниця між writeFile() та appendFile()?

### Шлях
🟢 Core (обов'язково знати)
Як імпортувати fs/promises.
Як читати файл.
Як записувати файл.
Як створювати директорії.
Як видаляти файл.
Як використовувати async/await.
🔵 Junior
Робота з JSON.
Перевірка існування файлу (access()).
Читання списку файлів (readdir()).
Отримання інформації про файл (stat()).
Перейменування та копіювання файлів.
🟠 Middle
Порівняння fs, fs/promises та Streams.
Паралельне виконання файлових операцій.
Оптимізація роботи з великою кількістю файлів.
Робота з директоріями.
Безпечна обробка помилок файлової системи.
🔴 Senior
Як fs/promises використовує libuv.
Thread Pool під час файлових операцій.
Продуктивність при роботі з великою кількістю файлів.
Atomic operations.
Race Conditions під час файлових операцій.
Коли переходити на Streams.

### Міні-шпаргалка
•  Читання файлу
import fs from "fs/promises";
const text = await fs.readFile("text.txt", "utf8");
console.log(text);

•  Запис файлу
await fs.writeFile("text.txt", "Hello Node.js");

•  Дозапис файлу
await fs.appendFile("log.txt", "\nNew record");

•  Створення директорії
await fs.mkdir("data");

•  Отримання списку файлів
const files = await fs.readdir("./data");

•  Видалення файлу
await fs.unlink("temp.txt");

•  Перейменування файлу
await fs.rename("old.txt", "new.txt");

•  Копіювання файлу
await fs.copyFile("source.txt", "backup.txt");

•  Отримання інформації про файл
const info = await fs.stat("text.txt");
console.log(info.size);

## 06. Parallel vs Sequential
Асинхронні операції можуть виконуватися послідовно (Sequential) або паралельно (Parallel). Правильний вибір способу виконання впливає на продуктивність застосунку.
### Ключові поняття
✔ sequential execution
✔ parallel execution
✔ concurrency
✔ Promise.all()
✔ Promise.allSettled()
✔ Promise.race()
✔ Promise.any()
✔ dependency
✔ independent tasks

### Що потрібно пам'ятати
• Послідовне виконання означає, що наступна операція починається лише після завершення попередньої.
• Паралельне виконання запускає кілька незалежних асинхронних операцій одночасно.
• Якщо одна операція залежить від результату іншої — потрібно використовувати послідовне виконання.
• Якщо операції незалежні — краще використовувати Promise.all().
• Паралельне виконання не означає, що JavaScript став багатопотоковим.
• Надмірна кількість одночасних операцій також може погіршити продуктивність.

### Основний API
await
Promise.all()
Promise.allSettled()
Promise.race()
Promise.any()
Array.map()
for...of
for await...of

### Де використовується
✔ HTTP API
✔ fs/promises
✔ database
✔ fetch()
✔ Express
✔ NestJS
✔ мікросервіси
✔ обробка великої кількості файлів

### Типові помилки
❌ Використовувати await для незалежних операцій
❌ Робити await всередині for
❌ Використовувати Promise.all() для залежних операцій
❌ Не обробляти помилки при паралельному виконанні
❌ Запускати тисячі Promise одночасно

### Питання зі співбесіди
Що таке послідовне виконання?
Що таке паралельне виконання?
Коли використовувати Promise.all()?
Чому await всередині циклу може бути повільним?
У чому різниця між Promise.all() та Promise.allSettled()?
Чому паралельне виконання не означає багатопотоковість?

### Шлях
🟢 Core (обов'язково знати)
Що таке Sequential Execution.
Що таке Parallel Execution.
Коли використовувати await.
Коли використовувати Promise.all().
Різниця між залежними та незалежними операціями.
🔵 Junior
Порівняння послідовного та паралельного виконання.
Чому Promise.all() швидший.
Використання Promise.all().
Робота з масивами Promise.
Обробка помилок.
🟠 Middle
Promise.allSettled().
Promise.race().
Promise.any().
Обмеження конкурентності (Concurrency Limiting).
Оптимізація великої кількості запитів.
Асинхронні цикли.
🔴 Senior
Concurrency vs Parallelism.
Backpressure.
Promise Pool.
Rate Limiting.
Взаємодія з Event Loop.
Оптимізація великої кількості I/O операцій.
Проектування високопродуктивних async API.

### Міні-шпаргалка
•  Послідовне виконання
const user = await getUser();
const posts = await getPosts(user.id);
const comments = await getComments(posts[0].id);

•  Паралельне виконання
const [users, posts, comments] = await Promise.all([
  getUsers(),
  getPosts(),
  getComments(),
]);

•  Promise.allSettled()
const results = await Promise.allSettled([
  task1(),
  task2(),
  task3(),
]);

•  Promise.race()
const result = await Promise.race([
  requestToServer1(),
  requestToServer2(),
]);

•  Promise.any()
const result = await Promise.any([
  server1(),
  server2(),
  server3(),
]);

•  ❌ Повільний код
for (const file of files) {
  await processFile(file);
}
•  ✔ Швидший код
await Promise.all(
  files.map((file) => processFile(file))
);

## 07. Error Handling
Обробка помилок (Error Handling) — це набір підходів і механізмів, які дозволяють виявляти, передавати та правильно обробляти помилки під час виконання програми, особливо в асинхронному коді.
### Ключові поняття
✔ Error
✔ throw
✔ try...catch
✔ finally
✔ Promise rejection
✔ unhandled rejection
✔ custom error
✔ stack trace
✔ error propagation

### Що потрібно пам'ятати
• У JavaScript помилки представлені об'єктами Error.
• Помилку можна створити за допомогою throw.
• Синхронні помилки обробляються через try...catch.
• Для async/await також використовується try...catch.
• Помилки Promise можна обробляти через .catch().
• Необроблені Promise Rejection можуть завершити процес Node.js.
• Завжди обробляй очікувані помилки (файл не знайдено, мережа недоступна тощо).

### Основний API
throw
try...catch
finally
new Error()
.catch()
Promise.reject()
process.on("uncaughtException")
process.on("unhandledRejection")

### Де використовується
✔ fs/promises
✔ fetch()
✔ HTTP API
✔ Express
✔ NestJS
✔ Database
✔ CLI-застосунки
✔ Streams

### Типові помилки
❌ Забути try...catch при використанні await
❌ Ігнорувати Promise Rejection
❌ Кидати рядки (throw "Error") замість Error
❌ Ловити помилку і нічого не робити
❌ Приховувати справжню причину помилки

### Питання зі співбесіди
Що таке Error?
Чим throw відрізняється від return?
Як працює try...catch?
Як обробляти помилки в async/await?
Що таке Promise Rejection?
Що таке unhandledRejection?
Коли створювати власні класи помилок?

### Шлях
🟢 Core (обов'язково знати)
Що таке Error.
Як працює throw.
Як використовувати try...catch.
Як працює .catch().
Як обробляти помилки в async/await.
🔵 Junior
Властивості Error (message, name, stack).
finally.
Створення власних повідомлень про помилки.
Різниця між синхронними та асинхронними помилками.
Базова обробка помилок у файловій системі.
🟠 Middle
Створення власних класів помилок.
Повторне викидання помилок (rethrow).
Propagation (передача помилок вгору).
Unhandled Promise Rejection.
Обробка помилок у Express middleware.
Логування помилок.
🔴 Senior
Глобальна обробка помилок.
uncaughtException.
unhandledRejection.
Error Boundaries між шарами застосунку.
Проєктування ієрархії власних помилок.
Моніторинг помилок (Sentry, Logtail тощо).

### Міні-шпаргалка
•  try...catch
try {
  const text = await fs.readFile("text.txt", "utf8");
  console.log(text);
} catch (err) {
  console.error(err);
}

•  throw
if (!user) {
  throw new Error("User not found");
}

•  finally
try {
  await connect();
} finally {
  await disconnect();
}

•  Promise.catch()
fetchData()
  .then(console.log)
  .catch(console.error);

•  Custom Error
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}  

•  Promise.reject()
return Promise.reject(new Error("Access denied"));

•  Global Error Handler
process.on("unhandledRejection", (err) => {
  console.error(err);
});
process.on("uncaughtException", (err) => {
  console.error(err);
});

## 08. Timers
Timers — це механізм Node.js, який дозволяє відкладати або повторювати виконання функцій через певний проміжок часу або після завершення поточного циклу Event Loop.
### Ключові поняття
✔ setTimeout
✔ setInterval
✔ setImmediate
✔ clearTimeout
✔ clearInterval
✔ clearImmediate
✔ delay
✔ callback
✔ Event Loop

### Що потрібно пам'ятати
• setTimeout() виконує функцію не раніше, ніж через вказаний час.
• setInterval() виконує функцію повторно через заданий інтервал.
• setImmediate() виконує callback після завершення поточної ітерації Event Loop.
• Таймери не гарантують точний час виконання — вони лише визначають мінімальну затримку.
• Якщо Event Loop зайнятий, callback виконається пізніше.
• Таймери можна скасувати через clearTimeout(), clearInterval() та clearImmediate().

### Основний API
setTimeout()
setInterval()
setImmediate()
clearTimeout()
clearInterval()
clearImmediate()

### Де використовується
✔ retry-механізми
✔ polling
✔ debounce/throttle
✔ таймаути HTTP-запитів
✔ планування задач
✔ тестування
✔ Event Loop

### Типові помилки
❌ Очікувати точне виконання через задану кількість мілісекунд
❌ Забути викликати clearInterval()
❌ Використовувати setInterval() там, де краще рекурсивний setTimeout()
❌ Плутати setImmediate() із setTimeout(..., 0)
❌ Блокувати Event Loop довгими синхронними операціями

### Питання зі співбесіди
Що робить setTimeout()?
Чим відрізняється setInterval() від setTimeout()?
Що таке setImmediate()?
Чим setImmediate() відрізняється від setTimeout(..., 0)?
Чому таймери можуть спрацьовувати пізніше?
Як скасувати таймер?

### Шлях
🟢 Core (обов'язково знати)
Що таке Timers.
Як працює setTimeout().
Як працює setInterval().
Як скасувати таймер.
Що таке setImmediate().
🔵 Junior
Різниця між setTimeout() та setInterval().
Коли використовувати setImmediate().
Чому таймери не гарантують точний час виконання.
Вплив блокування Event Loop на таймери.
Практичні сценарії використання таймерів.
🟠 Middle
Різниця між setImmediate() та setTimeout(..., 0).
Timers Phase Event Loop.
Рекурсивний setTimeout() як альтернатива setInterval().
Побудова retry-механізмів.
Polling.
🔴 Senior
Внутрішня реалізація Timers у Node.js.
Як libuv керує таймерами.
Drift таймерів.
Взаємодія Timers із Microtasks.
Оптимізація великої кількості таймерів.

### Міні-шпаргалка
•  setTimeout()
setTimeout(() => {
  console.log("Hello");
}, 1000);

•  clearTimeout()
const timer = setTimeout(() => {
  console.log("Hello");
}, 1000);
clearTimeout(timer);

•  setInterval()
const interval = setInterval(() => {
  console.log("Tick");
}, 1000);

•  clearInterval(interval);
clearInterval(interval);

•  setImmediate()
setImmediate(() => {
  console.log("Immediate");
});

•  Рекурсивний setTimeout()
function repeat() {
  console.log("Tick");
  setTimeout(repeat, 1000);
}
repeat();

## 09. Event Loop Basics
Event Loop — це механізм Node.js, який керує виконанням асинхронного коду. Він дозволяє JavaScript виконувати неблокуючі операції, обробляючи завершені асинхронні задачі у визначеному порядку.
### Ключові поняття
✔ Event Loop
✔ libuv
✔ Call Stack
✔ Callback Queue
✔ Microtask Queue
✔ Macrotask Queue
✔ Timers Phase
✔ Poll Phase
✔ Check Phase
✔ process.nextTick()
✔ queueMicrotask()

### Що потрібно пам'ятати
• JavaScript виконується в одному потоці.
• Event Loop запускається лише тоді, коли Call Stack порожній.
• Асинхронні I/O-операції виконуються через libuv.
• Promise callback (.then(), await) потрапляють у Microtask Queue.
• setTimeout() і setInterval() виконуються у фазі Timers.
• setImmediate() виконується у фазі Check.
• process.nextTick() має найвищий пріоритет серед асинхронних callback.
• Event Loop працює циклічно, проходячи свої фази.

### Основний API
setTimeout()
setInterval()
setImmediate()
process.nextTick()
queueMicrotask()
Promise.then()
async / await

### Де використовується
✔ fs
✔ HTTP Server
✔ Express
✔ NestJS
✔ Timers
✔ Streams
✔ Database
✔ будь-який асинхронний Node.js код

### Типові помилки
❌ Вважати, що JavaScript виконує кілька задач одночасно
❌ Плутати Microtasks і Macrotasks
❌ Не знати різницю між process.nextTick() та Promise.then()
❌ Використовувати довгі синхронні операції, блокуючи Event Loop
❌ Використовувати нескінченний process.nextTick(), що призводить до starvation

### Питання зі співбесіди
Що таке Event Loop?
Як працює Event Loop?
Які фази має Event Loop?
Що таке Call Stack?
Що таке Microtask Queue?
Що таке Macrotask Queue?
Чим process.nextTick() відрізняється від Promise.then()?
Чим setImmediate() відрізняється від setTimeout(..., 0)?
Що таке libuv?

### Шлях
🟢 Core (обов'язково знати)
Що таке Event Loop.
Що таке Call Stack.
Як Event Loop обробляє асинхронні операції.
Роль libuv.
Порядок виконання синхронного та асинхронного коду.
🔵 Junior
Microtask Queue.
Macrotask Queue.
Timers Phase.
Check Phase.
Poll Phase.
Різниця між Promise та Timers.
Різниця між setImmediate() та setTimeout(..., 0).
🟠 Middle
Повний цикл Event Loop.
process.nextTick().
queueMicrotask().
Starvation.
Взаємодія libuv із Thread Pool.
Як Event Loop працює з файловою системою та мережею.
🔴 Senior
Внутрішня реалізація Event Loop у libuv.
Усі фази Event Loop.
Продуктивність Event Loop.
Моніторинг затримки Event Loop.
Worker Threads.
CPU-bound vs I/O-bound задачі.
Оптимізація високонавантажених Node.js застосунків.

### Міні-шпаргалка
•  Event Loop
Call Stack
      │
      ▼
Event Loop
      │
      ├── Timers
      ├── Pending Callbacks
      ├── Idle / Prepare
      ├── Poll
      ├── Check
      └── Close Callbacks

•  Promise
console.log("A");
Promise.resolve().then(() => {
  console.log("B");
});
console.log("C");      
Виведе:
A
C
B

•  setTimeout
console.log("A");
setTimeout(() => {
  console.log("B");
}, 0);
console.log("C");
Виведе:
A
C
B

•  process.nextTick()
console.log("A");
process.nextTick(() => {
  console.log("B");
});
console.log("C");
Виведе:
A
C
B

•  Promise vs process.nextTick()
Promise.resolve().then(() => console.log("Promise"));
process.nextTick(() => console.log("nextTick"));
Виведе:
nextTick
Promise

•  setImmediate()
setImmediate(() => {
  console.log("Immediate");
});
## 10. Міні-проєкт
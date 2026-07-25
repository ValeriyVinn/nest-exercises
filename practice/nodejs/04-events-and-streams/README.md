# 04-event-and-streams

## 01-event-emitter-basics
EventEmitter — це базовий механізм Node.js для реалізації подій. Об'єкт може "випромінювати" (emit) події, а інші частини програми можуть "слухати" (listen) їх і виконувати відповідний код.

### Ключові поняття
✔ EventEmitter
✔ event
✔ listener
✔ emit
✔ on
✔ once
✔ off
✔ removeListener

### Що потрібно пам'ятати
• EventEmitter знаходиться в модулі node:events.
• Один об'єкт може мати багато слухачів однієї події.
• Події виконуються синхронно в тому порядку, у якому були зареєстровані.
• emit() викликає всіх слухачів відповідної події.
• Аргументи, передані в emit(), отримують усі listener-и.
• once() автоматично видаляє слухача після першого виклику.
• Для обробки помилок існує спеціальна подія "error".

### Основний API
new EventEmitter()

emitter.on()
emitter.once()
emitter.emit()

emitter.off()
emitter.removeListener()

emitter.removeAllListeners()

emitter.listenerCount()

emitter.eventNames()

### Де використовується
✔ Streams
✔ HTTP Server
✔ fs (деякі класи)
✔ Socket.io
✔ WebSocket
✔ Більшість внутрішніх модулів Node.js

### Типові помилки
❌ Забути підписатися на "error"
❌ Не видаляти непотрібні listener-и
❌ Додавати listener усередині циклу
❌ Створювати Memory Leak через велику кількість listener-ів
❌ Очікувати, що emit() працює асинхронно

### Питання зі співбесіди
Що таке EventEmitter?
Для чого використовується EventEmitter?
Яка різниця між on() та once()?
Що робить emit()?
Чому подія "error" є особливою?
Чому може виникнути MaxListenersExceededWarning?

### Шлях
🟢 Core (обов'язково знати)
Що таке EventEmitter.
Що таке подія (event).
Що таке listener.
Як працюють on() та emit().
Як передавати дані через події.
Навіщо потрібен once().
🔵 Junior
Як EventEmitter реалізує патерн Publish/Subscribe.
Різниця між on() і once().
Як видаляти listener-и (off(), removeListener()).
Як працює подія "error".
Чому EventEmitter виконує listener-и синхронно.
Як отримати список подій (eventNames()) та кількість listener-ів (listenerCount()).
🟠 Middle
Порядок виконання listener-ів.
Що відбувається всередині emit().
Як уникати Memory Leak через listener-и.
Причини появи MaxListenersExceededWarning.
Коли EventEmitter підходить, а коли краще використовувати Promise або Stream.
Організація архітектури застосунку навколо подій.
🔴 Senior
Внутрішня реалізація EventEmitter.
Вартість великої кількості listener-ів.
Як EventEmitter використовується всередині Streams.
Проєктування власних EventEmitter-класів.
Побудова event-driven архітектури.
Коли EventEmitter стає "антипатерном".
Моніторинг та дебаг складних ланцюжків подій.

### Міні-шпаргалка
import { EventEmitter } from "node:events";

const emitter = new EventEmitter();

// підписка
emitter.on("login", (user) => {
  console.log(`${user} logged in`);
});

// одноразова підписка
emitter.once("start", () => {
  console.log("Started");
});

// генерація події
emitter.emit("login", "John");

// видалення listener
emitter.off("login", listener);

// кількість listener-ів
emitter.listenerCount("login");

// список подій
emitter.eventNames();

-----------------------------------------------------
## 02-custom-events
Власні події (Custom Events) дозволяють будувати власну систему обміну повідомленнями між частинами програми. Для цього зазвичай створюють власний клас, який успадковується від EventEmitter.

### Ключові поняття
✔ custom event
✔ EventEmitter
✔ extends
✔ emit
✔ listener
✔ event-driven architecture
✔ publish / subscribe

### Що потрібно пам'ятати
• Власні події створюються за допомогою EventEmitter.
• Подію можна назвати будь-яким рядком або Symbol.
• Один emit() може передавати будь-яку кількість аргументів.
• Клас може успадковуватися (extends EventEmitter) і містити власну бізнес-логіку.
• Події допомагають зменшити зв'язність (coupling) між модулями.
• Listener не повинен знати, хто викликав подію.

### Основний API
class MyEmitter extends EventEmitter {}
emitter.emit()
emitter.on()
emitter.once()
extends EventEmitter
super()

### Де використовується
✔ Власні сервіси
✔ Бізнес-логіка застосунку
✔ Черги задач
✔ Notification System
✔ Logger
✔ Plugin System
✔ Event-driven Architecture

### Типові помилки
❌ Не викликати super() у конструкторі класу
❌ Робити один EventEmitter для всієї програми без потреби
❌ Використовувати події там, де достатньо звичайного виклику функції
❌ Передавати занадто багато різнорідних даних через одну подію
❌ Давати подіям незрозумілі назви ("data", "event", "test")

### Питання зі співбесіди
Як створити власний EventEmitter?
Навіщо успадковуватися від EventEmitter?
Що таке custom event?
Коли варто використовувати власні події?
Які переваги має event-driven архітектура?
Коли EventEmitter краще не використовувати?

### Шлях
🟢 Core (обов'язково знати)
Як створити власний клас на основі EventEmitter.
Як використовувати emit() та on().
Як передавати дані через власні події.
Навіщо потрібні custom events.
🔵 Junior
Різниця між стандартними та власними подіями.
Навіщо використовувати extends EventEmitter.
Як організувати взаємодію між кількома модулями через події.
Як правильно називати події.
Коли використовувати once().
🟠 Middle
Патерн Publish/Subscribe.
Loose Coupling (слабке зв'язування компонентів).
Проєктування event-driven модулів.
Як уникати надмірної кількості подій.
Передача складних об'єктів через події.
Коли EventEmitter краще замінити на Promise або Callback.
🔴 Senior
Event-driven архітектура великих застосунків.
Domain Events.
Plugin Architecture через EventEmitter.
Проєктування власних API на основі подій.
Тестування EventEmitter-класів.
Проблеми дебагу великої кількості подій.
Коли використовувати Message Queue замість EventEmitter.

### Міні-шпаргалка
import { EventEmitter } from "node:events";

class UserService extends EventEmitter {
  login(user) {
    console.log(`${user} logged in`);

    this.emit("user:login", user);
  }
}

const service = new UserService();

service.on("user:login", (user) => {
  console.log(`Welcome ${user}`);
});

service.login("John");

-----------------------------------------------------
## 03-built-in-events
Вбудовані події (Built-in Events) — це події, які вже реалізовані у вбудованих модулях Node.js. Багато об'єктів Node.js успадковуються від EventEmitter і генерують події, на які можна підписатися.

### Ключові поняття
✔ built-in events
✔ EventEmitter
✔ event
✔ listener
✔ error
✔ close
✔ data
✔ end

### Що потрібно пам'ятати
• Багато класів Node.js вже є EventEmitter.
• Кожен модуль має власний набір подій.
• Назви подій визначаються документацією Node.js.
• Подія "error" має оброблятися майже завжди.
• Одна подія може викликатися багато разів ("data"), інша — лише один раз ("end" або "close").
• Для кожного типу об'єкта доступний свій набір подій.

### Основний API
emitter.on()
emitter.once()
emitter.emit()
stream.on("data")
stream.on("end")
stream.on("error")
stream.on("close")
server.on("request")
server.on("listening")
server.on("close")
process.on("exit")
process.on("SIGINT")
process.on("uncaughtException")

### Де використовується
✔ Streams
✔ HTTP Server
✔ Process
✔ Child Process
✔ File System Streams
✔ TCP / Net
✔ TLS

### Типові помилки
❌ Не обробляти подію "error"
❌ Плутати "end" та "close"
❌ Очікувати, що "data" викликається лише один раз
❌ Забувати видаляти listener-и для довгоживучих об'єктів
❌ Не читати документацію щодо доступних подій конкретного модуля

### Питання зі співбесіди
Що таке Built-in Events?
Які модулі Node.js використовують EventEmitter?
Які найпоширеніші події Streams?
Чим відрізняються "end" і "close"?
Навіщо потрібна подія "error"?
Які події має об'єкт process?

### Шлях
🟢 Core (обов'язково знати)
Що таке built-in events.
Які об'єкти Node.js є EventEmitter.
Як підписатися на вбудовану подію.
Навіщо потрібна подія "error".
Основні події Streams ("data", "end", "close").
🔵 Junior
Події HTTP Server ("request", "listening", "close").
Події process ("exit", "SIGINT").
Різниця між "end" і "close".
Коли використовується "data".
Як знайти список доступних подій у документації.
🟠 Middle
Життєвий цикл Streams через події.
Як працюють події HTTP Server всередині.
Порядок виникнення основних подій.
Правильна обробка помилок через "error".
Організація коду при роботі з великою кількістю подій.
🔴 Senior
Внутрішня реалізація подій у Streams.
Як побудовані HTTP Server та Socket на EventEmitter.
Життєвий цикл процесу Node.js.
Signal Events (SIGINT, SIGTERM, SIGHUP).
Graceful Shutdown через системні події.
Проєктування власних API, сумісних із вбудованими EventEmitter.

### Міні-шпаргалка
import fs from "node:fs";
import http from "node:http";

// Stream
const stream = fs.createReadStream("file.txt");

stream.on("data", (chunk) => {
  console.log(chunk.length);
});

stream.on("end", () => {
  console.log("Finished reading");
});

stream.on("error", (err) => {
  console.error(err);
});

// HTTP
const server = http.createServer();

server.on("request", (req, res) => {
  res.end("Hello");
});

server.on("listening", () => {
  console.log("Server started");
});

// Process
process.on("SIGINT", () => {
  console.log("Stopping...");
});

process.on("exit", () => {
  console.log("Bye");
});

-----------------------------------------------------
## 04-streams-introduction
• Streams (потоки) — це механізм Node.js для обробки даних частинами (chunks), без необхідності завантажувати весь вміст у пам'ять. Це один із найважливіших інструментів Node.js для роботи з файлами, мережею та великими обсягами даних.

### Ключові поняття
✔ stream
✔ chunk
✔ buffer
✔ backpressure
✔ flowing mode
✔ paused mode
✔ pipe

### Що потрібно пам'ятати
• Stream обробляє дані частинами (chunks).
• Не потрібно чекати, поки весь файл буде прочитаний.
• Streams економлять оперативну пам'ять.
• Більшість потоків у Node.js є EventEmitter.
• Існує чотири основні типи Streams.
• Великі файли майже завжди обробляють через Streams.

### Основний API
fs.createReadStream()
fs.createWriteStream()
stream.pipe()
stream.destroy()
stream.pause()
stream.resume()

### Де використовується
✔ File System
✔ HTTP Server
✔ File Upload
✔ File Download
✔ Compression
✔ Encryption
✔ Network

### Типові помилки
❌ Читати великі файли через fs.readFile()
❌ Не обробляти помилки (error)
❌ Не закривати Stream після завершення роботи
❌ Не враховувати Backpressure
❌ Використовувати Stream там, де достатньо звичайного readFile()

### Питання зі співбесіди
Що таке Stream?
Навіщо потрібні Streams?
Які переваги Streams над readFile()?
Що таке chunk?
Які існують типи Streams?
Що таке Backpressure?

### Шлях
🟢 Core (обов'язково знати)
Що таке Stream.
Чому Streams ефективніші за readFile() для великих файлів.
Що таке chunk.
Чотири типи Streams.
Де використовуються Streams.
🔵 Junior
Різниця між readFile() та createReadStream().
Що таке Buffer.
Як працює читання даних частинами.
Що таке Flowing Mode та Paused Mode.
Чому Streams побудовані на EventEmitter.
🟠 Middle
Як працює Backpressure.
Життєвий цикл Stream.
Внутрішній буфер (highWaterMark).
Коли використовувати Streams замість Buffer.
Взаємодія Readable та Writable Streams.
🔴 Senior
Внутрішня реалізація Streams у Node.js.
Як реалізований механізм Backpressure.
Продуктивність Streams.
Zero-copy передача даних.
Оптимізація роботи з великими файлами.
Профілювання Stream-застосунків.

### Міні-шпаргалка
import fs from "node:fs";

// створення потоку читання
const readable = fs.createReadStream("large-file.txt");

// створення потоку запису
const writable = fs.createWriteStream("copy.txt");

// передача даних
readable.pipe(writable);

-----------------------------------------------------
## 05-readable-streams
• Readable Stream — це потік, призначений для читання даних частинами (chunks). Він дозволяє отримувати інформацію поступово, не завантажуючи весь файл або ресурс у пам'ять.

### Ключові поняття
✔ Readable Stream
✔ chunk
✔ Buffer
✔ encoding
✔ flowing mode
✔ paused mode
✔ highWaterMark

### Що потрібно пам'ятати
• Readable Stream читає дані частинами (chunks).
• За замовчуванням потік повертає Buffer.
• Для отримання рядків можна встановити encoding.
• Readable Stream працює у двох режимах: Flowing Mode та Paused Mode.
• Дані можна отримувати через події (data) або метод read().
• Після завершення читання генерується подія "end".

### Основний API
fs.createReadStream()
stream.read()
stream.pause()
stream.resume()
stream.setEncoding()
stream.destroy()
stream.on("data")
stream.on("readable")
stream.on("end")
stream.on("error")
stream.on("close")

### Де використовується
✔ Читання великих файлів
✔ HTTP Request
✔ File Upload
✔ Архіви
✔ Робота з мережею
✔ Обробка логів
✔ Потокове читання даних

### Типові помилки
❌ Використовувати fs.readFile() для дуже великих файлів
❌ Не обробляти подію "error"
❌ Плутати Buffer та string
❌ Забувати встановити encoding, якщо потрібен текст
❌ Не закривати потік після помилки (destroy())

### Питання зі співбесіди
Що таке Readable Stream?
Чим він відрізняється від fs.readFile()?
Що таке chunk?
Що таке Buffer?
Яка різниця між Flowing Mode та Paused Mode?
Для чого потрібен highWaterMark?

### Шлях
🟢 Core (обов'язково знати)
Що таке Readable Stream.
Як створити потік через fs.createReadStream().
Що таке chunk.
Як отримувати дані через подію "data".
Для чого потрібні події "end" та "error".
🔵 Junior
Різниця між readFile() та createReadStream().
Що таке Buffer.
Як працює setEncoding().
Flowing Mode та Paused Mode.
Як працює метод read().
🟠 Middle
Внутрішній буфер потоку.
Параметр highWaterMark.
Коли використовувати "data", а коли "readable".
Як правильно звільняти ресурси через destroy().
Продуктивність потокового читання.
🔴 Senior
Внутрішня реалізація Readable Stream.
Механізм читання через _read().
Backpressure у Readable Streams.
Налаштування розміру буфера.
Оптимізація читання великих файлів.
Створення власного Readable Stream.

### Міні-шпаргалка
import fs from "node:fs";

const stream = fs.createReadStream("large-file.txt", {
  encoding: "utf8",
});

stream.on("data", (chunk) => {
  console.log(chunk);
});

stream.on("end", () => {
  console.log("Finished");
});

stream.on("error", (err) => {
  console.error(err);
});
-----------------------------------------------------
## 06-writable-streams
• Writable Stream — це потік, призначений для запису даних частинами (chunks). Він дозволяє поступово записувати інформацію у файл, мережеве з'єднання або інший ресурс, не накопичуючи всі дані в пам'яті.

### Ключові поняття
✔ Writable Stream
✔ write
✔ end
✔ drain
✔ finish
✔ backpressure
✔ highWaterMark

### Що потрібно пам'ятати
• Writable Stream записує дані частинами (chunks).
• Метод write() повертає true або false.
• Якщо write() повернув false, потрібно дочекатися події "drain".
• Метод end() завершує запис.
• Після успішного завершення запису генерується подія "finish".
• При виникненні помилки генерується подія "error".

### Основний API
fs.createWriteStream()
stream.write()
stream.end()
stream.destroy()
stream.cork()
stream.uncork()
stream.on("drain")
stream.on("finish")
stream.on("error")
stream.on("close")

### Де використовується
✔ Запис великих файлів
✔ HTTP Response
✔ File Download
✔ Логування
✔ Генерація звітів
✔ Архівування
✔ Запис мережевих даних

### Типові помилки
❌ Ігнорувати результат write()
❌ Не викликати end()
❌ Не обробляти подію "error"
❌ Записувати після виклику end()
❌ Ігнорувати Backpressure

### Питання зі співбесіди
Що таке Writable Stream?
Як створити Writable Stream?
Для чого потрібен метод write()?
Навіщо викликати end()?
Що означає подія "finish"?
Для чого потрібна подія "drain"?

### Шлях
🟢 Core (обов'язково знати)
Що таке Writable Stream.
Як створити потік через fs.createWriteStream().
Як записувати дані через write().
Навіщо потрібен end().
Події "finish" та "error".
🔵 Junior
Різниця між writeFile() та createWriteStream().
Що означає результат write() (true / false).
Коли виникає "drain".
Як працює внутрішній буфер запису.
Що таке highWaterMark.
🟠 Middle
Backpressure у Writable Streams.
Коли використовувати cork() та uncork().
Правильне завершення потоку.
Оптимізація запису великих обсягів даних.
Взаємодія Writable Stream з Readable Stream.
🔴 Senior
Внутрішня реалізація Writable Stream.
Механізм _write().
Буферизація запису.
Оптимізація продуктивності.
Створення власного Writable Stream.
Моніторинг продуктивності потокового запису.

### Міні-шпаргалка
import fs from "node:fs";

const stream = fs.createWriteStream("output.txt");

stream.write("Hello ");
stream.write("Node.js!");

stream.end();

stream.on("finish", () => {
  console.log("Writing completed");
});

stream.on("error", (err) => {
  console.error(err);
});
-----------------------------------------------------

## 07-transform-streams
• Transform Stream — це спеціальний тип потоку, який одночасно читає дані, змінює (перетворює) їх і записує результат далі. Це поєднання Readable та Writable Stream в одному об'єкті.

### Ключові поняття
✔ Transform Stream
✔ Duplex Stream
✔ transform
✔ chunk
✔ pipe
✔ pipeline
✔ backpressure

### Що потрібно пам'ятати
• Transform Stream одночасно є Readable і Writable.
• Кожен отриманий chunk можна змінити перед передачею далі.
• Transform не зберігає весь файл у пам'яті.
• Transform чудово працює разом із pipe() та pipeline().
• Багато вбудованих модулів Node.js використовують Transform Streams (наприклад, zlib та crypto).
• Потрібно правильно завершувати потік та обробляти помилки.

### Основний API
import { Transform } from "node:stream";
new Transform()
transform._transform()
transform.push()
callback()
stream.pipe()
pipeline()

### Де використовується
✔ Стиснення файлів (zlib)
✔ Шифрування (crypto)
✔ Конвертація тексту
✔ Обробка CSV / JSON
✔ Обробка логів
✔ Потокова обробка даних
✔ ETL-процеси

### Типові помилки
❌ Забувати викликати callback()
❌ Накопичувати всі дані замість потокової обробки
❌ Не обробляти "error"
❌ Використовувати Transform там, де достатньо звичайної функції
❌ Не враховувати Backpressure

### Питання зі співбесіди
Що таке Transform Stream?
Чим він відрізняється від Readable та Writable Stream?
Для чого потрібен метод _transform()?
Які вбудовані модулі використовують Transform Streams?
Коли варто використовувати Transform Stream?
Що таке Duplex Stream?

### Шлях
🟢 Core (обов'язково знати)
Що таке Transform Stream.
Чому він одночасно є Readable і Writable.
Як працює метод _transform().
Як перетворювати кожен chunk.
Основні сценарії використання.
🔵 Junior
Різниця між Readable, Writable, Duplex та Transform.
Роль callback().
Як використовувати push().
Як підключати Transform через pipe().
Приклади використання zlib та crypto.
🟠 Middle
Створення власного Transform Stream.
Потокова обробка великих файлів.
Backpressure у Transform Streams.
Обробка помилок.
Коли використовувати pipeline() замість pipe().
🔴 Senior
Внутрішня реалізація Transform.
Методи _transform() та _flush().
Оптимізація продуктивності.
Створення складних конвеєрів обробки даних.
Проєктування власних потокових API.

### Міні-шпаргалка
import { Transform } from "node:stream";

const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

upperCase.on("data", (chunk) => {
  console.log(chunk.toString());
});

upperCase.write("hello ");
upperCase.write("node.js");
upperCase.end();

-----------------------------------------------------
## 08-pipe-and-pipeline
• pipe() та pipeline() дозволяють з'єднувати кілька потоків (Streams) в один конвеєр обробки даних. Дані автоматично передаються від одного потоку до іншого без необхідності вручну читати та записувати кожен chunk.

### Ключові поняття
✔ pipe
✔ pipeline
✔ stream chain
✔ backpressure
✔ error handling
✔ cleanup
✔ stream composition

### Що потрібно пам'ятати
• pipe() з'єднує два потоки.
• pipeline() може з'єднати будь-яку кількість потоків.
• pipeline() автоматично обробляє помилки та закриває всі потоки.
• pipe() не забезпечує повної автоматичної обробки помилок.
• Обидва механізми підтримують Backpressure.
• Для нових застосунків перевагу зазвичай надають pipeline().

### Основний API
stream.pipe()
pipeline()
pipeline(callback)
pipeline(Promise)
stream.destroy()

### Де використовується
✔ Копіювання великих файлів
✔ Стиснення файлів (zlib)
✔ Шифрування (crypto)
✔ HTTP Upload / Download
✔ Обробка логів
✔ ETL-процеси
✔ Потокові конвеєри даних

### Типові помилки
❌ Використовувати pipe() без обробки помилок
❌ Не закривати потоки після помилки
❌ Будувати довгі ланцюги pipe() без контролю
❌ Ігнорувати помилки всередині Transform Stream
❌ Використовувати readFile() замість потокового конвеєра для великих файлів

### Питання зі співбесіди
Що робить pipe()?
Чим pipeline() відрізняється від pipe()?
Чому pipeline() безпечніший?
Що таке потоковий конвеєр (Stream Pipeline)?
Як працює Backpressure у pipe()?
Коли використовувати pipeline()?

### Шлях
🟢 Core (обов'язково знати)
Що таке pipe().
Як з'єднати Readable та Writable Stream.
Навіщо потрібен pipeline().
Різниця між pipe() та pipeline().
🔵 Junior
Як побудувати ланцюг із кількох потоків.
Чому pipeline() автоматично обробляє помилки.
Як працює Backpressure у конвеєрі.
Використання pipeline() з Transform Stream.
🟠 Middle
Використання stream/promises.
Створення складних конвеєрів.
Правильне завершення потоків.
Дебаг потокових конвеєрів.
Продуктивність потокових операцій.
🔴 Senior
Внутрішня реалізація pipeline().
Механізм очищення ресурсів (cleanup).
Оптимізація довгих конвеєрів.
Проєктування потокових архітектур.
Відновлення після помилок у потокових конвеєрах.

### Міні-шпаргалка
import fs from "node:fs";
import { pipeline } from "node:stream/promises";
import zlib from "node:zlib";

// pipe()
const readable = fs.createReadStream("input.txt");
const writable = fs.createWriteStream("copy.txt");

readable.pipe(writable);

// pipeline()
await pipeline(
  fs.createReadStream("input.txt"),
  zlib.createGzip(),
  fs.createWriteStream("input.txt.gz")
);
-----------------------------------------------------
## 09-large-files-processing
• Обробка великих файлів — це використання Streams для читання, перетворення та запису даних без завантаження всього файлу в оперативну пам'ять. Це один із найважливіших практичних сценаріїв використання Streams у Node.js.

### Ключові поняття
✔ large file
✔ streaming
✔ chunk
✔ memory usage
✔ backpressure
✔ pipeline
✔ highWaterMark

### Що потрібно пам'ятати
• Великі файли не слід обробляти через fs.readFile().
• Streams читають і записують файл частинами (chunks).
• pipeline() автоматично керує передачею даних та обробкою помилок.
• Streams дозволяють працювати з файлами будь-якого розміру.
• Потрібно враховувати використання пам'яті та Backpressure.
• Для потокової обробки можна додавати Transform Stream.

### Основний API
fs.createReadStream()
fs.createWriteStream()
pipeline()
Transform
highWaterMark
stream.destroy()

### Де використовується
✔ Копіювання великих файлів
✔ Стиснення архівів
✔ Обробка логів
✔ ETL-процеси
✔ Імпорт / експорт CSV
✔ Робота з великими JSON-файлами
✔ Відео та аудіо

### Типові помилки
❌ Використовувати fs.readFile() для файлів у кілька гігабайтів
❌ Ігнорувати помилки в pipeline()
❌ Не враховувати Backpressure
❌ Виконувати важкі синхронні обчислення для кожного chunk
❌ Використовувати занадто великий або занадто малий highWaterMark без необхідності

### Питання зі співбесіди
Чому великі файли не варто читати через fs.readFile()?
Які переваги Streams при роботі з великими файлами?
Що таке Backpressure?
Для чого використовується pipeline()?
Що таке highWaterMark?
Як обробляти великі файли з мінімальним використанням пам'яті?

### Шлях
🟢 Core (обов'язково знати)
Чому великі файли потрібно обробляти через Streams.
Як копіювати великий файл за допомогою pipeline().
Чому pipeline() безпечніший за ручне керування потоками.
Як працює потокова обробка даних.
🔵 Junior
Як працює використання пам'яті при Streams.
Що таке highWaterMark.
Як використовувати Transform Stream під час обробки файлів.
Як правильно обробляти помилки.
🟠 Middle
Оптимізація швидкості читання та запису.
Налаштування highWaterMark.
Обробка файлів у декілька гігабайтів.
Профілювання використання пам'яті.
Порівняння продуктивності readFile() та Streams.
🔴 Senior
Архітектура високопродуктивної потокової обробки.
Zero-copy передача даних.
Паралельна потокова обробка.
Оптимізація дискового I/O.
Моніторинг продуктивності потокових застосунків.
Проєктування ETL-конвеєрів для великих обсягів даних.

### Міні-шпаргалка
import fs from "node:fs";
import { pipeline } from "node:stream/promises";

await pipeline(
  fs.createReadStream("video.mp4"),
  fs.createWriteStream("video-copy.mp4")
);

console.log("File copied");
-----------------------------------------------------
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
-----------------------------------------------------
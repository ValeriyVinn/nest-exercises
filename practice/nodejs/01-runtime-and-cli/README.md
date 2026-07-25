Тема
1. План теми
2. Теорія (README)
3. Практика
4. Міні-проєкт
5. Співбесіда
6. Повторення

## 00. Terminal
Термінал (Terminal, Command Line Interface, CLI) — це текстовий інтерфейс для взаємодії з операційною системою. Саме через нього найчастіше запускають Node.js-програми, працюють з npm, Git та автоматизують розробку.
### Ключові поняття
✔ Terminal
✔ Shell
✔ Command Line Interface (CLI)
✔ Command
✔ Current Working Directory (CWD)
✔ Absolute Path
✔ Relative Path
✔ Environment Variables
✔ PATH

### Що потрібно пам'ятати
• Terminal — це інтерфейс, Shell — програма, яка виконує команди.
• Node.js майже завжди запускається з терміналу.
• Поточна папка має значення для більшості команд.
• Абсолютний шлях починається від кореня файлової системи.
• Відносний шлях залежить від поточної директорії.
• Більшість інструментів JavaScript запускаються через CLI.

### Основні команди
pwd
cd
ls
mkdir
touch
cp
mv
rm
cat
clear

Windows:
dir
cls

Node:
node
node app.js
npm
npx

### Де використовується
✔ запуск Node.js
✔ npm
✔ Git
✔ Docker
✔ Linux
✔ CI/CD
✔ автоматизація

### Типові помилки
❌ запуск команди не з тієї директорії
❌ плутанина між абсолютним і відносним шляхом
❌ видалення файлів через rm без перевірки
❌ забути встановити Node.js у PATH
❌ плутати Terminal і Shell призводить до starvation

### Питання зі співбесіди
Що таке Terminal?
Що таке CLI?
Чим Terminal відрізняється від Shell?
Що таке поточна директорія?
Різниця між абсолютним та відносним шляхом.
Що таке PATH?
Як перевірити встановлену версію Node.js?

### Шлях
🟢 Core (обов'язково знати)
Навіщо потрібен Terminal.
Як переміщатися між директоріями.
Основні команди (cd, pwd, ls, mkdir, rm, cp, mv).
Різниця між абсолютним і відносним шляхом.
Як запускати Node.js через термінал.
🔵 Junior
Що таке CLI.
Що таке Shell.
Як працює PATH.
Як передавати аргументи програмі.
Основні команди npm через термінал.
Робота з прихованими файлами.
🟠 Middle
Bash scripting.
Перенаправлення потоків (>, >>, <).
Pipes (|).
Змінні середовища.
Alias.
Exit codes.
Автоматизація команд.
🔴 Senior
POSIX Shell.
Bash vs Zsh vs PowerShell.
Побудова CLI-утиліт.
Shell scripting для автоматизації.
Робота з SSH.
Docker CLI.
CI/CD pipelines.
Оптимізація shell-скриптів.

### Міні-шпаргалка
pwd                # поточна папка
ls                 # список файлів
cd folder          # перейти в папку
cd ..              # на рівень вище
mkdir project      # створити папку
touch app.js       # створити файл
rm file.txt        # видалити файл
cp a.txt b.txt     # копіювати
cp a.txt folder/   # копіювати в папку
mv a.txt b.txt     # перейменувати або перемістити
mv a.txt folder/   # перемістити в папку
touch "text" > a.txt  # перезаписати текст і створити (якщо не існує)
touch "text" >> a.txt # додати текст в кінець і створити (якщо не існує файл)
clear              # очистити екран

node app.js        # запуск Node.js
node -v            # версія Node.js
npm -v             # версія npm

-----------------------------------------------------
## 01-what-is-nodejs
Node.js — це середовище виконання (runtime), яке дозволяє запускати JavaScript поза браузером. Воно побудоване на JavaScript-рушії V8 та надає доступ до файлової системи, мережі, процесів та інших можливостей операційної системи.

### Ключові поняття
✔ Node.js
✔ Runtime
✔ JavaScript Engine
✔ V8
✔ Chrome V8
✔ Server-side JavaScript
✔ Event Loop
✔ libuv
✔ Non-blocking I/O
✔ Single Thread

### Що потрібно пам'ятати
• Node.js — це не мова програмування, а середовище виконання JavaScript.
• JavaScript-код виконується за допомогою рушія V8.
• Node.js дозволяє працювати з файловою системою, мережею, процесами та ОС.
• Node.js добре підходить для I/O-bound задач.
• JavaScript виконується в одному основному потоці.
• Асинхронність забезпечується Event Loop та libuv.

### Основний API
Знати, які можливості
process
fs
path
os
http
events
stream
timers

### Де використовується
✔ Backend
✔ REST API
✔ CLI-застосунки
✔ Автоматизація
✔ Build tools
✔ Scripts
✔ Microservices
✔ SSR (Next.js)

### Типові помилки
❌ Вважати Node.js мовою програмування.
❌ Плутати Node.js з JavaScript.
❌ Вважати, що Node.js працює так само, як браузер.
❌ Думати, що Node.js автоматично багатопотоковий.
❌ Вважати, що Node.js підходить для важких CPU-обчислень.

### Питання зі співбесіди
Що таке Node.js?
Чим Node.js відрізняється від JavaScript?
Що таке Runtime?
Що таке V8?
Чому Node.js вважається швидким?
Чому Node.js добре працює з I/O?
Для яких задач Node.js підходить найкраще?
Чому JavaScript можна запускати без браузера.
Чому Node.js не є мовою програмування.
Чому Node.js називають runtime.
Як Node.js взаємодіє з операційною системою.
Чому Node.js ефективний для великої кількості одночасних мережевих запитів.
Коли Node.js є гарним вибором, а коли краще обрати іншу платформу.

### Шлях
🟢 Core (обов'язково знати)
Що таке Node.js.
Що таке Runtime.
Чим Node.js відрізняється від JavaScript.
Для чого використовується Node.js.
Що таке V8.
Які можливості додає Node.js поверх JavaScript.
🔵 Junior
Архітектура Node.js на високому рівні.
Що таке Event Loop.
Що таке libuv.
Чому Node.js використовує один основний потік.
I/O-bound та CPU-bound задачі.
Основні вбудовані модулі Node.js.
🟠 Middle
Внутрішня архітектура Node.js.
Як взаємодіють V8, Event Loop та libuv.
Garbage Collector у V8.
Thread Pool.
Worker Threads.
Child Processes.
Cluster.
Переваги та обмеження Node.js.
🔴 Senior
Внутрішня будова V8.
JIT-компіляція.
Оптимізація продуктивності V8.
Архітектура libuv.
Внутрішня реалізація Event Loop.
Пам'ять у Node.js (Stack, Heap).
Garbage Collection.
Побудова високонавантажених Node.js-сервісів.
Масштабування Node.js-застосунків.

### Міні-шпаргалка
Node.js
    ↓
Runtime Environment
    ↓
V8 Engine
    ↓
Виконує JavaScript

Node.js додає:
✔ fs
✔ http
✔ path
✔ process
✔ os
✔ streams
✔ events
✔ timers

-----------------------------------------------------
## 02-node-runtime
Node Runtime — це середовище виконання JavaScript, яке поєднує рушій V8, бібліотеку libuv та вбудовані модулі Node.js. Воно забезпечує виконання JavaScript-коду, доступ до ресурсів операційної системи та підтримку асинхронних операцій.

### Ключові поняття
✔ Runtime
✔ V8
✔ JavaScript Engine
✔ libuv
✔ Event Loop
✔ Call Stack
✔ Web APIs (відсутні в Node.js)
✔ Node.js APIs
✔ Thread Pool
✔ Single Thread

### Що потрібно пам'ятати
• Runtime — це середовище, яке виконує JavaScript.
• V8 виконує JavaScript-код.
• Node.js додає API для роботи з файловою системою, мережею, процесами та ОС.
• libuv відповідає за асинхронні операції та Event Loop.
• JavaScript-код виконується в одному основному потоці.
• Не всі API браузера доступні у Node.js (window, document тощо).

### Основний API
process
fs
path
os
http
events
stream
timers

### Де використовується
✔ Backend
✔ REST API
✔ CLI-застосунки
✔ Scripts
✔ Build Tools
✔ SSR
✔ Microservices

### Типові помилки
❌ Плутати Runtime з JavaScript.
❌ Вважати V8 самим Node.js.
❌ Вважати, що Node.js має window або document.
❌ Думати, що весь Node.js працює багатопотоково.
❌ Не розуміти роль libuv.

### Питання зі співбесіди
Що таке Runtime?
Що входить до складу Node Runtime?
Що таке V8?
Яку роль виконує libuv?
Чим Runtime Node.js відрізняється від браузера?
Чому Node.js називають середовищем виконання?
Що таке Runtime і навіщо він потрібен.
Чому JavaScript не може працювати сам по собі без середовища виконання.
Яку роль у Node.js виконує V8.
Навіщо потрібен libuv, якщо JavaScript однопотоковий.
Чим Runtime Node.js відрізняється від середовища виконання JavaScript у браузері.
Як Runtime забезпечує доступ JavaScript до файлової системи, мережі та інших ресурсів операційної системи.

### Шлях
🟢 Core (обов'язково знати)
Що таке Runtime.
З яких компонентів складається Node.js.
Роль V8.
Роль libuv.
Чим Node.js відрізняється від браузера.
Які можливості Runtime додає до JavaScript.
🔵 Junior
Як JavaScript потрапляє до V8.
Як Runtime взаємодіє з операційною системою.
Call Stack.
Event Loop (загальна ідея).
Thread Pool (базове розуміння).
Вбудовані модулі Node.js.
🟠 Middle
Архітектура Node.js.
Взаємодія V8, libuv та Event Loop.
Call Stack та Callback Queue.
Microtasks і Macrotasks.
Thread Pool та його обмеження.
Що відбувається під час запуску програми.
🔴 Senior
Внутрішня архітектура V8.
Garbage Collection.
JIT-компіляція.
Внутрішня реалізація Event Loop.
Архітектура libuv.
Worker Threads.
Child Processes.
Cluster.
Оптимізація Runtime.
Діагностика продуктивності Node.js.

### Міні-шпаргалка
JavaScript файл
        │
        ▼
    Node Runtime
        │
 ┌──────┴────────┐
 │               │
 ▼               ▼
V8            Node APIs
 │               │
 ▼               ▼
Виконує JS   fs, http, path,
             process, os...
        │
        ▼
      libuv
        │
        ▼
   Event Loop
        │
        ▼
 Операційна система

 Node.js ≠ Browser
 | Browser  | Node.js |
| -------- | ------- |
| window   | ❌       |
| document | ❌       |
| DOM      | ❌       |
| fs       | ✅       |
| process  | ✅       |
| path     | ✅       |
| http     | ✅       |


-----------------------------------------------------
## 03-process
Об'єкт process містить інформацію про поточний процес Node.js та надає API для взаємодії з операційною системою: отримання аргументів командного рядка, змінних середовища, поточної директорії, завершення процесу та обробки подій життєвого циклу.

### Ключові поняття
✔ process
✔ Process ID (PID)
✔ process.argv
✔ process.env
✔ process.cwd()
✔ process.exit()
✔ process.exitCode
✔ process.stdin
✔ process.stdout
✔ process.stderr
✔ Signals

### Що потрібно пам'ятати
• process — глобальний об'єкт, його не потрібно імпортувати.
• Один запущений Node.js-додаток = один процес.
• process.argv містить аргументи командного рядка.
• process.env надає доступ до змінних середовища.
• process.cwd() повертає поточну робочу директорію.
• process.exit() завершує процес.
• Для звичайного виводу використовується stdout, для повідомлень про помилки — stderr.

### Основний API
process.argv
process.env
process.cwd()
process.exit()
process.exitCode
process.pid
process.stdin
process.stdout
process.stderr
process.on()

### Де використовується
✔ CLI-застосунки
✔ npm scripts
✔ Конфігурація застосунків
✔ Environment Variables
✔ Сервери
✔ Docker
✔ CI/CD

### Типові помилки
❌ Використовувати process.exit() без необхідності.
❌ Зберігати секрети прямо в коді замість process.env.
❌ Плутати process.cwd() та __dirname.
❌ Змінювати process.env під час роботи програми без потреби.
❌ Не обробляти помилки процесу (uncaughtException, unhandledRejection).

### Питання зі співбесіди
Що таке process?
Для чого використовується process.argv?
Що таке process.env?
Чим відрізняється process.cwd() від __dirname?
Для чого потрібен process.exit()?
Яка різниця між stdout та stderr?

### Шлях
🟢 Core (обов'язково знати)
Що таке process.
Як працює process.argv.
Як отримати змінні середовища через process.env.
Як отримати поточну директорію (process.cwd()).
Як завершити процес (process.exit()).
Для чого потрібні stdin, stdout, stderr.
🔵 Junior
PID процесу (process.pid).
Exit Codes.
Робота зі змінними середовища.
Події процесу (beforeExit, exit).
Обробка сигналів (SIGINT, SIGTERM).
Створення простих CLI-програм.
🟠 Middle
Потоки введення/виведення.
Обробка uncaughtException.
Обробка unhandledRejection.
Graceful Shutdown.
Використання Environment Variables у різних середовищах.
Робота процесу в Docker.
🔴 Senior
Життєвий цикл процесу Node.js.
UNIX Signals.
IPC (Inter-Process Communication).
Взаємодія з Child Processes.
Оптимізація завершення процесу.
Моніторинг процесів.
Memory Usage.
CPU Usage.

### Міні-шпаргалка
// Аргументи командного рядка
process.argv

// Змінні середовища
process.env

// Поточна директорія
process.cwd()

// Завершити процес
process.exit(0)

// Код завершення
process.exitCode = 1

// ID процесу
process.pid

// Вивід
process.stdout.write("Hello")

// Помилки
process.stderr.write("Error")

// Подія завершення
process.on("exit", () => {})

-----------------------------------------------------
## 04-node-globals
Node.js надає набір глобальних змінних, функцій та об'єктів, які доступні в будь-якому модулі без імпорту. Вони допомагають взаємодіяти із середовищем виконання, файлами, таймерами та процесом.

### Ключові поняття
✔ Global Object
✔ global
✔ globalThis
✔ process
✔ console
✔ Buffer
✔ timers
✔ __dirname
✔ __filename
✔ ES Modules

### Що потрібно пам'ятати
• Глобальні об'єкти доступні без import.
• У CommonJS доступні __dirname та __filename.
• В ES Modules __dirname і __filename відсутні — їх потрібно отримувати вручну.
• globalThis — стандартний глобальний об'єкт JavaScript.
• global — специфічний глобальний об'єкт Node.js.
• Buffer використовується для роботи з бінарними даними.
• Таймери (setTimeout, setInterval, setImmediate) є глобальними функціями.

### Основний API
global
globalThis

process

console

Buffer

setTimeout()
setInterval()
setImmediate()

clearTimeout()
clearInterval()
clearImmediate()

__dirname
__filename

### Де використовується
✔ CLI-застосунки
✔ File System
✔ HTTP-сервери
✔ Streams
✔ Buffer
✔ Timers
✔ Logging
✔ Робота зі шляхами

### Типові помилки
❌ Використовувати __dirname в ES Modules.
❌ Плутати global та globalThis.
❌ Створювати власні глобальні змінні.
❌ Зловживати глобальним станом.
❌ Використовувати Buffer там, де достатньо рядків.

### Питання зі співбесіди
Що таке глобальний об'єкт у Node.js?
Що таке global?
Чим global відрізняється від globalThis?
Чому __dirname не працює в ES Modules?
Що таке Buffer?
Які глобальні функції доступні в Node.js?
Що таке глобальний об'єкт і навіщо він існує.
Чому process та console не потрібно імпортувати.
У чому різниця між global і globalThis.
Чому __dirname і __filename працюють у CommonJS, але недоступні в ES Modules.
Коли використовувати Buffer і чим бінарні дані відрізняються від звичайних рядків.
Чому створення власних глобальних змінних вважається поганою практикою.

### Шлях
🟢 Core (обов'язково знати)
Що таке глобальні об'єкти.
Які глобальні змінні є у Node.js.
Як використовувати process.
Як працює console.
Що таке Buffer.
Як отримати шлях до поточного файлу (__dirname, __filename або їх аналоги в ES Modules).
🔵 Junior
global та globalThis.
Таймери.
Робота з Buffer.
Відмінності між CommonJS та ES Modules щодо глобальних змінних.
Чому не варто створювати власні глобальні змінні.
🟠 Middle
Внутрішня реалізація глобального контексту.
Global Scope у Node.js.
Module Scope.
Робота Buffer з потоками.
Особливості глобального контексту в Worker Threads.
Коли використовувати globalThis.
🔴 Senior
Bootstrap процес Node.js.
Як створюються глобальні об'єкти.
Внутрішня реалізація Buffer.
Memory Allocation.
TypedArray та Buffer.
Взаємодія глобального контексту з V8.

### Міні-шпаргалка
// Глобальний процес
process

// Глобальний об'єкт Node.js
global

// Стандартний глобальний об'єкт JavaScript
globalThis

// Поточна директорія (CommonJS)
__dirname

// Поточний файл (CommonJS)
__filename

// Спосіб отримання поточної директорії ES Modules
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Таймери
setTimeout()
setInterval()
setImmediate()

// Консоль
console.log()

// Робота з бінарними даними
Buffer.from()

### Найважливіші глобальні об'єкти
| Об'єкт           | Призначення                            |
| ---------------- | ---------------------------------------|
| `process`        | Інформація про процес Node.js          |
| `console`        | Виведення інформації                   |
| `Buffer`         | Робота з бінарними даними              |
| `global`         | Глобальний об'єкт Node.js              |
| `globalThis`     | Стандартний глобальний об'єкт JS       |
| `setTimeout()`   | Одноразовий таймер                     |
| `setInterval()`  | Періодичний таймер                     |
| `setImmediate()` | Вик після поточної ітерації Event Loop |


-----------------------------------------------------
## 05-npm-and-packagejson


### 


### 


### 


### 


### 


### 


### 


### 


-----------------------------------------------------
## 06-sync-vs-async


### 


### 


### 


### 


### 


### 


### 


### 

-----------------------------------------------------
## 07-cli-notes-app

### 


### 


### 


### 


### 


### 


### 


### 
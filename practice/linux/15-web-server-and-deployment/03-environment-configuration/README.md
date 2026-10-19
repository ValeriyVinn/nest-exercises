# 03. Environment Configuration

Environment Configuration (конфігурація середовища) — це підхід до налаштування застосунку за допомогою змінних оточення, конфігураційних файлів та параметрів запуску.

Конфігурація визначає, як саме застосунок працює в різних середовищах: на локальному комп'ютері розробника, на тестовому сервері або в production.

Наприклад, Node.js-застосунок може використовувати різні налаштування для:

- порту HTTP-сервера;
- адреси бази даних;
- режиму роботи застосунку;
- секретних ключів;
- API-токенів;
- зовнішніх сервісів;
- рівня логування;
- шляхів до файлів;
- параметрів безпеки.

Основні інструменти та поняття:

    environment variables
    environment configuration
    .env
    process.env
    export
    unset
    printenv
    env
    dotenv
    NODE_ENV
    configuration files
    development
    test
    production
    secrets
    configuration validation

---

### Ключові поняття

✔ environment  
✔ environment variable  
✔ environment configuration  
✔ shell environment  
✔ environment variable scope  
✔ `printenv`  
✔ `env`  
✔ `export`  
✔ `unset`  
✔ `echo`  
✔ `process.env`  
✔ `.env`  
✔ `.env.example`  
✔ `.gitignore`  
✔ dotenv  
✔ `NODE_ENV`  
✔ development  
✔ test  
✔ production  
✔ runtime configuration  
✔ configuration files  
✔ configuration validation  
✔ default values  
✔ secrets  
✔ credentials  
✔ API keys  
✔ database connection string  
✔ environment isolation  
✔ least privilege  
✔ configuration precedence  
✔ systemd environment  
✔ persistent environment variables  

---

### Що потрібно пам'ятати

• Environment variables — це змінні оточення, які процес може використовувати для отримання налаштувань.

• `printenv` показує значення змінних оточення.

• `env` показує змінні оточення або запускає команду з додатковими змінними.

• `export` створює змінну оточення для поточного shell та процесів, які він запускає.

• Звичайна shell-змінна без `export` не передається автоматично дочірнім процесам.

• `unset` видаляє змінну з поточного shell environment.

• `process.env` у Node.js дозволяє читати змінні оточення.

• Значення змінних оточення, отриманих через `process.env`, зазвичай представлені рядками.

• Файл `.env` — це поширений формат зберігання локальних налаштувань. Сам по собі Node.js не завантажує його автоматично в усіх конфігураціях.

• `dotenv` — пакет Node.js, який дозволяє завантажувати змінні з `.env` у `process.env`.

• `.env` із секретами не потрібно додавати до Git.

• `.env.example` можна використовувати як шаблон необхідних змінних без реальних секретних значень.

• `NODE_ENV` часто використовують для позначення режиму роботи Node.js-застосунку, але це звичайна змінна оточення, а не спеціальний механізм Linux.

• Development, test і production можуть використовувати різні конфігурації.

• Environment variables не є повноцінним захищеним сховищем секретів.

• Конфігурацію потрібно перевіряти під час запуску застосунку, щоб уникнути помилок через відсутні або неправильні значення.

• Змінні, встановлені через `export` у терміналі, зазвичай діють лише в поточному shell і його дочірніх процесах.

• Змінні оточення інтерактивного термінала не обов'язково доступні службам `systemd`.

---

# Environment

Environment — це середовище, у якому виконується програма.

У Linux програма запускається як процес. Процес може отримувати параметри запуску, поточний робочий каталог, файлові дескриптори та environment variables.

Наприклад:

    node server.js

Під час запуску Node.js отримує environment свого батьківського процесу.

Якщо перед запуском встановити змінну:

    export PORT=3000

то Node.js зможе прочитати її через:

    process.env.PORT

Приклад:

    console.log(process.env.PORT);

Результат:

    3000

Environment variables часто використовують для передавання конфігурації без зміни вихідного коду програми.

---

# Environment Variables

Environment variable — змінна оточення, яка передається процесу під час його запуску або формується іншим способом.

Приклади типових змінних Linux:

    HOME
    USER
    PATH
    SHELL
    LANG
    PWD

Подивитися окреме значення:

    echo "$HOME"

    echo "$USER"

    echo "$PATH"

Або:

    printenv HOME

    printenv USER

Приклад результату:

    /home/valer

Значення залежать від користувача та налаштувань системи.

---

# printenv

`printenv` показує змінні оточення.

Показати всі змінні:

    printenv

Показати одну змінну:

    printenv HOME

Показати кілька змінних:

    printenv HOME USER SHELL

Якщо змінна не існує, команда не виведе її значення.

Наприклад:

    printenv APP_PORT

Якщо `APP_PORT` не встановлена, результат буде порожнім.

Перевірити код завершення:

    printenv APP_PORT

    echo $?

Код `0` зазвичай означає, що змінну знайдено. Ненульовий код означає, що змінну не знайдено або сталася інша помилка.

Важливо:

    printenv → показує environment variables

`printenv` не показує всі звичайні shell-змінні, які не були експортовані.

---

# env

`env` дозволяє переглядати environment variables та запускати команди з певними змінними оточення.

Показати змінні:

    env

Запустити команду з додатковою змінною:

    env APP_MODE=development node -e 'console.log(process.env.APP_MODE)'

Результат:

    development

У цьому прикладі `APP_MODE` передається процесу Node.js лише для цього запуску.

Можна встановити кілька змінних:

    env APP_MODE=development PORT=3000 node server.js

Ці змінні доступні процесу `node` та його дочірнім процесам, якщо їх не видалити з environment.

Важливо:

    env VAR=value command

не обов'язково змінює environment поточного shell.

---

# export

`export` робить shell-змінну доступною як змінну оточення для дочірніх процесів.

Створити змінну:

    APP_MODE=development

Це звичайна shell-змінна.

Перевірити її значення:

    echo "$APP_MODE"

Але інша програма не обов'язково отримає цю змінну через environment.

Експортувати змінну:

    export APP_MODE=development

Тепер її можна прочитати в дочірньому процесі.

Наприклад:

    export APP_MODE=development

    node -e 'console.log(process.env.APP_MODE)'

Результат:

    development

Можна експортувати вже створену змінну:

    APP_PORT=3000

    export APP_PORT

Перевірити:

    printenv APP_PORT

Результат:

    3000

---

# Shell Variable vs Environment Variable

Це важлива відмінність.

Звичайна shell-змінна:

    APP_MODE=development

Змінна оточення:

    export APP_MODE=development

Перевірити звичайну shell-змінну:

    echo "$APP_MODE"

Перевірити environment variable:

    printenv APP_MODE

Без `export` перша команда може вивести значення, а друга — нічого.

Приклад:

    APP_MODE=development

    echo "$APP_MODE"

    printenv APP_MODE

Можливий результат:

    development

    # printenv не виведе APP_MODE

Тепер:

    export APP_MODE

    printenv APP_MODE

Результат:

    development

Головна різниця:

    shell variable
        ↓
    доступна в поточному shell

    environment variable
        ↓
    доступна в environment процесу
        ↓
    передається дочірнім процесам

---

# unset

`unset` видаляє змінну з поточного shell.

Приклад:

    export APP_MODE=development

    printenv APP_MODE

Видалити змінну:

    unset APP_MODE

Перевірити:

    printenv APP_MODE

Значення більше не буде доступним у поточному shell environment.

Важливо:

    unset APP_MODE

не змінює автоматично змінні в інших процесах, які вже запущені.

Також `unset` не видаляє значення з файлу `.env`, конфігурації `systemd` або інших джерел.

---

# Temporary Environment Variables

Змінну можна передати лише для одного запуску команди.

Наприклад:

    APP_MODE=development node server.js

Або:

    PORT=3000 node server.js

Також можна використати `env`:

    env PORT=3000 node server.js

Переваги:

- не потрібно змінювати код;
- не потрібно постійно змінювати environment shell;
- зручно тестувати різні налаштування;
- можна швидко перевіряти поведінку застосунку.

Приклад:

    APP_MODE=development node server.js

    APP_MODE=production node server.js

Це два окремі запуски з різними значеннями змінної.

---

# Persistent Environment Variables

Змінні, встановлені через `export` у терміналі, зазвичай існують лише протягом життя поточного shell.

Наприклад:

    export APP_MODE=development

Після закриття термінала змінна зазвичай зникає.

Щоб зробити налаштування доступним у наступних інтерактивних сесіях, можна використовувати конфігураційні файли shell.

Для Bash поширені:

    ~/.bashrc
    ~/.profile

Приклад у `~/.bashrc`:

    export APP_MODE=development

Застосувати зміни в поточному shell:

    source ~/.bashrc

Або:

    . ~/.bashrc

Перевірити:

    printenv APP_MODE

Важливо:

- `~/.bashrc` зазвичай використовується інтерактивним Bash.
- `~/.profile` зазвичай використовується під час входу в систему через login shell.
- Конкретна поведінка залежить від способу запуску shell.
- Змінні з цих файлів не стають автоматично доступними для всіх служб Linux.

Не варто зберігати секрети в shell-файлах без розуміння їхніх прав доступу та способу використання.

---

# PATH

`PATH` — змінна оточення, яка містить список каталогів, у яких shell шукає виконувані команди.

Переглянути:

    echo "$PATH"

Приклад:

    /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

Каталоги розділяються двокрапкою `:`.

Коли ти запускаєш:

    node --version

shell шукає виконуваний файл `node` у каталогах із `PATH`.

Перевірити розташування команди:

    command -v node

Додати каталог до `PATH` для поточного shell:

    export PATH="$HOME/bin:$PATH"

Це додає `~/bin` на початок списку.

Важливо:

    PATH

не є шляхом до одного файлу. Це список каталогів для пошуку команд.

Не перезаписуй `PATH` без потреби:

    export PATH="$HOME/bin"

Так можна втратити доступ до багатьох стандартних команд, якщо потрібні каталоги більше не входять до списку.

---

# Environment Variables у Node.js

У Node.js змінні оточення доступні через об'єкт:

    process.env

Приклад:

    console.log(process.env.PORT);

    console.log(process.env.NODE_ENV);

    console.log(process.env.DATABASE_URL);

Якщо змінну не встановлено, її значення зазвичай буде:

    undefined

Наприклад:

    const port = process.env.PORT;

    console.log(port);

Важливо пам'ятати:

    process.env.PORT

зазвичай повертає рядок, а не число.

Приклад:

    process.env.PORT = "3000";

    console.log(typeof process.env.PORT);

Результат:

    string

Якщо порт потрібен як число:

    const port = Number(process.env.PORT ?? 3000);

Проте перетворення типу саме по собі не гарантує коректності значення. Для надійного застосунку потрібна валідація.

Наприклад:

    const rawPort = process.env.PORT ?? "3000";
    const port = Number(rawPort);

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("PORT must be a valid TCP port");
    }

    console.log(port);

Тут перевіряється, що порт є цілим числом у допустимому діапазоні TCP/UDP-портів.

---

# Configuration vs Source Code

Конфігурацію бажано відокремлювати від бізнес-логіки.

Не рекомендується жорстко записувати значення, які змінюються між середовищами, безпосередньо в коді.

Наприклад:

    const port = 3000;

Це прийнятно для невеликої навчальної програми, але може бути незручно для застосунку, який запускається на різних серверах.

Гнучкіший підхід:

    const port = Number(process.env.PORT ?? 3000);

Тепер порт можна змінювати без редагування вихідного коду.

При запуску:

    PORT=4000 node server.js

застосунок використовуватиме порт `4000`, якщо решта конфігурації та код сервера це дозволяють.

---

# .env

`.env` — текстовий файл, який часто використовують для зберігання локальних конфігураційних значень.

Приклад:

    PORT=3000
    NODE_ENV=development
    DATABASE_URL=postgresql://localhost:5432/lms

Типовий формат:

    VARIABLE_NAME=value

У `.env` можуть зберігатися:

    PORT
    NODE_ENV
    DATABASE_URL
    API_BASE_URL
    LOG_LEVEL

Якщо значення містить пробіли або спеціальні символи, формат обробки залежить від реалізації dotenv-парсера.

Приклад:

    APP_NAME="Learning Management System"

Важливо:

`.env` не є універсальним системним файлом Linux. Це домовленість, яку підтримують різні інструменти та бібліотеки.

Linux не завантажує `.env` автоматично для кожного процесу.

Node.js також не повинен вважатися автоматично налаштованим на читання `.env` у кожному проєкті.

---

# .env та export

Це два різні способи передавання конфігурації.

Через shell:

    export PORT=3000

    node server.js

Через одноразове встановлення:

    PORT=3000 node server.js

Через `.env`:

    PORT=3000

Але наявність `.env` сама по собі не робить змінну доступною в `process.env`.

Для цього застосунок повинен завантажити файл через відповідний механізм.

---

# dotenv

`dotenv` — пакет Node.js для завантаження змінних із `.env` у `process.env`.

У проєкті з `package.json` встановити пакет:

    npm install dotenv

Приклад `.env`:

    PORT=3000
    NODE_ENV=development

У файлі `server.js`:

    import "dotenv/config";

    const port = Number(process.env.PORT ?? 3000);

    console.log(`Port: ${port}`);

Запустити:

    node server.js

Результат:

    Port: 3000

Для цього прикладу використовується ES modules, тому в `package.json` має бути налаштовано відповідний режим, наприклад:

    {
        "type": "module"
    }

Або можна завантажити dotenv явно:

    import dotenv from "dotenv";

    dotenv.config();

    console.log(process.env.PORT);

Важливо:

- Завантаження конфігурації має відбутися до читання відповідних змінних.
- Змінні, вже встановлені в environment процесу, за стандартної конфігурації dotenv мають пріоритет над значеннями з `.env`.
- `.env` не повинен містити значення, які необхідно розкривати публічно.
- Для production часто краще передавати конфігурацію через середовище запуску або спеціалізоване сховище секретів.

---

# .env.example

`.env.example` — шаблон конфігурації, який показує, які змінні потрібні застосунку.

Приклад:

    PORT=3000
    NODE_ENV=development
    DATABASE_URL=
    API_KEY=

У репозиторії можна зберігати:

    .env.example

А реальні локальні налаштування тримати у:

    .env

Переваги:

- розробник бачить перелік необхідних змінних;
- легше налаштувати нове середовище;
- секрети не потрібно публікувати;
- конфігурацію простіше документувати.

Не записуй реальні паролі або API-ключі в `.env.example`.

---

# .gitignore та .env

Файл `.gitignore` визначає, які файли Git повинен ігнорувати.

Для Node.js-проєкту можна використати:

    node_modules/
    .env
    .env.local
    .env.production
    .env.*.local

За потреби конкретні шаблони потрібно адаптувати до структури проєкту.

Якщо потрібно зберігати шаблон конфігурації:

    !.env.example

Перевірити статус Git:

    git status

Якщо `.env` вже відстежується Git, додавання до `.gitignore` не припинить його відстеження автоматично.

Припинити відстежувати файл, залишивши його локально:

    git rm --cached .env

Після цього потрібно створити коміт відповідної зміни.

Важливо:

Якщо секрет уже потрапив до GitHub, недостатньо лише додати `.env` до `.gitignore`. Секрет потрібно відкликати або замінити, а за потреби — очистити історію репозиторію.

---

# NODE_ENV

`NODE_ENV` — поширена змінна оточення в екосистемі Node.js.

Зазвичай використовують такі значення:

    development
    test
    production

Приклади:

    NODE_ENV=development node server.js

    NODE_ENV=production node server.js

У Node.js можна перевірити:

    if (process.env.NODE_ENV === "production") {
        console.log("Production mode");
    } else {
        console.log("Non-production mode");
    }

Важливо:

- `NODE_ENV` не є спеціальною змінною ядра Linux.
- Це звичайна змінна оточення, яку використовують Node.js-застосунки та інструменти.
- Значення не встановлюється автоматично однаково в усіх середовищах.
- `NODE_ENV` не замінює окрему конфігурацію бази даних, секретів або портів.

Не варто використовувати будь-яке значення `NODE_ENV` без чіткого розуміння його впливу на застосунок.

---

# Development, Test, Production

Застосунок часто працює в кількох середовищах.

## Development

Development — середовище локальної розробки.

Типові особливості:

    NODE_ENV=development
    PORT=3000

Може використовуватися локальна база даних, докладні повідомлення про помилки та автоматичне перезавантаження сервера.

## Test

Test — середовище автоматизованого тестування.

Типові особливості:

    NODE_ENV=test

Зазвичай використовують окрему тестову базу даних або ізольовані тестові ресурси.

Тестування не повинно випадково змінювати production-дані.

## Production

Production — середовище реального використання застосунку.

Типові особливості:

    NODE_ENV=production

Зазвичай потрібні:

- захист секретів;
- контроль доступу;
- коректна обробка помилок;
- структуроване логування;
- перевірка конфігурації;
- резервне копіювання важливих даних;
- моніторинг працездатності.

Важливо:

Різні середовища можуть мати однаковий код, але різні конфігураційні значення.

---

# Configuration Files

Не всі налаштування зберігаються у змінних оточення.

Linux використовує конфігураційні файли для різних компонентів системи.

Приклади:

    /etc/ssh/sshd_config
    /etc/nginx/nginx.conf
    /etc/environment
    ~/.bashrc

Ці файли мають різне призначення.

## /etc/environment

Використовується деякими механізмами входу в систему для встановлення системних змінних оточення.

Це не звичайний Bash-скрипт.

Не слід бездумно використовувати в ньому синтаксис команд Bash або підстановки змінних.

Приклад простого запису:

    APP_MODE=production

Точна доступність змінних залежить від механізму входу та конфігурації системи.

## ~/.bashrc

Файл конфігурації інтерактивного Bash.

Може містити:

    export APP_MODE=development

Зазвичай використовується для налаштування інтерактивної оболонки, а не як універсальне джерело конфігурації production-сервісів.

## /etc/nginx/nginx.conf

Основний конфігураційний файл Nginx у типових Linux-інсталяціях.

Містить налаштування вебсервера, а не звичайний список environment variables.

---

# Configuration Precedence

Configuration precedence — порядок пріоритетності джерел конфігурації.

Наприклад, застосунок може використовувати:

    1. environment variables
    2. .env file
    3. default values in code

Це лише один можливий порядок. Його визначає архітектура конкретного застосунку.

У багатьох випадках значення, передане процесу ззовні, повинно мати пріоритет над локальним значенням за замовчуванням.

Наприклад:

    const port = Number(process.env.PORT ?? 3000);

Тут:

    process.env.PORT → основне значення
    3000             → fallback

Оператор `??` використовує значення праворуч лише тоді, коли ліворуч `null` або `undefined`.

Важливо:

    process.env.PORT || "3000"

і

    process.env.PORT ?? "3000"

не завжди поводяться однаково.

Оператор `||` також використовує fallback для порожнього рядка, тоді як `??` — ні.

Тому конфігурацію потрібно не лише читати, а й перевіряти.

---

# Default Values

Default value — значення за замовчуванням, яке застосовується, коли конфігурацію не передано.

Наприклад:

    const port = process.env.PORT ?? "3000";

Тут `"3000"` є fallback.

Для простих навчальних застосунків це зручно.

Але для критичних налаштувань, наприклад секретного ключа або адреси production-бази даних, безпечніше вимагати явного значення.

Приклад:

    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw new Error("DATABASE_URL is required");
    }

Так застосунок завершиться з помилкою під час запуску, замість того щоб працювати з некоректною конфігурацією.

---

# Configuration Validation

Configuration validation — перевірка конфігурації перед початком роботи програми.

Потрібно перевіряти:

- наявність обов'язкових змінних;
- правильність числових значень;
- допустимі режими роботи;
- формат URL;
- відповідність налаштувань очікуваним типам;
- взаємну сумісність параметрів.

Приклад:

    const portValue = process.env.PORT ?? "3000";
    const port = Number(portValue);

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("Invalid PORT configuration");
    }

    const nodeEnv = process.env.NODE_ENV ?? "development";

    const allowedEnvironments = [
        "development",
        "test",
        "production"
    ];

    if (!allowedEnvironments.includes(nodeEnv)) {
        throw new Error("Invalid NODE_ENV configuration");
    }

Тепер застосунок перевіряє порт і режим роботи перед використанням.

Для більших застосунків перевірку можна винести в окремий модуль:

    src/
        config/
            env.js

Точна структура залежить від архітектури проєкту.

---

# Secrets

Secrets — конфіденційні значення, які надають доступ до ресурсів або дозволяють виконувати привілейовані операції.

Приклади:

    DATABASE_URL
    DATABASE_PASSWORD
    API_KEY
    JWT_SECRET
    ACCESS_TOKEN
    PRIVATE_KEY

Такі значення потрібно захищати від несанкціонованого доступу.

Не рекомендується:

    const password = "my-real-password";

Також не рекомендується:

    console.log(process.env.DATABASE_URL);

Оскільки рядок підключення може містити ім'я користувача, пароль та інші конфіденційні параметри.

Краще:

- зберігати локальні секрети поза Git;
- використовувати environment variables або спеціалізовані secret managers;
- обмежувати права доступу;
- не записувати секрети в логи;
- регулярно замінювати скомпрометовані ключі;
- використовувати окремі секрети для різних середовищ.

Важливо:

Environment variables зручні для конфігурації, але не гарантують абсолютної конфіденційності. Доступ до них може отримати користувач або процес із відповідними правами.

---

# Database Configuration

Node.js-застосунку часто потрібна конфігурація PostgreSQL.

Наприклад, змінна:

    DATABASE_URL

може містити рядок підключення:

    postgresql://username:password@localhost:5432/lms

Це лише приклад формату. Не використовуй справжній пароль у навчальній шпаргалці або публічному репозиторії.

У Node.js:

    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw new Error("DATABASE_URL is required");
    }

Для PostgreSQL клієнта можна використовувати окремі параметри:

    PGHOST=localhost
    PGPORT=5432
    PGDATABASE=lms
    PGUSER=app_user
    PGPASSWORD=secret

Конкретний спосіб налаштування залежить від PostgreSQL-клієнта або бібліотеки.

Важливо:

- не використовуй production-паролі в локальних навчальних прикладах;
- не передавай конфіденційні значення в командному рядку, якщо вони можуть потрапити до історії shell або списку процесів;
- надавай користувачеві бази даних лише необхідні права;
- для тестів використовуй окрему базу даних.

---

# systemd Environment

`systemd` керує багатьма системними службами Linux.

Node.js-застосунок можна запускати як systemd service.

Environment variables для служби можна визначати в unit-файлі або окремому environment-файлі.

Приклад unit-файлу:

    [Unit]
    Description=Node.js Application
    After=network.target

    [Service]
    Type=simple
    User=appuser
    WorkingDirectory=/opt/my-app
    ExecStart=/usr/bin/node /opt/my-app/server.js
    Environment=NODE_ENV=production
    Environment=PORT=3000
    Restart=on-failure

    [Install]
    WantedBy=multi-user.target

Це спрощений навчальний приклад. Перед використанням потрібно перевірити шляхи, користувача, права доступу та залежності служби.

Переглянути статус служби:

    sudo systemctl status my-app

Переглянути логи:

    sudo journalctl -u my-app

Після зміни unit-файлу:

    sudo systemctl daemon-reload

Перезапустити службу:

    sudo systemctl restart my-app

Важливо:

Змінні, експортовані в інтерактивному терміналі, не стають автоматично доступними для служби `systemd`.

Служба запускається з environment, який визначається її конфігурацією та системним менеджером.

---

# Environment Files у systemd

У `systemd` можна використати директиву `EnvironmentFile`.

Приклад:

    [Service]
    User=appuser
    WorkingDirectory=/opt/my-app
    ExecStart=/usr/bin/node /opt/my-app/server.js
    EnvironmentFile=/etc/my-app/my-app.env
    Restart=on-failure

Файл `/etc/my-app/my-app.env` може містити:

    NODE_ENV=production
    PORT=3000

Це приклад формату environment-файлу для `systemd`, а не повноцінний файл `.env` для `dotenv`.

Формат, підтримуваний `systemd`, має власні правила. Не варто припускати, що будь-який файл `.env` можна використовувати без перевірки.

Для секретних значень потрібно обмежити доступ до файлу.

Наприклад, для спеціального конфігураційного файлу можна встановити права:

    sudo chown root:root /etc/my-app/my-app.env
    sudo chmod 600 /etc/my-app/my-app.env

Це обмежує доступ до файлу користувачем `root`. Потрібно враховувати, як саме служба отримує конфігурацію та які права необхідні для роботи.

---

# Перевірка Environment у Linux

Під час діагностики можна перевірити:

    printenv

    env

    echo "$HOME"

    echo "$PATH"

    printenv NODE_ENV

Перевірити змінну без її виведення:

    if printenv DATABASE_URL > /dev/null; then
        echo "DATABASE_URL is set"
    else
        echo "DATABASE_URL is not set"
    fi

Цей шаблон перевіряє наявність змінної, не виводячи її значення.

Не варто бездумно використовувати:

    env

на спільному терміналі, у звітах або під час демонстрації екрана, оскільки environment може містити секрети.

---

# Environment та Permissions

Файл із конфігурацією може містити конфіденційні значення.

Переглянути права:

    ls -l .env

Обмежити доступ до локального `.env`:

    chmod 600 .env

Зазвичай це означає:

    owner → read + write
    group → no access
    others → no access

Перевірити:

    stat .env

Важливо:

- `chmod 600` не захищає файл від користувача, який має права `root`.
- Права доступу до каталогу також впливають на можливість читання файлу.
- Якщо секрет скопійовано в інше місце, захист оригінального файлу не захищає копію.
- Не потрібно застосовувати права `600` до кожного конфігураційного файлу автоматично: усе залежить від його призначення та власника.

---

# Environment Isolation

Environment isolation — розділення конфігурації та ресурсів між середовищами.

Наприклад:

    development → localhost database
    test        → test database
    production  → production database

Розділення допомагає уникнути ситуацій, коли:

- тест випадково видаляє production-дані;
- локальний застосунок підключається до production;
- тестові API-ключі використовуються в production;
- production-сервіс використовує неправильний порт;
- секрети різних середовищ змішуються.

Приклад конфігурації:

    # Development
    NODE_ENV=development
    PORT=3000

    # Production
    NODE_ENV=production
    PORT=8080

Це лише ілюстрація. Реальні значення визначаються інфраструктурою та конфігурацією сервера.

---

# Environment Configuration та Deployment

Під час розгортання Node.js-застосунку потрібно переконатися, що:

    1. Встановлено необхідну версію Node.js.
    2. Встановлено залежності.
    3. Визначено робочий каталог.
    4. Передано необхідні environment variables.
    5. Перевірено конфігурацію бази даних.
    6. Застосунок має потрібні права доступу.
    7. Налаштовано запуск процесу.
    8. Перевірено логи.
    9. Перевірено мережеву доступність.
    10. Секрети не потрапляють до Git.

Для перевірки версії Node.js:

    node --version

Для перевірки npm:

    npm --version

Для перевірки конфігурації перед запуском:

    printenv NODE_ENV
    printenv PORT

Не виводь секрети, наприклад `DATABASE_URL`, якщо вони містять пароль.

---

# Practical Example — Node.js Configuration

Структура навчального проєкту:

    my-app/
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── package.json
    └── server.js

Файл `.env`:

    PORT=3000
    NODE_ENV=development

Файл `.env.example`:

    PORT=3000
    NODE_ENV=development
    DATABASE_URL=

Файл `.gitignore`:

    node_modules/
    .env
    .env.local
    .env.production

Файл `package.json`:

    {
        "type": "module",
        "scripts": {
            "start": "node server.js"
        }
    }

Встановити dotenv:

    npm install dotenv

Файл `server.js`:

    import "dotenv/config";

    const portValue = process.env.PORT ?? "3000";
    const port = Number(portValue);

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("Invalid PORT");
    }

    const nodeEnv = process.env.NODE_ENV ?? "development";

    console.log(`Environment: ${nodeEnv}`);
    console.log(`Port: ${port}`);

Запустити:

    npm start

Очікуваний результат:

    Environment: development
    Port: 3000

Перевірити альтернативний порт без зміни `.env`:

    PORT=4000 npm start

За умови, що зовнішню змінну передано процесу, результат буде:

    Environment: development
    Port: 4000

Значення `PORT=4000`, передане процесу ззовні, має пріоритет над значенням `PORT=3000` у `.env` за стандартної поведінки `dotenv`.

---

# Practical Example — Configuration Module

У більших Node.js-застосунках зручно винести конфігурацію в окремий модуль.

Структура:

    src/
    ├── config/
    │   └── env.js
    └── server.js

Файл `src/config/env.js`:

    const portValue = process.env.PORT ?? "3000";
    const port = Number(portValue);

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("Invalid PORT");
    }

    const nodeEnv = process.env.NODE_ENV ?? "development";

    const allowedEnvironments = [
        "development",
        "test",
        "production"
    ];

    if (!allowedEnvironments.includes(nodeEnv)) {
        throw new Error("Invalid NODE_ENV");
    }

    export const config = {
        port,
        nodeEnv
    };

Файл `src/server.js`:

    import "dotenv/config";
    import { config } from "./config/env.js";

    console.log(`Environment: ${config.nodeEnv}`);
    console.log(`Port: ${config.port}`);

Важливо:

`dotenv/config` потрібно завантажити до того, як модуль конфігурації прочитає `process.env`. У цьому прикладі статичні імпорти спочатку завантажують залежності, а потім виконують тіло модуля `server.js`; імпорт dotenv у цьому модулі ініціалізує environment до використання `config` у тілі `server.js`.

---

# Practical Example — Перевірка обов'язкової змінної

Припустімо, застосунок потребує `DATABASE_URL`.

Приклад:

    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw new Error("DATABASE_URL is required");
    }

    console.log("Database configuration is available");

Тепер програма не продовжить роботу, якщо змінну не встановлено.

Не потрібно виводити реальний рядок підключення в лог.

Перевірити змінну перед запуском можна так:

    if [ -n "$DATABASE_URL" ]; then
        echo "DATABASE_URL is set"
    else
        echo "DATABASE_URL is not set"
    fi

Це приклад Bash.

---

# Practical Example — Тимчасове середовище

Передати значення тільки одній команді:

    APP_MODE=development node -e 'console.log(process.env.APP_MODE)'

Результат:

    development

Перевірити, чи змінилося environment поточного shell:

    printenv APP_MODE

Якщо змінну не було встановлено раніше, ця команда нічого не виведе.

Інший варіант:

    export APP_MODE=development

    node -e 'console.log(process.env.APP_MODE)'

Тепер змінна доступна дочірньому процесу Node.js.

---

# Типові помилки

❌ **Плутати shell-змінну та environment variable.**

    APP_MODE=development

Це створює shell-змінну.

Щоб передати її дочірнім процесам:

    export APP_MODE=development

---

❌ **Очікувати, що Linux автоматично читає `.env`.**

Файл `.env` сам по собі не стає environment процесу.

Потрібен відповідний механізм завантаження, наприклад `dotenv`, або налаштування середовища запуску.

---

❌ **Комітити секрети до Git.**

Не потрібно додавати до репозиторію реальні `.env` із паролями та API-ключами.

Використовуй:

    .gitignore
    .env.example

Якщо секрет уже опубліковано, його потрібно замінити або відкликати.

---

❌ **Вважати `process.env.PORT` числом.**

    const port = process.env.PORT;

Значення зазвичай є рядком.

Якщо потрібне число:

    const port = Number(process.env.PORT ?? "3000");

Додатково перевіряй допустимість значення.

---

❌ **Використовувати fallback для обов'язкових секретів.**

Небезпечний підхід:

    const jwtSecret = process.env.JWT_SECRET ?? "secret";

Якщо production-застосунок забуде передати справжній ключ, він може запуститися з передбачуваним секретом.

Краще:

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error("JWT_SECRET is required");
    }

---

❌ **Очікувати, що `export` зберігається після перезапуску термінала.**

    export APP_MODE=development

Змінна зазвичай діє лише в поточному shell та його дочірніх процесах.

Для постійних налаштувань потрібне відповідне джерело конфігурації.

---

❌ **Очікувати, що `systemd` успадкує змінні інтерактивного термінала.**

Служба має власне середовище запуску.

Налаштовуй змінні через `Environment`, `EnvironmentFile` або інший відповідний механізм.

---

❌ **Вважати `.env` і `EnvironmentFile` повністю взаємозамінними.**

Вони можуть мати різні правила синтаксису та обробки значень.

Перевіряй документацію конкретного інструмента.

---

❌ **Виводити секрети в лог.**

Не використовуй:

    console.log(process.env.DATABASE_URL);

Якщо рядок містить пароль, він може потрапити до логів і стати доступним іншим користувачам.

---

❌ **Не перевіряти конфігурацію на старті.**

Відсутній порт, неправильний URL або відсутній секрет можуть спричинити помилки вже під час обробки запитів.

Перевіряй необхідні значення до початку роботи сервера.

---

❌ **Використовувати production-базу даних для навчальних тестів.**

Застосовуй окремі конфігурації та ізольовані ресурси для development, test і production.

---

# Питання зі співбесіди

Що таке environment variable?

Чим shell variable відрізняється від environment variable?

Що робить команда `export`?

Для чого використовується `printenv`?

Чим `env` відрізняється від `printenv`?

Що робить команда `unset`?

Що таке `PATH`?

Як додати каталог до `PATH`?

Що таке environment configuration?

Для чого використовуються змінні оточення в Node.js?

Що таке `process.env`?

Який тип значень зазвичай повертає `process.env`?

Що таке `.env`?

Чи читає Linux файл `.env` автоматично?

Що таке `dotenv`?

Як завантажити `.env` у Node.js?

Для чого потрібен `.env.example`?

Чому `.env` зазвичай додають до `.gitignore`?

Що робити, якщо секрет уже потрапив до GitHub?

Що таке `NODE_ENV`?

Чим відрізняються development, test і production?

Що таке configuration validation?

Для чого потрібні default values?

Чому не всі конфігураційні значення варто задавати за замовчуванням?

Що таке secrets?

Чому environment variables не гарантують абсолютного захисту секретів?

Як передати змінну лише для одного запуску команди?

Як зробити змінну доступною в поточному shell і дочірніх процесах?

Чому змінні з термінала не завжди доступні службам `systemd`?

Для чого використовуються `Environment` і `EnvironmentFile`?

Як перевірити, чи встановлено обов'язкову змінну, не показуючи її значення?

Чому важливо розділяти конфігурації development, test і production?

Як передати конфігурацію PostgreSQL у Node.js?

Як обмежити доступ до файлу з конфіденційними значеннями?

Що таке configuration precedence?

Чому застосунок повинен перевіряти конфігурацію перед запуском?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке environment.

Що таке environment variable.

Різниця між shell variable та environment variable.

`echo`.

`printenv`.

`env`.

`export`.

`unset`.

`PATH`.

Передавання змінної для одного запуску команди.

`process.env`.

Розуміння, що значення `process.env` зазвичай є рядками.

Призначення `.env`.

Призначення `.env.example`.

Основи `.gitignore`.

Основи `NODE_ENV`.

Development vs production.

Розуміння секретів.

---

## 🔵 Junior

Налаштування environment variables для Node.js.

Використання `dotenv`.

Перевірка обов'язкових змінних.

Перетворення рядків на числа.

Перевірка значення `PORT`.

Configuration validation.

Default values.

Configuration precedence.

Відокремлення конфігурації від бізнес-логіки.

Підключення PostgreSQL через environment variables.

Захист `.env`.

Права доступу до конфігураційних файлів.

Розділення development, test і production.

Основи конфігурації `systemd`-служби.

Основи `Environment` та `EnvironmentFile`.

---

## 🟠 Middle

Централізований конфігураційний модуль.

Схемна валідація конфігурації.

Безпечне керування секретами.

Secret managers.

Ізоляція середовищ.

Конфігурація для CI/CD.

Автоматична перевірка конфігурації під час deployment.

Розділення конфігурації та коду.

Конфігурація кількох сервісів.

Безпечне оновлення секретів.

Контроль доступу до конфігурації.

Налаштування environment для `systemd`.

Діагностика конфігураційних помилок.

Управління конфігурацією без витоку секретів у логи.

---

## 🔴 Senior

Configuration architecture.

Centralized configuration management.

Secrets lifecycle management.

Secret rotation.

Least privilege.

Immutable deployment configuration.

Configuration drift.

Environment parity.

Runtime configuration vs build-time configuration.

Configuration versioning.

Secure secret delivery.

Multi-environment deployment strategies.

Zero-downtime configuration updates.

Configuration observability.

Auditing configuration changes.

Failure handling при неправильній конфігурації.

Розподілена конфігурація мікросервісів.

Trade-offs між environment variables, конфігураційними файлами та secret managers.

---

# Міні-шпаргалка

## Environment variable

    export APP_MODE=development

Створює змінну оточення для поточного shell і дочірніх процесів.

---

## printenv

    printenv HOME

Показує значення змінної оточення.

---

## env

    env APP_MODE=development node server.js

Запускає команду з додатковою змінною оточення.

---

## unset

    unset APP_MODE

Видаляє змінну з поточного shell environment.

---

## Temporary variable

    PORT=3000 node server.js

Передає значення для одного запуску команди.

---

## PATH

    export PATH="$HOME/bin:$PATH"

Додає каталог до списку каталогів пошуку команд.

---

## Node.js

    process.env.PORT

Читає значення змінної оточення.

---

## dotenv

    import "dotenv/config";

Завантажує `.env` у `process.env`, якщо встановлено пакет `dotenv` і файл доступний.

---

## .gitignore

    .env
    .env.local

Ігнорує відповідні файли, якщо вони ще не відстежуються Git.

---

## NODE_ENV

    NODE_ENV=production node server.js

Передає застосунку режим роботи.

---

## Configuration validation

    const port = Number(process.env.PORT ?? "3000");

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("Invalid PORT");
    }

Перевіряє, що порт має допустиме числове значення.

---

## systemd

    Environment=NODE_ENV=production
    Environment=PORT=3000

Задає environment variables для служби в unit-файлі.

---

## Основні правила

    printenv  → переглянути environment variable
    env       → переглянути або сформувати environment для команди
    export    → передати змінну дочірнім процесам
    unset     → видалити змінну з поточного shell
    PATH      → каталоги пошуку команд
    .env      → файл конфігурації, який потрібно завантажити
    dotenv    → завантаження .env у Node.js
    process.env → читання environment у Node.js
    NODE_ENV  → поширене позначення режиму Node.js
    .gitignore → правила ігнорування файлів у Git
    systemd   → керування environment системних служб

---

# Головне

• Environment configuration дозволяє налаштовувати застосунок без зміни його вихідного коду.

• Environment variables передають параметри процесам під час запуску.

• `export` робить shell-змінну доступною для дочірніх процесів.

• `printenv` показує змінні оточення, а `env` також дозволяє запускати команди з певним environment.

• `PATH` визначає каталоги, у яких shell шукає виконувані команди.

• `process.env` дозволяє Node.js отримувати конфігурацію з environment.

• Значення `process.env` зазвичай є рядками, тому числа та інші типи потрібно перетворювати й перевіряти.

• `.env` — поширений формат локальної конфігурації, але його вміст не завантажується автоматично в кожному середовищі.

• `dotenv` дозволяє завантажувати `.env` у `process.env`.

• `.env` із секретами не потрібно комітити до Git.

• `.env.example` допомагає документувати потрібні змінні без публікації реальних секретів.

• `NODE_ENV` часто використовують для позначення development, test або production.

• Конфігурацію потрібно перевіряти перед запуском застосунку.

• Для обов'язкових секретів не слід використовувати передбачувані значення за замовчуванням.

• Змінні інтерактивного shell не стають автоматично доступними для всіх системних служб.

• `systemd` дозволяє передавати конфігурацію через `Environment` і `EnvironmentFile`.

• Конфігураційні файли та environment variables необхідно захищати відповідно до їхнього призначення.

• Секрети не потрібно записувати в логи, коміти або публічні приклади.

• Development, test і production повинні використовувати відповідні конфігурації та ресурси.

• Для Node.js-проєктів зручно централізувати налаштування в окремому конфігураційному модулі.

• Правильна конфігурація допомагає зробити deployment передбачуваним, безпечним і простішим у діагностиці.

• Основна модель роботи:

    Configuration source
            ↓
    Environment variables
            ↓
    Configuration loading
            ↓
    Validation
            ↓
    Application startup
            ↓
    Runtime

• Правильне керування конфігурацією — важлива частина розробки, запуску та підтримки Node.js-застосунків у Linux.
# 04. Nginx Basics

Nginx (вимовляється як «engine-x») — це вебсервер, який використовується для обробки HTTP/HTTPS-запитів, доставки статичних файлів, проксування запитів до інших серверів і балансування навантаження.

Nginx часто використовується під час розгортання Node.js-застосунків у Linux.

Наприклад, Node.js-застосунок може працювати на внутрішньому порту `3000`, а Nginx прийматиме HTTP-запити на порту `80` і передаватиме їх застосунку.

Nginx може виконувати такі завдання:

- обслуговувати статичні HTML, CSS, JavaScript та зображення;
- приймати HTTP-запити;
- обробляти HTTPS-з'єднання;
- передавати запити до Node.js або іншого backend;
- налаштовувати маршрутизацію за доменним ім'ям і URL;
- кешувати відповіді;
- балансувати навантаження між кількома серверами;
- обмежувати доступ до ресурсів;
- записувати access logs та error logs;
- повертати сторінки помилок.

Основні поняття та інструменти:

    Nginx
    web server
    HTTP
    HTTPS
    port 80
    port 443
    server block
    location block
    root
    index
    try_files
    proxy_pass
    reverse proxy
    access log
    error log
    nginx.conf
    sites-available
    sites-enabled
    nginx -t
    systemctl
    reload
    restart
    firewall

---

### Ключові поняття

✔ Nginx  
✔ web server  
✔ HTTP  
✔ HTTPS  
✔ static files  
✔ client  
✔ request  
✔ response  
✔ port 80  
✔ port 443  
✔ configuration file  
✔ `nginx.conf`  
✔ server block  
✔ `server_name`  
✔ `listen`  
✔ `location`  
✔ `root`  
✔ `alias`  
✔ `index`  
✔ `try_files`  
✔ MIME types  
✔ access log  
✔ error log  
✔ `nginx -t`  
✔ `systemctl`  
✔ `reload`  
✔ `restart`  
✔ `sites-available`  
✔ `sites-enabled`  
✔ symbolic link  
✔ default server  
✔ virtual host  
✔ HTTP status code  
✔ static hosting  
✔ reverse proxy  
✔ `proxy_pass`  
✔ firewall  
✔ TLS certificate  
✔ HTTPS  
✔ troubleshooting  

---

### Що потрібно пам'ятати

• Nginx — це вебсервер і reverse proxy, який часто використовується перед Node.js-застосунками.

• HTTP за замовчуванням використовує порт `80`, а HTTPS — порт `443`.

• Nginx може самостійно віддавати статичні файли без Node.js.

• Основна конфігурація Nginx у Linux зазвичай розташована в `/etc/nginx/`.

• `nginx.conf` — головний конфігураційний файл Nginx.

• `server` визначає віртуальний сервер, який обробляє запити відповідно до налаштувань.

• `location` визначає правила обробки URI, які відповідають певному шаблону.

• `root` визначає каталог, відносно якого формується шлях до запитуваного файлу.

• `index` задає файли, які Nginx шукає для запиту до каталогу.

• `try_files` дозволяє перевіряти наявність файлів і визначати fallback.

• `nginx -t` перевіряє синтаксис конфігурації та доступність потрібних файлів.

• `systemctl status nginx` показує стан служби.

• `systemctl reload nginx` просить Nginx перечитати конфігурацію без повного перезапуску процесу, якщо це підтримується службою.

• Перед застосуванням змін потрібно виконувати `sudo nginx -t`.

• `access.log` зберігає інформацію про HTTP-запити, а `error.log` — повідомлення про помилки.

• У багатьох Linux-дистрибутивах конфігурації сайтів зберігаються в `sites-available` і активуються через символічні посилання в `sites-enabled`.

• Nginx не запускає Node.js-застосунок автоматично. Для керування backend-процесом потрібен окремий механізм, наприклад `systemd`.

• Reverse proxy та firewall — різні механізми. Nginx маршрутизує HTTP-запити, а firewall контролює мережевий доступ.

• Встановлення Nginx не означає автоматичного налаштування HTTPS. Для HTTPS потрібні відповідні TLS-сертифікати та конфігурація.

---

# Nginx

Nginx — програмне забезпечення для обробки мережевих запитів.

Його можна використовувати як:

    Web server
        ↓
    Віддає статичні файли

    Reverse proxy
        ↓
    Передає запити до backend

    Load balancer
        ↓
    Розподіляє запити між серверами

Наприклад, для навчального проєкту на Node.js:

    Browser
       |
       | HTTP request
       v
    Nginx :80
       |
       | proxy request
       v
    Node.js :3000
       |
       v
    Response

Nginx може приймати зовнішні HTTP-запити, а Node.js оброблятиме бізнес-логіку застосунку.

---

# Web Server

Web server — серверне програмне забезпечення, яке обробляє HTTP-запити та повертає HTTP-відповіді.

Наприклад, браузер надсилає запит:

    GET /index.html HTTP/1.1
    Host: example.com

Вебсервер повертає HTML-документ та відповідний HTTP-статус.

Nginx може віддавати файли безпосередньо з файлової системи:

    /var/www/my-site/
    ├── index.html
    ├── styles.css
    ├── script.js
    └── images/
        └── logo.png

У такому випадку Node.js для обслуговування цих статичних файлів не обов'язковий.

---

# HTTP та HTTPS

HTTP — протокол обміну даними між клієнтом і сервером.

HTTPS — HTTP, захищений за допомогою TLS.

Типові порти:

    HTTP  → 80
    HTTPS → 443

Nginx може слухати HTTP-порт:

    listen 80;

А для HTTPS зазвичай використовують:

    listen 443 ssl;

Другий приклад є лише частиною конфігурації: для повноцінного HTTPS потрібні відповідні параметри сертифіката та приватного ключа.

Перевірити, чи слухає система певний порт:

    sudo ss -ltnp

Показати тільки слухаючі TCP-порти:

    ss -ltn

У виведенні можна побачити адреси й порти, на яких працюють серверні процеси.

Важливо:

    HTTP  → незашифрований транспорт
    HTTPS → транспорт із TLS

HTTPS не замінює автентифікацію, авторизацію або перевірку безпеки самого застосунку.

---

# Встановлення Nginx

В Ubuntu Nginx можна встановити через APT.

Оновити список пакетів:

    sudo apt update

Встановити Nginx:

    sudo apt install nginx

Перевірити версію:

    nginx -v

Отримати детальнішу інформацію про збірку:

    nginx -V

Перевірити стан служби:

    systemctl status nginx

Якщо служба не запущена:

    sudo systemctl start nginx

Увімкнути автоматичний запуск під час завантаження системи:

    sudo systemctl enable nginx

Запустити службу та ввімкнути автозапуск:

    sudo systemctl enable --now nginx

Важливо:

Команди та розташування конфігурацій можуть відрізнятися залежно від дистрибутива та способу встановлення Nginx.

---

# Основні команди Nginx

Перевірити версію:

    nginx -v

Перевірити конфігурацію:

    sudo nginx -t

Переглянути повну конфігурацію з підключеними файлами:

    sudo nginx -T

Перезапустити службу:

    sudo systemctl restart nginx

Перечитати конфігурацію:

    sudo systemctl reload nginx

Переглянути статус:

    sudo systemctl status nginx

Зупинити службу:

    sudo systemctl stop nginx

Запустити службу:

    sudo systemctl start nginx

Переглянути логи служби:

    sudo journalctl -u nginx

Переглянути останні повідомлення:

    sudo journalctl -u nginx -n 50

Важливо:

`nginx -T` може вивести чутливі дані з конфігураційних файлів, якщо вони там присутні. Не публікуй цей вивід без перевірки.

---

# Структура конфігурації Nginx

У типовій інсталяції Ubuntu конфігурація розташована в:

    /etc/nginx/

Типова структура:

    /etc/nginx/
    ├── nginx.conf
    ├── mime.types
    ├── conf.d/
    ├── sites-available/
    ├── sites-enabled/
    ├── snippets/
    └── modules-enabled/

Призначення:

    nginx.conf
        ↓
    Головний конфігураційний файл

    mime.types
        ↓
    Відповідність розширень файлів MIME-типам

    conf.d/
        ↓
    Додаткові конфігураційні файли

    sites-available/
        ↓
    Конфігурації сайтів

    sites-enabled/
        ↓
    Активовані конфігурації сайтів

    snippets/
        ↓
    Фрагменти конфігурації для повторного використання

    modules-enabled/
        ↓
    Конфігурації завантаження модулів у відповідних пакетних збірках

Це типова структура Ubuntu/Debian. В інших дистрибутивах вона може відрізнятися.

Переглянути файли:

    ls -la /etc/nginx/

Переглянути головну конфігурацію:

    sudo less /etc/nginx/nginx.conf

Знайти директиви `include`:

    grep -n "include" /etc/nginx/nginx.conf

Директиви `include` дозволяють підключати конфігурації з інших файлів.

---

# nginx.conf

`nginx.conf` — головний конфігураційний файл Nginx.

У типовій інсталяції він може містити такі секції:

    user www-data;
    worker_processes auto;

    events {
        worker_connections 1024;
    }

    http {
        include /etc/nginx/mime.types;
        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
    }

Це спрощений приклад структури конфігурації.

Основні секції:

    main
      ↓
    events
      ↓
    http
      ↓
    server
      ↓
    location

Вкладеність визначає контекст, у якому можуть використовуватися директиви.

Наприклад:

- `events` містить налаштування обробки з'єднань;
- `http` містить конфігурацію HTTP-сервера;
- `server` визначає віртуальний сервер;
- `location` визначає правила для URI.

Не кожна директива дозволена в кожному контексті.

---

# Server Block

`server` block — секція конфігурації, яка визначає правила обробки запитів для певного віртуального сервера.

Приклад:

    server {
        listen 80;
        server_name example.com;

        root /var/www/my-site;
        index index.html;
    }

Тут:

    listen 80
        ↓
    Слухати HTTP-порт 80

    server_name example.com
        ↓
    Обробляти запити для відповідного доменного імені

    root /var/www/my-site
        ↓
    Базовий каталог файлів

    index index.html
        ↓
    Файл за замовчуванням для запиту до каталогу

Цей блок має бути розташований у відповідному HTTP-контексті, наприклад у файлі, підключеному через `sites-enabled`.

`server_name` допомагає Nginx вибирати потрібний віртуальний сервер на основі імені хоста в запиті.

---

# listen

Директива `listen` визначає адресу та порт, на яких Nginx приймає з'єднання.

Приклад:

    listen 80;

Слухати конкретну IPv4-адресу:

    listen 127.0.0.1:8080;

У такому випадку сервер слухає порт `8080` лише на loopback-адресі `127.0.0.1`.

Це може бути корисно для локального тестування.

Перевірити слухаючі порти:

    sudo ss -ltnp

Важливо:

Порт, на якому Nginx приймає з'єднання, не обов'язково збігається з портом Node.js backend.

Наприклад:

    Nginx  → 80
    Node.js → 3000

---

# server_name

`server_name` визначає доменні імена, для яких призначений server block.

Приклад:

    server {
        listen 80;
        server_name example.com www.example.com;

        root /var/www/my-site;
        index index.html;
    }

Тут блок призначений для:

    example.com
    www.example.com

Для локального тестування можна використовувати:

    server_name localhost;

Якщо є кілька server blocks, Nginx обирає відповідний блок на основі адреси прослуховування, імені хоста та інших правил вибору сервера.

Якщо жодне ім'я не відповідає запиту, може використовуватися сервер за замовчуванням для відповідної адреси й порту.

---

# location

`location` визначає правила обробки запитів, URI яких відповідає певному шаблону.

Приклад:

    server {
        listen 80;
        server_name example.com;

        root /var/www/my-site;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }

Тут:

    location /
        ↓
    Правило для URI, що починаються з /

    try_files $uri $uri/ =404
        ↓
    Перевірити файл, потім каталог,
    інакше повернути 404

Nginx підтримує різні форми `location`, зокрема:

    location /
    location = /health
    location ^~ /assets/
    location ~ \.php$

Вони відрізняються правилами зіставлення URI.

На початковому етапі достатньо розуміти:

    location /       → загальне правило
    location = /path → точне зіставлення
    location ^~ ...  → префікс із пріоритетом над regex
    location ~ ...   → регулярний вираз із урахуванням регістру

Правила вибору `location` мають визначений порядок і не зводяться просто до принципу «перше правило в файлі».

---

# root

`root` визначає базовий каталог, відносно якого Nginx формує шлях до файлу.

Приклад:

    server {
        listen 80;
        server_name example.com;

        root /var/www/my-site;
        index index.html;
    }

Якщо браузер запитує:

    GET /styles.css

Nginx шукатиме файл:

    /var/www/my-site/styles.css

Якщо запитується:

    GET /images/logo.png

Nginx шукатиме:

    /var/www/my-site/images/logo.png

Важливо:

`root` додає URI до заданого каталогу. Тому потрібно враховувати, як саме формується шлях.

---

# alias

`alias` дозволяє прив'язати URI до іншого файлового каталогу.

Приклад:

    location /assets/ {
        alias /srv/my-app/assets/;
    }

Запит:

    /assets/logo.png

відповідатиме файлу:

    /srv/my-app/assets/logo.png

`alias` та `root` працюють по-різному.

Для `root` шлях формується додаванням URI до кореневого каталогу.

Для `alias` відповідна частина URI замінюється заданим шляхом у контексті `location`.

У конфігураціях з `alias` особливо важливо правильно узгоджувати кінцеві `/` у шаблоні `location` та шляху `alias`.

Для початкового статичного сайту зазвичай достатньо `root`.

---

# index

Директива `index` визначає файли, які Nginx шукає під час запиту до каталогу.

Приклад:

    index index.html;

Якщо користувач відкриває:

    http://example.com/

Nginx може повернути:

    /var/www/my-site/index.html

Можна визначити кілька файлів:

    index index.html index.htm;

Nginx перевіряє їх відповідно до налаштованого порядку.

Важливо:

`index` не означає, що будь-який неіснуючий маршрут автоматично перенаправляється на `index.html`.

Для fallback потрібні відповідні правила, наприклад `try_files`.

---

# try_files

`try_files` перевіряє наявність файлів або каталогів у визначеному порядку.

Приклад:

    location / {
        try_files $uri $uri/ =404;
    }

Логіка:

    1. Перевірити файл за URI.
    2. Перевірити каталог за URI.
    3. Якщо нічого не знайдено, повернути 404.

Для статичного сайту це часто достатньо.

Для SPA, наприклад односторінкового React-застосунку, може знадобитися fallback:

    location / {
        try_files $uri $uri/ /index.html;
    }

У цьому випадку запити до неіснуючих файлів або маршрутів можуть повертати `index.html`, якщо це відповідає правилам конфігурації.

Важливо:

SPA fallback не підходить автоматично для кожного сайту. Якщо застосунок повинен повертати справжній `404` для невідомих маршрутів, не потрібно бездумно перенаправляти всі запити на `index.html`.

---

# MIME Types

MIME type визначає тип вмісту HTTP-відповіді.

Приклади:

    text/html
    text/css
    application/javascript
    application/json
    image/png
    image/svg+xml

Nginx використовує MIME types, щоб повідомляти браузеру, який тип даних повертається.

У типовій конфігурації Ubuntu підключається файл:

    /etc/nginx/mime.types

Наприклад:

    include /etc/nginx/mime.types;

Якщо MIME type визначений неправильно, браузер може обробляти файл не так, як очікується.

Не слід встановлювати один `Content-Type` для всіх файлів без урахування їхнього реального типу.

---

# Static Files

Nginx добре підходить для доставки статичних файлів.

Приклад структури:

    /var/www/my-site/
    ├── index.html
    ├── styles.css
    ├── script.js
    └── images/
        └── logo.png

Конфігурація:

    server {
        listen 80;
        server_name example.com;

        root /var/www/my-site;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }

Якщо користувач відкриває:

    http://example.com/

Nginx може повернути `index.html`.

Якщо браузер запитує:

    http://example.com/styles.css

Nginx віддає файл `styles.css`.

Для статичних файлів Node.js не обов'язковий.

Важливо:

Nginx повинен мати необхідні права на читання файлів і доступ до батьківських каталогів.

Не потрібно надавати всім користувачам права запису до каталогу сайту.

---

# Створення тестового сайту

Створимо простий каталог для статичних файлів:

    sudo mkdir -p /var/www/my-site

Створимо HTML-файл:

    sudo nano /var/www/my-site/index.html

Вміст:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nginx Test</title>
    </head>
    <body>
        <h1>Hello from Nginx!</h1>
        <p>Static site is working.</p>
    </body>
    </html>

Переконатися, що файл доступний для читання користувачу вебсервера.

Перевірити:

    ls -l /var/www/my-site/

Якщо потрібно, для звичайного статичного сайту можна використати типові права:

    sudo chmod 755 /var/www/my-site
    sudo chmod 644 /var/www/my-site/index.html

Для вкладених каталогів також потрібні права доступу на проходження каталогів.

Не застосовуй ці команди бездумно до всієї системи або до каталогів, які містять конфіденційні дані.

---

# Конфігурація тестового сайту

Створити файл:

    sudo nano /etc/nginx/sites-available/my-site

Вміст:

    server {
        listen 80;
        server_name localhost;

        root /var/www/my-site;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }

Активувати конфігурацію через символічне посилання:

    sudo ln -s /etc/nginx/sites-available/my-site /etc/nginx/sites-enabled/my-site

Якщо символічне посилання вже існує, не створюй його повторно.

Перевірити конфігурацію:

    sudo nginx -t

Якщо синтаксис правильний, застосувати зміни:

    sudo systemctl reload nginx

Відкрити в браузері:

    http://localhost/

Або перевірити з термінала:

    curl -i http://localhost/

Очікується HTTP-відповідь із кодом `200 OK`, якщо конфігурація активна, файл доступний і запит обробляється цим server block.

Важливо:

Якщо інший активний server block перехоплює запит, результат може відрізнятися. Перевіряй активну конфігурацію за допомогою `sudo nginx -T`.

---

# sites-available та sites-enabled

У типовій Ubuntu/Debian-інсталяції:

    /etc/nginx/sites-available/
    /etc/nginx/sites-enabled/

`sites-available` містить конфігурації сайтів.

`sites-enabled` містить активовані конфігурації, часто у вигляді символічних посилань на файли з `sites-available`.

Активувати сайт:

    sudo ln -s /etc/nginx/sites-available/my-site /etc/nginx/sites-enabled/my-site

Перевірити посилання:

    ls -l /etc/nginx/sites-enabled/

Вимкнути сайт, видаливши посилання:

    sudo rm /etc/nginx/sites-enabled/my-site

Після зміни:

    sudo nginx -t

    sudo systemctl reload nginx

Важливо:

Команда `rm` у цьому прикладі видаляє символічне посилання, а не оригінальну конфігурацію в `sites-available`.

У деяких дистрибутивах або інсталяціях Nginx каталоги `sites-available` і `sites-enabled` можуть бути відсутні. Тоді використовують інші механізми підключення конфігурацій, наприклад `conf.d`.

---

# Default Site

У стандартній конфігурації Ubuntu часто активований сайт `default`.

Переглянути:

    ls -l /etc/nginx/sites-enabled/

Якщо потрібно вимкнути стандартний сайт у навчальному середовищі:

    sudo rm /etc/nginx/sites-enabled/default

Потім перевірити:

    sudo nginx -t

    sudo systemctl reload nginx

Важливо:

Перед видаленням переконайся, що стандартний сайт не використовується для інших задач.

Якщо після зміни запити почали потрапляти не в той server block, перевір:

    sudo nginx -T

Також перевір `listen`, `server_name` і загальну структуру активної конфігурації.

---

# Virtual Hosts

Virtual host дозволяє обслуговувати кілька сайтів на одному сервері.

Наприклад:

    example.com
    app.example.com
    docs.example.com

Кожен сайт може мати окремий server block.

Приклад:

    server {
        listen 80;
        server_name example.com;

        root /var/www/example-site;
        index index.html;
    }

    server {
        listen 80;
        server_name docs.example.com;

        root /var/www/docs-site;
        index index.html;
    }

Nginx визначає потрібний сервер на основі мережевого з'єднання та HTTP-запиту.

Важливо:

Для реальних доменів потрібно також налаштувати DNS так, щоб доменні імена вказували на правильну адресу сервера.

`server_name` сам по собі не створює DNS-записів.

---

# Default Server

Default server — сервер, який приймає запити для відповідної адреси й порту, коли Nginx не може вибрати більш відповідний сервер за звичайними правилами.

Приклад:

    server {
        listen 80 default_server;
        server_name _;

        return 404;
    }

Цей приклад можна використовувати як базову ідею для сервера за замовчуванням, але перед застосуванням потрібно враховувати решту активних конфігурацій.

`default_server` визначається для конкретної адреси й порту.

Значення:

    server_name _;

не є магічним wildcard-синтаксисом. У цьому шаблоні воно використовується як ім'я, яке зазвичай не збігається з реальним доменом.

Важливо:

Default server може впливати на обробку невідомих Host-заголовків і запитів до IP-адреси сервера.

---

# Access Log

Access log зберігає інформацію про оброблені запити.

У типовій Ubuntu-конфігурації файл часто розташований за шляхом:

    /var/log/nginx/access.log

Переглянути останні записи:

    sudo tail -n 20 /var/log/nginx/access.log

Стежити за новими записами:

    sudo tail -f /var/log/nginx/access.log

Приклад запису:

    127.0.0.1 - - [19/Oct/2026:12:00:00 +0000] "GET / HTTP/1.1" 200 615

Основні елементи:

    IP address
    timestamp
    HTTP method
    request URI
    HTTP version
    status code
    response size

Access log допомагає зрозуміти:

- чи надходять запити;
- які URI запитують клієнти;
- які HTTP-статуси повертаються;
- чи є повторювані помилки;
- які ресурси найчастіше запитуються.

Логи можуть містити IP-адреси, URI, параметри запитів та інші потенційно чутливі дані. Не публікуй їх без перевірки.

---

# Error Log

Error log містить повідомлення про помилки та проблеми під час роботи Nginx.

У типовій Ubuntu-конфігурації:

    /var/log/nginx/error.log

Переглянути останні записи:

    sudo tail -n 50 /var/log/nginx/error.log

Стежити за новими повідомленнями:

    sudo tail -f /var/log/nginx/error.log

Типові проблеми:

    permission denied
    file not found
    connection refused
    invalid configuration
    address already in use

Error log допомагає знайти причину помилки, але потрібно також враховувати логи backend-застосунку та стан операційної системи.

---

# HTTP Status Codes

HTTP status code — код, який описує результат обробки запиту.

Основні коди:

    200 OK
        Запит успішно оброблено.

    301 Moved Permanently
        Постійне перенаправлення.

    302 Found
        Тимчасове перенаправлення.

    400 Bad Request
        Некоректний запит.

    401 Unauthorized
        Потрібна автентифікація.

    403 Forbidden
        Доступ заборонений.

    404 Not Found
        Ресурс не знайдено.

    405 Method Not Allowed
        Метод не дозволений для ресурсу.

    413 Content Too Large
        Запит перевищує допустимий розмір.

    429 Too Many Requests
        Забагато запитів.

    500 Internal Server Error
        Внутрішня помилка сервера.

    502 Bad Gateway
        Проблема під час отримання відповіді від upstream-сервера.

    503 Service Unavailable
        Сервіс тимчасово недоступний.

    504 Gateway Timeout
        Тайм-аут очікування відповіді upstream-сервера.

Важливо:

`502` і `504` часто зустрічаються під час роботи reverse proxy, але конкретну причину потрібно шукати в конфігурації, логах і стані backend.

---

# Перевірка Nginx через curl

Перевірити HTTP-відповідь:

    curl -i http://localhost/

Опція `-i` показує заголовки відповіді разом із тілом.

Показати лише заголовки:

    curl -I http://localhost/

Вивести докладну інформацію про з'єднання:

    curl -v http://localhost/

Перевірити конкретний маршрут:

    curl -i http://localhost/health

Перевірити сервер, указавши Host-заголовок:

    curl -i -H "Host: example.com" http://127.0.0.1/

Остання команда допомагає перевірити вибір virtual host без необхідності змінювати DNS.

Важливо:

Успішний `curl` до `localhost` не гарантує, що сайт доступний з інтернету. Для зовнішнього доступу також важливі мережеві адреси, firewall, маршрутизація, DNS та налаштування хмарної інфраструктури.

---

# Nginx та права доступу

Nginx зазвичай працює від імені спеціального системного користувача, наприклад `www-data` в Ubuntu.

Перевірити процеси:

    ps aux | grep nginx

Перевірити права каталогу сайту:

    ls -ld /var/www/my-site

Перевірити права файлу:

    ls -l /var/www/my-site/index.html

Для читання файлу Nginx повинен мати відповідні права на файл і проходження батьківських каталогів.

Типова проблема:

    403 Forbidden

Можливі причини:

- немає прав читання файлу;
- немає права проходження одного з батьківських каталогів;
- конфігурація забороняє доступ;
- запит потрапляє до каталогу без доступного index-файлу, а перегляд каталогу вимкнений.

Не виправляй усі проблеми командою:

    chmod -R 777 /var/www

Це небезпечно, оскільки надає надмірні права.

Краще визначити конкретну причину та надати лише необхідні дозволи.

---

# Nginx та Firewall

Nginx може слухати порт, але firewall або зовнішні мережеві правила можуть блокувати доступ до нього.

Перевірити слухаючі порти:

    sudo ss -ltnp

Якщо використовується UFW:

    sudo ufw status

Дозволити HTTP:

    sudo ufw allow 80/tcp

Дозволити HTTPS:

    sudo ufw allow 443/tcp

Перевірити правила:

    sudo ufw status numbered

Важливо:

Перед увімкненням UFW на віддаленому сервері потрібно переконатися, що SSH-доступ дозволений, інакше можна втратити можливість підключення.

Також у хмарних середовищах можуть існувати додаткові правила firewall або security groups, які не керуються UFW.

---

# Nginx та HTTPS

Для HTTPS потрібні TLS-сертифікат і відповідний приватний ключ.

Спрощений фрагмент конфігурації:

    server {
        listen 443 ssl;
        server_name example.com;

        ssl_certificate /path/to/fullchain.pem;
        ssl_certificate_key /path/to/privkey.pem;

        root /var/www/my-site;
        index index.html;
    }

Це лише шаблон. Замість `/path/to/` потрібно вказати реальні шляхи до сертифіката та ключа.

Приватний ключ потрібно захищати від несанкціонованого читання.

Після налаштування HTTPS зазвичай додають окремий HTTP server block для перенаправлення на HTTPS.

Приклад:

    server {
        listen 80;
        server_name example.com;

        return 301 https://$host$request_uri;
    }

Такий redirect слід використовувати лише після того, як HTTPS реально налаштований і доступний.

Для автоматичного отримання та поновлення сертифікатів часто використовують Let's Encrypt та відповідні інструменти, наприклад Certbot.

---

# Nginx та Node.js

Nginx може приймати запити від браузера та передавати їх до Node.js-застосунку.

Приклад архітектури:

    Browser
       |
       | HTTP :80 / HTTPS :443
       v
    Nginx
       |
       | HTTP localhost:3000
       v
    Node.js
       |
       v
    PostgreSQL

У цьому сценарії:

    Nginx
        ↓
    приймає зовнішні HTTP-запити

    Node.js
        ↓
    виконує бізнес-логіку

    PostgreSQL
        ↓
    зберігає дані

Node.js може слухати лише локальну адресу:

    127.0.0.1:3000

Тоді backend не буде безпосередньо доступний через зовнішні мережеві інтерфейси, якщо немає іншого шляху доступу.

Конкретний спосіб прив'язування адреси залежить від Node.js-сервера та конфігурації розгортання.

---

# Nginx vs Node.js

Nginx і Node.js виконують різні завдання.

    Nginx
        ↓
    Web server
    Reverse proxy
    TLS termination
    Static files
    Load balancing

    Node.js
        ↓
    Application runtime
    API endpoints
    Business logic
    Database access
    Application rules

Для невеликого проєкту можна запускати Node.js без Nginx, але Nginx часто додають для централізованої обробки HTTP/HTTPS, доставки статичних файлів і проксування запитів.

Важливо:

Nginx не замінює backend, якщо застосунку потрібна серверна бізнес-логіка.

Node.js не замінює повноцінну інфраструктуру керування процесами лише тим, що сервер слухає порт.

---

# Типовий Workflow зміни конфігурації

Коли змінюєш конфігурацію Nginx, використовуй послідовність:

    1. Відкрити потрібний конфігураційний файл.
    2. Внести зміни.
    3. Перевірити синтаксис.
    4. Перечитати конфігурацію.
    5. Перевірити HTTP-відповідь.
    6. Переглянути логи за потреби.

Приклад:

    sudo nano /etc/nginx/sites-available/my-site

Перевірка:

    sudo nginx -t

Застосування:

    sudo systemctl reload nginx

Перевірка відповіді:

    curl -i http://localhost/

Перевірка логів:

    sudo tail -n 50 /var/log/nginx/error.log

Важливо:

Не роби reload, якщо `nginx -t` показує помилку. Перевірка допомагає уникнути застосування некоректної конфігурації.

---

# reload vs restart

`reload` — перечитування конфігурації працюючим сервісом.

    sudo systemctl reload nginx

`restart` — перезапуск служби.

    sudo systemctl restart nginx

Для звичайної зміни конфігурації часто достатньо:

    sudo nginx -t
    sudo systemctl reload nginx

`restart` може бути потрібний у ситуаціях, коли необхідний повний перезапуск служби.

Не слід вважати, що кожен restart обов'язково призводить до тривалого простою. Фактичний вплив залежить від конфігурації та способу роботи сервісу.

---

# Troubleshooting

Якщо Nginx не працює, перевіряй проблему послідовно.

## 1. Статус служби

    sudo systemctl status nginx

## 2. Перевірка конфігурації

    sudo nginx -t

## 3. Логи Nginx

    sudo tail -n 50 /var/log/nginx/error.log

## 4. Логи systemd

    sudo journalctl -u nginx -n 50

## 5. Слухаючі порти

    sudo ss -ltnp

## 6. Локальний HTTP-запит

    curl -i http://localhost/

## 7. Перевірка активної конфігурації

    sudo nginx -T

## 8. Права доступу до файлів

    ls -ld /var/www/my-site
    ls -l /var/www/my-site/index.html

Типові проблеми:

    nginx не запускається
        ↓
    перевірити конфігурацію та логи

    connection refused
        ↓
    перевірити, чи працює сервер і чи слухає потрібний порт

    403 Forbidden
        ↓
    перевірити права доступу та правила конфігурації

    404 Not Found
        ↓
    перевірити URI, root, location і наявність файлу

    502 Bad Gateway
        ↓
    якщо використовується proxy_pass,
    перевірити доступність upstream-сервера

    504 Gateway Timeout
        ↓
    перевірити, чи відповідає upstream
    і чи достатньо налаштовані тайм-аути

---

# Типові помилки

❌ **Редагувати конфігурацію та одразу робити reload без перевірки.**

Правильний порядок:

    sudo nginx -t

    sudo systemctl reload nginx

---

❌ **Плутати `root` та `alias`.**

`root` додає URI до базового каталогу.

`alias` замінює відповідну частину URI заданим шляхом.

---

❌ **Вважати, що `index` автоматично обробляє всі SPA-маршрути.**

Для fallback може знадобитися:

    try_files $uri $uri/ /index.html;

Але це правило підходить лише тоді, коли такий fallback відповідає поведінці застосунку.

---

❌ **Забувати про права доступу.**

Навіть якщо файл існує, Nginx може не мати доступу до нього.

Перевіряй права самого файлу та всіх батьківських каталогів.

---

❌ **Відкривати backend-порт без необхідності.**

Якщо Nginx передає запити до Node.js через `127.0.0.1:3000`, не обов'язково відкривати порт `3000` для зовнішніх з'єднань.

---

❌ **Вважати, що `server_name` налаштовує DNS.**

DNS потрібно налаштовувати окремо.

---

❌ **Вважати, що Nginx автоматично забезпечує HTTPS.**

Для HTTPS необхідні TLS-сертифікат, приватний ключ і правильна конфігурація.

---

❌ **Використовувати `chmod -R 777` для вирішення помилок 403.**

Це надає надмірні права.

Потрібно знайти конкретну причину проблеми з доступом.

---

❌ **Ігнорувати error log.**

Якщо сторінка не відкривається, логи часто містять підказки щодо причини помилки.

---

❌ **Не перевіряти upstream у разі 502.**

Якщо використовується reverse proxy, перевір не тільки Nginx, а й Node.js, адресу backend та його порт.

---

❌ **Вважати, що `localhost` означає доступність з інтернету.**

`localhost` вказує на локальну систему, з якої виконується запит.

Для зовнішнього доступу необхідні правильні мережеві налаштування.

---

# Питання зі співбесіди

Що таке Nginx?

Що таке web server?

Для чого використовують Nginx?

Які основні функції Nginx?

Чим Nginx відрізняється від Node.js?

Які стандартні порти HTTP та HTTPS?

Що таке `nginx.conf`?

Що таке server block?

Для чого потрібна директива `listen`?

Для чого потрібна директива `server_name`?

Що таке `location`?

Чим `root` відрізняється від `alias`?

Для чого використовується `index`?

Що робить `try_files`?

Як Nginx віддає статичні файли?

Що таке MIME type?

Для чого потрібні `sites-available` та `sites-enabled`?

Що таке symbolic link?

Як активувати конфігурацію сайту?

Як вимкнути конфігурацію сайту?

Що робить команда `nginx -t`?

Чим `reload` відрізняється від `restart`?

Як перевірити стан Nginx?

Де зазвичай розташовані access log та error log в Ubuntu?

Як перевірити HTTP-відповідь через `curl`?

Що означають HTTP-статуси 200, 301, 403, 404, 502 та 504?

Чому Nginx може повертати 403?

Чому Nginx може повертати 404?

Що може спричинити 502 Bad Gateway?

Що таке virtual host?

Як Nginx обирає server block?

Що таке default server?

Для чого потрібен firewall?

Чому відкритий порт Nginx не гарантує зовнішньої доступності сайту?

Як Nginx працює разом із Node.js?

Для чого потрібен reverse proxy?

Що потрібно для HTTPS?

Чому не варто відкривати порт Node.js для всіх зовнішніх з'єднань без потреби?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке Nginx.

Що таке web server.

HTTP та HTTPS.

Порти 80 і 443.

Встановлення Nginx через APT.

`systemctl status nginx`.

`systemctl start nginx`.

`systemctl stop nginx`.

`systemctl reload nginx`.

`nginx -t`.

Основна структура `/etc/nginx/`.

`nginx.conf`.

Server block.

`listen`.

`server_name`.

`location`.

`root`.

`index`.

`try_files`.

Статичні файли.

`curl`.

Access log.

Error log.

Основи HTTP status codes.

---

## 🔵 Junior

Розуміння `sites-available` та `sites-enabled`.

Активація конфігурації через symbolic link.

Virtual hosts.

Default server.

Різниця між `root` та `alias`.

MIME types.

Права доступу до файлів.

Перевірка конфігурації через `nginx -t`.

Перегляд повної конфігурації через `nginx -T`.

Діагностика 403, 404 та 502.

Основи firewall.

Розуміння Nginx перед Node.js.

Основи `proxy_pass`.

Базова конфігурація HTTPS.

Перевірка запитів через `curl -i` та `curl -v`.

---

## 🟠 Middle

Reverse proxy.

Load balancing.

TLS termination.

HTTP redirects.

Налаштування кількох доменів.

Керування HTTP-заголовками.

Передавання заголовків клієнта до backend.

Кешування.

Rate limiting.

Обмеження розміру запитів.

Налаштування timeout.

Безпечна конфігурація TLS.

Логування та аналіз HTTP-запитів.

Оптимізація доставки статичних ресурсів.

Zero-downtime reload.

Діагностика upstream-помилок.

Інтеграція Nginx із Node.js та `systemd`.

---

## 🔴 Senior

Nginx architecture.

Event-driven processing model.

Worker processes.

Connection handling.

Advanced reverse proxy architecture.

Load-balancing algorithms.

Health checks та upstream failure handling.

Caching strategies.

HTTP/2 та HTTP/3 — залежно від версії, збірки й конфігурації.

TLS security hardening.

Advanced routing.

Observability.

Performance tuning.

High availability.

Deployment strategies.

Zero-downtime deployment.

Security headers.

Rate limiting strategies.

Connection limits.

Resilience та fault tolerance.

Trade-offs між Nginx, іншим reverse proxy та cloud load balancer.

---

# Міні-шпаргалка

## Перевірити Nginx

    nginx -v

    sudo nginx -t

    sudo systemctl status nginx

---

## Запустити Nginx

    sudo systemctl start nginx

---

## Перечитати конфігурацію

    sudo nginx -t

    sudo systemctl reload nginx

---

## Переглянути логи

    sudo tail -f /var/log/nginx/access.log

    sudo tail -f /var/log/nginx/error.log

---

## Перевірити HTTP

    curl -i http://localhost/

---

## Основний server block

    server {
        listen 80;
        server_name example.com;

        root /var/www/my-site;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }

---

## Типова структура

    /etc/nginx/
    ├── nginx.conf
    ├── conf.d/
    ├── sites-available/
    └── sites-enabled/

---

## Основні директиви

    listen       → адреса та порт
    server_name  → ім'я сервера
    location     → правила обробки URI
    root         → базовий каталог файлів
    alias        → альтернативне зіставлення шляху
    index        → файл за замовчуванням
    try_files    → перевірка файлів і fallback
    proxy_pass   → передавання запитів upstream-серверу

---

## Основні HTTP-статуси

    200 → OK
    301 → Permanent Redirect
    403 → Forbidden
    404 → Not Found
    500 → Internal Server Error
    502 → Bad Gateway
    503 → Service Unavailable
    504 → Gateway Timeout

---

## Типова архітектура

    Browser
       ↓
    Nginx :80 / :443
       ↓
    Node.js :3000
       ↓
    PostgreSQL

---

## Основні правила

    nginx -t
        ↓
    Перевірити конфігурацію

    systemctl reload nginx
        ↓
    Застосувати зміни

    access.log
        ↓
    Переглянути запити

    error.log
        ↓
    Знайти помилки

    curl -i
        ↓
    Перевірити HTTP-відповідь

    ss -ltnp
        ↓
    Перевірити слухаючі порти

---

# Головне

• Nginx — вебсервер і reverse proxy, який часто використовується для розгортання вебзастосунків.

• Nginx може віддавати статичні файли без Node.js.

• HTTP зазвичай використовує порт `80`, HTTPS — порт `443`.

• `nginx.conf` — головний конфігураційний файл Nginx.

• `server` визначає правила обробки запитів для віртуального сервера.

• `location` визначає правила обробки певних URI.

• `root` і `alias` використовуються для зіставлення URI з файловими шляхами, але працюють по-різному.

• `try_files` допомагає перевіряти файли та визначати fallback.

• `sites-available` і `sites-enabled` — поширений спосіб керування конфігураціями сайтів в Ubuntu/Debian.

• `nginx -t` потрібно виконувати перед застосуванням змін.

• `systemctl reload nginx` дозволяє перечитати конфігурацію без звичайного повного перезапуску служби.

• Access log допомагає аналізувати запити, а error log — діагностувати помилки.

• `curl` дозволяє перевіряти HTTP-відповіді без браузера.

• Помилки 403, 404, 502 та 504 можуть мати різні причини, тому їх потрібно діагностувати за конфігурацією, логами та станом серверів.

• Nginx не замінює firewall, DNS або механізм керування процесами Node.js.

• Для HTTPS потрібні коректні TLS-сертифікати та конфігурація.

• У production потрібно правильно налаштовувати права доступу, мережеві порти та обробку секретів.

• Типовий порядок роботи з конфігурацією:

    Edit configuration
          ↓
    nginx -t
          ↓
    systemctl reload nginx
          ↓
    curl -i
          ↓
    Check logs

• Для навчального Node.js-проєкту достатньо спочатку навчитися встановлювати Nginx, обслуговувати статичний сайт, налаштовувати server block, перевіряти конфігурацію та читати логи.

• Наступний крок — `05-reverse-proxy`, де Nginx буде використовуватися для передавання HTTP-запитів до Node.js backend.
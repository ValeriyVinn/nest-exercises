## 01. Server Environment

Server Environment (серверне середовище) — це операційна система, програмне забезпечення, мережеві налаштування та ресурси, необхідні для запуску й обслуговування застосунків на сервері.

У контексті Linux і Node.js серверне середовище використовується для розміщення backend-застосунків, баз даних, API та вебсайтів, які повинні працювати постійно й бути доступними через мережу.

Server environment включає:

    Linux server
    server resources (CPU, RAM, disk)
    network configuration
    IP address
    hostname
    users and permissions
    installed software
    Node.js runtime
    environment variables
    firewall
    running services
    logs
    deployment directories

Основні завдання цього розділу:

- розуміти, чим сервер відрізняється від локального комп'ютера;
- перевіряти стан Linux-сервера;
- визначати доступні системні ресурси;
- розуміти мережеві параметри сервера;
- перевіряти встановлене програмне забезпечення;
- організовувати директорії для застосунків;
- розуміти принципи безпечного запуску серверних застосунків;
- підготувати Linux-середовище для розгортання Node.js і NestJS;
- розрізняти локальне середовище розробки та production environment.

---

### Ключові поняття

✔ server  
✔ Linux server  
✔ server environment  
✔ local environment  
✔ development environment  
✔ production environment  
✔ staging environment  
✔ VPS  
✔ cloud server  
✔ hostname  
✔ IP address  
✔ public IP  
✔ private IP  
✔ localhost  
✔ loopback address  
✔ CPU  
✔ RAM  
✔ disk space  
✔ uptime  
✔ operating system  
✔ kernel  
✔ architecture  
✔ shell  
✔ user account  
✔ root user  
✔ sudo  
✔ package manager  
✔ installed packages  
✔ Node.js runtime  
✔ environment variables  
✔ working directory  
✔ deployment directory  
✔ network interface  
✔ listening port  
✔ firewall  
✔ system service  
✔ process  
✔ logs  
✔ SSH  
✔ security updates  
✔ server hardening  

---

### Що потрібно пам'ятати

• Server — це комп'ютер або віртуальна машина, яка надає ресурси чи послуги іншим пристроям і програмам.

• Linux server може бути фізичним комп'ютером, VPS, віртуальною машиною або хмарним сервером.

• VPS (Virtual Private Server) — віртуальний сервер із виділеними для нього ресурсами та власним операційним середовищем.

• Cloud server — серверні ресурси, які надаються через хмарну інфраструктуру.

• Development environment — середовище для розробки та тестування застосунку.

• Production environment — середовище, у якому застосунок обслуговує реальних користувачів.

• Staging environment — проміжне середовище для перевірки змін перед production.

• `hostname` показує ім'я комп'ютера в системі.

• `hostname -I` показує IP-адреси, призначені мережевим інтерфейсам, але не обов'язково зовнішню публічну IP-адресу.

• `uname -a` показує інформацію про ядро та систему.

• `cat /etc/os-release` показує інформацію про дистрибутив Linux.

• `lscpu` показує інформацію про процесор.

• `free -h` показує використання оперативної пам'яті та swap.

• `df -h` показує використання файлових систем.

• `uptime` показує тривалість роботи системи, кількість користувачів і load average.

• `ip addr` показує мережеві інтерфейси та їхні IP-адреси.

• `ss -tulpn` допомагає перевірити TCP/UDP-сокети та порти, які прослуховуються.

• `systemctl` використовується для керування systemd-сервісами.

• `journalctl` використовується для перегляду журналів systemd.

• `sudo` дозволяє виконувати команди з підвищеними привілеями відповідно до налаштувань системи.

• Не потрібно постійно працювати від імені `root`.

• Node.js-застосунок може працювати локально, але бути недоступним з інтернету через неправильні мережеві налаштування, firewall або конфігурацію reverse proxy.

• Сервер має отримувати оновлення безпеки та використовувати мінімально необхідні відкриті порти.

---

# Server

Server — це система, яка надає послуги іншим системам через мережу або локально.

Наприклад, Node.js-сервер може:

    receive HTTP requests
        ↓
    execute application logic
        ↓
    query PostgreSQL
        ↓
    return HTTP responses

Приклад архітектури вебзастосунку:

    Browser
        |
        | HTTP / HTTPS
        v
    Linux Server
        |
        v
    Nginx
        |
        v
    Node.js / NestJS
        |
        v
    PostgreSQL

У такій архітектурі:

    Browser       → клієнт
    Linux Server  → операційне середовище
    Nginx         → web server / reverse proxy
    NestJS        → backend application
    PostgreSQL    → database server

Це логічні ролі, а не обов'язково окремі фізичні комп'ютери. У навчальному проєкті всі компоненти можуть працювати на одній машині.

---

# Server vs Local Computer

Локальний комп'ютер і сервер можуть використовувати однакову операційну систему.

Основна різниця полягає в призначенні, способі доступу та вимогах до надійності.

## Local Computer

Зазвичай використовується для:

    coding
    debugging
    testing
    browser development
    running local databases
    learning Linux

Приклад:

    Windows
        ↓
    VS Code
        ↓
    Git Bash
        ↓
    Node.js
        ↓
    localhost:3000

Або на Ubuntu:

    Ubuntu
        ↓
    VS Code
        ↓
    Bash
        ↓
    Node.js
        ↓
    localhost:3000

## Linux Server

Зазвичай використовується для:

    hosting applications
    running backend APIs
    serving websites
    running background services
    connecting to databases
    processing requests
    monitoring application health

Приклад:

    Internet
        ↓
    Public IP
        ↓
    Firewall
        ↓
    Nginx
        ↓
    NestJS
        ↓
    PostgreSQL

Важливо: сервер не обов'язково має графічний інтерфейс. Багато Linux-серверів адмініструються через SSH і термінал.

---

# Localhost

`localhost` — ім'я, яке зазвичай вказує на локальний комп'ютер.

Типова IPv4-адреса loopback:

    127.0.0.1

Типова IPv6-адреса loopback:

    ::1

Перевірка:

    hostname
    getent hosts localhost

Перевірка loopback:

    ip addr show lo

Наприклад, якщо Node.js слухає порт `3000` на `127.0.0.1`, застосунок доступний через локальний loopback-інтерфейс.

    http://127.0.0.1:3000

Але це не означає, що інший комп'ютер може відкрити цей застосунок через інтернет.

## Binding Address

Адреса, на якій застосунок слухає з'єднання, впливає на його доступність.

Приклад для Node.js:

    server.listen(3000, "127.0.0.1");

Застосунок слухає тільки IPv4 loopback-адресу.

Інший приклад:

    server.listen(3000, "0.0.0.0");

`0.0.0.0` означає всі доступні IPv4-інтерфейси.

Це може дозволити з'єднання через мережеву IP-адресу сервера, якщо firewall та інші мережеві налаштування це дозволяють.

Важливо:

    127.0.0.1 → тільки локальний IPv4 loopback
    0.0.0.0   → усі локальні IPv4-інтерфейси

`0.0.0.0` не є адресою, яку потрібно використовувати в браузері для підключення до віддаленого сервера.

Не слід без потреби відкривати порт backend-застосунку для всіх мережевих інтерфейсів. Якщо перед ним використовується Nginx, часто безпечніше залишити backend доступним тільки через loopback.

---

# Development Environment

Development environment — середовище, у якому розробник пише, запускає та перевіряє код.

Типові компоненти:

    operating system
    code editor
    Git
    Node.js
    npm
    PostgreSQL
    environment variables
    development dependencies
    debugging tools

Приклад:

    nest-exercises/
        practice/
            server/
            linux/

Node.js-застосунок запускається локально:

    npm run start:dev

Або:

    npm run dev

Конкретна команда залежить від `package.json`.

Перевірити Node.js:

    node --version

Перевірити npm:

    npm --version

Перевірити поточну директорію:

    pwd

Переглянути файли:

    ls -la

Development environment може містити додаткові інструменти, які не потрібні для production.

Наприклад:

    TypeScript compiler
    test runners
    linters
    debugging tools
    hot reload utilities

---

# Production Environment

Production environment — середовище, у якому застосунок використовується реальними користувачами.

Для Node.js або NestJS це зазвичай означає:

    Linux server
    Node.js runtime
    production dependencies
    environment configuration
    database connection
    process management
    logging
    network access
    security updates

Типова схема:

    Git repository
        ↓
    deploy application
        ↓
    install dependencies
        ↓
    build application
        ↓
    configure environment
        ↓
    start application
        ↓
    monitor logs and health

У production зазвичай не потрібно запускати сервер через команду розробки з автоматичним перезапуском.

Для NestJS типовий процес може бути таким:

    npm ci
    npm run build
    npm run start:prod

Це лише приклад. Команди мають відповідати реальним скриптам проєкту.

Перевірити скрипти:

    cat package.json

Production-середовище повинно мати:

    correct configuration
    restricted permissions
    reliable process management
    appropriate logging
    security updates
    backup strategy where needed

---

# Staging Environment

Staging environment — середовище для перевірки застосунку перед production deployment.

Воно допомагає перевірити:

    application build
    database connection
    environment variables
    API endpoints
    migrations
    reverse proxy
    authentication
    logging

Типовий процес:

    Development
        ↓
    Testing
        ↓
    Staging
        ↓
    Production

Staging бажано наближати до production за конфігурацією, але використовувати відповідні тестові дані та секрети.

Staging не обов'язково має існувати в кожному невеликому проєкті.

---

# VPS

VPS (Virtual Private Server) — віртуальний сервер, який надається хостинг-провайдером.

Розробник зазвичай отримує:

    public IP address
    Linux distribution
    SSH access
    CPU allocation
    RAM allocation
    disk space
    administrative privileges

Наприклад:

    Ubuntu Server
        ↓
    SSH
        ↓
    install Node.js
        ↓
    deploy NestJS
        ↓
    configure Nginx
        ↓
    configure HTTPS

VPS часто використовують для навчання deployment, оскільки він дає можливість самостійно налаштовувати Linux, мережу, сервіси та серверне програмне забезпечення.

Але VPS також потребує адміністрування:

    updates
    access control
    firewall configuration
    backups
    monitoring
    incident troubleshooting

---

# Server Resources

Сервер має обмежені ресурси.

Основні ресурси:

    CPU
    RAM
    disk space
    network bandwidth

Вони впливають на продуктивність і стабільність застосунків.

---

# CPU

CPU (Central Processing Unit) — центральний процесор, який виконує інструкції програм.

Для перевірки:

    lscpu

Скорочена інформація:

    nproc

`nproc` показує кількість доступних процесорних одиниць відповідно до середовища виконання.

CPU використовується для:

    executing application code
    processing requests
    compressing data
    running builds
    database computations

Якщо CPU постійно завантажений, застосунок може працювати повільніше.

Перегляд поточного стану:

    top

Якщо встановлено `htop`:

    htop

`htop` — зручніший інтерактивний переглядач процесів, але він може бути відсутнім у системі.

---

# RAM

RAM (Random Access Memory) — оперативна пам'ять, яку процеси використовують під час роботи.

Перевірка:

    free -h

Приклад:

    free -h

Можливий результат:

    total        used        free      shared  buff/cache   available
    Mem:          7.6Gi       2.1Gi       1.2Gi       180Mi       4.3Gi       5.0Gi
    Swap:         2.0Gi          0B       2.0Gi

Цифри наведено лише як приклад.

Важливо:

    total      → загальна доступна пам'ять
    used       → використана пам'ять
    free       → повністю вільна пам'ять
    buff/cache → пам'ять для буферів і кешу
    available  → оцінка пам'яті, доступної для нових застосунків

Не потрібно оцінювати стан сервера лише за значенням `free`.

Linux використовує частину вільної RAM для кешування. Для загальної оцінки доступної пам'яті корисно дивитися на `available`.

---

# Swap

Swap — простір на диску, який Linux може використовувати як додаткову віртуальну пам'ять.

Перевірка:

    swapon --show

Або:

    free -h

Swap може допомогти системі пережити тимчасовий дефіцит RAM, але він значно повільніший за оперативну пам'ять.

Активне використання swap не завжди означає проблему. Проте постійний інтенсивний обмін між RAM і swap може свідчити про нестачу пам'яті.

Не слід створювати, видаляти або змінювати swap без розуміння конфігурації сервера.

---

# Disk Space

Диск використовується для зберігання:

    operating system
    application files
    dependencies
    logs
    database files
    backups
    uploaded files

Перевірити використання файлових систем:

    df -h

Перевірити тип файлових систем:

    df -Th

Приклад:

    df -h /

Показує використання файлової системи, на якій розташований кореневий каталог `/`.

Перевірити розмір директорій:

    du -sh ~/projects

Переглянути розмір директорій поточного рівня:

    du -sh ./*

Важливо:

    df → використання файлових систем
    du → використання дискового простору файлами й директоріями

Якщо диск заповнений, можуть виникнути проблеми із записом логів, базою даних, оновленнями та запуском застосунків.

Перед видаленням файлів на production необхідно визначити, що саме займає простір і чи можна безпечно видалити ці дані.

---

# Uptime

`uptime` показує, як довго система працює без перезавантаження.

Команда:

    uptime

Приклад результату:

    15:30:00 up 3 days, 4:12, 1 user, load average: 0.25, 0.40, 0.35

Основні поля:

    current time
    uptime
    logged-in users
    load average

Load average — середнє навантаження системи за інтервали:

    1 minute
    5 minutes
    15 minutes

Load average не є прямим відсотком використання CPU. Він враховує процеси, які виконуються або очікують на певні ресурси, зокрема I/O.

Наприклад, load average `4.0` може означати різний рівень навантаження залежно від кількості CPU та характеру навантаження.

Для оцінки стану системи потрібно розглядати load average разом із CPU, RAM, I/O та станом процесів.

---

# Operating System

Linux server зазвичай використовує серверний дистрибутив Linux.

Приклади:

    Ubuntu Server
    Debian
    Rocky Linux
    AlmaLinux
    Fedora Server

Перевірити дистрибутив:

    cat /etc/os-release

Приклад результату:

    NAME="Ubuntu"
    VERSION="24.04 LTS"
    ID=ubuntu

Це лише приклад формату. Фактичні значення залежать від установленого дистрибутива.

Перевірити версію ядра:

    uname -r

Переглянути повну інформацію про систему:

    uname -a

Важливо розрізняти:

    distribution → дистрибутив Linux
    kernel       → ядро операційної системи
    architecture → архітектура процесора
    shell        → командний інтерпретатор

Наприклад, Ubuntu є дистрибутивом Linux, а Bash — одним із можливих командних інтерпретаторів.

---

# Architecture

Архітектура визначає, для якої процесорної платформи побудовано систему та її програмне забезпечення.

Перевірка:

    uname -m

Можливі результати:

    x86_64
    aarch64

Зазвичай:

    x86_64 → 64-bit x86 architecture
    aarch64 → 64-bit ARM architecture

Архітектура важлива під час встановлення Node.js та інших програм.

Перед установленням програмного забезпечення потрібно переконатися, що пакет сумісний із системою.

---

# Hostname

Hostname — ім'я комп'ютера або сервера в системі.

Перевірити hostname:

    hostname

Додатково:

    hostnamectl

`hostnamectl` може показувати:

    Static hostname
    Operating System
    Kernel
    Architecture

Наприклад:

    hostnamectl

Hostname допомагає ідентифікувати сервер у терміналі, журналах і системних інструментах.

У серверному середовищі ім'я може бути:

    api-server
    web-server
    staging-server
    production-server

Це лише приклади назв.

Hostname сам по собі не є публічною IP-адресою і не гарантує, що сервер доступний через інтернет.

---

# IP Address

IP address — адреса мережевого інтерфейсу, яка використовується для мережевого обміну даними.

Основні версії:

    IPv4
    IPv6

Перевірити IP-адреси інтерфейсів:

    ip addr

Скорочений варіант:

    ip -br addr

Переглянути маршрути:

    ip route

Переглянути IPv6-маршрути:

    ip -6 route

## Private IP

Private IP використовується в приватних мережах.

Типові приватні діапазони IPv4:

    10.0.0.0/8
    172.16.0.0/12
    192.168.0.0/16

Наприклад:

    192.168.1.20

Private IP зазвичай не маршрутизується безпосередньо через публічний інтернет.

## Public IP

Public IP — публічна IP-адреса, через яку сервер може бути доступним з інтернету, якщо це дозволяють маршрутизація, firewall та інші налаштування.

Публічна IP-адреса може бути призначена безпосередньо серверу або належати зовнішньому мережевому обладнанню чи хмарній інфраструктурі.

Не кожен Linux-сервер має власну публічну IP-адресу.

Для перевірки зовнішньої адреси можна використовувати інструменти або сервіси, що показують IP, з якої виходить з'єднання. Такий результат може відображати адресу NAT або зовнішнього шлюзу, а не адресу, призначену мережевому інтерфейсу сервера.

---

# Network Interface

Network interface — фізичний або віртуальний мережевий інтерфейс.

Приклади назв:

    lo
    eth0
    ens18
    enp3s0
    wlan0

Назви залежать від обладнання, дистрибутива та конфігурації.

Переглянути інтерфейси:

    ip link

Переглянути адреси:

    ip addr

Переглянути короткий стан:

    ip -br link
    ip -br addr

`lo` — loopback-інтерфейс.

Він використовується для локального мережевого обміну всередині системи.

---

# SSH Access

SSH (Secure Shell) — протокол для захищеного віддаленого доступу до сервера.

Типова схема:

    Local Computer
        |
        | SSH
        v
    Linux Server

Підключення:

    ssh username@server_ip

Наприклад:

    ssh deploy@203.0.113.10

Адреса `203.0.113.10` належить діапазону, зарезервованому для документації, і тут використовується тільки як приклад.

Під час підключення можуть використовуватися:

    username
    password authentication
    SSH key authentication
    SSH server configuration
    firewall rules

Для production-серверів зазвичай рекомендується автентифікація за SSH-ключами та обмеження доступу до адміністративних облікових записів.

SSH детальніше розглядається в розділі:

    14-ssh-and-remote-servers

---

# Root User

`root` — суперкористувач Linux із широкими адміністративними повноваженнями.

Перевірити поточного користувача:

    whoami

Перевірити UID:

    id

Якщо поточний користувач має UID `0`, це root.

Перевірити можливість використання sudo:

    sudo -l

Команда покаже дозволені адміністративні дії, якщо користувач має відповідні права.

## sudo

`sudo` дозволяє виконувати команди з підвищеними привілеями.

Наприклад:

    sudo apt update

Або:

    sudo systemctl status ssh

Не всі системи використовують однакові назви пакетів, сервісів чи однаковий менеджер пакетів.

Основні правила:

    ordinary user → повсякденна робота
    sudo          → адміністративні дії
    root          → повні системні привілеї

Не запускайте невідомі скрипти з `sudo` без попереднього перегляду їхнього вмісту.

Не використовуйте `sudo` для кожної команди без потреби.

---

# Package Manager

Package manager — інструмент для встановлення, оновлення та видалення програм.

В Ubuntu та Debian використовується APT.

Перевірити версію:

    apt --version

Оновити індекси пакетів:

    sudo apt update

Встановити пакет:

    sudo apt install curl

Перевірити наявність пакета:

    apt policy curl

Переглянути встановлені пакети:

    apt list --installed

Оновити встановлені пакети:

    sudo apt upgrade

Важливо:

    apt update  → оновити інформацію про пакети
    apt upgrade → встановити доступні оновлення пакетів

`apt update` не означає, що всі програми вже оновлено.

Перед оновленням production-сервера потрібно враховувати можливі зміни, перезапуски сервісів і вимоги до безперервної роботи.

У різних дистрибутивах можуть використовуватися інші менеджери пакетів, наприклад `dnf`.

---

# Installed Software

Під час підготовки сервера важливо перевірити, які інструменти вже встановлені.

Перевірити Node.js:

    node --version

Перевірити npm:

    npm --version

Перевірити Git:

    git --version

Перевірити curl:

    curl --version

Перевірити Nginx:

    nginx -v

Деякі команди можуть бути відсутні, якщо відповідне програмне забезпечення не встановлене.

Для перевірки розташування виконуваного файла:

    command -v node
    command -v npm
    command -v git
    command -v nginx

Якщо команда нічого не виводить і повертає ненульовий код завершення, виконуваний файл може бути недоступним через поточний `PATH` або не встановленим.

Важливо розрізняти:

    installed software
    executable in PATH
    running process
    enabled service

Наявність програми не означає, що вона зараз працює.

---

# Node.js Runtime

Node.js — середовище виконання JavaScript поза браузером.

Воно використовується для запуску:

    backend APIs
    HTTP servers
    NestJS applications
    CLI tools
    background jobs
    build tools

Перевірити версії:

    node --version
    npm --version

Перевірити шлях до Node.js:

    command -v node

Перевірити шлях до npm:

    command -v npm

Запустити просту команду:

    node -e "console.log('Node.js is working')"

Результат:

    Node.js is working

## Node.js на сервері

Node.js-застосунок може запускатися:

    directly from terminal
    through systemd
    through a process manager
    inside a container
    through a hosting platform

Для production важливо визначити, як саме застосунок буде запускатися, перезапускатися та відновлюватися після помилок або перезавантаження сервера.

Це не означає, що Node.js автоматично стає системним сервісом після встановлення.

---

# Node.js Version Management

Node.js можна встановлювати різними способами:

    OS package manager
    Node.js official distribution
    version manager such as nvm
    container image

`nvm` дозволяє керувати кількома версіями Node.js для конкретного користувача.

Перевірити, чи доступний nvm:

    command -v nvm

Важливо: `nvm` часто реалізований як shell function, тому команда `command -v nvm` може показати `nvm`, якщо він завантажений у поточній оболонці.

Переглянути доступні локально версії:

    nvm ls

Перевірити поточну версію:

    node --version

Важливо для production:

- обирати версію Node.js, сумісну з проєктом;
- використовувати підтримувану версію;
- не покладатися на випадкову версію, встановлену системою;
- перевіряти, під яким користувачем працює застосунок;
- переконатися, що служба бачить правильний Node.js executable.

Якщо Node.js встановлено через `nvm` у домашній директорії користувача, systemd-сервіс може не бачити ту саму версію, що й інтерактивний термінал.

Для production необхідно явно налаштувати середовище запуску та шлях до потрібного виконуваного файла.

---

# Environment Variables

Environment variables — змінні середовища, які передають конфігураційні значення процесам.

Приклади:

    NODE_ENV
    PORT
    DATABASE_URL
    API_URL

Переглянути окрему змінну:

    echo "$HOME"

Переглянути інші змінні:

    echo "$PATH"

Перевірити, чи задана змінна:

    printenv NODE_ENV

Вивести всі змінні середовища:

    printenv

Останню команду не слід бездумно виконувати в середовищі, де можуть бути секрети, якщо результат потрапить у публічні логи або скриншоти.

## Передавання змінної процесу

Приклад:

    PORT=3000 node server.js

Змінна `PORT` буде доступна запущеному процесу Node.js.

У JavaScript:

    const port = process.env.PORT || 3000;

У TypeScript:

    const port = process.env.PORT ?? "3000";

Зверни увагу: `process.env` повертає рядкові значення або `undefined`. Якщо змінна використовується як число, її потрібно коректно перетворити та перевірити.

У NestJS конфігурація часто організовується через `@nestjs/config`.

Не зберігайте паролі, API-ключі та секрети безпосередньо в коді або відкритому Git-репозиторії.

---

# Working Directory

Working directory — поточна директорія, з якої виконується команда.

Перевірити:

    pwd

Перейти до домашньої директорії:

    cd ~

Перейти до кореня файлової системи:

    cd /

Переглянути файли:

    ls -la

Поточна директорія впливає на:

    relative file paths
    configuration file discovery
    shell scripts
    application startup
    log file paths

Наприклад, команда:

    node server.js

шукає `server.js` відносно поточної директорії, якщо не вказано інший шлях.

Якщо застосунок запускається через systemd, не слід припускати, що його поточна директорія збігатиметься з директорією інтерактивного термінала.

---

# Deployment Directory

Deployment directory — директорія, у якій розміщується застосунок на сервері.

Приклади можливих розташувань:

    /srv/my-app
    /opt/my-app
    /var/www/my-app
    /home/deploy/my-app

Це приклади, а не обов'язкові стандартні шляхи.

Призначення може відрізнятися:

    /srv       → дані сервісів, які надає система
    /opt       → додаткове програмне забезпечення
    /var/www   → часто використовується для вебконтенту
    /home      → домашні директорії користувачів

Для Node.js API можна організувати директорію так:

    /srv/my-app/
    ├── dist/
    ├── node_modules/
    ├── package.json
    └── package-lock.json

Це лише спрощений приклад. Реальна структура залежить від процесу deployment, способу встановлення залежностей і конфігурації застосунку.

Конфігураційні файли та секрети можуть зберігатися окремо від коду.

Наприклад:

    /etc/my-app/

Не потрібно автоматично розміщувати секрети в директорії, доступній для читання вебсервером.

---

# Linux Filesystem Hierarchy

Linux використовує єдину ієрархію файлової системи, коренем якої є `/`.

Важливі директорії:

    /
    ├── bin
    ├── etc
    ├── home
    ├── opt
    ├── root
    ├── run
    ├── srv
    ├── tmp
    ├── usr
    └── var

У сучасних Ubuntu деякі каталоги, наприклад `/bin`, можуть бути символічними посиланнями на каталоги всередині `/usr`.

## Основні директорії

`/etc`

Системні конфігураційні файли.

    /etc/ssh/
    /etc/systemd/
    /etc/nginx/

`/home`

Домашні директорії звичайних користувачів.

    /home/deploy/

`/root`

Домашня директорія користувача root.

`/usr`

Більшість системних програм, бібліотек та інших ресурсів.

`/var`

Дані, які змінюються під час роботи системи.

    /var/log/
    /var/lib/
    /var/cache/

`/tmp`

Тимчасові файли.

`/srv`

Дані сервісів, які надає система.

`/opt`

Додаткове програмне забезпечення та його файли.

Для роботи із сервером важливо розуміти призначення директорій, але конкретний шлях розміщення застосунку визначається архітектурою проєкту.

---

# Users and Groups

Linux використовує облікові записи користувачів і групи для контролю доступу до файлів та процесів.

Перевірити поточного користувача:

    whoami

Переглянути UID і групи:

    id

Переглянути активні сеанси:

    who

Переглянути користувачів, які зараз увійшли в систему:

    w

Для серверного застосунку часто створюють окремого користувача, наприклад:

    deploy

Або спеціального системного користувача для конкретного сервісу.

Переваги окремого користувача:

- обмеження доступу до файлів;
- ізоляція прав процесу;
- простіший аудит;
- зменшення наслідків компрометації застосунку.

Не потрібно запускати Node.js-застосунок від імені root без конкретної необхідності.

---

# File Permissions

Права доступу визначають, хто може читати, змінювати та виконувати файл.

Переглянути права:

    ls -l

Приклад:

    -rw-r--r-- 1 deploy deploy 1200 Oct 19 10:00 package.json

Права:

    rw- → owner
    r-- → group
    r-- → others

Основні символи:

    r → read
    w → write
    x → execute
    - → permission is not granted

Змінити власника:

    sudo chown deploy:deploy /srv/my-app

Це приклад команди для директорії або файла з відповідним шляхом. Перед застосуванням потрібно перевірити, які права дійсно необхідні.

Встановити права:

    chmod 644 package.json
    chmod 755 deploy.sh

Типове значення:

    644 → власник може читати й записувати, інші можуть читати
    755 → власник має повні права, інші можуть читати й виконувати

Не встановлюйте `777` як універсальний спосіб виправлення помилок доступу.

Детальніше:

    05-permissions-and-ownership

---

# Running Processes

Process — запущений екземпляр програми.

Переглянути процеси:

    ps aux

Переглянути процеси поточного користувача:

    ps -u "$USER"

Знайти процес за назвою:

    pgrep -a node

Переглянути інтерактивно:

    top

Node.js може запускати серверний процес, який очікує на HTTP-запити.

Приклад:

    node server.js

Але запуск у звичайному терміналі не забезпечує автоматичний перезапуск після перезавантаження сервера.

Для production зазвичай потрібен менеджер процесів або systemd.

---

# System Services

System service — процес або набір процесів, керування якими організоване як сервіс операційної системи.

На багатьох Linux-системах використовується systemd.

Перевірити systemd:

    systemctl --version

Перевірити стан сервісу:

    systemctl status ssh

Назва сервісу SSH залежить від дистрибутива. В Ubuntu зазвичай використовується `ssh`.

Перевірити, чи сервіс увімкнений для автозапуску:

    systemctl is-enabled ssh

Переглянути активні сервіси:

    systemctl list-units --type=service --state=running

Важливо розрізняти:

    installed → програмне забезпечення встановлено
    active    → сервіс зараз працює
    enabled   → сервіс налаштовано на запуск під час завантаження

Сервіс може бути активним, але не enabled. І навпаки, enabled-сервіс може бути неактивним після невдалого запуску.

Детальніше:

    13-services-and-logs

---

# Listening Ports

Listening port — мережевий порт, на якому процес очікує на з'єднання.

Перевірити TCP-сокети, що прослуховуються:

    ss -ltn

Перевірити TCP та UDP:

    ss -tuln

Переглянути процеси, якщо доступні необхідні права:

    sudo ss -tulpn

Основні параметри:

    -t → TCP
    -u → UDP
    -l → listening sockets
    -n → числові адреси та порти
    -p → інформація про процес

Приклад можливих портів:

    22   → SSH
    80   → HTTP
    443  → HTTPS
    3000 → часто використовується для Node.js у розробці

Це типові приклади, а не гарантія того, що саме ці порти використовуються на сервері.

Важливо:

- порт `3000` не є обов'язковим для Node.js;
- Nginx може слухати `80` і `443`;
- backend може слухати тільки `127.0.0.1:3000`;
- доступність порту залежить від адреси прив'язки, firewall та мережевої конфігурації.

---

# Firewall Basics

Firewall — механізм контролю мережевих з'єднань.

На Ubuntu може використовуватися UFW.

Перевірити наявність UFW:

    command -v ufw

Перевірити стан:

    sudo ufw status verbose

Якщо UFW не встановлений, команда буде недоступна.

Важливо: відсутність UFW не доводить, що система не має firewall. Правила можуть керуватися іншими інструментами або зовнішньою інфраструктурою.

Перед зміною правил на віддаленому сервері потрібно переконатися, що SSH-з'єднання не буде заблоковане.

Типові порти вебсервера:

    22/tcp  → SSH
    80/tcp  → HTTP
    443/tcp → HTTPS

Відкривати порти потрібно лише тоді, коли це необхідно для архітектури застосунку.

Наприклад, якщо Nginx приймає зовнішні запити, backend-порт `3000` зазвичай не потрібно відкривати для всього інтернету.

Детальніше:

    07-firewall-basics

---

# Logs

Logs — записи про події системи та застосунків.

Вони допомагають діагностувати:

    application startup failures
    permission errors
    network problems
    database connection errors
    service crashes
    configuration mistakes

Переглянути системний журнал:

    journalctl

Переглянути останні записи:

    journalctl -n 50

Переглядати нові записи:

    journalctl -f

Переглянути записи конкретного сервісу:

    journalctl -u ssh

Переглянути записи сервісу за поточне завантаження системи:

    journalctl -b

Для Node.js-застосунку спосіб перегляду логів залежить від того, як саме його запущено.

Якщо застосунок працює через systemd, журнали зазвичай можна переглядати через `journalctl`.

Не записуйте в логи паролі, токени доступу та інші секрети.

Детальніше:

    06-logs-and-troubleshooting

---

# Security Updates

Оновлення безпеки усувають відомі вразливості операційної системи та програмного забезпечення.

На Ubuntu:

    sudo apt update

Переглянути доступні оновлення можна за допомогою відповідних інструментів APT.

Встановити звичайні оновлення:

    sudo apt upgrade

Перед оновленням production-сервера варто:

    review available updates
    check disk space
    understand service restart requirements
    ensure backups where necessary
    plan recovery if something fails

Не потрібно бездумно запускати команди, які автоматично видаляють пакети, змінюють конфігурацію або виконують масштабні системні оновлення.

Безпека сервера включає не лише оновлення:

    SSH access control
    least privilege
    firewall
    secret management
    application updates
    log monitoring
    backups

---

# Server Environment Checklist

Перед deployment Node.js або NestJS-застосунку корисно перевірити основні параметри сервера.

## 1. Operating System

    cat /etc/os-release
    uname -r
    uname -m

Перевірити:

    Linux distribution
    kernel version
    architecture

## 2. Hostname and User

    hostname
    whoami
    id

Перевірити:

    server identity
    current user
    user privileges

## 3. Resources

    uptime
    lscpu
    free -h
    df -h

Перевірити:

    CPU
    RAM
    load average
    disk space

## 4. Networking

    ip -br addr
    ip route
    ss -tuln

Перевірити:

    network interfaces
    IP addresses
    routing
    listening ports

## 5. Software

    node --version
    npm --version
    git --version
    command -v nginx

Перевірити, чи встановлено потрібні інструменти.

Не всі команди обов'язково мають бути доступні до встановлення відповідного програмного забезпечення.

## 6. Services

    systemctl --failed
    systemctl list-units --type=service --state=running

Перевірити стан сервісів і наявність невдалих запусків.

## 7. Logs

    journalctl -p err -b

Переглянути системні записи рівня error або критичніші за поточне завантаження системи.

Наявність помилок у журналі не завжди означає, що сервер несправний. Потрібно аналізувати контекст, час і відповідний сервіс.

## 8. Security

    sudo -l
    sudo ufw status verbose

Перевірити права поточного користувача та стан UFW, якщо він використовується.

---

# Practical Example 1 — Inspect Linux Server

Мета: отримати базову інформацію про Linux-середовище.

Команди:

    hostname
    cat /etc/os-release
    uname -r
    uname -m
    whoami
    id
    uptime

Що потрібно зрозуміти:

    hostname       → ім'я системи
    os-release     → дистрибутив
    uname -r       → версія ядра
    uname -m       → архітектура
    whoami         → поточний користувач
    id             → UID, GID і групи
    uptime         → тривалість роботи та load average

---

# Practical Example 2 — Check Server Resources

Мета: перевірити, чи достатньо ресурсів для запуску застосунку.

Команди:

    lscpu
    free -h
    df -h
    du -sh ~/projects
    uptime
    top

Зверни увагу на:

    CPU capacity
    available RAM
    swap usage
    filesystem usage
    application processes
    load average

Не роби висновок про нестачу ресурсів на підставі лише одного показника.

---

# Practical Example 3 — Check Node.js Environment

Мета: перевірити, чи підготовлене середовище для Node.js.

Команди:

    node --version
    npm --version
    command -v node
    command -v npm
    git --version

Перевірити робочу директорію:

    pwd
    ls -la

Перевірити змінні середовища:

    printenv NODE_ENV
    printenv PORT

Якщо змінні не задані, команда може нічого не вивести.

Для навчального проєкту важливо розуміти:

    Node.js installed
        ↓
    correct version selected
        ↓
    project dependencies installed
        ↓
    environment configured
        ↓
    application can start

Встановлений Node.js сам по собі не означає, що застосунок готовий до запуску.

---

# Practical Example 4 — Check Listening Ports

Мета: з'ясувати, які порти прослуховуються.

Команда:

    sudo ss -tulpn

Можна перевірити конкретний порт:

    sudo ss -ltnp 'sport = :3000'

Якщо команда не показує результат, це може означати, що на відповідному TCP-порту зараз немає listening socket.

Якщо Node.js має слухати порт `3000`, але його немає в результатах, перевір:

    application startup
    configured port
    process status
    startup logs
    binding address

Якщо процес слухає тільки `127.0.0.1:3000`, пряме підключення з іншого комп'ютера до IP сервера не працюватиме через цей сокет.

---

# Practical Example 5 — Prepare a Deployment Directory

Мета: зрозуміти, як створюється директорія для серверного застосунку.

Приклад:

    sudo mkdir -p /srv/my-app
    ls -ld /srv/my-app

Тут:

    sudo        → виконати команду з підвищеними правами
    mkdir       → створити директорію
    -p          → створити відсутні батьківські директорії
    /srv/my-app → шлях до директорії

Після створення потрібно визначити, який користувач повинен володіти директорією та мати право запису.

Перевірити:

    ls -ld /srv/my-app

Не змінюй власника або права автоматично без розуміння моделі доступу.

Для production варто розділяти:

    application code
    runtime data
    secrets
    logs
    backups

Конкретне розміщення залежить від архітектури проєкту.

---

# Practical Example 6 — Understand the Request Path

Мета: зрозуміти, як зовнішній запит доходить до Node.js API.

Типова схема:

    Client
        |
        | HTTPS
        v
    Public IP / DNS
        |
        v
    Firewall
        |
        v
    Nginx :443
        |
        | Reverse proxy
        v
    Node.js :3000
        |
        v
    PostgreSQL

Основні компоненти:

    DNS              → перетворення доменного імені на адресу
    Public IP        → зовнішня мережева адреса
    Firewall         → контроль мережевих з'єднань
    Nginx            → приймання HTTP/HTTPS-запитів
    Node.js          → виконання backend-коду
    PostgreSQL       → зберігання даних

У цьому прикладі зовнішні клієнти підключаються до Nginx, а Node.js може бути доступним лише локально.

Це один із типових варіантів deployment, а не єдина можлива архітектура.

---

# Типові помилки

❌ **Вважати localhost адресою віддаленого сервера.**

    http://localhost:3000

У браузері `localhost` означає комп'ютер, на якому запущено браузер, а не віддалений VPS.

---

❌ **Вважати, що запущений Node.js автоматично доступний з інтернету.**

Потрібно перевірити:

    binding address
    listening port
    firewall
    routing
    reverse proxy
    hosting configuration

---

❌ **Плутати private IP та public IP.**

Private IP зазвичай використовується у внутрішній мережі. Public IP використовується для маршрутизації через публічний інтернет, якщо мережеві умови це дозволяють.

---

❌ **Вважати, що встановлена програма обов'язково працює.**

    installed ≠ running

Перевіряй процеси та стан сервісів.

---

❌ **Вважати, що активний сервіс автоматично запускається після перезавантаження.**

    active ≠ enabled

Перевіряй:

    systemctl status service-name
    systemctl is-enabled service-name

---

❌ **Запускати production-застосунок від root без необхідності.**

Застосунок повинен працювати з мінімально необхідними правами.

---

❌ **Відкривати всі порти для зручності.**

Відкривай тільки ті порти, які потрібні для роботи системи.

---

❌ **Використовувати chmod 777 для виправлення будь-якої проблеми з доступом.**

Спочатку потрібно з'ясувати власника, групу та необхідні права.

---

❌ **Ігнорувати заповнення диска.**

Перевіряй:

    df -h

Логи, залежності, завантажені файли та резервні копії можуть займати значний простір.

---

❌ **Вважати, що високий load average завжди означає перевантаження CPU.**

Потрібно враховувати кількість CPU, очікування I/O та інші системні показники.

---

❌ **Зберігати секрети в Git.**

Не додавай до репозиторію:

    database passwords
    API keys
    access tokens
    private keys
    production secrets

---

❌ **Припускати, що systemd автоматично використовує Node.js із nvm.**

Середовище systemd може відрізнятися від інтерактивної Bash-сесії.

Для сервісу необхідно явно налаштувати робочий каталог, користувача, змінні середовища та шлях до виконуваного файла.

---

# Питання зі співбесіди

Що таке server?

Чим сервер відрізняється від звичайного комп'ютера?

Що таке Linux server?

Що таке VPS?

Що таке cloud server?

Що таке server environment?

Чим development environment відрізняється від production environment?

Для чого використовують staging environment?

Що таке localhost?

Що таке loopback address?

Чим відрізняються `127.0.0.1` та `0.0.0.0`?

Що таке binding address?

Що таке hostname?

Яка різниця між hostname та IP address?

Що таке private IP?

Що таке public IP?

Для чого використовується `ip addr`?

Що показує `ip route`?

Як перевірити версію Linux kernel?

Як визначити Linux distribution?

Як перевірити архітектуру системи?

Для чого потрібні CPU та RAM?

Що показує команда `free -h`?

Що таке swap?

Що показує команда `df -h`?

Чим `df` відрізняється від `du`?

Що таке uptime?

Що означає load average?

Що таке root user?

Для чого використовується sudo?

Чому не рекомендується постійно працювати від root?

Що таке package manager?

Чим `apt update` відрізняється від `apt upgrade`?

Що таке Node.js runtime?

Як перевірити версію Node.js?

Чим installed software відрізняється від running process?

Що таке environment variables?

Як передати змінну середовища процесу Node.js?

Чому не можна зберігати секрети в Git?

Що таке deployment directory?

Для чого використовують `/etc`, `/var`, `/srv` та `/opt`?

Що таке Linux user та group?

Для чого потрібні file permissions?

Що таке listening port?

Як перевірити, які порти прослуховуються?

Для чого потрібен firewall?

Чому backend-порт не завжди потрібно відкривати в інтернет?

Що таке system service?

Чим `active` відрізняється від `enabled`?

Для чого потрібні журнали?

Як переглянути журнали systemd-сервісу?

Що потрібно перевірити перед deployment Node.js-застосунку?

Як працюють Nginx, Node.js і PostgreSQL разом?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке Linux server.

Що таке server environment.

Development vs production.

Основи VPS.

`hostname`.

`uname`.

`/etc/os-release`.

`whoami`.

`id`.

`sudo`.

`pwd`.

`ls -la`.

`lscpu`.

`free -h`.

`df -h`.

`du -sh`.

`uptime`.

`ip addr`.

`ip route`.

`ss -tuln`.

Основи IP-адрес.

Основи localhost.

Основи environment variables.

Перевірка Node.js та npm.

Основи Linux filesystem hierarchy.

Основи користувачів і прав доступу.

Основи системних сервісів.

Основи логів.

Основи мережевої безпеки.

---

## 🔵 Junior — практична робота

Самостійно перевіряти стан Linux-сервера.

Розуміти CPU, RAM, swap та disk usage.

Розуміти public IP та private IP.

Розуміти, як працює SSH-доступ.

Визначати, на яких портах працюють застосунки.

Перевіряти доступність Node.js.

Розуміти вплив `PATH` на пошук виконуваних файлів.

Розуміти різницю між системним Node.js та Node.js через nvm.

Перевіряти environment variables.

Створювати директорії для deployment.

Розуміти користувачів, групи та permissions.

Перевіряти стан systemd-сервісів.

Переглядати журнали.

Перевіряти firewall.

Розуміти базову архітектуру:

    Nginx
        ↓
    Node.js / NestJS
        ↓
    PostgreSQL

Розуміти, чому backend не завжди повинен слухати публічний інтерфейс.

---

## 🟠 Middle — системне адміністрування та deployment

Діагностика нестачі RAM.

Аналіз CPU load та I/O.

Планування дискового простору.

Управління користувачами й групами.

Least privilege.

Організація production directory structure.

Безпечне керування environment variables.

Управління версіями Node.js.

Налаштування systemd для Node.js-застосунків.

Налаштування автоматичного запуску.

Обробка помилок запуску.

Робота з `journalctl`.

Firewall configuration.

Reverse proxy.

HTTPS та TLS.

Моніторинг ресурсів.

Ротація логів.

Backup та recovery.

Deployment automation.

Розділення staging і production.

---

## 🔴 Senior — production architecture

Server hardening.

Infrastructure as Code.

Configuration management.

Zero-downtime deployment.

Blue-green deployment.

Rolling deployment.

Release rollback.

Resource isolation.

Linux namespaces та cgroups.

Container resource limits.

System observability.

Metrics, logs and traces.

Capacity planning.

High availability.

Load balancing.

Disaster recovery.

Security incident response.

Secrets management.

Least-privilege architecture.

Network segmentation.

Automated patch management.

Immutable infrastructure.

Production reliability engineering.

---

# Міні-шпаргалка

## System Information

    hostname
    hostnamectl
    uname -a
    uname -r
    uname -m
    cat /etc/os-release

    → hostname, kernel, distribution, architecture

---

## User

    whoami
    id
    who
    sudo -l

    → current user, groups, privileges

---

## Resources

    lscpu
    nproc
    free -h
    swapon --show
    df -h
    du -sh .
    uptime
    top

    → CPU, RAM, swap, disk, load

---

## Networking

    ip addr
    ip -br addr
    ip route
    ip link
    ss -tuln
    sudo ss -tulpn

    → interfaces, addresses, routes, listening ports

---

## Software

    node --version
    npm --version
    git --version
    command -v node
    command -v npm

    → installed tools, versions, executable paths

---

## Environment Variables

    printenv
    printenv NODE_ENV
    printenv PORT

    PORT=3000 node server.js

    → inspect and pass environment variables

---

## Services

    systemctl status ssh
    systemctl is-enabled ssh
    systemctl --failed
    systemctl list-units --type=service --state=running

    → service status and autostart configuration

---

## Logs

    journalctl -n 50
    journalctl -f
    journalctl -u ssh
    journalctl -b
    journalctl -p err -b

    → system and service logs

---

## Package Management

    sudo apt update
    sudo apt upgrade
    sudo apt install curl
    apt policy curl

    → package indexes, updates, installation

---

## Firewall

    command -v ufw
    sudo ufw status verbose

    → check UFW availability and status

---

## Typical Web Server Ports

    22   → SSH
    80   → HTTP
    443  → HTTPS
    3000 → common development port

    → example ports; actual configuration may differ

---

## Application Request Flow

    Browser
        ↓
    DNS / Public IP
        ↓
    Firewall
        ↓
    Nginx
        ↓
    Node.js / NestJS
        ↓
    PostgreSQL

    → client → web server → backend → database

---

## Server Environment vs Deployment

    Server Environment
        ↓
    Operating System
        ↓
    Node.js Runtime
        ↓
    Environment Configuration
        ↓
    Application Deployment
        ↓
    Process Management
        ↓
    Monitoring

---

# Головне

• Server environment — це сукупність операційної системи, ресурсів, програмного забезпечення, конфігурації та мережевих налаштувань, необхідних для роботи застосунку.

• Linux server може бути фізичним комп'ютером, VPS або хмарною віртуальною машиною.

• Development environment призначене для розробки, а production environment — для обслуговування реальних користувачів.

• `hostname` показує ім'я системи.

• `cat /etc/os-release` показує інформацію про дистрибутив.

• `uname -r` показує версію ядра Linux.

• `lscpu` показує інформацію про процесор.

• `free -h` показує використання RAM і swap.

• `df -h` показує використання файлових систем.

• `du -sh` показує розмір файлів і директорій.

• `uptime` показує тривалість роботи системи та load average.

• `ip addr` показує IP-адреси мережевих інтерфейсів.

• `ss -tuln` допомагає перевірити listening ports.

• `localhost` зазвичай означає поточний комп'ютер, а не віддалений сервер.

• `127.0.0.1` — loopback-адреса, а `0.0.0.0` — адреса прив'язки до всіх локальних IPv4-інтерфейсів.

• Public IP, firewall і правильна адреса прив'язки впливають на доступність застосунку з мережі.

• `sudo` дозволяє виконувати адміністративні команди, але не повинен використовуватися без необхідності.

• Environment variables допомагають передавати конфігурацію застосунку без жорсткого записування значень у код.

• Секрети не потрібно зберігати у відкритому Git-репозиторії.

• Встановлена програма не обов'язково працює, а активний сервіс не обов'язково налаштований на автоматичний запуск.

• Production-застосунок повинен мати правильні права доступу, конфігурацію, спосіб запуску та механізм перегляду логів.

• Для Node.js/NestJS часто використовується архітектура:

    Nginx
        ↓
    Node.js / NestJS
        ↓
    PostgreSQL

• Backend-порт не обов'язково відкривати для всього інтернету. Якщо Nginx працює як reverse proxy, backend часто можна залишити доступним лише локально.

• Перед deployment потрібно перевірити операційну систему, ресурси, мережу, версію Node.js, права доступу та конфігурацію середовища.

• Сервер потрібно регулярно оновлювати, захищати від несанкціонованого доступу та контролювати його стан.

• Основна мета цього розділу — навчитися самостійно перевіряти Linux-сервер і розуміти, чи готовий він до розгортання Node.js або NestJS-застосунку.

• Наступні теми розділу `15-web-server-and-deployment` поступово розширюють ці знання:

    02-nodejs-server
        → запуск Node.js на сервері

    03-environment-configuration
        → конфігурація середовища

    04-nginx-basics
        → основи Nginx

    05-reverse-proxy
        → проксування запитів до backend

    06-logs-and-troubleshooting
        → журнали та діагностика

    07-firewall-basics
        → правила мережевого доступу

    08-deployment-project
        → практичне розгортання застосунку
# 01. systemd Basics

`systemd` — це система ініціалізації та керування системними службами Linux. Вона запускається під час завантаження системи, керує запуском інших процесів, службами, залежностями між ними та допомагає підтримувати систему в робочому стані.

`systemd` є стандартною системою керування службами в багатьох сучасних дистрибутивах Linux, зокрема Ubuntu.

Використовується для:

- запуску системних служб під час завантаження Linux;
- керування фоновими процесами;
- визначення порядку запуску служб;
- керування залежностями між службами;
- запуску служб вручну;
- автоматичного запуску служб після перезавантаження;
- контролю стану служб;
- діагностики проблем із запуском служб;
- перегляду системних журналів через `journalctl`.

Основні поняття:

    systemd
    PID 1
    systemd unit
    service
    daemon
    unit file
    target
    dependency
    systemctl
    journal
    journalctl

---

### Ключові поняття

✔ `systemd`  
✔ init system  
✔ PID 1  
✔ process management  
✔ service  
✔ daemon  
✔ systemd unit  
✔ unit file  
✔ service unit  
✔ target  
✔ dependency  
✔ system boot  
✔ startup  
✔ shutdown  
✔ systemctl  
✔ journal  
✔ journalctl  
✔ system service  
✔ user service  
✔ background process  
✔ enable  
✔ start  
✔ stop  
✔ restart  
✔ reload  
✔ active  
✔ inactive  
✔ failed  

---

### Що потрібно пам'ятати

• `systemd` — система ініціалізації та керування службами Linux.

• Вона зазвичай запускається першою в користувацькому просторі під час завантаження системи.

• У типовій системі з `systemd` процес має PID `1`.

• `systemd` керує службами, залежностями, цілями завантаження та іншими системними ресурсами.

• `systemd unit` — об'єкт, яким керує `systemd`.

• `service` — служба, яка виконує певну роботу у фоновому режимі або запускає процес для виконання завдання.

• `daemon` — фоновий процес, який надає певну функціональність або обслуговує запити.

• `systemctl` — основна команда для керування `systemd` units.

• `journalctl` — команда для перегляду журналів `systemd`.

• `start` запускає службу зараз, але сам по собі не налаштовує автоматичний запуск після перезавантаження.

• `enable` налаштовує автоматичний запуск служби відповідно до її конфігурації, але сам по собі не обов'язково запускає її зараз.

• `enable --now` поєднує налаштування автоматичного запуску із запуском служби.

• Не кожен процес Linux керується `systemd`.

• Назва служби, наприклад `ssh.service`, не завжди збігається з назвою виконуваного файлу.

• `systemd` не замінює ядро Linux. Це програмна система, яка працює поверх ядра.

---

# Що таке init system

`init system` — система, яка запускається на ранньому етапі завантаження Linux та організовує запуск і керування іншими процесами користувацького простору.

Після запуску ядра Linux потрібно запустити системні компоненти, налаштувати середовище та запустити служби.

Спрощена послідовність завантаження:

    BIOS / UEFI
        ↓
    Bootloader
        ↓
    Linux kernel
        ↓
    init system (PID 1)
        ↓
    system services
        ↓
    login / graphical environment
        ↓
    user applications

Наприклад, у системі з `systemd` після запуску ядра запускається `systemd`, який організовує запуск необхідних системних служб.

У цій схемі пропущено деякі деталі завантаження, але для початкового рівня вона показує загальну логіку.

---

# Що таке systemd

`systemd` — це система керування службами та іншими системними об'єктами Linux.

Вона може:

    start services
    stop services
    restart services
    monitor services
    manage dependencies
    coordinate system startup
    manage system targets
    collect service logs
    start scheduled tasks
    manage mount points

Наприклад, у Linux можуть працювати такі служби:

    ssh.service
    cron.service
    NetworkManager.service
    postgresql.service

Їхні назви залежать від установленого програмного забезпечення та дистрибутива.

Перевірити, чи використовується `systemd` як init system:

    ps -p 1 -o pid,comm,args

Приклад результату:

    PID COMMAND         COMMAND
      1 systemd         /sbin/init

На деяких системах шлях до виконуваного файлу або відображення назви може відрізнятися.

Головне:

    PID 1 → зазвичай systemd

Якщо команда показує інший процес, система може використовувати іншу init system або спеціальне середовище, наприклад контейнер.

---

# PID 1

`PID` (Process ID) — ідентифікатор процесу.

У типовій Linux-системі процес `systemd` має PID `1`.

Перевірити:

    ps -p 1 -o pid,comm

Результат:

    PID COMMAND
      1 systemd

Інший спосіб:

    cat /proc/1/comm

Можливий результат:

    systemd

PID `1` має особливу роль у системі:

- запускається на ранньому етапі користувацького простору;
- організовує запуск інших процесів;
- бере участь в управлінні системними службами;
- виконує спеціальні функції, пов'язані з процесами-сиротами.

У контейнерах PID `1` може бути іншим процесом.

Важливо розрізняти:

    Linux kernel
        ↓
    PID 1
        ↓
    other processes

Ядро Linux не має PID `1`. PID `1` належить першому процесу користувацького простору.

---

# Service

`Service` — служба, яка надає певну функціональність системі або іншим програмам.

Приклади:

    SSH server
    PostgreSQL server
    web server
    network management
    scheduled task service

Служби часто працюють у фоновому режимі.

Наприклад, SSH-сервер дозволяє підключатися до Linux-комп'ютера через мережу.

PostgreSQL-сервер приймає підключення до бази даних і виконує SQL-запити.

Приклади назв служб:

    ssh.service
    postgresql.service
    nginx.service
    cron.service

Наявність цих служб залежить від установлених пакетів і конфігурації системи.

Перевірити стан служби:

    systemctl status ssh

Якщо служба встановлена та доступна, команда покаже її поточний стан.

---

# Daemon

`Daemon` — процес, який зазвичай працює у фоновому режимі та надає певну функціональність.

Приклади:

    sshd
    nginx
    postgres
    cron

У багатьох назвах демонів використовується суфікс `d`, наприклад `sshd`.

Проте це лише поширена домовленість, а не обов'язкове правило.

Порівняння:

    service → служба як керований компонент
    daemon  → фоновий процес

Ці поняття пов'язані, але не тотожні.

У `systemd` служба часто описується файлом `*.service`, який визначає, як запускати та контролювати відповідний процес.

Водночас не кожен демон обов'язково керується `systemd`, а не кожна служба повинна залишатися запущеною постійно.

---

# systemd Unit

`Unit` — базовий об'єкт керування в `systemd`.

Unit описує певний ресурс, службу, дію або стан системи.

Основні типи units:

    .service
    .target
    .socket
    .timer
    .mount
    .automount
    .path
    .device
    .swap
    .slice
    .scope

Для початкового вивчення Linux особливо важливі:

    .service → служби
    .target  → групи units та цілі системи
    .timer   → запуск дій за розкладом
    .socket  → активація через сокети
    .mount   → точки монтування

Приклади:

    ssh.service
    multi-user.target
    apt-daily.timer
    ssh.socket

Не всі наведені units обов'язково існують у кожному дистрибутиві.

Переглянути завантажені units:

    systemctl list-units

Показати units, включно з неактивними, які systemd знає:

    systemctl list-units --all

Переглянути лише служби:

    systemctl list-units --type=service

Переглянути файли служб та інших установлених units:

    systemctl list-unit-files

Важливо розрізняти:

    list-units
        → відомі systemd units та їхні поточні стани

    list-unit-files
        → установлені unit-файли та їхні налаштування запуску

---

# Unit File

`Unit file` — конфігураційний файл, який описує, як `systemd` має керувати певним unit.

Приклади:

    ssh.service
    nginx.service
    postgresql.service

Файли units можуть міститися в різних каталогах.

Основні каталоги:

    /etc/systemd/system/
    /run/systemd/system/
    /usr/lib/systemd/system/
    /lib/systemd/system/

Точні шляхи залежать від дистрибутива та його організації файлової системи. На системах з об'єднаними каталогами `/usr` шляхи `/lib` та `/usr/lib` можуть бути пов'язані.

Зазвичай:

    /etc/systemd/system/
        → локальні конфігурації адміністратора

    /run/systemd/system/
        → конфігурації, що існують до перезавантаження

    /usr/lib/systemd/system/
        → unit-файли, установлені пакетами в багатьох сучасних системах

Знайти файл конкретної служби:

    systemctl show -p FragmentPath ssh.service

Можливий результат:

    FragmentPath=/usr/lib/systemd/system/ssh.service

Шлях може відрізнятися.

Переглянути повний unit-файл:

    systemctl cat ssh.service

Команда покаже основний файл і, якщо є, відповідні додаткові фрагменти конфігурації.

---

# Структура Service Unit File

Типовий unit-файл може містити кілька секцій.

    [Unit]
    Description=Example application
    After=network.target

    [Service]
    Type=simple
    ExecStart=/usr/bin/example-app

    [Install]
    WantedBy=multi-user.target

Це навчальний приклад структури, а не готова конфігурація для конкретної програми. Шлях `/usr/bin/example-app` повинен відповідати реальному виконуваному файлу.

---

## Секція [Unit]

Містить загальні параметри служби та її залежностей.

Наприклад:

    [Unit]
    Description=Example application
    After=network.target

Основні параметри:

    Description
        → короткий опис

    After
        → порядок запуску відносно іншого unit

    Before
        → порядок запуску перед іншим unit

    Requires
        → жорстка залежність від іншого unit

    Wants
        → слабша залежність від іншого unit

Важливо:

`After=` визначає порядок, а не автоматично запускає зазначену службу.

Наприклад:

    After=network.target

означає, що поточний unit має запускатися після досягнення відповідного стану `network.target`, якщо обидва units запускаються.

Це не гарантує, що мережа вже має повний доступ до Інтернету.

---

## Секція [Service]

Містить параметри запуску та керування процесом служби.

Наприклад:

    [Service]
    Type=simple
    ExecStart=/usr/bin/example-app

Основні параметри:

    Type
        → тип служби

    ExecStart
        → команда запуску

    ExecStop
        → команда зупинки, якщо потрібна окрема

    ExecReload
        → команда перезавантаження конфігурації, якщо підтримується

    Restart
        → правила автоматичного перезапуску

    User
        → користувач, від імені якого запускається процес

    Group
        → група процесу

    WorkingDirectory
        → робочий каталог

    Environment
        → змінні середовища

    EnvironmentFile
        → файл зі змінними середовища

Наприклад:

    [Service]
    Type=simple
    User=appuser
    WorkingDirectory=/opt/example-app
    ExecStart=/usr/bin/node /opt/example-app/server.js
    Restart=on-failure

Цей приклад передбачає, що існують користувач `appuser`, каталог проєкту та відповідний файл Node.js.

Не запускай невідомі програми як системні служби без перевірки їхніх прав і походження.

---

## Секція [Install]

Містить інформацію, яку використовують під час налаштування автоматичного ввімкнення unit.

Наприклад:

    [Install]
    WantedBy=multi-user.target

`WantedBy=` указує, до якої цілі додається зв'язок під час `systemctl enable`.

Сама секція `[Install]` не є командою запуску. Її параметри використовуються під час налаштування запуску.

Важливо:

    systemctl start
        → запускає зараз

    systemctl enable
        → налаштовує автоматичний запуск

---

# Targets

`Target` — спеціальний тип unit, який об'єднує інші units та допомагає визначати потрібний стан системи.

Targets можна розглядати як групи або контрольні точки запуску.

Приклади:

    basic.target
    multi-user.target
    graphical.target
    rescue.target
    emergency.target
    network.target

Основні targets:

    basic.target
        → базовий стан системи

    multi-user.target
        → багатокористувацький режим із системними службами

    graphical.target
        → графічне середовище, якщо воно встановлене

    rescue.target
        → режим відновлення з обмеженим набором служб

    emergency.target
        → мінімальне аварійне середовище

`network.target` є важливою точкою синхронізації для мережевих служб, але не означає гарантовану готовність мережевого підключення до зовнішніх ресурсів.

---

# Default Target

`Default target` — ціль, яку `systemd` використовує за замовчуванням під час звичайного завантаження.

Перевірити поточну ціль за замовчуванням:

    systemctl get-default

Можливий результат:

    graphical.target

Або:

    multi-user.target

Це залежить від конфігурації системи.

Переглянути зв'язок default target:

    ls -l /etc/systemd/system/default.target

Команда може показати символічне посилання на відповідний target.

Змінити ціль за замовчуванням можна командою:

    sudo systemctl set-default multi-user.target

Це змінить налаштування наступного звичайного завантаження. Поточний графічний сеанс автоматично не обов'язково завершиться.

Для повернення до графічної цілі, якщо вона встановлена:

    sudo systemctl set-default graphical.target

Змінюй default target лише тоді, коли розумієш, як це вплине на запуск графічного середовища.

---

# Dependencies

`Dependencies` — залежності між units.

Служби часто залежать від інших системних компонентів.

Наприклад:

    application.service
        ↓
    database.service

Умовна схема означає, що застосунку для роботи потрібна база даних. Реальний порядок і залежності визначаються конфігурацією.

Основні директиви:

    Wants=
    Requires=
    After=
    Before=
    BindsTo=
    PartOf=

Для початкового рівня достатньо добре розуміти `Wants=`, `Requires=` та `After=`.

### Wants=

Оголошує слабшу залежність. `systemd` намагається активувати пов'язаний unit, але невдалий запуск залежності не завжди зупиняє основний unit.

### Requires=

Оголошує сильнішу залежність. Якщо потрібний unit не може бути активований під час відповідної операції, це може вплинути на запуск основного unit.

### After=

Визначає порядок активації.

Наприклад:

    [Unit]
    Requires=database.service
    After=database.service

Тут:

    Requires=
        → вимагає залежність

    After=
        → задає порядок запуску

Це різні механізми. `After=` без `Requires=` не означає, що інший unit обов'язково буде запущено.

---

# systemctl

`systemctl` — основна команда для керування службами та іншими units `systemd`.

Загальний синтаксис:

    systemctl [OPTIONS] COMMAND [UNIT...]

Приклади:

    systemctl status ssh
    systemctl start ssh
    systemctl stop ssh
    systemctl restart ssh
    systemctl enable ssh

На багатьох системах можна вказувати коротку назву служби без суфікса `.service`.

Наприклад:

    systemctl status ssh

еквівалентно для служби:

    systemctl status ssh.service

Однак для деяких команд та типів units повна назва може бути кориснішою.

---

# Основні команди systemctl

## Переглянути стан служби

    systemctl status ssh

Показує:

    Loaded
    Active
    Main PID
    Process information
    Recent log messages

Для системної служби читання статусу зазвичай не потребує `sudo`.

---

## Запустити службу

    sudo systemctl start ssh

Запускає службу зараз.

Це не налаштовує автоматичний запуск після перезавантаження.

---

## Зупинити службу

    sudo systemctl stop ssh

Зупиняє службу.

Перед зупинкою важливо переконатися, що це не порушить роботу системи або застосунків.

Наприклад, зупинка мережевої служби під час віддаленого підключення може призвести до втрати доступу.

---

## Перезапустити службу

    sudo systemctl restart ssh

Зупиняє та знову запускає службу.

Використовується, коли потрібно перезапустити процес, наприклад після певних змін конфігурації.

---

## Перезавантажити конфігурацію служби

    sudo systemctl reload nginx

Просить службу перечитати конфігурацію без повного перезапуску, якщо ця можливість підтримується.

Не всі служби підтримують `reload`.

Альтернатива, якщо служба не підтримує reload і перезапуск безпечний:

    sudo systemctl restart nginx

---

## Увімкнути автоматичний запуск

    sudo systemctl enable ssh

Налаштовує запуск служби під час відповідного завантаження системи.

Не обов'язково запускає її зараз.

---

## Вимкнути автоматичний запуск

    sudo systemctl disable ssh

Прибирає налаштування автоматичного запуску.

Це саме по собі не зупиняє вже запущену службу.

---

## Увімкнути та запустити

    sudo systemctl enable --now ssh

Виконує дві дії:

    enable
        → налаштувати автоматичний запуск

    --now
        → запустити службу зараз

---

## Вимкнути автоматичний запуск і зупинити

    sudo systemctl disable --now ssh

Вимикає автоматичний запуск і просить зупинити службу зараз.

---

# Enable vs Start

Це одна з найважливіших відмінностей у роботі з `systemd`.

    start
        → запустити зараз

    stop
        → зупинити зараз

    restart
        → перезапустити зараз

    reload
        → перечитати конфігурацію, якщо підтримується

    enable
        → налаштувати автоматичний запуск

    disable
        → вимкнути автоматичний запуск

    enable --now
        → налаштувати автоматичний запуск і запустити зараз

    disable --now
        → вимкнути автоматичний запуск і зупинити зараз

Приклад:

    sudo systemctl start nginx

Nginx запускається зараз, але після перезавантаження системи він не обов'язково запуститься автоматично.

Якщо потрібен автоматичний запуск:

    sudo systemctl enable nginx

Якщо потрібно зробити обидві дії:

    sudo systemctl enable --now nginx

---

# Перевірка Active State

Перевірити лише активний стан:

    systemctl is-active ssh

Можливий результат:

    active

Інші результати можуть містити:

    inactive
    failed
    activating
    deactivating

Команда повертає також код завершення, який зручно використовувати в Bash-скриптах.

Наприклад:

    if systemctl is-active --quiet ssh; then
        echo "SSH service is active"
    else
        echo "SSH service is not active"
    fi

Тут `--quiet` прибирає звичайний текстовий вивід, а результат перевіряється через код завершення.

---

# Перевірка Enable State

Перевірити, чи налаштовано автоматичний запуск:

    systemctl is-enabled ssh

Можливі результати:

    enabled
    disabled
    static
    masked
    indirect
    generated
    alias

Значення:

    enabled
        → unit налаштований для автоматичного запуску

    disabled
        → автоматичний запуск не налаштований через enable

    static
        → unit не має звичайної конфігурації [Install] для прямого enable

    masked
        → запуск unit заблоковано через маскування

Важливо:

`enabled` не означає, що служба зараз працює.

`disabled` не означає, що служба зараз зупинена.

Активний стан і налаштування автоматичного запуску — різні речі.

---

# Service Status

Для швидкого перегляду стану служби:

    systemctl status ssh

У результаті можуть бути рядки:

    Loaded: loaded (...)
    Active: active (running)
    Main PID: 1234 (sshd)

Цифри та текст наведено як умовний приклад.

Основні поля:

    Loaded
        → чи завантажено визначення unit та його стан

    Active
        → загальний стан unit

    Main PID
        → головний процес служби, якщо застосовно

    Tasks
        → інформація про задачі служби

    Memory
        → використання пам'яті, якщо доступно

    CGroup
        → група керування процесами служби

Статус також може містити останні повідомлення журналу.

Для вивчення діагностики докладніші матеріали будуть у розділах:

    02-systemctl
    03-journalctl
    04-service-status
    05-service-failures
    06-service-debugging-project

---

# Журнали systemd

`systemd` може збирати повідомлення від системних служб через `systemd-journald`.

Для перегляду журналів використовується:

    journalctl

Приклади:

    journalctl
    journalctl -b
    journalctl -u ssh
    journalctl -p err

Основні команди:

    journalctl
        → переглянути доступні записи журналу

    journalctl -b
        → записи поточного завантаження

    journalctl -u ssh
        → записи конкретного unit

    journalctl -p err
        → повідомлення рівня error та серйозніші

Перегляд останніх записів конкретної служби:

    journalctl -u ssh -n 50

Стеження за новими записами:

    journalctl -u ssh -f

У деяких системах доступ до частини системних журналів може потребувати підвищених прав:

    sudo journalctl -u ssh

Детальніше про журнали буде в розділі `03-journalctl`.

---

# systemd-journald

`systemd-journald` — служба, яка збирає та зберігає системні журнальні повідомлення.

Вона може збирати:

    kernel messages
    service logs
    systemd messages
    process output
    structured journal fields

Перевірити її стан:

    systemctl status systemd-journald

Переглянути її журнали:

    journalctl -u systemd-journald

`systemd-journald` і `journalctl` — не одне й те саме.

    systemd-journald
        → збирає та зберігає записи журналу

    journalctl
        → читає та показує записи журналу

---

# System Services vs User Services

`systemd` підтримує системні служби та користувацькі служби.

## System services

Системні служби керуються системним екземпляром `systemd`.

Приклади:

    ssh.service
    nginx.service
    postgresql.service

Типові команди:

    sudo systemctl start nginx
    systemctl status nginx

Для більшості змін стану системних служб потрібні права адміністратора.

## User services

Користувацькі служби керуються екземпляром `systemd`, пов'язаним із конкретним користувачем.

Приклади команд:

    systemctl --user list-units --type=service
    systemctl --user status
    systemctl --user list-unit-files

Такі служби можуть використовуватися для персональних фонових задач користувача.

Не всі користувацькі служби працюють після виходу користувача із системи. Це залежить від конфігурації та наявності механізму linger.

Головна різниця:

    systemctl
        → системний екземпляр systemd

    systemctl --user
        → користувацький екземпляр systemd

---

# Systemd та процеси

`systemd` керує службами, але не означає, що абсолютно всі процеси системи є окремими службами.

Переглянути процеси:

    ps aux

Переглянути дерево процесів:

    pstree -p

Якщо `pstree` не встановлено, команда може бути недоступною.

Переглянути процеси конкретної служби:

    systemctl status nginx

Або:

    systemctl show nginx -p MainPID -p ControlGroup

`MainPID` показує головний PID служби, якщо він є.

Деякі служби можуть створювати кілька процесів. У таких випадках головний PID не показує всю структуру процесів.

Для аналізу процесів також використовуються:

    ps
    top
    htop
    pgrep
    pidof
    pstree

Ці команди розглядатимуться в розділі `06-processes-and-system`.

---

# systemd та автоматичний перезапуск

`systemd` може автоматично перезапускати службу відповідно до її unit-конфігурації.

Наприклад:

    [Service]
    Type=simple
    ExecStart=/usr/bin/example-app
    Restart=on-failure

Поширені значення `Restart=`:

    no
        → не перезапускати автоматично

    on-failure
        → перезапускати після певних невдалих завершень

    on-success
        → перезапускати після успішного завершення

    always
        → перезапускати після завершення процесу, з урахуванням правил systemd

Поведінка також залежить від типу служби, результату завершення, обмежень перезапуску та інших параметрів.

Не потрібно вважати, що будь-яка служба автоматично перезапускається після збою.

Щоб перевірити налаштування конкретної служби:

    systemctl show nginx -p Restart

Можливий результат:

    Restart=on-failure

Це лише приклад. Фактичне значення залежить від конфігурації.

---

# Daemon Reload

Після зміни unit-файлу `systemd` може потребувати повторного читання конфігурацій.

Для цього використовується:

    sudo systemctl daemon-reload

Команда змушує менеджер `systemd` повторно завантажити unit-файли та оновити конфігурацію.

Важливо розрізняти:

    daemon-reload
        → перечитати конфігурацію systemd units

    reload service
        → попросити конкретну службу перечитати її власну конфігурацію

Наприклад, після створення або зміни власного файлу:

    /etc/systemd/system/example.service

зазвичай потрібно виконати:

    sudo systemctl daemon-reload

А потім, якщо потрібно запустити службу:

    sudo systemctl start example.service

Якщо служба вже працює і зміни стосуються параметрів запуску процесу, може знадобитися її перезапуск:

    sudo systemctl restart example.service

`daemon-reload` сам по собі не перезапускає всі служби.

---

# Masking Services

`Mask` — механізм, який блокує запуск unit.

Команда:

    sudo systemctl mask example.service

створює маску, яка зазвичай реалізується через посилання на `/dev/null`.

Спроба запуску замаскованого unit зазвичай завершується помилкою.

Перевірити стан:

    systemctl is-enabled example.service

Можливий результат:

    masked

Зняти маску:

    sudo systemctl unmask example.service

Різниця:

    disable
        → вимкнути налаштування автоматичного запуску

    mask
        → заблокувати запуск unit

`disable` не забороняє ручний запуск. `mask` створює значно сильніше обмеження.

Не маскуй системні служби без розуміння наслідків.

---

# Перегляд помилок служб

Коли служба не запускається, корисно виконати кілька команд.

Спочатку:

    systemctl status example.service

Потім:

    journalctl -u example.service -n 50

Для записів поточного завантаження:

    journalctl -b -u example.service

Для повідомлень рівня помилок:

    journalctl -p err -b

Перевірити конфігурацію unit:

    systemctl cat example.service

Перевірити важливі параметри:

    systemctl show example.service

Для власного unit-файлу також можна перевірити конфігурацію за допомогою:

    sudo systemd-analyze verify /etc/systemd/system/example.service

Команда може показати помилки синтаксису, проблеми з посиланнями та інші зауваження.

`example.service` тут — умовна назва. Заміни її на назву своєї служби.

Подробиці діагностики будуть у розділах:

    04-service-status
    05-service-failures
    06-service-debugging-project

---

# systemd-analyze

`systemd-analyze` — інструмент для аналізу завантаження та деяких аспектів конфігурації `systemd`.

Переглянути загальний час завантаження:

    systemd-analyze

Переглянути час, витрачений на завантаження окремих units:

    systemd-analyze blame

Переглянути критичний ланцюжок завантаження:

    systemd-analyze critical-chain

Перевірити unit-файл:

    systemd-analyze verify /etc/systemd/system/example.service

Важливо:

`systemd-analyze blame` показує тривалість запуску units, але сам по собі не визначає, які служби можна безпечно вимкнути.

Не вимикай служби лише через те, що вони довго запускаються.

---

# Практика на Ubuntu

Нижче — базова практика для Linux-системи з `systemd`, наприклад Ubuntu.

## Крок 1. Перевірити PID 1

    ps -p 1 -o pid,comm,args

Завдання:

- визначити, який процес має PID `1`;
- перевірити, чи це `systemd`.

---

## Крок 2. Перевірити версію systemd

    systemctl --version

Команда покаже версію `systemd` та деякі відомості про збірку.

---

## Крок 3. Переглянути активні служби

    systemctl list-units --type=service

Завдання:

- знайти кілька активних служб;
- звернути увагу на назви units;
- подивитися на їхні стани.

Для ширшого списку:

    systemctl list-units --type=service --all

---

## Крок 4. Перевірити конкретну службу

Наприклад:

    systemctl status cron

Залежно від установлених пакетів у системі можуть бути доступні:

    cron.service
    ssh.service
    NetworkManager.service

У деяких системах назви або доступність служб відрізняються.

Завдання:

- знайти рядок `Loaded`;
- знайти рядок `Active`;
- визначити, чи працює служба;
- переглянути останні повідомлення журналу.

---

## Крок 5. Перевірити автоматичний запуск

    systemctl is-enabled cron

Завдання:

- прочитати результат;
- пояснити, чим він відрізняється від `systemctl is-active cron`.

---

## Крок 6. Переглянути журнали

    journalctl -u cron -n 20

Завдання:

- переглянути останні записи;
- знайти повідомлення про запуск або помилки;
- звернути увагу на дату та час.

---

## Крок 7. Переглянути default target

    systemctl get-default

Завдання:

- визначити поточну ціль за замовчуванням;
- пояснити різницю між `multi-user.target` та `graphical.target`.

---

## Крок 8. Перевірити конфігурацію unit

    systemctl cat cron.service

Завдання:

- знайти основний unit-файл;
- переглянути його секції;
- звернути увагу на залежності та параметри служби.

Не редагуй системний unit-файл без необхідності. Для власних налаштувань зазвичай використовують локальні конфігурації та drop-in-файли.

---

# Типові помилки

## ❌ Плутати start та enable

    sudo systemctl start nginx

Це запускає службу зараз, але не обов'язково після перезавантаження.

Для автоматичного запуску:

    sudo systemctl enable nginx

Для обох дій:

    sudo systemctl enable --now nginx

---

## ❌ Вважати, що disable зупиняє службу

    sudo systemctl disable nginx

Це вимикає налаштування автоматичного запуску, але служба може продовжувати працювати.

Щоб також зупинити її:

    sudo systemctl disable --now nginx

---

## ❌ Плутати reload та daemon-reload

    sudo systemctl reload nginx

Просить Nginx перечитати власну конфігурацію, якщо служба підтримує цю операцію.

А:

    sudo systemctl daemon-reload

Перечитує конфігурації units менеджером `systemd`.

---

## ❌ Вважати, що After= запускає залежність

    After=network.target

Це визначає порядок, а не автоматичний запуск залежності.

Для визначення залежностей використовуються відповідні директиви, наприклад `Wants=` або `Requires=`.

---

## ❌ Вважати, що active означає enabled

    systemctl is-active nginx
    systemctl is-enabled nginx

Це дві різні перевірки.

Служба може працювати, але не бути налаштованою на автоматичний запуск.

---

## ❌ Редагувати unit-файли пакетів без потреби

Не варто безпосередньо змінювати файли в каталогах на кшталт:

    /usr/lib/systemd/system/

Оновлення пакета можуть замінити такі зміни.

Для локальних налаштувань зазвичай краще використовувати:

    /etc/systemd/system/

Зокрема, можна створювати drop-in-конфігурації через:

    sudo systemctl edit example.service

Після зміни unit-конфігурації за потреби виконай:

    sudo systemctl daemon-reload

Команда `systemctl edit` зазвичай сама організовує збереження drop-in-конфігурації та оновлення конфігурації менеджера.

---

## ❌ Вимикати невідомі системні служби

Не потрібно вимикати службу лише тому, що її назва незрозуміла.

Спочатку перевір:

    systemctl status example.service
    systemctl cat example.service
    systemctl show example.service

З'ясуй призначення служби та її залежності.

---

## ❌ Ігнорувати журнали

Якщо служба не працює, не варто одразу багаторазово виконувати:

    sudo systemctl restart example.service

Спочатку переглянь стан і журнали:

    systemctl status example.service
    journalctl -u example.service -n 50

Це допоможе знайти причину проблеми, а не лише повторювати невдалий запуск.

---

# Питання зі співбесіди

Що таке `systemd`?

Що таке `init system`?

Який PID зазвичай має `systemd`?

Що таке PID `1`?

Чим `systemd` відрізняється від ядра Linux?

Що таке service?

Що таке daemon?

Чим service відрізняється від daemon?

Що таке `systemd unit`?

Які основні типи units існують?

Що таке unit-файл?

Де зберігаються системні unit-файли?

Для чого потрібні секції `[Unit]`, `[Service]` та `[Install]`?

Що робить `ExecStart=`?

Для чого потрібен `WantedBy=`?

Що таке target?

Чим відрізняються `multi-user.target` та `graphical.target`?

Що таке default target?

Що таке dependency?

Чим відрізняються `Wants=`, `Requires=` та `After=`?

Для чого потрібен `systemctl`?

Як перевірити стан служби?

Як запустити службу?

Як зупинити службу?

Як перезапустити службу?

Чим відрізняються `start`, `enable` та `enable --now`?

Чим відрізняються `disable` та `stop`?

Що показує `systemctl is-active`?

Що показує `systemctl is-enabled`?

Чим відрізняються active та enabled?

Що робить `daemon-reload`?

Чим `daemon-reload` відрізняється від `reload`?

Що таке `systemd-journald`?

Для чого потрібен `journalctl`?

Як переглянути журнали конкретної служби?

Що таке user service?

Чим `systemctl` відрізняється від `systemctl --user`?

Що таке `Restart=on-failure`?

Для чого потрібен `systemd-analyze`?

Що робить `systemctl mask`?

Чим `mask` відрізняється від `disable`?

Як діагностувати службу, яка не запускається?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке Linux init system.

Що таке `systemd`.

Що таке PID `1`.

Що таке service та daemon.

Що таке `systemd unit`.

Основні типи units:

    .service
    .target
    .timer
    .socket
    .mount

Основи unit-файлів.

Призначення секцій:

    [Unit]
    [Service]
    [Install]

Основні команди:

    systemctl status
    systemctl start
    systemctl stop
    systemctl restart
    systemctl enable
    systemctl disable

Різниця між:

    start
    enable
    enable --now

Перевірка:

    systemctl is-active
    systemctl is-enabled

Перегляд служб:

    systemctl list-units

Основи `journalctl`.

---

## 🔵 Junior

Розуміння:

    unit files
    targets
    dependencies
    service states
    default target

Розуміння:

    Wants=
    Requires=
    After=
    Before=

Основні параметри:

    ExecStart=
    ExecStop=
    ExecReload=
    Restart=
    User=
    Group=
    WorkingDirectory=

Робота з командами:

    systemctl cat
    systemctl show
    systemctl list-unit-files
    systemctl daemon-reload

Перегляд журналів:

    journalctl -u
    journalctl -b
    journalctl -n
    journalctl -f
    journalctl -p

Розуміння різниці між:

    system services
    user services

Основи:

    Restart=on-failure
    masking
    drop-in configuration
    systemd-analyze

Уміння знайти причину невдалого запуску служби через її статус та журнали.

---

## 🟠 Middle

Поглиблене розуміння dependency management.

Особливості:

    Wants=
    Requires=
    Requisite=
    BindsTo=
    PartOf=
    Conflicts=
    ConditionPathExists=
    AssertPathExists=

Розуміння типів служб:

    simple
    exec
    forking
    oneshot
    notify
    dbus
    idle

Поглиблене вивчення:

    service lifecycle
    restart policies
    restart limits
    service timeouts
    environment variables
    environment files
    drop-in configurations
    systemd security directives
    resource control
    cgroups
    systemd timers
    socket activation
    systemd-analyze critical-chain
    systemd-analyze verify

Створення власних units для Node.js-застосунків.

Налаштування запуску застосунків після перезавантаження.

Діагностика залежностей та помилок запуску.

---

## 🔴 Senior

Поглиблене розуміння архітектури `systemd`.

Теми:

    system initialization
    dependency graph
    transaction engine
    unit activation
    socket activation
    service supervision
    cgroup v2
    resource accounting
    CPU and memory limits
    systemd sandboxing
    capability restrictions
    namespace isolation
    service hardening
    watchdog configuration
    transient units
    generators
    presets
    systemd targets and boot optimization
    systemd security analysis
    journald storage configuration
    system startup performance
    production service reliability

Проєктування надійних служб для production-середовища.

Аналіз проблем запуску, залежностей, обмежень ресурсів і безпеки.

---

# Міні-шпаргалка

## systemd

    systemd
        → init system та менеджер системних units

## PID 1

    ps -p 1 -o pid,comm,args

    → перевірити перший процес користувацького простору

## Версія

    systemctl --version

## Переглянути служби

    systemctl list-units --type=service

## Переглянути всі відомі служби

    systemctl list-units --type=service --all

## Перевірити статус

    systemctl status nginx

## Запустити

    sudo systemctl start nginx

## Зупинити

    sudo systemctl stop nginx

## Перезапустити

    sudo systemctl restart nginx

## Автоматичний запуск

    sudo systemctl enable nginx

## Вимкнути автоматичний запуск

    sudo systemctl disable nginx

## Запустити та ввімкнути

    sudo systemctl enable --now nginx

## Перевірити активність

    systemctl is-active nginx

## Перевірити автозапуск

    systemctl is-enabled nginx

## Переглянути unit-файл

    systemctl cat nginx.service

## Перечитати конфігурації systemd

    sudo systemctl daemon-reload

## Переглянути журнали

    journalctl -u nginx

## Останні 50 записів

    journalctl -u nginx -n 50

## Журнали поточного завантаження

    journalctl -b

## Переглянути default target

    systemctl get-default

## Переглянути час завантаження

    systemd-analyze

---

# Основні правила

    systemd
        → керує службами та іншими units

    PID 1
        → зазвичай systemd

    .service
        → service unit

    .target
        → ціль або група units

    systemctl
        → керування units

    journalctl
        → перегляд журналів

    start
        → запустити зараз

    stop
        → зупинити зараз

    restart
        → перезапустити

    reload
        → перечитати конфігурацію служби, якщо підтримується

    enable
        → налаштувати автоматичний запуск

    disable
        → вимкнути автоматичний запуск

    enable --now
        → налаштувати автозапуск і запустити зараз

    daemon-reload
        → перечитати конфігурації systemd units

    active
        → поточний активний стан

    enabled
        → налаштований автоматичний запуск

    masked
        → запуск unit заблоковано

    After=
        → порядок активації

    Requires=
        → сильніша залежність

    Wants=
        → слабша залежність

    [Unit]
        → опис та залежності

    [Service]
        → запуск і керування процесом

    [Install]
        → параметри встановлення для enable

---

# Головне

• `systemd` — одна з ключових частин сучасного Linux, яка керує системними службами та іншими units.

• У типовій системі `systemd` працює як процес із PID `1`.

• Служба зазвичай описується unit-файлом із розширенням `.service`.

• `systemctl` використовується для запуску, зупинки, перезапуску та перевірки служб.

• `journalctl` використовується для перегляду системних журналів.

• `start` і `enable` мають різні призначення.

• `active` та `enabled` — різні стани: перший стосується поточного стану, другий — налаштування автоматичного запуску.

• `daemon-reload` перечитує конфігурації `systemd`, а `reload` звертається до конкретної служби.

• `After=` визначає порядок активації, але не запускає залежність самостійно.

• `Requires=` та `Wants=` описують залежності між units.

• Targets допомагають визначати групи units і потрібний стан системи.

• Для діагностики служб важливо перевіряти не лише статус, а й журнали.

• Перед вимкненням невідомої служби потрібно з'ясувати її призначення та залежності.

• Під час створення власних служб варто використовувати локальні конфігурації в `/etc/systemd/system/` та правильно налаштовувати користувача, робочий каталог і команду запуску.

• Основний порядок діагностики:

    systemctl status SERVICE
        ↓
    journalctl -u SERVICE -n 50
        ↓
    systemctl cat SERVICE
        ↓
    systemctl show SERVICE
        ↓
    перевірити конфігурацію та причину помилки

• Для практичної роботи з Linux та розгортання Node.js-застосунків знання `systemd` допомагає налаштовувати автоматичний запуск серверів, контролювати їхню роботу та знаходити причини збоїв.

• У наступних темах цей фундамент доповнюється практичним вивченням `systemctl`, `journalctl`, станів служб, типових помилок та створенням власної служби в межах навчального проєкту.
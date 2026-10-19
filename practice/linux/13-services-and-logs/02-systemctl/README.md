# 02. systemctl

`systemctl` — це основна командна утиліта для керування `systemd` у Linux. Вона дозволяє запускати, зупиняти, перезапускати та перевіряти системні служби, керувати автоматичним запуском, переглядати стан units і працювати з конфігурацією `systemd`.

`systemctl` використовується в повсякденній роботі Linux-адміністратора та розробника, особливо під час налаштування серверів, баз даних і Node.js-застосунків.

За допомогою `systemctl` можна:

- перевіряти стан служб;
- запускати та зупиняти служби;
- перезапускати служби після зміни конфігурації;
- налаштовувати автоматичний запуск під час завантаження Linux;
- переглядати список активних та встановлених units;
- перевіряти залежності служб;
- керувати системними та користувацькими службами;
- перечитувати конфігурацію `systemd`;
- блокувати запуск певних units;
- діагностувати проблеми із запуском служб.

Основні команди:

    systemctl status
    systemctl start
    systemctl stop
    systemctl restart
    systemctl reload
    systemctl enable
    systemctl disable
    systemctl is-active
    systemctl is-enabled
    systemctl list-units
    systemctl list-unit-files
    systemctl cat
    systemctl show
    systemctl daemon-reload

---

### Ключові поняття

✔ `systemctl`  
✔ `systemd`  
✔ systemd unit  
✔ service unit  
✔ unit file  
✔ unit state  
✔ active  
✔ inactive  
✔ failed  
✔ activating  
✔ deactivating  
✔ enabled  
✔ disabled  
✔ static  
✔ masked  
✔ start  
✔ stop  
✔ restart  
✔ reload  
✔ enable  
✔ disable  
✔ enable --now  
✔ disable --now  
✔ daemon-reload  
✔ list-units  
✔ list-unit-files  
✔ status  
✔ is-active  
✔ is-enabled  
✔ cat  
✔ show  
✔ reset-failed  
✔ system service  
✔ user service  
✔ service dependencies  
✔ drop-in configuration  
✔ exit status  

---

### Що потрібно пам'ятати

• `systemctl` — основна команда керування `systemd`.

• Для більшості операцій зі зміни стану системних служб потрібен `sudo`.

• `systemctl status SERVICE` показує стан служби та частину діагностичної інформації.

• `start` запускає службу зараз.

• `stop` зупиняє службу зараз.

• `restart` перезапускає службу.

• `reload` просить службу перечитати конфігурацію, якщо вона підтримує цю операцію.

• `enable` налаштовує автоматичний запуск служби.

• `disable` вимикає налаштування автоматичного запуску, але не обов'язково зупиняє вже запущену службу.

• `enable --now` налаштовує автоматичний запуск і запускає службу зараз.

• `disable --now` вимикає автоматичний запуск і зупиняє службу зараз.

• `is-active` перевіряє поточний активний стан unit.

• `is-enabled` перевіряє стан налаштування автоматичного запуску.

• `list-units` показує units, які завантажені в менеджер `systemd`, та їхні стани.

• `list-unit-files` показує доступні unit-файли та їхні стани ввімкнення.

• `daemon-reload` перечитує конфігурації units, але сам по собі не перезапускає служби.

• `systemctl cat` показує вміст unit-файлу та відповідних конфігураційних фрагментів.

• `systemctl show` показує властивості unit у форматі параметрів.

• Для перегляду журналів використовують `journalctl`, а не `systemctl`.

• Команди для системних служб і користувацьких служб можуть відрізнятися:

    systemctl
    systemctl --user

---

# Синтаксис systemctl

Загальний синтаксис:

    systemctl [OPTIONS] COMMAND [UNIT...]

Де:

    OPTIONS
        → додаткові параметри команди

    COMMAND
        → дія, яку потрібно виконати

    UNIT
        → назва служби або іншого systemd unit

Приклад:

    sudo systemctl restart nginx.service

Тут:

    sudo
        → виконати команду з правами адміністратора

    systemctl
        → утиліта керування systemd

    restart
        → перезапустити unit

    nginx.service
        → назва служби

Для служб часто можна використовувати коротку назву без `.service`:

    sudo systemctl restart nginx

Обидва варіанти зазвичай працюють однаково:

    sudo systemctl restart nginx
    sudo systemctl restart nginx.service

Для однозначності в навчальних прикладах можна використовувати повну назву unit.

---

# Перевірка стану служби

## status

Команда `status` показує поточний стан служби, інформацію про процес і деякі останні журнальні повідомлення.

Синтаксис:

    systemctl status SERVICE

Приклад:

    systemctl status ssh

Можливий результат:

    ● ssh.service - OpenBSD Secure Shell server
         Loaded: loaded (/usr/lib/systemd/system/ssh.service; enabled)
         Active: active (running)
       Main PID: 1234 (sshd)
          Tasks: 1
         Memory: 4.2M

Це умовний приклад. Реальні PID, шляхи та показники відрізнятимуться.

Основні поля:

    Loaded
        → чи завантажено визначення unit та його налаштування

    Active
        → поточний стан unit

    Main PID
        → головний процес служби, якщо він є

    Tasks
        → інформація про задачі служби

    Memory
        → використання пам'яті, якщо доступно

    Logs
        → деякі останні повідомлення журналу

Статус може містити додаткові поля залежно від версії `systemd` та типу unit.

---

## Перевірка стану без детального виводу

Якщо потрібно отримати лише поточний стан:

    systemctl is-active ssh

Можливий результат:

    active

Інші результати можуть містити:

    inactive
    failed
    activating
    deactivating
    unknown

Це зручно для швидкої перевірки або використання в скриптах.

---

## Перевірка автоматичного запуску

Команда:

    systemctl is-enabled ssh

Можливі результати:

    enabled
    disabled
    static
    masked
    indirect
    generated
    alias

Основні значення:

    enabled
        → налаштований автоматичний запуск

    disabled
        → автоматичний запуск не налаштований через enable

    static
        → unit не має звичайної конфігурації для прямого enable

    masked
        → запуск unit заблоковано маскуванням

Важливо:

    is-active
        → поточний стан

    is-enabled
        → стан налаштування автоматичного запуску

Це дві незалежні характеристики.

---

# start

`start` запускає службу або інший unit зараз.

Синтаксис:

    sudo systemctl start SERVICE

Приклад:

    sudo systemctl start nginx

Після виконання команда просить `systemd` активувати службу.

Перевірити результат:

    systemctl status nginx

Або:

    systemctl is-active nginx

Важливо:

`start` не налаштовує автоматичний запуск після перезавантаження.

Наприклад:

    sudo systemctl start nginx

Служба може працювати зараз, але після перезавантаження не запуститися автоматично, якщо відповідне налаштування не передбачене іншим механізмом.

---

# stop

`stop` зупиняє службу зараз.

Синтаксис:

    sudo systemctl stop SERVICE

Приклад:

    sudo systemctl stop nginx

Перевірити результат:

    systemctl status nginx

Або:

    systemctl is-active nginx

Після зупинки служба зазвичай матиме стан:

    inactive

Але точний стан залежить від типу unit та результату операції.

Важливо:

`stop` сам по собі не вимикає автоматичний запуск.

Якщо служба була `enabled`, вона може знову запуститися під час наступного завантаження системи або внаслідок іншого механізму активації.

У деяких випадках інший unit може повторно активувати зупинену службу.

---

# restart

`restart` перезапускає службу.

Синтаксис:

    sudo systemctl restart SERVICE

Приклад:

    sudo systemctl restart nginx

Типова логіка:

    stop service
        ↓
    start service

Перевірити стан:

    systemctl status nginx

`restart` часто використовують після змін конфігурації або коли потрібно повторно запустити процес.

Однак не кожна зміна конфігурації вимагає повного перезапуску. Якщо служба підтримує безпечне перечитування конфігурації, може бути достатньо `reload`.

---

# reload

`reload` просить службу перечитати власну конфігурацію без повного перезапуску процесу, якщо це підтримується.

Синтаксис:

    sudo systemctl reload SERVICE

Приклад:

    sudo systemctl reload nginx

Після цього Nginx може перечитати конфігурацію, не припиняючи повністю обслуговування запитів.

Підтримка `reload` залежить від unit-файлу та самої програми.

Якщо служба не підтримує цю операцію, команда може завершитися помилкою.

Перед перезавантаженням конфігурації корисно перевірити її синтаксис. Для Nginx, наприклад:

    sudo nginx -t

Якщо перевірка успішна, можна виконати:

    sudo systemctl reload nginx

Це допомагає уникнути застосування некоректної конфігурації.

---

# reload vs restart

Це важлива відмінність.

    reload
        → перечитати конфігурацію служби

    restart
        → перезапустити службу

`reload` часто дозволяє уникнути повного перезапуску процесу.

`restart` може бути потрібним, якщо:

- служба не підтримує `reload`;
- зміни потребують перезапуску;
- процес завис або працює некоректно;
- потрібно повторно створити процес із новими параметрами запуску.

Вибір залежить від документації конкретної служби.

---

# enable

`enable` налаштовує автоматичний запуск unit відповідно до його конфігурації.

Синтаксис:

    sudo systemctl enable SERVICE

Приклад:

    sudo systemctl enable nginx

Зазвичай `systemd` створює потрібні символічні посилання в конфігураційних каталогах.

Перевірити налаштування:

    systemctl is-enabled nginx

Можливий результат:

    enabled

Важливо:

`enable` не обов'язково запускає службу зараз.

Наприклад:

    sudo systemctl enable nginx

підготує автоматичний запуск, але якщо служба не працює, вона може залишатися зупиненою до окремого запуску або відповідної події активації.

---

# disable

`disable` вимикає налаштування автоматичного запуску unit.

Синтаксис:

    sudo systemctl disable SERVICE

Приклад:

    sudo systemctl disable nginx

Перевірити:

    systemctl is-enabled nginx

Можливий результат:

    disabled

Важливо:

`disable` сам по собі не зупиняє службу, яка вже працює.

Наприклад:

    sudo systemctl disable nginx

Служба може продовжити обслуговувати запити до її зупинки або завершення процесу.

Якщо потрібно одночасно вимкнути автозапуск і зупинити службу:

    sudo systemctl disable --now nginx

---

# enable --now

Команда `enable --now` поєднує налаштування автоматичного запуску із запуском unit зараз.

Синтаксис:

    sudo systemctl enable --now SERVICE

Приклад:

    sudo systemctl enable --now nginx

Логіка:

    enable
        → налаштувати автоматичний запуск

    --now
        → активувати службу зараз

Перевірити обидва результати:

    systemctl is-enabled nginx
    systemctl is-active nginx

Це зручний спосіб увімкнути службу, яка має працювати зараз і запускатися після перезавантаження.

---

# disable --now

Команда `disable --now` вимикає автоматичний запуск і зупиняє службу зараз.

Синтаксис:

    sudo systemctl disable --now SERVICE

Приклад:

    sudo systemctl disable --now nginx

Логіка:

    disable
        → вимкнути автоматичний запуск

    --now
        → зупинити службу зараз

Цю команду слід використовувати лише тоді, коли зупинка служби безпечна.

Наприклад, зупинка SSH-служби під час віддаленої роботи може позбавити тебе доступу до сервера.

---

# enable vs start

Різницю потрібно добре запам'ятати.

| Команда | Що робить |
|---|---|
| `start` | Запускає службу зараз |
| `stop` | Зупиняє службу зараз |
| `restart` | Перезапускає службу |
| `reload` | Перечитує конфігурацію, якщо підтримується |
| `enable` | Налаштовує автоматичний запуск |
| `disable` | Вимикає налаштування автоматичного запуску |
| `enable --now` | Налаштовує автозапуск і запускає зараз |
| `disable --now` | Вимикає автозапуск і зупиняє зараз |

Основна модель:

    start
        → зараз

    enable
        → автоматичний запуск

    enable --now
        → зараз + автоматичний запуск

---

# list-units

`list-units` показує units, які завантажені в менеджер `systemd`, та їхні поточні стани.

Синтаксис:

    systemctl list-units

Переглянути лише служби:

    systemctl list-units --type=service

Переглянути всі служби, зокрема неактивні, які відомі менеджеру:

    systemctl list-units --type=service --all

Переглянути targets:

    systemctl list-units --type=target

Переглянути timers:

    systemctl list-units --type=timer

У списку можуть бути колонки:

    UNIT
    LOAD
    ACTIVE
    SUB
    DESCRIPTION

Значення:

    UNIT
        → назва unit

    LOAD
        → стан завантаження визначення unit

    ACTIVE
        → загальний стан unit

    SUB
        → детальніший стан, залежний від типу unit

    DESCRIPTION
        → опис unit

Важливо:

`list-units` не є повним списком усіх unit-файлів, установлених у системі.

Для перегляду unit-файлів використовують `list-unit-files`.

---

# list-unit-files

`list-unit-files` показує доступні unit-файли та їхні стани ввімкнення.

Команда:

    systemctl list-unit-files

Переглянути лише служби:

    systemctl list-unit-files --type=service

Можна зустріти стани:

    enabled
    disabled
    static
    masked
    indirect
    generated
    alias

Порівняння:

    systemctl list-units
        → завантажені units та їхні поточні стани

    systemctl list-unit-files
        → доступні unit-файли та їхні стани ввімкнення

Ці команди вирішують різні задачі.

---

# cat

`systemctl cat` показує вміст unit-файлу та відповідних конфігураційних фрагментів.

Синтаксис:

    systemctl cat SERVICE

Приклад:

    systemctl cat ssh.service

Команда допомагає побачити, як описана служба.

Можна перевірити:

- `ExecStart=`;
- `User=`;
- `Group=`;
- `WorkingDirectory=`;
- `Restart=`;
- залежності;
- секції `[Unit]`, `[Service]`, `[Install]`;
- додаткові drop-in-конфігурації.

Для власного unit:

    systemctl cat my-app.service

Якщо unit не існує або його файл недоступний, команда повідомить про помилку.

`systemctl cat` призначена для читання конфігурації, а не для її редагування.

---

# show

`systemctl show` показує властивості unit у форматі параметрів.

Синтаксис:

    systemctl show SERVICE

Приклад:

    systemctl show nginx.service

Команда може вивести багато рядків.

Щоб отримати лише конкретні властивості:

    systemctl show nginx.service -p ActiveState
    systemctl show nginx.service -p SubState
    systemctl show nginx.service -p UnitFileState
    systemctl show nginx.service -p MainPID

Пояснення:

    ActiveState
        → загальний поточний стан

    SubState
        → детальніший стан

    UnitFileState
        → стан налаштування unit-файлу

    MainPID
        → PID головного процесу, якщо є

Можна отримати кілька властивостей одночасно:

    systemctl show nginx.service \
        -p ActiveState \
        -p SubState \
        -p UnitFileState \
        -p MainPID

Зворотна скісна риска в кінці рядка дозволяє продовжити команду в наступному рядку Bash.

---

# reset-failed

`reset-failed` очищає зафіксований стан невдалого завершення unit та скидає лічильники запусків, пов'язані з обмеженнями перезапуску, де це застосовно.

Синтаксис:

    sudo systemctl reset-failed SERVICE

Приклад:

    sudo systemctl reset-failed nginx.service

Для всіх відповідних units:

    sudo systemctl reset-failed

Ця команда не виправляє причину помилки та не гарантує запуск служби.

Наприклад, якщо служба падає через неправильний шлях до файлу, відсутній виконуваний файл або помилку конфігурації, ці проблеми залишаться.

Правильний порядок:

    systemctl status nginx
        ↓
    journalctl -u nginx -n 50
        ↓
    виправити причину помилки
        ↓
    reset-failed, якщо потрібно
        ↓
    повторно запустити службу

---

# daemon-reload

`daemon-reload` змушує менеджер `systemd` перечитати конфігурації unit-файлів.

Команда:

    sudo systemctl daemon-reload

Використовується після:

- створення нового unit-файлу;
- зміни наявного unit-файлу;
- зміни drop-in-конфігурації;
- інших змін, які потребують повторного читання конфігурації менеджером.

Наприклад, створено файл:

    /etc/systemd/system/my-app.service

Після цього:

    sudo systemctl daemon-reload
    sudo systemctl start my-app.service

Якщо служба вже працює та змінилися параметри її запуску, може знадобитися:

    sudo systemctl restart my-app.service

Важливо розрізняти:

    daemon-reload
        → перечитати unit-файли

    reload SERVICE
        → попросити службу перечитати власну конфігурацію

`daemon-reload` не є командою перезапуску всіх служб.

---

# edit

`systemctl edit` дозволяє створювати або змінювати drop-in-конфігурації для unit.

Приклад:

    sudo systemctl edit nginx.service

Команда відкриє редактор для створення локального конфігураційного фрагмента.

Наприклад, можна додати:

    [Service]
    Restart=on-failure

Збережи файл і закрий редактор.

Зазвичай `systemctl edit` сам оновлює конфігурацію менеджера після збереження.

Якщо потрібно скасувати локальні зміни, перед цим переглянь, які конфігурації були створені.

Для відкриття основного unit-файлу в редакторі використовують:

    sudo systemctl edit --full nginx.service

Це створює локальну повну копію unit-файлу для перевизначення системного варіанта.

Повне перевизначення складніше підтримувати під час оновлень пакетів, тому для невеликих змін часто краще використовувати звичайний drop-in.

---

# mask та unmask

## mask

`mask` блокує запуск unit.

Команда:

    sudo systemctl mask example.service

Зазвичай unit маскується через символічне посилання на `/dev/null`.

Перевірити:

    systemctl is-enabled example.service

Можливий результат:

    masked

Спроба запуску замаскованого unit зазвичай завершується помилкою.

## unmask

`unmask` знімає маску:

    sudo systemctl unmask example.service

Після цього unit знову може бути запущений, якщо немає інших перешкод.

Порівняння:

    disable
        → вимкнути автоматичний запуск

    mask
        → заблокувати запуск

    unmask
        → зняти блокування запуску

Маскування системних служб може порушити роботу системи, тому використовуй його обережно.

---

# try-restart та try-reload-or-restart

Деякі команди дозволяють виконати дію лише за певних умов.

## try-restart

    sudo systemctl try-restart nginx.service

Перезапускає службу, якщо вона вже працює.

Якщо вона неактивна, команда не запускає її лише заради перезапуску.

## try-reload-or-restart

    sudo systemctl try-reload-or-restart nginx.service

Якщо служба активна, `systemd` намагається перечитати її конфігурацію, а якщо це неможливо — перезапускає її відповідно до поведінки команди.

Конкретний результат залежить від типу unit та підтримуваних операцій.

Для початкового рівня достатньо знати, що існують команди з умовною поведінкою, які не завжди запускають зупинену службу.

---

# Керування залежностями

`systemctl` може показувати залежності між units.

Переглянути залежності служби:

    systemctl list-dependencies nginx.service

Переглянути також залежності у зворотному напрямку:

    systemctl list-dependencies --reverse nginx.service

Це допомагає з'ясувати:

- які units потрібні для запуску служби;
- які units можуть залежати від неї;
- які компоненти можуть бути зачеплені змінами.

Наприклад, перед зупинкою важливої системної служби можна перевірити, чи залежать від неї інші компоненти.

Залежності `systemd` не завжди означають повну логічну залежність програм на рівні застосунку. Вони описують зв'язки, налаштовані для менеджера units.

---

# Керування користувацькими службами

`systemctl` може керувати не лише системними, а й користувацькими службами.

Для користувацького екземпляра використовується параметр:

    --user

Приклади:

    systemctl --user list-units --type=service

    systemctl --user status

    systemctl --user list-unit-files

Запуск користувацької служби:

    systemctl --user start my-app.service

Налаштування автоматичного запуску:

    systemctl --user enable my-app.service

Користувацькі units зазвичай розміщують у каталозі:

    ~/.config/systemd/user/

Після створення нового користувацького unit:

    systemctl --user daemon-reload

Далі:

    systemctl --user start my-app.service

Важливо:

Користувацькі служби зазвичай пов'язані з користувацьким сеансом. Їхня робота після виходу користувача залежить від конфігурації системи, зокрема від налаштування linger.

Не плутай:

    systemctl
        → системний менеджер systemd

    systemctl --user
        → користувацький менеджер systemd

---

# Команди для роботи з targets

`target` — тип unit, який допомагає визначати потрібний стан системи.

Переглянути поточну ціль за замовчуванням:

    systemctl get-default

Встановити ціль за замовчуванням:

    sudo systemctl set-default multi-user.target

Повернути графічну ціль, якщо вона доступна:

    sudo systemctl set-default graphical.target

Змінити ціль у поточному завантаженні:

    sudo systemctl isolate multi-user.target

`isolate` активує заданий target і зупиняє units, які не потрібні для нього, якщо це передбачено конфігурацією.

Ця операція може завершити графічний сеанс або зупинити інші служби.

Не використовуй `isolate` без розуміння наслідків, особливо на віддаленому сервері.

---

# Перевірка unit-файлів

Після створення або зміни власної служби корисно перевірити конфігурацію.

Приклад:

    sudo systemd-analyze verify /etc/systemd/system/my-app.service

Ця команда може виявити:

- синтаксичні проблеми;
- відсутні або некоректні залежності;
- проблеми з конфігурацією unit;
- інші помилки, які можна виявити під час перевірки.

Після виправлення конфігурації:

    sudo systemctl daemon-reload

Далі можна перевірити статус:

    systemctl status my-app.service

Якщо служба не запускається:

    journalctl -u my-app.service -n 50

---

# Практика 1 — перевірка системних служб

Мета: навчитися переглядати стан служб без зміни системної конфігурації.

## Крок 1

Перевір службу cron:

    systemctl status cron

На деяких дистрибутивах служба може називатися інакше, наприклад `crond`.

## Крок 2

Перевір активний стан:

    systemctl is-active cron

## Крок 3

Перевір автоматичний запуск:

    systemctl is-enabled cron

## Крок 4

Переглянь список служб:

    systemctl list-units --type=service

## Крок 5

Переглянь unit-файл:

    systemctl cat cron.service

Завдання:

- знайти поточний стан служби;
- визначити, чи налаштовано автоматичний запуск;
- пояснити різницю між `active` та `enabled`;
- знайти шлях до unit-файлу;
- визначити, де можна переглянути журнали служби.

---

# Практика 2 — перегляд властивостей служби

Мета: навчитися використовувати `systemctl show`.

Виконай:

    systemctl show cron.service \
        -p ActiveState \
        -p SubState \
        -p UnitFileState \
        -p MainPID

Завдання:

- знайти `ActiveState`;
- знайти `SubState`;
- знайти `UnitFileState`;
- знайти `MainPID`;
- порівняти результат із `systemctl status cron`.

Поясни, чому `MainPID` може бути `0`, якщо служба не має активного головного процесу.

---

# Практика 3 — керування службою

Для практики можна використати службу, яку безпечно зупинити та запустити на твоїй системі.

Перед початком переконайся, що її зупинка не порушить роботу системи.

## Крок 1

Перевір стан:

    systemctl status example.service

Тут `example.service` — умовна назва. Заміни її на реально встановлену службу.

## Крок 2

Зупини службу:

    sudo systemctl stop example.service

## Крок 3

Перевір стан:

    systemctl is-active example.service

## Крок 4

Запусти службу:

    sudo systemctl start example.service

## Крок 5

Перевір результат:

    systemctl status example.service

Завдання:

- зафіксувати стан до зупинки;
- перевірити стан після зупинки;
- запустити службу знову;
- пояснити, чи змінилося налаштування автоматичного запуску.

Не використовуй для цієї практики SSH або мережеву службу, через яку ти зараз підключений до сервера.

---

# Практика 4 — автоматичний запуск

Мета: зрозуміти різницю між `start`, `enable` та `enable --now`.

Для безпечної практики вибери відповідну встановлену службу.

Перевір її налаштування:

    systemctl is-enabled example.service

Якщо це доречно для твоєї системи, налаштуй автоматичний запуск:

    sudo systemctl enable example.service

Перевір:

    systemctl is-enabled example.service

Якщо служба повинна працювати зараз:

    sudo systemctl start example.service

Перевір:

    systemctl is-active example.service

Завдання:

- пояснити, що змінює `enable`;
- пояснити, що змінює `start`;
- пояснити, чому результати `is-active` та `is-enabled` можуть відрізнятися.

Не змінюй налаштування системних служб, призначення яких тобі невідоме.

---

# Практика 5 — власна Node.js-служба

Це практична вправа, пов'язана з розгортанням Node.js-застосунків.

Припустимо, застосунок розташований у каталозі:

    /opt/my-app/

Основний файл:

    /opt/my-app/server.js

Node.js доступний за шляхом:

    /usr/bin/node

Це умовні шляхи. На реальному сервері їх потрібно перевірити.

Створити unit-файл можна так:

    sudo nano /etc/systemd/system/my-app.service

Приклад конфігурації:

    [Unit]
    Description=My Node.js Application
    After=network.target

    [Service]
    Type=simple
    WorkingDirectory=/opt/my-app
    ExecStart=/usr/bin/node /opt/my-app/server.js
    Restart=on-failure
    RestartSec=5

    [Install]
    WantedBy=multi-user.target

Перед використанням потрібно переконатися, що:

- файл `server.js` існує;
- шлях до Node.js правильний;
- застосунок запускається з указаного каталогу;
- файл і його залежності доступні службі;
- права доступу налаштовані правильно.

Для production-застосунку зазвичай краще запускати службу від окремого непривілейованого користувача, а не від `root`. У такому випадку в секції `[Service]` можна визначити `User=` та, за потреби, `Group=`.

Після створення unit:

    sudo systemctl daemon-reload

Запустити застосунок:

    sudo systemctl start my-app.service

Перевірити стан:

    systemctl status my-app.service

Переглянути журнали:

    journalctl -u my-app.service -n 50

Налаштувати автоматичний запуск:

    sudo systemctl enable my-app.service

Або виконати запуск і ввімкнення разом:

    sudo systemctl enable --now my-app.service

Після зміни unit-файлу:

    sudo systemctl daemon-reload
    sudo systemctl restart my-app.service

Цей приклад демонструє базовий спосіб запуску Node.js-застосунку як системної служби. Для реального сервера також потрібно продумати користувача служби, змінні середовища, секрети, доступ до файлів, мережеві порти та обробку журналів.

---

# Типові помилки

## ❌ Виконувати systemctl без правильної назви unit

Неправильно:

    sudo systemctl restart myapp

якщо служба насправді називається `my-app.service`.

Правильно:

    sudo systemctl restart my-app.service

Якщо назва невідома:

    systemctl list-unit-files --type=service

---

## ❌ Вважати, що start вмикає автоматичний запуск

    sudo systemctl start nginx

Запускає службу зараз.

Для автоматичного запуску:

    sudo systemctl enable nginx

Для обох дій:

    sudo systemctl enable --now nginx

---

## ❌ Вважати, що disable зупиняє службу

    sudo systemctl disable nginx

Це вимикає налаштування автоматичного запуску, але не обов'язково зупиняє процес.

Для обох дій:

    sudo systemctl disable --now nginx

---

## ❌ Використовувати reload для служби, яка його не підтримує

    sudo systemctl reload example.service

Команда може завершитися помилкою, якщо відповідна операція не налаштована.

Перевір документацію служби або використовуй `restart`, якщо він потрібний і безпечний.

---

## ❌ Забувати daemon-reload після зміни unit-файлу

Після створення або зміни:

    /etc/systemd/system/my-app.service

виконай:

    sudo systemctl daemon-reload

Потім за потреби:

    sudo systemctl restart my-app.service

---

## ❌ Вважати, що daemon-reload перезапускає службу

    sudo systemctl daemon-reload

Це оновлює конфігурацію менеджера `systemd`, але не перезапускає автоматично всі служби.

---

## ❌ Ігнорувати код завершення команди

`systemctl` повертає код завершення, який можна перевірити в Bash.

Наприклад:

    systemctl is-active --quiet nginx

    echo $?

Типове значення:

    0 → перевірка успішна
    ненульове значення → перевірка не пройдена

Для `is-active --quiet` код `0` означає, що відповідний unit активний. Для інших команд значення залежить від результату операції.

---

## ❌ Перезапускати службу, не перевіривши причину помилки

Якщо служба не запускається, спочатку перевір:

    systemctl status my-app.service

Потім:

    journalctl -u my-app.service -n 50

Далі перевір конфігурацію:

    systemctl cat my-app.service

Повторний запуск без усунення причини часто не допомагає.

---

## ❌ Зупиняти критичні служби на віддаленому сервері

Команди на кшталт:

    sudo systemctl stop ssh

можуть перервати віддалений доступ до сервера.

Перед зупинкою мережевих служб переконайся, що маєш альтернативний спосіб доступу або відновлення.

---

# Питання зі співбесіди

Що таке `systemctl`?

Для чого використовується `systemctl`?

Який загальний синтаксис `systemctl`?

Як перевірити стан служби?

Що показує `systemctl status`?

Чим `systemctl status` відрізняється від `systemctl show`?

Для чого потрібен `systemctl start`?

Що робить `systemctl stop`?

Чим відрізняються `restart` та `reload`?

Що робить `systemctl enable`?

Чим `enable` відрізняється від `start`?

Чим `disable` відрізняється від `stop`?

Що робить `enable --now`?

Що робить `disable --now`?

Що показує `systemctl is-active`?

Що показує `systemctl is-enabled`?

Чи може служба бути active, але disabled?

Чи може служба бути inactive, але enabled?

Для чого потрібен `list-units`?

Чим `list-units` відрізняється від `list-unit-files`?

Для чого потрібен `systemctl cat`?

Що показує `systemctl show`?

Для чого потрібен `reset-failed`?

Що робить `daemon-reload`?

Чим `daemon-reload` відрізняється від `reload`?

Для чого потрібні `mask` та `unmask`?

Як переглянути залежності служби?

Чим відрізняються системні та користувацькі служби?

Що робить параметр `--user`?

Як перевірити помилки запуску служби?

Як створити власну службу для Node.js-застосунку?

Що потрібно виконати після створення нового unit-файлу?

Як перевірити, чи служба запускається автоматично?

---

# Шлях

## 🟢 Core — обов'язково знати

Основне призначення `systemctl`.

Синтаксис команди.

Перевірка стану:

    systemctl status

Керування службами:

    start
    stop
    restart
    reload

Керування автоматичним запуском:

    enable
    disable
    enable --now
    disable --now

Перевірка:

    is-active
    is-enabled

Перегляд списків:

    list-units
    list-unit-files

Розуміння різниці між:

    active / inactive
    enabled / disabled
    start / enable
    stop / disable
    reload / restart

---

## 🔵 Junior

Уміння використовувати:

    systemctl cat
    systemctl show
    systemctl reset-failed
    systemctl daemon-reload
    systemctl edit
    systemctl mask
    systemctl unmask
    systemctl list-dependencies

Розуміння:

    unit states
    unit file states
    service dependencies
    user services
    system services
    drop-in configurations
    exit codes

Уміння:

- знаходити назву служби;
- перевіряти її активність;
- перевіряти автоматичний запуск;
- переглядати конфігурацію;
- перечитувати конфігурацію `systemd`;
- аналізувати помилки через журнали;
- безпечно керувати службами;
- створювати базовий unit для Node.js-застосунку.

---

## 🟠 Middle

Поглиблене керування:

    dependency management
    unit overrides
    service restart policies
    systemd timers
    socket activation
    resource control
    service sandboxing
    environment files
    service credentials
    systemd-analyze verify
    systemd-analyze critical-chain

Розуміння:

- різних типів service units;
- обмежень автоматичного перезапуску;
- взаємодії units;
- безпеки служб;
- роботи служб із непривілейованими користувачами;
- запуску застосунків після перезавантаження;
- налаштування служб у production.

---

## 🔴 Senior

Поглиблене розуміння:

    systemd unit lifecycle
    dependency transaction handling
    cgroups
    systemd security hardening
    namespace isolation
    capability management
    resource limits
    watchdogs
    transient units
    generators
    service reliability
    boot optimization
    advanced failure recovery
    production service architecture

Проєктування, аудит і діагностика складних системних служб.

---

# Міні-шпаргалка

## Status

    systemctl status nginx

    → переглянути стан служби

## Start

    sudo systemctl start nginx

    → запустити зараз

## Stop

    sudo systemctl stop nginx

    → зупинити зараз

## Restart

    sudo systemctl restart nginx

    → перезапустити

## Reload

    sudo systemctl reload nginx

    → перечитати конфігурацію служби, якщо підтримується

## Enable

    sudo systemctl enable nginx

    → налаштувати автоматичний запуск

## Disable

    sudo systemctl disable nginx

    → вимкнути автоматичний запуск

## Enable + Start

    sudo systemctl enable --now nginx

    → налаштувати автозапуск і запустити зараз

## Disable + Stop

    sudo systemctl disable --now nginx

    → вимкнути автозапуск і зупинити зараз

## Active

    systemctl is-active nginx

    → перевірити поточний стан

## Enabled

    systemctl is-enabled nginx

    → перевірити автоматичний запуск

## List Units

    systemctl list-units --type=service

    → переглянути завантажені служби

## List Unit Files

    systemctl list-unit-files --type=service

    → переглянути доступні unit-файли

## Cat

    systemctl cat nginx.service

    → переглянути конфігурацію

## Show

    systemctl show nginx.service -p ActiveState -p MainPID

    → переглянути властивості

## Daemon Reload

    sudo systemctl daemon-reload

    → перечитати конфігурації systemd

## Reset Failed

    sudo systemctl reset-failed nginx.service

    → скинути зафіксований стан помилки та відповідні лічильники

## Logs

    journalctl -u nginx.service -n 50

    → переглянути останні записи журналу

---

# Головне

• `systemctl` — основний інструмент керування `systemd`.

• `status` допомагає перевірити стан служби та отримати початкову діагностичну інформацію.

• `start`, `stop` і `restart` керують поточним станом служби.

• `reload` просить службу перечитати власну конфігурацію, якщо така операція підтримується.

• `enable` і `disable` керують налаштуванням автоматичного запуску.

• `enable --now` запускає службу зараз і налаштовує автоматичний запуск.

• `disable --now` зупиняє службу зараз і вимикає автоматичний запуск.

• `is-active` перевіряє поточний стан, а `is-enabled` — стан налаштування автоматичного запуску.

• `list-units` показує завантажені units, а `list-unit-files` — доступні unit-файли та їхні стани ввімкнення.

• `cat` допомагає читати unit-файли, `show` — переглядати властивості units.

• `daemon-reload` перечитує конфігурації `systemd`, але не перезапускає автоматично всі служби.

• `mask` блокує запуск unit, а `unmask` знімає це блокування.

• Для діагностики проблем використовуй разом:

    systemctl status SERVICE
    journalctl -u SERVICE -n 50
    systemctl cat SERVICE

• Перед зупинкою системної або мережевої служби завжди враховуй її призначення та можливий вплив на роботу системи.

• Для розробника Node.js знання `systemctl` особливо корисне під час налаштування запуску серверних застосунків, автоматичного перезапуску та діагностики проблем на Linux-сервері.

• Основна модель роботи:

    знайти службу
        ↓
    перевірити status
        ↓
    виконати потрібну дію
        ↓
    перевірити результат
        ↓
    переглянути logs за потреби

• Головне правило: не просто перезапускай службу, яка не працює. Спочатку перевір її стан, конфігурацію та журнали, щоб зрозуміти причину проблеми.
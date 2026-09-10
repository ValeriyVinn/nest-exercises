# 14. Constraints — обмеження цілісності даних у PostgreSQL

## 📌 Мета розділу

`Constraints` — це правила, які PostgreSQL використовує для контролю правильності даних.

Вони не дають записати в таблицю дані, які суперечать правилам структури БД.

Наприклад:

- користувач повинен мати `email`;
- `email` має бути унікальним;
- товар не може мати від'ємну ціну;
- замовлення повинно належати існуючому користувачу;
- кількість товару повинна бути більшою за `0`.

Головна ідея:

> **Constraint — це правило, яке сама база даних гарантує незалежно від того, який застосунок до неї звертається.**

---

# 1. Навіщо потрібні constraints

Без constraints неправильні дані може записати будь-який клієнт:

    INSERT INTO users (name, email)
    VALUES (NULL, 'test@example.com');

Якщо поле `name` не має обмежень, PostgreSQL прийме `NULL`.

Або:

    INSERT INTO products (name, price)
    VALUES ('Keyboard', -500);

Якщо немає перевірки `price`, база також може прийняти таке значення.

Constraints переносять частину бізнес-правил безпосередньо в БД.

---

# 2. Основні типи constraints

У PostgreSQL найважливіші:

| Constraint | Призначення |
|---|---|
| `NOT NULL` | значення обов'язкове |
| `UNIQUE` | значення не повинно повторюватися |
| `PRIMARY KEY` | унікальний ідентифікатор рядка |
| `FOREIGN KEY` | зв'язок з іншою таблицею |
| `CHECK` | перевірка умови |
| `DEFAULT` | значення за замовчуванням |

Також існують:

- `DEFERRABLE`;
- `INITIALLY DEFERRED`;
- `ON DELETE`;
- `ON UPDATE`;
- складені (`composite`) constraints;
- іменовані constraints.

---

# 3. NOT NULL

`NOT NULL` означає:

> це поле не може містити `NULL`.

Приклад:

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL
    );

Тепер:

    INSERT INTO users (name, email)
    VALUES ('Valeriy', 'valeriy@example.com');

працює.

А:

    INSERT INTO users (name, email)
    VALUES (NULL, 'valeriy@example.com');

дасть помилку.

---

# 4. NULL ≠ порожній рядок

Це важливий момент.

`NULL`:

    NULL

і порожній рядок:

    ''

— це різні значення.

Наприклад:

    INSERT INTO users (name)
    VALUES ('');

`NOT NULL` дозволить це значення, тому що `''` — не `NULL`.

Якщо потрібно заборонити також порожній рядок, можна використати `CHECK`.

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL CHECK (length(trim(name)) > 0)
    );

---

# 5. UNIQUE

`UNIQUE` гарантує, що значення не повторюється.

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE
    );

Можна:

    user1@example.com
    user2@example.com
    user3@example.com

Але не можна двічі:

    user1@example.com

---

# 6. UNIQUE і NULL

Особливість PostgreSQL:

`UNIQUE` за замовчуванням дозволяє кілька `NULL`.

Наприклад:

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        phone TEXT UNIQUE
    );

Можуть існувати:

    NULL
    NULL
    NULL

Але два однакових реальних номери — ні:

    +380501112233
    +380501112233

Якщо значення обов'язкове і унікальне:

    phone TEXT NOT NULL UNIQUE

---

# 7. PRIMARY KEY

`PRIMARY KEY` — головний ідентифікатор рядка.

Наприклад:

    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    );

Primary key:

- повинен бути унікальним;
- не може бути `NULL`;
- ідентифікує конкретний рядок;
- зазвичай використовується іншими таблицями через `FOREIGN KEY`.

Фактично:

    PRIMARY KEY = UNIQUE + NOT NULL

але семантично це більше, ніж просто комбінація цих двох правил: це **ідентичність рядка таблиці**.

---

# 8. Автоматичний ID

Для ID часто використовують:

    CREATE TABLE users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL
    );

Тоді:

    INSERT INTO users (name)
    VALUES ('Valeriy');

PostgreSQL сам створить `id`.

Сучасний рекомендований варіант:

    GENERATED ALWAYS AS IDENTITY

Старий поширений варіант:

    SERIAL

Наприклад:

    id SERIAL PRIMARY KEY

`SERIAL` все ще зустрічається у старих проектах, але `IDENTITY` краще розуміти як сучасний стандартний підхід.

---

# 9. FOREIGN KEY

`FOREIGN KEY` створює зв'язок між таблицями.

Наприклад, є користувачі:

    CREATE TABLE users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL
    );

І замовлення:

    CREATE TABLE orders (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        user_id INTEGER REFERENCES users(id)
    );

`user_id` посилається на:

    users.id

Тобто:

    users
       │
       │ id
       ▼
    orders.user_id

---

# 10. Навіщо потрібен FOREIGN KEY

Без `FOREIGN KEY` можна випадково створити:

    order.user_id = 999999

навіть якщо користувача `999999` не існує.

З `FOREIGN KEY` PostgreSQL не дозволить таку ситуацію.

Наприклад:

    INSERT INTO orders (user_id)
    VALUES (999999);

Якщо такого користувача немає, PostgreSQL відхилить операцію.

Це називається:

> **Referential Integrity — посилальна цілісність.**

---

# 11. FOREIGN KEY як явний constraint

Можна написати коротко:

    user_id INTEGER REFERENCES users(id)

Або явно:

    user_id INTEGER,
    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)

Другий варіант особливо корисний у великих таблицях, тому що constraint має зрозуміле ім'я.

---

# 12. Іменовані constraints

Замість:

    email TEXT UNIQUE

можна:

    email TEXT,
    CONSTRAINT users_email_unique UNIQUE (email)

Або:

    CONSTRAINT users_name_not_empty
        CHECK (length(trim(name)) > 0)

Перевага:

> помилку легше зрозуміти та адмініструвати.

Наприклад:

    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)

набагато зрозуміліше, ніж автоматично створене ім'я constraint.

---

# 13. CHECK

`CHECK` перевіряє логічну умову.

Наприклад:

    CREATE TABLE products (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL,
        price NUMERIC(10, 2) CHECK (price >= 0)
    );

PostgreSQL не дозволить:

    INSERT INTO products (name, price)
    VALUES ('Keyboard', -100);

---

# 14. CHECK для віку

    CREATE TABLE users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER CHECK (age >= 0 AND age <= 120)
    );

Тепер:

    age = 35

можна.

А:

    age = -5

або:

    age = 200

не можна.

---

# 15. CHECK для статусу

Наприклад:

    CREATE TABLE orders (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        status TEXT CHECK (
            status IN ('pending', 'paid', 'cancelled')
        )
    );

Допустимі:

    pending
    paid
    cancelled

А:

    delivered

буде відхилено.

---

# 16. CHECK не замінює NOT NULL

Важливий нюанс.

Наприклад:

    status TEXT CHECK (
        status IN ('pending', 'paid', 'cancelled')
    )

`NULL` може пройти таку перевірку.

Чому?

У SQL результат:

    NULL IN ('pending', 'paid', 'cancelled')

не є `FALSE`.

Тому якщо `NULL` не дозволений:

    status TEXT NOT NULL CHECK (
        status IN ('pending', 'paid', 'cancelled')
    )

---

# 17. DEFAULT

`DEFAULT` задає значення, якщо користувач його не передав.

    CREATE TABLE users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL,
        active BOOLEAN NOT NULL DEFAULT TRUE
    );

Тепер:

    INSERT INTO users (name)
    VALUES ('Valeriy');

автоматично створить:

    active = TRUE

---

# 18. DEFAULT з CURRENT_TIMESTAMP

Для дати створення:

    CREATE TABLE posts (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        title TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

Тоді:

    INSERT INTO posts (title)
    VALUES ('First post');

отримає автоматичний `created_at`.

---

# 19. DEFAULT не означає NOT NULL

Наприклад:

    active BOOLEAN DEFAULT TRUE

не означає, що `active` обов'язково матиме `TRUE` або `FALSE`.

Можна явно передати:

    active = NULL

і отримати `NULL`.

Якщо поле повинно завжди мати значення:

    active BOOLEAN NOT NULL DEFAULT TRUE

---

# 20. Комбінація constraints

На практиці constraints часто комбінуються.

Наприклад:

    CREATE TABLE products (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL,
        sku TEXT NOT NULL UNIQUE,
        price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
        stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
        active BOOLEAN NOT NULL DEFAULT TRUE
    );

Тут:

- `id` → `PRIMARY KEY`;
- `name` → `NOT NULL`;
- `sku` → `NOT NULL + UNIQUE`;
- `price` → `NOT NULL + CHECK`;
- `stock` → `NOT NULL + DEFAULT + CHECK`;
- `active` → `NOT NULL + DEFAULT`.

Це типовий реальний приклад.

---

# 21. FOREIGN KEY + ON DELETE

Що відбувається, якщо видалити запис, на який посилається `FOREIGN KEY`?

Наприклад:

    users
      ↓
    orders

Користувач має замовлення.

Якщо виконати:

    DELETE FROM users
    WHERE id = 1;

PostgreSQL за замовчуванням не дозволить видалення, якщо існують пов'язані записи.

---

# 22. ON DELETE CASCADE

`CASCADE` означає:

> якщо батьківський запис видалено — пов'язані записи також видаляються.

    CREATE TABLE orders (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        user_id INTEGER NOT NULL,
        CONSTRAINT fk_orders_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
    );

Тепер:

    DELETE FROM users
    WHERE id = 1;

автоматично видалить замовлення цього користувача.

---

# 23. Коли CASCADE небезпечний

`CASCADE` потрібно використовувати обережно.

Наприклад:

    users
       ↓
    orders
       ↓
    order_items

Видалення одного `user` потенційно може спричинити:

    user
      ↓
    orders
      ↓
    order_items

Тобто багато даних можуть бути видалені каскадно.

Тому `CASCADE` потрібно вибирати свідомо.

---

# 24. ON DELETE RESTRICT

`RESTRICT` забороняє видалення батьківського запису, якщо існують дочірні.

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE RESTRICT

Це хороший варіант, коли пов'язані дані не можна просто видалити.

---

# 25. ON DELETE SET NULL

Можна зробити так:

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL

Тоді при видаленні користувача:

    user_id

стане:

    NULL

Але поле повинно дозволяти `NULL`.

Тобто:

    user_id INTEGER

а не:

    user_id INTEGER NOT NULL

---

# 26. ON DELETE SET DEFAULT

Ще один варіант:

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET DEFAULT

При видаленні батьківського запису PostgreSQL встановить для дочірнього запису значення `DEFAULT`.

Це використовується рідше.

---

# 27. ON UPDATE

Аналогічно можна визначити поведінку при зміні ключа:

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE

Якщо `users.id` зміниться, пов'язані `orders.user_id` також будуть оновлені.

На практиці primary key зазвичай не змінюють, тому `ON UPDATE CASCADE` потрібен значно рідше, ніж `ON DELETE`.

---

# 28. Чотири основні стратегії DELETE

Запам'ятай:

    ON DELETE CASCADE
    ON DELETE RESTRICT
    ON DELETE SET NULL
    ON DELETE SET DEFAULT

Ментальна модель:

| Варіант | Що відбувається |
|---|---|
| `CASCADE` | видалити дочірні |
| `RESTRICT` | заборонити видалення |
| `SET NULL` | встановити `NULL` |
| `SET DEFAULT` | встановити `DEFAULT` |

---

# 29. Composite UNIQUE

`UNIQUE` може працювати не тільки з одним полем.

Наприклад, викладач може мати один курс у певній групі.

    CREATE TABLE enrollments (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        student_id INTEGER NOT NULL,
        course_id INTEGER NOT NULL,

        CONSTRAINT unique_student_course
            UNIQUE (student_id, course_id)
    );

Тепер:

    student_id = 1
    course_id = 10

може існувати тільки один раз.

Але:

    student_id = 1
    course_id = 20

можна.

---

# 30. Composite PRIMARY KEY

Primary key також може складатися з декількох колонок.

    CREATE TABLE course_students (
        course_id INTEGER NOT NULL,
        student_id INTEGER NOT NULL,

        PRIMARY KEY (course_id, student_id)
    );

Тут комбінація:

    (course_id, student_id)

повинна бути унікальною.

Такий підхід часто використовується для таблиць зв'язку `many-to-many`.

---

# 31. Таблиця many-to-many

Наприклад:

    students
        │
        │
        ▼
    course_students
        ▲
        │
        │
    courses

Структура:

    CREATE TABLE course_students (
        course_id INTEGER NOT NULL,
        student_id INTEGER NOT NULL,

        PRIMARY KEY (course_id, student_id),

        FOREIGN KEY (course_id)
            REFERENCES courses(id)
            ON DELETE CASCADE,

        FOREIGN KEY (student_id)
            REFERENCES students(id)
            ON DELETE CASCADE
    );

Тут одночасно працюють:

- `PRIMARY KEY`;
- два `FOREIGN KEY`;
- `ON DELETE CASCADE`.

---

# 32. Додавання constraint після створення таблиці

Constraint не обов'язково створювати разом із таблицею.

Можна:

    ALTER TABLE users
    ADD CONSTRAINT users_email_unique
    UNIQUE (email);

---

# 33. Додавання CHECK

    ALTER TABLE products
    ADD CONSTRAINT products_price_positive
    CHECK (price >= 0);

---

# 34. Додавання FOREIGN KEY

    ALTER TABLE orders
    ADD CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id)
    REFERENCES users(id);

---

# 35. Додавання NOT NULL

`NOT NULL` додається трохи інакше:

    ALTER TABLE users
    ALTER COLUMN name SET NOT NULL;

Зняти:

    ALTER TABLE users
    ALTER COLUMN name DROP NOT NULL;

---

# 36. Видалення constraint

Якщо constraint має ім'я:

    ALTER TABLE users
    DROP CONSTRAINT users_email_unique;

Тому іменування constraints — хороша практика.

---

# 37. Перевірка існуючих constraints

У `psql` можна подивитися структуру таблиці:

    \d users

Для більш детальної інформації:

    \d+ users

Там можна побачити:

- колонки;
- типи;
- `NOT NULL`;
- default;
- indexes;
- primary key;
- foreign keys;
- constraints.

---

# 38. Constraints і application validation

Це дуже важлива тема для Full Stack Developer.

Є два рівні перевірки:

    Frontend
        ↓
    Backend
        ↓
    Database

Наприклад, frontend перевіряє:

    price >= 0

Backend також перевіряє.

А PostgreSQL має:

    CHECK (price >= 0)

---

# 39. Чому перевірка потрібна в БД

Уявімо:

    React
       ↓
    Nest.js
       ↓
    PostgreSQL

Але завтра з'явиться:

    Python script
       ↓
    PostgreSQL

або:

    Admin tool
       ↓
    PostgreSQL

або:

    друга API-служба
       ↓
    PostgreSQL

Якщо правило існує тільки в frontend, його легко обійти.

Якщо правило існує в PostgreSQL:

    CHECK (price >= 0)

сама база гарантує його виконання.

---

# 40. Validation vs Constraints

Не треба вибирати щось одне.

Правильна модель:

    Frontend validation
        ↓
    хороший UX

    Backend validation
        ↓
    API/business logic

    Database constraints
        ↓
    гарантія цілісності даних

Ці рівні доповнюють один одного.

---

# 41. Приклад повноцінної структури

    CREATE TABLE users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

        name TEXT NOT NULL
            CHECK (length(trim(name)) > 0),

        email TEXT NOT NULL,

        active BOOLEAN NOT NULL DEFAULT TRUE,

        created_at TIMESTAMP NOT NULL
            DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT users_email_unique
            UNIQUE (email)
    );

Це вже значно ближче до реальної production-таблиці.

---

# 42. Приклад пов'язаних таблиць

    CREATE TABLE users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
    );

    CREATE TABLE orders (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

        user_id INTEGER NOT NULL,

        total NUMERIC(10, 2) NOT NULL
            CHECK (total >= 0),

        status TEXT NOT NULL DEFAULT 'pending'
            CHECK (
                status IN ('pending', 'paid', 'cancelled')
            ),

        created_at TIMESTAMP NOT NULL
            DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_orders_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE RESTRICT
    );

---

# 43. Порядок перевірки при INSERT

Коли виконується:

    INSERT INTO orders (...)

PostgreSQL перевіряє, чи не порушуються правила таблиці.

Наприклад:

    NOT NULL
    CHECK
    UNIQUE
    FOREIGN KEY
    PRIMARY KEY

Не потрібно запам'ятовувати точний внутрішній порядок виконання.

Важливіше розуміти:

> **INSERT/UPDATE не може завершитися успішно, якщо порушено constraint.**

---

# 44. Constraints при UPDATE

Constraints працюють не тільки під час `INSERT`.

Наприклад:

    UPDATE products
    SET price = -100
    WHERE id = 1;

Якщо є:

    CHECK (price >= 0)

операція буде відхилена.

Так само:

    UPDATE orders
    SET user_id = 999999
    WHERE id = 1;

буде відхилено, якщо користувача `999999` не існує.

---

# 45. Constraints при DELETE

При `DELETE` особливо важливі `FOREIGN KEY`.

Наприклад:

    DELETE FROM users
    WHERE id = 1;

Якщо є пов'язані orders і встановлено:

    ON DELETE RESTRICT

PostgreSQL не дозволить видалення.

Якщо:

    ON DELETE CASCADE

пов'язані записи будуть видалені.

---

# 46. DEFERRABLE constraints

Це advanced topic.

Звичайний constraint перевіряється під час виконання операції.

А `DEFERRABLE` дозволяє відкласти перевірку до кінця транзакції.

Наприклад:

    CONSTRAINT fk_example
        FOREIGN KEY (parent_id)
        REFERENCES parent(id)
        DEFERRABLE INITIALLY DEFERRED

Тоді перевірка може відбутися наприкінці:

    COMMIT;

Це корисно у складних транзакціях, де кілька пов'язаних змін повинні бути виконані як єдине ціле.

---

# 47. DEFERRABLE — що потрібно знати Junior

На Junior-рівні достатньо розуміти:

    DEFERRABLE

означає, що перевірку constraint можна відкласти.

Наприклад:

    DEFERRABLE INITIALLY DEFERRED

означає:

> перевіряти constraint наприкінці транзакції, а не одразу.

Детально використовувати це варто вже після впевненого розуміння:

- transactions;
- foreign keys;
- referential integrity.

---

# 48. Типові помилки

## Помилка 1 — використовувати тільки frontend validation

Погано:

    React → validation
    PostgreSQL → нічого

Краще:

    React → validation
    Nest.js → validation
    PostgreSQL → constraints

---

## Помилка 2 — дозволяти неможливі значення

Погано:

    price NUMERIC

Краще:

    price NUMERIC(10, 2) NOT NULL
        CHECK (price >= 0)

---

## Помилка 3 — не використовувати FOREIGN KEY

Погано:

    user_id INTEGER

Краще:

    user_id INTEGER NOT NULL
        REFERENCES users(id)

---

## Помилка 4 — бездумний CASCADE

Погано:

    ON DELETE CASCADE

на всіх зв'язках без аналізу наслідків.

Потрібно запитати:

> Чи дійсно видалення parent повинно видаляти child?

---

## Помилка 5 — не називати важливі constraints

Замість:

    UNIQUE (email)

у великих таблицях часто зручніше:

    CONSTRAINT users_email_unique
        UNIQUE (email)

---

# 49. Constraints та бізнес-правила

Не всі бізнес-правила можна або потрібно реалізовувати через `CHECK`.

Наприклад:

> Користувач не може створити більше 10 активних замовлень.

Це вже складніше, тому що потрібно перевіряти інші рядки.

Для таких правил можуть використовуватися:

- backend logic;
- transactions;
- triggers;
- functions;
- інші механізми PostgreSQL.

Тому:

> `CHECK` добре працює для локальних правил конкретного рядка або простих обмежень.

---

# 50. Constraint vs Trigger

Не треба плутати.

### Constraint

Декларативне правило:

    CHECK (price >= 0)

### Trigger

Автоматична дія у відповідь на подію:

    INSERT
    UPDATE
    DELETE

Наприклад:

> після створення order записати інформацію в audit log.

Для простого правила цілісності краще використовувати constraint, якщо він підходить.

---

# 51. Constraint vs Index

Це також важливо.

`INDEX`:

> оптимізує пошук.

`CONSTRAINT`:

> гарантує правило цілісності.

Наприклад:

    CREATE INDEX idx_users_email
    ON users(email);

прискорює пошук.

А:

    UNIQUE (email)

гарантує унікальність.

У PostgreSQL `UNIQUE` constraint реалізується з використанням унікального індексу, але концептуально це різні речі.

---

# 52. Практична модель

Розглядай таблицю приблизно так:

    TABLE users

    id
    │
    └── PRIMARY KEY

    name
    │
    └── NOT NULL

    email
    │
    ├── NOT NULL
    └── UNIQUE

    age
    │
    └── CHECK (age >= 0)

    active
    │
    ├── NOT NULL
    └── DEFAULT TRUE

    orders.user_id
    │
    └── FOREIGN KEY → users.id

---

# 53. Міні-шпаргалка

    NOT NULL
    → значення обов'язкове

    UNIQUE
    → значення не повторюється

    PRIMARY KEY
    → ідентифікатор рядка

    FOREIGN KEY
    → посилання на іншу таблицю

    CHECK
    → значення повинно відповідати умові

    DEFAULT
    → значення за замовчуванням

    ON DELETE CASCADE
    → видалити залежні записи

    ON DELETE RESTRICT
    → заборонити видалення

    ON DELETE SET NULL
    → встановити NULL

---

# 54. Повний приклад

    CREATE TABLE users (
        id INTEGER GENERATED ALWAYS AS IDENTITY,

        name TEXT NOT NULL,

        email TEXT NOT NULL,

        active BOOLEAN NOT NULL DEFAULT TRUE,

        created_at TIMESTAMP NOT NULL
            DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT pk_users
            PRIMARY KEY (id),

        CONSTRAINT uq_users_email
            UNIQUE (email),

        CONSTRAINT chk_users_name
            CHECK (length(trim(name)) > 0)
    );

    CREATE TABLE orders (
        id INTEGER GENERATED ALWAYS AS IDENTITY,

        user_id INTEGER NOT NULL,

        total NUMERIC(10, 2) NOT NULL,

        status TEXT NOT NULL DEFAULT 'pending',

        created_at TIMESTAMP NOT NULL
            DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT pk_orders
            PRIMARY KEY (id),

        CONSTRAINT chk_orders_total
            CHECK (total >= 0),

        CONSTRAINT chk_orders_status
            CHECK (
                status IN ('pending', 'paid', 'cancelled')
            ),

        CONSTRAINT fk_orders_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE RESTRICT
    );

---

# 55. Практика №1 — users

Створи таблицю:

    users

з полями:

    id
    name
    email
    age
    active

Вимоги:

- `id` → primary key;
- `name` → required;
- `email` → required + unique;
- `age` → від 0 до 120;
- `active` → default `TRUE`.

---

# 56. Практика №2 — перевірка NOT NULL

Спробуй:

    INSERT INTO users (name, email)
    VALUES (NULL, 'test@example.com');

Подивись на помилку PostgreSQL.

Потім виправ:

    INSERT INTO users (name, email)
    VALUES ('Valeriy', 'test@example.com');

---

# 57. Практика №3 — UNIQUE

Додай користувача:

    INSERT INTO users (name, email)
    VALUES ('User 1', 'user@example.com');

Спробуй ще раз:

    INSERT INTO users (name, email)
    VALUES ('User 2', 'user@example.com');

Подивись, як PostgreSQL захищає унікальність.

---

# 58. Практика №4 — CHECK

Створи:

    products

з:

    id
    name
    price
    stock

Встанови:

    price >= 0
    stock >= 0

Потім спробуй:

    INSERT INTO products (name, price, stock)
    VALUES ('Keyboard', -100, 10);

Після цього:

    INSERT INTO products (name, price, stock)
    VALUES ('Keyboard', 100, -10);

Обидві операції повинні бути відхилені.

---

# 59. Практика №5 — FOREIGN KEY

Створи:

    users

та:

    orders

В `orders`:

    user_id

повинен посилатися на:

    users.id

Спробуй створити order для неіснуючого користувача.

---

# 60. Практика №6 — ON DELETE

Створи зв'язок:

    users
       ↓
    orders

з:

    ON DELETE RESTRICT

Створи користувача.

Створи його order.

Потім спробуй видалити користувача.

Подивись, що відбудеться.

Після цього зміни constraint на:

    ON DELETE CASCADE

і повтори експеримент.

---

# 61. Практика №7 — Composite UNIQUE

Створи:

    enrollments

з:

    student_id
    course_id

Додай:

    UNIQUE (student_id, course_id)

Перевір:

    (1, 10)
    (1, 10)

Не повинно працювати.

А:

    (1, 10)
    (1, 20)

повинно працювати.

---

# 62. Практика №8 — знайди constraints

Створи таблицю з кількома constraints.

Потім у `psql`:

    \d users

і:

    \d+ users

Знайди:

- primary key;
- unique;
- check;
- foreign key;
- default;
- not-null columns.

---

# 63. Практика №9 — ALTER TABLE

Створи просту таблицю:

    CREATE TABLE test_products (
        id INTEGER,
        name TEXT,
        price NUMERIC
    );

Потім поступово додай:

    PRIMARY KEY

    NOT NULL

    UNIQUE

    CHECK

Через:

    ALTER TABLE

---

# 64. Практика №10 — спроектуй власну БД

Створи три таблиці:

    users
    products
    orders

Подумай, які constraints потрібні.

Наприклад:

    users
      │
      └── orders
              │
              └── products

Спробуй сам визначити:

- де потрібен `PRIMARY KEY`;
- де `FOREIGN KEY`;
- де `NOT NULL`;
- де `UNIQUE`;
- де `CHECK`;
- де `DEFAULT`;
- де `CASCADE`;
- де `RESTRICT`.

---

# 65. Контрольні питання

Перед переходом далі ти повинен уміти відповісти:

1. Що таке constraint?
2. Для чого потрібен `NOT NULL`?
3. Чим `NULL` відрізняється від `''`?
4. Для чого потрібен `UNIQUE`?
5. Що таке `PRIMARY KEY`?
6. Чим `PRIMARY KEY` відрізняється від `UNIQUE`?
7. Що таке `FOREIGN KEY`?
8. Що таке referential integrity?
9. Для чого потрібен `CHECK`?
10. Що робить `DEFAULT`?
11. Чи забороняє `DEFAULT` значення `NULL`?
12. Що робить `ON DELETE CASCADE`?
13. Чим `CASCADE` відрізняється від `RESTRICT`?
14. Коли потрібен `SET NULL`?
15. Що таке composite constraint?
16. Що таке composite primary key?
17. Навіщо називати constraints?
18. Як додати constraint через `ALTER TABLE`?
19. Як видалити constraint?
20. Де подивитися constraints у `psql`?
21. Чим constraint відрізняється від validation у backend?
22. Чим constraint відрізняється від trigger?
23. Чим constraint відрізняється від index?
24. Що таке `DEFERRABLE`?

---

# 66. Що особливо важливо для Junior Full Stack Developer

Ти повинен добре розуміти:

    PRIMARY KEY
    NOT NULL
    UNIQUE
    FOREIGN KEY
    CHECK
    DEFAULT

і:

    ON DELETE CASCADE
    ON DELETE RESTRICT
    ON DELETE SET NULL

Також потрібно вміти:

    CREATE TABLE
    ALTER TABLE
    DROP CONSTRAINT

та читати результат:

    \d table_name

---

# 67. Що можна залишити на Advanced

Не потрібно на початку витрачати багато часу на:

    DEFERRABLE
    INITIALLY DEFERRED
    складні multi-column constraints
    складні бізнес-правила через constraints

Спочатку потрібно впевнено відчути:

    таблиця
       ↓
    PRIMARY KEY
       ↓
    FOREIGN KEY
       ↓
    зв'язок таблиць
       ↓
    NOT NULL / UNIQUE / CHECK
       ↓
    цілісність даних

---

# 68. Ментальна модель розділу

Запам'ятай PostgreSQL як захисника даних:

    INSERT / UPDATE
          ↓
    ┌───────────────────┐
    │     PostgreSQL     │
    │                   │
    │ NOT NULL          │
    │ UNIQUE            │
    │ PRIMARY KEY       │
    │ FOREIGN KEY       │
    │ CHECK             │
    │ DEFAULT            │
    └───────────────────┘
          ↓
    valid data
          або
    error

Тобто constraint — це не просто "додаткове правило".

> **Constraint — це механізм, за допомогою якого сама база даних захищає цілісність своїх даних.**

---

# 69. Коротка схема для запам'ятовування

    PRIMARY KEY
    ↓
    Хто цей рядок?

    FOREIGN KEY
    ↓
    З ким він пов'язаний?

    NOT NULL
    ↓
    Чи обов'язково значення?

    UNIQUE
    ↓
    Чи може значення повторюватися?

    CHECK
    ↓
    Чи допустиме це значення?

    DEFAULT
    ↓
    Що поставити, якщо значення не передали?

    ON DELETE
    ↓
    Що робити із залежними записами?

---

# 70. Зв'язок із наступними темами

Після `Constraints` логічно переходити до:

    15-indexes

Там виникне важливе питання:

> Як PostgreSQL швидко знаходить потрібні дані?

Після цього:

    16-views
    17-transactions
    18-functions-and-procedures
    19-triggers

Тобто поточний розділ формує фундамент для розуміння того, як PostgreSQL не просто **зберігає** дані, а **контролює їхню цілісність**.

---

# 🔑 Головне з розділу

    PRIMARY KEY
    → унікально ідентифікує рядок

    FOREIGN KEY
    → забезпечує зв'язок між таблицями

    NOT NULL
    → значення обов'язкове

    UNIQUE
    → значення не повторюється

    CHECK
    → значення відповідає умові

    DEFAULT
    → автоматичне значення

    ON DELETE
    → визначає поведінку залежних записів

    CONSTRAINT
    → правило, яке PostgreSQL гарантує на рівні БД

Головна практична ідея:

> **Backend може перевіряти дані, frontend може перевіряти дані, але остаточна база даних також повинна захищати власну цілісність.**
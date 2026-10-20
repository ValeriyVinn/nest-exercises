# 01. Problem and Goals

Problem and Goals (проблема та цілі проєкту) — це початковий етап планування програмного забезпечення, на якому визначають, яку проблему потрібно розв'язати, для кого створюється застосунок, чому ця проблема важлива та як зрозуміти, що проєкт досяг успіху.

Перед тим як вибирати технології, створювати базу даних, проєктувати API або писати код, потрібно зрозуміти саму задачу.

На цьому етапі потрібно відповісти на основні запитання:

    What problem are we solving?
    Who has this problem?
    Why does this problem matter?
    What is the desired outcome?
    How will we measure success?
    What is outside the project scope?

Результатом етапу має бути чітке розуміння проблеми, цільових користувачів, цілей, очікуваної цінності та критеріїв успіху майбутнього застосунку.

---

### Ключові поняття

✔ problem statement
✔ problem
✔ pain point
✔ target audience
✔ target user
✔ stakeholder
✔ user need
✔ business need
✔ user value
✔ business value
✔ project vision
✔ project purpose
✔ project goals
✔ objectives
✔ expected outcome
✔ success criteria
✔ KPI
✔ measurable goal
✔ assumption
✔ constraint
✔ risk
✔ scope
✔ out of scope
✔ problem validation
✔ solution hypothesis
✔ root cause
✔ functional solution
✔ non-functional concern
✔ feasibility
✔ project brief
✔ product thinking
✔ SMART goals

---

### Що потрібно пам'ятати

• Problem — проблема або потреба, яку потрібно розв'язати.

• Problem statement — короткий і зрозумілий опис проблеми, її контексту та впливу на користувача.

• Pain point — конкретна складність, незручність або перешкода, з якою стикається користувач.

• Target audience — група людей, для яких створюється продукт.

• Stakeholder — особа або група, яка впливає на проєкт або зацікавлена в його результатах.

• User need — потреба користувача, яку має задовольнити застосунок.

• Project vision — загальне бачення того, яким має бути продукт і яку цінність він створюватиме.

• Project goal — бажаний результат, якого потрібно досягти.

• Objective — конкретна ціль, яка допомагає досягти загальної мети.

• Success criteria — умови, за якими можна визначити, чи досягнуто мети.

• KPI — Key Performance Indicator, показник, який допомагає оцінювати результативність.

• Assumption — припущення, яке ще не підтверджене достатніми доказами.

• Constraint — обмеження проєкту, наприклад час, бюджет, технології або ресурси.

• Scope — межі проєкту, тобто те, що входить до запланованої роботи.

• Out of scope — те, що свідомо не входить до поточного обсягу робіт.

• Root cause — першопричина проблеми, а не лише її зовнішній прояв.

• Solution hypothesis — припущення про те, як запропоноване рішення допоможе розв'язати проблему.

• Спочатку потрібно зрозуміти проблему, а потім вибирати рішення.

• Технології самі по собі не є метою проєкту. Вони є інструментами для реалізації рішення.

• Цілі мають бути достатньо конкретними, щоб можна було перевірити результат.

• Не потрібно намагатися реалізувати всі можливі функції в першій версії продукту.

---

# Problem

Problem — це проблема, потреба або складність, яку потрібно усунути за допомогою програмного забезпечення.

Проблема може бути пов'язана з:

    manual work
    inefficient processes
    lack of information
    poor communication
    data duplication
    human errors
    difficult access to services
    time-consuming operations
    lack of automation

Наприклад, у навчальному закладі розклад занять може зберігатися в декількох документах.

Викладачі змінюють розклад вручну, студенти переглядають застарілі файли, а адміністрація витрачає час на поширення оновлень.

Це не просто відсутність вебсайту. Це конкретна проблема управління та поширення інформації.

Можливе формулювання:

    Teachers and students do not have a single reliable
    source of information about the current schedule.

    As a result, users may rely on outdated information,
    and administrators spend additional time distributing updates.

Українською:

    Викладачі та студенти не мають єдиного надійного
    джерела інформації про актуальний розклад.

    Через це користувачі можуть використовувати застарілі
    дані, а адміністрація витрачає додатковий час
    на поширення оновлень.

---

# Problem Statement

Problem statement — короткий опис проблеми, який допомагає команді зрозуміти, що саме потрібно розв'язати.

Хороший problem statement зазвичай містить:

    1. Who — хто стикається з проблемою.
    2. What — у чому полягає проблема.
    3. Context — за яких обставин вона виникає.
    4. Impact — до яких наслідків вона призводить.

Шаблон:

    [Target users] experience [problem]
    when [context].

    This causes [negative impact].

Приклад:

    Teachers and students experience difficulties
    accessing the latest class schedule because
    schedule updates are distributed through
    multiple documents and communication channels.

    This causes confusion and additional administrative work.

Український варіант:

    Викладачі та студенти мають труднощі з отриманням
    актуального розкладу, оскільки зміни поширюються
    через різні документи та канали комунікації.

    Це призводить до плутанини та додаткової роботи
    для адміністрації.

Важливо:

    Problem statement ≠ feature list

Problem statement описує проблему, а не перелік функцій майбутнього застосунку.

Погано:

    We need a website with login, a database,
    an admin panel and a calendar.

Краще:

    Users need a reliable way to access current
    schedule information from one place.

У першому випадку вже запропоновано конкретне технічне рішення.

У другому випадку описано потребу, яку можна задовольнити різними способами.

---

# Pain Points

Pain point — конкретна незручність або складність, яку відчуває користувач.

Одна загальна проблема може містити декілька pain points.

Наприклад:

    Problem:
    The schedule is difficult to manage.

    Pain points:
    - Users cannot easily find the current schedule.
    - Updates must be distributed manually.
    - Different documents may contain different information.
    - Users may not know whether a schedule has changed.

Pain points допомагають зрозуміти, які саме аспекти проблеми потрібно усунути.

Для виявлення pain points можна поставити запитання:

    What is difficult?
    What takes too much time?
    What causes errors?
    What information is missing?
    What do users do to work around the problem?
    What happens when something goes wrong?

Важливо не плутати pain point із бажаною функцією.

Наприклад:

    Pain point:
    Users cannot determine whether the schedule is current.

    Possible solution:
    Display the last update date and time.

Функція є лише одним із можливих способів усунути проблему.

---

# Root Cause

Root cause — першопричина проблеми.

Іноді очевидна проблема є лише наслідком глибшої причини.

Наприклад:

    Symptom:
    Students often use outdated schedules.

    Possible root causes:
    - Updates are distributed manually.
    - There is no single source of truth.
    - Users cannot identify the latest version.
    - The update process is unreliable.

Якщо розглядати лише симптом, можна створити функцію, яка не усуне першопричину.

Наприклад, додавання ще однієї сторінки з розкладом не допоможе, якщо інформація на ній також оновлюється вручну й нерегулярно.

Тому перед проєктуванням рішення потрібно зрозуміти, чому проблема виникає.

---

## Метод 5 Whys

5 Whys — простий метод пошуку першопричини, коли послідовно запитують «Чому?».

Приклад:

    Problem:
    Students use outdated schedules.

    Why 1?
    Because they open old documents.

    Why 2?
    Because updated documents are distributed
    through several channels.

    Why 3?
    Because there is no single official source.

    Why 4?
    Because the current process relies on
    manually maintained files.

    Why 5?
    Because schedule management has not been
    centralized.

Можливий висновок:

    Root cause:
    Schedule information is managed and distributed
    through a fragmented manual process.

Цей метод допомагає сформувати гіпотезу про першопричину, але не гарантує, що п'яте запитання виявить справжню причину.

Висновки потрібно перевіряти на практиці.

---

# Target Audience

Target audience — група людей, для яких створюється продукт.

Приклад для застосунку управління розкладом:

    Target audience:
    - Teachers
    - Students
    - School administrators

Різні групи можуть мати різні потреби.

    Teachers:
    Need to view and update relevant schedule information.

    Students:
    Need to find the current schedule quickly.

    Administrators:
    Need to manage schedules and distribute updates reliably.

На цьому етапі не потрібно відразу проєктувати всі ролі, дозволи та таблиці бази даних.

Спочатку потрібно зрозуміти, хто користуватиметься продуктом і яку проблему кожна група хоче розв'язати.

---

# Target User

Target user — конкретний тип користувача, потреби якого важливі для проєктування застосунку.

Наприклад:

    Primary user:
    A student who needs to check the daily class schedule.

    Secondary user:
    A teacher who needs to review or update schedule information.

    Administrative user:
    A school administrator who manages schedules.

Primary user — основний користувач, на потреби якого насамперед орієнтується продукт.

Secondary user — інший важливий користувач, який також отримує користь від продукту.

У різних проєктах основний користувач може відрізнятися.

Наприклад, у внутрішній адміністративній системі основним користувачем може бути працівник адміністрації, а не відвідувач вебсайту.

---

# Stakeholders

Stakeholder — людина, група або організація, яка впливає на проєкт або зацікавлена в його результатах.

Приклад:

    Stakeholders:
    - End users
    - Product owner
    - Project sponsor
    - Administrators
    - Development team
    - Organization management

Ролі не обов'язково належать різним людям. У невеликому навчальному проєкті одна людина може бути автором ідеї, розробником і користувачем.

Важливо розрізняти:

    User:
    Directly uses the application.

    Stakeholder:
    Has an interest in the project's outcome.

Користувач часто є stakeholder, але не кожен stakeholder безпосередньо працює із застосунком.

Наприклад, керівник організації може не користуватися інтерфейсом щодня, але бути зацікавленим у результаті.

---

# User Need

User need — потреба користувача, яку має задовольняти продукт.

Приклади:

    User need:
    Find the current schedule quickly.

    User need:
    Know when the schedule was last updated.

    User need:
    Access schedule information from a phone.

Потреба описує те, що користувачеві необхідно зробити або отримати.

Функція описує можливість, яку надає застосунок.

Наприклад:

    User need:
    Find the current schedule.

    Possible features:
    - Schedule list
    - Search
    - Date selector
    - Last updated timestamp

Одна потреба може бути задоволена декількома функціями.

І навпаки, одна функція може задовольняти декілька потреб.

---

# User Value

User value — користь, яку користувач отримує від продукту.

Приклади:

    Feature:
    Display the latest schedule.

    User value:
    Users can find reliable information
    without searching through old documents.

    Feature:
    Show the last update time.

    User value:
    Users can understand whether the information
    is recent.

Функція сама по собі не гарантує цінності.

Під час планування потрібно запитувати:

    What can the user do with this feature?
    Which problem does it solve?
    How does it improve the user's situation?

Якщо функція не розв'язує проблему, не задовольняє потребу та не підтримує важливу вимогу, її необхідність варто переглянути.

---

# Project Vision

Project vision — коротке бачення майбутнього продукту та його основної цінності.

Vision відповідає на запитання:

    What do we want to create?
    Who is it for?
    What value should it provide?

Приклад:

    Project vision:

    Create a simple and reliable web application
    that allows users to access current schedule
    information from one place.

Українською:

    Створити простий і надійний вебзастосунок,
    який дозволяє користувачам отримувати актуальну
    інформацію про розклад в одному місці.

Vision описує напрямок розвитку продукту.

Він не повинен перетворюватися на детальний список усіх сторінок, компонентів, API endpoints і таблиць бази даних.

---

# Project Purpose

Project purpose — пояснення, навіщо створюється проєкт.

Приклад:

    Purpose:
    Reduce confusion caused by outdated schedule
    information and simplify access to current data.

Різниця між purpose та vision:

    Purpose:
    Why are we creating the product?

    Vision:
    What do we want the product to become?

Приклад:

    Purpose:
    Make schedule information easier to access.

    Vision:
    Provide a single reliable platform for schedule
    information and updates.

У невеликих проєктах purpose та vision можуть частково перетинатися. Головне — розуміти, яку роль виконує кожне формулювання.

---

# Project Goals

Project goals — результати, яких потрібно досягти завдяки проєкту.

Наприклад:

    Goal 1:
    Provide a single place for accessing schedules.

    Goal 2:
    Reduce the effort required to find current information.

    Goal 3:
    Make schedule updates easier to manage.

Цілі описують бажані результати, а не обов'язково конкретні способи реалізації.

Погано:

    Goal:
    Use PostgreSQL and NestJS.

Це вибір технологій, а не бізнес- або користувацький результат.

Краще:

    Goal:
    Store schedule information reliably and provide
    a maintainable way to access it.

PostgreSQL і NestJS можуть бути відповідними інструментами для досягнення цієї мети, але вони не визначають саму мету.

---

# Goals vs Objectives

Goal — загальний бажаний результат.

Objective — конкретна ціль, яка допомагає досягти goal.

Приклад:

    Goal:
    Improve access to schedule information.

    Objectives:
    - Allow users to view the current schedule.
    - Display the last update timestamp.
    - Make the main schedule page usable on mobile devices.

Цілі можуть мати різний рівень конкретності.

Для планування важливо перетворювати загальні наміри на конкретні результати, які можна перевірити.

---

# SMART Goals

SMART — поширена модель формулювання цілей.

SMART означає:

    S — Specific
    M — Measurable
    A — Achievable
    R — Relevant
    T — Time-bound

## Specific

Ціль має бути конкретною.

Погано:

    Improve the application.

Краще:

    Allow users to view the current daily schedule.

## Measurable

Має бути можливість перевірити результат.

Погано:

    Make the schedule much easier to use.

Краще:

    In usability testing, at least 8 out of 10
    participants can find the current schedule
    without assistance.

Цей показник є прикладом критерію для тестування, а не універсальним стандартом.

## Achievable

Ціль має бути досяжною з урахуванням ресурсів і часу.

Наприклад, для першої версії навчального проєкту доцільніше реалізувати перегляд і створення розкладів, ніж одразу будувати складну систему сповіщень, аналітики та інтеграцій.

## Relevant

Ціль повинна відповідати проблемі, яку розв'язує проєкт.

Якщо основна проблема — доступ до актуального розкладу, складна система персоналізації може не бути пріоритетом першої версії.

## Time-bound

Ціль повинна мати часові межі, якщо це потрібно для планування.

Приклад:

    Complete the first usable version
    within four weeks.

Не кожна навчальна ціль потребує жорсткого дедлайну, але часові межі допомагають планувати роботу та оцінювати прогрес.

---

# Success Criteria

Success criteria — конкретні умови, за якими визначають, чи досягнуто запланованого результату.

Наприклад:

    Goal:
    Users should be able to access the current schedule.

    Success criteria:
    - The current schedule is available on the main page.
    - Users can identify the schedule date.
    - The last update time is displayed.
    - The page works on desktop and mobile.
    - Users can find the schedule without assistance
      during a simple usability test.

Критерії успіху мають бути пов'язані з цілями.

Якщо мета — спростити пошук інформації, кількість написаних рядків коду не є відповідним критерієм успіху.

Варто розрізняти:

    Output:
    What the team produces.

    Outcome:
    What changes as a result.

Приклад:

    Output:
    A schedule page has been implemented.

    Outcome:
    Users can find the current schedule more easily.

Створена сторінка є результатом роботи розробника, але її існування саме по собі не доводить, що проблему користувача розв'язано.

---

# KPI

KPI (Key Performance Indicator) — ключовий показник результативності.

KPI допомагає оцінити, наскільки добре продукт або процес досягає певної мети.

Можливі показники:

    Task completion rate
    Task completion time
    Error rate
    User satisfaction
    Number of active users
    Number of successful operations
    Data freshness
    System availability

Приклад:

    Goal:
    Make the schedule easier to find.

    KPI:
    Average time required to find the current schedule.

    Measurement:
    Measure task completion time during usability testing.

Інший приклад:

    Goal:
    Keep schedule information current.

    KPI:
    Percentage of schedule changes published
    within the agreed update period.

KPI потрібно вибирати відповідно до проблеми та мети.

Не кожному навчальному проєкту потрібна повноцінна система KPI. Іноді достатньо декількох зрозумілих success criteria та простих перевірок.

---

# Assumptions

Assumption — припущення, яке використовують під час планування, але яке ще не підтверджене достатніми доказами.

Приклади:

    Assumption:
    Most users access the schedule from a phone.

    Assumption:
    Users prefer one central schedule page.

    Assumption:
    Administrators are willing to maintain
    schedule information in the application.

Припущення допомагають рухатися вперед, коли ще немає всієї інформації.

Але неперевірені припущення можуть призвести до неправильних рішень.

Наприклад, можна витратити багато часу на мобільний інтерфейс, хоча основними користувачами виявляться працівники, які працюють за комп'ютерами.

Для кожного важливого припущення корисно визначити:

    Assumption:
    What do we believe?

    Impact:
    What happens if we are wrong?

    Validation:
    How can we check it?

Приклад:

    Assumption:
    Users need to see schedule changes immediately.

    Impact:
    We may need notifications or frequent updates.

    Validation:
    Ask users how they currently learn about changes
    and how quickly they need to receive them.

---

# Constraints

Constraint — обмеження, яке впливає на реалізацію проєкту.

Основні типи:

    Time constraints
    Budget constraints
    Technical constraints
    Resource constraints
    Organizational constraints
    Legal constraints
    Infrastructure constraints

Приклад:

    Constraints:
    - One developer.
    - Limited development time.
    - Existing PostgreSQL database.
    - Deployment on a limited hosting plan.
    - No dedicated designer.

Обмеження потрібно враховувати до того, як буде визначено обсяг робіт.

Наприклад, якщо проєкт створює один розробник, необхідно оцінити не лише написання коду, а й тестування, налаштування середовища, документацію та розгортання.

---

# Risks

Risk — невизначена подія або обставина, яка може негативно вплинути на проєкт.

Приклади:

    Risk:
    The requirements may change during development.

    Risk:
    The developer may underestimate implementation time.

    Risk:
    The hosting platform may not support
    a required feature.

    Risk:
    Users may not adopt the proposed solution.

Для початкового планування достатньо визначити основні ризики та подумати, як їх зменшити.

Наприклад:

    Risk:
    The project scope may become too large.

    Mitigation:
    Define an MVP and postpone secondary features.

Інший приклад:

    Risk:
    Important user needs may be misunderstood.

    Mitigation:
    Validate the problem with potential users
    before implementing major features.

Risk не означає, що проблема обов'язково виникне. Це можливість, яку варто враховувати під час планування.

---

# Scope

Scope — межі проєкту.

Scope визначає, що входить до поточної версії продукту та яку роботу потрібно виконати.

Наприклад:

    In scope:
    - View schedules.
    - Create a schedule.
    - Edit schedule information.
    - Display the last update time.

    Out of scope:
    - Automatic timetable optimization.
    - Integration with external school systems.
    - Advanced analytics.
    - Push notifications.

Чіткі межі допомагають уникнути scope creep.

## Scope Creep

Scope creep — поступове неконтрольоване розширення обсягу проєкту.

Наприклад:

    Initial plan:
    Build a simple schedule application.

    New requests:
    - Add notifications.
    - Add analytics.
    - Add chat.
    - Add calendar synchronization.
    - Add file uploads.
    - Add role-based permissions.
    - Add automatic schedule generation.

Кожна функція окремо може бути корисною, але всі вони разом можуть перетворити невеликий навчальний проєкт на надто складну систему.

Щоб уникнути scope creep:

    1. Define the project goals.
    2. Define the MVP.
    3. Separate required and optional features.
    4. Evaluate new requests before accepting them.
    5. Update the plan when the scope changes.

Важливо: відкладена функція не обов'язково відкидається назавжди. Вона просто не входить до поточної версії.

---

# Solution Hypothesis

Solution hypothesis — припущення про те, як запропоноване рішення допоможе досягти бажаного результату.

Формат:

    We believe that [solution]
    will help [target users]
    achieve [desired outcome]
    because [reason].

Приклад:

    We believe that providing a single web page
    with the current schedule and its last update time
    will help students find reliable information faster
    because they will no longer need to search
    through multiple documents.

Українською:

    Ми припускаємо, що єдина вебсторінка з актуальним
    розкладом і часом останнього оновлення допоможе
    студентам швидше знаходити достовірну інформацію,
    оскільки їм більше не доведеться шукати її
    в декількох документах.

Гіпотезу потрібно перевіряти.

Наприклад, можна створити простий прототип і попросити декількох користувачів знайти потрібний розклад.

Якщо вони все ще мають труднощі, потрібно переглянути рішення.

---

# Problem vs Solution

Важливо розрізняти проблему та рішення.

    Problem:
    Users cannot easily find current information.

    Solution:
    Create a centralized schedule page.

    Implementation:
    Build the page using Next.js and TypeScript.

    Data storage:
    Store schedule information in PostgreSQL.

Це різні рівні мислення.

Problem описує потребу.

Solution описує спосіб її задоволення.

Implementation описує, як саме буде побудовано рішення.

Data storage описує один з технічних аспектів реалізації.

Не варто починати з вибору бібліотек, таблиць або компонентів, якщо ще незрозуміло, яку проблему потрібно розв'язати.

---

# Feasibility

Feasibility — оцінка того, наскільки реально реалізувати запропоноване рішення за наявних умов.

Основні питання:

    Is it technically feasible?
    Is it feasible within the available time?
    Are the required resources available?
    Can the solution be maintained?
    Are there legal or operational restrictions?

Приклад:

    Proposed solution:
    A simple web application for schedule management.

    Technical feasibility:
    Can be implemented with Next.js, NestJS and PostgreSQL.

    Time feasibility:
    A basic version can be developed incrementally.

    Operational feasibility:
    Requires a way to maintain and update schedules.

Те, що рішення технічно можливе, ще не означає, що воно доцільне для конкретного проєкту.

Наприклад, складна мікросервісна архітектура може бути технічно реалізованою, але невиправданою для маленького застосунку з одним розробником.

---

# Project Brief

Project brief — короткий документ, який підсумовує основну інформацію про проєкт.

Він може містити:

    1. Project name
    2. Problem statement
    3. Target audience
    4. Project purpose
    5. Project vision
    6. Project goals
    7. Success criteria
    8. Assumptions
    9. Constraints
    10. Scope
    11. Out of scope
    12. Main risks

Для невеликого навчального проєкту не потрібно створювати великий формальний документ.

Достатньо одного Markdown-файлу, який допоможе зберігати цілісне розуміння проєкту.

Наприклад:

    architecture/
    └── 02-project-planning/
        └── 01-problem-and-goals/
            └── README.md

У наступних темах цей початковий опис можна поступово доповнювати вимогами, user stories, моделлю даних, API-контрактами та планом реалізації.

---

# Приклад: Worship Schedule

Розглянемо навчальний проєкт Worship Schedule — вебзастосунок для створення та редагування розкладів богослужінь.

Це приклад застосування принципів problem-and-goals до реального типу вебзастосунку.

## 1. Project Name

    Worship Schedule

## 2. Problem

Користувачам, які створюють і поширюють розклади богослужінь, потрібен зручний спосіб підготовки, редагування та збереження розкладів.

Якщо інформація зберігається в різних документах, підготовка нових розкладів і внесення змін можуть вимагати зайвої ручної роботи.

## 3. Problem Statement

    Users need a simple and reliable way to create,
    edit and manage worship schedules without having
    to recreate documents from scratch each time.

Українською:

    Користувачам потрібен простий і надійний спосіб
    створювати, редагувати та зберігати розклади
    богослужінь без необхідності щоразу створювати
    документи з нуля.

## 4. Target Users

    Primary users:
    People who create and manage worship schedules.

    Secondary users:
    People who need to access or read published schedules.

На початковому етапі потрібно визначити, чи застосунок призначений лише для особистого використання, чи також для спільної роботи кількох користувачів.

Це рішення впливатиме на подальші вимоги до доступу та зберігання даних.

## 5. User Needs

    - Create a new schedule.
    - Edit an existing schedule.
    - Save schedules for later use.
    - Format schedule text.
    - Access previously created schedules.
    - View schedule information clearly.

## 6. Project Vision

    Create a simple web application that allows
    users to create, edit and manage worship schedules
    in a convenient and structured way.

## 7. Project Purpose

    Reduce the manual effort required to prepare
    and maintain worship schedules.

## 8. Project Goals

    Goal 1:
    Allow users to create and save schedules.

    Goal 2:
    Allow users to edit existing schedules.

    Goal 3:
    Provide basic text formatting.

    Goal 4:
    Make saved schedules easy to find and reopen.

## 9. Success Criteria

    - A user can create a schedule.
    - A user can save the schedule.
    - A user can reopen and edit a saved schedule.
    - Basic formatting can be applied.
    - Changes remain available after reloading the application.
    - The main workflow works without critical errors.

## 10. Assumptions

    - Users need to create schedules more than once.
    - Users want to edit previously saved schedules.
    - Basic text formatting is sufficient for the first version.
    - Users need a clear way to organize their schedules.

Ці припущення варто переглядати в міру уточнення вимог.

## 11. Constraints

    - Limited development time.
    - One developer.
    - Existing knowledge of JavaScript and TypeScript.
    - The application should remain manageable
      as a learning project.

## 12. In Scope

    - Create a schedule.
    - Save a schedule.
    - View saved schedules.
    - Edit a schedule.
    - Apply basic text formatting.

## 13. Out of Scope

    - Advanced collaborative editing.
    - Complex document templates.
    - Automatic generation of schedules.
    - Advanced access control beyond the chosen
      ownership model.
    - Complex integrations with external services.

Це приклад початкових меж, а не остаточна специфікація продукту.

## 14. Solution Hypothesis

    We believe that a web application with
    schedule creation, editing and persistent storage
    will reduce the manual effort required to prepare
    and maintain worship schedules.

## 15. Possible Success Measurement

    Task:
    Create and save a schedule.

    Expected result:
    The user can complete the task successfully.

    Task:
    Reopen and edit a saved schedule.

    Expected result:
    The user can find the saved schedule and
    preserve the changes.

    Task:
    Format schedule text.

    Expected result:
    The user can apply the supported formatting
    without manually editing HTML.

Цей приклад допомагає сформулювати цілі до вибору остаточної структури бази даних, API та компонентів інтерфейсу.

---

# Product Thinking

Product thinking — підхід, за якого розробник розглядає застосунок не лише як набір технічних компонентів, а як інструмент для розв'язання проблем користувачів.

Під час product thinking важливо враховувати:

    User needs
    User value
    Business value
    Usability
    Feasibility
    Priorities
    Success criteria

Наприклад, розробник може захотіти додати складну систему налаштувань.

Але якщо основна проблема користувача — швидко створити та зберегти розклад, важливішими можуть бути зрозумілий редактор і надійне збереження.

Питання для перевірки:

    Which problem does this feature solve?
    Who benefits from it?
    Is it necessary for the first version?
    How much effort will it require?
    How will we know whether it works?

Product thinking допомагає не витрачати весь час на технічні можливості, які не додають достатньої цінності продукту.

---

# Problem Validation

Problem validation — перевірка того, чи справді проблема існує та чи важлива вона для потенційних користувачів.

Розробник може неправильно оцінити потреби людей, якщо спирається лише на власні припущення.

Способи перевірки:

    User interviews
    Surveys
    Observation
    Existing workflow analysis
    Prototype testing
    Review of existing solutions

Наприклад, перед створенням застосунку для управління розкладами можна з'ясувати:

    - Як користувачі створюють розклади зараз?
    - Які інструменти вони використовують?
    - Що забирає найбільше часу?
    - Які помилки виникають найчастіше?
    - Чого їм не вистачає в наявних інструментах?

Не обов'язково проводити масштабне дослідження для навчального проєкту.

Навіть коротка розмова з потенційним користувачем може виявити припущення, які потрібно переглянути.

Водночас відсутність можливості провести дослідження не забороняє навчальний проєкт. Просто потрібно чесно розрізняти підтверджені факти та власні гіпотези.

---

# Від Problem до Architecture

Планування проєкту поступово переходить від розуміння проблеми до технічного рішення.

    Problem
        ↓
    Goals
        ↓
    Requirements
        ↓
    User Stories
        ↓
    User Flows
        ↓
    Wireframes
        ↓
    Domain and Data Modeling
        ↓
    Application Architecture
        ↓
    API Contracts
        ↓
    Implementation Planning
        ↓
    Testing Strategy
        ↓
    Deployment Planning

Це спрощена модель послідовності тем у твоєму розділі Architecture. У реальних проєктах ці етапи можуть повторюватися, уточнюватися та виконуватися частково паралельно.

## Problem

Яку проблему потрібно розв'язати?

## Goals

Якого результату потрібно досягти?

## Requirements

Що саме повинен робити застосунок?

## User Stories

Які завдання користувач повинен мати змогу виконувати?

## User Flows

Якими кроками користувач досягає результату?

## Wireframes

Як приблизно виглядатимуть сторінки та елементи інтерфейсу?

## Domain and Data Modeling

Які основні сутності існують у предметній області та як вони пов'язані?

## Application Architecture

Як поділити застосунок на частини та як ці частини взаємодіятимуть?

## API Contracts

Як клієнт і сервер обмінюватимуться даними?

## Implementation Planning

У якій послідовності реалізовувати функції?

## Testing Strategy

Як перевірити, що застосунок працює правильно?

## Deployment Planning

Як підготувати та розгорнути застосунок у робочому середовищі?

Головний принцип:

    Understand the problem before designing the solution.

---

# Типові помилки

## 1. Починати з технологій

❌ Погано:

    I want to build an application using NestJS,
    PostgreSQL and React.

Це опис технологічного наміру, але не проблеми.

✔ Краще:

    I want to help users create, edit and manage
    schedules more efficiently.

Після визначення проблеми можна вибрати відповідні технології.

---

## 2. Плутати проблему з відсутністю функції

❌ Погано:

    The problem is that the application does not
    have a search button.

✔ Краще:

    Users have difficulty finding the information
    they need among many schedules.

Пошук може бути рішенням, але потрібно спочатку зрозуміти потребу.

---

## 3. Формулювати надто загальні цілі

❌ Погано:

    Make a good application.

✔ Краще:

    Allow users to create, save and edit schedules.

Конкретна ціль допомагає визначити необхідні вимоги та критерії перевірки.

---

## 4. Створювати забагато функцій

❌ Погано:

    The first version must include every possible feature.

✔ Краще:

    Implement the essential functionality first
    and postpone secondary features.

Це допомагає контролювати обсяг проєкту.

---

## 5. Ігнорувати користувачів

❌ Погано:

    I think users will need this feature,
    so I will implement it immediately.

✔ Краще:

    Identify the user need, formulate a hypothesis
    and validate it when possible.

---

## 6. Використовувати нечіткі критерії успіху

❌ Погано:

    The application should be convenient.

✔ Краще:

    Users can complete the main task without assistance
    during a usability test.

Зручність важлива, але її потрібно оцінювати через конкретні спостережувані результати.

---

## 7. Плутати output та outcome

❌ Погано:

    Success means writing 5,000 lines of code.

✔ Краще:

    Success means that users can complete
    the intended task reliably.

Кількість коду не є показником цінності продукту.

---

## 8. Ігнорувати обмеження

❌ Погано:

    Plan a large system without considering
    development time and maintenance.

✔ Краще:

    Define a realistic first version based on
    available time, skills and resources.

---

## 9. Не визначати межі проєкту

❌ Погано:

    Add every new idea to the current version.

✔ Краще:

    Define what is in scope and what is out of scope.

---

## 10. Вважати припущення доведеними фактами

❌ Погано:

    All users definitely want this feature.

✔ Краще:

    We assume that users need this feature.
    We should validate this assumption.

---

# Practical Exercises

## Exercise 1 — Identify the Problem

Є така ситуація:

    A school stores schedules in multiple files.
    Students sometimes use outdated versions.
    Administrators spend time distributing updates.

Потрібно визначити:

    1. What is the main problem?
    2. Who experiences the problem?
    3. What are the pain points?
    4. What could be the root cause?
    5. What information is still missing?

Приклад відповіді:

    Problem:
    Users do not have a reliable way to access
    the latest schedule.

    Target users:
    Students, teachers and administrators.

    Pain points:
    Outdated files, confusing updates,
    additional manual work.

    Possible root cause:
    Schedule information is distributed
    through multiple channels.

    Missing information:
    How schedules are currently updated,
    who manages them and how users access them.

---

## Exercise 2 — Write a Problem Statement

Використай шаблон:

    [Target users] experience [problem]
    when [context].

    This causes [impact].

Приклад:

    Teachers experience difficulties maintaining
    schedules when updates must be copied
    across multiple documents.

    This causes additional work and increases
    the risk of inconsistent information.

---

## Exercise 3 — Define Project Goals

Для застосунку Worship Schedule сформулюй три цілі.

Наприклад:

    Goal 1:
    Allow users to create and save schedules.

    Goal 2:
    Allow users to edit existing schedules.

    Goal 3:
    Make saved schedules easy to access.

Перевір кожну ціль:

    Does it address the problem?
    Is the expected outcome clear?
    Can the result be checked?

---

## Exercise 4 — Define Success Criteria

Для кожної цілі визнач конкретні критерії.

Наприклад:

    Goal:
    Allow users to edit saved schedules.

    Success criteria:
    - The user can open a saved schedule.
    - The user can change its content.
    - The user can save the changes.
    - The updated content remains available
      after the page is reloaded.

---

## Exercise 5 — Define Scope

Розподіли функції між In Scope та Out of Scope.

    Create a schedule.
    Edit a schedule.
    Save a schedule.
    Advanced analytics.
    Basic text formatting.
    Automatic schedule generation.
    Complex collaboration.
    View saved schedules.

Приклад для першої версії:

    In Scope:
    - Create a schedule.
    - Edit a schedule.
    - Save a schedule.
    - Basic text formatting.
    - View saved schedules.

    Out of Scope:
    - Advanced analytics.
    - Automatic schedule generation.
    - Complex collaboration.

---

## Exercise 6 — Identify Assumptions and Risks

Припущення:

    Users want to save multiple schedules.

Можливий ризик:

    The application may need more complex
    data organization than initially expected.

Спосіб перевірки:

    Ask potential users how many schedules
    they usually create and how they organize them.

---

## Exercise 7 — Write a Project Brief

Створи файл:

    architecture/02-project-planning/
    01-problem-and-goals/README.md

Заповни його:

    Project name:
    Problem statement:
    Target users:
    Project purpose:
    Project vision:
    Project goals:
    Success criteria:
    Assumptions:
    Constraints:
    In scope:
    Out of scope:
    Main risks:

Для навчального проєкту можна використати Worship Schedule, Lyceum або інший застосунок, над яким ти працюєш.

Не намагайся відразу описати кожну технічну деталь. Мета вправи — навчитися чітко формулювати проблему та бажаний результат.

---

# Питання зі співбесіди

Що таке software architecture planning?

Що таке problem statement?

Чим problem відрізняється від solution?

Що таке pain point?

Що таке root cause?

Для чого використовують метод 5 Whys?

Що таке target audience?

Чим target audience відрізняється від target user?

Хто такий stakeholder?

Чим user відрізняється від stakeholder?

Що таке user need?

Що таке user value?

Що таке project vision?

Чим project vision відрізняється від project purpose?

Що таке project goal?

Чим goal відрізняється від objective?

Що таке SMART goals?

Що означає кожна літера в SMART?

Що таке success criteria?

Чим output відрізняється від outcome?

Що таке KPI?

Чим KPI відрізняється від success criteria?

Що таке assumption?

Чому припущення потрібно перевіряти?

Що таке constraint?

Що таке project risk?

Що таке scope?

Чим in scope відрізняється від out of scope?

Що таке scope creep?

Як уникати неконтрольованого розширення проєкту?

Що таке solution hypothesis?

Як можна перевірити solution hypothesis?

Що таке feasibility?

Що таке project brief?

Для чого потрібен product thinking?

Чому не варто починати планування з вибору технологій?

Чому кількість реалізованих функцій не завжди визначає успіх продукту?

Як визначити основну проблему користувача?

Як сформулювати вимірювану ціль?

Як зрозуміти, що функція справді потрібна?

Чому важливо визначати межі першої версії застосунку?

Як problem-and-goals впливає на подальшу архітектуру?

---

# Шлях

## 🟢 Core — обов'язково знати

Problem.

Problem statement.

Problem vs solution.

Pain points.

Target audience.

Target users.

Stakeholders.

User needs.

Project purpose.

Project vision.

Project goals.

Success criteria.

Assumptions.

Constraints.

Scope.

In scope.

Out of scope.

Root cause.

Основи SMART goals.

Основи solution hypothesis.

Розуміння того, чому спочатку потрібно визначити проблему, а вже потім проєктувати рішення.

## 🔵 Junior

Уміння сформулювати problem statement.

Уміння визначити цільових користувачів.

Уміння розрізняти потреби користувачів і функції.

Уміння сформулювати конкретні project goals.

Уміння визначити success criteria.

Розуміння SMART.

Розуміння різниці між output та outcome.

Основи KPI.

Уміння визначати assumptions та constraints.

Основи risk identification.

Розуміння scope creep.

Уміння скласти project brief.

Уміння пояснити, як проблема впливає на вибір функцій.

## 🟠 Middle

Problem validation.

Root cause analysis.

Stakeholder analysis.

Prioritization of goals.

Measurable outcomes.

Product discovery.

Solution hypothesis validation.

Risk assessment.

Feasibility analysis.

Scope management.

Trade-offs між user value, development cost і project constraints.

Зв'язок між бізнес-цілями, вимогами та архітектурними рішеннями.

Уміння обґрунтувати, чому певна функція не повинна входити до першої версії.

## 🔴 Senior

Strategic product thinking.

Problem framing.

Complex stakeholder alignment.

Evidence-based decision-making.

Opportunity assessment.

Business impact analysis.

Managing uncertainty.

Portfolio-level prioritization.

Long-term product strategy.

Evaluating architectural investments against business goals.

Balancing user needs, organizational goals, technical constraints and long-term maintainability.

Уміння переглядати початкове формулювання проблеми, коли нові докази показують, що першопричина була визначена неправильно.

---

# Міні-шпаргалка

## Problem Statement

    Who?
      ↓
    What problem?
      ↓
    In what context?
      ↓
    What impact?

---

## Goals

    Problem
      ↓
    Desired outcome
      ↓
    Project goal
      ↓
    Success criteria

---

## SMART

    S → Specific
    M → Measurable
    A → Achievable
    R → Relevant
    T → Time-bound

---

## Problem vs Solution

    Problem:
    Users cannot easily find current information.

    Solution:
    Create a centralized schedule page.

    Implementation:
    Build the page with Next.js.

---

## Goal vs Objective

    Goal:
    Improve access to schedule information.

    Objective:
    Allow users to view the current schedule
    from the main page.

---

## Output vs Outcome

    Output:
    A schedule page has been implemented.

    Outcome:
    Users can find schedule information more easily.

---

## Assumption

    We believe something is true.
          ↓
    Identify its impact.
          ↓
    Validate it when possible.

---

## Scope

    In scope:
    What we plan to implement now.

    Out of scope:
    What we intentionally postpone or exclude.

---

## Solution Hypothesis

    Solution
       ↓
    Target users
       ↓
    Expected outcome
       ↓
    Validation

---

## Основні правила

    Problem → understand the problem.

    Goals → define the desired outcome.

    Success criteria → determine how to measure success.

    Assumptions → identify what is not yet confirmed.

    Constraints → understand the limitations.

    Risks → anticipate possible problems.

    Scope → define the project's boundaries.

    Solution hypothesis → explain why the solution should work.

    Project brief → document the essential project context.

---

# Головне

• Починай планування із проблеми, а не з технологій.

• Problem statement має пояснювати, хто стикається з проблемою, у чому вона полягає та до чого призводить.

• Не плутай проблему, потребу користувача, функцію та технічну реалізацію.

• Target users — люди, для яких створюється застосунок.

• Stakeholders — усі, хто впливає на проєкт або зацікавлений у його результатах.

• Project vision описує бажане майбутнє продукту.

• Project purpose пояснює, навіщо створюється продукт.

• Project goals визначають результати, яких потрібно досягти.

• Success criteria допомагають перевірити, чи досягнуто цілей.

• SMART допомагає формулювати конкретні та перевірювані цілі.

• KPI використовують для вимірювання важливих показників результативності, коли це доречно.

• Assumptions — неперевірені припущення, які можуть вплинути на рішення.

• Constraints визначають обмеження, у межах яких потрібно працювати.

• Risks допомагають передбачити можливі труднощі.

• Scope визначає, що входить до поточного проєкту.

• Scope creep — неконтрольоване розширення обсягу робіт.

• Solution hypothesis пояснює, чому запропоноване рішення має допомогти.

• Problem validation допомагає перевірити, чи правильно зрозуміли потреби користувачів.

• Project brief зберігає основні відомості про проблему, цілі та межі проєкту.

• Для першої версії застосунку потрібно визначати найважливіші цілі та функції, а не намагатися реалізувати все.

• Успішний проєкт — це не просто застосунок, який працює. Це рішення, яке допомагає досягти визначеного результату.

• Розуміння проблеми впливає на всі наступні етапи: вимоги, user stories, моделювання даних, API, архітектуру, тестування та розгортання.

• Основний принцип:

    Understand the problem before designing the solution.
# 02. Requirements and MVP

Requirements and MVP (вимоги та мінімально життєздатний продукт) — це етап планування програмного забезпечення, на якому визначають, що саме повинен робити застосунок, які обмеження він має враховувати та яку мінімальну версію потрібно реалізувати, щоб перевірити основну ідею продукту.

Після визначення проблеми та цілей проєкту потрібно перетворити загальні наміри на конкретні вимоги.

Наприклад, якщо мета застосунку Worship Schedule — спростити створення та редагування розкладів богослужінь, потрібно визначити:

- Які дії користувач повинен мати змогу виконувати.
- Які дані необхідно зберігати.
- Які правила має виконувати система.
- Які вимоги стосуються безпеки, продуктивності та зручності.
- Які функції потрібні для першої версії.
- Які функції можна відкласти на майбутнє.
- За якими критеріями перевірятиметься правильність роботи.

Основна мета цього етапу — визначити достатньо чіткий обсяг роботи, щоб можна було переходити до user stories, user flows, моделювання даних та проєктування архітектури.

---

### Ключові поняття

✔ requirement
✔ requirements engineering
✔ requirement elicitation
✔ functional requirement
✔ non-functional requirement
✔ business requirement
✔ user requirement
✔ system requirement
✔ stakeholder requirement
✔ technical requirement
✔ constraint
✔ assumption
✔ requirement prioritization
✔ requirement validation
✔ requirement verification
✔ acceptance criteria
✔ business rules
✔ system behavior
✔ edge case
✔ exception
✔ dependency
✔ requirement traceability
✔ scope
✔ MVP
✔ Minimum Viable Product
✔ MMP
✔ prototype
✔ proof of concept
✔ feature
✔ feature prioritization
✔ must-have
✔ should-have
✔ could-have
✔ won't-have
✔ MoSCoW
✔ release scope
✔ backlog
✔ product backlog
✔ scope creep
✔ MVP validation
✔ iterative development

---

### Що потрібно пам'ятати

• Requirement — вимога, яка описує потребу, можливість, правило або обмеження, що має враховувати система.

• Functional requirement описує, що система повинна робити.

• Non-functional requirement описує, якими характеристиками повинна володіти система або за яких умов вона має працювати.

• Business requirement пояснює, якого організаційного або бізнес-результату потрібно досягти.

• User requirement описує потребу або можливість з погляду користувача.

• System requirement формулює конкретні очікування до поведінки або властивостей системи.

• Business rule визначає правило предметної області, якого має дотримуватися система.

• Acceptance criteria визначають умови, за яких конкретну функцію можна вважати реалізованою правильно.

• Requirement validation перевіряє, чи визначені вимоги відповідають реальним потребам.

• Requirement verification перевіряє, чи відповідає реалізація встановленим вимогам.

• MVP — Minimum Viable Product, мінімально життєздатний продукт, який дає змогу перевірити основну цінність рішення за допомогою мінімально необхідного набору функцій.

• MVP — не просто застосунок із малою кількістю функцій. Він повинен розв'язувати конкретну проблему та давати можливість перевірити ключові припущення.

• Prototype — прототип, який допомагає дослідити ідею, інтерфейс або поведінку майбутнього продукту.

• Proof of Concept (PoC) — перевірка того, чи можливо реалізувати певну технічну ідею.

• Backlog — упорядкований список функцій, вимог, завдань та інших робіт, які потрібно розглянути або виконати.

• MoSCoW — метод пріоритизації вимог: Must have, Should have, Could have, Won't have this time.

• Не всі вимоги потрібно реалізовувати в першій версії.

• Вимоги мають бути достатньо конкретними, щоб розробник міг реалізувати їх, а тестувальник — перевірити.

• Чим раніше виявлено неоднозначність у вимогах, тим менше ризику побудувати неправильне рішення.

• Вимоги можуть уточнюватися під час розробки, але зміни потрібно оцінювати з погляду цілей, обсягу та наслідків для системи.

---

# Requirements

Requirements — вимоги до програмного забезпечення, які описують, що потрібно реалізувати та яких умов необхідно дотримуватися.

Вимоги допомагають перетворити загальну ідею продукту на зрозуміле завдання для розробки.

Наприклад:

    Project goal:
    Allow users to manage worship schedules.

    Requirement:
    A user must be able to create a new schedule.

    Requirement:
    A user must be able to edit an existing schedule.

    Requirement:
    Saved schedules must remain available
    after the user reloads the application.

Ці вимоги вже конкретніші за загальну мету проєкту.

Вони допомагають визначити майбутні сторінки, API endpoints, операції з базою даних і тестові сценарії.

---

# Requirements Engineering

Requirements Engineering — процес виявлення, аналізу, документування, перевірки та управління вимогами до програмного забезпечення.

Основні етапи:

    1. Elicitation
       ↓
    2. Analysis
       ↓
    3. Specification
       ↓
    4. Validation
       ↓
    5. Management

## 1. Elicitation

Elicitation — виявлення вимог.

Потрібно з'ясувати, що саме потрібно користувачам і зацікавленим сторонам.

Джерела вимог:

    User interviews
    Surveys
    Observation
    Existing workflows
    Existing applications
    Business rules
    Project goals
    Legal and technical constraints

Наприклад, під час планування Worship Schedule потрібно з'ясувати, як користувачі створюють розклади зараз, що їм незручно та які можливості необхідні для повсякденної роботи.

## 2. Analysis

Analysis — аналіз виявлених вимог.

Потрібно:

    - Find missing information.
    - Identify conflicting requirements.
    - Identify dependencies.
    - Clarify ambiguous statements.
    - Evaluate feasibility.
    - Prioritize requirements.

Наприклад, вимога «користувач може редагувати розклад» потребує уточнення:

    - Який саме розклад може редагувати користувач?
    - Чи може він редагувати чужі розклади?
    - Які поля дозволено змінювати?
    - Що відбувається після збереження?
    - Як обробляються помилки?

## 3. Specification

Specification — документування вимог у зрозумілій формі.

Це можуть бути:

    Requirement lists
    User stories
    Use cases
    Acceptance criteria
    Business rules
    API contracts
    Data constraints

На початковому етапі не потрібно створювати складну формальну специфікацію.

Для навчального проєкту достатньо Markdown-файлів із чіткими вимогами та критеріями приймання.

## 4. Validation

Validation — перевірка того, чи визначені правильні вимоги.

Основне запитання:

    Are we building the right product?

Наприклад, користувачам може бути потрібен простий редактор розкладів, а не повноцінний текстовий редактор із десятками налаштувань.

Якщо вимоги не відповідають реальній потребі, навіть технічно правильна реалізація може не принести користі.

## 5. Management

Requirements Management — управління вимогами під час розвитку проєкту.

Потрібно відстежувати:

    - New requirements.
    - Changed requirements.
    - Removed requirements.
    - Dependencies.
    - Priorities.
    - Impact on existing functionality.

Наприклад, додавання спільного доступу до розкладів може вплинути на модель даних, авторизацію, API, інтерфейс і тести.

Тому нові вимоги потрібно оцінювати не лише як окремі функції.

---

# Types of Requirements

Вимоги можна класифікувати за різними ознаками. Одна вимога іноді належить відразу до кількох категорій.

Основні категорії:

    Business requirements
    User requirements
    Functional requirements
    Non-functional requirements
    System requirements
    Technical requirements
    Constraints

---

# Business Requirements

Business requirements — вимоги, які описують організаційні або бізнес-цілі продукту.

Вони відповідають на запитання:

    Why is the product needed?
    What outcome should the organization achieve?

Приклад:

    BR-01:
    Reduce the manual effort required to prepare
    and maintain worship schedules.

    BR-02:
    Provide a consistent way to manage schedule data.

Для навчального або волонтерського проєкту бізнес-вимоги можуть стосуватися організаційної користі, а не отримання прибутку.

Наприклад, метою може бути скорочення ручної роботи або спрощення доступу до інформації.

---

# User Requirements

User requirements — вимоги, які описують, що користувач повинен мати змогу робити за допомогою застосунку.

Приклад:

    UR-01:
    A user must be able to create a schedule.

    UR-02:
    A user must be able to view saved schedules.

    UR-03:
    A user must be able to edit a saved schedule.

    UR-04:
    A user must be able to format schedule text.

User requirements описують можливості з погляду користувача, не визначаючи всі деталі технічної реалізації.

Наприклад, вимога створення розкладу не означає, що потрібно використовувати конкретний React-компонент або певну таблицю PostgreSQL.

Ці рішення належать до наступних етапів проєктування.

---

# Functional Requirements

Functional requirements — функціональні вимоги, які описують конкретну поведінку системи.

Вони відповідають на запитання:

    What must the system do?

Приклади:

    FR-01:
    The system must allow an authenticated user
    to create a schedule.

    FR-02:
    The system must allow a user to view
    their saved schedules.

    FR-03:
    The system must allow a user to update
    an existing schedule.

    FR-04:
    The system must preserve saved changes
    after the application is reloaded.

    FR-05:
    The system must prevent a user from editing
    a schedule they are not authorized to modify.

Функціональні вимоги описують очікувану поведінку.

Згодом їх можна деталізувати через user stories, use cases, acceptance criteria та API contracts.

---

# Non-Functional Requirements

Non-functional requirements — нефункціональні вимоги, які визначають характеристики системи, умови її роботи та обмеження на реалізацію.

Вони відповідають на запитання:

    How well must the system work?
    Under what conditions must it operate?

Основні категорії:

    Performance
    Security
    Reliability
    Availability
    Usability
    Accessibility
    Maintainability
    Scalability
    Compatibility
    Observability
    Data integrity

Приклади:

    NFR-01 — Performance:
    The schedule list should load within
    an agreed response-time target under
    the expected workload.

    NFR-02 — Security:
    Users must not access schedules
    they are not authorized to view.

    NFR-03 — Reliability:
    Successfully saved schedules must not
    disappear after a page reload.

    NFR-04 — Usability:
    The main schedule actions must be easy
    to discover.

    NFR-05 — Accessibility:
    Interactive controls must be usable
    with a keyboard.

    NFR-06 — Maintainability:
    The application should have clear module
    boundaries and testable business logic.

Важливо: нефункціональні вимоги бажано формулювати конкретно.

Нечітко:

    The application must be fast.

Краще:

    Under the agreed test conditions,
    95% of schedule-list requests should complete
    within the defined response-time target.

Конкретне значення потрібно визначити відповідно до реальних потреб, інфраструктури та очікуваного навантаження. Не потрібно встановлювати довільні показники лише для того, щоб вимога виглядала технічною.

---

# Functional vs Non-Functional Requirements

Функціональні та нефункціональні вимоги відповідають на різні запитання.

    Functional:
    What does the system do?

    Non-functional:
    How well or under what constraints
    does the system operate?

Приклад для Worship Schedule:

    Functional requirement:
    The user can save a schedule.

    Non-functional requirement:
    Saved schedule data must remain durable
    after a successful save operation.

Інший приклад:

    Functional requirement:
    The user can log in.

    Non-functional requirement:
    Authentication credentials must be handled securely.

Потрібно пам'ятати, що функціональні та нефункціональні вимоги взаємопов'язані.

Наприклад, система може підтримувати редагування розкладу, але водночас повинна перевіряти права доступу до цієї операції.

---

# System Requirements

System requirements — конкретні вимоги до системи як цілого або до її окремих компонентів.

Вони можуть деталізувати функціональні та нефункціональні вимоги.

Наприклад:

    Functional requirement:
    A user can create a schedule.

    System requirements:
    - The application accepts schedule data.
    - The server validates the input.
    - The server checks the user's permissions.
    - The database stores the schedule.
    - The application returns the result to the client.

Тут описано вже не лише можливість користувача, а й очікувану поведінку системи.

Проте не всі системні вимоги потрібно визначати на самому початку. Частина з них з'являється під час проєктування архітектури.

---

# Technical Requirements

Technical requirements — технічні вимоги, які визначають технологічні умови або обмеження проєкту.

Приклади:

    TR-01:
    The frontend must use Next.js and TypeScript.

    TR-02:
    The backend must use NestJS.

    TR-03:
    PostgreSQL must be used for persistent storage.

    TR-04:
    The application must be deployable
    to the selected hosting environment.

Такі вимоги можуть бути обґрунтовані:

    - Existing infrastructure.
    - Team expertise.
    - Project constraints.
    - Integration requirements.
    - Learning objectives.
    - Maintenance considerations.

Важливо відрізняти технічні обмеження від бажань розробника.

Якщо проєкт створюється для навчання NestJS, використання NestJS може бути свідомим навчальним обмеженням.

Але це не означає, що NestJS є обов'язковим для всіх застосунків подібного типу.

---

# Constraints

Constraints — обмеження, яких потрібно дотримуватися під час розробки.

Приклади:

    Time:
    The first version should be completed
    within the available study period.

    Technology:
    The project must use PostgreSQL.

    Resources:
    The project is maintained by one developer.

    Infrastructure:
    The application must run within
    the available hosting resources.

Обмеження впливають на вибір вимог і пріоритетів.

Наприклад, якщо розробник має обмежений час, до першої версії варто включити лише функції, необхідні для основного сценарію використання.

---

# Business Rules

Business rules — правила предметної області, які визначають, як система повинна поводитися в конкретних ситуаціях.

Вони не тотожні функціям.

Функція описує можливість, а бізнес-правило визначає умову або обмеження, яке потрібно враховувати під час її виконання.

Приклади для Worship Schedule:

    BR-01:
    Each schedule must have a title.

    BR-02:
    A user can edit only schedules
    they are authorized to modify.

    BR-03:
    A schedule must have a valid owner
    if the ownership model requires personal schedules.

    BR-04:
    A saved schedule must have a valid identifier.

Приклад:

    Functional requirement:
    The user can edit a schedule.

    Business rule:
    The user can edit only a schedule
    they are authorized to modify.

Бізнес-правила часто впливають на:

    Data validation
    Authorization
    Database constraints
    Domain logic
    API behavior
    Tests

Їх потрібно визначати до реалізації відповідної функціональності.

---

# Requirement ID

Requirement ID — унікальний ідентифікатор вимоги.

Наприклад:

    BR-01
    UR-01
    FR-01
    NFR-01
    TR-01

Префікси можуть означати:

    BR → Business Requirement
    UR → User Requirement
    FR → Functional Requirement
    NFR → Non-Functional Requirement
    TR → Technical Requirement

Це лише поширений приклад нумерації, а не універсальний стандарт.

Ідентифікатори допомагають посилатися на конкретні вимоги в документації, тестах і плані реалізації.

Наприклад:

    FR-03:
    The user can update a saved schedule.

    Related tests:
    - Verify successful schedule update.
    - Verify invalid input handling.
    - Verify authorization checks.

Для невеликого навчального проєкту достатньо простої системи ідентифікаторів. Не потрібно створювати складну систему керування вимогами, якщо звичайного Markdown-файлу достатньо.

---

# Good Requirements

Хороша вимога повинна бути зрозумілою, доречною, достатньо конкретною та придатною до перевірки.

Основні характеристики:

    Clear
    Unambiguous
    Relevant
    Feasible
    Consistent
    Testable
    Traceable
    Prioritized

## Clear

Вимога повинна бути зрозумілою.

Погано:

    The schedule should work properly.

Краще:

    The user can save a valid schedule
    and reopen it later.

## Unambiguous

Вимога не повинна допускати суттєво різних тлумачень.

Погано:

    The application should support formatting.

Потрібно уточнити, які саме можливості маються на увазі.

Наприклад:

    The editor must support:
    - Bold.
    - Italic.
    - Text alignment.
    - Font size selection.

## Relevant

Вимога повинна підтримувати цілі проєкту або задовольняти важливу потребу.

## Feasible

Вимога повинна бути реалістичною з урахуванням часу, ресурсів та технічних обмежень.

## Consistent

Вимоги не повинні суперечити одна одній.

Наприклад:

    Requirement A:
    Every schedule is private to its owner.

    Requirement B:
    Every user can edit every schedule.

Ці вимоги суперечать одна одній, якщо не визначено винятків або додаткових правил доступу.

## Testable

Має бути можливість перевірити, чи виконана вимога.

Погано:

    The interface should be beautiful.

Краще:

    All primary actions must have visible labels
    and must be usable with a keyboard.

## Traceable

Вимогу можна пов'язати з її джерелом, відповідною функцією та тестами.

## Prioritized

Вимога повинна мати зрозумілий пріоритет відносно інших вимог.

---

# Acceptance Criteria

Acceptance criteria — критерії приймання, які визначають, за яких умов конкретна функція вважається реалізованою правильно.

Вони допомагають уникнути ситуації, коли розробник вважає функцію готовою, але користувач очікував іншої поведінки.

Наприклад:

    Feature:
    Create a schedule.

    Acceptance criteria:
    - The user can enter a schedule title.
    - The user can enter schedule content.
    - Required fields are validated.
    - Valid data can be saved.
    - The saved schedule can be reopened.
    - Invalid data produces a useful error message.

Критерії приймання мають бути конкретними та перевірюваними.

Вони не обов'язково визначають внутрішню реалізацію.

Наприклад, критерій «збережений розклад можна відкрити після перезавантаження сторінки» не вимагає конкретного способу роботи з базою даних.

---

# Acceptance Criteria: Given / When / Then

Один із поширених форматів критеріїв приймання — Given / When / Then.

    Given — початковий стан.
    When — дія або подія.
    Then — очікуваний результат.

Приклад:

    Given:
    The user is authenticated.

    When:
    The user submits valid schedule data.

    Then:
    The system saves the schedule
    and returns a successful response.

Інший приклад:

    Given:
    The user does not own a private schedule
    and has no permission to edit it.

    When:
    The user attempts to update the schedule.

    Then:
    The system rejects the operation.

Такий формат особливо корисний для опису поведінки, граничних випадків та тестових сценаріїв.

---

# Edge Cases

Edge case — гранична або незвичайна ситуація, яку потрібно враховувати під час проєктування та тестування.

Приклади для створення розкладу:

    - The title is empty.
    - The title contains only spaces.
    - The content is empty.
    - The submitted data has an invalid format.
    - The schedule does not exist.
    - The user submits the form twice.
    - The database is unavailable.
    - The user loses authorization.
    - Two updates happen close together.

Не кожен edge case обов'язково потрібно вирішувати складним способом у першій версії.

Але критичні випадки, особливо пов'язані з безпекою, цілісністю даних та втратою інформації, не можна ігнорувати.

---

# Exceptions and Error Handling Requirements

Вимоги повинні описувати не лише успішний сценарій, а й важливі випадки помилок.

Наприклад:

    Requirement:
    The user can save a schedule.

Потрібно також розглянути:

    - What happens if required fields are missing?
    - What happens if the user is unauthorized?
    - What happens if the schedule does not exist?
    - What happens if the database is unavailable?
    - What happens if the request times out?

Приклад:

    FR-06:
    The system must validate schedule input
    before saving it.

    FR-07:
    The system must return an appropriate error
    when the schedule does not exist.

    NFR-07:
    Error responses must not expose sensitive
    internal implementation details.

Такі вимоги допомагають спроєктувати передбачувану поведінку застосунку.

---

# Requirement Dependencies

Requirement dependency — залежність однієї вимоги від іншої.

Наприклад:

    View saved schedules
          ↓
    Requires persistent storage

    Edit a schedule
          ↓
    Requires an existing schedule

    Private schedules
          ↓
    Requires ownership information
    and authorization checks

    User-specific schedules
          ↓
    Requires an established user identity

Залежності впливають на порядок реалізації.

Наприклад, редагування розкладу не можна повноцінно реалізувати, якщо система ще не має способу зберігати та знаходити розклади.

Під час планування корисно визначати:

    What must exist before this feature
    can be implemented?

    Which other features depend on it?

---

# Requirement Traceability

Requirement traceability — можливість простежити зв'язок вимоги з цілями проєкту, функціями, архітектурними рішеннями та тестами.

Наприклад:

    Project goal:
    Allow users to manage their schedules.

          ↓

    Requirement FR-03:
    Users can edit saved schedules.

          ↓

    User story:
    As a user, I want to edit my schedule
    so that I can correct outdated information.

          ↓

    API:
    Update a schedule.

          ↓

    Test:
    Verify that an authorized user can update
    a schedule and retrieve the updated data.

Traceability допомагає перевірити:

    - Why does this feature exist?
    - Which requirement does it satisfy?
    - How will it be tested?
    - What else may be affected by a change?

Для невеликого проєкту достатньо простих посилань між документами або ідентифікаторів вимог.

---

# Requirement Prioritization

Requirement prioritization — визначення важливості вимог та порядку їх реалізації.

Не всі вимоги однаково важливі.

Під час пріоритизації потрібно враховувати:

    User value
    Business value
    Risk
    Development effort
    Dependencies
    Project goals
    Available time

Наприклад:

    Feature:
    Create a schedule.

    Priority:
    Must have.

    Feature:
    Save a schedule.

    Priority:
    Must have.

    Feature:
    Export to PDF.

    Priority:
    Could have.

    Feature:
    Advanced analytics.

    Priority:
    Won't have in the first version.

Пріоритет залежить від контексту. Для іншого продукту експорт до PDF може бути основною вимогою, без якої застосунок не матиме необхідної цінності.

---

# MoSCoW Prioritization

MoSCoW — метод пріоритизації вимог за чотирма категоріями.

    M — Must have
    S — Should have
    C — Could have
    W — Won't have this time

## Must Have

Критично необхідні вимоги.

Без них перша версія не зможе виконувати своє основне призначення.

Приклад:

    - Create a schedule.
    - Save a schedule.
    - View saved schedules.
    - Edit a schedule.

## Should Have

Важливі вимоги, які бажано реалізувати, але їх відсутність не обов'язково робить першу версію непридатною.

Приклад:

    - Search schedules by title.
    - Display the last update time.

## Could Have

Корисні додаткові можливості, які можна реалізувати за наявності часу.

Приклад:

    - Export schedules to PDF.
    - Provide additional formatting options.

## Won't Have This Time

Функції, які свідомо не входять до поточного релізу.

Приклад:

    - Real-time collaborative editing.
    - Advanced analytics.
    - Automatic schedule generation.

Won't Have This Time не означає, що функція ніколи не з'явиться.

Це означає, що її не планують реалізовувати в поточній версії.

---

# MVP

MVP (Minimum Viable Product) — мінімально життєздатний продукт, який містить достатньо функціональності, щоб надати основну цінність користувачеві та перевірити важливі припущення щодо продукту.

MVP повинен:

    - Address a real problem.
    - Provide core user value.
    - Support the main user workflow.
    - Be usable for its intended purpose.
    - Allow the team to learn from actual usage
      or structured feedback.

MVP не означає:

    - A broken application.
    - An unfinished collection of unrelated pages.
    - A prototype that cannot support the intended task.
    - The smallest possible amount of code.
    - A product with no testing or security considerations.

Головне:

    MVP = minimum functionality needed
          to deliver and validate core value.

---

# MVP vs Prototype vs Proof of Concept

Ці поняття пов'язані, але мають різні цілі.

## MVP

Мета:

    Deliver core value and validate the product
    with intended users.

Приклад:

    A usable schedule application that allows
    users to create, save, view and edit schedules.

## Prototype

Мета:

    Explore an idea, workflow or interface.

Приклад:

    A clickable interface showing how users
    will create and edit schedules.

Прототип може використовувати тестові дані та не мати повноцінного backend.

## Proof of Concept

Мета:

    Verify whether a technical idea is feasible.

Приклад:

    A small experiment that verifies whether
    the selected editor can preserve supported
    text formatting when saving and reopening content.

Коротко:

    MVP → Can the product deliver core value?

    Prototype → How might the experience work?

    PoC → Can the technical idea work?

Іноді один артефакт може виконувати декілька з цих завдань, але їхні цілі варто розрізняти.

---

# MVP Scope

MVP scope — набір вимог, які входять до першої життєздатної версії продукту.

Під час визначення MVP потрібно відповісти на запитання:

    What is the primary user problem?

    What is the main user workflow?

    Which features are absolutely necessary?

    Which features can be postponed?

    What must be tested before release?

Наприклад, для Worship Schedule основний сценарій може бути таким:

    Create schedule
          ↓
    Enter schedule content
          ↓
    Save schedule
          ↓
    Reopen schedule
          ↓
    Edit schedule
          ↓
    Save changes

Якщо цей сценарій є основною цінністю продукту, MVP має підтримувати його повністю.

Додаткові можливості, такі як розширений пошук, експорт у PDF або складна система шаблонів, можна відкласти.

---

# MVP vs Full Product

MVP та повноцінний продукт відрізняються не лише кількістю функцій, а й шириною охоплених сценаріїв.

Приклад:

    MVP:
    - Create schedules.
    - Save schedules.
    - View saved schedules.
    - Edit schedules.
    - Basic text formatting.

    Later versions:
    - Advanced templates.
    - PDF export.
    - Schedule duplication.
    - Advanced search.
    - Additional organization features.
    - More sophisticated collaboration.

Проте важливо не відкладати функції, без яких основний сценарій є небезпечним або не працює належним чином.

Наприклад, якщо розклади мають бути приватними, перевірка прав доступу не повинна вважатися необов'язковою функцією лише тому, що це MVP.

---

# MVP and Security

MVP повинен бути мінімальним за обсягом функцій, але не повинен ігнорувати базові вимоги безпеки.

Якщо застосунок має облікові записи та приватні розклади, потрібно врахувати:

    Authentication:
    Who is the user?

    Authorization:
    What is the user allowed to do?

    Data validation:
    Is the submitted data valid?

    Data isolation:
    Can users access only the data
    they are permitted to access?

    Error handling:
    Does the system avoid exposing
    sensitive internal information?

Наприклад:

    Requirement:
    Users can access their own private schedules.

    Acceptance criteria:
    - An authorized user can access their schedule.
    - A user cannot modify another user's private schedule.
    - The server verifies permissions for every
      protected operation.

Перевірки доступу потрібно реалізовувати на сервері. Приховування кнопки в інтерфейсі саме по собі не забезпечує захисту даних.

---

# MVP and Architecture

Архітектура MVP повинна відповідати поточним вимогам, але не створювати зайвих перешкод для обґрунтованого розвитку продукту.

Для невеликого навчального застосунку часто достатньо:

    Frontend
        ↓
    Backend API
        ↓
    Database

Наприклад:

    Next.js
        ↓
    NestJS
        ↓
    PostgreSQL

Вибір конкретних технологій залежить від проєкту.

Для MVP зазвичай не потрібно відразу створювати:

    - A large microservices system.
    - Multiple databases without a clear need.
    - Complex distributed infrastructure.
    - A custom framework.
    - Advanced caching without a performance requirement.
    - Event-driven infrastructure without a real use case.

Водночас спрощення не повинно призводити до порушення важливих вимог.

Наприклад, приватні дані все одно потребують правильної авторизації, навіть якщо застосунок складається з одного backend-сервісу.

Основний принцип:

    Start with the simplest architecture
    that satisfies the actual requirements.

---

# MVP and Technical Debt

Technical debt — додаткові витрати на майбутні зміни, які виникають через певні технічні компроміси.

Під час створення MVP деякі рішення можна свідомо спростити, але важливо розуміти наслідки.

Наприклад:

    Acceptable simplification:
    Use a simple schedule list instead of
    advanced filtering and search.

    Risky shortcut:
    Skip server-side authorization for private data.

Перше обмежує функціональність.

Друге створює проблему безпеки.

Не кожне спрощення є технічним боргом. Відсутність непотрібної функції може бути правильним рішенням, а не недоліком архітектури.

---

# Feature vs Requirement

Feature — функція або можливість продукту, яку бачить або використовує користувач.

Requirement — вимога, яка описує очікувану поведінку або властивість системи.

Приклад:

    Feature:
    Schedule editing.

    Requirements:
    - The user can open a saved schedule.
    - The user can change its title.
    - The user can change its content.
    - The system validates the submitted data.
    - The system checks edit permissions.
    - The system preserves saved changes.

Одна feature може містити декілька вимог.

Іноді одна вимога також впливає на декілька функцій.

Наприклад, вимога авторизації може стосуватися перегляду, редагування та видалення розкладів.

---

# Requirements and Backlog

Backlog — упорядкований список робіт, які можуть бути реалізовані в проєкті.

Product backlog може містити:

    Features
    User stories
    Bugs
    Technical tasks
    Improvements
    Research tasks

Приклад:

    1. Create a schedule.
    2. Save a schedule.
    3. View saved schedules.
    4. Edit a schedule.
    5. Validate schedule input.
    6. Add authorization checks.
    7. Improve editor usability.
    8. Add PDF export.

Backlog не обов'язково означає, що всі елементи вже готові до реалізації.

Деякі завдання потребують уточнення, декомпозиції або перевірки технічної можливості.

Важливо розрізняти:

    Requirement:
    What the system must do.

    Backlog item:
    A tracked item of work associated
    with building or improving the product.

---

# MVP Prioritization Example

Приклад розподілу функцій для Worship Schedule.

    Must Have:
    - Create a schedule.
    - Save a schedule.
    - View saved schedules.
    - Edit a schedule.
    - Validate input.
    - Preserve saved changes.
    - Enforce required access restrictions.

    Should Have:
    - Search schedules by title.
    - Display the last update time.
    - Improve empty and error states.

    Could Have:
    - Export schedules to PDF.
    - Duplicate an existing schedule.
    - Additional text formatting options.

    Won't Have This Time:
    - Real-time collaborative editing.
    - Advanced analytics.
    - Automatic schedule generation.
    - Complex external integrations.

Це лише приклад. Остаточні пріоритети визначаються цілями продукту, потребами користувачів та обмеженнями проєкту.

---

# MVP Validation

MVP validation — перевірка того, чи підтверджує перша версія продукту ключові припущення та чи допомагає вона розв'язувати початкову проблему.

Можливі методи:

    User testing
    Interviews
    Feedback collection
    Task completion measurement
    Usage analytics
    Error monitoring

Наприклад:

    Hypothesis:
    Users can prepare a schedule more easily
    with the new application.

    Validation:
    Ask users to create and edit a schedule.

    Observe:
    - Can they complete the task?
    - Where do they hesitate?
    - Which steps cause confusion?
    - Are there missing capabilities?

    Decision:
    Improve the workflow based on the evidence.

Для навчального проєкту можна перевірити MVP самостійно або залучити декількох потенційних користувачів.

Важливо не робити надто широких висновків із невеликої кількості спостережень.

---

# Requirements and Testing

Вимоги повинні допомагати визначати, що саме потрібно тестувати.

Приклад:

    Requirement FR-01:
    A user can create a schedule.

Можливі перевірки:

    - Valid schedule data is accepted.
    - Missing required data is rejected.
    - Invalid input produces an appropriate error.
    - A successfully saved schedule can be retrieved.
    - Unauthorized users cannot perform
      protected operations.

Інший приклад:

    Requirement NFR-01:
    The application must support keyboard navigation.

Можливі перевірки:

    - Interactive elements can receive keyboard focus.
    - Users can operate controls with the keyboard.
    - Focus remains visible.
    - Keyboard navigation follows a logical order.

Не кожну вимогу потрібно перевіряти одним типом тестів.

Залежно від вимоги можуть використовуватися:

    Unit tests
    Integration tests
    End-to-end tests
    Performance tests
    Security tests
    Accessibility tests
    Manual acceptance tests

Детальна стратегія тестування буде розглянута в темі:

    10-testing-strategy

---

# Requirements and API Design

Вимоги впливають на майбутні API contracts.

Наприклад:

    Requirement:
    A user can create a schedule.

Можливий endpoint:

    POST /schedules

    Request:
    {
        "title": "Sunday Service",
        "content": "..."
    }

    Response:
    {
        "id": "schedule-id",
        "title": "Sunday Service",
        "content": "..."
    }

Це лише попередній приклад. Формат ідентифікатора, поля, статуси відповідей та правила доступу потрібно визначити під час проєктування API.

З іншої вимоги:

    Requirement:
    A user can update a saved schedule.

Можуть виникнути питання:

    - Which HTTP method should be used?
    - Which fields can be updated?
    - How is the schedule identified?
    - How are validation errors returned?
    - How are permissions checked?

Вимоги визначають очікувану поведінку, а API contract конкретизує правила взаємодії між клієнтом і сервером.

---

# Requirements and Data Modeling

Вимоги також впливають на модель даних.

Наприклад:

    Requirement:
    Users can save multiple schedules.

Це означає, що система повинна мати спосіб зберігати та знаходити декілька розкладів.

Якщо кожен розклад має власника, потрібно також зберігати або визначати зв'язок між розкладом і користувачем.

Спрощена модель:

    User
      |
      | owns
      |
    Schedule

Можливі поля Schedule:

    id
    ownerId
    title
    content
    createdAt
    updatedAt

Це лише початковий ескіз, а не остаточна схема бази даних.

Після уточнення вимог можуть знадобитися додаткові поля, обмеження, індекси або інші сутності.

Наприклад, якщо форматування тексту повинно зберігатися після повторного відкриття розкладу, потрібно визначити, у якому форматі зберігатиметься вміст.

Це рішення впливатиме на редактор, backend-валідацію, збереження даних та відображення вмісту.

---

# Practical Example: Worship Schedule

Розглянемо, як можна оформити вимоги та визначити MVP для Worship Schedule.

## 1. Project Goal

    Help users create, save and edit worship schedules
    in a convenient and reliable way.

## 2. Functional Requirements

    FR-01:
    The system must allow an authorized user
    to create a schedule.

    FR-02:
    The system must allow a user to view
    their saved schedules.

    FR-03:
    The system must allow an authorized user
    to edit an existing schedule.

    FR-04:
    The system must preserve schedule changes
    after a successful save.

    FR-05:
    The system must validate required schedule fields.

    FR-06:
    The system must support the agreed basic
    text formatting options.

## 3. Non-Functional Requirements

    NFR-01:
    The application must provide clear feedback
    after save operations.

    NFR-02:
    Private schedule data must be protected
    by server-side authorization.

    NFR-03:
    The interface must support common desktop
    and mobile screen sizes.

    NFR-04:
    Important interactions must be accessible
    with a keyboard.

    NFR-05:
    The application should be structured
    so that its core logic can be tested.

## 4. Business Rules

    BR-01:
    Every schedule must have an identifier.

    BR-02:
    A schedule must have an owner if the chosen
    access model requires personal ownership.

    BR-03:
    Only authorized users may modify a schedule.

    BR-04:
    Required fields must satisfy the defined
    validation rules.

## 5. MVP

    Must Have:
    - Create schedules.
    - Save schedules.
    - View saved schedules.
    - Edit schedules.
    - Validate input.
    - Preserve saved changes.
    - Enforce access restrictions.
    - Support basic text formatting.

    Later:
    - PDF export.
    - Advanced templates.
    - Schedule duplication.
    - Advanced search.
    - Collaborative editing.
    - Additional integrations.

## 6. Acceptance Criteria

    Feature:
    Create a schedule.

    Criteria:
    - The user can enter a title.
    - The user can enter schedule content.
    - Required fields are validated.
    - Valid data can be saved.
    - The saved schedule can be reopened.

    Feature:
    Edit a schedule.

    Criteria:
    - The user can open an existing schedule.
    - The user can change its content.
    - The user can save the changes.
    - The updated content remains available
      after reloading the application.
    - Unauthorized changes are rejected.

    Feature:
    Basic text formatting.

    Criteria:
    - The user can apply the supported formatting.
    - The formatted content can be saved.
    - The formatting remains correct when
      the schedule is reopened.
    - The application handles invalid content safely.

Ці вимоги дають основу для наступних етапів: user stories, user flows, wireframes, моделювання даних та проєктування API.

---

# Practical Exercises

## Exercise 1 — Identify Requirements

Для застосунку Worship Schedule визнач:

    1. Three functional requirements.
    2. Three non-functional requirements.
    3. Three business rules.
    4. Two technical constraints.

Приклад:

    Functional:
    Users can create schedules.

    Non-functional:
    The application must support keyboard navigation.

    Business rule:
    Only authorized users can edit private schedules.

    Technical constraint:
    The backend must use NestJS.

---

## Exercise 2 — Improve Vague Requirements

Переформулюй вимоги так, щоб вони були зрозумілими та перевірюваними.

    1. The application should be fast.
    2. The editor should be convenient.
    3. The user should manage schedules.
    4. The system should be secure.
    5. Saving should work correctly.

Приклад:

    Vague:
    The user should manage schedules.

    Improved:
    An authorized user can create, view and edit
    schedules they are permitted to manage.

Не обов'язково одразу встановлювати числові показники для кожної вимоги. Спочатку визнач, яку поведінку або властивість потрібно перевірити.

---

## Exercise 3 — Define Acceptance Criteria

Вибери функцію:

    Create a schedule.

Склади щонайменше п'ять критеріїв приймання.

Перевір, чи враховано:

    - Valid input.
    - Invalid input.
    - Successful save.
    - Error handling.
    - Reopening saved data.

---

## Exercise 4 — Prioritize Features

Розподіли функції між категоріями MoSCoW.

    Create a schedule.
    Save a schedule.
    Edit a schedule.
    Export to PDF.
    Advanced analytics.
    Search schedules.
    Basic text formatting.
    Collaborative editing.

Поясни, чому кожна функція належить до вибраної категорії.

Пам'ятай, що пріоритет залежить від цілей та контексту проєкту.

---

## Exercise 5 — Define the MVP

Визнач найменший набір функцій, який дозволить користувачеві пройти основний сценарій:

    Create
       ↓
    Save
       ↓
    Reopen
       ↓
    Edit
       ↓
    Save changes

Запитай себе:

    Can the user complete the main task?

    Does the product provide the intended value?

    Are important security requirements satisfied?

    Can the result be tested?

Якщо відповідь на перші два запитання негативна, можливо, MVP не забезпечує основної цінності.

Якщо не виконані важливі вимоги безпеки, не можна вважати версію готовою до відповідного використання.

---

## Exercise 6 — Identify Dependencies

Розглянь функції:

    View schedules.
    Create schedules.
    Edit schedules.
    Authenticate users.
    Store schedules in a database.
    Check permissions.

Визнач, які функції залежать від інших.

Приклад:

    Edit schedules
        ↓
    Existing schedule
        ↓
    Persistent storage

    Edit private schedules
        ↓
    User identity
        ↓
    Authorization checks

---

## Exercise 7 — Create a Requirements Document

Створи файл:

    architecture/02-project-planning/
    02-requirements-and-mvp/README.md

Використай структуру:

    Project goal:

    Functional requirements:

    Non-functional requirements:

    Business rules:

    Constraints:

    Assumptions:

    Acceptance criteria:

    MVP — Must Have:

    Should Have:

    Could Have:

    Won't Have This Time:

    MVP validation plan:

Не потрібно відразу деталізувати всі майбутні функції. Спочатку опиши вимоги, необхідні для основного сценарію використання.

---

# Типові помилки

## 1. Плутати функціональні та нефункціональні вимоги

Функціональна вимога:

    The user can save a schedule.

Нефункціональна вимога:

    The application must preserve saved data
    reliably under the defined operating conditions.

---

## 2. Використовувати нечіткі формулювання

❌ Погано:

    The application must be user-friendly.

✔ Краще:

    The main schedule actions must have clear labels,
    visible feedback and keyboard accessibility.

---

## 3. Намагатися реалізувати все відразу

❌ Погано:

    Every planned feature must be included
    in the first release.

✔ Краще:

    Identify the minimum feature set needed
    to deliver and validate the core value.

---

## 4. Вважати MVP незавершеним прототипом

MVP повинен підтримувати реальний основний сценарій, для якого його створено.

Мінімальність не означає відсутність перевірки введених даних, обробки помилок або необхідного захисту.

---

## 5. Ігнорувати бізнес-правила

Наприклад, функція редагування може працювати технічно правильно, але дозволяти змінювати чужі приватні дані.

Вимоги повинні описувати не лише доступні операції, а й правила, за якими вони виконуються.

---

## 6. Не визначати критерії приймання

Без acceptance criteria складно зрозуміти, коли функція справді готова.

Потрібно визначати очікувану поведінку до початку або під час планування реалізації.

---

## 7. Відкладати критичні вимоги заради швидкого MVP

Не можна автоматично відносити безпеку, цілісність даних та обробку критичних помилок до майбутніх версій.

MVP має бути мінімальним, але придатним для свого призначення.

---

## 8. Плутати feature та requirement

Feature — можливість продукту.

Requirement — конкретна вимога до його поведінки або властивостей.

Одна функція може містити багато вимог.

---

## 9. Не враховувати залежності

Наприклад, редагування не можна повноцінно реалізувати без механізму збереження та пошуку відповідного розкладу.

Залежності потрібно враховувати під час планування порядку робіт.

---

## 10. Змінювати вимоги без оцінки наслідків

Нова функція може впливати на API, модель даних, права доступу, тести та інтерфейс.

Перед додаванням вимоги потрібно оцінити її цінність, вартість і вплив на поточний план.

---

# Питання зі співбесіди

Що таке requirement?

Що таке Requirements Engineering?

Які основні етапи роботи з вимогами?

Що таке requirement elicitation?

Що таке requirement validation?

Чим validation відрізняється від verification?

Що таке functional requirement?

Що таке non-functional requirement?

Чим функціональні вимоги відрізняються від нефункціональних?

Що таке business requirement?

Що таке user requirement?

Що таке system requirement?

Що таке technical requirement?

Що таке business rule?

Що таке acceptance criteria?

Для чого потрібен формат Given / When / Then?

Якими характеристиками повинна володіти хороша вимога?

Що таке edge case?

Чому важливо враховувати помилкові сценарії?

Що таке requirement dependency?

Що таке requirement traceability?

Що таке requirement prioritization?

Що таке MoSCoW?

Що означають Must Have, Should Have, Could Have та Won't Have This Time?

Що таке MVP?

Що означає Minimum Viable Product?

Чому MVP не повинен бути просто набором незавершених функцій?

Чим MVP відрізняється від prototype?

Чим prototype відрізняється від proof of concept?

Як визначити MVP scope?

Чому критичні вимоги безпеки повинні враховуватися в MVP?

Що таке scope creep?

Що таке backlog?

Чим feature відрізняється від requirement?

Як вимоги впливають на API design?

Як вимоги впливають на data modeling?

Як вимоги пов'язані з тестуванням?

Як перевірити, чи MVP забезпечує основну цінність продукту?

Як визначити, які функції можна відкласти?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке requirement.

Functional requirements.

Non-functional requirements.

Business rules.

Acceptance criteria.

Основи вимог до безпеки.

Основи validation та error handling.

Що таке MVP.

Різниця між MVP, prototype та PoC.

Must Have та додаткові функції.

Основи MoSCoW.

Основи requirement prioritization.

Різниця між feature та requirement.

Розуміння того, що MVP повинен забезпечувати основну цінність продукту.

## 🔵 Junior

Уміння документувати функціональні вимоги.

Уміння визначати нефункціональні вимоги.

Уміння писати acceptance criteria.

Формат Given / When / Then.

Виявлення edge cases.

Основи requirement dependencies.

Основи requirement traceability.

Пріоритизація вимог за MoSCoW.

Визначення MVP scope.

Розуміння backlog.

Уміння пов'язувати вимоги з API, моделлю даних та тестами.

Розуміння впливу вимог на архітектуру застосунку.

## 🟠 Middle

Requirements analysis.

Requirements validation.

Requirements verification.

Requirements management.

Conflict resolution.

Stakeholder alignment.

Non-functional requirements analysis.

Risk-based prioritization.

Dependency analysis.

Change impact analysis.

Traceability між вимогами, архітектурою та тестами.

Оцінювання компромісів між функціональністю, часом, вартістю та підтримуваністю.

Планування MVP з урахуванням реальних обмежень.

## 🔴 Senior

Complex requirements engineering.

Strategic requirements prioritization.

Managing evolving requirements.

Cross-system requirements.

Quality attribute trade-offs.

Requirements governance.

Advanced traceability.

Architectural impact analysis.

Risk-driven development.

Balancing business value, technical feasibility, security, reliability and maintainability.

Уміння визначати, які вимоги справді потребують складних архітектурних рішень, а які можна реалізувати простіше.

Уміння підтримувати узгодженість вимог у великій системі з багатьма командами та інтеграціями.

---

# Міні-шпаргалка

## Requirements

    Problem
        ↓
    User needs
        ↓
    Requirements
        ↓
    Implementation
        ↓
    Verification

---

## Functional Requirements

    What must the system do?

    Example:
    The user can create a schedule.

---

## Non-Functional Requirements

    How well or under what conditions
    must the system operate?

    Example:
    The application must support keyboard navigation.

---

## Business Rules

    What rules must the system enforce?

    Example:
    Only authorized users can edit private schedules.

---

## Acceptance Criteria

    Given → initial state
    When  → action
    Then  → expected result

---

## MoSCoW

    M → Must have
    S → Should have
    C → Could have
    W → Won't have this time

---

## MVP

    Core problem
        ↓
    Essential requirements
        ↓
    Minimum viable workflow
        ↓
    Usable product
        ↓
    Validation

---

## MVP vs Prototype vs PoC

    MVP       → deliver and validate core value

    Prototype → explore interface or workflow

    PoC       → verify technical feasibility

---

## Feature vs Requirement

    Feature:
    Schedule editing.

    Requirements:
    - Open a saved schedule.
    - Change its content.
    - Validate input.
    - Save changes.
    - Enforce permissions.

---

## Requirement Traceability

    Goal
      ↓
    Requirement
      ↓
    Feature
      ↓
    Implementation
      ↓
    Test

---

## Основні правила

    Requirements → define expected behavior.

    Functional → what the system does.

    Non-functional → quality attributes and constraints.

    Business rules → rules of the domain.

    Acceptance criteria → conditions of acceptance.

    MoSCoW → prioritize requirements.

    MVP → minimum product that delivers core value.

    Backlog → organized list of work.

    Traceability → connect requirements to implementation
                   and tests.

---

# Головне

• Вимоги перетворюють цілі проєкту на конкретні очікування до системи.

• Functional requirements описують поведінку системи.

• Non-functional requirements описують характеристики та умови роботи системи.

• Business rules визначають правила предметної області.

• Acceptance criteria допомагають перевірити, чи правильно реалізовано функцію.

• Хороші вимоги мають бути зрозумілими, несуперечливими, реалістичними та перевірюваними.

• Edge cases і помилкові сценарії потрібно враховувати під час планування.

• Requirement dependencies впливають на послідовність реалізації.

• Requirement traceability пов'язує цілі, вимоги, реалізацію та тести.

• MoSCoW допомагає визначити пріоритети вимог.

• MVP — це мінімально життєздатний продукт, який забезпечує основну цінність, а не просто найменший можливий обсяг коду.

• Prototype допомагає дослідити ідею або інтерфейс, а PoC — перевірити технічну можливість.

• MVP повинен підтримувати основний сценарій використання та виконувати критичні вимоги безпеки й цілісності даних.

• Не всі функції потрібно реалізовувати в першій версії.

• Backlog допомагає організувати роботу, але сам по собі не означає, що всі його елементи вже готові до реалізації.

• Зміни вимог потрібно оцінювати з погляду їхньої цінності, вартості та впливу на інші частини системи.

• Вимоги впливають на модель даних, API, архітектуру, тестування та розгортання.

• Основний принцип:

    Build the minimum product that delivers
    the required value and satisfies its
    essential requirements.
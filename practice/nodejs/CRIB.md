# 🟩 Node.js Practice

## terminal

Подивитися список файлів у поточній теці ls (або ls -la для детального списку)
Дізнатися, де ти зараз знаходишся (шлях) pwd
Перейти в іншу теку cd name-folder
Повернутися на рівень вище cd ..
Перейменувати файл mv old.txt new.txt
Переміщення в іншу теку mv old.txt data/

Переміщення + Перейменування (Одночасно)    mv old.txt data/super-new-name.txt
Скопіювати файл	                            cp text.txt copy-text.txt
Видалити файл	                            rm text.txt
Видалити теку з усім вмістом	            rm -rf my-folder
mkdir my-folder
touch text.txt
echo "Привіт, я тут" > text.txt
echo "Це новий рядок тексту" >> text.txt
cat text.txt
# Ctrl + C / Ctrl + D

# 01-runtime-and-cli
## npm run perform
## npx ts-node app.ts
- npx (Node Package Execute) — це утиліта командного рядка, яка дозволяє запускати пакунки Node.js без їх попереднього встановлення на комп'ютер. Вона з'явилася в npm версії 5.2.0 і автоматично доступна разом із Node.js.
- ts-node — це інструмент розробки, який дозволяє напряму запускати файли TypeScript (.ts) у середовищі Node.js без їх попередньої ручної компіляції в JavaScript (.js).
## npx tsx app.ts
tsx (TypeScript Execute) — це сучасний, мінімалістичний та надзвичайно швидкий інструмент командного рядка для запуску TypeScript-файлів безпосередньо у Node.js.
## process.cwd()
method returns the current working directory of the Node.js process.
## process.argv()

# 02-filesystem
## 01-path-module

import path from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';

path.basename
path.extname
path.join
path.resolve
## 04-file-info-and-stats

# 03-async-programming
# 04-events-and-streams
# 05-http-server
# 06-rest-api
# 07-routing-and-middleware
# 08-auth-basics
# 09-mini-backend-project

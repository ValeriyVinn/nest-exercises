import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

type User = {
  name: string;
  post: string;
  comment: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'users.json');

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Record<string, unknown>).name === 'string' &&
    typeof (value as Record<string, unknown>).post === 'string' &&
    typeof (value as Record<string, unknown>).comment === 'string'
  );
}

// 1. Читаємо users
function readUsers(callback: (err: Error | null, users?: User[]) => void) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return callback(err);
    try {
      const parsed: unknown = JSON.parse(data);
      if (!Array.isArray(parsed) || !parsed.every(isUser)) {
        throw new Error('Invalid users data');
      }
      const users = parsed;
      callback(null, users);
    } catch (parseErr) {
      callback(parseErr as Error);
    }
  });
}

// 2. Читаємо posts (на основі users)
function readPosts(users: User[], callback: (err: Error | null, posts?: string[]) => void) {
  const posts = users.map(u => u.post);
  callback(null, posts);
}

// 3. Читаємо comments (на основі users)
function readComments(users: User[], callback: (err: Error | null, comments?: string[]) => void) {
  const comments = users.map(u => u.comment);
  callback(null, comments);
}

// Ланцюжок викликів
readUsers((err, users) => {
  if (err) return console.error('Помилка читання users:', err);
  if (!users) return console.error('Помилка: users відсутні');

  console.log('Users:');
  users.forEach(u => console.log('-', u.name));

  readPosts(users, (err, posts) => {
    if (err) return console.error('Помилка читання posts:', err);
    if (!posts) return console.error('Помилка: posts відсутні');

    console.log('\nPosts:');
    posts.forEach(p => console.log('-', p));

    readComments(users, (err, comments) => {
      if (err) return console.error('Помилка читання comments:', err);
      if (!comments) return console.error('Помилка: comments відсутні');

      console.log('\nComments:');
      comments.forEach(c => console.log('-', c));
    });
  });
});

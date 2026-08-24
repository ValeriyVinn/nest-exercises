import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface User {
  id: number;
  name: string;
}

// ES module path resolution for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PATH = path.join(__dirname, 'users.json');

const PORT = 3000;

// Helper to read users from JSON file
async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    const parsed: unknown = JSON.parse(data);
    return Array.isArray(parsed) ? (parsed as User[]) : [];
  } catch {
    return [];
  }
}

// Helper to write users back to JSON file
async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');
}

// Helper to parse JSON request body
function getRequestBody(req: http.IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        reject(err);
      }
    });
    req.on('error', err => reject(err instanceof Error ? err : new Error(String(err))));
  });
}

function isCreateUserBody(value: unknown): value is { name: string } {
  if (typeof value !== 'object' || value === null || !('name' in value)) {
    return false;
  }

  const candidate = value as { name: unknown };
  return typeof candidate.name === 'string' && candidate.name.length > 0;
}

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  void (async () => {
    const host = req.headers.host || `localhost:${PORT}`;
    const parsedUrl = new URL(req.url || '', `http://${host}`);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Helper function to send standard JSON responses
    const sendJSON = (statusCode: number, data: any) => {
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    };

    if (pathname === '/users') {
      const users = await readUsers();

      // 1. GET /users or /users?id=1
      if (method === 'GET') {
        const idParam = parsedUrl.searchParams.get('id');

        if (idParam) {
          const id = Number(idParam);
          const user = users.find(u => u.id === id);

          if (!user) {
            return sendJSON(404, { error: `User with ID ${id} not found` });
          }
          return sendJSON(200, user.name);
        }

        return sendJSON(200, users);
      }

      // 2. POST /users (Add new user)
      if (method === 'POST') {
        try {
          const body = await getRequestBody(req);

          if (!isCreateUserBody(body)) {
            return sendJSON(400, { error: 'Please provide a valid "name" field' });
          }

          const maxId = users.reduce((max, u) => (u.id > max ? u.id : max), 0);
          const newUser: User = { id: maxId + 1, name: body.name };

          users.push(newUser);
          await writeUsers(users);

          return sendJSON(201, newUser);
        } catch {
          return sendJSON(400, { error: 'Invalid JSON body' });
        }
      }

      // 3. DELETE /users (Delete user by name via query parameter ?name=...)
      if (method === 'DELETE') {
        const nameParam = parsedUrl.searchParams.get('name');

        if (!nameParam) {
          return sendJSON(400, { error: 'Missing required query parameter "name"' });
        }

        const index = users.findIndex(u => u.name.toLowerCase() === nameParam.toLowerCase());

        if (index === -1) {
          return sendJSON(404, { error: `User with name "${nameParam}" not found` });
        }

        const [deletedUser] = users.splice(index, 1);
        await writeUsers(users);

        return sendJSON(200, { message: `Successfully deleted user "${deletedUser.name}"` });
      }
    }

    // 404 for unknown endpoints
    sendJSON(404, { error: 'Route Not Found' });
  })();
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/users`);
});

const jsonString = '{"name": "Ivan", age: 30}'; // Помилка: age без лапок

try {
  const data: unknown = JSON.parse(jsonString);
  console.log('Успішно розпарсено:', data);
} catch (err: unknown) {
  if (err instanceof SyntaxError) {
    console.error('Некоректний формат JSON:', err.message);
  } else {
    console.error('Невідома помилка при розборі:', err);
  }
}

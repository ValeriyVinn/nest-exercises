function getRandomIntPromise(min: number, max: number): Promise<number> {
  return new Promise((resolve, reject) => {
    if (min > max) {
      reject(new Error('Мінімум не може бути більшим за максимум'));
    } else {
      const random = Math.floor(Math.random() * (max - min + 1)) + min;
      resolve(random);
    }
  });
}

// Використання:
const min = Number(process.argv[2]);
const max = Number(process.argv[3]);

getRandomIntPromise(min, max)
  .then(num => console.log('Випадкове число:', num))
  .catch(err => console.error('Помилка:', err instanceof Error ? err.message : String(err)));

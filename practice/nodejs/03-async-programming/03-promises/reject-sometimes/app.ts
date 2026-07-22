const dynamicPromise = () => {
  return new Promise((resolve, reject) => {
    const isSuccess = Math.random() > 0.5;
    if (isSuccess) {
      resolve('Дані успішно завантажено!');
    } else {
      reject(new Error('Помилка: мережа недоступна.'));
    }
  });
};

// Виклик без async/await
dynamicPromise()
  .then(result => console.log('Успіх:', result))
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error('Збій:', error.message);
    } else {
      console.error('Збій: Невідома помилка');
    }
  });

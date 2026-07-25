function timer() {
  let i = 5;

  const intervalId = setInterval(() => {
    console.log(i);
    i--;

    if (i === 0) {
      clearInterval(intervalId); // Зупиняємо таймер, коли дійшли до 0
    }
  }, 1000);
}

timer();

// const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// async function timer() {
//   for (let i = 5; i > 0; i--) {
//     console.log(i);
//     await delay(1000); // Код зупиняється тут на 1 секунду
//   }
// }

// void timer();

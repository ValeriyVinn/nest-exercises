function timer() {
  let i = 5;

  const intervalId = setInterval(() => {
    console.log('backup');
    i--;

    if (i === 0) {
      clearInterval(intervalId); // Зупиняємо таймер, коли дійшли до 0
    }
  }, 1000);
}

timer();

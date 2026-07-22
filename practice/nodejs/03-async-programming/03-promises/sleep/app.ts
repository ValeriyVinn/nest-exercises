const delayArg = Number(process.argv[2]);

const sleep = (delayArg: number) => new Promise(resolve => setTimeout(resolve, delayArg));

console.log('Before decision');

sleep(delayArg)
  .then(() => {
    console.log("It's my decision, I'm go to sleep");
  })
  .catch(error => {
    console.error(error);
  });

// const myPromise = new Promise((resolve, reject) => {
//   const success = Math.random() > 0.5;
//   if (success) {
//     resolve('Все добре ✅');
//   } else {
//     reject(new Error('Щось пішло не так ❌'));
//   }
// });

// myPromise.then(message => console.log(message)).catch(error => console.log(error));

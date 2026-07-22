type Callback<T> = (err: Error | null, result?: T) => void;

function stepOne(cb: Callback<string>) {
  setTimeout(() => {
    console.log('Step 1');
    cb(null, 'data1');
  }, 500);
}

function stepTwo(data: string, cb: Callback<string>) {
  setTimeout(() => {
    console.log('Step 2, got:', data);
    cb(null, 'data2');
  }, 500);
}

function stepThree(data: string, cb: Callback<string>) {
  setTimeout(() => {
    console.log('Step 3, got:', data);
    cb(null, 'done');
  }, 500);
}

// Callback hell: вкладеність пірамідою
stepOne((err, res1) => {
  if (err) return console.error(err);
  stepTwo(res1!, (err, res2) => {
    if (err) return console.error(err);
    stepThree(res2!, (err, res3) => {
      if (err) return console.error(err);
      console.log('Final:', res3);
    });
  });
});

function firstTask(cb: Callback<string>) {
  setTimeout(() => cb(null, 'alpha'), 500);
}

function secondTask(input: string, cb: Callback<string>) {
  setTimeout(() => cb(null, input + ' → beta'), 500);
}

function thirdTask(input: string, cb: Callback<string>) {
  setTimeout(() => cb(null, input + ' → gamma'), 500);
}

// Іменовані функції замість вкладеності
function handleFirst(err: Error | null, result1?: string) {
  if (err) return console.error(err);
  secondTask(result1!, handleSecond);
}

function handleSecond(err: Error | null, result2?: string) {
  if (err) return console.error(err);
  thirdTask(result2!, handleThird);
}

function handleThird(err: Error | null, result3?: string) {
  if (err) return console.error(err);
  console.log('Final:', result3);
}

// Запуск
firstTask(handleFirst);

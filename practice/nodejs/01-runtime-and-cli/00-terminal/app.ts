console.time('task');
for (let i = 0; i < 1000000; i++) {
  void i;
}
console.timeEnd('task');

const users = [
  { name: 'John', age: 25 },
  { name: 'Kate', age: 30 },
];
console.table(users);

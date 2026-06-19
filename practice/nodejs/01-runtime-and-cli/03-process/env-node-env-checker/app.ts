// USER_ID=239482 USER_KEY=foobar node app.ts
// console.log(process.env.NODE_ENV); // "239482"
// console.log(process.env.USER_KEY); // "foobar"

if (process.env.NODE_ENV === 'development') {
  console.log('Development mode: enabling verbose logging.');
} else if (process.env.NODE_ENV === 'production') {
  console.log('Production mode: optimizing performance.');
}

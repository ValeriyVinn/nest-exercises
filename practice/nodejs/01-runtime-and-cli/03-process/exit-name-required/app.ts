const name = process.argv[2];

if (name === undefined) {
  console.error('Name is required');
  process.exit(1);
} else {
  console.log(`Hello, ${name}!`);
}

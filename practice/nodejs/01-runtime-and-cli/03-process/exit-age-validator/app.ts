const age = parseInt(process.argv[2]);

if (isNaN(age)) {
  console.error('Age must be a number!');
  process.exit(1);
} else if (age < 18) {
  console.log('Access denied, you must be at least 18 years old!');
  process.exit(1);
} else {
  console.log('Access granted!');
}

if (process.cwd() === __dirname) {
  console.log(`You ran the file from its directory.`);
} else {
  console.error('You ran the file from outside its directory.');
}

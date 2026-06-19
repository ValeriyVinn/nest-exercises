const code = process.argv[2];

let exitCode: string;

switch (code) {
  case '0':
    exitCode = 'success';
    break;
  case '1':
    exitCode = 'failure';
    break;
  case '2':
    exitCode = 'unknown';
    break;
  default:
    console.error('Invalid exit code! Please provide a valid exit code (0, 1, or 2).');
    process.exit(1);
}

console.log(`Exiting with code: ${exitCode}`);
process.exit(parseInt(code));

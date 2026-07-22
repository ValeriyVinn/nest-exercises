const delayArg = Number(process.argv[2]);
if (isNaN(delayArg)) {
  console.error('Будь ласка, передайте число (мс) як аргумент');
  process.exit(1);
}

function logWithDelay(ms: number) {
  setTimeout(() => console.log("I'm late, but I'm here"), ms);
}

void logWithDelay(delayArg);

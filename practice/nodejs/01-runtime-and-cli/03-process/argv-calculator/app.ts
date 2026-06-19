// Extract arguments, slicing off the first two system elements
const args = process.argv.slice(2);

// // Check if we have enough arguments
if (args.length < 3 || args.length > 3) {
  console.log('Error: Please provide two numbers and an operator (e.g., 5 + 3)');
  process.exit(0);
}

// Convert input strings to numbers
const num1 = parseFloat(args[0]);
const operator = args[1];
const num2 = parseFloat(args[2]);

let result;

// Perform the calculation based on the operator
switch (operator) {
  case '+':
    result = num1 + num2;
    break;
  case '-':
    result = num1 - num2;
    break;
  case '*':
    result = num1 * num2;
    break;
  case '/':
    if (num2 === 0) {
      console.log('Error: Cannot divide by zero.');
      process.exit(1);
    }
    result = num1 / num2;
    break;
  default:
    console.log(`Error: Unsupported operator '${operator}'`);
    process.exit(1);
}

console.log(`The result is: ${result}`);

// const args = process.argv.slice(2);

// function add(a, b) {
//   console.log(Number(a) + Number(b));
// }
// add(args[0], args[1]);

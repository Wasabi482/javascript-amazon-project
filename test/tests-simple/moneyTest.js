import {formatCurrency} from '../scripts/utils/money.js';

//situation = test cases
//Group of related tests = test suite
//2 types of test cases 
//1. Basic test cases
// = test if the cose is working or not.

console.log('test suite: formatCurrency')

console.log('converts cents into dollars');
if (formatCurrency(2095) === '20.95'){
  console.log('passed');
} else {
  console.log('failed');
}

//2. Edge test cases
// = test with values that are tricky.
console.log('works with 0');
if (formatCurrency(0)=== '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds up to the nearest cent');
if (formatCurrency(2000.5) === '20.01') {
 console.log('passed');
} else {
  console.log('failed');
}

if (formatCurrency(2000.4) === '20.00'){
  console.log('passed');
} else {
  console.log('failed');
}

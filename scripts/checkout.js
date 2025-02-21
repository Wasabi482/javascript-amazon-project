import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import {renderOrderSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProducts, loadProductsFetch} from '../data/products.js';
import { loadCart } from "../data/cart.js";
//import '../data/backend-practice.js';
//import '../data/cart-class.js'


//recursion - function re-run itself
//MVC- updating the data and regenerating all the HTML
//MVC - Model - View - Controller
//Model - saves and manages the data
//View - takes the data and displays it on the page
//Controller - runs some code when we interact with the page

//Makes a function return a promise
//The reason to use async is to use the second feature await
//await lets us wait for a promise to finish
async function loadPage(){

  //try/catch meant to handle unexpected errors. outside of our control
  try {

    //manually create an error
   //throw 'error1';

    //use this "await" instead of .then
    //this lets us write asynchronous code like normal code.
    //Can only use await when inside an async function.
    //You cant use await inside a normal function
    //Async await shortcut for promises
    await loadProductsFetch();

    //"reject" creates an error in the future
    const calue = await new Promise((resolve, reject) => {

      //manually error in promises
      //throw 'error2';


      loadCart(() => {
        //reject('error3');
        resolve('value3');
      });
    });

  } catch (error) {
    console.log('Unexpected Error. Please try again later.');
  }


  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();
/*
//Promise.all(), lets us run multiple promises at the same time
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
  //values is a parameter from resolve
]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

//Resolve is similar to Jasmine "done" function

//Promises allow javascript to do multiple things at the same time
//"then" creates a next step after the resolve
//Problem is, multiple callbacks cause a lot of nesting
//Value lets you share a value in steps

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/





/*
document.addEventListener('DOMContentLoaded', () => {
  loadProducts(() => {
    loadCart(() => {
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
});
*/
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import {renderOrderSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProducts} from '../data/products.js';
import { loadCart } from "../data/cart.js";
//import '../data/backend-practice.js';
//import '../data/cart-class.js'


//recursion - function re-run itself
//MVC- updating the data and regenerating all the HTML
//MVC - Model - View - Controller
//Model - saves and manages the data
//View - takes the data and displays it on the page
//Controller - runs some code when we interact with the page

//Promise.all(), lets us run multiple promises at the same time
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1');
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
  //values is a parameter from resolve
]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});


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
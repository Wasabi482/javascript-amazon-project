import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import {renderOrderSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProducts} from '../data/products.js';
//import '../data/backend-practice.js';
//import '../data/cart-class.js'


//recursion - function re-run itself
//MVC- updating the data and regenerating all the HTML
//MVC - Model - View - Controller
//Model - saves and manages the data
//View - takes the data and displays it on the page
//Controller - runs some code when we interact with the page
document.addEventListener('DOMContentLoaded', () => {
  loadProducts(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});

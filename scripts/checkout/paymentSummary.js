import {cart, calculateCartQuantity} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js'

//Exports the function
//Retrieve the html element responsible for displaying the summary
export function renderPaymentSummary() {
  const paymentSummaryElement = document.querySelector('.js-payment-summary');

  //if nothing is in the html then return nothing
  if (!paymentSummaryElement) {
    return;
  }

  let productPriceCents = 0;
  let shippingPriceCents = 0;

  //Iterates through each item in the cart
  //Every product's price cents is multiplied to the number of quantity then stored in a variable.
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    //Every product's delivery price is added to each other every loop
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  //Add the shipping fee and price together
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  //Store the tax
  const taxCents = totalBeforeTaxCents * 0.1;
  //Add the tax 
  const totalCents = totalBeforeTaxCents + taxCents;


  //Generate the html inserting the values
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `
  ;

  //Retrieve the summary section and display the html 
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}
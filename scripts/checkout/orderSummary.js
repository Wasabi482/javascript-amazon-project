//named export
import {calculateCartQuantity, cart, removeFromCart, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';

//default export can export only 1 thing
//each file can only have 1 default export
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js'

import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

hello();

//const today = dayjs();
//const deliveryDate =  today.add(7, 'days');
//console.log(deliveryDate.format('dddd, MMMM D'));

//Displays the order summary in checkout page.
export function renderOrderSummary(){

  //Initialize empty variable
  let cartSummaryHTML = '';


  //Asign variables iteration from the cart from cart.js
  cart.forEach((cartItem) => {

    //Asign the productId 
    const productId = cartItem.productId;
    
    //Asign the matchingProduct using getProduct imported from products.js
    const matchingProduct = getProduct(productId);
    
    //Asign the deliveryOptionId using the getDeliveryOption imported from deliveryOptions.js
    const deliveryOptionId = cartItem.deliveryOptionId;

    //Asign the delivery option by getting the delivery option id imported form deliveryOption.js
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    //Asign the calculated delivery date by calling the function imported from deliveryOptions.js
    const dateString = calculateDeliveryDate(deliveryOption);
    
    //Generate the HTML for the cart and call the variables.
    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>

              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>

              <input class="quantity-input js-quantity-input-${matchingProduct.id}">

              <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                Save
              </span>

              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  //Generates the HTML for the delivery options section
  function deliveryOptionsHTML(matchingProduct, cartItem){

    let html = '';
    
    //Iterates through each delivery option 
    deliveryOptions.forEach((deliveryOption)=>{
      //Get the calculated delivery date and store it in a variable
      const dateString = calculateDeliveryDate(deliveryOption);

      //Get the price of each delivery option from deliveryOption object and priceCents
      //If equal to zero it will display "Free" instead.
      //Else display the formatted currency of the price.
      const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} - `;

      //deliveryOption.id is equal to the cart item delivery option id, then store it in a variable
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      //Generate the html for the delivery option
      html += 
      `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked': ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
      `
    });

    return html;
  }

  //Display the html using document query selector
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  //Updates the cart quantity number at the top if the cart made some changes
  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    
    const returnToHomeLink = document.querySelector('.js-return-to-home-link');
    if (returnToHomeLink) {
      returnToHomeLink.innerHTML = `${cartQuantity} items`;
    } 
  }

  updateCartQuantity();

  //Gets the delete button
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    //Adds an event listener to the delete button
    link.addEventListener('click', () => {

      //Retrieve te product id of the item and removes it from the cart
      const productId = link.dataset.productId;

      //Import the removeFromCart function from cart.js
      removeFromCart(productId);
      
      //Call all the functions again to update the page
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  //Gets the update button
  document.querySelectorAll('.js-update-link').forEach((link) => {
    //Adds an event listener to the update button
    link.addEventListener('click', () => {

      //Retrieve the product id of the item and 
      const productId = link.dataset.productId;

      //Retrieve the html element input with the specific product id
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      //Add a class to make the input visible
      container.classList.add('is-editing-quantity');
    })
  });


  //Gets the save button
  document.querySelectorAll('.js-save-link')
    .forEach((link) => {

      //Adds an event listener to the save button
      link.addEventListener('click', () => {

        //Retrieves the product ID and store it in a variable
        const productId = link.dataset.productId;

        //Retrieves the new quantity using document query selector then store in a variable
        const quantityInput = document.querySelector(
          `.js-quantity-input-${productId}`
        );

        //Put the new quantity in another variable. 
        //Number constructor makes sure the value is a number
        const newQuantity = Number(quantityInput.value);

        //If the quantity is less thant 0 or greater than 1000 validate
        if(newQuantity < 0 || newQuantity >= 1000){
          alert('Quantity must be at least 0 and less than 1000');
          return;
        };

        //Imported the updateQuantity with its parameters.
        updateQuantity(productId, newQuantity);

        //Retrieves the html element and removes the class to remove the input area
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.remove('is-editing-quantity');

        //Retrieves the html element for the quantity display update it with the new quantity
        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        quantityLabel.innerHTML = newQuantity;

        //Calls the fucniton to updateCartQuantity at the top and render payment summary
        updateCartQuantity();
        renderPaymentSummary();
      });
    });

    //Retrieves the element class for each delivery option
    //Adds an even listener for each element radio
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {

      //Gives access to all the data attribute in the html and store in variables
      const {productId, deliveryOptionId} = element.dataset;
      //Use the variables as paramater and call the update deliver option based on the product
      updateDeliveryOption(productId, deliveryOptionId);

      //Call the functions to refresh the summary section
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

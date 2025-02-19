//Import cart from cart.js 
import {cart} from '../../data/cart.js'

//Handles the checkout header including the cart quantity
export function renderCheckoutHeader(){
  const checkoutHeaderElement = document.querySelector('.js-checkout-header');

  if (!checkoutHeaderElement) {
    return;
  }
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;

  });

  //generates the html for header of the page
  const checkoutHeaderHTML = `
  <div class="checkout-header">
    <div class="header-content">
      <div class="checkout-header-left-section">
        <a href="amazon.html">
          <img class="amazon-logo" src="images/amazon-logo.png">
          <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
        </a>
      </div>

      <div class="checkout-header-middle-section">
        Checkout (<a class="return-to-home-link js-return-to-home-link"
          href="amazon.html"></a>)
      </div>

      <div class="checkout-header-right-section">
        <img src="images/icons/checkout-lock-icon.png">
      </div>
    </div>
  </div>
`;

//displays the html using document query selector.
  document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHTML;
}

//Go to orderSummary.js
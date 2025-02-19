import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';


let productsHTML = '';

//Imports the products from products.js
//Iterates through each object and displays it
//Each iteration puts the html inside productsHTML
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <!--Polymorphism, using a method without knowing the class-->
      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

//Displays the productsHTML in the window using document.querySelector
document.querySelector('.js-products-grid').innerHTML = productsHTML;

//Imports the calculateCartQuantity and puts it in a variable
//If empty display a blank on the cart
//Else display the cartQuantity
function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  if (!cartQuantity) {
    document.querySelector('.js-cart-quantity').innerHTML = ''; 
  } 
  else { 
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity; 
  }
}
updateCartQuantity();

//Iterates each add to cart button and listens
//If clicked it will store the product id into a variable
//Imports the addToCart function from cart.js and calls it with the productId variable
//Calls the updateCartQuantity function to update the cart count
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });

  //go to cart.js
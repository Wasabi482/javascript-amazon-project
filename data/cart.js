export let cart;

loadFromStorage();


//Load the data form the localstorage to restore the page.
//If the cart doesnt load it will display a dummy product.
export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

  if(!cart){
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }
}

//Save the everything in local storage so even if the page refreshes the date is still the same
function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}


//From amazon.js gets the productId
export function addToCart(productId,  quantity = 1) {
  let matchingItem;

  //Iterates to each product in the cart and compares the productId and stores it in a variable
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  //If there is a matching item update the quantity to 1 or add 1
  //Meaning there is an existing product of it already in the cart and we will only increase its quantity
  //Else it will push the new product in the cart updating the quantity by 1 and the delivery option
  //Save everything so when the page refreshes
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

//Iterates through the cart.
//Get all the products from the old cart except the selected product id, and store it in a new cart
//Equal the new cart to a variable cart.
//Save to localstorage
export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

//From amazon.js which iterates each products in the cart and update the cartQuantity
export function calculateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

//From orderSummary.js which iterates throught the cart items.
//If it finds the matching item in the cart it updates its new quantity in the localstorage
export function updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    saveToStorage();
}

//loops through the cart. 
//if the productid matches something in the cart, gets that item and store in variable
//gets the current delivery option of that product and update with the new delivery option selected
//Save to local storage
export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
//Go to checkout.html

export function loadCart(fun){
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      console.log(xhr.response);

      fun()
    });

    xhr.open('Get', 'https://supersimplebackend.dev/cart');
    xhr.send();
  };

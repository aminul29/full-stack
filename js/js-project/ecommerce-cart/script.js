document.addEventListener("DOMContentLoaded", function () {
  const products = [
    { id: 1, name: "Product 1", price: 10.0 },
    { id: 2, name: "Product 2", price: 20.0 },
    { id: 3, name: "Product 3", price: 30.0 },
  ]

  // Empty cart array to store selected products
  let cart = []

  // Grab all the necessary DOM elements
  const productList = document.getElementById("product-list")
  const cartItems = document.getElementById("cart-items")
  const emptyCartMessage = document.getElementById("empty-cart")
  const cartTotalMessage = document.getElementById("cart-total")
  const checkoutBtn = document.getElementById("checkout-btn")
  const totalPriceDisplay = document.getElementById("total-price")

  products.forEach((product) => {
    // Create a product div for each product and append it to the product list
    const productDiv = document.createElement("div")
    // Set the class name for styling
    productDiv.classList.add("product")
    // Set the inner HTML to display product details and an "Add to Cart" button
    // The button has a data-id attribute to identify the product
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `
    // Append the product div to the product list in the DOM
    productList.appendChild(productDiv)
  })

  // Event listener for adding products to the cart
  productList.addEventListener("click", function (e) {
    // Check if the clicked element is an "Add to Cart" button
    if(e.target.tagName === "BUTTON"){
      const productId = parseInt(e.target.getAttribute("data-id")) // Get the product ID from the data-id attribute
      
      const product = products.find((p) => p.id === productId) // Find the product in the products array based on the ID
      console.log(product) // Log the product to the console for debugging
      addToCart(product) // Call the addToCart function with the found product
    }
  })

  function addToCart(product) {
    cart.push(product) // Add the product to the cart array
    renderCart() // Call the renderCart function to update the DOM
  }
 
  // Function to render the cart items in the DOM
  function renderCart(){
    cartItems.innerText = "" // Clear the cart items container
    let totalPrice = 0 // Initialize total price to 0

    if(cart.length > 0){
      emptyCartMessage.classList.add("hidden") // Hide the empty cart message if there are items in the cart
      cartTotalMessage.classList.remove("hidden") // Show the cart total message

      // Loop through each product in the cart array
      cart.forEach((item, index) => {
        totalPrice += item.price // Add the product price to the total price
        const cartItem = document.createElement("div") // Create a new div for the cart item
        cartItem.innerHTML = `
          <h4>${item.name}</h4>
          <p>Price: $${item.price.toFixed(2)}</p>
          <button class="remove-item" data-index="${index}">Remove</button>
        ` // Set the inner HTML to display product details and a "Remove" button
        cartItems.appendChild(cartItem) // Append the cart item div to the cart items container
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}` // Update the total price display
      })
    }else{
      removeMessage() // Call the removeMessage function if the cart is empty
    }
  }

  function removeMessage(){
    emptyCartMessage.classList.remove("hidden") // Show the empty cart message
    cartTotalMessage.classList.add("hidden") // Hide the cart total message
    let cMessage = document.createElement("div")
    cMessage.classList.add("empty-cart-message") // Set the class name for styling
    cMessage.innerHTML = `<h4>Your cart is empty</h4>` // Set the inner HTML to display an empty cart message
    cartItems.appendChild(cMessage) // Append the empty cart message to the cart items container
  } 

  // Event listener for checking out
  checkoutBtn.addEventListener("click", function () {
    cart = [] // Clear the cart array
    alert("Thank you for your purchase!") // Show a thank you message
    renderCart() // Call the renderCart function to update the DOM
  })

  // Event listener for removing items from the cart
  cartItems.addEventListener("click", function (e) {
    if(e.target.classList.contains("remove-item")){
      const index = parseInt(e.target.getAttribute("data-index")) // Get the index of the item to remove
      cart.splice(index, 1) // Remove the item from the cart array
      renderCart() // Call the renderCart function to update the DOM
    }
  })

  if(cart.length === 0){
    removeMessage() // Call the removeMessage function if the cart is empty
  }
  // Initial render of the cart

})
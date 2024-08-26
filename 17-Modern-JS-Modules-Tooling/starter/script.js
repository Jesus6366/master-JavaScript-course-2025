// importing module name imported
// import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";

// addToCart("bread", 5);

// console.log(price, tq);
// console.log("Importing module");

// import * as shoppinCart from "./shoppingCart.js";

// console.log(shoppinCart.addToCart("bread", 5));
// console.log(shoppinCart.totalPrice);

// import add from "./shoppingCart.js";

// add("pizza", 2);

// top level await only works with modules
const res = await fetch("https://jsonplaceholder.typicode.com/posts");

const data = await res.json();
console.log(data);

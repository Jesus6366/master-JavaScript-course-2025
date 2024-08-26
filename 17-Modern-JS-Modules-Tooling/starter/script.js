// importing module name imported
// import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";

import { addToCart } from "./shoppingCart";

// addToCart("bread", 5);

// console.log(price, tq);
// console.log("Importing module");

// import * as shoppinCart from "./shoppingCart.js";

// console.log(shoppinCart.addToCart("bread", 5));
// console.log(shoppinCart.totalPrice);

// import add from "./shoppingCart.js";

// add("pizza", 2);

// top level await only works with modules
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");

// const data = await res.json();
// console.log(data);

/////////////////MODULE PATTERN
// ifee

// const shoppingCart2 = (function () {
//   const cart = [];
//   const shoppinCart = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;
//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} order to supplier`);
//   };

//   // public api
//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// shoppingCart2.addToCart("apple", 4);

//////////// commonjs modules

// export in nodejs
// export.addToCart = function (product, quantity) {
//         cart.push({ product, quantity });
//         console.log(`${quantity} ${product} order to supplier`);
// }

// // import
// const {addToCart} = require("something")

// exporting module
console.log("Exporting module");

const shippingCost = 10;
const cart = [];

// named export top level code
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

/// multiple exports with named export
const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

////////// default export ////////////// one thing per module

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}

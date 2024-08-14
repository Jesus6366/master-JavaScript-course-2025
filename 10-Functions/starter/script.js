"use strict";

// const bookings = [];

// // default values
// const createBooking = function (flightNum, numPassengers = 1, price = 199) {
//   // ES5
//   //   numPassengers = numPassengers || 1;
//   //   price = price || 199;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   //   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', undefined, 1200);

// value vs reference

// const flight = 'LH234';

// const jesus = {
//   name: 'jesus martha',
//   passport: 32135245646,
// };

// const checkIn = function (flightNum, passenger) {
//   // this will modify the original jesus object because it is of reference type
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 32135245646) {
//     alert('Checked in');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// checkIn(flight, jesus);
// console.log(flight);
// console.log(jesus);

//FIRST-CLASS VS HIGHER-ORDER FUNCTIONS
//first class is just the regular functions
// the higher order is a function that accepts a function as parameter or returns a function

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...other] = str.split(' ');
//   return [first.toUpperCase(), ...other].join(' ');
// };

// // higher order function
// // it is a function that receives another function as an argument or returns a function
// const transformer = function (str, fn) {
//   console.log(`Transformed String: ${fn(str)}`);
// };

// transformer('JavaScript is the best!', upperFirstWord);
// transformer('JavaScript is the best!', oneWord);

// // callback funcion is a function that is passed as argument

// const high5 = function () {
//   console.log('HEIGH');
// };

// // here the addEventListener is the higher function and the high5 funcion is the callback function
// document.body.addEventListener('click', high5);

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greet = (greeting) => {
//   return (name) => {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet("Hey");
// greeterHey("Jesus");
// greet("Hello")("Ruth");

// // the call and apply methods
// //THIS KEYWORD
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  booking: [],
  book(fligthNum, name) {
    console.log(
      `${name}, booked a seat on ${this.airline} fligth  ${this.iataCode} ${fligthNum}`
    );
    this.booking.push({ fligth: `${this.iataCode} ${fligthNum}` });
  },
};

// lufthansa.book(239, "Jesus Martha");
// lufthansa.book(635, "Ruth Martha");

const euroWings = {
  airline: "Eurowiings",
  iataCode: "EW",
  booking: [],
};

const book = lufthansa.book;

// // does not work
// // book(23, "Jesus martha")
// // call method
// book.call(euroWings, 23, "Sr Martha");
// console.log(euroWings);

// book.call(lufthansa, 239, "Rosendo M<artha");

// const fliightData = [583, "George Cooper"];

// // apply method
// // not use a lot anymore
// book.apply(euroWings, fliightData);

// // this is better
// book.call(lufthansa, ...fliightData);

//BIND METHOD
const bookEW = book.bind(euroWings);
const bookLH = book.bind(lufthansa);

bookEW(235, "Steven");
bookLH(333, "Sarai");

// with eventlisteners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// partial application
const addTax = function (rate, value) {
  return value + value * rate;
};

console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(100));

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

const greet = (greeting) => {
  return (name) => {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet("Hey");
greeterHey("Jesus");
greet("Hello")("Ruth");

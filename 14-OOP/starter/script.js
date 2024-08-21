"use strict";
// CONSTRUCTOR FUNCTION
// always start with capital letters
// an arrow function wont work
const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //methods never created like this
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jesus = new Person("Jesus", 1990);
console.log(jesus);

//1. New {} is created
//2. function is calles, this = {}
//3. {} is linked to prototype
//4. functions automatically return {}
const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);

console.log(jesus instanceof Person);

// PROTOTYPES to add methods or properties to the constructor by prototypal inheritance
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jesus.calcAge();
matilda.calcAge();

Person.prototype.species = "Homo Sapiens";
console.log(jesus.species, matilda);

console.log(jesus.__proto__);
// object.prototype top of the prototype chain
console.log(jesus.__proto__.__proto__);

const arr = [3, 6, 4, 5, 6, 9, 3, 9, 9]; // new Array // constructor //

console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

// dont do it
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector("h1");

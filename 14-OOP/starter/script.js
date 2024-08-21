// "use strict";
// // CONSTRUCTOR FUNCTION
// // always start with capital letters
// // an arrow function wont work
// const Person = function (firstName, birthYear) {
//   // instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   //methods never created like this
//   //   this.calcAge = function () {
//   //     console.log(2037 - this.birthYear);
//   //   };
// };

// const jesus = new Person("Jesus", 1990);
// console.log(jesus);

// //1. New {} is created
// //2. function is calles, this = {}
// //3. {} is linked to prototype
// //4. functions automatically return {}
// const matilda = new Person("Matilda", 2017);
// const jack = new Person("Jack", 1975);

// console.log(jesus instanceof Person);

// // PROTOTYPES to add methods or properties to the constructor by prototypal inheritance
// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// jesus.calcAge();
// matilda.calcAge();

// Person.prototype.species = "Homo Sapiens";
// console.log(jesus.species, matilda);

// console.log(jesus.__proto__);
// // object.prototype top of the prototype chain
// console.log(jesus.__proto__.__proto__);

// const arr = [3, 6, 4, 5, 6, 9, 3, 9, 9]; // new Array // constructor //

// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);

// // dont do it
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// const h1 = document.querySelector("h1");

// ///////////////////////////////////////
// // Coding Challenge #1

// /*
// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h

// GOOD LUCK 😀
// */

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// const carSpeed1 = new Car("BMW", 120);
// const carSpeed2 = new Car("Mercedes", 95);

// carSpeed1.accelerate();
// carSpeed1.brake();

// carSpeed2.accelerate();
// carSpeed2.brake();

//////////////////////////////////////// CLASSES /////////////////////////////////////////////////////////////////

// class expression

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // this will be in the prototype if its outside of the constructor .prototype
  calcAge() {
    console.log(2037 - this.birthYear);
  }
}

const jessica = new PersonCl("Jessica", 1996);
console.log(jessica);
jessica.calcAge();

// manually add method

PersonCl.prototype.greet = function () {
  console.log(`Hello ${this.firstName}`);
};

jessica.greet();

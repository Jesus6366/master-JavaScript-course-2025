"use strict";
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

// Person.hey = function () {
//   console.log("Hey there");
// };

// Person.hey();

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
// not used that much
// class expression

// class declaration
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   // this will be in the prototype if its outside of the constructor .prototype
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   // set a property that already exist
//   set fullName(name) {
//     if (name.includes(" ")) {
//       return (this._fullName = name);
//     } else {
//       alert(`The ${name} is not a full name`);
//     }
//   }

//   get fullName() {
//     return this._fullName;
//   }
//   // static method, only accesible by the Object but not by the prototype
//   static hey() {
//     console.log("HEY!!!!!!!");
//   }
// }

// const jessica = new PersonCl("Jessica Davis", 1996);
// console.log(jessica);
// jessica.calcAge();

// // manually add method

// PersonCl.prototype.greet = function () {
//   console.log(`Hello ${this.firstName}`);
// };

// jessica.greet();

// /////////////////////////////////////// GETTERS AND SETTERS (GET,SET)//////////////////////////////////////////////////
// // THIS IS FOR A REGULAR FUNCTION
// const accounst = {
//   owners: "Jesus",
//   movements: [200, 530, 120, 300],
//   get latest() {
//     return this.movements.slice(-1).pop();
//   },
//   set latest(mov) {
//     return this.movements.push(mov);
//   },
// };

// accounst.latest = 50;

// console.log(accounst.movements);
// PersonCl.hey();

/////////////////////////////////////////////////OBJECT.CREATE////////////////////////////////////////////////
// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);
// console.log(steven);

// const sarah = Object.create(PersonProto);

// sarah.init("Sarah", 1996);

// console.log(sarah);

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   brake() {
//     this.speed -= 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   get speedUS() {
//     return `${this.make} is going at ${this.speed / 1.6} mi/h`;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const ford = new Car("Ford", 120);

// ford.accelerate();
// ford.brake();
// ford.speedUS = 50;
// console.log(ford);

//////////////// INHERITANCE BETWEEN CLASSES CONTRUCTOR FUNCTION

const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
// child object
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// here we are making the person.prototype be the prototype of student by inheritance
// creating the conexion:
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and i study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
mike.introduce();
// here js first will look into student prototype and then in person prototype
mike.calcAge();

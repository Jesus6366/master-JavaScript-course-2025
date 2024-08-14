'use strict';

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

const flight = 'LH234';

const jesus = {
  name: 'jesus martha',
  passport: 32135245646,
};

const checkIn = function (flightNum, passenger) {
  // this will modify the original jesus object because it is of reference type
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 32135245646) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, jesus);
console.log(flight);
console.log(jesus);

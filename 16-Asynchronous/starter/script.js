"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderError = function (message) {
  countriesContainer.insertAdjacentText("beforeend", message);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = "") {
  const html = `<article class="country ${className}" >
              <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
              </div>
            </article>`;

  countriesContainer.insertAdjacentHTML("beforeEnd", html);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
////////////////OLD SCHOOL way without promises

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open(
//     "GET",
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();
//   request.addEventListener("load", function () {
//     console.log(this.responseText);

//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `<article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>`;

//     countriesContainer.insertAdjacentHTML("beforeEnd", html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData("mexico");
// getCountryData("portugal");
// getCountryData("usa");

// const getCountryAndNeighbour = function (country) {
//   // ajax call country 1
//   const request = new XMLHttpRequest();
//   request.open(
//     "GET",
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();
//   request.addEventListener("load", function () {
//     console.log(this.responseText);

//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // render country 1
//     renderCountry(data);

//     // get neighbour country 2

//     const neighbour = data.borders?.[0];

//     if (!neighbour) {
//       return;
//     }

//     // ajax call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       "GET",
//       `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//     );
//     request2.send();

//     request2.addEventListener("load", function () {
//       const data2 = JSON.parse(this.responseText);
//       renderCountry(data2, "neighbour");
//     });
//   });
// };

// // getCountryAndNeighbour("portugal");
// getCountryAndNeighbour("usa");

// const request = new XMLHttpRequest()
// request.open(
//     "GET",
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();

//////////////////////////NEW FETCH WAY OF DOING IT PROMISES ////////////////////////////////////

// const request = fetch(
//   "https://countries-api-836d.onrender.com/countries/name/portugal"
// );

// const getCountryData = function (country) {
//   // fetch function returns a promise
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     // handle the first promise and the response returns another promise
//     .then(function (response) {
//       return response.json();
//     })
//     // handle the first then promise data
//     .then((data) => {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getJSON = function (url, errorMsg = "Something Wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};

// const getCountryData = function (country) {
//   // fetching country 1
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then((response) => {
//       console.log(response);

//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       //   const neighbour = data[0].borders?.[0];
//       const neighbour = "hasdasasd";
//       console.log(neighbour);

//       //fetching country 2 with chaining
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//       )
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`Country not found (${response.status})`);
//           }
//           return response.json();
//         })
//         .then((data) => renderCountry(data, "neighbour"));
//     })
//     .catch((err) => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  // fetching country 1
  getJSON(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    "Country not found"
  )
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) {
        throw new Error("No neighbour found!");
      }

      console.log(neighbour);

      //fetching country 2 with chaining

      return getJSON(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
        "Country not found"
      ).then((data) => renderCountry(data, "neighbour"));
    })
    .catch((err) => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener("click", function () {
  getCountryData("mexico");
});

// getCountryData("australia");

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then((response) => {
//       console.log(response);
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       if (data.city === "Throttled! See geocode.xyz/pricing") {
//         throw new Error("You clicked to many times ");
//       }

//       console.log(`Your are in ${data.city}, ${data.country}`);
//       getCountryData(data.country);
//     })
//     .catch((err) => console.log(err));
// };

// whereAmI(52.508, 13.381);

// // call stack
// console.log("Test Start ");
// // call back quoe
// setTimeout(() => console.log("0 sec timer", 0));
// // microtasks quoe promises
// Promise.resolve("Resolved promise 1").then((res) => console.log(res));
// // call stack
// console.log("Test End");

/// builgind a simple promise
// the funcions is the executer
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log("Lotter draw is happening");

//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       // the response
//       resolve("You WIN 🎉");
//     } else {
//       // the error response
//       reject(new Error("You lost your money "));
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

// // promisifyin setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log("I waited for 2 seconds ");
//     return wait(1);
//   })
//   .then(() => "I waited for 1 second");

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   (position) => resolve(position),
//     //   (err) => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then((pos) => console.log(pos));

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const imgContainer = document.querySelector(".images");

// const createImage = function (imagePath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement("img");
//     img.src = imagePath;
//     img.addEventListener("load", function () {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener("error", function () {
//       reject(new Error("image not found"));
//     });
//   });
// };

// createImage("img/img-1.jpg")
//   .then((img) => {
//     console.log("image 1 loaded");
//   })
//   .catch((err) => console.error(err));

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   (position) => resolve(position),
//     //   (err) => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// /////////////////////// CONSUMING PROMISES WITH ASYNC / AWAIT //////////
// // the await is used to wait for the promise to be resolve just like with .then
// // is just sintatic sugar for .then
// // the same thing as this:
// //   fetch(
// //     `https://countries-api-836d.onrender.com/countries/name/${country}`
// //   ).then((res) => console.log(res));

// // async function
// const whereAmI = async function (country) {
//   try {
//     // await statement promise response first .then()
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // reverse geocoding

//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) {
//       throw new Error("problem getting location data");
//     }
//     const dataGeo = await resGeo.json();

//     const response = await fetch(
//       `https://countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
//     );

//     if (!response.ok) {
//       throw new Error("problem getting country");
//     }

//     // to get the data second .then()
//     const data = await response.json();
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     renderError(` ${err.message}`);
//     // reject promise returned from async function
//     throw err;
//   }
// };

// console.log("1.will get location");
// // const city = whereAmI();

// // async function returning a promise
// // whereAmI()
// //   .then((city) => console.log(city))
// //   .catch((err) => console.log(err))
// //   .finally(() => console.log("3.finished getting location"));

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(city);
//   } catch (error) {
//     console.error(error);
//   }
//   console.log("3.finished getting location");
// })();

////////////////////////// HANDLING ERROR WITH TRY CATCH ///////////////////

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (error) {
//   alert(error.message);
// }

///////////RUNNING PROMISES IN PARALLEL /////////////
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);

    // PROMISE. ALL CONBINATOR
    const data = await Promise.all([
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
    ]);

    console.log(data.map((d) => d[0].capital));
  } catch (error) {
    console.log(error);
  }
};

get3Countries("portugal", "canada", "tanzania");

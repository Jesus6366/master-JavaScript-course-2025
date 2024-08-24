"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderError = function (message) {
  countriesContainer.insertAdjacentText("beforeend", message);
  //   countriesContainer.style.opacity = 1;
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
  //   countriesContainer.style.opacity = 1;
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

const getCountryData = function (country) {
  // fetching country 1
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      console.log(neighbour);

      //fetching country 2 with chaining
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      )
        .then((response) => response.json())
        .then((data) => renderCountry(data, "neighbour"));
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

getCountryData("hashahshs");

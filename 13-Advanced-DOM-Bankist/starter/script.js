"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((boton) => boton.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// button scrolling

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  //scrolling
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );
  // // old school way
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: "smooth",
  // });

  // new way
  section1.scrollIntoView({ behavior: "smooth" });
});

/////////////////////////////////////////////PAGE NAVIGATION
// without event delegation / propagation
// document.querySelectorAll(".nav__link").forEach((el) => {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// with event delegation
// 1. add event listener to common parent element
//2. determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.preventDefault();
  // matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//////////////////////////////////////////
//SELECTING ELEMENTS
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// // the most commonly used
// const header = document.querySelector(".header");
// const allSections = document.querySelectorAll(".section");
// // console.log(allSections);

// document.getElementById("section--1");
// const allButtons = document.getElementsByTagName("button");
// // console.log(allButtons);

// document.getElementsByClassName("btn");
// //////////////////////////////////////////
// // CREATIONG AND INSERTING ELEMENTS
// //.insertAdjacentHTML

// // element created but not yet inserted into the page
// const message = document.createElement("div");
// message.classList.add("cookie-message");
// // message.textContent =
// //   "We use cookies for improved functionality and analytics.";
// message.innerHTML =
//   "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>";

// // this will not appered until we clone it
// // header.append(message.cloneNode(true));

// // inserting before or after
// // header.before(message)

// // Append the message to the header
// header.append(message);

// // DELETE ELEMENTS
// // Add the event listener after the message has been appended to the DOM
// message
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     // THIS METHOD IS NEW
//     // message.remove();

//     // THIS THE OLD WAY
//     message.parentElement.removeChild(message);
//   });

// //STYLES
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";

// // to read the styles
// // console.log(getComputedStyle(message).color);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// // to modify a style variable
// // document.documentElement.style.setProperty("--color-primary", "orangered");

// //ATRIBUTES
// // LIKE, SRC, CLASS ETC. only excisted ones no created ones or added
// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = "Beautiful minimalist logo";
// // to add attibutes
// logo.setAttribute("company", "Bankist");
// // to read added atributes
// console.log(logo.getAttribute("company"));
// // to get the relative link
// console.log(logo.getAttribute("src"));

// // CLASSES
// // you can add multiple classes "c","j" etc...
// logo.classList.add("c");
// logo.classList.remove("c");
// logo.classList.toggle("c");
// logo.classList.contains("c");

// // types of events and event handlers
// const h1 = document.querySelector("h1");

// const alerth1 = function (e) {
//   alert("addEventListener : Great! you are reading the heading ");
//   // remove it after it happened
//   // h1.removeEventListener("mouseenter", alerth1);
// };

// // is like mouse hover in css
// h1.addEventListener("mouseenter", alerth1);

// // setTimeout(() => h1.removeEventListener("mouseenter", alerth1), 5000);

// // another way of attaching eventlistneres
// // old school
// // h1.onmouseenter = function (e) {
// //   alert("addEventListener : Great! you are reading the heading ");
// };

// // bubling and event propagation in practice
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (mix - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// // bubbling starts
// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   // stop the propagation in general is not a good idea
//   e.stopPropagation();
// });
// // then triggers this parent
// document
//   .querySelector(".nav__links")
//   .addEventListener("click", function (e) {});
// // last triggers this other parent making the 3 change colors
// document.querySelector(".nav").addEventListener("click", function (e) {});

// //DOM TRAVERSING
// const h1 = document.querySelector("h1");

// // GOING DOWNWARDS: CHILD

// console.log(h1.querySelectorAll(".highlight"));
// // not that used
// console.log(h1.childNodes);
// // most common
// console.log(h1.children);

// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "orangered";

// // GOING UPWARDS: PARENTS

// // direct parent
// console.log(h1.parentNode);
// // the most commonly used
// console.log(h1.parentElement);

// // is like queryselectorall but for parents
// // not direct parent
// h1.closest(".header").style.background = "var(--gradient-secondary)";
// // the closest is going to be the same element h1
// h1.closest("h1").style.background = "var(--gradient-primary)";

// // GOING SIDEWAYS SIBLINGS
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// // going up to the parent and then the children all the siblings
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach((el) => {
//   if (el !== h1) {
//     el.style.transform = "scale(1.5)";
//   }
// });

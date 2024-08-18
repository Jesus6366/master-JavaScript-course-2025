"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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

//////////////////////////////////////////
//SELECTING ELEMENTS
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// the most commonly used
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
// console.log(allSections);

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
// console.log(allButtons);

document.getElementsByClassName("btn");
//////////////////////////////////////////
// CREATIONG AND INSERTING ELEMENTS
//.insertAdjacentHTML

// element created but not yet inserted into the page
const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent =
//   "We use cookies for improved functionality and analytics.";
message.innerHTML =
  "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>";

// this will not appered until we clone it
// header.append(message.cloneNode(true));

// inserting before or after
// header.before(message)

// Append the message to the header
header.append(message);

// DELETE ELEMENTS
// Add the event listener after the message has been appended to the DOM
message
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    // THIS METHOD IS NEW
    // message.remove();

    // THIS THE OLD WAY
    message.parentElement.removeChild(message);
  });

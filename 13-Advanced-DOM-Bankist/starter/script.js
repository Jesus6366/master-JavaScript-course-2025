"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");

const tabsContent = document.querySelectorAll(".operations__content");

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

// TAB COMPONENTS

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // guard clause
  if (!clicked) return;

  // remove the active tab classes from tab and content
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));

  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  //active tab
  clicked.classList.add("operations__tab--active");

  //activate content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// refactoring
const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const sibling = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    sibling.forEach((el) => {
      if (el !== link) {
        return (el.style.opacity = this);
      }
      logo.style.opacity = this;
    });
  }
};

//// MENU FADE ANIMATION
//event delegation again
// with mouseover it bubbles
nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

// sticky navigation

// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 1, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect();

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight.height}px`,
});
headerObserver.observe(header);

//REVEAL SECTIONS
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  }
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// LAZY LOADING IMAGES

const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  } else {
    //replace scr with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });
  }
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// SLIDER
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRigth = document.querySelector(".slider__btn--right");

let currentSlide = 0;
const maxSlide = slides.length;

const goToSlice = function (slice) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slice)}%)`)
  );
};

goToSlice(0);

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlice(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  goToSlice(currentSlide);
};

// next slide
btnRigth.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

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

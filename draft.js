"use strict";

const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");
const navContainer = document.querySelector(".carousel-nav");

const carouselItems = Array.from(document.querySelectorAll(".carousel-item"));
const navItems = Array.from(document.querySelectorAll(".nav-item"));
const CAROUSEL_SIZE = carouselItems.length;
const scorePlace = document.querySelector(".score");

const competitors = {};

const pick = document.querySelector(".pick-button");

const url =
  "https://compete-strongest-com.global.ssl.fastly.net/api/p/divisions/BFRAAW/leaderboard/?p=1&d=asc";
const url2 =
  "https://compete-strongest-com.global.ssl.fastly.net/api/p/divisions/WGPVFH/leaderboard/?p=1&d=asc";

leftBtn.addEventListener("click", swipe);
rightBtn.addEventListener("click", swipe);
navContainer.addEventListener("click", navClick);
pick.addEventListener("click", score);
getScores();
// console.log(competitors);

function swipe(e) {
  const currentCarouselItem = document.querySelector(".carousel-item.active");
  const currentIndex = carouselItems.indexOf(currentCarouselItem);

  let nextIndex;

  if (e.currentTarget.classList.contains("left")) {
    if (currentIndex === 0) {
      nextIndex = CAROUSEL_SIZE - 1;
    } else {
      nextIndex = currentIndex - 1;
    }
  } else {
    if (currentIndex === CAROUSEL_SIZE - 1) {
      nextIndex = 0;
    } else {
      nextIndex = currentIndex + 1;
    }
  }

  carouselItems[nextIndex].classList.add("active");
  navItems[nextIndex].classList.add("active");

  carouselItems[currentIndex].classList.remove("active");
  navItems[currentIndex].classList.remove("active");
}

function navClick(e) {
  const currentCarouselItem = document.querySelector(".carousel-item.active");
  const currentIndex = carouselItems.indexOf(currentCarouselItem);
  const clickedIndex = navItems.indexOf(e.target.parentElement);

  if (e.target.parentElement.classList.contains("active")) {
    // console.log("already active");
    return;
  } else if (e.target.parentElement.classList.contains("nav-item")) {
    carouselItems[clickedIndex].classList.add("active");
    navItems[clickedIndex].classList.add("active");
    currentCarouselItem.classList.remove("active");
    navItems[currentIndex].classList.remove("active");
    // console.log(currentIndex);
  } else {
    return;
  }
}

function getScores() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const bodyRows = data.data.body_rows;

      for (let i = 0; i < bodyRows.length; i++) {
        const competitor = bodyRows[i][0];
        const name = competitor.competitor_name;
        const score = competitor.cum_workout_rank;

        competitors[name] = score;
      }
    });
  fetch(url2)
    .then((response) => response.json())
    .then((data) => {
      const bodyRows = data.data.body_rows;

      for (let i = 0; i < bodyRows.length; i++) {
        const competitor = bodyRows[i][0];
        const name = competitor.competitor_name;
        const score = competitor.cum_workout_rank;

        competitors[name] = score;
      }
      //   console.log(competitors);
    });
}

function score() {
  const scorecard = document.querySelector(".carousel-item.active");
  const scorePeople = scorecard.querySelectorAll(".athlete-card h3");
  let points = 0;
  scorePeople.forEach((person) => {
    points += Number(competitors[person.innerHTML.trim()]);
    // console.log(competitors[person.innerHTML]);
  });
  let newScore = `<h1>Score: ${points}</h1>`;
  scorePlace.innerHTML = newScore;
  //   console.log(scorePlace.innerHTML);
}

// function swipeRight() {
//   const currentCarouselItem = document.querySelector(".carousel-item.active");
//   const currentIndex = carouselItems.indexOf(currentCarouselItem);

//   let nextIndex;

//   if (currentIndex === CAROUSEL_SIZE - 1) {
//     nextIndex = 0;
//   } else {
//     nextIndex = currentIndex + 1;
//   }
//   carouselItems[nextIndex].classList.add("active");
//   navItems[nextIndex].classList.add("active");

//   carouselItems[currentIndex].classList.remove("active");
//   navItems[currentIndex].classList.remove("active");
// }
// const person1 = {
//     name: 'Available',
//     picks: ["TBD"],
//     points: 0
// };

// const person2 = {
//     name: 'Available',
//     picks: ["TBD"],
//     points: 0
// };

// const person3 = {
//     name: 'Available',
//     picks: ["TBD"],
//     points: 0
// };

// const person4 = {
//     name: 'Available',
//     picks: ["TBD"],
//     points: 0
// };

// const draft_pool = [];

// document.addEventListener("DOMContentLoaded", function () {

//     const pooldata = [person1, person2, person3, person4];

//     updatePool(pooldata);

//     getDraftPool();
//     makePool(draft_pool);

//     const form = document.querySelector('.pool-names');
//     // console.log(pooldata);
//     form.addEventListener('submit', (event) => {
//         event.preventDefault();
//         person1.name = document.querySelector('#person1').value;
//         person2.name = document.querySelector('#person2').value;
//         person3.name = document.querySelector('#person3').value;
//         person4.name = document.querySelector('#person4').value;
//         updatePool(pooldata);
//     })

// })

// function updatePool(data) {
//     const draft_body = document.querySelector('#draft-table tbody');
//     draft_body.innerHTML = ""; // Clear any existing rows
//     data.forEach((person) => {
//         const row = draft_body.insertRow();
//         const cell1 = row.insertCell();
//         const cell2 = row.insertCell();
//         cell1.textContent = person.name;
//         cell2.textContent = person.picks;
//     })
// }

// function getDraftPool() {
//     const url1 = "https://compete-strongest-com.global.ssl.fastly.net/api/p/divisions/BFRAAW/leaderboard/?p=1&d=asc";
//     const url2 = "https://compete-strongest-com.global.ssl.fastly.net/api/p/divisions/WGPVFH/leaderboard/?p=1&d=asc";

//     fetch(url1)
//         .then(response => {
//             // Check if the request was successful
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             return response.json(); // Convert the response data to JSON
//         })
//         .then(raw_leaderboard => {

//             const bodyRows = raw_leaderboard.data.body_rows;

//             for (let i = 0; i < bodyRows.length; i++) {
//                 const competitor = bodyRows[i][0];
//                 // console.log(competitor);
//                 const add_data = String(competitor.competitor_name);
//                 console.log(add_data);
//                 draft_pool.push(add_data);
//             }
//             // console.log(draft_pool);
//         })
//     fetch(url2)
//         .then(response => {
//             // Check if the request was successful
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             return response.json(); // Convert the response data to JSON
//         })
//         .then(raw_leaderboard => {

//             const bodyRows = raw_leaderboard.data.body_rows;

//             for (let i = 0; i < bodyRows.length; i++) {
//                 const competitor = bodyRows[i][0];
//                 const add_data = competitor.competitor_name;
//                 draft_pool.push(add_data);
//             }
//             // console.log(draft_pool);
//         })
// }

// function makePool(data) {
//     const draft_pool_body = document.querySelector('#draft-pool tbody');
//     draft_pool_body.innerHTML = ""; // Clear any existing rows
//     console.log(data);

// }

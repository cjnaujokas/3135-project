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

const errorContainer = document.querySelector(".error");

function showError(message) {
  errorContainer.textContent = message;
  if (errorContainer.classList.contains("hidden")) {
    errorContainer.classList.remove("hidden");
  }
}

async function getScores() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }

    const raw_leaderboard = await response.json();

    const bodyRows = raw_leaderboard.data.body_rows;

    for (let i = 0; i < bodyRows.length; i++) {
      const competitor = bodyRows[i][0];
      const name = competitor.competitor_name;
      const score = competitor.cum_workout_rank;

      competitors[name] = score;
    }

    const response2 = await fetch(url2);

    if (!response2.ok) {
      throw new Error("Error: " + response2.statusText);
    }

    const raw_leaderboard2 = await response2.json();

    const bodyRows2 = raw_leaderboard2.data.body_rows;

    for (let i = 0; i < bodyRows2.length; i++) {
      const competitor = bodyRows2[i][0];
      const name = competitor.competitor_name;
      const score = competitor.cum_workout_rank;

      competitors[name] = score;
    }
  } catch (error) {
    showError(error.message);
  }
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

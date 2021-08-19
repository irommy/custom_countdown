const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const datePicker = document.getElementById("date-picker");
const countdown = document.getElementById("countdown");
const countdownTopic = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeEl = document.querySelectorAll("span");
const complete = document.getElementById("complete");
const completeInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// set date input minimum with today's date
const today = new Date().toISOString().split("T")[0];
datePicker.setAttribute("min", today);

// populate countdown
function updateDom() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    //

    // hide input
    inputContainer.hidden = true;

    // if countdown has ended, show complete
    if (distance < 0) {
      countdown.hidden = true;
      clearInterval(countdownActive);
      completeInfo.textContent = ` ${countdownTitle} finished on ${countdownDate}`;
      complete.hidden = false;
    } else {
      // show countdown in progress
      countdownTopic.textContent = `${countdownTitle}`;
      timeEl[0].textContent = `${days}`;
      timeEl[1].textContent = `${hours}`;
      timeEl[2].textContent = `${minutes}`;
      timeEl[3].textContent = `${seconds}`;
      complete.hidden = true;
      countdown.hidden = false;
    }
  }, second);
}

// take valuesfrom our input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    Date: countdownDate,
  };

  localStorage.setItem("countdown", JSON.stringify(savedCountdown));

  // check for valid date
  if (countdownDate === "") {
    alert("Please select a date");
  } else {
    // get number version of current date
    countdownValue = new Date(countdownDate).getTime();

    updateDom();
  }
}
// reset all values
function reset() {
  // hide countdown and show input container
  countdown.hidden = true;
  complete.hidden = true;
  inputContainer.hidden = false;
  // stop the countdown
  clearInterval(countdownActive);
  countdownTitle = "";
  countdownDate = "";
}
function restore() {
  // restore previous countdown if available
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.Date;
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

// event listener
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);
// on load, check local storage
restore();

const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
let countdown;

function displayTimeLeft(seconds) {
  // console.log(seconds);
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;

  timeLeft.textContent = display;
  document.title = display;
}

function displayEndTime(seconds) {
  const time = new Date(seconds);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const display = `Be back at ${hours > 12 ? hours - 12 : hours}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${hours > 12 ? 'PM' : 'AM'}`;

  endTime.textContent = display;
}

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

buttons.forEach(button =>
  button.addEventListener('click', function() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
  })
);

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const seconds = this.minutes.value * 60;

  timer(seconds);
  this.reset();
});

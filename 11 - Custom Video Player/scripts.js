const player = document.querySelector('.player');
const video = player.querySelector('video.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}

function skip() {
  const { skip: time } = this.dataset;
  video.currentTime += parseFloat(time);
}

function handleRangeUpdate(e) {
  const { name, value } = e.target;
  video[name] = value;
}

function handleProgress(e) {
  const { currentTime, duration } = e.target;
  const percent = (currentTime / duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

let rangeFlag = false;
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range =>
  range.addEventListener('mousedown', () => {
    rangeFlag = true;
  })
);
ranges.forEach(range =>
  range.addEventListener('mouseup', () => {
    rangeFlag = false;
  })
);
ranges.forEach(range =>
  range.addEventListener('mousemove', e => {
    if (rangeFlag) {
      handleRangeUpdate(e);
    }
  })
);

let progressFlag = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => {
  progressFlag = true;
});
progress.addEventListener('mouseup', () => {
  progressFlag = false;
});
progress.addEventListener('mousemove', e => {
  if (progressFlag) {
    scrub(e);
  }
});

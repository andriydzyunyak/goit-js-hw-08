import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on(
  'timeupdate',
  throttle(() => {
    player.getCurrentTime().then(seconds => {
      console.log(seconds);
      localStorage.setItem('videoplayer-current-time', JSON.stringify(seconds));
    });
  }, 1000),
);

const toTimeStart = JSON.parse(localStorage.getItem('videoplayer-current-time')) || 0;
console.log(toTimeStart);
player.setCurrentTime(toTimeStart);

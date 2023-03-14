import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const onTimeupdate = function ({ seconds }) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(seconds));
};
const getCurrentTime = function () {
  return JSON.parse(localStorage.getItem('videoplayer-current-time'));
};
const throttledOnTimeupdate = throttle(onTimeupdate, 1000);

player
  .setCurrentTime(getCurrentTime() || 0)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        'the time was less than 0 or greater than the video’s duration';
        break;

      default:
        'some other error occurred';
        break;
    }
  });
player.on('timeupdate', throttledOnTimeupdate);

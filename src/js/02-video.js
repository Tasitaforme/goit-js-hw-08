import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

updateCurrentTimeFromLocalStorage();

player.on("timeupdate", throttle(saveCurrentTimeToLocalStorage, 1000))

function saveCurrentTimeToLocalStorage(e) {
    localStorage.setItem(LOCAL_STORAGE_KEY, e.seconds || 0);
};


function updateCurrentTimeFromLocalStorage(e) {
    const savedCurrentTime = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedCurrentTime) {
        player.setCurrentTime(savedCurrentTime)
    }  
};
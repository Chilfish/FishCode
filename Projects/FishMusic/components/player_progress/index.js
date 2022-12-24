const audio = document.querySelector('#audio'),
  cover = document.querySelector('#cover'),
  name = document.querySelector('#name'),
  artist = document.querySelector('#artist'),
  prev = document.querySelector('#prev'),
  next = document.querySelector('#next'),
  play = document.querySelector('#play'),
  container = document.querySelector('.music-footer');

let song_index = 0,
  song_length = 0,
  music_list = {};

/**
 * 将秒格式化
 * @param {Number} time 要格式化的秒，整数类型
 * @returns {String} 00:00 的形式
 */
function formTime(time) {
  const sec = time % 60,
    min = Math.floor(time / 60);

  const fillZero = (num) => {
    const len = num.toString().length;
    return len === 1 ? `0${num}` : `${num}`;
  };
  return `${fillZero(min)}:${fillZero(sec)}`;
}

/*
 *  */
// 获取歌单
(async () => {
  music_list = await (await fetch('./music.json')).json();
  loadMusic(Math.floor(Math.random() * 6));
  song_length = music_list.music.length;
})();

// 加载音乐
function loadMusic(index) {
  const music = music_list.music[index];
  audio.src = `${music_list.baseUrl}${music.id}`;
  cover.src = `${music.cover}`;
  name.innerHTML = `${music.name}`;
  name.href = `https://music.163.com/#/song?id=${music.id}`;
  artist.innerHTML = `${music.artist}`;
}

//进度条
const progress = document.querySelector('.progressing'),
  curTime = document.querySelector('#now'),
  endTime = document.querySelector('#end');

function update_progress(e) {
  const { duration, currentTime } = e.srcElement;
  progress.style.width = `${(currentTime / duration) * 100}%`;
  curTime.innerHTML = `${formTime(Math.round(currentTime))}`;
  endTime.innerHTML = `${formTime(Math.round(duration))}`;
}

['canplay', 'timeupdate'].forEach((ele) => {
  audio.addEventListener(ele, update_progress);
});

// 拖动进度条
document.querySelector('.progress').addEventListener('click', (e) => {
  const width = e.target.clientWidth,
    clickX = e.offsetX,
    duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// 播放、暂停
function play_song() {
  const icon = play.children[0].classList;

  icon.add('fa-pause'), icon.remove('fa-play');
  container.classList.add('play');
  audio.play();
}
function pause_song() {
  const icon = play.children[0].classList;

  icon.remove('fa-pause'), icon.add('fa-play');
  container.classList.remove('play');
  audio.pause();
}

play.addEventListener('click', () => {
  if (container.classList.contains('play')) {
    pause_song();
  } else {
    play_song();
  }
});

// 上下首
function next_song() {
  song_index++;
  if (song_index > song_length - 1) {
    song_index = 0;
  }
  loadMusic(song_index), play_song();
}

next.addEventListener('click', next_song);
audio.addEventListener('ended', next_song);

prev.addEventListener('click', () => {
  song_index--;
  if (song_index < 0) {
    song_index = song_length - 1;
  }
  loadMusic(song_index), play_song();
});

//切换like的图标

const like = document.querySelector('#like');
like.addEventListener('click', () => {
  const list = like.children[0].classList;
  list.toggle('fa-regular'), list.toggle('fa-solid');
});

/*
 *
 * 音量 */

const volume_con = document.querySelector('.volume'),
  volume_range = document.querySelector('.volume-range'),
  volume_box = document.querySelector('.volume-box'),
  volume_circle = document.querySelector('.volume-circle');

volume_con.addEventListener('mouseenter', () => {
  volume_box.style.visibility = 'visible';
});
volume_con.addEventListener('mouseleave', () => {
  volume_box.style.visibility = 'hidden';
});

volume_range.addEventListener('mousedown', () => {
  volume_range.onmousemove = (e) => {
    const y = 307 - e.clientY,
      height = 88;

    if (y > height) return;
    volume_range.style.setProperty('--height', `${y}px`);

    audio.volume = y / height;
  };
  volume_range.onmouseup = () => {
    volume_range.onmousemove = null;
  };
});

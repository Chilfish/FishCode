import {parseDate} from '../../utils/index.js';
import {api} from '../../socketApi.js';

const socketUrl = 'ws://localhost:3000';
export const socket = await io.connect(socketUrl, {
  query: 'token=' + localStorage.getItem('token'),
});

socket.on('unauthorized', () => {
  setTimeout(() => {
    socket.disconnect();
    window.location = './login.html';
  }, 1000);
});

export const curUser = localStorage.getItem('curUser');
export const chatMain = $('#chat-main');
export const chatList = $('#chat-list');

const chatMes = $('template#chatMes').content.querySelector('section');
const userCard = $('template#userCard').content.querySelector('li');

export function chatRecord(user) {
  return new Promise((resolve, reject) => {
    try {
      chatMain.innerHTML = '';
      $('header .username').innerText = user;

      socket.emit(api.chatRecord, user, (chats) => {
        // console.log(chats);
        chats.forEach((chat) => {
          sendMes(chat.message, chat.receiver, chat.time);
        });

        chatMain.scrollTop = chatMain.scrollHeight;
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function loadList() {
  return new Promise((resolve, reject) => {
    try {
      socket.emit(api.getFriends, curUser, (friends) => {
        let out = '';
        friends.forEach((ele) => {
          const copy = userCard.cloneNode(true);
          copy.dataset.name = ele.name;
          copy.querySelector('a').href = `#/?chatUser=${ele.name}`;

          copy.querySelector('img').src = `/public/img/${ele.face}`;
          copy.querySelector('.username').innerText = ele.name;

          copy.querySelector('.chatDes').innerText = ele.message;

          if (ele.time !== '') {
            copy.querySelector('.last-time').innerText = parseDate(
              ele.time
            ).shortTime;
          }
          out += copy.outerHTML;
        });
        chatList.innerHTML = out;
        resolve();
      });
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * append message to DOM
 * @param message {string} sent message
 * @param receiver {string} receiver name
 * @param time {Date} sent time
 */
export function sendMes(message, receiver, time = new Date()) {
  const mesBox = chatMes.cloneNode(true);
  sendTime(time);

  let pos = 'left';
  if (curUser !== receiver) pos = 'right';

  mesBox.classList.add(pos);
  mesBox.querySelector('p').innerText = message;

  const timeBox = mesBox.querySelector('.time');
  const now = parseDate(time);
  timeBox.innerText = now.shortTime;
  timeBox.dataset.time = now.fullTime;

  $('#chat-main').innerHTML += mesBox.outerHTML;
  chatMain.scrollTop = chatMain.scrollHeight;
}

/**
 * 检查与上次对话的时间间隔，如果大于5分钟，就加上时间泡泡
 */
function sendTime(now) {
  const firstTime = (time) => {
    const parseTime = parseDate(time);
    return `<div class="first-time">${parseTime.shortDate} ${parseTime.shortTime}</div>`;
  };

  const chatTimes = [...$$('#chat-main .time')];

  if (chatTimes.length === 0) {
    chatMain.innerHTML += firstTime(now);
  } else {
    const lastTime = chatTimes.at(-1).dataset.time;
    if (new Date(now) - new Date(lastTime) > 300000) {
      chatMain.innerHTML += firstTime(now);
    }
  }
}

/**
 * update friends list
 * @param message {string} sent message
 * @param receiver {string} receiver name
 * @param time {Date} sent time
 */
export function loadFriendsList(message, receiver, time) {
  const chatCard = $(`#chat-list li[data-name="${receiver}"]`);
  chatList.removeChild(chatCard);
  console.log(message);
  chatCard.querySelector('.chatDes').innerText = message
    .replaceAll('\n', ' ')
    .substring(0, 15);
  chatCard.querySelector('.last-time').innerText = `${
    parseDate(time).shortTime
  }`;

  chatList.innerHTML = chatCard.outerHTML + chatList.innerHTML;
}

export function messageHandler() {
  const mesInput = $('#mes');
  const receiver = $('#chat-box .username').innerText;

  const _sendMes = () => {
    const message = mesInput.value;
    const data = {receiver, message};
    const check = new Set(message);
    if ((check.size === 1 && check.has('\n')) || !check.size) {
      return;
    }

    socket.emit(api.sendMessage, data, (time) => {
      sendMes(message, receiver, time);
      loadFriendsList(message, receiver, time);
      mesInput.value = '';
    });
  };

  socket.on(api.message, (chat) => {
    chat = chat.data;
    // console.log(chat);
    sendMes(chat.message, chat.receiver, chat.time);
    loadFriendsList(chat.message, receiver, chat.time);
  });

  mesInput.oninput = function () {
    this.style.height = '';
    let height = this.scrollHeight + this.offsetHeight - this.clientHeight;
    this.style.height = height + 'px';
    chatMain.scrollTop = chatMain.scrollHeight;
  };

  $('#send').onclick = () => _sendMes();
  let prev = '';
  mesInput.onkeydown = function (e) {
    if (e.key === 'Enter' && prev === 'Control') {
      this.style.height = '';
      _sendMes();
    }
    prev = e.key;
  };
}

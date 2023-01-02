import {parseDate} from '../../utils/index.js';

const baseUrl = 'http://127.0.0.1:8080/src/data';

const socketUrl = 'ws://localhost:3000';

export const socket = io.connect(socketUrl, {
  query: 'token=' + localStorage.getItem('token'),
});

export const curUser = localStorage.getItem('curUser');
export const chatMain = $('#chat-main');

const chatMes = $('template#chatMes').content;
const userCard = $('template#userCard').content.querySelector('li');

export class loadData {
  async chatRecord(user) {
    const section = chatMes.querySelector('section');
    const chatMain = $('#chat-main');

    $('header .username').innerText = user;

    return await (await fetch(`${baseUrl}/${user}.json`))
      .json()
      .then((res) => {
        let ans = '';

        ans += firstTime(res[0].date);
        res.forEach((ele) => {
          const copy = section.cloneNode(true);
          copy.classList.add(ele.isOwn ? 'right' : 'left');
          copy.querySelector('p').innerText = ele.mes;

          const timer = copy.querySelector('.time'),
            time = parseDate(ele.date);

          timer.innerText = time.shortTime;
          timer.dataset.time = time.full;

          ans += copy.outerHTML;
        });

        chatMain.innerHTML = ans;
      });
  }

  async userList() {
    return await (await fetch(`${baseUrl}/all.json`)).json().then((res) => {
      const data = res.people;
      data.forEach((ele) => {
        const copy = userCard.cloneNode(true);
        const a = copy.querySelector('a');
        a.href = `#/?user=${ele.name}`;
        a.dataset.name = ele.name;

        copy.querySelector('img').src = `/public/img/${ele.face}`;
        copy.querySelector('.username').innerText = ele.name;

        const time = parseDate(ele.lastTime);

        copy.querySelector('.last-time').innerText = time.shortTime;
        copy.querySelector('.chatDes').innerText = ele.des;

        $('#chat-list').innerHTML += copy.outerHTML;
      });
    });
  }

}

/**
 * send message
 * @param {string} text the text to be sent
 * @param {Date} time time of message sent
 * @param {string} pos the position of chat bubble, default at right side
 */
export function sendMes(text, time = new Date(), pos = 'right') {
  const mesBox = $('template#chatMes')
    .content.querySelector('section')
    .cloneNode(true);

  sendTime(time);

  mesBox.classList.add(pos);
  mesBox.querySelector('p').innerText = text;

  const timeBox = mesBox.querySelector('.time');
  const now = parseDate(time);
  timeBox.innerText = now.shortTime;
  timeBox.dataset.time = now.full;

  $('#chat-main').innerHTML += mesBox.outerHTML;
}

/**
 * 检查与上次对话的时间间隔，如果大于5分钟，就加上时间泡泡
 */
function sendTime(now) {
  const lastTime = [...$$('#chat-main .time')].at(-1).dataset.time;

  if (new Date(now) - new Date(lastTime) > 300000) {
    chatMain.innerHTML += firstTime(now);
  }
}

/**
 * the time of first chat
 * @param {Date | string} time time of sent
 * @returns template of 'time bubble'
 */
export function firstTime(time) {
  const parseTime = parseDate(time);
  return `<div class="first-time">${parseTime.shortTime}</div>`;
}

/**
 * update chat list
 * @param {string} chatUser current chatting user
 * @param {string} text last chatting text
 * @param {Date} time last chatting time
 */
export function loadChatList(chatUser, text, time = new Date()) {
  const chatCard = $(`#chat-list a[data-name="${chatUser}"]`);
  const parseTime = parseDate(time);

  chatCard.querySelector('.chatDes').innerText = text;
  chatCard.querySelector('.last-time').innerText = `${parseTime.shortTime}`;
}

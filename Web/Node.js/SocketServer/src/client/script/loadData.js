'use strict';

/**
 * @param {string} e element
 * @returns {Element | null}
 */
const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);
const baseUrl = 'http://127.0.0.1:8080/src/data';

class loadChat {
  constructor(user) {
    this.user = user;
    this.chatMes = $('template#chatMes').content;
  }

  async load() {
    const section = this.chatMes.querySelector('section');
    const chatMain = $('#chat-main');

    $('header .username').innerText = this.user;

    return await (await fetch(`${baseUrl}/${this.user}.json`))
        .json()
        .then((res) => {
          let ans = '';

          ans += firstTime(res[0].date);
          res.forEach((ele) => {
            const copy = section.cloneNode(true);
            copy.classList.add(ele.isOwn ? 'right' : 'left');
            copy.querySelector('p').innerText = ele.mes;

            const time = copy.querySelector('.time');
            time.innerText = ele.date.substring(11, 16);
            time.dataset.time = ele.date;

            ans += copy.outerHTML;
          });

          chatMain.innerHTML = ans;
        });
  }
}

class loadUser {
  async load() {
    const userCard = $('template#userCard').content.querySelector('li');

    return await (await fetch(`${baseUrl}/all.json`)).json().then((res) => {
      const data = res.people;
      data.forEach((ele) => {
        const copy = userCard.cloneNode(true);
        const a = copy.querySelector('a');
        a.href = `#/?user=${ele.name}`;
        a.dataset.name = ele.name;

        copy.querySelector('img').src = `/public/img/${ele.face}`;
        copy.querySelector('.username').innerText = ele.name;
        copy.querySelector('.last-time').innerText = ele.lastTime.substring(
            5,
            16,
        );
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
function sendMes(text, time = new Date(), pos = 'right') {
  const mesBox = $('template#chatMes')
      .content.querySelector('section')
      .cloneNode(true);
  mesBox.classList.add(pos);
  mesBox.querySelector('p').innerText = text;

  const timeBox = mesBox.querySelector('.time');
  const now = time.toLocaleString();
  timeBox.innerText = now.substring(11, 16);
  timeBox.dataset.time = now;

  $('#chat-main').innerHTML += mesBox.outerHTML;
}

/**
 * 检查与上次对话的时间间隔，如果大于5分钟，就加上时间泡泡
 */
function sendTime(now) {
  const lastTime = [...$$('#chat-main .time')].at(-1)
      .dataset.time;

  if (new Date(now) - new Date(lastTime) > 300000) {
    chatMain.innerHTML += firstTime(now);
  }
}

/**
 * the time of first chat
 * @param {Date | string} time time of sent
 * @returns template of 'time bubble'
 */
function firstTime(time) {
  time = new Date(time).toLocaleString().substring(5, 16);
  return `<div class="first-time">${time}</div>`;
}

/**
 * update chat list
 * @param {string} chatUser current chatting user
 * @param {string} text last chatting text
 * @param {Date} time last chatting time
 */
function loadChatList(chatUser, text, time = new Date()) {
  const chatCard = $(`#chat-list a[data-name="${chatUser}"]`);

  chatCard.querySelector('.chatDes').innerText = text;
  chatCard.querySelector('.last-time').innerText = time
      .toLocaleString()
      .substring(5, 16);
}

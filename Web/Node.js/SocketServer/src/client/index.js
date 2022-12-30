'use strict';

const chatList = $('.chat-list');
const chatBox = $('#chat-box');
const chatMain = $('#chat-main');
let peoples;

const active = 'active';
const phoneWidth = 640;

function backHome() {
  chatBox.classList.remove('phone-chat');
  chatBox.classList.add('hidden');
}
function toChat() {
  chatBox.classList.add('phone-chat');
  chatBox.classList.remove('hidden');
}

function changeChat() {
  peoples.forEach((ele) => {
    ele.onclick = () => {
      const user = ele.dataset.name;
      new loadChat(user);

      if (document.body.offsetWidth <= phoneWidth) {
        toChat();
      } else {
        $(`a.${active}`)?.classList.toggle(active);
        ele.classList.toggle(active);
      }
    };
  });
}

$('.back').onclick = () => {
  backHome();
  let url = document.URL;
  const index = url.indexOf('#');
  if (index) {
    url = url.substring(0, index);
    history.pushState(null, null, url);
  }
};

window.onhashchange = (e) => {
  const url = new URL(e.newURL);
  if (url.hash === '') {
    backHome();
  }
};

(async () => {
  let t = new loadUser();
  await t.load();

  peoples = $$('.chat-list a');
  changeChat();

  const url = new URL(document.URL);
  if (url.hash !== '') {
    const query = new URL(url.href.replace('#/', '')).searchParams;
    const user = query.get('user');
    new loadChat(user);
    // console.log(user);

    if (document.body.offsetWidth <= phoneWidth) {
      toChat();
    } else {
      peoples.forEach((ele) => {
        if (ele.dataset.name === user) {
          ele.classList.add(active);
          return;
        }
      });
    }
  }
})();

const input = $('#mes');
const _sendMes = () => {
  const text = input.value;

  sendTime();
  sendMes(text);
  loadChatList($('#chat-box .username').innerText, text);

  input.value = '';
  chatMain.scrollTop = chatMain.scrollHeight;
};

input.onkeydown = (e) => {
  if (e.key === 'Enter') _sendMes();
};
$('#send').onclick = () => _sendMes();

/**
 * 检查与上次对话的时间间隔，如果大于5分钟，就加上时间泡泡
 */
function sendTime() {
  const now = new Date();
  const lastTime = [...document.querySelectorAll('#chat-main .time')].at(-1)
    .dataset.time;

  if (now - new Date(lastTime) > 300000) {
    chatMain.innerHTML += firstTime(now);
  }
}

'use strict';

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
    ele.onclick = async () => {
      const user = ele.dataset.name;
      await new loadChat(user).load();

      if (document.body.offsetWidth <= phoneWidth) {
        toChat();
      } else {
        $(`a.${active}`)?.classList.toggle(active);
        ele.classList.toggle(active);
      }
    };
  });
}

async function refreshLoad() {
  const url = new URL(document.URL);
  if (url.hash !== '') {
    const query = new URL(url.href.replace('#/', '')).searchParams;
    const user = query.get('user');

    await new loadChat(user).load();

    if (document.body.offsetWidth <= phoneWidth) {
      toChat();
    } else {
      peoples.forEach((ele) => {
        if (ele.dataset.name === user) {
          ele.classList.add(active);
        }
      });
    }
  }
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
  await new loadUser().load();
  peoples = $$('#chat-list a');

  changeChat();
  await refreshLoad();
})();

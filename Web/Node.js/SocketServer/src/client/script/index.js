import { loadChat, loadUser } from './loadData.js';
import { socket } from './loadData.js';

const chatBox = $('#chat-box');
const chatList = $('#chat-list');
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

/**
 * User search handler
 */

const searchInput = $('#search'),
  searchBtn = $('#search-btn'),
  cancelBtn = $('#cancel-btn'),
  searchRes = $('#search-res');

async function searchUser() {
  const value = searchInput.value;

  socket.emit('search', value, (res) => {
    const user = res.userInfo;
    console.log(res);
    searchRes.querySelector('img').src = '/public/img/' + user.face;
    searchRes.querySelector('.username').innerText = user.name;

    chatList.classList.add('hidden');
    searchRes.classList.remove('hidden');
    cancelBtn.classList.remove('hidden');
  });

  cancelBtn.onclick = () => {
    chatList.classList.remove('hidden');
    searchRes.classList.add('hidden');
    cancelBtn.classList.add('hidden');

    searchInput.value = '';
  };
}

searchInput.onkeydown = (e) => {
  if (e.key === 'Enter') searchUser();
  cancelBtn.classList.remove('hidden');
};
searchBtn.onclick = () => searchUser();

/**
 * while windows refresh
 */
(async () => {
  await new loadUser().load();
  peoples = $$('#chat-list a');

  changeChat();
  await refreshLoad();
})();

import {curUser, loadData} from './loadData.js';
import {socket} from './loadData.js';

const chatBox = $('#chat-box');
const chatList = $('#chat-list');
let peoples;

const active = 'active';
const phoneWidth = 640;
const load = new loadData();

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
      await load.chatRecord(user);

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

    await load.chatRecord(user);

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

/**
 * watch URL change
 */
function URLHandler() {
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
}

/**
 * User search handler
 */
function searchHandler() {
  const searchInput = $('#search'),
    searchBtn = $('#search-btn'),
    cancelBtn = $('#cancel-btn'),
    searchRes = $('#search-res'),
    addBtn = $('#add-btn'),
    notFound = $('#search-404');

  const ableList = () => {
    chatList.classList.remove('hidden');
    searchRes.classList.add('hidden');
    cancelBtn.classList.add('hidden');
    notFound.classList.add('hidden');
  };

  async function searchUser() {
    const value = searchInput.value;
    notFound.classList.add('hidden');
    searchRes.classList.add('hidden');

    if (value === '') {
      ableList();
      return;
    }

    socket.emit('search', value, (res) => {
      console.log(res);
      if (res.mes === 200) {
        const user = res.userInfo;
        searchRes.querySelector('img').src = '/public/img/' + user.face;
        searchRes.querySelector('.username').innerText = user.name;

        searchRes.classList.remove('hidden');
        addBtn.disabled = user.name === curUser;
      } else if (res.mes === 404) {
        notFound.classList.remove('hidden');
      }
    });

    chatList.classList.add('hidden');
    cancelBtn.classList.remove('hidden');
  }

  searchInput.onkeydown = async (e) => {
    if (e.key === 'Enter') await searchUser();
  };
  searchBtn.onclick = () => searchUser();

  cancelBtn.onclick = () => {
    ableList();
    searchInput.value = '';
  };
}

/**
 * while windows refresh
 */
(async () => {
  URLHandler();

  await load.userList();
  peoples = $$('#chat-list a');

  await refreshLoad();
  changeChat();
  searchHandler();

  socket.emit('chatRecord', 'OrganicFish');
})();

import { api } from '../../socketApi.js';
import {
  chatList,
  chatMain,
  chatRecord,
  curUser,
  loadList,
  messageHandler,
  socket,
} from './loadData.js';

const chatBox = $('#chat-box');
let friends;

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
  friends.forEach((ele) => {
    ele.onclick = async () => {
      const user = ele.dataset.name;
      await chatRecord(user);

      socket.emit(api.join, user);
      messageHandler();

      if (document.body.offsetWidth <= phoneWidth) {
        toChat();
      } else {
        chatList.querySelector(`a.${active}`)?.classList.toggle(active);
        ele.querySelector(`a`).classList.toggle(active);
      }
    };
  });
}

async function refreshLoad() {
  const url = new URL(document.URL);
  if (url.hash !== '') {
    const query = new URL(url.href.replace('#/', '')).searchParams;
    const user = query.get('chatUser');

    await chatRecord(user);
    socket.emit(api.join, user);
    messageHandler();
    chatMain.scrollTop = chatMain.scrollHeight;

    if (document.body.offsetWidth <= phoneWidth) {
      toChat();
    } else {
      friends.forEach((ele) => {
        if (ele.dataset.name === user) {
          ele.querySelector('a').classList.add(active);
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
      const user = res.userInfo;
      if (res.mes === 200) {
        if (res.isFriend || user.name === curUser) {
          addBtn.disabled = true;
          addBtn.innerText = 'added';
        } else {
          addBtn.disabled = false;
          addBtn.innerText = 'add';
        }

        searchRes.querySelector('img').src = '/public/img/' + user.face;
        searchRes.querySelector('.username').innerText = user.name;

        searchRes.classList.remove('hidden');
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

  addBtn.onclick = (e) => {
    const user = e.target.offsetParent.querySelector('.username').innerText;

    // socket.emit(api.addReq, user, (res) => {
    //   console.log(res);
    // });
    socket.emit(api.addFriend, user, (res) => {
      if (res.mes === 200) {
        setTimeout(async () => {
          ableList();
          await loadList();
        }, 1000);
      }
    });
  };
}

function logoutHandler() {
  $('#logout-btn').onclick = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('curUser');

      socket.close();
      window.location = './login.html';
    } catch (err) {
      console.error(err);
    }
  };

  $('#more-btn').onclick = () => $('#more-page').classList.toggle('hidden');
}

/**
 * while windows refresh
 */
(async () => {
  await loadList().then(() => {
    friends = $$('#chat-list li');
  });

  await refreshLoad();
  URLHandler();
  changeChat();

  searchHandler();
  logoutHandler();
})();

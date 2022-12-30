const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);

const chatList = $('.chat-list');
const peoples = $$('.chat-list a');
const chatMain = $('.chat-main');

const active = 'active';
const phoneWidth = 640;

peoples.forEach((ele) => {
  ele.onclick = () => {
    $(`a.${active}`).classList.remove(active);
    ele.classList.add(active);

    if (document.body.offsetWidth < phoneWidth) {
      chatMain.classList.add('phone-chat');
      chatMain.classList.remove('hidden');
    }
  };
});

$('.back').onclick = () => {
  chatMain.classList.remove('phone-chat');
  chatMain.classList.add('hidden');
};

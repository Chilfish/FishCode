'use strict';

const socketUrl = 'ws://localhost:3000';
const socket = io.connect(socketUrl, { transports: ['websocket'] });

const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);

const username = $('#username');
const form = $('form');

function submit() {
  const name = username.value;

  socket.emit('login', { name }, (res) => {
    console.log(res);
    if (res.mes === 200) {
      window.location = '../client/';
    }
  });
}

form.onsubmit = $('#submit').onclick = () => submit();
username.onkeydown = (e) => {
  if (e.key === 'Enter') submit();
};

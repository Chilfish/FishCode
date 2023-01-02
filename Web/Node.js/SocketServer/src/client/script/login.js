'use strict';

const socketPort = 3000;

const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);

const username = $('#username');
const form = $('form');

async function submit() {
  const name = username.value;

  await (
    await fetch(`http://localhost:${socketPort}/login`, {
      body: JSON.stringify({name}),
      headers: {'content-type': 'application/json'},
      method: 'POST',
    })
  )
    .json()
    .then((res) => {
      localStorage.setItem('token', res);
      localStorage.setItem('curUser', name);

      window.location = '../client/';
    });
}

form.onsubmit = $('#submit').onclick = () => submit();
username.onkeydown = (e) => {
  if (e.key === 'Enter') submit();
};

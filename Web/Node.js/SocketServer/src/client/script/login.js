'use strict';

const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);

const username = $('#username');
const form = $('form');
const url = 'http://localhost:3000';

const config = (data) => {
  return {
    body: JSON.stringify(data),
    headers: { 'content-type': 'application/json' },
    method: 'POST',
  };
};

async function submit() {
  const name = username.value;

  await (await fetch(`${url}/login`, config({ name, register: false })))
    .json()
    .then(async (res) => {
      let thisToken = res.token;
      if (res.newUser) {
        if (confirm('username not found, sure continue to register?')) {
          await (await fetch(`${url}/login`, config({ name, register: true })))
            .json()
            .then((res) => {
              thisToken = res.token;
            });
        } else {
          username.value = '';
          return;
        }
      }
      localStorage.setItem('token', thisToken);
      localStorage.setItem('curUser', name);

      window.location = '../client/';
    });
}

form.onsubmit = $('#submit').onclick = () => submit();
username.onkeydown = (e) => {
  if (e.key === 'Enter') submit().then();
};

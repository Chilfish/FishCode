'use strict';

const socketUrl = 'ws://localhost:3000';
const socket = io.connect(socketUrl, { transports: ['websocket'] });

const input = $('#mes');
const _sendMes = () => {
  const text = input.value;
  const now = new Date().toLocaleString();

  const data = {
    id: socket.id,
    text,
    time: now,
  };

  socket.emit('message', data);

  sendTime(now);
  sendMes(text);
  loadChatList($('#chat-box .username').innerText, text);

  input.value = '';
  chatMain.scrollTop = chatMain.scrollHeight;
};

input.onkeydown = (e) => {
  if (e.key === 'Enter') _sendMes();
};
$('#send').onclick = () => _sendMes();

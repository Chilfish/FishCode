import {
  sendMes,
  sendTime,
  loadChatList,
  chatMain,
  socket,
} from './loadData.js';
import { parseDate } from '../../utils/index.js';

const mesInput = $('#mes');
const _sendMes = () => {
  const text = mesInput.value;
  const now = parseDate(new Date());

  const data = {
    id: socket.id,
    text,
    time: now,
  };

  socket.emit('message', data);

  sendTime(now.full);
  sendMes(text);
  loadChatList($('#chat-box .username').innerText, text);

  mesInput.value = '';
  chatMain.scrollTop = chatMain.scrollHeight;
};

mesInput.onkeydown = (e) => {
  if (e.key === 'Enter') _sendMes();
};
$('#send').onclick = () => _sendMes();

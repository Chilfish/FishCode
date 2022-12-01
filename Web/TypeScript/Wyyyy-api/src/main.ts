/*
import { getQRKey } from './api/pa';

const getQRCodeKey = async () => {
  const param = {
    timestamp: new Date().getTime(),
  };
  return getQRKey(param).then(async (res) => {
    if (res.data.code === 200) {
      return res.data.data.unikey;
    }
  });
};

const key = await getQRCodeKey();

console.log(key);

*/

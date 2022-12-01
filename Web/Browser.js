const xhr = new XMLHttpRequest();
const url =
  'https://fanyi-api.baidu.com/api/trans/vip/translate?q=query&from=en&to=zh&appid=20221028001422420&salt=1666963994562&sign=bdf8e512dba35f2aca92743c3fdd010c';

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      const response = xhr.response;
      console.log(response);
    } else {
      const error = xhr.status + xhr.statusText;
      console.error(error);
    }
  }
};

const headers = {
  Host: 'fanyi-api.baidu.com',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:107.0) Gecko/20100101 Firefox/107.0',
  Accept: 'application/json, text/plain, */*',
  'Accept-Encoding': 'gzip, deflate, br',
  Cookie:
    'BAIDUID=CB301933C2A73BF7DB884A15BF7DDAAD:FG=1; expires=Sat, 28-Oct-23 14:33:13 GMT; max-age=31536000; path=/; domain=.baidu.com; version=1',
  referer: 'fanyi-api.baidu.com',
};

xhr.open('GET', url, true);
Object.entries(headers).forEach((ele) => {
  xhr.setRequestHeader(ele[0], ele[1]);
});
xhr.send();

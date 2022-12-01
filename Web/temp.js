/*
 * 
{
  const os = require('os'),
    ips = Object.values(os.networkInterfaces())[0];
  let ans = ips.find((ele) => ele.family === 'IPv4').address;
  console.log(`http://${ans}:2333/web`);
}
*/

/* 
* 尝试爬RSS

const http = require('https'),
  fs = require('fs'),
  url = 'https://innei.ren/feed',
  files = 'Web/rss.xml';

http
  .get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      fs.writeFile(files, data, (err) => {
        if (err) throw err;
        console.log('RSS data is saved.');
      });
    });
  })
  .on('error', (e) => console.log(e));
*/

/*
 * ES6 的异步函数

function getApi(success, delay = 1000) {
  const mes = {
    suc: 'success',
    fail: 'fail',
  };
  return new Promise((resolve, rejects) => {
    console.log('getting getApi');
    setTimeout(() => {
      success ? resolve(mes.suc) : rejects(mes.fail);
    }, delay);
  });
}

async function action() {
  try {
    const mes = await getApi(true);
    console.log('async got!', mes);
  } catch (e) {
    console.log('async ??', e);
  }
}

getApi(true)
  .then((mes) => {
    console.log('then got!', mes);
  })
  .catch((mes) => {
    console.log('catch ??', mes);
  });
action();

(async () => {
  const a = await getApi(1, 2000); //运行后2秒得到a
  console.log(a);
  const b = await getApi(22, 5000); //在得到a的5秒后才得到b
  console.log(b);

  setTimeout(() => {
    console.log(a + b); //得到b的1秒后才有a+b
  }, 1000);
})();
*/

/*
 * 

{
  const arr = [
    "2022-06-10",
    "2022-06-11",
    "2022-06-12",
    "2022-06-13",
    "2022-06-14",
    "2022-06-15",
    "2022-06-16",
  ];

  const dates = [];
  for (let i = 0; i < 20; ++i) {
    const time = new Date(new Date() - i * 24 * 3600 * 1000);
    dates.push(time.toJSON().slice(0, 10));
  }

  const ans = dates.filter((ele) => {
    return !arr.includes(ele);
  });
  console.log(ans);
}
 */

/*
 * 分享到微博

function Share(url, title) {
  url = encodeURIComponent(url);
  title = encodeURIComponent(title);
  const result = `https://service.weibo.com/share/share.php?url=${url}&title=${title}`;
  console.log(result);
}

const baseUrl = 'https://www.bilibili.com/video/';
const BV = 'BV1aP41157cm';
Share(baseUrl + BV, '好诶是考拉！');
 */

/*
 * 应该是空教室导出 

var t = document.querySelectorAll('table')[3].children[0].children,
  pos = document.querySelectorAll('table')[2].children[0].children[0].innerText;
arr = [[], [], [], [], [], []];

[...t].forEach((tr, itr, trarr) => {
  itr &&
    [...tr.children].forEach((td, itd) => {
      if (![0, 1, 7, 8].includes(itd) && !/人数/.test(td.innerHTML)) {
        var times = tr.children[0].innerText;
        if (itr % 2 == 0) {
          times = trarr[itr - 1].children[0].innerText;
        }
        times = times.replace(/\n/, '');

        arr[itd - 1].push({
          时间: times,
          第几节: itr,
        });
      }
    });
});

console.log(pos);
console.table(arr);
*/

/*
 * 一些自定义的 TemperMonkey 脚本 

(function () {
  'use strict';
  // 改样式
  {
    const css = document.createElement('style');
    if (document.URL.includes('https://cn.bing.com/dict/search')) {
      // 必应词典内容居中
      css.innerHTML =
        '.lf_area{width: auto;} .se_li1{max-width: 100vw;}.sidebar{display:none;}';
    } else if (document.URL.includes('www.zhihu.com')) {
      // 知乎内容居中
      css.innerHTML = '.Topstory-mainColumn{width: 900px;margin:0 auto;}';
    } else if (document.URL.includes('t.bilibili.com')) {
      // B站首页
      css.innerHTML =
        'aside section.sticky{top:60px;} aside.right{display:none}main{margin:0 20px;width:640px}';
    }
    // 火狐全局细滚动条
    css.innerHTML +=
      '*{scrollbar-color: #d5d5d5 transparent; scrollbar-width: thin!important; }a:focus{outline: none;}';
    document.head.append(css);
  }
  // 屏蔽必应搜索的广告
  {
    if (document.URL.includes('https://cn.bing.com/search')) {
      [...document.querySelectorAll('.b_algo')].forEach((ele) => {
        if (ele.children[0].tagName === 'H2') {
          ele.style.display = 'none';
        }
      });
    }
  }
})();
*/

/*
* 

function a(value, time, callback) {
  setTimeout(() => {
    value += 100;
    callback(value);
  }, time);
}

function c(data) {
  setTimeout(() => {
    data += 100;
  }, 1000);
  return data;
}

let aa = 23;
// console.log(c(aa));

a(aa, 6000, (data) => {
  console.log(data);
});
a(aa, 3000, (data) => {
  console.log(data);
});
a(aa, 1000, (data) => {
  console.log(data);
});
a(aa, 1000, (data) => {
  console.log(1234);
});

const bt = document.querySelector('.bt');

bt.onclick
 */

/*
* 大物实验……
const log = console.log;
// /**
//  * @param {number} value
//  * @param {number} n
// 
const fix = (value, n = 4) => {
  return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
};

// /**
//  * @param {number[]} data
//  
function badData(data) {
  let len = data.length - 1;
  const initLen = len;
  const Cn = 1.73;
  const avg = fix(data.reduce((a, b) => a + b) / len, 3);
  const SD = fix(
    Math.sqrt(
      data.reduce((a, b) => {
        return a + Math.pow(b - avg, 2);
      }) /
        (len - 1)
    )
  );
  log(avg, SD);
  const range = {
    min: fix(avg - Cn * SD),
    max: fix(avg + Cn * SD),
  };
  log(range);

  for (let i = 1; i <= len; ++i) {
    if (data[i] > range.max || data[i] < range.min) {
      console.error(`bad data: ${data[i]}, in: ${i}`);
      data.splice(i, 1);
      --len;
    }
  }

  const result = { data, avg, SD, len, mes: true };
  if (initLen !== len) {
    result.mes = false;
  }
  return result;
}

const arr = [0, 5.965, 5.961, 5.968, 5.964, 5.961, 5.962];
let result = badData(arr);

while (result.mes !== false) {
  result = badData(result.data);
}
log(result);

const { data, avg, SD, len } = { ...result };

const Ua = fix(SD / Math.sqrt(len)),
  Ub = fix(0.004 / Math.sqrt(3));

const Ud = fix(Math.sqrt(Ua * Ua + Ub * Ub), 3);

const ans = `D = ${avg}+_${Ud} mm (P = 68.3%)
E(D) = ${Ud / avg}`;

log(`Ua: ${Ua}, Ub: ${Ub}`);

log(ans);
 */

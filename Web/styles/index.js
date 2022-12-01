//* 懒得分了就都堆在一起，试图用代码块来代替函数））

/*
 * 时钟 */ {
  class Clock {
    constructor({ template }) {
      this.template = template;
    }
    render() {
      let date = new Date();

      let hours = date.getHours();
      if (hours < 10) hours = '0' + hours;
      let mins = date.getMinutes();
      if (mins < 10) mins = '0' + mins;
      let secs = date.getSeconds() + 1;
      if (secs < 10) secs = '0' + secs;

      let output = this.template
        .replace('h', hours)
        .replace('m', mins)
        .replace('s', secs);
      document.getElementById('clock').innerHTML = output;
    }
    start() {
      this.render();
      setInterval(() => this.render(), 1000);
    }
  }
  let clock = new Clock({ template: 'h : m : s' });
  clock.start();
}

/*
 * 点击切换 */
{
  const toggleElements = document.querySelectorAll('div');
  toggleElements.forEach((el) => {
    el.addEventListener('click', function () {
      this.classList.toggle('active');
    });
  });
}

/*
 * 当前坐标 */
{
  window.addEventListener('scroll', () => {
    showScroll.innerHTML = window.pageYOffset + 'px';
  });
}

/*
 *  */
{
  const img = document.querySelector('img');
  img.addEventListener('mousedown', mouseHandler);
  function mouseHandler(e) {
    e.preventDefault();
  }
}

/*
 *  */
{
  const countdown = {
    domList: document.querySelectorAll('.jstime'),
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : '0' + n;
    },
    setTime(dom) {
      const leftTime =
        new Date(dom.getAttribute('data-time').replace(/\-/g, '/')) -
        new Date();
      if (leftTime >= 0) {
        const d = Math.floor(leftTime / 1000 / 60 / 60 / 24),
          h = Math.floor((leftTime / 1000 / 60 / 60) % 24),
          m = Math.floor((leftTime / 1000 / 60) % 60),
          s = Math.floor((leftTime / 1000) % 60);
        let e_h = h < 10 ? '0' + h : h,
          e_m = m < 10 ? '0' + m : m,
          e_s = s < 10 ? '0' + s : s;

        dom.innerHTML = '拼单剩余 ' + e_h + '时' + e_m + '分' + e_s + '秒';
      } else {
        clearInterval(dom.$timer);
        dom.innerHTML = '拼单已结束';
      }
    },
    start() {
      this.domList.forEach((dom) => {
        this.setTime(dom);
        dom.$timer = setInterval(() => {
          this.setTime(dom);
        }, 1e3);
      });
    },
  };
  countdown.start();
}

/*
 *  */
{
  let canvas = null,
    context = null,
    time = 0;

  const makeNoise = function () {
    let imgd = context.createImageData(canvas.width, canvas.height),
      pix = imgd.data;

    for (let i = 0, n = pix.length; i < n; i += 4) {
      let c = 7 + Math.sin(i / 50000 + time / 7); // A sine wave of the form sin(ax + bt)
      pix[i] = pix[i + 1] = pix[i + 2] = 40 * Math.random() * c; // Set a random gray
      pix[i + 3] = 255; // 100% opaque
    }

    context.putImageData(imgd, 0, 0);
    time = (time + 1) % canvas.height;
  };

  const setup = function () {
    canvas = document.getElementById('myCanvas0');
    context = canvas.getContext('2d');
  };

  setup();
  intervalId = setInterval(makeNoise, 50);
}

/*
 *  */
{
  const data = [
    { id: '01', value: 123 },
    { id: '02', value: 234 },
  ];
  const tmp = (data) =>
    `<table><tr><th>id</th><th>value</th></tr>
                        ${data
                          .map(
                            (addr) =>
                              `<tr><td>${addr.id}</td><td>${addr.value}</td></tr>`
                          )
                          .join('')}
                    </table>`;

  document.querySelector('#tables').innerHTML = tmp(data);
}

/*
  * 
  
  */

{
  $('#btn').click(function () {
    const $content = $('#txt').val().replace(/</gm, '&lt;');
    if (!$content.trim().length) return;
    $('#txt').val('');

    const $li = $(`<div class="content">${$content}</div>`).prependTo($('#ul')),
      $btns = $('<div class="btns"></div>');

    $('<button>删除</button>')
      .appendTo($btns)
      .click(function () {
        $(this).parent().parent().remove();
      });
    $('<button>展开</button>')
      .appendTo($btns)
      .click(function () {
        $(this).parent().parent().css('height', 'auto');
      });
    $btns.appendTo($li);
  });
}

/*
 *  */
{
  // 点击最上面的全选按钮，控制下面的按钮状态
  $('#check_all').click(function () {
    // 获取全选按钮的 checked属性
    let $status = $(this).prop('checked');
    // 将全选按钮的属性值赋值给下面每一个的按钮的属性
    $('#check_dan input').prop('checked', $status);
  });

  // 点击下面的按钮控制全选按钮
  $('#check_dan input').click(function () {
    // 点击下面的按钮时，获取到被选中的选择框的个数
    let $cLength = $('#check_dan input:checked').length;

    // 获取下面按钮的整个个数
    let $allLength = $('#check_dan input').length;

    // 当选中的个数等于总个数的时候，全选按钮也应该被选中，否则就不选中
    // 只有当 $cLength == $allLength 返回true时 check_all 才会被选中
    $('#check_all').prop('checked', $cLength === $allLength);
  });
}

/*
 *  */
{
  const wjx_k = '☆',
    wjx_s = '★';
  // 1- 给所有的li注册鼠标经过事件，让自己和自己之前所有的兄弟元素变成实心的五角星
  $('.comment>li').on('mouseenter', function () {
    $(this).text(wjx_s).prevAll().text(wjx_s);
    $(this).nextAll().text(wjx_k);
  });
  // 2- 给ul注册鼠标离开事件，让所有的li变成空心的五角心
  $('.comment').on('mouseleave', function () {
    $(this).children().text(wjx_k);

    // 4- 找到点击的带有current类的那个li，让它自己和前面的li变成实心的
    $('li.current').text(wjx_s).prevAll().text(wjx_s);
  });

  // 3- 给li注册点击事件
  $('.comment>li').on('click', function () {
    // 给点击的li 添加一个类，其他的兄弟元素移除这个类
    $(this).addClass('current').siblings().removeClass('current');
  });
}

/*
 * 回到顶部 */
{
  // 监测滚动条位置
  $(window).on('scroll', function () {
    // 当滚动到位置大于等于500的时候 图片按钮显示

    if ($(window).scrollTop() >= 500) {
      $('#top').stop().fadeIn(100);
    } else {
      // 否则隐藏掉
      $('#top').stop().fadeOut(100);
    }
  });

  // 点击回到顶部
  $('#top').on('click', function (e) {
    // console.log(e );
    $('html,body').stop().animate(
      {
        scrollTop: 0,
      },
      500
    );
  });
}
/*
 * 弹幕系统 */
{
  const colorArr = [
    '#FF895D',
    '#78BBE6',
    '#FF4273',
    '#00BBF0',
    '#EE2B47',
    '#F60C86',
    '#9870FC',
    '#F96D00',
    '#303481',
  ];

  $('#btn1').click(function () {
    const content = $('#text').val(),
      len = content.length * 16,
      randomColor = parseInt(Math.random() * colorArr.length),
      randomTop = parseInt(Math.random() * 250),
      time = 5000;

    if (len && content.trim()) {
      $('#text').val('');
      $('<span></span>')
        .text(content)
        .css({
          color: colorArr[randomColor],
          right: -len,
          top: randomTop,
        })
        .appendTo('#import')
        .animate({ left: -len - 100 }, time, 'linear', function () {
          $(this).remove();
        });
    }
  });
  $('#page #text').keydown(function (e) {
    if (e.keyCode === 13) {
      $('#btn1').click();
    }
  });
}

/*
 * jq模糊搜索 */
{
  $('#filter').on('keyup', function () {
    var keyword = $(this).val().toLowerCase();
    $('.person > li').each(function () {
      $(this).toggle(
        keyword.length < 1 || $(this).attr('data-models').indexOf(keyword) > -1
      );
    });
  });
}

{
  {
    const css = document.createElement('style');
    css.innerHTML =
      '*{scrollbar-color: #d5d5d5 transparent; scrollbar-width: thin!important; }a:focus{outline: none;}';
    document.head.append(css);
  }
}

/*
 * 二维码 */
function QRCode() {
  const icon = document.querySelectorAll(".other-login span"),
    qr = document.querySelector(".QRCode");

  icon.forEach((ele) => {
    ele.addEventListener("mouseenter", () => {
      setTimeout(() => {
        qr.style.visibility = "visible";
      }, 300);
    });
    ele.addEventListener("mouseleave", () => {
      qr.style.visibility = "hidden";
    });
  });
}

/*
 * 登录检查 */

function loginCheck() {
  const uid = document.querySelector('input[name="uid"]'),
    password = document.querySelector('input[name="password"]'),
    tips = document.querySelectorAll(".tips"),
    check = document.querySelector(".checkbox"),
    form = document.querySelector("form"),
    btn = document.querySelector('input[type="submit"]');
  let flag = [0, 0];

  const len = (x) => {
      return x.length >= 8 && x.length <= 16;
    },
    err = (pos) => {
      tips[pos].style.color = "red";
      flag[pos] = false;
      btn.disabled = true;
      btn.style.backgroundColor = "grey";
      btn.style.cursor = "not-allowed";
    },
    able = (pos) => {
      tips[pos].style.color = "grey";
      flag[pos] = true;
      btn.disabled = false;
      btn.style.backgroundColor = "#6499c7";
      btn.style.cursor = "pointer";
    };

  uid.value = password.value = "";

  /*
   * 合法的输入 */

  ["input", "blur"].forEach((even) => {
    password.addEventListener(even, () =>
      len(password.value) ? able(1) : err(1)
    );
  });
  uid.addEventListener("blur", () =>
    uid.value.length === 10 ? able(0) : err(0)
  );

  password.addEventListener("focus", () => {
    able(1);
  });
  uid.addEventListener("focus", () => {
    able(0);
  });

  /*
   * 记住吗？*/

  check.addEventListener("click", () => {
    const box = document.getElementById("check");
    box.checked = !box.checked;
  });

  /*
   * 提交检测并拦截 */

  form.onsubmit = () => {
    if (uid.value === "") {
      tips[0].style.color = "red";
    }
    if (password.value === "") {
      tips[1].style.color = "red";
    }
    if (flag[0] && flag[1]) {
      form.method = "POST";
      form.action = "login.php";
      form.submit();
    }
    return false;
  };
}

/*
 * 复制 */

function copyQQ() {
  const qq = document.querySelector(".qqmail");
  qq.addEventListener("click", () => {
    Copy("notfound405@qq.com", qq);
    alert("复制成功");
  });
}

window.onload = () => {
  QRCode();
  copyQQ();
  loginCheck();

  // 一些杂项
  {
    window.history.replaceState(null, null, window.location.href); //表单缓存..刷新
  }
};

/*
 * 发送信息 */

function sendData(d) {
  const tables = document.querySelector(".tables"),
    stuClass = document.getElementById("class"),
    gpa = document.getElementById("gpa"),
    stuId = document.getElementById("stuId"),
    stuName = document.getElementById("stuName");

  new Ajax().main({
    url: "database/dataStu.php",
    data: { type: d },
    success: (res) => {
      if (d === "info") {
        const ans = JSON.parse(res);
        stuClass.innerText = ans.class;
        gpa.innerText = ans.gpa;
        stuId.innerText = ans.id;
        stuName.innerText = ans.name;
      } else {
        const regex = /{.+}/gm;
        tables.innerHTML = ans = res.replace(regex, ""); //插入表格
        sortTable(".right ");
      }
    },
  });
}

// 切换表格
function changeTable() {
  const btn = document.querySelectorAll('input[name="options"]'),
    titles = document.querySelector(".titles");

  sendData("info");
  sendData("score");
  changeBtn(btn, (tar) => {
    sendData(tar.value);
    setTimeout(() => sortTable(".right "), 300);

    if (tar.value === "score") {
      titles.innerHTML = "有机鱼大学 学生成绩明细（有效）";
    } else if (tar.value === "course") {
      titles.innerHTML = "我的课程信息";
    }
  });
}

function copyQQ() {
  const qq = document.querySelector(".qqmail");
  qq.addEventListener("click", () => {
    Copy("notfound405@qq.com", qq);
    alert("复制成功");
  });
}

window.onload = () => {
  changeTable();
  copyQQ();
  // console.log(navigator.userAgent);
};

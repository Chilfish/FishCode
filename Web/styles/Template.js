/*
 * API函数一览：
 * 1，new Ajax().main({}); //Ajax的封装
 * 2，Copy(string, node); //点击复制
 * 3，divPage(tablePos); //表格分页  *要等数据传出来再调用
 * 4，sortTable(tablePos); //表格排序  *都要指定表格的位置(选择器)
 * 5，changeBtn(btn, fun(param)); //切换按钮样式
 */

class Ajax {
  main = ({
    url = "",
    data = {},
    method = "get", // 默认为'get'请求
    header = "",
    async = true, // 默认为异步请求
    timeout = 60 * 1000, //默认60s
    success = function () {},
    fail = function () {},
  } = {}) => {
    const requestURL = method === "get" ? this.addUrl(url, data) : url,
      sendData = method === "get" ? null : "data=" + data, // xhr.send(string)
      xhr = new getXHR();

    if (header && Object.keys(header).length) {
      Object.keys(header).map((key) => {
        xhr.setRequestHeader(key, header[key]);
      });
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        try {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            const response = xhr.responseText;
            success(response);
          } else {
            const error = xhr.status + xhr.statusText;
            fail(error);
          }
        } catch (ex) {}
      }
    };

    xhr.open(method, requestURL, async);
    xhr.timeout = timeout;
    xhr.ontimeout = () => {
      console.log("timeout");
    };
    if (method !== "get") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    xhr.send(sendData);
  };

  addUrl(url, obj) {
    let result = "";
    for (let item in obj)
      if (obj[item] && String(obj[item])) {
        result += `&${item}=${obj[item]}`;
      }

    if (result) {
      result = "?" + result.slice(1);
    }
    return url + result;
  }
}
//
class getXHR {
  constructor() {
    let xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          alert("您的浏览器暂不支持Ajax!");
        }
      }
    }
    return xhr;
  }
}

/*
 * 复制 */

function Copy(copyString, node) {
  let textArea = document.createElement("textarea");
  textArea.value = copyString;
  node.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  textArea.style.visibility = "hidden";
  node.removeChild(textArea);
}

/*
 * 分页 */

function divPage(tablePos) {
  const table = document.querySelector(tablePos + "tbody"),
    perPages = document.querySelector(tablePos + "#perPage"), // Rows per Page
    prePage = document.querySelector(tablePos + ".prePage"), // 上一页
    nextPage = document.querySelector(tablePos + ".nextPage"), // 下一页
    pageNum = document.querySelector(tablePos + "#pageNum"), //页码
    tpPage = document.querySelector(tablePos + 'input[name="tpPage"]'); // 跳页

  let totalRow = table.rows.length,
    perPage = isNaN(perPages.value) ? totalRow : perPages.value, //一页的行数
    begin = 0,
    end = Math.min(perPage, totalRow),
    totalPage = Math.ceil(totalRow / perPage),
    curPage = 1; //目前在第几页

  const display = () => {
      for (let row of table.rows) {
        row.style.display = "none";
      }
      for (let i = begin; i < end; ++i) {
        table.rows[i].style.display = "";
      }
      pageNum.innerText = curPage;
      check();
    },
    // 开头末尾的禁用按钮
    check = () => {
      prePage.disabled = curPage === 1;
      nextPage.disabled = curPage >= totalPage;
    },
    //总页数
    printPage = () => {
      document.getElementById("total").innerText = totalPage;
    };

  // 前后页
  prePage.addEventListener("click", () => {
    --curPage;
    check();
    end = begin;
    begin = prePage.disabled ? 0 : begin - perPage;
    display();
  });
  nextPage.addEventListener("click", () => {
    ++curPage;
    check();
    begin = end;
    end = nextPage.disabled ? totalRow : Number(perPage) + Number(end);
    display();
  });

  //一页要展示的行数
  perPages.addEventListener("change", (e) => {
    const val = e.target.value;
    if (val === "all") {
      end = perPage = totalRow;
    } else if (val > totalRow) {
      end = perPage = totalRow;
    } else {
      end = perPage = Number(val);
    }
    begin = 0;
    curPage = 1;
    totalPage = Math.ceil(totalRow / perPage);
    display();
    printPage();
  });

  //跳页
  tpPage.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      let val = Number(e.target.value);
      if (val >= 1 && val <= totalPage) {
        curPage = val;
        check();
        begin = (val - 1) * perPage;
        end = nextPage.disabled ? totalRow : val * perPage;
      } else if (val > totalPage) {
        curPage = totalPage;
        begin = (totalPage - 1) * perPage;
        end = totalRow;
      } else {
        curPage = 1;
        begin = 0;
        end = perPage;
      }
      display();
    }
  });

  //EndOf
  display();
  printPage();
}

/*
 * 点击排序 */

function sortTable(tablePos, paging = true) {
  const thead = document.querySelector(tablePos + "thead"),
    tbody = document.querySelector(tablePos + "tbody"),
    sortIco = document.querySelectorAll(tablePos + ".sort_ico");

  let rows_array = Array.from(tbody.rows),
    sortDire = [],
    preIndex = 0,
    len = rows_array[0].children.length - 1;

  sortDire[len] = 0;
  sortDire.fill(true);

  function cmp(col) {
    return (rowA, rowB) => {
      let a = rowA.cells[col].innerHTML,
        b = rowB.cells[col].innerHTML,
        A = Number(rowA.cells[0].innerHTML), //相同则按第一列排序
        B = Number(rowB.cells[0].innerHTML);

      if (!isNaN(a)) {
        a = Number(a);
        b = Number(b);
        return a === b ? A - B : a - b; //数字
      } else {
        return a === b ? A - B : a > b; //字符串
      }
    };
  }

  thead.addEventListener("click", (e) => {
    if (e.target.tagName === "TH") {
      let index = e.target.cellIndex;
      if (sortDire[index]) {
        rows_array.sort(cmp(index));
      } else {
        rows_array.reverse(); //降序
      }
      tbody.append(...rows_array);

      // 排序的图标
      if (sortIco !== undefined) {
        if (sortDire[index]) {
          let item = sortIco[index];
          item.style =
            "background:url(img/sort_up.png) center no-repeat;background-size:100%;top:14px;display:block;";
        } else {
          let item = sortIco[index];
          item.style =
            "background:url(img/sort_down.png) center no-repeat;background-size:100%;top:22px;display:block;";
        }
        if (preIndex !== index) {
          let item = sortIco[preIndex];
          item.style =
            "background:url(img/sort.png) center no-repeat;background-size:100%;top:18.5;display:none;";
        }
      }

      preIndex = index;
      sortDire[index] = !sortDire[index]; //升降序
    }
  });

  //默认排序后也要分页
  if (paging) divPage(tablePos);
}

/*
 * 切换按钮样式 */
// fun(@param): 参数为 event.target

function changeBtn(btn, fun) {
  btn.forEach((item) => {
    item.addEventListener("click", (e) => {
      btn.forEach((i) => i.parentElement.classList.remove("active"));
      let active = e.target.parentElement.classList;
      active.add("active");
      fun(e.target);
    });
  });
}

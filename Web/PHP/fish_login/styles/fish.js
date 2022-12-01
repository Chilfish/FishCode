function Ajax(str) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200)
      document.getElementById("app").lastElementChild.innerHTML =
        xhr.responseText;
  };
  let url = "ajax.php?" + str;
  xhr.open("GET", url, true);
  xhr.send();

  if (str !== "sel=close") {
    setTimeout(() => {
      sort_table();
    }, 800);
  }
}

function sorting(col_num, type) {
  let compare;
  switch (type) {
    case "number":
      compare = function (rowA, rowB) {
        return rowA.cells[col_num].innerHTML - rowB.cells[col_num].innerHTML;
      };
      break;
    case "string":
      compare = function (rowA, rowB) {
        return rowA.cells[col_num].innerHTML > rowB.cells[col_num].innerHTML;
      };
      break;
  }
  return compare;
}

function sort_table() {
  let thead = document.getElementById("thead"),
    tbody = document.getElementById("tbody"),
    rows_array = Array.from(tbody.rows),
    compares;

  thead.addEventListener("click", (e) => {
    if (e.target.tagName === "TH") {
      compares = sorting(e.target.cellIndex, e.target.id);
      rows_array.sort(compares);
      tbody.append(...rows_array);
    }
  });
}

window.onload = () => {
  document.getElementById("close").addEventListener("click", () => {
    Ajax("sel=close");
  });
  Ajax("sel=all");
};

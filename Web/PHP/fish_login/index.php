<?php
session_start();
print_r($_SESSION);
if (isset($_COOKIE['name'])) {
    $_SESSION['name'] = $_COOKIE['name'];
    $_SESSION['is_login'] = 1;
}
if (isset($_SESSION['is_login'])) {
?>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset='UTF-8'>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes"/>
    <script async src='styles/fish.js'></script>
    <link rel='stylesheet' href='styles/fish.css'>
    <link rel="stylesheet" href="styles/Template.css">
    <link rel='icon' href='img/bili.ico'>
    <title> 咩！</title>
</head>

<body>

<div id="app">
    <div>
        <input type="button" value="关闭" id="close">
        <input type="button" value="注销" id="logout">
        <form id="form">
            <div>
                <span>筛选：</span>
                <label>
                    <select name="sel" onchange="Ajax(this.value)">
                        <option value="sel=all">全选</option>
                        <optgroup label="性别">
                            <option value="sex=男">男</option>
                            <option value="sex=女">女</option>
                        </optgroup>
                        <optgroup label="专业">
                            <option value="pro_name=计算机">计算机</option>
                            <option value="pro_name=通信工程">通信工程</option>
                        </optgroup>
                    </select>
                </label>
            </div>
            <!--  <div>
                  <span>排序：</span>
                  <label>
                      <select name="sort" onchange="Ajax(this.value)">
                          <option value="sort=stu_id">学号</option>
                          <option value="sort=stu_name">姓名</option>
                          <option value="sort=sex">性别</option>
                          <option value="sort=pro_name">专业名</option>
                          <option value="sort=credit">学分</option>
                      </select>
                  </label>
              </div> <!-->
        </form>
    </div>
    <div></div>

</div>

<?php
} else {
    ?>
    <div>
        <p>您还没有登录,请 <a href='login.php'>登录</a> 。</p>
    </div>
    <?php
}
?>
</body>

</html>
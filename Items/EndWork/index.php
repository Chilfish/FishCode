<?php
session_start();
if (isset($_COOKIE["uid"])) {
    $_SESSION["uid"] = $_COOKIE["uid"];
    $_SESSION["logged"] = true;
}
// 检测登录
if ($_SESSION["logged"]) {
    if (isset($_SESSION["power"]))
        if ($_SESSION["power"]) {
            header("location:root.php");
        }

    // 注销
    if (isset($_GET["logout"])) {
        setcookie("uid", "", time() - 1);
        $_SESSION["logged"] = false;
        header("location:login.php");
}

?>
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8"/>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes"/>
    <script async src="styles/Template.js"></script>
    <script async src="styles/index.js"></script>
    <link rel="stylesheet" href="styles/Template.css"/>
    <link rel="stylesheet" href="styles/index.css"/>
    <link rel="icon" href="img/shark_50.png"/>
    <title>我的成绩</title>
</head>

<body>
<div class="app">
    <div class="back"></div>
    <div class="main">
        <div class="left">
            <div class="head">
                <img src="img/shark_100.png" alt="" class="logo"/>
                <div class="title">学生成绩管理系统</div>
            </div>

            <div class="buttons">
                <label class="button active">
                    <input type="radio" name="options" value="score" checked=""/>
                    <span>我的成绩</span>
                </label>
                <label class="button">
                    <input type="radio" name="options" value="course"/>
                    <span>课程信息</span>
                </label>
            </div>

            <div class="footer">
                <div class="introduce">
                    <div>By：
                        <span class="link">21级计算机3班 有机鱼</span>
                    </div>
                    <div>学号：
                         <span class="link">2114100328</span>
                     </div>
                </div>
                <div class="contact">
                    <span>联系方式：</span>
                    <span class="qqmail link" title="点击复制">QQ邮箱</span>
                </div>

                <div class="logout">
                    <a class="link" href="?logout">退出登录</a>
                </div>
            </div>
        </div>

        <div class="mid"></div>
        <div class="right">
            <div class="titles">有机鱼大学 学生成绩明细（有效）</div>
            <div class="hr"></div>
            <div class="select">
                <label>
                    <span>学年：</span>
                    <select name="year">
                        <option value="">2021-2022学年</option>
                    </select>
                </label>
                <label>
                    <span>学期：</span>
                    <select>
                        <option value="">第二学期</option>
                    </select>
                </label>
            </div>

            <div class="overflow">
                <div class="info">
                    <div>
                        <span class="key">院(系)/部</span>：
                        <span> 计算机科学与工程学院</span>
                    </div>
                    <div>
                        <span class="key">行政班级</span>：
                        <span id="class"></span>
                    </div>
                    <div>
                        <span>平均学分绩点</span>：
                        <span id="gpa"></span>
                    </div>
                    <div>
                        <span class="key">学年学期</span>：
                        <span>2021-2022学年 第二学期</span>
                    </div>
                    <div>
                        <span class="key">学号</span>：
                        <span id="stuId"></span>
                    </div>
                    <div>
                        <span class="key">姓名</span>：
                        <span id="stuName"></span>
                    </div>
                </div>

                <div class="tables"></div>

            </div>

            <div class="divPage">
                <label>
                    <select id="perPage" autocomplete="off">
                        <option value="5">5 行 / 页</option>
                        <option value="10">10 行 / 页</option>
                        <option value="all" selected="selected">显示全部</option>
                    </select>
                </label>

                <span class="pageNums">
                    <button class="notBtn prePage">&lt;</button>
                    <span id="pageNums">第 <span id="pageNum">1</span> 页 / </span>
                    <span class="printPage">共<span id="total"></span>页</span>
                    <button class="notBtn nextPage">&gt;</button>
                </span>

                <span class="tpPage">前往第
                    <label><input type="text" name="tpPage" autocomplete="off"/></label>页
                </span>
            </div>
        </div>
    </div>
</div>
</body>

<?php
} else {
    header("location:login.php");
}
?>

</html>
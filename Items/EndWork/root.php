<?php
session_start();
if (isset($_COOKIE["uid"])) {
    $_SESSION["uid"] = $_COOKIE["uid"];
    $_SESSION["logged"] = true;
}
if ($_SESSION["logged"]) {

if (isset($_GET["logout"])) {
    setcookie("uid", "", time() - 1);
    $_SESSION["logged"] = false;
    header("location:login.php");
}

if (!$_SESSION["power"]) {
    header("location:index.php");
}

?>

<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8"/>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes"/>
    <script async src="styles/Template.js"></script>
    <script async src="styles/root.js"></script>
    <link rel="stylesheet" href="styles/Template.css"/>
    <link rel="stylesheet" href="styles/index.css"/>
    <link rel="stylesheet" href="styles/root.css"/>
    <link rel="icon" href="img/shark_50.png"/>
    <title>学生成绩管理系统</title>
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
                    <input type="radio" name="options" value="stuinfo" checked=""/>
                    <span>学生管理</span>
                </label>
                <label class="button">
                    <input type="radio" name="options" value="course"/>
                    <span>课程管理</span>
                </label>
                <label class="button">
                    <input type="radio" name="options" value="score"/>
                    <span>各科成绩</span>
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
            <div class="titles">学生管理</div>
            <div class="hr"></div>
            <div class="editInfo">
                <label class="button editBtn">
                    <input type="button" name="add">
                    <span>添加</span>
                </label>
                <label class="button editBtn">
                    <input type="button" name="deleteAll">
                    <span>批量删除</span>
                </label>
                <label class="button saveBtn" style="display: none;">
                    <input type="button" name="save">
                    <span>保存</span>
                </label>

                <span class="search">
                    <form id="searchInfo">
                        <label><input type="text" autocomplete="off" accesskey="s" placeholder="搜索学生" class="search-keyword"></label>
                        <div class="nav-search-btn">
                            <button type="button" class="searchBtn">
                                <span>
                                    <svg viewBox="0 0 900 900" focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                        <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z">
                                        </path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                </span>
                
            </div>
            <div class="overflow">
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

    <div class="mes" style="display: none;">
        <div class="mask"></div>
        <div class="win">
            <div class="close"><img src="img/close.svg" alt=""></div>
            <div class="titles">学生信息</div>
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

            <div class="tables overflow"></div>

            <div class="editInfo">
                <label class="button editBtn">
                    <input type="button" name="save"><span>保存</span>
                </label>
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
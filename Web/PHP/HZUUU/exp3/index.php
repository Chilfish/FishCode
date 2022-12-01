<?php
$stuID = $_POST["stuID"];
$stuName = $_POST["stuName"];
$stuClass = $_POST["stuClass"];
$stuPhone = $_POST["stuPhone"];

echo '<h3>确认添加的学生信息</h3>',
    "<p>添加的学生学号：$stuID</p>",
    "<p>添加的学生姓名：$stuName</p>",
    "<p>添加的学生班级：$stuClass</p>",
    "<p>添加的学生电话：$stuPhone</p>";
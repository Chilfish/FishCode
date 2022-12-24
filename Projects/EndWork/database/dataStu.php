<?php
session_start();

if ((empty($_POST) && empty($_GET)) || empty($_COOKIE))
    header('HTTP/1.1 404 Not Found');

include("database.php");
$sql = new SQL();
$uid = $_GET["uid"] ?? $_SESSION["uid"];

// 切换表格
if (isset($_GET["type"]))
    if ($_GET["type"] === "score")
        printScore();
    else if ($_GET['type'] === "course")
        printCourse();
    else if ($_GET['type'] === "info")
        getInfo($uid);


function printScore(): void
{
    global $uid;
    global $sql;
    $str = "select `courseId`, `courseName`, `credit`, `type`, `scoreGot`,  `creditGot`, `gradePoint` , `score`.`comments`
            from `score` join `stuinfo` using (`stuId`) join `course` using (`courseId`)
            where `stuid` = $uid;";
    $sql->Run($str);

    echo '<table><thead><tr><th class="dig">序号<span class="sort_ico"></span></th><th>课程<span class="sort_ico"></span></th><th class="dig">学分<span class="sort_ico"></span></th><th>类别<span class="sort_ico"></span></th><th class="dig">成绩<span class="sort_ico"></span></th><th class="dig">取得学分<span class="sort_ico"></span></th><th class="dig">绩点<span class="sort_ico"></span></th><th>备注<span class="sort_ico"></span></th></tr></thead><tbody>';

    for ($i = 0; $i < count($sql->arr); ++$i) {
        echo '<tr id="' . $sql->arr[$i]["courseId"] . '">' . '<td>', $i + 1, '</td>';
        for ($j = 1; $j < count($sql->head); ++$j)
            echo '<td id="', $sql->head[$j], '">', $sql->arr[$i][$sql->head[$j]], '</td>';
        echo '</tr>';
    }
    echo '</tbody></table>';
    getInfo($uid);
}

function printCourse(): void
{
    global $sql;
    global $uid;
    $str = "select `courseId`, `courseName`, `learnTime`, `credit`, `type`
            from `course` join `score` using (`courseId`)
            where `stuId` = $uid;";
    $sql->Run($str);

    echo '<table><thead><tr><th class="dig">序号<span class="sort_ico"></span></th><th class="dig">课程号<span class="sort_ico"></span></th><th>课程名<span class="sort_ico"></span></th><th class="dig">学时<span class="sort_ico"></span></th><th class="dig">学分<span class="sort_ico"></span></th><th>课程类别<span class="sort_ico"></span></th></tr></thead><tbody>';

    $i = 1;
    foreach ($sql->arr as $row) {
        echo '<tr><td>', $i++, '</td>';
        foreach ($sql->head as $col)
            echo '<td id="', $col, '">', $row[$col], '</td>';
        echo '</tr>';
    }
    echo '</tbody></table>';

}

function getInfo($uid): void
{
    global $sql;
    $str = "select `major`, `stuId`, `stuName`, `GPA`
            from `stuinfo`
            where `stuId` = $uid;";
    $sql->Run($str);
    $ans = $sql->arr[0];

    $class = substr($ans["stuId"], 0, 2) .
        $ans["major"] .
        substr($ans["stuId"], 7, 1) . "班";
    $ansData = [
        "class" => $class,
        "gpa" => $ans["GPA"],
        "id" => $ans["stuId"],
        "name" => $ans["stuName"]
    ];
    print_r(json_encode($ansData)); //再由Ajax端收内容

//    $json["data"]["stuInfo"] = $ansData;
//    $json = json_decode(file_get_contents("stu.json"), true);
//    $str = json_encode($json, JSON_UNESCAPED_UNICODE);
//    file_put_contents("stu.json", $str);
}
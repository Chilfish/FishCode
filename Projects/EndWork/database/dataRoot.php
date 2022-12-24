<?php

if ((empty($_POST) && empty($_GET)) || empty($_COOKIE))
    header('HTTP/1.1 404 Not Found');

include("database.php");
$sql = new SQL();

//表格切换
if (isset($_GET["type"]))
    if ($_GET["type"] === "stuinfo") {
        stuTable();
    } elseif ($_GET["type"] === "course") {
        courseTable();
    } elseif ($_GET["type"] === "score")
        scoreAll();

// 由Ajax发来的请求，增删改查
if (isset($_POST["data"])) {
    $data = json_decode($_POST["data"], true);
    if ($_POST["type"] === "update") {
        editStu($data);
    } elseif ($_POST["type"] === "course") {
        editCourse($data);
    } elseif ($_POST["type"] === "delete") {
        deleteInfo($data);
    } elseif ($_POST["type"] === "add") {
        addInfo($data);
    } elseif ($_POST["type"] === "search") {
        searchStu($data);
    }
}

// 打印模板
function printTbody($arr, $head, $edit): void
{
    $i = 1;
    foreach ($arr as $row) {
        echo '<tr><td><input type="checkbox" name="check"></td>', '<td>', $i++, '</td>';
        foreach ($head as $col)
            echo '<td id="', $col, '">', $row[$col], '</td>';
        if ($edit)
            echo '<td><input type="button" name="info" value="详情"><input type="button" name="edit" value="修改"><input type="button" name="delete" value="删除"></td></tr>';
    }
    echo '</tbody></table>';
}


function stuTable(): void
{
    global $sql;
    $str = "select `stuId`, `stuName`, `major`, `GPA`, `stuinfo`.`comments` from `stuinfo`";
    $sql->Run($str);
    $ans = $sql->arr;

    $i = 0;
    foreach ($ans as $item) {
        $ans[$i++]["major"] =
            substr($item["stuId"], 0, 2) .
            $item["major"] .
            substr($item["stuId"], 7, 1) . "班";
    }

    echo '<table id="stuInfos"><thead><tr><th class="dig"><span class="sort_ico"></span><input type="checkbox" name="check"></th><th class="dig">序号<span class="sort_ico"></span></th><th>学号<span class="sort_ico"></span></th><th>姓名<span class="sort_ico"></span></th><th>班级<span class="sort_ico"></span></th><th class="dig">GPA<span class="sort_ico"></span></th><th>备注<span class="sort_ico"></span></th><th>操作<span class="sort_ico"></span></th></tr></thead><tbody>';

    printTbody($ans, $sql->head, true);
}

function editStu($data): void
{
    $uid = $data['stuId'];
    $info = $data['info'];
    $scoreInfo = $data['table'];
    global $sql;

    foreach ($scoreInfo as $item) {
        if ($item["key"] === "scoreGot") {
            $str = "call GPACalc('$uid', '{$item['course']}', '{$item['value']}');";
        } else {
            $str = "call updateScore('$uid', '{$item['course']}', '{$item['key']}', '{$item['value']}');";
        }
        $sql->Run($str);
    }
    foreach ($info as $item) {
        $str = "call updateStuinfo('$uid', '{$item['key']}', '{$item['value']}');";
        $sql->Run($str);
    }
//    echo $uid;
//    print_r($info);
//    print_r($scoreInfo);
}


// 课程
function courseTable(): void
{
    global $sql;
    $str = "select `courseId`, `courseName`, `learnTime`, `credit`, `type`
            from `course`;";
    $sql->Run($str);

    echo '<table><thead><tr><th class="dig"><span class="sort_ico"></span><input type="checkbox" name="check"></th><th class="dig">序号<span class="sort_ico"></span></th><th class="dig">课程号<span class="sort_ico"></span></th><th>课程名<span class="sort_ico"></span></th><th class="dig">学时<span class="sort_ico"></span></th><th class="dig">学分<span class="sort_ico"></span></th><th>课程类别<span class="sort_ico"></span></th><th>操作<span class="sort_ico"></span></th></tr></thead><tbody>';

    printTbody($sql->arr, $sql->head, true);
}

function editCourse($data): void
{
    //    print_r($data);
    $id = $data["courseId"];
    global $sql;
    foreach ($data["data"] as $item) {
        $str = "call updateCourse('$id',' {$item['key']}', '{$item['value']}')";
        $sql->Run($str);
    }
}

//各科成绩
//下拉选课程......就懒了
function scoreAll(): void
{
    global $sql;
    $str = "select stuId, stuName, courseId, courseName, scoreGot, gradePoint, creditGot
            from score join stuinfo using (stuId) join course using (courseId) order by stuId";
    $sql->Run($str);

    echo '<table id="scoreInfos"><thead><tr><th class="dig"><span class="sort_ico"></span><input type="checkbox" name="check"></th><th class="dig">序号<span class="sort_ico"></span></th><th>学号<span class="sort_ico"></span></th><th>姓名<span class="sort_ico"></span></th><th class="dig">课程号<span class="sort_ico"></span></th><th>课程名<span class="sort_ico"></span></th><th class="dig">成绩<span class="sort_ico"></span></th><th class="dig">绩点<span class="sort_ico"></span></th><th class="dig">学分<span class="sort_ico"></span></th></tr></thead><tbody>';

    printTbody($sql->arr, $sql->head, false);
}

//删除信息
function deleteInfo($data): void
{
    //    print_r($data);
    global $sql;
    foreach ($data['data'] as $item) {
        if ($data['type'] === "score") //飞线
            $str = "delete from score where stuId = '{$item['stuId']}' and courseId = '{$item['courseId']}';";
        else
            $str = "call deleteInfo('{$data['type']}', '{$item}')";
        $sql->Run($str);
    }
}

//添加信息
function addInfo($data): void
{
    global $sql;
    $str = "insert into {$data['type']} (";
    foreach ($data['data'] as $item) {
        $str .= $item['key'] . ',';
    }
    $str = trim($str, ',') . ') values (';
    foreach ($data['data'] as $item) {
        $str .= ($item['value'] ? '\'' . $item['value'] . '\'' : 'null') . ',';
    }
    $str = trim($str, ',') . ');';
    $sql->Run($str);

    // 再飞线地更新GPA
    if ($data['type'] === "score") {
        $uid = $data['data'][0]['value'];
        $cid = $data['data'][1]['value'];
        $score = $data['data'][2]['value'];
        $str = "call GPACalc('$uid', '$cid', '$score');";
        $sql->Run($str);
    } elseif ($data['type'] === "stuinfo") {
        $id = $data['data'][0]['value'];
        $str = "insert into users values(null, '{$id}', '{$id}', 0)";
        $sql->Run($str);
    }
}

// 搜索
function searchStu($data): void
{
    global $sql;
    $name = $data["name"];

    if ($data["tableID"] === "stuInfos") {
        $str = "select `stuId`, `stuName`, `major`, `GPA`, `stuinfo`.`comments` from `stuinfo` where stuName like '%{$name}%';";
        $sql->Run($str);
        printTbody($sql->arr, $sql->head, true);
    } elseif ($data["tableID"] === "scoreInfos") {
        $str = "select stuId, stuName, courseId, courseName, scoreGot, gradePoint, creditGot
            from score join stuinfo using (stuId) join course using (courseId)  where stuName like '%{$name}%'";
        $sql->Run($str);
        printTbody($sql->arr, $sql->head, false);
    }
}
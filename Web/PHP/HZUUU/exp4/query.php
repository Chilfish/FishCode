<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset='UTF-8'>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes"/>
    <script src=''></script>
    <link rel='stylesheet' href='../../styles/Template.css'>
    <link rel='icon' href='../../img/bili.ico'>
    <style>
        .app {
            display: flex;
            flex-direction: column;
            margin: 3em;
            letter-spacing: 0.1em;
        }

        h1 {
            margin: 1em;
        }
    </style>
    <title>员工信息信息</title>
</head>

<body>
<div class="app">
    <h1>员工信息</h1>
    <?php
    if (isset($_POST)) {
        include "linkMySQL.php";
        $name = $_POST["name"];
        $sql = new FishSQL();
        $str = "select id, name, age, salary from employee where name='{$name}'";
        $sql->Run($str);

        if (!empty($sql->arr)) {
            $ans = $sql->arr[0];
            echo "<p>编号：{$ans['id']}</p>" .
                "<p>姓名：{$ans['name']}</p>" .
                "<p>年龄：{$ans['age']}</p>" .
                "<p>工资：{$ans['salary']}</p>";
        } else {
            echo '<p><b>没有输出结果</b></p>';
        }
    }
    ?>
</div>
</body>

</html>

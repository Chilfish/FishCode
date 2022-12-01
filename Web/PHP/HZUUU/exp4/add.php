<?php
if (isset($_POST)) {
    include "linkMySQL.php";
    $value = implode('\', \'', $_POST);
    $str = "insert into employee values(null, '" . $value . "');";
    $sql = new FishSQL();
    try {
        $sql->Run($str);
        echo "<p>员工添加成功!</p>";
    } catch (PDOException $e) {
        echo $str, "   ", $e->getMessage(), '<br>';
        echo "<b>员工添加失败!</b >";
    }
}
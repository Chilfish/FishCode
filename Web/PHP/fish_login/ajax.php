<?php
include 'database.php';
$mysql = new fish_sql('localhost', 'root', 'fish', 'fish');

function print_ans($q): void
{
    global $mysql;
    $key = array_keys($q)[0];
    $mysql->Query($q);

    echo "<table style=\"text-align: center;\"><caption>学生信息表</caption><thead id=\"thead\"><tr>";
    foreach ($mysql->head as $item) {
        if ($item === "学分")
            echo "<th id=\"number\">";
        else
            echo "<th id=\"string\">";
        echo $item, '</th>';
    }
    echo "</tr></thead><tbody id=\"tbody\">";

    foreach ($mysql->arr as $row) {
        echo '<tr>';
        foreach ($mysql->head as $col)
            echo '<td>', $row[$col], '</td>';
        echo '</tr>';
    }
    echo "</tbody></table>";
}

//var_dump($_GET);
if (@$_GET['sel'] == 'close')
    echo "";
else
    print_ans($_GET);
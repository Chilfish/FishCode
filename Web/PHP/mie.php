<?php
$json_string = file_get_contents("fish.json");// 从文件中读取数据到PHP变量
$data = json_decode($json_string, true);// 把JSON字符串转成PHP数组

$ans = [
    "class" => "mie",
    "credit" => 43,
    "id" => "3424",
    "major" => "咩",
    "name" => "咩啊计算表及"
];

$data["data"]["stuInfo"] = $ans;
$str = json_encode($data, JSON_UNESCAPED_UNICODE);
file_put_contents("fish.json", $str);//写入

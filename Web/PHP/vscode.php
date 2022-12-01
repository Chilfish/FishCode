<?php
const EOL = "\n";

$dd = 23.3424;
echo '$dd is ', "$dd mie", PHP_EOL, EOL;
// printf("\$dd is %f desu \n", $dd);


$a = [1, 23, "55mie"];
$a[] = 4;
//var_dump($a);

print_r($a);
echo EOL;
//unset($a[2]);
//for ($i = 0; $i < count($a); ++$i)
//    echo $i, ": ", $a[$i], EOL;

$map = [
    'x' => 12,
    'y' => 13,
    'r' => 2
];
//$map['x'] = 3;
unset($map['r']);
// echo EOL, $map['x'], EOL;

$add = function ($a, $b) {
    return $a + $b;
}; //匿名函数
// echo $add(1, 2), EOL;

function multi($a, $b): int //非匿名函数必须声明函数的返回类型
{
    return $a * $b;
}

// echo multi(3, 4), EOL;


$arr = [
    'name' => 'mie',
    'id' => '1234',
    'score' => 34
];

//foreach ($arr as $key => $value) {
//    echo $key, ': ', $value, EOL;
//}

$ar = [
    'info' => [
        'name' => 'fish',
        'id' => '123',
        'address' => [
            'plant' => 'earth',
            'county' => 'mie'
        ]
    ],
    'score' => 213
];
echo '<br><br>', count($ar);

print_r($ar);

echo md5("fishfish"), "\n";
echo md5("2114100328");

echo trim('miemie, mie, mie,', ',');
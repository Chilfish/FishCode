<?php

class fish_sql
{
    public PDO $db;
    public array $head, $arr;
    protected array $sqlarr;
    private string $sql = "select stu_id 学号,stu_name 姓名,sex 性别,pro_name 专业,credit 学分 from stuinfo ";

    public function __construct($host, $user, $pw, $dbname)
    {
        try {
            $dns = "mysql:host=" . $host . ";dbname=" . $dbname;
            $this->db = new PDO($dns, $user, $pw);
        } catch (PDOException $err) {
            die('链接失败! ' . $err->getMessage());
        }
    }

    private function Run($str): void
    {
        $run = $this->db->prepare($this->sql . $str);
        $run->execute();
        $this->arr = $run->fetchAll(PDO::FETCH_ASSOC);
        $this->head = array_keys($this->arr[0]);
    }

    public function Query($q): void
    {
        $key = array_keys($q)[0];
        $x = $key;
        if ($x === "sel") {
            $x = 1;
            $y = 1;
        } else
            $y = $q[$key];
        $sql = " where $x = '$y';";
        $this->Run($sql);
    }
}

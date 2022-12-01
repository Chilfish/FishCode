<?php

class FishSQL
{
    private PDO $db;
    public array $head = [], $arr = [];
    public function __construct()
    {
        $host = "localhost";
        $user = "root";
        $pw = "fish";
        $dbname = "Fish";
        try {
            $dns = "mysql:host=$host;dbname=$dbname";
            $this->db = new PDO($dns, $user, $pw);
        } catch (PDOException $err) {
            die('链接失败! ' . $err->getMessage());
        }
    }
    public function Run($str): void
    {
        try {
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $run = $this->db->query($str);
            $this->arr = $run->fetchAll(PDO::FETCH_ASSOC);
            if (!empty($this->arr))
                $this->head = array_keys($this->arr[0]);
        } catch (PDOException $e) {
            echo $str, "   ", $e->getMessage(), '<br>';
        }
    }
}



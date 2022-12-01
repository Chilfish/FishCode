<?php

if ((empty($_POST) && empty($_GET)) || empty($_COOKIE))
    header('HTTP/1.1 404 Not Found');

class SQL
{
    private PDO $db;
    public array $head = [], $arr = []; //表头及表内容

    public function __construct()
    {
        $host = "localhost";
        $user = "root";
        $pw = "fish";
        $dbname = "fishwork";

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

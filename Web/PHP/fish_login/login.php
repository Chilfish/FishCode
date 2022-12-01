<?php
session_start();
if (isset($_POST['login'])) {
    $name = trim($_POST['name']);
    $password = trim($_POST['password']);
    if ($name == '' || $password == '') {
        echo "不准空";
        exit;
    } elseif ($name != 'fish' || $password != 'fish') {
        echo "不准错";
        exit;
    } else {
        $_SESSION['name'] = $name;
        $_SESSION['is_login'] = 1;
        setcookie('name', '', time() - 999);
        setcookie('code', '', time() - 999);

        header('location:index.php');
    }
}
?>

<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset='UTF-8'>
    <link rel='stylesheet' href='styles/fish.css'>
    <link rel='icon' href='img/bili.ico'>
    <title>fish</title>
</head>

<body>

<div id="app">
    <form id="fish">
        <div id="form">
            <label>
                <div id="input">
                    <span>账号</span>
                    <input type="text" name="name">
                    <span id="err"></span>
                </div>
                <div id="input">
                    <span>密码</span>
                    <input type="password" name="password">
                    <span id="err"></span>
                </div>
            </label>

            <div id="submit">
                <input type="submit" value="登录" name="login">
                <input type="submit" value="注册" name="register">
            </div>
        </div>
    </form>

    <script>
        // 不显示action的话要Ajax啦
        (() => {
            let form = document.getElementById('fish');
            form.action = 'login.php'
            form.method = 'post';
        })();
    </script>
</div>
</body>

</html>
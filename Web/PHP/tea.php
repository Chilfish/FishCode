<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset='UTF-8'>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes" />
    <script src=''></script>
    <link rel='stylesheet' href='../styles/Template.css'>
    <link rel='icon' href=''>
    <title> </title>
</head>

<body>
    <form action="tea.php" method="post">
        <div>
            uid: <input type="text" name="uid" id="">
        </div>
        <div>
            name: <input type="text" name="name" id="">
        </div>
        <div>
            score: <input type="text" name="score" id="">
        </div>
        <input type="submit" value="提交">
    </form>

    <?php
    if (isset($_POST))
        print_r($_POST);
    ?>
</body>

</html>
/*
 CreateDate: 2022-05-09 16:52
 */
create database if not exists fishwork;
set names utf8mb4; -- 四个字节一个字符
set foreign_key_checks = 0;
use fishwork;


-- 登录用户信息
drop table if exists users;
create table if not exists users
(
    id        int auto_increment primary key,
    userName  varchar(10) not null,
    passWords varchar(20) not null,
    power     boolean     not null
);

-- 学生信息
drop table if exists stuinfo;
create table if not exists stuinfo
(
    stuId       char(10) not null,
    stuName     varchar(255) default null,
    major       varchar(255) default null,
    totalCredit float        default 0,
    GPA         float        default 0,
    comments    varchar(255) default null
);

-- 课程信息
drop table if exists course;
create table if not exists course
(
    courseId   char(3) not null,
    courseName varchar(255) default null,
    learnTime  int          default null,
    credit     float        default null,
    type       varchar(255) default null
);

-- 成绩信息
drop table if exists score;
create table if not exists score
(
    stuId      char(10) not null,
    courseId   char(3)      default null,
    scoreGot   float        default 0,
    creditGot  float        default 0,
    gradePoint float        default 0,
    comments   varchar(255) default null
);

-- 初始数据 --

-- 课程数据
insert into course
values ('101', '数据库应用技术', 30, 4, '必修课'),
       ('102', '面向对象程序设计', 30, 4, '必修课'),
       ('103', '高等数学2', 30, 2, '必修课'),
       ('104', '大学物理', 30, 2, '必修课'),
       ('105', '大学英语2', 30, 2, '必修课'),
       ('106', 'Web 设计', 30, 4, '必修课');

-- 学生数据
insert into stuinfo
values ('2114100328', '有机鱼', '计算机类', 14, 3.2, null),
       ('2114100306', '杨咩咩', '计算机类', 14, 3.5, null),
       ('2114100314', '蓝习之', '计算机类', 14, 3.9, null),
--       ('2114100350', '张三', 0, '计算机类', null, null, null, null),
--        ('2114100351', '陈思思', 0, '计算机类', null, null, null, null),
       ('2114110128', '何唐码朗', '网络工程', 14, 3.1, null),
       ('2114110106', '蒋素', '网络工程', 14, 3.6, null),
       ('2114110114', '程平平', '网络工程', 14, 3.9, null);
--       ('2114100151', '陈圆圆', 0, '网络工程', null, null, null, null),
--      ('2114100152', '潘洋', 1, '网络工程', null, null, null, null);

-- 成绩数据
INSERT INTO fishwork.score
VALUES ('2114100328', '101', 80, 4, 3, null),
       ('2114100328', '102', 81, 4, 3.1, null),
       ('2114100328', '103', 82, 2, 3.2, null),
       ('2114100328', '104', 83, 2, 3.3, null),
       ('2114100328', '105', 88, 2, 3.8, null),
       ('2114100306', '101', 84, 4, 3.4, null),
       ('2114100306', '102', 85, 4, 3.5, null),
       ('2114100306', '103', 86, 2, 3.6, null),
       ('2114100306', '104', 83, 2, 3.3, null),
       ('2114100306', '105', 87, 2, 3.7, null),
       ('2114100314', '101', 88, 4, 3.8, null),
       ('2114100314', '102', 89, 4, 3.9, null),
       ('2114100314', '103', 90, 2, 4, null),
       ('2114100314', '105', 91, 2, 4.1, null),
       ('2114100314', '106', 89, 4, 3.9, null),
       ('2114110128', '101', 80, 4, 3, null),
       ('2114110128', '102', 81, 4, 3.1, null),
       ('2114110128', '106', 81, 4, 3.1, null),
       ('2114110128', '104', 82, 2, 3.2, null),
       ('2114110128', '105', 83, 2, 3.3, null),
       ('2114110106', '101', 84, 4, 3.4, null),
       ('2114110106', '103', 86, 2, 3.6, null),
       ('2114110106', '106', 85, 4, 3.5, null),
       ('2114110106', '104', 86, 2, 3.6, null),
       ('2114110106', '105', 87, 2, 3.7, null),
       ('2114110114', '101', 88, 4, 3.8, null),
       ('2114110114', '106', 89, 4, 3.9, null),
       ('2114110114', '104', 90, 2, 4, null),
       ('2114110114', '105', 91, 2, 4.1, null),
       ('2114110114', '103', 86, 2, 3.6, null);


-- 用户信息
insert into users
values (0, '2114100328', 'Fishfish', 0),
       (0, '2114100306', 'Fishfish', 0),
       (0, '2114100314', 'Fishfish', 0),
       (0, '2114110128', 'Fishfish', 0),
       (0, '2114110106', 'Fishfish', 0),
       (0, '2114110114', 'Fishfish', 0),
       (0, 'teacheroot', 'fishroot', 1);


-- 修改成绩的同时更新绩点、GPA
delimiter //
drop procedure if exists GPACalc;
create procedure GPACalc(in sid char(10), in cid char(3), in x float)
begin
    set @gp = 0;
    if (x < 60) then
        set @gp = 0;
    else
        set @gp = (x - 50) / 10;
    end if;

    update score
    set scoreGot   = x,
        gradePoint = @gp
    where stuId = sid
      and courseId = cid;

    update stuinfo
    set GPA = (select format(avg(`gradePoint`), 1)
               from score
               where stuId = sid
               group by stuId)
    where stuId = sid;
end //

--  call GPACalc(70, '2114100328', '103');

-- 修改学生基本信息
delimiter //
drop procedure if exists updateStuinfo;
create procedure updateStuinfo(in sid char(10), in type varchar(255), in val varchar(255))
begin
    if (type = 'stuId') then
        update stuinfo
            left join score using (stuId)
            left join users on userName = stuId
        set stuinfo.stuId = val,
            score.stuId   = val,
            userName      = val
        where stuinfo.stuId = sid;
    elseif (type = 'stuName') then
        update stuinfo
        set stuName = val
        where stuId = sid;
    end if;
end //

--  call updateStuinfo('2114110113', 'stuName', '姜苏2');

-- 修改成绩信息
delimiter  //
drop procedure if exists updateScore;
create procedure updateScore(in sid char(10), in cid char(3), in type varchar(255), in val varchar(255))
begin
    set @str = concat('update score set ', type, ' = \'', val, '\' where stuId = \'', sid, '\' and courseId = \'', cid,
                      '\';');
    prepare pre from @str;
    execute pre;
    deallocate prepare pre;
end //

# call updateScore('2114100306', '101', 'creditGot', '2');

--  修改课程信息，同时地触发器
delimiter //
drop procedure if exists updateCourse;
create procedure updateCourse(in id char(3), in type varchar(255), in val varchar(255))
begin
    set @str = concat('update course set ', type, ' = \'', val,
                      '\' where courseId = \'', id, '\';');
    prepare pre from @str;
    execute pre;
    deallocate prepare pre;
end //

delimiter //
drop trigger if exists updateId;
create trigger updateId
    after update
    on course
    for each row
begin
    update score
    set score.courseId = new.courseId
    where score.courseId = old.courseId;
end //

--  call updateCourse('101', 'courseName', '咩！');

--  删除信息
delimiter //
drop procedure if exists deleteInfo;
create procedure deleteInfo(in type varchar(255), in val varchar(255))
begin
    if (type = 'stuinfo') then
        delete score, users, stuinfo
        from stuinfo
                 left join score using (stuId)
                 left join users on userName = stuId
        where stuinfo.stuId = val;
    elseif (type = 'course') then
        delete score, course
        from course
                 left join score using (courseId)
        where course.courseId = val;
    end if;
end //

--  call deleteInfo('stuinfo', '2114100328');

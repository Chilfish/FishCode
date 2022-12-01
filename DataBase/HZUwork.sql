/*
 Navicat Premium Data Transfer

 Source Server         : blue
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : HZUhome

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 14/04/2022 17:17:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS departments;
CREATE TABLE `departments`
(
    `workid`   char(3) CHARACTER SET utf8 COLLATE utf8_general_ci  NOT NULL,
    `workname` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `tips`     tinytext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
    PRIMARY KEY (`workid`) USING BTREE
) ENGINE = MyISAM
  AUTO_INCREMENT = 1
  CHARACTER SET = utf8
  COLLATE = utf8_general_ci
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of departments
-- ----------------------------
INSERT INTO departments
VALUES ('1', '财务部', 'null');
INSERT INTO departments
VALUES ('2', '人力资源部', 'null');
INSERT INTO departments
VALUES ('3', '经理办公室', 'null');
INSERT INTO departments
VALUES ('4', '研发部', 'null');
INSERT INTO departments
VALUES ('5', '生产部', 'null');

-- ----------------------------
-- Table structure for employees
-- ----------------------------
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees`
(
    `id`       char(6) CHARACTER SET utf8 COLLATE utf8_general_ci     NOT NULL,
    `name`     char(10) CHARACTER SET utf8 COLLATE utf8_general_ci    NOT NULL,
    `degree`   char(4) CHARACTER SET utf8 COLLATE utf8_general_ci     NOT NULL,
    `born`     date                                                   NOT NULL,
    `sex`      char(2) CHARACTER SET utf8 COLLATE utf8_general_ci     NOT NULL,
    `worktime` tinyint(0)                                             NOT NULL,
    `address`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `phone`    char(12) CHARACTER SET utf8 COLLATE utf8_general_ci    NOT NULL,
    `workid`   char(3) CHARACTER SET utf8 COLLATE utf8_general_ci     NOT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8
  COLLATE = utf8_general_ci
  ROW_FORMAT = Compact;

-- ----------------------------
-- Records of employees
-- ----------------------------
INSERT INTO `employees`
VALUES ('000001', '王林', '大专', '1966-01-23', '1', 8, '中山路32-1-508', '83355668', '2');
INSERT INTO `employees`
VALUES ('010008', '伍容华', '本科', '1976-03-28', '1', 3, '北京东路100-2', '833211321', '1');
INSERT INTO `employees`
VALUES ('020010', '王向荣', '硕士', '1982-12-09', '1', 2, '四牌路10-0-108', '83792361', '1');
INSERT INTO `employees`
VALUES ('020018', '李丽', '大专', '1960-07-30', '0', 6, '中山东路102-2', '83413301', '1');
INSERT INTO `employees`
VALUES ('102201', '刘明', '本科', '1972-10-18', '1', 3, '虎踞路100-2', '83606608', '5');
INSERT INTO `employees`
VALUES ('102208', '朱俊', '硕士', '1965-09-28', '1', 2, '牌楼巷5-3-106', '84708817', '5');
INSERT INTO `employees`
VALUES ('108991', '钟敏', '硕士', '1979-08-10', '0', 4, '中山路10-3-105', '83346722', '3');
INSERT INTO `employees`
VALUES ('111006', '张石兵', '本科', '1974-10-01', '1', 1, '解放路34-1-203', '84563418', '5');
INSERT INTO `employees`
VALUES ('210678', '林涛', '大专', '1977-04-02', '1', 2, '中山北路24-35', '83467336', '3');
INSERT INTO `employees`
VALUES ('302566', '李玉敏', '本科', '1968-09-20', '1', 3, '热河路209-3', '58765991', '4');
INSERT INTO `employees`
VALUES ('308759', '叶凡', '本科', '1978-11-18', '1', 2, '北京西路3-7-52', '83308901', '4');
INSERT INTO `employees`
VALUES ('504209', '陈林琳', '大专', '1969-09-03', '0', 5, '汉中路120-4-12', '84468158', '4');

-- ----------------------------
-- Table structure for salary
-- ----------------------------
DROP TABLE IF EXISTS `salary`;
CREATE TABLE `salary`
(
    `id`      char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `income`  float(8, 2)                                        NOT NULL,
    `outcome` float(8, 2)                                        NOT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM
  AUTO_INCREMENT = 1
  CHARACTER SET = gbk
  COLLATE = gbk_chinese_ci
  ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of salary
-- ----------------------------
INSERT INTO `salary`
VALUES ('000001', 2200.80, 123.09);
INSERT INTO `salary`
VALUES ('010008', 1682.62, 88.03);
INSERT INTO `salary`
VALUES ('102201', 2669.88, 185.65);
INSERT INTO `salary`
VALUES ('111006', 2087.01, 79.58);
INSERT INTO `salary`
VALUES ('504209', 2166.15, 108.00);
INSERT INTO `salary`
VALUES ('302566', 3080.70, 210.20);

-- ----------------------------
-- Table structure for kc
-- ----------------------------
DROP TABLE IF EXISTS `source`;
CREATE TABLE `source`
(
    `sour_id`   varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    `sour_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    `term`      varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    `period`    varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    `point`     varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = MyISAM
  AUTO_INCREMENT = 1
  CHARACTER SET = utf8
  COLLATE = utf8_general_ci
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kc
-- ----------------------------
INSERT INTO `source`
VALUES ('101', '计算机基础', '1', '80', '5');
INSERT INTO `source`
VALUES ('102', '程序设计与语言', '2', '68', '4');
INSERT INTO `source`
VALUES ('206', '离散数学', '4', '68', '4');
INSERT INTO `source`
VALUES ('208', '数据结构', '5', '68', '4');
INSERT INTO `source`
VALUES ('209', '操作系统', '6', '68', '4');
INSERT INTO `source`
VALUES ('210', '计算机原理', '5', '85', '5');
INSERT INTO `source`
VALUES ('212', '数据库原理', '7', '68', '4');
INSERT INTO `source`
VALUES ('301', '计算机网络', '7', '51', '3');
INSERT INTO `source`
VALUES ('302', '软件工程', '7', '51', '3');

-- ----------------------------
-- Table structure for xs
-- ----------------------------
DROP TABLE IF EXISTS stu_info;
CREATE TABLE `stuinfo`
(
    `stu_id`   char(6) CHARACTER SET utf8 COLLATE utf8_general_ci    NOT NULL,
    `stu_name` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `pro_name` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `sex`      varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `born`     date                                                  NOT NULL,
    `credits`   int(0)                                                NOT NULL,
    `备注`       char(255) CHARACTER SET utf8 COLLATE utf8_general_ci  NULL DEFAULT NULL,
    PRIMARY KEY (`stu_id`) USING BTREE
) ENGINE = MyISAM
  AUTO_INCREMENT = 1
  CHARACTER SET = utf8
  COLLATE = utf8_general_ci
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stuinfo
-- ----------------------------
INSERT INTO stu_info
VALUES ('081101', '王林', '计算机', '1', '1994-02-10', 50, '');
INSERT INTO stu_info
VALUES ('081102', '程明', '计算机', '1', '1995-02-01', 50, '');
INSERT INTO stu_info
VALUES ('081103', '王燕', '计算机', '0', '1993-10-06', 50, '');
INSERT INTO stu_info
VALUES ('081104', '韦严平', '计算机', '1', '1994-08-26', 50, '');
INSERT INTO stu_info
VALUES ('081106', '李方方', '计算机', '1', '1994-11-20', 50, '');
INSERT INTO stu_info
VALUES ('081107', '李明', '计算机', '1', '1994-05-01', 54, '提前修完“数据结构”，并获学分');
INSERT INTO stu_info
VALUES ('081108', '林一帆', '计算机', '1', '1993-08-05', 52, '已提前修完一门课');
INSERT INTO stu_info
VALUES ('081109', '张强民', '计算机', '1', '1993-08-11', 50, '');
INSERT INTO stu_info
VALUES ('081110', '张蔚', '计算机', '0', '1995-07-22', 50, '三好生');
INSERT INTO stu_info
VALUES ('081111', '赵琳', '计算机', '0', '1994-03-18', 50, '');
INSERT INTO stu_info
VALUES ('081113', '严红', '计算机', '0', '1993-08-11', 48, '有一门课不及格，待补考');
INSERT INTO stu_info
VALUES ('081201', '王敏', '通信工程', '1', '1993-06-10', 42, '');
INSERT INTO stu_info
VALUES ('081202', '王水', '通信工程', '1', '1993-01-29', 40, '有一门课不及格，待补考');
INSERT INTO stu_info
VALUES ('081204', '马琳琳', '通信工程', '0', '1993-02-10', 42, '');
INSERT INTO stu_info
VALUES ('081206', '李计', '通信工程', '1', '1993-09-20', 42, '');
INSERT INTO stu_info
VALUES ('081210', '李红庆', '通信工程', '1', '1993-05-01', 44, '已提前修完一门课，并获得学分');
INSERT INTO stu_info
VALUES ('081216', '孙祥欣', '通信工程', '1', '1993-03-09', 42, '');
INSERT INTO stu_info
VALUES ('081218', '孙研', '通信工程', '1', '1994-10-09', 42, '');
INSERT INTO stu_info
VALUES ('081220', '吴薇华', '通信工程', '0', '1994-03-18', 42, '');
INSERT INTO stu_info
VALUES ('081241', '罗林琳', '通信工程', '0', '1994-01-30', 50, '转专业学习');

-- ----------------------------
-- Table structure for stuscore
-- ----------------------------
DROP TABLE IF EXISTS `stuscore`;
CREATE TABLE `stuscore`
(
    `stu_id`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    `sour_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    `score`   varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = MyISAM
  AUTO_INCREMENT = 1
  CHARACTER SET = utf8
  COLLATE = utf8_general_ci
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stuscore
-- ----------------------------
INSERT INTO `stuscore`
VALUES ('，', '101', '80');
INSERT INTO `stuscore`
VALUES ('081101', '102', '78');
INSERT INTO `stuscore`
VALUES ('081101', '206', '76');
INSERT INTO `stuscore`
VALUES ('081102', '102', '78');
INSERT INTO `stuscore`
VALUES ('081102', '206', '78');
INSERT INTO `stuscore`
VALUES ('081103', '101', '62');
INSERT INTO `stuscore`
VALUES ('081103', '102', '70');
INSERT INTO `stuscore`
VALUES ('081103', '206', '81');
INSERT INTO `stuscore`
VALUES ('081104', '101', '90');
INSERT INTO `stuscore`
VALUES ('081104', '102', '84');
INSERT INTO `stuscore`
VALUES ('081104', '206', '65');
INSERT INTO `stuscore`
VALUES ('081106', '101', '65');
INSERT INTO `stuscore`
VALUES ('081106', '102', '71');
INSERT INTO `stuscore`
VALUES ('081106', '206', '80');
INSERT INTO `stuscore`
VALUES ('081107', '101', '78');
INSERT INTO `stuscore`
VALUES ('081107', '102', '80');
INSERT INTO `stuscore`
VALUES ('081113', '206', '68');
INSERT INTO `stuscore`
VALUES ('081113', '101', '85');
INSERT INTO `stuscore`
VALUES ('081201', '102', '64');
INSERT INTO `stuscore`
VALUES ('081202', '206', '87');
INSERT INTO `stuscore`
VALUES ('081204', '101', '66');
INSERT INTO `stuscore`
VALUES ('081206', '102', '83');
INSERT INTO `stuscore`
VALUES ('081210', '206', '85');
INSERT INTO `stuscore`
VALUES ('081216', '101', '95');
INSERT INTO `stuscore`
VALUES ('081218', '102', '90');
INSERT INTO `stuscore`
VALUES ('081220', '206', '89');
INSERT INTO `stuscore`
VALUES ('081221', '101', '91');
INSERT INTO `stuscore`
VALUES ('081241', '102', '70');
INSERT INTO `stuscore`
VALUES ('081107', '101', '78');
INSERT INTO `stuscore`
VALUES ('081107', '102', '80');
INSERT INTO `stuscore`
VALUES ('081113', '206', '68');
INSERT INTO `stuscore`
VALUES ('081113', '101', '85');
INSERT INTO `stuscore`
VALUES ('081201', '102', '64');
INSERT INTO `stuscore`
VALUES ('081202', '206', '87');
INSERT INTO `stuscore`
VALUES ('081204', '101', '66');
INSERT INTO `stuscore`
VALUES ('081206', '102', '83');
INSERT INTO `stuscore`
VALUES ('081210', '206', '85');
INSERT INTO `stuscore`
VALUES ('081216', '101', '95');
INSERT INTO `stuscore`
VALUES ('081218', '102', '90');
INSERT INTO `stuscore`
VALUES ('081220', '206', '89');
INSERT INTO `stuscore`
VALUES ('081221', '101', '91');
INSERT INTO `stuscore`
VALUES ('081241', '102', '70');

SET FOREIGN_KEY_CHECKS = 1;

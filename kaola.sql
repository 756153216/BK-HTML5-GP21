/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50553
 Source Host           : localhost:3306
 Source Schema         : kaola

 Target Server Type    : MySQL
 Target Server Version : 50553
 File Encoding         : 65001

 Date: 30/11/2020 08:18:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for goodlist
-- ----------------------------
DROP TABLE IF EXISTS `goodlist`;
CREATE TABLE `goodlist`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `imgList` varchar(2550) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片列表',
  `hot` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否热销',
  `new` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否新品',
  `selfTag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否自营',
  `crosstagTag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否跨境',
  `price` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '当前价格',
  `blackCardPrice` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '黑卡价格',
  `referencePrice` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '参考价格',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品标题',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品描述',
  `specification` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品规格，型号',
  `productTag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品标签',
  `countryTag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '国家标签',
  `countrypic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '国旗图片',
  `buybox` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '购买数量',
  `comments` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品评价及评论列表',
  `store` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '店铺名字',
  `brand` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '品牌名字',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1006 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goodlist
-- ----------------------------
INSERT INTO `goodlist` VALUES (1001, 'https://kaola-haitao.oss.kaolacdn.com/47b3515258314518874ce9da07910e2a15832164351814F3503426E97C22D7641D910D6FE751AimgFile?x-oss-process=image/resize,w_800/quality,q_85', '热销', NULL, '自营', '跨境', '108', '', '129', 'vidivici 净透美肌洁面乳 120毫升 女神蚕丝嫩白洁面', '传说中的小香奈儿洗面奶，卸妆、洁面二合一！清爽白滑的奶油质地，泡沫量真的大得惊人，清爽舒适不油腻，易冲洗、无残留，同时还有保湿和提亮的功效哦~', '洁面3支,洁面1支,洁面2支', '包税', '韩国', 'https://kaola-haitao.oss.kaolacdn.com/c0be3e6c11de4adb9ea90df712da9aea1419662386933i46mbwfo10003.png?x-oss-process=image/resize,w_48/quality,q_85', '3', '40846', '考拉海购自营', 'vidivici');
INSERT INTO `goodlist` VALUES (1002, 'https://kaola-haitao.oss.kaolacdn.com/f65e1cccd69e42aea221285a1a5a3bab158735165691162BEC4122C105AA283CE1ED74278A159.jpg?x-oss-process=image/resize,w_800/quality,q_85', '热销', NULL, '自营', '跨境', '178', '165', '228', 'EltaMD 氨基酸泡沫卸妆洁面乳 207毫升 泡沫绵密 温和不刺激', '【气味具有批次性，不同批次会有差异】EltaMD当家花旦！泡沫丰富到可以做泡泡面膜！100昏的脸部吸尘器！打开是淡淡的香气，在手心揉开，再在脸上按摩大概30s就会起泡，脸部吸饱精华，毛孔开始呼吸。洗完脸幸福感满满', '', '包税,特价', '美国', 'https://kaola-haitao.oss.kaolacdn.com/c0be3e6c11de4adb9ea90df712da9aea1419662386933i46mbwfo10003.png?x-oss-https://kaola-haitao.oss.kaolacdn.com/1077833fa2854dcb97502084f24f449d1419659976324i46kw8bh10001.png?x-oss-process=image/resize,w_48/quality,q_85', '3', '100395', '考拉海购自营', 'EltaMD');
INSERT INTO `goodlist` VALUES (1003, 'https://kaola-haitao.oss.kaolacdn.com/7a012400ece7403b90dec4a1122613181595225919516CA88DB2AD2F6C35523F275C2E84F58CC.jpg?x-oss-process=image/resize,w_800/quality,q_85', '热销', NULL, '自营', '跨境', '139', '', '179', 'Sulwhasoo 雪花秀 顺行洗面奶 200毫升', '雪花秀的明星产品之一，氨基酸型洗面奶的代表！植物精华和氨基酸结合，淡淡的香味不难闻却给人很安心的感觉，啫喱质地泡沫不会太多，但是清洁力足够。洗完小脸干干净净不紧绷，彩妆残留也能轻松一扫光。', NULL, '包税', '美国', 'https://kaola-haitao.oss.kaolacdn.com/1077833fa2854dcb97502084f24f449d1419659976324i46kw8bh10001.png?x-oss-process=image/resize,w_48/quality,q_85', '2', '16709', '考拉海购自营', 'Sulwhasoo 雪花秀');
INSERT INTO `goodlist` VALUES (1004, 'https://kaola-haitao.oss.kaolacdn.com/0b755d6f55ee43eb9086a10752c33bc81581558657223k6k36u2a10693.jpg?x-oss-process=image/resize,w_800/quality,q_85', '热销', NULL, '自营', '跨境', '155', '146', '285', 'Whoo 后 拱辰享洗面奶泡沫洁面膏180毫升', '大名鼎鼎的气韵生润颜洁面膏，富含草本精华，浅黄色质地，非常柔和，味道是淡淡的参味，搭配起泡网就能打出丰富的泡沫，清洁力度也很强，但一点也不刺激皮肤！可以轻松洗除皮肤油脂、污垢及彩妆残留物~', NULL, '包税,豆抵1元,特价', '韩国', 'https://kaola-haitao.oss.kaolacdn.com/c0be3e6c11de4adb9ea90df712da9aea1419662386933i46mbwfo10003.png?x-oss-process=image/resize,w_48/quality,q_85', '6', '13759', '考拉海购自营', 'Whoo 后');

-- ----------------------------
-- Table structure for shopcar
-- ----------------------------
DROP TABLE IF EXISTS `shopcar`;
CREATE TABLE `shopcar`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `price` decimal(10, 0) NULL DEFAULT NULL COMMENT '价格',
  `referenceprice` decimal(10, 0) NULL DEFAULT NULL COMMENT '原价',
  `num` int(11) NULL DEFAULT NULL COMMENT '数量',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1005 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shopcar
-- ----------------------------
INSERT INTO `shopcar` VALUES (1001, 'vidivici 净透美肌洁面乳 120毫升 女神蚕丝嫩白洁面', 'https://kaola-haitao.oss.kaolacdn.com/47b3515258314518874ce9da07910e2a15832164351814F3503426E97C22D7641D910D6FE751AimgFile?x-oss-process=image/resize,w_800/quality,q_85', 108, 129, NULL);
INSERT INTO `shopcar` VALUES (1002, 'EltaMD 氨基酸泡沫卸妆洁面乳 207毫升 泡沫绵密 温和不刺激', 'https://kaola-haitao.oss.kaolacdn.com/f65e1cccd69e42aea221285a1a5a3bab158735165691162BEC4122C105AA283CE1ED74278A159.jpg?x-oss-process=image/resize,w_800/quality,q_85', 178, 228, NULL);
INSERT INTO `shopcar` VALUES (1003, 'Sulwhasoo 雪花秀 顺行洗面奶 200毫升', 'https://kaola-haitao.oss.kaolacdn.com/7a012400ece7403b90dec4a1122613181595225919516CA88DB2AD2F6C35523F275C2E84F58CC.jpg?x-oss-process=image/resize,w_800/quality,q_85', 139, 179, NULL);
INSERT INTO `shopcar` VALUES (1004, 'Whoo 后 拱辰享洗面奶泡沫洁面膏180毫升', 'https://kaola-haitao.oss.kaolacdn.com/0b755d6f55ee43eb9086a10752c33bc81581558657223k6k36u2a10693.jpg?x-oss-process=image/resize,w_800/quality,q_85', 155, 285, NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1014 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1001, 'admin', 'Aa123456');
INSERT INTO `user` VALUES (1002, '123', '123');
INSERT INTO `user` VALUES (1003, '1234', '123');
INSERT INTO `user` VALUES (1004, '12345', '12345');
INSERT INTO `user` VALUES (1005, '123456', '123456');
INSERT INTO `user` VALUES (1006, '1234567', '1234567');
INSERT INTO `user` VALUES (1007, '111', '111');
INSERT INTO `user` VALUES (1008, '1111', '1111');
INSERT INTO `user` VALUES (1009, '1314', '1314');
INSERT INTO `user` VALUES (1010, '101', '101');
INSERT INTO `user` VALUES (1011, '102', '102');
INSERT INTO `user` VALUES (1012, '103', '103');
INSERT INTO `user` VALUES (1013, '123123', '123123');

SET FOREIGN_KEY_CHECKS = 1;

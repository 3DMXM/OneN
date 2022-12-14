# Host: localhost  (Version: 5.6.50-log)
# Date: 2022-06-21 16:30:09
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "file_data"
#

CREATE TABLE `file_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_fid` varchar(255) DEFAULT NULL COMMENT '文件id',
  `file_data` longtext COMMENT '文件内容',
  `file_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for table "file_items"
#

CREATE TABLE `file_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_fid` varchar(255) DEFAULT NULL COMMENT '文件ID',
  `file_parent` varchar(255) DEFAULT NULL COMMENT '父级目录',
  `file_name` varchar(255) DEFAULT NULL COMMENT '文件名称',
  `file_type` varchar(255) DEFAULT NULL COMMENT '文件类型',
  `file_size` int(11) DEFAULT NULL COMMENT '文件大小',
  `file_downloadUrl` tinytext COMMENT '下载地址',
  `childCount` int(11) DEFAULT NULL COMMENT '子目录数量',
  `lastModifiedDateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `file_up_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文件列表';

#
# Structure for table "link"
#

CREATE TABLE `link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `short_link` varchar(255) DEFAULT NULL COMMENT '短链',
  `long_link` longtext COMMENT '长链',
  `click_cot` int(11) DEFAULT '0' COMMENT '点击次数',
  PRIMARY KEY (`id`),
  KEY `short_link` (`short_link`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='短链';

#
# Structure for table "seo"
#

CREATE TABLE `seo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seo_parent` varchar(255) DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_keywords` varchar(255) DEFAULT NULL,
  `seo_description` varchar(255) DEFAULT NULL,
  `seo_click_cnt` int(11) DEFAULT NULL,
  `seo_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `seo_parent` (`seo_parent`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#
# Structure for table "show_file"
#

CREATE TABLE `show_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `show_image` varchar(255) DEFAULT NULL,
  `show_video` varchar(255) DEFAULT NULL,
  `show_audio` varchar(255) DEFAULT NULL,
  `show_code` varchar(255) DEFAULT NULL,
  `show_code2` varchar(255) DEFAULT NULL,
  `show_doc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文件显示设置';

#
# Structure for table "site_info"
#

CREATE TABLE `site_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_name` varchar(255) DEFAULT NULL COMMENT '网站名称',
  `onedrive_root` varchar(255) DEFAULT NULL COMMENT '起始目录',
  `cache_expire_time` bigint(20) DEFAULT '3600' COMMENT '缓存过期时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='网站信息';

#
# Structure for table "token"
#

CREATE TABLE `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accessToken` longtext,
  `refreshToken` longtext,
  `scopes` varchar(255) DEFAULT NULL COMMENT '权限',
  `time` datetime DEFAULT NULL COMMENT '更新时间',
  `expiresOn` varchar(255) DEFAULT NULL COMMENT '到期时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for table "user"
#

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL COMMENT '用户名',
  `user_password` varchar(255) DEFAULT NULL COMMENT '密码',
  `user_token` varchar(255) DEFAULT NULL COMMENT '登录凭证',
  PRIMARY KEY (`id`),
  KEY `user_token` (`user_token`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='管理员账号';

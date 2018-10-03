CREATE TABLE `transform_config`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `is_on` int(1) NOT NULL,
  `check_start_id` bigint(0) NOT NULL,
  `check_end_id` bigint(0) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `transform_config`(is_on, check_start_id, check_end_id) values(1, 1, 9999999999);
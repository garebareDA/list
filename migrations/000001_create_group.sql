-- +migrate Up
CREATE TABLE IF NOT EXISTS `groups` (id VARCHAR(50) PRIMARY KEY, name VARCHAR(32));

-- +migrate Down
DROP TABLE IF EXISTS `groups` ;
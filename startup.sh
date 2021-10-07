#!/usr/bin/env bash
service mysql start
echo "create database list; USE mysql;UPDATE user SET plugin='mysql_native_password' WHERE User='root';FLUSH PRIVILEGES;" | sudo mysql -u root
service mysql restart
make create-db
make run

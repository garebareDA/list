.PHONY:run
run:
	go run main.go

.PHONY: create-db
create-db:
	sql-migrate up -env="development"
.PHONY: drop-db
drop-db:
	sql-migrate down

.PHONY: start-db
drop-db:
	service mysql start
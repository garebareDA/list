.PHONY:run
run:
	npm run build --prefix frontend
	go run main.go

.PHONY: create-db
create-db:
	sql-migrate up -env="development"
.PHONY: drop-db
drop-db:
	sql-migrate down

.PHONY: start-db
start-db:
	service mysql start
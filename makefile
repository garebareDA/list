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
start-db:
	service mysql start

.PHONY:build
build:
	docker build . -t list

.PHONY:docker-run
docker-run:
	docker run list
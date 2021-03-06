package infra

import (
	"database/sql"
	"fmt"
	"time"
	_ "github.com/lib/pq"
	"github.com/go-gorp/gorp"
	"github.com/garebareDA/list/log"
	"github.com/garebareDA/list/config"
)

func NewDB() (*gorp.DbMap, error) {
	url := config.Database()
	db, err := sql.Open("postgres", url)
	if err != nil {
		return nil, fmt.Errorf("failed to open Mysql: %w", err)
	}

	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.PostgresDialect{}}
	db.SetMaxIdleConns(100)
	db.SetMaxOpenConns(100)

	logger := log.New()

	for {
		err := db.Ping()
		if err == nil {
			break
		}
		logger.Infof("%s\n", err.Error())
		time.Sleep(time.Second * 2)
	}

	return dbmap, nil
}

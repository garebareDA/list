package infra

import (
	"database/sql"
	"fmt"
	"time"
	"github.com/go-gorp/gorp"
	"github.com/garebareDA/list/log"
)

func NewDB() (*gorp.DbMap, error) {
	db, err := sql.Open("mysql", "")
	if err != nil {
		return nil, fmt.Errorf("failed to open Mysql: %w", err)
	}

	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.MySQLDialect{Engine: "InnoDB", Encoding: "UTF8"}}

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

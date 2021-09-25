package log

import "github.com/labstack/gommon/log"

func New() *log.Logger {
	logger := log.New("api")
	logger.SetLevel(log.INFO)
	return logger
}
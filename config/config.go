package config

import "os"

func Port() string {
	return ":" + os.Getenv("PORT")
}
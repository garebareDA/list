package config

import "os"

func Port() string {
	port := os.Getenv("PORT")
	if port == "" {
		return ":8000"
	}
	return ":" + port
}

func Database() string {
	url := os.Getenv("DATABASE_URL")
	if url == "" {
		return ""
	}

	return url;
}
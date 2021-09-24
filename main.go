package main

import (
	"github.com/gin-gonic/gin"
	socketio "github.com/googollee/go-socket.io"
)

var s *socketio.Server = socketio.NewServer(nil)

func main() {
	r := gin.Default()

	r.GET("/socket.io", socketHandler)
	r.POST("/socket.io", socketHandler)
	r.Handle("WS", "/socket.io", socketHandler)
	r.Handle("WSS", "/socket.io", socketHandler)

	api := r.Group("/api")
	api.POST("/group")
	api.GET("/group/:id")

	r.Run(":8000")
}

func socketHandler(c *gin.Context) {
	s.OnError("errror", func(c socketio.Conn, e error) {
		
	})

	s.ServeHTTP(c.Writer, c.Request)
}

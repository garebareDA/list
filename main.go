package main

import (
	"net/http"
	"os"

	"github.com/garebareDA/list/controller"
	"github.com/garebareDA/list/infra"
	"github.com/garebareDA/list/log"
	"github.com/garebareDA/list/repository"
	"github.com/gin-gonic/gin"
	socketio "github.com/googollee/go-socket.io"
)

func main() {
	logger := log.New()
	dbMap, err := infra.NewDB()
	if err != nil {
		logger.Errorf("failed NewDB: %s", err.Error())
		os.Exit(1)
	}
	defer func() {
		err := dbMap.Db.Close()
		if err != nil {
			logger.Errorf("failed to close DB: %s", err.Error())
		}
	}()

	groupRepo := repository.NewGroupReppsitory(dbMap)
	groupCtrl := controller.NewGroupController(groupRepo, logger)

	s := socketio.NewServer(nil)

	s.OnEvent("/", "join", func(c socketio.Conn, msg string) {
		logger.Printf(msg)
		c.Join(msg)
	})

	s.OnEvent("/", "message",  func(c socketio.Conn, msg string) {
		logger.Printf(msg)
	})

	s.OnConnect("/", func(c socketio.Conn) error {
		c.SetContext("")
		logger.Printf("Connected ID : %s\n", c.ID())
		return nil
	})

	s.OnError("/", func(c socketio.Conn, e error) {
		logger.Printf("meet error:%s", e)
	})

	go func() {
		if err := s.Serve(); err != nil {
			logger.Fatalf("socketio listen error: %s\n", err)
		}
	}()
	defer s.Close()

	r := gin.Default()
	r.LoadHTMLGlob("static/*.html")

	r.GET("/", func(c *gin.Context) { c.HTML(http.StatusOK, "index.html", gin.H{}) })

	r.GET("/socket.io/*any", gin.WrapH(s))
	r.POST("/socket.io/*any", gin.WrapH(s))
	r.Static("/assets", "./static/assets")

	api := r.Group("/api")
	api.POST("/group", groupCtrl.Create)
	api.GET("/group/:group_id", groupCtrl.GetByName)

	r.Run(":8000")
}

package main

import (
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
	go s.Serve()
	defer s.Close()

	s.OnConnect("/", func(c socketio.Conn) error {
		c.SetContext("")
		logger.Printf("Connected ID : %s\n", c.ID())
		return nil
	})

	r := gin.Default()
	r.GET("/socket.io/", gin.WrapH(s))
	r.POST("/socket.io/", func(context *gin.Context) { s.ServeHTTP(context.Writer, context.Request) })
	r.Static("/", "./static")

	api := r.Group("/api")
	api.POST("/group", groupCtrl.Create)
	api.GET("/group/:group_id", groupCtrl.GetByName)

	r.Run(":8000")
}

package controller

import (
	"encoding/json"

	"github.com/garebareDA/list/domain/entity"
	socketio "github.com/googollee/go-socket.io"
	"github.com/labstack/gommon/log"
)

type UserController struct {
	server *socketio.Server
	logger *log.Logger
}

func NewUserController(server *socketio.Server, logger *log.Logger) *UserController {
	return &UserController{
		server: server,
		logger: logger,
	}
}

func (ctrl *UserController) Message(c socketio.Conn, msg string) {
	ctrl.logger.Printf(msg)
	var user entity.User
	if err := json.Unmarshal([]byte(msg), &user); err != nil {
		ctrl.logger.Errorf("failed to message parse json: %v\n", err)
		c.Close()
	}
	ctrl.server.BroadcastToRoom("/", user.Room, "message", msg)
}

func (ctrl *UserController) Join(c socketio.Conn, msg string) {
	ctrl.logger.Printf(msg)
	var user entity.User
	if err := json.Unmarshal([]byte(msg), &user); err != nil {
		ctrl.logger.Errorf("failed to message parse json: %v\n", err)
		c.Close()
	}
	c.Join(user.Room)
	ctrl.server.BroadcastToRoom("/", user.Room, "join", msg)
}

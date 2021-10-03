package controller_test

import (
	"testing"

	"github.com/garebareDA/list/controller"
	"github.com/garebareDA/list/log"

	"github.com/zhouhui8915/go-socket.io-client"
	socketio "github.com/googollee/go-socket.io"
)

func UserTest_Message(t *testing.T) {
	logger := log.New()
	s := socketio.NewServer(nil)
	userCtrl := controller.NewUserController(s, logger);

	s.OnEvent("/", "message", userCtrl.Message)
	
}

func UserTest_Join(t *testing.T) {
	logger := log.New()
	s := socketio.NewServer(nil)
	userCtrl := controller.NewUserController(s, logger);

	s.OnEvent("/", "join", userCtrl.Join)
}

package controller_test

import (
	"io"
	"net"
	"net/http"
	"net/url"
	"testing"

	"github.com/garebareDA/list/controller"
	"github.com/garebareDA/list/log"

	socketio "github.com/googollee/go-socket.io"
)

type fakeNamespace interface {
	Context() interface{}
	SetContext(ctx interface{})

	Namespace() string
	Emit(eventName string, v ...interface{})

	Join(room string)
	Leave(room string)
	LeaveAll()
	Rooms() []string
}

type fakeConn struct {
	io.Closer
	fakeNamespace
	IDFunc           func() string
	URLFunc          func() url.URL
	LocalAddrFunc    func() net.Addr
	RemoteAddrFunc   func() net.Addr
	RemoteHeaderFunc func() http.Header
	JoinFunc func(room string)
}

func (c fakeConn) ID() string {
	return c.IDFunc()
}

func (c fakeConn) URL() url.URL {
	return c.URLFunc()
}

func (c fakeConn) LocalAddr() net.Addr {
	return c.LocalAddrFunc()
}

func (c fakeConn) RemoteAddr() net.Addr {
	return c.RemoteAddrFunc()
}

func (c fakeConn) RemoteHeader() http.Header {
	return c.RemoteHeaderFunc()
}

func (c fakeConn) Join(msg string) {
	c.JoinFunc(msg)
}

func TestUser_Message(t *testing.T) {
	logger := log.New()
	s := socketio.NewServer(nil)
	userCtrl := controller.NewUserController(s, logger)

	req := `{
		"id": "id",
		"name": "name",
		"icon": "icon",
		"room": "room",
		"message": "message"
		}`
	conn := &fakeConn{}
	userCtrl.Message(conn, req)
}

func TestUser_Join(t *testing.T) {
	logger := log.New()
	s := socketio.NewServer(nil)
	userCtrl := controller.NewUserController(s, logger)
	req := `{
		"id": "id",
		"name": "name",
		"icon": "icon",
		"room": "room",
		"message": "message"
		}`

	conn := fakeConn{
		JoinFunc: func(room string) {
			if room != "room" {
				logger.Fatalf("failde room join %s", room)
			}
		},

		IDFunc: func() string {
			return "1"
		},
	}
	userCtrl.Join(conn, req)
}

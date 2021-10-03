package controller_test

import (
	"bytes"
	"encoding/json"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/garebareDA/list/controller"
	"github.com/garebareDA/list/domain/entity"
	"github.com/garebareDA/list/infra"
	"github.com/garebareDA/list/log"
	"github.com/garebareDA/list/repository"
	"github.com/gin-gonic/gin"

	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
)

func TestGroup_Create(t *testing.T) {
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

	w := httptest.NewRecorder()
	con, _ := gin.CreateTestContext(w)

	req := `{"name": "example"}`

	con.Request = httptest.NewRequest("GET", "/", bytes.NewBufferString(req))
	groupCtrl.Create(con)

	var got entity.Group
	if err = json.Unmarshal(w.Body.Bytes(), &got); err != nil {
		t.Fatal(err, string(w.Body.Bytes()))
	}

	want := entity.Group {
		Name:"example",
	}

	opts := cmpopts.IgnoreFields(got, "ID")
	if diff := cmp.Diff(want, got, opts); diff != "" {
		t.Errorf("Create (-want +got) =\n%s\n", diff)
	}
}

func TestGroup_GetByName(t *testing.T) {
	want := &entity.Group{
		ID: "GROUP_ID",
		Name: "GROUP_NAME",
	}

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

	dbMap.AddTableWithName(entity.Group{}, "groups").SetKeys(false, "id")
	if err := dbMap.Insert(want); err != nil {
		t.Fatalf("failed to insert group: %v", err)
	}
	defer func() {
		if _, err := dbMap.Delete(want); err != nil {
			t.Fatalf("failed to delete group: %v", err)
		}
	}()

	groupRepo := repository.NewGroupReppsitory(dbMap)
	groupCtrl := controller.NewGroupController(groupRepo, logger)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	c.Params = append(c.Params, gin.Param{Key: "group_id", Value: "GROUP_ID"})

	groupCtrl.GetByName(c)

	got := &entity.Group{}
	if err := json.Unmarshal(w.Body.Bytes(), got); err != nil {
		t.Fatalf("failed to unmarshal: %v", err)
	}

	if diff := cmp.Diff(want, got); diff != "" {
		t.Fatalf(diff)
	}
}

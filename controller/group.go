package controller

import (
	"net/http"

	"github.com/garebareDA/list/domain/entity"
	"github.com/garebareDA/list/repository"
	"github.com/gin-gonic/gin"
	"github.com/labstack/gommon/log"
)

type GroupController struct {
	repository *repository.GroupRepository
	logger *log.Logger
}

func NewGroupController(r *repository.GroupRepository, logger *log.Logger) *GroupController {
	return &GroupController{
		repository: r,
		logger: logger,
	}
}

func (ctrl *GroupController) Create(c *gin.Context) {
	group := &entity.Group{}
	err := c.ShouldBindJSON(group)
	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		ctrl.logger.Errorf("failed to create group: %v\n", err)
	}

	group.NewID()
	if err := ctrl.repository.Insert(group); err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		ctrl.logger.Errorf("failed to create group :%v\n", err)
		return
	}

	c.JSON(http.StatusCreated, group)
	return
}

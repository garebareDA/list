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
		return
	}

	group.NewID()
	if err := ctrl.repository.Insert(group); err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		ctrl.logger.Errorf("failed to create group :%v\n", err)
		return
	}

	c.JSON(http.StatusCreated, group)
}

func (ctrl *GroupController) GetByName(c *gin.Context) {
	id := c.Param("group_id")
	if id == "" {
		c.String(http.StatusBadRequest, "invald path paramater group_id")
		ctrl.logger.Errorf("invald path paramter group_id: group_id=%s", id)
		return
	}

	group, err := ctrl.repository.FindByID(id)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		ctrl.logger.Errorf("failed to get group by id %w", err)
		return
	}

	c.JSON(http.StatusOK, group)
}

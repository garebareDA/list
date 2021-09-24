package controller

import (
	"github.com/garebareDA/list/repository"
	"github.com/gin-gonic/gin"
)

type GroupController struct {
	repository *repository.GroupRepository
}

func NewGroupController(r *repository.GroupRepository) *GroupController {
	return &GroupController{
		repository: r,
	}
}

func (ctrl *GroupController) Create(c *gin.Context) {
	
}

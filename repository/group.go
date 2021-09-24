package repository

import (
	"github.com/garebareDA/list/domain/entity"
	"github.com/go-gorp/gorp"
)

type GroupRepository struct {
	dbmap *gorp.DbMap
}

func NewGroupReppsitory(dbmap *gorp.DbMap) *GroupRepository {
	dbmap.AddTableWithName(entity.Group{}, "groups")
	return &GroupRepository{dbmap: dbmap}
}

func (g *GroupRepository) Insert(group *entity.Group) error {
	group.NewID()
	return nil
}

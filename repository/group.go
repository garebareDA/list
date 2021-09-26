package repository

import (
	"fmt"

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

func (r *GroupRepository) Insert(group *entity.Group) error {
	if err := r.dbmap.Insert(group); err != nil {
		return fmt.Errorf("failed to execute query: %w", err)
	}
	return nil
}

func (r *GroupRepository)FindByID(groupID string) (*entity.Group, error) {
	query := `SELECT * FROM groups WHERE id = ?`

	group := &entity.Group{}
	if err := r.dbmap.SelectOne(group, query, groupID); err != nil {
		return nil, fmt.Errorf("failed to execute query: %w", err)
	}

	return group, nil
}

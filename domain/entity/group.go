package entity

import "github.com/google/uuid"

type Group struct {
	ID string `json:"id" db:"id"`
	Name string `json:"name" db:"name"`
}

func (g *Group) NewID() {
	g.ID = uuid.New().String()
	return
}

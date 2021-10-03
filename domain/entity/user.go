package entity

type User struct {
	ID string `json:"id"`
	Name string `json:"name"`
	Icon string `json:"icon"`
	Room string `json:"room"`
	Message string `json:"message"`
}
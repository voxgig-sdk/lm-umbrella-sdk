package core

type LmUmbrellaError struct {
	IsLmUmbrellaError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewLmUmbrellaError(code string, msg string, ctx *Context) *LmUmbrellaError {
	return &LmUmbrellaError{
		IsLmUmbrellaError: true,
		Sdk:              "LmUmbrella",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *LmUmbrellaError) Error() string {
	return e.Msg
}

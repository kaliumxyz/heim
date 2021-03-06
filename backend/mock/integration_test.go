package mock

import (
	"testing"

	"euphoria.io/heim/backend"
	"euphoria.io/heim/proto"
)

func TestTestBackend(t *testing.T) {
	backend.IntegrationTest(t, func(*proto.Heim) (proto.Backend, error) { return &TestBackend{}, nil })
}

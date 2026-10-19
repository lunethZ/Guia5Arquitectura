// Prueba del servicio con un repositorio "falso": las reglas funcionan sin base de datos ni HTTP.
const test = require("node:test");
const assert = require("node:assert/strict");
const { TaskService } = require("../src/services/taskService");
const { ValidationError, NotFoundError } = require("../src/errors");

const fakeRepository = {
  create: (data) => ({ id: 1, ...data }),
  updateStatus: (id, status) => (Number(id) === 1 ? { id: 1, status } : null)
};
const service = new TaskService(fakeRepository);

test("crea una tarea válida con estado pendiente", () => {
  const task = service.createTask({ title: "  Hacer tarea  " });
  assert.equal(task.title, "Hacer tarea");
  assert.equal(task.status, "pendiente");
});

test("rechaza un título muy corto", () => {
  assert.throws(() => service.createTask({ title: "ab" }), ValidationError);
});

test("rechaza un estado inválido", () => {
  assert.throws(() => service.changeStatus(1, "hecha"), ValidationError);
});

test("avisa si la tarea no existe", () => {
  assert.throws(() => service.changeStatus(99, "finalizada"), NotFoundError);
});

test("cambia el estado de una tarea que existe", () => {
  assert.equal(service.changeStatus(1, "finalizada").status, "finalizada");
});

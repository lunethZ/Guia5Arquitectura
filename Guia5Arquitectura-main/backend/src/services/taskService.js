// SERVICIO: reglas de negocio (validaciones). No usa req/res ni códigos HTTP.
const { STATUSES } = require("../models/Task");
const { ValidationError, NotFoundError } = require("../errors");

class TaskService {
  constructor(repository) {
    this.repository = repository; // se recibe desde afuera (inyección de dependencias)
  }

  listTasks() {
    return this.repository.findAll();
  }

  createTask({ title, description = "" }) {
    if (typeof title !== "string" || title.trim().length < 3) {
      throw new ValidationError("El título debe tener al menos 3 caracteres.");
    }
    return this.repository.create({
      title: title.trim(),
      description: String(description).trim(),
      status: "pendiente"
    });
  }

  changeStatus(id, status) {
    if (!STATUSES.includes(status)) {
      throw new ValidationError(`Estado inválido. Use: ${STATUSES.join(", ")}.`);
    }
    const updated = this.repository.updateStatus(id, status);
    if (!updated) {
      throw new NotFoundError("No existe una tarea con ese identificador.");
    }
    return updated;
  }
}

module.exports = { TaskService };

// MODELO: define cómo es una tarea. No sabe nada de HTTP ni de bases de datos.
const STATUSES = ["pendiente", "en progreso", "finalizada"];

class Task {
  constructor({ id, title, description = "", status = "pendiente" }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = { Task, STATUSES };

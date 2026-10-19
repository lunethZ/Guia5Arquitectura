// CONTROLADOR: recibe la petición, llama al servicio y responde. Aquí se decide el código HTTP.
const { ValidationError, NotFoundError } = require("../errors");

function sendError(error, res) {
  if (error instanceof ValidationError) return res.status(400).json({ error: error.message });
  if (error instanceof NotFoundError) return res.status(404).json({ error: error.message });
  return res.status(500).json({ error: error.message || "Error interno del servidor" });
}

function createTaskController(service) {
  return {
    list(req, res) {
      try { res.json(service.listTasks()); } catch (error) { sendError(error, res); }
    },
    create(req, res) {
      try { res.status(201).json(service.createTask(req.body || {})); } catch (error) { sendError(error, res); }
    },
    updateStatus(req, res) {
      try { res.json(service.changeStatus(req.params.id, req.body?.status)); } catch (error) { sendError(error, res); }
    }
  };
}

module.exports = { createTaskController };

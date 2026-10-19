// RUTAS: une cada dirección (URL) con un método del controlador.
const express = require("express");

function createTaskRoutes(controller) {
  const router = express.Router();
  router.get("/", controller.list);
  router.post("/", controller.create);
  router.patch("/:id/status", controller.updateStatus);
  return router;
}

module.exports = { createTaskRoutes };

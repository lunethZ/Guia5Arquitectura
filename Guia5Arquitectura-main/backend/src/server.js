// ARRANQUE: crea las piezas, las conecta y enciende el servidor.
const express = require("express");
const cors = require("cors");
const { TaskRepository } = require("./repositories/taskRepository");
const { TaskService } = require("./services/taskService");
const { createTaskController } = require("./controllers/taskController");
const { createTaskRoutes } = require("./routes/taskRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const repository = new TaskRepository();
const service = new TaskService(repository);
const controller = createTaskController(service);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/tasks", createTaskRoutes(controller));

app.listen(port, () => console.log(`API lista en http://localhost:${port}`));

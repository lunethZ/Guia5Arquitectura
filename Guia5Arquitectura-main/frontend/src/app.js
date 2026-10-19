// APP (controlador): conecta la pantalla (ui.js) con el backend (api.js) y escucha los eventos.
async function loadTasks() {
  try {
    renderTasks(await api.list());
    showApiConnected();
  } catch (error) {
    showApiUnavailable(error.message);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";
  try {
    await api.create({ title: titleInput.value, description: descriptionInput.value });
    form.reset();
    showSuccess("Tarea creada correctamente.");
    await loadTasks();
  } catch (error) {
    showError(error.message);
  }
});

document.querySelector("#refresh").addEventListener("click", loadTasks);

taskList.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-save-id]");
  if (!button) return;
  const id = button.dataset.saveId;
  const select = taskList.querySelector(`[data-task-id="${id}"]`);
  try {
    await api.updateStatus(id, select.value);
    await loadTasks();
  } catch (error) {
    showError(error.message);
  }
});

loadTasks();

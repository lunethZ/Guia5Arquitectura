// API: aquí vive la comunicación con el backend (fetch). No toca la pantalla.
const API_URL = "http://localhost:3000/api/tasks";

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "No se pudo completar la operación.");
  return data;
}

const api = {
  list: () => request(API_URL),
  create: (task) => request(API_URL, { method: "POST", body: JSON.stringify(task) }),
  updateStatus: (id, status) =>
    request(`${API_URL}/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) })
};

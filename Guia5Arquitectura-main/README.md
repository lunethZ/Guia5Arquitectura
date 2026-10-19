# Gestor de tareas — Guía 5 (refactorizado)

## Estructura
```
backend/src/
├── server.js        Arranque: crea las piezas y las conecta
├── routes/          URL -> controlador
├── controllers/     Recibe la petición y responde
├── services/        Reglas de negocio (validaciones)
├── repositories/    Guarda y busca los datos
├── models/          Cómo es una tarea
└── errors.js        Errores propios

frontend/src/
├── api.js           Habla con el backend (fetch)
├── ui.js            Dibuja la pantalla
└── app.js           Conecta ui.js y api.js
```

## Cómo ejecutarlo
```
cd backend
npm install
npm start      (servidor en http://localhost:3000)
npm test       (pruebas)
```
Luego abre `frontend/index.html` en el navegador.

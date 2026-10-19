// Errores propios: el servicio dice QUÉ pasó; el controlador decide qué código HTTP usar.
class ValidationError extends Error {}
class NotFoundError extends Error {}

module.exports = { ValidationError, NotFoundError };

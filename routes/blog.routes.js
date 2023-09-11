// Se implementa el enrutador de Express

const { Router } = require("express");
const router = Router();
const {
  actualizarPublicacion,
  crearPublicacion,
  eliminarPublicacion,
  obtenerPublicaciones,
} = require("../controllers/blog.controller");

// ==================================================
//         Rutas para renderizar vistas
// ==================================================

router.get("/", (req, res) => {
  res.render("home");
});

// Ruta para devolver la vista admin
router.get("/admin", (req, res) => {
  res.render("admin");
});

// ==================================================
//         Rutas para CRUD de Publicaciones
// ==================================================

// Crear nueva publicación
router.post("/publicacion", crearPublicacion);

// Obtener todas las publicaciones
router.get("/publicaciones", obtenerPublicaciones);

// Actualizar una publicación
router.put("/publicacion/:id", actualizarPublicacion);

// Eliminar una publicación
router.delete("/publicacion/:id", eliminarPublicacion);

module.exports = router;

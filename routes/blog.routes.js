// Se implementa el enrutador de Express
// const router = require('express').Router();

const { Router } = require("express");
const router = Router();
const {
  actualizarPublicacion,
  crearPublicacion,
  eliminarPublicacion,
  obtenerPublicaciones,
  obtenerPublicacion,
} = require("../controllers/blog.controller");

// ==================================================
//         Rutas para renderizar vistas
// ==================================================

// Ruta para mostrar la vista home o principal
router.get("/", (req, res) => {
  res.render("home");
});

// Ruta para mostrar el formulario de creación de publicaciones
router.get("/publicacion/crear", async (req, res) => {
  try {
    res.render("crear");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar la página de creación.");
  }
});

// Ruta para mostrar el formulario de editar publicación
router.get("/publicacion/editar/:id", async (req, res) => {
  try {
    res.render("editar", { id: req.params.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar la página de edición.");
  }
});

// Ruta para eliminar una publicación
router.get("/publicacion/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await eliminarPublicacion(id);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar la publicación.");
  }
});

// ==================================================
//         Rutas para CRUD de Publicaciones
// ==================================================

// Crear nueva publicación
router.post("/publicacion", crearPublicacion);

// Obtener todas las publicaciones
router.get("/publicaciones", obtenerPublicaciones);

// Obtener una publicación
router.get("/publicacion/:id", obtenerPublicacion);

// Actualizar una publicación
router.put("/publicacion/:id", actualizarPublicacion);

// Eliminar una publicación
router.delete("/publicacion/:id", eliminarPublicacion);

module.exports = router;

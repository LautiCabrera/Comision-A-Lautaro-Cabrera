// Referencia al elemento de formulario html
const formGuardar = document.querySelector("#form-guardar");
let id;

// Listener que se ejecuta cuando la página completa está cargada
document.addEventListener("DOMContentLoaded", async () => {
  id = formGuardar.dataset.id;
  // Se capturan los datos del form por su id
  const publicacion = await obtenerPublicacion(id);
  const titulo = document.querySelector("#titulo-post");
  const descripcion = document.querySelector("#detalle-post");
  const url_imagen = document.querySelector("#url-img");
  const fecha = document.querySelector("#fecha");
  const cerrarModalBtn = document.getElementById("close");
  // Se le asignan los valores correspondientes a los datos capturados
  titulo.value = publicacion.titulo;
  descripcion.value = publicacion.descripcion;
  url_imagen.value = publicacion.url_imagen;
  fecha.value = publicacion.fecha;
  // Cierra la ventana modal al hacerle click en su botón
  cerrarModalBtn.addEventListener("click", function () {
    window.location.href = "/";
  });
});

// Función para enviar los datos del form editar al servidor
formGuardar.addEventListener("submit", async (e) => {
  // Prevenir el comportamiento por defecto del formulario al enviarlo
  e.preventDefault();
  // Se capturan los datos del formulario
  const titulo = document.querySelector("#titulo-post").value;
  const descripcion = document.querySelector("#detalle-post").value;
  const url_imagen = document.querySelector("#url-img").value;
  const fecha = document.querySelector("#fecha").value;
  // Verifica que la url ingresada sea de una imagen
  if (!esUrlDeImagen(url_imagen)) {
    alert("Por favor, ingrese una URL de imagen válida.");
    throw new Error("URL de imagen no válida");
  }
  // Enviar al servidor
  const response = await fetch(`/publicacion/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo, descripcion, url_imagen, fecha }),
  });
  // Muestra un mensaje amigable en una ventana modal si se creo o no la publicación
  if (response.ok) {
    mostrarModal("Publicación editada correctamente");
  } else {
    mostrarModal("Error al editar la publicación");
  }
});

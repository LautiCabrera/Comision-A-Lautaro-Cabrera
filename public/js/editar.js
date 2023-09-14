// Referencia al elemento de formulario html
const formGuardar = document.querySelector("#form-guardar");
let id;

const obtenerPublicacion = async (id) => {
  try {
    const response = await fetch(`/publicacion/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la publicación:", error);
    throw error;
  }
};

function mostrarModal(message) {
  // Obtener la modal y el mensaje de la modal
  const modal = document.getElementById("confirmationModal");
  const messageElement = document.getElementById("confirmationMessage");
  messageElement.textContent = message;
  $(modal).modal("show");
}

document.addEventListener("DOMContentLoaded", async () => {
  id = formGuardar.dataset.id;
  const publicacion = await obtenerPublicacion(id);
  const titulo = document.querySelector("#titulo-post");
  const descripcion = document.querySelector("#detalle-post");
  const url_imagen = document.querySelector("#url-img");
  const fecha = document.querySelector("#fecha");
  const cerrarModalBtn = document.getElementById("close");

  cerrarModalBtn.addEventListener("click", function () {
    window.location.href = "/";
  });

  titulo.value = publicacion.titulo;
  descripcion.value = publicacion.descripcion;
  url_imagen.value = publicacion.url_imagen;
  fecha.value = publicacion.fecha;
});

formGuardar.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Se capturan los datos del formulario
  const titulo = document.querySelector("#titulo-post").value;
  const descripcion = document.querySelector("#detalle-post").value;
  const url_imagen = document.querySelector("#url-img").value;
  const fecha = document.querySelector("#fecha").value;

  // Enviar al servidor
  const response = await fetch(`/publicacion/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo, descripcion, url_imagen, fecha }),
  });

  if (response.ok) {
    const confirmationMessage = "Publicación editada correctamente";
    mostrarModal(confirmationMessage);
  } else {
    const errorMessage = "Error al editar la publicación";
    mostrarModal(errorMessage);
  }
});

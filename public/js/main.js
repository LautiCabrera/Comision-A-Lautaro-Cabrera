// Funcion para obtener todas las publicaciones
const obtenerPublicaciones = async () => {
  try {
    const response = await fetch("/publicaciones");
    if (!response.ok) {
      throw new Error("Error al obtener las publicaciones");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las publicaciones:", error);
    throw error;
  }
};

// Funcion para obtener una publicación en base a su id
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

// Función para eliminar una publicación específica en base a su id
function eliminarPublicacion(id) {
  fetch(`/publicacion/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        mostrarModal("Publicación eliminada correctamente");
      } else {
        mostrarModal("Error al eliminar la publicación");
      }
    })
    .catch((error) => {
      console.error("Error al eliminar la publicación:", error);
    });
}

// Función para crear ventanas modales
function mostrarModal(message) {
  const modal = document.getElementById("confirmationModal");
  const messageElement = document.getElementById("confirmationMessage");
  messageElement.textContent = message;
  $(modal).modal("show");
}

// Función para mostrar la fecha sin la hora en las publicaciones
function formatearFechaParaServidor(fecha) {
  const fechaObj = new Date(fecha);
  const year = fechaObj.getFullYear();
  const month = String(fechaObj.getMonth() + 1).padStart(2, "0");
  const day = String(fechaObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Funcion para verificar si el texto ingresado es una url de imagen
function esUrlDeImagen(url) {
  const imageExtensionPattern = /\.(png|jpe?g|gif|bmp|webp)$/i;
  return imageExtensionPattern.test(url);
}

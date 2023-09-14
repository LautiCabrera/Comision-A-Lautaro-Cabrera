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

function eliminarPublicacion(id) {
  fetch(`/publicacion/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        const confirmationMessage = "Publicación eliminada correctamente";
        mostrarModal(confirmationMessage);
      } else {
        const errorMessage = "Error al eliminar la publicación";
        mostrarModal(errorMessage);
      }
    })
    .catch((error) => {
      console.error("Error al eliminar la publicación:", error);
    });
}

function mostrarModal(message) {
  // Obtener la modal y el mensaje de la modal
  const modal = document.getElementById("confirmationModal");
  const messageElement = document.getElementById("confirmationMessage");
  messageElement.textContent = message;
  $(modal).modal("show");
}

function formatearFechaParaServidor(fecha) {
  const fechaObj = new Date(fecha);
  const year = fechaObj.getFullYear();
  const month = String(fechaObj.getMonth() + 1).padStart(2, "0");
  const day = String(fechaObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const mostrarPublicaciones = (publicaciones, elementoHtml) => {
  let secciones = "";

  // Método para recorrer los registros
  publicaciones.forEach((publicacion) => {
    const fechaFormateada = formatearFechaParaServidor(publicacion.fecha).split(
      "T"
    )[0];
    secciones += `
    <div class="card m-3 p-4 shadow">
      <div class="d-lg-flex flex-lg-row d-md-flex flex-md-column">
          <div class="col-md-2">
            <img src="${publicacion.url_imagen}" class="img-fluid rounded-start" alt="${publicacion.titulo}">
          </div>
        <div class="col-md-10 d-flex align-items-center">
          <div class="card-body">
            <h5 class="mb-4">${publicacion.titulo}</h5>
            <p class="card-text">${publicacion.descripcion}</p>
            <p class="card-text"><small class="text-muted"><b>Fecha:</b> ${fechaFormateada}</small></p>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <a href="/admin/${publicacion.id}" class="btn btn-primary">Editar</a>
        <a href="#" class="btn btn-danger" onclick="eliminarPublicacion(${publicacion.id})">Eliminar</a>
      </div>
    </div>
      `;
  });
  elementoHtml.innerHTML = secciones;
};

document.addEventListener("DOMContentLoaded", async () => {
  const publicaciones = await obtenerPublicaciones();
  const cerrarModalBtn = document.getElementById("close");

  // Modificar el DOM para mostrar las publicaciones
  const main = document.querySelector("#lista-publicaciones");
  // Cierra la ventana modal
  cerrarModalBtn.addEventListener("click", function () {
    location.reload();
  });

  mostrarPublicaciones(publicaciones, main);
});

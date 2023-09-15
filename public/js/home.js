// Función para crear las publicaciones dinámicamente
const mostrarPublicaciones = (publicaciones, elementoHtml) => {
  let secciones = "";
  // Itera las publicaciones asignandole los datos correspondientes a c/u
  publicaciones.forEach((publicacion) => {
    // Formatea la fecha de las publicaciones para no incluir la hora en ellas
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
        <div class="d-flex p-2">
          <a href="/publicacion/editar/${publicacion.id}" class="btn btn-primary">Editar</a>
        </div>
        <div class="d-flex p-2">
          <a class="btn btn-danger" onclick="eliminarPublicacion(${publicacion.id})">Eliminar</a>
        </div>
      </div>
    </div>
      `;
  });
  elementoHtml.innerHTML = secciones;
};

// Listener que se ejecuta cuando la página completa está cargada
document.addEventListener("DOMContentLoaded", async () => {
  const publicaciones = await obtenerPublicaciones();
  const cerrarModalBtn = document.getElementById("close");
  // Modificar el DOM para mostrar las publicaciones
  const main = document.querySelector("#lista-publicaciones");
  // Cierra la ventana modal al hacerle click en su botón
  cerrarModalBtn.addEventListener("click", function () {
    location.reload();
  });
  // Muestra todas las publicaciones en el home
  mostrarPublicaciones(publicaciones, main);
});

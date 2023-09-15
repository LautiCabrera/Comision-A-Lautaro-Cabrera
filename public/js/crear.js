// Listener que se ejecuta cuando la página completa está cargada
document.addEventListener("DOMContentLoaded", () => {
  const formCrear = document.querySelector("#form-crear");
  const cerrarModalBtn = document.getElementById("close");

  // Función para enviar los datos del form crear al servidor
  formCrear.addEventListener("submit", async (e) => {
    // Prevenir el comportamiento por defecto del formulario al enviarlo
    e.preventDefault();
    // Se capturan los datos del form por su id
    const titulo = document.querySelector("#titulo-post").value;
    const descripcion = document.querySelector("#detalle-post").value;
    const fecha = document.querySelector("#fecha").value;
    const url_imagen = document.querySelector("#url-img").value;
    try {
      // Si algún campo está vacío, evita enviar el formulario y muestra un mensaje de error
      if (!titulo || !descripcion || !fecha || !url_imagen) {
        alert("Por favor, complete todos los campos.");
        throw new Error("Campos incompletos");
      }
      // Verifica que la url ingresada sea de una imagen
      if (!esUrlDeImagen(url_imagen)) {
        alert("Por favor, ingrese una URL de imagen válida.");
        throw new Error("URL de imagen no válida");
      }
      // Envia la respuesta con los datos para crear la publicación
      const response = await fetch("/publicacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titulo, descripcion, fecha, url_imagen }),
      });
      // Muestra un mensaje amigable en una ventana modal si se creo o no la publicación
      if (response.ok) {
        mostrarModal("Publicación creada correctamente");
      } else {
        mostrarModal("Error al crear la publicación");
      }
    } catch (error) {
      console.error("Error al crear la publicación:", error);
    }
  });
  // Cierra la ventana modal al hacerle click en su botón
  cerrarModalBtn.addEventListener("click", function () {
    window.location.href = "/";
  });
});

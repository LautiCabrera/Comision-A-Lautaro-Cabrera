document.addEventListener("DOMContentLoaded", () => {
  const formCrear = document.querySelector("#form-crear");
  const cerrarModalBtn = document.getElementById("close");

  formCrear.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = document.querySelector("#titulo-post").value;
    const descripcion = document.querySelector("#detalle-post").value;
    const fecha = document.querySelector("#fecha").value;
    const url_imagen = document.querySelector("#url-img").value;

    try {
      const response = await fetch("/publicacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titulo, descripcion, fecha, url_imagen }),
      });

      if (response.ok) {
        const confirmationMessage = "Publicación creada correctamente";
        mostrarModal(confirmationMessage);
      } else {
        const errorMessage = "Error al crear la publicación";
        mostrarModal(errorMessage);
      }
    } catch (error) {
      console.error("Error al crear la publicación:", error);
    }
  });

  cerrarModalBtn.addEventListener("click", function () {
    window.location.href = "/";
  });
});

function mostrarModal(message) {
  const modal = document.getElementById("confirmationModal");
  const messageElement = document.getElementById("confirmationMessage");
  messageElement.textContent = message;
  $(modal).modal("show");
}

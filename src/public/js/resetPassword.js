document.addEventListener("DOMContentLoaded", () => {
    const resetForm = document.getElementById("resetForm");
  
    resetForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Evita el envío automático del formulario
  
      const confirmed = window.confirm(
        "Verifique que el mail ingresado sea el suyo. ¿Está seguro de continuar con el reset de la password?"
      );
  
      if (!confirmed) return; // Si el usuario no confirma, no hacer nada
  
      try {
        const formData = new FormData(resetForm);
        const email = formData.get("email");
  
        const response = await fetch(resetForm.action, {
          method: resetForm.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert("Reset de password correcto");
          window.location.href = "/products";
        } else {
          alert(`Error en el reset: ${result.message}`);
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        alert("Error con el reset de la password.");
      }
    });
  });
  
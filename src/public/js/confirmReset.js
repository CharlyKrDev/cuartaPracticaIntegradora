document.addEventListener("DOMContentLoaded", () => {
  const token = document.getElementById("resetToken").value;
  const newPasswordForm = document.getElementById("newPasswordForm");

  newPasswordForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Continuar con la carga de nueva password?"
    );
    if (!confirmed) return;

    const formData = new FormData(newPasswordForm);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    try {
      const response = await fetch(`/password-reset/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, confirmPassword }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Reset de password correcto");
        window.location.href = "/products";
      } else {
        alert(`Error en el reset: ${result.message || "Error desconocido"}`);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Error con el reset de la password.");
    }
  });
});

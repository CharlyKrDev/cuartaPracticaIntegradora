document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("updateRoleBtn")
    .addEventListener("click", async (e) => {
      e.preventDefault();

      const emailElement = document.getElementById("userEmail");
      const email = emailElement
        ? emailElement.innerText.split(":")[1].trim()
        : null;
      const newRole = document.getElementById("newRole").value.toLowerCase();

      if (!email || !newRole) {
        alert("Por favor, seleccione un rol válido");
        return;
      }

      try {
        const response = await fetch(`/api/users/manual/premium/${email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: newRole }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(`Rol actualizado a ${newRole} correctamente.`);
        } else {
          alert(data.message || "Error al actualizar el rol.");
        }
      } catch (error) {
        alert("Error de conexión. Inténtalo nuevamente.");
        console.error("Error:", error);
      }
    });

  document
    .getElementById("deleteUserBtn")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      const confirmed = window.confirm(
        "Seguro que desea eliminar este usuario? Luego no hay marcha atrás"
      );
      if (!confirmed) return;
      const emailElement = document.getElementById("userEmail");
      const email = emailElement
        ? emailElement.innerText.split(":")[1].trim()
        : null;
      try {
        const response = await fetch(`/dashboardUsers/${email}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (response.ok) {
          alert("Usuario eliminado correctamente");
          window.location.href = "/dashboardUsersPage";
        } else {
          alert(
            `Error al querer eliminar usuario: ${
              result.message || "Error desconocido"
            }`
          );
        }
      } catch (error) {
        res.status(500).json({
          status: "Error",
          message: `Al querer borrar el usuario con mail: ${email}`,
          error: error.message,
        });
      }
    });
});

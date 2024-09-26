document.addEventListener("DOMContentLoaded", () => {
  const updateRoleBtn = document.getElementById("updateRoleBtn");
  if (updateRoleBtn) {
    updateRoleBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const emailElement = document.getElementById("userEmail");
      const email = emailElement ? emailElement.innerText.split(":")[1].trim() : null;
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
  }

  const deleteUserBtn = document.getElementById("deleteUserBtn");
  if (deleteUserBtn) {
    deleteUserBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const confirmed = window.confirm(
        "¿Seguro que desea eliminar este usuario? Luego no hay marcha atrás."
      );
      if (!confirmed) return;

      const emailElement = document.getElementById("userEmail");
      const email = emailElement ? emailElement.innerText.split(":")[1].trim() : null;

      if (!email) {
        alert("No se pudo obtener el email del usuario. Intenta nuevamente.");
        return;
      }

      try {
        const response = await fetch(`/dashboardUsers/${email}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();

        if (response.ok) {
          alert("Usuario eliminado correctamente.");
          window.location.href = "/dashboardUsersPage";
        } else {
          alert(
            `Error al eliminar el usuario: ${result.message || "Error desconocido."}`
          );
        }
      } catch (error) {
        console.error("Error en la eliminación del usuario:", error);
        alert("Ocurrió un error al intentar eliminar el usuario.");
      }
    });
  }
});

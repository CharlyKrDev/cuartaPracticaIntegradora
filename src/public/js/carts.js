document.addEventListener("DOMContentLoaded", () => {
  // Obtener el botón para vaciar el carrito
  const emptyCart = document.getElementById("emptyCart");

  if (emptyCart) {
    emptyCart.addEventListener("click", async () => {
      // Obtener el ID del carrito desde el atributo 'data-id' del botón
      const cartId = emptyCart.getAttribute("data-id");

      // Confirmar si el usuario desea vaciar el carrito
      const confirmed = window.confirm(
        `¿Estás seguro de eliminar el carrito con todos sus productos?`
      );
      if (!confirmed) return; // Si el usuario cancela, no hacemos nada

      try {
        // Enviar una solicitud DELETE para vaciar el carrito
        const response = await fetch(`/carts/cart/${cartId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Leer la respuesta del servidor
        const result = await response.json();
        if (response.ok) {
          // Si la solicitud se completó correctamente, mostrar un mensaje de éxito y redirigir a la página de productos
          alert(`Carrito eliminado`);
          window.location.href = "https://proyectofinalbackend-2024.up.railway.app/products";
        } else {
          // Si hubo un error, mostrar un mensaje de error
          alert(`Error al eliminar el carrito: ${result.message}`);
        }
      } catch (error) {
        // Capturar y manejar cualquier error durante la solicitud
        console.error("Error al enviar la solicitud:", error);
        alert("Error al eliminar el carrito.");
      }
    });
  }

  // Obtener todos los botones para eliminar productos del carrito
  document.querySelectorAll(".deleteFromCart").forEach((button) => {
    button.addEventListener("click", async (event) => {
      // Obtener el ID del producto desde el atributo 'data-id' del botón
      const productId = event.target.getAttribute("data-id");

      // Confirmar si el usuario desea eliminar el producto del carrito
      const confirmed = window.confirm(
        `¿Estás seguro de eliminar este producto del carrito?`
      );
      if (!confirmed) return; // Si el usuario cancela, no hacemos nada

      try {
        // Obtener el ID del carrito
        const cart = document.getElementById("emptyCart");
        const cartId = cart.getAttribute("data-id");

        // Enviar una solicitud DELETE para eliminar el producto del carrito
        const response = await fetch(
          `/carts/${cartId}/products/${productId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Leer la respuesta del servidor
        const result = await response.json();
        if (response.ok) {
          // Si la solicitud se completó correctamente, mostrar un mensaje de éxito y recargar la página
          alert(`1 producto eliminado del carrito correctamente.`);
          window.location.reload();
        } else {
          // Si hubo un error, mostrar un mensaje de error
          alert(`Error al eliminar producto del carrito: ${result.message}`);
        }
      } catch (error) {
        // Capturar y manejar cualquier error durante la solicitud
        console.error("Error al enviar la solicitud:", error);
        alert("Hubo un error al eliminar el producto del carrito.");
      }
    });
  });

  const purchaseButton = document.getElementById("purchaseButton");

  if (purchaseButton) {
    purchaseButton.addEventListener("click", async () => {
      // Obtener el ID del carrito desde el atributo 'data-id' del botón
      const cartId = purchaseButton.getAttribute("data-id");

      try {
        // Redirigir a la ruta de compra
        window.location.href = `/carts/${cartId}/purchase`;
      } catch (error) {
        // Capturar y manejar cualquier error durante la solicitud
        console.error("Error al finalizar la compra:", error);
        alert("Error al finalizar la compra.");
      }
    });
  };
  // Agregar event listener para crear un nuevo carrito
  const newCart = document.getElementById("createCart");
  newCart.addEventListener("click", async (e) => {
    try {
      // Enviar solicitud para crear un nuevo carrito
      const response = await fetch(`/carts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Leer la respuesta del servidor
      const result = await response.json();
      if (response.ok) {
        // Mostrar mensaje de éxito y recargar la página si la solicitud se completó correctamente
        alert("Carrito creado correctamente");
        window.location.reload();
      } else {
        // Mostrar mensaje de error si hubo algún problema
        alert(`Error al crear el carrito: ${result.message}`);
      }
    } catch (error) {
      // Manejar errores de conexión o del servidor
      console.error("Error al crear el carrito.", error);
      alert("Hubo un error al crear el carrito.");
    }
  });
});

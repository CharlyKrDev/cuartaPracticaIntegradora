import EErrors from "../services/enum.js";

const errorHandler = (error, req, res, next) => {
  console.error("Error:", error); // Usa console.error para errores
  
  // Verifica si el error tiene un código definido
  if (!error.code) {
    // Si no tiene código, maneja como un error interno
    return res.status(500).json({
      status: "error",
      error: "Error no manejado",
      message: error.message || "Un error inesperado ocurrió",
      details: error.details || {}
    });
  }

  // Maneja los errores basados en su código
  switch (error.code) {
    case EErrors.ROUTING_ERROR:
      return res.status(404).json({
        status: "error",
        error: "Routing Error",
        message: error.message || "La ruta solicitada no fue encontrada.",
        details: error.details || {}
      });

    case EErrors.INVALID_TYPES_ERROR:
      return res.status(400).json({
        status: "error",
        error: "Invalid Types Error",
        message: error.message || "Tipos de datos inválidos proporcionados.",
        details: error.details || {}
      });

    case EErrors.DATABASE_ERROR:
      return res.status(500).json({
        status: "error",
        error: "Database Error",
        message: error.message || "Hubo un problema con la base de datos.",
        details: error.details || {}
      });

    case EErrors.CART_NOT_FOUND:
      return res.status(404).json({
        status: "error",
        error: "Cart Not Found",
        message: error.message || "El carrito no fue encontrado.",
        details: error.details || {}
      });

    case EErrors.PRODUCT_NOT_FOUND:
      return res.status(404).json({
        status: "error",
        error: "Product Not Found",
        message: error.message || "El producto no fue encontrado.",
        details: error.details || {}
      });

    case EErrors.OUT_OF_STOCK:
      return res.status(400).json({
        status: "error",
        error: "Out of Stock",
        message: error.message || "El producto está fuera de stock.",
        details: error.details || {}
      });

    case EErrors.UNAUTHORIZED_ACCESS:
      return res.status(403).json({
        status: "error",
        error: "Unauthorized Access",
        message: error.message || "No tienes permiso para acceder a este recurso.",
        details: error.details || {}
      });

    case EErrors.PRODUCT_CREATION_ERROR:
      return res.status(400).json({
        status: "error",
        error: "Product Creation Error",
        message: error.message || "Hubo un problema al crear el producto.",
        details: error.details || {}
      });

    default:
      // Si el código de error no está definido en el switch, maneja como un error interno
      return res.status(500).json({
        status: "error",
        error: "Error no manejado",
        message: error.message || "Un error inesperado ocurrió",
        details: error.details || {}
      });
  }
};

export default errorHandler;

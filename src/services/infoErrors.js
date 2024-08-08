export const generateCartErrorInfo = (cart) => {
    return `Hubo un problema al querer acceder al carrito ${cart}.
    Pasos a seguir:
    1) Desloguearse.
    2) Loguearse nuevamente.
    3) Si no se resolvió, contactar al soporte técnico.
    `;
};

export const generateProductErrorInfo = (productId) => {
    return `El producto con ID ${productId} no se encontró.
    Pasos a seguir:
    1) Verificar si el producto todavía está disponible.
    2) Intentar buscar otro producto.
    3) Si no se resolvió, contactar al soporte técnico.
    `;
};

export const generateOutOfStockErrorInfo = (productId, availableStock) => {
    return `El producto con ID ${productId} no tiene suficiente stock.
    Stock disponible: ${availableStock}.
    Pasos a seguir:
    1) Reducir la cantidad solicitada.
    2) Intentar comprar más tarde.
    3) Si no se resolvió, contactar al soporte técnico.
    `;
};

export const generateProductCreationErrorInfo = (productDetails) => {
    return `Hubo un problema al crear el producto.
    Titulo: ${productDetails.title} precio: ${productDetails.price} code: ${productDetails.code}
    Pasos a seguir:
    1) Verificar los detalles del producto.
    2) Verificar los campos obligatorios. 
    3)Intentar crear el producto nuevamente.
    4) Si no se resolvió, contactar al soporte técnico.
    `;
};
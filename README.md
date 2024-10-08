<h1>Proyecto Final BackEnd CoderHouse 2024</h1>

## de Carlos Alberto Kaar <a href="https://www.linkedin.com/in/carlos-alberto-kaar/" target="_blank"> <img src="https://skillicons.dev/icons?i=linkedin" alt="My LinkedIn" width="30" height="30"></a>

## Profesor: Omar Jesús Maniás <a href="https://www.linkedin.com/in/omar-jesus-manias/" target="_blank"> <img src="https://skillicons.dev/icons?i=linkedin" alt="LinkedIn" width="30" height="30"></a> <a href="https://github.com/omanias" target="_blank"><img src="https://skillicons.dev/icons?i=github" alt="GitHub" width="30" height="30"></a>
## Tutor: David Alvarez <a href="https://www.linkedin.com/in/ale-david-alvarez/" target="_blank"> <img src="https://skillicons.dev/icons?i=linkedin" alt="LinkedIn" width="30" height="30"></a> <a href="https://github.com/aalvag/aalvag" target="_blank"><img src="https://skillicons.dev/icons?i=github" alt="GitHub" width="30" height="30"></a>

![image](https://github.com/CharlyKrDev/preEntregaBackEnd-Kaar-Carlos/assets/123911937/8d8d3140-c4f7-4dd9-aaab-2e4e713bba7f)

##### Este proyecto consiste en el desarrollo de un eCommerce con sistema CRUD, desarrollado en Node.js. A continuación, se detallan las dependencias y herramientas utilizadas, así como ejemplos de código implementado.
## Instrucciones para Clonar y Configurar el Repositorio

### 1. Clonar el Repositorio

Para clonar este repositorio en tu máquina local, abre una terminal o línea de comandos y ejecuta el siguiente comando:

    git clone https://github.com/CharlyKrDev/cuartaPracticaIntegradora

### 2. Navegar al Directorio del Repositorio

Una vez clonado el repositorio, navega al directorio del repositorio clonado:

    cd tu-repositorio <-- en el que hayas clonado mi repositorio

### 3. Instalar las Dependencias

Para instalar las dependencias necesarias para el proyecto, asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) (el gestor de paquetes de Node.js) instalados en tu máquina. Luego, ejecuta el siguiente comando:

    npm install o pnpm install

Este comando instalará todas las dependencias listadas en el archivo `package.json` del proyecto.

### 4. Ejecutar el Proyecto

Dependiendo de la configuración del proyecto, puedes iniciar el servidor o la aplicación con uno de los siguientes comandos:

    npm start o pnpm start <--- Para arrancar la aplicación principal

o

    npm run test o pnpm run test <--- Para arrancar en modo test

### 5. Acceder a la Aplicación

Una vez que el proyecto esté en ejecución, abre un navegador web y navega a la dirección local del servidor, que generalmente es:

    http://localhost:8080/products

### 6. Consultar la Documentación

Puedes encontrar la documentación en la siguiente dirección local:

    http://localhost:8080/api/docs

## Dependencias Utilizadas :

![image](https://github.com/CharlyKrDev/preEntregaBackEnd-Kaar-Carlos/assets/123911937/01c463a3-6505-4705-b9c1-5496c73c5afb)

**Express.js**

![image](https://github.com/CharlyKrDev/preEntregaBackEnd-Kaar-Carlos/assets/123911937/07278a36-c097-41b3-b9b5-93816e4f50db)

```javascript
const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
```

## Express JS

##### ¿Qué es ExpressJS?

##### Express es un marco de aplicación web de nodo js que proporciona amplias ### funciones para crear aplicaciones web y móviles. Se utiliza para crear una aplicación web híbrida, de una sola página o de varias páginas.

##### Es una capa construida en la parte superior de Node js que ayuda a administrar servidores y rutas.

##### ¿Por qué expresar JS?

##### Express fue creado para crear API y aplicaciones web con facilidad.

##### Ahorra mucho tiempo de codificación casi a la mitad y aún hace que la web y las aplicaciones móviles son eficientes.

##### Otra razón para usar express es que está escrito en javascript.

## Routes.js

##### Routes permite realizar envíos fácilmente en función de cadenas de estilo URL. Viene con una función de enrutador predeterminada que puede usar para enrutar solicitudes http, pero también expone claramente la funcionalidad importante para que también pueda usarla para realizar coincidencias de patrones de cadenas más genéricas.

```javascript
import productsRouter from "./routes/productsRouters.js";
import cartsRouter from "./routes/cartsRouters.js";
```

![image](https://github.com/CharlyKrDev/preEntregaBackEnd-Kaar-Carlos/assets/123911937/d87ac187-abed-4443-b617-0be5d4067c2b)

![image](https://github.com/CharlyKrDev/preEntregaBackEnd-Kaar-Carlos/assets/123911937/09c59868-9ebe-4792-8060-6cbcfb74cb1b)

## PostMan

![image](https://github.com/CharlyKrDev/preEntregaBackEnd-Kaar-Carlos/assets/123911937/3baf9a71-0c7a-47f0-951a-e7dc7b8073b1)

##### Postman es una herramienta utilizada para interactuar con servidores de manera dinámica, permitiendo testear los métodos del sistema CRUD y verificar que funcionen correctamente.

![image](https://github.com/CharlyKrDev/preEntregaBackEnd-Kaar-Carlos/assets/123911937/8e812ee3-cdbb-4227-9e74-d7251d78c742)

## Multer

![image](https://github.com/CharlyKrDev/preEntregaBackEnd-Kaar-Carlos/assets/123911937/6c8c645b-53fb-4521-8637-df8c862337af)

##### Multer es un middleware de node.js para manejar multipart/form-data, que se utiliza principalmente para cargar archivos.

## JavaScript Classes

```javascript
import fs from "fs/promises";
import path from "path";

export class CartManager {
  constructor(
    filePathCart = path.resolve("./src/data/Carts.json"),
    filePathProd = path.resolve("./src/data/Products.json")
  ) {
    this.carts = [];
    this.pathCart = filePathCart;
    this.pathProd = filePathProd;
  }
```

##### Las clases en JavaScript permiten una sintaxis más clara para la creación de objetos y la herencia, mejorando la estructura del código. En este proyecto, las clases CartManager y ProductManager manejan el CRUD de productos y la interacción entre el usuario y el carrito de compras.

## Gestión CRUD

```javascript
cartsRouter.post("/api/carts/:cid/products/:pid", async (req, res) => {
const cartId = parseInt(req.params.cid);
const prodId = parseInt(req.params.pid);

try {
  const checkId = await cartsManager.checkProductId(prodId);
  const checkIdCart = await cartsManager.checkCartId(cartId);


  if (!checkId) {
    return res
      .status(400)
      .json(`Debe seleccionar un id de producto existente`);
  }
  if (!checkIdCart) {
    return res
      .status(400)
      .json(`Debe seleccionar un id de un carrito existente`);
  }
  const addToCart = cartsManager.addProductToCart(cartId, prodId);

  res.status(201).json({
    message: `Agregado producto id: ${prodId} al carrito id: ${cartId}`,
  });
} catch (error) {
  res.status(500).json(`Error al obtener cargar producto en carrito`, error);
}
```

![Screenshot 2024-05-17 021638](https://github.com/CharlyKrDev/primeraPracticaIntegradoraCarlosKaar/assets/123911937/1fde8038-7584-4f9f-9f98-334aec328716)
![Screenshot 2024-05-17 021731](https://github.com/CharlyKrDev/primeraPracticaIntegradoraCarlosKaar/assets/123911937/156e8f5f-314b-49e8-afaa-5ce7a4a28e46)

#### El proyecto incluye la implementación de un sistema CRUD para la gestión de productos, utilizando Mongoose para interactuar con MongoDB.

#### MongoDB es una base de datos NoSQL flexible y escalable, ideal para aplicaciones modernas. Mongoose simplifica el desarrollo en Node.js con MongoDB, permitiendo definir modelos de datos, validar datos y ejecutar consultas de manera estructurada.

![Screenshot 2024-05-17 021910](https://github.com/CharlyKrDev/primeraPracticaIntegradoraCarlosKaar/assets/123911937/10654d11-fba5-4218-80ff-0c1fd863d02c)

![Screenshot 2024-05-17 021803](https://github.com/CharlyKrDev/primeraPracticaIntegradoraCarlosKaar/assets/123911937/55d9ff2b-0d4f-48d0-b990-2e0af255bf0b)

##### Mongoose simplifica el desarrollo de aplicaciones Node.js que utilizan MongoDB como base de datos al proporcionar una capa de abstracción sobre la base de datos, permitiendo definir modelos de datos, validar datos, ejecutar consultas y más, de una manera más fácil y estructurada.

```javascript
const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: false, default: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: { type: Array, default: [], required: false },
});

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;
```

![Screenshot 2024-05-17 022251](https://github.com/CharlyKrDev/primeraPracticaIntegradoraCarlosKaar/assets/123911937/58c13a1b-9021-484e-81ae-4e60501f2845)

##### El proyecto incluye la implementación de .env para resguardar la información de acceso al servidor MongoDB.

## Generación de ticket por compras.

![image](https://github.com/user-attachments/assets/80035da1-a910-43d0-9af9-c54b06a8d1c1)

## Refactorizacion

##### Dentro para conseguir una mayor escalabilidad se implemento el uso de DAO, DTO, Controllers, Services y repository

![image](https://github.com/user-attachments/assets/f440cdb5-b5a8-4f39-8e78-1646815f2c37)

## Biblioteca de Errores

```javascript
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
```

## Incluye los errores mas comunes dentro de un e-commerce

![image](https://github.com/user-attachments/assets/7eeffcd8-7fa5-4da0-8e74-5a6b6641a1d6)

## Recupero de contraseña por mailing

![image](https://github.com/user-attachments/assets/6460d03e-47f2-440f-b5f4-1cf60c983f39)

##### Con winston implemente un registro de log para registrar las acciones mas relevantes e-commerce

![image](https://github.com/user-attachments/assets/b9e203d8-6d02-4b7f-8dc6-47b755616029)

## Con la implementacion de Faker se pueden generar productos de manera automatizada para testear el funcionamiento de la web.

![image](https://github.com/user-attachments/assets/4983034c-d1e8-49d7-a604-3166b8887879)

## Swagger

![image](https://github.com/user-attachments/assets/724c59b7-94b9-414b-a299-1fa37aed8de3)

##### La implementación de Swagger permitió documentar el proyecto de manera efectiva, con un enfoque en los productos y carritos, lo que garantiza que sea organizado, sostenible a largo plazo y escalable.

![image](https://github.com/user-attachments/assets/8065b65a-73e4-43cb-ad4e-716c0605372e)
![image](https://github.com/user-attachments/assets/f5672b80-dd65-4c32-86f5-49f6b1890b22)
![image](https://github.com/user-attachments/assets/85ecf5f6-7d85-4895-a55f-df797ec82521)
![image](https://github.com/user-attachments/assets/c65afc9e-a6fe-4a6b-b643-80dfdc2ccbec)
![image](https://github.com/user-attachments/assets/7cfc6ed9-42b5-4c74-9fbd-c4a5dfe09a7e)

## Implementación de SuperTest, Chai y Mocha

### Descripción General

Para garantizar la calidad y confiabilidad del código, hemos implementado un conjunto robusto de pruebas utilizando **SuperTest**, **Chai**, y **Mocha**. Estas herramientas se combinan para proporcionar un entorno de pruebas eficiente y efectivo, permitiendo validar la funcionalidad de las API y asegurar que el comportamiento del sistema sea el esperado.

### Herramientas Utilizadas

##### 1. [Mocha](https://mochajs.org/)

**Mocha** es un marco de pruebas para JavaScript, flexible y fácil de usar, que se ejecuta en Node.js. Su estructura simple permite escribir y organizar las pruebas de manera coherente, soportando tanto pruebas sincrónicas como asincrónicas.

**Beneficios de Mocha**:

- **Simplicidad**: Ofrece una sintaxis clara y fácil de entender.
- **Flexibilidad**: Soporta múltiples estilos de pruebas (TDD, BDD).
- **Asincronía**: Permite realizar pruebas asincrónicas sin complicaciones.

##### 2. [Chai](https://www.chaijs.com/)

**Chai** es una biblioteca de aserciones utilizada junto con Mocha. Proporciona una amplia variedad de métodos de aserción que permiten validar los resultados de las pruebas de manera clara y precisa.

**Beneficios de Chai**:

- **Variedad de Estilos**: Soporta distintos estilos de aserciones como `should`, `expect` y `assert`.
- **Legibilidad**: Las aserciones son intuitivas y fáciles de leer.
- **Integración Sencilla**: Se integra perfectamente con Mocha para crear un entorno de pruebas completo.

##### 3. [SuperTest](https://github.com/visionmedia/supertest)

**SuperTest** es una herramienta que facilita la realización de pruebas HTTP. Permite enviar peticiones HTTP a nuestras API de forma sencilla y validar las respuestas obtenidas.

**Beneficios de SuperTest**:

- **Facilidad de Uso**: Simplifica el envío de peticiones `GET`, `POST`, `PUT`, `DELETE`, entre otras.
- **Integración Fluida**: Funciona perfectamente con Mocha y Chai para realizar pruebas de extremo a extremo.
- **Validación Completa**: Permite verificar los estados HTTP, cabeceras, y cuerpos de respuesta.

### Beneficios de la Implementación

- **Calidad Asegurada**: Con este conjunto de herramientas, se puede garantizar que las API funcionan correctamente bajo diversas condiciones.
- **Detección Temprana de Errores**: Las pruebas automatizadas permiten identificar y corregir errores en etapas tempranas del desarrollo.
- **Documentación Viva**: Las pruebas sirven como documentación viva del comportamiento esperado del sistema, facilitando la comprensión y el mantenimiento.
- **Escalabilidad**: A medida que el proyecto crece, estas herramientas aseguran que las nuevas funcionalidades no rompan las existentes.

### Ejemplo de Implementación

```javascript
import { expect, apiRequest } from "../../tests/testHelper.js";
import {
  ID_TEST_INVALID,
  deleteTestProduct,
  createTestProductPut,
} from "../../tests/testUtils.js";

describe("PUT /test/products/:id", () => {
  let productId;
  let updatedProduct;

  before(async () => {
    const product = await createTestProductPut();
    productId = product._id.toString();
    updatedProduct = product;
  });

  it("debería actualizar un producto existente con status 200", async () => {
    const res = await apiRequest
      .put(`/test/products/${productId}`)
      .send(updatedProduct);

    expect(res.status).to.equal(200);

    expect(res.body).to.have.property("status", "success");

    expect(res.body.payload).to.include({
      title: updatedProduct.title,
      description: updatedProduct.description,
      code: updatedProduct.code,
      price: updatedProduct.price,
      status: updatedProduct.status,
      stock: updatedProduct.stock,
      category: updatedProduct.category,
    });
  });

  it("debería devolver un error 404 si el producto no existe", async () => {
    const nonExistentProductId = ID_TEST_INVALID;

    const res = await apiRequest
      .put(`/test/products/${nonExistentProductId}`)
      .send({
        title: "Producto que no existe",
        code: "CODE12345",
      });

    expect(res.status).to.equal(404);

    expect(res.body).to.have.property("error", "Producto no encontrado");
  });

  it("debería devolver un error 400 si el código ya existe en otro producto", async () => {
    const res = await apiRequest.put(`/test/products/${productId}`).send({
      title: "Producto con código duplicado",
      description: "Descripción del producto duplicado",
      code: "alfcap1",
      price: 200,
      stock: 5,
      category: "Hogar",
      thumbnail: ["https://cdn-icons-png.flaticon.com/512/1554/1554591.png"],
    });

    expect(res.status).to.equal(400);

    expect(res.body).to.have.property("status", "error");

    expect(res.body).to.have.property(
      "message",
      "El código ya existe en otro producto"
    );
  });

  after(async () => {
    try {
      await deleteTestProduct(productId);
    } catch (error) {
      console.error("Error al eliminar el producto de prueba:", error);
    }
  });
});
```

![image](https://github.com/user-attachments/assets/8c2cfa56-97ad-45b1-a44f-3b66975aee91)

##### El proyecto está en continuo desarrollo, incluyendo refactorizaciones y mejoras en la arquitectura, como la implementación de DAO, DTO, servicios, controladores, y la biblioteca de errores. Además, se ha implementado la generación de tickets por compras, recuperación de contraseñas por email, documentación con Swagger y plataforma de pago.

# Gracias por tu tiempo!

![image](https://github.com/CharlyKrDev/preEntregaBackEnd-Kaar-Carlos/assets/123911937/d08aafc7-0a03-446c-9fef-01376cb77bc5)

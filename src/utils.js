import { fileURLToPath } from "url";
import { dirname, join } from "path";
import handlebars from "express-handlebars";
import bcrypt from 'bcryptjs'
import transporter from "./config/mailingConfig.js";
import dotenv from 'dotenv'
import { faker } from "@faker-js/faker";


dotenv.config()

const MAIL_USER = process.env.MAIL_USER

// Funciones para hashear password
const  createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const comparePassword = (newPassword, hashedPassword) => {
  return bcrypt.compareSync(newPassword, hashedPassword);
};

// Variables de ruteo

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const viewsPath = join(__dirname + "/views");
const publicPath = join(__dirname + "/public");

// Función(engine) que me permite multiplicar cantidad y precio dentro de handlebars

const hbs = handlebars.create({
    defaultLayout: 'main',
    helpers: {
      multiply: (a, b) => a * b
    }
  });

  // Mailing

  const sendConfirmationEmail = async (user, purchasedProducts, totalAmount, ticketCode) => {
    const formattedDetails = purchasedProducts.map(product => {
        return `Producto: ${product.title}\nDescripción: ${product.description}\nPrecio unitario: $${product.price}\nCantidad: ${product.quantity}\n\n`;
    }).join('');

    const mailOptions = {
        from: MAIL_USER,
        to: user.email,
        subject: 'Detalle de tu compra',
        text: `Hola ${user.first_name},\n\nGracias por tu compra. Aquí están los detalles del ticket: ${ticketCode}:\n\n${formattedDetails}\nTotal: $${totalAmount}\n\nSaludos,\nLa Tienda de Charly.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo de compra enviado');
    } catch (error) {
        console.error('Error enviando el correo de compra:', error);
    }
};


// Función para generar productos
export const generateProducts = () => {
  return {
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    code: faker.commerce.isbn(),
    price: parseFloat(faker.commerce.price({ min: 1500, max: 3800, dec: 0 })),
    status: faker.datatype.boolean(),
    stock: faker.number.int({ min: 10, max: 100 }),
    category: faker.commerce.productAdjective(),
    thumbnail: faker.image.urlLoremFlickr({ category: 'food' }),
  };
};

// Función para validar el formato de un email
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}



export { __dirname, viewsPath, publicPath, __filename, hbs, createHash, isValidPassword, sendConfirmationEmail, comparePassword, validateEmail  };

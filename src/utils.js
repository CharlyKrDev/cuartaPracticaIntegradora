import { fileURLToPath } from "url";
import { dirname, join } from "path";
import handlebars from "express-handlebars";
import bcrypt from 'bcryptjs'
import transporter from "./config/mailingConfig.js";
import dotenv from 'dotenv'

dotenv.config()

const MAIL_USER = process.env.MAIL_USER

// Funciones para hashear password
const  createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

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

  export const sendConfirmationEmail = async (user, purDetails, ticketCode) => {
    const formattedDetails = purDetails.map(product => {
        return `Producto: ${product.product.name}\nDescripción: ${product.product.description}\nPrecio unitario: $${product.product.price}\nCantidad: ${product.quantity}\n\n`
    }).join('')

    const mailOptions = {
        from: MAIL_USER,
        to: user.email,
        subject: 'Detalle de tu compra',
        text: `Hola ${user.first_name},\n\nGracias por tu compra. Aquí están los detalles del ticket: ${ticketCode}:\n\n${formattedDetails}\nSaludos,\nTu equipo de eCommerce`,
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log('Correo de compra enviado')
    } catch (error) {
        console.error('Error enviando el correo de compra:', error)
    }
}

export { __dirname, viewsPath, publicPath, __filename, hbs, createHash, isValidPassword };

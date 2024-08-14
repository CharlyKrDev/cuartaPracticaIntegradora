import dotenv from 'dotenv'
import transporter from "./config/mailingConfig.js";

dotenv.config()

const MAIL_USER = process.env.MAIL_USER


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
       logger.info(`Correo de compra enviado a ${user.email}`);
    } catch (error) {
        console.error('Error enviando el correo de compra:', error);
    }
};

// Función para validar el formato de un email
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }


  export {sendConfirmationEmail, validateEmail  };

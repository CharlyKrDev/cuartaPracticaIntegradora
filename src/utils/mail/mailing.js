import dotenv from 'dotenv'
import transporter from '../../config/mailingConfig.js';
import logger from '../../config/loggerConfig.js';

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

const sendDeleteProductEmail = async (userOwner, product, user) => {
    const mailOptions = {
        from: MAIL_USER,
        to: userOwner.email ?? product.owner,
        subject: 'Producto Eliminado',
        text: `Hola ${userOwner.first_name ?? product.owner},\n\nEl siguiente producto ha sido eliminado de forma correcta: \nProducto: ${product.title}\nDescripción: ${product.description}\nCódigo: ${product.code}\nSaludos,\nLa Tienda de Charly.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Producto eliminado: ${product.title}\nDescripción: ${product.description}\nCódigo: ${product.code} Dueño: ${userOwner.email ?? product.owner} Eliminado por ${user.email}`);
    } catch (error) {
        console.error('Error enviando el correo de producto eliminado:', error);
    }
};



const sendDeleteAccountEmail = async (user) => {
    const mailOptions = {
        from: MAIL_USER,
        to: user.email,
        subject: 'Cuenta Eliminada por inactividad',
        text: `Hola ${user.first_name},\n\nSu cuenta ha sido eliminada por inactividad. Siempre es bienvenido a registrarse de nuevo.\n\nSaludos,\nLa Tienda de Charly.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Correo de cuenta eliminada enviado a ${user.email}`);
    } catch (error) {
        console.error('Error enviando el correo de cuenta eliminada:', error);
    }
};


// Función para validar el formato de un email
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }


  export {sendConfirmationEmail, validateEmail, sendDeleteProductEmail, sendDeleteAccountEmail  };

import handlebars from "express-handlebars";

// Función(engine) que me permite multiplicar cantidad y precio dentro de handlebars

const hbs = handlebars.create({
    defaultLayout: 'main',
    helpers: {
      multiply: (a, b) => a * b,
      or: (a, b) => a || b
    }
  });

  export {hbs};

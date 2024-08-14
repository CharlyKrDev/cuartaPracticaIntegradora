import { faker } from "@faker-js/faker";


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


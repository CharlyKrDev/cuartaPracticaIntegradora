import { Router } from "express";
import { generateProducts } from "../../utils/mocks/mocks.js";

const router = Router();

router.get("/", async (req, res) => {
  let products = [];

  try {
    for (let i = 0; i < 100; i++) {
      products.push(generateProducts());
    }
    res.send({ status: "Get correcto", payload: products, quantity: products.length });
  } catch (error) {
    console.error(error, `error`);
  }
});

export default router;

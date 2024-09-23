import { getHomePageData } from "../services/homeServices.js";

export const getHomePage = async (req, res) => {
  let userId = null;

  if (req.user) {
    userId = req.user._id;
   
  }

  try {

    const { products, cartId, userRole, debug } = await getHomePageData(userId, req.query);

    if (debug) {
      return res.json({
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
      });
    }
    const prevLink = products.hasPrevPage
      ? `https://proyectofinalbackend-2024.up.railway.app/products/?page=${products.prevPage}&limit=${products.limit}`
      : "";
    const nextLink = products.hasNextPage
      ? `https://proyectofinalbackend-2024.up.railway.app/?page=${products.nextPage}&limit=${products.limit}`
      : "";
    const isValid = !(products.page <= 0 || products.page > products.totalPages);
    res.render("home", {
      style: "style.css",
      productos: products.docs,
      totalPages: products.totalPages,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      prevLink,
      nextLink,
      isValid,
      role: userRole === "user" || userRole === "premium",
      cart: cartId,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getHomePage404 = async (req, res) => {

  res.status(404).render("404",{
    style: "style.css"
  })

}


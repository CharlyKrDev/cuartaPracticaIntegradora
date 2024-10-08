import ProductsDAO from '../dao/class/products.dao.js';
import CartsDAO from '../dao/class/carts.dao.js';


export const getProductsApi = async (req, res) => {
    try {
      let { limit = 10, page = 1, sort, debug } = req.query;
      const totalProduct = await ProductsDAO.getTotalProductsCount();
      const carts = await CartsDAO.getAllCarts();
      // Convert limit to a number if it's not "all"
      limit = limit === "all" ? totalProduct : parseInt(limit);
      page = parseInt(page);
  
      // Validate limit and page parameters
      if (
        isNaN(page) ||
        page < 1 ||
        (limit !== undefined && (isNaN(limit) || limit < 1))
      ) {
        return res.status(400).json({ error: "Invalid limit or page value" });
      }
  
      const options = {
        limit,
        page,
        sort: sort ? { price: sort } : {},
        lean: true,
      };
  
      const products = await ProductsDAO.getProductsPaginated({}, options);
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
        ? `http://localhost:8080/api/products/?page=${products.prevPage}&limit=${limit}`
        : "";
      const nextLink = products.hasNextPage
        ? `http://localhost:8080/api/products/?page=${products.nextPage}&limit=${limit}`
        : "";
      const isValid = !(page <= 0 || page > products.totalPages);
  
      res.status(200).json({
        productos: products.docs,
        totalPages: products.totalPages,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        prevLink: prevLink,
        nextLink: nextLink,
        isValid: isValid,
        carts: carts,
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  export const getProductByIdApi = async (req, res) => {
    const productId = req.params.pid;
    try {
      let product;

      product = await ProductsDAO.getProductById(productId);

      if(!product){

        res.status(400).json({status:'error', error:'El id no corresponde a ningún producto'});

      }
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  export const deleteProductByIdApi = async (req, res) => {
    const productId = req.params.pid;
  
    try {
      let checkId = await ProductsDAO.getProductById(productId);
      if (!checkId) {
        return res
          .status(404)
          .send(`No se encontró ningún producto con el ID ${productId}`);
      }
      await ProductsDAO.deleteProductById (productId);
      res
        .status(200)
        .json({
          message: `El producto id: ${productId} ha sido eliminado correctamente`,
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  export const addProductApi = async (req, res) => {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
      owner,
    } = req.body;
  
    try {
      const checkedCode = await ProductsDAO.getProductByCode({ code });
      if (checkedCode.length !== 0) {
        return res.status(400).json({ status: "error", message: "El código ya existe en otro producto" });
      }
    
      await ProductsDAO.createProduct( req.body);
  
      res.status(200).json({ status: "success", message: `Producto creado correctamente`, payload: req.body });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

  export const updateProductApi = async (req, res) => {
    const productId = req.params.pid;
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
      owner
    } = req.body;
  
    try {
      // Verifica si el producto existe por su ID
      const existingProduct = await ProductsDAO.getProductById(productId);
      if (!existingProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
  
      // Verifica si se está intentando actualizar el código y si ya existe en otro producto
      if (code && code !== existingProduct.code) {
        const checkedCode = await ProductsDAO.getProductByCode({ code });
  
        // Si existe un producto con el mismo código y no es el producto que se está actualizando
        if (checkedCode.length > 0 && checkedCode[0]._id.toString() !== productId) {
          return res.status(400).json({ status: "error", message: "El código ya existe en otro producto" });
        }
      }
  
      // Actualiza el producto con los campos proporcionados en req.body
      const updatedFields = {
        ...(title && { title }),
        ...(description && { description }),
        ...(code && { code }),
        ...(price && { price }),
        ...(status !== undefined && { status }),
        ...(stock && { stock }),
        ...(category && { category }),
        ...(thumbnail && { thumbnail }),
        ...(owner && { owner }),
      };
  
      const updatedProduct = await ProductsDAO.updateOneProduct(productId, updatedFields);
  
      if (updatedProduct.nModified === 0) {
        return res.status(304).json({ status: "error", message: "No se realizaron cambios en el producto" });
      }
  
      res.status(200).json({
        status: "success",
        message: "Producto actualizado correctamente",
        payload: await ProductsDAO.getProductById(productId),
      });
  
    } catch (error) {
      console.error("Error en updateProductApi:", error);
      res.status(500).json({ status: "error", error: error.message });
    }
  };
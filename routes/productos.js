const express = require("express");
const auth = require("../utils/auth.js");
const {
  getAll,
  getById,
  saveProduct,
  updateProduct,
  deleteProduct,
  getFake,
} = require("../controller/productos.js");

const productosRouter = express.Router();

productosRouter
  .get("/listar", getAll)
  .get("/:id", getById)
  .post("/guardar", saveProduct)
  .put("/actualizar/:id", updateProduct)
  .delete("/borrar/:id", deleteProduct)
  .get("/vista-test/:cant?", getFake);

module.exports = {
  productosRouter,
};

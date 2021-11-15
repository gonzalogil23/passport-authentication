let { CRUDproductos } = require("../db/productos.js");
let { get } = require("../models/faker.js");

const db = new CRUDproductos();

const getAll = async (req, res) => {
  try {
    if (!db.products) {
      res.json({ error: "no hay productos cargados" });
    } else {
      db.getProducts();
      return db.products;
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = db.products.find((product) => product.id == id);
    if (!producto) {
      res.json({ error: "producto no encontrado" });
    } else {
      db.getById(id);
      res.json(producto);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const saveProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    db.saveProduct(newProduct);
    res.redirect("/");
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    const product = CRUDproductos.products.find((product) => product.id == id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    (product.title = title),
      (product.price = price),
      (product.thumbnail = thumbnail);

    db.updateProduct(id, product);
    res.status(200).json(product);
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = db.products.find((product) => product.id == id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    } else {
      db.deleteOne(id, product);
    }
    res.status(200).end();
  } catch (e) {
    throw new Error(e.message);
  }
};
const getFake = (req, res) => {
  const productosFake = [];
  try {
    let cant = req.query.cant || 10;
    for (let i = 0; i < cant; i++) {
      let producto = get();
      productosFake.push(producto);
    }
    if (cant == 0) {
      res.send(404).json({ message: "No hay productos" });
    } else {
      res.json(productosFake);
    }
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getAll,
  getById,
  saveProduct,
  updateProduct,
  deleteProduct,
  getFake,
};

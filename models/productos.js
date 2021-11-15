let mongoose = require("mongoose");
const productosCollection = "productos";

const ProductsSchema = mongoose.Schema({
  title: { type: String, require: true, minLength: 3, maxLenghth: 40 },
  price: { type: Number, require: true, min: 18, max: 100000 },
  thumbnail: { type: String, require: true },
});

module.exports = {
  Productos: mongoose.model(productosCollection, ProductsSchema),
};

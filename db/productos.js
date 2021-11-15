let mongoose = require("mongoose");
let { Productos } = require("../models/productos.js");

class CRUDproductos {
  constructor() {
    this.products = [
      {
        title: "SmartTV",
        price: 70000,
        thumbnail:
          "https://cdn2.iconfinder.com/data/icons/essential-web-2/520/tv-screen-smart-widescreen-watch-128.png",
      },
      {
        title: "Aire Acondicionado",
        price: 53000,
        thumbnail:
          "https://cdn2.iconfinder.com/data/icons/kitchen-appliances-computers-and-electronics/32a/Appliances-19-128.png",
      },
      {
        title: "Celular Samsung",
        price: 57000,
        thumbnail:
          "https://cdn2.iconfinder.com/data/icons/kitchen-appliances-computers-and-electronics/332/Appliances-06-128.png",
      },
    ];

    this.getProducts = async () => {
      let productos = await Productos.find({}).sort({ price: 1 });

      return productos;
    };
    this.getById = async (id) => {
      let product = await Product.findOne({ _id: id });
      return product;
    };
    this.updateProduct = async (id, product) => {
      this.getById(id);
      if (id) {
        let productoActualizado = await Productos.updateOne(
          { _id: id },
          product
        );
        console.log(`Producto actualizado: ${productoActualizado}`);
      }
    };

    this.saveProduct = async (product) => {
      const newProduct = new Productos(product);
      await newProduct.save();
      return newProduct;
    };

    this.deleteOne = async (product, id) => {
      this.getById(id);
      await Productos.deleteOne({ _id: id }, product);
      console.log(`Producto borrado. Lista actualizada: ${products}`);
    };

    this.connectionOff = async () => await mongoose.connection.close();
  }
}

module.exports = {
  CRUDproductos,
};

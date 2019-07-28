const express = require('express');
const productsModel = require('../db/model/products');
const products = express.Router();
const tryCatch = require('../utils/tryCatch');

products.get('/:id', (req, res) => {
  tryCatch(async () => {
    const id = req.params.id;
    const product = await productsModel.get(id);
    if (product.length === 0) {
      res.status(400).send('Product not found');
    }
    res.status(200).send(product);
  }, res);
});

module.exports = products;

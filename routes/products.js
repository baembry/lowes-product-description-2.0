const express = require('express');
const productsModel = require('../db/model/products');
const products = express.Router();

products.get('/:id', async (req, res) => {
  const id = req.params.id;
  const product = await productsModel.get(id);
  console.log(product);
  res.status(200).send(product);
});

module.exports = products;

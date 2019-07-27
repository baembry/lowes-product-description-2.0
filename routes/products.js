const express = require('express');
const products = express.Router();

products.get('/:id', (req, res) => {
  res.status(200).send('Here be product ' + req.params.id);
});

module.exports = products;

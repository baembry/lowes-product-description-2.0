const express = require('express');
const reviews = express.Router();

reviews.get('/:productId', (req, res) => {
  res.status(200).send('Here be reviews for product' + req.params.productId);
});

module.exports = reviews;

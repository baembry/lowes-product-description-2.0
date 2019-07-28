const express = require('express');
const reviewsRoute = express.Router();
const reviewsModel = require('../db/model/reviews');
const productsModel = require('../db/model/products');
const tryCatch = require('../utils/tryCatch');

reviewsRoute.get('/product/:productId', (req, res) => {
  tryCatch(async () => {
    const id = req.params.productId;
    const review = await reviewsModel.get(id);
    res.status(200).send(review);
  });
});

reviewsRoute.post('/product/:productId', (req, res) => {
  tryCatch(async () => {
    const review = req.body;
    const product_id = req.params.productId;
    review.product_id = product_id;
    const product = await productsModel.get(product_id);
    if (product.length === 0) {
      res.status(400).end('Product not found');
      return;
    }
    const dbRes = await reviewsModel.post(review);
    res.status(200).send('review posted');
  });
});

reviewsRoute.put('/:id', (req, res) => {
  tryCatch(async () => {
    const review = req.body;
    const id = req.params.id;
    review.id = id;
    const dbRes = await reviewsModel.put(review);
    res.status(200).send('review updated');
  });
});

module.exports = reviewsRoute;

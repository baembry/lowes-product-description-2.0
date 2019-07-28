const express = require('express');
const reviewsRoute = express.Router();
const reviewsModel = require('../db/model/reviews');
const productsModel = require('../db/model/products');
const tryCatch = require('../utils/tryCatch');

//get reviews for product with productId
reviewsRoute.get('/product/:productId', (req, res) => {
  tryCatch(async () => {
    const id = req.params.productId;
    const review = await reviewsModel.get(id);
    res.status(200).send(review);
  }, res);
});

//post reviews for a certain product
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
  }, res);
});

//mark review helpful/unhelpful
reviewsRoute.put('/:id', (req, res) => {
  tryCatch(async () => {
    const helpful = req.query.helpful;
    if (helpful === undefined) {
      res.status(404).send('You can only mark an answer helpful or unhelpful');
      return;
    }
    const id = req.params.id;
    if (helpful === 'true') {
      await reviewsModel.isHelpful(true, id);
    } else if (helpful === 'false') {
      await reviewsModel.isHelpful(false, id);
    }
    res.status(200).send('Review updated');
  }, res);
});

module.exports = reviewsRoute;

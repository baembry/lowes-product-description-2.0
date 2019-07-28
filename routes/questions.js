const express = require('express');
const questionsRoute = express.Router();
const tryCatch = require('../utils/tryCatch');
const questionsModel = require('../db/model/questions');
const productsModel = require('../db/model/products');

//get questions with answers
questionsRoute.get('/product/:productId', (req, res) => {
  tryCatch(async () => {
    const id = req.params.productId;
    const questions = await questionsModel.get(id);
    res.status(200).send(questions);
  }, res);
});

//post new question
questionsRoute.post('/product/:productId', (req, res) => {
  tryCatch(async () => {
    const product_id = req.params.productId;
    const product = await productsModel.get(product_id);
    if (product.length === 0) {
      res.status(400).send('Product not found');
    }
    const question = req.body;
    question.product_id = product_id;
    await questionsModel.post(question);
    res.status(200).send('Question posted');
  }, res);
});

module.exports = questionsRoute;

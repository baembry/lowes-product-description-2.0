const express = require('express');
const questions = express.Router();

questions.get('/:productId', (req, res) => {
  res.status(200).send('Here be question for product' + req.params.productId);
});

module.exports = questions;

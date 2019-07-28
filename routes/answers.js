const express = require('express');
const answersRoute = express.Router();
const questionsModel = require('../db/model/questions');
const answersModel = require('../db/model/answers');
const tryCatch = require('../utils/tryCatch');

//post answer
answersRoute.post('/question/:questionId', (req, res) => {
  tryCatch(async () => {
    const question_id = req.params.questionId;
    const question = await questionsModel.get(question_id);
    if (question.length === 0) {
      res.status(400).send('Question not found');
    }
    const answer = req.body;
    answer.question_id = question_id;
    await answersModel.post(answer);
    res.status(200).send('Question posted');
  }, res);
});

//mark answer (un)helpful
answersRoute.put('/:id', (req, res) => {
  tryCatch(async () => {
    const helpful = req.query.helpful;
    if (helpful === undefined) {
      res.status(404).send('You can only mark an answer helpful or unhelpful');
      return;
    }
    const id = req.params.id;
    if (helpful === 'true') {
      await answersModel.isHelpful(true, id);
    } else if (helpful === 'false') {
      await answersModel.isHelpful(false, id);
    }
    res.status(200).send('Answer updated');
  }, res);
});

module.exports = answersRoute;

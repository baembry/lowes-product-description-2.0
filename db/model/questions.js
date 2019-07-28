const db = require('../index');

const questions = {
  get(productId) {
    const escapedId = db.escape(productId);
    return db.queryAsync(
      `SELECT * FROM questions INNER JOIN answers WHERE questions.product_id =${escapedId} and answers.question_id = questions.id;`
    );
  },
  post(question) {
    //sanitize input
    for (let key in question) {
      question[key] = db.escape(question[key]);
    }
    return db.queryAsync(
      `INSERT INTO questions (product_id, question, author) VALUES (${
        question.product_id
      },"${question.question}", "${question.author}");`
    );
  },
};

module.exports = questions;

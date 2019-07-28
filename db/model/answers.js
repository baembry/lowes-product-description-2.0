const db = require('../index');

const answers = {
  post(answer) {
    //sanitize input
    for (let key in answer) {
      answer[key] = db.escape(answer[key]);
    }
    return db.queryAsync(
      `INSERT INTO answers (question_id, author, text) VALUES (${
        answer.question_id
      },"${answer.author}", "${answer.text}");`
    );
  },

  isHelpful(helpful, id) {
    let query = `UPDATE answers SET `;
    if (helpful) {
      query += `helpful = helpful + 1 WHERE id = ${db.escape(id)};`;
      return db.queryAsync(query);
    } else {
      query += `unhelpful = unhelpful + 1 WHERE id = ${db.escape(id)};`;
      return db.queryAsync(query);
    }
  },
};

module.exports = answers;

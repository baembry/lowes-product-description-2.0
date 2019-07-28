const db = require('../index');

const reviews = {
  get(id) {
    const escapedId = db.escape(id);
    return db.queryAsync(
      `SELECT * FROM reviews WHERE reviews.product_id =${escapedId}`
    );
  },
  post(review) {
    //sanitize input
    for (let key in review) {
      review[key] = db.escape(review[key]);
    }
    return db.queryAsync(
      `INSERT INTO reviews (product_id, title, rating, recommended, text, author) VALUES (${
        review.product_id
      },${review.title}, ${review.rating}, ${review.recommended}, ${
        review.text
      }, ${review.author})`
    );
  },
  isHelpful(helpful, id) {
    console.log('in isHelpful');
    let query = `UPDATE reviews SET `;
    if (helpful) {
      query += `helpful = helpful + 1 WHERE id = ${db.escape(id)};`;
      console.log('query', query);
      return db.queryAsync(query);
    } else {
      console.log('query', query);

      query += `unhelpful = unhelpful + 1 WHERE id = ${db.escape(id)};`;
      return db.queryAsync(query);
    }
  },
};

module.exports = reviews;

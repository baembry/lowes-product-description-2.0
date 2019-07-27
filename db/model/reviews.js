const db = require('../index');

const reviews = {
  get(id) {
    const escapedId = db.escape(id);
    return db.queryAsync(
      `SELECT * FROM reviews WHERE reviews.product_id =${escapedId}`
    );
  },
  create(review) {
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
};

module.exports = reviews;

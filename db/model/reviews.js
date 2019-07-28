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
  put(review) {
    let query = `UPDATE reviews
    SET `;
    for (let key in review) {
      if (key !== 'id') {
        if (typeof review[key] === 'string') {
          query += `${key} = "${review[key]}",`;
        } else {
          query += `${key} = ${review[key]},`;
        }
      }
    }
    query = query.slice(0, query.length - 1);
    query += ` WHERE id = ${review.id}`;
    console.log(query);
    return db.queryAsync(query);
  },
};

module.exports = reviews;

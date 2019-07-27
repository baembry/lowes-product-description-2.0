const db = require('../index');

const reviews = {
  get(id) {
    const escapedId = db.escape(id);
    return db.queryAsync(
      `SELECT * FROM reviews WHERE reviews.product_id =${escapedId}`
    );
  },
};

module.exports = reviews;

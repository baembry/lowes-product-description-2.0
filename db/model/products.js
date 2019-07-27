const db = require('../index');

const products = {
  get(id) {
    const escapedId = db.escape(id);
    return db.queryAsync(
      `SELECT products.product_id, descriptions.description FROM products INNER JOIN descriptions WHERE products.product_id =${escapedId} and descriptions.product_id=${escapedId}`
    );
  },
};

module.exports = products;

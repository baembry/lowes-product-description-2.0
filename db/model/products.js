const db = require('../index');

const products = {
  get(id) {
    return db.queryAsync(
      'SELECT * FROM products WHERE product_id = ' + db.escape(id)
    );
  },
};

module.exports = products;

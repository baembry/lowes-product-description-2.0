var mysql = require('mysql');
const tryCatch = require('../utils/tryCatch');
const Promise = require('bluebird');

var db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

Promise.promisifyAll(db);

tryCatch(async () => {
  await db.queryAsync('CREATE DATABASE IF NOT EXISTS lowes');
  await db.queryAsync(`USE lowes`);
  await db.queryAsync(
    'CREATE TABLE IF NOT EXISTS products (product_id BIGINT AUTO_INCREMENT PRIMARY KEY) ENGINE=MyISAM;'
  );
});

module.exports = db;

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
  await db.queryAsync(
    `CREATE TABLE IF NOT EXISTS descriptions(
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      product_id BIGINT not null ,
      description varchar(100), 
      FOREIGN KEY  fk_product(product_id)
      REFERENCES products(product_id)
      ON DELETE CASCADE
    )ENGINE=MyISAM;`
  );
  await db.queryAsync(
    `CREATE TABLE IF NOT EXISTS reviews(
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      product_id BIGINT not null ,
      title tinytext, 
      rating tinyint,
      recommended boolean,
      text text,
      author tinytext,
      helpful int,
      unhelpful int,

      FOREIGN KEY  fk_product(product_id)
      REFERENCES products(product_id)
      ON DELETE CASCADE
    )ENGINE=MyISAM;`
  );
  await db.queryAsync(
    `CREATE TABLE IF NOT EXISTS questions(
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      product_id BIGINT not null ,
      question text,
      author tinytext,
      date timestamp DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY  fk_product(product_id)
      REFERENCES products(product_id)
      ON DELETE CASCADE
    )ENGINE=MyISAM;`
  );
  await db.queryAsync(
    `CREATE TABLE IF NOT EXISTS answers(
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      question_id BIGINT not null ,
      author tinytext,
      date timestamp DEFAULT CURRENT_TIMESTAMP,
      text text,
      helpful int,
      unhelpful int,
      FOREIGN KEY  fk_question(question_id)
      REFERENCES questions(id)
      ON DELETE CASCADE
    )ENGINE=MyISAM;`
  );
});

module.exports = db;

secrets = require('./config.secrets');
require('dotenv').config();
const faker = require('faker');
const mysql = require('mysql');
const Promise = require('bluebird');

var db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

Promise.promisifyAll(db);

db.connect(function(err) {
  if (err) console.error(err);
  console.log('Connected!');
});

const random = function(n) {
  return Math.floor(Math.random() * (n + 1));
};

const buildQuery = function(begin, end) {
  if (end >= 200000) {
    return;
  }
  const answer = function(id) {
    return `(${id},"${faker.random.words()}", "${faker.name.firstName()}", ${random(
      20
    )}, ${random(20)})`;
  };
  let query = `INSERT INTO answers (question_id, text, author, helpful, unhelpful) VALUES ${answer(
    1
  )}`;

  for (let i = begin; i < end; i++) {
    if (i % 10000 === 0) {
      console.log(i);
    }
    query += `,${answer(i)}`;
  }
  query += ';';
  return query;
};

const seedAnswers = function(begin, end) {
  db.query('USE lowes', async err => {
    if (err) {
      console.error(err);
    }
    let start = Date.now();
    const query = buildQuery(begin, end);
    console.log('Query built ');
    db.query(query, err => {
      if (err) {
        throw err;
      } else {
        console.info('DB seeded in ' + (Date.now() - start) + ' ms');
        seedAnswers(begin + 50000, end + 50000);
      }
    });
  });
};

seedAnswers(1, 50000);

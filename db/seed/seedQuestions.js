secrets = require('./config.secrets');
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
  if (end > 210000) {
    return;
  }
  const question = function(id) {
    return `(${id},"${faker.random.words()}", "${faker.name.firstName()}")`;
  };
  let query = `INSERT INTO questions (question_id, question, author) VALUES ${question(
    1
  )}`;

  for (let i = begin; i < end; i++) {
    if (i % 10000 === 0) {
      console.log(i);
    }
    query += `,${question(i)}`;
  }
  query += ';';
  return query;
};

const seedQuestions = function(begin, end) {
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
        seedQuestions(begin + 50000, end + 50000);
      }
    });
  });
};

seedQuestions(1, 50000);

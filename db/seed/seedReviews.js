secrets = require('./config.secrets');
const faker = require('faker');
const mysql = require('mysql');
const Promise = require('bluebird');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'brian',
  password: secrets.password,
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
  const review = function(id) {
    return `(default,${id},"${faker.random.words()}", ${random(
      5
    )}, ${faker.random.boolean()}, "${faker.lorem.sentence()}", "${faker.name.firstName()}", ${random(
      20
    )}, ${random(20)})`;
  };
  let query = `INSERT INTO reviews VALUES ${review(1)}`;

  for (let i = begin; i < end; i++) {
    if (i % 10000 === 0) {
      console.log(i);
    }
    query += `,${review(i)}`;
  }
  query += ';';
  return query;
};

const seedReviews = function(begin, end) {
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
        seedReviews(begin + 50000, end + 50000);
      }
    });
  });
};

seedReviews(1, 50000);

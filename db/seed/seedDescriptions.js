secrets = require('./config.secrets');

const mysql = require('mysql');
const faker = require('faker');
console.log(process.env.DB_HOST);
var db = mysql.createConnection({
  host: 'localhost',
  user: 'brian',
  password: secrets.password,
});

db.connect(function(err) {
  if (err) console.error(err);
  console.log('Connected!');
});

const buildQuery = function(n) {
  let query = `INSERT INTO descriptions VALUES (default,${1},"${faker.random.words()}")`;
  for (let i = 0; i < n; i++) {
    query += `,(default,${i},"${faker.random.words()}")`;
  }
  query += ';';
  return query;
};

const seedDescriptions = function() {
  db.query('USE lowes', err => {
    if (err) {
      console.error(err);
    }
    let start = Date.now();
    const query = buildQuery(10000000);
    console.log('Query built');
    db.query(query, err => {
      if (err) {
        console.error(err);
      } else {
        console.info('DB seeded in ' + (Date.now() - start) + ' ms');
      }
    });
  });
};

seedDescriptions();

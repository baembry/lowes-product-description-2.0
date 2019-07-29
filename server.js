require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;

//middleware
const bodyParser = require('body-parser');

const routes = {
  products: '/products',
  questions: '/questions',
  reviews: '/reviews',
  answers: '/answers',
};

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

app.use(routes.products, require('./routes' + routes.products));

app.use(routes.questions, require('./routes' + routes.questions));

app.use(routes.answers, require('./routes' + routes.answers));

app.use(routes.reviews, require('./routes' + routes.reviews));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

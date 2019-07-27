require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

const routes = {
  products: '/products',
  questions: '/questions',
  reviews: '/reviews',
};

app.get('/', (req, res) => res.send('Hello World from the Root!'));

app.use(routes.products, require('./routes' + routes.products));

app.use(routes.questions, require('./routes' + routes.questions));

app.use(routes.reviews, require('./routes' + routes.reviews));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

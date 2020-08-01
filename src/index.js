const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const route = require('./routes');

const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'index',
  layoutsDir: path.join(__dirname, 'public', 'layouts'),
  partialsDir: path.join(__dirname, 'public', 'partials'),
});

const app = express();

app.set('views', path.join(__dirname, 'public'));
app.engine('hbs', hbs.engine);
app.set('view engine', '.hbs');
route(app, express);

const PORT = 8080;
app.listen(process.env.PORT || PORT);

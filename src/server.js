const KEYS = require('dotenv').config();
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const cors = require('cors');
const route = require('./routes');

const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'index',
  layoutsDir: path.join(__dirname, 'public', 'layouts'),
  partialsDir: path.join(__dirname, 'public', 'partials'),
  helpers: {
    paginatorPage(previous) {
      return previous + 1
    }
  },
});
const app = express();
app.use(cors(), express.json())
app.set('views', path.join(__dirname, 'public'));
app.engine('hbs', hbs.engine);
app.set('view engine', '.hbs');
route(app, express);
(async () => {
  const data = await require('./translator');
  app.use('/assets', express.static(path.join(__dirname, 'assets')));


})()

const PORT = 8080;
app.listen(process.env.PORT || PORT, () => console.log('running 8080', KEYS));

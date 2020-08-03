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
      return previous +1
    }
  },
});
const app = express();
app.use(cors(),express.json())
app.set('views', path.join(__dirname, 'public'));
app.engine('hbs', hbs.engine);
app.set('view engine', '.hbs');
// route(app, express, express.Router());
(async () => {
  const data = await require('./translator');
  const router = express.Router()
  app.use('/assets', express.static(path.join(__dirname, 'assets')));


  app.get('/', (req, res, next) => {
    res.render('teams', {
      layout: 'index',
      data: {title: 'home', teams: data.pages[1], pages: data.pages, entries: data.teamEntries},
    });
  });
  app.get('/teams', function(req, res) {
    console.log(req.params, 'request')
    const {page} = req.query
    console.log(typeof page)
    res.render('teams', {
      layout: 'index',
      data: {title: 'home', teams: data.pages[page], pages: data.pages,entries: data.teamEntries},
    });
  })

  app.post('/posteam', function(req, res){

    console.log(req.body, 'POSTED')
    res.send("POSTED")
  })
})()

const PORT = 8080;
app.listen(process.env.PORT || PORT, () => console.log('running 8080', KEYS));

const path = require('path');
const multer = require('multer');
const fs = require('fs');


module.exports = async (app, express) => {
  const data = await require('./translator');
  const router = express.Router()
  app.use('/assets', express.static(path.join(__dirname, 'assets')));

  app.get('/', (req, res, next) => {
    res.render('teams', {
      layout: 'index',
      data: {title: 'home', teams: data.pages[0], pages: data.pages},
    });
  });
  app.get('/teams/', function(req, res) {
    console.log(req, 'request')
    res.render('teams', {
      layout: 'index',
      data: {title: 'home', teams: data.pages[req.params], pages: data.pages},
    });
  })
};

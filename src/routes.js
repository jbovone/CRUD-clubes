const path = require('path');

module.exports = (app, express) => {
  app.use('/styles', express.static(path.join(__dirname, 'styles')));

  app.get('/', (req, res) => {
    res.render('home', {
      layout: 'index',
      data: {
        title: 'home',
      },
    });
  });
};

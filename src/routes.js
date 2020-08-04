const path = require('path');
const multer = require('multer');
const fs = require('fs');
const validate = require('./request-validation')
const updateTeam = require('./update-teams')

module.exports = async (app, express) => {
  const data = await require('./translator');
  app.use('/assets', express.static(path.join(__dirname, 'assets')));
  app.get('/', (req, res, next) => {
    res.redirect('teams?page=1')
    res.render('teams', {
      layout: 'index',
      data: {
        title: 'home',
        teams: data.pages[1],
        pages: data.pages,
        entries: data.teamEntries
      },
    });
  });
  app.get('/teams', function(req, res) {
    console.log(req.params, 'request')
    const {page} = req.query
    console.log(typeof page)
    res.render('teams', {
      layout: 'index',
      data: {
        title: 'home',
        teams: data.pages[page],
        pages: data.pages,
        entries: data.teamEntries
      },
    });
  })
  app.post('/posteam', function(req, res) {
    const valid = validate(req.body)
    if(valid){
      const alsoValid = updateTeam(req.body)
      if(alsoValid){
        res.status(200)
        res.send('Updated Succesfully!')
      } else{
        res.status(500)
        res.send('Something Went Wrong!')
      }
    } else {
      res.status(400)
      res.send('Something Went Wrong!')
    }
  })
};

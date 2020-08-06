const path = require('path');
const validate = require('./request-validation').valid
const uploads = require('./image-service')
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
    const { page } = req.query //page=1
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
    res.status(200)
    res.send('Updated Succesfully!')

    if(valid){
      const alsoValid = updateTeam(req.body)
      if(alsoValid){
 
      } else{
        res.sendStatus(500)
        res.send('Something Went Wrong!')
      }
    } else {
      res.sendStatus(400)
      res.send('Something Went Wrong!')
    }
  })
  app.post('/avatar', uploads, function (req, res) {
    if(/image/.test(req.file.mimetype)){
      console.log(req.file)
      console.log(req.body)
      res.sendStatus(200)
    } else{
      res.sendStatus(200)
      res.send('NULL')
    }
  })
};


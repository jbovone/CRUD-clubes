const path = require('path');
const validate = require('./request-validation')
const updateTeam = require('./update-teams')
const uploads = require('./image-service')

module.exports = (app, express, teamData) => {
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
        teams: teamData.pages[page],
        pages: teamData.pages,
        entries: teamData.teamEntries,
        count: teamData.count
      },
    });
  })
  app.post('/postTeam', uploads, async (req, res) =>  {
    if(validate.validBody(req.body)){
      const dataProcessed = await updateTeam(req.body, req.file);
      if(dataProcessed){
        teamData = dataProcessed;
        res.status(200).send('Updated Succesfully!');
      } else res.sendStatus(500);
    } else sendStatus(403);
  })
};


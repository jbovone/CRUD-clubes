const KEYS = require('dotenv').config();
const path = require('path');
const fs = require('fs')
const express = require('express');
const exphbs = require('express-handlebars');
const cors = require('cors');
const teamService = require('./vendors/footballManager');
const mapper = require('./footballManager-mapper')
const route = require('./routes');

const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'index',
  layoutsDir: path.join(__dirname, 'public', 'layouts'),
  partialsDir: path.join(__dirname, 'public', 'partials'),
  helpers: {
    undefined: function(item){
      return Boolean(item === undefined) 
    }
  },
});
const app = express();
app.use(cors(), express.json())
app.set('views', path.join(__dirname, 'public'));
app.engine('hbs', hbs.engine);
app.set('view engine', '.hbs');

const PORT = 8080;
app.listen(process.env.PORT || PORT, () => console.log('running 8080', KEYS));

(async () => {
  let appTeamsData;
  const STORAGE_PATH = path.join(__dirname, 'teams-storage', 'teams.json')
  try {
    appTeamsData = await JSON.parse(fs.readFileSync(STORAGE_PATH))
  } catch {
    console.log('IN-CATCH')
    const teamsList = await teamService()
    appTeamsData = mapper(await JSON.parse(teamsList)) 
    fs.writeFile(STORAGE_PATH, JSON.stringify(appTeamsData), ()=>{console.log('OK')}) 
  } finally {
    if(!appTeamsData) throw new Error('No Data for some reason')
  } 
  route(app, express, appTeamsData); 
})()

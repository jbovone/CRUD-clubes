const axios = require('axios');
const fs = require('fs');
const path = require('path');
const events = require('events');

const API_BASE = 'https://api.football-data.org/v2/';
const API_TOKEN = process.env.API_FOOTBALL_TOKEN;
const RESOURCE_PATH = path.join(process.cwd(), 'src', 'vendors', 'teamData.json');

async function getTeamsList(id = '2001') {
  console.log('gettttingg.......')
  const teams = `competitions/${id}/teams`;
  const response = await axios.get(`${API_BASE}${teams}`, {
    headers: {
      'X-Auth-Token': API_TOKEN,
    },
    responseType: 'stream',
  });
  
  const teamDataStream = fs.createWriteStream(RESOURCE_PATH, 'utf8');
  response.data.pipe(teamDataStream);
  await missionApollo(teamDataStream);

  const data = fs.readFileSync(RESOURCE_PATH)
  return Promise.resolve(teamData)
}

module.exports = async () => {
  let teamData;
  try {
    teamData = fs.readFileSync(RESOURCE_PATH, 'utf8');
  } catch {
    if (Boolean(API_TOKEN) === false) {
      console.log('INVAILD API TOKEN')
    }  else {
      teamData = await getTeamsList();
    }
  }
  return Promise.resolve(teamData);
};

function missionApollo(missionControl){
  return new Promise(resolve =>{
    let thrusters = 1000
    const apollo11 = setInterval(()=>{
      thrusters+=1000
    }, 1000)

    setTimeout(()=>{
      resolve('Landed')
    }, thrusters)

    missionControl.on('finish',()=>{
      console.log('FINISH')
      global.clearInterval(apollo11)
    })
  })
}
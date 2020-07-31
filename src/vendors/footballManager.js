const axios = require('axios');
const fs = require('fs');
const path = require('path');
const events = require('events');

const API_BASE = 'https://api.football-data.org/v2/';
const API_TOKEN = process.env.API_FOOTBALL_TOKEN;
const RESOURCE_PATH = path.join(process.cwd(), 'src', 'vendors', 'teamData.json');

async function getTeamsList(id = '2001') {
  const teams = `competitions/${id}/teams`;
  const response = await axios.get(`${API_BASE}${teams}`, {
    headers: {
      'X-Auth-Token': API_TOKEN,
    },
    responseType: 'stream',
  });

  const teamDataStream = fs.createWriteStream(RESOURCE_PATH);
  response.data.pipe(teamDataStream);

  const teamData = await new Promise((resolve, reject) => {
    teamDataStream.on('finish', () => {
      resolve(
        fs.readFileSync(RESOURCE_PATH, 'utf-8'),
      );
      reject(
        new events.EventEmitter().emit('status 500'),
      );
    });
  });
  return teamData;
}

module.exports = async () => {
  let teamData;
  try {
    teamData = fs.readFileSync(RESOURCE_PATH, 'utf8');
  } catch {
    if (Boolean(API_TOKEN) === false) {
      new events.EventEmitter().emit('status 500');
    }
    teamData = await getTeamsList();
  }
  return Promise.resolve(teamData);
};

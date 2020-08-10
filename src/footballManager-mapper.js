const TeamSchema = require('./entities/team');
const TeamListSchema = require('./entities/teamsList');

module.exports = (teamsData) => {
  const list = new TeamListSchema(
    teamsData.count,
    teamsData.competition.name,
    teamsData.competition.lastUpdated,
    teamsData.teams.map((team, i) => new TeamSchema(
      team.name,
      team.crestUrl || './assets/null.svg',
      team.venue,
      team.founded,
      team.phone || 'Not Provided',
      team.website || 'Not Provided',
      team.mail || 'Not Provided',
      team.clubcolors || 'Not Provided',
      teamsData.competition.code || 'Not Provided',
      i,
    )),
  );
  return list;
}
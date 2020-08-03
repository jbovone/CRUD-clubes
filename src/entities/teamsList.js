class Teamlist {
  constructor(count, name, updated, teams) {
    this.count = count;
    this.name = name;
    this.updated = updated;
    this.teams = teams;
    this.teamEntries = Teamlist.teamEntries(teams[0]);
    this.pages = Teamlist.setPagination(teams);
  }

  static teamEntries(team) {
    return Object.keys(team);
  }

  static setPagination(teams, teamsPerPage = 10) {
    let prependTeams = [null];
    for (let i = 1; i <= teams.length; i += teamsPerPage) {
      let page = [];
      for (let j = i; j <= teamsPerPage + i; j++) {
        page.push(teams[j])
      }
      prependTeams.push(page)
    }
    return prependTeams
  }
}

module.exports = Teamlist;

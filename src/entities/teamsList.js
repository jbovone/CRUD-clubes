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

  static setPagination(teams) {
    const teamsPerPage = 10;
    let pagedTeams = [];
    for (let i = 0; i < teams.length; i++) {
      const page = [];
      for (let j = 0; j < teamsPerPage; j++) {
        page.push(teams[j]);
      }
      pagedTeams[i] = page;
    }
    return pagedTeams
  }
}
module.exports = Teamlist;

class Team {
  constructor(name, cresturl, venue, founded, phone, website, email, clubcolors, seedList, id) {
    this.name = name;
    this.cresturl = cresturl || './assets/null.svg';
    this.venue = venue;
    this.founded = founded;
    this.phone = phone || 'Not Provided';
    this.website = website || 'Not Provided';
    this.email = email || 'Not Provided';
    this.clubcolors = clubcolors || 'Not Provided';
    this.seedList = seedList;
    this.id = id;
  }
}
module.exports = Team;

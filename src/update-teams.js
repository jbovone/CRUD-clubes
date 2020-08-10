const fs = require('fs')
const path = require('path')
const TeamList = require('./entities/teamsList')
const Team = require('./entities/team')

module.exports = async (requestObject, file)=>{
  const newEntrie = await JSON.parse(requestObject.entries)
  
  const action = newEntrie.action
  delete newEntrie.action

  const STORAGE_PATH = path.join(__dirname, 'teams-storage', 'teams.json')   
  const storage = await JSON.parse(
    fs.readFileSync(STORAGE_PATH, 'utf-8')
  )

  if(action === 'Create') newEntrie.id = storage.teams.length + 1
  if(/fakepath/.test(newEntrie.cresturl)) newEntrie.cresturl = `/assets/uploads/${file.filename}`
  console.log(newEntrie, 'NEWENTRIE')
  const newTeamList = storage.teams.filter(team => newEntrie.id !== String(team.id))
  
  if(action !== 'Delete') {
    storage.teams = newTeamList.concat(newEntrie); 
  } else {
    storage.teams = newTeamList;
  }

  storage.pages = TeamList.setPagination(storage.teams);     

  fs.writeFileSync(STORAGE_PATH, JSON.stringify(storage));  

  return Promise.resolve(storage);
}

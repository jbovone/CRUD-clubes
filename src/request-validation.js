module.exports = {
  isAllowed: (ext)=>{
      return  /\.jpg|\.jpeg|\.png|\.svg/.test(ext)
    },
  validBody: (body)=> {
    return true
  } // for testing!
}   
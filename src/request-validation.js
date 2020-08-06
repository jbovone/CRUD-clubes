module.exports = {
    image: (ext)=>{
      return  /\.jpg|\.jpeg|\.png|\.svg/.test(ext)
    },
    valid: ()=> true // for testing!
}   
const multer = require('multer');
const path = require('path');
const isAllowed = require('./request-validation').image

const storage = multer.diskStorage({
  destination: function (req, file, nextCallback) {
    nextCallback(null, path.join(__dirname, 'assets', 'uploads'),)
  },
  filename: function (req, file, nextCallback) {
    console.log(file)
    const ext = path.extname(file.originalname)
    if(isAllowed(ext)){
      nextCallback(null, `${file.fieldname}-${Date.now()}${ext}`) //null is err parameter  
    } else {
      nextCallback('Mismatch File Extention')    
    }  
  },
}) 
const uploads = multer({ 
  storage: storage, 
  limits:{
    fileSize: 190000,
    fieldNameSize: 300,
  }   
}).single('avatar')  

module.exports = uploads

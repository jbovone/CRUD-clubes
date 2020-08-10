const multer = require('multer');
const path = require('path');
const isAllowed = require('./request-validation').isAllowed;

const storage = multer.diskStorage({
  destination: function (req, file, nextCallback) {
    nextCallback(null, path.join(__dirname, 'assets', 'uploads'),)
  },
  filename: function (req, file, nextCallback) {
    const ext = path.extname(file.originalname)
    if(isAllowed(ext)){
      nextCallback(null, `${file.fieldname}-${Date.now()}${ext}`) //null is err param  
    } else {
      nextCallback('Mismatch File Extention')    
    }  
  },
}) 
const uploads = multer({ 
  storage: storage, 
  limits:{
    fileSize: 1900000,
    fieldNameSize: 300,
  }   
}).single('avatar')  

module.exports = uploads

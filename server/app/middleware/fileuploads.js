const multer = require("multer")
let storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,"uploads/student")

    },
    filename:function(req,file,callback){
        callback(null,Date.now() + file.originalname)
    }
})

let uploads=multer({storage:storage})
module.exports={uploads}
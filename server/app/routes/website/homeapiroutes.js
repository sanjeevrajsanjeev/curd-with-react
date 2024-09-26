let express=require("express")
const { studentInsert,studentView,studentDelete } = require("../../controller/website/homecontroller.js")
const { uploads } = require("../../middleware/fileuploads.js")

let homeapi=express.Router()




homeapi.post("/student-insert",uploads.single('uphoto'),studentInsert)
homeapi.get("/student-view",studentView)
homeapi.delete("/student-delete/:id",studentDelete)

module.exports={homeapi}
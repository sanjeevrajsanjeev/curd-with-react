let express=require("express")
const { homeapi } = require("./routes/website/homeapiroutes")
let mainRoute=express.Router()
mainRoute.use("/website/home",homeapi)

module.exports={mainRoute}
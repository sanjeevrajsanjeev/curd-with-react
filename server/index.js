let express=require("express");
let cors=require("cors")
const { mainRoute } = require("./app/mainroute");
let app=express();
app.use(cors())
app.use(express.json())
app.use("/uploads/student", express.static("uploads/student"))
app.use(mainRoute)
app.listen("8000")
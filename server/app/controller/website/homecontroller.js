
const {ObjectId}=require("mongodb");
const {dbConnection} =require("..//../../dbconnection");
const { transporter } = require("../../../mailconfig");

let studentInsert=async(req,res)=>{
    let {uname,uemail,uphone}=req.body
  
    let obj={
        uname,
        uemail,
        uphone
    }
    if(req.file){
        if(req.file.filename){
            obj['uphoto']=req.file.filename
        }
    }
    try{
        
        let db=await dbConnection();
        let studentTable=await db.collection("student")
        
        let finalres=await studentTable.insertOne(obj)

        const info = await transporter.sendMail({

            from: '"Enquiry mail 👻" <sanjeevrajsanjeev@gmail.com>', // sender address
            to: "beautysanjeev5098@gmail.com,sanjeevrajsanjeev88@gmail.com", // list of receivers
            subject: "Contact Enquiry form ✔", // Subject line
            text: "Contact Enquiry form", // plain text body
            html: `<html>
                        <head>
                            <body>
                                <table border="1" cellpadding="10">
                                    <tr>
                                        <th>Name</th>
                                        <td>${uname}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>${uemail}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>${uphone}</td>
                                    </tr>
                                </table>
                            </body>
                        </head>
            
            </html>`, // html body
          });



          const infouser = await transporter.sendMail({
            from: '"Enquiry mail 👻" <sanjeevrajsanjeev@gmail.com>', // sender address
            to: uemail, // list of receivers
            subject: "Thank you ✔", // Subject line
            text: "Contact Enquiry form", // plain text body
            html: `<html>
                        <head>
                            <body>
                               Thanks for Enquiry
                            </body>
                        </head>
            
            </html>`, // html body
          });


     


        let apiobj={
            status:true,
            message:finalres
        }
       res.send(apiobj)
    }
       catch(error){
       res.send(error)
  }
 

}
let studentView=async(req,res)=>{
    let db=await dbConnection();
    let studentTable=await db.collection("student")
    let studentList=await studentTable.find().toArray();
    let obj={
        status:1,
        path:'http://localhost:8000/uploads/student/',
        data:studentList
    }
    res.send(obj)
}

let studentDelete=async(req,res)=>{
    let id=req.params.id;
    let db=await dbConnection();
    let studentTable=await db.collection("student")
    let delRes=await studentTable.deleteOne({_id:new ObjectId(id)})

    let obj={
        status:true,
        message:delRes

    }
    res.send(obj)
}

module.exports={studentInsert,studentView,studentDelete}
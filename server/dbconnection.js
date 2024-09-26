const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
let dbName="reactCurdWSLC280"
let dbConnection=async()=>{
    await client.connect()
    let db=await client.db(dbName)
    return db
}

module.exports={dbConnection}

//http:localhost:8000/website/home/student-insert
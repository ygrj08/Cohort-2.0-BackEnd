// server ko start karna
// database se connect karna

const app = require('./src/app')
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const mongoose = require("mongoose")

function connectToDb (){
    mongoose.connect("mongodb+srv://yograj:cBSUrYbVZAtc6FGJ@cluster0.t5hmbov.mongodb.net/day-6-practice")
    .then(()=>{
        console.log("connected to databse")
    })
}

connectToDb()


app.listen(3000,()=>{
    console.log("server running on port 3000")
})


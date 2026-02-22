// server ko start karna 
// server ko database se connect karna

const app = require("./src/app");

const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://yograj:YSudK6e9B7q24ybe@cluster0.dlvl8eb.mongodb.net/day-6")
    .then(()=>{
        console.log("Database connected")
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
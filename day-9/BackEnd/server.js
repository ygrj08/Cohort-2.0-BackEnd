// server ko start karna
// database se connect karna

require('dotenv').config()
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const app = require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB()

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})


/*
- server create karna
- server ko config karna

*/

const express = require("express")

const app = express()

app.use(express.json()) // Middleware - to read the data fron the req.body

const notes = []

app.get("/", (req, res)=>{
    res.send("Hellow world")
})

app.post("/notes", (req,res)=>{
    console.log(req.body)

    notes.push(req.body)
    console.log(notes)

    res.send('notes created')
})

app.get('/notes', (req, res)=>{
    res.send(notes)
})

// params - use when we pass single data to the server

// :index - is used to handle the dynamic data 

app.delete("/notes/:index", (req, res)=>{
    delete notes [req.params.index]

    res.send("note delete successfully")
})

// patch- update the data partially
// req.body - {description : "modified descrition"}

app.patch("/notes/:index",(req, res)=>{
    notes[req.params.index].description = req.body.description

    res.send("Note updated successfully")
})

module.exports = app
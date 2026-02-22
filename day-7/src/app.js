// server create karna

const express = require("express")
const notesModel = require("./models/notes.model")

const app = express()

app.use(express.json());

// POST /notes
// req.body - {title, description}

app.post("/notes", async (req, res)=>{
    const {title, description}= req.body

    const note = await notesModel.create({
        title, description
    })

    res.status(201).json({
        message: "note created successfully",
        note
    })
})

// - GET /notes
// fetch all the data notes

app.get("/notes", async (req,res)=>{
    const notes = await notesModel.find()

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

module.exports= app
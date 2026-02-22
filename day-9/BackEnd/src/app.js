// server ko create karna

const express = require("express")
const noteModel = require("./models/note.model")


const app = express()

app.use(express.json())


// POST/api/notes
// create new note and save data in mongodb
// req.body - {title,description}

app.post('/api/notes',async (req, res)=>{

    const {title, description} = req.body

     const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })

})

// -GET/api/notes
// -Fetch all the data from mongodb and send then in the responce

app.get('/api/notes',async (req, res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Note fetch successfully",
        notes

    })
})

// -DELETE /api/notes/:id
// -Delete noted with the id from req.params

app.delete('/api/notes/:id', async (req, res)=>{
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: 'Note delete successfully'
    })
})

// - PATCH/api/notes/:id
// - update the description of the note
// - req.body -{description}

app.patch('/api/notes/:id', async (req,res)=>{
    const id = req.params.id

    const {title}= req.body

    await noteModel.findByIdAndUpdate(id, {title})

    res.status(200).json({
        message: "Note updated successfully",
        
    })

    
})

module.exports = app
import { useState, useEffect } from 'react'
import axios from "axios"


function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [editId, setEditId] = useState(null)

  function fetchNotes() {
    axios.get("https://cohort-2-0-backend-o8ua.onrender.com/api/notes")
      .then((res) => {
        setNotes(res.data.notes)
      })


  }

  useEffect(() => {
    fetchNotes()

  }, [])

  // function handleSubmit(e) {
  //   e.preventDefault()

  //   const { title, description } = e.target.elements

  //   console.log(title.value, description.value)

  //   axios.post("http://localhost:3000/api/notes", {
  //     title: title.value,
  //     description: description.value
  //   })
  //     .then(res => {
  //       console.log(res.data)

  //       fetchNotes()
  //     })
  // }

  function handleSubmit(e) {
    e.preventDefault()

    // Trim removes extra spaces
    if (title.trim() === "" || description.trim() === "") {
      alert("Please fill all fields")
      return
    }

    if (editId) {
      // UPDATE MODE
      axios.patch(`https://cohort-2-0-backend-o8ua.onrender.com/api/notes/${editId}`, {
        title,
        description
      })
        .then(res => {
          setEditId(null)
          setTitle("")
          setDescription("")
          fetchNotes()
        })
    } else {
      // CREATE MODE
      axios.post("https://cohort-2-0-backend-o8ua.onrender.com/api/notes", {
        title,
        description
      })
        .then(res => {
          setTitle("")
          setDescription("")
          fetchNotes()
        })
    }
  }

  function handleDeleteNote(noteId) {
    axios.delete("https://cohort-2-0-backend-o8ua.onrender.com/api/notes/" + noteId)
      .then(res => {
        console.log(res.data)
        fetchNotes()
      })


    // EDIT BUTTON CLICK
  }

  function handleEdit(note) {
    setEditId(note._id)
    setTitle(note.title)
    setDescription(note.description)
  }


  return (
    <>
      <form className='note-created-form' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>
          {editId ? "Update Note" : "Create Note"}
        </button>
      </form>

      <div className="notes">
        {
          notes.map(note => {
            return <div className="note" key={note._id}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={() => handleEdit(note)}>
                Edit
              </button>
              <button onClick={() => { handleDeleteNote(note._id) }}>
                Delete
              </button>
            </div>

          })
        }

      </div>

    </>
  )
}

export default App

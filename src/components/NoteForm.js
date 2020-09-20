import React, { useState } from 'react'

const NoteForm = (props) => {
  const { submitNote } = props

  const [newNote, setNewNote] = useState('')

  // 处理文本框  受控组件
  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    let noteObj = {
      // id: notes.length + 1, // no need to post
      content: newNote,
      date: (new Date()).toString(),
      important: Math.random() < 0.5
    }
    setNewNote('')
    submitNote(noteObj)
  }

  return (
    <div className="note-form">
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleChange}/>
        <button type="submit" >Add</button>
      </form>
    </div>
  )
}

export default NoteForm
import React from 'react'
import { useState, useEffect } from 'react'
import NoteCard from '../../components/NoteCard'
import PageTitleButton from '../../components/PageTitleButton'
import NoteModal from '../../components/NoteModal'

function Notes() {
  const [notes, setNotes] = useState([])
  const [showModal, setShowModal] = useState(false)

  const addNote = (title, content) => {
    if (!title || !content) return
    const newNote = {
      id: Date.now(),
      title: title,
      content: content,
    }
    setNotes([...notes, newNote])
    setShowModal(false)
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const closeModal = () => setShowModal(false)

  useEffect(()=> {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || []
    setNotes(storedNotes)
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  return (
    <div>
      <PageTitleButton title="Your Notes" button="Add Note" onClick={() => setShowModal(true)} />

      {showModal && (
        <NoteModal
          onSave={addNote}
          onClose={closeModal}
        />
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {notes.length === 0 ?
          <div className='col-span-full text-center text-slate-500 py-10 italic'>
            No notes yet.!
          </div>

          :

          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note.id}
              title={note.title}
              content={note.content}
              date={new Date().toLocaleDateString()}
              onDelete={deleteNote}
            />
          ))}
      </div>
    </div>
  )
}

export default Notes
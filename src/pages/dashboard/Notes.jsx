import React from 'react'
import { useState, useEffect } from 'react'
import NoteCard from '../../components/NoteCard'
import PageTitleButton from '../../components/PageTitleButton'
import NoteModal from '../../components/NoteModal'

function Notes() {
  const [notes, setNotes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)

  const handleAdd = () => {
    setSelectedNote(null)
    setShowModal(true)
  }

  const handleEdit = (note) => {
    setSelectedNote(note)
    setShowModal(true) 
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const saveNote = (data) => {
    if (selectedNote) {
      setNotes(notes.map(note => note.id === selectedNote.id ? { ...note, ...data } : note))
    }else{
      setNotes([...notes, { id: Date.now(), ...data }])
    }
    setSelectedNote(null)
    setShowModal(false)
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
      <PageTitleButton title="Your Notes" button="Add Note" onClick={handleAdd} />

      {showModal && (
        <NoteModal
          selectedNote={selectedNote}
          onSave={saveNote}
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
              note={note}
              date={new Date().toLocaleDateString()}
              onDelete={() => deleteNote(note.id)}
              onEdit={() => handleEdit(note)}
            />
          ))}
      </div>
    </div>
  )
}

export default Notes
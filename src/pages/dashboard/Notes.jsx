import React from 'react'
import { useState } from 'react'
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

  const closeModal = () => setShowModal(false)


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
            <NoteCard key={note.id} title={note.title} content={note.content} date={new Date().toLocaleDateString()} />
          ))}
      </div>
    </div>
  )
}

export default Notes
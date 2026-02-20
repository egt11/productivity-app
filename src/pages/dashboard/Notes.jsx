import React from 'react'
import { useState } from 'react'
import NoteCard from '../../components/NoteCard'
import PageTitleButton from '../../components/PageTitleButton'

function Notes() {
  const [notes, setNotes] = useState([])

  return (
    <div>
      <PageTitleButton title="Your Notes" button="Add Note" onClick={() => alert('Add Note clicked!')} />

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
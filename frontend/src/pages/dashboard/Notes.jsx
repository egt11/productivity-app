import React from 'react'
import { useState, useEffect } from 'react'
import NoteCard from '../../components/notes/NoteCard'
import PageTitleButton from '../../components/PageTitleButton'
import NoteModal from '../../components/notes/NoteModal'
import ConfirmDelete from '../../components/ConfirmDelete'
import axios from 'axios'

function Notes() {
  const [notes, setNotes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const [token, setToken] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleAdd = () => {
    setSelectedNote(null)
    setShowModal(true)
  }

  const handleEdit = (note) => {
    setSelectedNote(note)
    setShowModal(true)
  }

  const handleDelete = (note) => {
    setSelectedNote(note)
    setShowConfirm(true)
  }

  const deleteNote = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/notes/${id}`, { headers: { Authorization: `Bearer: ${token}` } })
    setNotes(notes.filter(note => note._id !== id))
    setShowConfirm(false)
  }

  const saveNote = async (data) => {
    if (selectedNote) {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/notes/${selectedNote._id}`, {
        title: data.title,
        content: data.content
      }, { headers: { Authorization: `Bearer ${token}` } })
      setNotes(notes.map(note => note._id === selectedNote._id ? response.data : note))
    } else {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/notes`, {
        title: data.title,
        content: data.content
      }, { headers: { Authorization: `Bearer ${token}` } })
      setNotes([...notes, response.data])
    }
    setSelectedNote(null)
    closeModal()
  }

  const closeModal = () => setShowModal(false)

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('token'))
    const token = storedToken?.token
    setToken(token)

    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notes`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setNotes(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchNotes()
  }, [])

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
            No notes yet.
          </div>

          :

          notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              date={note.date}
              onDelete={() => handleDelete(note)}
              onEdit={() => handleEdit(note)}
            />
          ))}

        {showConfirm &&
          <ConfirmDelete
            item={"note"}
            onClose={() => setShowConfirm(false)}
            onSave={() => deleteNote(selectedNote._id)}
          />
        }

      </div>
    </div>
  )
}

export default Notes
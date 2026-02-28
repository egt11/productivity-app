import React from 'react'
import PageTitleButton from '../../components/PageTitleButton'
import { useState, useEffect } from 'react'
import TaskModal from '../../components/tasks/TaskModal'
import TaskCard from '../../components/tasks/TaskCard'
import ConfirmDelete from '../../components/ConfirmDelete'
import axios from 'axios'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [taskPriorities, setTaskPriorities] = useState(['Low', 'Medium', 'High'])
  const [selectedTask, setSelectedTask] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [status, setStatus] = useState('Incomplete')
  const [token, setToken] = useState(null)

  const handleAdd = () => {
    setSelectedTask(null)
    setShowModal(true)
  }

  const handleEdit = (task) => {
    setSelectedTask(task)
    setShowModal(true)
  }

  const handleDelete = (task) => {
    setSelectedTask(task)
    setShowConfirm(true)
  }

  const deleteTask = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    setTasks(tasks.filter(task => task._id !== id))
    setShowConfirm(false)
  }

  const saveTask = async (data) => {
    const storeDate = data.date || 'No deadline'
    if (selectedTask) {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/${selectedTask._id}`,
        {
          title: data.title,
          priorityLevel: data.priorityLevel,
          date: storeDate
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTasks(tasks.map(task => task._id === selectedTask._id ? response.data : task))
    } else {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          title: data.title,
          priorityLevel: data.priorityLevel,
          date: storeDate
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTasks([...tasks, response.data])
    }
    setSelectedTask(null)
    closeModal()
  }

  const toggleStatus = async (id) => {
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    setTasks(tasks.map(task => task._id === id ? response.data : task))
  }

  const closeModal = () => setShowModal(false)

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('token'))
    const token = storedToken?.token
    setToken(token)

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setTasks(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTasks()
  }, [])


  return (
    <div>
      <PageTitleButton title="Your Tasks" button="Add Task" onClick={handleAdd} />
      {showModal && <TaskModal priority={taskPriorities} onClose={closeModal} onSave={saveTask} selectedTask={selectedTask} />}

      <div>
        {tasks.length === 0 ?
          <div className='text-center text-slate-500 py-10 italic'>
            No tasks yet.
          </div>

          :

          tasks.map(task => (
            <TaskCard key={task._id} task={task} onEdit={() => handleEdit(task)} onDelete={() => handleDelete(task)} onToggleStatus={() => toggleStatus(task._id)} />
          ))
        }
      </div>

      {showConfirm &&
        <ConfirmDelete 
        item={"task"}
        onClose={() => setShowConfirm(false)} 
        onSave={() => deleteTask(selectedTask._id)} />
      }
    </div>
  )
}

export default Tasks
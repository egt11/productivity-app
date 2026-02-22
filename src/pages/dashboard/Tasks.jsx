import React from 'react'
import PageTitleButton from '../../components/PageTitleButton'
import { useState, useEffect } from 'react'
import TaskModal from '../../components/tasks/TaskModal'
import TaskCard from '../../components/tasks/TaskCard'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [taskPriorities, setTaskPriorities] = useState(['Low', 'Medium', 'High'])
  const [selectedTask, setSelectedTask] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [status, setStatus] = useState('Incomplete')

  const handleAdd = () => {
    setSelectedTask(null)
    setShowModal(true)
  }

  const handleEdit = (task) => {
    setSelectedTask(task)
    setShowModal(true) 
  }

  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id))

  const handleSave = (data) => {
    if (selectedTask) {
      setTasks(tasks.map(task => task.id === selectedTask.id ? {...task, ...data } : task))
    }else{
      const newTask = {
        id: Date.now(),
        title: data.title,
        priority: data.priorityLevel,
        date: data.date,
        status: 'Incomplete'
      }
      setTasks([...tasks, newTask])
    }
    setSelectedTask(null)
    closeModal()
  }

  const toggleStatus = (id) => {
    setTasks(tasks.map(task => task.id === id ? {...task, status: task.status === 'completed' ? 'Incomplete' : 'completed'} : task))
  }

  const closeModal = () => setShowModal(false)

  useEffect(()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    setTasks(storedTasks)
  }, [])

  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])


  return (
    <div>
      <PageTitleButton title="Your Tasks" button="Add Task" onClick={handleAdd} />
      {showModal && <TaskModal priority={taskPriorities} onClose={closeModal} onSave={handleSave} selectedTask={selectedTask}/>}

      <div>
        {tasks.length === 0 ?
          <div className='text-center text-slate-500 py-10 italic'>
            No tasks yet.
          </div>

          :

          tasks.map(task => (
            <TaskCard key={task.id} task={task} onEdit={() => handleEdit(task)} onDelete={() => deleteTask(task.id)} onToggleStatus={() => toggleStatus(task.id)} />
          ))
        }
      </div>
    </div>
  )
}

export default Tasks
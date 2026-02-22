import React from 'react'
import PageTitleButton from '../../components/PageTitleButton'

function Tasks() {
  return (
    <div>
      <PageTitleButton title="Your Tasks" button="Add Task" onClick={() => alert('Add Task clicked!')} />

      <div>
        tasks
      </div>
    </div>
  )
}

export default Tasks
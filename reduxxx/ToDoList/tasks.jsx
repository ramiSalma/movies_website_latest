// App.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask } from './actions';

function Tasks() {
  const [taskText, setTaskText] = useState('');
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText('');
    }
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h1>To-Do List</h1>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter a task"
          style={{ padding: '8px', width: '70%' }}
        />
        <button
          onClick={handleAddTask}
          style={{
            padding: '8px 12px',
            marginLeft: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add Task
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: '1px solid #ccc',
            }}
          >
            <span>{task.text}</span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#FF4D4D',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;

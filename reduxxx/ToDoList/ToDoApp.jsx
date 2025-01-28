import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Tasks from './tasks'

const ToDoApp = () => {
  return (
    <div>
      <Provider store={store}>
        <Tasks/>
        </Provider>
    </div>
  )
}

export default ToDoApp

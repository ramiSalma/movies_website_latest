import React from 'react'
import { Store } from './store'

const table = () => {
    const users = Store.getState()
    console.log(users);
  return (
    <div>
      
    </div>
  )
}

export default table


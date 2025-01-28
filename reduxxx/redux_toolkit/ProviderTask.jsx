import React from 'react'
import { Provider } from 'react-redux'
import  StoreToolkit  from './store'
import CounterToolkit from './CounterToolkit'

const ProviderTask = () => {
  return (
    <div>
        <Provider Store={StoreToolkit}>
            <CounterToolkit />
        </Provider>
      
    </div>
  )
}

export default ProviderTask

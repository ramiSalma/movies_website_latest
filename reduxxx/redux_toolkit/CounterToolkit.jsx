import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './SliceTask';

const CounterToolkit = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
          <h1>Counter: {count}</h1>
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
      );
}

export default CounterToolkit

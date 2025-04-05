import React from 'react'
import Pomodorotimer from '../components/Pomodorotimer';
import TodoList from '../components/TodoList';

const Homepage = () => {
  return (
    <div className='flex justify-center gap-80 pt-44'>
        <Pomodorotimer/>
        <TodoList/>
    </div>
  )
}

export default Homepage

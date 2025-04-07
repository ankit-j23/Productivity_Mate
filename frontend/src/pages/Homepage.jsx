import React from 'react'
import Pomodorotimer from '../components/Pomodorotimer';
import TodoList from '../components/TodoList';

const Homepage = () => {
  return (
    <div className='flex max-lg:flex-col max-lg:items-center lg:justify-center 2xl:gap-80 lg:gap-32 gap-28 2xl:pt-44 max-lg:py-12 max-2xl:py-24 '>
        <Pomodorotimer/>
        <TodoList/>
    </div>
  )
}

export default Homepage;

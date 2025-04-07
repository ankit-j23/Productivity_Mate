import { ListTodo, NotepadText } from 'lucide-react'
import React from 'react'
import TodoItem from './TodoItem'

const TodoList = () => {
  return (
    <div className='flex flex-col gap-3 shadow-lg  lg:shadow-2xl min-w-[340px] sm:min-w-[395px] lg:w-[380px] 2xl:w-3/12 h-[400px] lg:h-[380px] 2xl:h-[500px] px-4 sm:px-11 py-3 md:py-6'>
        <div className='flex flex-col gap-2 items-center place-self-center'>
          <div className='flex gap-1 items-center'>
          <ListTodo className='size-5 lg:size-6 text-green-800'/>
          <h1 className='text-lg 2xl:text-2xl text-green-800'>Your ToDos</h1>
          </div>
            <p>Create your todo list for today</p>
        </div>
        <div className='relative'>
            <input className='p-1.5 2xl:p-2 pl-4 border border-green-800/60 focus:outline-green-800/80 w-full rounded-lg' type="text" name="" id="" placeholder='Add a new task'/>
            <button className='absolute inset-y-0 right-0 px-4 rounded-lg bg-green-800 text-white'>Add</button>
        </div>

        <div className='flex flex-col mt-2 md:mt-5 lg:mt-3 2xl:mt-5 px-1 gap-5 sm:h-7/12 md:h-10/12 transition-all duration-200 overflow-y-auto snap-none'>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        </div>

        {/* <NotepadText/> */}
    </div>
  )
}

export default TodoList

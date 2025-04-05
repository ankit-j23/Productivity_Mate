import { ListTodo, NotepadText } from 'lucide-react'
import React from 'react'
import TodoItem from './TodoItem'

const TodoList = () => {
  return (
    <div className='flex flex-col gap-3 shadow-2xl  w-3/12 max-h-[500px] p-10'>
        <div className='flex gap-2 items-center'>
            <ListTodo className='size-6'/>
            <h1 className='text-lg font-semibold'>Your ToDos</h1>
        </div>
        <div className='relative'>
            <input className='p-2 pl-4 border border-black/60 focus:outline-black/60 w-full rounded-lg' type="text" name="" id="" placeholder='Add a new task'/>
            <button className='absolute inset-y-0 right-0 px-4 rounded-lg bg-green-800 text-white'>Add</button>
        </div>

        <div className='flex flex-col mt-5 px-2 gap-5 h-10/12 transition-all duration-200 overflow-y-auto'>
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

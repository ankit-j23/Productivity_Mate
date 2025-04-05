import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='p-4 sm:px-14 xl:px-36 py-4 lg:py-6 boder bg-green-800 text-white flex justify-between items-center'>
        <Link to={"/"}><h1 className='text-md sm:text-lg lg:text-2xl font-semibold font-sans italic'>Productivity Mate</h1></Link>
        <div className='flex gap-4 sm:gap-8 xl:gap-20 text-base sm:text-md lg:text-xl'>
            <Link to={"/loginpage"}>Login</Link>
            <Link to={"/signuppage"}>Signup</Link>
        </div>
    </div>
  )
}

export default Navbar

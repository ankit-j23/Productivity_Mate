import React from 'react'
import { Lock, User , Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const SignupPage = () => {
  return (
    <div
    className="flex fixed inset-0 min-h-screen bg-black/60 items-center justify-center"
  >
    <div className="login-modal bg-white rounded-lg w-[450px]">
      <div className="flex flex-col gap-2 w-full p-16">
        <div className="flex flex-col items-center gap-3 ">
          <h1 className='text-3xl text-green-800 font-sans font-semibold  italic' >Productivity Mate</h1>
          <p className='text-xl font-semibold'>Welcome back !!</p>
        </div>
        <form className=''>
          <div className="flex flex-col gap-2 ">
            <div className="flex flex-col">
              <label className="text-black/75" htmlFor="name">
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 pl-3 flex items-center">
                  <User className="size-5 text-green-800/60" />
                </div>
                <input
                  className="border-2 p-2 pl-10 rounded-md border-green-800/60 focus:outline-green-800/80 w-full"
                  type="text"
                  id="name"
                  name="name"
                  // value={creds.name}
                  placeholder="Jhon Cena"
                  // onChange={onchange}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className='text-black/75' htmlFor="email">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 pl-3 flex items-center">
                  <Mail className="size-5 text-green-800/60" />
                </div>
                <input
                  className="border-2 p-2 pl-10 rounded-md border-green-800/60 focus:outline-green-800/80 w-full"
                  type="text"
                  id="email"
                  name="email"
                  // value={creds.email}
                  placeholder="Jhon@cena.com"
                  // onChange={onchange}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className='text-black/75' htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 pl-3 flex items-center">
                  <Lock className="size-5 text-green-800/60" />
                </div>
                <input
                  className="border-2 p-2 pl-10 rounded-md border-green-800/60 focus:outline-green-800/80 w-full"
                  type="password"
                  id="password"
                  name="password"
                  // value={creds.password}
                  placeholder="type your password here"
                  // onChange={onchange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="border p-2 rounded-md bg-green-800 text-white cursor-pointer"
            >
              SignIn
            </button>
          </div>
        </form>
        <div className="flex justify-center text-md">
          <p>
            Already have an account?{" "}
            <Link className="text-blue-800 text-lg">SignIn</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SignupPage

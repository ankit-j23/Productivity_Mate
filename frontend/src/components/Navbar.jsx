import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../lib/axios";
import { authLogout } from "../features/auth/AuthSlice";
import toast from "react-hot-toast";
import { LogIn, LogOut, User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)

  const handleLogout = async () => {
    // console.log(isAuthenticated)
    try {
      const res = await axiosInstance.post("/auth/logout");
      console.log(res);
      dispatch(authLogout());
      toast.success("Logged Out Successfully");
      setTimeout(() => {
        navigate('/')
      }, 200);
      // console.log(isAuthenticated)
    } catch (error) {
      console.log(
        "some error occured in the handlelogout function in the navComponent" +
          error
      );
    }
  };

  return (
    <div className="p-4 sm:px-14 xl:px-36 py-4 lg:py-6 boder bg-green-800 text-white flex justify-between items-center">
      <Link to={isAuthenticated ? '/authhome' : '/'}>
        <h1 onClick={()=>{console.log(isAuthenticated)}} className="text-md sm:text-lg lg:text-2xl font-semibold font-sans italic">
          Productivity Mate
        </h1>
      </Link>
      <div className="flex gap-4 sm:gap-8 xl:gap-20 text-base sm:text-md lg:text-xl xl:text-2xl">
        {!isAuthenticated ? (
          <>
            <Link to={"/loginpage"} className="hidden max-sm:inline"><User/></Link>
            <Link to={"/loginpage"} className="hidden sm:inline">Login</Link>
            <Link to={"/signuppage"} className="hidden sm:inline">Signup</Link>
          </>
        ) : (
          <>
            <button onClick={handleLogout} className="cursor-pointer flex items-center justify-center gap-2">
              <h1 className="hidden sm:inline">Logout</h1>
              <LogOut className="size-5"/>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

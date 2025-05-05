import React, { useEffect, useRef , useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail , Loader2, Cross, X , CircleCheck} from "lucide-react";
import modalClose from "../lib/modalClose";
import { useSelector, useDispatch } from "react-redux";
import {
  authStarted,
  authSuccess,
  authFailed,
} from "../features/auth/AuthSlice";
import validateForm from "../lib/validateForm";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

const LoginPage = () => {
  //ref for modal closing
  const closeRef = useRef();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  //from rtk
  const { user, loading, error } = useSelector(
    (state) => state.auth
  );



  //credentails to put in the route
  const [credentails, setCredentials] = useState({
    email: "",
    password: "",
  });


  //main login function
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(authStarted(true));

    //validations
    const validationRes = validateForm(credentails, "login");
    if (!validationRes) {
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/login", credentails);
      dispatch(authSuccess(res.data));

      
      toast.success("Logged in successfully");
      console.log(res.data);

      setTimeout(() => {
        navigate("/authhome");
      }, 200);

    } catch (error) {
      console.log(error)
      dispatch(authFailed(error.response.data.message || "Login Failed"));
      toast.error(error.response.data.message || "Sorry, login failed");
      // console.log(error)
    }
  };


  //onchange function to pass in the inputs
  const onChange = (e) => {
    setCredentials({ ...credentails, [e.target.name]: e.target.value });
  };

  return (
    <div
      ref={closeRef}
      onClick={(e) => {
        modalClose(e, closeRef, navigate);
      }}
      className="flex fixed inset-0 min-h-screen bg-black/80 items-center justify-center"
    >
      <div className="flex flex-col login-modal bg-white rounded-lg 2x:w-[450px]">
        <button className="place-self-end pt-2 pr-2 hidden max-lg:inline"><X/></button>
        <div className="flex flex-col gap-2 2xl:gap-6 w-full px-12 sm:px-16 py-8 sm:py-12 2xl:py-22">
          <div className="flex flex-col items-center gap-3 ">
            <h1 className="text-xl 2xl:text-3xl text-green-800 font-sans font-semibold  italic">
              Productivity Mate
            </h1>
            <p className="text-xl 2xl:text-xl font-semibold">Wecome !!</p>
          </div>
          <form onSubmit={handleSubmit} className="">
            <div className="flex flex-col gap-2 ">
              <div className="flex flex-col">
                <label className="text-black/75" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 pl-3 flex items-center">
                    <Mail className=" size-4 2xl:size-5 text-green-800/60" />
                  </div>
                  <input
                    className="border-2 p-2 pl-10 rounded-md border-green-800/60 focus:outline-green-800/80 w-full"
                    type="text"
                    id="email"
                    name="email"
                    value={credentails.email}
                    placeholder="Jhon@cena.com"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-black/75" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 pl-3 flex items-center">
                    <Lock className="size-5 text-green-800/60" />
                  </div>
                  <input
                    className="border-2 p-2 pl-10 rounded-md border-green-800/60 focus:outline-green-800/80 w-full"
                    type="password"
                    id="password"
                    name="password"
                    value={credentails.password}
                    placeholder="type your password here"
                    onChange={onChange}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`border p-2 rounded-md ${
                  loading ? "bg-green-800/60" : "bg-green-800"
                } text-white cursor-pointer`}
              >
                {loading ? (
                  <>
                    <Loader2 className="size-5 animate-spin m-auto" />
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
          <div className="flex justify-center text-md">
            <p>
              Doesn't have an account?{" "}
              <Link to={'/signuppage'} className="text-blue-800 text-md sm:text-lg">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

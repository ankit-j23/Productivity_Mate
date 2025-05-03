import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { CheckAuth } from "./features/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const dispatch = useDispatch()

  useEffect(()=>{
    if(isAuthenticated){
    dispatch(CheckAuth())
    }
  },[dispatch])


  return (
    <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/loginpage" element={<LoginPage />}></Route>
          <Route path="/signuppage" element={<SignupPage />}></Route>
        </Routes>


        <Toaster/>
    </div>
  );
}

export default App;

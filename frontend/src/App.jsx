import Navbar from "./components/Navbar";
import { Routes, Route , Navigate } from "react-router-dom";
import AuthHomePage from "./pages/AuthHomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { CheckAuth } from "./features/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BeforeAuthHome from "./pages/BeforeAuthHome";

function App() {
  // const isAuthenticated = localStorage.getItem('isAuthenticated')
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(CheckAuth())
  },[dispatch])


  return (
    <div>
        <Navbar />

        <Routes>
          <Route path="/" element={ !isAuthenticated ? <BeforeAuthHome/> : <Navigate to={'/authhome'}/>}></Route>
          <Route path="/authhome" element={isAuthenticated ? <AuthHomePage /> : <Navigate to={'/'}/>}></Route>
          <Route path="/loginpage" element={<LoginPage />}></Route>
          <Route path="/signuppage" element={<SignupPage />}></Route>
        </Routes>


        <Toaster/>
    </div>
  );
}

export default App;

import Navbar from "./components/Navbar";
import { Routes , Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage"

function App() {

  return (
    <div>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/loginpage' element={<LoginPage/>}></Route>
        <Route path='/signuppage' element={<SignupPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App

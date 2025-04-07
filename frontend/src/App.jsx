import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PomoStates from "./Contexts/PomodoroContext/PomoStates";

function App() {
  return (
    <div>
      <PomoStates>
        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/loginpage" element={<LoginPage />}></Route>
          <Route path="/signuppage" element={<SignupPage />}></Route>
        </Routes>
      </PomoStates>
    </div>
  );
}

export default App;

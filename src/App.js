import Navbar from './components/Navbar/navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Trading from './components/Trading/trading';
import './App.css';
import Gaming from './components/Gaming/Gaming';
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Singup';
import Wallet from './components/Wallet/Wallet';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Trading />} />
        <Route path="/game" element={<Gaming />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </Router>
  );
}

export default App;

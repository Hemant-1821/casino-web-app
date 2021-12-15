import Navbar from './components/Navbar/navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Trading from './components/Trading/trading';
import './App.css';
import Gaming from './components/Gaming/Gaming';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Trading />} />
        <Route path="/game" element={<Gaming />} />
      </Routes>
    </Router>
  );
}

export default App;

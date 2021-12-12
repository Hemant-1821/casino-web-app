import Navbar from './components/Navbar/navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Trading from './components/Trading/trading';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" component={Trading} />
          <Route path="/game"></Route>
        </Routes>
      </div>
      <Trading/>
    </Router>
  );
}

export default App;

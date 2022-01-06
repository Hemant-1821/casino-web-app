import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Trading from "./components/Trading/trading";
import "./App.css";
import Gaming from "./components/Gaming/Gaming";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Singup";
import Wallet from "./components/Wallet/Wallet";

function App() {
  const [state, setState] = React.useState({ userId: undefined });

  const setLocal = (userId) => {
    localStorage.setItem("userId", userId);
    setState(userId);
  };

  const removeLocal = () => {
    setState(undefined);
    localStorage.clear();
  };

  return (
    <Router>
      <Navbar userId={localStorage.getItem("userId")} logout={removeLocal} />
      <Routes>
        <Route
          path="/"
          element={
            !localStorage.getItem("userId") && !state.userId ? (
              <Navigate to="/Login" />
            ) : (
              <Trading />
            )
          }
        />
        <Route
          path="/game"
          element={
            !localStorage.getItem("userId") ? <Navigate to="/" /> : <Gaming />
          }
        />
        <Route
          path="/login"
          element={
            !localStorage.getItem("userId") && !state.userId ? (
              <Login setState={(userId) => setLocal(userId)} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !localStorage.getItem("userId") && !state.userId ? (
              <Signup setState={(userId) => setLocal(userId)} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/wallet"
          element={
            localStorage.getItem("userId") ? (
              <Wallet />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

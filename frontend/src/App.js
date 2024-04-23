//Harshit Bansal, 4/26/24, IT302-002, Phase 5 Assignment: CUD Node.js Data using React.js, hb33@njit.edu

import './App.css';
import React, { useState, useCallback } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import BreachesList from "./components/breachesList";
import Breach from "./components/breach";
import Login from "./components/login";
import AddAnalysis from "./components/addAnalysis"

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
function App() {
  const [user, setUser] = useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  const loginSetter = useCallback(user => {
    setUser(user);
  }, [setUser]);

  return (
     <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Data Breaches</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to={"/breaches"}>
              Breaches
            </Nav.Link>
            <Nav.Link as={NavLink} to={user ? "" : "/login"}>
              {user ? "Logout User" : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<BreachesList />}></Route>
        <Route path="/breaches" element={<BreachesList />}></Route>

        <Route path="/breaches/:id/" element={<Breach user={user} />}></Route>
        <Route
          path="/breaches/:id/analysis"
          element={<AddAnalysis user={user} />}
        ></Route>

        <Route path="/login" element={<Login user={user} loginSetter={loginSetter} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
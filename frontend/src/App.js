import './App.css';
import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//import AddAnalysis from "./components/addAnalysis";
import BreachesList from "./components/breachesList";
import Breach from "./components/breach";
import Login from "./components/login";

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
        <Route path="/login" element={<Login login={login} />}></Route>
      </Routes>
    </div>
  );
}

export default App;

/*
 <Route
          path="/hb33_breaches/:id/analysis"
          element={<AddAnalysis user={user} />}
        ></Route>

        <Route path="/login" element={<Login login={login} />}></Route>

*/
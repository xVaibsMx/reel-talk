import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import NavBar from "./components/NavBar";
import Movies from "./routes/Movies";
import Reviews from "./routes/Reviews";
function App() {
  return (
    <div className=" bg-gray-900 min-h-screen text-orange-500">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Post from "../src/components/Post";
import Profile from "../src/components/Profile";
import Search from "../src/components/Search";
import Premium from "../src/components/Premium";
import { Toaster } from "react-hot-toast";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Post />} />
          <Route path="profile" element={<Profile />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/premium" element={<Premium />} />
      </Routes>
    </Router>
  );
}

export default App;

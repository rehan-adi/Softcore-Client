import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import SignIn from "../src/pages/Signin";
import SignUp from "../src/pages/Signup";
import Post from "../src/components/Post";
import Profile from "../src/components/Profile";
import Premium from "../src/components/Premium";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Post />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="/premium" element={<Premium />} /> */}
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/premium" element={<Premium />} />
      </Routes>
    </Router>
  );
}

export default App;

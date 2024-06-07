import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import SignIn from '../src/pages/Signin';
import SignUp from '../src/pages/Signup';
import Post from '../src/components/Post'
import Profile from '../src/components/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Post />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

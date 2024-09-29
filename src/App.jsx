import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "../src/pages/Home";
import { Toaster } from "react-hot-toast";
import Premium from "../src/pages/Premium";
import Post from "../src/components/Post";
import Profile from "../src/components/Profile";
import Search from "../src/components/Search";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

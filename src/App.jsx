import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Post from "../src/pages/Post";
import Layout from "./layout/Layout";
import Settings from "./pages/Settings";
import Comments from "./pages/Comments";
import Search from "../src/pages/Search";
import { Toaster } from "react-hot-toast";
import Premium from "../src/pages/Premium";
import Profile from "../src/pages/Profile";
import { useProfile } from "./hooks/useProfile";
import GoogleCallback from "./utils/GoogleCallback";
import UsersProfile from "./components/UsersProfile";
import ImagePreview from "./components/ImagePreview";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  useProfile();

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Post />} />
          <Route path="profile" element={<Profile />} />
          <Route path="search" element={<Search />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile/:id" element={<UsersProfile />} />
          <Route path="comments/:postId" element={<Comments />} />
          <Route path="post/image/:postId" element={<ImagePreview />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/google/callback" element={<GoogleCallback />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/premium" element={<Premium />} />
      </Routes>
    </Router>
  );
}

export default App;

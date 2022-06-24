// lib
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// src
import GistPage from "./pages/GistPage/GistPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import StarredGists from "./pages/StarredGists/StarredGists";
import YourGists from "./pages/YourGists/YourGists";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gist/:id" element={<GistPage />} />
        <Route path="/your-gists" element={<YourGists />} />
        <Route path="/starred-gists" element={<StarredGists />} />
        <Route path="/create-gist" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;

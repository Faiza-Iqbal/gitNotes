// lib
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouteRequiresLogin from "./components/common/RouteRequiresLogin/RouteRequiresLogin";
import userContext from "./context/userContext";

// src
import GistPage from "./pages/GistPage/GistPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import CreateGist from "./pages/CreateGist/CreateGist";
import StarredGists from "./pages/StarredGists/StarredGists";
import YourGists from "./pages/YourGists/YourGists";

// utils
import { authService } from "./utils/GenericFunctions/authService";

function App() {
  const auth = authService();

  return (
    <userContext.Provider value={auth}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/" element={<RouteRequiresLogin />}>
            <Route path="/your-gists" element={<YourGists />} />
            <Route path="/starred-gists" element={<StarredGists />} />
            <Route path="/create-gist" element={<CreateGist />} />
            <Route path="/gist/:id" element={<GistPage />} />
          </Route>
        </Routes>
      </Router>
    </userContext.Provider>
  );
}

export default App;

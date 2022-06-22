
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import GistPage from './pages/GistPage/GistPage';
import LandingPage from './pages/LandingPage/LandingPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import StarredGists from './pages/StarredGists/StarredGists';
import YourGists from './pages/YourGists/YourGists';
function App() {
    return (
            <Router>
                <Routes>
                    <Route path='/' element={<LandingPage />}></Route>
                    <Route path='/gist/:id' element={<GistPage />}> </Route>
                    <Route path='/your-gists' element={<YourGists />}> </Route>
                    <Route path='/starred-gists' element={<StarredGists />}> </Route>
                    <Route path='/create-gist' element={<ProfilePage />}> </Route>
                </Routes>
            </Router>
       
    )
}

export default App;

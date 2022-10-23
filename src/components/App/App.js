import './App.css';
import { Route } from 'react-router-dom';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
  return (
    <div className="App">

      <Route exact path="/">
        <Main/>
      </Route>

      <Route exact path="/movies">
        <Movies/>
      </Route>

      <Route exact path="/saved-movies">
        <SavedMovies/>
      </Route>

      <Route exact path="/profile">
        <Profile/>
      </Route>

      <Route path="/signup">
        <Register/>
      </Route>
        
      <Route path="/signin">
        <Login/>
      </Route>

    </div>
  );
}

export default App;

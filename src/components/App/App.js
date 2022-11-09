import './App.css';
import { Route, Routes } from 'react-router-dom';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';



function App() {

  

  return (
    <div className="App">
      <Routes>
        
        <Route exact path="/" element={<Main />} />
       
        <Route exact path="/movies" 
          element={<Movies />} 
        />

        <Route exact path="/saved-movies" element={<SavedMovies />}/>

        <Route exact path="/profile" element={<Profile />}/>

        <Route path="/signup" element={<Register />}/>
        
        <Route path="/signin" element={<Login />}/>

        <Route path="*" element={<NotFoundPage />}/>

      </Routes>
    </div>
  );
}

export default App;

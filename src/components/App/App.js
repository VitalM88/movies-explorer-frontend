import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import mainApi from "../../utils/MainApi";
import auth from "../../utils/auth";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';



function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    handleCheckToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserInfo(token)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn]);

  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setUserEmail(res.email);
          setUserName(res.name);
          setIsLoggedIn(true);
          navigate("/movies");
          setToken(jwt);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  function handleRegister(data) {
    auth.register(data)
      .then((res) => {
        setUserEmail(res.email);
        setUserName(res.name);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleLogin(data) {
    auth.login({email: data.email, password: data.password})
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        handleCheckToken();
        setToken(res.token);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("checkboxState");
    localStorage.removeItem("foundMovies");
    localStorage.removeItem("counter");
    localStorage.removeItem("movies");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("foundSavedMovies");
    localStorage.removeItem("searchInputValue");
    setUserEmail("");
    setUserName("");
    setToken('');
    navigate("/");
  }

  function handleUpdateUser(userData) {
    mainApi.editUserInfo({name: userData.name, email: userData.email}, token)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setUserEmail(newUserData.email);
        setUserName(newUserData.name);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          
          <Route exact path="/" element={<Main />} />
         
          <Route exact path="/movies" 
            element={<Movies 
              token={token}
            />} 
          />
  
          <Route exact path="/saved-movies" 
            element={<SavedMovies 
              token={token}
            />}/>
  
          <Route exact path="/profile" 
            element={<Profile 
              signOut={handleSignOut}
              updateUser={handleUpdateUser}
              userEmail={userEmail}
              userName={userName}
            />}
          />
  
          <Route path="/signup" 
            element={<Register 
              onSubmit={handleRegister}
            />}
          />
          
          <Route path="/signin" 
            element={<Login 
              onSubmit={handleLogin}
            />}
          />
  
          <Route path="*" element={<NotFoundPage />}/>
  
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

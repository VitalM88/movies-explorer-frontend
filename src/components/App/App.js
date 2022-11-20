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
import EditProfileSuccesPopup from '../EditProfileSuccesPopup/EditProfileSuccesPopup'

import mainApi from "../../utils/MainApi";
import auth from "../../utils/auth";
import ProtectedRoute from "../../utils/ProtectedRoute";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';



function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [textPopup, setTextPopup] = useState("");

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
          setToken(jwt);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      handleSignOut();
    }
  }

  function handleRegister(data) {
    auth.register(data)
      .then((res) => {
        setUserEmail(res.email);
        setUserName(res.name);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsOpenPopup(true);
        setTextPopup(`${err}`);
      });
  }

  function handleLogin(data) {
    auth.login({email: data.email, password: data.password})
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        handleCheckToken();
        setToken(res.token);
        navigate("/movies");
        mainApi.getMovies(res.token)
          .then((data) => {
            localStorage.setItem("savedMovies", JSON.stringify(data));
          }).catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsOpenPopup(true);
        setTextPopup(`${err}`);
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
        setIsOpenPopup(true);
        setTextPopup("Данные изменены");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function closePopup() {
    setIsOpenPopup(false);
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          
          <Route exact path="/" 
            element={<Main 
              isLoggedIn={isLoggedIn}
            />} 
          />
         
          <Route exact path="/movies" element={<ProtectedRoute
            component={Movies}
            token={token}
            isLoggedIn={isLoggedIn}
          />} 
          />
  
          <Route exact path="/saved-movies" element={<ProtectedRoute
            component={SavedMovies}
            token={token}
            isLoggedIn={isLoggedIn}
          />}
          />
  
          <Route exact path="/profile" element={<ProtectedRoute
            component={Profile} 
            signOut={handleSignOut}
            updateUser={handleUpdateUser}
            userEmail={userEmail}
            userName={userName}
            isLoggedIn={isLoggedIn}
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

        <EditProfileSuccesPopup
          isOpen={isOpenPopup}
          onClose={closePopup}
          textPopup={textPopup}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

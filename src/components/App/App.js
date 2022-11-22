import './App.css';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Popup from '../Popup/Popup';

import mainApi from "../../utils/MainApi";
import auth from "../../utils/auth";
import ProtectedRoute from "../../utils/ProtectedRoute";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';



function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") || false);
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [textPopup, setTextPopup] = useState("");

  const navigate = useNavigate();
  
  useEffect(() => {
    handleCheckToken();
    
  }, []);


  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt)
        .then(() => {
          setToken(jwt);
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", true);
          mainApi.getUserInfo(jwt)
            .then((userData) => {
              setCurrentUser(userData);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
              setIsOpenPopup(true);
              setTextPopup(`${err}`);
            });
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          setIsOpenPopup(true);
          setTextPopup(`${err}`);
          handleSignOut();
        });
    } else {
      handleSignOut();
    }
  }

  function handleRegister(data) {
    auth.register(data)
      .then(() => {
        handleLogin(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsOpenPopup(true);
        setTextPopup(`${err}`);
      });
  }

  async function handleLogin(data) {
    await auth.login({email: data.email, password: data.password})
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        navigate("/movies");

        mainApi.getMovies(res.token)
          .then((data) => {
            localStorage.setItem("savedMovies", JSON.stringify(data));
          }).catch((err) => {
            console.log(`Ошибка: ${err}`);
            
          });

        mainApi.getUserInfo(res.token)
          .then((userData) => {
            setCurrentUser(userData);
          })
          .catch((err) => {
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
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("jwt");
    localStorage.removeItem("checkboxState");
    localStorage.removeItem("foundMovies");
    localStorage.removeItem("counter");
    localStorage.removeItem("counterOnSaved");
    localStorage.removeItem("movies");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("foundSavedMovies");
    localStorage.removeItem("searchInputValue");
    setCurrentUser({});
    setToken('');
    navigate("/");
  }

  function handleUpdateUser() {
    mainApi.getUserInfo(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsOpenPopup(true);
        setTextPopup("Данные изменены");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsOpenPopup(true);
        setTextPopup(`${err}`);
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
            isLoggedIn={isLoggedIn}
            token={token}
          />}
          />
  
          <Route path="/signup" 
            element={
              !isLoggedIn ? 
                <Register 
                  onSubmit={handleRegister}
                /> : 
                <Navigate to='/movies' />
            }
          />
          
          <Route path="/signin" 
            element={
              !isLoggedIn ? 
                <Login 
                  onSubmit={handleLogin}
                /> : 
                <Navigate to='/movies' />
            }
          />
  
          <Route path="*" element={<NotFoundPage />}/>
  
        </Routes>

        <Popup
          isOpen={isOpenPopup}
          onClose={closePopup}
          textPopup={textPopup}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

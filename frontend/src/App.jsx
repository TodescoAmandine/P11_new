import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { loginSuccess } from '../src/redux/actions/actions.authen';
// import { setUserProfile } from './redux/actions/actions.user';
import { setUserProfile } from './redux/reducers/reducer.user';

const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
    const userName = userData.userName;
    if (token) {
      dispatch(loginSuccess(token));
      // dispatch(setUserProfile(userData.userName));
      // dispatch(setUserProfile(userData.userName));
      dispatch(setUserProfile(userData));

    }
  }, [dispatch, userData.userName]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


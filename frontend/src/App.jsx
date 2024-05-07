import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { loginSuccess } from '../src/redux/actions/actions.authen';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
    if (token) {
      dispatch(loginSuccess(token));
    }
  }, [dispatch]);

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
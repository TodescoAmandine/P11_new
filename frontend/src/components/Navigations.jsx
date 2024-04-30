import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './store/authenticationSlice';


const Navigation = () => {
  const dispatch = useDispatch(); //  useDispatch pour obtenir la fonction dispatch

  const handleLogout = () => {
    // Supprime le token du localStorage et du sessionStorage
    window.localStorage.removeItem('userToken');
    window.sessionStorage.removeItem('userToken');
    // Dispatche l'action logout
    dispatch(logout());
  };
  
// Vérifie si l'utilisateur est connecté avec le token stocké dans le localStorage ou le sessionStorage
const isLoggedIn = window.localStorage.getItem('userToken') || window.sessionStorage.getItem('userToken');

    return (
        <nav className='main-nav'>
        <NavLink to='/' className='main-nav-logo'>
          <img src={logo} alt='Argent Bank Logo' className='main-nav-logo-image' />
          <h1 className='sr-only'>Argent Bank</h1>
        </NavLink>
        <div onClick={handleLogout} >
        <NavLink to={isLoggedIn ? '/' : '/login'}> 
            <i className='fa fa-user-circle'>
              </i>{isLoggedIn ? 'Sign Out' : 'Sign In'} 
          </NavLink>
        </div>
      </nav>
    );
};

export default MainNav;
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/argentBankLogo-min.webp';

const Navigation = () => {
    return (
        <nav className='main-nav'>
        <NavLink to='/' className='main-nav-logo'>
          <img src={logo} alt='Argent Bank Logo' className='main-nav-logo-image' />
          <h1 className='sr-only'>Argent Bank</h1>
        </NavLink>


        <div>
          <NavLink to='/login' className='main-nav-item'>
            <i className='fa fa-user-circle'></i>Sign In
          </NavLink>
        </div>
      </nav>
    );
};

export default Navigation;
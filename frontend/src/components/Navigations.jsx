import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../assets/images/argentBankLogo-min.webp';
import  {logout } from '../redux/actions/actions.authen';


function Navigation (){
  // Récupération du token pour savoir si l'utilisateur est connecté
  const isConnected = useSelector((state) => state.auth.token);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupération du nom d'utilisateur
  const userData = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <nav className='main-nav'>
      <NavLink to='/' className='main-nav-logo'>
        <img src={logo} alt='Argent Bank Logo' className='main-nav-logo-image' />
        <h1 className='sr-only'>Argent Bank</h1>
      </NavLink>
      {isConnected ? (
        <div className="link-container">
          <Link to='/profile'>
            <i className='fa fa-circle-user' />
            {userData.userName}
          </Link>
          <Link to='/' onClick={handleLogout}>   
          <i className='fa-solid fa-right-from-bracket' />
             Sign out 
          </Link>
        </div>
      ) : (
        <div>
          <NavLink to='/login' className='main-nav-item'>
            <i className='fa fa-user-circle'></i>Sign In
          </NavLink>
        </div>
      )}
    </nav>
  );
}
  
export default Navigation;
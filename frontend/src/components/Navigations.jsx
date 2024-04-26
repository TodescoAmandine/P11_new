import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/argentBankLogo-min.webp';
import { useNavigate } from 'react-router-dom';


const MainNav = () => {
  const navigate = useNavigate();

  const logout = () => {
    
    
    // Supprime le token du localStorage
    window.localStorage.removeItem('userToken');
    // Supprime le token du sessionStorage
    window.sessionStorage.removeItem('userToken');
    // Redirige l'utilisateur vers la page de connexion
    navigate('/login');
  };
  
// Vérifie si l'utilisateur est connecté
const isLoggedIn = window.localStorage.getItem('userToken') || window.sessionStorage.getItem('userToken');

    return (
        <nav className='main-nav'>
        <NavLink to='/' className='main-nav-logo'>
          <img src={logo} alt='Argent Bank Logo' className='main-nav-logo-image' />
          <h1 className='sr-only'>Argent Bank</h1>
        </NavLink>


        <div>
        <NavLink to={isLoggedIn ? '/' : '/login'}> {/* Change la route en fonction de l'état de connexion de l'utilisateur */}
            <i className='fa fa-user-circle'></i>{isLoggedIn ? 'Sign Out' : 'Sign In'} {/* Change le texte en fonction de l'état de connexion de l'utilisateur */}
          </NavLink>
        </div>
      </nav>
    );
};

export default MainNav;
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../assets/images/argentBankLogo-min.webp';
import  {logout } from '../redux/actions/actions.authen';


function Navigation (){
  const isConnected = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const username = useSelector(state => state.userData ? state.userData.username : '');
  // console.log("state.userData:", useSelector(state => state.userData));
  // console.log("Username from Redux state:", username);
// const username = useSelector(state => {
//   console.log("Redux state:", state);
//   return state.userData ? state.userData.username : '';
// });
const username = useSelector(state => state.user.userData.username);

  //const firstname = useSelector(state => state.user.firstname); 


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
        <div>
          <Link to='/profile'>
            <i className='fa-solid fa-2x fa-circle-user' />
            <p>{username}</p>
          </Link>
          <Link to='/' onClick={handleLogout}>   
          <i className='fa-solid fa-arrow-right-from-bracket' />
            <p> Sign out </p>
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
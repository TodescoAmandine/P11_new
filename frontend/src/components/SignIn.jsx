import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/UserSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignIn = () => {

  //states
  const[email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 //redux state
 const {loading, error} = useSelector((state)=>state.user);

const dispatch = useDispatch();
const navigate = useNavigate();
  const handleLoginEvent = (e) => {
    e.preventDefault();
    let userCredential={
      email, password
    }
    dispatch(loginUser(userCredential)).then((result)=>{
      if(result.payload){
        setEmail('');
        setPassword('');
        navigate('/userpage');
      }
    })
  }
  
  return (
      <main className="main bg-dark">
            <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLoginEvent}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password"value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" /><label htmlFor="remember-me">Remember me</label>
          </div>
          <NavLink to="/userpage" class="sign-in-button">Sign In</NavLink>
          <button className="sign-in-button">{
            loading?'Loading...':'Login'
          }</button> 
          {error &&(
            <div className="error-message" role='alert'>
              {error}
            </div>
          
          )}
        </form>
      </section>     
      </main>       
    );
};

export default SignIn;
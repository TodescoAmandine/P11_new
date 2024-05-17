import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions/actions.authen';
import { loginFailed } from '../redux/actions/actions.authen';

const SignIn = () => {
  // Déclaration des états
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Etat pour la case "Remember me"
  const [rememberMe, setRememberMe] = useState(false); 


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (email === '' || password === '') {
      setErrorMessage('Les champs Email et mot de passe ne doivent pas être vides');
      return;
    }
    console.log(`Email: ${email}, Password: ${password}`);
  
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password}),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.body.token;
        dispatch(loginSuccess(token)); // Dispatch de l'action loginSuccess pour mettre à jour le store Redux
        window.sessionStorage.setItem("token", token)
        if (rememberMe) { // Si la case "Remember me" est cochée, utilise localStorage
          window.localStorage.setItem("token", token)
        }
        if (token){ // Si le token est valide, redirige vers la page de profil
          navigate('/profile');
        } else {
          const error = "Utilisateur inconnu"
          dispatch(loginFailed(error));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </form>
      </section>     
    </main>    
  );
};

export default SignIn;
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Nouvel état pour la case à cocher "Remember me"
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    const data = {
      email,
      password
    }

    console.log(data); 

    if (data.email !== '' && data.password !== '') {
      fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      .then((response) => response.json()) // Convertit la réponse en JSON
      .then((data) => {
        console.log(data);
        if (data.body.token) {
          const valeurUserToken = JSON.stringify(data.body.token)
          if (rememberMe) { // Si la case "Remember me" est cochée, utilise localStorage
            window.localStorage.setItem("userToken", valeurUserToken)
          } else { // Sinon, utilise sessionStorage
            window.sessionStorage.setItem("userToken", valeurUserToken)
          }
          navigate('/userpage');
        } else {
          setErrorMessage("Utilisateur inconnu");
        }
      })
    } else if (data.email === '' && data.password !== '') {
      setErrorMessage("Merci de renseigner un email");
    } else if (data.email !== '' && data.password === '') {
      setErrorMessage("Merci de renseigner un mot de passe");
    } else {
      setErrorMessage("Merci de compléter les champs");
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /><label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit" onClick={login}>Sign In</button>
          <p className='error-message' id="error">{errorMessage}</p>
        </form>
      </section>     
    </main>    
  );
};

export default SignIn;
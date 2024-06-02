import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editUserName,setUserProfile } from '../redux/reducers/reducer.user';

// fonction HeaderUser qui permet d'afficher les informations de l'utilisateur et de modifier son nom d'utilisateur
function HeaderUser () {
  // Récupération du token et des données de l'utilisateur
  const token = useSelector((state) => state.auth.token);
  // Récupération des données de l'utilisateur
  const userData = useSelector((state) => state.user.userData);
// Initialisation de l'état display à true
  const [display, setDisplay] = useState(true);
// Initialisation de l'état userName à vide
  const [userName, setUserName] = useState('');

  const dispatch = useDispatch();

  // Fonction pour envoyer la requête de modification du nom d'utilisateur
  const handleSubmitUsername = async (event) => {
    event.preventDefault();

    if (!userName) {
      console.log("Username is required");
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({userName}),
      });
    
      if (!response.ok) {
        console.log("Invalid Fields");
        return;
      }    
      const data = await response.json();
      console.log(data);
      console.log("userName:", userName);
// Dispatch de l'action updateUsername pour mettre à jour le nom d'utilisateur dans le store Redux et de l'action setUserProfile pour mettre à jour les données de l'utilisateur 
      dispatch(editUserName(userName));
      dispatch(setUserProfile({
        ...userData,
        userName: userName,
      }));

      setDisplay(!display);// Mettre display à false pour afficher les informations de l'utilisateur

    } catch (error) {
      console.error(error);
    }
  }
  return (
      <div className="header">
          { display ? 
              <div>
                  <h1>Welcome back 
                      <br />
                      {userData.firstName} {userData.lastName} !
                  </h1>
                  <button className="edit-button" onClick={() => setDisplay(!display)}>Edit Name</button>
              </div>
              :
              <div>
                  <h2>Edit user info</h2>
                  <form>
                      <div className="edit-input">
                          <label htmlFor="username">User name:</label>
                          <input
                              type="text"
                              id="username"
                              defaultValue={userName}
                              // defaultValue={userData.userName}
                              onChange={(event) => setUserName(event.target.value)}
                          />
                      </div>
                      <div className="edit-input">
                          <label htmlFor="firstname">First name:</label>
                          <input
                              type="text"
                              id="firstname" 
                              defaultValue={userData.firstName}
                              disabled={true}
                          />
                      </div>
                      <div className="edit-input">
                          <label htmlFor="lastname">Last name:</label>
                          <input
                              type="text"
                              id="lastname" 
                              defaultValue={userData.lastName}
                              disabled={true}
                          />
                      </div>
                      <div className="buttons">
                          <button className="edit-username-button" onClick={handleSubmitUsername}>Save</button>
                          <button className="edit-username-button" onClick={() => setDisplay(!display)}>Cancel</button>
                      </div>
                  </form>
              </div>
          }
      </div>
  )
}

export default HeaderUser;
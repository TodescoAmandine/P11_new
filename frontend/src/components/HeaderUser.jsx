import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { updateUsername } from '../redux/actions/actions.user';
import { useState } from 'react';
import { editUserName } from '../redux/reducers/reducer.user';

function HeaderUser () {
  // Récupération du token et des données de l'utilisateur
  const token = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.user.userData);

  const [display, setDisplay] = useState(true);

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
// Dispatch de l'action updateUsername pour mettre à jour le nom d'utilisateur dans le store Redux    
      // dispatch(editUserName(userName));
      dispatch(editUserName(userName));

      // dispatch(setUserProfile(userData));

      setDisplay(!display);

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
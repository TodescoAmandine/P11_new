import React from 'react';
import { useState } from 'react';

function getUser(){
  let user = localStorage.getItem ('user');
  if (user){
      user = JSON.parse(user);
  }
  else{
      user = null;
  }
  return user;
}

const HeaderUser = () => {

  const [user, setUser]= useState(getUser());


    return (
<div> 
      {user?(<div>
        <div className="header">
        <h1>Welcome back <br />{user.firstName}</h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>         
        </div>)
        :null}
        </div>
    );
};

export default HeaderUser;
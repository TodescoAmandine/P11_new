
import React from 'react';
import Navigation from '../components/Navigations';
import Footer from '../components/Footer';
import Account from '../components/Account';
import HeaderUser from '../components/HeaderUser';
import accountData from '../data/accountdata.json';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../redux/actions/actions.user';
import { useNavigate } from 'react-router-dom';

function User () {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    useEffect(() => {
        if (token) {
            const userData = async () => {
                try {
                    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
// Création d'un objet userData pour stocker les données de l'utilisateur
                        const userData = {
                            createdAt: data.body.createdAt,
                            updatedAt: data.body.updatedAt,
                            id: data.body.id,
                            email: data.body.email,
                            firstname: data.body.firstName,
                            lastname: data.body.lastName,
                            username: data.body.userName
                        }
// Dispatch de l'action userProfile pour stocker les données de l'utilisateur dans le store Redux
                        dispatch(userProfile(userData));
                      //  dispatch(userProfile(data.body));

                    } else {
                        console.log("error while retrieving profile");
                    }
                } catch (error) {
                    console.error(error);
                };
            };
            userData();
        }
    }, [dispatch, token]);
// Redirection à la page de connexion si l'utilisateur n'est pas connecté
    // useEffect(() => {
    //     if (!token) {
    //       navigate('/login');
    //     }
    //   }, [token, navigate]);

    return (
        <div className='page_account'>
          <Navigation />
          {token && (
            <main className='main bg-dark'>
              <HeaderUser />    
              {accountData.map((account) => (
                <Account 
                  key={account.id}
                  title={account.title}
                  type={account.type}
                  accountnumber={account.accountnumber}
                  amount={account.amount}
                  description={account.description}
                />
              ))}
            </main>
          )}
          <Footer />
        </div>
      );
    }

export default User;
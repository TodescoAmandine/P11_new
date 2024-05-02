import React from 'react';
import Navigation from '../components/Navigations';
import Footer from '../components/Footer';
import Account from '../components/Account';
import HeaderUser from '../components/HeaderUser';
import accountData from '../data/accountdata.json';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../redux/actions/actions.user';
import { useNavigate } from 'react-router-dom'; // Change this line

function User () {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Change this line

    /* Asynchronous function that retrieves user data and updates it with useEffect */
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
                        /* 
                            Checking that the query response is indeed retrieved
                            console.log(data) 
                        */
                        const userData = {
                            createdAt: data.body.createdAt,
                            updatedAt: data.body.updatedAt,
                            id: data.body.id,
                            email: data.body.email,
                            firstname: data.body.firstName,
                            lastname: data.body.lastName,
                            username: data.body.userName
                        }
                        /* Return user data in redux state */
                        dispatch(userProfile(userData));
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

    useEffect(() => {
        if (!token) {
          navigate('/login');
        }
      }, [token, navigate]);

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
import React from 'react';
import Navigation from '../components/Navigations';
import Footer from '../components/Footer';
import Account from '../components/Account';
import HeaderUser from '../components/HeaderUser';
import accountData from '../data/accountdata.json';


const User = () => {
    return (
        <div className='page_account'>
            <Navigation />
            <main className='main bg-dark'>
            <HeaderUser />    
            {accountData.map((account) => (
                <Account 
                    key={account.id}
                    type={account.type}
                    number={account.number}
                    amount={account.amount}
                    description={account.description}
                />
            ))}
            </main>
            <Footer />
        </div>
    );
};

export default User;
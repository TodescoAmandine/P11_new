import React from 'react';
import Navigation from '../components/Navigations';
import Footer from '../components/Footer';
import Account from '../components/Account';
import HeaderUser from '../components/HeaderUser';

const User = () => {
    return (
        <div className='page_account'>
            <Navigation />
            <main className='main bg-dark'>
            <HeaderUser />    
            <Account 
            type="Checking"
            number="(x8349)"
            amount="$2,082.79"
            description="Available Balance"
            />
            <Account 
            type="Savings"
            number="(x6712)"
            amount="$10,928.42"
            description="Available Balance"
            />
            <Account 
            type="Credit Card"
            number="(x8349)"
            amount="$184.30"
            description="Current Balance"
            />
            </main>
            <Footer />
        </div>
    );
};

export default User;
import React from 'react';
import Navigation from '../components/Navigations';
import SignIn from '../components/SignIn';
import Footer from '../components/Footer';

const Login = () => {
    return (
        <div className='page_login'>
            <Navigation />
            <SignIn /> 
            <Footer />     
        </div>
    );
};

export default Login;
import React, { useState } from 'react';
import Navbar from './component/Navbar';

const Login = () => {
    const [loginSlide, setLoginSlide] = useState(false)
    const onactionSlide = () => {
        setLoginSlide(!loginSlide)
    }


    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center min-h-[80vh] w-[100vw]'>
                <div className='container'>
                    <div className={`form login-form ${loginSlide ? 'active' : ''}`}>
                        <div className={`wrapper`}>
                            <form action="#">
                                <h1>Log In</h1>
                                <p>Use Your Email And Password To Sign in</p>
                                <input type="email" placeholder='Email' />
                                <input type="password" placeholder='Password' />
                                <button type='submit'>Log In</button>
                            </form>
                        </div>
                    </div>

                    <div className={`form signup-form ${loginSlide ? '' : 'active'}`}>
                        <div className='wrapper'>
                            <form action="#">
                                <h1>Sign Up</h1>
                                <input type="email" placeholder='Email' />
                                <input type="password" placeholder='Password' />
                                <input type="password" placeholder='ConfirmPassword' />
                                <button type='submit'>Reigster</button>
                            </form>
                        </div>
                    </div>

                    <div className={`overlay-container ${loginSlide ? 'onaction-left' : 'onaction-right'}`}>
                        <div className={`overlay ${loginSlide ? 'onactionoverlay-left' : 'onactionoverlay-right'}`}>

                            <div className='overlay-left'>
                                <h1>Create Account</h1>
                                <p>or</p>
                                <button onClick={onactionSlide}>Log In</button>
                            </div>

                            <div className='overlay-right'>
                                <h1>Please , Log In</h1>
                                <p>or</p>
                                <button onClick={onactionSlide}>Create Account</button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>


        </div >
    );
};

export default Login;

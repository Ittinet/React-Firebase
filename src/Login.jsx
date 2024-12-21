import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { authdb, db } from './config/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import usefbStore from './store/store';



const Login = (props) => {
    const signup = usefbStore((state) => state.signup)
    const signin = usefbStore((state) => state.signin)

    const [loginSlide, setLoginSlide] = useState(false)

    const [registerform, setRegisterForm] = useState({
        email: '',
        password: '',
        confirmpassword: ''
    })

    const [loginform, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const [user, setUser] = useState(null)

    useEffect(() => {
        if (props.isPopupOpen) {
            document.documentElement.style.overflowY = 'hidden'
        } else {
            document.documentElement.style.overflowY = 'auto'
        }
    }, [props.isClosePopup]);

    const onactionSlide = () => {
        setLoginSlide(!loginSlide)
    }

    const handleChangeRegister = (e) => {
        setRegisterForm({
            ...registerform,
            [e.target.name]: e.target.value
        })

    }
    const handleInnerClick = (e) => {
        e.stopPropagation(); // ป้องกันไม่ให้คลิกส่งไปยัง outer div
    };

    const handleChangeLogin = (e) => {
        setLoginForm({
            ...loginform,
            [e.target.name]: e.target.value
        })
    }

    const submitRegister = async (e) => {
        try {
            e.preventDefault()
            if (registerform.password !== registerform.confirmpassword) {
                return console.log('กรุณากรอกรหัสผ่านให้ตรงกัน')
            }
            const user = await signup(registerform.email, registerform.confirmpassword)
            setRegisterForm({
                email: '',
                password: '',
                confirmpassword: ''
            })
            props.isClosePopup();
            console.log(user)
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                return console.log('กรุณากรอกรูปแบบอีเมลให้ถูกต้อง')
            }
            if (error.code === 'auth/email-already-in-use') {
                return console.log('มีอีเมลนี้อยู่ในระบบเเล้ว')
            }
            if (error.code === 'auth/missing-password') {
                return console.log('กรุณากรอกพาสเวิร์ด')
            }
            console.log(error.message)
        }
    }

    const submitLogin = async (e) => {
        try {
            e.preventDefault()
            const user = await signin(loginform.email, loginform.password)
            setLoginForm({
                ...loginform,   // คงค่า email
                password: ''    // รีเซ็ต password
            });
            props.isClosePopup();
            console.log(user)
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                return console.log('อีเมลหรือพาสเวิร์ดไม่ถูกต้อง')
            }
            if (error.code === 'auth/invalid-email') {
                return console.log('กรุณากรอกรูปแบบอีเมลให้ถูกต้อง')
            }
            console.log(error.message)
        }
    }

    const handleOuterClick = () => {
        props.isClosePopup(); // ปิด popup
    };

    // const handleInnerClick = (e) => {
    //     e.stopPropagation(); // ป้องกันไม่ให้คลิกส่งไปยัง outer div
    // };

    return (
        <div className={`w-full fixed z-50 h-full flex justify-center mt-24 ${!props.isPopupOpen && 'pointer-events-none'}`}>
            <div onClick={handleOuterClick} className={`fixed bg-gray-700 w-full h-full top-0 z-50 transition-all duration-500  ${props.isPopupOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}>
            </div>

            <div className={`flex items-center justify-center min-h-[600px] max-w-[900px] w-full z-[60] absolute transition-opacity duration-700 ${props.isPopupOpen ? '' : 'opacity-0 pointer-events-none'}`}>

                <div className='container'>
                    <div className={`form login-form ${loginSlide ? 'active' : ''}`}>
                        <div className={`wrapper`}>
                            <form onSubmit={submitLogin} action="#">
                                <h1>Log In</h1>
                                <p>Use Your Email And Password To Sign in</p>
                                <input onChange={handleChangeLogin} value={loginform.email} name='email' type="text" placeholder='Email' />
                                <input onChange={handleChangeLogin} value={loginform.password} name='password' type="password" placeholder='Password' />
                                <button type='submit'>Log In</button>
                            </form>
                        </div>
                    </div>

                    <div className={`form signup-form ${loginSlide ? '' : 'active'}`}>
                        <div className='wrapper'>
                            <form action="#" onSubmit={submitRegister}>
                                <h1>Sign Up</h1>
                                <input onChange={handleChangeRegister} name='email' type="text" value={registerform.email} placeholder='Email' />
                                <input onChange={handleChangeRegister} name='password' type="password" value={registerform.password} placeholder='Password' />
                                <input onChange={handleChangeRegister} name='confirmpassword' type="password" value={registerform.confirmpassword} placeholder='ConfirmPassword' />
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

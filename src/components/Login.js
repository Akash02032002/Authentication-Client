import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './mix.css';

const Login = () => {
    const [passShow, setPassShow] = useState(false);
    const [inpval, setInpval] = useState({ email: '', password: '' });
    const history = useHistory();

    const setVal = (e) => {
        const { name, value } = e.target;
        setInpval((prevInput) => ({ ...prevInput, [name]: value }));
    };

    const loginuser = async (e) => {
        e.preventDefault();
        const { email, password } = inpval;

        try {
            if (email === '') {
                throw new Error('Email is required!');
            } else if (!email.includes('@')) {
                throw new Error('Please enter a valid email address!');
            } else if (password === '') {
                throw new Error('Password is required!');
            } else if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long!');
            }

            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid Credentials');
            }

            const data = await response.json();
            localStorage.setItem('usersdatatoken', data.result.token);
            history.push('/dash');
            setInpval({ email: '', password: '' });
        } catch (error) {
            console.error('Error logging in:', error.message);
            toast.error(error.message, { position: 'top-center' });
        }
    };

    return (
        <section>
            <div className="form_data">
                <div className="form_heading">
                    <h1>Welcome Back, Log In</h1>
                    <p>Hi, welcome back! Please log in to continue.</p>
                </div>
                <form>
                    <div className="form_input">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            value={inpval.email}
                            onChange={setVal}
                            name="email"
                            id="email"
                            placeholder="Enter Your Email Address"
                        />
                    </div>
                    <div className="form_input">
                        <label htmlFor="password">Password</label>
                        <div className="two">
                            <input
                                type={passShow ? 'text' : 'password'}
                                onChange={setVal}
                                value={inpval.password}
                                name="password"
                                id="password"
                                placeholder="Enter Your password"
                            />
                            <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                {passShow ? 'Hide' : 'Show'}
                            </div>
                        </div>
                    </div>
                    <button className="btn" onClick={loginuser}>
                        Login
                    </button>
                    <p>
                        Don't have an account? <NavLink to="/register">Sign Up</NavLink>{' '}
                    </p>
                    <p style={{ color: 'black', fontWeight: 'bold' }}>
                        Forgot Password? <NavLink to="/password-reset">Click Here</NavLink>
                    </p>
                </form>
                <ToastContainer />
            </div>
        </section>
    );
};

export default Login;

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (email === '') {
                toast.error('Email is required!', { position: 'top-center' });
            } else if (!email.includes('@')) {
                toast.warning('Please enter a valid email address!', { position: 'top-center' });
            } else {
                const response = await fetch('/sendpasswordlink', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    setEmail('');
                    setMessage('Password reset link sent successfully to your email!');
                } else {
                    throw new Error('Invalid User');
                }
            }
        } catch (error) {
            console.error('Error sending password reset link:', error);
            toast.error('Error sending password reset link. Please try again later.', {
                position: 'top-center',
            });
        }
    };

    return (
        <section>
            <div className="form_data">
                <div className="form_heading">
                    <h1>Enter Your Email</h1>
                </div>
                {message && (
                    <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form_input">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleChange}
                            name="email"
                            id="email"
                            placeholder="Enter Your Email Address"
                        />
                    </div>
                    <button type="submit" className="btn">
                        Send
                    </button>
                </form>
                <ToastContainer />
            </div>
        </section>
    );
};

export default PasswordReset;

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Utils';

function Register() {

    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: '',
        country: '',
        phonenumber: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyRegisterInfo = { ...registerInfo };
        copyRegisterInfo[name] = value;
        setRegisterInfo(copyRegisterInfo);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const { name, email, password, country, phonenumber } = registerInfo;
        if (!name || !email || !password || !country || !phonenumber) {
            return handleError('name, email, password, country and phonenumber are required')
        }
        try {
            const url = `http://localhost:8080/auth/register`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    }
    return (
        <div className='container'>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={registerInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={registerInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={registerInfo.password}
                    />
                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='country'
                        autoFocus
                        placeholder='Enter your country...'
                        value={registerInfo.country}
                    />
                </div>
                <div>
                    <label htmlFor='phonenumber'>Phone Number</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='phonenumber'
                        autoFocus
                        placeholder='Enter your phone number...'
                        value={registerInfo.phonenumber}
                    />
                </div>
                <button type='submit'>Register</button>
                <span>Already have an account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register
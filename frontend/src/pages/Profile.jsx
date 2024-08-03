import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../Utils';
import { ToastContainer } from 'react-toastify';

function Profile() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchProfile = async () => {
        try {
            const url = "http://localhost:8080/profile";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            setUserDetails(result);
        } catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <div>
                {
                    userDetails && userDetails[0] && Object.entries(userDetails[0])?.map(([key, value]) => (
                        <ul key={key}>
                            <strong>{key}:</strong> {value.toString()}
                        </ul>
                    ))
                }
            </div>
            <button onClick={handleLogout}>Logout</button>
            <ToastContainer />
        </div>
    )
}

export default Profile
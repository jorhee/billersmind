import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login';

const IDLE_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

export default function IdleTimeout() {
    const navigate = useNavigate();

    useEffect(() => {
        let timeout;

        const handleActivity = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                handleLogout();
            }, IDLE_TIMEOUT);
        };

        const handleLogout = () => {
            // Clear token or perform any cleanup needed
            localStorage.removeItem('token');
            alert('You have been logged out due to inactivity.');
            navigate('/login'); // Redirect to login page
        };

        // Attach event listeners
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('click', handleActivity);
        window.addEventListener('scroll', handleActivity);

        // Start the timeout
        handleActivity();

        // Cleanup event listeners and timeout on component unmount
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('click', handleActivity);
            window.removeEventListener('scroll', handleActivity);
        };
    }, [navigate]);

    return (
        <div>
            {/* Your app's content goes here */}
            <Login />
        </div>
    );
}

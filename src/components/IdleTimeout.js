import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IDLE_TIMEOUT = 15 * 60 * 1000; //  10 minutes in milliseconds
const PING_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function IdleLogout() {
    const navigate = useNavigate();

    useEffect(() => {
        let timeout;
        let pingTimeout;

        const handleActivity = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                handleLogout();
            }, IDLE_TIMEOUT);
        };

        const handleLogout = () => {
            localStorage.removeItem('token');
            alert('You have been logged out due to inactivity.');
            navigate('/login');
        };

        const pingServer = async () => {
            try {
                const response = await fetch('http://localhost:4000/ping'); // Your server's ping endpoint
                if (!response.ok) {
                    handleLogout();
                }
            } catch (error) {
                handleLogout(); // Server is unreachable
            }
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('click', handleActivity);
        window.addEventListener('scroll', handleActivity);
        handleActivity(); // Start the idle timeout

        // Start the server ping interval
        pingServer(); // Initial ping
        pingTimeout = setInterval(pingServer, PING_INTERVAL);

        return () => {
            clearTimeout(timeout);
            clearInterval(pingTimeout);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('click', handleActivity);
            window.removeEventListener('scroll', handleActivity);
        };
    }, [navigate]);

    return null; // No UI component to render
}

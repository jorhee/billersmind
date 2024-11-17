
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IDLE_TIMEOUT = 15 * 60 * 1000; //  15 minutes in milliseconds
const PING_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function IdleLogout() {
    const navigate = useNavigate();

    useEffect(() => {
        let timeout;
        let pingTimeout;

        const handleActivity = () => {
            if (localStorage.getItem('token')) { 
            // Only reset timeout if user is logged in
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                handleLogout();
            }, IDLE_TIMEOUT);
        }

    };

        const handleLogout = () => {
            if (localStorage.getItem('token')) { 
            // Ensure user is logged in before logging out
            localStorage.removeItem('token');
            alert('You have been logged out due to inactivity.');
            navigate('/login');
        }
    };

        const pingServer = async () => {
        if (localStorage.getItem('token')) { 
        // Only ping server if user is logged in
            try {
                const response = await fetch(`${process.env.REACT_APP_BE_URL}/ping`); // Your server's ping endpoint
                if (!response.ok) {
                    handleLogout();
                }
            } catch (error) {
                handleLogout(); // Server is unreachable
            }
        }
    };

         // Set up event listeners and initial timeout if logged in
        if (localStorage.getItem('token')) {
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('click', handleActivity);
        window.addEventListener('scroll', handleActivity);
        handleActivity(); // Start the idle timeout

        // Start the server ping interval
        pingServer(); // Initial ping
        pingTimeout = setInterval(pingServer, PING_INTERVAL);
    };

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

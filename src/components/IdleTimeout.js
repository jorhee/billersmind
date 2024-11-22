
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/notyf.css';
import { Notyf } from 'notyf';
import { AuthContext } from '../context/AuthContext';

/*
const IDLE_TIMEOUT = 15 * 60 * 1000; //  15 minutes in milliseconds
const PING_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function IdleLogout() {
    const navigate = useNavigate();
    const notyf = new Notyf({
      position: {
        x: 'center', // Horizontal axis: center
        y: 'center', // Vertical axis: center
      },
      duration: 3000, // Optional: Notification duration in milliseconds
    });


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
            notyf.error('You have been logged out due to inactivity.');
            navigate('/login');// Redirect to login page
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
*/


const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds
const PING_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function IdleLogout() {
    const navigate = useNavigate();
    const notyf = new Notyf({
      position: {
        x: 'center', // Horizontal axis: center
        y: 'center', // Vertical axis: center
      },
      duration: 3000, // Optional: Notification duration in milliseconds
    });
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        let timeoutId;
        let pingIntervalId;

        const handleActivity = () => {
            if (localStorage.getItem('token')) {
                // Reset timeout when user interacts
                clearTimeout(timeoutId);
                timeoutId = setTimeout(handleLogout, IDLE_TIMEOUT);
            }
        };

        const handleLogout = () => {
            logout(); // Call logout from context
            notyf.error('You have been logged out due to inactivity.');
            navigate('/login'); // Redirect to login page
            
        };

        const pingServer = async () => {
            if (localStorage.getItem('token')) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BE_URL}/ping`);
                    if (!response.ok) {
                        handleLogout();
                    }
                } catch (error) {
                    handleLogout(); // Log out if the server is unreachable
                }
            }
        };

        // Add activity listeners and initialize timers
        if (localStorage.getItem('token')) {
            window.addEventListener('mousemove', handleActivity);
            window.addEventListener('keydown', handleActivity);
            window.addEventListener('click', handleActivity);
            window.addEventListener('scroll', handleActivity);

            // Set the initial idle timeout and ping interval
            timeoutId = setTimeout(handleLogout, IDLE_TIMEOUT);
            pingServer();
            pingIntervalId = setInterval(pingServer, PING_INTERVAL);
        }

        // Cleanup on component unmount
        return () => {
            clearTimeout(timeoutId);
            clearInterval(pingIntervalId);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('click', handleActivity);
            window.removeEventListener('scroll', handleActivity);
        };
    }, [notyf, navigate, logout]);

    return null; // This component doesn't render any UI
}

import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
//import { useNavigate } from 'react-router-dom';

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
//const navigate = useNavigate();

/*
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:5000/profiles/login', { email, password });
      console.log(response.data); // Check if token exists in the response
      const token = response.data.token;

      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      
      // Redirect to profile page
      navigate('/profile/me');  // Redirect after successful login
    } catch (error) {
      // If login fails, display error
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Show backend error message
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };
*/

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:4000/profiles/login', { email, password });
    const token = response.data.token;

    // Check if the token exists
    console.log('Logged In Token:', token); // Log the token before storing
    // Store the token in localStorage
    localStorage.setItem('token', token);

    // Redirect to the profile page
    window.location.href = '/profiles/me';
  } catch (error) {
    console.error('Login failed', error);
    alert('Login failed');
  }
};


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;

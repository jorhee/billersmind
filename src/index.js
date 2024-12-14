import React from 'react';
//import ReactDOM from 'react-dom/client';
//import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'notyf/notyf.min.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { createRoot } from 'react-dom/client';
import "./index.css";  // Import your CSS file

/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
    document.getElementById('root')
);

//react 18 below.
*/
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
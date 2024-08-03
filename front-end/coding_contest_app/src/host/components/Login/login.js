// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'; // Updated import

const Login = () => {
  const navigate = useNavigate(); // Updated hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login/', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.key);
      navigate('/dashboard'); // Updated navigation
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const res = await axios.post('http://localhost:8000/auth/social/google/', {
        access_token: response.credential,
      });
      localStorage.setItem('token', res.data.key);
      navigate('/dashboard'); // Updated navigation
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={(error) => console.error(error)}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;

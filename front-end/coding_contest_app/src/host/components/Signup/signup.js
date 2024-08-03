// src/components/Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/registration/', {
        email,
        password1,
        password2,
      });
      localStorage.setItem('token', response.data.key);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignup = async (response) => {
    try {
      const res = await axios.post('http://localhost:8000/auth/social/google/', {
        access_token: response.credential,
      });
      localStorage.setItem('token', res.data.key);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}  
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <button type="submit">Signup</button>
        </form>
        <GoogleLogin
          onSuccess={handleGoogleSignup}
          onError={(error) => console.error(error)}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;

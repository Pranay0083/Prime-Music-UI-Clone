import React, { useState, useContext } from 'react';
import { AuthDispatchContext } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useContext(AuthDispatchContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const response = await login(email, password);
      const { token, data } = response.data;
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data.user, token } });
      navigate('/');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
  };

  return (
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
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;

import React, { useState, useContext } from 'react';
import { AuthDispatchContext } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useContext(AuthDispatchContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const response = await login(email, password);
      const { token, data } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        console.log('Token saved:', token);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data.user, token } });
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white mb-2">
            Welcome back
          </h2>
          <p className="text-gray-400">
            Please sign in to your account
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-regular fa-envelope w-5 h-5 text-gray-400"></i>
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg
                          bg-gray-700/50 text-gray-200 placeholder-gray-400
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition duration-150 ease-in-out"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-lock w-5 h-5 text-gray-400"></i>
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg
                          bg-gray-700/50 text-gray-200 placeholder-gray-400
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition duration-150 ease-in-out"
                required
              />
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-700 bg-gray-700/50 text-blue-500 
                         focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <label className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                     text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     transition duration-150 ease-in-out"
          >
            Sign in
          </button>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
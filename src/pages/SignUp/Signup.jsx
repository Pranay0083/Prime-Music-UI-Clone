import React, { useState } from 'react';
import { signup } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await signup(name, email, password);
      navigate('/signin');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white mb-2">
            Create an account
          </h2>
          <p className="text-gray-400">
            Join us today and start listening
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-user w-5 h-5 text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg
                          bg-gray-700/50 text-gray-200 placeholder-gray-400
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition duration-150 ease-in-out"
                required
              />
            </div>

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

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              required
              className="h-4 w-4 rounded border-gray-700 bg-gray-700/50 text-blue-500 
                       focus:ring-blue-500 focus:ring-offset-gray-800"
            />
            <label className="ml-2 block text-sm text-gray-400">
              I agree to the{' '}
              <button
                type="button"
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                Terms and Conditions
              </button>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                     text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Sign up'}
          </button>

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <button
              type="button"
              className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
              onClick={() => navigate('/signin')}
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
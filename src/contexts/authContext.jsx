import React, { createContext, useReducer, useEffect } from 'react';
import { api } from '../services/api';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

const AuthContext = createContext(initialState);
const AuthDispatchContext = createContext(undefined);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false
      };
    case 'LOGIN_FAILURE':
      return { ...state, error: action.payload, loading: false };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...state, isAuthenticated: false, user: null, token: null };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token on load:', token);
    if (token) {
      const fetchUserData = async () => {
        dispatch({ type: 'LOGIN_REQUEST' });
        try {
          const response = await api.fetchUserData(token);
          console.log('Fetched User Data:', response.data);
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user: response.data.user, token } });
        } catch (error) {
          dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
          localStorage.removeItem('token');
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, AuthDispatchContext };

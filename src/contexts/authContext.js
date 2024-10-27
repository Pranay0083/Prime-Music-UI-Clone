import React, { createContext, useReducer } from 'react';

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
      return { ...state, isAuthenticated: false, user: null, token: null };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, AuthDispatchContext };

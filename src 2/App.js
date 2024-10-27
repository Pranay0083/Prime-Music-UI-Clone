import React from "react";
import './index.css';
import { useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import HomePage from './components/homePage/homePage';
import SignIn from './components/signInpage/signin';
import SignUp from './components/signUppage/signUp';
import Songs from './components/songPlayer';

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState('');

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage isLogin={isLogin} setIsLogin={setIsLogin}/>,
    },
    {
      path: '/signin',
      element: <SignIn setIsLogin={setIsLogin} setToken={setToken}/>,
    },
    {
      path: '/signup',
      element: <SignUp setToken={setToken}/>,
    },
    {
      path: '/song/:id',
      element: isLogin ? <Songs token={token}/> : <Navigate replace to='/signin'/>
    }
    
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
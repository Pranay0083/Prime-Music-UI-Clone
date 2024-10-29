import React from 'react';
import { useNavigate } from 'react-router-dom'
import img from '../../../assets/images/Amazon_Music_Logo_Horizontal_RGB_White+Music_Cyan_MASTER.png';

function Logo() {
  const navigate = useNavigate();
  return <img
      src={img}
      alt="Amazon Music Logo"
      className="h-7 cursor-pointer"
      onClick={() => navigate(0)}
    />
}

export default Logo;

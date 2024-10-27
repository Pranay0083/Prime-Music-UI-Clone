import React from 'react';
import { useNavigate } from 'react-router-dom'

function NavItem({ iconClass, text, style, iconClass2 }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
      <i className={iconClass} style={style}></i>
      <span style={style}>{text}</span>
      {iconClass2 && <i className={iconClass2} style={style}></i>}
    </div>
  );
}

export default NavItem;

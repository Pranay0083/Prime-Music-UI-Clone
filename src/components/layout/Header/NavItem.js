import React from 'react';

function NavItem({ iconClass, text, style }) {
  return (
    <div className="flex items-center space-x-2">
      <i className={iconClass} style={style}></i>
      <span style={style}>{text}</span>
    </div>
  );
}

export default NavItem;

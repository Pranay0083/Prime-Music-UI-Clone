import React, { lazy } from 'react';

const Logo = lazy(() => import('./Logo'));
const NavItem = lazy(() => import('./NavItem'));
const SearchBar = lazy(() => import('./SearchBar'));
const Profile = lazy(() => import('./Profile'));
const Library = lazy(() => import('./Library'));

function Header() {
  return (
    <div className="header-container">
      <div className="flex items-center space-x-10">
        <Logo />
        <NavItem iconClass="fa-solid fa-house" text="HOME" style={{ color: "#00FFFF" }} />
        <Library />
      </div>
      <div className="flex items-center space-x-10">
        <SearchBar />
        <Profile />
      </div>
    </div>
  );
}

export default Header;
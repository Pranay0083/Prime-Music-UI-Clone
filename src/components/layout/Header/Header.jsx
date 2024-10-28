import React, { lazy } from 'react';

const Logo = lazy(() => import('./Logo'));
const NavItem = lazy(() => import('./NavItem'));
const SearchBar = lazy(() => import('./SearchBar'));
const Profile = lazy(() => import('./Profile'));
const Library = lazy(() => import('./Library'));

function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[71px] px-14 border-b-2 border-gray-800 flex justify-between items-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex items-center space-x-10">
        <Logo />
        <NavItem iconClass="fa-solid fa-house" text="HOME" style={{ color: "#00FFFF" }} />
        <NavItem iconClass="fa-solid fa-podcast" text="PODCASTS" />
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

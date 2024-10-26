import React, { Suspense, lazy } from 'react';

const Logo = lazy(() => import('./Logo'));
const NavItem = lazy(() => import('./NavItem'));
const SearchBar = lazy(() => import('./SearchBar'));
const Profile = lazy(() => import('./Profile'));

function Header() {
  return (
    <div className="h-[71px] px-14 border-b-2 border-gray-800 flex justify-between items-center">
      <div className="flex items-center space-x-10">
        <Logo />
        <NavItem iconClass="fa-solid fa-house" text="HOME" style={{ color: "#00FFFF" }} />
        <NavItem iconClass="fa-solid fa-podcast" text="PODCASTS" />
        <NavItem iconClass="fa-solid fa-headphones" text="Library" />
      </div>
      <div className="flex items-center space-x-10">
        <SearchBar />
        <Profile />
      </div>
    </div>
  );
}

export default Header;

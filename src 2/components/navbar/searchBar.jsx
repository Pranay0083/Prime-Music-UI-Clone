import * as React from 'react';

export default function Searchbar() {
    return (
        <div className="flex items-center rounded-full h-10 pl-3 pr-6 mr-5 bg-white text-black">
            
            <input 
                type="search" 
                placeholder="Search" 
                className="flex-grow bg-white focus:outline-none pl-4"
            />
            <i className="fa-solid fa-magnifying-glass pr-3"></i>
        </div>
    );
}

import React, { useState } from 'react';
import { AvatarComponent } from 'avatar-initials';

export default function Example() {
  const [showMenu, setShowMenu] = useState(false);

  const currentUser = {
    Avatar: '',
    FirstName: 'Pranay',
    LastName: 'Vishwakarma'
  };

  return (
    <div className={`w-full flex self-center items-center justify-between relative`}>
      <button type="button" onClick={() => setShowMenu(!showMenu)} title="Open Menu">
        <AvatarComponent
          classes="rounded-full"
          useGravatar={false}
          size={44}
          primarySource={currentUser.Avatar}
          color="#000000"
          background="#f1f1f1"
          fontSize={16}
          fontWeight={400}
          offsetY={24}
          initials={`${currentUser.FirstName[0]}${currentUser.LastName[0]}`}
        />
      </button>
      
      {showMenu && (
        <div className="absolute top-full mt-2 right-0 bg-black text-white rounded-xl border-gray-600 border-2">
          <div className='w-40 pt-3 py-2 px-4 justify-center content-center border-b-2 border-gray-600' >
            <button type="button" title="View Profile">
                View Profile
            </button>
          </div>
          <div className='w-40 py-2 px-4 justify-center content-center border-b-2 border-gray-600' >
            <button type="button" title="View Profile">
            Favourite
            </button>
          </div>
          <div className='w-40 py-2 px-4 justify-center content-center border-b-2 border-gray-600' >
            <button type="button" title="View Profile">
            Subscription
            </button>
          </div>
          <div className='w-40 py-3 px-4 justify-center content-center' >
            <button type="button" title="View Profile">
            Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

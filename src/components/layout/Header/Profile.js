// src/components/Profile.js
import React from 'react';
import { AvatarComponent } from 'avatar-initials';

function Profile() {
  const currentUser = {
    Avatar: '',
    FirstName: 'Pranay',
    LastName: 'Vishwakarma',
  };

  return (
    <div className="flex self-center items-center justify-between relative">
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
    </div>
  );
}

export default Profile;
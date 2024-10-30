import React, { useState, useContext } from 'react';
import { AvatarComponent } from 'avatar-initials';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthDispatchContext } from '../../../contexts/authContext';

const Profile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/signin');
  };

  const getInitials = (name) => {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part[0]).join('');
    return initials.toUpperCase();
  };

  return (
    <div className="relative">
      <button type="button" onClick={() => setShowMenu(!showMenu)} title="Open Menu">
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="User Avatar"
            className="rounded-full h-10 w-10"
          />
        ) : (
          <AvatarComponent
            classes="rounded-full"
            useGravatar={false}
            size={40}
            primarySource=""
            color="#000000"
            background="#f1f1f1"
            fontSize={16}
            fontWeight={400}
            offsetY={22}
            initials={user ? getInitials(user.name) : ''}
          />
        )}
      </button>
      {showMenu && (
        <div className="absolute top-full mt-2 right-0 bg-black text-white rounded-xl border-gray-600 border-2 z-10">
          {isAuthenticated ? (
            <>
              <MenuItem text="View Profile" onClick={() => navigate('/profile')} />
              <MenuItem text="Favourite" onClick={() => navigate('/favourite')} />
              <MenuItem text="Subscription" onClick={() => navigate('/subscription')} />
              <MenuItem text="Logout" onClick={handleLogout} />
            </>
          ) : (
            <MenuItem text="Sign In" onClick={() => navigate('/signin')} />
          )}
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ text, onClick }) => (
  <div className="w-40 py-2 px-4 justify-center content-center border-b-2 border-gray-600 last:border-b-0">
    <button type="button" title={text} onClick={onClick}>
      {text}
    </button>
  </div>
);

export default Profile;
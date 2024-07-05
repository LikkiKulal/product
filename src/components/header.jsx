// Header.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './header.css';

function Header({ handleLogout, username, coins }) {
  const [showLogout, setShowLogout] = useState(false);

  const handleProfileClick = () => {
    setShowLogout(!showLogout);
  };

  return (
    <header className="p2header">
      <div className="p2logo">
        <img src='/logo.svg' alt='Logo' />
      </div>
      <div className="p2user">
        <span className='p2text'>Welcome, {username}👋</span>
        <span className='p2coin'>
          XCoins: {coins}
          <img src='/coin.svg' alt='Coin' />
        </span>
        <div className='p2img-container'>
          <img src="/cash.svg" alt="Cash" className='p2img' />
          <img src="/bell.svg" alt="Notifications" className='p2img' />
          <div>
            <div className="profile-icon" onClick={handleProfileClick}>
              <img src='/profile2.svg' alt='Profile' className='p2img' />
            </div>
            {showLogout && (
              <div className="p1logout">
                <span onClick={() => {
                  handleLogout();
                  setShowLogout(false);
                }}>
                  <img src='/logout.svg' alt='Logout' />
                  Logout
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  username: PropTypes.string,
  coins: PropTypes.number,
};

Header.defaultProps = {
  username: 'User',
  coins: 0,
};

export default Header;
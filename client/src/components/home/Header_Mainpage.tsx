import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserAvatar from '../../img/Male User.png';
import logo from '../../img/logo.png';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogoutClick = () => {
    console.log('Đăng xuất');
    setIsDropdownOpen(false);
    navigate('/signin');
  };

  return (
    <header className="main-header logged-in-header flex items-center justify-between px-4 border-b border-white"> {/* Sử dụng Flexbox */}
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} className="h-10 mr-5" alt="Echo Mind" />
        </Link>
      </div>
      <div className="user-profile flex items-center cursor-pointer relative ml-auto" onClick={toggleDropdown}> {/* Thêm ml-auto */}
        <img src={UserAvatar} alt="User Avatar" className="user-avatar-loggedin" />
        <div className="dropdown-icon ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
        {isDropdownOpen && (
        <div className="dropdown-menu absolute right-0 top-7 mt-12 w-48 bg-white shadow-lg rounded-lg z-10"> 
            <button
            onClick={handleLogoutClick}
            className="text-white bg-[#00DFA8] rounded-lg py-2 px-4 w-full text-center font-semibold transition duration-300 ease-in-out transform hover:bg-[#00C29D] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00DFA8] focus:ring-offset-2"
            >
            Đăng xuất
            </button>
        </div>
        )}
      </div>
    </header>
  );
};

export default Header;

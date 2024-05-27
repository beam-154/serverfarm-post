import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Header() {
  const { authState, logout } = useContext(AuthContext);

  return (
    <header className="bg-gray-800 fixed top-0 left-0 w-full z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className='text-gray-100 text-2xl'>Welcome, {authState.user?.name}!</div>
        <div className="flex gap-x-12">
          <Link
            to="/dashboard"
            className="text-sm font-semibold leading-6 text-gray-100"
          >
            Posts
          </Link>

          <Link
            to="/create-post"
            className="text-sm font-semibold leading-6 text-gray-100"
          >
            Create a new Post
          </Link>

          <Link
            to="#"
            className="text-sm font-semibold leading-6 text-gray-100"
            onClick={logout}
          >
            Logout
          </Link>
        </div>
      </nav>
    </header>
    // {/* </nav> */}
  );
}

export default Header;

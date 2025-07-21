import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, User, Settings, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-cyan-400 tracking-wide">
        <Link to="/">Cholo-Kotha-Boli</Link>
      </div>

      {/* Right Menu */}
      <div className="flex items-center gap-4 relative">
        {/* Settings Icon */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="hover:text-cyan-300 transition">
          <Settings />
        </button>

        {/* Dropdown if user exists */}
        {authUser && menuOpen && (
          <div className="absolute right-0 top-12 bg-gray-800 border border-gray-700 rounded-md p-2 w-40 z-50 shadow-xl">
            <Link to="/profile" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded transition">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded w-full text-left transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

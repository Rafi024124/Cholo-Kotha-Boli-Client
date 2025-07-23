import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#134e4a] text-[#07a78a] px-6 py-3 shadow-md flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#c3e0e1] tracking-wide">
        <Link to="/">Cholo-Kotha-Boli</Link>
      </div>

      {/* Right Menu */}
      <div className="flex items-center gap-4 relative">
        {/* Settings Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hover:text-[#a7f3d0] transition"
          aria-label="Settings"
        >
          <Settings />
        </button>

        {/* Dropdown if user exists */}
        {authUser && menuOpen && (
          <div className="absolute right-0 top-12 bg-[#059669] border border-[#34d399] rounded-md p-2 w-40 z-50 shadow-xl text-[#c3e0e1]">
            <Link
              to="/profile"
              className="flex items-center  gap-2 px-3 py-2 hover:bg-[#34d399] rounded transition"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 hover:bg-[#34d399] rounded w-full text-left transition"
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

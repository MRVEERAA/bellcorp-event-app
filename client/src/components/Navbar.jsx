import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          EventHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Events
          </Link>

          {user && (
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Dashboard
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-4 py-2 rounded-lg shadow hover:from-indigo-600 hover:to-indigo-800 transition-all font-semibold"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow hover:from-red-600 hover:to-red-700 transition-all font-semibold"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="flex flex-col space-y-2 px-4 py-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Events
            </Link>

            {user && (
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Dashboard
              </Link>
            )}

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-4 py-2 rounded-lg shadow hover:from-indigo-600 hover:to-indigo-800 transition-all font-semibold text-center"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow hover:from-red-600 hover:to-red-700 transition-all font-semibold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

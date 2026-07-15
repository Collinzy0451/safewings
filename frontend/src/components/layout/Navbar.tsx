import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "../../hooks/use-mobile";


const Navbar = () => {
  const { isAuthenticated, logout, userRole } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isMobile = useIsMobile();


  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Get-Quote", path: "/calculate" },
    { name: "Track", path: "/track" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img className="h-14 w-13" src="/logo/logo2.png" alt="" />
              {/* <span className="hidden md:inline text-xl text-gray-900">
                <span className="font-bold text-xl text-gray-900">SAFEWING</span>
                <span className="font-bold text-xl text-red-500">CONSIGNMENTS</span>
              </span> */}

            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          {/* This shows only on small screens */}
          {isAuthenticated && userRole === "admin" && (
            <div className="flex md:hidden px-4">
              <Link
                to="/admin"
                className="flex items-center space-x-1 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Admin Panel</span>
              </Link>
            </div>
          )}

{/* This shows only on medium and larger screens */}
<div className="hidden md:flex items-center space-x-4">
  {isAuthenticated ? (
    <>
      {userRole === "admin" && (
        <Link
          to="/admin"
          className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
        >
          <User className="h-4 w-4" />
          <span>Admin Panel</span>
        </Link>
      )}

      {userRole === "customer" && (
        <Link
          to="/dashboard"
          className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
        >
          <User className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>
      )}

      <button
        onClick={logout}
        className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </>
  ) : (
    <>
      <Link
        to="/login"
        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        Sign Up
      </Link>
    </>
  )}
</div>


          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 pb-2 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-700"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="container px-3">
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom py-2 px-3">
        <div className="container-fluid px-0">
          {/* LEFT: Brand Logo & Tagline */}
          <Link className="navbar-brand d-flex align-items-center me-3 me-xl-4" to="/">
            <span className="fs-3 me-2">♻️</span>
            <div className="d-flex flex-column">
              <span className="brand-text fs-4 lh-1">WasteConnect</span>
              <span className="brand-tagline">Request. Track. Collect.</span>
            </div>
          </Link>

          {/* Mobile Hamburger Toggler */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* CENTER & RIGHT Links */}
          <div className="collapse navbar-collapse" id="navbarMain">
            {/* CENTER Navigation Bar */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 text-center text-lg-start">
              {/* Unauthenticated / Public User Navigation */}
              {!user && (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/about') ? 'active' : ''}`} to="/about">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/how-it-works') ? 'active' : ''}`} to="/how-it-works">
                      How It Works
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/features') ? 'active' : ''}`} to="/features">
                      Features
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/contact') ? 'active' : ''}`} to="/contact">
                      Contact Us
                    </Link>
                  </li>
                </>
              )}

              {/* Logged-In Normal User Navigation */}
              {user && !isAdmin && (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/requests/new') ? 'active' : ''}`} to="/requests/new">
                      Request Pickup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/my-requests') ? 'active' : ''}`} to="/my-requests">
                      My History
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/about') ? 'active' : ''}`} to="/about">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/contact') ? 'active' : ''}`} to="/contact">
                      Contact
                    </Link>
                  </li>
                </>
              )}

              {/* Logged-In Admin Navigation */}
              {user && isAdmin && (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/admin') ? 'active' : ''}`} to="/admin">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/admin/requests') ? 'active' : ''}`} to="/admin/requests">
                      Requests
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/about') ? 'active' : ''}`} to="/about">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/contact') ? 'active' : ''}`} to="/contact">
                      Contact
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* RIGHT Authentication / User Controls */}
            <div className="d-flex align-items-center justify-content-center justify-content-lg-end gap-2 mt-3 mt-lg-0">
              {user ? (
                <div className="dropdown">
                  <button
                    className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center gap-2 rounded-pill px-3 py-1.5"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="badge bg-emerald text-dark fw-bold rounded-circle">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                    <span className="fw-semibold">{user.name}</span>
                    {isAdmin && <span className="badge bg-warning text-dark ms-1">ADMIN</span>}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0 p-2 rounded-3 mt-2" aria-labelledby="userDropdown">
                    <li className="dropdown-header text-muted extra-small">Logged in as {user.email}</li>
                    <li><hr className="dropdown-divider my-1" /></li>
                    <li>
                      <button className="dropdown-item text-danger rounded-2 small fw-semibold py-1.5" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-light btn-sm px-3 rounded-pill fw-semibold">
                    Log In
                  </Link>
                  <Link to="/register" className="btn btn-emerald btn-sm px-3 rounded-pill fw-semibold">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

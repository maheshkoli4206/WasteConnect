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
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top py-2">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center me-4" to="/">
          <span className="fs-3 me-2">♻️</span>
          <div className="d-flex flex-column">
            <span className="brand-text fs-4 lh-1">WasteConnect</span>
            <span className="brand-tagline">Request. Track. Collect.</span>
          </div>
        </Link>

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

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'active fw-bold' : ''}`} to="/">
                Home
              </Link>
            </li>

            {user && !isAdmin && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive('/dashboard') ? 'active fw-bold' : ''}`}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive('/requests/new') ? 'active fw-bold' : ''}`}
                    to="/requests/new"
                  >
                    Request Pickup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive('/my-requests') ? 'active fw-bold' : ''}`}
                    to="/my-requests"
                  >
                    My History
                  </Link>
                </li>
              </>
            )}

            {user && isAdmin && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive('/admin') ? 'active fw-bold' : ''}`}
                    to="/admin"
                  >
                    Admin Overview
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive('/admin/requests') ? 'active fw-bold' : ''}`}
                    to="/admin/requests"
                  >
                    Manage Pickup Requests
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="badge bg-emerald text-dark fw-bold rounded-circle">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                  <span>{user.name}</span>
                  {isAdmin && <span className="badge bg-warning text-dark ms-1">ADMIN</span>}
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
                  <li className="dropdown-header">Logged in as {user.email}</li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm px-3">
                  Log In
                </Link>
                <Link to="/register" className="btn btn-emerald btn-sm px-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

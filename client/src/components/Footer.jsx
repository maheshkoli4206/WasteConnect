import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Footer = () => {
  const { user } = useContext(AuthContext);

  return (
    <footer className="mt-auto py-5 bg-dark-forest text-light border-top border-emerald border-opacity-20">
      <div className="container">
        <div className="row gy-4 mb-4">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="fs-4">♻️</span>
              <span className="fw-bold text-emerald fs-5">WasteConnect</span>
            </div>
            <p className="text-light opacity-75 extra-small mb-3">
              Responsible waste disposal platform connecting material guidelines, pickup scheduling, request tracking, and collection management in one centralized workflow.
            </p>

            <span className="badge bg-emerald bg-opacity-20 text-emerald border border-emerald border-opacity-30 extra-small">
              Request. Track. Collect.
            </span>
          </div>

          {/* Product Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-emerald mb-3 extra-small text-uppercase tracking-wider">Product</h6>
            <ul className="list-unstyled extra-small d-flex flex-column gap-2 mb-0">
              <li>
                <Link to="/" className="text-light text-decoration-none opacity-75 hover-emerald">
                  Home
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link to="/dashboard" className="text-light text-decoration-none opacity-75 hover-emerald">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/requests/new" className="text-light text-decoration-none opacity-75 hover-emerald">
                      Request Pickup
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-requests" className="text-light text-decoration-none opacity-75 hover-emerald">
                      My History
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <a href="/#disposal-guidance" className="text-light text-decoration-none opacity-75 hover-emerald">
                    Disposal Guidance
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-emerald mb-3 extra-small text-uppercase tracking-wider">Company</h6>
            <ul className="list-unstyled extra-small d-flex flex-column gap-2 mb-0">
              <li>
                <Link to="/about" className="text-light text-decoration-none opacity-75 hover-emerald">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-light text-decoration-none opacity-75 hover-emerald">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-light text-decoration-none opacity-75 hover-emerald">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none opacity-75 hover-emerald">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-emerald mb-3 extra-small text-uppercase tracking-wider">Resources</h6>
            <ul className="list-unstyled extra-small d-flex flex-column gap-2 mb-0">
              <li>
                <a
                  href="https://wasteconnect-bfno.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none opacity-75 hover-emerald"
                >
                  Live Demo <i className="bi bi-box-arrow-up-right ms-1 extra-small"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/maheshkoli4206/WasteConnect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none opacity-75 hover-emerald"
                >
                  GitHub Repository <i className="bi bi-github ms-1 extra-small"></i>
                </a>
              </li>
              <li>
                <span className="text-light opacity-50">Challenge: Smart Waste Collection</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-3 border-top border-secondary border-opacity-20 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 extra-small text-light opacity-75">
          <span>© {new Date().getFullYear()} WasteConnect Inc. All rights reserved.</span>
          <span>Smart Waste Collection & Recycling</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
        if (res.data.length > 0) {
          setSelectedCategory(res.data[0]);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-wrapper text-center text-md-start">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 px-3 py-2 rounded-pill mb-3">
                🌱 Smart Waste Disposal & Tracking Platform
              </span>
              <h1 className="display-4 fw-extrabold mb-3 text-white">
                Waste collection made simple.
              </h1>
              <p className="lead text-light opacity-90 mb-4 me-lg-4">
                Select your waste type, receive immediate responsible disposal guidelines, request an automated pickup, and track collection status in real-time.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                <Link to="/requests/new" className="btn btn-emerald btn-lg px-4 shadow">
                  Request a Pickup <i className="bi bi-arrow-right ms-2"></i>
                </Link>
                <a href="#disposal-guidance" className="btn btn-outline-light btn-lg px-4">
                  Learn About Disposal
                </a>
              </div>
            </div>
            <div className="col-lg-5 text-center">
              <div className="wc-card p-4 text-start bg-white text-dark shadow-lg border-0">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="feature-icon-box mb-0">♻️</div>
                  <div>
                    <h5 className="fw-bold mb-0">Hackathon Live Demo</h5>
                    <small className="text-muted">Instant Access Accounts</small>
                  </div>
                </div>
                <div className="bg-light p-3 rounded-3 mb-3 border">
                  <div className="fw-bold text-success mb-1">
                    <i className="bi bi-person-fill me-1"></i> Resident Demo Account
                  </div>
                  <div className="small text-secondary">
                    Email: <code>user@wasteconnect.org</code> <br />
                    Password: <code>User123!</code>
                  </div>
                </div>
                <div className="bg-light p-3 rounded-3 border">
                  <div className="fw-bold text-primary mb-1">
                    <i className="bi bi-shield-lock-fill me-1"></i> Admin Demo Account
                  </div>
                  <div className="small text-secondary">
                    Email: <code>admin@wasteconnect.org</code> <br />
                    Password: <code>Admin123!</code>
                  </div>
                </div>
                <div className="mt-3">
                  <Link to="/login" className="btn btn-sm btn-dark w-100 py-2 fw-semibold">
                    Sign In to Test Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark mb-2">Why WasteConnect?</h2>
            <p className="text-muted">Streamlining urban waste management for residents and collection teams.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="wc-card p-4 h-100">
                <div className="feature-icon-box">
                  <i className="bi bi-journal-check"></i>
                </div>
                <h5 className="fw-bold mb-2">1. Responsible Disposal</h5>
                <p className="text-secondary small mb-0">
                  Instant guidance tailored to specific waste types including E-Waste, Hazardous, Glass, and Organics to prevent environmental contamination.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="wc-card p-4 h-100">
                <div className="feature-icon-box">
                  <i className="bi bi-calendar-event"></i>
                </div>
                <h5 className="fw-bold mb-2">2. Easy Pickup Requests</h5>
                <p className="text-secondary small mb-0">
                  Select your exact address, convenient pickup date, and time slot with intelligent priority calculation for urgent or hazardous items.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="wc-card p-4 h-100">
                <div className="feature-icon-box">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <h5 className="fw-bold mb-2">3. Track Collection</h5>
                <p className="text-secondary small mb-0">
                  Follow your request step-by-step from submission, review, assignment, through final collection with live status updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-5 bg-light border-top border-bottom">
        <div className="container py-3">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark mb-2">Simple 4-Step Workflow</h2>
            <p className="text-muted">How easy it is to schedule and track your waste collection.</p>
          </div>

          <div className="row g-4 align-items-center">
            <div className="col-6 col-md-3 text-center">
              <div className="p-3 bg-white rounded-4 shadow-sm border mb-2">
                <span className="fs-1 text-success">1️⃣</span>
                <h6 className="fw-bold mt-2 mb-0">Select Waste</h6>
              </div>
              <small className="text-muted">Choose item category</small>
            </div>
            <div className="col-6 col-md-3 text-center">
              <div className="p-3 bg-white rounded-4 shadow-sm border mb-2">
                <span className="fs-1 text-success">2️⃣</span>
                <h6 className="fw-bold mt-2 mb-0">Get Guidance</h6>
              </div>
              <small className="text-muted">Read disposal tips</small>
            </div>
            <div className="col-6 col-md-3 text-center">
              <div className="p-3 bg-white rounded-4 shadow-sm border mb-2">
                <span className="fs-1 text-success">3️⃣</span>
                <h6 className="fw-bold mt-2 mb-0">Request Pickup</h6>
              </div>
              <small className="text-muted">Pick date & address</small>
            </div>
            <div className="col-6 col-md-3 text-center">
              <div className="p-3 bg-white rounded-4 shadow-sm border mb-2">
                <span className="fs-1 text-success">4️⃣</span>
                <h6 className="fw-bold mt-2 mb-0">Track Collection</h6>
              </div>
              <small className="text-muted">Monitor timeline live</small>
            </div>
          </div>
        </div>
      </section>

      {/* Waste Category Guidance Exploration Section */}
      <section id="disposal-guidance" className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="text-emerald fw-bold text-uppercase tracking-wider small">Waste Categories & Guidelines</span>
            <h2 className="fw-bold text-dark mt-1">Responsible Disposal Directory</h2>
            <p className="text-muted">Click any category below to view specific preparation and separation guidelines.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-5">
              <div className="list-group shadow-sm rounded-4 overflow-hidden border">
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    type="button"
                    className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between p-3 ${
                      selectedCategory?._id === cat._id ? 'active bg-emerald border-emerald' : ''
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <i className={`fs-4 ${cat.icon || 'bi-trash'} ${selectedCategory?._id === cat._id ? 'text-white' : 'text-emerald'}`}></i>
                      <span className="fw-semibold">{cat.name}</span>
                    </div>
                    <i className="bi bi-chevron-right opacity-50"></i>
                  </button>
                ))}
              </div>
            </div>

            <div className="col-md-7">
              {selectedCategory ? (
                <div className="wc-card p-4 h-100 border-start border-4 border-emerald">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="feature-icon-box mb-0">
                      <i className={`fs-3 ${selectedCategory.icon || 'bi-trash'}`}></i>
                    </div>
                    <div>
                      <h4 className="fw-bold mb-0 text-dark">{selectedCategory.name} Category</h4>
                      <span className="badge bg-light text-dark border">Official Guidelines</span>
                    </div>
                  </div>

                  <h6 className="fw-bold text-muted mb-2">Category Overview:</h6>
                  <p className="text-secondary mb-4">{selectedCategory.description}</p>

                  <div className="guidance-box mb-4">
                    <h6 className="fw-bold text-emerald mb-2">
                      <i className="bi bi-info-circle-fill me-2"></i>Recommended Disposal Guidance:
                    </h6>
                    <p className="mb-0 text-dark fw-medium fs-6">
                      "{selectedCategory.disposalGuidance}"
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
                    <span className="small text-muted">Ready to dispose of {selectedCategory.name}?</span>
                    <Link to="/requests/new" className="btn btn-emerald btn-sm px-4 fw-semibold">
                      Schedule {selectedCategory.name} Pickup
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="wc-card p-4 h-100 d-flex align-items-center justify-content-center text-muted">
                  Select a category on the left to view guidance.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

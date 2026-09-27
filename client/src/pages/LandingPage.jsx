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
    <div className="fade-in-ui">
      {/* 2-Column Hero Section */}
      <section className="hero-wrapper">
        <div className="container">
          <div className="row align-items-center gy-4">
            {/* Left Column (55%) */}
            <div className="col-lg-7 text-center text-lg-start">
              <span className="badge bg-emerald bg-opacity-20 text-emerald border border-emerald border-opacity-30 px-3 py-1.5 rounded-pill mb-3 fw-semibold small">
                🌱 Smart Waste Disposal & Collection Intelligence
              </span>
              <h1 className="display-5 fw-extrabold mb-3 text-white lh-sm">
                Waste collection made <span className="brand-text">simple & smart</span>.
              </h1>
              <p className="lead text-light opacity-90 mb-4 me-lg-4 fs-6">
                Track collection status and manage pickup requests through a centralized workflow.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <Link to="/requests/new" className="btn btn-emerald btn-lg px-4 shadow-sm">
                  Request a Pickup <i className="bi bi-arrow-right ms-2"></i>
                </Link>
                <a href="#disposal-guidance" className="btn btn-outline-light btn-lg px-4">
                  Disposal Guidance
                </a>
              </div>
            </div>

            {/* Right Column (45%): Clean SaaS Product Preview Card */}
            <div className="col-lg-5">
              <div className="wc-card-dark p-4 position-relative shadow-lg">
                <div className="d-flex align-items-center justify-content-between border-bottom border-secondary border-opacity-30 pb-3 mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <span className="fs-5">♻️</span>
                    <span className="fw-bold text-emerald">WasteConnect Hub</span>
                  </div>
                  <span className="badge bg-success bg-opacity-20 text-emerald border border-emerald border-opacity-30 rounded-pill px-2.5 py-1 extra-small">
                    Active Platform
                  </span>
                </div>

                {/* Preview Card 1: Priority & Zone Alert */}
                <div className="p-3 bg-dark bg-opacity-50 rounded-3 border border-emerald border-opacity-20 mb-3 text-start">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="badge bg-danger text-white">HIGH PRIORITY</span>
                    <span className="small text-emerald fw-semibold">Zone A</span>
                  </div>
                  <div className="fw-bold text-white small">E-Waste Pickup • REQ-2026-1001</div>
                  <div className="extra-small text-secondary">Categorized & prioritized for collection</div>
                </div>

                {/* Preview Card 2: 6-Stage Tracking Lifecycle */}
                <div className="p-3 bg-dark bg-opacity-50 rounded-3 border border-secondary border-opacity-20 text-start">
                  <span className="extra-small text-secondary d-block mb-2 fw-semibold text-uppercase tracking-wider">
                    6-Stage Collection Lifecycle
                  </span>
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-1">
                    <span className="badge bg-info text-dark extra-small">SUBMITTED</span>
                    <span className="text-secondary extra-small">➔</span>
                    <span className="badge bg-primary text-white extra-small">REVIEWED</span>
                    <span className="text-secondary extra-small">➔</span>
                    <span className="badge bg-purple text-white extra-small" style={{ backgroundColor: '#8b5cf6' }}>SCHEDULED</span>
                    <span className="text-secondary extra-small">➔</span>
                    <span className="badge bg-emerald text-dark fw-bold extra-small">COLLECTED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-5 bg-white">
        <div className="container py-3">
          <div className="text-center mb-5 max-w-700 mx-auto">
            <span className="text-emerald fw-bold text-uppercase tracking-wider small">Platform Intelligence</span>
            <h2 className="fw-bold text-dark mt-1">Core Capabilities</h2>
            <p className="text-muted small">Streamlining disposal, scheduling, and collection management.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="wc-card p-4 h-100">
                <div className="feature-icon-box">
                  <i className="bi bi-journal-check"></i>
                </div>
                <h5 className="fw-bold mb-2 text-dark fs-6">1. Smart Disposal Guidance</h5>
                <p className="text-secondary small mb-0">
                  Instant preparation rules, DOs, DON'Ts, and environmental notes for E-Waste, Hazardous, Glass, and Organic waste.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="wc-card p-4 h-100">
                <div className="feature-icon-box">
                  <i className="bi bi-shield-exclamation"></i>
                </div>
                <h5 className="fw-bold mb-2 text-dark fs-6">2. Explainable Priority</h5>
                <p className="text-secondary small mb-0">
                  Transparent priority levels (Low, Medium, High) calculated from material toxicity, volume, and urgency rules.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="wc-card p-4 h-100">
                <div className="feature-icon-box">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <h5 className="fw-bold mb-2 text-dark fs-6">3. Collection Zones</h5>
                <p className="text-secondary small mb-0">
                  Automatic allocation into municipal collection sectors for optimized route planning and request queueing.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-6">
              <div className="wc-card p-4 h-100">
                <div className="feature-icon-box">
                  <i className="bi bi-layers-half"></i>
                </div>
                <h5 className="fw-bold mb-2 text-dark fs-6">4. Smart Collection Batching</h5>
                <p className="text-secondary small mb-0">
                  Groups non-terminal requests by zone and pickup date to maximize collection efficiency and reduce emissions.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-6">
              <div className="wc-card p-4 h-100">
                <div className="feature-icon-box">
                  <i className="bi bi-tree"></i>
                </div>
                <h5 className="fw-bold mb-2 text-dark fs-6">5. Environmental Impact</h5>
                <p className="text-secondary small mb-0">
                  Calculates diverted waste metrics, diverted volume, and municipal completion rates for transparent eco-tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Node Horizontal Workflow Section */}
      <section className="py-5 bg-light border-top border-bottom">
        <div className="container py-3">
          <div className="text-center mb-5">
            <span className="text-emerald fw-bold text-uppercase tracking-wider small">End-to-End Workflow</span>
            <h2 className="fw-bold text-dark mt-1">How WasteConnect Works</h2>
            <p className="text-muted small">A transparent, connected 6-stage request and collection lifecycle.</p>
          </div>

          <div className="row g-3 justify-content-center">
            <div className="col-6 col-md-2 text-center">
              <div className="wc-card p-3 h-100">
                <span className="fs-3 text-emerald d-block mb-1">1️⃣</span>
                <h6 className="fw-bold text-dark mb-1 small">Select Waste</h6>
                <span className="text-muted extra-small">Pick Category</span>
              </div>
            </div>

            <div className="col-6 col-md-2 text-center">
              <div className="wc-card p-3 h-100">
                <span className="fs-3 text-emerald d-block mb-1">2️⃣</span>
                <h6 className="fw-bold text-dark mb-1 small">Get Guidance</h6>
                <span className="text-muted extra-small">Read DOs / DON'Ts</span>
              </div>
            </div>

            <div className="col-6 col-md-2 text-center">
              <div className="wc-card p-3 h-100">
                <span className="fs-3 text-emerald d-block mb-1">3️⃣</span>
                <h6 className="fw-bold text-dark mb-1 small">Schedule Pickup</h6>
                <span className="text-muted extra-small">Date & Address</span>
              </div>
            </div>

            <div className="col-6 col-md-2 text-center">
              <div className="wc-card p-3 h-100">
                <span className="fs-3 text-emerald d-block mb-1">4️⃣</span>
                <h6 className="fw-bold text-dark mb-1 small">Submit Request</h6>
                <span className="text-muted extra-small">Priority Scoring</span>
              </div>
            </div>

            <div className="col-6 col-md-2 text-center">
              <div className="wc-card p-3 h-100">
                <span className="fs-3 text-emerald d-block mb-1">5️⃣</span>
                <h6 className="fw-bold text-dark mb-1 small">Track Status</h6>
                <span className="text-muted extra-small">6-Stage Stepper</span>
              </div>
            </div>

            <div className="col-6 col-md-2 text-center">
              <div className="wc-card p-3 h-100">
                <span className="fs-3 text-emerald d-block mb-1">6️⃣</span>
                <h6 className="fw-bold text-dark mb-1 small">Collection Complete</h6>
                <span className="text-muted extra-small">Impact Logged</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waste Category Guidance Exploration Directory */}
      <section id="disposal-guidance" className="py-5 bg-white">
        <div className="container py-3">
          <div className="text-center mb-5">
            <span className="text-emerald fw-bold text-uppercase tracking-wider small">Material Guidance Directory</span>
            <h2 className="fw-bold text-dark mt-1">Responsible Disposal Directory</h2>
            <p className="text-muted small">Select any waste category below to review official preparation guidelines.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-5">
              <div className="list-group shadow-sm rounded-4 overflow-hidden border">
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    type="button"
                    className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between p-3 ${
                      selectedCategory?._id === cat._id ? 'active bg-dark-forest border-dark-forest text-white' : ''
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <i className={`fs-5 ${cat.icon || 'bi-trash'} ${selectedCategory?._id === cat._id ? 'text-white' : 'text-emerald'}`}></i>
                      <span className="fw-semibold small">{cat.name}</span>
                    </div>
                    <i className="bi bi-chevron-right opacity-50 small"></i>
                  </button>
                ))}
              </div>
            </div>

            <div className="col-md-7">
              {selectedCategory ? (
                <div className="wc-card p-4 h-100 border-start border-4 border-emerald">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="feature-icon-box mb-0">
                      <i className={`fs-4 ${selectedCategory.icon || 'bi-trash'}`}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-0 text-dark">{selectedCategory.name} Category</h5>
                      <span className="badge bg-light text-dark border extra-small">Official Guidance</span>
                    </div>
                  </div>

                  <h6 className="fw-bold text-muted mb-2 small text-uppercase tracking-wider">Category Overview</h6>
                  <p className="text-secondary small mb-4">{selectedCategory.description}</p>

                  <div className="guidance-box mb-4">
                    <h6 className="fw-bold text-emerald mb-2 small">
                      <i className="bi bi-info-circle-fill me-2"></i>Disposal Guidance:
                    </h6>
                    <p className="mb-0 text-dark fw-medium small">
                      "{selectedCategory.disposalGuidance}"
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <span className="small text-muted">Ready to schedule a pickup?</span>
                    <Link to="/requests/new" className="btn btn-emerald btn-sm px-4 fw-semibold">
                      Schedule {selectedCategory.name} Pickup
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="wc-card p-4 h-100 d-flex align-items-center justify-content-center text-muted small">
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

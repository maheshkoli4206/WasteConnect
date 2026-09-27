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
      <section className="hero-wrapper text-center text-lg-start">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6">
              <span className="badge bg-success bg-opacity-25 text-success border border-emerald border-opacity-40 px-3.5 py-2 rounded-pill mb-3 fw-semibold small">
                🌱 Smart Waste Disposal & Collection Intelligence
              </span>
              <h1 className="display-4 fw-extrabold mb-3 text-white lh-sm">
                Waste collection made <span className="brand-text">simple & smart</span>.
              </h1>
              <p className="lead text-light opacity-90 mb-4 me-lg-3">
                Request household waste pickups, receive material-specific disposal guidelines, track collection status in real-time, and monitor environmental impact.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <Link to="/requests/new" className="btn btn-emerald btn-lg px-4 shadow">
                  Request a Pickup <i className="bi bi-arrow-right ms-2"></i>
                </Link>
                <a href="#disposal-guidance" className="btn btn-outline-light btn-lg px-4">
                  Disposal Guidance
                </a>
              </div>
            </div>

            {/* Right Column: Product Visualization Composition */}
            <div className="col-lg-6">
              <div className="wc-card-dark p-4 position-relative">
                <div className="d-flex align-items-center justify-content-between border-bottom border-secondary border-opacity-30 pb-3 mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <span className="fs-4">♻️</span>
                    <span className="fw-bold text-emerald">WasteConnect Ops Hub</span>
                  </div>
                  <span className="badge bg-success bg-opacity-20 text-success border border-success border-opacity-30 rounded-pill px-2.5 py-1 small">
                    ● Live System
                  </span>
                </div>

                {/* Dashboard Composition Preview Card 1: Priority Alert */}
                <div className="p-3 bg-dark bg-opacity-60 rounded-3 border border-emerald border-opacity-30 mb-3 text-start">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="badge bg-danger text-white">HIGH PRIORITY</span>
                    <span className="small text-emerald fw-semibold">Zone A</span>
                  </div>
                  <div className="fw-bold text-white small">E-Waste Pickup • REQ-2026-1001</div>
                  <div className="small text-secondary">Laptop, lithium batteries & 3 monitors</div>
                </div>

                {/* Dashboard Composition Preview Card 2: Status Timeline Preview */}
                <div className="p-3 bg-dark bg-opacity-60 rounded-3 border border-secondary border-opacity-30 mb-3 text-start">
                  <span className="small text-secondary d-block mb-2 fw-semibold">6-Stage Lifecycle Tracking</span>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-success text-white">SUBMITTED</span>
                    <span className="text-secondary small">➔</span>
                    <span className="badge bg-primary text-white">REVIEWED</span>
                    <span className="text-secondary small">➔</span>
                    <span className="badge bg-info text-white">SCHEDULED</span>
                    <span className="text-secondary small">➔</span>
                    <span className="badge bg-emerald text-dark fw-bold">COMPLETED</span>
                  </div>
                </div>

                {/* Hackathon Quick Access Account Bar */}
                <div className="p-3 bg-emerald bg-opacity-10 rounded-3 border border-emerald border-opacity-30 text-start">
                  <div className="fw-bold text-emerald small mb-1">
                    <i className="bi bi-key-fill me-1"></i> Instant Demo Credentials:
                  </div>
                  <div className="small text-light d-flex flex-wrap justify-content-between gap-2">
                    <span>User: <code>user@wasteconnect.org</code></span>
                    <span>Admin: <code>admin@wasteconnect.org</code></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5 max-w-700 mx-auto">
            <span className="text-emerald fw-bold text-uppercase tracking-wider small">Platform Capabilities</span>
            <h2 className="fw-bold text-dark mt-1">Why WasteConnect?</h2>
            <p className="text-muted">Streamlining waste collection for residents and operational management teams.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="wc-card p-4 h-100">
                <div className="feature-icon-box">
                  <i className="bi bi-journal-check"></i>
                </div>
                <h5 className="fw-bold mb-2 text-dark">1. Smart Disposal Guidance</h5>
                <p className="text-secondary small mb-0">
                  Instant rules, DOs, DON'Ts, and eco-notes for E-Waste, Hazardous, Glass, Organics, and recyclables to prevent contamination.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="wc-card p-4 h-100">
                <div className="feature-icon-box">
                  <i className="bi bi-calendar-event"></i>
                </div>
                <h5 className="fw-bold mb-2 text-dark">2. Easy Pickup Scheduling</h5>
                <p className="text-secondary small mb-0">
                  Select your exact address location, date, and preferred time slot with server-computed priority scoring for urgent items.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="wc-card p-4 h-100">
                <div className="feature-icon-box">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <h5 className="fw-bold mb-2 text-dark">3. Track Status Timeline</h5>
                <p className="text-secondary small mb-0">
                  Follow requests step-by-step through a 6-stage lifecycle stepper from submission to final collection completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Node Workflow Section */}
      <section className="py-5 bg-light border-top border-bottom">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="text-emerald fw-bold text-uppercase tracking-wider small">End-to-End Workflow</span>
            <h2 className="fw-bold text-dark mt-1">How WasteConnect Works</h2>
            <p className="text-muted">A connected, transparent request and collection process.</p>
          </div>

          <div className="row g-3 justify-content-center">
            <div className="col-6 col-md-2 text-center">
              <div className="wc-card p-3 h-100">
                <span className="fs-3 text-emerald d-block mb-1">1️⃣</span>
                <h6 className="fw-bold text-dark mb-1 small">Select Waste</h6>
                <span className="text-muted extra-small">Choose Category</span>
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
                <h6 className="fw-bold text-dark mb-1 small">Schedule Slot</h6>
                <span className="text-muted extra-small">Pick Date & Time</span>
              </div>
            </div>

            <div className="col-6 col-md-2 text-center">
              <div className="wc-card p-3 h-100">
                <span className="fs-3 text-emerald d-block mb-1">4️⃣</span>
                <h6 className="fw-bold text-dark mb-1 small">Submit Request</h6>
                <span className="text-muted extra-small">Auto Zone & Priority</span>
              </div>
            </div>

            <div className="col-6 col-md-2 text-center">
              <div className="wc-card p-3 h-100">
                <span className="fs-3 text-emerald d-block mb-1">5️⃣</span>
                <h6 className="fw-bold text-dark mb-1 small">Track Timeline</h6>
                <span className="text-muted extra-small">Monitor Status</span>
              </div>
            </div>

            <div className="col-6 col-md-2 text-center">
              <div className="wc-card p-3 h-100">
                <span className="fs-3 text-emerald d-block mb-1">6️⃣</span>
                <h6 className="fw-bold text-dark mb-1 small">Completed</h6>
                <span className="text-muted extra-small">Impact Metric Added</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waste Category Guidance Exploration Directory */}
      <section id="disposal-guidance" className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="text-emerald fw-bold text-uppercase tracking-wider small">Material Guidance Directory</span>
            <h2 className="fw-bold text-dark mt-1">Responsible Disposal Directory</h2>
            <p className="text-muted">Click any waste category below to explore official preparation guidelines.</p>
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

                  <h6 className="fw-bold text-muted mb-2">Category Description:</h6>
                  <p className="text-secondary mb-4">{selectedCategory.description}</p>

                  <div className="guidance-box mb-4">
                    <h6 className="fw-bold text-emerald mb-2">
                      <i className="bi bi-info-circle-fill me-2"></i>Disposal Guidance:
                    </h6>
                    <p className="mb-0 text-dark fw-medium fs-6">
                      "{selectedCategory.disposalGuidance}"
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
                    <span className="small text-muted">Ready to schedule pickup?</span>
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

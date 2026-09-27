import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    document.title = 'WasteConnect | Request. Track. Collect.';
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
      {/* 1. Light Hero Section */}
      <section className="hero-wrapper-light">
        <div className="container">
          <div className="row align-items-center gy-4">
            {/* Left Hero (55%) */}
            <div className="col-lg-7 text-center text-lg-start">
              <span className="hero-badge mb-3">
                SMART WASTE DISPOSAL & COLLECTION
              </span>
              <h1 className="display-5 fw-bold mb-3 text-dark-forest" style={{ lineHeight: '1.1' }}>
                Waste collection made <br />
                <span className="text-emerald">simple & smart.</span>
              </h1>
              <p className="text-secondary-readable mb-4 me-lg-4" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                Track collection status and manage pickup requests through a centralized workflow.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <Link to="/requests/new" className="btn btn-emerald shadow-sm">
                  Request a Pickup <i className="bi bi-arrow-right ms-2"></i>
                </Link>
                <a href="#disposal-guidance" className="btn btn-secondary-hero">
                  Disposal Guidance
                </a>
              </div>
            </div>

            {/* Right Hero (45%): High-Contrast Product Preview Card */}
            <div className="col-lg-5">
              <div className="hero-product-preview p-4 position-relative">
                {/* Header */}
                <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <span className="fs-5">♻️</span>
                    <span className="fw-bold text-dark-primary fs-5">WasteConnect</span>
                  </div>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: '#D1FAE5',
                      color: '#047857',
                      border: '1px solid #10B981',
                      fontWeight: 700,
                      fontSize: '12px',
                      padding: '5px 12px',
                      borderRadius: '20px',
                    }}
                  >
                    ● Active Platform
                  </span>
                </div>

                {/* Priority & Request Concept Card */}
                <div className="p-3 bg-light rounded-3 border mb-3 text-start">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="badge-priority-high">HIGH PRIORITY</span>
                    <span className="zone-label">Zone A</span>
                  </div>
                  <div className="fw-bold text-dark-primary mt-2" style={{ fontSize: '16px' }}>
                    E-Waste Pickup
                  </div>
                  <div className="text-secondary-readable mt-1" style={{ fontSize: '14px' }}>
                    Lithium batteries, electronic monitors
                  </div>
                </div>

                {/* High-Contrast Lifecycle Stepper */}
                <div className="p-3 bg-light rounded-3 border text-start">
                  <span
                    className="d-block mb-2 fw-bold text-uppercase"
                    style={{ fontSize: '13px', color: '#0F172A', letterSpacing: '0.04em' }}
                  >
                    REQUEST LIFECYCLE
                  </span>
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-1">
                    <span className="lifecycle-badge-submitted">SUBMITTED</span>
                    <span className="lifecycle-arrow">→</span>
                    <span className="lifecycle-badge-reviewed">REVIEWED</span>
                    <span className="lifecycle-arrow">→</span>
                    <span className="lifecycle-badge-scheduled">SCHEDULED</span>
                    <span className="lifecycle-arrow">→</span>
                    <span className="lifecycle-badge-assigned">ASSIGNED</span>
                    <span className="lifecycle-arrow">→</span>
                    <span className="lifecycle-badge-collected">COLLECTED</span>
                    <span className="lifecycle-arrow">→</span>
                    <span className="lifecycle-badge-completed">COMPLETED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem + Solution Section */}
      <section className="py-5 bg-white border-bottom">
        <div className="container py-2">
          <div className="text-center mb-4">
            <span className="section-eyebrow">PURPOSE & OBJECTIVE</span>
            <h2 className="fw-bold text-dark-forest mt-1 fs-3">THE PROBLEM → THE SOLUTION</h2>
            <p className="text-secondary-readable small">Clear disposal guidance and intelligent collection coordination</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="wc-card p-4 h-100 border-start border-4 border-warning">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-exclamation-triangle-fill text-warning fs-4"></i>
                  <h5 className="fw-bold mb-0 text-dark-primary">THE PROBLEM</h5>
                </div>
                <p className="text-secondary-readable small mb-2" style={{ lineHeight: '1.6' }}>
                  Residents often lack clear guidance for proper waste segregation and preparation.
                </p>
                <p className="text-secondary-readable small mb-0" style={{ lineHeight: '1.6' }}>
                  Collection teams face unorganized pickup requests and difficulty prioritizing and grouping collections.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="wc-card p-4 h-100 border-start border-4 border-emerald">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-check-circle-fill text-emerald fs-4"></i>
                  <h5 className="fw-bold mb-0 text-dark-primary">THE SOLUTION</h5>
                </div>
                <p className="text-secondary-readable small mb-0" style={{ lineHeight: '1.6' }}>
                  WasteConnect provides a centralized platform for disposal guidance, pickup scheduling, request tracking and intelligent collection management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="py-5 bg-light border-bottom">
        <div className="container py-2">
          <div className="text-center mb-5">
            <span className="section-eyebrow">SIMPLE WORKFLOW</span>
            <h2 className="fw-bold text-dark-forest mt-1 fs-3">HOW IT WORKS</h2>
            <p className="text-secondary-readable small">Six organized steps connecting residents and municipal collection crews.</p>
          </div>

          <div className="row g-3 justify-content-center text-center">
            {[
              { num: '01', title: 'SELECT WASTE', desc: 'Choose Category' },
              { num: '02', title: 'DISPOSAL GUIDANCE', desc: 'Read DOs / DON\'Ts' },
              { num: '03', title: 'SCHEDULE PICKUP', desc: 'Address & Date' },
              { num: '04', title: 'SUBMIT REQUEST', desc: 'Zone & Priority' },
              { num: '05', title: 'TRACK STATUS', desc: 'Live Stepper' },
              { num: '06', title: 'COLLECTION COMPLETE', desc: 'Impact Logged' },
            ].map((step, idx) => (
              <div key={idx} className="col-6 col-md-4 col-lg-2">
                <div className="wc-card p-3 h-100">
                  <div className="step-number-circle">{step.num}</div>
                  <h6 className="fw-bold text-dark-primary mb-1 extra-small">{step.title}</h6>
                  <span className="text-secondary-readable extra-small">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Smart Collection Intelligence Section */}
      <section className="py-5 bg-dark-forest text-white">
        <div className="container py-2">
          <div className="text-center mb-5">
            <span
              className="badge mb-2"
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.25)',
                color: '#D1FAE5',
                border: '1px solid #10B981',
                fontWeight: 600,
                fontSize: '13px',
                padding: '5px 12px',
                letterSpacing: '0.04em',
              }}
            >
              RULE-BASED INTELLIGENCE
            </span>
            <h2 className="fw-bold text-white mt-1 fs-3">SMART COLLECTION INTELLIGENCE</h2>
            <p className="text-light opacity-90 small">Rule-Based Intelligence for Organized Collection Management</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="wc-card p-4 h-100 text-dark">
                <div className="feature-icon-box">
                  <i className="bi bi-journal-check"></i>
                </div>
                <h5 className="fw-bold mb-2 fs-6 text-dark-primary">SMART DISPOSAL GUIDANCE</h5>
                <p className="text-secondary-readable small mb-0">
                  Material-specific DOs, DON'Ts, safety notes and environmental guidance.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="wc-card p-4 h-100 text-dark">
                <div className="feature-icon-box">
                  <i className="bi bi-shield-exclamation"></i>
                </div>
                <h5 className="fw-bold mb-2 fs-6 text-dark-primary">EXPLAINABLE PRIORITY</h5>
                <p className="text-secondary-readable small mb-0">
                  Transparent LOW / MEDIUM / HIGH priority scoring with visible reasons.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="wc-card p-4 h-100 text-dark">
                <div className="feature-icon-box">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <h5 className="fw-bold mb-2 fs-6 text-dark-primary">COLLECTION ZONES</h5>
                <p className="text-secondary-readable small mb-0">
                  Pickup addresses organized into operational Zone A–D groups.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="wc-card p-4 h-100 text-dark">
                <div className="feature-icon-box">
                  <i className="bi bi-layers-half"></i>
                </div>
                <h5 className="fw-bold mb-2 fs-6 text-dark-primary">SMART COLLECTION BATCHING</h5>
                <p className="text-secondary-readable small mb-0">
                  Active requests grouped by collection zone and pickup date.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="wc-card p-4 h-100 text-dark">
                <div className="feature-icon-box">
                  <i className="bi bi-tree"></i>
                </div>
                <h5 className="fw-bold mb-2 fs-6 text-dark-primary">ENVIRONMENTAL IMPACT</h5>
                <p className="text-secondary-readable small mb-0">
                  Estimated diverted waste weight and collection completion analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. User + Admin Platform Capabilities */}
      <section className="py-5 bg-white border-bottom">
        <div className="container py-2">
          <div className="text-center mb-5">
            <span className="section-eyebrow">ROLES & INTERFACES</span>
            <h2 className="fw-bold text-dark-forest mt-1 fs-3">USER & ADMIN PORTALS</h2>
            <p className="text-secondary-readable small">Tailored interfaces designed for residents and municipal collection managers.</p>
          </div>

          <div className="row g-4">
            {/* User Portal Card */}
            <div className="col-md-6">
              <div className="wc-card p-4 h-100 border-top border-4 border-emerald">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-person-circle text-emerald fs-4"></i>
                  <h5 className="fw-bold text-dark-primary mb-0">RESIDENT USER</h5>
                </div>
                <ul className="list-unstyled text-secondary-readable small d-flex flex-column gap-2 mb-0">
                  <li><i className="bi bi-check2 text-emerald me-2 fw-bold"></i>Registration & Login</li>
                  <li><i className="bi bi-check2 text-emerald me-2 fw-bold"></i>Waste Categories Directory</li>
                  <li><i className="bi bi-check2 text-emerald me-2 fw-bold"></i>Disposal Guidance Protocol</li>
                  <li><i className="bi bi-check2 text-emerald me-2 fw-bold"></i>Pickup Scheduling</li>
                  <li><i className="bi bi-check2 text-emerald me-2 fw-bold"></i>Request Tracking Stepper</li>
                  <li><i className="bi bi-check2 text-emerald me-2 fw-bold"></i>Pickup History</li>
                  <li><i className="bi bi-check2 text-emerald me-2 fw-bold"></i>Request Cancellation</li>
                </ul>
              </div>
            </div>

            {/* Admin Portal Card */}
            <div className="col-md-6">
              <div className="wc-card p-4 h-100 border-top border-4 border-dark-forest">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-shield-lock-fill text-dark-forest fs-4"></i>
                  <h5 className="fw-bold text-dark-primary mb-0">ADMIN OPERATIONS</h5>
                </div>
                <ul className="list-unstyled text-secondary-readable small d-flex flex-column gap-2 mb-0">
                  <li><i className="bi bi-check2 text-emerald me-2 fw-bold"></i>Operations Dashboard</li>
                  <li><i className="bi bi-check2 text-emerald me-2 fw-bold"></i>Request Queue Management</li>
                  <li><i className="bi bi-check2 text-emerald me-2 fw-bold"></i>Search & Multi-Filter Controls</li>
                  <li><i className="bi bi-check2 text-emerald me-2 fw-bold"></i>Priority Management Engine</li>
                  <li><i className="bi bi-check2 text-emerald me-2 fw-bold"></i>Collection Zones Allocation</li>
                  <li><i className="bi bi-check2 text-emerald me-2 fw-bold"></i>Smart Batching Algorithm</li>
                  <li><i className="bi bi-check2 text-emerald me-2 fw-bold"></i>Environmental Impact Analytics</li>
                  <li><i className="bi bi-check2 text-emerald me-2 fw-bold"></i>Forward Status Progression</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Request Lifecycle Section */}
      <section className="py-5 bg-light border-bottom">
        <div className="container py-2">
          <div className="text-center mb-4">
            <span className="section-eyebrow">OPERATIONAL TIMELINE</span>
            <h2 className="fw-bold text-dark-forest mt-1 fs-3">REQUEST LIFECYCLE</h2>
            <p className="text-secondary-readable small">Strict forward progression with cancellation guard.</p>
          </div>

          <div className="wc-card p-4 p-md-5 bg-white">
            <div className="timeline-stepper my-3">
              <div className="timeline-progress" style={{ width: '100%' }}></div>
              {[
                { label: 'SUBMITTED' },
                { label: 'REVIEWED' },
                { label: 'SCHEDULED' },
                { label: 'ASSIGNED' },
                { label: 'COLLECTED' },
                { label: 'COMPLETED' },
              ].map((st, i) => (
                <div key={i} className="timeline-step completed">
                  <div className="timeline-circle">{i + 1}</div>
                  <div className="timeline-label">{st.label}</div>
                </div>
              ))}
            </div>

            <div
              className="p-3 rounded-3 text-center max-w-700 mx-auto mt-4"
              style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}
            >
              <span className="badge bg-danger text-white me-2">CANCELLATION</span>
              <span className="small fw-medium" style={{ color: '#991B1B' }}>
                <code>SUBMITTED</code> or <code>REVIEWED</code> requests can be safely cancelled before collection assignment.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Waste Category Guidance Exploration Directory */}
      <section id="disposal-guidance" className="py-5 bg-white border-bottom">
        <div className="container py-2">
          <div className="text-center mb-5">
            <span className="section-eyebrow">MATERIAL DIRECTORY</span>
            <h2 className="fw-bold text-dark-forest mt-1 fs-3">Responsible Disposal Guidelines</h2>
            <p className="text-secondary-readable small">Select any waste category below to review official preparation rules.</p>
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
                      <h5 className="fw-bold mb-0 text-dark-primary">{selectedCategory.name} Category</h5>
                      <span className="badge bg-light text-dark border extra-small">Official Guidance</span>
                    </div>
                  </div>

                  <h6 className="fw-bold text-dark-primary mb-2 extra-small text-uppercase tracking-wider">Category Overview</h6>
                  <p className="text-secondary-readable small mb-3">{selectedCategory.description}</p>

                  <div className="guidance-box mb-4">
                    <h6 className="fw-bold text-emerald mb-2 extra-small text-uppercase">
                      <i className="bi bi-info-circle-fill me-2"></i>Preparation Protocol:
                    </h6>
                    <p className="mb-0 text-dark-primary fw-medium small">
                      "{selectedCategory.disposalGuidance}"
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <span className="small text-secondary-readable">Ready to schedule a pickup?</span>
                    <Link to="/requests/new" className="btn btn-emerald btn-sm px-4 fw-semibold">
                      Schedule {selectedCategory.name} Pickup
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="wc-card p-4 h-100 d-flex align-items-center justify-content-center text-secondary-readable small">
                  Select a category on the left to view guidance.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Product Technology Stack */}
      <section className="py-5 bg-light border-bottom">
        <div className="container py-2">
          <div className="text-center mb-4">
            <span className="section-eyebrow">ENGINEERING STACK</span>
            <h2 className="fw-bold text-dark-forest mt-1 fs-3">BUILT WITH MODERN TECHNOLOGY</h2>
          </div>

          <div className="row g-3 text-center justify-content-center max-w-900 mx-auto">
            {[
              'React 18',
              'Vite',
              'React Router',
              'Bootstrap 5',
              'Node.js',
              'Express.js',
              'MongoDB',
              'Mongoose',
              'JWT',
              'bcryptjs',
              'Docker',
              'Render',
            ].map((tech, idx) => (
              <div key={idx} className="col-4 col-sm-3 col-md-2">
                <div className="p-2.5 bg-white rounded-3 border text-dark-primary fw-bold extra-small shadow-sm">
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA Section */}
      <section className="py-5 bg-white">
        <div className="container py-3">
          <div className="bg-dark-forest p-4 p-md-5 rounded-4 text-center text-white shadow max-w-900 mx-auto">
            <h3 className="fw-bold mb-2 text-white">Ready to make waste collection more organized?</h3>
            <p className="text-light opacity-90 small mb-4">Request. Track. Collect.</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/requests/new" className="btn btn-emerald px-4 fw-semibold">
                Request a Pickup
              </Link>
              <Link to="/features" className="btn btn-outline-light px-4 fw-semibold">
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

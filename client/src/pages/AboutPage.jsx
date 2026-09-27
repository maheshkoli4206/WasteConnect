import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'WasteConnect | About Us';
  }, []);

  return (
    <div className="fade-in-ui py-5">
      <div className="container">
        {/* Header Hero */}
        <div className="text-center mb-5 max-w-800 mx-auto">
          <span className="badge bg-emerald bg-opacity-20 text-emerald border border-emerald border-opacity-30 px-3 py-1.5 rounded-pill mb-3 fw-semibold small">
            ABOUT WASTECONNECT
          </span>
          <h1 className="fw-extrabold text-dark mb-3">Smart Waste Collection & Recycling</h1>
          <p className="lead text-secondary fs-6">
            WasteConnect is a full-stack web platform designed to make waste collection more organized by connecting disposal guidance, pickup scheduling, request tracking, and collection management in one centralized workflow.
          </p>
        </div>

        {/* Problem & Solution Grid */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="wc-card p-4 h-100 border-start border-4 border-warning">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-exclamation-triangle-fill text-warning fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark">The Challenge</h4>
              </div>
              <p className="text-secondary small mb-3">
                Urban waste management often struggles with unorganized residential requests, lack of proper disposal guidance, and inefficient pickup routing.
              </p>
              <ul className="text-secondary small mb-0 ps-3">
                <li className="mb-2">Residents lack clear instructions on segregating hazardous and e-waste.</li>
                <li className="mb-2">Collection teams face unorganized pickup queues without priority awareness.</li>
                <li className="mb-0">Municipalities struggle to measure recycled volume and collection completion rates.</li>
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="wc-card p-4 h-100 border-start border-4 border-emerald">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-check-circle-fill text-emerald fs-4"></i>
                <h4 className="fw-bold mb-0 text-dark">The Solution</h4>
              </div>
              <p className="text-secondary small mb-3">
                WasteConnect provides a unified operational platform bridging residents and collection managers with rule-based collection intelligence.
              </p>
              <ul className="text-secondary small mb-0 ps-3">
                <li className="mb-2">Material-specific preparation guidance for 8 major waste categories.</li>
                <li className="mb-2">Server-calculated priority scoring based on toxicity, volume, and urgency.</li>
                <li className="mb-0">Automatic sector zone allocation, batching, and environmental impact metrics.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Our Approach (3 Cards) */}
        <div className="text-center mb-4">
          <span className="text-emerald fw-bold text-uppercase tracking-wider small">OPERATIONAL MODEL</span>
          <h2 className="fw-bold text-dark mt-1">Our Approach</h2>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="wc-card p-4 h-100 text-center">
              <div className="feature-icon-box mx-auto">
                <i className="bi bi-book"></i>
              </div>
              <h5 className="fw-bold text-dark mb-2 fs-6">GUIDE</h5>
              <p className="text-secondary small mb-0">
                Provide clear, material-specific disposal guidelines, DOs, and DON'Ts before request creation to prevent contamination.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="wc-card p-4 h-100 text-center">
              <div className="feature-icon-box mx-auto">
                <i className="bi bi-diagram-3"></i>
              </div>
              <h5 className="fw-bold text-dark mb-2 fs-6">ORGANIZE</h5>
              <p className="text-secondary small mb-0">
                Structure incoming pickup requests using automated priority scoring, zone allocation, and date-based batching.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="wc-card p-4 h-100 text-center">
              <div className="feature-icon-box mx-auto">
                <i className="bi bi-activity"></i>
              </div>
              <h5 className="fw-bold text-dark mb-2 fs-6">TRACK</h5>
              <p className="text-secondary small mb-0">
                Deliver full transparency with a 6-stage request stepper lifecycle from submission to collection completion.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack Grid */}
        <div className="wc-card p-4 p-md-5 mb-5 bg-white">
          <div className="text-center mb-4">
            <span className="text-emerald fw-bold text-uppercase tracking-wider small">VERIFIED STACK</span>
            <h3 className="fw-bold text-dark mt-1">Technology Architecture</h3>
            <p className="text-muted small">Built with robust modern web engineering tools.</p>
          </div>

          <div className="row g-3 text-center justify-content-center">
            {[
              { name: 'React 18', type: 'Frontend Core' },
              { name: 'Vite', type: 'Build Tooling' },
              { name: 'React Router', type: 'SPA Navigation' },
              { name: 'Bootstrap 5', type: 'UI Component Grid' },
              { name: 'Node.js', type: 'Runtime Engine' },
              { name: 'Express.js', type: 'REST API Framework' },
              { name: 'MongoDB', type: 'Document Store' },
              { name: 'Mongoose', type: 'ODM Schema Modeling' },
              { name: 'JWT', type: 'Stateless Auth' },
              { name: 'bcryptjs', type: 'Password Hashing' },
              { name: 'Docker', type: 'Containerization' },
              { name: 'Render', type: 'Cloud Hosting' },
            ].map((tech, idx) => (
              <div key={idx} className="col-6 col-sm-4 col-md-3">
                <div className="p-3 rounded-3 bg-light border text-start">
                  <div className="fw-bold text-dark small">{tech.name}</div>
                  <div className="extra-small text-muted">{tech.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="bg-dark-forest p-4 p-md-5 rounded-4 text-center text-white shadow">
          <h3 className="fw-bold mb-2">Ready to streamline your waste disposal?</h3>
          <p className="text-light opacity-90 small mb-4">Schedule a pickup or explore guidelines for responsible recycling.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/requests/new" className="btn btn-emerald px-4 fw-semibold">
              Request Pickup
            </Link>
            <Link to="/features" className="btn btn-outline-light px-4 fw-semibold">
              Explore Features
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

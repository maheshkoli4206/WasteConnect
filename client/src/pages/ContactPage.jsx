import React, { useEffect } from 'react';

const ContactPage = () => {
  useEffect(() => {
    document.title = 'WasteConnect | Contact Us';
  }, []);

  return (
    <div className="fade-in-ui py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 max-w-800 mx-auto">
          <span className="badge bg-emerald bg-opacity-20 text-emerald border border-emerald border-opacity-30 px-3 py-1.5 rounded-pill mb-3 fw-semibold small">
            GET IN TOUCH
          </span>
          <h1 className="fw-extrabold text-dark mb-3">Project & Platform Information</h1>
          <p className="lead text-secondary fs-6">
            For project verification, live demonstration, and code inspection, explore the official WasteConnect resources.
          </p>
        </div>

        <div className="row g-4 justify-content-center mb-5">
          <div className="col-md-6 col-lg-5">
            <div className="wc-card p-4 text-center h-100 border-top border-4 border-emerald">
              <div className="feature-icon-box mx-auto">
                <i className="bi bi-globe"></i>
              </div>
              <h5 className="fw-bold text-dark mb-2">Live Web Platform</h5>
              <p className="text-secondary small mb-3">Deployed production instance hosted on Render.</p>
              <a
                href="https://wasteconnect-bfno.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-emerald btn-sm px-4 fw-semibold"
              >
                Open Live Demo <i className="bi bi-box-arrow-up-right ms-1"></i>
              </a>
            </div>
          </div>

          <div className="col-md-6 col-lg-5">
            <div className="wc-card p-4 text-center h-100 border-top border-4 border-dark">
              <div className="feature-icon-box mx-auto bg-dark text-white">
                <i className="bi bi-github"></i>
              </div>
              <h5 className="fw-bold text-dark mb-2">GitHub Repository</h5>
              <p className="text-secondary small mb-3">Source code, Docker configuration, and documentation.</p>
              <a
                href="https://github.com/maheshkoli4206/WasteConnect"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark btn-sm px-4 fw-semibold rounded-pill"
              >
                View Repository <i className="bi bi-github ms-1"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Project Details Box */}
        <div className="wc-card p-4 p-md-5 bg-white max-w-800 mx-auto">
          <h5 className="fw-bold text-dark mb-3">
            <i className="bi bi-info-circle-fill text-emerald me-2"></i>Hackathon Project Information
          </h5>

          <div className="row g-3 text-secondary small">
            <div className="col-sm-6">
              <div className="p-3 bg-light rounded-3 border">
                <span className="text-muted d-block extra-small text-uppercase fw-bold">Project Name</span>
                <span className="fw-bold text-dark">WasteConnect</span>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="p-3 bg-light rounded-3 border">
                <span className="text-muted d-block extra-small text-uppercase fw-bold">Tagline</span>
                <span className="fw-bold text-dark">"Request. Track. Collect."</span>
              </div>
            </div>

            <div className="col-sm-12">
              <div className="p-3 bg-light rounded-3 border">
                <span className="text-muted d-block extra-small text-uppercase fw-bold">Hackathon Challenge</span>
                <span className="fw-bold text-dark">Smart Waste Collection & Recycling</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

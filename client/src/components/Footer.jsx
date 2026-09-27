import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-4 bg-dark text-light border-top border-secondary">
      <div className="container">
        <div className="row gy-3 align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
              <span className="fs-5">♻️</span>
              <span className="fw-bold text-success">WasteConnect</span>
              <span className="text-muted small">| Request. Track. Collect.</span>
            </div>
            <p className="text-muted small mb-0">
              Responsible waste disposal platform designed for efficient urban recycling and pickup tracking.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <span className="badge bg-secondary text-light me-2">Hackathon MVP</span>
            <span className="text-muted small">© {new Date().getFullYear()} WasteConnect Inc. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-4 bg-dark-forest text-light border-top border-emerald border-opacity-20">
      <div className="container">
        <div className="row gy-3 align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
              <span className="fs-5">♻️</span>
              <span className="fw-bold text-emerald">WasteConnect</span>
              <span className="text-light opacity-75 extra-small">| Request. Track. Collect.</span>
            </div>
            <p className="text-light opacity-75 extra-small mb-0">
              Responsible waste disposal platform designed for efficient municipal recycling and pickup tracking.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <span className="badge bg-emerald bg-opacity-20 text-emerald border border-emerald border-opacity-30 me-2 extra-small">
              Production Platform
            </span>
            <span className="text-light opacity-75 extra-small">© {new Date().getFullYear()} WasteConnect Inc. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

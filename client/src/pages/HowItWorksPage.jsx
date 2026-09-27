import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HowItWorksPage = () => {
  useEffect(() => {
    document.title = 'WasteConnect | How It Works';
  }, []);

  const workflowSteps = [
    { num: '1️⃣', title: 'SELECT WASTE', subtitle: 'Pick Category', desc: 'Choose from E-Waste, Hazardous, Glass, Organics, Plastics, Metals, Paper, or Bulk items.' },
    { num: '2️⃣', title: 'DISPOSAL GUIDANCE', subtitle: 'Review Rules', desc: 'Access preparation guidance, safety DOs & DON\'Ts, and contamination prevention notes.' },
    { num: '3️⃣', title: 'SCHEDULE PICKUP', subtitle: 'Set Date & Address', desc: 'Select preferred collection date, pickup address location, and describe items.' },
    { num: '4️⃣', title: 'SUBMIT REQUEST', subtitle: 'Rule-Based Scoring', desc: 'The system computes priority score (Low/Medium/High) and assigns municipal zone.' },
    { num: '5️⃣', title: 'TRACK STATUS', subtitle: '6-Stage Stepper', desc: 'Monitor request progress step-by-step from Submission to Review, Assignment & Collection.' },
    { num: '6️⃣', title: 'COMPLETED', subtitle: 'Impact Logged', desc: 'Collection complete. Diverted waste weight is added to environmental impact metrics.' },
  ];

  return (
    <div className="fade-in-ui py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 max-w-800 mx-auto">
          <span className="badge bg-emerald bg-opacity-20 text-emerald border border-emerald border-opacity-30 px-3 py-1.5 rounded-pill mb-3 fw-semibold small">
            END-TO-END WORKFLOW
          </span>
          <h1 className="fw-extrabold text-dark mb-3">How WasteConnect Works</h1>
          <p className="lead text-secondary fs-6">
            A transparent, connected 6-stage lifecycle for residents and municipal waste management teams.
          </p>
        </div>

        {/* 6 Step Visual Timeline Grid */}
        <div className="row g-4 mb-5">
          {workflowSteps.map((step, idx) => (
            <div key={idx} className="col-md-6 col-lg-4">
              <div className="wc-card p-4 h-100 position-relative">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="fs-2">{step.num}</span>
                  <span className="badge bg-light text-dark border extra-small">Step {idx + 1}</span>
                </div>
                <h5 className="fw-bold text-dark mb-1 fs-6">{step.title}</h5>
                <span className="text-emerald fw-semibold extra-small d-block mb-2">{step.subtitle}</span>
                <p className="text-secondary small mb-0">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Request Status Lifecycle Stepper Section */}
        <div className="wc-card p-4 p-md-5 mb-5 bg-white">
          <div className="text-center mb-4">
            <span className="text-emerald fw-bold text-uppercase tracking-wider small">STATUS TRANSITIONS</span>
            <h3 className="fw-bold text-dark mt-1">6-Stage Lifecycle Tracking</h3>
            <p className="text-muted small">Requests move strictly forward through verified operational states.</p>
          </div>

          <div className="timeline-stepper my-4">
            <div className="timeline-progress" style={{ width: '100%' }}></div>
            {[
              { label: 'SUBMITTED', bg: 'bg-info text-dark' },
              { label: 'REVIEWED', bg: 'bg-primary text-white' },
              { label: 'SCHEDULED', bg: 'bg-warning text-dark' },
              { label: 'ASSIGNED', bg: 'bg-secondary text-white' },
              { label: 'COLLECTED', bg: 'bg-success text-white' },
              { label: 'COMPLETED', bg: 'bg-success text-white' },
            ].map((st, i) => (
              <div key={i} className="timeline-step completed">
                <div className="timeline-circle">{i + 1}</div>
                <div className="timeline-label">{st.label}</div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-light rounded-3 border text-center max-w-700 mx-auto mt-4">
            <span className="badge bg-danger text-white me-2">CANCELLED STATE</span>
            <span className="text-secondary small">
              Requests in <code>SUBMITTED</code> or <code>REVIEWED</code> status can be cancelled by residents before assignment.
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-dark-forest p-4 p-md-5 rounded-4 text-center text-white shadow">
          <h3 className="fw-bold mb-2">Ready to schedule your first request?</h3>
          <p className="text-light opacity-90 small mb-4">Follow the simple workflow to submit and track your pickup.</p>

          <Link to="/requests/new" className="btn btn-emerald px-4 fw-semibold">
            Schedule Pickup Request <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;

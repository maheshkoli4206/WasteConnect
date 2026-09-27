import React from 'react';

const steps = [
  { id: 'SUBMITTED', label: 'Submitted' },
  { id: 'REVIEWED', label: 'Reviewed' },
  { id: 'SCHEDULED', label: 'Scheduled' },
  { id: 'ASSIGNED', label: 'Assigned' },
  { id: 'COLLECTED', label: 'Collected' },
  { id: 'COMPLETED', label: 'Completed' },
];

const StatusTimeline = ({ currentStatus }) => {
  if (currentStatus === 'CANCELLED') {
    return (
      <div className="alert alert-danger d-flex align-items-center mb-4 rounded-3 shadow-sm">
        <i className="bi bi-x-circle-fill fs-3 me-3"></i>
        <div>
          <h6 className="alert-heading fw-bold mb-0">Request Cancelled</h6>
          <p className="mb-0 small">This pickup request has been cancelled and is no longer active.</p>
        </div>
      </div>
    );
  }

  const currentIndex = steps.findIndex((step) => step.id === currentStatus);
  const progressPercent = currentIndex >= 0 ? (currentIndex / (steps.length - 1)) * 90 + 5 : 5;

  return (
    <div className="wc-card p-4 mb-4">
      <h6 className="fw-bold mb-3 text-emerald text-uppercase tracking-wider small">
        Request Progress Timeline
      </h6>
      <div className="timeline-stepper">
        <div
          className="timeline-progress"
          style={{ width: `${progressPercent}%` }}
        ></div>
        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;

          let stepClass = '';
          if (isActive) stepClass = 'active';
          else if (isCompleted) stepClass = 'completed';

          return (
            <div key={step.id} className={`timeline-step ${stepClass}`}>
              <div className="timeline-circle">
                {isCompleted ? '✓' : idx + 1}
              </div>
              <div className="timeline-label">{step.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;

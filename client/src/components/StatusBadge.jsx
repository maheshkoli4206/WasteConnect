import React from 'react';

const StatusBadge = ({ status }) => {
  const getBadgeStyle = (st) => {
    switch (st) {
      case 'SUBMITTED':
        return 'bg-info text-dark';
      case 'REVIEWED':
        return 'bg-primary text-white';
      case 'SCHEDULED':
        return 'bg-secondary text-white';
      case 'ASSIGNED':
        return 'bg-warning text-dark';
      case 'COLLECTED':
        return 'bg-teal text-white' || 'bg-info text-white';
      case 'COMPLETED':
        return 'bg-success text-white';
      case 'CANCELLED':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <span className={`badge ${getBadgeStyle(status)} px-2.5 py-1.5 fw-semibold rounded-pill`}>
      {status || 'UNKNOWN'}
    </span>
  );
};

export default StatusBadge;

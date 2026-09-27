import React from 'react';

const StatusBadge = ({ status }) => {
  const getBadgeStyle = (st) => {
    switch (st) {
      case 'SUBMITTED':
        return 'bg-info bg-opacity-20 text-dark border border-info border-opacity-30';
      case 'REVIEWED':
        return 'bg-primary bg-opacity-20 text-primary border border-primary border-opacity-30';
      case 'SCHEDULED':
        return 'bg-warning bg-opacity-20 text-dark border border-warning border-opacity-40';
      case 'ASSIGNED':
        return 'bg-dark bg-opacity-10 text-dark border border-secondary border-opacity-30';
      case 'COLLECTED':
        return 'bg-success bg-opacity-20 text-success border border-success border-opacity-30';
      case 'COMPLETED':
        return 'bg-success text-white';
      case 'CANCELLED':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <span className={`badge ${getBadgeStyle(status)} px-2.5 py-1 fw-semibold extra-small`}>
      {status || 'UNKNOWN'}
    </span>
  );
};

export default StatusBadge;

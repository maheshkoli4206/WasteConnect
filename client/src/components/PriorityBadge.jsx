import React from 'react';

const PriorityBadge = ({ priority, score }) => {
  const getStyle = (p) => {
    switch (p) {
      case 'HIGH':
        return 'bg-danger text-white';
      case 'MEDIUM':
        return 'bg-warning text-dark';
      case 'LOW':
        return 'bg-info text-dark';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <span className={`badge ${getStyle(priority)} px-2 py-1 fw-semibold`}>
      {priority || 'MEDIUM'}
      {score !== undefined && <span className="ms-1 opacity-75">({score} pts)</span>}
    </span>
  );
};

export default PriorityBadge;

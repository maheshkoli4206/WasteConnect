import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import StatusTimeline from '../components/StatusTimeline';

const RequestDetailsPage = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [categoryObj, setCategoryObj] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const [reqRes, catRes] = await Promise.all([
          api.get(`/requests/${id}`),
          api.get('/categories'),
        ]);

        setRequest(reqRes.data);

        const matchCat = catRes.data.find((c) => c.name === reqRes.data.wasteCategory);
        if (matchCat) {
          setCategoryObj(matchCat);
        }
      } catch (err) {
        console.error('Error fetching request details:', err);
        setError('Failed to load request details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleCancelRequest = async () => {
    if (!window.confirm('Are you sure you want to cancel this pickup request?')) {
      return;
    }

    try {
      setIsCancelling(true);
      const res = await api.patch(`/requests/${id}/cancel`);
      setRequest(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel request');
    } finally {
      setIsCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center text-muted">
        <div className="spinner-border text-emerald mb-2" role="status"></div>
        <div>Loading pickup details...</div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error || 'Request not found'}</div>
        <Link to="/my-requests" className="btn btn-emerald">
          Back to My Requests
        </Link>
      </div>
    );
  }

  const canCancel = ['SUBMITTED', 'REVIEWED'].includes(request.status);

  // Reasons list for priority explanation
  const priorityFactors =
    request.priorityReasons && request.priorityReasons.length > 0
      ? request.priorityReasons
      : (request.priorityReason || 'Standard category evaluation').split(' | ');

  return (
    <div className="container py-4">
      {/* Top Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="fs-4 fw-bold text-dark">{request.requestId}</span>
            <StatusBadge status={request.status} />
            <PriorityBadge priority={request.priority} score={request.priorityScore} />
          </div>
          <p className="text-muted small mb-0">
            Submitted on {new Date(request.createdAt).toLocaleDateString()} at{' '}
            {new Date(request.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <div className="mt-3 mt-md-0 d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-1"></i> Back
          </button>
          {canCancel && (
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleCancelRequest}
              disabled={isCancelling}
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Request'}
            </button>
          )}
        </div>
      </div>

      {/* Visual Timeline Stepper */}
      <StatusTimeline currentStatus={request.status} />

      {/* Details Grid */}
      <div className="row g-4">
        {/* Left Column: Pickup Information */}
        <div className="col-lg-7">
          <div className="wc-card p-4 h-100">
            <h5 className="fw-bold mb-3 text-dark border-bottom pb-2">
              Pickup Details
            </h5>

            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <span className="text-muted small d-block">Waste Category</span>
                <span className="fw-bold text-dark fs-6">{request.wasteCategory}</span>
              </div>
              <div className="col-sm-6">
                <span className="text-muted small d-block">Scheduled Pickup Date</span>
                <span className="fw-bold text-emerald fs-6">{request.pickupDate}</span>
              </div>
              <div className="col-sm-6">
                <span className="text-muted small d-block">Preferred Time Slot</span>
                <span className="fw-semibold text-dark">{request.pickupTime}</span>
              </div>
              <div className="col-sm-6">
                <span className="text-muted small d-block">Priority Level</span>
                <span className="fw-semibold text-dark">
                  {request.priority} ({request.priorityScore} pts)
                </span>
              </div>
            </div>

            <div className="mb-3">
              <span className="text-muted small d-block mb-1">Pickup Address Location</span>
              <div className="p-3 bg-light rounded-3 border fw-medium text-dark">
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                {request.pickupAddress}
              </div>
            </div>

            <div className="mb-3">
              <span className="text-muted small d-block mb-1">Item Description / Instructions</span>
              <div className="p-3 bg-light rounded-3 border text-secondary small">
                {request.description || 'No additional details provided.'}
              </div>
            </div>

            {request.adminNotes && (
              <div className="alert alert-info py-2 small mb-0">
                <strong>Collection Team Dispatch Note:</strong> {request.adminNotes}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Guidance & Smart Priority Rationale */}
        <div className="col-lg-5">
          {/* Smart Disposal Guidance Card */}
          <div className="wc-card p-4 mb-4 border-start border-4 border-emerald">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="fs-4">♻️</span>
              <h5 className="fw-bold text-emerald mb-0">Disposal Guidance</h5>
            </div>

            {categoryObj ? (
              <div>
                <p className="small text-dark mb-2 fw-medium">
                  "{categoryObj.disposalMethod || categoryObj.disposalGuidance}"
                </p>

                {categoryObj.dos && categoryObj.dos.length > 0 && (
                  <div className="mb-2">
                    <span className="small fw-bold text-success d-block mb-1">✓ Recommended DOs:</span>
                    <ul className="list-unstyled mb-0 small text-secondary ps-1">
                      {categoryObj.dos.slice(0, 2).map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {categoryObj.environmentalNote && (
                  <div className="alert alert-success py-1.5 px-2 mb-0 mt-2 small border-0 bg-success bg-opacity-10 text-success">
                    <i className="bi bi-tree me-1"></i> {categoryObj.environmentalNote}
                  </div>
                )}
              </div>
            ) : (
              <p className="small text-secondary mb-0">
                "{request.wasteCategory} items should be kept dry and separate from household trash."
              </p>
            )}
          </div>

          {/* Explainable Priority Card */}
          <div className="wc-card p-4">
            <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h5 className="fw-bold mb-0 text-dark">Why this priority?</h5>
              <PriorityBadge priority={request.priority} score={request.priorityScore} />
            </div>

            <div className="p-3 bg-light rounded-3 border">
              <span className="small text-muted fw-bold d-block mb-2 text-uppercase tracking-wider">
                Contributing Priority Factors:
              </span>
              <ul className="list-unstyled mb-0 small text-dark">
                {priorityFactors.map((factor, i) => (
                  <li key={i} className="mb-1.5 d-flex align-items-start gap-2">
                    <span className="text-emerald fw-bold">✓</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsPage;

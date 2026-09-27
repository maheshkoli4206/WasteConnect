import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import StatusTimeline from '../components/StatusTimeline';

const AdminRequestDetailsPage = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [categoryGuidance, setCategoryGuidance] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const [reqRes, catRes] = await Promise.all([
          api.get(`/admin/requests/${id}`),
          api.get('/categories'),
        ]);

        setRequest(reqRes.data);
        setStatus(reqRes.data.status);
        setPriority(reqRes.data.priority);
        setAdminNotes(reqRes.data.adminNotes || '');

        const matchCat = catRes.data.find((c) => c.name === reqRes.data.wasteCategory);
        if (matchCat) {
          setCategoryGuidance(matchCat.disposalGuidance);
        }
      } catch (err) {
        console.error('Error loading request details:', err);
        setError(err.response?.data?.message || 'Failed to load request details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      setSaving(true);
      const res = await api.patch(`/admin/requests/${id}/status`, {
        status,
        priority,
        adminNotes,
      });

      setRequest(res.data.request);
      setStatus(res.data.request.status);
      setPriority(res.data.request.priority);
      setMessage('Status updated successfully and saved to MongoDB!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update request status');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center text-muted">
        <div className="spinner-border text-emerald mb-2" role="status"></div>
        <div>Loading admin control panel...</div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error || 'Request not found'}</div>
        <Link to="/admin" className="btn btn-dark">
          Back to Admin Console
        </Link>
      </div>
    );
  }

  const isTerminal = ['COMPLETED', 'CANCELLED'].includes(request.status);

  return (
    <div className="container py-4">
      {/* Header Banner */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="fs-4 fw-bold text-dark">{request.requestId}</span>
            <StatusBadge status={request.status} />
            <PriorityBadge priority={request.priority} score={request.priorityScore} />
          </div>
          <p className="text-muted small mb-0">
            Resident User: <strong>{request.userId?.name || 'Resident'}</strong> ({request.userId?.email || 'N/A'})
          </p>
        </div>
        <div className="mt-3 mt-md-0">
          <button className="btn btn-outline-secondary btn-sm px-3" onClick={() => navigate('/admin')}>
            <i className="bi bi-arrow-left me-1"></i> Back to Requests Queue
          </button>
        </div>
      </div>

      {/* Dynamic Status Timeline Stepper */}
      <StatusTimeline currentStatus={request.status} />

      <div className="row g-4">
        {/* Left Column: Admin Status Update Form */}
        <div className="col-lg-6">
          <div className="wc-card p-4 h-100">
            <h5 className="fw-bold mb-3 text-dark border-bottom pb-2">
              <i className="bi bi-sliders me-2 text-emerald"></i>Update Collection Lifecycle Status
            </h5>

            {message && (
              <div className="alert alert-success py-2 small fw-medium d-flex align-items-center mb-3">
                <i className="bi bi-check-circle-fill me-2"></i>
                {message}
              </div>
            )}
            {error && (
              <div className="alert alert-danger py-2 small fw-medium d-flex align-items-center mb-3">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label fw-bold text-dark small text-uppercase tracking-wider">
                  Target Status Stage
                </label>
                <select
                  className="form-select py-2.5"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={isTerminal}
                >
                  <option value="SUBMITTED">SUBMITTED (Initial Submission)</option>
                  <option value="REVIEWED">REVIEWED (Verified by Ops)</option>
                  <option value="SCHEDULED">SCHEDULED (Truck Route Confirmed)</option>
                  <option value="ASSIGNED">ASSIGNED (Crew Dispatched)</option>
                  <option value="COLLECTED">COLLECTED (Picked up from site)</option>
                  <option value="COMPLETED">COMPLETED (Recycled & Processed)</option>
                  <option value="CANCELLED">CANCELLED (Rejected or Cancelled)</option>
                </select>
                {isTerminal && (
                  <small className="text-danger mt-1 d-block">
                    This request is in a terminal status ({request.status}) and cannot be altered further.
                  </small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold text-dark small text-uppercase tracking-wider">
                  Priority Override
                </label>
                <select
                  className="form-select py-2"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  disabled={isTerminal}
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH (Urgent Dispatch Required)</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold text-dark small text-uppercase tracking-wider">
                  Dispatch & Operations Notes
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="e.g. Assigned to EcoCrew #4. Driver Mark scheduled for morning route."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  disabled={isTerminal}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-emerald w-100 py-2.5 fw-bold shadow-sm"
                disabled={saving || isTerminal}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Persisting Status...
                  </>
                ) : (
                  'Update Request Status'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Complete Request Summary */}
        <div className="col-lg-6">
          <div className="wc-card p-4 mb-4">
            <h5 className="fw-bold mb-3 text-dark border-bottom pb-2">
              Request Information & Guidance
            </h5>

            <div className="row g-3 mb-3">
              <div className="col-6">
                <span className="text-muted small d-block">Waste Category</span>
                <span className="fw-bold text-dark fs-6">{request.wasteCategory}</span>
              </div>
              <div className="col-6">
                <span className="text-muted small d-block">Submission Timestamp</span>
                <span className="fw-medium text-dark small">
                  {new Date(request.createdAt).toLocaleDateString()} {new Date(request.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <div className="col-6">
                <span className="text-muted small d-block">Scheduled Pickup Date</span>
                <span className="fw-bold text-emerald">{request.pickupDate}</span>
              </div>
              <div className="col-6">
                <span className="text-muted small d-block">Time Window Slot</span>
                <span className="fw-semibold text-dark">{request.pickupTime}</span>
              </div>
            </div>

            <div className="mb-3">
              <span className="text-muted small d-block mb-1">Pickup Address Location</span>
              <div className="p-3 bg-light rounded-3 border fw-medium text-dark">
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                {request.pickupAddress}
              </div>
            </div>

            {categoryGuidance && (
              <div className="guidance-box mb-3">
                <h6 className="fw-bold text-emerald mb-1 small text-uppercase">
                  Official Guidance for {request.wasteCategory}:
                </h6>
                <p className="mb-0 text-dark small fw-medium">
                  "{categoryGuidance}"
                </p>
              </div>
            )}

            <div className="mb-0">
              <span className="text-muted small d-block mb-1">Resident Notes / Description</span>
              <div className="p-3 bg-light rounded-3 border text-secondary small">
                {request.description || 'No additional resident notes provided.'}
              </div>
            </div>
          </div>

          <div className="wc-card p-4 border-start border-4 border-warning">
            <h5 className="fw-bold mb-3 text-dark border-bottom pb-2">
              🧠 Smart Priority Analysis
            </h5>
            <div className="p-3 bg-light rounded-3 border">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <span className="small text-muted fw-bold d-block">Priority Rating</span>
                  <span className="fw-bold text-dark fs-5">{request.priority}</span>
                </div>
                <PriorityBadge priority={request.priority} score={request.priorityScore} />
              </div>

              <span className="small text-muted fw-bold d-block mb-2 text-uppercase tracking-wider">
                Why was this priority assigned?
              </span>
              <ul className="list-unstyled mb-0 small text-dark">
                {(request.priorityReasons && request.priorityReasons.length > 0
                  ? request.priorityReasons
                  : (request.priorityReason || 'Standard processing priority').split(' | ')
                ).map((reason, idx) => (
                  <li key={idx} className="mb-1.5 d-flex align-items-start gap-2">
                    <span className="text-success fw-bold">✓</span>
                    <span>{reason}</span>
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

export default AdminRequestDetailsPage;

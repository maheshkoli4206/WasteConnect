import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        setLoading(true);
        const res = await api.get('/requests/my');
        setRequests(res.data);
      } catch (err) {
        console.error('Error loading requests:', err);
        setError('Failed to load your pickup requests');
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, []);

  // Compute live statistics from real DB data
  const totalRequests = requests.length;
  const activeRequests = requests.filter((r) =>
    ['SUBMITTED', 'REVIEWED', 'SCHEDULED', 'ASSIGNED'].includes(r.status)
  ).length;
  const completedRequests = requests.filter((r) =>
    ['COLLECTED', 'COMPLETED'].includes(r.status)
  ).length;
  const cancelledRequests = requests.filter((r) => r.status === 'CANCELLED').length;

  const recentRequests = requests.slice(0, 5);

  return (
    <div className="container py-4">
      {/* Header Banner */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center bg-white p-4 rounded-4 shadow-sm border mb-4">
        <div>
          <span className="badge bg-emerald bg-opacity-10 text-emerald mb-2 fw-semibold">
            Resident Portal
          </span>
          <h2 className="fw-bold mb-1 text-dark">Welcome back, {user?.name || 'Resident'}!</h2>
          <p className="text-muted mb-0 small">
            Track active waste collections and schedule new pickups for your location.
          </p>
        </div>
        <div className="mt-3 mt-md-0">
          <Link to="/requests/new" className="btn btn-emerald px-4 shadow-sm fw-semibold">
            <i className="bi bi-plus-lg me-2"></i>Request Pickup
          </Link>
        </div>
      </div>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      {/* Real Statistics Grid (4 Cards) */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="wc-card p-3 border-start border-4 border-primary">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted small fw-semibold text-uppercase tracking-wider">
                  Total
                </span>
                <h3 className="stat-card-badge text-primary mb-0 mt-1">{totalRequests}</h3>
              </div>
              <div className="feature-icon-box bg-primary bg-opacity-10 text-primary mb-0 d-none d-sm-flex">
                <i className="bi bi-archive-fill"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="wc-card p-3 border-start border-4 border-warning">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted small fw-semibold text-uppercase tracking-wider">
                  Active
                </span>
                <h3 className="stat-card-badge text-warning mb-0 mt-1">{activeRequests}</h3>
              </div>
              <div className="feature-icon-box bg-warning bg-opacity-10 text-warning mb-0 d-none d-sm-flex">
                <i className="bi bi-clock-history"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="wc-card p-3 border-start border-4 border-success">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted small fw-semibold text-uppercase tracking-wider">
                  Completed
                </span>
                <h3 className="stat-card-badge text-success mb-0 mt-1">{completedRequests}</h3>
              </div>
              <div className="feature-icon-box bg-success bg-opacity-10 text-success mb-0 d-none d-sm-flex">
                <i className="bi bi-check-circle-fill"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="wc-card p-3 border-start border-4 border-danger">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted small fw-semibold text-uppercase tracking-wider">
                  Cancelled
                </span>
                <h3 className="stat-card-badge text-danger mb-0 mt-1">{cancelledRequests}</h3>
              </div>
              <div className="feature-icon-box bg-danger bg-opacity-10 text-danger mb-0 d-none d-sm-flex">
                <i className="bi bi-x-circle-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Requests Section */}
      <div className="wc-card p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="fw-bold mb-0 text-dark">Recent Pickup Requests</h5>
            <span className="text-muted small">Real-time status updates from collection teams</span>
          </div>
          <Link to="/my-requests" className="btn btn-outline-emerald btn-sm">
            View All Requests ({totalRequests})
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5 text-muted">
            <div className="spinner-border text-emerald mb-2" role="status"></div>
            <div>Loading your request history...</div>
          </div>
        ) : recentRequests.length === 0 ? (
          <div className="text-center py-5 bg-light rounded-3 border">
            <span className="fs-1">📦</span>
            <h6 className="fw-bold mt-2 text-dark">No Pickup Requests Found</h6>
            <p className="text-muted small mb-3">You have not created any waste pickup requests yet.</p>
            <Link to="/requests/new" className="btn btn-emerald btn-sm">
              Create Your First Request
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Request ID</th>
                  <th>Waste Category</th>
                  <th>Scheduled Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req._id}>
                    <td>
                      <span className="fw-bold text-dark">{req.requestId}</span>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {req.wasteCategory}
                      </span>
                    </td>
                    <td>
                      <div className="small text-dark fw-medium">{req.pickupDate}</div>
                      <div className="small text-muted">{req.pickupTime}</div>
                    </td>
                    <td>
                      <PriorityBadge priority={req.priority} score={req.priorityScore} />
                    </td>
                    <td>
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="text-end">
                      <Link
                        to={`/requests/${req._id}`}
                        className="btn btn-outline-secondary btn-sm"
                      >
                        Details <i className="bi bi-chevron-right ms-1"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

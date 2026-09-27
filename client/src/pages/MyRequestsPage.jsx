import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

const MyRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await api.get('/requests/my');
        setRequests(res.data);
      } catch (err) {
        console.error('Error fetching user requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((req) => {
    // Status tab filter
    if (filterStatus === 'ACTIVE') {
      if (!['SUBMITTED', 'REVIEWED', 'SCHEDULED', 'ASSIGNED'].includes(req.status)) return false;
    } else if (filterStatus === 'COMPLETED') {
      if (!['COLLECTED', 'COMPLETED'].includes(req.status)) return false;
    } else if (filterStatus === 'CANCELLED') {
      if (req.status !== 'CANCELLED') return false;
    }

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchId = req.requestId.toLowerCase().includes(term);
      const matchCat = req.wasteCategory.toLowerCase().includes(term);
      const matchAddr = req.pickupAddress.toLowerCase().includes(term);
      return matchId || matchCat || matchAddr;
    }

    return true;
  });

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">My Pickup Requests</h2>
          <p className="text-muted small mb-0">Track status updates and history of your waste collection requests.</p>
        </div>
        <div className="mt-3 mt-md-0">
          <Link to="/requests/new" className="btn btn-emerald px-4 shadow-sm">
            <i className="bi bi-plus-lg me-2"></i>New Pickup Request
          </Link>
        </div>
      </div>

      <div className="wc-card p-4">
        {/* Filters and Search Toolbar */}
        <div className="row g-3 mb-4 align-items-center">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search by Request ID, category, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="btn-group w-100" role="group">
              <button
                type="button"
                className={`btn btn-sm ${filterStatus === 'ALL' ? 'btn-emerald' : 'btn-outline-secondary'}`}
                onClick={() => setFilterStatus('ALL')}
              >
                All ({requests.length})
              </button>
              <button
                type="button"
                className={`btn btn-sm ${filterStatus === 'ACTIVE' ? 'btn-emerald' : 'btn-outline-secondary'}`}
                onClick={() => setFilterStatus('ACTIVE')}
              >
                Active
              </button>
              <button
                type="button"
                className={`btn btn-sm ${filterStatus === 'COMPLETED' ? 'btn-emerald' : 'btn-outline-secondary'}`}
                onClick={() => setFilterStatus('COMPLETED')}
              >
                Completed
              </button>
              <button
                type="button"
                className={`btn btn-sm ${filterStatus === 'CANCELLED' ? 'btn-emerald' : 'btn-outline-secondary'}`}
                onClick={() => setFilterStatus('CANCELLED')}
              >
                Cancelled
              </button>
            </div>
          </div>
        </div>

        {/* Requests List */}
        {loading ? (
          <div className="text-center py-5 text-muted">
            <div className="spinner-border text-emerald mb-2" role="status"></div>
            <div>Loading requests...</div>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-5 bg-light rounded-3 border">
            <span className="fs-1">🔍</span>
            <h6 className="fw-bold mt-2 text-dark">No Requests Found</h6>
            <p className="text-muted small mb-0">Try changing your search terms or filter tab.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Request ID</th>
                  <th>Category</th>
                  <th>Pickup Address</th>
                  <th>Date & Slot</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
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
                      <span className="small text-secondary text-truncate d-inline-block" style={{ maxWidth: '200px' }}>
                        {req.pickupAddress}
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
                        className="btn btn-outline-emerald btn-sm"
                      >
                        Track & Details
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

export default MyRequestsPage;

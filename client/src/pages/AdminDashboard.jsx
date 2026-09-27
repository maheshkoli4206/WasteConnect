import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [zones, setZones] = useState([]);
  const [batches, setBatches] = useState([]);
  const [impact, setImpact] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [zoneFilter, setZoneFilter] = useState('');
  const [sortBy, setSortBy] = useState('priority');

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [statsRes, zonesRes, batchesRes, impactRes, requestsRes] = await Promise.all([
        api.get('/admin/statistics'),
        api.get('/admin/zones'),
        api.get('/admin/batches'),
        api.get('/admin/impact'),
        api.get('/admin/requests', {
          params: {
            search,
            category: categoryFilter,
            status: statusFilter,
            priority: priorityFilter,
            zone: zoneFilter,
            sortBy,
          },
        }),
      ]);

      setStats(statsRes.data);
      setZones(zonesRes.data.zones || []);
      setBatches(batchesRes.data.batches || []);
      setImpact(impactRes.data);
      setRequests(requestsRes.data);
    } catch (err) {
      console.error('Error loading admin dashboard:', err);
      setErrorMsg(err.response?.data?.message || 'Failed to fetch admin operations data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [search, categoryFilter, statusFilter, priorityFilter, zoneFilter, sortBy]);

  const handleStatusChange = async (requestId, newStatus) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      setUpdatingId(requestId);
      await api.patch(`/admin/requests/${requestId}/status`, { status: newStatus });
      setSuccessMsg(`Request status updated to ${newStatus}`);
      fetchAdminData();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategoryFilter('');
    setStatusFilter('');
    setPriorityFilter('');
    setZoneFilter('');
    setSortBy('priority');
  };

  return (
    <div className="container-fluid px-lg-5 py-4">
      {/* Header Banner */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center bg-dark text-white p-4 rounded-4 shadow mb-4">
        <div>
          <span className="badge bg-warning text-dark mb-2 fw-bold">Admin Operations Console</span>
          <h2 className="fw-bold mb-1">Smart Collection Operations & Intelligence</h2>
          <p className="text-muted small mb-0">
            Zone intelligence, collection batching, environmental impact, and real-time request queue.
          </p>
        </div>
        <div className="mt-3 mt-md-0 d-flex gap-2">
          <button className="btn btn-outline-light btn-sm px-3" onClick={fetchAdminData}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh Data
          </button>
        </div>
      </div>

      {/* Alert Banners */}
      {errorMsg && (
        <div className="alert alert-danger py-2 small fw-medium alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {errorMsg}
          <button type="button" className="btn-close py-2" onClick={() => setErrorMsg('')}></button>
        </div>
      )}

      {successMsg && (
        <div className="alert alert-success py-2 small fw-medium alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle-fill me-2"></i>
          {successMsg}
          <button type="button" className="btn-close py-2" onClick={() => setSuccessMsg('')}></button>
        </div>
      )}

      {/* 1. Global Metrics Summary */}
      {stats && (
        <div className="row g-2 mb-4">
          <div className="col-6 col-sm-4 col-md-3 col-xl-1.5 flex-fill">
            <div className="wc-card p-3 border-start border-4 border-primary">
              <span className="text-muted small fw-semibold text-uppercase d-block text-truncate">Total</span>
              <h3 className="fw-extrabold text-primary mb-0 mt-1">{stats.totalRequests}</h3>
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-xl-1.5 flex-fill">
            <div className="wc-card p-3 border-start border-4 border-info">
              <span className="text-muted small fw-semibold text-uppercase d-block text-truncate">Submitted</span>
              <h3 className="fw-extrabold text-info mb-0 mt-1">{stats.submittedCount || 0}</h3>
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-xl-1.5 flex-fill">
            <div className="wc-card p-3 border-start border-4 border-secondary">
              <span className="text-muted small fw-semibold text-uppercase d-block text-truncate">Reviewed</span>
              <h3 className="fw-extrabold text-secondary mb-0 mt-1">{stats.reviewedCount || 0}</h3>
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-xl-1.5 flex-fill">
            <div className="wc-card p-3 border-start border-4 border-purple" style={{ borderLeftColor: '#8b5cf6' }}>
              <span className="text-muted small fw-semibold text-uppercase d-block text-truncate">Scheduled</span>
              <h3 className="fw-extrabold mb-0 mt-1" style={{ color: '#8b5cf6' }}>{stats.scheduledCount || 0}</h3>
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-xl-1.5 flex-fill">
            <div className="wc-card p-3 border-start border-4 border-warning">
              <span className="text-muted small fw-semibold text-uppercase d-block text-truncate">Assigned</span>
              <h3 className="fw-extrabold text-warning mb-0 mt-1">{stats.assignedCount || 0}</h3>
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-xl-1.5 flex-fill">
            <div className="wc-card p-3 border-start border-4 border-teal" style={{ borderLeftColor: '#0d9488' }}>
              <span className="text-muted small fw-semibold text-uppercase d-block text-truncate">Collected</span>
              <h3 className="fw-extrabold mb-0 mt-1" style={{ color: '#0d9488' }}>{stats.collectedCount || 0}</h3>
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-xl-1.5 flex-fill">
            <div className="wc-card p-3 border-start border-4 border-success">
              <span className="text-muted small fw-semibold text-uppercase d-block text-truncate">Completed</span>
              <h3 className="fw-extrabold text-success mb-0 mt-1">{stats.completedCount || 0}</h3>
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-xl-1.5 flex-fill">
            <div className="wc-card p-3 border-start border-4 border-danger">
              <span className="text-muted small fw-semibold text-uppercase d-block text-truncate">High Priority</span>
              <h3 className="fw-extrabold text-danger mb-0 mt-1">{stats.highPriorityRequests}</h3>
            </div>
          </div>
        </div>
      )}

      {/* High Priority Banner Alert */}
      {stats && stats.highPriorityRequests > 0 && (
        <div className="alert alert-danger mb-4 rounded-3 shadow-sm p-3.5 border-danger">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-2">
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-exclamation-triangle-fill fs-2 text-danger"></i>
              <div>
                <h6 className="fw-bold mb-0 text-dark">
                  🚨 High Priority Collection Alerts ({stats.highPriorityRequests} Items Requiring Urgent Action)
                </h6>
                <p className="mb-0 small text-secondary">
                  Hazardous materials or urgent same-day pickup requests require immediate crew dispatch.
                </p>
              </div>
            </div>
            <button
              className="btn btn-danger btn-sm px-3 fw-bold text-nowrap"
              onClick={() => {
                setPriorityFilter('HIGH');
                setStatusFilter('');
                setZoneFilter('');
              }}
            >
              Filter High Priority Queue ({stats.highPriorityRequests})
            </button>
          </div>
        </div>
      )}

      {/* 2. Collection Zone Intelligence Overview */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="fs-4">📍</span>
          <h5 className="fw-bold text-dark mb-0">Collection Zone Intelligence</h5>
        </div>

        <div className="row g-3">
          {zones.map((zObj) => (
            <div key={zObj.zone} className="col-sm-6 col-md-3">
              <div
                className={`wc-card p-3 h-100 ${
                  zoneFilter === zObj.zone ? 'border-emerald border-2 shadow-sm' : ''
                }`}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-emerald text-white fw-bold">{zObj.zone}</span>
                  <button
                    className={`btn btn-xs ${
                      zoneFilter === zObj.zone ? 'btn-emerald' : 'btn-outline-secondary'
                    }`}
                    onClick={() => setZoneFilter(zoneFilter === zObj.zone ? '' : zObj.zone)}
                  >
                    {zoneFilter === zObj.zone ? 'Active Filter' : 'Filter Zone'}
                  </button>
                </div>

                <div className="d-flex justify-content-between align-items-baseline mb-2 border-bottom pb-2">
                  <span className="small text-muted fw-semibold">Total Requests</span>
                  <span className="fw-bold text-dark fs-5">{zObj.total}</span>
                </div>

                <div className="row g-1 text-center small">
                  <div className="col-3">
                    <span className="text-warning fw-bold d-block">{zObj.pending}</span>
                    <span className="text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>
                      Pending
                    </span>
                  </div>
                  <div className="col-3">
                    <span className="text-info fw-bold d-block">{zObj.scheduled}</span>
                    <span className="text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>
                      Sched.
                    </span>
                  </div>
                  <div className="col-3">
                    <span className="text-success fw-bold d-block">{zObj.completed}</span>
                    <span className="text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>
                      Done
                    </span>
                  </div>
                  <div className="col-3">
                    <span className="text-danger fw-bold d-block">{zObj.highPriority}</span>
                    <span className="text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>
                      High
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Smart Collection Batches Section */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-2">
            <span className="fs-4">🚛</span>
            <h5 className="fw-bold text-dark mb-0">Suggested Collection Batches</h5>
          </div>
          <span className="small text-muted">
            Grouped by <strong>Zone + Pickup Date</strong> for route optimization
          </span>
        </div>

        {batches.length === 0 ? (
          <div className="wc-card p-4 text-center text-muted">
            <p className="mb-0 small">No active collection batches found for pending pickups.</p>
          </div>
        ) : (
          <div className="row g-3">
            {batches.map((batch) => (
              <div key={batch.batchId} className="col-md-6 col-lg-4">
                <div className="wc-card p-3.5 h-100 border-start border-4 border-info">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <span className="badge bg-light text-dark border me-1">
                        Batch #{batch.batchNumber}
                      </span>
                      <span className="badge bg-emerald text-white">{batch.collectionZone}</span>
                    </div>
                    {batch.urgency === 'HIGH ATTENTION' ? (
                      <span className="badge bg-danger text-white">HIGH ATTENTION</span>
                    ) : (
                      <span className="badge bg-secondary text-white">NORMAL</span>
                    )}
                  </div>

                  <div className="mb-2">
                    <span className="fw-bold text-dark d-block">
                      <i className="bi bi-calendar-event me-1 text-emerald"></i>
                      {batch.pickupDate}
                    </span>
                    <span className="small text-muted">
                      {batch.requestCount} pickup request(s) grouped ({batch.highPriorityCount} High Priority)
                    </span>
                  </div>

                  {/* Categories Breakdown */}
                  <div className="bg-light p-2 rounded mb-3 border">
                    <span className="small text-muted fw-bold d-block mb-1" style={{ fontSize: '0.7rem' }}>
                      MATERIAL BREAKDOWN:
                    </span>
                    <div className="d-flex flex-wrap gap-1">
                      {Object.entries(batch.categoryBreakdown).map(([cat, cnt]) => (
                        <span key={cat} className="badge bg-white text-dark border small">
                          {cat}: {cnt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    className="btn btn-outline-emerald btn-sm w-100 fw-semibold"
                    onClick={() => {
                      setZoneFilter(batch.collectionZone);
                      setSearch(batch.pickupDate);
                    }}
                  >
                    <i className="bi bi-funnel me-1"></i> Filter Batch Requests ({batch.requestCount})
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Environmental Impact Dashboard */}
      {impact && (
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center gap-2">
              <span className="fs-4">🌱</span>
              <h5 className="fw-bold text-dark mb-0">Environmental Impact Dashboard</h5>
            </div>
            <span className="badge bg-success bg-opacity-10 text-success fw-semibold">
              Live Recycling Metrics
            </span>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-6 col-md-3">
              <div className="wc-card p-3 border-start border-4 border-success">
                <span className="text-muted small fw-semibold text-uppercase">Completed Collections</span>
                <h3 className="fw-extrabold text-success mb-0 mt-1">{impact.totalCompletedCollections}</h3>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="wc-card p-3 border-start border-4 border-emerald">
                <span className="text-muted small fw-semibold text-uppercase">Estimated Waste Diverted</span>
                <h3 className="fw-extrabold text-emerald mb-0 mt-1">{impact.estimatedWasteDivertedKg} <small className="fs-6 text-muted">kg</small></h3>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="wc-card p-3 border-start border-4 border-info">
                <span className="text-muted small fw-semibold text-uppercase">Completion Rate</span>
                <h3 className="fw-extrabold text-info mb-0 mt-1">{impact.completionRate}%</h3>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="wc-card p-3 border-start border-4 border-warning">
                <span className="text-muted small fw-semibold text-uppercase">E-Waste & Recyclables</span>
                <h3 className="fw-extrabold text-warning mb-0 mt-1">{impact.ewasteCompletedCount + impact.recyclableCompletedCount}</h3>
              </div>
            </div>
          </div>

          {/* Category Impact Breakdown */}
          <div className="wc-card p-4 mb-3">
            <h6 className="fw-bold text-dark mb-3">📊 Completed Category Impact Breakdown</h6>
            <div className="row g-3">
              {Object.entries(impact.categoryBreakdown).length === 0 ? (
                <div className="col-12 text-muted small">No completed collections recorded yet for impact calculations.</div>
              ) : (
                Object.entries(impact.categoryBreakdown).map(([cat, count]) => {
                  const estKg = count * (impact.weightEstimatesReference[cat] || 1.0);
                  const pct = Math.round((count / (impact.totalCompletedCollections || 1)) * 100);
                  return (
                    <div key={cat} className="col-md-6">
                      <div className="d-flex justify-content-between align-items-center small mb-1">
                        <span className="fw-bold text-dark">{cat} ({count} completed)</span>
                        <span className="text-emerald fw-bold">~{estKg} kg diverted</span>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div
                          className="progress-bar bg-emerald"
                          role="progressbar"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="mt-3 text-muted" style={{ fontSize: '0.72rem' }}>
              * Estimated Impact based on predefined average weight assumptions per completed collection.
            </div>
          </div>
        </div>
      )}

      {/* 5. Main Request Queue Table */}
      <div className="wc-card p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <h5 className="fw-bold text-dark mb-0">Pickup Requests Queue</h5>
            <span className="text-muted small">Filter by Zone, Category, Status or Priority</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="small text-muted fw-semibold me-1">Sort By:</span>
            <select
              className="form-select form-select-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="priority">Smart Priority Score (High to Low)</option>
              <option value="pickupDate">Pickup Date (Earliest First)</option>
              <option value="createdAt">Date Created (Newest First)</option>
            </select>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="row g-2 mb-4 bg-light p-3 rounded-3 border align-items-end">
          <div className="col-md-2.5 flex-fill">
            <label className="form-label small fw-bold text-muted mb-1">Search</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search ID, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-2 flex-fill">
            <label className="form-label small fw-bold text-muted mb-1">Zone</label>
            <select
              className="form-select form-select-sm"
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
            >
              <option value="">All Zones</option>
              <option value="Zone A">Zone A</option>
              <option value="Zone B">Zone B</option>
              <option value="Zone C">Zone C</option>
              <option value="Zone D / General">Zone D / General</option>
            </select>
          </div>

          <div className="col-md-2 flex-fill">
            <label className="form-label small fw-bold text-muted mb-1">Category</label>
            <select
              className="form-select form-select-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="E-Waste">E-Waste</option>
              <option value="Plastic">Plastic</option>
              <option value="Paper">Paper</option>
              <option value="Glass">Glass</option>
              <option value="Organic">Organic</option>
              <option value="Metal">Metal</option>
              <option value="Hazardous">Hazardous</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-md-2 flex-fill">
            <label className="form-label small fw-bold text-muted mb-1">Status</label>
            <select
              className="form-select form-select-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="SUBMITTED">SUBMITTED</option>
              <option value="REVIEWED">REVIEWED</option>
              <option value="SCHEDULED">SCHEDULED</option>
              <option value="ASSIGNED">ASSIGNED</option>
              <option value="COLLECTED">COLLECTED</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>

          <div className="col-md-2 flex-fill">
            <label className="form-label small fw-bold text-muted mb-1">Priority</label>
            <select
              className="form-select form-select-sm"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>

          <div className="col-md-1.5 flex-fill">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm w-100 fw-medium"
              onClick={handleResetFilters}
            >
              <i className="bi bi-x-circle me-1"></i>Reset
            </button>
          </div>
        </div>

        {/* Requests Table */}
        {loading ? (
          <div className="text-center py-5 text-muted">
            <div className="spinner-border text-emerald mb-2" role="status"></div>
            <div>Querying MongoDB request records...</div>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-5 bg-light rounded-3 border">
            <span className="fs-1">📂</span>
            <h6 className="fw-bold mt-2 text-dark">No Matching Pickup Requests</h6>
            <p className="text-muted small mb-2">No records found for the current search or filter query.</p>
            <button className="btn btn-emerald btn-sm" onClick={handleResetFilters}>
              Clear Search & Reset Filters
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Request ID</th>
                  <th>Category</th>
                  <th>Zone</th>
                  <th>Pickup Date</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th className="text-center">Quick Update</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td>
                      <span className="fw-bold text-dark">{req.requestId}</span>
                      <div className="text-muted small">{req.userId?.name || 'Resident'}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">{req.wasteCategory}</span>
                    </td>
                    <td>
                      <span className="badge bg-emerald text-white">{req.collectionZone || 'Zone D'}</span>
                    </td>
                    <td>
                      <div className="small text-dark fw-medium">{req.pickupDate}</div>
                      <div className="small text-muted">{req.pickupTime}</div>
                    </td>
                    <td>
                      <span className="small text-secondary text-truncate d-inline-block" style={{ maxWidth: '160px' }}>
                        {req.pickupAddress}
                      </span>
                    </td>
                    <td>
                      <PriorityBadge priority={req.priority} score={req.priorityScore} />
                    </td>
                    <td>
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="text-center" style={{ minWidth: '140px' }}>
                      <select
                        className="form-select form-select-sm"
                        value={req.status}
                        disabled={updatingId === req._id || ['COMPLETED', 'CANCELLED'].includes(req.status)}
                        onChange={(e) => handleStatusChange(req._id, e.target.value)}
                      >
                        <option value="SUBMITTED">SUBMITTED</option>
                        <option value="REVIEWED">REVIEWED</option>
                        <option value="SCHEDULED">SCHEDULED</option>
                        <option value="ASSIGNED">ASSIGNED</option>
                        <option value="COLLECTED">COLLECTED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="text-end">
                      <Link
                        to={`/admin/requests/${req._id}`}
                        className="btn btn-emerald btn-sm px-3 fw-semibold"
                      >
                        View Details
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

export default AdminDashboard;

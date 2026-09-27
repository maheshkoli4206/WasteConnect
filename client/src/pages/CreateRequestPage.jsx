import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreateRequestPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [selectedCategoryObj, setSelectedCategoryObj] = useState(null);
  const [description, setDescription] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  
  // Set default pickup date to tomorrow
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [pickupDate, setPickupDate] = useState(tomorrowStr);
  const [pickupTime, setPickupTime] = useState('10:00 AM - 12:00 PM');
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
        if (res.data.length > 0) {
          setSelectedCategoryName(res.data[0].name);
          setSelectedCategoryObj(res.data[0]);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const catName = e.target.value;
    setSelectedCategoryName(catName);
    const catObj = categories.find((c) => c.name === catName);
    setSelectedCategoryObj(catObj || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const todayStr = new Date().toISOString().split('T')[0];
    if (pickupDate < todayStr) {
      setError('Pickup date cannot be in the past. Please select today or a future date.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.post('/requests', {
        wasteCategory: selectedCategoryName,
        description,
        pickupAddress,
        pickupDate,
        pickupTime,
      });

      navigate(`/requests/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create pickup request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-9 col-xl-8">
          <div className="wc-card p-4 p-md-5">
            <div className="border-bottom pb-3 mb-4">
              <span className="badge bg-emerald bg-opacity-10 text-emerald mb-2 fw-semibold">
                New Pickup Request
              </span>
              <h3 className="fw-bold text-dark mb-1">Schedule a Waste Pickup</h3>
              <p className="text-muted small mb-0">
                Select your material category, review smart disposal preparation guidance, and choose your pickup window.
              </p>
            </div>

            {error && (
              <div className="alert alert-danger py-2 small fw-medium mb-4">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Category Selection */}
              <div className="mb-4">
                <label className="form-label fw-bold text-dark">
                  1. Select Waste Category <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select py-2.5 fs-6"
                  value={selectedCategoryName}
                  onChange={handleCategoryChange}
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name} — {cat.description.slice(0, 55)}...
                    </option>
                  ))}
                </select>
              </div>

              {/* Smart Disposal Guide Section */}
              {selectedCategoryObj && (
                <div className="wc-card p-4 mb-4 border-start border-4 border-emerald bg-light bg-opacity-50">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="fs-4">♻️</span>
                    <h5 className="fw-bold text-emerald mb-0">
                      Smart Disposal Guide: {selectedCategoryObj.name}
                    </h5>
                  </div>

                  {/* Overview & Method */}
                  <div className="mb-3">
                    <span className="fw-bold small text-muted text-uppercase d-block mb-1">
                      What is this waste?
                    </span>
                    <p className="small text-dark mb-2">{selectedCategoryObj.description}</p>

                    <span className="fw-bold small text-muted text-uppercase d-block mb-1">
                      Recommended Disposal Method:
                    </span>
                    <p className="small text-dark fw-medium mb-0 bg-white p-2.5 rounded border">
                      <i className="bi bi-box-arrow-in-right text-emerald me-2"></i>
                      {selectedCategoryObj.disposalMethod || selectedCategoryObj.disposalGuidance}
                    </p>
                  </div>

                  {/* DOs and DON'Ts side by side */}
                  <div className="row g-3 mb-3">
                    {selectedCategoryObj.dos && selectedCategoryObj.dos.length > 0 && (
                      <div className="col-md-6">
                        <div className="bg-white p-3 rounded border h-100">
                          <h6 className="fw-bold text-success small mb-2">
                            <i className="bi bi-check-circle-fill me-1"></i> DO:
                          </h6>
                          <ul className="list-unstyled mb-0 small text-secondary">
                            {selectedCategoryObj.dos.map((item, i) => (
                              <li key={i} className="mb-1 d-flex align-items-start gap-1.5">
                                <span className="text-success fw-bold">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {selectedCategoryObj.donts && selectedCategoryObj.donts.length > 0 && (
                      <div className="col-md-6">
                        <div className="bg-white p-3 rounded border h-100">
                          <h6 className="fw-bold text-danger small mb-2">
                            <i className="bi bi-x-circle-fill me-1"></i> DON'T:
                          </h6>
                          <ul className="list-unstyled mb-0 small text-secondary">
                            {selectedCategoryObj.donts.map((item, i) => (
                              <li key={i} className="mb-1 d-flex align-items-start gap-1.5">
                                <span className="text-danger fw-bold">✗</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  {selectedCategoryObj.environmentalNote && (
                    <div className="alert alert-success py-2 mb-2 small border-0 bg-success bg-opacity-10 text-success">
                      <strong>🌱 Environmental Impact:</strong> {selectedCategoryObj.environmentalNote}
                    </div>
                  )}

                  {selectedCategoryObj.safetyNote && (
                    <div className="alert alert-warning py-2 mb-0 small border-0 bg-warning bg-opacity-10 text-dark">
                      <strong>⚠️ Safety Caution:</strong> {selectedCategoryObj.safetyNote}
                    </div>
                  )}
                </div>
              )}

              {/* Description / Notes */}
              <div className="mb-4">
                <label className="form-label fw-bold text-dark">
                  2. Item Description / Notes <span className="text-muted small">(Optional)</span>
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="e.g. 2 boxes of old monitors, broken laptop batteries. Located on ground floor."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <small className="text-muted">
                  Describing your items allows our Smart Priority Engine to detect urgency and calculate pickup priority.
                </small>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="form-label fw-bold text-dark">
                  3. Pickup Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control py-2.5"
                  placeholder="Street address, building number, apartment/suite, zip code"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  required
                />
              </div>

              {/* Date & Time Slot */}
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold text-dark">
                    4. Pickup Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control py-2.5"
                    value={pickupDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-dark">
                    5. Preferred Time Window <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select py-2.5"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    required
                  >
                    <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM (Morning)</option>
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM (Midday)</option>
                    <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM (Afternoon)</option>
                    <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM (Late Afternoon)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-emerald px-5 py-2.5 shadow fw-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Submitting Request...
                    </>
                  ) : (
                    'Confirm Pickup Request'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRequestPage;

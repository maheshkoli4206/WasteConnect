import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setIsSubmitting(true);
      const user = await register(name, email, password, role);
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5 my-3">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="wc-card p-4 p-md-5">
            <div className="text-center mb-4">
              <span className="fs-1">🌱</span>
              <h3 className="fw-bold mt-2 text-dark">Create Account</h3>
              <p className="text-muted small">Join WasteConnect to request and track responsible waste collection.</p>
            </div>

            {error && (
              <div className="alert alert-danger py-2 small fw-medium text-center mb-4">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted">Full Name</label>
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="e.g. Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted">Email Address</label>
                <input
                  type="email"
                  className="form-control py-2"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted">Password (min 6 characters)</label>
                <input
                  type="password"
                  className="form-control py-2"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted">Confirm Password</label>
                <input
                  type="password"
                  className="form-control py-2"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold small text-muted">Register As</label>
                <select
                  className="form-select py-2"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="USER">Resident / Business (Standard User)</option>
                  <option value="ADMIN">Collection Administrator (Admin)</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-emerald w-100 py-2.5 mb-3 fw-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating Account...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </button>
            </form>

            <div className="text-center mt-3 pt-3 border-top">
              <span className="small text-muted">Already have an account? </span>
              <Link to="/login" className="small text-emerald fw-bold text-decoration-none">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

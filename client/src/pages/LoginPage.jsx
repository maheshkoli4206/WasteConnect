import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      const user = await login(email, password);
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="container py-5 my-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="wc-card p-4 p-md-5">
            <div className="text-center mb-4">
              <span className="fs-1">♻️</span>
              <h3 className="fw-bold mt-2 text-dark">Welcome Back</h3>
              <p className="text-muted small">Sign in to manage & track your waste pickup requests.</p>
            </div>

            {error && (
              <div className="alert alert-danger py-2 small fw-medium text-center mb-4">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted">Email Address</label>
                <input
                  type="email"
                  className="form-control py-2.5"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="form-label fw-semibold small text-muted mb-0">Password</label>
                </div>
                <input
                  type="password"
                  className="form-control py-2.5"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-emerald w-100 py-2.5 mb-4 fw-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Authenticating...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="bg-light p-3 rounded-3 border mb-3">
              <div className="fw-bold small text-muted text-uppercase tracking-wider mb-2 text-center">
                ⚡ Hackathon Quick Demo Autofill
              </div>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm flex-fill"
                  onClick={() => handleQuickLogin('user@wasteconnect.org', 'User123!')}
                >
                  <i className="bi bi-person-check me-1"></i> Demo User
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm flex-fill"
                  onClick={() => handleQuickLogin('admin@wasteconnect.org', 'Admin123!')}
                >
                  <i className="bi bi-shield-lock me-1"></i> Demo Admin
                </button>
              </div>
            </div>

            <div className="text-center mt-3 pt-3 border-top">
              <span className="small text-muted">Don't have an account yet? </span>
              <Link to="/register" className="small text-emerald fw-bold text-decoration-none">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

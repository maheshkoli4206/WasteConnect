import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import CreateRequestPage from './pages/CreateRequestPage';
import MyRequestsPage from './pages/MyRequestsPage';
import RequestDetailsPage from './pages/RequestDetailsPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminRequestDetailsPage from './pages/AdminRequestDetailsPage';

// Route Guards
import { ProtectedRoute, AdminRoute } from './routes/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Resident User Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/requests/new"
              element={
                <ProtectedRoute>
                  <CreateRequestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-requests"
              element={
                <ProtectedRoute>
                  <MyRequestsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/requests/:id"
              element={
                <ProtectedRoute>
                  <RequestDetailsPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/requests"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/requests/:id"
              element={
                <AdminRoute>
                  <AdminRequestDetailsPage />
                </AdminRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;

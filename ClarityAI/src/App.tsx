import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import Dashboard from './features/dashboard/Dashboard'; 
import { useAuth } from './features/auth/useAuth';

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; 
  }
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protect Dashboard route */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      {/* Catch all - redirect unknown paths to home or login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
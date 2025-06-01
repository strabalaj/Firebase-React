import React from 'react';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { currentUser, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>; 
  }
  if (!currentUser) {
    return <div>Not authorized</div>;
  }
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      alert('Failed to logout');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
      <h1>Welcome to the Dashboard, {currentUser?.email}</h1>
      <p>You are logged in!</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Dashboard;

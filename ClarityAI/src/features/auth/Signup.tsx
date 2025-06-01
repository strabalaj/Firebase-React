/*
We grab the signup function from your useAuth hook.
User types email and password into controlled inputs.
When the form submits:
    - Calls Firebase’s createUserWithEmailAndPassword via signup.
    - If successful, shows an alert (you can customize or redirect).
    - If error, shows the error message.
Disabled input/button during async signup for UX.
*/

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const Signup: React.FC = () => {
  const { signup } = useAuth();
    const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signup(email, password);
      alert('Signup successful! You can now log in.');
      navigate('/dashboard');
      
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </label>

        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </label>

        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Signup;

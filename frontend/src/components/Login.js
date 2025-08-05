import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '3rem',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
          <h1 style={{ color: '#2d4654', fontSize: '2rem', marginBottom: '0.5rem' }}>
            Welcome Back
          </h1>
          <p style={{ color: '#666' }}>Sign in to MindfulMe</p>
        </div>

        {error && (
          <div style={{
            background: '#fee',
            color: '#c53030',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #eee',
                borderRadius: '10px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #eee',
                borderRadius: '10px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #7ca5b8, #4d7a97)',
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '1rem'
            }}
          >
            {loading ? 'Signing In...' : '🚀 Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Don't have an account?
          </p>
          <Link
            to="/register"
            style={{
              color: '#7ca5b8',
              textDecoration: 'underline',
              fontWeight: '600'
            }}
          >
            Create Account
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/" style={{ color: '#7ca5b8', textDecoration: 'none' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

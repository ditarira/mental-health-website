import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Register = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [mathQuestion, setMathQuestion] = useState('');
  const [mathAnswer, setMathAnswer] = useState('');
  
  const { register } = useAuth();

  React.useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    // Generate visual CAPTCHA
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    
    // Generate math question
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setMathQuestion(`${num1} + ${num2}`);
    setMathAnswer((num1 + num2).toString());
    setCaptchaInput('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Form validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // CAPTCHA validation
    if (captchaInput !== captcha) {
      setError('CAPTCHA verification failed. Please try again.');
      generateCaptcha();
      return;
    }

    // Math validation
    const userMathAnswer = document.getElementById('mathInput').value;
    if (userMathAnswer !== mathAnswer) {
      setError('Math verification failed. Please solve correctly.');
      generateCaptcha();
      return;
    }

    setLoading(true);

    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    });
    
    if (result.success) {
      setCurrentPage('dashboard');
    } else {
      setError(result.error);
      generateCaptcha();
    }
    
    setLoading(false);
  };

  return (
    <div className="main-content">
      <div className="container">
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
          <div className="card">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--dark)' }}>🌟 Join MindfulMe</h2>
            
            {error && (
              <div style={{ backgroundColor: '#ffe6e6', color: '#d00', padding: '1rem', borderRadius: '10px', marginBottom: '1rem', textAlign: 'center' }}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '1rem', border: '1px solid #ddd', borderRadius: '10px', fontSize: '1rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '1rem', border: '1px solid #ddd', borderRadius: '10px', fontSize: '1rem' }}
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '1rem', border: '1px solid #ddd', borderRadius: '10px', fontSize: '1rem' }}
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '1rem', border: '1px solid #ddd', borderRadius: '10px', fontSize: '1rem' }}
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '1rem', border: '1px solid #ddd', borderRadius: '10px', fontSize: '1rem' }}
                />
              </div>

              {/* Enhanced CAPTCHA Section */}
              <div style={{ backgroundColor: '#f9f9f9', padding: '1.5rem', borderRadius: '10px', marginBottom: '1.5rem', border: '2px solid #e0e0e0' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--dark)', textAlign: 'center' }}>🛡️ Security Verification</h4>
                
                {/* Visual CAPTCHA */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Type the characters shown:</label>
                  <div style={{ 
                    backgroundColor: 'linear-gradient(45deg, #f0f0f0, #e0e0e0)', 
                    padding: '1.5rem', 
                    borderRadius: '10px', 
                    fontFamily: 'monospace', 
                    fontSize: '2rem', 
                    letterSpacing: '8px', 
                    textAlign: 'center',
                    marginBottom: '1rem',
                    transform: 'skew(-8deg) rotate(-2deg)',
                    border: '3px dashed #999',
                    color: '#333',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}>
                    {captcha}
                  </div>
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter the characters above"
                    required
                    style={{ width: '100%', padding: '1rem', border: '2px solid #ddd', borderRadius: '8px', fontSize: '1.1rem', textAlign: 'center' }}
                  />
                </div>

                {/* Math Question */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Solve this math problem:</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                    <span style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold', 
                      backgroundColor: 'white', 
                      padding: '0.5rem 1rem', 
                      borderRadius: '8px',
                      border: '2px solid var(--primary)'
                    }}>
                      {mathQuestion} = ?
                    </span>
                    <input
                      type="number"
                      id="mathInput"
                      placeholder="Your answer"
                      required
                      style={{ padding: '1rem', border: '2px solid #ddd', borderRadius: '8px', width: '120px', fontSize: '1.1rem', textAlign: 'center' }}
                    />
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <button 
                    type="button" 
                    onClick={generateCaptcha}
                    style={{ 
                      padding: '0.8rem 1.5rem', 
                      backgroundColor: 'var(--accent)', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    🔄 Generate New Challenge
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="btn"
                style={{ width: '100%', marginBottom: '1rem' }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            <div style={{ textAlign: 'center' }}>
              <p>Already have an account? <span onClick={() => setCurrentPage('login')} style={{ color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>Sign in</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
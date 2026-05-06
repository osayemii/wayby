import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const clearFields = () => {
      if (emailRef.current) emailRef.current.value = '';
      if (passwordRef.current) passwordRef.current.value = '';
      setEmail('');
      setPassword('');
      setError('');
    };

    // Immediate clear
    clearFields();

    // Multiple delayed clears to catch aggressive browser autofill after mount
    const t1 = setTimeout(clearFields, 100);
    const t2 = setTimeout(clearFields, 500);
    const t3 = setTimeout(clearFields, 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      if (emailRef.current) emailRef.current.value = '';
      if (passwordRef.current) passwordRef.current.value = '';
      setEmail('');
      setPassword('');
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Wayby Admin</h1>
          <p>Sign in to manage your website</p>
        </div>
        
        {error && <div className="error-alert">{error}</div>}
        
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Decoy fields to trick browser autofill */}
          <input type="text" name="fake_email" style={{display: 'none'}} tabIndex="-1" autoComplete="off" />
          <input type="password" name="fake_password" style={{display: 'none'}} tabIndex="-1" autoComplete="off" />
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              ref={emailRef}
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="admin@wayby.com"
              autoComplete="off"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              ref={passwordRef}
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              autoComplete="new-password"
              required 
            />
          </div>
          
          <button disabled={loading} type="submit" className="login-btn">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

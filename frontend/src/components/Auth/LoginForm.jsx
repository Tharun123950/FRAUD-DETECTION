import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, Mail, LogIn, Cpu } from 'lucide-react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://fraud-detection-3-0wua.onrender.com/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data);
      } else {
        alert(data.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Error connecting to backend server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card login-container auth-card"
      style={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="login-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ marginBottom: '1rem', display: 'inline-block' }}
        >
          <Cpu size={48} className="accent-text" />
        </motion.div>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>JAVA <span className="accent-text">AI</span></h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Admin Control Center
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        background: 'rgba(112, 0, 255, 0.1)',
        borderRadius: '12px',
        padding: '12px',
        marginBottom: '2rem',
        border: '1px solid rgba(112, 0, 255, 0.2)'
      }}>
        <ShieldCheck size={20} className="secondary-text" />
        <span style={{ fontWeight: '600', color: 'var(--secondary)', fontSize: '0.9rem' }}>ADMINISTRATOR ACCESS ONLY</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ADMIN EMAIL</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-secondary)' }} />
            <input
              type="email"
              className="cyber-input"
              placeholder="admin@java.ai"
              required
              style={{ paddingLeft: '40px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>SECURE PASSWORD</label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-secondary)' }} />
            <input
              type="password"
              className="cyber-input"
              placeholder="••••••••"
              required
              style={{ paddingLeft: '40px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="cyber-button"
          disabled={loading}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          {loading ? (
            'AUTHENTICATING...'
          ) : (
            <>
              <LogIn size={20} />
              LOGIN TO ADMIN PANEL
            </>
          )}
        </button>
      </form>

      <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Authorized Access Only • System Under AI Monitoring
      </div>
    </motion.div>
  );
};

export default LoginForm;

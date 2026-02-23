import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Landmark, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: '#0a0a0c',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background enhancement */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, rgba(0, 242, 255, 0.05) 0%, transparent 70%)',
                zIndex: 0
            }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', zIndex: 1, maxWidth: '800px' }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ marginBottom: '2rem', display: 'inline-block' }}
                >
                    <Cpu size={80} className="accent-text" />
                </motion.div>

                <h1 style={{ fontSize: '4rem', marginBottom: '1rem', letterSpacing: '-2px' }}>
                    JAVA <span className="accent-text">AI</span> FRAUD DETECTION
                </h1>

                <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    marginBottom: '3rem'
                }}>
                    State-of-the-art neural networks identifying anomalies across Banking and Healthcare sectors.
                    Real-time analysis with 99.9% accuracy.
                </p>

                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '4rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Landmark size={32} style={{ color: 'var(--primary)', marginBottom: '10px' }} />
                        <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>BANKING</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Activity size={32} style={{ color: '#ff2d55', marginBottom: '10px' }} />
                        <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>HEALTHCARE</div>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/login')}
                    className="cyber-button"
                    style={{
                        padding: '1.2rem 3rem',
                        fontSize: '1.1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        margin: '0 auto'
                    }}
                >
                    ENTER SECURE PORTAL <ArrowRight size={20} />
                </motion.button>
            </motion.div>

            {/* Footer status */}
            <div style={{
                position: 'absolute',
                bottom: '2rem',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '2px',
                zIndex: 1
            }}>
                SYSTEM VERSION 3.0 • SECURE ACCESS ONLY
            </div>
        </div>
    );
};

export default Home;

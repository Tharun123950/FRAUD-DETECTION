import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Landmark, ShieldAlert, Cpu, Database, ClipboardList, MapPin, Clock, CreditCard, User } from 'lucide-react';

const AnalysisForm = ({ sector, onCheckFraud }) => {
    const [formData, setFormData] = useState({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [mode, setMode] = useState('analyze'); // 'analyze' or 'search'

    const isHospital = sector === 'hospital';

    const hospitalFields = [
        { id: 'patientName', label: 'PATIENT NAME', icon: <User size={18} />, placeholder: 'John Doe', type: 'text' },
        { id: 'claimAmount', label: 'CLAIM AMOUNT ($)', icon: <CreditCard size={18} />, placeholder: '5000.00', type: 'number' },
        { id: 'treatmentType', label: 'TREATMENT TYPE', icon: <ClipboardList size={18} />, placeholder: 'Emergency / Routine', type: 'text' },
    ];

    const bankingFields = [
        { id: 'accountNumber', label: 'ACCOUNT NUMBER', icon: <Database size={18} />, placeholder: 'ACC-889021', type: 'text' },
        { id: 'amount', label: 'TRANSACTION AMOUNT ($)', icon: <CreditCard size={18} />, placeholder: '120.50', type: 'number' },
        { id: 'riskScore', label: 'RISK SCORE (0-100)', icon: <Activity size={18} />, placeholder: '25', type: 'number' },
        { id: 'cibilScore', label: 'CIBIL SCORE (300-900)', icon: <ShieldAlert size={18} />, placeholder: '750', type: 'number' },
    ];

    const fields = isHospital ? hospitalFields : bankingFields;

    const handleChange = (id, value) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsAnalyzing(true);
        try {
            const queryParam = isHospital ? `patientName=${formData.patientName}` : `accountNumber=${formData.accountNumber}`;
            const endpoint = `/api/fraud?${queryParam}`;
            const response = await fetch(`http://localhost:8080${endpoint}`);
            if (!response.ok) throw new Error('Search failed');

            const results = await response.json();
            if (results.length > 0) {
                // Return the first match for reporting
                onCheckFraud(results[0], true);
            } else {
                alert('No records found in database');
            }
        } catch (error) {
            console.error('Search error:', error);
            alert('Error connecting to backend for search');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'search') {
            handleSearch(e);
            return;
        }

        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            onCheckFraud(formData);
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card"
            style={{
                width: '100%',
                maxWidth: '600px',
                padding: '2.5rem',
                margin: '0 auto',
                border: `1px solid ${isHospital ? '#ff2d55' : 'var(--primary)'}44`
            }}
        >
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{
                    color: isHospital ? '#ff2d55' : 'var(--primary)',
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    {isHospital ? <Activity size={48} /> : <Landmark size={48} />}
                </div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', textTransform: 'uppercase' }}>
                    {sector} <span className="accent-text">{mode === 'analyze' ? 'Analysis' : 'Search & Report'}</span>
                </h2>

                {/* Mode Toggle */}
                <div style={{
                    display: 'flex',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '10px',
                    padding: '4px',
                    marginTop: '1.5rem',
                    width: 'fit-content',
                    marginInline: 'auto'
                }}>
                    <button
                        onClick={() => setMode('analyze')}
                        style={{
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            background: mode === 'analyze' ? (isHospital ? '#ff2d55' : 'var(--primary)') : 'transparent',
                            color: mode === 'analyze' ? '#fff' : 'var(--text-secondary)',
                            transition: '0.3s'
                        }}
                    >NEW SCAN</button>
                    <button
                        onClick={() => setMode('search')}
                        style={{
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            background: mode === 'search' ? (isHospital ? '#ff2d55' : 'var(--primary)') : 'transparent',
                            color: mode === 'search' ? '#fff' : 'var(--text-secondary)',
                            transition: '0.3s'
                        }}
                    >DATABASE SEARCH</button>
                </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.2rem' }}>
                {fields.filter(f => mode === 'analyze' || f.id === (isHospital ? 'patientName' : 'accountNumber')).map(field => (
                    <div key={field.id}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                            {field.label}
                        </label>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '12px', top: '12px', color: isHospital ? '#ff2d55' : 'var(--primary)', opacity: 0.7 }}>
                                {field.icon}
                            </div>
                            <input
                                type={field.type}
                                className="cyber-input"
                                placeholder={field.placeholder}
                                required
                                style={{ paddingLeft: '40px' }}
                                value={formData[field.id] || ''}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                            />
                        </div>
                    </div>
                ))}

                <div style={{ marginTop: '1.5rem' }}>
                    <button
                        type="submit"
                        className="cyber-button"
                        disabled={isAnalyzing}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            background: isHospital ? 'linear-gradient(135deg, #ff2d55, #7000ff)' : undefined,
                            boxShadow: isHospital ? '0 0 15px rgba(255, 45, 85, 0.4)' : undefined,
                            opacity: isAnalyzing ? 0.7 : 1
                        }}
                    >
                        {isAnalyzing ? (
                            <>
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                                    <Cpu size={20} />
                                </motion.div>
                                {mode === 'analyze' ? 'ANALYZING PATTERNS...' : 'SEARCHING DATABASE...'}
                            </>
                        ) : (
                            <>
                                {mode === 'analyze' ? <ShieldAlert size={20} /> : <Database size={20} />}
                                {mode === 'analyze' ? 'CHECK FRAUD' : 'FIND & GENERATE REPORT'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default AnalysisForm;

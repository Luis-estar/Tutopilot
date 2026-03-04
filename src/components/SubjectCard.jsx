import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SubjectCard = ({ title, color, icon, link }) => {
    return (
        <Link to={link || '#'} style={{ textDecoration: 'none' }}>
            <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    background: color,
                    borderRadius: '24px',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    height: '200px',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{title}</h3>

                {/* Decorative circle */}
                <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)'
                }} />
            </motion.div>
        </Link>
    );
};

export default SubjectCard;

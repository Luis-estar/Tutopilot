import React from 'react';
import { motion } from 'framer-motion';

const Character = ({ mood = 'happy' }) => {
    return (
        <motion.svg
            width="150"
            height="150"
            viewBox="0 0 200 200"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
            {/* Robot Head */}
            <circle cx="100" cy="100" r="80" fill="#4ECDC4" />

            {/* Eyes */}
            <circle cx="70" cy="85" r="10" fill="white" />
            <circle cx="130" cy="85" r="10" fill="white" />
            <circle cx="70" cy="85" r="4" fill="#2C3E50" />
            <circle cx="130" cy="85" r="4" fill="#2C3E50" />

            {/* Mouth */}
            {mood === 'happy' && (
                <path d="M 60 120 Q 100 150 140 120" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />
            )}
            {mood === 'thinking' && (
                <line x1="70" y1="130" x2="130" y2="130" stroke="white" strokeWidth="8" strokeLinecap="round" />
            )}

            {/* Antenna */}
            <line x1="100" y1="20" x2="100" y2="50" stroke="#2C3E50" strokeWidth="6" />
            <circle cx="100" cy="20" r="10" fill="#FF6B6B" />
        </motion.svg>
    );
};

export default Character;

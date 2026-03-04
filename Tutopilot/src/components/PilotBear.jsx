import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PilotBear = ({ mood = 'happy' }) => {
    const [action, setAction] = useState('idle'); // idle, dance, wave
    const [tip, setTip] = useState('');
    const [showTip, setShowTip] = useState(false);

    const tips = [
        "¡Recuerda leer 15 minutos al día! 📚",
        "¡Las matemáticas son divertidas! ➕",
        "¡Lávate las manos antes de comer! 🧼",
        "¡Sé amable con tus amigos! 🤝",
        "¡Pregunta si no entiendes algo! 🙋",
        "¡Vamos a volar alto! ✈️",
        "¡Tú puedes hacerlo! ⭐"
    ];

    const handleInteraction = () => {
        // Random action
        const actions = ['dance', 'wave'];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        setAction(randomAction);

        // Pick a random tip
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        setTip(randomTip);
        setShowTip(true);

        // Reset after animation
        setTimeout(() => {
            setAction('idle');
            setShowTip(false);
        }, 3000);
    };

    const bearVariants = {
        idle: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } },
        dance: {
            y: [0, -20, 0],
            rotate: [-5, 5, -5, 5, 0],
            transition: { duration: 0.5, repeat: 3 }
        },
        wave: {
            rotate: [0, 15, -10, 10, 0],
            transition: { duration: 1, repeat: 2 }
        }
    };

    return (
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={handleInteraction}>
            {/* Speech Bubble */}
            <AnimatePresence>
                {showTip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: -20, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{
                            position: 'absolute',
                            top: '-60px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'white',
                            padding: '10px 15px',
                            borderRadius: '15px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                            whiteSpace: 'nowrap',
                            zIndex: 10,
                            border: '2px solid #4ECDC4',
                            fontWeight: 'bold',
                            color: '#2C3E50'
                        }}
                    >
                        {tip}
                        <div style={{
                            position: 'absolute',
                            bottom: '-8px',
                            left: '50%',
                            marginLeft: '-8px',
                            width: '0',
                            height: '0',
                            borderLeft: '8px solid transparent',
                            borderRight: '8px solid transparent',
                            borderTop: '8px solid #4ECDC4'
                        }} />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.svg
                width="180"
                height="180"
                viewBox="0 0 200 200"
                variants={bearVariants}
                animate={action}
                whileHover={{ scale: 1.1 }}
            >
                {/* Ears */}
                <circle cx="50" cy="60" r="25" fill="#8D6E63" />
                <circle cx="150" cy="60" r="25" fill="#8D6E63" />
                <circle cx="50" cy="60" r="12" fill="#D7CCC8" />
                <circle cx="150" cy="60" r="12" fill="#D7CCC8" />

                {/* Head */}
                <ellipse cx="100" cy="90" rx="70" ry="60" fill="#8D6E63" />

                {/* Snout */}
                <ellipse cx="100" cy="100" rx="25" ry="20" fill="#D7CCC8" />
                <ellipse cx="100" cy="95" rx="10" ry="8" fill="#3E2723" />

                {/* Mouth */}
                <path d="M 90 110 Q 100 115 110 110" stroke="#3E2723" strokeWidth="3" fill="none" />

                {/* Pilot Goggles */}
                <rect x="30" y="65" width="140" height="15" fill="#455A64" rx="5" />
                <circle cx="70" cy="72" r="18" fill="#81D4FA" stroke="#546E7A" strokeWidth="4" />
                <circle cx="130" cy="72" r="18" fill="#81D4FA" stroke="#546E7A" strokeWidth="4" />
                <path d="M 88 72 L 112 72" stroke="#546E7A" strokeWidth="4" />

                {/* Scarf */}
                <path d="M 60 130 Q 100 160 140 130" stroke="#FF5252" strokeWidth="20" fill="none" strokeLinecap="round" />
                <path d="M 130 140 L 150 170 L 170 160" fill="#FF5252" />

                {/* Body (partial) */}
                <path d="M 50 140 Q 100 220 150 140" fill="#8D6E63" />
            </motion.svg>
        </div>
    );
};

export default PilotBear;

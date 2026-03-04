import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import styles from './Quiz.module.css';

const Quiz = ({ question, options, onAnswer, feedback }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        if (selectedOption !== null) return; // Prevent multiple clicks
        setSelectedOption(option);
        onAnswer(option);
    };

    return (
        <div className={styles.container}>
            <motion.h2
                className={styles.question}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {question}
            </motion.h2>

            <div className={styles.optionsGrid}>
                {options.map((option, index) => (
                    <motion.button
                        key={index}
                        className={`${styles.option} ${selectedOption === option ? styles.selected : ''}`}
                        onClick={() => handleOptionClick(option)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={selectedOption !== null}
                    >
                        {option}
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {feedback && (
                    <motion.div
                        className={`${styles.feedback} ${feedback.type === 'correct' ? styles.correct : styles.incorrect}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        {feedback.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Quiz;

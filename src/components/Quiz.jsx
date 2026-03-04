import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import styles from './Quiz.module.css';

const Quiz = ({ question, options, onAnswer, disabled }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        if (selectedOption !== null || disabled) return;
        setSelectedOption(option);
        onAnswer(option);
    };

    return (
        <div className={styles.container}>
            <motion.h2
                className={styles.question}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={question}
            >
                {question}
            </motion.h2>

            <div className={styles.optionsGrid}>
                {options.map((option, index) => (
                    <motion.button
                        key={index}
                        className={`${styles.option} ${selectedOption === option ? styles.selected : ''}`}
                        onClick={() => handleOptionClick(option)}
                        whileHover={!disabled ? { y: -2 } : {}}
                        whileTap={!disabled ? { y: 2 } : {}}
                        disabled={disabled}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <span className={styles.optionNumber}>{index + 1}</span>
                        {option}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default Quiz;

import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, type = 'text', value, onChange, placeholder, error, ...props }) => {
    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`${styles.input} ${error ? styles.errorInput : ''}`}
                {...props}
            />
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default Input;

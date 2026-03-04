import React, { useState } from 'react';
import styles from './Input.module.css';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({ label, id, type = 'text', value, onChange, placeholder, error, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className={styles.container}>
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}
            <div className={styles.inputWrapper}>
                <input
                    id={id}
                    type={inputType}
                    value={value}
                    onChange={(e) => {
                        // Forzado de actualización para asegurar que se capturen todos los caracteres
                        onChange(e);
                    }}
                    placeholder={placeholder}
                    className={`${styles.input} ${error ? styles.errorInput : ''} ${isPassword ? styles.passwordInput : ''}`}
                    inputMode={isPassword ? "text" : props.inputMode}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        className={styles.toggleButton}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default Input;

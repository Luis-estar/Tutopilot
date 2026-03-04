import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from './Login.module.css'; // Reuse login styles

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [grade, setGrade] = useState('kinder');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            await register(name, email, password, grade);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Error al registrarse');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>¡Únete a la diversión! 🚀</h1>
                <p className={styles.subtitle}>Crea tu cuenta para empezar</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        label="Nombre del niño/a"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                    />
                    <Input
                        label="Correo Electrónico"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="papa@correo.com"
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="******"
                    />

                    <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                        <label style={{ fontWeight: 600, color: 'var(--text)', marginLeft: '0.25rem', display: 'block', marginBottom: '0.25rem' }}>Grado Escolar</label>
                        <select
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                border: '2px solid #ddd',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                background: 'white',
                                outline: 'none'
                            }}
                        >
                            <option value="kinder">Kinder</option>
                            <option value="1">1er Grado</option>
                            <option value="2">2do Grado</option>
                            <option value="3">3er Grado</option>
                            <option value="4">4to Grado</option>
                            <option value="5">5to Grado</option>
                            <option value="6">6to Grado</option>
                        </select>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <Button type="submit" variant="secondary" style={{ marginTop: '1rem' }}>
                        Registrarse
                    </Button>
                </form>

                <p className={styles.footer}>
                    ¿Ya tienes cuenta? <Link to="/login" className={styles.link}>Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

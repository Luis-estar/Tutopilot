import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Correo o contraseña incorrectos');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>¡Hola de nuevo! 👋</h1>
                <p className={styles.subtitle}>Ingresa para seguir aprendiendo</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        label="Correo Electrónico"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@correo.com"
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="******"
                    />

                    {error && <p className={styles.error}>{error}</p>}

                    <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
                        Entrar
                    </Button>
                </form>

                <p className={styles.footer}>
                    ¿No tienes cuenta? <Link to="/register" className={styles.link}>Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

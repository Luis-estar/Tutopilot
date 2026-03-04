import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import styles from './Progress.module.css';

const Progress = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Mock progress data (would come from user state/db)
    const stats = [
        { subject: 'Matemáticas', score: 85, level: 3 },
        { subject: 'Español', score: 92, level: 4 },
        { subject: 'Ciencias', score: 78, level: 2 },
        { subject: 'Inglés', score: 88, level: 3 },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Progreso de {user?.name} 📈</h1>
                <p className={styles.subtitle}>Resumen de rendimiento académico</p>

                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statRow}>
                            <div className={styles.subjectInfo}>
                                <span className={styles.subjectName}>{stat.subject}</span>
                                <span className={styles.level}>Nivel {stat.level}</span>
                            </div>
                            <div className={styles.progressBarContainer}>
                                <div
                                    className={styles.progressBar}
                                    style={{ width: `${stat.score}%`, backgroundColor: stat.score > 80 ? '#4ECDC4' : '#FF6B6B' }}
                                />
                            </div>
                            <span className={styles.scoreText}>{stat.score}%</span>
                        </div>
                    ))}
                </div>

                <div className={styles.recommendation}>
                    <h3>💡 Recomendación del Maestro</h3>
                    <p>
                        {user?.name} va muy bien en Español. Recomendamos practicar un poco más en Ciencias con los juegos interactivos de biología.
                    </p>
                </div>

                <Button onClick={() => navigate('/dashboard')} variant="outline" style={{ marginTop: '2rem' }}>
                    Volver al Dashboard
                </Button>
            </div>
        </div>
    );
};

export default Progress;

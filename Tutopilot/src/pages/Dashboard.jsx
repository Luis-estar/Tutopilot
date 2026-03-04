import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import PilotBear from '../components/PilotBear';
import SubjectCard from '../components/SubjectCard';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const subjects = [
        { id: 'math', title: 'Matemáticas', color: '#FF9A9E', icon: '🧮' },
        { id: 'spanish', title: 'Español', color: '#a18cd1', icon: '📚' },
        { id: 'science', title: 'Ciencias', color: '#84fab0', icon: '🧬' },
        { id: 'english', title: 'Inglés', color: '#fccb90', icon: '🗣️' },
        { id: 'social', title: 'Sociales', color: '#e0c3fc', icon: '🌍' },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className={styles.greeting}>¡Hola, {user?.name}!</h1>
                        <p className={styles.grade}>Estudiante de {user?.grade}º Grado</p>
                    </div>
                </div>
                <div className={styles.actions}>
                    <div className={styles.points}>
                        ⭐ {user?.points || 0} Puntos
                    </div>
                    <Button onClick={() => navigate('/subscription')} variant="secondary" style={{ fontSize: '0.9rem' }}>
                        💎 Premium
                    </Button>
                    <Button onClick={() => navigate('/progress')} variant="primary" style={{ fontSize: '0.9rem' }}>
                        📈 Progreso
                    </Button>
                    <Button onClick={logout} variant="ghost" style={{ fontSize: '0.9rem' }}>
                        Salir
                    </Button>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.characterSection}>
                    <PilotBear />
                    <div className={styles.speechBubble}>
                        ¡Hola cadete! ¿Listo para volar hacia el conocimiento? ✈️
                    </div>
                </div>

                <div className={styles.grid}>
                    {subjects.map(sub => (
                        <SubjectCard
                            key={sub.id}
                            title={sub.title}
                            color={sub.color}
                            icon={sub.icon}
                            link={`/game/${sub.id}`}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

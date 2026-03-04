import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Game.module.css';
import Quiz from '../components/Quiz';
import PilotBear from '../components/PilotBear';
import Button from '../components/Button';
import playSound from '../utils/audio';
import { ArrowLeft } from 'lucide-react';

// Mock Question Data Generator
const generateQuestions = (subject, grade) => {
    // Simple mock implementation
    if (subject === 'math') {
        return [
            { q: '¿Cuánto es 2 + 2?', options: ['3', '4', '5', '6'], a: '4' },
            { q: '¿Cuánto es 5 + 3?', options: ['7', '8', '9', '10'], a: '8' },
            { q: '¿Cuánto es 10 - 4?', options: ['5', '6', '7', '8'], a: '6' },
            { q: '¿Qué número sigue: 1, 2, 3, ...?', options: ['4', '5', '3', '6'], a: '4' },
        ];
    }
    if (subject === 'spanish') {
        return [
            { q: '¿Cuál es la vocal?', options: ['B', 'C', 'A', 'D'], a: 'A' },
            { q: 'Sinónimo de "Feliz"', options: ['Triste', 'Alegre', 'Enojado', 'Sueño'], a: 'Alegre' },
        ];
    }
    // Fallback
    return [
        { q: '¿Pregunta de prueba?', options: ['A', 'B', 'C', 'D'], a: 'A' },
    ];
};

const Game = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth(); // Could update points here

    const [questions, setQuestions] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        // Load questions based on subject and user grade
        const qs = generateQuestions(id, user?.grade || 'kinder');
        setQuestions(qs);
    }, [id, user]);

    const handleAnswer = (answer) => {
        const currentQ = questions[currentQIndex];
        if (answer === currentQ.a) {
            playSound('correct');
            setFeedback({ type: 'correct', message: '¡Muy bien! 🎉' });
            setScore(s => s + 10);
        } else {
            playSound('incorrect');
            setFeedback({ type: 'incorrect', message: '¡Inténtalo de nuevo!' });
        }

        // Next question delay
        setTimeout(() => {
            setFeedback(null);
            if (currentQIndex < questions.length - 1) {
                setCurrentQIndex(prev => prev + 1);
            } else {
                playSound('success');
                setFinished(true);
            }
        }, 1500);
    };

    const getSubjectName = (id) => {
        const names = {
            math: 'Matemáticas',
            spanish: 'Español',
            science: 'Ciencias',
            english: 'Inglés',
            social: 'Sociales'
        };
        return names[id] || 'Juego';
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Button variant="ghost" onClick={() => navigate('/dashboard')} className={styles.backButton}>
                    <ArrowLeft size={24} /> Volver
                </Button>
                <h1 className={styles.title}>{getSubjectName(id)}</h1>
                <div className={styles.score}>⭐ {score}</div>
            </header>

            <div className={styles.content}>
                <div className={styles.characterContainer}>
                    <PilotBear mood={feedback ? (feedback.type === 'correct' ? 'happy' : 'thinking') : 'happy'} />
                </div>

                {!finished ? (
                    questions.length > 0 && (
                        <Quiz
                            question={questions[currentQIndex].q}
                            options={questions[currentQIndex].options}
                            onAnswer={handleAnswer}
                            feedback={feedback}
                        />
                    )
                ) : (
                    <div className={styles.finishedCard}>
                        <h2>¡Felicidades! 🎉</h2>
                        <p>Has completado el nivel.</p>
                        <p className={styles.finalScore}>Puntos ganados: {score}</p>
                        <Button onClick={() => navigate('/dashboard')}>Volver al Mapa</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Game;

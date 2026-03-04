import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Game.module.css';
import Quiz from '../components/Quiz';
import PilotBear from '../components/PilotBear';
import Button from '../components/Button';
import { playSound, speak } from '../utils/audio';
import confetti from 'canvas-confetti';
import { ArrowLeft } from 'lucide-react';

// Mock Question Data Generator
const questionDatabase = {
    math: {
        kinder: [
            { q: '🖐️ ¿Cuántos dedos tienes en una mano?', options: ['3', '4', '5', '6'], a: '5' },
            { q: '🍎 Si tienes 2 manzanas y te regalan 1, ¿cuántas tienes?', options: ['2', '3', '4', '5'], a: '3' },
            { q: '⚽ ¿Qué forma tiene una pelota?', options: ['Cuadrado', 'Triángulo', 'Círculo', 'Rectángulo'], a: 'Círculo' },
        ],
        lower: [
            { q: '➕ ¿Cuánto es 12 + 15?', options: ['25', '26', '27', '28'], a: '27' },
            { q: '✖️ ¿Cuánto es 5 x 4?', options: ['15', '20', '25', '30'], a: '20' },
            { q: '📏 ¿Cuál de estos números es el más grande?', options: ['45', '54', '39', '51'], a: '54' },
            { q: '➖ ¿Cuánto es 20 - 7?', options: ['11', '12', '13', '14'], a: '13' },
        ],
        upper: [
            { q: '➗ ¿Cuánto es 150 / 3?', options: ['40', '50', '60', '70'], a: '50' },
            { q: '✖️ ¿Cuánto es 12 x 12?', options: ['124', '144', '164', '134'], a: '144' },
            { q: '🧠 ¿Cuál es el resultado de (10 + 5) x 2?', options: ['20', '25', '30', '35'], a: '30' },
            { q: '🧪 ¿Cuántos mililitros hay en un litro?', options: ['100', '500', '1000', '10'], a: '1000' },
        ]
    },
    spanish: {
        kinder: [
            { q: '✈️ ¿Con qué letra empieza la palabra "Avión"?', options: ['E', 'I', 'O', 'A'], a: 'A' },
            { q: '🐻 ¿Cuál es la vocal de "Oso"?', options: ['O', 'U', 'A', 'I'], a: 'O' },
            { q: '🐱 ¿Qué palabra rima con "Gato"?', options: ['Perro', 'Pato', 'Lobo', 'Casa'], a: 'Pato' },
        ],
        lower: [
            { q: '🐭 ¿Cuál es el contrario de "Grande"?', options: ['Gigante', 'Alto', 'Pequeño', 'Fuerte'], a: 'Pequeño' },
            { q: '🐴 ¿Cómo se escribe correctamente?', options: ['Cavallo', 'Caballo', 'Cuvallo', 'Cabayo'], a: 'Caballo' },
            { q: '🐕 ¿Cuál de estos es un sustantivo?', options: ['Correr', 'Saltar', 'Perro', 'Bonito'], a: 'Perro' },
        ],
        upper: [
            { q: '🎶 ¿Cuál de estas palabras lleva tilde en la antepenúltima sílaba (esdrújula)?', options: ['Camión', 'Lápiz', 'Música', 'Pared'], a: 'Música' },
            { q: '🎭 El que escribe una obra de teatro se llama...', options: ['Poeta', 'Dramaturgo', 'Editor', 'Escritor'], a: 'Dramaturgo' },
            { q: '📝 ¿Cuál es el predicado en: "El niño juega en el parque"?', options: ['El niño', 'juega en el parque', 'en el parque', 'El niño juega'], a: 'juega en el parque' },
        ]
    },
    science: {
        kinder: [
            { q: '👃 ¿Qué parte del cuerpo usamos para oler las flores?', options: ['Ojos', 'Boca', 'Nariz', 'Manos'], a: 'Nariz' },
            { q: '🐟 ¿Cuál es un animal que vive feliz en el agua?', options: ['León', 'Pez', 'Pájaro', 'Gato'], a: 'Pez' },
            { q: '❄️ ¿Cómo está el clima cuando cae nieve?', options: ['Caliente', 'Frío', 'Templado', 'Soleado'], a: 'Frío' },
        ],
        lower: [
            { q: '🌱 ¿Qué necesitan las plantas para crecer fuertes?', options: ['Juguetes', 'Agua y Luz', 'Chocolate', 'Zapatos'], a: 'Agua y Luz' },
            { q: '☀️ El Sol es una brillante...', options: ['Planeta', 'Luna', 'Estrella', 'Cometa'], a: 'Estrella' },
            { q: '🕷️ ¿Cuántas patas tiene una araña?', options: ['6', '8', '10', '4'], a: '8' },
        ],
        upper: [
            { q: '🍃 ¿Cómo se llama el proceso mágico por el cual las plantas producen su alimento?', options: ['Respiración', 'Digestión', 'Fotosíntesis', 'Transpiración'], a: 'Fotosíntesis' },
            { q: '🪐 ¿Cuál es el planeta gigante de nuestro Sistema Solar?', options: ['Tierra', 'Marte', 'Júpiter', 'Saturno'], a: 'Júpiter' },
            { q: '🧊 El agua en estado sólido se llama...', options: ['Vapor', 'Lluvia', 'Nieve o Hielo', 'Niebla'], a: 'Nieve o Hielo' },
        ]
    },
    english: {
        kinder: [
            { q: '🍎 What is this fruit?', options: ['Apple', 'Banana', 'Cat', 'Table'], a: 'Apple' },
            { q: '🐶 What animal is this?', options: ['Fish', 'Bird', 'Dog', 'Lion'], a: 'Dog' },
            { q: '🔵 Which color is this?', options: ['Red', 'Blue', 'Yellow', 'Green'], a: 'Blue' },
            { q: '1️⃣ What number is this?', options: ['Three', 'Two', 'One', 'Four'], a: 'One' },
            { q: '👋 Hello! How do you say "Adiós"?', options: ['Please', 'Sorry', 'Goodbye', 'Welcome'], a: 'Goodbye' },
        ],
        lower: [
            { q: '📕 ¿Cómo se dice "Libro" en inglés?', options: ['Pencil', 'Book', 'Chair', 'School'], a: 'Book' },
            { q: '🌞 "The sun is...", ¿de qué color es el sol?', options: ['Blue', 'Yellow', 'Black', 'Pink'], a: 'Yellow' },
            { q: '🥛 "I drink...", ¿qué bebes cuando tienes sed?', options: ['Bread', 'Milk', 'Cake', 'Pizza'], a: 'Milk' },
            { q: '👨‍👩‍👧‍👦 How do you say "Familia"?', options: ['Friends', 'Family', 'Teacher', 'Pilot'], a: 'Family' },
            { q: '✈️ Pilot Tuto flies a...', options: ['Bus', 'Plane', 'Train', 'Bike'], a: 'Plane' },
        ],
        upper: [
            { q: '🏃 Complete the sentence: "I ___ to the park every day"', options: ['Run', 'Sleep', 'Blue', 'Cold'], a: 'Run' },
            { q: '🐘 An elephant is very...', options: ['Small', 'Big', 'Fast', 'Yellow'], a: 'Big' },
            { q: '📅 What is the first day of the week?', options: ['Friday', 'Monday', 'Sunday', 'Saturday'], a: 'Monday' },
            { q: '🥪 Identify the food:', options: ['Sandwich', 'Computer', 'Guitar', 'Grass'], a: 'Sandwich' },
            { q: '🌳 Correct the sentence: "The trees IS green"', options: ['Trees ARE green', 'Trees AM green', 'Trees BE green', 'Trees WAS green'], a: 'Trees ARE green' },
        ]
    },
    social: {
        kinder: [
            { q: '🏠 ¿Quiénes forman tu familia?', options: ['Mis amigos', 'Mis maestros', 'Papá, mamá y hermanos', 'Mis vecinos'], a: 'Papá, mamá y hermanos' },
            { q: '🏫 ¿Para qué vamos a la escuela?', options: ['Para dormir', 'Para aprender', 'Para comer dulces', 'Para ver tele'], a: 'Para aprender' },
        ],
        lower: [
            { q: '🌍 ¿Cuál es el nombre de nuestro hermoso planeta?', options: ['Marte', 'Júpiter', 'Tierra', 'Venus'], a: 'Tierra' },
            { q: '✈️ ¿Qué medio de transporte viaja por el cielo?', options: ['Barco', 'Tren', 'Avión', 'Carro'], a: 'Avión' },
        ],
        upper: [
            { q: '🇲🇽 ¿Qué celebramos el día de la independencia?', options: ['Un cumpleaños', 'La libertad de nuestro país', 'El inicio de clases', 'Navidad'], a: 'La libertad de nuestro país' },
            { q: '🗺️ ¿Cuántos continentes tiene la Tierra?', options: ['3', '5', '6', '7'], a: '6' },
        ]
    }
};

const generateQuestions = (subject, grade) => {
    const subjectData = questionDatabase[subject] || questionDatabase.math; // Fallback to math

    let gradeKey = 'kinder';
    if (grade === 'kinder') {
        gradeKey = 'kinder';
    } else if (parseInt(grade) <= 3) {
        gradeKey = 'lower';
    } else {
        gradeKey = 'upper';
    }

    return subjectData[gradeKey] || subjectData.kinder;
};

const Game = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [questions, setQuestions] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [gameStatus, setGameStatus] = useState('playing'); // playing, correct, incorrect, finished, gameOver
    const [feedbackMessage, setFeedbackMessage] = useState('');

    useEffect(() => {
        const qs = generateQuestions(id, user?.grade || 'kinder');
        setQuestions(qs);
    }, [id, user]);

    // Narrador: Hablar cuando cambia la pregunta
    useEffect(() => {
        if (questions.length > 0 && gameStatus === 'playing') {
            const lang = id === 'english' ? 'en-US' : 'es-MX';
            speak(questions[currentQIndex].q, { isQuestion: true, lang });
        }
    }, [currentQIndex, questions, gameStatus, id]);

    const handleAnswer = (answer) => {
        playSound('click'); // Sonido de clic al elegir
        const currentQ = questions[currentQIndex];
        if (answer === currentQ.a) {
            playSound('correct');
            const successMessages = ['¡Muy bien! 🎉', '¡Eres un genio! 🌟', '¡Increíble! 🚀', '¡Sigue así! ✨'];
            const chosenMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
            setFeedbackMessage(chosenMessage);
            setGameStatus('correct');
            setScore(s => s + 10);
            const lang = id === 'english' ? 'en-US' : 'es-MX';
            speak(chosenMessage, { lang }); // Tuto celebra con voz
        } else {
            playSound('incorrect');
            const failMessage = `La respuesta correcta era: ${currentQ.a} 🧐`;
            setFeedbackMessage(failMessage);
            setGameStatus('incorrect');
            setLives(prev => prev - 1);

            const lang = id === 'english' ? 'en-US' : 'es-MX';
            const isEn = lang === 'en-US';

            const oopsMessages = isEn
                ? ['Oh no!', 'Almost!', 'Keep trying!', 'Close!']
                : ['¡Oh no!', '¡Casi!', '¡Vaya!', '¡Uyyy!'];

            const encouragement = isEn
                ? 'You can do it.'
                : 'Casi lo logras.';

            const chosenOops = oopsMessages[Math.floor(Math.random() * oopsMessages.length)];
            speak(`${chosenOops} ${encouragement} ${failMessage}`, { lang });
        }
    };

    const handleContinue = () => {
        playSound('click');
        if (lives <= 0 && gameStatus === 'incorrect') {
            setGameStatus('gameOver');
            return;
        }

        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
            setGameStatus('playing');
        } else {
            playSound('success');
            setGameStatus('finished');
            playSound('pop'); // Sonido extra de confeti
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FF9A9E', '#4ECDC4', '#FFE66D', '#6bceff']
            });
        }
    };

    const resetGame = () => {
        setCurrentQIndex(0);
        setLives(3);
        setScore(0);
        setGameStatus('playing');
    };

    const progress = questions.length > 0 ? ((currentQIndex) / questions.length) * 100 : 0;
    const finalProgress = gameStatus === 'finished' ? 100 : progress;

    const getSubjectName = (id) => {
        const names = { math: 'Matemáticas', spanish: 'Español', science: 'Ciencias', english: 'Inglés', social: 'Sociales' };
        return names[id] || 'Juego';
    }

    if (gameStatus === 'gameOver') {
        return (
            <div className={styles.container}>
                <div className={styles.content} style={{ justifyContent: 'center' }}>
                    <div className={styles.gameOverCard}>
                        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>😵</div>
                        <h2>¡Oh no!</h2>
                        <p>Te has quedado sin vidas por ahora.</p>
                        <div style={{ margin: '2rem 0' }}>
                            <Button onClick={resetGame} variant="primary">Intentar de nuevo</Button>
                        </div>
                        <Button onClick={() => navigate('/dashboard')} variant="ghost">Volver al mapa</Button>
                    </div>
                </div>
            </div>
        );
    }

    if (gameStatus === 'finished') {
        return (
            <div className={styles.container}>
                <div className={styles.content} style={{ justifyContent: 'center' }}>
                    <div className={styles.finishedCard}>
                        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🏆</div>
                        <h2>¡Felicidades!</h2>
                        <p>Has completado la lección de {getSubjectName(id)}.</p>
                        <p className={styles.finalScore}>⭐ {score} Puntos ganados</p>
                        <Button onClick={() => navigate('/dashboard')} variant="primary" style={{ padding: '1rem 3rem' }}>¡Genial!</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <button onClick={() => navigate('/dashboard')} className={styles.backButton}>
                    <ArrowLeft size={30} />
                </button>

                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar} style={{ width: `${finalProgress}%` }} />
                </div>

                <div className={styles.livesContainer}>
                    {[...Array(3)].map((_, i) => (
                        <span key={i} className={styles.heart}>
                            {i < lives ? '❤️' : '🖤'}
                        </span>
                    ))}
                </div>
            </header>

            <main className={styles.content}>
                <div className={styles.characterContainer}>
                    <PilotBear mood={gameStatus === 'incorrect' ? 'thinking' : 'happy'} />
                </div>

                {questions.length > 0 && (
                    <Quiz
                        key={currentQIndex}
                        question={questions[currentQIndex].q}
                        options={questions[currentQIndex].options}
                        onAnswer={handleAnswer}
                        disabled={gameStatus !== 'playing'}
                    />
                )}
            </main>

            {/* Bottom Feedback Bar */}
            <AnimatePresence>
                {(gameStatus === 'correct' || gameStatus === 'incorrect') && (
                    <motion.div
                        initial={{ y: 200 }}
                        animate={{ y: 0 }}
                        exit={{ y: 200 }}
                        className={`${styles.feedbackBar} ${gameStatus === 'correct' ? styles.feedbackBarCorrect : styles.feedbackBarIncorrect}`}
                    >
                        <div className={styles.feedbackContent}>
                            <div className={styles.feedbackInfo}>
                                <div className={styles.feedbackIcon}>
                                    {gameStatus === 'correct' ? '✅' : '❌'}
                                </div>
                                <div>
                                    <div className={styles.feedbackTitle}>
                                        {gameStatus === 'correct' ? '¡Excelente!' : '¡Sigue practicando!'}
                                    </div>
                                    <div className={styles.feedbackText}>{feedbackMessage}</div>
                                </div>
                            </div>
                            <button
                                onClick={handleContinue}
                                className={`${styles.continueButton} ${gameStatus === 'correct' ? styles.btnCorrect : styles.btnIncorrect}`}
                            >
                                Continuar
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Game;

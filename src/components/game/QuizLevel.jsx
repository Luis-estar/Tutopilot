import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { useGame } from '../../contexts/GameContext';
import { CheckCircle, XCircle, Trophy, RefreshCcw } from 'lucide-react';
import { cn } from '../../lib/utils';
import confetti from 'canvas-confetti';
import { generateQuestion } from '../../data/questions';

export function QuizLevel({ levelData, onComplete }) { // Keeping props for compatibility but largely ignoring levelData content
    const { addXp, takeDamage, hp, selectedGrade, selectedSubject } = useGame();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    // Initial Question Generation
    useEffect(() => {
        if (selectedGrade && selectedSubject) {
            const newQuestions = Array.from({ length: 10 }, () => generateQuestion(selectedGrade, selectedSubject));
            setQuestions(newQuestions);
        } else if (levelData?.questions) {
            // Fallback to levelData if no subject selected (legacy mode)
            setQuestions(levelData.questions);
        }
    }, [selectedGrade, selectedSubject, levelData]);

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return <div className="text-white">Loading mission data...</div>;

    const progress = ((currentQuestionIndex) / questions.length) * 100;

    const handleSelectAnswer = (index) => {
        if (isAnswered) return;
        setSelectedAnswer(index);
        const correct = index === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setIsAnswered(true);

        if (correct) {
            setScore(s => s + 1);
            addXp(10); // +10 XP per correct answer
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#3b82f6', '#8b5cf6', '#10b981']
            });
        } else {
            takeDamage(10); // -10 HP per wrong answer
            // Optional: Shake effect or visual feedback for damage
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
            setIsCorrect(false);
        } else {
            setQuizCompleted(true);
            if (onComplete) onComplete(score);
        }
    };

    const handleRetry = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setIsCorrect(false);
        setScore(0);
        setQuizCompleted(false);
    };

    if (hp <= 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
                <XCircle className="w-24 h-24 text-red-500 mb-6" />
                <h2 className="text-3xl font-bold text-white mb-2">¡Misión Fallida!</h2>
                <p className="text-slate-400 mb-8">Te has quedado sin energía. Recarga y vuelve a intentarlo.</p>
                <Button onClick={() => window.location.reload()} variant="primary" size="lg">Reiniciar Misión</Button>
            </div>
        );
    }

    if (quizCompleted) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
                <Trophy className="w-24 h-24 text-yellow-500 mb-6" />
                <h2 className="text-3xl font-bold text-white mb-2">¡Misión Cumplida!</h2>
                <p className="text-slate-400 mb-8">Puntuación Final: {score} / {levelData.questions.length}</p>
                <div className="flex gap-4">
                    <Button onClick={handleRetry} variant="outline"> <RefreshCcw className="mr-2 w-4 h-4" /> Repetir </Button>
                    <Button onClick={() => window.location.href = '/'} variant="primary">Volver al Mapa</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto w-full">
            {/* Progress Header */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Pregunta {currentQuestionIndex + 1} de {levelData.questions.length}</span>
                    <span>{Math.round(progress)}% Completado</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-game-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-game-surface border border-white/10 rounded-2xl p-8 shadow-2xl mb-8 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">{currentQuestion.question}</h3>

                        <div className="space-y-4">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelectAnswer(index)}
                                    disabled={isAnswered}
                                    className={cn(
                                        "w-full p-4 rounded-xl text-left transition-all border-2 text-lg font-medium relative group",
                                        isAnswered && index === currentQuestion.correctAnswer
                                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                                            : isAnswered && index === selectedAnswer && index !== currentQuestion.correctAnswer
                                                ? "bg-red-500/20 border-red-500 text-red-400"
                                                : "bg-slate-800/50 border-slate-700 hover:border-game-primary hover:bg-slate-800 text-slate-300"
                                    )}
                                >
                                    <span className="flex items-center justify-between">
                                        {option}
                                        {isAnswered && index === currentQuestion.correctAnswer && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                                        {isAnswered && index === selectedAnswer && index !== currentQuestion.correctAnswer && <XCircle className="w-5 h-5 text-red-500" />}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Action Bar */}
            <div className="flex justify-end h-16">
                {isAnswered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Button
                            onClick={handleNextQuestion}
                            size="lg"
                            className={cn("w-full md:w-auto", isCorrect ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-600 hover:bg-slate-700")}
                        >
                            {isCorrect ? "¡Correcto! Continuar" : "Continuar"}
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

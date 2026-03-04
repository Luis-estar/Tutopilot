```javascript
import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { GRADES, SUBJECTS } from '../../data/questions';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

export default function GradeSelector({ onStart }) {
    const { setSelectedGrade, setSelectedSubject } = useGame();
    const [localGrade, setLocalGrade] = useState(null);
    const [localSubject, setLocalSubject] = useState(null);

    const handleGradeSelect = (grade) => {
        setLocalGrade(grade);
        // Reset subject when grade changes just in case
        setLocalSubject(null);
    };

    const handleSubjectSelect = (subject) => {
        setLocalSubject(subject);
    };

    const handleStart = () => {
        if (localGrade && localSubject) {
            setSelectedGrade(localGrade);
            setSelectedSubject(localSubject);
            onStart(); // Call the original onStart prop to proceed
        }
    };

    const canStart = localGrade && localSubject;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl space-y-12"
            >
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Welcome to Tutopilot!
                    </h1>
                    <p className="text-xl text-slate-400">Select your grade and subject to begin your adventure</p>
                </div>

                {/* Grade Selection */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-center">Select Your Grade</h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {GRADES.map((grade) => (
                            <motion.button
                                key={grade}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setLocalGrade(grade)}
                                className={`
p - 6 rounded - 2xl text - 2xl font - bold transition - all
                                    ${
    localGrade === grade
    ? 'bg-blue-500 shadow-lg shadow-blue-500/30 border-2 border-blue-400'
    : 'bg-slate-800 hover:bg-slate-700 border-2 border-slate-700'
}
`}
                            >
                                {grade}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Subject Selection (Only visible if grade selected) */}
                {localGrade && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-semibold text-center">Choose Your Mission</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {Object.entries(SUBJECTS).map(([key, value]) => (
                                <motion.button
                                    key={key}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setLocalLocalSubject(value)}
                                    className={`
p - 8 rounded - 2xl text - xl font - bold capitalize transition - all
                                        ${
    localSubject === value
    ? 'bg-purple-500 shadow-lg shadow-purple-500/30 border-2 border-purple-400'
    : 'bg-slate-800 hover:bg-slate-700 border-2 border-slate-700'
}
`}
                                >
                                    {value}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Start Button */}
                <div className="flex justify-center pt-8">
                    <Button 
                        size="lg" 
                        variant={canStart ? 'primary' : 'disabled'}
                        disabled={!canStart}
                        onClick={handleStart}
                        className="w-full md:w-auto px-12 py-6 text-xl"
                    >
                        Start Adventure
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}

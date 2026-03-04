import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [hp, setHp] = useState(100);
    const [maxHp, setMaxHp] = useState(100);
    const [streak, setStreak] = useState(1);
    const [xpToNextLevel, setXpToNextLevel] = useState(100);

    // New State for Education Overhaul
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);

    // Level up logic
    useEffect(() => {
        if (xp >= xpToNextLevel) {
            setLevel(l => l + 1);
            setXp(current => current - xpToNextLevel);
            setXpToNextLevel(prev => Math.floor(prev * 1.5));
            // Heals on level up
            setHp(maxHp);
        }
    }, [xp, xpToNextLevel, maxHp]);

    const addXp = (amount) => {
        setXp(prev => prev + amount);
    };

    const takeDamage = (amount) => {
        setHp(prev => Math.max(0, prev - amount));
    };

    const info = {
        xp,
        level,
        hp,
        maxHp,
        streak,
        xpToNextLevel,
        addXp,
        takeDamage,
        selectedGrade,
        setSelectedGrade,
        selectedSubject,
        setSelectedSubject
    };

    return (
        <GameContext.Provider value={info}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}

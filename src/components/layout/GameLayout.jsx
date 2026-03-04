import { Link, useLocation } from "react-router-dom";
import { useGame } from "../../contexts/GameContext";
import {
    Gamepad2,
    Map as MapIcon,
    Trophy,
    User,
    Zap,
    Heart
} from "lucide-react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export function GameLayout({ children }) {
    const { xp, level, hp, maxHp, xpToNextLevel } = useGame();
    const location = useLocation();

    const navItems = [
        { icon: MapIcon, label: "Misiones", path: "/" },
        { icon: Gamepad2, label: "Arcade", path: "/arcade" },
        { icon: Trophy, label: "Logros", path: "/achievements" },
        { icon: User, label: "Perfil", path: "/profile" },
    ];

    return (
        <div className="min-h-screen bg-game-background text-white font-sans flex">
            {/* Sidebar Navigation */}
            <aside className="w-20 lg:w-64 bg-game-surface border-r border-white/10 flex flex-col items-center lg:items-stretch py-6 z-20">
                <div className="mb-8 px-4 flex flex-col items-center justify-center gap-3">
                    <div className="relative w-24 h-24 lg:w-32 lg:h-32 transition-transform hover:scale-105 duration-300">
                        <img
                            src="/assets/logo.png"
                            alt="Tutopilot Logo"
                            className="w-full h-full object-contain drop-shadow-lg"
                        />
                    </div>
                </div>

                <nav className="flex-1 w-full space-y-2 px-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative overflow-hidden",
                                    isActive
                                        ? "bg-game-primary/10 text-game-primary shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-game-primary/10 rounded-xl"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <item.icon className={cn("w-6 h-6 relative z-10", isActive && "text-game-primary")} />
                                <span className="hidden lg:block relative z-10 font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Top Stats Bar */}
                <header className="h-20 border-b border-white/10 bg-game-background/80 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        {/* Level Badge */}
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Nivel</span>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-white">{level}</span>
                                <span className="text-sm text-slate-500">Cadete Espacial</span>
                            </div>
                        </div>

                        {/* XP Bar */}
                        <div className="hidden md:flex flex-col w-48 gap-1">
                            <div className="flex justify-between text-xs font-bold text-slate-400">
                                <span>XP</span>
                                <span>{xp} / {xpToNextLevel}</span>
                            </div>
                            <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(xp / xpToNextLevel) * 100}%` }}
                                    className="h-full bg-gradient-to-r from-game-primary to-game-secondary shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* HP Display */}
                        <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-white/5">
                            <Heart className="w-5 h-5 text-game-danger fill-game-danger" />
                            <span className="font-bold text-lg">{hp}/{maxHp}</span>
                        </div>

                        {/* Streak Display */}
                        <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-white/5">
                            <Zap className="w-5 h-5 text-game-warning fill-game-warning" />
                            <span className="font-bold text-lg">5</span>
                        </div>

                        {/* Avatar placeholder */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 border border-white/20" />
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative">
                    {/* Background grid effect */}
                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }}
                    />
                    <div className="relative z-10 max-w-6xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}

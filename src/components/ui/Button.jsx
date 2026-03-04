import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export function Button({
    className,
    variant = "primary",
    size = "md",
    children,
    ...props
}) {
    const variants = {
        primary: "bg-game-primary text-white hover:bg-blue-600 shadow-blue-500/20",
        secondary: "bg-game-secondary text-white hover:bg-violet-600 shadow-violet-500/20",
        accent: "bg-game-accent text-white hover:bg-emerald-600 shadow-emerald-500/20",
        outline: "border-2 border-slate-600 text-slate-300 hover:border-white hover:text-white bg-transparent",
        ghost: "bg-transparent hover:bg-white/10 text-slate-300 hover:text-white shadow-none",
        danger: "bg-game-danger text-white hover:bg-red-600 shadow-red-500/20",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        icon: "p-3",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative inline-flex items-center justify-center rounded-xl font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:pointer-events-none shadow-lg",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {/* Optional: Add a subtle shine effect or border here if desired */}
            {children}
        </motion.button>
    );
}

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored user on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock login logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const foundUser = users.find(u => u.email === email && u.password === password);

                if (foundUser) {
                    const { password, ...userWithoutPassword } = foundUser;
                    setUser(userWithoutPassword);
                    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
                    resolve(userWithoutPassword);
                } else {
                    reject(new Error('Credenciales incorrectas'));
                }
            }, 500);
        });
    };

    const register = async (name, email, password, grade) => {
        // Mock register logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');

                if (users.find(u => u.email === email)) {
                    reject(new Error('El usuario ya existe'));
                    return;
                }

                const newUser = { id: Date.now().toString(), name, email, password, grade, progress: {}, points: 0 };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // Auto login after register
                const { password: _, ...userWithoutPassword } = newUser;
                setUser(userWithoutPassword);
                localStorage.setItem('user', JSON.stringify(userWithoutPassword));
                resolve(userWithoutPassword);
            }, 500);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

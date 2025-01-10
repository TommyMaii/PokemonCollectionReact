import React, { createContext, useContext, useState } from 'react';
import { setAuthState, getAuthState} from "./authState"

interface AuthContextProps {
    isAuthenticated: boolean;
    loginUser: (token:string) => void;
    logoutUser: () => void;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const loginUser = (accessToken:string) => {
        setAuthState(accessToken);
        setIsAuthenticated(true);
    };

    const logoutUser = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// const AuthContext:any = createContext(null);
//
// export const AuthProvider = ({ children }:any) => {
//     const [token, setToken] = useState<string>();
//     const login = (userToken:string) => {
//         setToken(userToken);
//     };
//     const logout = () => {
//         setToken("");
//     };
//     const isAuthenticated = !!token;
//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };
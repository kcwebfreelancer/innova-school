import React, { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(false);
    const userRoleLocalStorage = localStorage.getItem('userRole');
    const [userRole, setUserRole] = useState(userRoleLocalStorage || '');
    
    const login = (userToken) => {
        setToken(userToken);
    }

    const logout = () => {
       setUserRole('');
    }
    const loggedIn = (userRole) => {
        setUserRole(localStorage.setItem('userRole', userRole));
    }

    const isAuthenticated = !!token;

    return(
        <AuthContext.Provider value={{userRole, login, logout, isAuthenticated, loggedIn}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
const ProtectedRouteContext = createContext();

export const ProtectedRouteProvider = ({ children }) => {
    let [user, setUser] = useState(null);
    let userRole = localStorage.getItem('userRole');
    let navigate = useNavigate();
    console.log('user...', user)
    if(userRole === ''){
        navigate('/', {replace:true});
    }
    if (user === null) {
        console.log('inside')
        navigate('/');
    }
    return (
        <ProtectedRouteContext.Provider value={user}>{children}</ProtectedRouteContext.Provider>
    )
}

export const useProtectedRoute = () => useContext(ProtectedRouteContext);
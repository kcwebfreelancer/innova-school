import React, { useContext, createContext, useState, useEffect } from 'react';

const StudentsContext = createContext();

export const StudentsProvider = ({ children }) => {
    const [students, setStudents] = useState(0);
    
    const handleStudentsContextApi = (data) => {
        setStudents(data);
    }
   
    return (
        <StudentsContext.Provider value={{ students, handleStudentsContextApi }}>{children}</StudentsContext.Provider>
    )
}

export const useStudents = () => useContext(StudentsContext);
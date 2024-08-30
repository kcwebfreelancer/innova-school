import React, {createContext, useContext, useState} from 'react';

const UtilsAuth = createContext();

export const UthilsProvider = ({children}) => {
    const [sideBarToggle, setSideBarToggle] = useState(null);

    const sideBarToggleFn = (sideBarToggle) => {
        setSideBarToggle(!sideBarToggle);
    }

    //console.log('sideBarToggle....', sideBarToggle)
    return(
        <UtilsAuth.Provider value={{sideBarToggleFn, sideBarToggle}}>{children}</UtilsAuth.Provider>
    )
}

export const useUtils = () => useContext(UtilsAuth);
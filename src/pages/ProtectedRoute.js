import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ProtectedRouteProvider } from '../contextapi/ProtextedRouteContext'
const ProtectedRoute = ({ children }) => {
    return (
        <>

            <ProtectedRouteProvider user={false}>
                {children}
            </ProtectedRouteProvider>

        </>
    )
}

export default ProtectedRoute
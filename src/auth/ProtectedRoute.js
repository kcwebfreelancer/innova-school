import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "../contextapi/AuthContext";

const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
    const { user } = useAuth();
    return (
        <Route {...rest} render={(props) => {
            if (!user) {
              return <Navigate to='/' />;
            }
      
            if (roles && !roles.includes(user.role)) {
              return <Navigate to='/' />;
            }
      
            return <Component {...props} />;
          }} />

    )
}

export default ProtectedRoute;
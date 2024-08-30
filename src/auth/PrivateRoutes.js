import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contextapi/AuthContext";

const PrivateRoutes = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet/> : <Navigate to="/"/>
}

export default PrivateRoutes;
import { Outlet, Navigate } from "react-router-dom";

/**
 * Component for rendering private routes based on authentication status.
 * @param {Object} props - Component props.
 * @param {boolean} props.authenticated - Indicates if the user is authenticated.
 * @returns {JSX.Element} PrivateRoutes component.
 */
const PrivateRoutes = (props) => {
    return props.authenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;

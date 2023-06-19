import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = (props) => {
	return props.authenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;

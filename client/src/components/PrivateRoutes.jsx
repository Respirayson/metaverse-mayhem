import React from 'react'
import { Outlet, Navigate } from "react-router-dom";

const privateRoutes = (props) => {
    
  return (
    props.authenticated ? <Outlet /> : <Navigate to="/" />
  )
}

export default privateRoutes
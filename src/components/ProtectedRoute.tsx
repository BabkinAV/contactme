import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from '../store/hooksStore';

interface Props {
    children?: JSX.Element
}

const ProtectedRoute = ({ children }:Props) => {
  const isAuthenticated = useAppSelector((state) => state.ui.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
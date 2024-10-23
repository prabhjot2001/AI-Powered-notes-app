// src/components/custom/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";

const ProtectedRoute = () => {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

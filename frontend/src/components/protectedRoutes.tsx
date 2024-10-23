import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuthContext(); 

  if (loading) {

    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/demo" />;
};

export default ProtectedRoute;

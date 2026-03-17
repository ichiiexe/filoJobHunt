import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { currUser, token } = useAuth();
  const location = useLocation();

  if (!token || !currUser) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

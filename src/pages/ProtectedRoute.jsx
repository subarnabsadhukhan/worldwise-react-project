import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticate } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticate) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticate, navigate]);
  return children;
}

export default ProtectedRoute;

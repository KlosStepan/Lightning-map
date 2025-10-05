import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux-rtk/miscSlice";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/logintest`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          console.log("[ProtectedRoute] /logintest response:", data);
          setIsAuthenticated(true);
          dispatch(setUser(data || null));
          console.log("[ProtectedRoute] setUser dispatched:", data || null);
        } else {
          setIsAuthenticated(false);
          dispatch(setUser(null));
          console.log("[ProtectedRoute] Not authenticated, setUser(null) dispatched");
        }
      } catch (err) {
        setIsAuthenticated(false);
        dispatch(setUser(null));
        console.log("[ProtectedRoute] Network error, setUser(null) dispatched");
      } finally {
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, [dispatch]);

  if (!authChecked) return null; // or a spinner

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
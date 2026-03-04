import React, { useEffect, useState } from "react";
// Axios
import axios from "axios";
// Redux + RTK
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux-rtk/miscSlice";
import { RootState } from "../redux-rtk/store";
// Types
import IUser from "../ts/IUser";
// Router
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);

  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get<IUser>(`${apiBaseUrl}/logintest`, {
          withCredentials: true,
        });

        const user = res.data; // IUser
        console.log("[ProtectedRoute] /logintest response:", user);

        setIsAuthenticated(true);
        dispatch(setUser(user));
        console.log("[ProtectedRoute] setUser dispatched:", user);
      } catch (err) {
        console.error("[ProtectedRoute] checkAuth failed:", err);
        setIsAuthenticated(false);
        dispatch(setUser(null));
        console.log("[ProtectedRoute] Not authenticated / network error");
      } finally {
        setAuthChecked(true);
      }
    };

    if (apiBaseUrl) checkAuth();
  }, [apiBaseUrl, dispatch]);

  if (!authChecked) return null;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
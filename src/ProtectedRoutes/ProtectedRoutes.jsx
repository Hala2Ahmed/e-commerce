import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/authContext";

export default function ProtectedRoutes({ children }) {
  const { islogged } = useContext(authContext);
  return islogged ? children : <Navigate to="/login" />;
}

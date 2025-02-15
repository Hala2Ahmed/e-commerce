import React, { useContext } from "react";
import { authContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export default function ProtectedAuthRoute({ children }) {
  const { islogged } = useContext(authContext);
  return islogged ? <Navigate to="/" /> : children;
}

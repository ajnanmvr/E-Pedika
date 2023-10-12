import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function ProtectedRoutes({ children }) {
  const { user, getUserDataFromLocalStorage } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUserDataFromLocalStorage();
  }, []);

  return <div>{children}</div>;
}

export default ProtectedRoutes;

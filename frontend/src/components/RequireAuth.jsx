/*
This page is dedicated to check if the users token has expired or not, if it is expired user will need to reauthenticate
*/
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const RequireAuth = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;

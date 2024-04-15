/*
This page is dedicated to check if the users token has expired or not, if it is expired user will need to reauthenticate
*/
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/action/authSlice";
const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation(); //useLocation gives you the current page where the user is at.
  return (
    <>
      {token ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;

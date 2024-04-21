/*
This page is dedicated to check if the users token has expired or not, if it is expired user will need to reauthenticate
*/
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const RequireAuth = () => {
  const location = useLocation(); //useLocation gives you the current page where the user is at.
  return (
    <>
      <Outlet />
      {/* This is a very basic token check, need to refactor once backend is setup properly */}
      {/* {token ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )} */}
    </>
  );
};

export default RequireAuth;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/action/authSlice";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <div className="flex justify-center">
        <h1 className="h-1">
          You are logged in as{" "}
          <span className="font-bold">{userInfo.fullName}</span>
        </h1>
      </div>
    </>
  );
};
export default Profile;

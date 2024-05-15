import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/action/authSlice";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  return (
    <>
      <h1>This is where we show user's profile info...</h1>
    </>
  );
};
export default Profile;

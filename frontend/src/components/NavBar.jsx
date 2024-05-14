import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaSun, FaMoon } from "react-icons/fa6";
import { useState } from "react";
import { useTheme } from "../contexts/themeContext";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/action/userApiSlice";
import { logOut } from "../redux/action/authSlice";
const NavBar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isToggled, setIsToggled] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); // this is for calling the backend to logout the user
      dispatch(logOut()); // this is for clearing users login details from localStorage
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // when clicking hamburger icon
  const toggleMenu = () => {
    setIsToggled(!isToggled);
  };
  return (
    <>
      <nav className="border-grey-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          <Link
            className="flex items-center self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            to="/"
          >
            Chat App
          </Link>
          {/* hamburger icon */}
          <button
            onClick={toggleMenu}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-900 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <FaBars size={20} />
          </button>

          {/* nav items */}
          <div
            className={`${
              isToggled ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4  md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-70">
              {userInfo ? (
                <>
                  <li>
                    <Link className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}

              <button
                onClick={toggleDarkMode}
                className="inline-flex items-center rounded-lg"
              >
                {isDarkMode ? (
                  <FaSun color="white" />
                ) : (
                  <FaMoon color="black" />
                )}
              </button>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import {
  FaUsers,
  FaCalculator,
  FaFile,
  FaFileCirclePlus,
} from "react-icons/fa6";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <NavLink
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              to="/criteria"
            >
              <FaFileCirclePlus />
              <span className="mx-4 font-medium">Data Kriteria</span>
            </NavLink>
            {/* <NavLink
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              to="/subcriteria"
            >
              <FaFile />
              <span className="mx-4 font-medium">Data Sub Kriteria</span>
            </NavLink> */}

            <NavLink
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              to="/employees"
            >
              <FaUsers />
              <span className="mx-4 font-medium">Data Karyawan</span>
            </NavLink>
            <NavLink
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              to="/calculation"
            >
              <FaCalculator />
              <span className="mx-4 font-medium">Data Perhitungan</span>
            </NavLink>

            <hr className="my-6 border-gray-200 dark:border-gray-600" />
            <button
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              onClick={logout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>

              <span className="mx-4 font-medium">Keluar</span>
            </button>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

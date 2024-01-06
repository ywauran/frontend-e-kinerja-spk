import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../features/authSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-200">
          <div className="flex justify-end p-4 font-semibold text-black bg-white">
            Halo {user && user.name}
          </div>
          <main className="p-4">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import Logo from "../assets/manado.png";

// Import statements (unchanged)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/criteria");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [isError]);
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center w-full px-6 m-auto bg-white rounded-lg shadow md:w-1/2 lg:w-1/3"
      >
        <img src={Logo} alt="" className="w-32 h-32" />
        <h2 className="my-4 text-2xl font-bold">Masuk</h2>

        <div className="flex flex-col justify-start w-full p-2">
          <div className="flex flex-row">
            <span className="flex items-center justify-center w-10 h-10 text-2xl text-gray-400 border border-r-0 rounded-l-lg z-highest">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 26 26"
                className="iconify iconify--wpf"
              >
                <path
                  d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <input
              className="w-full pl-1 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-red-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username"
              required={false}
            />
          </div>

          <div className="flex flex-row my-4">
            <span className="flex items-center justify-center w-10 h-10 text-2xl text-gray-400 border border-r-0 rounded-l-lg z-highest">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 32 32"
                className="iconify iconify--carbon"
              >
                <path
                  d="M21 2a8.998 8.998 0 0 0-8.612 11.612L2 24v6h6l10.388-10.388A9 9 0 1 0 21 2zm0 16a7.013 7.013 0 0 1-2.032-.302l-1.147-.348l-.847.847l-3.181 3.181L12.414 20L11 21.414l1.379 1.379l-1.586 1.586L9.414 23L8 24.414l1.379 1.379L7.172 28H4v-3.172l9.802-9.802l.848-.847l-.348-1.147A7 7 0 1 1 21 18z"
                  fill="currentColor"
                ></path>
                <circle cx="22" cy="10" r="2" fill="currentColor"></circle>
              </svg>
            </span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              className="w-full h-10 pl-1 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-red-300"
              required={false}
            />
          </div>
          {isError && (
            <p className="w-full p-2 text-center text-white bg-red-400">
              {message}
            </p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 my-4 text-white bg-red-400 rounded hover:bg-red-700"
          >
            {isLoading ? (
              <div className="w-12 h-12 border-2 border-red-500 border-solid rounded-full animate-spin border-t-transparent"></div>
            ) : (
              "Masuk"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

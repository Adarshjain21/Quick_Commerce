import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails.js";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice.js";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handlechange = (e) => {
    // console.log(e.target);

    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accessToken",response.data.data.accessToken)
        localStorage.setItem("refreshToken",response.data.data.refreshToken)

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))

        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }

      console.log("response", response);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto ">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-6">

        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200"
              name="email"
              value={data.email}
              onChange={handlechange}
              placeholder="Enter your email"
            />
          </div>
          <div className="grid gap-1 ">
            <label htmlFor="password">Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full outline-none bg-blue-50"
                name="password"
                value={data.password}
                onChange={handlechange}
                placeholder="Enter your password"
              />

              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <Link to={'/forgot-password'} className="block ml-auto hover:text-primary-100">Forgot Password ?</Link>
          </div>
          

          <button
            disabled={!validValue}
            className={`${
              validValue
                ? "bg-green-700 hover:bg-green-800"
                : "bg-gray-500 cursor-not-allowed	"
            } text-white py-2 rounded font-semibold my-3 tracking-wider`}
          >
            Login
          </button>
        </form>

        <p>
          Don't have account ?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
import React, { useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handlechange = (e) => {

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
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/otp-verification", {
          state: data,
        });
        setData({
          email: "",
        });
      }

    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto flex justify-center items-center min-h-[77vh]">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-6">
        <p className="font-semibold text-lg">Forgot Password</p>
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

          <button
            disabled={!validValue}
            className={`${
              validValue
                ? "bg-green-700 hover:bg-green-800"
                : "bg-gray-500 cursor-not-allowed	"
            } text-white py-2 rounded font-semibold my-3 tracking-wider`}
          >
            Send Otp
          </button>
        </form>

        <p>
          Already have account ?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

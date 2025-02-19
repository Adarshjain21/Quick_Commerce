import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { logout } from "../store/userSlice";
import AxiosToastError from "../utils/AxiosToastError";
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });

      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div>
      <div className="font-semibold">My Accounts</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">{user.name}<span className="text-[12px] text-red-600">{user.role === 'ADMIN' ? " (Admin)" : ""}</span></span>
        <Link
          to={"/dashboard/profile"}
          className="hover:text-primary-200"
          onClick={handleClose}
        >
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>

      <Divider />

      <div className="text-sm grid gap-1">
      {
        isAdmin(user.role) && (
          <Link
          to={"/dashboard/category"}
          className="px-2 hover:bg-orange-200 py-1"
          onClick={handleClose}
        >
          Category
        </Link>
        )
      }
      {
        isAdmin(user.role) && (
          <Link
          to={"/dashboard/subCategory"}
          className="px-2 hover:bg-orange-200 py-1"
          onClick={handleClose}
        >
          Sub Category
        </Link>
        )
      }
      {
        isAdmin(user.role) && (
          <Link
          to={"/dashboard/upload-product"}
          className="px-2 hover:bg-orange-200 py-1"
          onClick={handleClose}
        >
          Upload Product
        </Link>
        )
      }
      {
        isAdmin(user.role) && (
          <Link
          to={"/dashboard/product"}
          className="px-2 hover:bg-orange-200 py-1"
          onClick={handleClose}
        >
          Product
        </Link>
        )
      }
        
        
        
        
        <Link
          to={"/dashboard/myorders"}
          className="px-2 hover:bg-orange-200 py-1"
          onClick={handleClose}
        >
          My Order
        </Link>
        <Link
          to={"/dashboard/address"}
          className="px-2 hover:bg-orange-200 py-1"
          onClick={handleClose}
        >
          Save Address
        </Link>
        <button
          className="text-left px-2 hover:bg-orange-200 py-1"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;

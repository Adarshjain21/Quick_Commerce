import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center">
        <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="h-full w-full" />
          ) : (
            <FaRegUserCircle size={65} />
          )}
        </div>

        <button
          onClick={() => setOpenProfileAvatarEdit(true)}
          className="text-xs min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3"
        >
          Change profile
        </button>
      </div>
      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setOpenProfileAvatarEdit(false)} />
      )}

      <form className="my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
            value={userData.name}
            name="name"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
            value={userData.email}
            name="email"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Mobile</label>
          <input
            id="mobile"
            type="text"
            placeholder="Enter your mobile"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
            value={userData.mobile}
            name="mobile"
            onChange={handleOnChange}
            required
          />
        </div>
        <button className="mx-4 py-2 font-semibold hover:bg-primary-100 border border-primary-100 text-primary-200 hover:text-neutral-800 rounded">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;

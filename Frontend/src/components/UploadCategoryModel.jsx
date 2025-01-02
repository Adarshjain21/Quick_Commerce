import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/uploadImage.js";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError.js";

const UploadCategoryModel = ({ close, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
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
        ...SummaryApi.addCategory,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected.");
      return;
    }
  
    setUploadLoading(true);
    try {
      const response = await uploadImage(file);
      // console.log(response);
      
  
      if (response && response.data) {
        const { data: ImageResponse } = response;
  
        setData((prev) => ({
          ...prev,
          image: ImageResponse.data.url,
        }));
  
        toast.success("Image uploaded successfully.");
      } else {
        toast.error("Failed to upload image. Please try again.");
      }
    } catch (error) {
      AxiosToastError(error); // Custom error handler
    } finally {
      setUploadLoading(false);
    }
  };
  
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Category</h1>
          <button className="w-fit block ml-auto">
            <IoClose size={25} onClick={close} />
          </button>
        </div>
        <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter Category Name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="category"
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500 rounded">No Image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`
                ${
                  !data.name
                    ? "bg-gray-300 cursor-not-allowed"
                    : "border-primary-200 hover:bg-primary-100 cursor-pointer"
                }
                px-4 py-2 rounded border font-medium
                `}
                >
                  {uploadLoading ? "Loading..." : "Upload Image"}
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            disabled={!data.name || !data.image}
            className={`
          ${
            data.name && data.image
              ? "bg-primary-200 hover:bg-primary-100 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }
          py-2 font-semibold rounded
          `}
          >
            {loading ? "Loading..." : "Add Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
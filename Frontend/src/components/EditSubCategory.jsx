import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import uploadImage from "../utils/uploadImage";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const EditSubCategory = ({ close, data, fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    _id: data._id,
    name: data.name,
    image: data.image,
    category: data.category || [],
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const allCategory = useSelector((state) => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSubCategoryData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file selected.");
      return;
    }

    setUploadLoading(true);
    try {
      const response = await uploadImage(file);

      if (response && response.data) {
        const { data: ImageResponse } = response;

        setSubCategoryData((prev) => ({
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

  const handleRemoveCategorySelected = (categoryId) => {
    const updatedCategories = subCategoryData.category.filter(
      (el) => el._id !== categoryId
    );

    // Update the state with the new array
    setSubCategoryData((prev) => ({
      ...prev,
      category: updatedCategories,
    }));
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateSubCategory,
        data: subCategoryData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();
        }
        if (fetchData) {
          fetchData();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-neutral-800 bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white p-4 rounded">
        <div className="flex justify-between items-center gap-3">
          <h1 className="font-semibold">Edit Sub Category</h1>
          <button>
            <IoClose size={25} onClick={close} />
          </button>
        </div>
        <div>
          <form className="my-3 grid gap-3" onSubmit={handleSubmitSubCategory}>
            <div className="grid gap-1">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={subCategoryData.name}
                onChange={handleChange}
                type="text"
                className="p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded"
              />
            </div>
            <div className="grid gap-1">
              <p>Image</p>
              <div className="flex flex-col lg:flex-row items-center gap-3">
                <div className="border h-36 w-full lg:w-36 bg-blue-50 flex justify-center items-center">
                  {!subCategoryData.image ? (
                    <p className="text-sm text-neutral-400">No image</p>
                  ) : (
                    <img
                      src={subCategoryData.image}
                      alt="SubCategory"
                      className="w-full h-full object-scale-down"
                    />
                  )}
                </div>
                <label htmlFor="uploadSubCategoryImage">
                  <div className="px-4 py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-900 cursor-pointer">
                    {uploadLoading ? "Loading..." : "Upload Image"}
                  </div>
                  <input
                    type="file"
                    id="uploadSubCategoryImage"
                    className="hidden"
                    onChange={handleUploadSubCategoryImage}
                  />
                </label>
              </div>
            </div>
            <div className="grid gap-1">
              <label htmlFor="">Select Category</label>
              <div className="border focus-within:border-primary-200 rounded">
                <div className="flex items-center flex-wrap gap-2">
                  {subCategoryData.category.map((cat, index) => {
                    return (
                      <p
                        key={cat._id + "selectedValue"}
                        className="bg-white shadow-md px-1 m-1 flex items-center gap-2"
                      >
                        {cat.name}
                        <div
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => handleRemoveCategorySelected(cat._id)}
                        >
                          <IoClose size={20} />
                        </div>
                      </p>
                    );
                  })}
                </div>
                <select
                  className="w-full p-2 bg-transparent outline-none border"
                  onChange={(e) => {
                    const value = e.target.value;
                    const categoryDetails = allCategory.find(
                      (el) => el._id == value
                    );

                    setSubCategoryData((prev) => {
                      return {
                        ...prev,
                        category: [...prev.category, categoryDetails],
                      };
                    });
                  }}
                >
                  <option value={""}>Select Category</option>
                  {allCategory.map((category, index) => {
                    return (
                      <option
                        value={category?._id}
                        key={category._id + "subCategory"}
                      >
                        {category?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <button
              className={`px-4 py-2 border
              ${
                subCategoryData?.name &&
                subCategoryData?.image &&
                subCategoryData?.category[0]
                  ? "bg-primary-200 hover:bg-primary-100"
                  : "bg-gray-200"
              }
              font-semibold
              `}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditSubCategory;

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import uploadImage from "../utils/uploadImage";

const UploadSubCategoryModel = ({ close }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });
  const [uploadLoading, setUploadLoading] = useState(false);

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
      // console.log(response);

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

  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-neutral-800 bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white p-4 rounded">
        <div className="flex justify-between items-center gap-3">
          <h1 className="font-semibold">Add Sub Category</h1>
          <button>
            <IoClose size={25} onClick={close} />
          </button>
        </div>
        <div>
          <form className="my-3 grid gap-3">
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
                <select className="w-full p-2 bg-transparent outline-none">
                  <option value={""} disabled>
                    Select Category
                  </option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;

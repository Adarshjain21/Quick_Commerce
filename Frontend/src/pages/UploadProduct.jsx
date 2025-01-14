import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/uploadImage";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AddMoreField from "../components/AddMoreField";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import successAlert from "../utils/SuccessAlert";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    moreDetails: {},
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUplaodImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setUploadLoading(true);
    try {
      const response = await uploadImage(file);

      if (response && response.data) {
        const { data: ImageResponse } = response;

        setData((prev) => ({
          ...prev,
          image: [...prev.image, ImageResponse.data.url],
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

  const handleDeleteImage = async (index) => {
    setData((prev) => {
      return {
        ...prev,
        image: prev.image.filter((_, i) => i !== index),
      };
    });
  };

  const handleRemoveCategory = async (index) => {
    setData((prev) => {
      return {
        ...prev,
        category: prev.category.filter((_, i) => i !== index),
      };
    });
  };

  const handleRemoveSubCategory = async (index) => {
    setData((prev) => {
      return {
        ...prev,
        subCategory: prev.subCategory.filter((_, i) => i !== index),
      };
    });
  };

  const handleAddField = () => {
    setData((prev) => {
      return {
        ...prev,
        moreDetails: {
          ...prev.moreDetails,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(data);

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          moreDetails: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
      </div>
      <div className="grid p-3">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              id="description"
              type="text"
              placeholder="Enter product description"
              name="description"
              value={data.description}
              onChange={handleChange}
              required
              multiple
              rows={3}
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
            />
          </div>
          <div>
            <p className="font-medium">Image</p>
            <div>
              <label
                htmlFor="productImage"
                className={`bg-blue-50 h-24 border rounded flex justify-center items-center ${
                  uploadLoading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <div className="text-center flex flex-col justify-center items-center">
                  {uploadLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <FaCloudUploadAlt size={35} />
                      <p>Upload Image</p>
                    </>
                  )}
                </div>
                <input
                  disabled={uploadLoading}
                  type="file"
                  name=""
                  id="productImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUplaodImage}
                />
              </label>

              <div className="flex flex-wrap gap-4">
                {data.image.map((img, index) => {
                  return (
                    <div
                      key={img + index}
                      className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group"
                    >
                      <img
                        src={img}
                        alt={img}
                        className="w-full h-full object-scale-down cursor-pointer"
                        onClick={() => setViewImageURL(img)}
                      />
                      <div
                        onClick={() => handleDeleteImage(index)}
                        className="absolute bottom-0 right-0 p-1 bg-red-500 hover:bg-red-600 rounded text-white cursor-pointer hidden group-hover:block"
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="" className="font-medium">
              Category
            </label>
            <div>
              <select
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((el) => el._id === value);

                  setData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, category],
                    };
                  });
                  setSelectCategory("");
                }}
                className="bg-blue-50 border w-full p-2 rounded"
                name=""
                id=""
              >
                <option value={""}>Select Category</option>
                {/* {allCategory.map((c, index) => {
                  return <option value={c?._id}>{c.name}</option>;
                })} */}
                {allCategory.map((category) => {
                  const isSelected = data.category.some(
                    (selectedCategory) => selectedCategory._id === category._id
                  );

                  return (
                    <option
                      value={category._id}
                      key={category._id + "category"}
                      disabled={isSelected} // Disable if the category is already selected
                    >
                      {category.name}
                    </option>
                  );
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.category.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "productsection"}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>
                      <div
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="" className="font-medium">
              Sub Category
            </label>
            <div>
              <select
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(
                    (el) => el._id === value
                  );

                  setData((prev) => {
                    return {
                      ...prev,
                      subCategory: [...prev.subCategory, subCategory],
                    };
                  });
                  setSelectSubCategory("");
                }}
                className="bg-blue-50 border w-full p-2 rounded"
                name=""
                id=""
              >
                <option value={""}>Select Category</option>
                {/* {allSubCategory.map((c, index) => {
                  return <option value={c?._id}>{c.name}</option>;
                })} */}
                {allSubCategory.map((subCategory) => {
                  const isSelected = data.subCategory.some(
                    (selectedSubCategory) =>
                      selectedSubCategory._id === subCategory._id
                  );

                  return (
                    <option
                      value={subCategory._id}
                      key={subCategory._id + "subCategory"}
                      disabled={isSelected} // Disable if the category is already selected
                    >
                      {subCategory.name}
                    </option>
                  );
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.subCategory.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "productsection"}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>
                      <div
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleRemoveSubCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="unit" className="font-medium">
              Unit
            </label>
            <input
              id="unit"
              type="text"
              placeholder="Enter product unit"
              name="unit"
              value={data.unit}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="stock" className="font-medium">
              Number of Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Enter product stock"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="price" className="font-medium">
              Price
            </label>
            <input
              id="price"
              type="number"
              placeholder="Enter product price"
              name="price"
              value={data.price}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="discount" className="font-medium">
              Discount
            </label>
            <input
              id="discount"
              type="number"
              placeholder="Enter product discount"
              name="discount"
              value={data.discount}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {Object?.keys(data?.moreDetails)?.map((k, index) => {
            return (
              <div className="grid gap-1" key={index + "index"}>
                <label htmlFor={k} className="font-medium">
                  {k}
                </label>
                <input
                  id={k}
                  type="text"
                  value={data?.moreDetails[k]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setData((prev) => {
                      return {
                        ...prev,
                        moreDetails: {
                          ...prev.moreDetails,
                          [k]: value,
                        },
                      };
                    });
                  }}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>
            );
          })}
          <div
            onClick={() => setOpenAddField(true)}
            className="inline-block hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded"
          >
            Add Fields
          </div>

          <button className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold">
            Submit
          </button>
        </form>
      </div>

      {viewImageURL && (
        <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />
      )}

      {openAddField && (
        <AddMoreField
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOpenAddField(false)}
        />
      )}
    </section>
  );
};

export default UploadProduct;

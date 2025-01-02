import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const UploadSubCategoryModel = ({ close }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const handleChange = (e) => {
        const {name, value} = e.target

        setSubCategoryData((prev) => {
            return{
                ...prev,
                [name]: value
            }
        })
  }

  
  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-neutral-800 bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white p-4 rounded">
        <div className="flex justify-between items-center gap-3">
          <h1 className="font-semibold">Add Sub Category</h1>
          <button>
            <IoClose size={25} onClick={close}/>
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
              <div className="border h-36 w-36 bg-blue-50 flex justify-center items-center">
                {
                    !subCategoryData.image ? (
                        <p className="text-sm text-neutral-400">No image</p>
                    ) : (
                        <img src="" alt="" />
                    )
                }
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;

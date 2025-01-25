import React, { useState } from "react";
import EditProductAdmin from "../components/EditProductAdmin";
import ConfirmBox from "./ConfirmBox";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";


const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleDeleteProduct = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: {
          _id: data._id
        }
      })

      const {data : responseData} = response

      if(responseData.success){
        toast.success(responseData.message)
        if(fetchProductData){
          fetchProductData()
        }
        setOpenDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <div className="w-44 p-4 bg-white rounded">
      <div>
        <img
          src={data?.image[0]}
          alt={data?.name}
          className="w-full h-full object-scale-down"
        />
      </div>
      <p className="text-ellipsis line-clamp-2 font-medium">{data?.name}</p>
      <p className="text-slate-400 mt-1">{data?.unit}</p>
      <div className="grid grid-cols-2 gap-3 py-2">
        <button onClick={() => setEditOpen(true)} className="border px-2 py-1 border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded">
          Edit
        </button>
        <button onClick={() => setOpenDelete(true)} className="border px-2 py-1 border-green-600 bg-red-100 text-red-800 hover:bg-red-200 rounded">
          Delete
        </button>
      </div>

      {
        editOpen && (
          <EditProductAdmin fetchProductData={fetchProductData} data={data} close={() => setEditOpen(false)} />
        )
      }

      {
        openDelete && (
          <ConfirmBox
          close={() => setOpenDelete(false)}
          confirm={handleDeleteProduct}
          cancel={() => setOpenDelete(false)}
          />
        )
      }
    </div>
  );
};

export default ProductCardAdmin;

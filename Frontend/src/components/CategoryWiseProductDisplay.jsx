import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { validURLConvert } from "../utils/validURLConvert";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const subCategoryData = useSelector((state) => state.product?.allSubCategory);
  const navigate = useNavigate();

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
        },
      });

      const { data: responseData } = response;

      if (responseData?.success) {
        setData(responseData?.data || []);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, [id]);

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };
  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };

  const loadingCardNumber = new Array(7).fill(null);

  const handleRedirectProductListPage = () => {
    if (!subCategoryData || !Array.isArray(subCategoryData)) {
      return "/";
    }
    const subCategory = subCategoryData.find((sub) => {
      const filterData = sub?.category?.some((c) => c._id === id);
      return filterData ? true : null;
    });

    const url = `/${validURLConvert(name || "default")}-${id}/${validURLConvert(
      subCategory?.name || "default"
    )}-${subCategory?._id}`;

    return url || "/";
  };

  const redirectURL = handleRedirectProductListPage();

  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link to={redirectURL} className="text-green-600 hover:text-green-400">
          See All
        </Link>
      </div>

      <div className="relative flex items-center">
        <div
          className="flex gap-4 md:gap-6 lg:gap-7 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth"
          ref={containerRef}
        >
          {loading &&
            loadingCardNumber.map((_, index) => {
              return (
                <CardLoading key={"CategoryWiseProductDisplay123" + index} />
              );
            })}

          {Array.isArray(data) &&
            data.map((p, index) => {
              return (
                <CardProduct
                  data={p}
                  key={p?._id + "CategoryWiseProductDisplay" + index}
                />
              );
            })}
        </div>
        <div className="w-full absolute lg:flex justify-between container hidden mx-auto px-2 max-w-full left-0 right-0">
          <button
            onClick={handleScrollLeft}
            className="z-10 relative bg-white hover:bg-gray-200 shadow-lg p-2 rounded-full text-lg"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleScrollRight}
            className="z-10 relative bg-white hover:bg-gray-200 shadow-lg p-2 rounded-full text-lg"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;

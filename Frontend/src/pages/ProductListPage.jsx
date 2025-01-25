import React, { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import { validURLConvert } from "../utils/validURLConvert";

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [displaySubCategory, setDisplaySubCategory] = useState([]);

  // console.log(params.subCategory);

  const subCategory = params.subCategory.split("-");
  const subCategoryName = subCategory
    .slice(0, subCategory.length - 1)
    .join(" ");

  console.log("subCategoryName", subCategoryName);

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 10,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }

        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [params]);

  useEffect(() => {
    const sub = allSubCategory.filter((s) => {
      const filterData = s.category.some((el) => {
        return el._id === categoryId;
      });
      return filterData ? filterData : null;
    });
    setDisplaySubCategory(sub);
  }, [params, allSubCategory]);

  console.log("data", data);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container mx-auto grid grid-cols-[130px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
        <div className="min-h-[88vh] max-h-[88vh] sticky top-20 overflow-y-scroll flex flex-col gap-1 shadow-md scrollbarCustom mt-[6px]">
          {displaySubCategory.map((s, index) => {
            const url = `/${validURLConvert(s?.category[0]?.name)}-${
              s?.category[0]?._id
            }/${validURLConvert(s.name)}-${s._id}`;
            return (
              // <Link key={"subCategory" + index} to={url} className={`w-full p-2  lg:flex items-center lg:w-full lg:h-24 lg:gap-4 hover:bg-green-200 cursor-pointer ${subCategoryId === s._id ? "bg-green-200" : ""}`}>
              //   <div className="w-fit max-w-28 mx-auto bg-white rounded p-1 lg:mx-0">
              //     <img src={s.image} alt="subCategory" className="w-14 lg:w-10 h-full object-scale-down" />
              //   </div>
              //   <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:font-base">{s.name}</p>
              // </Link>
              <Link
                to={url}
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer
                  ${subCategoryId === s._id ? "bg-green-100" : ""}
                `}
              >
                <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border">
                  <img
                    src={s.image}
                    alt="subCategory"
                    className=" w-14 lg:h-14 lg:w-12 h-full object-scale-down"
                  />
                </div>
                <p className="mt-2 lg:mt-0 text-xs text-center lg:text-left lg:text-base">
                  {s.name}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="min-h-[75vh] sticky top-20">
          <div className="bg-white shadow-md p-2 z-10">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>
          <div>
            <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 p-4 gap-3">
                {data.map((p, index) => {
                  return (
                    <CardProduct
                      data={p}
                      key={p._id + "productSubCategory" + index}
                    />
                  );
                })}
              </div>
            </div>
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;

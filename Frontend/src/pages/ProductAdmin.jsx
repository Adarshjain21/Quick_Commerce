import React, { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import Loading from "../components/Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { IoSearchOutline } from "react-icons/io5";
import NoData from "../components/NoData";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 3,
          search: search,
        },
      });

      const { data: responseData } = response;

      console.log(responseData);

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage);
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    let flag = true;

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData();
        flag = false;
      }
    }, 300);

    return () => {
      clearTimeout(interval);
    };
  }, [search]);

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between gap-4">
        <h2 className="font-semibold">Product</h2>
        <div className="h-full min-w-24 bg-blue-50 px-4 flex gap-3 items-center py-2 border rounded focus-within:border-primary-200">
          <IoSearchOutline size={25} />
          <input
            type="text"
            placeholder="Search product here..."
            className="h-full outline-none bg-transparent"
            onChange={handleOnChange}
            value={search}
          />
        </div>
      </div>

      {loading && <Loading />}

      {!productData[0] && !loading ? (
        <NoData />
      ) : (
        <div className="p-4 bg-blue-50">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {productData.map((p, index) => {
              return <ProductCardAdmin key={index + "prodctIndex"} data={p} />;
            })}
          </div>
          <div
            className={`flex justify-center items-center mt-5 ${
              loading ? "hidden" : "block"
            } `}
          >
            <Stack spacing={6}>
              <Pagination
                count={totalPageCount}
                page={page}
                onChange={(event, page) => setPage(page)}
                sx={{
                  "& .MuiPaginationItem-page.Mui-selected": {
                    backgroundColor: "#ffbf00",
                    color: "white",
                  },
                }}
              />
            </Stack>
          </div>
        </div>
      )}

      {/* {loading ? (
        <Loading />
      ) : (
        
      )} */}
    </section>
  );
};

export default ProductAdmin;

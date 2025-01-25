import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import Divider from "../components/Divider";
import image1 from "../assets/minute_delivery.png";
import image2 from "../assets/Best_Prices_Offers.png";
import image3 from "../assets/Wide_Assortment.png";
import { priceWithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "../components/AddToCartButton";

const ProductDisplayPage = () => {
  const params = useParams();

  let productId = params.product.split("-").slice(-1)[0];

  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  return (
    <section className="container h-full mx-auto p-4 grid lg:grid-cols-2 lg:sticky lg:top-24">
      <div className="h-full lg:max-h-[95vh] lg:min-h-[95vh] lg:overflow-y-auto scrollbar-none lg:border-r">
        <div className="bg-white lg:min-h-[50vh] lg:max-h-[50vh] rounded min-h-56 max-h-56 md:max-h-[30vh] md:min-h-[30vh] xl:min-h-[65vh] xl:max-h-[65vh] h-full w-full">
          <img
            src={data.image[image]}
            alt=""
            className="w-full h-full object-scale-down"
          />
        </div>
        <div className="flex items-center justify-center gap-3 my-2 lg:my-4">
          {data.image.map((img, index) => {
            return (
              <div
                key={img + index + "point"}
                onClick={() => setImage(index)}
                className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full cursor-pointer ${
                  index === image && "bg-slate-300"
                }`}
              ></div>
            );
          })}
        </div>
        <div className="grid relative">
          <div
            ref={imageContainer}
            className="flex relative z-10 gap-4 w-full overflow-x-auto scrollbar-none scroll-smooth"
          >
            {data.image.map((img, index) => {
              return (
                <div
                  className={`w-20 h-20 cursor-pointer min-h-20 min-w-20 shadow-md ${
                    index === image && "border-2 border-primary-200"
                  }`}
                  key={img + index}
                >
                  <img
                    src={img}
                    alt="mini-product"
                    onClick={() => setImage(index)}
                    className="w-full h-full object-scale-down"
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full -ml-1 h-full hidden lg:flex justify-between items-center absolute">
            <button
              onClick={handleScrollLeft}
              className="bg-white hover:bg-gray-200 p-1 rounded-full shadow-lg relative z-10"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="bg-white hover:bg-gray-200 p-1 rounded-full shadow-lg relative z-10"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <div className="my-4 lg:grid gap-3 hidden">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base">{data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-base">{data.unit}</p>
          </div>
          {data.moreDetails &&
            Object.keys(data.moreDetails).map((element, index) => {
              return (
                <div>
                  <p className="font-semibold">{element}</p>
                  <p className="text-base">{data.moreDetails[element]}</p>
                </div>
              );
            })}
        </div>
      </div>

      <div className="p-4 lg:pl-7 text-base lg:text-lg">
        <p className="bg-green-300 w-fit px-2 rounded-full">10 min</p>
        <h2 className="text-lg lg:text-2xl font-semibold mt-2">{data.name}</h2>
        <p>{data.unit}</p>
        <Divider />
        <div>
          <p>Price</p>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="border border-green-600 px-4 py-2 rounded bg-green-50 w-fit">
              <p className="font-semibold text-lg lg:text-xl">
                {DisplayPriceInRupees(
                  priceWithDiscount(data.price, data.discount)
                )}
              </p>
            </div>
            {data.discount > 0 && (
              <p className="line-through">{DisplayPriceInRupees(data.price)}</p>
            )}
            {data.discount > 0 && (
              <p className="font-bold text-green-600 lg:text-2xl">
                {data.discount}%{" "}
                <span className="text-base text-neutral-500">Discount</span>
              </p>
            )}
          </div>
        </div>

        {data.stock === 0 ? (
          <p className="text-lg text-red-500 my-2">Out of Stock</p>
        ) : (
        <div className="my-4">
          <AddToCartButton data={data}/>
        </div>
        )}

        <div className="my-4 grid gap-3 lg:hidden">
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-base">{data.unit}</p>
          </div>
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base">{data.description}</p>
          </div>
          {data.moreDetails &&
            Object.keys(data.moreDetails).map((element, index) => {
              return (
                <div>
                  <p className="font-semibold">{element}</p>
                  <p className="text-base">{data.moreDetails[element]}</p>
                </div>
              );
            })}
        </div>

        <h2 className="font-medium">Why shop from quick commerce ?</h2>
        <div>
          <div className="flex items-center gap-4 my-4">
            <img src={image1} alt="superfast delivery" className="w-20 h-20" />
            <div className="text-sm">
              <div className="font-semibold">Superfast delivery</div>
              <p>
                Get your order delivery to your doorstep at the earliest from
                dark stores near you.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 my-4">
            <img src={image2} alt="Best prices offers" className="w-20 h-20" />
            <div className="text-sm">
              <div className="font-semibold">Best Prices & Offers</div>
              <p>
                Best price destination with offers directly from the
                manufactures.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 my-4">
            <img src={image3} alt="Wide Assortment" className="w-20 h-20" />
            <div className="text-sm">
              <div className="font-semibold">Wide Assortment</div>
              <p>
                Choose from 5000+ products across food personal care, household
                & other categories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;

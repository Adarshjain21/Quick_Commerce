import React, { useState } from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { Link } from "react-router-dom";
import { validURLConvert } from "../utils/validURLConvert";
import { priceWithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  const url = `/product/${validURLConvert(data.name)}-${data._id}`;

  


  return (
    <Link
      to={url}
      className="border p-4 grid gap-3 max-w-52 lg:min-w-52 rounded bg-white"
    >
      <div className="min-h-20 max-h-32 rounded">
        <img
          src={data.image[0]}
          alt=""
          className="w-full h-full object-scale-down"
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded text-sm w-fit p-[1px] px-2 text-green-500 bg-green-100">
          10 min
        </div>
        <div>
          {Boolean(data.discount) && (
            <p className="text-green-500 bg-green-100 px-2 w-fit text-sm p-[1px] rounded-full">
              {data.discount}% discount
            </p>
          )}
        </div>
      </div>
      <div className="font-medium text-ellipsis line-clamp-2">{data.name}</div>
      <div className="w-fit">{data.unit}</div>

      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold">
            {DisplayPriceInRupees(priceWithDiscount(data.price, data.discount))}
          </div>
          {data.discount > 0 && (
            <div>
              <p className="line-through text-xs">
                {DisplayPriceInRupees(data.price)}
              </p>
            </div>
          )}
        </div>
        <div className="">
          {data.stock == 0 ? (
            <p className="text-red-500 text-sm">Out of stock</p>
          ) : (
            <AddToCartButton data={data}/>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;

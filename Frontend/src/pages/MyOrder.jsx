import React from "react";
import { useSelector } from "react-redux";
import NoData from "../components/NoData";

const MyOrder = () => {
  const orders = useSelector((state) => state.orders.order);

  return (
    <div>
      <div className="bg-white shadow-md p-3 font-semibold">
        <h1>Order</h1>
      </div>
      {!orders[0] && <NoData />}

      {orders.map((order, index) => {
        const dateString = order.createdAt;

        const date = new Date(dateString);

        const options = {
          timeZone: "Asia/Kolkata", // IST time zone
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };

        const istDate = new Intl.DateTimeFormat("en-IN", options).format(date);
        return (
          <div
            key={order._id + index + "order"}
            className="border text-sm rounded p-4 flex flex-col md:flex-row gap-3 md:justify-between"
          >
            <div>
              <p>Order No. : {order.orderId}</p>
              <div className="flex gap-3">
                <img
                  src={order.productDetails.image[0]}
                  alt=""
                  className="w-14 h-14"
                />
              <p className="font-medium">{order.productDetails.name}</p>
              </div>
            </div>

            <div>
              <p>
                <span className="font-medium">Order date:</span> {istDate}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrder;

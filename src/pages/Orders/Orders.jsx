import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authContext } from "../../context/authContext";

export default function Orders() {
  const { userId } = useContext(authContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (userId) getUserOrders();
  }, [userId]);
  async function getUserOrders() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/orders/user/" + userId
    );
    setOrders(data);
  }
  return (
    <div className="py-5 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto overflow-hidden">
      {orders.map((order) => {
        return (
          <div key={order._id} className="flex justify-start item-start space-y-2 flex-col py-5">
            <h1 className="text-2xl lg:text-4xl font-semibold leading-7 lg:leading-9 ">
              Order #{order._id}
            </h1>
            <p className="text-base font-medium leading-6 text-gray-600 pb-4">
              Payment Method: {order.paymentMethodType}
            </p>
  
            <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
              <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p className="pb-4 text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                    Customer’s Cart
                  </p>
                  {order.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                    >
                      <div className="pb-4 md:pb-8 w-full md:w-40">
                        <img
                          className="w-full hidden md:block"
                          src={item.product.imageCover}
                          alt={item.product.title}
                        />
                        <img
                          className="w-full md:hidden"
                          src={item.product.imageCover}
                          alt={item.product.title}
                        />
                      </div>
                      <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                            {item.product.title}
                          </h3>
                          <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-sm leading-none text-gray-800">
                              <span className="text-gray-500">Subcategory: </span>{' '}
                              {item.product.subcategory[0].name}
                            </p>
                            <p className="text-sm leading-none text-gray-800">
                              <span className="text-gray-500">Quantity: </span> {item.count}
                            </p>
                          </div>
                        </div>
                        {/* <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-base xl:text-lg leading-6">${item.product.price}</p>
                          <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                            ${item.product.price * item.count}
                          </p>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
  
                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                    Order Summary
                  </p>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                      Subtotal:
                    </p>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                      ${order.totalOrderPrice}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                      Tax:
                    </p>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                      ${order.taxPrice}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                      Shipping:
                    </p>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                      $4.99
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                      Total:
                    </p>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                      ${order.totalOrderPrice}
                    </p>
                  </div>
                </div>
  
                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                    Customer Details
                  </p>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                      Name:
                    </p>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                      {order.user.name}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                      Email:
                    </p>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                      {order.user.email}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                      Phone:
                    </p>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                      {order.user.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  
}

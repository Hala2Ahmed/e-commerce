import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; // Updated import for v5
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import Slider from "react-slick";
import { Button } from "@heroui/react";
import { addProductToCart } from "../../Services/CartServices";
import { WishlistContext } from "../../context/WishlistContext";

export default function ProductDetails({isFavourite}) {
  const { id } = useParams();
  const [addToCartLoading, setAddToCartLoading] = useState(false)
  const { wishlist, removeFromWishlist,addToWishlist,isInWishlist } = useContext(WishlistContext);


  const fetchProductDetails = async (productId) => {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    return data.data;
  };

  const {
    data: product,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetails(id),
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="flex items-center flex-wrap -mx-4">
        {/* Product Images */}
        <div className="w-full md:w-1/3 px-4 mb-8">
          <Slider {...settings}>
            {product.images.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt="Product"
                className="w-full h-auto rounded-lg shadow-md mb-4"
              />
            ))}
          </Slider>
        </div>
        {/* Product Details */}
        <div className="w-full md:w-2/3 px-4">
          <h2 className="text-3xl font-bold mb-2">{product?.title}</h2>
          <p className="text-gray-600 mb-4">SKU: WH1000XM4</p>
          <div className="mb-4">
            {product.priceAfterDiscount ? (
              <>
                <span className="text-2xl font-bold mr-2">
                  ${product.priceAfterDiscount}
                </span>
                <span className="text-gray-500 line-through">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold mr-2">${product.price}</span>
            )}
          </div>
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((rate) => {
              const isFullStar = product?.ratingsAverage >= rate;
              const isHalfStar =
                product?.ratingsAverage >= rate - 0.5 &&
                product?.ratingsAverage < rate;

              return (
                <span key={rate}>
                  {isFullStar ? (
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ) : isHalfStar ? (
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="half-fill">
                          <stop offset="50%" stopColor="#f6e05e" />
                          <stop offset="50%" stopColor="#cbd5e0" />
                        </linearGradient>
                      </defs>
                      <path
                        fill="url(#half-fill)"
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )}
                </span>
              );
            })}
            <span className="ml-2 text-gray-600">
              {product?.ratingsAverage} ({product?.ratingsQuantity} reviews)
            </span>
          </div>
          <h5 className="my-2">
            <span className="font-bold px-1"> Category:</span>
            <span>{product?.category?.name}</span>
          </h5>
          <h5 className="my-2">
            <span className="font-bold px-1"> Brand:</span>
            <span>{product?.brand?.name}</span>
          </h5>
          <p className="text-gray-700 mb-6">{product?.description}</p>
          <div className="flex space-x-4 mb-6">
            <Button  isLoading={addToCartLoading} onPress={() => addProductToCart(product._id, setAddToCartLoading)} className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Add to Cart
            </Button>
            <Button  onPress={() => {
                      if (isFavourite || isInWishlist(product._id)) {
                        removeFromWishlist(product._id);
                      } else {
                        addToWishlist(product);
                      }
                    }} className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            <i className={`fas fa-heart ${isFavourite ? "text-red-500" : "text-gray-500"}`}></i>
              Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
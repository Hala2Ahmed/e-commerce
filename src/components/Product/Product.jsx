import { Button } from "@heroui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addProductToCart } from "../../Services/CartServices";
import { WishlistContext } from "../../context/WishlistContext";

export const HeartIcon = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill={filled ? fill : "none"}
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export default function Product({ product, isFavourite }) {
  const [isLoading, setIsLoading] = useState(false);
  const { wishlist, removeFromWishlist, addToWishlist, isInWishlist } = useContext(WishlistContext);

  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <button
        onClick={() => {
          if (isFavourite || isInWishlist(product._id)) {
            removeFromWishlist(product._id);
          } else {
            addToWishlist(product);
          }
        }}
        className="z-10 absolute top-3 right-3"
        size="md"
      >
        <i className={`fas fa-heart ${isFavourite || isInWishlist(product._id) ? "text-red-500" : "text-gray-500"}`}></i>
      </button>
      <Link
        className="relative mx-3 mt-3 flex overflow-hidden rounded-xl"
        to={"/productDetails/" + product._id}
      >
        <img
          className="object-contain w-full"
          src={product.imageCover}
          alt={product.title}
        />
        {product.priceAfterDiscount && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {100 - Math.round((product.priceAfterDiscount / product.price) * 100)}% OFF
          </span>
        )}
      </Link>
      <div className="mt-4 px-5 pb-5 grow flex flex-col justify-between">
        <div>
          <Link to={"/productDetails/" + product._id}>
            <h5 className="text-xl tracking-tight text-slate-900 line-clamp-1">
              {product.title}
            </h5>
          </Link>
          <div className="mt-2 mb-5">
            <p>
              {product.priceAfterDiscount ? (
                <>
                  <span className="text-3xl font-bold text-slate-900">
                    ${product.priceAfterDiscount}
                  </span>
                  <span className="text-sm text-slate-900 line-through">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-slate-900">
                  ${product.price}
                </span>
              )}
            </p>
            <div className="flex justify-items-center">
              {[1, 2, 3, 4, 5].map((rate, index) => {
                const isFullStar = product.ratingsAverage >= rate;
                const isHalfStar =
                  product.ratingsAverage >= rate - 0.5 &&
                  product.ratingsAverage < rate;

                return (
                  <span key={rate}>
                    {isFullStar ? (
                      <svg
                        key={index}
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
                        key={index}
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
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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

              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                {product.ratingsAverage}
              </span>
            </div>
          </div>
        </div>
        <Button
          isLoading={isLoading}
          onPress={() => addProductToCart(product._id, setIsLoading)}
          href="#"
          className="flex items-center justify-center rounded-md bg-slate-900  py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </Button>
      </div>
    </div>
  );
}


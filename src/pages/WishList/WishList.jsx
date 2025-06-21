import { useContext, useState } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import img from "../../assets/logo.png";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../Services/CartServices";
import { Helmet } from "react-helmet";

const RemoveIcon = ({ onClick }) => (
  <button onClick={onClick} className="text-red-500 hover:text-red-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);

export default function WishList() {
  const [loadingState, setLoadingState] = useState(true);
  const { wishlist, removeFromWishlist, isLoading } =
    useContext(WishlistContext);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (wishlist.length === 0) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <img
          className="h-20 w-auto object-cover mb-4"
          src={img}
          alt="cart image"
        />
        <h1 className="text-3xl font-bold text-center">Wishlist is empty</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-lg">
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="relative flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
          >
            <div className="absolute top-3 right-3 z-10">
              <RemoveIcon onClick={() => removeFromWishlist(item._id)} />
            </div>
            <Link
              className="relative mx-3 mt-3 flex overflow-hidden rounded-xl"
              to={"/productDetails/" + item._id}
            >
              <img
                className="object-contain w-full"
                src={item.imageCover}
                alt={item.title}
              />
              {item.priceAfterDiscount && (
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                  {100 -
                    Math.round((item.priceAfterDiscount / item.price) * 100)}
                  % OFF
                </span>
              )}
            </Link>
            <div className="mt-4 px-5 pb-5 grow flex flex-col justify-between">
              <div>
                <Link to={"/productDetails/" + item._id}>
                  <h5 className="text-xl tracking-tight text-slate-900 line-clamp-1">
                    {item.title}
                  </h5>
                </Link>
                <div className="mt-2 mb-5">
                  <p>
                    {item.priceAfterDiscount ? (
                      <>
                        <span className="text-3xl font-bold text-slate-900">
                          ${item.priceAfterDiscount}
                        </span>
                        <span className="text-sm text-slate-900 line-through">
                          ${item.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-slate-900">
                        ${item.price}
                      </span>
                    )}
                  </p>
                  <div className="flex justify-items-center">
                    {[1, 2, 3, 4, 5].map((rate) => {
                      const isFullStar = item.ratingsAverage >= rate;
                      const isHalfStar =
                        item.ratingsAverage >= rate - 0.5 &&
                        item.ratingsAverage < rate;

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

                    <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                      {item.ratingsAverage}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                isLoading={loadingState[item._id] || false} // Use loadingState for this product
                onPress={() => addProductToCart(item._id, setLoadingState)} // Pass the product ID
                className="flex items-center justify-center rounded-md bg-slate-900 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
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
        ))}
      </div>
    </div>
  );
}

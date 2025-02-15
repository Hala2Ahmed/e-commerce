import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  const getWishlist = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token: localStorage.getItem("token") } }
      );
      setWishlist(data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (product) => {
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: product.id },
        { headers: { token: localStorage.getItem("token") } }
      );
      setWishlist([...wishlist, product]);
    //   toast.success("Product added to wishlist!");
        toast.success("Product added to wishlist!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          })

    } catch (error) {
      console.log(error);
      toast.error("Failed to add product to wishlist!");

    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      setWishlist(wishlist.filter((item) => item.id !== productId));
      toast.success("Product removed from wishlist!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        })
    } catch (error) {
      console.log(error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id == productId);
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, getWishlist, isLoading }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Product from "../../components/Product/Product";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import CategoriesSlider from "../../components/CategoriesSlider/CategoriesSlider";
import MainSlider from "../../components/MainSlider/MainSlider";
import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";

export default function Home() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/products"),
    select: (res) => res.data.data,
  });

  const { isInWishlist } = useContext(WishlistContext);

  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <div>
      <MainSlider />
      <CategoriesSlider />
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3 py-4">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            isFavourite={isInWishlist(product._id)}
          />
        ))}
      </div>
    </div>
  );
}
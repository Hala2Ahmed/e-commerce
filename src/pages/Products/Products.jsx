import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Product from "../../components/Product/Product";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";
export default function Products() {
  function getCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getCategories,
    select:(res)=>res.data.data
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
        <Helmet>
                <title>Products</title>
            </Helmet>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3">
        {products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

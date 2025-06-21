import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (res) => res.data.data,
  });
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
       <Helmet>
                <title>Categories</title>
            </Helmet>
      {data?.map((category, index) => {
        return (
          <div key={index} className="border rounded-lg overflow-hidden shadow-lg">
          <img
            className="w-full h-48 object-cover"
            src={category.image}
            alt={category.name}
          />
          <div className="p-4">
            <h2 className="text-lg font-bold text-center">{category.name}</h2>
          </div>
        </div>
        );
      })}
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function Brands() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getCategories,
    select: (res) => res.data.data,
  });
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
      <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
        {data?.map((brands, index) => {
          return (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              <img
                className="w-full h-48 object-container"
                src={brands.image}
                alt={brands.name}
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-center">{brands.name}</h2>
              </div>
            </div>
          );
        })}
      </div>
  );
}

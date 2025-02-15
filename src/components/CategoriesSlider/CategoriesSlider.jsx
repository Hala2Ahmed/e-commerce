import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Slider from "react-slick/lib/slider";

export default function CategoriesSlider() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (res) => res.data.data,
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Slider {...settings}>
      {data?.map((category) => (
        <div key={category._id} className="my-3">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-[150px] object-cover object-top"
          />
          <h2 className="text-center">{category.name}</h2>
        </div>
      ))}
    </Slider>
  );
}

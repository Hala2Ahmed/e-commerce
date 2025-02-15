import React from 'react';
import slider1 from '../../assets/slider-image-1.jpeg';
import slider2 from '../../assets/slider-image-2.jpeg';
import slider3 from '../../assets/slider-image-3.jpeg';
import banner1 from '../../assets/grocery-banner.png';
import Slider from 'react-slick/lib/slider';

export default function MainSlider() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className='flex flex-col md:flex-row'>
            <div className="md:w-3/4 w-full">
                <Slider {...settings}>
                    <img src={slider1} className='w-full h-[400px] object-cover' alt="Slider 1" />
                    <img src={slider2} className='w-full h-[400px] object-cover' alt="Slider 2" />
                    <img src={slider3} className='w-full h-[400px] object-cover' alt="Banner 2" />
                </Slider>
            </div>
            <div className="hidden md:w-1/4 md:block">
                <img src={banner1} className='w-full h-[200px] object-cover' alt="Banner 1" />
                <img src={slider3} className='w-full h-[200px] object-cover' alt="Slider 3" />
            </div>
        </div>
    );
}
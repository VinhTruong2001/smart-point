import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function Template({ url }) {
    const [currentSlide, setCurrentSlide] = useState(1);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }; 

    function SampleNextArrow(props) {    
        const { onClick } = props;
        return (
            <div onClick={() => setCurrentSlide(currentSlide+1)}>
                <div 
                    onClick={onClick} 
                    className="hidden absolute top-1/2 right-2 p-0.5 z-[2] group-hover:flex items-center text-gray-500 bg-white rounded-full cursor-pointer border border-gray-400"
                >
                    <ArrowForwardIosIcon fontSize="small"/>
                </div>
            </div>
        );
    }

    function SamplePrevArrow(props) {    
        const { onClick } = props;
        return (
            <div onClick={() => setCurrentSlide(currentSlide-1)}>
                <div
                    onClick={onClick}
                    className="hidden absolute top-1/2 left-2 p-0.5 z-[2] group-hover:flex items-center text-gray-500 bg-white rounded-full cursor-pointer border border-gray-400"
                >
                    <ArrowBackIosNewIcon fontSize="small"/>
                </div>
            </div>
        );
    }
    const slidesURLsorted = url.sort();
    var slides = slidesURLsorted.map((slideImg, index) => 
        <div key={index} className="rounded-md overflow-hidden">
            <img className="w-full h-[246px]" src={`https://smartpoints.herokuapp.com/${slideImg}`} alt={`slide ${index+1}`} />
        </div>
    )

    return (<>
        <Slider className="w-full flex items-center justify-center group" {...settings}>
            {slides}
        </Slider>
        <div className="absolute top-3 right-[48%] text-white bg-black/70 px-1 rounded-md opacity-0 group-hover:opacity-100">
            {currentSlide}/{url.length}
        </div>
    </>)
}

export default Template

import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function Template({ url }) {
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
            <div 
                onClick={onClick} 
                className="absolute top-1/2 right-2 p-0.5 z-[2] flex items-center text-gray-500 bg-white rounded-full cursor-pointer border-0.5 border-gray-400"
            >
                <ArrowForwardIosIcon fontSize="small"/>
            </div>
        );
    }

    function SamplePrevArrow(props) {    
        const { onClick } = props;
        return (
            <div
                onClick={onClick}
                className="absolute top-1/2 left-2 p-0.5 z-[2] flex items-center text-gray-500 bg-white rounded-full cursor-pointer border-0.5 border-gray-400"
            >
                   <ArrowBackIosNewIcon fontSize="small"/>
            </div>
        );
    }

    var slides = [];
    for (var i = 0; i < 56; i++) {
        slides.push(
            <div key={i} className="rounded-md overflow-hidden">
                <img className="w-full h-[246px]" src={`${url}/Slide${i+1}.PNG`} alt={`slide ${i+1}`} />
            </div>
        );  
    }

    return (
        <Slider className="w-full flex items-center justify-center group" {...settings}>
            {slides}
        </Slider>
    )
}

export default Template

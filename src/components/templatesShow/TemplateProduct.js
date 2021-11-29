import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function TemplateProduct({ slideIamges }) {
    const url = 'http://localhost:8000'
    const settings1 = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        nextArrow: <SampleNextArrow1 />,
        prevArrow: <SamplePrevArrow1 />
    }; 

    const settings2 = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        swipeToSlide: true,
        focusOnSelect: true,
        nextArrow: <SampleNextArrow2 />,
        prevArrow: <SamplePrevArrow2 />,
        responsive: [
            {
              breakpoint: 740,
              settings: {
                slidesToShow: 4,
                nextArrow: <></>,
                prevArrow: <></>,
              }
            },
        ]
    };

    function SampleNextArrow1(props) {    
        const { onClick } = props;
        return (
            <div 
                onClick={onClick} 
                className="hidden group-hover:block absolute top-1/2 right-4 z-[2] text-gray-500 bg-white rounded-full p-0.5 cursor-pointer"
            >
                <ArrowForwardIosIcon />
            </div>
        );
    }

    function SamplePrevArrow1(props) {    
        const { onClick } = props;
        return (
            <div
                onClick={onClick}
                className="hidden group-hover:block absolute top-1/2 left-4 z-[2] text-gray-500 bg-white rounded-full p-0.5 cursor-pointer"
            >
                   <ArrowBackIosNewIcon />
            </div>
        );
    }

    function SampleNextArrow2(props) {    
        const { onClick } = props;
        return (
            <div 
                onClick={onClick} 
                className="absolute top-[36%] -right-2 z-[2] text-gray-500 cursor-pointer"
            >
                <ArrowForwardIosIcon />
            </div>
        );
    }

    function SamplePrevArrow2(props) {
        const { onClick } = props;
        return (
            <div
                onClick={onClick}
                className="absolute top-[36%] -left-2 z-[2] text-gray-500 cursor-pointer"
            >
                   <ArrowBackIosNewIcon />
            </div>
        );
    }

    let slides1 = slideIamges?.map((slideImage, index) => 
        <div key={index} className="rounded-md overflow-hidden">
            <img className="w-full h-[246px] lg:h-[540px]" src={url + slideImage} alt={`slide ${index+1}`} />
        </div>
    )

    let slides2 = slideIamges?.map((slideImage, index) => 
        <div key={index} className="rounded-md overflow-hidden px-2">
            <img className="w-full  h-[50px] lg:h-[100px] rounded-md" src={url + slideImage} alt={`slide ${index+1}`} />
        </div>
    )

    let slider1, slider2;
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    useEffect(() => {
        setNav1(slider1);
        setNav2(slider2);
    }, [slider1, slider2])

    return (
        <>
            <div className="relative w-full h-[246px] lg:h-[540px] bg-transparent rounded-md cursor-pointer overflow-hidden group border border-gray-300 my-5">            
                <div className="absolute top-0 bottom-0 left-0 z-[1] w-[10%] opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-l from-black/0 to-black/50"></div>
                </div>

                <Slider 
                    className="w-full flex items-center justify-center group" 
                    {...settings1} 
                    ref={slider => (slider1 = slider)}
                    asNavFor={nav2}
                >
                    {slides1}
                </Slider>

                <div className="absolute top-0 bottom-0 right-0 z-[1] w-[10%] opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <div className="absolute top-0 bottom-0 right-0 w-full bg-gradient-to-r from-black/0 to-black/50"></div>
                </div>
            </div>

            <Slider 
                className="w-full flex items-center justify-center group lg:px-4" 
                {...settings2}
                ref={slider => (slider2 = slider)}
                asNavFor={nav1}
            >
                {slides2}
            </Slider>
        </>
    )
}

export default TemplateProduct

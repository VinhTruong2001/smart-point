import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function TemplateProduct() {
    const url = `${process.env.PUBLIC_URL}/test/Art Subject for Elementary - 3rd Grade_ Music by Slidesgo`
    const settings1 = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }; 

    const settings2 = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        swipeToSlide: true,
        focusOnSelect: true,
    }; 

    function SampleNextArrow(props) {    
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} !right-2 z-[2] !text-3xl`}
                style={{ ...style, display: "block"}}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} !left-2 z-[2] !text-3xl`}
                style={{ ...style, display: "block"}}
                onClick={onClick}
            />
        );
    }

    var slides1 = [];
    for (let i = 0; i < 56; i++) {
        slides1.push(
            <div key={i} className="rounded-md overflow-hidden">
                <img className="w-full h-[246px] lg:h-[540px]" src={`${url}/Slide${i+1}.PNG`} alt={`slide ${i+1}`} />
            </div>
        );  
    }

    var slides2 = [];
    for (let i = 0; i < 56; i++) {
        slides2.push(
            <div key={i} className="rounded-md overflow-hidden px-2 outline-none cursor-pointer">
                <img className="w-full  h-[50px] lg:h-[100px]" src={`${url}/Slide${i+1}.PNG`} alt={`slide ${i+1}`} />
            </div>
        );  
    }

    let slider1, slider2;
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    useEffect(() => {
        setNav1(slider1);
        setNav2(slider2);
    }, [])

    return (
        <>
        <div className="relative w-full h-[246px] lg:h-[540px] bg-transparent rounded-md cursor-pointer overflow-hidden group border border-gray-300 my-5">            
            <div className="absolute top-0 bottom-0 left-0 w-[10%] opacity-0 group-hover:opacity-100 transition-all duration-200">
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

            <div className="absolute top-0 bottom-0 right-0 w-[10%] opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="absolute top-0 bottom-0 right-0 w-full bg-gradient-to-r from-black/0 to-black/50"></div>
            </div>
        </div>

        <Slider 
            className="w-full flex items-center justify-center group" 
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

import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


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

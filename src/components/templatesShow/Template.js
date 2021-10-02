import React, { useState } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../../styles/loadingAnimation.css"

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
                onClick={() => { nextPage(); onClick(); }}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} !left-2 z-[2] !text-3xl`}
                style={{ ...style, display: "block"}}
                onClick={() => { prevPage(); onClick(); }}
            />
        );
    }

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1)
    const [numPagesLoaded, setNumPagesLoaded] = useState(4);
    const [pages, setPages] = useState(null);

    var rows = pages || [];
    if (rows.length === 0) {
        for (var i = 1; i < 5; i++) {
            rows.push(<Page key={i} pageNumber={i} height={245} width={440}/>);
        }
    }
    // console.log(rows);
    
    function nextPage() {
        setPageNumber(pageNumber+1);
        if (pageNumber === numPagesLoaded - 1) {
            let i = numPagesLoaded + 1;
            for (; i <= numPages && i < numPagesLoaded + 10 ; i++) {
                rows.push(<Page key={i} pageNumber={i} height={245} width={440}/>);
            }
            setPages(rows);
            setNumPagesLoaded(i-1)
        }
    } 

    function prevPage() {
        setPageNumber(pageNumber - 1)
    }

    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const onLoading = (
        <div className="frame">
            <div className="center">
                <div className="circle first">
                    <div className="circle second">
                        <div className="circle third"></div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={onLoading}
                renderMode="svg"
            >
                <Slider className="h-[245px] w-full flex items-center justify-center" {...settings}>
                    {pages || rows}
                </Slider>
            </Document>
        </>
    )
}

export default Template

import React from 'react'
import TemplateFrames from './TemplateFrames'

function TemplateSection({ title, path }) {
    return (
        <div>
            {/* Top */}
            <div className="flex justify-between">
                <h2 className="font-bold text-3xl text-primary">{ title }</h2>
                <a href={`${path}`} className="btn !bg-primary !border-transparent">
                    <span className="text-white font-semibold">Xem thêm</span>
                </a>
            </div>

            {/* Body */}
            <div className="mt-8 min-w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2 xl:grid-cols-3 sm:gap-x-5 sm:gap-y-7">
                <TemplateFrames type={true} url={process.env.PUBLIC_URL + '/pdf/Art Subject for Elementary - 3rd Grade_ Music by Slidesgo.pdf'}/>
                <TemplateFrames type={false} url={process.env.PUBLIC_URL + '/pdf/Kent · SlidesCarnival.pdf'}/>
                <TemplateFrames type={true} url={process.env.PUBLIC_URL + '/pdf/Mexican Restaurant Company Profile by Slidesgo.pdf'}/>
                <TemplateFrames type={false} url={process.env.PUBLIC_URL + '/pdf/Minimalist & Formal Consulting Toolkit by Slidesgo.pdf'}/>
                <TemplateFrames type={false} url={process.env.PUBLIC_URL + '/pdf/Movie Maker Animation Studios Style Workshop by Slidesgo.pdf'}/>
                <TemplateFrames type={true} url={process.env.PUBLIC_URL + '/pdf/Product Requirement Theme for Business by Slidesgo.pdf'}/>
            </div>
        </div>
    )
}

export default TemplateSection

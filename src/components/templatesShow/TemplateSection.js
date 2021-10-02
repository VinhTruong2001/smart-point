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
                <TemplateFrames type={true} url={process.env.PUBLIC_URL + '/test/Art Subject for Elementary - 3rd Grade_ Music by Slidesgo'}/>
                <TemplateFrames type={false} url={process.env.PUBLIC_URL + '/test/Kent · SlidesCarnival'}/>
                <TemplateFrames type={true} url={process.env.PUBLIC_URL + '/test/Mexican Restaurant Company Profile by Slidesgo'}/>
                <TemplateFrames type={false} url={process.env.PUBLIC_URL + '/test/Minimalist & Formal Consulting Toolkit by Slidesgo'}/>
                <TemplateFrames type={false} url={process.env.PUBLIC_URL + '/test/Movie Maker Animation Studios Style Workshop by Slidesgo'}/>
                <TemplateFrames type={true} url={process.env.PUBLIC_URL + '/test/Product Requirement Theme for Business by Slidesgo'}/>
            </div>
        </div>
    )
}

export default TemplateSection

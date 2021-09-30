import React from 'react'
import Template from './Template'

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
                <Template type={true}/>
                <Template type={false}/>
                <Template type={true}/>
                <Template type={false}/>
                <Template type={false}/>
                <Template type={true}/>
            </div>
        </div>
    )
}

export default TemplateSection

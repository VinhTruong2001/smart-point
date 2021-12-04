import React, { useEffect, useState } from 'react'
import TemplateFrames from './TemplateFrames'
import callApi from '../../utils/apiCaller'
import { Link } from 'react-router-dom'

function TemplateSection({ title, path, search, order }) {
    const [templates, setTemplates] = useState(null)

    useEffect(() => {
        if (search) {
            callApi('GET', `/api/templates/small-pagination/?search=${search}&page=1`).then(res => {
                setTemplates(res.data.results)
            })
        } else if (order) {
            callApi('GET', `/api/templates/small-pagination/?ordering=${order}&page=1`).then(res => {
                setTemplates(res.data.results)
            })
        }
    }, [search, order])

    let templatesList = templates?.map((template, index) =>
        <TemplateFrames 
            key={index} 
            id={template.id} 
            isPremium={template.isPremium}
            templateFile={template.templates_file} 
            url={template.slide_image}
        />
    )

    return (
        <div>
            {/* Top */}
            <div className="flex justify-between">
                <h2 className="font-bold text-2xl lg:text-3xl text-primary">{ title }</h2>
                <Link to={`${path}`} className="btn !bg-primary !border-transparent">
                    <span className="text-white font-semibold">Xem thêm</span>
                </Link>
            </div>

            {/* Body */}
            <div className="mt-8 min-w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2 xl:grid-cols-3 sm:gap-x-5 sm:gap-y-7">
                {templatesList}
            </div>
        </div>
    )
}

export default TemplateSection

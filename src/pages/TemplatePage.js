import React, { useState, useEffect } from 'react'
import FilterBar from '../components/searchAndFilter/filter/FilterBar'
import TemplateContent from '../components/templatesShow/TemplateContent'
import TemplateProduct from '../components/templatesShow/TemplateProduct'
import callApi from '../utils/apiCaller'

function Template({ match }) {
    const [template, setTemplate] = useState(null)

    useEffect(() => {
        callApi('GET', `/api/v1/template/${match.params.id}`).then(res => {
            setTemplate(template);
        })
    })

    return (
        <div>
            {/* Filter bar */}
            { window.innerWidth >= 740 && <FilterBar /> }

            <div className="body-container">
                <div className="flex flex-col space-y-3">
                    <h1 className="text-primary font-bold  text-2xl lg:text-4xl">{template?.name}</h1>
                    <span className="text-gray-500 lg:text-lg font-semibold">Giáo dục</span>
                </div>

                <TemplateProduct />

                <TemplateContent />
            </div>
        </div>
    )
}

export default Template

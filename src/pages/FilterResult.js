import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import FilterBar from '../components/searchAndFilter/filter/FilterBar';
import TemplateFrames from '../components/templatesShow/TemplateFrames';
import callApi from '../utils/apiCaller'

function FilterResult({ match }) {
    const [templateList, setTemplateList] = useState()

    let templatesListTemp

    useEffect(() => {
        callApi('GET', `/api/templates/?search=${match.params.value}`).then(res => {
            let templatesListTemp = res.data.map((template, index) => 
                <div key={index}>
                    <TemplateFrames isPremium={template.isPremium} url={template.slide_image}/>
                    <Link to={`/templates/${template.id}`}>
                        <h4 className="hover:text-primary mt-2">{template.name}</h4>
                    </Link>
                    <p className="text-justify text-gray-400 font-light line-clamp-3">{template.description}</p>
                </div>
            )
            setTemplateList(templatesListTemp);
        })
    }, [match, templatesListTemp])

    return <>
        <FilterBar />
        <div className="body-container font-bold">
            <div className="mt-8 min-w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2 xl:grid-cols-3 sm:gap-x-5 sm:gap-y-7">
                {templateList}
            </div>
        </div>
    </>
}

export default FilterResult

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FilterBar from '../components/searchAndFilter/filter/FilterBar'
import TemplateContent from '../components/templatesShow/TemplateContent'
import TemplateProduct from '../components/templatesShow/TemplateProduct'
import callApi from '../utils/apiCaller'
import { tranferLanguage } from '../utils/tranferLanguage'

function TemplatePage({ match }) {
    const [template, setTemplate] = useState(null)

    useEffect(() => {
        callApi('GET', `/api/templates/${match.params.id}`).then(res => {
            setTemplate(res.data);
        })
    }, [match])

    return (
        <div>
            {/* Filter bar */}
            { window.innerWidth >= 740 && <FilterBar /> }

            <div className="body-container">
                <div className="space-y-3">
                    <h1 className="text-primary font-bold  text-2xl lg:text-4xl">{template?.name}</h1>
                    { template?.topics.map((topic, index) =>
                        <Link to={`/filter/${topic}/1`} key={index} className="text-gray-500 lg:text-lg font-semibold hover:text-primary">
                            { tranferLanguage('topics', topic) }
                            { index !== template?.topics.length-1 && ', ' }
                        </Link>
                    )}
                </div>

                { template && <>
                    <TemplateProduct slideIamges={template?.slide_image.sort()}  />

                    <TemplateContent templateData={template}/>
                </>}
            </div>
        </div>
    )
}

export default TemplatePage

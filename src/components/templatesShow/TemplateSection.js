import React, { useEffect } from 'react'
import TemplateFrames from './TemplateFrames'
import { connect } from 'react-redux';
import { fetchTemplates } from '../../actions';
import callApi from '../../utils/apiCaller'

function TemplateSection({ title, path, templates, dispatch }) {
    useEffect(() => {
        callApi('GET', '/api/templates/', null).then(res => {
            dispatch(fetchTemplates(res.data));
        })
    }, [dispatch])

    let templatesList = templates.map((template, index) =>
        <TemplateFrames key={index} isPremium={template.isPremium} url={template.slide_image}/>
    )

    return (
        <div>
            {/* Top */}
            <div className="flex justify-between">
                <h2 className="font-bold text-2xl lg:text-3xl text-primary">{ title }</h2>
                <a href={`${path}`} className="btn !bg-primary !border-transparent">
                    <span className="text-white font-semibold">Xem thêm</span>
                </a>
            </div>

            {/* Body */}
            <div className="mt-8 min-w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2 xl:grid-cols-3 sm:gap-x-5 sm:gap-y-7">
                {templatesList}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        templates: state.templates
    }
}

export default connect(mapStateToProps, null)(TemplateSection)

import React, { useEffect, useState } from 'react'
import callApi from '../utils/apiCaller'
import { connect } from 'react-redux';
import TemplateFrames from '../components/templatesShow/TemplateFrames';
import FilterBar from '../components/searchAndFilter/filter/FilterBar';
import { Link } from 'react-router-dom';

function DownloadedTemplates({ user }) {
    let [templatesList, setTemplatesList] = useState(null);
    
    useEffect(() => {
        let template = []

        user?.userInfo.templateDownloaded.forEach(id => {
            callApi('GET', `/api/templates/${id}`).then(res => {
                template.push(
                    <div key={res.data.id}>
                        <TemplateFrames 
                            isPremium={res.data.isPremium} 
                            templateFile={res.data.templates_file} 
                            id={res.data.id} 
                            url={res.data.slide_image}
                        />
                        <Link to={`/template/${res.data.id}`}>
                            <h4 className="hover:text-primary mt-2">{res.data.name}</h4>
                        </Link>
                        <p className="text-justify text-gray-400 font-light line-clamp-3">{res.data.description}</p>
                    </div>  
                );
            })

            setTimeout(() => {
                setTemplatesList(template);
            }, 1000)

        })
    }, [user, ])

    return <>
        <FilterBar />
        <div className="body-container font-bold mb-6">
            <h1 className="text-2xl text-primary">
                Các Templates bạn đã tải
            </h1>
            <div className="mt-8 min-w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2 xl:grid-cols-3 sm:gap-x-5 sm:gap-y-7">
                { templatesList }
            </div>
        </div>
    </>
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(DownloadedTemplates)

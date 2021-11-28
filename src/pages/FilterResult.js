import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import FilterBar from '../components/searchAndFilter/filter/FilterBar';
import TemplateFrames from '../components/templatesShow/TemplateFrames';
import callApi from '../utils/apiCaller'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NotFound from '../components/notFound/NotFound';

function FilterResult({ match }) {
    const [templateList, setTemplateList] = useState()
    const [nextPage, setNextPage] = useState(null)
    const [prevPage, setPrevPage] = useState(null)

    let templatesListTemp

    useEffect(() => {
        callApi('GET', `/api/templates/standard-pagination/?search=${match.params.value}&?page=${match.params.page}`).then(res => {
            let templatesListTemp = res.data.results?.map((template, index) => 
                <div key={index}>
                    <TemplateFrames 
                        isPremium={template.isPremium} 
                        templateFile={template.templates_file} 
                        id={template.id} 
                        url={template.slide_image}
                    />
                    <Link to={`/template/${template.id}`}>
                        <h4 className="hover:text-primary mt-2">{template.name}</h4>
                    </Link>
                    <p className="text-justify text-gray-400 font-light line-clamp-3">{template.description}</p>
                </div>
            )
            setTemplateList(templatesListTemp);
            setNextPage(res.data.next);
            setPrevPage(res.data.previous);
        })
    }, [match, templatesListTemp])

    return <>
        <FilterBar />
        <div className="body-container font-bold mb-6">
            {(templateList===undefined || templateList?.length===0) ? 
                <NotFound message="Chưa có Template nào được thêm vào chủ đề này"/>
                :
                <>
                    <div className="mt-8 min-w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2 xl:grid-cols-3 sm:gap-x-5 sm:gap-y-7">
                        {templateList}
                    </div>
                    <div className="mt-6 space-x-4 flex justify-center">
                        { prevPage &&
                            <Link 
                                to={`/search/${match.params.value}/${parseInt(match.params.page)-1}`}
                                className="btn !bg-primary text-white !py-4"
                            >
                                <ArrowBackIcon />
                                Trang trước
                            </Link>
                        }
                        { nextPage &&
                            <Link 
                                to={`/search/${match.params.value}/${parseInt(match.params.page)+1}`}
                                className="btn !bg-primary text-white !py-4"
                            >
                                Trang tiếp
                                <ArrowForwardIcon />
                            </Link>
                        }
                    </div>
                </>
            }
        </div>
    </>
}

export default FilterResult

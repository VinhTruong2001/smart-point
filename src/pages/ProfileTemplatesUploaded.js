import React, { useEffect, useState } from 'react'
import callApi from '../utils/apiCaller';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TemplateFrames from '../components/templatesShow/TemplateFrames';
import { Link } from 'react-router-dom';
import FilterBar from '../components/searchAndFilter/filter/FilterBar';
import NotFound from '../components/notFound/NotFound';

function ProfileTemplatesUploaded({ match }) {
    const [templateUploaded, setTemplateUploaded] = useState(null)
    const [userDisplayname, setUserDisplayname] = useState(null)
    const [nextPage, setNextPage] = useState(null)
    const [prevPage, setPrevPage] = useState(null)

    useEffect(() => {
        callApi('GET', `/api/templates/standard-pagination/?search=${match.params.uid}&page=${match.params.page}`).then(res => {
            setTemplateUploaded(res.data);
            setNextPage(res.data.next);
            setPrevPage(res.data.previous);
        })
        callApi('GET', `/api/userdata/${match.params.uid}`).then(res => {
            setUserDisplayname(res.data.displayName);
        })
    }, [match])

    const listTemplatesUploaded = templateUploaded?.results?.map((template, index) => 
        <div key={index}>
            <TemplateFrames 
                isPremium={template.isPremium} 
                templateFile={template.templates_file} 
                id={template.id} 
                url={template.slide_image}
            />
            <Link to={`/templates/${template.id}`}>
                <h4 className="hover:text-primary mt-2">{template.name}</h4>
            </Link>
            <p className="text-justify text-gray-400 font-light line-clamp-3">{template.description}</p>
        </div>
    )

    return <>
        <FilterBar />
        <div className="body-container font-bold mb-6">
            <h1 className="text-2xl text-primary">Các template đã đăng tải của <u>{ userDisplayname || "Ẩn danh" }</u></h1>
            {(listTemplatesUploaded===undefined || listTemplatesUploaded?.length===0) ? 
                <NotFound message="Người dùng này chưa đăng lên bất kỳ Template nào"/>
                :
                <>
                    <div className="mt-8 min-w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2 xl:grid-cols-3 sm:gap-x-5 sm:gap-y-7">
                        {listTemplatesUploaded}
                    </div>
                    <div className="mt-6 space-x-4 flex justify-center">
                        { prevPage &&
                            <Link 
                                to={`/profile/${match.params.uid}/${parseInt(match.params.page)-1}`}
                                className="btn !bg-primary text-white !py-4"
                            >
                                <ArrowBackIcon />
                                Trang trước
                            </Link>
                        }
                        { nextPage &&
                            <Link 
                                to={`/profile/${match.params.uid}/${parseInt(match.params.page)+1}`}
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

export default ProfileTemplatesUploaded

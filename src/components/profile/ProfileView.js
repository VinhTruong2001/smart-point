import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import callApi from '../../utils/apiCaller'
import NotFound from '../notFound/NotFound'
import TemplateFrames from '../templatesShow/TemplateFrames'

function ProfileView({ uid }) {
    const [otherUser, setOtherUser] = useState(null)
    const [templateUploaded, setTemplateUploaded] = useState(null)
    const [userAvatar, setUserAvatar] = useState(null)

    useEffect(() => {
        callApi('GET', `/api/userdata/${uid}`).then(res => {
            const apiSrc = "http://localhost:8000"
            if (res.data.profilePic) {
                setUserAvatar(res.data.profilePic?.includes(apiSrc) ? res.data.profilePic : (apiSrc + res.data.profilePic))
            } else {
                setUserAvatar(res.data.defaultGooglePhotoUrl)
            }
            setOtherUser(res.data);
        })
        callApi('GET', `/api/templates/small-pagination/?search=${uid}`).then(res =>
            setTemplateUploaded(res.data)
        )
    }, [uid])

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
        <div className="flex flex-col space-y-3 justify-center items-center pb-20">
            <Avatar src={ userAvatar } sx={{ width: 100, height: 100 }}/>
            <div className="flex items-center">
                <h2 className="min-w-400 text-center text-primary text-2xl lg:text-3xl font-bold outline-none pb-2 border-b border-primary" >
                    { otherUser?.displayName }
                </h2>
            </div>
            <div className="text-gray-400">
                { otherUser?.email }
            </div>
        </div>

        <div className="flex flex-col">
            <h3 className="text-2xl text-primary font-semibold">
                Các template đã đăng tải
            </h3>
            { (listTemplatesUploaded===undefined || listTemplatesUploaded?.length===0) ? 
                <NotFound message="Người dùng này chưa đăng lên bất kỳ Template nào"/>
                :
                <div className="mt-8 min-w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2 xl:grid-cols-3 sm:gap-x-5 sm:gap-y-7">
                    {listTemplatesUploaded}
                </div>
            }
            { templateUploaded?.next && 
                <div className="m-auto">
                    <Link to="./upload/1" className="btn !bg-primary text-white">
                        Xem thêm
                    </Link>
                </div>
            }
        </div>
    </>
}

export default ProfileView

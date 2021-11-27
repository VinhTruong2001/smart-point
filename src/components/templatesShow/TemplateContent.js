import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TemplateFrames from './TemplateFrames'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import callApi from '../../utils/apiCaller';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../actions/index';
import { Avatar } from '@mui/material';

function TemplateContent({ user, dispatch, templateData }) {
    const history = useHistory();
    const location = useLocation();
    const [relativeTemplates, setRelativeTemplates] = useState(null);
    const [liked, setLiked] = useState(null);
    const [author, setAuthor] = useState(null);
    const [templateAnalyst, setTemplateAnalyst] = useState({
        likes: 0,
        downloaded: 0,
    });

    useEffect(() => {
        callApi('GET', `/api/templates/?search=${templateData.topics[0]}`).then(res => {
            setRelativeTemplates(res.data)
        })

        callApi('GET', `/api/userdata/${templateData.authorUID}`).then(res => {
            setAuthor(res.data)
        })

        setTemplateAnalyst({
            likes: templateData.likes,
            downloaded: templateData.downloaded,
        })
        const check = user?.userInfo.templateLiked.find(templateId => templateId === templateData.id);
        check && check !== undefined ? setLiked(true) : setLiked(false);
    }, [templateData, user])

    let relativeTemplatesShow = [];
    if (relativeTemplates) {
        let numberOfTemplates = 0;
        let i = 0
        while(numberOfTemplates < 3) {
            if (relativeTemplates[i].templates_file !== templateData.template_file) {
                relativeTemplatesShow.push(
                    <div key={i} className="group">
                        <TemplateFrames 
                            id={relativeTemplates[i].id}
                            isPremium={relativeTemplates[i].isPremium} 
                            url={relativeTemplates[i].slide_image}
                        />
                        <Link to={`/template/${relativeTemplates[i].id}`} className="font-semibold group-hover:text-primary">
                            {relativeTemplates[i].name}
                        </Link>
                    </div>            
                )
                numberOfTemplates++;
            }
            i++;
        }
    }

    const downloadTemplate = () => {
        callApi('PATCH', `/api/templates/update-downloads/${templateData.id}/1`).then(res => {
            setTemplateAnalyst({
                likes: res.data.likes,
                downloaded: res.data.downloaded,
            })
        })
        if (user?.userInfo.templateDownloaded.indexOf(templateData.id)) {
            callApi('PATCH', `/api/userdata/update-downloaded/${user.userInfo.uid}/${templateData.id}`)
            user.userInfo.templateDownloaded.push(templateData.id);
        }
    }

    const likeTemplate = () => {
        if (!user) {
            history.push('/login', { prevPath: location.pathname })
        } else {
            const templateLiked = user.userInfo.templateLiked;
            if (liked) {
                const index = templateLiked.indexOf(templateData.id)
                callApi('PATCH', `/api/templates/update-likes/${templateData.id}/0/1`).then(res => {
                    setTemplateAnalyst({
                        likes: res.data.likes,
                        downloaded: res.data.downloaded,
                    })
                })
                callApi('PATCH', `/api/userdata/update-liked/${user.userInfo.uid}/unlike/${index}`)
                user.userInfo.templateLiked.splice(index, 1)
                setLiked(false)
                dispatch(setUser(user))
            } else {
                callApi('PATCH', `/api/templates/update-likes/${templateData.id}/1/1`).then(res => {
                    setTemplateAnalyst({
                        likes: res.data.likes,
                        downloaded: res.data.downloaded,
                    })
                })
                callApi('PATCH', `/api/userdata/update-liked/${user.userInfo.uid}/like/${templateData.id}`)
                user.userInfo.templateLiked.push(templateData.id)
                
                setLiked(true)
                dispatch(setUser(user))
            }
        }
    }

    return (<>
        <div className="mt-8 grid grid-cols-7 space-x-8 space-y-8 md:space-y-0">
            {/* Content */}
            <div className="col-span-7 lg:col-span-4 xl:col-span-5 space-y-8">
                {/* Description */}
                <p className="text-justify text-gray-500">
                    {templateData.description}
                </p>
            </div>

            <div className="col-span-7 lg:col-span-3 xl:col-span-2 space-y-8">
                {/* Author */}
                <div className="space-y-3">
                    <h4 className="font-bold text-primary text-xl">Người đăng</h4>
                    <Link className="flex space-x-3 items-center group">
                        <Avatar src={author?.profilePic}/>
                        <div className="flex flex-col">
                            <span className="font-semibold group-hover:text-primary">{author?.name || 'Trương Đức Vinh'}</span>
                            <span className="font-light text-gray-400">{author?.email || 'ducvinh.truong2001@gmail.com'}</span>
                        </div>
                    </Link>
                </div>

                <div>
                     {/* Reaction btn */}
                    <div className="grid grid-flow-col space-x-3">
                        {/* Download button */}
                        { user?.userInfo.isPremium === templateData.isPremium ?
                            <a 
                                href={templateData.templates_file} 
                                className="col-span-6 rounded-lg cursor-pointer"
                            >
                                <div 
                                    className="flex items-center justify-center space-x-3 bg-[#d04526]"
                                    onClick={ downloadTemplate }
                                >
                                    <img 
                                        alt="Powerpoint logo" 
                                        src={process.env.PUBLIC_URL + '/img/DownloadLogo.jpg'} 
                                        className="w-14"
                                    />
                                    <span className="text-lg font-semibold text-white">Tải xuống</span>
                                </div>
                            </a>
                            :
                            <Link to="/upgrade" className="col-span-6 h-14 rounded-lg flex items-center justify-center space-x-3 bg-yellow-300 cursor-pointer">
                                <EmojiEventsIcon className="text-white" sx={{ width: 40, height: 40}}/>
                                <span className="text-lg font-semibold text-white">Nâng cấp để tải về</span>
                            </Link>
                        }

                        {/* Like button */}
                        <div onClick={ likeTemplate } className="cursor-pointer rounded-lg bg-white border border-gray-200 shadow-xl flex">
                            { liked ? 
                                <FavoriteIcon 
                                    fontSize="large" 
                                    className="text-red-400 m-auto"
                                />
                                :
                                <FavoriteBorderIcon 
                                    fontSize="large" 
                                    className="text-gray-400 m-auto"
                                />   
                            }
                        </div>
                    </div>

                    {/* Reaction analysis*/}
                    <div className="flex pr-6">
                        <div className="flex-1">
                            <span className="font-semibold">Số lượt tải về: </span>
                            <span>{templateAnalyst.downloaded}</span>
                        </div>
                        <span className="text-primary font-bold">{templateAnalyst.likes}</span>
                    </div>
                </div>
            </div>
        </div>
        {/* Relative templates */}
        <div className="mt-16 mb-8">
            <h4 className="text-primary font-semibold text-2xl my-4">Các Template có chủ đề tương tự</h4>
            <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 xl:grid-cols-3 sm:gap-x-5 sm:gap-y-7">
                { relativeTemplatesShow }
            </div>
            <div className="w-full flex mt-3">
                <Link to={`/filter/${templateData.topics[0]}/1`} className="m-auto cursor-pointer py-2 px-3 bg-primary text-white rounded-md">
                    Xem thêm
                </Link>
            </div>
        </div>
    </>)
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(TemplateContent)

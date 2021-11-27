import React, { useState, useEffect } from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Template from './Template';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../actions/index';
import callApi from '../../utils/apiCaller'
  
function TemplateFrames({ user, dispatch, id, isPremium, url, templateFile }) {
    const history = useHistory();
    const location = useLocation();
    const [liked, setLiked] = useState(null);

    useEffect(() => {
        const check = user?.userInfo.templateLiked.find(templateId => templateId === id);
        check && check !== undefined ? setLiked(true) : setLiked(false);
    }, [user, id])

    const likeTemplate = () => {
        if (!user) {
            history.push('/login', { prevPath: location.pathname })
        } else {
            const templateLiked = user.userInfo.templateLiked;
            if (liked) {
                const index = templateLiked.indexOf(id)
                callApi('PATCH', `/api/templates/update-likes/${id}/0/1`)
                callApi('PATCH', `/api/userdata/update-liked/${user.userInfo.uid}/unlike/${index}`)
                user.userInfo.templateLiked.splice(index, 1)
                setLiked(false)
                dispatch(setUser(user))
            } else {
                callApi('PATCH', `/api/templates/update-likes/${id}/1/1`)
                callApi('PATCH', `/api/userdata/update-liked/${user.userInfo.uid}/like/${id}`)
                user.userInfo.templateLiked.push(id)
                setLiked(true)
                dispatch(setUser(user))
            }
        }
    }

    const downloadTemplate = () => {
        callApi('PATCH', `/api/templates/update-downloads/${id}/1`)
        if (user?.userInfo.templateDownloaded.indexOf(id)) {
            callApi('PATCH', `/api/userdata/update-downloaded/${user.userInfo.uid}/${id}`)
            user.userInfo.templateDownloaded.push(id);
        }
    }

    return (
        <div className="relative h-[246px] w-full bg-transparent rounded-md cursor-pointer overflow-hidden group border border-gray-300">
            { isPremium && 
                <div className="absolute top-2 left-2 z-[2] rounded-xl py-1 px-2 text-sm text-yellow-400 cursor-pointer flex items-center space-x-1 bg-gray-700/70">
                    <EmojiEventsIcon fontSize="small"/>
                    <span>Nâng cấp</span>
                </div>
            }

            <Link to={`/template/${id}`}>
                <Template url={url}/>
            </Link>
            
            <div className="absolute top-0 bottom-0 left-0 w-[10%] opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-l from-black/0 to-black/50"></div>
            </div>

            <div className="absolute top-0 bottom-0 right-0 w-[10%] opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="absolute top-0 bottom-0 right-0 w-full bg-gradient-to-r from-black/0 to-black/50"></div>
                <div className="absolute top-2 right-0 left-0 z-3 flex flex-col items-center space-y-2 ">
                    <div onClick={likeTemplate} className="relative bg-white p-0.5 rounded-md group">
                        { liked ? 
                            <FavoriteIcon 
                                fontSize="small" 
                                className="text-red-400 m-auto"
                            />
                            :
                            <FavoriteBorderIcon 
                                fontSize="small" 
                                className="text-gray-400 m-auto"
                            />   
                        }
                    </div>
                        
                    { user?.userInfo.isPremium === isPremium ?
                        <a href={templateFile} onClick={downloadTemplate} className="realtive bg-primary text-white p-0.5 rounded-md group">
                            <FileDownloadIcon fontSize="small"/>
                        </a>
                        :
                        <Link to="/upgrade" className="realtive bg-yellow-400 text-white p-0.5 rounded-md group">
                            <FileDownloadIcon fontSize="small"/>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(TemplateFrames)

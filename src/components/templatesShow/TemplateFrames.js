import React from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Template from './Template';
import { Link } from 'react-router-dom';
  
function TemplateFrames({ isPremium, url }) {
    return (
        <div className="relative h-[246px] w-full bg-transparent rounded-md cursor-pointer overflow-hidden group border border-gray-300">
            { isPremium && 
                <div className="absolute top-2 left-2 z-[2] rounded-xl py-1 px-2 text-sm text-yellow-400 cursor-pointer flex items-center space-x-1 bg-gray-700/70">
                    <EmojiEventsIcon fontSize="small"/>
                    <span>Nâng cấp</span>
                </div>
            }

            <Link to="./Template">
                <Template url={url}/>
            </Link>
            
            <div className="absolute top-0 bottom-0 left-0 w-[10%] opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-l from-black/0 to-black/50"></div>
            </div>

            <div className="absolute top-0 bottom-0 right-0 w-[10%] opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="absolute top-0 bottom-0 right-0 w-full bg-gradient-to-r from-black/0 to-black/50"></div>
                <div className="absolute top-2 right-0 left-0 z-3 flex flex-col items-center space-y-2 ">
                    <div className="relative bg-white p-0.5 rounded-md group">
                        <FavoriteBorderIcon fontSize="small"/>
                    </div>

                    <div className="realtive bg-primary text-white p-0.5 rounded-md group">
                        <FileDownloadIcon fontSize="small"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TemplateFrames

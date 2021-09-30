import React from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function Template({ type }) {
    return (
        <div className="relative w-full h-[245px] bg-gray-200 rounded-lg cursor-pointer group">
            { type && 
                <div className="absolute top-2 left-2 rounded-xl py-1 px-2 text-sm text-yellow-400 cursor-pointer flex items-center space-x-1 bg-gray-700">
                    <EmojiEventsIcon fontSize="small"/>
                    <span>Nâng cấp</span>
                </div>
            }

            <div className="absolute top-0 bottom-0 right-0 w-[10%] p-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div class="absolute top-0 right-0 w-full h-full template-overlay bg-gradient-to-r from-black/0 to-black/30"></div>
                <div class="absolute right-0 left-0 z-10 flex flex-col items-center space-y-2 ">
                    <button className="bg-white p-0.5 rounded-md">
                        <FavoriteBorderIcon fontSize="small"/>
                    </button>

                    <button className="bg-primary text-white p-0.5 rounded-md">
                        <FileDownloadIcon fontSize="small"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Template

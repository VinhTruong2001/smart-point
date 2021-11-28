import React from 'react'
import SearchOffIcon from '@mui/icons-material/SearchOff';

function NotFound({ message }) {
    return (
        <div className="flex flex-col items-center text-center text-2xl text-gray-500 font-semibold py-10">
            <SearchOffIcon sx={{ fontSize: 100 }}/>
            <span>{message}</span>
        </div>
    )
}

export default NotFound

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function FilterMobile({ title, list, height }) {
    const [listStatus, setListStatus] = useState(false)

    const items = list.map((item, index) => 
        <Link key={index} to={`/filter/${item.path}/1`} className="flex justify-end items-center p-2 text-gray-600 hover:bg-gray-200 cursor-pointer rounded-full">
            { item.optionName }
         </Link>
    )

    return (
        <div className="flex flex-col w-full justify-between items-end">
            <div 
                onClick={ () => setListStatus(!listStatus) }
                className="flex justify-end items-center w-full cursor-pointer border-b border-gray-400 pb-3"
            >
                <span >{ title }</span>
                <ArrowDropDownIcon />
            </div>
            
            <div 
                className={`mt-2 transform ${listStatus ? 'scale-y-0' : 'scaly-y-100'} transition-all duration-300 origin-top`}
                style={{ height: `${listStatus ? 0 : height}px`}}
            >
                { items }
            </div>
        </div>
    )
}

export default FilterMobile

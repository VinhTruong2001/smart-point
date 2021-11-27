import React from 'react'
import { Link } from 'react-router-dom'

function FilterSelect({ optionName, optional, path }) {
    return (
        <Link to={`/filter/${path}/1`} className="flex items-center space-x-2 p-1">
            { optional &&
                <div 
                    className='rounded-full w-4 h-4 border border-gray-200'
                    style={{ backgroundColor: `${ optional }`}}
                ></div>
            }
            <span className="hover:text-primary">{ optionName }</span>
        </Link>
    )
}

export default FilterSelect

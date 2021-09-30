import React from 'react'

function FilterSelect({ optionName, optional }) {
    return (
        <div className="flex items-center space-x-2 p-1">
            { optional &&
                <div 
                    className='rounded-full w-4 h-4'
                    style={{ backgroundColor: `${ optional }`}}
                ></div>
            }
            <span className="hover:text-primary">{ optionName }</span>
        </div>
    )
}

export default FilterSelect

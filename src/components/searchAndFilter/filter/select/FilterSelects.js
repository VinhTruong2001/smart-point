import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterSelect from './FilterSelect';


function FilterSelects({ title, options }) {

    return (
        <button className="relative h-full flex items-center text-gray-500 cursor-pointer group">
            <span className="group-hover:text-primary">{ title }</span>
            <ArrowDropDownIcon />
            
            <div class="absolute top-[40px] left-0 bg-white border border-gray-200 shadow-lg rounded-md px-2 scale-y-0 origin-top group-focus:scale-y-100 duration-200">
                { options.map((option, index) => ( 
                    <FilterSelect 
                        key={ index }
                        optionName={ option.optionName }
                        optional={ option.optional }
                    />
                )) }
            </div>
        </button>
    )
}

export default FilterSelects

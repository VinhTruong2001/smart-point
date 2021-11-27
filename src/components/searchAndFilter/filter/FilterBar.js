import React from 'react'
import FilterLinkList from './link/FilterLinkList';
import FilterSelectList from './select/FilterSelectList';

function FilterBar() {
    return <>
        { window.innerWidth >= 740 && 
            <div className="hidden sticky top-16 z-10 h-12 lg:flex items-center justify-center bg-white border-b border-gray-300 shadow-md">
                <FilterSelectList />
                <FilterLinkList />
            </div>
        }
    </>
}

export default FilterBar

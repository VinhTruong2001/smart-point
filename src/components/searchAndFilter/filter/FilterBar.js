import React from 'react'
import FilterLinkList from './link/FilterLinkList';
import FilterSelectList from './select/FilterSelectList';

function FilterBar() {
    return (
        <div className="sticky top-16 h-12 flex items-center justify-center bg-white border-b border-gray-300 shadow-md overflow-x-auto">
            <FilterSelectList />
            <FilterLinkList />
        </div>
    )
}

export default FilterBar

import React from 'react'
import FilterBar from './filter/FilterBar'
// eslint-disable-next-line
import SearchBar from './search/SearchBar'

function SearchAndFilter() {
    return (
        <>
            <div className="h-[480px] lg:h-[620px] px-2 lg:px-12 bg-gradient-primary flex items-center">
                {/* Intro and search bar */}
                <div className="flex-1">
                    <div className="relative w-full flex flex-col items-center mb-6">
                        <h1 className="relative z-[2] text-4xl lg:text-5xl font-semibold text-white">Smart Points</h1>      
                        <div className="w-1/2 h-0.5 bg-white my-4"></div>
                        <span className="absolute z-[1] -top-1/2 lg:-top-3/4 text-primary-shadow font-bold text-[58px] lg:text-8xl">Smart Points</span>
                    </div>       
                    
                    <div className="px-2 lg:px-28">
                        <SearchBar />
                    </div>
                </div>
                
                {/* Computer slide animation */}
                <div className="hidden flex-1 h-full lg:flex items-center justify-center">
                    <div className="stand relative">
                        <div className="monitor">
                        {/* Content */}
                        </div>
                    </div>
                </div>
            </div>
            { window.innerWidth >= 740 && <FilterBar /> }
        </>
    )
}

export default SearchAndFilter

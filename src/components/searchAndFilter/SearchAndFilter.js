import React from 'react'
// eslint-disable-next-line
import SearchBar from './search/SearchBar'
import FilterBar from './filter/FilterBar';

function SearchAndFilter() {
    return (
        <>
            <div className="h-[480px] lg:h-[620px] px-2 lg:px-12 bg-gradient-to-r from-[#fe3847] to-[#171c44] flex items-center">
                {/* Intro and search bar */}
                <div className="flex-1">
                    <div className="relative w-full flex flex-col items-center mb-6">
                        <h1 className="relative z-[2] text-4xl lg:text-5xl font-semibold text-white">Smart Points</h1>      
                        <div class="w-1/2 h-0.5 bg-white my-4"></div>
                        <span className="absolute z-[1] -top-1/2 lg:-top-3/4 text-primary-shadow font-bold text-[58px] lg:text-8xl">Smart Points</span>
                    </div>       
                    
                    <div className="px-2 lg:px-28">
                        <SearchBar />
                    </div>
                </div>
                
                {/* Computer slide animation */}
                <div class="hidden flex-1 h-full lg:flex items-center justify-center">
                    <div class="stand relative">
                        <div class="monitor">
                        {/* Content */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter bar */}
            { window.innerWidth >= 740 && <FilterBar /> }
        </>
    )
}

export default SearchAndFilter

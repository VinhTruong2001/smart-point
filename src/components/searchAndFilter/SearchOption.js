import React from 'react'
import FilterBar from './FilterBar'
// eslint-disable-next-line
import SearchBar from './SearchBar'

function SearchOption() {
    return (
        <>
            <div className="h-480px lg:h-620px px-2 lg:px-12 bg-gradient-to-r from-gradient-left to-gradient-right flex items-center">
                {/* Intro and search bar */}
                <div className="flex-1">
                    <div className="relative w-full flex flex-col items-center">
                        <h1 className="relative z-2 text-4xl lg:text-5xl font-semibold text-white">Smart Points</h1>      
                        <div class="w-1/2 h-0.5 bg-white my-4"></div>
                        <span className="absolute z-1 -top-1/2 lg:-top-3/4 text-primary-shadow font-bold text-58px lg:text-8xl">Smart Points</span>
                    </div>       

                    <SearchBar />
                </div>
                
                {/* Computer slide animation */}
                <div class="hidden flex-1 h-full lg:flex items-center justify-center">
                    <div class="stand relative">
                        <div class="monitor">
                            
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter bar */}
            <FilterBar />
        </>
    )
}

export default SearchOption

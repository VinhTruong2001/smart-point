import React from 'react'
import SearchBar from './search/SearchBar'

function SearchAndFilter() {
    return (
        <div className="h-[300px] lg:h-[400px] px-2 lg:px-12 bg-gradient-primary flex flex-col items-center justify-center">
            {/* Intro and search bar */}
            <div className="w-full">
                <div className="relative w-full flex flex-col items-center mb-6">
                    <h1 className="relative z-[2] text-4xl lg:text-5xl font-semibold text-white">Smart Points</h1>      
                    <div className="w-1/2 h-0.5 bg-white my-4"></div>
                    <span className="absolute z-[1] top-[-60%] lg:-top-3/4 text-primary-shadow font-bold text-[56px] lg:text-8xl">Smart Points</span>
                </div>       
            </div>
            <SearchBar />
        </div>
    )
}

export default SearchAndFilter

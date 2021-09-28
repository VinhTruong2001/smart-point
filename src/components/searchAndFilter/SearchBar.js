import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
    return (
        <div className="w-full px-2 lg:px-28 mt-6">
            <form className="flex py-3 px-2 bg-white w-full rounded-lg">
                <input className="flex-1 px-2 outline-none" type="search" name="search" placeholder="Tìm kiếm"/>
                <div className="cursor-pointer">
                    <SearchIcon />
                </div>
            </form>
        </div>
    )
}

export default SearchBar

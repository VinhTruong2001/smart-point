import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
    return (
        <form className="xl:min-w-[650px] flex py-3 px-2 bg-white rounded-lg">
            <input className="flex-1 px-2 outline-none" type="search" name="search" placeholder="Tìm kiếm template"/>
            <div className="cursor-pointer">
                <SearchIcon />
            </div>
        </form>
    )
}

export default SearchBar

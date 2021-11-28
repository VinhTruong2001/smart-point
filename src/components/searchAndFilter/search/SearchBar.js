import React, { useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';

function SearchBar({ dispatch, templates }) {
    const history = useHistory();
    const searchValue = useRef();

    const searchTemplate = (e) => {
        if (e.keyCode === 13) {
            history.push(`/search/${searchValue.current.value}/1`);
            searchValue.current.value = "";
        }
    }

    return (
        <div 
            className="min-w-[150px] xl:min-w-[650px] flex py-3 px-2 bg-white rounded-lg"
        >
            <input 
                ref={ searchValue } 
                className="flex-1 px-2 outline-none" 
                type="search" 
                name="search" 
                placeholder="Tìm kiếm template"
                onKeyDown={ e => searchTemplate(e) }
            />
            <div className="cursor-pointer">
                <SearchIcon />
            </div>
        </div>
    )
}

export default SearchBar
